import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RiskRewardTool } from '@/components/calculator/RiskRewardTool';
import { AdSlot } from '@/components/layout/AdSlot';
import { getTerm } from '@/lib/dictionary';
import { DISCLAIMER, SITE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Risk/Reward Calculator — Ratio & Break-Even Win Rate',
  description:
    'Free risk/reward calculator. Enter entry, stop and target to get the risk/reward ratio and the win rate you need just to break even.',
  keywords: [
    'risk reward calculator',
    'risk reward ratio calculator',
    'break even win rate',
    'reward to risk ratio',
    'trade expectancy calculator',
  ],
  alternates: { canonical: '/tools/risk-reward' },
  openGraph: {
    title: `Risk/Reward Calculator — ${SITE.name}`,
    description:
      'Calculate the risk/reward ratio of a trade and the win rate it needs to be profitable.',
    url: absoluteUrl('/tools/risk-reward'),
  },
};

const CONCEPTS = ['risk-reward-ratio', 'break-even-win-rate', 'win-rate', 'expectancy', 'take-profit'];

const TABLE = [
  { ratio: '1 : 0.5', breakEven: '66.7%' },
  { ratio: '1 : 1', breakEven: '50.0%' },
  { ratio: '1 : 1.5', breakEven: '40.0%' },
  { ratio: '1 : 2', breakEven: '33.3%' },
  { ratio: '1 : 3', breakEven: '25.0%' },
  { ratio: '1 : 5', breakEven: '16.7%' },
];

export default function RiskRewardPage() {
  const concepts = CONCEPTS.map((slug) => getTerm(slug)).filter(
    (term): term is NonNullable<typeof term> => Boolean(term),
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to calculate a risk/reward ratio',
    description:
      'Compare the distance from entry to target against the distance from entry to stop, then work out the win rate that ratio requires to break even.',
    url: absoluteUrl('/tools/risk-reward'),
    step: [
      {
        '@type': 'HowToStep',
        name: 'Measure the risk',
        text: 'Take the distance from your entry to your stop loss. A $50 entry with a $48 stop risks $2 per share.',
      },
      {
        '@type': 'HowToStep',
        name: 'Measure the reward',
        text: 'Take the distance from your entry to your target. A $50 entry with a $56 target offers $6 per share.',
      },
      {
        '@type': 'HowToStep',
        name: 'Divide reward by risk',
        text: '$6 divided by $2 is 3, written as 1:3. The break-even win rate is 1 divided by (1 + 3), which is 25%.',
      },
    ],
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Risk/Reward Calculator', href: '/tools/risk-reward' },
        ]}
      />

      <header className="max-w-[60ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Risk/Reward Calculator
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          Compare what you stand to gain against what you stand to lose — then find out how often you
          actually need to be right for the trade to make sense.
        </p>
      </header>

      <div className="mt-8">
        <RiskRewardTool />
      </div>

      <section className="mt-12 max-w-[68ch]">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          Why the ratio decides more than the entry
        </h2>
        <div className="prose-riskline mt-3">
          <p>
            A risk/reward ratio is pure geometry. It depends only on where your entry, stop and
            target sit — not on your account size, and not on how confident you feel.
          </p>
          <p>
            Its value comes from what it demands of you. Every ratio implies a minimum win rate.
            Clear that rate and the strategy makes money; fall short and it does not, regardless of
            how good the individual trades looked.
          </p>
        </div>

        <div className="mt-5 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[22rem] text-left">
            <caption className="sr-only">
              Break-even win rate required at each risk/reward ratio
            </caption>
            <thead>
              <tr className="border-b border-line bg-base-sunken/60">
                <th scope="col" className="label px-4 py-3">
                  Risk / Reward
                </th>
                <th scope="col" className="label px-4 py-3">
                  Win rate to break even
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {TABLE.map((row) => (
                <tr key={row.ratio} className="transition-colors hover:bg-white/[0.02]">
                  <td className="display-num px-4 py-3 text-sm text-ink">{row.ratio}</td>
                  <td className="display-num px-4 py-3 text-sm text-accent-soft">{row.breakEven}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose-riskline mt-5">
          <p>
            This is why a trader who is wrong six times out of ten can be comfortably profitable, and
            why a trader who is right seven times out of ten can still lose. Accuracy alone tells you
            nothing until you know the size of the wins relative to the losses.
          </p>
          <p>
            One caution: these thresholds are before costs. Spread and commissions raise the real
            break-even, and they hit the small side of the ratio hardest.
          </p>
        </div>
      </section>

      <AdSlot id="risk-reward-below-article" className="mt-10" />

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
        {DISCLAIMER} Break-even figures are before spread, commissions and financing costs, all of
        which raise the win rate a strategy actually needs.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
