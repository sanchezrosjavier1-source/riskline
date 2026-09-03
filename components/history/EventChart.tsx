import type { ChartShape, HistoryChart } from '@/types/history';

/*
 * A small, reusable set of hand-drawn line-chart shapes, not one bespoke
 * drawing per event. Each shape is a real, distinct pattern several of the
 * 20 market-history events genuinely share — the specific event's own
 * labels (from HistoryChart) are drawn onto the shared shape, so the chart
 * stays accurate to that event rather than becoming decorative filler.
 */

const LINE = 'rgba(255,255,255,0.13)';
const INK = '#e9edf3';
const FAINT = '#69748a';
const RISK = '#e0705e';
const ACCENT = '#7f8dff';

const VIEW_W = 420;
const VIEW_H = 170;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-auto w-full" role="presentation">
      {/* Faint horizontal grid, matching the trade ladder's measure lines. */}
      <g opacity="0.55">
        {[40, 75, 110, 145].map((y) => (
          <line key={y} x1="30" y1={y} x2="390" y2={y} stroke={LINE} strokeWidth="1" />
        ))}
      </g>
      {children}
    </svg>
  );
}

function EndLabel({
  x,
  y,
  text,
  align = 'start',
  color = FAINT,
  dot = true,
}: {
  x: number;
  y: number;
  text: string;
  align?: 'start' | 'end' | 'middle';
  color?: string;
  dot?: boolean;
}) {
  const dy = y < 30 ? 16 : -10;
  return (
    <g>
      {dot && <circle cx={x} cy={y} r="3" fill={color} />}
      <text
        x={x}
        y={y + dy}
        textAnchor={align}
        fontSize="10.5"
        fill={color}
        fontFamily="monospace"
      >
        {text}
      </text>
    </g>
  );
}

function DeclineShape({ startLabel, extremeLabel, endLabel }: HistoryChart) {
  return (
    <Frame>
      <path
        d="M30,42 L110,46 L170,60 C230,80 260,110 300,128 C330,141 355,148 385,150"
        fill="none"
        stroke={RISK}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <EndLabel x={30} y={42} text={startLabel} align="start" color={INK} />
      <EndLabel x={385} y={150} text={extremeLabel} align="end" color={RISK} />
      {endLabel && <EndLabel x={220} y={95} text={endLabel} align="middle" dot={false} />}
    </Frame>
  );
}

function SpikeShape({ startLabel, extremeLabel, endLabel }: HistoryChart) {
  return (
    <Frame>
      <path
        d="M30,140 L150,138 C190,136 210,120 235,80 C255,48 265,32 290,26 L385,22"
        fill="none"
        stroke="#43bf9c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <EndLabel x={30} y={140} text={startLabel} align="start" color={INK} />
      <EndLabel x={290} y={26} text={extremeLabel} align="middle" color="#43bf9c" />
      {endLabel && <EndLabel x={385} y={22} text={endLabel} align="end" dot={false} />}
    </Frame>
  );
}

function PegBreakShape({ startLabel, extremeLabel, endLabel }: HistoryChart) {
  return (
    <Frame>
      <path
        d="M30,50 L230,50 C245,50 248,124 262,124 L385,124"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line x1="246" y1="35" x2="246" y2="140" stroke={RISK} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <EndLabel x={30} y={50} text={startLabel} align="start" color={INK} />
      <EndLabel x={262} y={124} text={extremeLabel} align="start" color={RISK} />
      {endLabel && <EndLabel x={385} y={124} text={endLabel} align="end" dot={false} />}
    </Frame>
  );
}

function VRecoveryShape({ startLabel, extremeLabel, endLabel }: HistoryChart) {
  return (
    <Frame>
      <path
        d="M30,45 C90,50 140,90 180,132 C205,150 215,150 230,140 C280,105 330,58 385,48"
        fill="none"
        stroke={RISK}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <EndLabel x={30} y={45} text={startLabel} align="start" color={INK} />
      <EndLabel x={205} y={150} text={extremeLabel} align="middle" color={RISK} />
      {endLabel && <EndLabel x={385} y={48} text={endLabel} align="end" color="#43bf9c" />}
    </Frame>
  );
}

function BoomBustShape({ startLabel, extremeLabel, endLabel }: HistoryChart) {
  return (
    <Frame>
      <path
        d="M30,140 C90,130 130,100 165,70 C195,44 210,28 235,24 C255,32 265,55 285,80 C315,118 345,138 385,146"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <EndLabel x={30} y={140} text={startLabel} align="start" color={INK} />
      <EndLabel x={235} y={24} text={extremeLabel} align="middle" color="#43bf9c" />
      {endLabel && <EndLabel x={385} y={146} text={endLabel} align="end" color={RISK} />}
    </Frame>
  );
}

const SHAPES: Record<ChartShape, (chart: HistoryChart) => React.ReactElement> = {
  decline: DeclineShape,
  spike: SpikeShape,
  'peg-break': PegBreakShape,
  'v-recovery': VRecoveryShape,
  'boom-bust': BoomBustShape,
};

export function EventChart({ chart }: { chart: HistoryChart }) {
  const Shape = SHAPES[chart.shape];
  if (!Shape) return null;

  const summary = `Chart from ${chart.startLabel} to ${chart.extremeLabel}${
    chart.endLabel ? `, ending at ${chart.endLabel}` : ''
  }.`;

  return (
    <figure className="panel-flat p-5" aria-label={summary}>
      {Shape(chart)}
      <figcaption className="mt-3 text-2xs leading-relaxed text-ink-ghost">
        Illustrative shape of the move — not a precise price series.
      </figcaption>
    </figure>
  );
}
