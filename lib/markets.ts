import type {
  AssetClass,
  MarketQuote,
  MarketSnapshot,
  PriceHistory,
  PricePoint,
} from '@/types/market';

/**
 * Market data lives behind two keyless, publicly redistributable sources:
 *
 * - Crypto: CoinGecko's public API. Freely usable and redistributable.
 * - Forex: Frankfurter, which serves the European Central Bank's published
 *   daily reference rates. Public data, no licence needed.
 *
 * Real-time *equity* prices are deliberately absent: redistributing them on a
 * public, ad-supported page requires an exchange display licence, which no
 * free tier grants. Adding stocks later means paying for that licence or
 * showing clearly-labelled delayed data — not quietly mislabelling it.
 *
 * Every fetch is cached by Next so one upstream request serves every visitor
 * for the revalidation window, which keeps us inside free-tier limits no
 * matter how much traffic the page gets.
 */

const CRYPTO_REVALIDATE_SECONDS = 60;
const FOREX_REVALIDATE_SECONDS = 60 * 60 * 6;

export const CRYPTO_IDS = [
  'bitcoin',
  'ethereum',
  'solana',
  'ripple',
  'binancecoin',
  'dogecoin',
  'cardano',
  'chainlink',
  'avalanche-2',
  'polkadot',
] as const;

export interface ForexPair {
  base: string;
  quote: string;
}

/** The seven major pairs, which is what a retail forex trader actually trades. */
export const FOREX_PAIRS: ForexPair[] = [
  { base: 'EUR', quote: 'USD' },
  { base: 'GBP', quote: 'USD' },
  { base: 'USD', quote: 'JPY' },
  { base: 'USD', quote: 'CHF' },
  { base: 'AUD', quote: 'USD' },
  { base: 'USD', quote: 'CAD' },
  { base: 'NZD', quote: 'USD' },
];

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CHF: 'Swiss Franc',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  NZD: 'New Zealand Dollar',
};

// ---------------------------------------------------------------- pure logic

/** URL-safe id for a pair, e.g. { EUR, USD } -> "eur-usd". */
export function pairId(pair: ForexPair): string {
  return `${pair.base}-${pair.quote}`.toLowerCase();
}

export function pairSymbol(pair: ForexPair): string {
  return `${pair.base}/${pair.quote}`;
}

export function pairName(pair: ForexPair): string {
  const base = CURRENCY_NAMES[pair.base] ?? pair.base;
  const quote = CURRENCY_NAMES[pair.quote] ?? pair.quote;
  return `${base} / ${quote}`;
}

/**
 * Converts USD-based reference rates (units of X per 1 USD) into the price of
 * an arbitrary major pair. Returns null rather than a wrong number whenever
 * the rate needed is missing or unusable.
 */
export function derivePairPrice(
  usdRates: Record<string, number>,
  pair: ForexPair,
): number | null {
  if (pair.base === 'USD') {
    const rate = usdRates[pair.quote];
    return typeof rate === 'number' && Number.isFinite(rate) && rate > 0 ? rate : null;
  }
  if (pair.quote === 'USD') {
    const rate = usdRates[pair.base];
    if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) return null;
    return 1 / rate;
  }
  // Cross rate: X/Y = (Y per USD) / (X per USD) inverted appropriately.
  const baseRate = usdRates[pair.base];
  const quoteRate = usdRates[pair.quote];
  if (![baseRate, quoteRate].every((r) => typeof r === 'number' && Number.isFinite(r) && r > 0)) {
    return null;
  }
  return quoteRate / baseRate;
}

/** Percent change from `previous` to `current`, null when it cannot be computed. */
export function percentChange(previous: number | null, current: number | null): number | null {
  if (previous === null || current === null) return null;
  if (!Number.isFinite(previous) || !Number.isFinite(current) || previous === 0) return null;
  const change = ((current - previous) / previous) * 100;
  return Number.isFinite(change) ? change : null;
}

/**
 * Picks the two most recent dates out of a Frankfurter time series so a daily
 * change can be computed. Returns nulls when the series is too short.
 */
export function latestTwoDates(rates: Record<string, unknown>): {
  current: string | null;
  previous: string | null;
} {
  const dates = Object.keys(rates).sort();
  return {
    current: dates.length > 0 ? dates[dates.length - 1] : null,
    previous: dates.length > 1 ? dates[dates.length - 2] : null,
  };
}

/** Sorts quotes for the screener. Kept pure so the ordering is testable. */
export type SortKey = 'name' | 'price' | 'change' | 'volume';

