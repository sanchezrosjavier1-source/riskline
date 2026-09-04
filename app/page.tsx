import type { Metadata } from 'next';
import { PAGE_SEO } from '@/data/page-seo';
import Link from 'next/link';
import { ArrowRight, Calculator, Compass, Gauge, Scale, Target } from 'lucide-react';
import { HeroTradeBuilder } from '@/components/calculator/HeroTradeBuilder';
import { ButtonLink } from '@/components/ui/Button';
import { ALL_TERMS, getPopularTerms } from '@/lib/dictionary';
import { ALL_GUIDES } from '@/lib/guides';
import { ALL_HISTORY_EVENTS } from '@/lib/history';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: PAGE_SEO.home.title,
  description: PAGE_SEO.home.description,
  alternates: { canonical: '/' },
};

const STEPS = [
  {
    icon: Calculator,
    title: 'Size it',
    body: 'Decide what you are willing to lose. The position size follows from that, rather than from a round number that felt about right.',
  },
  {
    icon: Target,
    title: 'Take it',
    body: 'Place the trade with a stop you chose deliberately beforehand — not one you talk yourself into once the position is already red.',
  },
  {
    icon: Compass,
    title: 'Review it',
    body: 'Log the result. After enough trades you stop guessing whether your approach works and start knowing your real win rate.',
  },
];

const BENEFITS = [
  {
    icon: Gauge,
    title: 'Know what you are risking',
    body: 'In money, before you enter — not as a feeling about how confident you are in the setup.',
  },
  {
    icon: Calculator,
    title: 'Size the position correctly',
    body: 'The arithmetic that turns a risk budget and a stop distance into an exact number of shares, lots or contracts.',
  },
  {
    icon: Scale,
    title: 'Find out if it works',
    body: 'A journal replaces the story you tell yourself about your trading with your actual win rate, average R and drawdown.',
  },
];

