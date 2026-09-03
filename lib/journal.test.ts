import { describe, expect, it } from 'vitest';
import {
  buildEquityCurve,
  computeStats,
  filterTrades,
  groupPerformance,
  isClosed,
  maxDrawdownOf,
  outcomeOf,
  parseTrades,
  rMultiple,
  sortChronologically,
  strategiesUsed,
  toCsv,
} from './journal';
import type { JournalTrade } from '@/types/journal';

function trade(overrides: Partial<JournalTrade> = {}): JournalTrade {
  return {
    id: 't1',
    createdAt: '2026-01-01T10:00:00.000Z',
    symbol: 'AAPL',
    market: 'stocks',
    direction: 'long',
    entry: 100,
    stopLoss: 98,
    takeProfit: 106,
    positionSize: 50,
    riskAmount: 100,
    riskPercent: 1,
    exit: null,
    pnl: null,
    date: '2026-01-01',
    strategy: 'Breakout',
    setup: 'Range break',
    tags: [],
    notes: '',
    emotion: '',
    ...overrides,
  };
}

describe('outcome and R multiple', () => {
  it('derives outcome from P&L rather than a stored field', () => {
    expect(outcomeOf(trade({ pnl: 300 }))).toBe('win');
    expect(outcomeOf(trade({ pnl: -100 }))).toBe('loss');
    expect(outcomeOf(trade({ pnl: 0 }))).toBe('breakeven');
    expect(outcomeOf(trade({ pnl: null }))).toBe('open');
  });

  it('treats a non-finite P&L as an open trade rather than a number', () => {
    expect(outcomeOf(trade({ pnl: Number.NaN }))).toBe('open');
    expect(isClosed(trade({ pnl: Number.NaN }))).toBe(false);
  });

  it('expresses profit in units of risk taken', () => {
    expect(rMultiple(trade({ pnl: 300, riskAmount: 100 }))).toBe(3);
    expect(rMultiple(trade({ pnl: -100, riskAmount: 100 }))).toBe(-1);
    expect(rMultiple(trade({ pnl: 50, riskAmount: 200 }))).toBe(0.25);
  });

  it('returns null instead of dividing by a missing or zero risk', () => {
    expect(rMultiple(trade({ pnl: 300, riskAmount: 0 }))).toBeNull();
    expect(rMultiple(trade({ pnl: 300, riskAmount: -5 }))).toBeNull();
    expect(rMultiple(trade({ pnl: null, riskAmount: 100 }))).toBeNull();
  });
});

describe('equity curve', () => {
  it('starts at the starting capital and steps once per closed trade', () => {
    const curve = buildEquityCurve(
      [
        trade({ id: 'a', date: '2026-01-01', pnl: 300 }),
        trade({ id: 'b', date: '2026-01-02', pnl: -100 }),
      ],
      10000,
    );
    expect(curve.map((p) => p.equity)).toEqual([10000, 10300, 10200]);
  });

  it('ignores open trades, because unrealized P&L is not equity', () => {
    const curve = buildEquityCurve(
      [trade({ id: 'a', pnl: 300 }), trade({ id: 'b', pnl: null })],
      10000,
    );
    expect(curve).toHaveLength(2);
    expect(curve.at(-1)!.equity).toBe(10300);
  });

  it('orders by trade date, not by insertion order', () => {
    const curve = buildEquityCurve(
      [
        trade({ id: 'later', date: '2026-01-05', pnl: -100 }),
        trade({ id: 'earlier', date: '2026-01-01', pnl: 300 }),
      ],
      1000,
    );
    expect(curve.map((p) => p.equity)).toEqual([1000, 1300, 1200]);
  });

  it('is just the starting capital when nothing is closed', () => {
    expect(buildEquityCurve([], 5000)).toEqual([{ index: 0, date: null, equity: 5000 }]);
  });
});

