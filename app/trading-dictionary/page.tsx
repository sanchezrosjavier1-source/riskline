import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DictionaryExplorer } from '@/components/dictionary/DictionaryExplorer';
import { AdSlot } from '@/components/layout/AdSlot';
import { CATEGORIES } from '@/data/categories';
import { ALL_TERMS, SEARCH_INDEX, getInteractiveTerms, getPopularTerms } from '@/lib/dictionary';
import { SITE, absoluteUrl } from '@/lib/site';
import type { CategoryId } from '@/types/dictionary';

export const metadata: Metadata = {
  title: 'Trading Dictionary — Understand the Language of the Market',
  description: `${ALL_TERMS.length} trading terms explained in plain English, with interactive examples, formulas and the mistakes people actually make. Free, no sign-up.`,
  alternates: { canonical: '/trading-dictionary' },
  openGraph: {
    title: `Trading Dictionary — ${SITE.name}`,
    description: `${ALL_TERMS.length} trading terms explained in plain English, with interactive examples and formulas.`,
    url: absoluteUrl('/trading-dictionary'),
  },
};

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

const VALID_CATEGORIES = new Set(CATEGORIES.map((c) => c.id));

export default async function DictionaryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category =
    params.category && VALID_CATEGORIES.has(params.category as CategoryId)
      ? (params.category as CategoryId)
      : null;

  const popular = getPopularTerms(6);
  const interactive = getInteractiveTerms(4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'StopSize Trading Dictionary',
    description: SITE.description,
    url: absoluteUrl('/trading-dictionary'),
    inLanguage: 'en-US',
    hasDefinedTerm: ALL_TERMS.slice(0, 40).map((term) => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.short,
      url: absoluteUrl(`/trading-dictionary/${term.slug}`),
    })),
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Trading Dictionary', href: '/trading-dictionary' },
        ]}
      />

      <header className="max-w-[58ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Trading Dictionary
        </h1>
        <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-muted">
          Understand the language of the market.
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-faint">
          {ALL_TERMS.length} terms, each with a plain-language explanation, the mistakes people
          actually make, and a path to the concept that comes next. {interactive.length > 0 && 'Many carry a live tool you can change.'}
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] lg:gap-12">
        <div className="min-w-0">
          <DictionaryExplorer index={SEARCH_INDEX} initialCategory={category} initialQuery={params.q ?? ''} />
        </div>

        <aside className="order-first lg:order-last lg:sticky lg:top-20 lg:self-start">
          <div className="panel-flat p-5">
            <h2 className="label mb-3">Start here</h2>
            <ul className="space-y-0.5">
              {popular.map((term) => (
                <li key={term.slug}>
                  <Link
                    href={`/trading-dictionary/${term.slug}`}
                    className="group flex items-center justify-between gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="truncate text-xs text-ink-muted transition-colors group-hover:text-ink">
                      {term.term}
                    </span>
                    <ArrowRight
                      size={12}
                      aria-hidden
                      className="shrink-0 text-ink-ghost opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-flat mt-3 p-5">
            <h2 className="mb-1 flex items-center gap-2 text-sm font-medium text-ink">
              <Sparkles size={13} className="text-accent" aria-hidden />
              Concepts you can play with
            </h2>
            <p className="mb-3 text-xs leading-relaxed text-ink-faint">
              These pages carry a working calculator inside the explanation.
            </p>
            <ul className="space-y-0.5">
              {interactive.map((term) => (
                <li key={term.slug}>
                  <Link
                    href={`/trading-dictionary/${term.slug}`}
                    className="block truncate rounded-lg px-2 py-2 text-xs text-ink-muted transition-colors hover:bg-white/[0.04] hover:text-accent-soft"
                  >
                    {term.term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-flat mt-3 p-5">
            <h2 className="text-sm font-medium text-ink">Have the numbers ready?</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              Skip ahead and size a real trade. Every result links back to the concept behind it.
            </p>
            <Link
              href="/calculator"
              className="mt-4 flex h-10 items-center justify-center rounded-xl border border-line-strong text-xs font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent-soft"
            >
              Open Risk Calculator
            </Link>
          </div>

          <AdSlot id="dictionary-sidebar" className="mt-3" />
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
