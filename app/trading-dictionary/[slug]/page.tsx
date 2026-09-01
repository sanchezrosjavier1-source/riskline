import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Diagram } from '@/components/diagrams/Diagram';
import { TermWidget } from '@/components/dictionary/TermWidget';
import { KeepExploring } from '@/components/dictionary/KeepExploring';
import { RecentTermsTracker } from '@/components/dictionary/RecentTermsTracker';
import { AdSlot } from '@/components/layout/AdSlot';
import { CATEGORY_MAP } from '@/data/categories';
import { getAdjacentTerms, getAllSlugs, getRelatedTerms, getTerm } from '@/lib/dictionary';
import { SITE, absoluteUrl } from '@/lib/site';
import { buildDescription, buildTitle } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) return { title: 'Term not found' };

  const category = CATEGORY_MAP[term.category]?.label ?? 'Trading';
  // Only promise a formula when the page actually has one, and fall back to a
  // shorter suffix so long term names do not push the title past the cut-off.
  const title = buildTitle(
    term.term,
    term.formula
      ? [' — Definition, Formula & Example', ' — Definition & Formula', ' — Definition']
      : [' — Definition & Example', ' — Definition'],
  );
  const description = buildDescription(term.short, [
    'Definition, formula, worked example and common mistakes.',
    'Definition, example and the mistakes people make.',
    'Definition and worked example.',
  ]);

  return {
    title,
    description,
    keywords: [
      term.term.toLowerCase(),
      `what is ${term.term.toLowerCase()}`,
      `${term.term.toLowerCase()} definition`,
      ...(term.aliases ?? []),
      `${category.toLowerCase()} trading`,
    ],
    alternates: { canonical: `/trading-dictionary/${term.slug}` },
    openGraph: {
      type: 'article',
      title: `${term.term} — ${SITE.name}`,
      description: term.short,
      url: absoluteUrl(`/trading-dictionary/${term.slug}`),
      siteName: SITE.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${term.term} — ${SITE.name}`,
      description: term.short,
    },
  };
}

export default async function TermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) notFound();

  const category = CATEGORY_MAP[term.category];
  const related = getRelatedTerms(term);
  const { previous, next } = getAdjacentTerms(term.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.short,
    url: absoluteUrl(`/trading-dictionary/${term.slug}`),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Riskline Trading Dictionary',
      url: absoluteUrl('/trading-dictionary'),
    },
    termCode: term.slug,
    ...(term.aliases ? { alternateName: term.aliases } : {}),
    inLanguage: 'en-US',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${term.term.toLowerCase()} in trading?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${term.short} ${term.explanation[0]}`,
        },
      },
      {
        '@type': 'Question',
        name: `Why does ${term.term.toLowerCase()} matter?`,
        acceptedAnswer: { '@type': 'Answer', text: term.whyItMatters },
      },
    ],
  };

  return (
    <article className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <RecentTermsTracker slug={term.slug} />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Trading Dictionary', href: '/trading-dictionary' },
          { label: category?.label ?? 'Terms', href: `/trading-dictionary?category=${term.category}` },
          { label: term.term, href: `/trading-dictionary/${term.slug}` },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
        <div className="min-w-0">
          {/* ------------------------------------------------------------ header */}
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/trading-dictionary?category=${term.category}`}
                className="rounded-lg border border-line bg-base-raised/50 px-2.5 py-1 text-2xs text-ink-muted transition-colors hover:border-accent/30 hover:text-accent-soft"
              >
                {category?.label}
              </Link>
              {term.widget && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent-wash px-2.5 py-1 text-2xs text-accent-soft">
                  <Sparkles size={10} aria-hidden />
                  Interactive
                </span>
              )}
            </div>

            <h1 className="mt-4 text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
              {term.term}
            </h1>

            <p className="mt-3 max-w-[62ch] text-pretty text-lg leading-relaxed text-ink-muted">
              {term.short}
            </p>

            {term.aliases && term.aliases.length > 0 && (
              <p className="mt-3 text-xs text-ink-ghost">
                Also called: {term.aliases.join(' · ')}
              </p>
            )}
          </header>

          <div className="mt-9 space-y-10">
            {/* ------------------------------------------------------ explanation */}
            <section aria-labelledby="explanation">
              <h2 id="explanation" className="text-sm font-medium text-ink">
                In plain language
              </h2>
              <div className="prose-riskline mt-3 max-w-[68ch]">
                {term.explanation.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* --------------------------------------------------------- formula */}
            {term.formula && (
              <section aria-labelledby="formula">
                <h2 id="formula" className="text-sm font-medium text-ink">
                  The formula
                </h2>
                <div className="mt-3 overflow-hidden rounded-xl border border-line bg-base-sunken/50">
                  <div className="border-b border-line px-5 py-4">
                    <p className="label">{term.formula.label}</p>
                    <p className="display-num mt-2 overflow-x-auto text-base text-ink sm:text-lg">
                      {term.formula.expression}
                    </p>
                  </div>
                  {term.formula.legend && (
                    <dl className="divide-y divide-line">
                      {term.formula.legend.map((entry) => (
                        <div
                          key={entry.symbol}
                          className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:gap-4"
                        >
                          <dt className="display-num shrink-0 text-xs text-accent-soft sm:w-[10rem]">
                            {entry.symbol}
                          </dt>
                          <dd className="text-xs leading-relaxed text-ink-faint">{entry.meaning}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </section>
            )}

            {/* ------------------------------------------------------ interactive */}
            {term.widget && (
              <section aria-labelledby="interactive">
                <h2 id="interactive" className="text-sm font-medium text-ink">
                  Change the numbers
                </h2>
                <p className="mt-1.5 max-w-[62ch] text-xs leading-relaxed text-ink-faint">
                  This is the concept as a working tool. Edit any field and watch what moves — that
                  relationship is the thing worth remembering.
                </p>
                <div className="mt-3">
                  <TermWidget kind={term.widget} />
                </div>
              </section>
            )}

            {/* --------------------------------------------------------- diagram */}
            {term.diagram && (
              <section aria-labelledby="diagram">
                <h2 id="diagram" className="text-sm font-medium text-ink">
                  Seen on a chart
                </h2>
                <div className="mt-3">
                  <Diagram kind={term.diagram} />
                </div>
              </section>
            )}

            <AdSlot id={`term-${term.slug}-mid`} />

            {/* -------------------------------------------------- why it matters */}
            <section aria-labelledby="why">
              <h2 id="why" className="text-sm font-medium text-ink">
                Why it matters
              </h2>
              <div className="mt-3 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent-wash p-5">
                <Lightbulb size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <p className="max-w-[62ch] text-sm leading-relaxed text-ink-muted">
                  {term.whyItMatters}
                </p>
              </div>
            </section>

            {/* -------------------------------------------------------- mistakes */}
            <section aria-labelledby="mistakes">
              <h2 id="mistakes" className="text-sm font-medium text-ink">
                Common mistakes
              </h2>
              <ul className="mt-3 space-y-2">
                {term.mistakes.map((mistake) => (
                  <li
                    key={mistake.slice(0, 40)}
                    className="flex items-start gap-3 rounded-xl border border-line bg-base-raised/30 px-4 py-3.5"
                  >
                    <AlertTriangle size={14} className="mt-0.5 shrink-0 text-risk" aria-hidden />
                    <span className="text-sm leading-relaxed text-ink-muted">{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* ------------------------------------------------------------ tools */}
            {term.tools && term.tools.length > 0 && (
              <section aria-labelledby="tools">
                <h2 id="tools" className="text-sm font-medium text-ink">
                  Put it to work
                </h2>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {term.tools.map((tool) => (
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
          </div>

          <KeepExploring previous={previous} next={next} related={related} />
        </div>

        {/* ------------------------------------------------------------- sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="panel-flat p-5">
            <h2 className="label mb-3">Related concepts</h2>
            <ul className="space-y-0.5">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/trading-dictionary/${item.slug}`}
                    className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-ink-ghost transition-colors group-hover:bg-accent" />
                    <span className="truncate text-xs text-ink-muted transition-colors group-hover:text-ink">
                      {item.term}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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

          <AdSlot id={`term-${term.slug}-sidebar`} className="mt-3" />
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </article>
  );
}