describe('max drawdown', () => {
  it('measures the largest peak-to-trough fall, not the final loss', () => {
    // Rises to 1200, falls to 900 (a 300 fall), then recovers past the old peak.
    const curve = [1000, 1200, 900, 1400].map((equity, index) => ({
      index,
      date: null,
      equity,
    }));
    const { amount, percent } = maxDrawdownOf(curve);
    expect(amount).toBe(300);
    expect(percent).toBeCloseTo(25, 10);
  });

  it('is zero for a curve that only goes up', () => {
    const curve = [1000, 1100, 1200].map((equity, index) => ({ index, date: null, equity }));
    expect(maxDrawdownOf(curve)).toEqual({ amount: 0, percent: 0 });
  });

  it('never reports a negative or non-finite drawdown', () => {
    const curve = [0, -500].map((equity, index) => ({ index, date: null, equity }));
    const { amount, percent } = maxDrawdownOf(curve);
    expect(amount).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(percent)).toBe(true);
  });
});

describe('computeStats', () => {
  const trades = [
    trade({ id: 'a', date: '2026-01-01', pnl: 300, riskAmount: 100, riskPercent: 1 }),
    trade({ id: 'b', date: '2026-01-02', pnl: -100, riskAmount: 100, riskPercent: 1 }),
    trade({ id: 'c', date: '2026-01-03', pnl: 200, riskAmount: 100, riskPercent: 1 }),
    trade({ id: 'd', date: '2026-01-04', pnl: null }),
  ];

  const stats = computeStats(trades, 10000);

  it('counts open and closed trades separately', () => {
    expect(stats.totalTrades).toBe(4);
    expect(stats.closedTrades).toBe(3);
    expect(stats.openTrades).toBe(1);
  });

  it('computes win rate over closed trades only', () => {
    expect(stats.winRate).toBeCloseTo((2 / 3) * 100, 10);
    expect(stats.wins).toBe(2);
    expect(stats.losses).toBe(1);
  });

  it('computes P&L, averages and extremes', () => {
    expect(stats.totalPnl).toBe(400);
    expect(stats.averageWin).toBe(250);
    expect(stats.averageLoss).toBe(-100);
    expect(stats.bestTrade).toBe(300);
    expect(stats.worstTrade).toBe(-100);
  });

  it('computes profit factor as gross profit over gross loss', () => {
    expect(stats.profitFactor).toBeCloseTo(500 / 100, 10);
  });

  it('computes expectancy as average P&L per closed trade', () => {
    expect(stats.expectancy).toBeCloseTo(400 / 3, 10);
  });

  it('computes average R across closed trades', () => {
    expect(stats.averageR).toBeCloseTo((3 + -1 + 2) / 3, 10);
  });

  it('tracks equity and drawdown', () => {
    expect(stats.currentEquity).toBe(10400);
    expect(stats.maxDrawdown).toBe(100);
  });

  it('returns nulls rather than a misleading zero when nothing is closed', () => {
    const empty = computeStats([], 10000);
    expect(empty.winRate).toBeNull();
    expect(empty.averageWin).toBeNull();
    expect(empty.averageLoss).toBeNull();
    expect(empty.profitFactor).toBeNull();
    expect(empty.expectancy).toBeNull();
    expect(empty.averageR).toBeNull();
    expect(empty.bestTrade).toBeNull();
    expect(empty.totalPnl).toBe(0);
    expect(empty.currentEquity).toBe(10000);
  });

  it('reports profit factor as null rather than Infinity when there are no losses', () => {
    const allWins = computeStats([trade({ pnl: 100 }), trade({ id: 'x', pnl: 50 })], 1000);
    expect(allWins.profitFactor).toBeNull();
    expect(allWins.winRate).toBe(100);
  });

  it('never produces a non-finite number anywhere in the result', () => {
    for (const sample of [[], trades, [trade({ pnl: 0, riskAmount: 0 })]]) {
      const result = computeStats(sample, 10000);
      for (const [key, value] of Object.entries(result)) {
        if (typeof value === 'number') {
          expect(Number.isFinite(value), `${key} should be finite`).toBe(true);
        }
      }
    }
  });
});

