import { isFiniteNumber, safeDivide } from './trade-math';
import type { EquityPoint, JournalStats, JournalTrade, TradeOutcome } from '@/types/journal';

/**
 * Every number the journal dashboard shows is derived here, from the trades
 * themselves. Nothing that can be computed is stored, so a row can never
 * disagree with the statistics built on top of it.
 *
 * Anything that cannot be computed honestly returns null rather than 0 — a
 * win rate of "0%" and "no closed trades yet" mean very different things to
 * someone deciding whether their strategy works.
 */

export const STRATEGY_PLACEHOLDER = 'Unlabelled';

export function createTradeId(): string {
  // crypto.randomUUID is available in every browser this app supports, but the
  // fallback keeps tests and older environments working.
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

/** Win, loss, breakeven or still open — derived, never stored. */
export function outcomeOf(trade: JournalTrade): TradeOutcome {
  if (trade.pnl === null || !isFiniteNumber(trade.pnl)) return 'open';
  if (trade.pnl > 0) return 'win';
  if (trade.pnl < 0) return 'loss';
  return 'breakeven';
}

export function isClosed(trade: JournalTrade): boolean {
  return outcomeOf(trade) !== 'open';
}

/**
 * Profit or loss expressed in units of the risk taken. A trade that made twice
 * what it risked is +2R, regardless of account size or instrument — which is
 * what makes it the only fair way to compare trades against each other.
 */
export function rMultiple(trade: JournalTrade): number | null {
  if (trade.pnl === null || !isFiniteNumber(trade.pnl)) return null;
  if (!isFiniteNumber(trade.riskAmount) || trade.riskAmount <= 0) return null;
  return safeDivide(trade.pnl, trade.riskAmount);
}

/** Chronological, oldest first, so an equity curve reads left to right. */
export function sortChronologically(trades: JournalTrade[]): JournalTrade[] {
  return [...trades].sort((a, b) => {
    const byDate = a.date.localeCompare(b.date);
    if (byDate !== 0) return byDate;
    return a.createdAt.localeCompare(b.createdAt);
  });
}

/**
 * Running account equity after each closed trade, starting from the capital
 * the trader says they began with. Open trades are skipped: unrealized P&L is
 * not equity.
 */
export function buildEquityCurve(trades: JournalTrade[], startingCapital: number): EquityPoint[] {
  const start = isFiniteNumber(startingCapital) ? startingCapital : 0;
  const points: EquityPoint[] = [{ index: 0, date: null, equity: start }];

  let equity = start;
  for (const trade of sortChronologically(trades)) {
    if (!isClosed(trade) || trade.pnl === null) continue;
    equity += trade.pnl;
    points.push({ index: points.length, date: trade.date, equity });
  }

  return points;
}

/** Largest peak-to-trough fall along the curve, as a positive amount and percent. */
export function maxDrawdownOf(curve: EquityPoint[]): { amount: number; percent: number } {
  let peak = -Infinity;
  let worstAmount = 0;
  let worstPercent = 0;

  for (const point of curve) {
    if (point.equity > peak) peak = point.equity;
    const fall = peak - point.equity;
    if (fall > worstAmount) worstAmount = fall;
    // A percentage only means anything against a positive peak.
    if (peak > 0) {
      const percent = (fall / peak) * 100;
      if (percent > worstPercent) worstPercent = percent;
    }
  }

  return { amount: worstAmount, percent: worstPercent };
}

function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}

export function computeStats(trades: JournalTrade[], startingCapital: number): JournalStats {
  const closed = trades.filter(isClosed);
  const open = trades.length - closed.length;

  const wins = closed.filter((t) => outcomeOf(t) === 'win');
  const losses = closed.filter((t) => outcomeOf(t) === 'loss');
  const breakEven = closed.filter((t) => outcomeOf(t) === 'breakeven');

  const pnls = closed.map((t) => t.pnl as number);
  const totalPnl = pnls.reduce((sum, value) => sum + value, 0);

  const grossProfit = wins.reduce((sum, t) => sum + (t.pnl as number), 0);
  // Kept positive so the ratio reads the way traders expect.
  const grossLoss = Math.abs(losses.reduce((sum, t) => sum + (t.pnl as number), 0));

  const rMultiples = closed
    .map(rMultiple)
    .filter((r): r is number => r !== null && Number.isFinite(r));

  const riskPercents = trades
    .map((t) => t.riskPercent)
    .filter((r): r is number => r !== null && isFiniteNumber(r));

  const curve = buildEquityCurve(trades, startingCapital);
  const drawdown = maxDrawdownOf(curve);

  return {
    totalTrades: trades.length,
    closedTrades: closed.length,
    openTrades: open,

    winRate: closed.length > 0 ? (wins.length / closed.length) * 100 : null,
    wins: wins.length,
    losses: losses.length,
    breakEven: breakEven.length,

    totalPnl,
    averageWin: mean(wins.map((t) => t.pnl as number)),
    averageLoss: mean(losses.map((t) => t.pnl as number)),
    // No losses yet means the ratio is undefined, not infinite.
    profitFactor: grossLoss > 0 ? grossProfit / grossLoss : null,
    expectancy: closed.length > 0 ? totalPnl / closed.length : null,
    averageR: mean(rMultiples),
    bestTrade: pnls.length > 0 ? Math.max(...pnls) : null,
    worstTrade: pnls.length > 0 ? Math.min(...pnls) : null,
    averageRiskPercent: mean(riskPercents),

    startingCapital: isFiniteNumber(startingCapital) ? startingCapital : 0,
    currentEquity: curve[curve.length - 1]?.equity ?? 0,
    maxDrawdown: drawdown.amount,
    maxDrawdownPercent: drawdown.percent,
    equityCurve: curve,
  };
}

