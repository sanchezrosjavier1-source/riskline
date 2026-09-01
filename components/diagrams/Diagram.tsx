import type { DiagramKind } from '@/types/dictionary';

/*
 * Hand-tuned SVG explainers. Each one is drawn to scale where scale carries
 * meaning — the risk band really is a third of the reward band in the
 * risk/reward diagram, and the drawdown recovery bar really is longer than
 * the loss bar.
 */

/*
 * SVG text scales with the rendered width, so the drawing is capped just above
 * its natural size and allowed to scroll below it. That keeps label type in a
 * readable range instead of ballooning on a wide screen or shrinking to
 * illegibility on a phone.
 */
const FRAME = 'h-auto w-full min-w-[420px] max-w-[540px]';

function Wrapper({
  title,
  children,
  caption,
}: {
  title: string;
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <figure className="panel-flat p-5">
      <div className="overflow-x-auto">
        <svg viewBox="0 0 420 230" className={FRAME} role="img" aria-label={title}>
          <title>{title}</title>
          {children}
        </svg>
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-ink-faint">{caption}</figcaption>
      )}
    </figure>
  );
}

/* Shared primitives ----------------------------------------------------- */

const LINE = 'rgba(255,255,255,0.13)';
const INK = '#e9edf3';
const MUTED = '#98a2b3';
const FAINT = '#69748a';
const REWARD = '#43bf9c';
const RISK = '#e0705e';
const ACCENT = '#7f8dff';

function Level({
  y,
  label,
  value,
  color,
  dashed = false,
}: {
  y: number;
  label: string;
  value?: string;
  color: string;
  dashed?: boolean;
}) {
  return (
    <g>
      <line
        x1="90"
        y1={y}
        x2="330"
        y2={y}
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <circle cx="90" cy={y} r="3" fill={color} />
      <text x="82" y={y + 4} textAnchor="end" fontSize="10" fill={FAINT} fontFamily="monospace">
        {label}
      </text>
      {value && (
        <text x="338" y={y + 4} fontSize="10.5" fill={color} fontFamily="monospace">
          {value}
        </text>
      )}
    </g>
  );
}

function Band({
  y,
  height,
  color,
  label,
}: {
  y: number;
  height: number;
  color: string;
  label: string;
}) {
  return (
    <g>
      <rect x="90" y={y} width="240" height={height} fill={color} opacity="0.1" />
      <text
        x="210"
        y={y + height / 2 + 3.5}
        textAnchor="middle"
        fontSize="9.5"
        fill={color}
        letterSpacing="1.6"
        opacity="0.85"
      >
        {label}
      </text>
    </g>
  );
}

/* Diagrams -------------------------------------------------------------- */

function StopLossDiagram() {
  return (
    <Wrapper
      title="A long trade with the entry above the stop loss, and the risk measured between them"
      caption="The distance between entry and stop is your risk per share. Divide your risk budget by it and you have your position size."
    >
      <Band y={60} height={100} color={RISK} label="RISK" />
      <Level y={60} label="ENTRY" value="$50.00" color={INK} />
      <Level y={160} label="STOP" value="$48.00" color={RISK} />
      <line x1="200" y1="66" x2="200" y2="154" stroke={RISK} strokeWidth="1" opacity="0.5" />
      <path d="M200 154 l-3.5 -6 h7 z" fill={RISK} />
      <rect x="168" y="100" width="64" height="20" rx="5" fill="#0b0e13" stroke={LINE} />
      <text x="200" y="114" textAnchor="middle" fontSize="10.5" fill={RISK} fontFamily="monospace">
        $2.00
      </text>
      <text x="90" y="196" fontSize="10" fill={FAINT}>
        Long trade — price falling is the losing direction
      </text>
    </Wrapper>
  );
}

