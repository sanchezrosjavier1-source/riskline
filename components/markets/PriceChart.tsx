import { buildLinePoints, seriesChangePercent } from '@/lib/markets';
import { formatPercent } from '@/lib/format';
import type { AssetClass, PriceHistory } from '@/types/market';

const WIDTH = 800;
const HEIGHT = 260;
const PAD = 10;

const REWARD = '#43bf9c';
const RISK = '#e0705e';

function formatAxisPrice(price: number, assetClass: AssetClass): string {
  if (assetClass === 'forex') {
    const decimals = Math.abs(price) >= 50 ? 2 : 4;
    return price.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  const decimals = Math.abs(price) >= 1 ? 2 : 6;
  return `$${price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/**
 * A deliberately plain price line. The job is market context for sizing a
 * trade, not a charting terminal — so there are no indicators, no crosshair
 * and no dependency. Server-rendered, which also means it needs no JavaScript.
 */
export function PriceChart({
  history,
  assetClass,
  label,
}: {
  history: PriceHistory;
  assetClass: AssetClass;
  label: string;
}) {
  const points = buildLinePoints(history.points, WIDTH, HEIGHT, PAD);

  if (history.failed || points === null) {
    return (
      <div className="flex h-[260px] items-center justify-center rounded-xl border border-dashed border-line text-xs text-ink-faint">
        Price history is unavailable right now.
      </div>
    );
  }

  const prices = history.points.map((point) => point.price);
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const change = seriesChangePercent(history.points);
  const up = (change ?? 0) >= 0;
  const stroke = up ? REWARD : RISK;

  // Close the line into the bottom corners so it can be filled.
  const areaPoints = `${PAD},${HEIGHT} ${points} ${WIDTH - PAD},${HEIGHT}`;
  const gradientId = `chart-${assetClass}-${up ? 'up' : 'down'}`;

  return (
    <figure>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-[260px] w-full"
        role="img"
        aria-label={`${label} price over the selected period, ${
          change === null ? 'change unavailable' : `${up ? 'up' : 'down'} ${formatPercent(Math.abs(change))}`
        }. High ${formatAxisPrice(high, assetClass)}, low ${formatAxisPrice(low, assetClass)}.`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity={0.18} />
            <stop offset="100%" stopColor={stroke} stopOpacity={0} />
          </linearGradient>
        </defs>

        <polygon points={areaPoints} fill={`url(#${gradientId})`} />
        <polyline
          points={points}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-3 text-2xs text-ink-ghost">
        <span>
          High <span className="display-num text-ink-faint">{formatAxisPrice(high, assetClass)}</span>
          {' · '}
          Low <span className="display-num text-ink-faint">{formatAxisPrice(low, assetClass)}</span>
        </span>
        <span>
          {history.points.length} {history.granularity === 'daily' ? 'daily closes' : 'intraday points'}
        </span>
      </figcaption>
    </figure>
  );
}