export default function HomePage() {
  const popular = getPopularTerms(8);

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
          {/*
           * Three grid children rather than two, so the running calculator can
           * sit second on a phone. Stacked the old way it fell below the fold,
           * and the analytics showed the consequence: 34 page views, 2 of them
           * on a calculator nobody could see. On desktop the explicit row and
           * column placement puts the stats back under the copy, unchanged.
           */}
          <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="lg:col-start-1 lg:row-start-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-base-raised/60 px-3 py-1.5 text-2xs text-ink-muted">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                {SITE.tagline}
              </span>

              <h1 className="mt-5 text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[3.25rem]">
                Know your risk
                <br />
                <span className="text-ink-muted">before you trade.</span>
              </h1>

              <p className="mt-5 max-w-[46ch] text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
                Work out your position size, keep your risk where you decided it should be, and
                track what actually happens — in one place, with nothing to sign up for.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/calculator" size="lg">
                  Calculate Risk
                  <ArrowRight size={16} aria-hidden />
                </ButtonLink>
                <ButtonLink href="/markets" variant="secondary" size="lg">
                  Explore Markets
                </ButtonLink>
              </div>

            </div>

            <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <HeroTradeBuilder />
              <p className="mt-3 px-1 text-2xs leading-relaxed text-ink-ghost">
                Change any value above — every number updates instantly. This is the same math the
                full calculator runs.
              </p>
            </div>

            <dl className="flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6 lg:col-start-1 lg:row-start-2">
              <div>
                <dt className="label">Terms explained</dt>
                <dd className="display-num mt-1 text-xl text-ink">{ALL_TERMS.length}</dd>
              </div>
              <div>
                <dt className="label">Markets covered</dt>
                <dd className="display-num mt-1 text-xl text-ink">4</dd>
              </div>
              <div>
                <dt className="label">Sign-up required</dt>
                <dd className="display-num mt-1 text-xl text-reward-soft">None</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ how it works */}
      <section className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-[52ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
            Three steps. Most people skip the third.
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
            Nothing here tells you what to buy. It tells you how much, and whether the way you have
            been trading is actually working.
          </p>
        </div>

        <ol className="mt-9 grid gap-3 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="panel-flat p-5">
              <div className="flex items-center gap-2.5">
                <span className="display-num text-2xs text-ink-ghost">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <step.icon size={15} className="text-accent" aria-hidden />
              </div>
              <h3 className="mt-3 text-sm font-medium text-ink">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------------- benefits */}
      <section className="border-y border-line bg-base-sunken/30">
        <div className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title}>
                <benefit.icon size={18} className="text-accent" aria-hidden />
                <h3 className="mt-3 text-sm font-medium text-ink">{benefit.title}</h3>
                <p className="mt-1.5 max-w-[38ch] text-xs leading-relaxed text-ink-muted">
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ markets */}
      <section className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[46ch]">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
              Markets
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
              Crypto prices and the seven major currency pairs, each one click from being sized.
              Every number says where it came from and how fresh it is.
            </p>
          </div>
          <Link
            href="/markets"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft transition-colors hover:text-accent"
          >
            Open markets
            <ArrowRight
              size={13}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ journal */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[46ch]">
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
                Journal
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                Log what you actually did and the page works out your real win rate, your average R
                and the drawdown you have already survived. No account — it stays on your device.
              </p>
            </div>
            <Link
              href="/journal"
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft transition-colors hover:text-accent"
            >
              Open journal
              <ArrowRight
                size={13}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- learn */}
      <section className="border-t border-line bg-base-sunken/30">
        <div className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-[52ch]">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
              Learn
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
              Every result the calculator produces links back to the idea behind it.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link href="/trading-dictionary" className="group panel-flat p-5 transition-all duration-300 hover:border-accent/30">
              <span className="display-num text-xl text-ink">{ALL_TERMS.length}</span>
              <h3 className="mt-2 text-sm font-medium text-ink transition-colors group-hover:text-accent-soft">
                Dictionary
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
                Every term in plain language, most with a working mini-tool inside the explanation.
              </p>
            </Link>

            <Link href="/guides" className="group panel-flat p-5 transition-all duration-300 hover:border-accent/30">
              <span className="display-num text-xl text-ink">{ALL_GUIDES.length}</span>
              <h3 className="mt-2 text-sm font-medium text-ink transition-colors group-hover:text-accent-soft">
                Guides
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
                One idea worked all the way through with real numbers, tables and a live calculator.
              </p>
            </Link>

            <Link href="/market-history" className="group panel-flat p-5 transition-all duration-300 hover:border-accent/30">
              <span className="display-num text-xl text-ink">{ALL_HISTORY_EVENTS.length}</span>
              <h3 className="mt-2 text-sm font-medium text-ink transition-colors group-hover:text-accent-soft">
                Market history
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
                What leverage, liquidity and misplaced trust actually cost, 1987 to 2025.
              </p>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-2xs text-ink-ghost">Start anywhere:</span>
            {popular.slice(0, 6).map((term) => (
              <Link
                key={term.slug}
                href={`/trading-dictionary/${term.slug}`}
                className="rounded-lg border border-line px-2.5 py-1 text-2xs text-ink-muted transition-all duration-200 hover:border-accent/30 hover:text-accent-soft"
              >
                {term.term}
              </Link>
            ))}
            <Link
              href="/learn"
              className="rounded-lg border border-line px-2.5 py-1 text-2xs text-ink-muted transition-all duration-200 hover:border-accent/30 hover:text-accent-soft"
            >
              Test yourself
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- final CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[86rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="panel flex flex-col items-start justify-between gap-6 p-7 sm:p-9 lg:flex-row lg:items-center">
            <div className="max-w-[52ch]">
              <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Work out what this trade should cost you
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                Four numbers in, one position size out. Nothing to install, nothing to sign up for.
              </p>
            </div>
            <ButtonLink href="/calculator" size="lg" className="shrink-0">
              Calculate Risk
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