function RiskRewardDiagram() {
  return (
    <Wrapper
      title="A trade with reward three times the size of the risk"
      caption="Reward is measured entry to target, risk is measured entry to stop. Here the reward band is three times the height of the risk band — a 1:3 trade."
    >
      <Band y={25} height={105} color={REWARD} label="REWARD  ·  $6.00" />
      <Band y={130} height={35} color={RISK} label="RISK  ·  $2.00" />
      <Level y={25} label="TARGET" value="$56.00" color={REWARD} />
      <Level y={130} label="ENTRY" value="$50.00" color={INK} />
      <Level y={165} label="STOP" value="$48.00" color={RISK} />
      <text x="90" y="196" fontSize="10" fill={FAINT}>
        1 : 3 — break even by winning 25% of the time
      </text>
      <text x="90" y="212" fontSize="10" fill={FAINT} opacity="0.75">
        Bands are drawn to scale
      </text>
    </Wrapper>
  );
}

function LeverageDiagram() {
  return (
    <Wrapper
      title="One thousand dollars of capital controlling a ten thousand dollar position at ten times leverage"
      caption="Leverage multiplies the size of the position and therefore the effect of every price move on your capital. It does not change the odds."
    >
      <rect x="30" y="40" width="70" height="34" rx="7" fill={ACCENT} opacity="0.12" />
      <rect x="30" y="40" width="70" height="34" rx="7" fill="none" stroke={ACCENT} opacity="0.45" />
      <text x="65" y="61" textAnchor="middle" fontSize="11" fill={INK} fontFamily="monospace">
        $1,000
      </text>
      <text x="65" y="90" textAnchor="middle" fontSize="9" fill={FAINT} letterSpacing="1.2">
        YOUR CAPITAL
      </text>

      <line x1="108" y1="57" x2="146" y2="57" stroke={LINE} strokeWidth="1.5" />
      <path d="M146 57 l-6 -3.5 v7 z" fill={MUTED} />
      <text x="127" y="48" textAnchor="middle" fontSize="10" fill={ACCENT} fontFamily="monospace">
        10×
      </text>

      <rect x="154" y="40" width="236" height="34" rx="7" fill={ACCENT} opacity="0.12" />
      <rect x="154" y="40" width="236" height="34" rx="7" fill="none" stroke={ACCENT} opacity="0.45" />
      <text x="272" y="61" textAnchor="middle" fontSize="11" fill={INK} fontFamily="monospace">
        $10,000
      </text>
      <text x="272" y="90" textAnchor="middle" fontSize="9" fill={FAINT} letterSpacing="1.2">
        POSITION VALUE
      </text>

      <line x1="30" y1="118" x2="390" y2="118" stroke={LINE} />

      <text x="30" y="142" fontSize="10" fill={FAINT} letterSpacing="1.2">
        A 2% MOVE AGAINST THE POSITION
      </text>
      <rect x="30" y="152" width="72" height="26" rx="6" fill={RISK} opacity="0.14" />
      <text x="66" y="169" textAnchor="middle" fontSize="10.5" fill={RISK} fontFamily="monospace">
        −$200
      </text>
      <text x="114" y="169" fontSize="10.5" fill={MUTED} fontFamily="monospace">
        = −20% of your capital
      </text>
      <text x="30" y="200" fontSize="10" fill={FAINT} opacity="0.8">
        The asset moved 2%. Your equity moved 20%.
      </text>
    </Wrapper>
  );
}

function SpreadDiagram() {
  return (
    <Wrapper
      title="The bid and ask prices with the spread between them"
      caption="You sell at the bid and buy at the ask. The gap between them is paid on every round trip, before the trade has done anything."
    >
      <line x1="40" y1="110" x2="380" y2="110" stroke={LINE} strokeWidth="1.5" />

      <line x1="140" y1="80" x2="140" y2="140" stroke={REWARD} strokeWidth="2" />
      <text x="140" y="70" textAnchor="middle" fontSize="9.5" fill={FAINT} letterSpacing="1.2">
        BID
      </text>
      <text x="140" y="160" textAnchor="middle" fontSize="11" fill={REWARD} fontFamily="monospace">
        $49.98
      </text>
      <text x="140" y="176" textAnchor="middle" fontSize="9" fill={FAINT}>
        you sell here
      </text>

      <line x1="280" y1="80" x2="280" y2="140" stroke={RISK} strokeWidth="2" />
      <text x="280" y="70" textAnchor="middle" fontSize="9.5" fill={FAINT} letterSpacing="1.2">
        ASK
      </text>
      <text x="280" y="160" textAnchor="middle" fontSize="11" fill={RISK} fontFamily="monospace">
        $50.02
      </text>
      <text x="280" y="176" textAnchor="middle" fontSize="9" fill={FAINT}>
        you buy here
      </text>

      <rect x="140" y="98" width="140" height="24" fill={ACCENT} opacity="0.12" />
      <text x="210" y="114" textAnchor="middle" fontSize="10.5" fill={ACCENT} fontFamily="monospace">
        $0.04 spread
      </text>

      <text x="40" y="212" fontSize="10" fill={FAINT}>
        On 200 shares that is $8.00, paid the moment you enter.
      </text>
    </Wrapper>
  );
}

