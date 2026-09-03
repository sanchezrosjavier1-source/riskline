import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ArrowUpRight, RefreshCw } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AdSlot } from '@/components/layout/AdSlot';
import { fetchNews, NEWS_COUNT, relativeTime } from '@/lib/news';
import { DISCLAIMER, SITE, absoluteUrl } from '@/lib/site';

/** Headlines go stale fast, so this refreshes far more often than once a week. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'This Week in Markets — 9 Headlines That Moved Prices',
  description:
    'The week&rsquo;s market headlines from established finance desks, refreshed automatically, each linked back to the publisher.',
  alternates: { canonical: '/news' },
  openGraph: {
    title: `Market News — ${SITE.name}`,
    description: 'The week&rsquo;s market headlines, refreshed automatically.',
    url: absoluteUrl('/news'),
  },
};

export default async function NewsPage() {
  const { items, failed, fetchedAt } = await fetchNews();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'This week in markets',
    url: absoluteUrl('/news'),
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }]} />

      <header className="max-w-[62ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          This week in markets
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          {NEWS_COUNT} headlines from established finance desks, updated on their schedule rather
          than ours. Every one links back to the publisher — read it there, not here.
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-lg border border-line bg-base-sunken/40 px-3 py-2 text-2xs text-ink-ghost">
          <RefreshCw size={12} aria-hidden />
          Refreshes itself hourly. Nobody writes or curates this page.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
        <div className="min-w-0">
          {failed || items.length === 0 ? (
            <div className="panel-flat flex items-start gap-3 border-warn/25 bg-warn-wash p-5">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-warn" aria-hidden />
              <div>
                <p className="text-sm font-medium text-ink">No headlines right now</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  The news feeds did not respond. Nothing else on the site depends on them — the{' '}
                  <Link href="/calculator" className="text-accent-soft hover:text-accent">
                    calculator
                  </Link>{' '}
                  and{' '}
                  <Link href="/markets" className="text-accent-soft hover:text-accent">
                    markets
                  </Link>{' '}
                  are unaffected.
                </p>
              </div>
            </div>
          ) : (
            <ol className="space-y-2.5">
              {items.map((story, index) => (
                <li key={story.url}>
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="group flex gap-4 rounded-2xl border border-line bg-base-raised/40 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-base-raised/70"
                  >
                    <span className="display-num shrink-0 text-2xs text-ink-ghost">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-start gap-2">
                        <span className="text-pretty text-sm font-medium leading-snug text-ink transition-colors group-hover:text-accent-soft">
                          {story.title}
                        </span>
                        <ArrowUpRight
                          size={13}
                          aria-hidden
                          className="mt-0.5 shrink-0 text-ink-ghost transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </span>

                      {story.summary && (
                        <span className="mt-1.5 line-clamp-2 block text-xs leading-relaxed text-ink-faint">
                          {story.summary}
                        </span>
                      )}

                      <span className="mt-2 block text-2xs text-ink-ghost">
                        {story.source} · {relativeTime(story.publishedAt, fetchedAt)}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          )}

          <p className="mt-6 text-2xs leading-relaxed text-ink-ghost">
            Headlines and summaries are the publishers&rsquo; own, taken from the feeds they publish
            for this purpose, and every link goes to their site. StopSize does not host, rewrite or
            rank the articles, and nothing here is a recommendation to buy or sell anything.
          </p>

          <AdSlot id="news-index" className="mt-8" />
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="panel-flat p-5">
            <h2 className="text-sm font-medium text-ink">A headline is not a trade</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              By the time news reaches a feed the price has usually moved. If a story does change
              your mind, size the position before you act on it — not after.
            </p>
            <Link
              href="/calculator"
              className="mt-4 flex h-10 items-center justify-center rounded-xl bg-accent text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
            >
              Open Risk Calculator
            </Link>
          </div>

          <div className="panel-flat mt-3 p-5">
            <h2 className="text-sm font-medium text-ink">What actually moved</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              Prices say more than headlines. See what crypto and the major pairs did today.
            </p>
            <Link
              href="/markets"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent-soft transition-colors hover:text-accent"
            >
              Open markets
              <ArrowUpRight size={12} aria-hidden />
            </Link>
          </div>

          <div className="panel-flat mt-3 p-5">
            <h2 className="text-sm font-medium text-ink">When news broke markets</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              Twenty-four times a headline turned into a lesson about risk, from 1987 to 2025.
            </p>
            <Link
              href="/market-history"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent-soft transition-colors hover:text-accent"
            >
              Market history
              <ArrowUpRight size={12} aria-hidden />
            </Link>
          </div>
        </aside>
      </div>

      <p className="mt-8 max-w-[76ch] text-2xs leading-relaxed text-ink-ghost">{DISCLAIMER}</p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
