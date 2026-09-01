import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  Compass,
  Gauge,
  Scale,
  Sparkles,
  Target,
} from 'lucide-react';
import { HeroTradeBuilder } from '@/components/calculator/HeroTradeBuilder';
import { ButtonLink } from '@/components/ui/Button';
import { CATEGORIES } from '@/data/categories';
import { ALL_TERMS, countByCategory, getInteractiveTerms, getPopularTerms } from '@/lib/dictionary';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Trade Smarter. Risk Better. — Position Size & Risk Calculator',
  description:
    'Calculate your position size and risk in seconds, then learn what every number means. A free risk calculator plus a 135-term interactive trading dictionary.',
  alternates: { canonical: '/' },
};

const LOOP = [
  {
    step: 'Learn',
    icon: Compass,
    title: 'Start with a concept',
    body: 'Every term is explained in plain language, with a diagram where a diagram actually helps.',
  },
  {
    step: 'Understand',
    icon: Sparkles,
    title: 'Change the numbers',
    body: 'Most terms carry a live mini-tool. Move a stop, watch the position size respond immediately.',
  },
  {
    step: 'Calculate',
    icon: Calculator,
    title: 'Size your own trade',
    body: 'Take it into the full calculator, prefilled, and see the arithmetic worked out step by step.',
  },
  {
    step: 'Explore',
    icon: Target,
    title: 'Follow the thread',
    body: 'Every result links back to the idea behind it, and every idea links on to the next one.',
  },
];

const TOOLS = [
  {
    href: '/calculator',
    icon: Gauge,
    name: 'Risk Calculator',
    blurb: 'The complete picture: position size, exposure, profit, loss and risk/reward.',
    example: '$10,000 · 1% · $50 → $48',
    result: '50 shares',
  },
  {
    href: '/tools/position-size',
    icon: Calculator,
    name: 'Position Size Calculator',
    blurb: 'One question, answered fast: how many shares should this trade be?',
    example: 'Risk $100 with a $2 stop',
    result: '50 shares',
  },
  {
    href: '/tools/risk-reward',
    icon: Scale,
    name: 'Risk/Reward Calculator',
    blurb: 'Compare the upside to the downside, and see the win rate it demands.',
    example: 'Risk $2 to make $6',
    result: '1 : 3 · 25% to break even',
  },
];

