'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { Stat } from '@/components/ui/Stat';
import { Explain } from '@/components/ui/Explain';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { TradeLadder } from './TradeLadder';
import { MathBreakdown } from './MathBreakdown';
import { calculateTrade } from '@/lib/trade-math';
import { formatCurrency, formatPercent, formatUnits, PLACEHOLDER } from '@/lib/format';
import type { Direction, IssueField, TradeInput } from '@/types/trade';

/**
 * The focused tool: one question — how many shares? — with the supporting
 * numbers a trader needs to act on the answer.
 */
export function PositionSizeTool() {
  const [accountSize, setAccountSize] = useState<number | null>(10000);
  const [riskPercent, setRiskPercent] = useState<number | null>(1);
  const [direction, setDirection] = useState<Direction>('long');
  const [entry, setEntry] = useState<number | null>(50);
  const [stopLoss, setStopLoss] = useState<number | null>(48);

  const input: TradeInput = useMemo(
    () => ({
      accountSize: accountSize ?? Number.NaN,
      riskPercent: riskPercent ?? Number.NaN,
      direction,
      entry: entry ?? Number.NaN,
      stopLoss: stopLoss ?? Number.NaN,
      takeProfit: null,
    }),
    [accountSize, riskPercent, direction, entry, stopLoss],
  );

  const result = useMemo(() => calculateTrade(input), [input]);

  const errors = useMemo(() => {
    const map = {} as Partial<Record<IssueField, string>>;
    for (const issue of result.issues) {
      if (issue.level === 'error' && !map[issue.field]) map[issue.field] = issue.message;
    }
    return map;
  }, [result.issues]);

  const warnings = result.issues.filter((issue) => issue.level === 'warning');

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
        <div className="panel space-y-4 p-5">
          <NumberField
            label="Account Size"
            value={accountSize}
            onChange={setAccountSize}
            prefix="$"
            step={1000}
            min={0}
            error={errors.accountSize}
          />
          <NumberField
            label="Risk Per Trade"
            value={riskPercent}
            onChange={setRiskPercent}
            suffix="%"
            step={0.25}
            min={0}
            max={100}
            error={errors.riskPercent}
            hint={result.valid ? `That is ${formatCurrency(result.maxRisk)} on this trade.` : undefined}
            adornment={
              <div className="flex gap-1">
                {[0.5, 1, 2].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRiskPercent(preset)}
                    aria-pressed={riskPercent === preset}
                    className={`rounded px-1.5 py-0.5 font-mono text-2xs transition-colors ${
                      riskPercent === preset
                        ? 'bg-accent-wash text-accent-soft'
                        : 'text-ink-ghost hover:bg-white/[0.05] hover:text-ink-muted'
                    }`}
                  >
                    {preset}%
                  </button>
                ))}
              </div>
            }
          />
          <Segmented
            label="Direction"
            value={direction}
            onChange={setDirection}
            options={[
              { value: 'long', label: 'LONG', tone: 'reward' },
              { value: 'short', label: 'SHORT', tone: 'risk' },
            ]}
          />
          <NumberField
            label="Entry Price"
            value={entry}
            onChange={setEntry}
            prefix="$"
            step={0.5}
            min={0}
            error={errors.entry}
          />
          <NumberField
            label="Stop Loss"
            value={stopLoss}
            onChange={setStopLoss}
            prefix="$"
            step={0.5}
            min={0}
            error={errors.stopLoss}
            hint={
              !errors.stopLoss && result.valid
                ? `${formatPercent(result.stopDistancePercent)} from entry`
                : `Place it ${direction === 'long' ? 'below' : 'above'} your entry.`
            }
          />
        </div>

        <div className="min-w-0 space-y-5">
          {!result.valid && (
            <div className="panel-flat flex items-start gap-3 border-risk/30 bg-risk-wash p-4">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-risk" aria-hidden />
              <ul className="space-y-1">
                {result.issues
                  .filter((issue) => issue.level === 'error')
                  .map((issue) => (
                    <li key={issue.message} className="text-xs leading-relaxed text-ink-muted">
                      {issue.message}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="panel p-6">
            <p className="label">Your position size</p>
            <p className="display-num mt-3 text-[3rem] leading-none text-ink sm:text-[3.75rem]">
              {result.valid ? (
                <AnimatedNumber value={result.positionSize} format={formatUnits} pulse />
              ) : (
                PLACEHOLDER
              )}
              <span className="ml-3 text-lg font-normal text-ink-faint">shares</span>
            </p>
            {result.valid && (
              <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                Trading whole shares, that is{' '}
                <span className="display-num text-ink-muted">
                  {formatUnits(result.positionSizeWhole)}
                </span>{' '}
                shares, risking{' '}
                <span className="display-num text-ink-muted">
                  {formatCurrency(result.riskAtWholeUnits)}
                </span>{' '}
                — at or just under your{' '}
                <span className="display-num text-ink-muted">{formatCurrency(result.maxRisk)}</span>{' '}
                budget.
              </p>
            )}
            <Explain slug="position-size" termLabel="Position Size">
              Position size is the amount of an asset you buy or sell. It is the one part of a trade
              you fully control, and it comes from dividing the money you are willing to lose by the
              distance to your stop.
            </Explain>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Stat
              label="Maximum Risk"
              tone="risk"
              value={
                result.valid ? (
                  <AnimatedNumber value={result.maxRisk} format={formatCurrency} />
                ) : (
                  PLACEHOLDER
                )
              }
            />
            <Stat
              label="Risk Per Share"
              value={
                result.valid ? (
                  <AnimatedNumber value={result.riskPerUnit} format={formatCurrency} />
                ) : (
                  PLACEHOLDER
                )
              }
            />
            <Stat
              label="Position Value"
              tone={result.accountExposurePercent > 100 ? 'warn' : 'default'}
              value={
                result.valid ? (
                  <AnimatedNumber value={result.positionValue} format={formatCurrency} />
                ) : (
                  PLACEHOLDER
                )
              }
              sub={
                result.valid
                  ? `${formatPercent(result.accountExposurePercent)} of account`
                  : undefined
              }
            />
          </div>

          {warnings.length > 0 && (
            <div className="panel-flat border-warn/25 bg-warn-wash p-4">
              <div className="flex items-start gap-3">
                <Info size={15} className="mt-0.5 shrink-0 text-warn" aria-hidden />
                <ul className="space-y-1.5">
                  {warnings.map((issue) => (
                    <li key={issue.message} className="text-xs leading-relaxed text-ink-muted">
                      {issue.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <TradeLadder
            compact
            direction={direction}
            entry={entry}
            stopLoss={stopLoss}
            takeProfit={null}
          />
        </div>
      </div>

      <MathBreakdown input={input} result={result} />
    </div>
  );
}
