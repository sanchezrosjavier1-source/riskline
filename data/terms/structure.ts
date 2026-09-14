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
    example: {
      setup: 'A structure-based stop against a round-number stop',
      steps: [
        { label: 'Entry', value: '$146.20' },
        { label: 'Last higher low', value: '$142.90' },
        { label: 'Structural stop', value: '$142.60' },
        { label: '"I will risk 1%" stop', value: '$144.74' },
      ],
      body: [
        'The second stop sits in the middle of nothing. It was derived from the account balance rather than from the chart, so a routine pullback within the existing uptrend takes it out — and the trend then continues without the trader, who concludes the setup failed.',
        'The structural stop is at a level that means something. Below $142.90 the sequence of higher lows is broken, which is the exact condition under which the reason for being long stops being true. Getting hit there is information; getting hit at $144.74 is noise.',
        'This is what structure is for. It supplies levels that were not chosen by you, that other participants can also see, and that correspond to the thesis being right or wrong. A stop needs a reason, and "1% of my account" is a reason about your account, not about the trade.',
        'The order runs one way: find where the idea is invalidated, measure the distance from the entry, and let that distance determine the size. Risk is controlled by how many shares you buy, never by moving the stop to a more convenient place.',
      ],
    },
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
    example: {
      setup: 'Reading a sequence of peaks without an opinion',
      steps: [
        { label: 'Peak 1', value: '$58.40' },
        { label: 'Peak 2', value: '$61.90' },
        { label: 'Peak 3', value: '$61.20' },
        { label: 'Verdict', value: 'the sequence stalled' },
      ],
      body: [
        'Two higher highs, then one that failed to exceed the previous peak. Nothing about that is a sell signal on its own, and it is a fact rather than an interpretation: buyers could not push past $61.90 on the third attempt.',
        'That is the value of the concept. A higher high is an observation anyone looking at the chart would make the same way, which makes it a usable input in a way that "momentum looks tired" is not.',
        'For a position already long, this is the first thing worth noticing. The trend is not broken — that would require a lower low — but the evidence supporting it has stopped accumulating, which is a reasonable moment to tighten a stop rather than to add.',
        'The failure mode is treating one peak as a verdict. Trends stall and resume constantly, and a single lower high inside an otherwise healthy structure is a pause, not a reversal. The sequence is the signal, not any one point in it.',
      ],
    },
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
    example: {
      setup: 'Entering on the third higher low rather than the first',
      steps: [
        { label: 'Low 1', value: '$18.10' },
        { label: 'Low 2', value: '$19.40' },
        { label: 'Low 3', value: '$20.70' },
        { label: 'Entry at $21.30, stop $20.50', value: 'risk $0.80' },
      ],
      body: [
        'Each low is higher than the one before, which means buyers are stepping in earlier each time rather than waiting for the previous discount. That is the whole content of an uptrend, stated without adjectives.',
        'It also hands you the stop. The relevant invalidation is below $20.70 — if that level breaks, the sequence that justified being long has ended — so $20.50 is a stop with a reason, and 80 cents is the distance the position size is calculated from.',
        'Entering near the higher low is what makes the risk small. The same idea bought $3 higher, at the top of the swing, has a stop in the same place and nearly four times the risk per share, so the position must be four times smaller for identical risk.',
        'The recurring mistake is using the oldest low as the reference. The stop belongs below the most recent higher low, not below the start of the trend — otherwise the risk grows with every successful swing, which is exactly backwards.',
      ],
    },
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
    example: {
      setup: 'A short with its stop above the most recent lower high',
      steps: [
        { label: 'High 1', value: '$94.80' },
        { label: 'High 2', value: '$91.30' },
        { label: 'Entry on the rejection', value: '$90.40' },
        { label: 'Stop above $91.30', value: '$91.60, risk $1.20' },
      ],
      body: [
        'Sellers turned the stock back at a lower level than last time. That is the downtrend stated as an observation, and it produces the one thing a short position badly needs: a defined place where the idea is wrong.',
        'This matters more on the short side than the long side, because the losses are unbounded. A long without a good stop has a floor at zero; a short without one has nothing above it at all, and the position grows as it goes against you.',
        'So $91.60 is doing structural work. Above the most recent lower high the sequence is broken and the reason for being short has evaporated — which is precisely when you want to be out, rather than at a price chosen because it felt like enough.',
        'The buffer above the level is deliberate. Stops clustered exactly at an obvious high are the easiest liquidity in the market to reach for, and a few extra cents of distance costs a slightly smaller position and buys a considerably better chance of surviving the probe.',
      ],
    },
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
    example: {
      setup: 'The moment an uptrend stops being an uptrend',
      steps: [
        { label: 'Higher lows', value: '$31.20 → $33.80 → $35.90' },
        { label: 'Next pullback holds at', value: '$34.10' },
        { label: 'Below the prior low?', value: 'no — still intact' },
        { label: 'Following pullback', value: '$33.60 — broken' },
      ],
      body: [
        'The first pullback to $34.10 looks alarming and changes nothing: it is above $33.80, so the sequence of higher lows survives. The second one, at $33.60, breaks it. That is the event, and it is binary rather than a matter of degree.',
        'Having the level written down in advance is what makes this useful. In the moment, $34.10 and $33.60 feel like the same thing — both are sharp falls, both are uncomfortable — and the distinction is only visible to someone who decided beforehand which number mattered.',
        'A lower low does not mean price is about to collapse. Plenty of trends make one and resume. What it means is that the specific evidence the long position rested on is gone, and continuing to hold is now a new decision that needs its own reasoning.',
        'For a trader that is the cleanest exit rule available: not a feeling that the move is over, but a price that either trades or does not.',
      ],
    },
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
    example: {
      setup: 'One swing high doing three jobs at once',
      steps: [
        { label: 'Swing high', value: '$77.50' },
        { label: 'For a long', value: 'the target' },
        { label: 'For a short', value: 'where the stop goes above' },
        { label: 'For structure', value: 'the level the next peak is measured against' },
      ],
      body: [
        'The same price is a destination, a boundary and a reference point depending on what you are doing, which is what makes swing highs the anchors of a chart rather than decoration on it.',
        'They earn that status because they are where supply appeared. Price rose until it found enough sellers to turn it back, and those sellers — plus everyone who wishes they had sold there — are the reason the level often matters again.',
        'Two practical cautions. A swing high is only confirmed once price has moved away from it, so the most recent one is always provisional; and it is timeframe-dependent, so a swing high on the 5-minute chart is invisible on the daily. Mixing them produces stops that look structural and are not.',
        'Used consistently on one timeframe, they give a trade its geometry: where it is going, where it is wrong, and how far apart those two are — which is the risk/reward ratio, read off the chart rather than assumed.',
      ],
    },
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
    example: {
      setup: 'The same $400 risk at two distances from the swing low',
      steps: [
        { label: 'Swing low', value: '$63.80' },
        { label: 'Entry near it: $64.40', value: 'risk $0.80 → 500 shares' },
        { label: 'Entry extended: $67.10', value: 'risk $3.50 → 114 shares' },
        { label: 'Risk in both cases', value: '$400' },
      ],
      body: [
        'The swing low does not move. Where you enter relative to it decides everything else: the same idea, the same invalidation, the same $400 at stake, and a position more than four times larger in one case than the other.',
        'That is why "entering near structure" is a risk decision rather than an aesthetic preference. The closer the entry sits to the level that invalidates it, the more size the same risk budget buys, and the more of the subsequent move the position captures.',
        'It also explains why chasing is so expensive in a way that is invisible at the time. Buying $2.70 higher does not increase the risk — the risk was fixed at $400 — it shrinks the position to a quarter, so a correct call pays a quarter as much.',
        'Structure and sizing are therefore the same conversation. Find the level the trade depends on, measure from it, and let that distance decide the size; anything else is choosing the size first and discovering the risk afterwards.',
      ],
    },
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
    example: {
      setup: 'Trend rules applied inside a $4 range',
      steps: [
        { label: 'Range low', value: '$52.00' },
        { label: 'Range high', value: '$56.00' },
        { label: 'Breakout buys near', value: '$56.00' },
        { label: 'Price then returns to', value: '$52.00' },
      ],
      body: [
        'A trend-following rule buys strength, so inside a range it buys at the top and sells at the bottom — the exact inverse of what the market is doing. Run it through three or four oscillations and the account bleeds steadily on a stock that finished where it started.',
        'The range playbook is the opposite: buy near the low with a stop just below it, sell near the high, and expect the middle to go nowhere. Same chart, opposite instructions, and the only thing that decides which is correct is whether the boundaries are holding.',
        'What makes ranges genuinely useful is that the boundaries are close. A long at $52.30 with a stop at $51.70 risks 60 cents for a $3.70 move to the other side — a ratio that is difficult to find in a trending market, precisely because the invalidation level is right there.',
        'The cost is the breakout. Ranges end, and when they do the range trader is short at the top of a move that keeps going. That is why the stop sits outside the boundary rather than at it, and why a broken range is a reason to stop applying range rules rather than to fade harder.',
      ],
    },
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
    example: {
      setup: 'A 78% win rate that says nothing about the trader',
      steps: [
        { label: 'Strategy', value: 'buy every dip' },
        { label: 'Win rate over the period', value: '78%' },
        { label: 'Index over the same period', value: '+31%' },
        { label: 'What was being measured', value: 'the market' },
      ],
      body: [
        'Buying dips works extremely well when everything recovers, which is the definition of the environment rather than a property of the method. A 78% win rate across a strongly rising market is a measurement of the market with a trader attached.',
        'The problem is not the profit — the profit is real and spendable. It is the conclusion drawn from it. A trader who reads that record as evidence of skill sizes up, and the sizing is in place when the regime turns and the same rule starts buying into declines that keep declining.',
        'The honest test is whether a strategy has been through a regime it dislikes. Any method that has only traded a bull market has an unknown expectancy, however long the sample looks, because every trade in it was taken with the same wind behind it.',
        'Knowing the regime does not tell you what happens next. It tells you how much of your recent record to attribute to yourself, which is the more useful of the two.',
      ],
    },
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
    example: {
      setup: 'The same share count, twice the real risk',
      steps: [
        { label: 'Calm market: average daily range', value: '~1.1%' },
        { label: 'Bear market: average daily range', value: '~2.6%' },
        { label: 'Position', value: 'unchanged' },
        { label: 'Daily swing in currency', value: 'more than doubled' },
      ],
      body: [
        'Nothing about the position changed. The instrument did: the same number of shares now moves more than twice as much in a day, which means the account is taking on far more variance than the sizing routine believed it was.',
        'Bear markets raise every input at once. Volatility rises, correlations rise so unrelated positions stop diversifying, gaps become larger and more frequent, and liquidity thins out so stops slip further. A position sized by a rule calibrated in calm conditions is quietly running hot on all five.',
        'The adjustment is not to stop trading. It is to let the stop distance widen with the volatility, which automatically shrinks the position — and if the sizing rule is being followed properly, that happens on its own rather than requiring a decision.',
        'Rallies are the other trap. Bear markets produce the sharpest upward moves in the record, which look like the turn and are usually not, and which punish shorts sized for calm conditions just as hard.',
      ],
    },
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
    example: {
      setup: 'A wick to $49.88 and a close back at $50.60',
      steps: [
        { label: 'Obvious support', value: '$50.00' },
        { label: 'Where most stops sit', value: 'just below $50.00' },
        { label: 'Low of the move', value: '$49.88' },
        { label: 'Close', value: '$50.60' },
      ],
      body: [
        'Twelve cents below the round number, then straight back up. Everyone who placed a stop at $49.95 was sold out at the low of the day, and the level they were trading held perfectly well.',
        'This is not a conspiracy, it is plumbing. A cluster of stops below an obvious level is a cluster of resting sell orders, and anyone wanting to buy size needs sellers. Price reaching down to where the orders are is the market finding the liquidity it needs, and it happens because the stops are predictable.',
        'The defence is to stop being predictable. Put the stop beyond the level with a buffer sized by the instrument’s volatility — a fraction of an ATR, not a round number — so that reaching it requires a genuine move rather than a twelve-cent probe.',
        'The buffer is not free: a wider stop means a smaller position for the same risk. That is the trade being made — slightly less size, in exchange for not donating the trade to a wick that proved nothing.',
      ],
    },
    mistakes: [
      'Placing stops a few cents beyond the most obvious high or low on the chart.',
      'Treating every sweep as a reversal signal without waiting for price to reclaim the level.',
    ],
    related: ['false-breakout', 'stop-loss', 'liquidity', 'swing-low', 'support'],
  },
];
