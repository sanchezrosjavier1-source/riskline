import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RiskCalculator, type CalculatorInitialValues } from '@/components/calculator/RiskCalculator';
import { AdSlot } from '@/components/layout/AdSlot';
import { DISCLAIMER, SITE, absoluteUrl } from '@/lib/site';
import type { Direction, Market } from '@/types/trade';

export const metadata: Metadata = {
  title: 'Trading Risk Calculator — Position Size, Risk & Reward',
  description:
    'Free trading risk calculator. Enter account size, risk %, entry and stop to get position size, exposure, profit, loss and risk/reward — with the math shown.',
  alternates: { canonical: '/calculator' },
  openGraph: {
    title: `Trading Risk Calculator — ${SITE.name}`,
    description:
      'Position size, exposure, potential profit and loss, and risk/reward — calculated instantly, with every step explained.',
    url: absoluteUrl('/calculator'),
  },
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** Reads a single positive number from a query string, ignoring anything unusable. */
function readNumber(value: string | string[] | undefined): number | undefined {
  if (typeof value !== 'string') return undefined;
  const parsed = Number(value.replace(/[$,\s]/g, ''));
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  return parsed;
}

const MARKETS: Market[] = ['stocks', 'forex', 'futures', 'crypto'];

/** Reads a market from the query string — set by "Size a trade" links on /markets. */
function readMarket(value: string | string[] | undefined): Market | undefined {
  if (typeof value !== 'string') return undefined;
  return MARKETS.find((market) => market === value);
}

export default async function CalculatorPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Links from the hero, the dictionary and the markets page can prefill the form.
  const initial: CalculatorInitialValues = {
    accountSize: readNumber(params.account),
    riskPercent: readNumber(params.risk),
    direction: params.direction === 'short' ? ('short' as Direction) : undefined,
    entry: readNumber(params.entry),
    stopLoss: readNumber(params.stop),
    takeProfit: readNumber(params.tp),
    market: readMarket(params.market),
  };

  // Arriving from /markets gives us a price but no plan. Rather than opening on
  // a red "enter a stop" error, seed a visible 2%-away placeholder the trader is
  // expected to replace — the stop is their decision, not ours.
  if (initial.entry !== undefined && initial.stopLoss === undefined) {
    const away = initial.direction === 'short' ? 1.02 : 0.98;
    initial.stopLoss = Number((initial.entry * away).toPrecision(8));
    initial.takeProfit = initial.takeProfit ?? null;
  }

  const hasPrefill = Object.values(initial).some((value) => value !== undefined);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Trading Risk Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    url: absoluteUrl('/calculator'),
    description:
      'Calculate position size, account exposure, potential profit and loss, and risk/reward ratio for long and short trades.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: true,
  };

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Risk Calculator', href: '/calculator' },
        ]}
      />

      <header className="max-w-[60ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Trading Risk Calculator
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          Set what you are willing to lose and where the trade is wrong. Everything else — position
          size, exposure, profit, loss, risk/reward — follows from those two numbers.
          {hasPrefill && ' Your values have been carried over.'}
        </p>
      </header>

      <div className="mt-8">
        <RiskCalculator initial={hasPrefill ? initial : undefined} />
      </div>

      <AdSlot id="calculator-below-results" className="mt-8" />

      <p className="mt-8 max-w-[76ch] text-2xs leading-relaxed text-ink-ghost">
        {DISCLAIMER} Results assume your stop fills at the stop price; gaps, slippage, commissions
        and financing costs are not included and will change your real outcome. Verify every figure
        with your broker before placing a trade.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
