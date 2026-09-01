'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { Stat } from '@/components/ui/Stat';
import { Explain } from '@/components/ui/Explain';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { TradeLadder } from './TradeLadder';
import { expectedValue, rewardPerUnitFor, riskPerUnitFor, safeDivide } from '@/lib/trade-math';
import { formatCurrency, formatNumber, formatPercent, formatRatio, PLACEHOLDER } from '@/lib/format';
import type { Direction } from '@/types/trade';

/**
 * Compares the upside of a trade to its downside, then answers the question
 * that actually decides profitability: how often do you need to be right?
 */
export function RiskRewardTool() {
  const [direction, setDirection] = useState<Direction>('long');
  const [entry, setEntry] = useState<number | null>(50);
  const [stopLoss, setStopLoss] = useState<number | null>(48);
  const [takeProfit, setTakeProfit] = useState<number | null>(56);
  const [shares, setShares] = useState<number | null>(50);
  const [winRate, setWinRate] = useState<number>(40);

  const risk =
    entry !== null && stopLoss !== null && entry > 0 && stopLoss > 0
      ? riskPerUnitFor(direction, entry, stopLoss)
      : null;
  const reward =
    entry !== null && takeProfit !== null && entry > 0 && takeProfit > 0
      ? rewardPerUnitFor(direction, entry, takeProfit)
      : null;

  const stopValid = risk !== null && risk > 0;
  const targetValid = reward !== null && reward > 0;
  const valid = stopValid && targetValid;

  const ratio = valid ? safeDivide(reward, risk) : null;
  const breakEven = ratio !== null ? (safeDivide(1, 1 + ratio) ?? 0) * 100 : null;

  const size = shares !== null && shares > 0 ? shares : null;
  const totalRisk = stopValid && size !== null ? risk * size : null;
  const totalReward = targetValid && size !== null ? reward * size : null;

  const ev = useMemo(() => {
    if (totalRisk === null || totalReward === null) return null;
    return expectedValue({
      winRatePercent: winRate,
      averageWin: totalReward,
      averageLoss: totalRisk,
    });
  }, [winRate, totalRisk, totalReward]);

  const profitable = breakEven !== null && winRate > breakEven;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
      <div className="panel space-y-4 p-5">
        <Segmented
          label="Direction"
          value={direction}
          onChange={setDirection}
          options={[
            { value: 'long', label: 'LONG', tone: 'reward' },
            { value: 'short', label: 'SHORT', tone: 'risk' },
          ]}
        />
        <NumberField label="Entry Price" value={entry} onChange={setEntry} prefix="$" step={0.5} min={0} />
        <NumberField
          label="Stop Loss"
          value={stopLoss}
          onChange={setStopLoss}
          prefix="$"
          step={0.5}
          min={0}
          error={
            !stopValid && entry !== null && stopLoss !== null
              ? `On a ${direction} trade the stop belongs ${
                  direction === 'long' ? 'below' : 'above'
                } the entry.`
              : undefined
          }
        />
        <NumberField
          label="Take Profit"
          value={takeProfit}
          onChange={setTakeProfit}
          prefix="$"
          step={0.5}
          min={0}
          error={
            !targetValid && entry !== null && takeProfit !== null
              ? `On a ${direction} trade the target belongs ${
                  direction === 'long' ? 'above' : 'below'
                } the entry.`
              : undefined
          }
        />
        <NumberField
          label="Position Size"
          value={shares}
          onChange={setShares}
          step={10}
          min={0}
          suffix="sh"
          hint="Used to turn the ratio into dollars."
        />
      </div>

      <div className="min-w-0 space-y-5">
        {!valid && (
          <div className="panel-flat flex items-start gap-3 border-risk/30 bg-risk-wash p-4">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-risk" aria-hidden />
            <p className="text-xs leading-relaxed text-ink-muted">
              A {direction} trade needs its stop {direction === 'long' ? 'below' : 'above'} the entry
              and its target {direction === 'long' ? 'above' : 'below'} it. Fix the levels and the
              ratio appears.
            </p>
          </div>
        )}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,260px)]">
          <div className="grid gap-3 sm:grid-cols-2">
            <Stat
              label="Risk / Reward"
              emphasis
              tone={ratio !== null && ratio >= 2 ? 'reward' : 'default'}
              value={formatRatio(ratio)}
              sub={valid ? `Risking ${formatCurrency(risk)} to make ${formatCurrency(reward)} per share` : undefined}
            >
              <Explain slug="risk-reward-ratio" termLabel="Risk/Reward Ratio">
                How much you stand to gain against how much you stand to lose. It depends only on
                where your entry, stop and target sit — not on your account size.
              </Explain>
            </Stat>

            <Stat
              label="Break-Even Win Rate"
              emphasis
              tone="accent"
              value={
                breakEven !== null ? (
                  <AnimatedNumber value={breakEven} format={(v) => formatPercent(v, 1)} pulse />
                ) : (
                  PLACEHOLDER
                )
              }
              sub="Below this you lose money over time"
            >
              <Explain slug="break-even-win-rate" termLabel="Break-Even Win Rate">
                The win rate this ratio demands just to stand still. Spread and commissions push the
                real threshold a little higher than the arithmetic suggests.
              </Explain>
            </Stat>

            <Stat
              label="Total Risk"
              tone="risk"
              value={
                totalRisk !== null ? (
                  <AnimatedNumber value={-totalRisk} format={formatCurrency} />
                ) : (
                  PLACEHOLDER
                )
              }
              sub={size !== null ? `On ${formatNumber(size, 0)} shares` : 'Enter a position size'}
            />

            <Stat
              label="Total Reward"
              tone="reward"
              value={
                totalReward !== null ? (
                  <AnimatedNumber
                    value={totalReward}
                    format={(v) => (v === null ? PLACEHOLDER : `+${formatCurrency(v)}`)}
                  />
                ) : (
                  PLACEHOLDER
                )
              }
              sub={size !== null ? `On ${formatNumber(size, 0)} shares` : 'Enter a position size'}
            />
          </div>

          <TradeLadder
            compact
            direction={direction}
            entry={entry}
            stopLoss={stopLoss}
            takeProfit={takeProfit}
            riskRewardRatio={ratio}
          />
        </div>

        {/* --------------------------------------------------- win rate explorer */}
        <section className="panel-flat p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-sm font-medium text-ink">What if you win this often?</h2>
            <span className="display-num text-lg text-ink">{formatPercent(winRate, 0)}</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
            Drag to see what this setup returns per trade at different win rates.
          </p>

          <label htmlFor="win-rate" className="sr-only">
            Win rate
          </label>
          <input
            id="win-rate"
            type="range"
            min={0}
            max={100}
            step={1}
            value={winRate}
            onChange={(event) => setWinRate(Number(event.target.value))}
            className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line-strong accent-accent"
            aria-valuetext={`${winRate} percent win rate`}
          />
          <div className="mt-1.5 flex justify-between text-2xs text-ink-ghost">
            <span>0%</span>
            {breakEven !== null && (
              <span className="text-accent-soft">
                break even at {formatPercent(breakEven, 1)}
              </span>
            )}
            <span>100%</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="label">Expected Per Trade</p>
              <p
                className={`display-num mt-1.5 text-lg leading-none ${
                  ev !== null && ev >= 0 ? 'text-reward-soft' : 'text-risk-soft'
                }`}
              >
                {ev !== null ? <AnimatedNumber value={ev} format={formatCurrency} /> : PLACEHOLDER}
              </p>
            </div>
            <div>
              <p className="label">Over 100 Trades</p>
              <p
                className={`display-num mt-1.5 text-lg leading-none ${
                  ev !== null && ev >= 0 ? 'text-reward-soft' : 'text-risk-soft'
                }`}
              >
                {ev !== null ? (
                  <AnimatedNumber value={ev * 100} format={formatCurrency} />
                ) : (
                  PLACEHOLDER
                )}
              </p>
            </div>
            <div>
              <p className="label">Verdict</p>
              <p
                className={`display-num mt-1.5 text-lg leading-none ${
                  profitable ? 'text-reward-soft' : 'text-risk-soft'
                }`}
              >
                {breakEven === null ? PLACEHOLDER : profitable ? 'Positive' : 'Negative'}
              </p>
            </div>
          </div>

          {breakEven !== null && (
            <p className="mt-4 rounded-lg border border-line bg-base-sunken/50 px-3.5 py-3 text-xs leading-relaxed text-ink-muted">
              {profitable ? (
                <>
                  At {formatRatio(ratio)} you only need {formatPercent(breakEven, 1)} accuracy to
                  break even, and {formatPercent(winRate, 0)} clears it. This is why traders who are
                  wrong more often than they are right can still make money.
                </>
              ) : (
                <>
                  At {formatPercent(winRate, 0)} you fall short of the {formatPercent(breakEven, 1)}{' '}
                  this ratio requires. Either the target needs to be further out, the stop tighter,
                  or the setup needs to be more selective.
                </>
              )}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
