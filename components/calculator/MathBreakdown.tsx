'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sigma } from 'lucide-react';
import {
  formatCompactPrice,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRatio,
  formatUnits,
} from '@/lib/format';
import type { TradeInput, TradeResult } from '@/types/trade';

interface Step {
  label: string;
  /** The substitution, with real numbers in place of the symbols. */
  working: string;
  result: string;
  slug?: string;
}

function buildSteps(input: TradeInput, result: TradeResult, unit: string): Step[] {
  const { accountSize, riskPercent, direction, entry, stopLoss, takeProfit } = input;
  const long = direction === 'long';
  const multiplier =
    typeof input.contractMultiplier === 'number' && input.contractMultiplier > 0
      ? input.contractMultiplier
      : 1;
  const hasMultiplier = multiplier !== 1;

  const steps: Step[] = [
    {
      label: 'Maximum Risk',
      working: `${formatCurrency(accountSize)} × ${formatNumber(riskPercent, 3)}%`,
      result: formatCurrency(result.maxRisk),
      slug: 'risk-per-trade',
    },
    {
      label: `Price Distance`,
      working: long
        ? `${formatCompactPrice(entry)} − ${formatCompactPrice(stopLoss)}`
        : `${formatCompactPrice(stopLoss)} − ${formatCompactPrice(entry)}`,
      result: formatCompactPrice(result.riskPerUnit),
      slug: 'stop-distance',
    },
  ];

  if (hasMultiplier) {
    steps.push({
      label: `Risk Per ${unit}`,
      working: `${formatCompactPrice(result.riskPerUnit)} × ${formatCurrency(multiplier)}/pt`,
      result: formatCompactPrice(result.dollarRiskPerUnit),
    });
  }

  steps.push(
    {
      label: 'Position Size',
      working: `${formatCurrency(result.maxRisk)} ÷ ${formatCompactPrice(result.dollarRiskPerUnit)}`,
      result: `${formatUnits(result.positionSize)} ${unit.toLowerCase()}${
        result.positionSize === 1 ? '' : 's'
      }`,
      slug: 'position-size',
    },
    {
      label: 'Position Value',
      working: hasMultiplier
        ? `${formatUnits(result.positionSize)} × ${formatCompactPrice(entry)} × ${formatCurrency(multiplier)}/pt`
        : `${formatUnits(result.positionSize)} × ${formatCompactPrice(entry)}`,
      result: formatCurrency(result.positionValue),
      slug: 'notional-value',
    },
  );

  if (result.rewardPerUnit !== null && takeProfit != null) {
    steps.push({
      label: 'Reward Distance',
      working: long
        ? `${formatCompactPrice(takeProfit)} − ${formatCompactPrice(entry)}`
        : `${formatCompactPrice(entry)} − ${formatCompactPrice(takeProfit)}`,
      result: formatCompactPrice(result.rewardPerUnit),
      slug: 'take-profit',
    });
    steps.push({
      label: 'Potential Profit',
      working: hasMultiplier
        ? `${formatUnits(result.positionSize)} × ${formatCompactPrice(result.rewardPerUnit)} × ${formatCurrency(multiplier)}/pt`
        : `${formatUnits(result.positionSize)} × ${formatCompactPrice(result.rewardPerUnit)}`,
      result: formatCurrency(result.potentialProfit),
    });
    steps.push({
      label: 'Risk / Reward',
      working: `${formatCompactPrice(result.rewardPerUnit)} ÷ ${formatCompactPrice(result.riskPerUnit)}`,
      result: formatRatio(result.riskRewardRatio),
      slug: 'risk-reward-ratio',
    });
    steps.push({
      label: 'Break-Even Win Rate',
      working: `1 ÷ (1 + ${formatNumber(result.riskRewardRatio, 2)})`,
      result: formatPercent(result.breakEvenWinRate, 1),
      slug: 'break-even-win-rate',
    });
  }

  return steps;
}

/**
 * Shows the arithmetic behind every result with the user's own numbers
 * substituted in. This is the part that turns a calculator into a lesson.
 */
export function MathBreakdown({
  input,
  result,
  unit = 'Share',
  defaultOpen = true,
}: {
  input: TradeInput;
  result: TradeResult;
  unit?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (!result.valid) return null;
  const steps = buildSteps(input, result, unit);

  return (
    <section className="panel-flat overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <Sigma size={15} className="shrink-0 text-accent" aria-hidden />
        <span className="flex-1 text-sm font-medium text-ink">How we calculated this</span>
        <ChevronDown
          size={16}
          aria-hidden
          className={`shrink-0 text-ink-faint transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="animate-fade-in border-t border-line">
          <ol className="divide-y divide-line">
            {steps.map((step, index) => (
              <li
                key={step.label}
                className="flex flex-col gap-1.5 px-5 py-3.5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <div className="flex min-w-0 items-baseline gap-2.5 sm:w-[11.5rem] sm:shrink-0">
                  <span className="display-num text-2xs text-ink-ghost">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {step.slug ? (
                    <Link
                      href={`/trading-dictionary/${step.slug}`}
                      className="truncate text-xs font-medium text-ink-muted transition-colors hover:text-accent-soft"
                    >
                      {step.label}
                    </Link>
                  ) : (
                    <span className="truncate text-xs font-medium text-ink-muted">{step.label}</span>
                  )}
                </div>

                <div className="flex flex-1 flex-wrap items-baseline gap-x-2 gap-y-1 pl-7 sm:pl-0">
                  <code className="display-num text-xs text-ink-faint">{step.working}</code>
                  <span aria-hidden className="text-xs text-ink-ghost">
                    =
                  </span>
                  <code className="display-num text-sm font-medium text-ink">{step.result}</code>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
