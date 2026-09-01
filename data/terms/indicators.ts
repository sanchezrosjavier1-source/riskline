import type { Term } from '@/types/dictionary';

export const indicatorTerms: Term[] = [
  {
    slug: 'moving-average',
    term: 'Moving Average',
    category: 'indicators',
    aliases: ['ma', 'sma', 'simple moving average'],
    short: 'The average price over a set number of periods, recalculated as each new period closes.',
    explanation: [
      'A moving average smooths price into a single line. A 50-period average is simply the mean of the last 50 closes, updated every period.',
      'Its purpose is to make direction legible by removing noise. Price above a rising average is a different situation from price below a falling one, even when the last candle looks identical.',
      'Every moving average lags by construction. It describes what has already happened, which is why it identifies trends well and turning points poorly.',
    ],
    formula: {
      label: 'Simple Moving Average',
      expression: 'Sum of last N closing prices ÷ N',
      legend: [{ symbol: 'N', meaning: 'Lookback length, commonly 20, 50 or 200 periods' }],
    },
    whyItMatters:
      'Moving averages give an objective, repeatable definition of trend context, and often act as dynamic support or resistance where pullback entries can be planned.',
    mistakes: [
      'Treating a moving average crossover as a signal without any regard for context.',
      'Testing lengths until one fits the past perfectly, which fits nothing else.',
      'Expecting an average to identify tops and bottoms. It cannot; it lags.',
    ],
    related: ['exponential-moving-average', 'trend', 'pullback', 'vwap', 'divergence'],
    popular: true,
  },
  {
    slug: 'exponential-moving-average',
    term: 'Exponential Moving Average',
    category: 'indicators',
    aliases: ['ema'],
    short: 'A moving average that weights recent prices more heavily than older ones.',
    explanation: [
      'An EMA applies exponentially decaying weights, so the most recent closes matter most and old data fades rather than dropping out abruptly.',
      'The practical effect is that it turns faster than a simple moving average of the same length. That is an advantage in a trending market and a liability in a choppy one.',
      'Common lengths — 9, 21, 50, 200 — are conventions, not discoveries. Their usefulness comes partly from how many people watch them.',
    ],
    whyItMatters:
      'The choice between EMA and SMA is really a choice about responsiveness versus false signals. Neither is better in the abstract; they suit different conditions.',
    mistakes: [
      'Assuming a faster average is a better average.',
      'Switching between EMA and SMA depending on which currently supports the position you already hold.',
    ],
    related: ['moving-average', 'macd', 'trend', 'divergence', 'consolidation'],
  },
  {
    slug: 'rsi',
    term: 'RSI',
    category: 'indicators',
    aliases: ['relative strength index', 'overbought', 'oversold'],
    short: 'A momentum oscillator from 0 to 100 that compares the size of recent gains to recent losses.',
    explanation: [
      'RSI measures the ratio of average up-moves to average down-moves over a lookback, usually 14 periods, and scales the result between 0 and 100.',
      'Readings above 70 are conventionally called overbought and below 30 oversold. Those labels are widely misread: they describe momentum, not valuation, and not a reversal.',
      'In a strong trend RSI can sit above 70 for weeks. Selling every overbought reading in an uptrend is one of the most reliable ways to lose money with an indicator.',
    ],
    whyItMatters:
      'RSI is most useful for divergence and for gauging whether a move still has force behind it — not as a standalone reversal trigger.',
    mistakes: [
      'Shorting simply because RSI is above 70.',
      'Applying mean-reversion RSI logic during a strong trend.',
      'Ignoring that the same reading means different things on different timeframes.',
    ],
    related: ['divergence', 'stochastic-oscillator', 'macd', 'trend', 'volatility'],
    popular: true,
  },
  {
    slug: 'macd',
    term: 'MACD',
    category: 'indicators',
    aliases: ['moving average convergence divergence'],
    short: 'A momentum indicator built from the difference between two exponential moving averages.',
    explanation: [
      'MACD subtracts a longer EMA from a shorter one — classically 26 and 12 periods. A signal line, usually a 9-period EMA of that result, is plotted on top.',
      'The histogram shows the gap between the MACD line and its signal line. It expands when momentum is accelerating and contracts when the move is tiring.',
      'Because it is built entirely from moving averages, MACD inherits their lag. It confirms moves rather than anticipating them.',
    ],
    formula: {
      label: 'MACD Line',
      expression: '12-period EMA − 26-period EMA',
      legend: [
        { symbol: 'Signal line', meaning: '9-period EMA of the MACD line' },
        { symbol: 'Histogram', meaning: 'MACD line − Signal line' },
      ],
    },
    whyItMatters:
      'MACD offers a structured read on whether momentum is building or fading, which is useful for deciding whether to hold a trend trade or tighten the trail.',
    mistakes: [
      'Trading every crossover regardless of trend context.',
      'Using MACD in a sideways market, where it produces near-continuous false signals.',
    ],
    related: ['exponential-moving-average', 'divergence', 'rsi', 'trend', 'moving-average'],
  },
  {
    slug: 'atr',
    term: 'ATR',
    category: 'indicators',
    aliases: ['average true range'],
    short: 'The average size of an instrument’s price range per period, including gaps.',
    explanation: [
      'True Range is the largest of: the current high minus low, the high minus the previous close, or the low minus the previous close. Including the previous close is what captures gaps.',
      'ATR averages that over a lookback, usually 14 periods, and reports it in the instrument’s own price units. An ATR of $1.20 means the instrument typically travels about $1.20 in a period.',
      'ATR has no direction. It tells you how far price moves, never which way.',
    ],
    formula: {
      label: 'True Range',
      expression: 'max(High − Low, |High − Prev Close|, |Low − Prev Close|)',
      legend: [{ symbol: 'ATR', meaning: 'Average of True Range over N periods, usually 14' }],
    },
    whyItMatters:
      'ATR is the most practical bridge between a chart and a position size. It turns "this instrument is volatile" into a specific stop distance you can divide your risk budget by.',
    mistakes: [
      'Comparing ATR values across instruments with different prices. Use ATR as a percentage of price instead.',
      'Setting stops inside 1 ATR and being surprised by routine noise.',
      'Assuming today’s ATR will hold through a scheduled event.',
    ],
    related: ['volatility', 'atr-stop', 'stop-distance', 'position-size', 'bollinger-bands'],
    popular: true,
  },
  {
    slug: 'vwap',
    term: 'VWAP',
    category: 'indicators',
    aliases: ['volume weighted average price'],
    short: 'The average price over a session, weighted by the volume traded at each price.',
    explanation: [
      'VWAP weights every price by how much actually traded there, so it reflects where business was really done rather than where price merely visited.',
      'It resets each session, which makes it an intraday reference rather than a trend tool.',
      'Institutions use it as an execution benchmark — filling below VWAP is a good buy by that standard — which is part of why price so often reacts around the line.',
    ],
    formula: {
      label: 'VWAP',
      expression: 'Σ (Price × Volume) ÷ Σ Volume',
      legend: [{ symbol: 'Σ', meaning: 'Summed across the session so far' }],
    },
    whyItMatters:
      'VWAP provides an objective intraday reference for whether buyers or sellers currently have the upper hand, and a natural level to place stops beyond.',
    mistakes: [
      'Using VWAP on a daily or weekly chart, where the session reset makes it meaningless.',
      'Treating it as support or resistance without watching how price actually behaves at it.',
    ],
    related: ['volume', 'volume-profile', 'moving-average', 'liquidity', 'timeframe'],
  },
  {
    slug: 'bollinger-bands',
    term: 'Bollinger Bands',
    category: 'indicators',
    aliases: ['bands', 'bollinger'],
    short: 'A moving average with volatility bands plotted a set number of standard deviations above and below.',
    explanation: [
      'The middle band is typically a 20-period simple moving average. The outer bands sit two standard deviations away, so they widen in volatile conditions and contract in calm ones.',
      'The bands describe where price has recently been relative to its own variability. Touching a band is not a signal — in a strong trend price can ride the upper band for a long time.',
      'A sustained contraction, sometimes called a squeeze, indicates unusually low volatility and often precedes an expansion.',
    ],
    whyItMatters:
      'Band width is a fast visual read on current volatility, which feeds directly into how wide a stop the instrument currently requires.',
    mistakes: [
      'Selling every touch of the upper band during an uptrend.',
      'Reading a squeeze as directional. It signals expansion, not which way.',
    ],
    related: ['volatility', 'atr', 'moving-average', 'consolidation', 'breakout'],
  },
  {
    slug: 'stochastic-oscillator',
    term: 'Stochastic Oscillator',
    category: 'indicators',
    aliases: ['stochastics', 'stoch'],
    short: 'A momentum indicator showing where the close sits within the recent high-low range.',
    explanation: [
      'The stochastic asks a simple question: is price closing near the top or the bottom of its recent range? A reading of 80 means the close is 80% of the way up that range.',
      'It is plotted as two lines — a fast line and a smoothed signal line — and, like RSI, is scaled from 0 to 100 with conventional overbought and oversold zones.',
      'It reacts faster than RSI, which makes it more responsive and considerably noisier.',
    ],
    whyItMatters:
      'In range-bound conditions the stochastic can help time entries near the edges. In trends it produces a steady stream of premature counter-trend signals.',
    mistakes: [
      'Using it as a reversal trigger in a strongly trending market.',
      'Trading every crossover without reference to structure.',
    ],
    related: ['rsi', 'divergence', 'range', 'consolidation', 'macd'],
  },
  {
    slug: 'fibonacci-retracement',
    term: 'Fibonacci Retracement',
    category: 'indicators',
    aliases: ['fib', 'fibs', 'retracement levels'],
    short: 'Horizontal levels drawn at set percentages of a prior move, used to anticipate pullback depth.',
    explanation: [
      'The tool is anchored to a swing low and swing high, then draws lines at 23.6%, 38.2%, 50%, 61.8% and 78.6% of that range.',
      'The levels have no mechanical force. They matter to the extent that many participants watch the same ones and place orders there.',
      'Anchoring is subjective, and different anchor choices produce entirely different levels — which is why fib levels are strongest when they coincide with structure that already existed.',
    ],
    whyItMatters:
      'Retracement levels give a pullback entry a specific price to plan around, which turns a vague "wait for a dip" into a stop distance you can size from.',
    mistakes: [
      'Re-anchoring the tool until the levels agree with a position already held.',
      'Treating a level as support with no confirming price behavior.',
      'Placing stops exactly at a fib level, where probes are common.',
    ],
    related: ['pullback', 'support', 'resistance', 'swing-high', 'swing-low'],
  },
  {
    slug: 'volume-profile',
    term: 'Volume Profile',
    category: 'indicators',
    aliases: ['market profile', 'point of control', 'poc'],
    short: 'A histogram showing how much volume traded at each price level rather than in each period.',
    explanation: [
      'Standard volume charts show activity over time. Volume profile rotates that: it shows activity by price, revealing where the market actually did business.',
      'The price with the most volume is the Point of Control. Wide areas of the profile are prices the market accepted; thin areas are prices it rejected quickly.',
      'Thin zones tend to be traversed fast when revisited, because there is little resting interest to slow price down.',
    ],
    whyItMatters:
      'High-volume nodes often behave like magnets and low-volume nodes like slides, which helps in placing targets and stops where price is likely to react or accelerate.',
    mistakes: [
      'Reading the profile without specifying the period it covers.',
      'Assuming a high-volume node must hold as support.',
    ],
    related: ['volume', 'vwap', 'support', 'resistance', 'liquidity'],
  },
  {
    slug: 'divergence',
    term: 'Divergence',
    category: 'indicators',
    aliases: ['bullish divergence', 'bearish divergence'],
    short: 'When price makes a new extreme but the indicator does not, suggesting momentum is fading.',
    explanation: [
      'Bearish divergence: price makes a higher high while RSI or MACD makes a lower high. The move is extending, but with less force behind it.',
      'Bullish divergence is the mirror — a lower low in price with a higher low in the indicator.',
      'Divergence is a warning about momentum, not a reversal signal. Momentum can fade for a long time before price actually turns, and in a strong trend it may never turn at all.',
    ],
    whyItMatters:
      'Divergence is a good reason to tighten a trailing stop or decline a fresh entry in that direction. It is a poor reason to open a counter-trend position on its own.',
    mistakes: [
      'Entering counter-trend on divergence alone with no confirmation from price.',
      'Repeatedly re-entering as divergence persists through a strong trend.',
    ],
    related: ['rsi', 'macd', 'trend', 'trailing-stop', 'market-structure'],
  },
];
