import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JournalApp } from '@/components/journal/JournalApp';
import { AdSlot } from '@/components/layout/AdSlot';
import { DISCLAIMER, SITE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Trading Journal — Track Trades, R Multiples & Drawdown',
  description:
    'A free trading journal that needs no account. Log trades, then see your win rate, average R, profit factor, expectancy and drawdown. Everything stays on your device.',
  alternates: { canonical: '/journal' },
  openGraph: {
    title: `Trading Journal — ${SITE.name}`,
    description:
      'Log your trades and see what your win rate, average R and drawdown actually are. No account needed.',
    url: absoluteUrl('/journal'),
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Trading Journal',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  url: absoluteUrl('/journal'),
  description:
    'Log trades and review win rate, average R multiple, profit factor, expectancy and maximum drawdown. Runs entirely in the browser with no account.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isAccessibleForFree: true,
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Journal', href: '/journal' }]} />

      <header className="max-w-[62ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Trading Journal
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          The calculator tells you what to risk before a trade. This tells you what actually
          happened after it — your real win rate, your average R, and the drawdown you have already
          lived through.
        </p>
        <p className="mt-3 inline-flex items-start gap-2 rounded-lg border border-line bg-base-sunken/40 px-3 py-2 text-xs leading-relaxed text-ink-faint">
          <Lock size={13} aria-hidden className="mt-0.5 shrink-0 text-ink-ghost" />
          <span>
            No account, no sign-up. Your trades are stored in this browser and never leave your
            device — which also means clearing site data deletes them, so export a CSV if they
            matter to you.
          </span>
        </p>
      </header>

      <div className="mt-8">
        <JournalApp />
      </div>

      <AdSlot id="journal-below" className="mt-10" />

      <p className="mt-8 max-w-[76ch] text-2xs leading-relaxed text-ink-ghost">
        {DISCLAIMER} A journal records what you did; it does not validate a strategy. A handful of
        trades is far too small a sample to draw conclusions from — see{' '}
        <Link href="/trading-dictionary/expectancy" className="text-ink-faint hover:text-accent-soft">
          expectancy
        </Link>{' '}
        and{' '}
        <Link href="/trading-dictionary/risk-of-ruin" className="text-ink-faint hover:text-accent-soft">
          risk of ruin
        </Link>{' '}
        for why.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
