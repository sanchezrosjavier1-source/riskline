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
    mistakes: [
      'Entering on a low timeframe and then justifying the losing position with a higher-timeframe chart.',
      'Using a stop distance from one timeframe with a target from another.',
      'Watching a timeframe far below the one the plan was built on.',
    ],
    related: ['trend', 'candlestick', 'stop-distance', 'market-structure', 'trading-plan'],
  },
];
