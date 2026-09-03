import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MarketCalculator } from '@/components/calculator/MarketCalculator';
import { AdSlot } from '@/components/layout/AdSlot';
import {
  getAllMarketCalculatorSlugs,
  getMarketCalculatorPage,
  MARKET_CALCULATOR_PAGES,
} from '@/data/market-calculators';
import { TERM_MAP } from '@/lib/dictionary';
import { DISCLAIMER, SITE, absoluteUrl } from '@/lib/site';

interface PageProps {
  params: Promise<{ market: string }>;
}

export function generateStaticParams() {
  return getAllMarketCalculatorSlugs().map((market) => ({ market }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market } = await params;
  const page = getMarketCalculatorPage(market);
  if (!page) return { title: 'Calculator not found' };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/calculator/${page.slug}` },
    openGraph: {
      title: `${page.title} — ${SITE.name}`,
      description: page.metaDescription,
      url: absoluteUrl(`/calculator/${page.slug}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} — ${SITE.name}`,
      description: page.metaDescription,
    },
  };
}

export default async function MarketCalculatorPage({ params }: PageProps) {
  const { market } = await params;
  const page = getMarketCalculatorPage(market);
  if (!page) notFound();

  const others = MARKET_CALCULATOR_PAGES.filter((candidate) => candidate.slug !== page.slug);
  const terms = page.relatedTerms.map((slug) => TERM_MAP.get(slug)).filter((term) => term !== undefined);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: page.title,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      url: absoluteUrl(`/calculator/${page.slug}`),
      description: page.metaDescription,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      isAccessibleForFree: true,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: { '@type': 'Answer', text: entry.answer },
      })),
    },
  ];

  return (
    <article className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Calculate', href: '/calculator' },
          { label: page.title, href: `/calculator/${page.slug}` },
        ]}
      />

      <header className="max-w-[62ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          {page.h1}
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">{page.dek}</p>
      </header>

      <div className="mt-8">
        <MarketCalculator page={page} />
      </div>

      <AdSlot id={`calculator-${page.slug}`} className="mt-10" />

      {/* ------------------------------------------------------------- explainer */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
        <div className="min-w-0 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold tracking-tight text-ink">{section.heading}</h2>
              <div className="prose-riskline mt-3 max-w-[68ch]">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          {/* -------------------------------------------------------------- faq */}
          <section aria-labelledby="faq">
            <h2 id="faq" className="text-lg font-semibold tracking-tight text-ink">
              Common questions
            </h2>
            <dl className="mt-4 space-y-3">
              {page.faq.map((entry) => (
                <div key={entry.question} className="rounded-xl border border-line bg-base-raised/30 p-5">
                  <dt className="text-sm font-medium text-ink">{entry.question}</dt>
                  <dd className="mt-2 max-w-[68ch] text-xs leading-relaxed text-ink-muted">
                    {entry.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* --------------------------------------------------- other markets */}
          <section aria-labelledby="other-markets">
            <h2 id="other-markets" className="text-lg font-semibold tracking-tight text-ink">
              Sizing a different market
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/calculator/${other.slug}`}
                  className="group rounded-xl border border-line bg-base-raised/30 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-base-raised/60"
                >
                  <span className="block text-sm font-medium text-ink transition-colors group-hover:text-accent-soft">
                    {other.title}
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-ink-faint">
                    {other.cardBlurb}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------- sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          {terms.length > 0 && (
            <div className="panel-flat p-5">
              <h2 className="label mb-3">The terms on this page</h2>
              <ul className="space-y-0.5">
                {terms.map((term) => (
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

          <div className="panel-flat mt-3 p-5">
            <h2 className="text-sm font-medium text-ink">Every market at once</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              The full calculator handles all four markets in one place, with the arithmetic shown
              step by step.
            </p>
            <Link
              href="/calculator"
              className="mt-4 flex h-10 items-center justify-center gap-1.5 rounded-xl bg-accent text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
            >
              Full risk calculator
              <ArrowRight size={13} aria-hidden />
            </Link>
          </div>

          <AdSlot id={`calculator-${page.slug}-sidebar`} className="mt-3" />
        </aside>
      </div>

      <p className="mt-10 max-w-[76ch] text-2xs leading-relaxed text-ink-ghost">
        {DISCLAIMER} Results assume your stop fills at the stop price; gaps, slippage, spread and
        commissions are not included and will change your real outcome.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
