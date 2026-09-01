import type { Direction, TradeInput, TradeIssue, TradeResult } from '@/types/trade';

/** Largest value we treat as a real input. Anything beyond is a typo, not a trade. */
export const MAX_REASONABLE_VALUE = 1e12;

/** Returns true only for finite, non-NaN numbers. */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Every division in this file goes through here so a bad denominator can never
 * leak NaN or Infinity into the UI.
 */
export function safeDivide(numerator: number, denominator: number): number | null {
  if (!isFiniteNumber(numerator) || !isFiniteNumber(denominator)) return null;
  if (denominator === 0) return null;
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}

/** Rounds to a fixed number of decimals, guarding against non-finite input. */
export function roundTo(value: number, decimals = 2): number {
  if (!isFiniteNumber(value)) return 0;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Distance from entry to stop in the direction the trade loses.
 * Long trades lose when price falls, short trades lose when price rises.
 */
export function riskPerUnitFor(direction: Direction, entry: number, stopLoss: number): number {
  return direction === 'long' ? entry - stopLoss : stopLoss - entry;
}

/** Distance from entry to target in the direction the trade wins. */
export function rewardPerUnitFor(direction: Direction, entry: number, takeProfit: number): number {
  return direction === 'long' ? takeProfit - entry : entry - takeProfit;
}

const EMPTY_RESULT: Omit<TradeResult, 'valid' | 'issues'> = {
  maxRisk: 0,
  riskPerUnit: 0,
  positionSize: 0,
  positionSizeWhole: 0,
  riskAtWholeUnits: 0,
  positionValue: 0,
  potentialLoss: 0,
  potentialLossPercent: 0,
  accountExposurePercent: 0,
  stopDistancePercent: 0,
  rewardPerUnit: null,
  potentialProfit: null,
  potentialProfitPercent: null,
  targetDistancePercent: null,
  riskRewardRatio: null,
  breakEvenWinRate: null,
};

/**
 * Validates raw inputs. Errors block calculation; warnings are advisory and
 * still allow the numbers to be shown.
 */
export function validateTrade(input: TradeInput): TradeIssue[] {
  const issues: TradeIssue[] = [];
  const { accountSize, riskPercent, direction, entry, stopLoss, takeProfit } = input;

  if (!isFiniteNumber(accountSize) || accountSize <= 0) {
    issues.push({
      field: 'accountSize',
      level: 'error',
      message: 'Enter an account size greater than zero. Every other number is calculated from it.',
    });
  } else if (accountSize > MAX_REASONABLE_VALUE) {
    issues.push({
      field: 'accountSize',
      level: 'error',
      message: 'That account size is too large to calculate accurately. Try a smaller number.',
    });
  }

  if (!isFiniteNumber(riskPercent) || riskPercent <= 0) {
    issues.push({
      field: 'riskPercent',
      level: 'error',
      message: 'Risk per trade must be greater than 0%. Risking nothing leaves no position to size.',
    });
  } else if (riskPercent > 100) {
    issues.push({
      field: 'riskPercent',
      level: 'error',
      message: 'You cannot risk more than 100% of your account on a single trade.',
    });
  } else if (riskPercent > 5) {
    issues.push({
      field: 'riskPercent',
      level: 'warning',
      message:
        'Risking more than 5% on one trade is aggressive. Most risk frameworks stay at or below 1-2%.',
    });
  }

  if (!isFiniteNumber(entry) || entry <= 0) {
    issues.push({
      field: 'entry',
      level: 'error',
      message: 'Enter an entry price greater than zero.',
    });
  } else if (entry > MAX_REASONABLE_VALUE) {
    issues.push({
      field: 'entry',
      level: 'error',
      message: 'That entry price is outside the range this calculator can handle.',
    });
  }

  if (!isFiniteNumber(stopLoss) || stopLoss <= 0) {
    issues.push({
      field: 'stopLoss',
      level: 'error',
      message: 'Enter a stop loss greater than zero.',
    });
  }

  const pricesUsable =
    isFiniteNumber(entry) && entry > 0 && isFiniteNumber(stopLoss) && stopLoss > 0;

  if (pricesUsable) {
    const risk = riskPerUnitFor(direction, entry, stopLoss);
    if (risk === 0) {
      issues.push({
        field: 'stopLoss',
        level: 'error',
        message:
          'Your stop sits exactly at your entry, so the trade has no defined risk and no position size.',
      });
    } else if (risk < 0) {
      issues.push({
        field: 'stopLoss',
        level: 'error',
        message:
          direction === 'long'
            ? 'On a long trade the stop belongs below the entry. That is the side the trade loses on.'
            : 'On a short trade the stop belongs above the entry. That is the side the trade loses on.',
      });
    }
  }

  const targetProvided = takeProfit !== null && takeProfit !== undefined;
  const targetUsable = isFiniteNumber(takeProfit) && (takeProfit as number) > 0;

  if (targetProvided && !targetUsable) {
    issues.push({
      field: 'takeProfit',
      level: 'error',
      message:
        'Enter a take profit greater than zero, or clear the field to size the trade without a target.',
    });
  }

  if (targetUsable && pricesUsable) {
    const reward = rewardPerUnitFor(direction, entry, takeProfit as number);
    if (reward <= 0) {
      issues.push({
        field: 'takeProfit',
        level: 'error',
        message:
          direction === 'long'
            ? 'On a long trade the target belongs above the entry. Below the entry is a loss, not a profit.'
            : 'On a short trade the target belongs below the entry. Above the entry is a loss, not a profit.',
      });
    }
  }

  return issues;
}

/**
 * The single source of truth for every number this product displays.
 * Pure, synchronous and safe to call on every keystroke.
 */
export function calculateTrade(input: TradeInput): TradeResult {
  const issues = validateTrade(input);
  const blocking = issues.filter((issue) => issue.level === 'error');

  if (blocking.length > 0) {
    return { valid: false, issues, ...EMPTY_RESULT };
  }

  const { accountSize, riskPercent, direction, entry, stopLoss, takeProfit } = input;

  const maxRisk = accountSize * (riskPercent / 100);
  const riskPerUnit = riskPerUnitFor(direction, entry, stopLoss);

  const positionSize = safeDivide(maxRisk, riskPerUnit) ?? 0;
  const positionSizeWhole = Math.floor(positionSize);
  const riskAtWholeUnits = positionSizeWhole * riskPerUnit;
  const positionValue = positionSize * entry;
  const potentialLoss = positionSize * riskPerUnit;
  const potentialLossPercent = (safeDivide(potentialLoss, accountSize) ?? 0) * 100;
  const accountExposurePercent = (safeDivide(positionValue, accountSize) ?? 0) * 100;
  const stopDistancePercent = (safeDivide(riskPerUnit, entry) ?? 0) * 100;

  const targetUsable = isFiniteNumber(takeProfit) && (takeProfit as number) > 0;

  let rewardPerUnit: number | null = null;
  let potentialProfit: number | null = null;
  let potentialProfitPercent: number | null = null;
  let targetDistancePercent: number | null = null;
  let riskRewardRatio: number | null = null;
  let breakEvenWinRate: number | null = null;

  if (targetUsable) {
    rewardPerUnit = rewardPerUnitFor(direction, entry, takeProfit as number);
    potentialProfit = positionSize * rewardPerUnit;
    potentialProfitPercent = (safeDivide(potentialProfit, accountSize) ?? 0) * 100;
    targetDistancePercent = (safeDivide(rewardPerUnit, entry) ?? 0) * 100;
    riskRewardRatio = safeDivide(rewardPerUnit, riskPerUnit);
    if (riskRewardRatio !== null) {
      breakEvenWinRate = (safeDivide(1, 1 + riskRewardRatio) ?? 0) * 100;
    }
  }

  // Advisory only. The math above is already correct; these flag a position the
  // trader may not be able to fund, or one too small to actually place.
  if (accountExposurePercent > 100) {
    issues.push({
      field: 'exposure',
      level: 'warning',
      message: `This position is worth about ${Math.round(
        accountExposurePercent,
      )}% of your account. Your loss is still capped at the risk you set, but funding it needs margin or leverage.`,
    });
  }

  if (positionSizeWhole === 0) {
    issues.push({
      field: 'exposure',
      level: 'warning',
      message:
        'Your risk budget buys less than one whole unit. Widen the stop, raise the account size, or trade something that allows fractional size.',
    });
  }

  return {
    valid: true,
    issues,
    maxRisk,
    riskPerUnit,
    positionSize,
    positionSizeWhole,
    riskAtWholeUnits,
    positionValue,
    potentialLoss,
    potentialLossPercent,
    accountExposurePercent,
    stopDistancePercent,
    rewardPerUnit,
    potentialProfit,
    potentialProfitPercent,
    targetDistancePercent,
    riskRewardRatio,
    breakEvenWinRate,
  };
}

export interface LadderGeometry {
  entryPct: number;
  stopPct: number;
  targetPct: number | null;
}

/**
 * Where entry, stop and target sit inside the price range being drawn, as
 * 0-100 percentages measured from the bottom of the frame. The trade ladder
 * uses this so the picture always agrees with the numbers.
 */
export function ladderGeometry(input: {
  direction: Direction;
  entry: number;
  stopLoss: number;
  takeProfit?: number | null;
}): LadderGeometry | null {
  const { direction, entry, stopLoss, takeProfit } = input;
  if (!isFiniteNumber(entry) || !isFiniteNumber(stopLoss)) return null;
  if (entry <= 0 || stopLoss <= 0) return null;
  if (riskPerUnitFor(direction, entry, stopLoss) <= 0) return null;

  const hasTarget =
    isFiniteNumber(takeProfit) &&
    (takeProfit as number) > 0 &&
    rewardPerUnitFor(direction, entry, takeProfit as number) > 0;

  const prices = hasTarget ? [entry, stopLoss, takeProfit as number] : [entry, stopLoss];
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const span = high - low;
  if (span <= 0) return null;

  // Breathing room top and bottom so markers never clip the frame.
  const pad = 10;
  const scale = (price: number) => pad + ((price - low) / span) * (100 - pad * 2);

  return {
    entryPct: scale(entry),
    stopPct: scale(stopLoss),
    targetPct: hasTarget ? scale(takeProfit as number) : null,
  };
}

/**
 * Expected value per trade in account currency, given a win rate.
 * Used by the risk/reward tool to show what an edge is actually worth.
 */
export function expectedValue(input: {
  winRatePercent: number;
  averageWin: number;
  averageLoss: number;
}): number | null {
  const { winRatePercent, averageWin, averageLoss } = input;
  if (!isFiniteNumber(winRatePercent) || winRatePercent < 0 || winRatePercent > 100) return null;
  if (!isFiniteNumber(averageWin) || !isFiniteNumber(averageLoss)) return null;
  if (averageWin < 0 || averageLoss < 0) return null;
  const p = winRatePercent / 100;
  const value = p * averageWin - (1 - p) * averageLoss;
  return Number.isFinite(value) ? value : null;
}
