import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Diagram } from '@/components/diagrams/Diagram';
import { TermWidget } from '@/components/dictionary/TermWidget';
import { AdSlot } from '@/components/layout/AdSlot';
import {
  getAdjacentGuides,
  getAllGuideSlugs,
  getGuide,
  getGuideRelatedTerms,
  getReadingMinutes,
  getRelatedGuides,
} from '@/lib/guides';
import { buildDescription, buildTitle } from '@/lib/seo';
import { SITE, absoluteUrl } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: 'Guide not found' };

  const title = buildTitle(guide.shortTitle ?? guide.title, []);
  const description = buildDescription(guide.dek);

  return {
    title,
    description,
    keywords: [guide.topic.toLowerCase(), guide.title.toLowerCase()],
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: 'article',
      title: `${guide.title} â€” ${SITE.name}`,
      description: guide.dek,
      url: absoluteUrl(`/guides/${guide.slug}`),
      siteName: SITE.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.title} â€” ${SITE.name}`,
      description: guide.dek,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedTerms = getGuideRelatedTerms(guide);
  const relatedGuides = getRelatedGuides(guide);
  const { previous, next } = getAdjacentGuides(guide.slug);
  const readingMinutes = getReadingMinutes(guide);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.dek,
    url: absoluteUrl(`/guides/${guide.slug}`),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
    articleSection: guide.topic,
    inLanguage: 'en-US',
  };

  return (
    <article className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
        <div className="min-w-0">
          {/* ------------------------------------------------------------ header */}
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/guides"
                className="rounded-lg border border-line bg-base-raised/50 px-2.5 py-1 text-2xs text-ink-muted transition-colors hover:border-accent/30 hover:text-accent-soft"
              >
                {guide.topic}
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-2xs text-ink-ghost">
                <Clock size={10} aria-hidden />
                {readingMinutes} min read
              </span>
            </div>

            <h1 className="mt-4 text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
              {guide.title}
            </h1>

            <p className="mt-3 max-w-[62ch] text-pretty text-lg leading-relaxed text-ink-muted">
              {guide.dek}
            </p>
          </header>

          {/* --------------------------------------------------------- takeaways */}
          <div className="mt-7 rounded-xl border border-accent/20 bg-accent-wash p-5">
            <p className="label mb-3">Key takeaways</p>
            <ul className="space-y-2">
              {guide.keyTakeaways.map((point) => (
                <li key={point.slice(0, 40)} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm leading-relaxed text-ink-muted">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="prose-riskline mt-8 max-w-[68ch]">
            {guide.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {/* ------------------------------------------------------------ sections */}
          <div className="mt-10 space-y-10">
            {guide.sections.map((section) => (
              <section key={section.heading} aria-labelledby={section.heading}>
                <h2 id={section.heading} className="text-lg font-semibold tracking-tight text-ink">
                  {section.heading}
                </h2>
                <div className="prose-riskline mt-3 max-w-[68ch]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>

                {section.table && (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-line">
                    <table className="w-full min-w-[22rem] text-left">
                      <caption className="sr-only">{section.table.caption}</caption>
                      <thead>
                        <tr className="border-b border-line bg-base-sunken/60">
                          {section.table.headers.map((header) => (
                            <th key={header} scope="col" className="label px-4 py-3">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {section.table.rows.map((row) => (
                          <tr key={row[0]} className="transition-colors hover:bg-white/[0.02]">
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cell}
                                className={`display-num px-4 py-3 text-sm ${
                                  cellIndex === 0 ? 'text-ink' : 'text-accent-soft'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.diagram && (
                  <div className="mt-4">
                    <Diagram kind={section.diagram} />
                  </div>
                )}

                {section.widget && (
                  <div className="mt-4">
                    <TermWidget kind={section.widget} />
                  </div>
                )}
              </section>
            ))}
          </div>

          <AdSlot id={`guide-${guide.slug}-mid`} className="mt-10" />

          {/* --------------------------------------------------------- conclusion */}
          <div className="prose-riskline mt-10 max-w-[68ch] border-t border-line pt-8">
            {guide.conclusion.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {/* ------------------------------------------------------------ tools */}
          {guide.tools && guide.tools.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-medium text-ink">Put it to work</h2>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {guide.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-accent/25 bg-accent-wash px-4 py-4 transition-all duration-300 hover:border-accent/50"
                  >
                    <span className="text-sm font-medium text-accent-soft">{tool.label}</span>
                    <ArrowRight
                      size={15}
                      aria-hidden
                      className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* -------------------------------------------------------- navigation */}
          <nav
            aria-label="More guides"
            className="mt-12 grid gap-2.5 border-t border-line pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/guides/${previous.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-line bg-base-raised/30 p-4 transition-all duration-300 hover:border-line-strong hover:bg-base-raised/60"
              >
                <ArrowLeft
                  size={15}
                  aria-hidden
                  className="shrink-0 text-ink-ghost transition-all duration-200 group-hover:-translate-x-0.5 group-hover:text-accent"
                />
                <span className="min-w-0">
                  <span className="label block">Previous guide</span>
                  <span className="mt-0.5 block truncate text-sm text-ink">{previous.title}</span>
                </span>
              </Link>
            ) : (
              <div aria-hidden />
            )}

            {next && (
              <Link
                href={`/guides/${next.slug}`}
                className="group flex items-center justify-end gap-3 rounded-xl border border-line bg-base-raised/30 p-4 text-right transition-all duration-300 hover:border-line-strong hover:bg-base-raised/60"
              >
                <span className="min-w-0">
                  <span className="label block">Next guide</span>
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
              <h2 className="label mb-3">Concepts covered</h2>
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

          {relatedGuides.length > 0 && (
            <div className="panel-flat mt-3 p-5">
              <h2 className="label mb-3">More guides</h2>
              <ul className="space-y-0.5">
                {relatedGuides.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/guides/${item.slug}`}
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
            <h2 className="text-sm font-medium text-ink">Size your own trade</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              Take these ideas into the full calculator and see the arithmetic on your own numbers.
            </p>
            <Link
              href="/calculator"
              className="mt-4 flex h-10 items-center justify-center rounded-xl bg-accent text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
            >
              Open Risk Calculator
            </Link>
          </div>

          <AdSlot id={`guide-${guide.slug}-sidebar`} className="mt-3" />
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}

