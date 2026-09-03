import { describe, expect, it } from 'vitest';
import {
  calculateTrade,
  expectedValue,
  ladderGeometry,
  rewardPerUnitFor,
  riskPerUnitFor,
  safeDivide,
  validateTrade,
} from './trade-math';
import type { TradeInput } from '@/types/trade';

const baseLong: TradeInput = {
  accountSize: 10000,
  riskPercent: 1,
  direction: 'long',
  entry: 50,
  stopLoss: 48,
  takeProfit: 56,
};

const baseShort: TradeInput = {
  accountSize: 10000,
  riskPercent: 1,
  direction: 'short',
  entry: 50,
  stopLoss: 52,
  takeProfit: 44,
};

describe('safeDivide', () => {
  it('divides normally', () => {
    expect(safeDivide(100, 2)).toBe(50);
  });

  it('returns null instead of Infinity', () => {
    expect(safeDivide(100, 0)).toBeNull();
  });

  it('returns null for NaN inputs', () => {
    expect(safeDivide(Number.NaN, 2)).toBeNull();
    expect(safeDivide(2, Number.NaN)).toBeNull();
  });

  it('returns null for infinite inputs', () => {
    expect(safeDivide(Number.POSITIVE_INFINITY, 2)).toBeNull();
  });
});

describe('directional distances', () => {
  it('measures long risk downward and long reward upward', () => {
    expect(riskPerUnitFor('long', 50, 48)).toBe(2);
    expect(rewardPerUnitFor('long', 50, 56)).toBe(6);
  });

  it('measures short risk upward and short reward downward', () => {
    expect(riskPerUnitFor('short', 50, 52)).toBe(2);
    expect(rewardPerUnitFor('short', 50, 44)).toBe(6);
  });
});

describe('calculateTrade — long', () => {
  const result = calculateTrade(baseLong);

  it('is valid', () => {
    expect(result.valid).toBe(true);
  });

  it('computes the canonical worked example', () => {
    expect(result.maxRisk).toBe(100);
    expect(result.riskPerUnit).toBe(2);
    expect(result.positionSize).toBe(50);
    expect(result.positionValue).toBe(2500);
    expect(result.potentialLoss).toBe(100);
  });

  it('computes reward figures', () => {
    expect(result.rewardPerUnit).toBe(6);
    expect(result.potentialProfit).toBe(300);
    expect(result.riskRewardRatio).toBe(3);
  });

  it('reports the loss as exactly the risk percent of the account', () => {
    expect(result.potentialLossPercent).toBeCloseTo(1, 10);
  });

  it('reports exposure as a percent of the account', () => {
    expect(result.accountExposurePercent).toBe(25);
  });

  it('computes stop and target distance as percentages of entry', () => {
    expect(result.stopDistancePercent).toBe(4);
    expect(result.targetDistancePercent).toBe(12);
  });

  it('computes the break-even win rate for a 3:1 trade', () => {
    expect(result.breakEvenWinRate).toBeCloseTo(25, 10);
  });
});

describe('calculateTrade — short', () => {
  const result = calculateTrade(baseShort);

  it('mirrors the long case exactly', () => {
    expect(result.valid).toBe(true);
    expect(result.riskPerUnit).toBe(2);
    expect(result.positionSize).toBe(50);
    expect(result.rewardPerUnit).toBe(6);
    expect(result.potentialProfit).toBe(300);
    expect(result.riskRewardRatio).toBe(3);
  });

  it('rejects a stop placed below entry on a short', () => {
    const bad = calculateTrade({ ...baseShort, stopLoss: 48 });
    expect(bad.valid).toBe(false);
    expect(bad.issues.some((i) => i.field === 'stopLoss' && i.level === 'error')).toBe(true);
  });

  it('rejects a target placed above entry on a short', () => {
    const bad = calculateTrade({ ...baseShort, takeProfit: 56 });
    expect(bad.valid).toBe(false);
    expect(bad.issues.some((i) => i.field === 'takeProfit' && i.level === 'error')).toBe(true);
  });
});

describe('calculateTrade — invalid input never leaks bad numbers', () => {
  const cases: Array<[string, TradeInput]> = [
    ['zero account', { ...baseLong, accountSize: 0 }],
    ['negative account', { ...baseLong, accountSize: -5000 }],
    ['zero risk', { ...baseLong, riskPercent: 0 }],
    ['risk above 100%', { ...baseLong, riskPercent: 150 }],
    ['zero entry', { ...baseLong, entry: 0 }],
    ['negative entry', { ...baseLong, entry: -50 }],
    ['zero stop', { ...baseLong, stopLoss: 0 }],
    ['stop equals entry', { ...baseLong, stopLoss: 50 }],
    ['stop above entry on a long', { ...baseLong, stopLoss: 52 }],
    ['target below entry on a long', { ...baseLong, takeProfit: 44 }],
    ['NaN account', { ...baseLong, accountSize: Number.NaN }],
    ['NaN entry', { ...baseLong, entry: Number.NaN }],
    ['Infinite stop', { ...baseLong, stopLoss: Number.POSITIVE_INFINITY }],
    ['absurd account size', { ...baseLong, accountSize: 1e15 }],
  ];

  it.each(cases)('%s is rejected', (_label, input) => {
    const result = calculateTrade(input);
    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.level === 'error')).toBe(true);
  });

  it.each(cases)('%s produces only finite numbers', (_label, input) => {
    const result = calculateTrade(input);
    for (const [key, value] of Object.entries(result)) {
      if (typeof value === 'number') {
        expect(Number.isFinite(value), `${key} should be finite`).toBe(true);
      }
    }
  });
});