function MarketStructureDiagram() {
  return (
    <Wrapper
      title="An uptrend made of higher highs and higher lows, followed by a structure break"
      caption="An uptrend is a sequence: each high exceeds the last, each low sits above the last. The first lower low is where that sequence breaks."
    >
      <polyline
        points="40,170 75,120 100,145 140,90 165,118 205,60 235,95 275,72 305,130 350,155 385,140"
        fill="none"
        stroke={MUTED}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {[
        { x: 75, y: 120, label: 'HH' },
        { x: 140, y: 90, label: 'HH' },
        { x: 205, y: 60, label: 'HH' },
      ].map((p) => (
        <g key={`${p.x}-hh`}>
          <circle cx={p.x} cy={p.y} r="3.5" fill={REWARD} />
          <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9" fill={REWARD} fontFamily="monospace">
            {p.label}
          </text>
        </g>
      ))}
      {[
        { x: 100, y: 145, label: 'HL' },
        { x: 165, y: 118, label: 'HL' },
      ].map((p) => (
        <g key={`${p.x}-hl`}>
          <circle cx={p.x} cy={p.y} r="3.5" fill={REWARD} opacity="0.7" />
          <text x={p.x} y={p.y + 17} textAnchor="middle" fontSize="9" fill={REWARD} opacity="0.8" fontFamily="monospace">
            {p.label}
          </text>
        </g>
      ))}
      <circle cx="275" cy="72" r="3.5" fill={RISK} />
      <text x="275" y="62" textAnchor="middle" fontSize="9" fill={RISK} fontFamily="monospace">
        LH
      </text>
      <circle cx="350" cy="155" r="3.5" fill={RISK} />
      <text x="350" y="172" textAnchor="middle" fontSize="9" fill={RISK} fontFamily="monospace">
        LL
      </text>

      <line x1="165" y1="118" x2="385" y2="118" stroke={RISK} strokeWidth="1" strokeDasharray="4 4" opacity="0.55" />
      <text x="385" y="112" textAnchor="end" fontSize="9" fill={RISK} opacity="0.9">
        structure break
      </text>
      <text x="40" y="210" fontSize="10" fill={FAINT}>
        Uptrend intact → first lower high → first lower low → trend has changed
      </text>
    </Wrapper>
  );
}

function SupportResistanceDiagram() {
  return (
    <Wrapper
      title="Price bouncing between a support zone below and a resistance zone above"
      caption="Support and resistance are zones, not exact prices. Stops belong beyond the zone, not inside it."
    >
      <rect x="40" y="52" width="345" height="20" fill={RISK} opacity="0.11" />
      <line x1="40" y1="62" x2="385" y2="62" stroke={RISK} strokeWidth="1.25" strokeDasharray="5 4" />
      <text x="40" y="45" fontSize="9.5" fill={RISK} letterSpacing="1.2">
        RESISTANCE
      </text>

      <rect x="40" y="150" width="345" height="20" fill={REWARD} opacity="0.11" />
      <line x1="40" y1="160" x2="385" y2="160" stroke={REWARD} strokeWidth="1.25" strokeDasharray="5 4" />
      <text x="40" y="188" fontSize="9.5" fill={REWARD} letterSpacing="1.2">
        SUPPORT
      </text>

      <polyline
        points="45,150 85,68 120,155 160,64 200,158 245,66 285,152 325,70 370,120"
        fill="none"
        stroke={MUTED}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {[
        [85, 68],
        [160, 64],
        [245, 66],
        [325, 70],
      ].map(([x, y]) => (
        <circle key={`r${x}`} cx={x} cy={y} r="3" fill={RISK} />
      ))}
      {[
        [120, 155],
        [200, 158],
        [285, 152],
      ].map(([x, y]) => (
        <circle key={`s${x}`} cx={x} cy={y} r="3" fill={REWARD} />
      ))}
      <text x="40" y="212" fontSize="10" fill={FAINT}>
        Each test uses up some of the orders defending the level.
      </text>
    </Wrapper>
  );
}

