import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CONTRACT_SPECS, pointValue } from '@/lib/market-units';
import { PAGE_SEO } from '@/data/page-seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: PAGE_SEO.methodology.title,
  description: PAGE_SEO.methodology.description,
  alternates: { canonical: '/methodology' },
  robots: { index: true, follow: true },
};

/**
 * The specs are read from the same constant the calculators use, so this page
 * cannot drift out of date by being forgotten. If a tick value is ever
 * corrected, the published table corrects itself.
 */
const SPEC_ROWS = CONTRACT_SPECS.map((spec) => ({
  symbol: spec.symbol,
  name: spec.name,
  tickSize: spec.tickSize,
  tickValue: spec.tickValue,
  point: pointValue(spec),
}));

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-sm font-medium text-ink">
        {title}
      </h2>
      <div className="prose-riskline space-y-3">{children}</div>
    </section>
  );
}

function Formula({ label, expression }: { label: string; expression: string }) {
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-line bg-base-sunken/50 px-5 py-4">
      <p className="label">{label}</p>
      <p className="display-num mt-2 overflow-x-auto text-base text-ink">{expression}</p>
    </div>
  );
}

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Methodology', href: '/methodology' },
        ]}
      />

      <article className="max-w-[68ch]">
        <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          How the numbers are worked out
        </h1>
        <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-muted">
          Every formula this site uses, where the market data comes from, and what is deliberately
          missing. A calculator you cannot check is a calculator you have to trust.
        </p>

        <div className="mt-9 space-y-9">
          <Section id="sizing" title="Position size">
            <p>
              Everything else on the site is downstream of this one division. The risk budget is a
              percentage of current account equity — not of the original deposit, which would mean
              risking a larger share of what remains after a drawdown. The distance between entry
              and stop is the risk per unit. Dividing the first by the second gives the size.
            </p>
            <Formula label="Position Size" expression="(Account × Risk %) ÷ |Entry − Stop|" />
            <p>
              The result is always rounded <em>down</em> to a whole unit. Rounding up would put the
              real risk fractionally above the figure you chose, on every trade, in the same
              direction — a small error that only ever compounds one way.
            </p>
          </Section>

          <Section id="rr" title="Risk/reward and break-even win rate">
            <p>
              The ratio compares the distance to the target against the distance to the stop. The
              break-even win rate is derived from it and is pure arithmetic — it is the hit rate the
              ratio requires before the strategy makes anything at all.
            </p>
            <Formula label="Break-even Win Rate" expression="1 ÷ (1 + Ratio) × 100" />
            <p>
              These figures are calculated before costs. Spread and commission come out of the
              winning side and add to the losing side, so the real threshold is always a little
              higher than the number shown. That gap is small on a wide ratio and decisive on a
              narrow one.
            </p>
          </Section>

          <Section id="forex" title="Forex: pips and lots">
            <p>
              The forex calculator works in risk per pip rather than in exchange rates. Your risk
              budget divided by the stop distance in pips gives what a single pip is allowed to
              cost, and that converts directly into a lot size.
            </p>
            <Formula label="Risk Per Pip" expression="Maximum Risk ÷ Stop Distance in Pips" />
            <p>
              Framing it this way means the result is correct for any pair and any account
              currency, with no exchange rate needed and nothing to go stale. A pip is treated as
              0.0001, except on yen-quoted pairs where it is 0.01.
            </p>
          </Section>

          <Section id="futures" title="Futures: contract specifications">
            <p>
              These are the CME figures. Point value is <em>derived</em> from tick size and tick
              value rather than stored alongside them, so the two cannot disagree — a stored point
              value is a third number that can be edited independently and quietly contradict the
              other two.
            </p>
            <Formula label="Point Value" expression="Tick Value ÷ Tick Size" />
            <div className="not-prose overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[30rem] text-left text-xs">
                <thead className="border-b border-line bg-base-sunken/50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-ink-muted">Contract</th>
                    <th className="px-4 py-3 font-medium text-ink-muted">Tick size</th>
                    <th className="px-4 py-3 font-medium text-ink-muted">Tick value</th>
                    <th className="px-4 py-3 font-medium text-ink-muted">Point value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {SPEC_ROWS.map((row) => (
                    <tr key={row.symbol}>
                      <td className="px-4 py-3">
                        <span className="display-num text-ink">{row.symbol}</span>
                        <span className="ml-2 text-ink-faint">{row.name}</span>
                      </td>
                      <td className="display-num px-4 py-3 text-ink-muted">{row.tickSize}</td>
                      <td className="display-num px-4 py-3 text-ink-muted">
                        ${row.tickValue.toFixed(2)}
                      </td>
                      <td className="display-num px-4 py-3 text-ink">
                        {row.point === null ? '—' : `$${row.point.toFixed(2)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Exchanges change specifications from time to time. If one of these is wrong, it is a
              correction rather than a feature request — send it to{' '}
              <Link href="/contact" className="link-underline">
                the contact page
              </Link>{' '}
              and it gets fixed before anything else on the list.
            </p>
          </Section>

          <Section id="journal" title="Journal statistics">
            <p>
              Every figure on the{' '}
              <Link href="/journal" className="link-underline">
                journal
              </Link>{' '}
              is computed from the trades you enter, in your browser, with no server involved.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              <li>
                <strong className="font-medium text-ink">R-multiple</strong> is profit or loss
                divided by the <em>initial</em> risk — the original stop, never a stop moved later.
                Recalculating from a trailed stop turns an ordinary trade into a large winner on
                paper and destroys the only thing the number is good for.
              </li>
              <li>
                <strong className="font-medium text-ink">Profit factor</strong> is gross profit
                divided by gross loss. With no losses it is undefined rather than infinite, and the
                page says so instead of printing a number.
              </li>
              <li>
                <strong className="font-medium text-ink">Drawdown</strong> is measured from the
                running equity peak, not from the starting balance.
              </li>
              <li>
                <strong className="font-medium text-ink">Win rate</strong> counts closed trades
                only. Open positions are excluded, because including them would let an unrealised
                loss flatter the record by not counting yet.
              </li>
            </ul>
          </Section>

          <Section id="data" title="Where the market data comes from">
            <p>
              Crypto prices come from CoinGecko. Foreign exchange rates are the European Central
              Bank reference rates, published once each working day — the site labels them as daily
              reference rates rather than presenting a once-a-day figure as a live one.
            </p>
            <p>
              Every page showing a market number also shows when it was last refreshed. If the
              figure is an hour old, it says an hour.
            </p>
            <p>
              Prices are for orientation. Before placing a trade, the number that matters is the one
              on your broker&rsquo;s screen, because that is the price you will actually transact
              at.
            </p>
          </Section>

          <Section id="absent" title="What is deliberately absent">
            <ul className="list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              <li>
                <strong className="font-medium text-ink">Real-time stock prices.</strong> Displaying
                live equity quotes requires a licence from the exchange that owns the data. There is
                no such licence here, so those prices are absent rather than delayed and shown as
                current.
              </li>
              <li>
                <strong className="font-medium text-ink">Signals, calls and recommendations.</strong>{' '}
                The calculators answer &ldquo;how much&rdquo;. Nothing on the site answers
                &ldquo;whether&rdquo; or &ldquo;when&rdquo;.
              </li>
              <li>
                <strong className="font-medium text-ink">Backtests and performance claims.</strong>{' '}
                No strategy here has a track record attached, because a curve fitted to the past is
                not evidence about the future.
              </li>
              <li>
                <strong className="font-medium text-ink">Broker affiliate links.</strong> The site
                earns nothing when you open an account anywhere, which removes any reason to
                encourage you to trade more than you intended.
              </li>
            </ul>
          </Section>

          <Section id="assumptions" title="Assumptions worth knowing about">
            <p>
              Every position size on this site assumes the stop fills at the stop price. It usually
              does not, quite. Slippage makes the real loss a little larger, and a gap can make it a
              great deal larger, because a gap means the stop level never traded at all.
            </p>
            <p>
              That is not a flaw in the arithmetic — it is the boundary of what arithmetic can do.
              It is also the reason the honest answer to gap risk is a smaller position rather than
              a cleverer stop.
            </p>
            <p>
              Costs are excluded from the calculators unless a page says otherwise. Spread,
              commission and overnight financing are real and they come out of the same side of the
              trade every time.
            </p>
          </Section>

          <Section id="corrections" title="Corrections">
            <p>
              A wrong tick value is worse than no calculator, because it is wrong in a way that
              looks right. Errors in a formula, a definition or a contract specification are fixed
              before new features are built, and the fix ships as soon as it is confirmed.
            </p>
            <p>
              More on what the site is and who runs it is on the{' '}
              <Link href="/about" className="link-underline">
                about page
              </Link>
              , and the legal position is set out in the{' '}
              <Link href="/disclaimer" className="link-underline">
                disclaimer
              </Link>
              . {SITE.name} is educational and is not investment advice.
            </p>
          </Section>
        </div>
      </article>
    </div>
  );
}