describe('grouping and filtering', () => {
  const trades = [
    trade({ id: 'a', strategy: 'Breakout', symbol: 'AAPL', pnl: 300, riskAmount: 100 }),
    trade({ id: 'b', strategy: 'Breakout', symbol: 'MSFT', pnl: -100, riskAmount: 100 }),
    trade({ id: 'c', strategy: 'Pullback', symbol: 'AAPL', pnl: 500, riskAmount: 100 }),
    trade({ id: 'd', strategy: '', symbol: 'TSLA', pnl: null }),
  ];

  it('groups by strategy and ranks by P&L', () => {
    const groups = groupPerformance(trades, (t) => t.strategy);
    expect(groups[0].key).toBe('Pullback');
    expect(groups[0].totalPnl).toBe(500);
    const breakout = groups.find((g) => g.key === 'Breakout')!;
    expect(breakout.trades).toBe(2);
    expect(breakout.totalPnl).toBe(200);
    expect(breakout.winRate).toBe(50);
  });

  it('labels blank strategies rather than dropping those trades', () => {
    const groups = groupPerformance(trades, (t) => t.strategy);
    expect(groups.some((g) => g.key === 'Unlabelled')).toBe(true);
    expect(strategiesUsed(trades)).toContain('Unlabelled');
  });

  it('filters by outcome', () => {
    expect(filterTrades(trades, { query: '', outcome: 'win', strategy: 'all' })).toHaveLength(2);
    expect(filterTrades(trades, { query: '', outcome: 'loss', strategy: 'all' })).toHaveLength(1);
    expect(filterTrades(trades, { query: '', outcome: 'open', strategy: 'all' })).toHaveLength(1);
  });

  it('filters by strategy, including the unlabelled bucket', () => {
    expect(
      filterTrades(trades, { query: '', outcome: 'all', strategy: 'Breakout' }),
    ).toHaveLength(2);
    expect(
      filterTrades(trades, { query: '', outcome: 'all', strategy: 'Unlabelled' }),
    ).toHaveLength(1);
  });

  it('searches symbol, strategy, setup, notes and tags', () => {
    expect(filterTrades(trades, { query: 'aapl', outcome: 'all', strategy: 'all' })).toHaveLength(2);
    const tagged = [trade({ id: 'z', tags: ['gap-up'], pnl: 10 })];
    expect(filterTrades(tagged, { query: 'gap', outcome: 'all', strategy: 'all' })).toHaveLength(1);
  });

  it('combines filters rather than treating them as alternatives', () => {
    expect(
      filterTrades(trades, { query: 'aapl', outcome: 'win', strategy: 'Breakout' }),
    ).toHaveLength(1);
  });
});

describe('storage safety', () => {
  it('drops anything that does not look like a trade', () => {
    const parsed = parseTrades([
      trade(),
      null,
      'nope',
      { id: 'x' },
      { ...trade(), entry: 'abc' },
      { ...trade(), tags: 'not-an-array' },
    ]);
    expect(parsed).toHaveLength(1);
  });

  it('returns an empty list for corrupt storage rather than throwing', () => {
    expect(parseTrades(null)).toEqual([]);
    expect(parseTrades({})).toEqual([]);
    expect(parseTrades('[]')).toEqual([]);
  });
});

describe('CSV export', () => {
  it('writes a header and one row per trade, oldest first', () => {
    const csv = toCsv([
      trade({ id: 'b', date: '2026-01-02', symbol: 'MSFT', pnl: -100 }),
      trade({ id: 'a', date: '2026-01-01', symbol: 'AAPL', pnl: 300 }),
    ]);
    const lines = csv.split('\n');
    expect(lines[0]).toContain('r_multiple');
    expect(lines[1]).toContain('AAPL');
    expect(lines[2]).toContain('MSFT');
  });

  it('escapes commas and quotes so notes cannot break the file', () => {
    const csv = toCsv([trade({ notes: 'Sold early, felt "wrong"', pnl: 10 })]);
    expect(csv).toContain('"Sold early, felt ""wrong"""');
  });
});

describe('sortChronologically', () => {
  it('does not mutate its input', () => {
    const input = [trade({ id: 'b', date: '2026-02-01' }), trade({ id: 'a', date: '2026-01-01' })];
    const order = input.map((t) => t.id);
    sortChronologically(input);
    expect(input.map((t) => t.id)).toEqual(order);
  });

  it('breaks ties on the same date with creation time', () => {
    const sorted = sortChronologically([
      trade({ id: 'second', date: '2026-01-01', createdAt: '2026-01-01T12:00:00.000Z' }),
      trade({ id: 'first', date: '2026-01-01', createdAt: '2026-01-01T09:00:00.000Z' }),
    ]);
    expect(sorted.map((t) => t.id)).toEqual(['first', 'second']);
  });
});