export default function HomePage() {
  const popular = getPopularTerms(8);
  const interactive = getInteractiveTerms(6);
  const counts = countByCategory();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE.name,
    url: SITE.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    description: SITE.description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Position size calculator',
      'Risk/reward calculator',
      'Trade risk visualization',
      'Interactive trading dictionary',
    ],
  };

  return (
    <>
      {/* ------------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-field" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[110px]"
        />

        <div className="relative mx-auto max-w-[86rem] px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-base-raised/60 px-3 py-1.5 text-2xs text-ink-muted">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                {SITE.tagline}
              </span>

              <h1 className="mt-5 text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[3.25rem]">
                Trade smarter.
                <br />
                <span className="text-ink-muted">Risk better.</span>
              </h1>

              <p className="mt-5 max-w-[46ch] text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
                Learn trading concepts, understand the numbers, and calculate your risk before you
                place a trade.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/calculator" size="lg">
                  Calculate Your Risk
                  <ArrowRight size={16} aria-hidden />
                </ButtonLink>
                <ButtonLink href="/trading-dictionary" variant="secondary" size="lg">
                  Explore the Dictionary
                </ButtonLink>
              </div>

              <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6">
                <div>
                  <dt className="label">Terms explained</dt>
                  <dd className="display-num mt-1 text-xl text-ink">{ALL_TERMS.length}</dd>
                </div>
                <div>
                  <dt className="label">Live mini-tools</dt>
                  <dd className="display-num mt-1 text-xl text-ink">
                    {ALL_TERMS.filter((t) => t.widget).length}
                  </dd>
                </div>
                <div>
                  <dt className="label">Sign-up required</dt>
                  <dd className="display-num mt-1 text-xl text-reward-soft">None</dd>
                </div>
              </dl>
            </div>

            <div className="min-w-0">
              <HeroTradeBuilder />
              <p className="mt-3 px-1 text-2xs leading-relaxed text-ink-ghost">
                Change any value above — every number updates instantly. This is the same math the
                full calculator runs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- the loop */}
      <section className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-[52ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
            Understand the trade before you take the trade
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
            A number without an explanation is just trivia. Every calculation here connects back to
            the idea behind it, and every idea connects forward to a tool.
          </p>
        </div>

        <ol className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LOOP.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.step}
                className="group relative rounded-2xl border border-line bg-base-raised/40 p-5 transition-colors duration-300 hover:border-line-strong hover:bg-base-raised/70"
              >
                <div className="flex items-center justify-between">
                  <Icon size={17} className="text-accent" aria-hidden />
                  <span className="display-num text-2xs text-ink-ghost">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="label mt-4">{item.step}</p>
                <h3 className="mt-1.5 text-sm font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-faint">{item.body}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ----------------------------------------------------------------- tools */}
      <section className="border-y border-line bg-base-sunken/30">
        <div className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[46ch]">
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
                Three tools, one calculation
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                They share the same engine. Start wherever your question starts.
              </p>
            </div>
            <Link
              href="/tools"
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft transition-colors hover:text-accent"
            >
              See all tools
              <ArrowRight
                size={13}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="mt-9 grid gap-3 lg:grid-cols-3">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col rounded-2xl border border-line bg-base-raised/50 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-base-raised"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-accent-wash text-accent transition-colors duration-300 group-hover:border-accent/40">
                    <Icon size={16} aria-hidden />
                  </div>

                  <h3 className="mt-4 text-[0.9375rem] font-medium text-ink">{tool.name}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-faint">{tool.blurb}</p>

                  <div className="mt-5 rounded-lg border border-line bg-base-sunken/60 p-3">
                    <p className="display-num text-2xs text-ink-ghost">{tool.example}</p>
                    <p className="display-num mt-1.5 text-sm text-ink">{tool.result}</p>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft">
                    Open tool
                    <ArrowRight
                      size={13}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ dictionary */}
      <section className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
              The language of the market, decoded
            </h2>
            <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-muted">
              {ALL_TERMS.length} terms across {CATEGORIES.length} categories. Each one gets a real
              explanation, the mistakes people actually make, and a path to the next concept.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/trading-dictionary?category=${category.id}`}
                  className="group inline-flex items-center gap-2 rounded-lg border border-line bg-base-raised/40 px-3 py-2 text-xs text-ink-muted transition-all duration-200 hover:border-accent/30 hover:bg-accent-wash hover:text-accent-soft"
                >
                  {category.label}
                  <span className="display-num text-2xs text-ink-ghost transition-colors group-hover:text-accent/70">
                    {counts[category.id]}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <p className="label mb-3">Concepts you can change and watch move</p>
              <ul className="space-y-1.5">
                {interactive.map((term) => (
                  <li key={term.slug}>
                    <Link
                      href={`/trading-dictionary/${term.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-base-raised/30 px-3.5 py-2.5 transition-all duration-200 hover:border-accent/30 hover:bg-accent-wash"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <Sparkles size={12} className="shrink-0 text-accent" aria-hidden />
                        <span className="truncate text-xs font-medium text-ink">{term.term}</span>
                      </span>
                      <ArrowRight
                        size={13}
                        aria-hidden
                        className="shrink-0 text-ink-ghost transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel p-5">
            <p className="label mb-4">Most looked up</p>
            <ul className="divide-y divide-line">
              {popular.map((term) => (
                <li key={term.slug}>
                  <Link
                    href={`/trading-dictionary/${term.slug}`}
                    className="group flex flex-col gap-1 py-3.5 transition-opacity"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-medium text-ink transition-colors group-hover:text-accent-soft">
                        {term.term}
                      </span>
                      <ArrowRight
                        size={12}
                        aria-hidden
                        className="text-ink-ghost opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </span>
                    <span className="text-xs leading-relaxed text-ink-faint">{term.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/trading-dictionary"
              className="mt-4 flex h-10 items-center justify-center rounded-xl border border-line-strong text-xs font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent-soft"
            >
              Browse all {ALL_TERMS.length} terms
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- learn */}
      <section className="border-t border-line bg-base-sunken/30">
        <div className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="panel flex flex-col items-start justify-between gap-6 p-7 sm:p-9 lg:flex-row lg:items-center">
            <div className="max-w-[52ch]">
              <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Think you have it? Check.
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                Short questions on the concepts that decide real outcomes — what happens to position
                size when a stop widens, what win rate a 1:3 trade actually needs. Every answer comes
                with the reasoning, right or wrong.
              </p>
            </div>
            <ButtonLink href="/learn" size="lg" className="shrink-0">
              Test Yourself
              <ArrowRight size={16} aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
