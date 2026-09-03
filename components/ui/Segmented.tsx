'use client';

import { useId } from 'react';

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  /** Tints the active pill — used to color LONG green and SHORT red. */
  tone?: 'accent' | 'reward' | 'risk';
}

interface SegmentedProps<T extends string> {
  label: string;
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
}

const TONE: Record<string, string> = {
  accent: 'bg-accent-wash text-accent-soft border-accent/40',
  reward: 'bg-reward-wash text-reward-soft border-reward/40',
  risk: 'bg-risk-wash text-risk-soft border-risk/40',
};

/**
 * A radio group styled as a segmented control. Uses real radio inputs so
 * arrow-key navigation and screen reader semantics come for free.
 */
export function Segmented<T extends string>({ label, value, options, onChange }: SegmentedProps<T>) {
  const name = useId();

  return (
    <div>
      <span className="label mb-2 block">{label}</span>
      <div
        role="radiogroup"
        aria-label={label}
        className={`grid gap-1.5 rounded-xl border border-line bg-base-sunken/60 p-1.5 ${
          options.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'
        }`}
      >
        {options.map((option) => {
          const active = option.value === value;
          const tone = TONE[option.tone ?? 'accent'];
          return (
            <label
              key={option.value}
              className={`relative flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                active
                  ? `${tone} shadow-lift`
                  : 'border-transparent text-ink-faint hover:bg-white/[0.03] hover:text-ink-muted'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={active}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