function CandlestickDiagram() {
  return (
    <Wrapper
      title="The anatomy of a candlestick, showing open, high, low and close"
      caption="The body spans open to close. The wicks show how far price travelled and was rejected within the period."
    >
      {/* Bullish candle */}
      <line x1="120" y1="35" x2="120" y2="170" stroke={REWARD} strokeWidth="1.5" />
      <rect x="107" y="70" width="26" height="70" rx="2" fill={REWARD} opacity="0.28" stroke={REWARD} />
      <text x="120" y="196" textAnchor="middle" fontSize="9.5" fill={REWARD} letterSpacing="1">
        CLOSED UP
      </text>

      <line x1="145" y1="35" x2="185" y2="35" stroke={LINE} strokeDasharray="3 3" />
      <text x="190" y="39" fontSize="9.5" fill={FAINT} fontFamily="monospace">
        HIGH
      </text>
      <line x1="145" y1="70" x2="185" y2="70" stroke={LINE} strokeDasharray="3 3" />
      <text x="190" y="74" fontSize="9.5" fill={FAINT} fontFamily="monospace">
        CLOSE
      </text>
      <line x1="145" y1="140" x2="185" y2="140" stroke={LINE} strokeDasharray="3 3" />
      <text x="190" y="144" fontSize="9.5" fill={FAINT} fontFamily="monospace">
        OPEN
      </text>
      <line x1="145" y1="170" x2="185" y2="170" stroke={LINE} strokeDasharray="3 3" />
      <text x="190" y="174" fontSize="9.5" fill={FAINT} fontFamily="monospace">
        LOW
      </text>

      {/* Bearish candle */}
      <line x1="320" y1="45" x2="320" y2="180" stroke={RISK} strokeWidth="1.5" />
      <rect x="307" y="72" width="26" height="66" rx="2" fill={RISK} opacity="0.28" stroke={RISK} />
      <text x="320" y="204" textAnchor="middle" fontSize="9.5" fill={RISK} letterSpacing="1">
        CLOSED DOWN
      </text>
      <text x="320" y="35" textAnchor="middle" fontSize="9" fill={FAINT}>
        open above close
      </text>
    </Wrapper>
  );
}

function DrawdownDiagram() {
  return (
    <Wrapper
      title="An equity curve falling from its peak, and the larger gain required to recover"
      caption="Losing 50% requires a 100% gain to return to even. Recovery is always harder than the loss that caused it."
    >
      <polyline
        points="35,150 70,120 105,132 145,85 180,95 215,60 260,110 300,150 340,175 385,168"
        fill="none"
        stroke={MUTED}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="215" cy="60" r="4" fill={INK} />
      <text x="215" y="50" textAnchor="middle" fontSize="9.5" fill={INK} fontFamily="monospace">
        PEAK
      </text>
      <circle cx="340" cy="175" r="4" fill={RISK} />
      <text x="340" y="192" textAnchor="middle" fontSize="9.5" fill={RISK} fontFamily="monospace">
        TROUGH
      </text>
      <line x1="215" y1="60" x2="385" y2="60" stroke={LINE} strokeDasharray="4 4" />
      <line x1="340" y1="60" x2="340" y2="175" stroke={RISK} strokeWidth="1" opacity="0.6" />
      <rect x="252" y="106" width="76" height="20" rx="5" fill="#0b0e13" stroke={LINE} />
      <text x="290" y="120" textAnchor="middle" fontSize="10" fill={RISK} fontFamily="monospace">
        −50%
      </text>

      <line x1="35" y1="208" x2="180" y2="208" stroke={RISK} strokeWidth="6" opacity="0.5" strokeLinecap="round" />
      <text x="188" y="212" fontSize="9.5" fill={RISK} fontFamily="monospace">
        loss 50%
      </text>
      <line x1="35" y1="222" x2="325" y2="222" stroke={REWARD} strokeWidth="6" opacity="0.5" strokeLinecap="round" />
      <text x="333" y="226" fontSize="9.5" fill={REWARD} fontFamily="monospace">
        recovery 100%
      </text>
    </Wrapper>
  );
}

