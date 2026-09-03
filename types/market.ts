export type AssetClass = 'crypto' | 'forex';

/**
 * How current the number actually is. Shown next to every price because
 * "free market data" is almost never real-time, and pretending otherwise
 * on a site people size real trades from would be dishonest.
 */
export type Freshness = 'live' | 'delayed' | 'end-of-day';

export interface MarketQuote {
  /** Stable id used in URLs, e.g. "bitcoin" or "eur-usd". */
  id: string;
  /** Display ticker, e.g. "BTC" or "EUR/USD". */
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  /** Percent move over the comparison window. Null when the source can't supply it. */
  changePercent: number | null;
  high24h: number | null;
  low24h: number | null;
  volume24h: number | null;
  marketCap: number | null;
  freshness: Freshness;
  /** Human label for where this number came from — shown in the UI. */
  source: string;
  /** ISO date/time the source last updated this number. */
  asOf: string | null;
}

export interface PricePoint {
  /** Unix milliseconds. */
  t: number;
  price: number;
}

export interface PriceHistory {
  points: PricePoint[];
  failed: boolean;
  /** How granular the underlying data actually is, stated rather than implied. */
  granularity: 'intraday' | 'daily';
}

export interface MarketSnapshot {
  quotes: MarketQuote[];
  /** True when the upstream call failed and the section should degrade gracefully. */
  failed: boolean;
}
