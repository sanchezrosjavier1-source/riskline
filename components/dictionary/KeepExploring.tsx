import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORY_MAP } from '@/data/categories';
import type { Term } from '@/types/dictionary';

/**
 * The end of every term page: where you came from, where you can go next,
 * and the concepts that sit alongside this one.
 */
export function KeepExploring({
  previous,
  next,
  related,
}: {
  previous: Term | null;
  next: Term | null;
  related: Term[];
}) {
  return (
    <section aria-labelledby="keep-exploring" className="mt-14">
      <h2 id="keep-exploring" className="text-lg font-semibold tracking-tight text-ink">
        Keep exploring
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
        These concepts are connected. Understanding one usually makes the next one easier.
      </p>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {related.map((term) => (
          <Link
            key={term.slug}
            href={`/trading-dictionary/${term.slug}`}
            className="group flex flex-col rounded-xl border border-line bg-base-raised/40 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent-wash"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate text-sm font-medium text-ink transition-colors group-hover:text-accent-soft">
                  {term.term}
                </span>
                {term.widget && (
                  <Sparkles size={11} className="shrink-0 text-accent" aria-label="Interactive" />
                )}
              </span>
              <span className="shrink-0 text-2xs text-ink-ghost">
                {CATEGORY_MAP[term.category]?.label}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">{term.short}</p>
          </Link>
        ))}
      </div>

      <nav
        aria-label="Alphabetical navigation"
        className="mt-6 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/trading-dictionary/${previous.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-line bg-base-raised/30 p-4 transition-all duration-300 hover:border-line-strong hover:bg-base-raised/60"
          >
            <ArrowLeft
              size={15}
              aria-hidden
              className="shrink-0 text-ink-ghost transition-all duration-200 group-hover:-translate-x-0.5 group-hover:text-accent"
            />
            <span className="min-w-0">
              <span className="label block">Previous</span>
              <span className="mt-0.5 block truncate text-sm text-ink">{previous.term}</span>
            </span>
          </Link>
        ) : (
          <div aria-hidden />
        )}

        {next && (
          <Link
            href={`/trading-dictionary/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-xl border border-line bg-base-raised/30 p-4 text-right transition-all duration-300 hover:border-line-strong hover:bg-base-raised/60"
          >
            <span className="min-w-0">
              <span className="label block">Next</span>
              <span className="mt-0.5 block truncate text-sm text-ink">{next.term}</span>
            </span>
            <ArrowRight
              size={15}
              aria-hidden
              className="shrink-0 text-ink-ghost transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </Link>
        )}
      </nav>
    </section>
  );
}