// ------------------------------------------------------------------ grouping

export interface GroupPerformance {
  key: string;
  trades: number;
  totalPnl: number;
  winRate: number | null;
  averageR: number | null;
}

/** Performance broken down by any string field — strategy, setup or symbol. */
export function groupPerformance(
  trades: JournalTrade[],
  keyOf: (trade: JournalTrade) => string,
): GroupPerformance[] {
  const groups = new Map<string, JournalTrade[]>();

  for (const trade of trades) {
    const key = keyOf(trade).trim() || STRATEGY_PLACEHOLDER;
    const bucket = groups.get(key);
    if (bucket) bucket.push(trade);
    else groups.set(key, [trade]);
  }

  return Array.from(groups.entries())
    .map(([key, group]) => {
      const closed = group.filter(isClosed);
      const wins = closed.filter((t) => outcomeOf(t) === 'win').length;
      const rs = closed.map(rMultiple).filter((r): r is number => r !== null && Number.isFinite(r));
      return {
        key,
        trades: group.length,
        totalPnl: closed.reduce((sum, t) => sum + (t.pnl as number), 0),
        winRate: closed.length > 0 ? (wins / closed.length) * 100 : null,
        averageR: mean(rs),
      };
    })
    .sort((a, b) => b.totalPnl - a.totalPnl);
}

// ---------------------------------------------------------------- filtering

export interface JournalFilters {
  query: string;
  outcome: TradeOutcome | 'all';
  strategy: string | 'all';
}

export function filterTrades(trades: JournalTrade[], filters: JournalFilters): JournalTrade[] {
  const query = filters.query.trim().toLowerCase();

  return trades.filter((trade) => {
    if (filters.outcome !== 'all' && outcomeOf(trade) !== filters.outcome) return false;

    if (filters.strategy !== 'all') {
      const strategy = trade.strategy.trim() || STRATEGY_PLACEHOLDER;
      if (strategy !== filters.strategy) return false;
    }

    if (!query) return true;
    const haystack = [trade.symbol, trade.strategy, trade.setup, trade.notes, ...trade.tags]
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });
}

/** Every distinct strategy label in use, for the filter dropdown. */
export function strategiesUsed(trades: JournalTrade[]): string[] {
  const labels = new Set<string>();
  for (const trade of trades) labels.add(trade.strategy.trim() || STRATEGY_PLACEHOLDER);
  return Array.from(labels).sort((a, b) => a.localeCompare(b));
}

// ------------------------------------------------------------------ storage

/**
 * Trades come out of browser storage, which means they can be hand-edited,
 * half-written by an older version of the app, or corrupt. Anything that does
 * not look like a trade is dropped rather than allowed to poison the stats.
 */
export function parseTrades(raw: unknown): JournalTrade[] {
  if (!Array.isArray(raw)) return [];

  return raw.filter((value): value is JournalTrade => {
    if (typeof value !== 'object' || value === null) return false;
    const trade = value as Partial<JournalTrade>;
    return (
      typeof trade.id === 'string' &&
      typeof trade.symbol === 'string' &&
      typeof trade.date === 'string' &&
      isFiniteNumber(trade.entry) &&
      isFiniteNumber(trade.stopLoss) &&
      isFiniteNumber(trade.positionSize) &&
      isFiniteNumber(trade.riskAmount) &&
      Array.isArray(trade.tags)
    );
  });
}

/** Journal rows as CSV, for people who want their data somewhere we don't control. */
export function toCsv(trades: JournalTrade[]): string {
  const header = [
    'date',
    'symbol',
    'market',
    'direction',
    'entry',
    'stop_loss',
    'take_profit',
    'position_size',
    'risk_amount',
    'risk_percent',
    'exit',
    'pnl',
    'r_multiple',
    'outcome',
    'strategy',
    'setup',
    'tags',
    'emotion',
    'notes',
  ];

  const escape = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    const text = String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const rows = sortChronologically(trades).map((trade) =>
    [
      trade.date,
      trade.symbol,
      trade.market,
      trade.direction,
      trade.entry,
      trade.stopLoss,
      trade.takeProfit,
      trade.positionSize,
      trade.riskAmount,
      trade.riskPercent,
      trade.exit,
      trade.pnl,
      rMultiple(trade),
      outcomeOf(trade),
      trade.strategy,
      trade.setup,
      trade.tags.join('|'),
      trade.emotion,
      trade.notes,
    ]
      .map(escape)
      .join(','),
  );

  return [header.join(','), ...rows].join('\n');
}
