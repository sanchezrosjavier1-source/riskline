import { describe, expect, it } from 'vitest';
import {
  CONTRACT_SPECS,
  findContract,
  formatCoinSize,
  formatSatoshis,
  LOT_UNITS,
  lotsFromUnits,
  PIP_SIZES,
  pipsBetween,
  pointValue,
  priceDistanceFromPips,
  riskPerContract,
  riskPerPip,
  SATOSHIS_PER_COIN,
  ticksBetween,
  toSatoshis,
} from './market-units';

describe('forex pips', () => {
  it('counts pips on a standard pair', () => {
    // 1.0850 down to 1.0800 is 50 pips.
    expect(pipsBetween(1.085, 1.08, 0.0001)).toBeCloseTo(50, 6);
  });

  it('counts pips on a yen pair, where a pip is a hundredth', () => {
    // 159.60 down to 159.10 is 50 pips, not 5,000.
    expect(pipsBetween(159.6, 159.1, 0.01)).toBeCloseTo(50, 6);
  });

  it('is direction-agnostic, because a short stop sits above the entry', () => {
    expect(pipsBetween(1.08, 1.085, 0.0001)).toBeCloseTo(50, 6);
  });

  it('refuses an impossible pip size rather than returning Infinity', () => {
    expect(pipsBetween(1.085, 1.08, 0)).toBeNull();
    expect(pipsBetween(1.085, 1.08, -0.0001)).toBeNull();
    expect(pipsBetween(Number.NaN, 1.08, 0.0001)).toBeNull();
  });

  it('converts pips back into a price distance', () => {
    expect(priceDistanceFromPips(50, 0.0001)).toBeCloseTo(0.005, 10);
    expect(priceDistanceFromPips(50, 0.01)).toBeCloseTo(0.5, 10);
    expect(priceDistanceFromPips(50, 0)).toBeNull();
  });

  it('round-trips pips to price and back', () => {
    const distance = priceDistanceFromPips(37, 0.0001)!;
    expect(pipsBetween(1.1 + distance, 1.1, 0.0001)).toBeCloseTo(37, 6);
  });

  it('splits the risk budget evenly across the stop, in any account currency', () => {
    // $100 of risk spread over 50 pips is $2 a pip — no exchange rate involved.
    expect(riskPerPip(100, 50)).toBeCloseTo(2, 10);
    expect(riskPerPip(250, 25)).toBeCloseTo(10, 10);
  });

  it('has no answer for a zero-pip stop instead of dividing by zero', () => {
    expect(riskPerPip(100, 0)).toBeNull();
    expect(riskPerPip(100, null)).toBeNull();
    expect(riskPerPip(Number.NaN, 50)).toBeNull();
  });

  it('offers exactly the two pip sizes that exist in practice', () => {
    expect(PIP_SIZES.map((p) => p.value)).toEqual([0.0001, 0.01]);
  });
});

describe('forex lots', () => {
  it('converts units into standard, mini and micro lots', () => {
    expect(lotsFromUnits(100_000, 'standard')).toBe(1);
    expect(lotsFromUnits(100_000, 'mini')).toBe(10);
    expect(lotsFromUnits(100_000, 'micro')).toBe(100);
  });

  it('handles fractional lots, which is what most retail sizing produces', () => {
    expect(lotsFromUnits(20_000, 'standard')).toBeCloseTo(0.2, 10);
  });

  it('uses the conventional lot sizes', () => {
    expect(LOT_UNITS).toEqual({ standard: 100_000, mini: 10_000, micro: 1_000 });
  });

  it('returns null for an unusable unit count', () => {
    expect(lotsFromUnits(Number.NaN, 'standard')).toBeNull();
  });
});

