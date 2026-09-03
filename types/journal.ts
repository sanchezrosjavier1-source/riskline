import type { Direction, Market } from './trade';

/** Derived from P&L rather than stored, so it can never disagree with the numbers. */
export type TradeOutcome = 'win' | 'loss' | 'breakeven' | 'open';

export interface JournalTrade {
  id: string;
  /** ISO timestamp of when the row was created, used for stable ordering. */
  createdAt: string;

  // ------------------------------------------------------------- instrument
  symbol: string;
  market: Market;
  direction: Direction;

  // ------------------------------------------------------------------- plan
  entry: number;
  stopLoss: number;
  takeProfit: number | null;
  positionSize: number;
  /** Account currency actually put at risk — the denominator of every R multiple. */
  riskAmount: number;
  /** Percent of the account that risk represented at the time. */
  riskPercent: number | null;

  // ---------------------------------------------------------------- outcome
  /** Null while the trade is still open. */
  exit: number | null;
  /** Realized profit or loss in account currency. Null while open. */
  pnl: number | null;

  // ---------------------------------------------------------------- context
  /** Trade date as YYYY-MM-DD. */
  date: string;
  strategy: string;
  setup: string;
  tags: string[];
  notes: string;
  /** How the trade felt — optional, and only useful if answered honestly. */
  emotion: string;
}

export interface EquityPoint {
  /** Trade index, 0 being the starting capital before any trade. */
  index: number;
  date: string | null;
  equity: number;
}

export interface JournalStats {
  totalTrades: number;
  closedTrades: number;
  openTrades: number;

  /** Null when nothing is closed yet — never a misleading zero. */
  winRate: number | null;
  wins: number;
  losses: number;
  breakEven: number;

  totalPnl: number;
  averageWin: number | null;
  averageLoss: number | null;
  /** Gross profit / gross loss. Null when there are no losses to divide by. */
  profitFactor: number | null;
  /** Average account currency won or lost per closed trade. */
  expectancy: number | null;
  averageR: number | null;
  bestTrade: number | null;
  worstTrade: number | null;
  /** Average risk taken per trade, as a percent of the account. */
  averageRiskPercent: number | null;

  startingCapital: number;
  currentEquity: number;
  /** Largest peak-to-trough fall of the equity curve, as a positive number. */
  maxDrawdown: number;
  maxDrawdownPercent: number;
  equityCurve: EquityPoint[];
}
