export type Direction = 'long' | 'short';

export interface TradeInput {
  /** Total capital in the trading account, in account currency. */
  accountSize: number;
  /** Percent of the account the trader is willing to lose on this trade (0–100). */
  riskPercent: number;
  direction: Direction;
  entry: number;
  stopLoss: number;
  /** Optional profit target. Reward figures are only produced when this is valid. */
  takeProfit?: number | null;
}

export type IssueLevel = 'error' | 'warning';

export type IssueField =
  | 'accountSize'
  | 'riskPercent'
  | 'entry'
  | 'stopLoss'
  | 'takeProfit'
  | 'exposure';

export interface TradeIssue {
  field: IssueField;
  level: IssueLevel;
  /** Short, human sentence explaining what is wrong and how to fix it. */
  message: string;
}

export interface TradeResult {
  /** True when every number below is finite and safe to display. */
  valid: boolean;
  issues: TradeIssue[];

  /** accountSize x riskPercent — the most you intend to lose. */
  maxRisk: number;
  /** Distance between entry and stop, per share/unit/contract. */
  riskPerUnit: number;
  /** maxRisk / riskPerUnit — how many units to trade. */
  positionSize: number;
  /** positionSize rounded down to a whole tradable unit. */
  positionSizeWhole: number;
  /** Loss actually taken if you trade whole units and the stop is hit. */
  riskAtWholeUnits: number;
  /** positionSize x entry — the notional value of the position. */
  positionValue: number;
  /** Loss if the stop is hit, using the exact position size. */
  potentialLoss: number;
  /** Percent of the account lost if the stop is hit. */
  potentialLossPercent: number;
  /** Position value as a percent of the account. Above 100% requires leverage. */
  accountExposurePercent: number;
  /** Stop distance as a percent of the entry price. */
  stopDistancePercent: number;

  /** Reward figures — null when there is no valid take profit. */
  rewardPerUnit: number | null;
  potentialProfit: number | null;
  potentialProfitPercent: number | null;
  targetDistancePercent: number | null;
  /** Reward divided by risk, e.g. 3 means 3:1. */
  riskRewardRatio: number | null;
  /** Win rate needed to break even at this R:R, as a percent. */
  breakEvenWinRate: number | null;
}
