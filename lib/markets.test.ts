import { describe, expect, it } from 'vitest';
import {
  allAssetIds,
  buildLinePoints,
  derivePairPrice,
  filterQuotes,
  findAsset,
  FOREX_PAIRS,
  latestTwoDates,
  pairId,
  pairName,
  pairSymbol,
  percentChange,
  rangeConfig,
  seriesChangePercent,
  sortQuotes,
} from './markets';
import type { MarketQuote, PricePoint } from '@/types/market';

/** Real ECB-shaped rates: units of X per 1 USD. */
const USD_RATES = { EUR: 0.86371, GBP: 0.7377, JPY: 159.6, CHF: 0.79, AUD: 1.52, CAD: 1.36, NZD: 1.66 };

function quote(overrides: Partial<MarketQuote>): MarketQuote {
  return {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    assetClass: 'crypto',
    price: 78000,
    changePercent: 1.5,
    high24h: null,
    low24h: null,
    volume24h: 1000,
    marketCap: null,
    freshness: 'delayed',
    source: 'CoinGecko',
    asOf: null,
    ...overrides,
  };
}

describe('forex pair derivation', () => {
  it('reads a USD-base pair straight off the rate', () => {
    expect(derivePairPrice(USD_RATES, { base: 'USD', quote: 'JPY' })).toBeCloseTo(159.6, 10);
  });

  it('inverts a USD-quote pair', () => {
    // 1 EUR buys 1 / 0.86371 dollars.
    expect(derivePairPrice(USD_RATES, { base: 'EUR', quote: 'USD' })).toBeCloseTo(1.157796, 5);
  });

  it('derives a cross rate that does not involve USD', () => {
    // EUR/GBP = (GBP per USD) / (EUR per USD).
    expect(derivePairPrice(USD_RATES, { base: 'EUR', quote: 'GBP' })).toBeCloseTo(
      USD_RATES.GBP / USD_RATES.EUR,
      10,
    );
  });

  it('returns null instead of a wrong number when a rate is missing', () => {
    expect(derivePairPrice(USD_RATES, { base: 'USD', quote: 'SEK' })).toBeNull();
    expect(derivePairPrice(USD_RATES, { base: 'SEK', quote: 'USD' })).toBeNull();
  });

  it('returns null for unusable rates rather than dividing by zero', () => {
    expect(derivePairPrice({ EUR: 0 }, { base: 'EUR', quote: 'USD' })).toBeNull();
    expect(derivePairPrice({ EUR: Number.NaN }, { base: 'EUR', quote: 'USD' })).toBeNull();
    expect(derivePairPrice({ EUR: -1 }, { base: 'EUR', quote: 'USD' })).toBeNull();
  });

  it('prices every configured major pair from a single USD-based snapshot', () => {
    for (const pair of FOREX_PAIRS) {
      const price = derivePairPrice(USD_RATES, pair);
      expect(price, pairSymbol(pair)).not.toBeNull();
      expect(Number.isFinite(price as number), pairSymbol(pair)).toBe(true);
      expect(price as number).toBeGreaterThan(0);
    }
  });

  it('labels pairs with URL-safe ids and readable names', () => {
    expect(pairId({ base: 'EUR', quote: 'USD' })).toBe('eur-usd');
    expect(pairSymbol({ base: 'EUR', quote: 'USD' })).toBe('EUR/USD');
    expect(pairName({ base: 'EUR', quote: 'USD' })).toBe('Euro / US Dollar');
  });

  it('gives every configured pair a unique id', () => {
    const ids = FOREX_PAIRS.map(pairId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('percentChange', () => {
  it('computes a rise and a fall', () => {
    expect(percentChange(100, 110)).toBeCloseTo(10, 10);
    expect(percentChange(100, 90)).toBeCloseTo(-10, 10);
  });

  it('returns null rather than Infinity or NaN', () => {
    expect(percentChange(0, 10)).toBeNull();
    expect(percentChange(null, 10)).toBeNull();
    expect(percentChange(10, null)).toBeNull();
    expect(percentChange(Number.NaN, 10)).toBeNull();
  });
});

describe('latestTwoDates', () => {
  it('picks the two most recent sessions regardless of key order', () => {
    const { current, previous } = latestTwoDates({
      '2026-09-01': {},
      '2026-08-28': {},
      '2026-09-02': {},
    });
    expect(current).toBe('2026-09-02');
    expect(previous).toBe('2026-09-01');
  });

  it('handles a single session and an empty series without throwing', () => {
    expect(latestTwoDates({ '2026-09-02': {} })).toEqual({
      current: '2026-09-02',
      previous: null,
    });
    expect(latestTwoDates({})).toEqual({ current: null, previous: null });
  });
});

describe('screener sorting and filtering', () => {
  const quotes = [
    quote({ id: 'a', symbol: 'BTC', name: 'Bitcoin', price: 78000, changePercent: 1.5, volume24h: 300 }),
    quote({ id: 'b', symbol: 'ETH', name: 'Ethereum', price: 2400, changePercent: -2.5, volume24h: 100 }),
    quote({ id: 'c', symbol: 'SOL', name: 'Solana', price: 150, changePercent: 8, volume24h: 200 }),
  ];

  it('sorts by change descending — the "top gainers" view', () => {
    expect(sortQuotes(quotes, 'change', 'desc').map((q) => q.symbol)).toEqual(['SOL', 'BTC', 'ETH']);
  });

  it('sorts by change ascending — the "top losers" view', () => {
    expect(sortQuotes(quotes, 'change', 'asc').map((q) => q.symbol)).toEqual(['ETH', 'BTC', 'SOL']);
  });

  it('sorts by volume, price and name', () => {
    expect(sortQuotes(quotes, 'volume', 'desc')[0].symbol).toBe('BTC');
    expect(sortQuotes(quotes, 'price', 'asc')[0].symbol).toBe('SOL');
    expect(sortQuotes(quotes, 'name', 'asc').map((q) => q.symbol)).toEqual(['BTC', 'ETH', 'SOL']);
  });

  it('sorts missing values last rather than treating them as zero', () => {
    const withNull = [...quotes, quote({ id: 'd', symbol: 'XXX', changePercent: null })];
    expect(sortQuotes(withNull, 'change', 'desc').at(-1)!.symbol).toBe('XXX');
  });

  it('never mutates the array it was given', () => {
    const original = quotes.map((q) => q.symbol);
    sortQuotes(quotes, 'price', 'desc');
    expect(quotes.map((q) => q.symbol)).toEqual(original);
  });

  it('matches on symbol, name and id, case-insensitively', () => {
    expect(filterQuotes(quotes, 'eth').map((q) => q.symbol)).toEqual(['ETH']);
    expect(filterQuotes(quotes, 'BITCOIN').map((q) => q.symbol)).toEqual(['BTC']);
    expect(filterQuotes(quotes, 'sol').map((q) => q.symbol)).toEqual(['SOL']);
  });

  it('returns everything for an empty query and nothing for no match', () => {
    expect(filterQuotes(quotes, '   ')).toHaveLength(3);
    expect(filterQuotes(quotes, 'zzzz')).toHaveLength(0);
  });
});

describe('chart geometry', () => {
  const series = (prices: number[]): PricePoint[] =>
    prices.map((price, index) => ({ t: index * 86_400_000, price }));

  it('maps the lowest price to the bottom and the highest to the top', () => {
    // SVG y grows downward, so the high must produce the *smaller* y.
    const points = buildLinePoints(series([10, 20]), 100, 100, 0)!;
    const [first, last] = points.split(' ').map((p) => p.split(',').map(Number));
    expect(first[1]).toBe(100);
    expect(last[1]).toBe(0);
  });

  it('spreads points evenly across the width', () => {
    const xs = buildLinePoints(series([1, 2, 3]), 100, 50, 0)!
      .split(' ')
      .map((p) => Number(p.split(',')[0]));
    expect(xs).toEqual([0, 50, 100]);
  });

  it('respects padding on both axes', () => {
    const points = buildLinePoints(series([10, 20]), 100, 100, 10)!;
    const coords = points.split(' ').map((p) => p.split(',').map(Number));
    for (const [x, y] of coords) {
      expect(x).toBeGreaterThanOrEqual(10);
      expect(x).toBeLessThanOrEqual(90);
      expect(y).toBeGreaterThanOrEqual(10);
      expect(y).toBeLessThanOrEqual(90);
    }
  });

  it('draws a flat series down the middle instead of dividing by zero', () => {
    const points = buildLinePoints(series([50, 50, 50]), 100, 100, 0)!;
    for (const pair of points.split(' ')) {
      const y = Number(pair.split(',')[1]);
      expect(Number.isFinite(y)).toBe(true);
      expect(y).toBe(100);
    }
  });

  it('returns null when there is nothing meaningful to draw', () => {
    expect(buildLinePoints([], 100, 100)).toBeNull();
    expect(buildLinePoints(series([10]), 100, 100)).toBeNull();
    expect(buildLinePoints([{ t: 0, price: Number.NaN }, { t: 1, price: 5 }], 100, 100)).toBeNull();
  });

  it('measures change from the first point to the last', () => {
    expect(seriesChangePercent(series([100, 150]))).toBeCloseTo(50, 10);
    expect(seriesChangePercent(series([100]))).toBeNull();
    expect(seriesChangePercent([])).toBeNull();
  });
});

describe('asset routing', () => {
  it('resolves a crypto id and a forex pair slug', () => {
    expect(findAsset('bitcoin')).toEqual({ kind: 'crypto', id: 'bitcoin' });
    expect(findAsset('eur-usd')).toEqual({ kind: 'forex', pair: { base: 'EUR', quote: 'USD' } });
  });

  it('returns null for anything unknown, so the route can 404', () => {
    expect(findAsset('not-a-real-asset')).toBeNull();
    expect(findAsset('')).toBeNull();
  });

  it('lists every asset exactly once', () => {
    const ids = allAssetIds();
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain('bitcoin');
    expect(ids).toContain('usd-jpy');
  });

  it('every listed asset resolves back to something renderable', () => {
    for (const id of allAssetIds()) {
      expect(findAsset(id), id).not.toBeNull();
    }
  });

  it('falls back to a sensible range for a missing or bogus value', () => {
    expect(rangeConfig('1y').days).toBe(365);
    expect(rangeConfig(undefined).value).toBe('1m');
    expect(rangeConfig('nonsense').value).toBe('1m');
  });
});
