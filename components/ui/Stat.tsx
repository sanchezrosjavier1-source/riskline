import type { ReactNode } from 'react';

type Tone = 'default' | 'risk' | 'reward' | 'accent' | 'warn';

const VALUE_TONE: Record<Tone, string> = {
  default: 'text-ink',
  risk: 'text-risk-soft',
  reward: 'text-reward-soft',
  accent: 'text-accent-soft',
  warn: 'text-warn',
};

const RAIL_TONE: Record<Tone, string> = {
  default: 'bg-line-strong',
  risk: 'bg-risk/60',
  reward: 'bg-reward/60',
  accent: 'bg-accent/60',
  warn: 'bg-warn/60',
};

interface StatProps {
  label: string;
  value: ReactNode;
  /** Secondary line under the value, e.g. "4.0% of entry price". */
  sub?: ReactNode;
  tone?: Tone;
  /** Larger type for the two or three figures that matter most. */
  emphasis?: boolean;
  children?: ReactNode;
}

/**
 * One result in the calculator grid. The left rail carries the tone so the
 * meaning survives for anyone who cannot distinguish the accent colors.
 */
export function Stat({ label, value, sub, tone = 'default', emphasis = false, children }: StatProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-line bg-base-raised/40 p-4 transition-colors duration-300 hover:border-line-strong hover:bg-base-raised/70">
      <span
        aria-hidden
        className={`absolute left-0 top-4 h-6 w-[2px] rounded-r-full transition-all duration-300 group-hover:h-10 ${RAIL_TONE[tone]}`}
      />
      <p className="label">{label}</p>
      <p
        className={`display-num mt-2 ${
          emphasis ? 'text-[1.75rem] leading-none sm:text-[2rem]' : 'text-xl leading-none'
        } ${VALUE_TONE[tone]}`}
      >
        {value}
      </p>
      {sub && <p className="mt-2 text-xs leading-snug text-ink-faint">{sub}</p>}
      {children}
    </div>
  );
}
