import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PositionSizeTool } from '@/components/calculator/PositionSizeTool';
import { AdSlot } from '@/components/layout/AdSlot';
import { getTerm } from '@/lib/dictionary';
import { DISCLAIMER, SITE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Position Size Calculator — How Many Shares Should You Buy?',
  description:
    'Free position size calculator. Enter account size, risk %, entry and stop loss to find exactly how many shares to trade — long or short, formula explained.',
  keywords: [
    'position size calculator',
    'how to calculate position size',
    'how many shares should i buy',
    'share size calculator',
    'risk based position sizing',
  ],
  alternates: { canonical: '/tools/position-size' },
  openGraph: {
    title: `Position Size Calculator — ${SITE.name}`,
    description:
      'Find exactly how many shares to trade based on your account size, risk percentage and stop loss.',
    url: absoluteUrl('/tools/position-size'),
  },
};

const CONCEPTS = ['position-size', 'risk-per-trade', 'stop-distance', 'stop-loss', 'notional-value'];

export default function PositionSizePage() {
  const concepts = CONCEPTS.map((slug) => getTerm(slug)).filter(
    (term): term is NonNullable<typeof term> => Boolean(term),
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to calculate position size',
    description:
      'Calculate how many shares to trade from your account size, the percentage you are willing to risk, and the distance between your entry and your stop loss.',
    url: absoluteUrl('/tools/position-size'),
    step: [
      {
        '@type': 'HowToStep',
        name: 'Set your maximum risk',
        text: 'Multiply your account size by the percentage you are willing to risk. A $10,000 account risking 1% gives a maximum risk of $100.',
      },
      {
        '@type': 'HowToStep',
        name: 'Measure the risk per share',
        text: 'Subtract your stop loss from your entry price on a long trade, or your entry from your stop on a short. A $50 entry with a $48 stop is $2 per share.',
      },
      {
        '@type': 'HowToStep',
        name: 'Divide to get position size',
        text: 'Divide the maximum risk by the risk per share. $100 divided by $2 is 50 shares. Round down to a whole share so your real risk stays at or below your budget.',
      },
    ],
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Position Size Calculator', href: '/tools/position-size' },
        ]}
      />

      <header className="max-w-[60ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Position Size Calculator
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          How many shares should this trade be? Set what you are willing to lose and where the trade
          is wrong — the size follows from those two numbers, not from a hunch.
        </p>
      </header>

      <div className="mt-8">
        <PositionSizeTool />
      </div>

      <section className="mt-12 max-w-[68ch]">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          How position size is calculated
        </h2>
        <div className="prose-riskline mt-3">
          <p>
            Position size is not a preference — it is arithmetic. Two decisions you have already
            made determine it completely: how much money you are willing to lose on this trade, and
            how far your stop sits from your entry.
          </p>
          <p>
            The first gives you a dollar budget. The second tells you what one share of that risk
            costs. Divide the budget by the cost and you have your size.
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-line bg-base-sunken/50 p-5">
          <p className="label">Position Size</p>
          <p className="display-num mt-2 text-base text-ink sm:text-lg">
            Maximum Risk ÷ Risk Per Share
          </p>
          <div className="mt-4 space-y-1.5 border-t border-line pt-4">
            <p className="display-num text-xs text-ink-faint">
              $10,000 × 1% <span className="text-ink-ghost">=</span>{' '}
              <span className="text-ink">$100 maximum risk</span>
            </p>
            <p className="display-num text-xs text-ink-faint">
              $50.00 − $48.00 <span className="text-ink-ghost">=</span>{' '}
              <span className="text-ink">$2.00 risk per share</span>
            </p>
            <p className="display-num text-xs text-ink-faint">
              $100 ÷ $2.00 <span className="text-ink-ghost">=</span>{' '}
              <span className="text-ink">50 shares</span>
            </p>
          </div>
        </div>

        <div className="prose-riskline mt-5">
          <p>
            Notice what happens when the stop moves. A tighter stop means a smaller risk per share,
            which means more shares — but the same $100 at risk. A wider stop means fewer shares, and
            still the same $100. The dollar risk is fixed by you; the size adapts to the trade.
          </p>
          <p>
            Because most equities trade in whole shares, round down rather than up. Rounding down
            keeps your actual risk at or just under the budget you set. Rounding up quietly breaks
            the rule the whole calculation exists to enforce.
          </p>
        </div>
      </section>

      <AdSlot id="position-size-below-article" className="mt-10" />

      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight text-ink">The concepts behind it</h2>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((term) => (
            <Link
              key={term.slug}
              href={`/trading-dictionary/${term.slug}`}
              className="group flex flex-col rounded-xl border border-line bg-base-raised/40 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent-wash"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-ink transition-colors group-hover:text-accent-soft">
                  {term.term}
                </span>
                <ArrowRight
                  size={13}
                  aria-hidden
                  className="shrink-0 text-ink-ghost transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </span>
              <span className="mt-1.5 text-xs leading-relaxed text-ink-faint">{term.short}</span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 max-w-[76ch] text-2xs leading-relaxed text-ink-ghost">
        {DISCLAIMER} This calculator assumes your stop fills at the stop price. Gaps and slippage can
        push the real loss beyond it.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
