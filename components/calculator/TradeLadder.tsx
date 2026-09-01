'use client';

import { ladderGeometry } from '@/lib/trade-math';
import { formatPrice, formatRatio } from '@/lib/format';
import type { Direction } from '@/types/trade';

interface TradeLadderProps {
  direction: Direction;
  entry: number | null;
  stopLoss: number | null;
  takeProfit?: number | null;
  riskRewardRatio?: number | null;
  /** Shorter frame for the homepage hero and the focused tools. */
  compact?: boolean;
}

const LINE_TRANSITION = 'transition-[bottom] duration-500 ease-out';
const ZONE_TRANSITION = 'transition-[bottom,height] duration-500 ease-out';

/**
 * The price ladder: entry in the middle, risk on the losing side, reward on
 * the winning side. Geometry comes from the same function the numbers use, so
 * the picture can never disagree with the results.
 *
 * Markers are positioned by `bottom` and shifted down half their own height,
 * which centers them on their price line rather than hanging them above it.
 */
export function TradeLadder({
  direction,
  entry,
  stopLoss,
  takeProfit,
  riskRewardRatio,
  compact = false,
}: TradeLadderProps) {
  const geometry =
    entry !== null && stopLoss !== null
      ? ladderGeometry({ direction, entry, stopLoss, takeProfit })
      : null;

  const plotHeight = compact ? 'h-[248px]' : 'h-[336px] sm:h-[392px]';

  if (!geometry || entry === null || stopLoss === null) {
    return (
      <div className="overflow-hidden rounded-xl border border-dashed border-line bg-base-sunken/40">
        <div className={`relative ${plotHeight}`}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-sm text-ink-muted">No trade to draw yet</p>
            <p className="max-w-[26ch] text-xs leading-relaxed text-ink-ghost">
              Enter an entry price and a stop on the correct side of it, and the ladder appears here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { entryPct, stopPct, targetPct } = geometry;

  const riskBottom = Math.min(entryPct, stopPct);
  const riskHeight = Math.abs(entryPct - stopPct);
  const rewardBottom = targetPct !== null ? Math.min(entryPct, targetPct) : 0;
  const rewardHeight = targetPct !== null ? Math.abs(targetPct - entryPct) : 0;

  const summary =
    `${direction === 'long' ? 'Long' : 'Short'} trade. Entry at ${formatPrice(entry)}, ` +
    `stop loss at ${formatPrice(stopLoss)}` +
    (targetPct !== null && takeProfit ? `, take profit at ${formatPrice(takeProfit)}.` : '.');

  const showRatio = riskRewardRatio != null && riskRewardRatio > 0;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-base-sunken/50">
      {/* The ratio lives in its own strip so it can never collide with a marker. */}
      <div className="flex items-center justify-between gap-2 border-b border-line px-3.5 py-2.5">
        <span className="label whitespace-nowrap">
          {direction === 'long' ? 'Long' : 'Short'}
          {!compact && ' trade'}
        </span>
        {showRatio && (
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="label">R:R</span>
            <span className="display-num text-sm text-ink">{formatRatio(riskRewardRatio)}</span>
          </span>
        )}
      </div>

      <div role="img" aria-label={summary} className={`relative ${plotHeight} overflow-hidden`}>
        {/* Faint measure lines so the zones read as a chart, not a bar. */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to top, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 34px)',
          }}
        />

        {targetPct !== null && (
          <div
            aria-hidden
            className={`absolute inset-x-0 bg-gradient-to-t from-reward/[0.02] to-reward/[0.13] ${ZONE_TRANSITION}`}
            style={{ bottom: `${rewardBottom}%`, height: `${rewardHeight}%` }}
          />
        )}

        <div
          aria-hidden
          className={`absolute inset-x-0 bg-gradient-to-b from-risk/[0.02] to-risk/[0.16] ${ZONE_TRANSITION}`}
          style={{ bottom: `${riskBottom}%`, height: `${riskHeight}%` }}
        />

        {/* Zone captions, hidden when the band is too short to hold text. */}
        {targetPct !== null && rewardHeight > 14 && (
          <div
            aria-hidden
            className={`absolute left-4 flex translate-y-1/2 items-center ${ZONE_TRANSITION}`}
            style={{ bottom: `${rewardBottom + rewardHeight / 2}%` }}
          >
            <span className="text-2xs font-medium uppercase tracking-label text-reward/80">
              Reward
            </span>
          </div>
        )}
        {riskHeight > 14 && (
          <div
            aria-hidden
            className={`absolute left-4 flex translate-y-1/2 items-center ${ZONE_TRANSITION}`}
            style={{ bottom: `${riskBottom + riskHeight / 2}%` }}
          >
            <span className="text-2xs font-medium uppercase tracking-label text-risk/80">Risk</span>
          </div>
        )}

        {targetPct !== null && takeProfit != null && (
          <LadderLine label="Take Profit" price={takeProfit} pct={targetPct} tone="reward" />
        )}
        <LadderLine label="Entry" price={entry} pct={entryPct} tone="entry" pulse />
        <LadderLine label="Stop Loss" price={stopLoss} pct={stopPct} tone="risk" />
      </div>
    </div>
  );
}

const TONE_STYLES = {
  reward: { line: 'bg-reward/55', dot: 'bg-reward', text: 'text-reward-soft' },
  risk: { line: 'bg-risk/55', dot: 'bg-risk', text: 'text-risk-soft' },
  entry: { line: 'bg-ink-muted/50', dot: 'bg-ink', text: 'text-ink' },
} as const;

function LadderLine({
  label,
  price,
  pct,
  tone,
  pulse = false,
}: {
  label: string;
  price: number;
  pct: number;
  tone: keyof typeof TONE_STYLES;
  pulse?: boolean;
}) {
  const styles = TONE_STYLES[tone];

  return (
    <div
      className={`absolute inset-x-0 flex translate-y-1/2 items-center ${LINE_TRANSITION}`}
      style={{ bottom: `${pct}%` }}
    >
      <div className="relative ml-3 flex h-2.5 w-2.5 shrink-0 items-center justify-center">
        <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
        {pulse && (
          <span
            aria-hidden
            className={`absolute h-2 w-2 rounded-full ${styles.dot} animate-pulse-ring`}
          />
        )}
      </div>
      <div className={`ml-2 mr-2 h-px flex-1 ${styles.line}`} />
      <div className="mr-3 flex shrink-0 flex-col items-end">
        <span className="text-[0.5625rem] font-medium uppercase tracking-label text-ink-faint">
          {label}
        </span>
        <span className={`display-num text-sm leading-tight ${styles.text}`}>
          {formatPrice(price)}
        </span>
      </div>
    </div>
  );
}