function TrendDiagram() {
  return (
    <Wrapper
      title="An uptrend, a sideways range and a downtrend shown side by side"
      caption="Trend is defined by the sequence of highs and lows, not by how the chart feels. When neither sequence holds, the market is ranging."
    >
      <polyline points="25,160 55,130 45,142 80,95 70,108 110,60" fill="none" stroke={REWARD} strokeWidth="1.75" strokeLinejoin="round" />
      <text x="68" y="192" textAnchor="middle" fontSize="9.5" fill={REWARD} letterSpacing="1.2">
        UPTREND
      </text>
      <text x="68" y="207" textAnchor="middle" fontSize="8.5" fill={FAINT}>
        higher highs + higher lows
      </text>

      <polyline points="160,110 185,80 205,135 230,82 250,132 275,88" fill="none" stroke={MUTED} strokeWidth="1.75" strokeLinejoin="round" />
      <line x1="155" y1="78" x2="280" y2="78" stroke={LINE} strokeDasharray="4 4" />
      <line x1="155" y1="137" x2="280" y2="137" stroke={LINE} strokeDasharray="4 4" />
      <text x="217" y="192" textAnchor="middle" fontSize="9.5" fill={MUTED} letterSpacing="1.2">
        RANGE
      </text>
      <text x="217" y="207" textAnchor="middle" fontSize="8.5" fill={FAINT}>
        no directional sequence
      </text>

      <polyline points="315,60 345,105 335,92 370,145 360,132 395,165" fill="none" stroke={RISK} strokeWidth="1.75" strokeLinejoin="round" />
      <text x="355" y="192" textAnchor="middle" fontSize="9.5" fill={RISK} letterSpacing="1.2">
        DOWNTREND
      </text>
      <text x="355" y="207" textAnchor="middle" fontSize="8.5" fill={FAINT}>
        lower highs + lower lows
      </text>
    </Wrapper>
  );
}

function LiquidityDiagram() {
  return (
    <Wrapper
      title="A deep order book absorbing a large order compared with a thin one gapping"
      caption="The same order behaves completely differently depending on the depth available. Liquidity decides how close to your intended price you actually trade."
    >
      <text x="30" y="34" fontSize="9.5" fill={REWARD} letterSpacing="1.2">
        DEEP BOOK
      </text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={`d${i}`} x={30} y={44 + i * 13} width={120 - i * 4} height="8" rx="2" fill={REWARD} opacity="0.3" />
      ))}
      <text x="30" y="140" fontSize="9" fill={FAINT}>
        fills at $50.01
      </text>

      <line x1="210" y1="30" x2="210" y2="200" stroke={LINE} />

      <text x="240" y="34" fontSize="9.5" fill={RISK} letterSpacing="1.2">
        THIN BOOK
      </text>
      {[0, 3, 5].map((i) => (
        <rect key={`t${i}`} x={240} y={44 + i * 13} width={44 - i * 3} height="8" rx="2" fill={RISK} opacity="0.3" />
      ))}
      <text x="240" y="140" fontSize="9" fill={FAINT}>
        fills at $51.40
      </text>

      <text x="30" y="180" fontSize="10" fill={MUTED}>
        Same 1,000-share market order. Same quoted price.
      </text>
      <text x="30" y="198" fontSize="10" fill={FAINT}>
        The difference is entirely the depth waiting behind the quote.
      </text>
    </Wrapper>
  );
}

