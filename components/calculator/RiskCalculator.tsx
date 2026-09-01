'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  Info,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { Stat } from '@/components/ui/Stat';
import { Explain } from '@/components/ui/Explain';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Button } from '@/components/ui/Button';
import { TradeLadder } from './TradeLadder';
import { MathBreakdown } from './MathBreakdown';
import { calculateTrade } from '@/lib/trade-math';
import {
  formatCurrency,
  formatPercent,
  formatRatio,
  formatUnits,
  PLACEHOLDER,
} from '@/lib/format';
import { useSessionState } from '@/lib/hooks';
import type { Direction, IssueField, TradeInput } from '@/types/trade';

export interface CalculatorInitialValues {
  accountSize?: number;
  riskPercent?: number;
  direction?: Direction;
  entry?: number;
  stopLoss?: number;
  takeProfit?: number | null;
}

const DEFAULTS: Required<Omit<CalculatorInitialValues, 'takeProfit'>> & { takeProfit: number | null } =
  {
    accountSize: 10000,
    riskPercent: 1,
    direction: 'long',
    entry: 50,
    stopLoss: 48,
    takeProfit: 56,
  };

const UNITS = [
  { value: 'Share', label: 'Shares' },
  { value: 'Unit', label: 'Units' },
  { value: 'Contract', label: 'Contracts' },
] as const;

type UnitName = (typeof UNITS)[number]['value'];

const PRESETS: Array<{ name: string; note: string; values: Required<CalculatorInitialValues> }> = [
  {
    name: 'Stock swing',
    note: '$10k account, 1% risk, long',
    values: {
      accountSize: 10000,
      riskPercent: 1,
      direction: 'long',
      entry: 50,
      stopLoss: 48,
      takeProfit: 56,
    },
  },
  {
    name: 'Tight stop',
    note: 'Small stop, large position',
    values: {
      accountSize: 25000,
      riskPercent: 0.5,
      direction: 'long',
      entry: 182.4,
      stopLoss: 180.9,
      takeProfit: 188.5,
    },
  },
  {
    name: 'Short setup',
    note: 'Risk sits above the entry',
    values: {
      accountSize: 15000,
      riskPercent: 1.5,
      direction: 'short',
      entry: 96.2,
      stopLoss: 99.4,
      takeProfit: 87.5,
    },
  },
];

interface SavedScenario {
  id: string;
  label: string;
  input: TradeInput;
  unit: UnitName;
}

