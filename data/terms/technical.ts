import type { Term } from '@/types/dictionary';

export const technicalTerms: Term[] = [
  {
    slug: 'support',
    term: 'Support',
    category: 'technical',
    aliases: ['support level', 'floor'],
    short: 'A price area where buying has repeatedly been strong enough to stop a decline.',
    explanation: [
      'Support is not a line drawn on a chart — it is a zone where enough buyers historically stepped in to absorb selling and turn price back up.',
      'It works partly as self-fulfilling behavior. Traders remember where price bounced, place orders there, and that clustering of orders creates the very absorption they expected.',
      'Support that breaks often becomes resistance. Buyers who bought there are now underwater and tend to sell when price returns to their entry.',
    ],
    diagram: 'support-resistance',
    whyItMatters:
      'Support gives a long trade a natural invalidation point. If price closes decisively below the zone, the reason for the trade is gone — which makes it a defensible place to build a stop from.',
    example: {
      setup: 'Support as a zone rather than a line',
      steps: [
        { label: 'Touches at', value: '$44.10, $43.80, $44.30' },
        { label: 'Zone', value: '$43.80 – $44.30' },
        { label: 'Stop below the zone', value: '$43.55' },
        { label: 'Stop drawn as a line', value: '$44.05 — inside it' },
      ],
      body: [
        'Price has turned three times in a fifty-cent band, not at a single price. Drawing support as one line and putting a stop just under that line places the order in the middle of the area where buyers actually operate, which is the worst available location.',
        'Treating it as a zone puts the stop at $43.55 — below everywhere the level has ever held. The cost is twenty-five cents of extra distance and therefore a smaller position; the benefit is that getting stopped out means something rather than nothing.',
        'What makes support work at all is memory. Buyers who bought there before are willing to again, sellers who sold too early want a second chance, and traders who watched it hold now have a level marked on their chart. It is a cluster of intentions, and intentions cluster loosely.',
        'It also fails eventually, and it should. A level that holds three times and breaks on the fourth has not malfunctioned — that is how ranges end. The stop below the zone is what converts that ending into a small, planned loss.',
      ],
    },
    mistakes: [
      'Treating support as an exact price rather than a zone, and setting stops a cent below it.',
      'Assuming support must hold. It is a probability, not a barrier.',
      'Buying at support without any evidence that buyers are actually showing up this time.',
    ],
    related: ['resistance', 'breakout', 'pullback', 'stop-loss', 'range'],
    popular: true,
  },
  {
    slug: 'resistance',
    term: 'Resistance',
    category: 'technical',
    aliases: ['resistance level', 'ceiling', 'supply'],
    short: 'A price area where selling has repeatedly been strong enough to stop an advance.',
    explanation: [
      'Resistance is the mirror of support: a zone where supply has consistently overwhelmed demand and capped the move.',
      'It often forms where trapped buyers wait. People who bought a previous high and sat through a decline frequently sell as soon as they get back to break-even, creating fresh supply.',
      'Once resistance is broken and price holds above it, the level tends to flip and act as support on a retest.',
    ],
    diagram: 'support-resistance',
    whyItMatters:
      'Resistance is where a long trade’s upside realistically runs out, which makes it a far better basis for a take profit than a round number.',
    example: {
      setup: 'A target at resistance versus a target at a round number',
      steps: [
        { label: 'Entry', value: '$68.20, stop $66.90' },
        { label: 'Resistance', value: '$72.40' },
        { label: 'Target at resistance', value: '1:3.2' },
        { label: 'Target at $75.00', value: '1:5.2 — on paper' },
      ],
      body: [
        'The $75 target has the better ratio and the worse odds. $72.40 is where sellers have already turned this instrument back; $75 is a number that looks tidy. Setting the target beyond known resistance does not make the move more likely to get there — it makes a trade that reaches $72.30 and reverses finish as a loss instead of a win.',
        'This is the honest way to use a level. Resistance tells you where the upside realistically runs out, so it supplies the target, and the target plus the stop supplies the ratio. Read in that order the ratio is a finding.',
        'Read in the other order it is a fiction. Deciding the trade needs 1:5 and placing the target wherever produces 1:5 will always produce 1:5, and a hit rate nobody measured.',
        'The nuance worth keeping: a level that has held several times is stronger evidence than one that has held once, and old resistance that has been broken often becomes support. Both change where the target belongs, neither changes the principle that it belongs where price is plausibly going.',
      ],
    },
    mistakes: [
      'Setting a target just beyond heavy resistance instead of just before it.',
      'Reading every touch as equally significant regardless of volume or context.',
    ],
    related: ['support', 'breakout', 'take-profit', 'range', 'retest'],
    popular: true,
  },
  {
    slug: 'breakout',
    term: 'Breakout',
    category: 'technical',
    aliases: ['break out', 'breaking out'],
    short: 'When price moves decisively beyond an established support or resistance level.',
    explanation: [
      'A breakout signals that the balance between buyers and sellers at a level has broken. The range that contained price no longer does.',
      'Quality matters more than the event itself. Genuine breakouts usually come with an expansion in volume and a close beyond the level, not just an intraday poke through it.',
      'Breakouts create a natural trade structure: entry beyond the level, stop back inside the range, target at the next area of interest.',
    ],
    whyItMatters:
      'Breakout entries have well-defined invalidation — if price falls back inside the range, the premise failed — which makes them straightforward to size correctly.',
    example: {
      setup: 'A breakout above a three-week range',
      steps: [
        { label: 'Range high', value: '$29.40' },
        { label: 'Entry on the break', value: '$29.65' },
        { label: 'Stop back inside the range', value: '$29.10' },
        { label: 'Risk per share', value: '$0.55' },
      ],
      body: [
        'The appeal of a breakout is that the invalidation writes itself. The premise is that price has left the range; if it returns inside, the premise is false, and there is no interpretation required. That makes the stop placement obvious and the position size a simple division.',
        'Volume is the one filter worth applying. A break on volume well above the recent average suggests real participation took price through the level; a break on thin volume is frequently a probe that reverses, and the difference is visible at the time rather than only afterwards.',
        'The structural cost is the entry price. By definition a breakout is bought after the move has started, so the entry is worse than a pullback entry into the same idea and the risk per share is larger — which means a smaller position for identical risk.',
        'And the failure rate is genuinely high. Ranges are where stops cluster on both sides, which is exactly what makes their edges attractive to probe. Sizing correctly matters more here than the quality of the level, because a meaningful share of these will fail by design.',
      ],
    },
    mistakes: [
      'Entering on the first tick through a level rather than waiting for confirmation.',
      'Placing the stop immediately behind the level where a normal retest will hit it.',
      'Chasing a breakout after it has already run, which widens the stop and ruins the risk/reward.',
    ],
    related: ['false-breakout', 'resistance', 'support', 'retest', 'volume'],
    popular: true,
  },
  {
    slug: 'false-breakout',
    term: 'False Breakout',
    category: 'technical',
    aliases: ['fakeout', 'failed breakout'],
    short: 'A move beyond a key level that quickly reverses back inside the prior range.',
    explanation: [
      'A false breakout pushes past a level, triggers the orders waiting there, and then fails — closing the move back inside the range.',
      'It happens for a structural reason: stop orders cluster just beyond obvious levels, and those stops are liquidity. Triggering them provides the volume larger participants need to fill the opposite side.',
      'The reversal itself is often a strong signal. A failed breakout above resistance frequently leads to a fast move in the other direction as trapped buyers exit.',
    ],
    whyItMatters:
      'It explains why stops placed just beyond obvious levels get hit so often, and why stop placement should account for a level being probed before it holds.',
    example: {
      setup: 'A break above $29.40 that closes back at $28.90',
      steps: [
        { label: 'Range high', value: '$29.40' },
        { label: 'Highest print', value: '$29.71' },
        { label: 'Close', value: '$28.90' },
        { label: 'Breakout buyers', value: 'long, and trapped' },
      ],
      body: [
        'Price went through, took every buy-stop resting above the range, and came back. Everyone who bought the break is now holding a losing position inside the range they thought had been left behind, and their exits are sell orders waiting above.',
        'That is why false breakouts so often precede a sharp move the other way: the failed breakout creates the supply that fuels it. The trapped longs have to get out, and they get out into any bounce.',
        'The defence is not to avoid breakouts, which would mean avoiding a whole category of trade. It is to put the stop where a probe does not reach — beyond the level with a volatility-based buffer — and to accept the smaller position that comes with the wider stop.',
        'Waiting for a close beyond the level rather than a touch of it filters a large share of these, at the cost of a worse entry price on the ones that work. Which trade-off is right depends on the instrument, but making the choice deliberately is the point.',
      ],
    },
    mistakes: [
      'Placing stops at the most obvious price on the chart.',
      'Entering breakouts without waiting for a close beyond the level.',
      'Re-entering repeatedly on the same failing level.',
    ],
    related: ['breakout', 'liquidity-sweep', 'stop-loss', 'support', 'resistance'],
  },
  {
    slug: 'pullback',
    term: 'Pullback',
    category: 'technical',
    aliases: ['retracement', 'dip'],
    short: 'A temporary move against the prevailing trend before it resumes.',
    explanation: [
      'A pullback is a pause, not a reversal. Price gives back part of a move as early participants take profit, then continues in the original direction.',
      'The practical difficulty is that a pullback and the start of a reversal look identical while they are happening. The distinction only becomes clear afterward.',
      'Trading pullbacks is attractive because it offers entry closer to a structural level, which shortens stop distance and improves risk/reward relative to chasing.',
    ],
    whyItMatters:
      'Entering on a pullback rather than at the extreme of a move usually tightens the stop, which allows a larger position at the same dollar risk.',
    example: {
      setup: 'Buying the pullback instead of the high',
      steps: [
        { label: 'Swing high', value: '$38.90' },
        { label: 'Pullback entry', value: '$36.40' },
        { label: 'Stop below the swing low', value: '$35.60' },
        { label: 'Risk per share', value: '$0.80 instead of $3.30' },
      ],
      body: [
        'Same trend, same stop level, same thesis. Entering on the pullback rather than at the high cuts the risk per share by roughly four fifths, which means four times the position for the same money at risk, and four times the profit if the trend resumes.',
        'That arithmetic is the entire case for patience, and it is a better case than "buying low feels disciplined". The pullback entry is not safer — the trade can still fail — it is more efficient, because the stop is close to the entry rather than a whole swing away.',
        'The cost is real and it is missed trades. Some trends do not pull back, and waiting means watching them go. A trader who only ever buys pullbacks will be out of the strongest moves entirely, which is a price worth naming rather than pretending away.',
        'The distinction that matters is between a pullback and a reversal, and it is decided by structure rather than by feel: a pullback holds above the prior swing low, and a move through it is something else with a different name.',
      ],
    },
    mistakes: [
      'Assuming every pullback resumes the trend.',
      'Adding to a losing position and calling it "buying the dip".',
      'Entering mid-pullback with no defined level for the stop to sit beyond.',
    ],
    related: ['trend', 'support', 'entry', 'higher-low', 'fibonacci-retracement'],
    popular: true,
  },
  {
    slug: 'trend',
    term: 'Trend',
    category: 'technical',
    aliases: ['uptrend', 'downtrend', 'trending'],
    short: 'A sustained directional bias in price, built from a repeating pattern of highs and lows.',
    explanation: [
      'An uptrend is a sequence of higher highs and higher lows. A downtrend is lower highs and lower lows. When neither pattern holds, the market is ranging.',
      'Trend is timeframe-dependent and often contradictory across timeframes. A market can be in a daily uptrend and an hourly downtrend at the same moment, and both readings are correct.',
      'Trends end when the sequence breaks — an uptrend that fails to make a new high, then breaks the last higher low, has structurally changed.',
    ],
    diagram: 'trend',
    whyItMatters:
      'Trend defines context. The same setup has very different odds depending on whether it is aligned with the larger structure or fighting it.',
    example: {
      setup: 'The same bullish setup, with and against the daily trend',
      steps: [
        { label: 'Setup', value: 'identical on the hourly' },
        { label: 'Daily trend up', value: 'pullbacks get bought' },
        { label: 'Daily trend down', value: 'rallies get sold' },
        { label: 'Difference', value: 'context, not the pattern' },
      ],
      body: [
        'The pattern on the hourly chart is the same in both cases — the same shape, the same trigger, the same stop placement. What differs is everything happening on the timeframe above it, and that is what decides whether the trade has a tailwind or is leaning into a much larger flow.',
        'This is why "does this setup work" is usually the wrong question. Most setups work in one context and fail in another, and a backtest that mixes both produces an average that describes neither.',
        'The practical version is a filter applied before the chart is even examined for entries: establish the trend on the timeframe above the one you trade, and take setups in that direction only. It removes trades rather than finding them, which is why it is unpopular and why it works.',
        'Counter-trend trading is not forbidden, but it should be a deliberate choice with smaller size and a tighter target, not something that happens because the hourly chart looked good and nobody checked the daily.',
      ],
    },
    mistakes: [
      'Reading trend on one timeframe and trading on another without checking both.',
      'Calling a trend over after a single counter-move.',
      'Assuming a strong trend must be due for a reversal.',
    ],
    related: ['market-structure', 'higher-high', 'lower-low', 'trendline', 'moving-average'],
    popular: true,
  },
  {
    slug: 'trendline',
    term: 'Trendline',
    category: 'technical',
    aliases: ['trend line'],
    short: 'A straight line drawn along successive highs or lows to visualize a trend’s slope.',
    explanation: [
      'An uptrend line connects rising lows and acts as dynamic support. A downtrend line connects falling highs and acts as dynamic resistance.',
      'Two points define a line; the third touch is what makes it worth anything. Until price has respected it more than twice, it is a guess with a ruler.',
      'Trendlines are subjective. Small changes in which wicks you connect produce meaningfully different lines, which is why they work better as context than as precise trigger levels.',
    ],
    whyItMatters:
      'A trendline break is a clean, visual way to define invalidation, especially for trades held through a sustained move.',
    example: {
      setup: 'Two trendlines drawn on one chart',
      steps: [
        { label: 'Line A: through the lows', value: '3 touches' },
        { label: 'Line B: slightly steeper', value: '2 touches' },
        { label: 'Price now', value: 'above A, below B' },
        { label: 'Verdict', value: 'depends who drew it' },
      ],
      body: [
        'Both lines are defensible and they disagree. This is the honest limitation of trendlines: unlike a horizontal level, which is a price anyone would read the same way, a diagonal depends on which points were chosen and how the chart is scaled. Two competent traders produce two different lines.',
        'That does not make them useless, but it does change how much weight they can carry. A trendline is a way of visualising the rate of a move, and a break of one says the rate has changed — not that the trend is over, which requires structure to confirm.',
        'The rules that reduce the ambiguity are simple. Three touches beats two. Connect extremes consistently — wicks to wicks or bodies to bodies, not a mixture. And draw the line once, before the trade, rather than redrawing it flatter each time price threatens to break it.',
        'That last habit is the one that does the damage. A line that gets adjusted whenever it is about to be broken is not defining invalidation; it is following price, and a stop built on it will follow price all the way down.',
      ],
    },
    mistakes: [
      'Redrawing the line whenever price breaks it, so it can never be wrong.',
      'Using a two-touch line as if it were established support.',
      'Placing stops exactly on the line, where probes are most likely.',
    ],
    related: ['trend', 'support', 'resistance', 'breakout', 'market-structure'],
  },
  {
    slug: 'candlestick',
    term: 'Candlestick',
    category: 'technical',
    aliases: ['candle', 'candles', 'ohlc'],
    short: 'A chart element showing the open, high, low and close for one period.',
    explanation: [
      'The body spans the open and close; the wicks show the extremes reached during the period. Color indicates whether the close was above or below the open.',
      'Wicks carry the interesting information. A long lower wick means price was pushed down and then bought back up — rejection of lower prices within that period.',
      'A candle summarizes a battle but hides its sequence. A doji tells you the period ended where it started, not the path it took to get there.',
    ],
    diagram: 'candlestick',
    whyItMatters:
      'Candles are the raw material of technical analysis. Every level, pattern and indicator is built from the same four numbers.',
    example: {
      setup: 'Four numbers, and the story they do not tell',
      steps: [
        { label: 'Open', value: '$25.10' },
        { label: 'High', value: '$26.80' },
        { label: 'Low', value: '$24.90' },
        { label: 'Close', value: '$25.20' },
      ],
      body: [
        'A long upper wick and a close near the open: price was bid up almost two dollars and gave all of it back. That is a genuine observation about the session — sellers appeared above $26 — and it is the whole of what the candle knows.',
        'What it does not record is the order. Price might have run to $26.80 in the first ten minutes and drifted down all day, or hovered flat and spiked near the close. Those are different sessions with different implications and they produce an identical candle.',
        'This is worth holding onto because everything else is built on these four numbers. Support levels, moving averages, RSI, ATR — all of them are transformations of open, high, low and close, so all of them inherit the same blind spot.',
        'Which argues for using candles as evidence rather than as signals. A long wick at a level you already cared about is useful confirmation; the same wick in the middle of nowhere is one session’s noise wearing a pattern’s name.',
      ],
    },
    mistakes: [
      'Reading single candles in isolation rather than in the context of structure.',
      'Trading a pattern before the candle has closed.',
      'Forgetting that candle shape changes entirely with the chosen timeframe.',
    ],
    related: ['doji', 'volume', 'timeframe', 'gap', 'support'],
  },
  {
    slug: 'doji',
    term: 'Doji',
    category: 'technical',
    aliases: ['doji candle'],
    short: 'A candle that opens and closes at nearly the same price, showing indecision.',
    explanation: [
      'A doji has a tiny body and, usually, visible wicks on both sides. Buyers and sellers fought to a draw over that period.',
      'Its meaning depends entirely on where it appears. A doji after an extended run suggests the move is losing conviction; one in the middle of a quiet range means very little.',
      'It is a signal to pay attention, not an instruction to trade. Confirmation from the following candles is what makes it actionable.',
    ],
    whyItMatters:
      'Recognizing indecision at an extreme can be an early warning to tighten a trailing stop rather than a reason to reverse a position.',
    example: {
      setup: 'A doji after a long advance, and a doji in the middle of a range',
      steps: [
        { label: 'After a 9-day advance', value: 'buyers and sellers balanced' },
        { label: 'Useful?', value: 'yes — tighten the trail' },
        { label: 'Inside a quiet range', value: 'also balanced' },
        { label: 'Useful?', value: 'no — every bar is a doji' },
      ],
      body: [
        'A doji closes at roughly where it opened, which means neither side finished the session in control. After a sustained one-way move that is a change worth noticing: the pressure that produced the advance did not produce another day of it.',
        'In a quiet range it means nothing at all, because indecision is the normal state there. The same candle carries information in one location and none in the other, and the location is doing all the work.',
        'Even in the useful case it is a warning rather than a signal. Trends print dojis and continue constantly. For a trader already long, the reasonable response is to tighten a trailing stop and stop adding — actions that cost little if the move resumes.',
        'Reversing on it is where people get hurt. A single candle is one session of information, and a counter-trend position taken on that alone is fighting an established move with the thinnest possible evidence.',
      ],
    },
    mistakes: [
      'Trading every doji as a reversal signal.',
      'Ignoring the surrounding context and trend.',
    ],
    related: ['candlestick', 'trend', 'consolidation', 'volume', 'trailing-stop'],
  },
  {
    slug: 'consolidation',
    term: 'Consolidation',
    category: 'technical',
    aliases: ['sideways', 'chop', 'basing'],
    short: 'A period where price moves sideways in a narrow range without clear direction.',
    explanation: [
      'Consolidation is the market pausing. Volatility contracts, ranges narrow, and neither side can push price out of the zone.',
      'These periods often precede expansion. Compressed ranges build up orders on both sides, and the eventual break tends to move quickly.',
      'They are also where trend-following strategies lose the most, generating repeated small losses as price oscillates through signal levels.',
    ],
    whyItMatters:
      'Recognizing consolidation tells you which strategy fits the conditions, and when to reduce size or stand aside entirely.',
    example: {
      setup: 'Eleven sessions inside a $1.60 band',
      steps: [
        { label: 'Band', value: '$40.20 – $41.80' },
        { label: 'Sessions inside it', value: '11' },
        { label: 'Average daily range', value: 'falling' },
        { label: 'Breakout attempts', value: '2, both failed' },
      ],
      body: [
        'This is the market doing nothing, and doing nothing is a condition rather than an absence of one. Trend rules applied here buy the top of the band and sell the bottom, losing a little on each oscillation while the instrument finishes where it started.',
        'Consolidation usually follows a strong move and represents positions changing hands rather than a new opinion forming. That is why it so often resolves in the original direction — but "often" is not "reliably", and the two failed attempts above are the reason to wait for the resolution rather than anticipate it.',
        'The contracting range is the part worth watching. Volatility compresses during consolidation and expands when it ends, which means the move out is typically larger and faster than anything inside the band.',
        'The practical decision is usually to stand aside or trade smaller. There is a range playbook that works here — fade the edges with stops just beyond them — but running trend rules through a consolidation is a slow, reliable way to give back a good trade.',
      ],
    },
    mistakes: [
      'Trading breakout strategies inside a range and taking repeated false signals.',
      'Mistaking low volatility for low risk when expansion is building.',
    ],
    related: ['range', 'breakout', 'volatility', 'atr', 'false-breakout'],
  },
  {
    slug: 'retest',
    term: 'Retest',
    category: 'technical',
    aliases: ['re-test', 'backtest of a level'],
    short: 'When price returns to a broken level to confirm it now holds from the other side.',
    explanation: [
      'After a level breaks, price often comes back to it. Broken resistance is tested as support; broken support is tested as resistance.',
      'A successful retest is confirmation that the break was genuine and that participants now treat the level differently.',
      'It also offers a better entry than the breakout itself. The stop can sit just beyond the level, which is usually much closer than a stop placed after chasing.',
    ],
    whyItMatters:
      'Waiting for a retest trades some missed opportunities for tighter stops and clearer invalidation, which is a favorable exchange for most traders.',
    example: {
      setup: 'Buying the break at $29.65 or the retest at $29.50',
      steps: [
        { label: 'Breakout entry', value: '$29.65, stop $29.10' },
        { label: 'Risk per share', value: '$0.55' },
        { label: 'Retest entry', value: '$29.50, stop $29.25' },
        { label: 'Risk per share', value: '$0.25' },
      ],
      body: [
        'The retest entry is fifteen cents better and, more importantly, comes with a stop half the distance away — because once the old resistance has held as support, the level that invalidates the idea is much closer to the entry. Same risk budget, more than twice the position.',
        'The logic behind the retest is that a level which flips roles has been tested by both sides. Buyers who missed the break get their entry, sellers who defended the level have given up, and the trade now has evidence rather than an assumption.',
        'The cost is the trades that never come back. Strong breakouts frequently run without offering a retest, and a trader who requires one will miss exactly the moves that were most worth taking. That is a genuine expense, not a technicality.',
        'A workable compromise is to take part of the position on the break and add on the retest if it appears. It gives up some of the efficiency in exchange for not missing the runs, which for most traders is the better trade.',
      ],
    },
    mistakes: [
      'Waiting for a retest that never comes on the strongest moves.',
      'Treating any return to the level as a valid retest without watching how price behaves there.',
    ],
    related: ['breakout', 'support', 'resistance', 'false-breakout', 'entry'],
  },
  {
    slug: 'gap',
    term: 'Gap',
    category: 'technical',
    aliases: ['gap up', 'gap down', 'price gap'],
    short: 'A jump between one period’s close and the next period’s open with no trading in between.',
    explanation: [
      'Gaps form when significant information arrives while the market is closed. The next session simply opens at a new price.',
      'They are the clearest demonstration that a stop loss is a trigger, not a guarantee. A stop inside the gap is filled at the open, potentially far from the stop price.',
      'Gaps are common around earnings, economic releases and weekend news, and are far rarer in markets that trade continuously.',
    ],
    whyItMatters:
      'Gap risk is the main reason held-overnight positions deserve smaller size than intraday ones. Your calculated maximum risk assumes continuous prices, and a gap breaks that assumption.',
    example: {
      setup: 'The assumption every stop calculation makes',
      steps: [
        { label: 'What sizing assumes', value: 'prices are continuous' },
        { label: 'Previous close', value: '$95.40' },
        { label: 'Next open', value: '$88.10' },
        { label: 'Prices that traded between', value: 'none' },
      ],
      body: [
        'A stop works by catching price on its way past a level. A gap means price never went past the level — it was in one place at the close and another at the open, and nothing traded in between for any order to act on.',
        'That is a break in the assumption underneath every position size calculation, not a bad fill. The maximum loss was computed as size times stop distance, and stop distance turned out not to be the distance that applied.',
        'Gaps are also not evenly distributed. They cluster around earnings, scheduled economic releases, weekends, and anything that develops while a market is shut — which is knowable in advance, and which is why checking the earnings calendar before holding overnight is a risk control rather than research.',
        'The only instrument that still works across a gap is position size. Intraday, where a stop can genuinely be relied on, a larger position is defensible; held overnight, the honest question is what a 10% gap would do, and the answer has to be survivable.',
      ],
    },
    mistakes: [
      'Holding a full-size position through a scheduled earnings report with a tight stop.',
      'Assuming every gap fills, and sizing a trade on that assumption.',
    ],
    related: ['slippage', 'stop-loss', 'earnings-report', 'circuit-breaker', 'extended-hours'],
  },
  {
    slug: 'volume',
    term: 'Volume',
    category: 'technical',
    aliases: ['traded volume', 'turnover'],
    short: 'The number of shares, contracts or units traded during a period.',
    explanation: [
      'Volume measures participation. A move on heavy volume involved many participants; the same move on thin volume involved few and is easier to reverse.',
      'It is most useful as confirmation. A breakout on strong volume carries far more weight than an identical break on a quiet afternoon.',
      'Volume has strong time-of-day and seasonal patterns. Comparing a lunchtime hour to the opening hour without adjusting for that is misleading.',
    ],
    whyItMatters:
      'Volume is a direct read on available liquidity, which determines how well your orders will fill and whether your stop can be executed near its price.',
    example: {
      setup: 'The same breakout on 3× volume and on half volume',
      steps: [
        { label: 'Average daily volume', value: '1.2m shares' },
        { label: 'Breakout on 3.6m', value: 'real participation' },
        { label: 'Breakout on 600k', value: 'a probe' },
        { label: 'Stop fill quality', value: 'follows the same ranking' },
      ],
      body: [
        'Volume is the number of shares that changed hands, so it measures how many participants were involved rather than how far price moved. A break carried by three times the usual volume had people behind it; the same break on half the usual volume was a handful of orders moving price through thin air.',
        'The second reading matters just as much and gets less attention. Volume is available liquidity, and available liquidity is what your stop needs on the way out. A position taken in a low-volume session has a stop that will fill into a thin book.',
        'The strongest confirmation is when volume rises on moves in the direction of the trend and falls on the pullbacks against it. That is participation supporting the move rather than drifting through it, and it is visible without any indicator.',
        'Two cautions: volume has predictable daily shape — heavy at the open and close, thin in the middle — so it must be compared against the same period, and a single heavy session can be a fund rebalancing rather than an opinion about the stock.',
      ],
    },
    mistakes: [
      'Comparing raw volume across sessions with very different baselines.',
      'Reading high volume as bullish. Every trade has a buyer and a seller.',
    ],
    related: ['liquidity', 'breakout', 'vwap', 'volume-profile', 'volatility'],
    popular: true,
  },
  {
    slug: 'timeframe',
    term: 'Timeframe',
    category: 'technical',
    aliases: ['time frame', 'chart interval'],
    short: 'The period each candle on a chart represents, from one minute to one month.',
    explanation: [
      'Timeframe determines what you can see. A five-minute chart shows noise the daily chart smooths away; the daily chart shows structure the five-minute chart cannot contain.',
      'Most approaches use more than one: a higher timeframe for context and direction, a lower one for entry timing and stop placement.',
      'Timeframe also sets your stop distance, and therefore your position size. The same idea on a 5-minute chart and a daily chart are completely different trades.',
    ],
    whyItMatters:
      'Choosing a timeframe is choosing your typical stop distance, holding period and trade frequency all at once. Switching timeframes mid-trade is how a small loss becomes a large one.',
    example: {
      setup: 'A 5-minute trade that becomes a long-term investment',
      steps: [
        { label: 'Entered on', value: 'the 5-minute chart' },
        { label: 'Planned stop', value: '$0.35 away' },
        { label: 'Stop approached, chart switched to', value: 'the daily' },
        { label: 'Loss at the eventual exit', value: '$4.10' },
      ],
      body: [
        'Nothing about the analysis was wrong at the start. The trade was taken on a five-minute signal with a thirty-five cent stop, sized correctly for exactly that. What changed was the timeframe being consulted, and it changed at the precise moment the trade was about to be closed for a small loss.',
        'On the daily chart the position looks fine — barely a wobble — and that is not an insight, it is a different trade. The daily version would have had a stop several dollars away and a position a tenth the size. Adopting its stop while keeping the five-minute position size is how a planned $350 loss becomes $4,100.',
        'This is one of the most common ways an account is damaged, and it never feels like a mistake while it is happening. It feels like taking a longer view.',
        'The rule that prevents it is narrow: the timeframe that produced the entry is the timeframe that produces the exit. Consult higher timeframes for context before the trade, never for reassurance during it.',
      ],
    },
    mistakes: [
      'Entering on a low timeframe and then justifying the losing position with a higher-timeframe chart.',
      'Using a stop distance from one timeframe with a target from another.',
      'Watching a timeframe far below the one the plan was built on.',
    ],
    related: ['trend', 'candlestick', 'stop-distance', 'market-structure', 'trading-plan'],
  },
];
