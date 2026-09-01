import type { Term } from '@/types/dictionary';

export const structureTerms: Term[] = [
  {
    slug: 'market-structure',
    term: 'Market Structure',
    category: 'structure',
    aliases: ['structure', 'price structure'],
    short: 'The pattern of highs and lows that describes whether a market is trending or ranging.',
    explanation: [
      'Market structure reduces a chart to a sequence: higher highs and higher lows, lower highs and lower lows, or neither.',
      'It gives an objective definition of trend that does not depend on an indicator setting. Either the last swing high was exceeded or it was not.',
      'A structure break — the first lower low in an uptrend, or the first higher high in a downtrend — is the earliest reliable evidence that control has shifted.',
    ],
    diagram: 'market-structure',
    whyItMatters:
      'Structure supplies natural, non-arbitrary levels for stops. The swing low that must hold for your uptrend thesis to survive is exactly where the trade is invalidated.',
    mistakes: [
      'Redefining swing points after the fact so structure always confirms the current position.',
      'Reading structure on one timeframe while trading on another.',
      'Calling a structure break on a wick rather than a close.',
    ],
    related: ['higher-high', 'higher-low', 'lower-high', 'lower-low', 'trend'],
    popular: true,
  },
  {
    slug: 'higher-high',
    term: 'Higher High',
    category: 'structure',
    aliases: ['hh'],
    short: 'A swing high that exceeds the previous swing high, confirming upward momentum.',
    explanation: [
      'A higher high means buyers pushed price past the last point where sellers took control. The previous ceiling did not hold.',
      'On its own it is only half the picture. An uptrend requires higher highs and higher lows — a higher high followed by a lower low is a warning, not a confirmation.',
      'Higher highs on shrinking volume or with momentum divergence suggest the advance is being carried by fewer participants.',
    ],
    diagram: 'market-structure',
    whyItMatters:
      'It is the objective evidence that an uptrend remains intact, and the reference point that a stop on a long trade is usually built beneath.',
    mistakes: [
      'Counting a brief intraday wick above the prior high as a genuine higher high.',
      'Reading higher highs in isolation without checking whether the lows are also rising.',
    ],
    related: ['higher-low', 'market-structure', 'trend', 'swing-high', 'breakout'],
  },
  {
    slug: 'higher-low',
    term: 'Higher Low',
    category: 'structure',
    aliases: ['hl'],
    short: 'A swing low that sits above the previous swing low, showing buyers stepping in earlier.',
    explanation: [
      'A higher low means the market’s pullbacks are getting shallower. Buyers are unwilling to wait for the prior level before committing.',
      'For trend traders it is often the more informative of the two structure points, because it is where entries with tight stops become available.',
      'The first failure to make a higher low is usually the earliest structural sign that an uptrend is in trouble.',
    ],
    diagram: 'market-structure',
    whyItMatters:
      'Higher lows create the natural stop placement for a long: below the most recent one. That level is both structurally meaningful and close enough to size around.',
    mistakes: [
      'Buying a pullback before the higher low has actually formed.',
      'Moving a stop below an older, deeper low and quietly doubling the risk.',
    ],
    related: ['higher-high', 'pullback', 'market-structure', 'swing-low', 'stop-loss'],
  },
  {
    slug: 'lower-high',
    term: 'Lower High',
    category: 'structure',
    aliases: ['lh'],
    short: 'A swing high that fails to reach the previous swing high, showing weakening demand.',
    explanation: [
      'A lower high means each rally is running out of steam sooner. Sellers are meeting buyers at progressively lower prices.',
      'In a downtrend, lower highs are where short entries with defined risk appear — the stop sits just above the failed rally.',
      'The first lower high after a sustained uptrend is an early warning, though it becomes meaningful only when a lower low follows.',
    ],
    diagram: 'market-structure',
    whyItMatters:
      'Lower highs provide the reference level a short trade’s stop is built above, which is what makes the position sizable in the first place.',
    mistakes: [
      'Shorting the first lower high in a strong uptrend without further confirmation.',
      'Ignoring lower highs while holding a long because the trend "still looks fine".',
    ],
    related: ['lower-low', 'market-structure', 'trend', 'swing-high', 'short'],
  },
  {
    slug: 'lower-low',
    term: 'Lower Low',
    category: 'structure',
    aliases: ['ll'],
    short: 'A swing low that breaks below the previous swing low, confirming downward momentum.',
    explanation: [
      'A lower low means the level where buyers previously defended has failed. Supply overwhelmed demand at a price that used to matter.',
      'Combined with lower highs it confirms a downtrend. The first lower low in an uptrend is the structural break that says control has changed hands.',
      'Lower lows frequently trigger clusters of stop orders, which is why the move through them can be unusually fast.',
    ],
    diagram: 'market-structure',
    whyItMatters:
      'A lower low is the cleanest objective invalidation for a long thesis. It is a level worth deciding about before the trade rather than during it.',
    mistakes: [
      'Holding a long past a lower low while looking for reasons the structure does not count.',
      'Treating an intraday wick as a confirmed break.',
    ],
    related: ['lower-high', 'market-structure', 'trend', 'swing-low', 'stop-loss'],
  },
  {
    slug: 'swing-high',
    term: 'Swing High',
    category: 'structure',
    aliases: ['pivot high', 'local high'],
    short: 'A peak with lower highs on both sides — a local turning point in price.',
    explanation: [
      'A swing high is a candle whose high exceeds a set number of candles on either side. It marks a point where buying stopped and selling took over.',
      'Swing points are only confirmed after the fact. You cannot know a high is the swing high until enough candles to its right have failed to exceed it.',
      'The lookback you choose determines how many swing points you see. A tight definition finds many minor pivots; a wide one finds only major turns.',
    ],
    whyItMatters:
      'Swing highs are where short stops go and where long targets often sit. They are the anchor points that make structure measurable.',
    mistakes: [
      'Marking a swing high in real time before it is confirmed.',
      'Switching lookback lengths until the structure supports a held position.',
    ],
    related: ['swing-low', 'higher-high', 'lower-high', 'market-structure', 'resistance'],
  },
  {
    slug: 'swing-low',
    term: 'Swing Low',
    category: 'structure',
    aliases: ['pivot low', 'local low'],
    short: 'A trough with higher lows on both sides — a local turning point where buyers took control.',
    explanation: [
      'A swing low is the mirror of a swing high: a candle whose low is beneath a set number of candles on both sides.',
      'It is the most commonly used anchor for a long trade’s stop. If price trades below the swing low that defined the setup, the premise has failed.',
      'Because so many stops cluster just beneath obvious swing lows, that area is also a frequent target for liquidity sweeps.',
    ],
    whyItMatters:
      'The distance from entry to the relevant swing low is your stop distance, and that number determines your position size. Structure and sizing are the same conversation.',
    mistakes: [
      'Placing the stop exactly at the swing low rather than beyond it with a buffer.',
      'Choosing a distant swing low for a comfortable stop and accepting a much larger real risk.',
    ],
    related: ['swing-high', 'higher-low', 'lower-low', 'stop-loss', 'stop-distance'],
  },
  {
    slug: 'range',
    term: 'Range',
    category: 'structure',
    aliases: ['trading range', 'sideways market'],
    short: 'A market bounded between a clear high and low, with no directional trend.',
    explanation: [
      'A range forms when buyers reliably defend a floor and sellers reliably defend a ceiling. Price oscillates between them.',
      'Ranges reward the opposite behavior from trends. Buying weakness at the low and selling strength at the high works here and fails badly once the range breaks.',
      'Every range eventually ends. The break is often violent because stops accumulate on both sides of the boundaries.',
    ],
    whyItMatters:
      'Identifying a range tells you which playbook applies, and the boundaries provide clean, close invalidation levels for either side.',
    mistakes: [
      'Applying trend-following rules inside a range and taking repeated small losses.',
      'Assuming the boundary will hold on every touch. Each test weakens it.',
    ],
    related: ['consolidation', 'support', 'resistance', 'breakout', 'false-breakout'],
  },
  {
    slug: 'bull-market',
    term: 'Bull Market',
    category: 'structure',
    aliases: ['bullish', 'bull'],
    short: 'An extended period of rising prices and generally positive sentiment.',
    explanation: [
      'A bull market is a sustained advance, conventionally marked from a 20% rise off a major low, though the label is applied loosely.',
      'Its practical signature is that pullbacks are shallow and bought quickly, and that structure keeps producing higher highs and higher lows over long stretches.',
      'Bull markets flatter poor risk management. Oversized positions and absent stops appear to work right up until conditions change.',
    ],
    whyItMatters:
      'Knowing the broader regime tells you which side has the tailwind, and warns you when good results are coming from the environment rather than from your process.',
    mistakes: [
      'Mistaking a rising market for skill and increasing risk accordingly.',
      'Assuming a bull market makes stops unnecessary.',
    ],
    related: ['bear-market', 'trend', 'market-structure', 'risk-management', 'recency-bias'],
  },
  {
    slug: 'bear-market',
    term: 'Bear Market',
    category: 'structure',
    aliases: ['bearish', 'bear'],
    short: 'An extended period of falling prices and generally negative sentiment.',
    explanation: [
      'A bear market is conventionally a decline of 20% or more from a major high, sustained over time rather than a single sharp drop.',
      'Bear markets behave differently from bull markets, not just in direction. Volatility is higher, correlations rise, and rallies are sharp enough to look like reversals repeatedly.',
      'Liquidity thins as declines accelerate, which widens spreads and increases slippage exactly when stops are most likely to trigger.',
    ],
    whyItMatters:
      'The same position size carries more real risk in a bear market because volatility and gap risk are both elevated. Sizing should adjust with the regime.',
    mistakes: [
      'Repeatedly buying dips on the assumption the previous regime still applies.',
      'Keeping bull-market position sizes while volatility has doubled.',
      'Underestimating how convincing counter-trend rallies can be.',
    ],
    related: ['bull-market', 'volatility', 'drawdown', 'correlation-risk', 'liquidity'],
  },
  {
    slug: 'liquidity-sweep',
    term: 'Liquidity Sweep',
    category: 'structure',
    aliases: ['stop hunt', 'stop run', 'liquidity grab'],
    short: 'A sharp move beyond an obvious level that triggers clustered stops before reversing.',
    explanation: [
      'Stops cluster just beyond obvious highs and lows. Those resting orders are, collectively, a pool of liquidity — guaranteed counterparties at a known price.',
      'A sweep pushes into that pool, triggers the stops, uses the resulting flow to fill large orders, and then reverses. The break looks decisive and lasts minutes.',
      'It rarely requires a conspiracy. It is a structural consequence of everyone placing stops in the same predictable place.',
    ],
    whyItMatters:
      'Understanding sweeps changes where you put stops: beyond the obvious level with a volatility-based buffer rather than exactly at the round number everyone else uses.',
    mistakes: [
      'Placing stops a few cents beyond the most obvious high or low on the chart.',
      'Treating every sweep as a reversal signal without waiting for price to reclaim the level.',
    ],
    related: ['false-breakout', 'stop-loss', 'liquidity', 'swing-low', 'support'],
  },
];
