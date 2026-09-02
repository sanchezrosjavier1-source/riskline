import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DISCLAIMER, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'StopSize provides educational information only. It is not financial, investment, or trading advice.',
  alternates: { canonical: '/disclaimer' },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Disclaimer', href: '/disclaimer' },
        ]}
      />

      <article className="max-w-[68ch]">
        <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Disclaimer
        </h1>

        <p className="mt-5 rounded-xl border border-warn/25 bg-warn-wash px-5 py-4 text-sm leading-relaxed text-ink-muted">
          {DISCLAIMER}
        </p>

        <div className="prose-riskline mt-8 space-y-8">
          <section>
            <h2 className="text-sm font-medium text-ink">Educational purpose</h2>
            <p className="mt-2">
              {SITE.name} exists to explain how trading concepts work and to let you calculate the
              numbers behind them. Nothing on this site is a recommendation to buy, sell, or hold any
              security, currency, derivative, or other financial instrument.
            </p>
            <p>
              We do not provide personalized advice. We do not know your financial situation, your
              objectives, your tax position, or your risk tolerance, and nothing here is tailored to
              them.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">About the calculations</h2>
            <p>
              The calculators are built to be mathematically correct and are covered by automated
              tests. They are still simplified models of real markets.
            </p>
            <p>
              In particular, results assume your stop loss fills exactly at your stop price. In
              practice, gaps, slippage, trading halts and thin liquidity can all produce a worse fill,
              and your actual loss can exceed the calculated figure. Commissions, spreads, financing
              costs, taxes and currency conversion are not included.
            </p>
            <p>
              Always verify position sizes and risk figures against your own broker&apos;s numbers
              before placing a trade.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Risk warning</h2>
            <p>
              Trading involves substantial risk, including the loss of your entire capital. Leveraged
              products such as margin accounts, futures, options and perpetual contracts can produce
              losses that exceed your initial deposit.
            </p>
            <p>
              Past performance, backtested results, and historical patterns do not predict future
              outcomes. Only trade with capital you can afford to lose.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">No warranty</h2>
            <p>
              This site and its tools are provided &ldquo;as is&rdquo;, without warranty of any kind.
              We make no guarantee that the information is complete, current, or free of error, and
              accept no liability for any loss arising from its use.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Your data</h2>
            <p>
              The calculators and the dictionary work without an account. Saved scenarios, recently
              viewed terms and quiz answers are stored in your browser&apos;s session storage only —
              they are never uploaded, and closing the tab clears them.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Professional advice</h2>
            <p>
              If you need advice about your own circumstances, consult a licensed financial adviser,
              broker, or tax professional in your jurisdiction.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
