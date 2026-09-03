import type { Metadata } from 'next';
import { PAGE_SEO } from '@/data/page-seo';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AdSlot } from '@/components/layout/AdSlot';
import { ALL_GUIDES, getReadingMinutes } from '@/lib/guides';
import { SITE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: PAGE_SEO.guides.title,
  description: PAGE_SEO.guides.description,
  alternates: { canonical: '/guides' },
  openGraph: {
    title: `Trading Guides — ${SITE.name}`,
    description:
      'In-depth guides on position sizing, risk management, leverage and drawdown, each with a live calculator built in.',
    url: absoluteUrl('/guides'),
  },
};

export default function GuidesIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'StopSize Trading Guides',
    itemListElement: ALL_GUIDES.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: absoluteUrl(`/guides/${guide.slug}`),
    })),
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }]} />

      <header className="max-w-[60ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Guides
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          The dictionary covers one concept at a time. These guides go longer — working through a
          full idea start to finish, with real numbers, worked examples, and a live calculator
          built into the page.
        </p>
      </header>

      <div className="mt-9 grid gap-3 sm:grid-cols-2">
        {ALL_GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col rounded-2xl border border-line bg-base-raised/40 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-base-raised/70"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-lg border border-line bg-base-sunken/50 px-2.5 py-1 text-2xs text-ink-muted">
                {guide.topic}
              </span>
              <span className="inline-flex items-center gap-1.5 text-2xs text-ink-ghost">
                <Clock size={11} aria-hidden />
                {getReadingMinutes(guide)} min
              </span>
            </div>

            <h2 className="mt-4 text-[1.0625rem] font-semibold leading-snug text-ink transition-colors group-hover:text-accent-soft">
              {guide.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-faint">{guide.dek}</p>

            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft">
              Read the guide
              <ArrowRight
                size={13}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>

      <AdSlot id="guides-index" className="mt-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