export function sortQuotes(
  quotes: MarketQuote[],
  key: SortKey,
  direction: 'asc' | 'desc',
): MarketQuote[] {
  const factor = direction === 'asc' ? 1 : -1;
  return [...quotes].sort((a, b) => {
    let diff = 0;
    if (key === 'name') diff = a.symbol.localeCompare(b.symbol);
    else if (key === 'price') diff = a.price - b.price;
    else if (key === 'change') diff = (a.changePercent ?? -Infinity) - (b.changePercent ?? -Infinity);
    else diff = (a.volume24h ?? -Infinity) - (b.volume24h ?? -Infinity);
    return diff * factor;
  });
}

/** Substring match over symbol and name, case-insensitive. */
export function filterQuotes(quotes: MarketQuote[], query: string): MarketQuote[] {
  const q = query.trim().toLowerCase();
  if (!q) return quotes;
  return quotes.filter(
    (quote) =>
      quote.symbol.toLowerCase().includes(q) ||
      quote.name.toLowerCase().includes(q) ||
      quote.id.toLowerCase().includes(q),
  );
}

// ------------------------------------------------------------------- fetching

interface CoinGeckoMarket {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  high_24h: number | null;
  low_24h: number | null;
  total_volume: number | null;
  market_cap: number | null;
  last_updated: string | null;
}

export async function fetchCryptoQuotes(): Promise<MarketSnapshot> {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc' +
    `&per_page=${CRYPTO_IDS.length}&page=1&ids=${CRYPTO_IDS.join(',')}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: CRYPTO_REVALIDATE_SECONDS },
      headers: { accept: 'application/json' },
    });
    if (!response.ok) return { quotes: [], failed: true };

    const data = (await response.json()) as CoinGeckoMarket[];
    if (!Array.isArray(data)) return { quotes: [], failed: true };

    const quotes = data
      .filter((coin) => typeof coin?.current_price === 'number' && Number.isFinite(coin.current_price))
      .map<MarketQuote>((coin) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        assetClass: 'crypto',
        price: coin.current_price,
        changePercent: coin.price_change_percentage_24h ?? null,
        high24h: coin.high_24h ?? null,
        low24h: coin.low_24h ?? null,
        volume24h: coin.total_volume ?? null,
        marketCap: coin.market_cap ?? null,
        freshness: 'delayed',
        source: 'CoinGecko',
        asOf: coin.last_updated ?? null,
      }));

    return { quotes, failed: quotes.length === 0 };
  } catch {
    return { quotes: [], failed: true };
  }
}

interface FrankfurterSeries {
  base: string;
  rates: Record<string, Record<string, number>>;
}

export async function fetchForexQuotes(): Promise<MarketSnapshot> {
  const symbols = Array.from(
    new Set(FOREX_PAIRS.flatMap((pair) => [pair.base, pair.quote]).filter((c) => c !== 'USD')),
  ).join(',');

  // A ten-day window always contains at least two published sessions, even
  // across weekends and bank holidays.
  const end = new Date();
  const start = new Date(end.getTime() - 10 * 24 * 60 * 60 * 1000);
  const iso = (date: Date) => date.toISOString().slice(0, 10);
  const url = `https://api.frankfurter.dev/v1/${iso(start)}..${iso(end)}?base=USD&symbols=${symbols}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: FOREX_REVALIDATE_SECONDS },
      headers: { accept: 'application/json' },
    });
    if (!response.ok) return { quotes: [], failed: true };

    const data = (await response.json()) as FrankfurterSeries;
    if (!data?.rates) return { quotes: [], failed: true };

    const { current, previous } = latestTwoDates(data.rates);
    if (!current) return { quotes: [], failed: true };

    const currentRates = data.rates[current] ?? {};
    const previousRates = previous ? (data.rates[previous] ?? {}) : {};

    const quotes = FOREX_PAIRS.map((pair): MarketQuote | null => {
      const price = derivePairPrice(currentRates, pair);
      if (price === null) return null;
      return {
        id: pairId(pair),
        symbol: pairSymbol(pair),
        name: pairName(pair),
        assetClass: 'forex',
        price,
        changePercent: percentChange(derivePairPrice(previousRates, pair), price),
        high24h: null,
        low24h: null,
        volume24h: null,
        marketCap: null,
        freshness: 'end-of-day',
        source: 'European Central Bank',
        asOf: current,
      };
    }).filter((quote): quote is MarketQuote => quote !== null);

    return { quotes, failed: quotes.length === 0 };
  } catch {
    return { quotes: [], failed: true };
  }
}

