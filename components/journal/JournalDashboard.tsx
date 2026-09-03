'use client';

import { Stat } from '@/components/ui/Stat';
import { formatCurrency, formatNumber, formatPercent, PLACEHOLDER } from '@/lib/format';
import { groupPerformance } from '@/lib/journal';
import type { JournalStats, JournalTrade } from '@/types/journal';

/**
 * A minimal inline equity curve. Deliberately not a charting library: the
 * shape of the line is the whole message, and a dependency would cost more
 * than it adds.
 */
function EquityCurve({ stats }: { stats: JournalStats }) {
  const points = stats.equityCurve;
  if (points.length < 2) {
    return (
      <div className="flex h-[120px] items-center justify-center rounded-xl border border-dashed border-line text-xs text-ink-ghost">
        Close a trade to start the curve
      </div>
    );
  }

  const values = points.map((p) => p.equity);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const width = 600;
  const height = 120;
  const pad = 8;

  const coords = points.map((point, index) => {
    const x = pad + (index / (points.length - 1)) * (width - pad * 2);
    const y = height - pad - ((point.equity - min) / span) * (height - pad * 2);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const up = values[values.length - 1] >= values[0];
  const stroke = up ? '#43bf9c' : '#e0705e';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-[120px] w-full"
      role="img"
      aria-label={`Equity curve from ${formatCurrency(values[0])} to ${formatCurrency(
        values[values.length - 1],
      )} across ${points.length - 1} closed trades.`}
      preserveAspectRatio="none"
    >
      <polyline
        points={coords.join(' ')}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function JournalDashboard({
  stats,
  trades,
}: {
  stats: JournalStats;
  trades: JournalTrade[];
}) {
  const strategies = groupPerformance(trades, (trade) => trade.strategy).slice(0, 5);
  const pnlTone = stats.totalPnl > 0 ? 'reward' : stats.totalPnl < 0 ? 'risk' : 'default';

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------ your risk */}
      <section aria-labelledby="your-risk">
        <h2 id="your-risk" className="label mb-3">
          Your risk
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Capital"
            emphasis
            value={formatCurrency(stats.currentEquity)}
            sub={`Started at ${formatCurrency(stats.startingCapital)}`}
          />
          <Stat
            label="Total P&L"
            emphasis
            tone={pnlTone}
            value={`${stats.totalPnl > 0 ? '+' : ''}${formatCurrency(stats.totalPnl)}`}
            sub={
              stats.closedTrades > 0
                ? `Across ${stats.closedTrades} closed trade${stats.closedTrades === 1 ? '' : 's'}`
                : 'Nothing closed yet'
            }
          />
          <Stat
            label="Max Drawdown"
            tone={stats.maxDrawdownPercent >= 20 ? 'warn' : 'default'}
            value={stats.maxDrawdown > 0 ? `−${formatCurrency(stats.maxDrawdown)}` : formatCurrency(0)}
            sub={
              stats.maxDrawdown > 0
                ? `${formatPercent(stats.maxDrawdownPercent)} from your peak`
                : 'No drawdown recorded'
            }
          />
          <Stat
            label="Average Risk"
            value={
              stats.averageRiskPercent !== null
                ? formatPercent(stats.averageRiskPercent)
                : PLACEHOLDER
            }
            sub={
              stats.averageRiskPercent !== null && stats.averageRiskPercent > 2
                ? 'Above the 1–2% most frameworks suggest'
                : 'Per trade, of your account'
            }
            tone={
              stats.averageRiskPercent !== null && stats.averageRiskPercent > 5 ? 'warn' : 'default'
            }
          />
        </div>
      </section>

      {/* ---------------------------------------------------------- performance */}
      <section aria-labelledby="performance">
        <h2 id="performance" className="label mb-3">
          Performance
        </h2>

        <div className="panel-flat p-5">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <span className="text-sm font-medium text-ink">Equity curve</span>
            <span className="text-2xs text-ink-ghost">
              {stats.closedTrades} closed · {stats.openTrades} open
            </span>
          </div>
          <EquityCurve stats={stats} />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Win Rate"
            value={stats.winRate !== null ? formatPercent(stats.winRate) : PLACEHOLDER}
            sub={
              stats.closedTrades > 0
                ? `${stats.wins}W · ${stats.losses}L · ${stats.breakEven}BE`
                : 'No closed trades yet'
            }
          />
          <Stat
            label="Average R"
            tone={stats.averageR !== null && stats.averageR > 0 ? 'reward' : 'default'}
            value={stats.averageR !== null ? `${formatNumber(stats.averageR, 2)}R` : PLACEHOLDER}
            sub="Profit in units of risk taken"
          />
          <Stat
            label="Profit Factor"
            tone={stats.profitFactor !== null && stats.profitFactor >= 1.5 ? 'reward' : 'default'}
            value={stats.profitFactor !== null ? formatNumber(stats.profitFactor, 2) : PLACEHOLDER}
            sub={stats.profitFactor === null ? 'Needs at least one loss' : 'Gross profit ÷ gross loss'}
          />
          <Stat
            label="Expectancy"
            tone={stats.expectancy !== null && stats.expectancy > 0 ? 'reward' : 'default'}
            value={stats.expectancy !== null ? formatCurrency(stats.expectancy) : PLACEHOLDER}
            sub="Average result per closed trade"
          />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Average Win"
            tone="reward"
            value={stats.averageWin !== null ? formatCurrency(stats.averageWin) : PLACEHOLDER}
          />
          <Stat
            label="Average Loss"
            tone="risk"
            value={stats.averageLoss !== null ? formatCurrency(stats.averageLoss) : PLACEHOLDER}
          />
          <Stat
            label="Best Trade"
            value={stats.bestTrade !== null ? formatCurrency(stats.bestTrade) : PLACEHOLDER}
          />
          <Stat
            label="Worst Trade"
            value={stats.worstTrade !== null ? formatCurrency(stats.worstTrade) : PLACEHOLDER}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------ strategies */}
      {strategies.length > 0 && (
        <section aria-labelledby="by-strategy">
          <h2 id="by-strategy" className="label mb-3">
            By strategy
          </h2>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[34rem] text-left text-xs">
              <thead className="border-b border-line bg-base-sunken/40">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium text-ink-muted">
                    Strategy
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-ink-muted">
                    Trades
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-ink-muted">
                    Win rate
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-ink-muted">
                    Avg R
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-ink-muted">
                    P&L
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {strategies.map((group) => (
                  <tr key={group.key}>
                    <td className="px-4 py-2.5 text-ink">{group.key}</td>
                    <td className="display-num px-4 py-2.5 text-right text-ink-muted">
                      {group.trades}
                    </td>
                    <td className="display-num px-4 py-2.5 text-right text-ink-muted">
                      {group.winRate !== null ? formatPercent(group.winRate, 0) : PLACEHOLDER}
                    </td>
                    <td className="display-num px-4 py-2.5 text-right text-ink-muted">
                      {group.averageR !== null ? `${formatNumber(group.averageR, 2)}R` : PLACEHOLDER}
                    </td>
                    <td
                      className={`display-num px-4 py-2.5 text-right ${
                        group.totalPnl > 0
                          ? 'text-reward-soft'
                          : group.totalPnl < 0
                            ? 'text-risk-soft'
                            : 'text-ink-muted'
                      }`}
                    >
                      {group.totalPnl > 0 ? '+' : ''}
                      {formatCurrency(group.totalPnl)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