export function RiskCalculator({ initial }: { initial?: CalculatorInitialValues }) {
  const [accountSize, setAccountSize] = useState<number | null>(
    initial?.accountSize ?? DEFAULTS.accountSize,
  );
  const [riskPercent, setRiskPercent] = useState<number | null>(
    initial?.riskPercent ?? DEFAULTS.riskPercent,
  );
  const [direction, setDirection] = useState<Direction>(initial?.direction ?? DEFAULTS.direction);
  const [entry, setEntry] = useState<number | null>(initial?.entry ?? DEFAULTS.entry);
  const [stopLoss, setStopLoss] = useState<number | null>(initial?.stopLoss ?? DEFAULTS.stopLoss);
  const [takeProfit, setTakeProfit] = useState<number | null>(
    initial?.takeProfit === undefined ? DEFAULTS.takeProfit : initial.takeProfit,
  );
  const [unit, setUnit] = useState<UnitName>('Share');
  const [saved, setSaved] = useSessionState<SavedScenario[]>('riskline:scenarios', []);

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

  const errors = useMemo(() => {
    const map = {} as Partial<Record<IssueField, string>>;
    for (const issue of result.issues) {
      if (issue.level === 'error' && !map[issue.field]) map[issue.field] = issue.message;
    }
    return map;
  }, [result.issues]);

  const warnings = result.issues.filter((issue) => issue.level === 'warning');
  const unitLower = unit.toLowerCase();
  const unitPlural = `${unitLower}s`;

  const applyPreset = (values: Required<CalculatorInitialValues>) => {
    setAccountSize(values.accountSize);
    setRiskPercent(values.riskPercent);
    setDirection(values.direction);
    setEntry(values.entry);
    setStopLoss(values.stopLoss);
    setTakeProfit(values.takeProfit);
  };

  const saveScenario = () => {
    if (!result.valid) return;
    const label = `${direction === 'long' ? 'Long' : 'Short'} @ ${formatCurrency(entry ?? 0)} · ${formatUnits(
      result.positionSize,
    )} ${unitPlural}`;
    setSaved((prev) =>
      [
        { id: `${Date.now()}`, label, input, unit },
        ...prev.filter((item) => item.label !== label),
      ].slice(0, 6),
    );
  };

  const restore = (scenario: SavedScenario) => {
    setAccountSize(scenario.input.accountSize);
    setRiskPercent(scenario.input.riskPercent);
    setDirection(scenario.input.direction);
    setEntry(scenario.input.entry);
    setStopLoss(scenario.input.stopLoss);
    setTakeProfit(scenario.input.takeProfit ?? null);
    setUnit(scenario.unit);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
      {/* ---------------------------------------------------------------- inputs */}
      <div className="panel p-5 lg:sticky lg:top-20">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-ink">Your trade</h2>
          <button
            type="button"
            onClick={() => applyPreset(DEFAULTS as Required<CalculatorInitialValues>)}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-2xs text-ink-ghost transition-colors hover:bg-white/[0.04] hover:text-ink-muted"
          >
            <RotateCcw size={11} aria-hidden />
            Reset
          </button>
        </div>

        <div className="space-y-4">
          <NumberField
            label="Account Size"
            value={accountSize}
            onChange={setAccountSize}
            prefix="$"
            step={1000}
            min={0}
            placeholder="10,000"
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
            placeholder="1"
            error={errors.riskPercent}
            hint={
              result.valid
                ? `You are risking ${formatCurrency(result.maxRisk)} on this trade.`
                : undefined
            }
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
            placeholder="50.00"
            error={errors.entry}
          />

          <NumberField
            label="Stop Loss"
            value={stopLoss}
            onChange={setStopLoss}
            prefix="$"
            step={0.5}
            min={0}
            placeholder="48.00"
            error={errors.stopLoss}
            hint={
              !errors.stopLoss && result.valid
                ? `${formatPercent(result.stopDistancePercent)} away — ${
                    direction === 'long' ? 'below' : 'above'
                  } your entry.`
                : direction === 'long'
                  ? 'Place it below your entry.'
                  : 'Place it above your entry.'
            }
          />

          <NumberField
            label="Take Profit"
            value={takeProfit}
            onChange={setTakeProfit}
            prefix="$"
            step={0.5}
            min={0}
            optional
            placeholder="56.00"
            error={errors.takeProfit}
            hint={
              !errors.takeProfit && result.riskRewardRatio
                ? `Gives you ${formatRatio(result.riskRewardRatio)} risk to reward.`
                : 'Leave empty to size the trade without a target.'
            }
          />

          <div>
            <span className="label mb-2 block">Position Measured In</span>
            <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-line bg-base-sunken/60 p-1.5">
              {UNITS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={unit === option.value}
                  onClick={() => setUnit(option.value)}
                  className={`rounded-lg px-2 py-1.5 text-xs transition-all duration-200 ${
                    unit === option.value
                      ? 'bg-accent-wash text-accent-soft'
                      : 'text-ink-faint hover:bg-white/[0.03] hover:text-ink-muted'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <p className="label mb-2.5">Try an example</p>
          <div className="flex flex-col gap-1.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset.values)}
                className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-base-sunken/40 px-3 py-2 text-left transition-all duration-200 hover:border-accent/30 hover:bg-accent-wash"
              >
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-ink-muted transition-colors group-hover:text-ink">
                    {preset.name}
                  </span>
                  <span className="block truncate text-2xs text-ink-ghost">{preset.note}</span>
                </span>
                <ArrowRight
                  size={13}
                  aria-hidden
                  className="shrink-0 text-ink-ghost transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------- results */}
      <div className="min-w-0 space-y-5">
        {!result.valid && (
          <div className="panel-flat flex items-start gap-3 border-risk/30 bg-risk-wash p-4">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-risk" aria-hidden />
            <div>
              <p className="text-sm font-medium text-ink">This trade can’t be sized yet</p>
              <ul className="mt-1.5 space-y-1">
                {result.issues
                  .filter((issue) => issue.level === 'error')
                  .map((issue) => (
                    <li key={`${issue.field}-${issue.message}`} className="text-xs leading-relaxed text-ink-muted">
                      {issue.message}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,300px)]">
          <div className="grid gap-3 sm:grid-cols-2">
            <Stat
              label="Position Size"
              emphasis
              tone="accent"
              value={
                result.valid ? (
                  <>
                    <AnimatedNumber value={result.positionSize} format={(v) => formatUnits(v)} />
                    <span className="ml-1.5 text-sm font-normal text-ink-faint">{unitPlural}</span>
                  </>
                ) : (
                  PLACEHOLDER
                )
              }
              sub={
                result.valid && result.positionSizeWhole !== result.positionSize
                  ? `${formatUnits(result.positionSizeWhole)} whole ${unitPlural} risks ${formatCurrency(
                      result.riskAtWholeUnits,
                    )}`
                  : undefined
              }
            >
              <Explain slug="position-size" termLabel="Position Size">
                Position size is how much of an asset you buy or sell. It comes from two numbers you
                already chose: the money you are willing to lose, divided by the distance between
                your entry and your stop.
              </Explain>
            </Stat>

            <Stat
              label="Maximum Risk"
              emphasis
              tone="risk"
              value={
                result.valid ? (
                  <AnimatedNumber value={result.maxRisk} format={(v) => formatCurrency(v)} />
                ) : (
                  PLACEHOLDER
                )
              }
              sub={
                result.valid
                  ? `${formatPercent(result.potentialLossPercent)} of your account`
                  : undefined
              }
            >
              <Explain slug="risk-per-trade" termLabel="Risk Per Trade">
                The most you intend to lose if this trade fails. Everything else is calculated
                backward from this number, which is why it is set first.
              </Explain>
            </Stat>

            <Stat
              label={`Risk Per ${unit}`}
              value={
                result.valid ? (
                  <AnimatedNumber value={result.riskPerUnit} format={(v) => formatCurrency(v)} />
                ) : (
                  PLACEHOLDER
                )
              }
              sub={
                result.valid
                  ? `${formatPercent(result.stopDistancePercent)} from entry to stop`
                  : undefined
              }
            >
              <Explain slug="stop-distance" termLabel="Stop Distance">
                The distance between your entry and your stop. Halve it and your position size
                doubles, while the money you risk stays exactly the same.
              </Explain>
            </Stat>

            <Stat
              label="Position Value"
              value={
                result.valid ? (
                  <AnimatedNumber value={result.positionValue} format={(v) => formatCurrency(v)} />
                ) : (
                  PLACEHOLDER
                )
              }
              sub={
                result.valid
                  ? `${formatPercent(result.accountExposurePercent)} of account exposed`
                  : undefined
              }
              tone={result.accountExposurePercent > 100 ? 'warn' : 'default'}
            >
              <Explain slug="notional-value" termLabel="Notional Value">
                What the position is worth in the market. This is not your risk — it is the capital
                the position occupies. Above 100% of your account, it needs margin to fund.
              </Explain>
            </Stat>

            <Stat
              label="Potential Loss"
              tone="risk"
              value={
                result.valid ? (
                  <AnimatedNumber value={-result.potentialLoss} format={(v) => formatCurrency(v)} />
                ) : (
                  PLACEHOLDER
                )
              }
              sub={result.valid ? 'If the stop is hit as planned' : undefined}
            />

            <Stat
              label="Potential Profit"
              tone="reward"
              value={
                result.valid && result.potentialProfit !== null ? (
                  <AnimatedNumber
                    value={result.potentialProfit}
                    format={(v) => (v === null ? PLACEHOLDER : `+${formatCurrency(v)}`)}
                  />
                ) : (
                  PLACEHOLDER
                )
              }
              sub={
                result.potentialProfitPercent !== null
                  ? `+${formatPercent(result.potentialProfitPercent)} of your account`
                  : 'Add a take profit to see this'
              }
            />

            <Stat
              label="Risk / Reward"
              tone={
                result.riskRewardRatio !== null && result.riskRewardRatio >= 2 ? 'reward' : 'default'
              }
              value={result.valid ? formatRatio(result.riskRewardRatio) : PLACEHOLDER}
              sub={
                result.breakEvenWinRate !== null
                  ? `Break even by winning ${formatPercent(result.breakEvenWinRate, 1)} of the time`
                  : 'Add a take profit to see this'
              }
            >
              <Explain slug="risk-reward-ratio" termLabel="Risk/Reward Ratio">
                How much you stand to gain against how much you stand to lose. Paired with your win
                rate, this is what decides whether a strategy makes money over time.
              </Explain>
            </Stat>

            <Stat
              label="Account At Risk"
              value={
                result.valid ? (
                  <AnimatedNumber
                    value={result.potentialLossPercent}
                    format={(v) => formatPercent(v)}
                  />
                ) : (
                  PLACEHOLDER
                )
              }
              sub={
                result.valid
                  ? `Ten losses in a row would cost about ${formatPercent(
                      result.potentialLossPercent * 10,
                      1,
                    )}`
                  : undefined
              }
            >
              <Explain slug="drawdown" termLabel="Drawdown">
                The share of your account this single trade puts at risk. Small numbers here are
                what keep a losing streak survivable — a 20% drawdown already needs a 25% gain to
                recover.
              </Explain>
            </Stat>
          </div>

          <div className="space-y-3">
            <TradeLadder
              direction={direction}
              entry={entry}
              stopLoss={stopLoss}
              takeProfit={takeProfit}
              riskRewardRatio={result.riskRewardRatio}
            />
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={saveScenario}
                disabled={!result.valid}
                className="flex-1"
              >
                <Bookmark size={13} aria-hidden />
                Save scenario
              </Button>
            </div>
          </div>
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

        <MathBreakdown input={input} result={result} unit={unit} />

        {saved.length > 0 && (
          <section className="panel-flat p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-medium text-ink">Saved this session</h3>
              <button
                type="button"
                onClick={() => setSaved([])}
                className="inline-flex items-center gap-1.5 text-2xs text-ink-ghost transition-colors hover:text-risk-soft"
              >
                <Trash2 size={11} aria-hidden />
                Clear all
              </button>
            </div>
            <ul className="space-y-1.5">
              {saved.map((scenario) => (
                <li key={scenario.id}>
                  <button
                    type="button"
                    onClick={() => restore(scenario)}
                    className="group flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-base-sunken/40 px-3 py-2 text-left transition-all duration-200 hover:border-accent/30 hover:bg-accent-wash"
                  >
                    <span className="display-num truncate text-xs text-ink-muted transition-colors group-hover:text-ink">
                      {scenario.label}
                    </span>
                    <span className="shrink-0 text-2xs text-ink-ghost transition-colors group-hover:text-accent-soft">
                      Restore
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-2xs leading-relaxed text-ink-ghost">
              Saved scenarios stay in this browser tab only. Nothing is uploaded, and closing the
              tab clears them.
            </p>
          </section>
        )}

        <section className="panel-flat p-5">
          <h3 className="text-sm font-medium text-ink">The concepts behind these numbers</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">
            Each result above comes from one idea. Read the idea, then come back and change the
            input to see it move.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              { slug: 'risk-per-trade', label: 'Risk Per Trade', note: 'Where the dollar budget comes from' },
              { slug: 'stop-loss', label: 'Stop Loss', note: 'Where the trade is proven wrong' },
              { slug: 'position-size', label: 'Position Size', note: 'How the two combine into size' },
              { slug: 'risk-reward-ratio', label: 'Risk/Reward Ratio', note: 'Whether the trade is worth taking' },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/trading-dictionary/${item.slug}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-base-sunken/40 px-3.5 py-3 transition-all duration-200 hover:border-accent/30 hover:bg-accent-wash"
              >
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-ink transition-colors group-hover:text-accent-soft">
                    {item.label}
                  </span>
                  <span className="block truncate text-2xs text-ink-ghost">{item.note}</span>
                </span>
                <ArrowRight
                  size={13}
                  aria-hidden
                  className="shrink-0 text-ink-ghost transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
