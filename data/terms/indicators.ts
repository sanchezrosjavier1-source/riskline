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
    example: {
      setup: 'A 50-period average used as context rather than as a signal',
      steps: [
        { label: 'Price', value: '$118.40' },
        { label: '50-period average', value: '$112.10' },
        { label: 'Reading', value: 'above — long setups only' },
        { label: 'Pullback entry zone', value: 'near $112' },
      ],
      body: [
        'The average does one job here: it splits the chart into conditions where the trader takes long setups and conditions where they do not. That is a filter, and filters are where moving averages are genuinely useful.',
        'Crossovers, by contrast, are what most people reach for first and are the weakest use of the tool. A moving average is an average of prices that have already happened, so it turns after the move does — in a choppy market that produces a steady stream of signals that are each slightly too late in both directions.',
        'The second use is as a place to plan a pullback. Enough participants watch the 50 that price often finds buyers near it, which gives a long entry a specific level to wait for and a stop just beneath it to size from.',
        'What makes any of this work is committing to one setting in advance. There is always a period length that would have worked on the chart in front of you, and choosing it afterwards is fitting the tool to the past rather than using it on the present.',
      ],
    },
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
    example: {
      setup: 'EMA and SMA on the same sharp reversal',
      steps: [
        { label: 'Price drops', value: '$64 → $58 in three bars' },
        { label: '20-period EMA', value: 'turns down on bar 2' },
        { label: '20-period SMA', value: 'turns down on bar 4' },
        { label: 'If price recovers', value: 'EMA whipsaws first' },
      ],
      body: [
        'The EMA weights recent bars more heavily, so it reacts sooner — two bars sooner here. On a genuine reversal that is a real advantage, and it is the entire case for using one.',
        'The same property is the disadvantage. When the drop is noise rather than a turn, the EMA has already signalled and has to reverse again, while the slower average never moved. Responsiveness and false signals are not two separate traits to be optimised independently; they are the same trait seen from two sides.',
        'Which is why "which is better" has no answer in the abstract. A trend follower holding for weeks is usually better served by the average that ignores a three-bar shock; an intraday trader working short moves cannot afford to learn about a reversal four bars late.',
        'The one thing that is always wrong is switching between them because the other one would have looked better on the last trade. That is not a choice of tool, it is a way of never having one.',
      ],
    },
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
    example: {
      setup: 'Shorting an RSI of 78 in a strong uptrend',
      steps: [
        { label: 'RSI reading', value: '78 — "overbought"' },
        { label: 'Short taken at', value: '$41.00' },
        { label: 'RSI six sessions later', value: '84' },
        { label: 'Price six sessions later', value: '$47.30' },
      ],
      body: [
        'Overbought is a description, not an instruction. It says the recent gains have been large relative to the recent losses, which in a strong trend is simply what a strong trend looks like — and a trend can keep producing that reading for weeks.',
        'This is the most expensive misuse of the indicator, because it puts the trader on the wrong side of exactly the moves that pay the most. Selling strength because a number crossed 70 means systematically shorting the strongest instruments on the screen.',
        'The uses that survive scrutiny are quieter. Divergence — price making a higher high while RSI makes a lower one — is a reason to tighten a trailing stop on a position you already hold. And an extreme reading inside a range, where the boundaries are doing real work, is a different situation from an extreme reading in a trend.',
        'In every one of those cases RSI is a modifier on a decision made elsewhere. As a standalone trigger to reverse direction it has cost more accounts than almost any other indicator, for the simple reason that it fires most confidently when it is most wrong.',
      ],
    },
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
    example: {
      setup: 'A histogram shrinking while price still rises',
      steps: [
        { label: 'Price', value: 'making new highs' },
        { label: 'Histogram bar 1', value: '0.42' },
        { label: 'Histogram bar 2', value: '0.31' },
        { label: 'Histogram bar 3', value: '0.19' },
      ],
      body: [
        'Price is still going up and the rate at which it is going up is falling. The histogram measures the gap between the MACD line and its signal line, so a shrinking sequence says the move is decelerating while still moving.',
        'That is a genuinely useful thing to know, and it is not a sell signal. Trends decelerate and re-accelerate constantly. What it is, for a trader already long, is a reason to tighten a trailing stop rather than to add — a change in how the position is managed, not a reversal of the view.',
        'Used as an entry trigger the tool is much weaker. MACD is built from two moving averages, so it inherits their lag twice over, and a crossover signal in a choppy market arrives after the move it is describing has mostly happened.',
        'Its honest description is a momentum gauge with a delay. Read the histogram’s direction rather than its crossings, treat it as commentary on a position you already have, and it does real work; treat it as a signal generator and it mostly generates late ones.',
      ],
    },
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
    example: {
      setup: 'From an ATR reading to a share count in three steps',
      steps: [
        { label: 'ATR(14)', value: '$2.40' },
        { label: 'Stop distance at 1.5×ATR', value: '$3.60' },
        { label: 'Risk budget', value: '$600' },
        { label: 'Position size', value: '166 shares' },
      ],
      body: [
        'This is the whole bridge. The chart produces one number — how much this instrument typically moves — the trader chooses a multiple, and the result divides into the risk budget to give a share count. No opinion about direction enters anywhere.',
        'What it replaces is a fixed stop applied to everything. A flat $2 stop is generous on an instrument with an ATR of $0.60 and inside a single day’s noise on one with an ATR of $2.40, so the same rule produces wildly different real risks depending on what it is pointed at.',
        'The reading is an average of the last fourteen true ranges, which includes gaps — that is what separates true range from the high-minus-low of a single session, and it is why the number is usable on instruments that gap.',
        'Its weakness is being a trailing average. When volatility is expanding, ATR is describing the calm that preceded it and understates the room now required, which is exactly the moment a stop set from it is most likely to be taken out.',
      ],
    },
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
    example: {
      setup: 'Price at $34.80 with VWAP at $34.15',
      steps: [
        { label: 'VWAP', value: '$34.15' },
        { label: 'Price', value: '$34.80' },
        { label: 'Reading', value: 'buyers in control today' },
        { label: 'Long stop belongs', value: 'below $34.15' },
      ],
      body: [
        'VWAP is the average price weighted by the volume that traded there, so it is roughly the price the day’s participants collectively paid. Above it, the average position taken today is in profit; below it, underwater.',
        'That is why institutional desks care about it and why it acts as a level. A trader filling a large order over the session is measured against VWAP, which creates real demand to buy under it and real supply above — participation that exists for reasons unrelated to any chart pattern.',
        'For an intraday long, it gives the stop a non-arbitrary home. Below VWAP the premise that buyers are in control is no longer supported, which is a better reason to be out than a round number or a fixed percentage.',
        'One property to respect: it resets each session. VWAP says nothing about yesterday, and it is nearly meaningless in the first few minutes of trading, when very little volume has accumulated and the line jumps around on small prints.',
      ],
    },
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
    example: {
      setup: 'Bands at their narrowest in months',
      steps: [
        { label: 'Band width, six weeks ago', value: '$5.20' },
        { label: 'Band width now', value: '$1.40' },
        { label: 'What it says', value: 'volatility has collapsed' },
        { label: 'What it does not say', value: 'which way it breaks' },
      ],
      body: [
        'The bands sit two standard deviations either side of a moving average, so their width is a picture of recent volatility. A squeeze this tight says the instrument has gone quiet, and quiet periods are usually followed by loud ones.',
        'The crucial limitation is in the last row. A squeeze carries no directional information whatsoever — it is a statement about the size of the coming move, not its sign — and trading it as though it did is the most common error made with the tool.',
        'The second most common is treating a touch of the upper band as overbought. In a strong trend price can walk along the upper band for weeks, because the band is calculated from the same rising prices it is being compared against.',
        'Where the width genuinely helps is sizing. Narrow bands mean a tight stop is currently reasonable and a larger position fits the same risk; wide bands mean the opposite. That is a volatility read feeding a position size, which is the job the tool actually does well.',
      ],
    },
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
    example: {
      setup: 'The same reading of 91 in a range and in a trend',
      steps: [
        { label: 'In a range', value: 'price at the top boundary' },
        { label: 'Useful?', value: 'yes — edge is defined' },
        { label: 'In a trend', value: 'price at a new high' },
        { label: 'Useful?', value: 'no — it stays there' },
      ],
      body: [
        'The indicator measures where the close sits within the recent high-low range, so a reading of 91 means price closed near the top of that range. What that implies depends entirely on whether the range is a real boundary or simply the extent of an ongoing advance.',
        'Inside a range it is doing something reasonable. There is a ceiling, price is at it, and a short with a stop just above has a defined invalidation and a clear target at the other boundary.',
        'In a trend the identical reading is a description of strength. A trending instrument can hold a stochastic above 90 for weeks, printing a sell signal every few days, each of which is an invitation to short the strongest thing on the screen.',
        'Which makes the order of operations everything. Establish the regime first, from structure, and only then consult the oscillator. Read in the other direction it will confidently tell you to fade every trend you encounter.',
      ],
    },
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
    example: {
      setup: 'A move from $80 to $104, and where the pullback levels fall',
      steps: [
        { label: 'Move', value: '$24.00' },
        { label: '38.2% retracement', value: '$94.83' },
        { label: '50% retracement', value: '$92.00' },
        { label: '61.8% retracement', value: '$89.17' },
      ],
      body: [
        'The value here is not mystical, it is logistical. "Wait for a pullback" is not a plan; $94.83 is. It gives a limit order a price, a stop a place to sit beneath, and therefore a position size — which is the difference between an intention and a trade.',
        'It is worth being honest about why these levels work when they do. There is no known mechanism by which markets respect 61.8%. What there is, is a very large number of participants watching the same three lines drawn from the same obvious swing, which is enough to produce real orders at them.',
        'That also explains the failure mode. Drawn from a different high or low, the levels move, and it is always possible to find an anchor pair that puts a line where price happened to turn. Fitting the tool after the fact tells you nothing.',
        'Used properly it is a planning aid and nothing more. The levels give the pullback a price; whether to take the trade at that price is a question structure has to answer.',
      ],
    },
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
    example: {
      setup: 'A thin shelf between two heavily traded prices',
      steps: [
        { label: 'High-volume node', value: '$210 — heavy trade' },
        { label: 'Low-volume gap', value: '$212–$218 — very little' },
        { label: 'High-volume node', value: '$219 — heavy trade' },
        { label: 'Behaviour through the gap', value: 'fast' },
      ],
      body: [
        'Volume profile plots how much trading happened at each price rather than in each time period. Where a great deal traded, many participants have positions to defend and price tends to stall; where almost nothing traded, there is nobody with a reason to act and price passes through quickly.',
        'That shape is directly useful for placing the two exits. A target set at $212, in the middle of the thin shelf, is asking price to stop somewhere it has historically never wanted to linger. A target at $219 sits where the trading actually happens.',
        'It cuts the other way too. A stop placed inside the low-volume zone is exposed to fast movement in both directions, so the fill is more likely to be poor — an argument for putting it beyond the node rather than in the empty space.',
        'None of this predicts direction. It describes where price is likely to hesitate and where it is likely to accelerate, which is information about the path rather than the destination — and the path is what stops and targets live on.',
      ],
    },
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
    example: {
      setup: 'Three divergences before the one that mattered',
      steps: [
        { label: 'Divergence 1 at $52', value: 'price went to $58' },
        { label: 'Divergence 2 at $58', value: 'price went to $63' },
        { label: 'Divergence 3 at $63', value: 'price went to $67' },
        { label: 'Divergence 4 at $67', value: 'the top' },
      ],
      body: [
        'Every one of these was a real divergence — a higher high in price against a lower high in the oscillator — and three of the four were invitations to short a market that kept going. The trader who acted on the first was right about the eventual top and out of business before it arrived.',
        'This is the central problem with divergence: it identifies decelerating momentum, and momentum can decelerate for a long time while price still rises. It says the move is getting tired, not that it is finished, and there is no version of the signal that distinguishes the fourth instance from the first.',
        'Which is why its honest use is defensive. For a position already long, a divergence is a reason to trail the stop closer and stop adding — decisions that cost nothing if the trend continues and protect a great deal if it does not.',
        'As a trigger to reverse, it needs something else to confirm it: a broken structural level, a failed retest. Divergence plus a lower low is a case. Divergence alone is a reason to pay attention.',
      ],
    },
    mistakes: [
      'Entering counter-trend on divergence alone with no confirmation from price.',
      'Repeatedly re-entering as divergence persists through a strong trend.',
    ],
    related: ['rsi', 'macd', 'trend', 'trailing-stop', 'market-structure'],
  },
];
