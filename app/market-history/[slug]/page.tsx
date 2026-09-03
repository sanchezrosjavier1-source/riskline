import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Lightbulb } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AdSlot } from '@/components/layout/AdSlot';
import {
  getAdjacentHistoryEvents,
  getAllHistorySlugs,
  getHistoryEvent,
  getHistoryRelatedTerms,
  getRelatedHistoryEvents,
} from '@/lib/history';
import { buildDescription, buildTitle } from '@/lib/seo';
import { SITE, absoluteUrl } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllHistorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getHistoryEvent(slug);
  if (!event) return { title: 'Event not found' };

  const title = buildTitle(event.shortTitle ?? event.title, []);
  const description = buildDescription(event.dek);

  return {
    title,
    description,
    keywords: [event.category.toLowerCase(), event.title.toLowerCase(), `${event.year} market history`],
    alternates: { canonical: `/market-history/${event.slug}` },
    openGraph: {
      type: 'article',
      title: `${event.title} — ${SITE.name}`,
      description: event.dek,
      url: absoluteUrl(`/market-history/${event.slug}`),
      siteName: SITE.name,
      images: [{ url: absoluteUrl(event.image.src) }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} — ${SITE.name}`,
      description: event.dek,
      images: [absoluteUrl(event.image.src)],
    },
  };
}

export default async function HistoryEventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getHistoryEvent(slug);
  if (!event) notFound();

  const relatedTerms = getHistoryRelatedTerms(event);
  const relatedEvents = getRelatedHistoryEvents(event);
  const { previous, next } = getAdjacentHistoryEvents(event.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: event.title,
    description: event.dek,
    url: absoluteUrl(`/market-history/${event.slug}`),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: absoluteUrl(`/market-history/${event.slug}`),
    articleSection: event.category,
    inLanguage: 'en-US',
    image: absoluteUrl(event.image.src),
  };

  return (
    <article className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Market History', href: '/market-history' },
          { label: event.title, href: `/market-history/${event.slug}` },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
        <div className="min-w-0">
          {/* ------------------------------------------------------------ header */}
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/market-history"
                className="rounded-lg border border-line bg-base-raised/50 px-2.5 py-1 text-2xs text-ink-muted transition-colors hover:border-accent/30 hover:text-accent-soft"
              >
                {event.category}
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-2xs text-ink-ghost">
                <Calendar size={10} aria-hidden />
                {event.date}
              </span>
            </div>

            <h1 className="mt-4 text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
              {event.title}
            </h1>

            <p className="mt-3 max-w-[62ch] text-pretty text-lg leading-relaxed text-ink-muted">
              {event.dek}
            </p>
          </header>

          {/* ------------------------------------------------------------- image */}
          <figure className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
            <Image
              src={event.image.src}
              alt={event.image.alt}
              fill
              sizes="(min-width: 1024px) 55rem, 100vw"
              className="object-cover"
              priority
            />
          </figure>

          {/* -------------------------------------------------------------- facts */}
          <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {event.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-line bg-base-raised/40 p-4"
              >
                <dt className="label">{fact.label}</dt>
                <dd className="display-num mt-1.5 text-lg leading-tight text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {/* --------------------------------------------------------- what happened */}
          <section aria-labelledby="what-happened" className="mt-10">
            <h2 id="what-happened" className="text-lg font-semibold tracking-tight text-ink">
              What happened
            </h2>
            <div className="prose-riskline mt-3 max-w-[68ch]">
              {event.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <AdSlot id={`history-${event.slug}-mid`} className="mt-10" />

          {/* -------------------------------------------------------------- lesson */}
          <section aria-labelledby="lesson" className="mt-10">
            <h2 id="lesson" className="text-lg font-semibold tracking-tight text-ink">
              Why it still matters
            </h2>
            <div className="mt-3 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent-wash p-5">
              <Lightbulb size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <div className="prose-riskline max-w-[62ch]">
                {event.lesson.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------- navigation */}
          <nav
            aria-label="More market history"
            className="mt-12 grid gap-2.5 border-t border-line pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/market-history/${previous.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-line bg-base-raised/30 p-4 transition-all duration-300 hover:border-line-strong hover:bg-base-raised/60"
              >
                <ArrowLeft
                  size={15}
                  aria-hidden
                  className="shrink-0 text-ink-ghost transition-all duration-200 group-hover:-translate-x-0.5 group-hover:text-accent"
                />
                <span className="min-w-0">
                  <span className="label block">{previous.year} · Earlier</span>
                  <span className="mt-0.5 block truncate text-sm text-ink">{previous.title}</span>
                </span>
              </Link>
            ) : (
              <div aria-hidden />
            )}

            {next && (
              <Link
                href={`/market-history/${next.slug}`}
                className="group flex items-center justify-end gap-3 rounded-xl border border-line bg-base-raised/30 p-4 text-right transition-all duration-300 hover:border-line-strong hover:bg-base-raised/60"
              >
                <span className="min-w-0">
                  <span className="label block">{next.year} · Later</span>
                  <span className="mt-0.5 block truncate text-sm text-ink">{next.title}</span>
                </span>
                <ArrowRight
                  size={15}
                  aria-hidden
                  className="shrink-0 text-ink-ghost transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            )}
          </nav>
        </div>

        {/* ------------------------------------------------------------- sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          {relatedTerms.length > 0 && (
            <div className="panel-flat p-5">
              <h2 className="label mb-3">Concepts this illustrates</h2>
              <ul className="space-y-0.5">
                {relatedTerms.map((term) => (
                  <li key={term.slug}>
                    <Link
                      href={`/trading-dictionary/${term.slug}`}
                      className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-ink-ghost transition-colors group-hover:bg-accent" />
                      <span className="truncate text-xs text-ink-muted transition-colors group-hover:text-ink">
                        {term.term}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedEvents.length > 0 && (
            <div className="panel-flat mt-3 p-5">
              <h2 className="label mb-3">More market history</h2>
              <ul className="space-y-0.5">
                {relatedEvents.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/market-history/${item.slug}`}
                      className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-ink-ghost transition-colors group-hover:bg-accent" />
                      <span className="truncate text-xs text-ink-muted transition-colors group-hover:text-ink">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="panel-flat mt-3 p-5">
            <h2 className="text-sm font-medium text-ink">See it in your own numbers</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              Every risk concept in this article is one you can size for yourself before it happens
              to you.
            </p>
            <Link
              href="/calculator"
              className="mt-4 flex h-10 items-center justify-center rounded-xl bg-accent text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
            >
              Open Risk Calculator
            </Link>
          </div>

          <AdSlot id={`history-${event.slug}-sidebar`} className="mt-3" />
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