function OrderBookDiagram() {
  return (
    <Wrapper
      title="An order book showing asks stacked above the spread and bids below it"
      caption="Asks rest above the market, bids below. The best of each pair is the top of the book, and the gap between them is the spread."
    >
      <text x="40" y="30" fontSize="9.5" fill={FAINT} letterSpacing="1.2">
        PRICE
      </text>
      <text x="330" y="30" textAnchor="end" fontSize="9.5" fill={FAINT} letterSpacing="1.2">
        SIZE
      </text>

      {[
        { p: '50.06', s: '1,400', w: 84 },
        { p: '50.04', s: '900', w: 54 },
        { p: '50.02', s: '2,100', w: 126 },
      ].map((row, i) => (
        <g key={row.p}>
          <rect x={200} y={42 + i * 20} width={row.w} height="13" rx="2" fill={RISK} opacity="0.22" />
          <text x="40" y={52 + i * 20} fontSize="10" fill={RISK} fontFamily="monospace">
            {row.p}
          </text>
          <text x={330} y={52 + i * 20} textAnchor="end" fontSize="9.5" fill={FAINT} fontFamily="monospace">
            {row.s}
          </text>
        </g>
      ))}

      <line x1="40" y1="112" x2="330" y2="112" stroke={ACCENT} strokeWidth="1" strokeDasharray="4 3" opacity="0.7" />
      <text x="40" y="107" fontSize="9" fill={ACCENT}>
        spread $0.04
      </text>

      {[
        { p: '49.98', s: '1,800', w: 108 },
        { p: '49.96', s: '750', w: 45 },
        { p: '49.94', s: '2,600', w: 130 },
      ].map((row, i) => (
        <g key={row.p}>
          <rect x={200} y={126 + i * 20} width={row.w} height="13" rx="2" fill={REWARD} opacity="0.22" />
          <text x="40" y={136 + i * 20} fontSize="10" fill={REWARD} fontFamily="monospace">
            {row.p}
          </text>
          <text x={330} y={136 + i * 20} textAnchor="end" fontSize="9.5" fill={FAINT} fontFamily="monospace">
            {row.s}
          </text>
        </g>
      ))}

      <text x="40" y="212" fontSize="10" fill={FAINT}>
        Best ask $50.02 · Best bid $49.98
      </text>
    </Wrapper>
  );
}

function OptionPayoffDiagram() {
  return (
    <Wrapper
      title="The payoff of a long call option, with loss capped at the premium and unlimited upside"
      caption="Below the strike the loss is fixed at the premium paid. Above it the payoff rises one-for-one, breaking even once the move covers the premium."
    >
      <line x1="45" y1="150" x2="390" y2="150" stroke={LINE} />
      <line x1="45" y1="30" x2="45" y2="195" stroke={LINE} />
      <text x="45" y="212" fontSize="9" fill={FAINT}>
        underlying price →
      </text>

      <line x1="45" y1="178" x2="215" y2="178" stroke={RISK} strokeWidth="2.25" />
      <line x1="215" y1="178" x2="380" y2="45" stroke={REWARD} strokeWidth="2.25" />

      <line x1="215" y1="30" x2="215" y2="195" stroke={LINE} strokeDasharray="4 4" />
      <text x="215" y="24" textAnchor="middle" fontSize="9.5" fill={FAINT} fontFamily="monospace">
        STRIKE
      </text>

      <circle cx="250" cy="150" r="3.5" fill={ACCENT} />
      <text x="258" y="145" fontSize="9.5" fill={ACCENT} fontFamily="monospace">
        break even
      </text>

      <text x="120" y="194" textAnchor="middle" fontSize="9.5" fill={RISK} fontFamily="monospace">
        max loss = premium
      </text>
      <text x="352" y="38" textAnchor="end" fontSize="9.5" fill={REWARD} fontFamily="monospace">
        upside
      </text>
    </Wrapper>
  );
}

const DIAGRAMS: Record<DiagramKind, React.ComponentType> = {
  'stop-loss': StopLossDiagram,
  'risk-reward': RiskRewardDiagram,
  leverage: LeverageDiagram,
  spread: SpreadDiagram,
  'market-structure': MarketStructureDiagram,
  'support-resistance': SupportResistanceDiagram,
  candlestick: CandlestickDiagram,
  drawdown: DrawdownDiagram,
  trend: TrendDiagram,
  liquidity: LiquidityDiagram,
  'order-book': OrderBookDiagram,
  'option-payoff': OptionPayoffDiagram,
};

export function Diagram({ kind }: { kind: DiagramKind }) {
  const Component = DIAGRAMS[kind];
  if (!Component) return null;
  return <Component />;
}
