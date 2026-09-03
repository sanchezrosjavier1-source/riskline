import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MarketTable } from '@/components/markets/MarketTable';
import { AdSlot } from '@/components/layout/AdSlot';
import { fetchAllQuotes } from '@/lib/markets';
import { SITE, absoluteUrl } from '@/lib/site';

/** One upstream request serves every visitor for this window. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Live Crypto & Forex Prices — Size Any Trade',
  description:
    'Live crypto prices and official ECB forex rates, with a one-click jump into the risk calculator so you can size a position on any of them in seconds.',
  alternates: { canonical: '/markets' },
  openGraph: {
    title: `Markets — ${SITE.name}`,
    description: 'Live crypto prices and official ECB forex reference rates, built for sizing trades.',
    url: absoluteUrl('/markets'),
  },
};

export default async function MarketsPage() {
  const { crypto, forex } = await fetchAllQuotes();
  const quotes = [...crypto.quotes, ...forex.quotes];
  const bothFailed = crypto.failed && forex.failed;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Markets',
    description: 'Live crypto prices and official ECB forex reference rates.',
    url: absoluteUrl('/markets'),
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Markets', href: '/markets' }]} />

      <header className="max-w-[62ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Markets
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          Crypto and the seven major currency pairs, with the price you need to size a position.
          Pick anything here and it drops straight into the risk calculator.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
        <div className="min-w-0">
          {bothFailed ? (
            <div className="panel-flat flex items-start gap-3 border-warn/25 bg-warn-wash p-5">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-warn" aria-hidden />
              <div>
                <p className="text-sm font-medium text-ink">Prices are unavailable right now</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  The market data sources did not respond. The{' '}
                  <Link href="/calculator" className="text-accent-soft hover:text-accent">
                    risk calculator
                  </Link>{' '}
                  still works — type the price in yourself.
                </p>
              </div>
            </div>
          ) : (
            <MarketTable quotes={quotes} />
          )}

          {/* ------------------------------------------------------ provenance */}
          <div className="mt-6 space-y-2 rounded-xl border border-line bg-base-sunken/40 p-4">
            <p className="label">Where these numbers come from</p>
            <p className="text-xs leading-relaxed text-ink-faint">
              <span className="text-ink-muted">Crypto</span> — CoinGecko, refreshed at most once a
              minute. Treat it as a reference price, not an execution price.
            </p>
            <p className="text-xs leading-relaxed text-ink-faint">
              <span className="text-ink-muted">Forex</span> — the European Central Bank&rsquo;s daily
              reference rates, published once each business day. They are the official mid-market
              rates, not live dealing prices.
            </p>
            <p className="flex items-start gap-1.5 text-xs leading-relaxed text-ink-ghost">
              <Clock size={12} aria-hidden className="mt-0.5 shrink-0" />
              We deliberately do not show live stock prices: redistributing them publicly requires an
              exchange licence, and we would rather show you nothing than something mislabelled.
            </p>
          </div>

          <AdSlot id="markets-index" className="mt-8" />
        </div>

        {/* -------------------------------------------------------- sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="panel-flat p-5">
            <h2 className="text-sm font-medium text-ink">Size a trade on any of these</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              A price on its own tells you nothing about how much to buy. The calculator turns it
              into a position size you can actually risk.
            </p>
            <Link
              href="/calculator"
              className="mt-4 flex h-10 items-center justify-center rounded-xl bg-accent text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
            >
              Open Risk Calculator
            </Link>
          </div>

          <div className="panel-flat mt-3 p-5">
            <h2 className="label mb-3">Concepts worth knowing</h2>
            <ul className="space-y-0.5">
              {[
                { slug: 'spread', label: 'Spread' },
                { slug: 'liquidity', label: 'Liquidity' },
                { slug: 'volatility', label: 'Volatility' },
                { slug: 'currency-pair', label: 'Currency Pair' },
                { slug: 'major-pair', label: 'Major Pair' },
              ].map((term) => (
                <li key={term.slug}>
                  <Link
                    href={`/trading-dictionary/${term.slug}`}
                    className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-ink-ghost transition-colors group-hover:bg-accent" />
                    <span className="truncate text-xs text-ink-muted transition-colors group-hover:text-ink">
                      {term.label}
                    </span>
                    <ArrowRight
                      size={11}
                      aria-hidden
                      className="ml-auto shrink-0 text-ink-ghost opacity-0 transition-all duration-200 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <AdSlot id="markets-sidebar" className="mt-3" />
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