describe('futures contracts', () => {
  it('derives point value from tick value and tick size', () => {
    // An ES point is four ticks at $12.50 each.
    expect(pointValue(findContract('ES')!)).toBeCloseTo(50, 10);
    expect(pointValue(findContract('NQ')!)).toBeCloseTo(20, 10);
    expect(pointValue(findContract('CL')!)).toBeCloseTo(1000, 10);
  });

  it('keeps every published spec internally consistent', () => {
    for (const spec of CONTRACT_SPECS) {
      const value = pointValue(spec);
      expect(value, spec.symbol).not.toBeNull();
      expect(Number.isFinite(value as number), spec.symbol).toBe(true);
      expect(spec.tickSize, spec.symbol).toBeGreaterThan(0);
      expect(spec.tickValue, spec.symbol).toBeGreaterThan(0);
    }
  });

  it('prices a micro contract at a tenth of its full-size sibling', () => {
    expect(pointValue(findContract('MES')!)! * 10).toBeCloseTo(pointValue(findContract('ES')!)!, 10);
    expect(pointValue(findContract('MNQ')!)! * 10).toBeCloseTo(pointValue(findContract('NQ')!)!, 10);
  });

  it('counts ticks across a stop', () => {
    // Two ES points is eight ticks.
    expect(ticksBetween(5000, 4998, 0.25)).toBeCloseTo(8, 10);
    // Ten cents of crude is ten ticks.
    expect(ticksBetween(78.0, 77.9, 0.01)).toBeCloseTo(10, 6);
  });

  it('prices the stop per contract', () => {
    // Eight ES ticks at $12.50 is $100 of risk on one contract.
    expect(riskPerContract(8, 12.5)).toBeCloseTo(100, 10);
    expect(riskPerContract(null, 12.5)).toBeNull();
  });

  it('agrees with the point-based maths already used by the calculator', () => {
    const es = findContract('ES')!;
    const ticks = ticksBetween(5000, 4990, es.tickSize)!;
    const viaTicks = riskPerContract(ticks, es.tickValue)!;
    const viaPoints = 10 * pointValue(es)!;
    expect(viaTicks).toBeCloseTo(viaPoints, 10);
  });

  it('rejects a zero tick size instead of returning Infinity', () => {
    expect(ticksBetween(5000, 4990, 0)).toBeNull();
  });

  it('looks contracts up case-insensitively and returns undefined for unknowns', () => {
    expect(findContract('es')?.symbol).toBe('ES');
    expect(findContract('NOPE')).toBeUndefined();
  });

  it('gives every contract a unique symbol', () => {
    const symbols = CONTRACT_SPECS.map((s) => s.symbol);
    expect(new Set(symbols).size).toBe(symbols.length);
  });
});

describe('crypto precision', () => {
  it('converts coins to satoshis', () => {
    expect(toSatoshis(1)).toBe(SATOSHIS_PER_COIN);
    expect(toSatoshis(0.0001)).toBe(10_000);
    expect(toSatoshis(0.00000001)).toBe(1);
  });

  it('rounds to whole satoshis, since a fraction of one cannot be traded', () => {
    expect(toSatoshis(0.000000014)).toBe(1);
    expect(Number.isInteger(toSatoshis(0.123456789))).toBe(true);
  });

  it('never shows a real position as 0.00', () => {
    expect(formatCoinSize(0.00042)).toBe('0.00042');
    expect(formatCoinSize(0.00000123)).toBe('0.00000123');
    expect(formatCoinSize(0.0639)).toBe('0.0639');
  });

  it('keeps larger sizes readable rather than drowning them in decimals', () => {
    expect(formatCoinSize(12.5)).toBe('12.5');
    expect(formatCoinSize(1234.5)).toBe('1,234.5');
  });

  it('groups satoshis so a big number stays legible', () => {
    expect(formatSatoshis(2_450_000)).toBe('2,450,000');
  });

  it('refuses to print a broken number', () => {
    expect(formatCoinSize(Number.NaN)).toBe('—');
    expect(formatCoinSize(null)).toBe('—');
    expect(toSatoshis(Number.NaN)).toBeNull();
    expect(formatSatoshis(null)).toBe('—');
  });
});
