import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AdSlot } from '@/components/layout/AdSlot';
import { ALL_HISTORY_EVENTS, getHistoryCategories } from '@/lib/history';
import { SITE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Market History — 24 Events That Explain Modern Risk',
  description:
    'From Black Monday to the 2025 tariff shock: 24 landmark market events, chronologically, each explaining what happened and the risk-management lesson still worth knowing today.',
  alternates: { canonical: '/market-history' },
  openGraph: {
    title: `Market History — ${SITE.name}`,
    description:
      '24 landmark market events from 1987 to 2025, each with the risk-management lesson behind it.',
    url: absoluteUrl('/market-history'),
  },
};

export default function MarketHistoryIndexPage() {
  const categories = getHistoryCategories();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Market History — Landmark Trading and Market Events',
    itemListElement: ALL_HISTORY_EVENTS.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: event.title,
      url: absoluteUrl(`/market-history/${event.slug}`),
    })),
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Market History', href: '/market-history' }]}
      />

      <header className="max-w-[62ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Market History
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          Twenty-four moments, from 1987 to 2025, where leverage, liquidity or trust broke down in a
          way that moved markets. Each one is a closed, verifiable event — not news that will need
          updating — with the risk-management lesson still worth knowing spelled out at the end.
        </p>
      </header>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {categories.map((category) => (
          <span
            key={category}
            className="rounded-lg border border-line bg-base-raised/40 px-3 py-1.5 text-xs text-ink-muted"
          >
            {category}
          </span>
        ))}
      </div>

      {/* -------------------------------------------------------------- timeline */}
      <ol className="mt-9 space-y-2.5">
        {ALL_HISTORY_EVENTS.map((event) => (
          <li key={event.slug}>
            <Link
              href={`/market-history/${event.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-line bg-base-raised/40 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-base-raised/70 sm:flex-row sm:items-center"
            >
              <div className="flex shrink-0 items-center gap-3 sm:w-24 sm:flex-col sm:items-start sm:gap-1">
                <span className="display-num text-2xl leading-none text-ink-ghost transition-colors group-hover:text-accent">
                  {event.year}
                </span>
                <span className="inline-flex items-center gap-1 text-2xs text-ink-ghost sm:hidden">
                  <Calendar size={10} aria-hidden />
                  {event.date}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-line px-2 py-0.5 text-2xs text-ink-faint">
                    {event.category}
                  </span>
                </div>
                <h2 className="mt-1.5 text-[0.9375rem] font-semibold leading-snug text-ink transition-colors group-hover:text-accent-soft">
                  {event.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-faint">
                  {event.dek}
                </p>
              </div>

              <ArrowRight
                size={15}
                aria-hidden
                className="hidden shrink-0 text-ink-ghost transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
              />
            </Link>
          </li>
        ))}
      </ol>

      <AdSlot id="market-history-index" className="mt-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
