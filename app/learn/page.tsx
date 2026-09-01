import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { KnowledgeCheck } from '@/components/quiz/KnowledgeCheck';
import { QUIZ } from '@/data/quiz';
import { getTerm } from '@/lib/dictionary';
import { DISCLAIMER, SITE, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Test Yourself — Trading Risk Knowledge Check',
  description: `${QUIZ.length} short questions on position sizing, risk/reward, drawdown and leverage. Every answer comes with the reasoning behind it.`,
  alternates: { canonical: '/learn' },
  openGraph: {
    title: `Test Yourself — ${SITE.name}`,
    description:
      'Short questions on the trading concepts that decide real outcomes, with the reasoning behind every answer.',
    url: absoluteUrl('/learn'),
  },
};

export default function LearnPage() {
  // Every concept the quiz touches, so the page is a hub rather than a dead end.
  const covered = Array.from(new Set(QUIZ.map((q) => q.slug)))
    .map((slug) => getTerm(slug))
    .filter((term): term is NonNullable<typeof term> => Boolean(term));

  return (
    <div className="mx-auto max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Test Yourself', href: '/learn' },
        ]}
      />

      <header className="max-w-[58ch]">
        <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Test Yourself
        </h1>
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
          {QUIZ.length} questions on the relationships that actually decide outcomes — what happens
          to position size when a stop widens, what win rate a 1:3 trade demands, why a 50% loss
          needs a 100% gain. Every option explains itself, so a wrong answer is worth as much as a
          right one.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-10">
        <div className="min-w-0">
          <KnowledgeCheck />

          <p className="mt-4 text-2xs leading-relaxed text-ink-ghost">
            Your answers stay in this browser tab. Nothing is uploaded, and closing the tab clears
            them.
          </p>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="panel-flat p-5">
            <h2 className="label mb-3">Concepts covered</h2>
            <ul className="space-y-0.5">
              {covered.map((term) => (
                <li key={term.slug}>
                  <Link
                    href={`/trading-dictionary/${term.slug}`}
                    className="group flex items-center justify-between gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="truncate text-xs text-ink-muted transition-colors group-hover:text-ink">
                      {term.term}
                    </span>
                    <ArrowRight
                      size={12}
                      aria-hidden
                      className="shrink-0 text-ink-ghost opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-flat mt-3 p-5">
            <h2 className="text-sm font-medium text-ink">Prefer to learn by doing?</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
              Open the calculator and change one input at a time. The relationships in these
              questions become obvious once you watch them move.
            </p>
            <Link
              href="/calculator"
              className="mt-4 flex h-10 items-center justify-center rounded-xl bg-accent text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
            >
              Open Risk Calculator
            </Link>
          </div>
        </aside>
      </div>

      <p className="mt-10 max-w-[76ch] text-2xs leading-relaxed text-ink-ghost">{DISCLAIMER}</p>
    </div>
  );
}
