'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Info, X } from 'lucide-react';

interface ExplainProps {
  /** Plain-language answer to "what does this number mean?". */
  children: React.ReactNode;
  /** Dictionary slug for the "Learn more" link. */
  slug?: string;
  termLabel?: string;
  triggerLabel?: string;
}

/**
 * The "What is this?" affordance attached to every result. Expands inline
 * rather than floating, so it behaves identically on a phone and a desktop.
 */
export function Explain({
  children,
  slug,
  termLabel,
  triggerLabel = 'What does this mean?',
}: ExplainProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-2.5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="group/explain -ml-1 inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-2xs font-medium text-ink-ghost transition-colors hover:text-accent-soft"
      >
        {open ? (
          <X size={11} strokeWidth={2.5} aria-hidden />
        ) : (
          <Info size={11} strokeWidth={2.5} aria-hidden />
        )}
        <span>{open ? 'Close' : triggerLabel}</span>
      </button>

      {open && (
        <div
          id={panelId}
          className="mt-2 animate-fade-up rounded-lg border border-line bg-base-sunken/70 p-3"
        >
          <p className="text-xs leading-relaxed text-ink-muted">{children}</p>
          {slug && (
            <Link
              href={`/trading-dictionary/${slug}`}
              className="mt-2.5 inline-flex items-center gap-1 text-2xs font-medium text-accent-soft transition-colors hover:text-accent"
            >
              Learn more{termLabel ? `: ${termLabel}` : ''}
              <ArrowUpRight size={11} strokeWidth={2.5} aria-hidden />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
