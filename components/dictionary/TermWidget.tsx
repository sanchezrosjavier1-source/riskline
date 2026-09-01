'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NumberField } from '@/components/ui/NumberField';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Segmented } from '@/components/ui/Segmented';
import {
  calculateTrade,
  expectedValue,
  rewardPerUnitFor,
  riskPerUnitFor,
  safeDivide,
} from '@/lib/trade-math';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatPrice,
  formatRatio,
  formatUnits,
  PLACEHOLDER,
} from '@/lib/format';
import type { WidgetKind } from '@/types/dictionary';
import type { Direction } from '@/types/trade';

/* ------------------------------------------------------------------ shell */

function Shell({
  children,
  outputs,
  takeaway,
  cta,
}: {
  children: React.ReactNode;
  outputs: React.ReactNode;
  takeaway?: React.ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3">
        <Sparkles size={13} className="text-accent" aria-hidden />
        <span className="label">Try it yourself</span>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid gap-3 sm:grid-cols-2">{children}</div>

        <div className="hairline" />

        <dl className="grid gap-3 sm:grid-cols-3">{outputs}</dl>

        {takeaway && (
          <p className="rounded-lg border border-line bg-base-sunken/50 px-3.5 py-3 text-xs leading-relaxed text-ink-muted">
            {takeaway}
          </p>
        )}

        {cta && (
          <Link
            href={cta.href}
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft transition-colors hover:text-accent"
          >
            {cta.label}
            <ArrowRight
              size={13}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

function Out({
  label,
  value,
  tone = 'text-ink',
  sub,
}: {
  label: string;
  value: React.ReactNode;
  tone?: string;
  sub?: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="label truncate">{label}</dt>
      <dd className={`display-num mt-1.5 text-lg leading-none ${tone}`}>{value}</dd>
      {sub && <p className="mt-1.5 text-2xs leading-snug text-ink-ghost">{sub}</p>}
    </div>
  );
}

/* --------------------------------------------------------------- widgets */

function PositionSizeWidget() {
  const [account, setAccount] = useState<number | null>(10000);
  const [risk, setRisk] = useState<number | null>(1);
  const [entry, setEntry] = useState<number | null>(50);
  const [stop, setStop] = useState<number | null>(48);

  const result = useMemo(
    () =>
      calculateTrade({
        accountSize: account ?? Number.NaN,
        riskPercent: risk ?? Number.NaN,
        direction: 'long',
        entry: entry ?? Number.NaN,
        stopLoss: stop ?? Number.NaN,
        takeProfit: null,
      }),
    [account, risk, entry, stop],
  );

  const error = result.issues.find((issue) => issue.level === 'error');

  return (
    <Shell
      outputs={
        <>
          <Out
            label="Maximum Risk"
            tone="text-risk-soft"
            value={result.valid ? <AnimatedNumber value={result.maxRisk} format={formatCurrency} /> : PLACEHOLDER}
          />
          <Out
            label="Risk Per Share"
            value={result.valid ? <AnimatedNumber value={result.riskPerUnit} format={formatCurrency} /> : PLACEHOLDER}
          />
          <Out
            label="Position Size"
            tone="text-accent-soft"
            value={
              result.valid ? (
                <>
                  <AnimatedNumber value={result.positionSize} format={formatUnits} pulse />
                  <span className="ml-1 text-2xs font-normal text-ink-ghost">shares</span>
                </>
              ) : (
                PLACEHOLDER
              )
            }
          />
        </>
      }
      takeaway={
        error ? (
          error.message
        ) : (
          <>
            Widen the stop and the position shrinks. Tighten it and the position grows — but the{' '}
            <span className="text-ink">{formatCurrency(result.maxRisk)}</span> you risk never
            changes. That is the whole point of sizing this way.
          </>
        )
      }
      cta={{ href: '/tools/position-size', label: 'Open the full position size calculator' }}
    >
      <NumberField label="Account Size" value={account} onChange={setAccount} prefix="$" step={1000} min={0} size="sm" />
      <NumberField label="Risk Per Trade" value={risk} onChange={setRisk} suffix="%" step={0.25} min={0} max={100} size="sm" />
      <NumberField label="Entry Price" value={entry} onChange={setEntry} prefix="$" step={0.5} min={0} size="sm" />
      <NumberField label="Stop Loss" value={stop} onChange={setStop} prefix="$" step={0.5} min={0} size="sm" />
    </Shell>
  );
}

function RiskRewardWidget() {
  const [direction, setDirection] = useState<Direction>('long');
  const [entry, setEntry] = useState<number | null>(50);
  const [stop, setStop] = useState<number | null>(48);
  const [target, setTarget] = useState<number | null>(56);

  const risk = entry !== null && stop !== null ? riskPerUnitFor(direction, entry, stop) : null;
  const reward = entry !== null && target !== null ? rewardPerUnitFor(direction, entry, target) : null;
  const valid = risk !== null && reward !== null && risk > 0 && reward > 0;
  const ratio = valid ? safeDivide(reward, risk) : null;
  const breakEven = ratio !== null ? (safeDivide(1, 1 + ratio) ?? 0) * 100 : null;

  return (
    <Shell
      outputs={
        <>
          <Out
            label="Risk Per Share"
            tone="text-risk-soft"
            value={valid ? <AnimatedNumber value={risk} format={formatCurrency} /> : PLACEHOLDER}
          />
          <Out
            label="Reward Per Share"
            tone="text-reward-soft"
            value={valid ? <AnimatedNumber value={reward} format={formatCurrency} /> : PLACEHOLDER}
          />
          <Out
            label="Risk / Reward"
            tone="text-accent-soft"
            value={formatRatio(ratio)}
            sub={breakEven !== null ? `Break even at a ${formatPercent(breakEven, 1)} win rate` : undefined}
          />
        </>
      }
      takeaway={
        !valid ? (
          direction === 'long'
            ? 'On a long trade the stop belongs below the entry and the target above it.'
            : 'On a short trade the stop belongs above the entry and the target below it.'
        ) : (
          <>
            At {formatRatio(ratio)} you only need to be right{' '}
            <span className="text-ink">{formatPercent(breakEven, 1)}</span> of the time to break
            even. Spread and commissions push that threshold a little higher.
          </>
        )
      }
      cta={{ href: '/tools/risk-reward', label: 'Open the full risk/reward calculator' }}
    >
      <div className="sm:col-span-2">
        <Segmented
          label="Direction"
          value={direction}
          onChange={setDirection}
          options={[
            { value: 'long', label: 'LONG', tone: 'reward' },
            { value: 'short', label: 'SHORT', tone: 'risk' },
          ]}
        />
      </div>
      <NumberField label="Entry" value={entry} onChange={setEntry} prefix="$" step={0.5} min={0} size="sm" />
      <NumberField label="Stop Loss" value={stop} onChange={setStop} prefix="$" step={0.5} min={0} size="sm" />
      <div className="sm:col-span-2">
        <NumberField label="Take Profit" value={target} onChange={setTarget} prefix="$" step={0.5} min={0} size="sm" />
      </div>
    </Shell>
  );
}

function StopDistanceWidget() {
  const [direction, setDirection] = useState<Direction>('long');
  const [entry, setEntry] = useState<number | null>(50);
  const [stop, setStop] = useState<number | null>(48);
  const [risk, setRisk] = useState<number | null>(100);

  const distance = entry !== null && stop !== null ? riskPerUnitFor(direction, entry, stop) : null;
  const valid = distance !== null && distance > 0 && entry !== null && entry > 0;
  const percent = valid ? (safeDivide(distance, entry) ?? 0) * 100 : null;
  const size = valid && risk !== null && risk > 0 ? safeDivide(risk, distance) : null;

  return (
    <Shell
      outputs={
        <>
          <Out
            label="Stop Distance"
            tone="text-risk-soft"
            value={valid ? <AnimatedNumber value={distance} format={formatCurrency} /> : PLACEHOLDER}
          />
          <Out label="As % Of Entry" value={valid ? formatPercent(percent) : PLACEHOLDER} />
          <Out
            label="Shares For That Risk"
            tone="text-accent-soft"
            value={
              size !== null ? (
                <AnimatedNumber value={size} format={formatUnits} pulse />
              ) : (
                PLACEHOLDER
              )
            }
          />
        </>
      }
      takeaway={
        !valid ? (
          `Place the stop ${direction === 'long' ? 'below' : 'above'} the entry so the trade has defined risk.`
        ) : (
          <>
            Halve the stop distance and the share count doubles. Your dollar risk stays at{' '}
            <span className="text-ink">{formatCurrency(risk ?? 0)}</span> either way — the position
            just gets more sensitive to each cent of movement.
          </>
        )
      }
      cta={{ href: '/calculator', label: 'Size a full trade around this stop' }}
    >
      <div className="sm:col-span-2">
        <Segmented
          label="Direction"
          value={direction}
          onChange={setDirection}
          options={[
            { value: 'long', label: 'LONG', tone: 'reward' },
            { value: 'short', label: 'SHORT', tone: 'risk' },
          ]}
        />
      </div>
      <NumberField label="Entry" value={entry} onChange={setEntry} prefix="$" step={0.5} min={0} size="sm" />
      <NumberField label="Stop Loss" value={stop} onChange={setStop} prefix="$" step={0.5} min={0} size="sm" />
      <div className="sm:col-span-2">
        <NumberField label="Money You Are Risking" value={risk} onChange={setRisk} prefix="$" step={25} min={0} size="sm" />
      </div>
    </Shell>
  );
}

function LeverageWidget() {
  const [capital, setCapital] = useState<number | null>(1000);
  const [leverage, setLeverage] = useState<number | null>(10);
  const [move, setMove] = useState<number | null>(2);

  const valid =
    capital !== null && capital > 0 && leverage !== null && leverage >= 1 && leverage <= 500;
  const positionValue = valid ? capital * leverage : null;
  const equityImpact = valid && move !== null ? move * leverage : null;
  const toLiquidation = valid ? safeDivide(100, leverage) : null;

  return (
    <Shell
      outputs={
        <>
          <Out
            label="Position Value"
            tone="text-accent-soft"
            value={positionValue !== null ? <AnimatedNumber value={positionValue} format={formatCurrency} pulse /> : PLACEHOLDER}
          />
          <Out
            label="Effect On Your Equity"
            tone={equityImpact !== null && equityImpact >= 100 ? 'text-risk-soft' : 'text-ink'}
            value={equityImpact !== null ? <AnimatedNumber value={-equityImpact} format={(v) => formatPercent(v, 1)} /> : PLACEHOLDER}
            sub={move !== null ? `If price moves ${formatPercent(move, 2)} against you` : undefined}
          />
          <Out
            label="Move To Liquidation"
            tone="text-risk-soft"
            value={toLiquidation !== null ? formatPercent(toLiquidation, 2) : PLACEHOLDER}
            sub="Before fees and maintenance margin"
          />
        </>
      }
      takeaway={
        !valid ? (
          'Enter capital above zero and leverage between 1x and 500x.'
        ) : (
          <>
            Leverage does not change the asset&apos;s move — it changes what that move does to you.
            At {formatNumber(leverage, 0)}x, roughly a {formatPercent(toLiquidation, 2)} move against
            the position wipes out the margin behind it.
          </>
        )
      }
      cta={{ href: '/calculator', label: 'Size a leveraged position with a real stop' }}
    >
      <NumberField label="Your Capital" value={capital} onChange={setCapital} prefix="$" step={500} min={0} size="sm" />
      <NumberField label="Leverage" value={leverage} onChange={setLeverage} suffix="×" step={1} min={1} max={500} size="sm" />
      <div className="sm:col-span-2">
        <NumberField label="Price Move Against You" value={move} onChange={setMove} suffix="%" step={0.5} min={0} size="sm" />
      </div>
    </Shell>
  );
}

function SpreadWidget() {
  const [bid, setBid] = useState<number | null>(49.98);
  const [ask, setAsk] = useState<number | null>(50.02);
  const [shares, setShares] = useState<number | null>(200);

  const valid = bid !== null && ask !== null && bid > 0 && ask > 0 && ask >= bid;
  const spread = valid ? ask - bid : null;
  const spreadPercent = valid ? (safeDivide(spread as number, ask) ?? 0) * 100 : null;
  const cost = valid && shares !== null && shares > 0 ? (spread as number) * shares : null;

  return (
    <Shell
      outputs={
        <>
          <Out
            label="Spread"
            value={valid ? <AnimatedNumber value={spread} format={formatPrice} /> : PLACEHOLDER}
          />
          <Out label="Spread %" value={valid ? formatPercent(spreadPercent, 3) : PLACEHOLDER} />
          <Out
            label="Cost To Enter"
            tone="text-risk-soft"
            value={cost !== null ? <AnimatedNumber value={cost} format={formatCurrency} pulse /> : PLACEHOLDER}
            sub="Paid the moment you open the position"
          />
        </>
      }
      takeaway={
        !valid ? (
          'The ask has to sit at or above the bid — that is what makes a market.'
        ) : (
          <>
            You buy at the ask and sell at the bid, so this{' '}
            <span className="text-ink">{formatPrice(spread)}</span> gap is gone before the trade does
            anything. On a target of a few percent, that matters.
          </>
        )
      }
    >
      <NumberField label="Bid" value={bid} onChange={setBid} prefix="$" step={0.01} min={0} size="sm" />
      <NumberField label="Ask" value={ask} onChange={setAsk} prefix="$" step={0.01} min={0} size="sm" />
      <div className="sm:col-span-2">
        <NumberField label="Shares" value={shares} onChange={setShares} step={50} min={0} size="sm" />
      </div>
    </Shell>
  );
}

function DrawdownWidget() {
  const [peak, setPeak] = useState<number | null>(10000);
  const [current, setCurrent] = useState<number | null>(8000);

  const valid = peak !== null && peak > 0 && current !== null && current >= 0 && current <= peak;
  const drawdown = valid ? (safeDivide(peak - current, peak) ?? 0) * 100 : null;
  // A total loss cannot be recovered by any finite percentage gain, so this
  // stays null rather than reporting an infinite figure.
  const recovery = valid && current > 0 ? (safeDivide(peak - current, current) ?? 0) * 100 : null;

  return (
    <Shell
      outputs={
        <>
          <Out
            label="Drawdown"
            tone="text-risk-soft"
            value={valid ? <AnimatedNumber value={drawdown} format={(v) => formatPercent(v, 1)} pulse /> : PLACEHOLDER}
          />
          <Out
            label="Amount Lost"
            value={valid ? <AnimatedNumber value={peak - current} format={formatCurrency} /> : PLACEHOLDER}
          />
          <Out
            label="Gain Needed To Recover"
            tone="text-warn"
            value={recovery !== null ? <AnimatedNumber value={recovery} format={(v) => formatPercent(v, 1)} /> : PLACEHOLDER}
          />
        </>
      }
      takeaway={
        !valid ? (
          'Enter a peak above zero and a current value between zero and that peak.'
        ) : recovery === null ? (
          'A total loss cannot be recovered by any percentage gain. That is the whole argument for position sizing.'
        ) : (
          <>
            Losing <span className="text-ink">{formatPercent(drawdown, 1)}</span> requires a{' '}
            <span className="text-ink">{formatPercent(recovery, 1)}</span> gain to get back to even.
            The deeper the hole, the more the math works against you.
          </>
        )
      }
      cta={{ href: '/calculator', label: 'See what one trade puts at risk' }}
    >
      <NumberField label="Peak Equity" value={peak} onChange={setPeak} prefix="$" step={1000} min={0} size="sm" />
      <NumberField label="Current Equity" value={current} onChange={setCurrent} prefix="$" step={500} min={0} size="sm" />
    </Shell>
  );
}

function ExpectancyWidget() {
  const [winRate, setWinRate] = useState<number | null>(40);
  const [avgWin, setAvgWin] = useState<number | null>(300);
  const [avgLoss, setAvgLoss] = useState<number | null>(100);

  const ev = useMemo(
    () =>
      expectedValue({
        winRatePercent: winRate ?? Number.NaN,
        averageWin: avgWin ?? Number.NaN,
        averageLoss: avgLoss ?? Number.NaN,
      }),
    [winRate, avgWin, avgLoss],
  );

  const ratio = avgLoss && avgLoss > 0 && avgWin !== null ? safeDivide(avgWin, avgLoss) : null;
  const breakEven = ratio !== null ? (safeDivide(1, 1 + ratio) ?? 0) * 100 : null;

  return (
    <Shell
      outputs={
        <>
          <Out
            label="Per Trade"
            tone={ev !== null && ev >= 0 ? 'text-reward-soft' : 'text-risk-soft'}
            value={ev !== null ? <AnimatedNumber value={ev} format={formatCurrency} pulse /> : PLACEHOLDER}
          />
          <Out
            label="Over 100 Trades"
            tone={ev !== null && ev >= 0 ? 'text-reward-soft' : 'text-risk-soft'}
            value={ev !== null ? <AnimatedNumber value={ev * 100} format={formatCurrency} /> : PLACEHOLDER}
          />
          <Out
            label="Win Rate Needed"
            value={breakEven !== null ? formatPercent(breakEven, 1) : PLACEHOLDER}
            sub="To break even at this reward size"
          />
        </>
      }
      takeaway={
        ev === null ? (
          'Enter a win rate between 0 and 100, and average win and loss values of zero or more.'
        ) : ev >= 0 ? (
          <>
            A {formatPercent(winRate, 0)} win rate is profitable here because the winners are larger
            than the losers. You need {formatPercent(breakEven, 1)} to break even, and you have more
            than that.
          </>
        ) : (
          <>
            This edge is negative. At this reward size you would need to win{' '}
            <span className="text-ink">{formatPercent(breakEven, 1)}</span> of the time, and{' '}
            {formatPercent(winRate, 0)} is not enough.
          </>
        )
      }
    >
      <NumberField label="Win Rate" value={winRate} onChange={setWinRate} suffix="%" step={5} min={0} max={100} size="sm" />
      <NumberField label="Average Win" value={avgWin} onChange={setAvgWin} prefix="$" step={50} min={0} size="sm" />
      <div className="sm:col-span-2">
        <NumberField label="Average Loss" value={avgLoss} onChange={setAvgLoss} prefix="$" step={50} min={0} size="sm" />
      </div>
    </Shell>
  );
}

function CompoundWidget() {
  const [start, setStart] = useState<number | null>(10000);
  const [rate, setRate] = useState<number | null>(2);
  const [periods, setPeriods] = useState<number | null>(24);

  const valid =
    start !== null &&
    start > 0 &&
    rate !== null &&
    rate > -100 &&
    rate <= 100 &&
    periods !== null &&
    periods >= 0 &&
    periods <= 600;

  const final = valid ? start * (1 + rate / 100) ** periods : null;
  const growth = valid && final !== null ? final - start : null;
  const multiple = valid && final !== null ? safeDivide(final, start) : null;

  return (
    <Shell
      outputs={
        <>
          <Out
            label="Final Balance"
            tone="text-reward-soft"
            value={final !== null ? <AnimatedNumber value={final} format={formatCurrency} pulse /> : PLACEHOLDER}
          />
          <Out
            label="Total Growth"
            value={growth !== null ? <AnimatedNumber value={growth} format={formatCurrency} /> : PLACEHOLDER}
          />
          <Out
            label="Multiple"
            value={multiple !== null ? `${formatNumber(multiple, 2)}×` : PLACEHOLDER}
          />
        </>
      }
      takeaway={
        !valid ? (
          'Enter a starting balance above zero, a rate between −100% and 100%, and up to 600 periods.'
        ) : (
          <>
            Compounding rewards consistency far more than size. It also runs in reverse — a single
            large loss removes many periods of growth from the base the whole curve is built on.
          </>
        )
      }
      cta={{ href: '/trading-dictionary/drawdown', label: 'See what a drawdown does to this curve' }}
    >
      <NumberField label="Starting Balance" value={start} onChange={setStart} prefix="$" step={1000} min={0} size="sm" />
      <NumberField label="Return Per Period" value={rate} onChange={setRate} suffix="%" step={0.5} size="sm" />
      <div className="sm:col-span-2">
        <NumberField label="Number Of Periods" value={periods} onChange={setPeriods} step={1} min={0} max={600} size="sm" />
      </div>
    </Shell>
  );
}

function PipValueWidget() {
  const [lotSize, setLotSize] = useState<number | null>(100000);
  const [rate, setRate] = useState<number | null>(1.085);
  const [stopPips, setStopPips] = useState<number | null>(20);
  const [yen, setYen] = useState<'standard' | 'yen'>('standard');

  const pipSize = yen === 'yen' ? 0.01 : 0.0001;
  const valid = lotSize !== null && lotSize > 0 && rate !== null && rate > 0;
  // For a pair quoted in the account currency this reduces to pipSize x lot size.
  const pipValue = valid ? pipSize * lotSize : null;
  const riskAtStop = pipValue !== null && stopPips !== null && stopPips > 0 ? pipValue * stopPips : null;

  return (
    <Shell
      outputs={
        <>
          <Out
            label="Pip Size"
            value={pipSize.toFixed(yen === 'yen' ? 2 : 4)}
            sub={yen === 'yen' ? 'Yen pairs use two decimals' : 'Most pairs use four decimals'}
          />
          <Out
            label="Value Per Pip"
            tone="text-accent-soft"
            value={pipValue !== null ? <AnimatedNumber value={pipValue} format={formatCurrency} pulse /> : PLACEHOLDER}
          />
          <Out
            label="Risk At Your Stop"
            tone="text-risk-soft"
            value={riskAtStop !== null ? <AnimatedNumber value={riskAtStop} format={formatCurrency} /> : PLACEHOLDER}
            sub={stopPips !== null ? `${formatNumber(stopPips, 0)} pips from entry` : undefined}
          />
        </>
      }
      takeaway={
        !valid ? (
          'Enter a lot size and exchange rate above zero.'
        ) : (
          <>
            Pip value is the forex version of risk per share. Divide your risk budget by{' '}
            <span className="text-ink">
              {formatNumber(stopPips ?? 0, 0)} pips × {formatCurrency(pipValue)}
            </span>{' '}
            and you have your lot size. These figures assume the pair is quoted in your account
            currency; on other pairs the value floats with the exchange rate.
          </>
        )
      }
      cta={{ href: '/calculator', label: 'Size the trade around this risk' }}
    >
      <div className="sm:col-span-2">
        <Segmented
          label="Pair Type"
          value={yen}
          onChange={setYen}
          options={[
            { value: 'standard', label: 'Standard' },
            { value: 'yen', label: 'Yen pair' },
          ]}
        />
      </div>
      <NumberField label="Lot Size (units)" value={lotSize} onChange={setLotSize} step={10000} min={0} size="sm" />
      <NumberField label="Exchange Rate" value={rate} onChange={setRate} step={0.001} min={0} size="sm" />
      <div className="sm:col-span-2">
        <NumberField label="Stop Distance (pips)" value={stopPips} onChange={setStopPips} step={5} min={0} size="sm" />
      </div>
    </Shell>
  );
}

function RMultipleWidget() {
  const [risked, setRisked] = useState<number | null>(100);
  const [outcome, setOutcome] = useState<number | null>(300);

  const valid = risked !== null && risked > 0 && outcome !== null;
  const r = valid ? safeDivide(outcome, risked) : null;

  return (
    <Shell
      outputs={
        <>
          <Out
            label="R-Multiple"
            tone={r !== null && r >= 0 ? 'text-reward-soft' : 'text-risk-soft'}
            value={r !== null ? <AnimatedNumber value={r} format={(v) => `${formatNumber(v, 2)}R`} pulse /> : PLACEHOLDER}
          />
          <Out
            label="One R"
            value={valid ? formatCurrency(risked) : PLACEHOLDER}
            sub="Your initial risk on the trade"
          />
          <Out
            label="Result"
            tone={outcome !== null && outcome >= 0 ? 'text-reward-soft' : 'text-risk-soft'}
            value={outcome !== null ? formatCurrency(outcome) : PLACEHOLDER}
          />
        </>
      }
      takeaway={
        !valid ? (
          'Enter the amount you risked as a positive number. The result can be positive or negative.'
        ) : (
          <>
            Measuring in R makes trades of any size comparable. A month reads as a sequence —{' '}
            <span className="display-num text-ink">+2R, −1R, −1R, +4R</span> — instead of a list of
            unrelated dollar amounts.
          </>
        )
      }
    >
      <NumberField label="Amount Risked" value={risked} onChange={setRisked} prefix="$" step={25} min={0} size="sm" />
      <NumberField label="Profit Or Loss" value={outcome} onChange={setOutcome} prefix="$" step={25} size="sm" />
    </Shell>
  );
}

/* -------------------------------------------------------------- dispatch */

const WIDGETS: Record<WidgetKind, React.ComponentType> = {
  'position-size': PositionSizeWidget,
  'risk-reward': RiskRewardWidget,
  'stop-distance': StopDistanceWidget,
  leverage: LeverageWidget,
  spread: SpreadWidget,
  drawdown: DrawdownWidget,
  expectancy: ExpectancyWidget,
  compound: CompoundWidget,
  'pip-value': PipValueWidget,
  'r-multiple': RMultipleWidget,
};

export function TermWidget({ kind }: { kind: WidgetKind }) {
  const Widget = WIDGETS[kind];
  if (!Widget) return null;
  return <Widget />;
}
