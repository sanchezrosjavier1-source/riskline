'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, ChevronDown } from 'lucide-react';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { Stat } from '@/components/ui/Stat';
import { ButtonLink } from '@/components/ui/Button';
import { calculateTrade } from '@/lib/trade-math';
import {
  CONTRACT_SPECS,
  formatCoinSize,
  formatSatoshis,
  lotsFromUnits,
  PIP_SIZES,
  pipsBetween,
  pointValue,
  priceDistanceFromPips,
  riskPerContract,
  riskPerPip,
  ticksBetween,
  toSatoshis,
  type LotName,
} from '@/lib/market-units';
import {
  ACCOUNT_CURRENCIES,
  currencySymbol,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRatio,
  PLACEHOLDER,
  type CurrencyCode,
} from '@/lib/format';
import { useLocalState } from '@/lib/hooks';
import type { MarketCalculatorPage } from '@/types/market-page';
import type { Direction, IssueField, TradeInput } from '@/types/trade';

/**
 * One calculator, three vocabularies.
 *
 * The arithmetic is `calculateTrade`, exactly as on the main calculator — this
 * component only asks for the inputs in the language of the market and reads
 * the answer back in its units. Nothing here recomputes a position size.
 */
export function MarketCalculator({ page }: { page: MarketCalculatorPage }) {
  const [accountSize, setAccountSize] = useState<number | null>(page.example.accountSize);
  const [riskPercent, setRiskPercent] = useState<number | null>(page.example.riskPercent);
  const [direction, setDirection] = useState<Direction>('long');
  const [entry, setEntry] = useState<number | null>(page.example.entry);
  const [stopLoss, setStopLoss] = useState<number | null>(page.example.stopLoss);
  const [takeProfit, setTakeProfit] = useState<number | null>(page.example.takeProfit);

  const [pipSize, setPipSize] = useState<number>(PIP_SIZES[0].value);
  const [lotName, setLotName] = useState<LotName>('standard');
  const [contractSymbol, setContractSymbol] = useState('ES');
  const [currency, setCurrency] = useLocalState<CurrencyCode>('stopsize:currency', 'USD');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const contract = CONTRACT_SPECS.find((spec) => spec.symbol === contractSymbol) ?? CONTRACT_SPECS[0];
  const symbol = currencySymbol(currency);
  const money = (value: number | null | undefined) => formatCurrency(value, currency);

  const input: TradeInput = useMemo(
    () => ({
      accountSize: accountSize ?? Number.NaN,
      riskPercent: riskPercent ?? Number.NaN,
      direction,
      entry: entry ?? Number.NaN,
      stopLoss: stopLoss ?? Number.NaN,
      takeProfit,
      // Futures are the one market where a price move is not a currency move.
      contractMultiplier: page.market === 'futures' ? (pointValue(contract) ?? 1) : undefined,
    }),
    [accountSize, riskPercent, direction, entry, stopLoss, takeProfit, page.market, contract],
  );

  const result = useMemo(() => calculateTrade(input), [input]);

  const errors = useMemo(() => {
    const map = {} as Partial<Record<IssueField, string>>;
    for (const issue of result.issues) {
      if (issue.level === 'error' && !map[issue.field]) map[issue.field] = issue.message;
    }
    return map;
  }, [result.issues]);

  // ------------------------------------------------------- market-specific reads
  const pips = pipsBetween(entry ?? Number.NaN, stopLoss ?? Number.NaN, pipSize);
  const perPip = result.valid ? riskPerPip(result.maxRisk, pips) : null;
  const lots = result.valid ? lotsFromUnits(result.positionSize, lotName) : null;

  const ticks = ticksBetween(entry ?? Number.NaN, stopLoss ?? Number.NaN, contract.tickSize);
  const perContract = riskPerContract(ticks, contract.tickValue);

  const sats = result.valid ? toSatoshis(result.positionSize) : null;

  /** Editing pips rewrites the stop, keeping the two fields in agreement. */
  const setStopFromPips = (nextPips: number | null) => {
    if (nextPips === null || entry === null) return;
    const distance = priceDistanceFromPips(nextPips, pipSize);
    if (distance === null) return;
    const next = direction === 'long' ? entry - distance : entry + distance;
    setStopLoss(Number(next.toFixed(6)));
  };

  const changeContract = (nextSymbol: string) => {
    setContractSymbol(nextSymbol);
    const spec = CONTRACT_SPECS.find((candidate) => candidate.symbol === nextSymbol);
    if (!spec) return;
    // A Nasdaq stop makes no sense on a crude oil price, so the example moves too.
    const stopTicks = 40;
    setEntry(spec.examplePrice);
    setStopLoss(Number((spec.examplePrice - stopTicks * spec.tickSize).toFixed(4)));
    setTakeProfit(Number((spec.examplePrice + stopTicks * 3 * spec.tickSize).toFixed(4)));
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start">
      {/* ---------------------------------------------------------------- inputs */}
      <div className="panel p-5 lg:sticky lg:top-20">
        <div className="space-y-4">
          {page.market === 'futures' && (
            <div>
              <span className="label mb-2 block">Contract</span>
              <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-line bg-base-sunken/60 p-1.5">
                {CONTRACT_SPECS.map((spec) => (
                  <button
                    key={spec.symbol}
                    type="button"
                    title={spec.name}
                    aria-pressed={contractSymbol === spec.symbol}
                    onClick={() => changeContract(spec.symbol)}
                    className={`rounded-lg px-2 py-1.5 font-mono text-2xs transition-all duration-200 ${
                      contractSymbol === spec.symbol
                        ? 'bg-accent-wash text-accent-soft'
                        : 'text-ink-faint hover:bg-white/[0.03] hover:text-ink-muted'
                    }`}
                  >
                    {spec.symbol}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-2xs leading-relaxed text-ink-ghost">
                {contract.name} — {contract.tickSize} tick worth {money(contract.tickValue)}, so{' '}
                {money(pointValue(contract))} a point.
              </p>
            </div>
          )}

          <NumberField
            label="Account Size"
            value={accountSize}
            onChange={setAccountSize}
            prefix={symbol}
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
            hint={result.valid ? `Risking ${money(result.maxRisk)} on this trade.` : undefined}
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
            prefix={page.market === 'forex' ? undefined : symbol}
            step={page.market === 'forex' ? 0.0001 : page.market === 'futures' ? contract.tickSize : 100}
            min={0}
            error={errors.entry}
          />

          <NumberField
            label="Stop Loss"
            value={stopLoss}
            onChange={setStopLoss}
            prefix={page.market === 'forex' ? undefined : symbol}
            step={page.market === 'forex' ? 0.0001 : page.market === 'futures' ? contract.tickSize : 100}
            min={0}
            error={errors.stopLoss}
            hint={
              !errors.stopLoss && result.valid
                ? page.market === 'forex' && pips !== null
                  ? `${formatNumber(pips, 1)} pips away.`
                  : page.market === 'futures' && ticks !== null
                    ? `${formatNumber(ticks, 0)} ticks away.`
                    : `${formatPercent(result.stopDistancePercent)} away.`
                : direction === 'long'
                  ? 'Place it below your entry.'
                  : 'Place it above your entry.'
            }
          />

          {/* Forex traders think in pips, so let them type the stop that way. */}
          {page.market === 'forex' && (
            <NumberField
              label="Stop Distance"
              value={pips === null ? null : Number(pips.toFixed(1))}
              onChange={setStopFromPips}
              suffix="pips"
              step={5}
              min={0}
              hint="Editing this moves the stop price to match."
            />
          )}
        </div>

        {/* ------------------------------------------------------------ advanced */}
        <div className="mt-4 border-t border-line pt-4">
          <button
            type="button"
            aria-expanded={showAdvanced}
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="flex w-full items-center justify-between gap-3 rounded-lg px-1 py-1 text-left transition-colors hover:bg-white/[0.03]"
          >
            <span className="text-xs font-medium text-ink-muted">Advanced options</span>
            <ChevronDown
              size={14}
              aria-hidden
              className={`shrink-0 text-ink-faint transition-transform duration-300 ${
                showAdvanced ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        <div className={`space-y-4 ${showAdvanced ? 'mt-4' : 'hidden'}`}>
          <NumberField
            label="Take Profit"
            value={takeProfit}
            onChange={setTakeProfit}
            prefix={page.market === 'forex' ? undefined : symbol}
            step={page.market === 'forex' ? 0.0001 : page.market === 'futures' ? contract.tickSize : 100}
            min={0}
            optional
            error={errors.takeProfit}
            hint={
              result.riskRewardRatio
                ? `Gives you ${formatRatio(result.riskRewardRatio)} risk to reward.`
                : 'Leave empty to size without a target.'
            }
          />

          {page.market === 'forex' && (
            <>
              <div>
                <span className="label mb-2 block">Pip Size</span>
                <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-line bg-base-sunken/60 p-1.5">
                  {PIP_SIZES.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      title={option.note}
                      aria-pressed={pipSize === option.value}
                      onClick={() => setPipSize(option.value)}
                      className={`rounded-lg px-2 py-1.5 font-mono text-2xs transition-all duration-200 ${
                        pipSize === option.value
                          ? 'bg-accent-wash text-accent-soft'
                          : 'text-ink-faint hover:bg-white/[0.03] hover:text-ink-muted'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-2xs leading-relaxed text-ink-ghost">
                  Use 0.01 for yen pairs, 0.0001 for everything else.
                </p>
              </div>

              <Segmented
                label="Lot Size"
                value={lotName}
                onChange={setLotName}
                options={[
                  { value: 'standard', label: 'Standard' },
                  { value: 'mini', label: 'Mini' },
                  { value: 'micro', label: 'Micro' },
                ]}
              />
            </>
          )}

          <div>
            <label htmlFor="market-currency" className="label mb-2 block">
              Account Currency
            </label>
            <select
              id="market-currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
              className="h-10 w-full rounded-xl border border-line bg-base-sunken/60 px-3 text-sm text-ink transition-colors hover:border-line-strong focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {ACCOUNT_CURRENCIES.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.symbol} {option.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------- results */}
      <div className="min-w-0 space-y-3">
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

        {/* The answer, in this market's units. */}
        <Stat
          label="Position Size"
          emphasis
          tone="accent"
          value={
            !result.valid ? (
              PLACEHOLDER
            ) : page.market === 'forex' ? (
              <>
                {formatNumber(lots ?? 0, 3)}
                <span className="ml-1.5 text-sm font-normal text-ink-faint">{lotName} lots</span>
              </>
            ) : page.market === 'futures' ? (
              <>
                {formatNumber(Math.floor(result.positionSize), 0)}
                <span className="ml-1.5 text-sm font-normal text-ink-faint">
                  {Math.floor(result.positionSize) === 1 ? 'contract' : 'contracts'}
                </span>
              </>
            ) : (
              <>
                {formatCoinSize(result.positionSize)}
                <span className="ml-1.5 text-sm font-normal text-ink-faint">
                  {result.positionSize === 1 ? 'coin' : 'coins'}
                </span>
              </>
            )
          }
          sub={
            !result.valid
              ? undefined
              : page.market === 'forex'
                ? `${formatNumber(result.positionSize, 0)} units of the base currency`
                : page.market === 'futures'
                  ? result.positionSize < 1
                    ? 'Less than one contract — this trade does not fit the account'
                    : `Exact size ${formatNumber(result.positionSize, 2)}, rounded down`
                  : `${formatSatoshis(sats)} satoshis`
          }
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <Stat
            label="Maximum Risk"
            emphasis
            tone="risk"
            value={result.valid ? money(result.maxRisk) : PLACEHOLDER}
            sub={result.valid ? `${formatPercent(result.potentialLossPercent)} of the account` : undefined}
          />

          {/* The one figure this market cares about most. */}
          {page.market === 'forex' && (
            <Stat
              label="Risk Per Pip"
              value={perPip !== null ? money(perPip) : PLACEHOLDER}
              sub={pips !== null ? `Over a ${formatNumber(pips, 1)} pip stop` : undefined}
            />
          )}
          {page.market === 'futures' && (
            <Stat
              label="Risk Per Contract"
              value={perContract !== null ? money(perContract) : PLACEHOLDER}
              sub={ticks !== null ? `${formatNumber(ticks, 0)} ticks × ${money(contract.tickValue)}` : undefined}
            />
          )}
          {page.market === 'crypto' && (
            <Stat
              label="Position Value"
              tone={result.accountExposurePercent > 100 ? 'warn' : 'default'}
              value={result.valid ? money(result.positionValue) : PLACEHOLDER}
              sub={
                result.valid
                  ? `${formatPercent(result.accountExposurePercent)} of the account`
                  : undefined
              }
            />
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Stat
            label="Potential Loss"
            tone="risk"
            value={result.valid ? money(-result.potentialLoss) : PLACEHOLDER}
            sub="If the stop is hit as planned"
          />
          <Stat
            label="Risk / Reward"
            tone={result.riskRewardRatio !== null && result.riskRewardRatio >= 2 ? 'reward' : 'default'}
            value={result.valid ? formatRatio(result.riskRewardRatio) : PLACEHOLDER}
            sub={
              result.breakEvenWinRate !== null
                ? `Break even winning ${formatPercent(result.breakEvenWinRate, 1)} of the time`
                : 'Add a take profit to see this'
            }
          />
        </div>

        {result.issues.some((issue) => issue.level === 'warning') && (
          <div className="panel-flat border-warn/25 bg-warn-wash p-4">
            <ul className="space-y-1.5">
              {result.issues
                .filter((issue) => issue.level === 'warning')
                .map((issue) => (
                  <li key={issue.message} className="text-xs leading-relaxed text-ink-muted">
                    {issue.message}
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <ButtonLink
            href={`/calculator?market=${page.market}&entry=${entry ?? ''}&stop=${stopLoss ?? ''}`}
            variant="secondary"
            size="sm"
          >
            Open in the full calculator
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
