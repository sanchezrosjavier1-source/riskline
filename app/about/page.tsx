import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { ALL_TERMS } from '@/lib/dictionary';
import { DISCLAIMER, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `Why ${SITE.name} exists: a free risk calculator and trading dictionary built to connect the numbers to the concepts behind them.`,
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
        <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-muted">{SITE.tagline}</p>

        <div className="prose-riskline mt-8 space-y-6">
          <section>
            <h2 className="text-sm font-medium text-ink">The problem this solves</h2>
            <p className="mt-2">
              Most trading education is either a wall of jargon with no numbers, or a calculator
              with no explanation of what the numbers mean. {SITE.name} was built to close that
              gap: every calculated result links to the concept behind it, and most concepts carry
              a working calculator inside their own explanation.
            </p>
            <p>
              The idea is a simple loop — learn a concept, understand it by changing the inputs,
              calculate it on your own numbers, then follow the link to what comes next.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">What&apos;s here</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              <li>
                A full{' '}
                <Link href="/calculator" className="link-underline">
                  risk calculator
                </Link>{' '}
                covering position size, exposure, potential profit and loss, and risk/reward — for
                long and short trades.
              </li>
              <li>
                An interactive dictionary of {ALL_TERMS.length} trading terms, each with a
                plain-language explanation, common mistakes, and — for many terms — a live tool
                built into the page.
              </li>
              <li>
                A short{' '}
                <Link href="/learn" className="link-underline">
                  knowledge check
                </Link>{' '}
                on the relationships that actually decide trading outcomes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">No account, no gate</h2>
            <p className="mt-2">
              The calculator and the dictionary work immediately, without signing up. Saved
              scenarios and quiz progress live only in your browser for the current session — see
              the{' '}
              <Link href="/privacy" className="link-underline">
                Privacy Policy
              </Link>{' '}
              for the specifics.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-ink">What this is not</h2>
            <p className="mt-2 rounded-xl border border-warn/25 bg-warn-wash px-5 py-4 text-sm leading-relaxed text-ink-muted">
              {DISCLAIMER}
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