export async function fetchAllQuotes(): Promise<{
  crypto: MarketSnapshot;
  forex: MarketSnapshot;
}> {
  const [crypto, forex] = await Promise.all([fetchCryptoQuotes(), fetchForexQuotes()]);
  return { crypto, forex };
}

// -------------------------------------------------------------------- history

export const CHART_RANGES = [
  { value: '1d', label: '1D', days: 1 },
  { value: '1w', label: '1W', days: 7 },
  { value: '1m', label: '1M', days: 30 },
  { value: '3m', label: '3M', days: 90 },
  { value: '6m', label: '6M', days: 180 },
  { value: '1y', label: '1Y', days: 365 },
] as const;

export type ChartRange = (typeof CHART_RANGES)[number]['value'];

export function rangeConfig(value: string | undefined) {
  return CHART_RANGES.find((range) => range.value === value) ?? CHART_RANGES[2];
}

/**
 * Turns price points into an SVG polyline. Pure, so the geometry is testable
 * without rendering anything. Returns null when there is nothing to draw
 * rather than a degenerate path.
 */
export function buildLinePoints(
  points: PricePoint[],
  width: number,
  height: number,
  pad = 4,
): string | null {
  if (points.length < 2) return null;

  const prices = points.map((point) => point.price).filter((p) => Number.isFinite(p));
  if (prices.length < 2) return null;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  // A perfectly flat series still deserves a line, drawn down the middle.
  const span = max - min || 1;
  const innerWidth = width - pad * 2;
  const innerHeight = height - pad * 2;

  return points
    .map((point, index) => {
      const x = pad + (index / (points.length - 1)) * innerWidth;
      const y = pad + (1 - (point.price - min) / span) * innerHeight;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}

/** First-to-last change across a series, used for the chart's own label. */
export function seriesChangePercent(points: PricePoint[]): number | null {
  if (points.length < 2) return null;
  return percentChange(points[0].price, points[points.length - 1].price);
}

export async function fetchCryptoHistory(id: string, days: number): Promise<PriceHistory> {
  const interval = days > 1 ? '&interval=daily' : '';
  const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(
    id,
  )}/market_chart?vs_currency=usd&days=${days}${interval}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: CRYPTO_REVALIDATE_SECONDS * 5 },
      headers: { accept: 'application/json' },
    });
    if (!response.ok) return { points: [], failed: true, granularity: 'daily' };

    const data = (await response.json()) as { prices?: Array<[number, number]> };
    const points = (data.prices ?? [])
      .filter((entry) => Array.isArray(entry) && Number.isFinite(entry[1]))
      .map<PricePoint>(([t, price]) => ({ t, price }));

    return {
      points,
      failed: points.length === 0,
      granularity: days > 1 ? 'daily' : 'intraday',
    };
  } catch {
    return { points: [], failed: true, granularity: 'daily' };
  }
}

export async function fetchForexHistory(pair: ForexPair, days: number): Promise<PriceHistory> {
  const symbols = [pair.base, pair.quote].filter((c) => c !== 'USD').join(',');
  const end = new Date();
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  const iso = (date: Date) => date.toISOString().slice(0, 10);
  const url = `https://api.frankfurter.dev/v1/${iso(start)}..${iso(end)}?base=USD&symbols=${symbols}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: FOREX_REVALIDATE_SECONDS },
      headers: { accept: 'application/json' },
    });
    if (!response.ok) return { points: [], failed: true, granularity: 'daily' };

    const data = (await response.json()) as FrankfurterSeries;
    if (!data?.rates) return { points: [], failed: true, granularity: 'daily' };

    const points = Object.keys(data.rates)
      .sort()
      .map<PricePoint | null>((date) => {
        const price = derivePairPrice(data.rates[date] ?? {}, pair);
        return price === null ? null : { t: Date.parse(date), price };
      })
      .filter((point): point is PricePoint => point !== null);

    return { points, failed: points.length === 0, granularity: 'daily' };
  } catch {
    return { points: [], failed: true, granularity: 'daily' };
  }
}

/** Looks a slug up against both asset lists. Returns null for anything unknown. */
export function findAsset(
  id: string,
): { kind: 'crypto'; id: string } | { kind: 'forex'; pair: ForexPair } | null {
  const crypto = CRYPTO_IDS.find((candidate) => candidate === id);
  if (crypto) return { kind: 'crypto', id: crypto };

  const pair = FOREX_PAIRS.find((candidate) => pairId(candidate) === id);
  if (pair) return { kind: 'forex', pair };

  return null;
}

/** Every asset that gets its own page — used for static generation and the sitemap. */
export function allAssetIds(): string[] {
  return [...CRYPTO_IDS, ...FOREX_PAIRS.map(pairId)];
}
