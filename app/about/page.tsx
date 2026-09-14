import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { ALL_TERMS } from '@/lib/dictionary';
import { getAllGuideSlugs } from '@/lib/guides';
import { getAllHistorySlugs } from '@/lib/history';
import { DISCLAIMER, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `Who runs ${SITE.name}, how the numbers are worked out, where the market data comes from, and what the site deliberately refuses to do.`,
  alternates: { canonical: '/about' },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ]}
      />

      <article className="max-w-[62ch]">
        <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          About {SITE.name}
        </h1>
        <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-muted">
          A free risk calculator, a trading dictionary and a journal that never uploads anything.
          Run independently, with nothing to sell.
        </p>

        <div className="prose-riskline mt-8 space-y-6">
          <section>
            <h2 className="text-sm font-medium text-ink">The problem this solves</h2>
            <p className="mt-2">
              Position sizing is the one piece of trading that is pure arithmetic, and it is the
              piece most people get wrong. Not because the formula is hard — it is one division —
              but because the three numbers that feed it live in three different places. Your
              account balance is in your broker. The percent you are willing to risk is a decision
              you made once and half remember. The distance to your stop is on the chart. Somewhere
              between those three, a position gets bigger than it was meant to be.
            </p>
            <p>
              Most tools built for this hand you a number and stop. You type four values into a box
              and a fifth value appears, with no working shown and no way to tell whether it is
              right. If the answer surprises you, there is nothing to check.
            </p>
            <p>
              {SITE.name} shows the arithmetic. Every result on the calculator lists the steps that
              produced it — the risk in currency, the distance to the stop, the division that turns
              one into the other — so you can follow it, catch a typo, and learn the shape of the
              calculation instead of trusting it.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">What is here</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              <li>
                A{' '}
                <Link href="/calculator" className="link-underline">
                  risk calculator
                </Link>{' '}
                for position size, exposure, profit and loss and risk/reward, on long and short
                trades, with dedicated versions that speak the language of{' '}
                <Link href="/calculator/forex" className="link-underline">
                  forex
                </Link>
                ,{' '}
                <Link href="/calculator/futures" className="link-underline">
                  futures
                </Link>{' '}
                and{' '}
                <Link href="/calculator/crypto" className="link-underline">
                  crypto
                </Link>
                .
              </li>
              <li>
                A{' '}
                <Link href="/trading-dictionary" className="link-underline">
                  dictionary
                </Link>{' '}
                of {ALL_TERMS.length} terms, written in plain English, with a worked numeric
                example on every entry and a live calculator embedded in many of them.
              </li>
              <li>
                {getAllGuideSlugs().length} long-form{' '}
                <Link href="/guides" className="link-underline">
                  guides
                </Link>{' '}
                that work a single subject all the way through with real numbers.
              </li>
              <li>
                A{' '}
                <Link href="/journal" className="link-underline">
                  trading journal
                </Link>{' '}
                that computes win rate, average R, profit factor and drawdown from trades you log
                yourself.
              </li>
              <li>
                {getAllHistorySlugs().length} entries of{' '}
                <Link href="/market-history" className="link-underline">
                  market history
                </Link>
                , each one a crash or a crisis with the risk lesson that outlived it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Who writes this</h2>
            <p className="mt-2">
              {SITE.name} is built and maintained by one person, independently. There is no
              editorial team, no sponsor and no parent company, and the site sells nothing — no
              course, no signal service, no premium tier, no affiliate links to brokers. That
              matters more than it sounds: a site that earns a commission when you open a brokerage
              account has a reason to tell you to trade more, and this one does not.
            </p>
            <p>
              Everything on the site is written from scratch for it. Nothing is syndicated,
              reposted or spun from another publication. Where a definition is contested — and in
              trading plenty are — the entry says so rather than picking one and pretending it is
              settled.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">How the numbers are worked out</h2>
            <p className="mt-2">
              Every formula the calculators use is printed on the page that uses it, so nothing is
              hidden in code you cannot see. Futures contract specifications — tick size and tick
              value for ES, NQ, MES, MNQ, YM, RTY, CL and GC — are the real CME figures, and the
              point value is derived from them at runtime rather than stored separately, so the two
              can never drift apart and quietly disagree.
            </p>
            <p>
              Crypto prices come from CoinGecko. Foreign exchange rates are the European Central
              Bank reference rates, which are published once each working day — the site labels
              them as such rather than dressing a daily figure up as a live one.
            </p>
            <p>
              Every page that shows a market number also shows when that number was last refreshed.
              If it is an hour old, it says so.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">What this site will not do</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              <li>
                <strong className="font-medium text-ink">No real-time stock prices.</strong>{' '}
                Displaying live equity quotes requires a licence from the exchange that owns them.
                There is no such licence here, so those prices are absent rather than delayed and
                presented as current.
              </li>
              <li>
                <strong className="font-medium text-ink">No advice, no calls, no signals.</strong>{' '}
                Nothing here tells you what to buy, when to buy it, or what a market will do next.
                The calculators answer &ldquo;how much&rdquo;, never &ldquo;whether&rdquo;.
              </li>
              <li>
                <strong className="font-medium text-ink">No claims about returns.</strong>{' '}
                Position sizing does not make a losing strategy profitable. It controls the size of
                the losses, which is a different and much smaller promise.
              </li>
              <li>
                <strong className="font-medium text-ink">No account, and no upload.</strong>{' '}
                Your journal entries are stored by your own browser, on your own device. They are
                never transmitted anywhere, because there is no server here to transmit them to.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">Corrections</h2>
            <p className="mt-2">
              A wrong tick value or a mistyped formula is worse than no tool at all, because it is
              wrong in a way that looks right. If you find an error in a calculation, a definition
              or a contract specification, send it to{' '}
              <Link href="/contact" className="link-underline">
                the contact page
              </Link>{' '}
              and it gets fixed. Corrections take priority over new features.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">What this is not</h2>
            <p className="mt-2 rounded-xl border border-warn/25 bg-warn-wash px-5 py-4 text-sm leading-relaxed text-ink-muted">
              {DISCLAIMER} Trading carries risk, including the risk of losing more than you
              deposit on leveraged products. Nothing on this site is a recommendation to buy or
              sell anything.
            </p>
          </section>
        </div>

        <ButtonLink href="/calculator" className="mt-9">
          Try the calculator
          <ArrowRight size={16} aria-hidden />
        </ButtonLink>
      </article>
    </div>
  );
}
