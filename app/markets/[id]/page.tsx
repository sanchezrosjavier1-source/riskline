import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PriceChart } from '@/components/markets/PriceChart';
import { AdSlot } from '@/components/layout/AdSlot';
import {
  allAssetIds,
  CHART_RANGES,
  fetchCryptoHistory,
  fetchCryptoQuotes,
  fetchForexHistory,
  fetchForexQuotes,
  findAsset,
  pairId,
  pairName,
  pairSymbol,
  rangeConfig,
} from '@/lib/markets';
import { formatPercent } from '@/lib/format';
import { SITE, absoluteUrl } from '@/lib/site';
import type { MarketQuote, PriceHistory } from '@/types/market';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return allAssetIds().map((id) => ({ id }));
}

/** Display name and ticker for an asset id, without needing a network call. */
function labelsFor(id: string): { name: string; symbol: string } | null {
  const asset = findAsset(id);
  if (!asset) return null;
  if (asset.kind === 'forex') {
    return { name: pairName(asset.pair), symbol: pairSymbol(asset.pair) };
  }
  const name = asset.id.charAt(0).toUpperCase() + asset.id.slice(1).replace(/-/g, ' ');
  return { name, symbol: name };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const labels = labelsFor(id);
  if (!labels) return { title: 'Asset not found' };

  const title = `${labels.symbol} Price Chart & Position Size Calculator`;
  const description = `${labels.name} price history plus a risk calculator that turns the current price into a position size you can actually risk.`;

  return {
    title,
    description,
    alternates: { canonical: `/markets/${id}` },
    openGraph: {
      title: `${labels.symbol} — ${SITE.name}`,
      description,
      url: absoluteUrl(`/markets/${id}`),
    },
  };
}

function formatPrice(price: number, isForex: boolean): string {
  if (isForex) {
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

export default async function AssetPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  const asset = findAsset(id);
  if (!asset) notFound();

  const range = rangeConfig(typeof query.range === 'string' ? query.range : undefined);
  const isForex = asset.kind === 'forex';

  // ECB publishes once per business day, so a one-day forex window would be a
  // single point. The range list is trimmed rather than showing an empty chart.
  const ranges = isForex ? CHART_RANGES.filter((r) => r.days > 1) : CHART_RANGES;
  const effective = isForex && range.days <= 1 ? rangeConfig('1m') : range;

  const [history, snapshot]: [PriceHistory, { quotes: MarketQuote[] }] = await Promise.all([
    asset.kind === 'crypto'
      ? fetchCryptoHistory(asset.id, effective.days)
      : fetchForexHistory(asset.pair, effective.days),
    asset.kind === 'crypto' ? fetchCryptoQuotes() : fetchForexQuotes(),
  ]);

  const quote = snapshot.quotes.find(
    (candidate) => candidate.id === (asset.kind === 'crypto' ? asset.id : pairId(asset.pair)),
  );

  const labels = labelsFor(id)!;
  const up = (quote?.changePercent ?? 0) >= 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${labels.symbol} price`,
    url: absoluteUrl(`/markets/${id}`),
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Markets', href: '/markets' },
          { label: labels.symbol, href: `/markets/${id}` },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
        <div className="min-w-0">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
                {labels.symbol}
              </h1>
              <p className="mt-1 text-sm text-ink-muted">{labels.name}</p>
            </div>

            {quote && (
              <div className="text-right">
                <span className="display-num block text-2xl text-ink">
                  {formatPrice(quote.price, isForex)}
                </span>
                {quote.changePercent !== null && (
                  <span
                    className={`display-num mt-1 inline-flex items-center gap-1 text-xs ${
                      up ? 'text-reward-soft' : 'text-risk-soft'
                    }`}
                  >
                    {up ? <TrendingUp size={12} aria-hidden /> : <TrendingDown size={12} aria-hidden />}
                    {up ? '+' : ''}
                    {formatPercent(quote.changePercent)}
                  </span>
                )}
              </div>
            )}
          </header>

          {/* ----------------------------------------------------------- ranges */}
          <div className="mt-6 flex flex-wrap gap-1.5 rounded-xl border border-line bg-base-sunken/60 p-1.5">
            {ranges.map((option) => (
              <Link
                key={option.value}
                href={`/markets/${id}?range=${option.value}`}
                scroll={false}
                aria-current={effective.value === option.value ? 'page' : undefined}
                className={`rounded-lg px-3 py-1.5 text-xs transition-all duration-200 ${
                  effective.value === option.value
                    ? 'bg-accent-wash text-accent-soft'
                    : 'text-ink-faint hover:bg-white/[0.03] hover:text-ink-muted'
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>

          <div className="panel-flat mt-3 p-5">
            <PriceChart
              history={history}
              assetClass={asset.kind === 'crypto' ? 'crypto' : 'forex'}
              label={labels.symbol}
            />
          </div>

          <p className="mt-3 text-2xs leading-relaxed text-ink-ghost">
            {isForex
              ? 'European Central Bank daily reference rates — official mid-market rates published once each business day, not live dealing prices.'
              : 'CoinGecko reference prices. Treat them as context for sizing, not as an execution price.'}
          </p>

          <AdSlot id={`market-${id}`} className="mt-8" />
        </div>

        {/* -------------------------------------------------------- sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="panel-flat p-5">
            <h2 className="text-sm font-medium text-ink">Size a trade on {labels.symbol}</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              The price is only half the question. The other half is how much of it you can afford
              to be wrong about.
            </p>
            {quote && (
              <Link
                href={`/calculator?entry=${quote.price}&market=${asset.kind}`}
                className="mt-4 flex h-10 items-center justify-center gap-1.5 rounded-xl bg-accent text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
              >
                Size it at {formatPrice(quote.price, isForex)}
                <ArrowRight size={13} aria-hidden />
              </Link>
            )}
          </div>

          <div className="panel-flat mt-3 p-5">
            <h2 className="label mb-3">Other markets</h2>
            <ul className="space-y-0.5">
              {allAssetIds()
                .filter((other) => other !== id)
                .slice(0, 6)
                .map((other) => {
                  const otherLabels = labelsFor(other);
                  if (!otherLabels) return null;
                  return (
                    <li key={other}>
                      <Link
                        href={`/markets/${other}`}
                        className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-ink-ghost transition-colors group-hover:bg-accent" />
                        <span className="truncate text-xs text-ink-muted transition-colors group-hover:text-ink">
                          {otherLabels.symbol}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              <li>
                <Link
                  href="/markets"
                  className="group flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-accent-soft transition-colors hover:bg-white/[0.04]"
                >
                  All markets
                  <ArrowRight size={11} aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
