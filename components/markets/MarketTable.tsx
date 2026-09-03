'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, TrendingDown, TrendingUp } from 'lucide-react';
import { filterQuotes, sortQuotes, type SortKey } from '@/lib/markets';
import { formatPercent } from '@/lib/format';
import type { AssetClass, MarketQuote } from '@/types/market';

/**
 * A rate is not a dollar amount, and a $0.42 coin is not a $78,000 one —
 * so precision follows the instrument rather than one global rule.
 */
function formatQuotePrice(quote: MarketQuote): string {
  const { price, assetClass } = quote;
  if (assetClass === 'forex') {
    const decimals = Math.abs(price) >= 50 ? 2 : 4;
    return price.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  const decimals = Math.abs(price) >= 1 ? 2 : 6;
  return `$${price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

const CLASS_FILTERS: Array<{ value: AssetClass | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'forex', label: 'Forex' },
];

const SORTS: Array<{ value: string; label: string; key: SortKey; direction: 'asc' | 'desc' }> = [
  { value: 'gainers', label: 'Gainers', key: 'change', direction: 'desc' },
  { value: 'losers', label: 'Losers', key: 'change', direction: 'asc' },
  { value: 'name', label: 'A–Z', key: 'name', direction: 'asc' },
];

export function MarketTable({ quotes }: { quotes: MarketQuote[] }) {
  const [query, setQuery] = useState('');
  const [assetClass, setAssetClass] = useState<AssetClass | 'all'>('all');
  const [sort, setSort] = useState('gainers');

  const visible = useMemo(() => {
    const sortConfig = SORTS.find((s) => s.value === sort) ?? SORTS[0];
    const byClass =
      assetClass === 'all' ? quotes : quotes.filter((q) => q.assetClass === assetClass);
    return sortQuotes(filterQuotes(byClass, query), sortConfig.key, sortConfig.direction);
  }, [quotes, query, assetClass, sort]);

  return (
    <div>
      {/* ------------------------------------------------------------- search */}
      <div className="relative">
        <Search
          size={15}
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-ghost"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Bitcoin, EUR/USD…"
          aria-label="Search markets"
          className="h-11 w-full rounded-xl border border-line bg-base-sunken/60 pl-10 pr-3 text-sm text-ink placeholder:text-ink-ghost transition-colors hover:border-line-strong focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* ------------------------------------------------------------ filters */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="flex gap-1.5 rounded-xl border border-line bg-base-sunken/60 p-1.5">
          {CLASS_FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={assetClass === option.value}
              onClick={() => setAssetClass(option.value)}
              className={`rounded-lg px-3 py-1.5 text-xs transition-all duration-200 ${
                assetClass === option.value
                  ? 'bg-accent-wash text-accent-soft'
                  : 'text-ink-faint hover:bg-white/[0.03] hover:text-ink-muted'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5 rounded-xl border border-line bg-base-sunken/60 p-1.5">
          {SORTS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={sort === option.value}
              onClick={() => setSort(option.value)}
              className={`rounded-lg px-3 py-1.5 text-xs transition-all duration-200 ${
                sort === option.value
                  ? 'bg-accent-wash text-accent-soft'
                  : 'text-ink-faint hover:bg-white/[0.03] hover:text-ink-muted'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------------- list */}
      {visible.length === 0 ? (
        <p className="mt-6 rounded-xl border border-line bg-base-raised/30 p-6 text-center text-sm text-ink-faint">
          Nothing matches “{query}”.
        </p>
      ) : (
        <ul className="mt-4 space-y-1.5">
          {visible.map((quote) => {
            const up = (quote.changePercent ?? 0) >= 0;
            return (
              <li key={`${quote.assetClass}-${quote.id}`}>
                <div className="group flex items-center gap-3 rounded-xl border border-line bg-base-raised/40 p-3.5 transition-all duration-200 hover:border-line-strong hover:bg-base-raised/70 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="display-num text-sm font-medium text-ink">{quote.symbol}</span>
                      <span className="truncate text-2xs text-ink-ghost">{quote.name}</span>
                    </div>
                    <span className="mt-0.5 block text-2xs text-ink-ghost sm:hidden">
                      {quote.source}
                    </span>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="display-num block text-sm text-ink">
                      {formatQuotePrice(quote)}
                    </span>
                    {quote.changePercent !== null ? (
                      <span
                        className={`display-num mt-0.5 inline-flex items-center gap-1 text-2xs ${
                          up ? 'text-reward-soft' : 'text-risk-soft'
                        }`}
                      >
                        {up ? (
                          <TrendingUp size={10} aria-hidden />
                        ) : (
                          <TrendingDown size={10} aria-hidden />
                        )}
                        {up ? '+' : ''}
                        {formatPercent(quote.changePercent)}
                      </span>
                    ) : (
                      <span className="mt-0.5 block text-2xs text-ink-ghost">—</span>
                    )}
                  </div>

                  <Link
                    href={`/calculator?entry=${quote.price}&market=${quote.assetClass}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-2xs text-ink-muted transition-all duration-200 hover:border-accent/40 hover:bg-accent-wash hover:text-accent-soft"
                  >
                    <span className="hidden sm:inline">Size a trade</span>
                    <span className="sm:hidden">Size</span>
                    <ArrowRight
                      size={11}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
