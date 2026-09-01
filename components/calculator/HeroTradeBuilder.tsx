'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { NumberField } from '@/components/ui/NumberField';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { TradeLadder } from './TradeLadder';
import { calculateTrade } from '@/lib/trade-math';
import { formatCurrency, formatPercent, formatRatio, formatUnits, PLACEHOLDER } from '@/lib/format';
import type { Direction, TradeInput } from '@/types/trade';

/**
 * The homepage demo. Same math as the full calculator, reduced to the five
 * inputs that show what the product does within a few seconds.
 */
export function HeroTradeBuilder() {
  const [accountSize, setAccountSize] = useState<number | null>(10000);
  const [riskPercent, setRiskPercent] = useState<number | null>(1);
  const [direction, setDirection] = useState<Direction>('long');
  const [entry, setEntry] = useState<number | null>(50);
  const [stopLoss, setStopLoss] = useState<number | null>(48);
  const [takeProfit, setTakeProfit] = useState<number | null>(56);

  const input: TradeInput = useMemo(
    () => ({
      accountSize: accountSize ?? Number.NaN,
      riskPercent: riskPercent ?? Number.NaN,
      direction,
      entry: entry ?? Number.NaN,
      stopLoss: stopLoss ?? Number.NaN,
      takeProfit,
    }),
    [accountSize, riskPercent, direction, entry, stopLoss, takeProfit],
  );

  const result = useMemo(() => calculateTrade(input), [input]);

  const firstError = result.issues.find((issue) => issue.level === 'error');

  const flipDirection = () => {
    const next: Direction = direction === 'long' ? 'short' : 'long';
    setDirection(next);
    // Mirror the levels around the entry so the demo stays valid on flip.
    if (entry !== null && stopLoss !== null) {
      setStopLoss(Number((entry + (entry - stopLoss)).toFixed(4)));
    }
    if (entry !== null && takeProfit !== null) {
      setTakeProfit(Number((entry - (takeProfit - entry)).toFixed(4)));
    }
  };

  const params = new URLSearchParams({
    account: String(accountSize ?? ''),
    risk: String(riskPercent ?? ''),
    direction,
    entry: String(entry ?? ''),
    stop: String(stopLoss ?? ''),
    ...(takeProfit !== null ? { tp: String(takeProfit) } : {}),
  });

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-reward opacity-70 animate-pulse-ring" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-reward" />
          </span>
          <span className="label">Live example</span>
        </div>
        <button
          type="button"
          onClick={flipDirection}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-2xs font-medium tracking-wide transition-all duration-200 ${
            direction === 'long'
              ? 'border-reward/40 bg-reward-wash text-reward-soft'
              : 'border-risk/40 bg-risk-wash text-risk-soft'
          }`}
          aria-label={`Direction: ${direction}. Click to switch.`}
        >
          {direction === 'long' ? (
            <TrendingUp size={12} aria-hidden />
          ) : (
            <TrendingDown size={12} aria-hidden />
          )}
          {direction === 'long' ? 'LONG' : 'SHORT'}
        </button>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,210px)]">
        <div className="min-w-0 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="Account Size"
              value={accountSize}
              onChange={setAccountSize}
              prefix="$"
              step={1000}
              min={0}
              size="sm"
            />
            <NumberField
              label="Risk"
              value={riskPercent}
              onChange={setRiskPercent}
              suffix="%"
              step={0.25}
              min={0}
              max={100}
              size="sm"
            />
            <NumberField
              label="Entry"
              value={entry}
              onChange={setEntry}
              prefix="$"
              step={0.5}
              min={0}
              size="sm"
            />
            <NumberField
              label="Stop"
              value={stopLoss}
              onChange={setStopLoss}
              prefix="$"
              step={0.5}
              min={0}
              size="sm"
            />
            <div className="col-span-2">
              <NumberField
                label="Take Profit"
                value={takeProfit}
                onChange={setTakeProfit}
                prefix="$"
                step={0.5}
                min={0}
                optional
                size="sm"
              />
            </div>
          </div>

          <div className="hairline" />

          {firstError ? (
            <p className="rounded-lg border border-risk/25 bg-risk-wash px-3 py-2.5 text-xs leading-relaxed text-ink-muted">
              {firstError.message}
            </p>
          ) : (
            <dl className="grid grid-cols-3 gap-3">
              <HeroStat
                label="Max Risk"
                tone="text-risk-soft"
                value={
                  <AnimatedNumber value={result.maxRisk} format={(v) => formatCurrency(v)} pulse />
                }
              />
              <HeroStat
                label="Position Size"
                tone="text-ink"
                value={
                  <AnimatedNumber value={result.positionSize} format={(v) => formatUnits(v)} pulse />
                }
                sub="shares"
              />
              <HeroStat
                label="Risk / Reward"
                tone="text-reward-soft"
                value={<span>{formatRatio(result.riskRewardRatio)}</span>}
              />
            </dl>
          )}

          {result.valid && (
            <p className="text-xs leading-relaxed text-ink-faint">
              Risking{' '}
              <span className="display-num text-ink-muted">{formatCurrency(result.maxRisk)}</span> with
              a{' '}
              <span className="display-num text-ink-muted">
                {formatCurrency(result.riskPerUnit)}
              </span>{' '}
              stop means{' '}
              <span className="display-num text-ink">{formatUnits(result.positionSize)} shares</span>
              {result.potentialProfit !== null && (
                <>
                  {' '}
                  — and{' '}
                  <span className="display-num text-reward-soft">
                    +{formatCurrency(result.potentialProfit)}
                  </span>{' '}
                  if your target is reached.
                </>
              )}
              {result.potentialProfit === null && '.'}
            </p>
          )}

          <Link
            href={`/calculator?${params.toString()}`}
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft transition-colors hover:text-accent"
          >
            Open this trade in the full calculator
            <ArrowRight
              size={13}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <TradeLadder
          compact
          direction={direction}
          entry={entry}
          stopLoss={stopLoss}
          takeProfit={takeProfit}
          riskRewardRatio={result.riskRewardRatio}
        />
      </div>
    </div>
  );
}

function HeroStat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  tone: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="label truncate">{label}</dt>
      <dd className={`display-num mt-1.5 text-lg leading-none ${tone}`}>
        {value}
        {sub && <span className="ml-1 text-2xs font-normal text-ink-ghost">{sub}</span>}
      </dd>
    </div>
  );
}