describe('calculateTrade — edge and extreme values', () => {
  it('handles a missing take profit without producing reward figures', () => {
    const result = calculateTrade({ ...baseLong, takeProfit: null });
    expect(result.valid).toBe(true);
    expect(result.positionSize).toBe(50);
    expect(result.riskRewardRatio).toBeNull();
    expect(result.potentialProfit).toBeNull();
    expect(result.breakEvenWinRate).toBeNull();
  });

  it('handles sub-penny prices without losing precision', () => {
    const result = calculateTrade({
      accountSize: 5000,
      riskPercent: 1,
      direction: 'long',
      entry: 0.00085,
      stopLoss: 0.0008,
      takeProfit: 0.001,
    });
    expect(result.valid).toBe(true);
    expect(result.riskPerUnit).toBeCloseTo(0.00005, 10);
    expect(result.positionSize).toBeCloseTo(1_000_000, 4);
  });

  it('handles very high priced instruments', () => {
    const result = calculateTrade({
      accountSize: 250000,
      riskPercent: 0.5,
      direction: 'long',
      entry: 62000,
      stopLoss: 60500,
      takeProfit: 68000,
    });
    expect(result.valid).toBe(true);
    expect(result.maxRisk).toBe(1250);
    expect(result.positionSize).toBeCloseTo(0.8333333, 6);
    expect(result.positionSizeWhole).toBe(0);
  });

  it('warns when the position needs more capital than the account holds', () => {
    const result = calculateTrade({
      accountSize: 10000,
      riskPercent: 2,
      direction: 'long',
      entry: 100,
      stopLoss: 99.5,
      takeProfit: 102,
    });
    expect(result.valid).toBe(true);
    expect(result.accountExposurePercent).toBeGreaterThan(100);
    expect(result.issues.some((i) => i.field === 'exposure' && i.level === 'warning')).toBe(true);
  });

  it('warns, but still calculates, when risk per trade is aggressive', () => {
    const result = calculateTrade({ ...baseLong, riskPercent: 10 });
    expect(result.valid).toBe(true);
    expect(result.maxRisk).toBe(1000);
    expect(result.issues.some((i) => i.field === 'riskPercent' && i.level === 'warning')).toBe(true);
  });

  it('rounds whole units down and reports the smaller real risk', () => {
    const result = calculateTrade({
      accountSize: 10000,
      riskPercent: 1,
      direction: 'long',
      entry: 50,
      stopLoss: 47,
      takeProfit: 59,
    });
    expect(result.positionSize).toBeCloseTo(33.3333333, 6);
    expect(result.positionSizeWhole).toBe(33);
    expect(result.riskAtWholeUnits).toBeCloseTo(99, 10);
    expect(result.riskAtWholeUnits).toBeLessThanOrEqual(result.maxRisk);
  });

  it('keeps the risk/reward ratio invariant to account size', () => {
    const small = calculateTrade({ ...baseLong, accountSize: 500 });
    const large = calculateTrade({ ...baseLong, accountSize: 5_000_000 });
    expect(small.riskRewardRatio).toBe(large.riskRewardRatio);
  });

  it('doubles position size when the stop distance is halved', () => {
    const wide = calculateTrade({ ...baseLong, stopLoss: 48 });
    const tight = calculateTrade({ ...baseLong, stopLoss: 49 });
    expect(tight.positionSize).toBe(wide.positionSize * 2);
  });
});

describe('calculateTrade — contract multiplier (futures)', () => {
  it('defaults the multiplier to 1 when omitted, matching stock/crypto math exactly', () => {
    const withMultiplier = calculateTrade({ ...baseLong, contractMultiplier: 1 });
    const without = calculateTrade(baseLong);
    expect(withMultiplier).toEqual(without);
  });

  it('ignores a zero or negative multiplier rather than dividing by it', () => {
    const zero = calculateTrade({ ...baseLong, contractMultiplier: 0 });
    const negative = calculateTrade({ ...baseLong, contractMultiplier: -50 });
    const baseline = calculateTrade(baseLong);
    expect(zero.positionSize).toBe(baseline.positionSize);
    expect(negative.positionSize).toBe(baseline.positionSize);
  });

  it('scales dollar risk per unit by the multiplier, e.g. an ES-style $50/point contract', () => {
    // 2 points of price risk x $50/point = $100 real risk per contract.
    const result = calculateTrade({ ...baseLong, contractMultiplier: 50 });
    expect(result.riskPerUnit).toBe(2); // raw price distance, unaffected
    expect(result.dollarRiskPerUnit).toBe(100);
  });

  it('shrinks position size as the multiplier grows, keeping total risk at maxRisk', () => {
    // $100 max risk / $100 dollar risk per contract = exactly 1 contract.
    const result = calculateTrade({ ...baseLong, contractMultiplier: 50 });
    expect(result.positionSize).toBe(1);
    expect(result.potentialLoss).toBeCloseTo(result.maxRisk, 10);
  });

  it('scales position value (notional) and potential profit by the multiplier too', () => {
    const result = calculateTrade({ ...baseLong, contractMultiplier: 50 });
    // 1 contract x $50 entry x 50 multiplier.
    expect(result.positionValue).toBe(2500);
    // 1 contract x 6 points reward x 50 multiplier.
    expect(result.potentialProfit).toBe(300);
  });

  it('leaves the risk/reward ratio and break-even win rate unchanged by the multiplier', () => {
    const noMultiplier = calculateTrade(baseLong);
    const withMultiplier = calculateTrade({ ...baseLong, contractMultiplier: 50 });
    expect(withMultiplier.riskRewardRatio).toBe(noMultiplier.riskRewardRatio);
    expect(withMultiplier.breakEvenWinRate).toBe(noMultiplier.breakEvenWinRate);
  });
});

describe('validateTrade', () => {
  it('returns no issues for a clean trade', () => {
    expect(validateTrade(baseLong)).toHaveLength(0);
  });

  it('accepts a cleared take profit', () => {
    expect(validateTrade({ ...baseLong, takeProfit: undefined })).toHaveLength(0);
  });

  it('collects several errors at once', () => {
    const issues = validateTrade({
      accountSize: 0,
      riskPercent: 0,
      direction: 'long',
      entry: 0,
      stopLoss: 0,
    });
    expect(issues.filter((i) => i.level === 'error').length).toBeGreaterThanOrEqual(4);
  });
});

describe('ladderGeometry', () => {
  it('places the stop below the entry on a long', () => {
    const geometry = ladderGeometry({ direction: 'long', entry: 50, stopLoss: 48, takeProfit: 56 });
    expect(geometry).not.toBeNull();
    expect(geometry!.stopPct).toBeLessThan(geometry!.entryPct);
    expect(geometry!.targetPct!).toBeGreaterThan(geometry!.entryPct);
  });

  it('places the stop above the entry on a short', () => {
    const geometry = ladderGeometry({ direction: 'short', entry: 50, stopLoss: 52, takeProfit: 44 });
    expect(geometry).not.toBeNull();
    expect(geometry!.stopPct).toBeGreaterThan(geometry!.entryPct);
    expect(geometry!.targetPct!).toBeLessThan(geometry!.entryPct);
  });

  it('keeps every marker inside the frame', () => {
    const geometry = ladderGeometry({ direction: 'long', entry: 50, stopLoss: 48, takeProfit: 56 });
    for (const value of [geometry!.entryPct, geometry!.stopPct, geometry!.targetPct!]) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });

  it('returns null when the trade is not drawable', () => {
    expect(ladderGeometry({ direction: 'long', entry: 50, stopLoss: 50 })).toBeNull();
    expect(ladderGeometry({ direction: 'long', entry: 50, stopLoss: 52 })).toBeNull();
    expect(ladderGeometry({ direction: 'long', entry: Number.NaN, stopLoss: 48 })).toBeNull();
  });

  it('ignores a target on the wrong side rather than drawing it', () => {
    const geometry = ladderGeometry({ direction: 'long', entry: 50, stopLoss: 48, takeProfit: 40 });
    expect(geometry).not.toBeNull();
    expect(geometry!.targetPct).toBeNull();
  });
});

describe('expectedValue', () => {
  it('computes a positive edge', () => {
    expect(expectedValue({ winRatePercent: 40, averageWin: 300, averageLoss: 100 })).toBeCloseTo(60, 10);
  });

  it('computes a negative edge', () => {
    expect(expectedValue({ winRatePercent: 30, averageWin: 100, averageLoss: 100 })).toBeCloseTo(-40, 10);
  });

  it('rejects impossible win rates', () => {
    expect(expectedValue({ winRatePercent: 120, averageWin: 100, averageLoss: 100 })).toBeNull();
    expect(expectedValue({ winRatePercent: -1, averageWin: 100, averageLoss: 100 })).toBeNull();
  });
});
