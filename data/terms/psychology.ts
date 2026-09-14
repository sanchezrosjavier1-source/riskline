import type { Term } from '@/types/dictionary';

export const psychologyTerms: Term[] = [
  {
    slug: 'trading-plan',
    term: 'Trading Plan',
    category: 'psychology',
    aliases: ['plan', 'trading rules', 'system'],
    short: 'A written set of rules defining what you trade, how you size it, and when you exit.',
    explanation: [
      'A trading plan converts decisions into rules made in advance, when you are calm and have no money on the line.',
      'A usable plan is specific: which setups qualify, what risk per trade, where the stop goes, what invalidates the idea, and what daily or weekly loss ends the session.',
      'Its real function is not prediction. It is removing improvisation from the moments when improvisation is most expensive.',
    ],
    whyItMatters:
      'Nearly every catastrophic trading loss is a departure from a plan rather than a failure of one. The plan is what makes the departure visible.',
    example: {
      setup: 'The six lines a plan has to answer before the market opens',
      steps: [
        { label: 'What I trade', value: 'named instruments only' },
        { label: 'What a setup is', value: 'conditions, written down' },
        { label: 'Risk per trade', value: 'a fixed percentage' },
        { label: 'When I stop for the day', value: 'a loss limit, in advance' },
      ],
      body: [
        'A trading plan is not a forecast and it contains no opinions about where anything is going. It is a set of conditions decided while nothing is at stake, so that the version of you watching a position move is executing rather than deciding.',
        'Its real function is detection. A plan that says "1% risk, two losses and I am done for the day" makes a third trade visible as a departure the moment it is taken. Without it, the third trade is just a trade, the fifth is just a trade, and there is no point at which anything identifiable goes wrong.',
        'That is why almost every account-ending day is a plan being abandoned rather than a plan being wrong. The rules were not defeated by the market; they were quietly suspended, one reasonable-seeming exception at a time.',
        'The test of a plan is whether it could be handed to someone else to follow. If it needs you present to interpret it, it is a set of intentions.',
      ],
    },
    mistakes: [
      'Writing a plan so vague that no action could ever violate it.',
      'Changing the plan while a position is open.',
      'Having entry rules but no rules for sizing or for stopping after a bad run.',
    ],
    related: ['risk-management', 'trading-journal', 'risk-per-trade', 'overtrading', 'revenge-trading'],
    popular: true,
  },
  {
    slug: 'trading-journal',
    term: 'Trading Journal',
    category: 'psychology',
    aliases: ['journal', 'trade log'],
    short: 'A record of every trade, including the reasoning behind it and the result.',
    explanation: [
      'A journal captures what a broker statement cannot: why you took the trade, what you expected, how you felt, and whether you followed your rules.',
      'The useful fields are the ones that enable analysis — setup type, planned entry versus actual fill, R-multiple, and whether the plan was followed.',
      'Over enough trades a journal reveals patterns that are invisible in the moment: which setups actually pay, and which times of day quietly cost money.',
    ],
    whyItMatters:
      'Without a journal, improvement relies on memory — and memory systematically overweights recent and emotionally intense trades.',
    example: {
      setup: 'What forty logged trades revealed that memory had not',
      steps: [
        { label: 'Remembered win rate', value: '"about half"' },
        { label: 'Actual win rate', value: '43%' },
        { label: 'Morning trades', value: '+11R' },
        { label: 'Afternoon trades', value: '−7R' },
      ],
      body: [
        'The trader knew the strategy worked and could not say why some weeks were flat. Forty rows of data answered it in one sort: the edge lived entirely in the first two hours, and the afternoon trades — taken out of boredom, on thinner setups — were giving most of it back.',
        'Nothing about that is visible from memory. Memory keeps the trade that hurt and the trade that felt brilliant, not the quiet cluster of small afternoon losses that never registered as an event.',
        'Which is why the fields that matter are the boring ones. Entry, stop, size, exit, time of day, and the reason the trade was taken — recorded before the outcome is known, because a reason written afterwards is a justification.',
        'Forty trades is not a lot and it was already enough to change what this trader does on a Tuesday afternoon. The journal is not a diary; it is the only instrument that tells you which part of your method is actually paying.',
      ],
    },
    mistakes: [
      'Recording only outcomes, which cannot separate a good process from a lucky result.',
      'Journaling only losses, producing a permanently distorted picture.',
      'Collecting data for months without ever reviewing it.',
    ],
    related: ['trading-plan', 'r-multiple', 'expectancy', 'win-rate', 'recency-bias'],
  },
  {
    slug: 'fomo',
    term: 'FOMO',
    category: 'psychology',
    aliases: ['fear of missing out', 'chasing'],
    short: 'Entering a trade because the move is already happening, not because the setup appeared.',
    explanation: [
      'FOMO trades are usually entered late, after a large move, when the sensible entry has passed and the risk has expanded.',
      'The structural problem is mechanical, not emotional: entering far from the invalidation level forces either a wide stop or an oversized position.',
      'The trade also arrives without a plan, since the decision was made by the price move rather than by a process.',
    ],
    whyItMatters:
      'FOMO reliably produces the worst combination available — worst entry price, widest stop, and no predefined exit.',
    example: {
      setup: 'Buying the fourth green candle instead of the first',
      steps: [
        { label: 'Level where the idea began', value: '$31.00' },
        { label: 'Price when the urge arrives', value: '$34.60' },
        { label: 'Stop still belongs below', value: '$30.80' },
        { label: 'Risk per share', value: '$3.80, not $0.20' },
      ],
      body: [
        'The invalidation point has not moved. What the idea depended on is still below $31, so a correct stop is still down there — which means entering at $34.60 is taking nineteen times the risk per share of the entry that was available twenty minutes earlier, for a smaller remaining move.',
        'Almost nobody does that arithmetic in the moment, which is precisely the problem. The stop gets placed somewhere close instead, under a recent candle, where it has no relationship to the thesis and a routine pullback removes it.',
        'So the trade ends up with the worst of everything: the poorest entry price of the move, a stop chosen for comfort rather than logic, and no target, because the plan was formed at $31 and the target was reached on the way up.',
        'The countermeasure is mechanical rather than emotional. If the entry the plan specified has gone, the trade has gone. There is no version of chasing that is the same trade at a worse price — it is a different trade, with different numbers, being taken on the old conviction.',
      ],
    },
    mistakes: [
      'Entering after an extended move without adjusting size for the wider stop.',
      'Taking a setup that is not in your plan because it is moving.',
      'Adding to a chased position to improve the average price.',
    ],
    related: ['trading-plan', 'overtrading', 'pullback', 'entry', 'revenge-trading'],
    popular: true,
  },
  {
    slug: 'revenge-trading',
    term: 'Revenge Trading',
    category: 'psychology',
    aliases: ['revenge trade', 'tilt'],
    short: 'Trading to recover a loss rather than because a valid opportunity appeared.',
    explanation: [
      'After a painful loss the impulse is to make it back immediately. The next trade is chosen for its speed of recovery rather than its quality.',
      'It almost always comes with increased size, because normal size would take too long to undo the damage. That is exactly when the math turns hostile.',
      'A single revenge sequence can produce a larger loss than weeks of ordinary losing trades combined.',
    ],
    whyItMatters:
      'This is the mechanism behind most account-ending days. The loss itself is rarely fatal; the reaction to it is.',
    example: {
      setup: 'One 1% loss becomes a 19% day',
      steps: [
        { label: 'Trade 1', value: '−1% (planned)' },
        { label: 'Trade 2, double size', value: '−2%' },
        { label: 'Trade 3, quadruple size', value: '−4%' },
        { label: 'Trade 4, "make it all back"', value: '−12%' },
      ],
      body: [
        'The first loss was the system working. It was sized in advance, it cost 1%, and on its own it would have been forgotten by Thursday.',
        'What followed was not trading. Each subsequent position was larger than the last, taken sooner, on a setup that would not have qualified an hour earlier — because the purpose had quietly changed from finding good trades to getting back to flat. That is a different objective, and it is one the market does not cooperate with.',
        'Notice the escalation is geometric. The size has to keep doubling, because each attempt now has to recover everything before it, which is why these days end at 19% rather than 4%. By the fourth trade the account is being risked to erase a loss that was designed to be survivable.',
        'The only reliable defence is a limit set while calm and enforced without judgement: two losses, or a fixed percentage, and the platform is closed. It has to be a rule rather than an intention, because the state of mind that needs it is the one least able to apply it.',
      ],
    },
    mistakes: [
      'Increasing position size immediately after a loss.',
      'Trading a setup outside the plan because it is available right now.',
      'Having no daily loss limit that forces a stop.',
    ],
    related: ['trading-plan', 'risk-per-trade', 'drawdown', 'overtrading', 'loss-aversion'],
  },
  {
    slug: 'overtrading',
    term: 'Overtrading',
    category: 'psychology',
    aliases: ['too many trades', 'churning'],
    short: 'Taking more positions than your strategy actually justifies.',
    explanation: [
      'Overtrading usually comes from boredom, from a need to feel productive, or from loosening criteria after a quiet stretch.',
      'Costs scale directly with frequency. Every additional trade pays the spread and commissions regardless of outcome.',
      'It also degrades quality. Marginal setups taken to stay busy have lower expectancy than the ones the strategy was built on.',
    ],
    whyItMatters:
      'A positive-expectancy strategy can be turned negative purely by taking too many low-quality instances of it. Frequency multiplies costs while diluting edge.',
    example: {
      setup: 'The same edge taken 8 times a day and 40 times a day',
      steps: [
        { label: 'Edge per A-grade setup', value: '+0.25R' },
        { label: '8 selective trades', value: '+2.0R' },
        { label: 'Diluted edge across 40', value: '+0.04R' },
        { label: '40 trades minus costs', value: 'negative' },
      ],
      body: [
        'There were never forty good setups. There were eight, and thirty-two things that resembled them enough to justify clicking. Averaged together the edge per trade collapses, while the cost per trade — spread, commission, slippage — stays exactly the same and is now paid five times as often.',
        'That is the whole mechanism, and it is arithmetic rather than psychology: frequency multiplies the fixed costs and divides the edge. A strategy can be genuinely profitable and still lose money purely by being traded too much.',
        'The reason it happens is that inactivity does not feel like working. Sitting through a morning with no qualifying setup feels like failing to do the job, so standards drift downward until something qualifies — and the drift is invisible, because each individual trade can be argued for.',
        'The fix is a number rather than a resolution: a hard cap on trades per day, or a written checklist a setup has to pass before it is eligible. Both make the thirty-two visible as what they are.',
      ],
    },
    mistakes: [
      'Loosening entry criteria after a period without signals.',
      'Measuring productivity by number of trades rather than by adherence to the plan.',
      'Watching a lower timeframe than the strategy is built on.',
    ],
    related: ['trading-plan', 'spread', 'expectancy', 'fomo', 'analysis-paralysis'],
  },
  {
    slug: 'loss-aversion',
    term: 'Loss Aversion',
    category: 'psychology',
    aliases: ['fear of loss'],
    short: 'The tendency to feel losses about twice as strongly as equivalent gains.',
    explanation: [
      'Loss aversion is a well-documented asymmetry: losing $100 hurts roughly twice as much as gaining $100 feels good.',
      'In trading it produces a specific and damaging pattern — cutting winners early to lock in the good feeling, while holding losers to avoid making the loss real.',
      'That behavior directly inverts risk/reward. The average win shrinks and the average loss grows, which can turn a sound strategy negative.',
    ],
    whyItMatters:
      'Loss aversion attacks expectancy from both directions at once. It is the reason predefined exits exist.',
    example: {
      setup: 'Taking +0.4R quickly and letting −1R become −2.6R',
      steps: [
        { label: 'Planned win', value: '+2.0R' },
        { label: 'Actual average win', value: '+0.4R' },
        { label: 'Planned loss', value: '−1.0R' },
        { label: 'Actual average loss', value: '−2.6R' },
      ],
      body: [
        'Both distortions come from the same instinct and they pull in opposite directions. An open profit feels fragile, so it is banked early to make it real. An open loss feels provisional, so it is held, because closing it converts something deniable into something recorded.',
        'The result is a strategy designed around 1:2 being traded at roughly 1:0.15. No rule was formally broken — the stop was moved rather than ignored, the target was taken rather than abandoned — and the expectancy is destroyed from both ends simultaneously.',
        'It is worth being clear that this is not weakness or a character flaw. Losses register roughly twice as strongly as equivalent gains for almost everyone; the feeling is standard equipment. What differs between traders is whether the exits are decided by that feeling or before it arrives.',
        'Which is the entire argument for resting orders. A stop and a target placed at entry cannot be talked out of anything, and they were set by the version of you that had nothing at stake.',
      ],
    },
    mistakes: [
      'Moving a stop further away to avoid realizing a loss.',
      'Closing a winner at the first sign of a pullback.',
      'Treating an unrealized loss as somehow less real than a realized one.',
    ],
    related: ['stop-loss', 'take-profit', 'expectancy', 'risk-reward-ratio', 'confirmation-bias'],
  },
  {
    slug: 'confirmation-bias',
    term: 'Confirmation Bias',
    category: 'psychology',
    aliases: ['seeking confirmation'],
    short: 'Seeking out information that supports a position while discounting evidence against it.',
    explanation: [
      'Once a position exists, the mind starts working for it. Supporting evidence feels compelling and contradictory evidence feels like noise.',
      'It shows up as switching timeframes until one looks bullish, adding indicators until one agrees, and dismissing structure breaks as anomalies.',
      'The defense is mechanical rather than psychological: define invalidation before entering, and let the level decide rather than your interpretation.',
    ],
    whyItMatters:
      'Confirmation bias is what turns a small planned loss into a large unplanned one, by supplying reasons to ignore the exit you already set.',
    example: {
      setup: 'A long position, and what gets read while it falls',
      steps: [
        { label: 'Bullish articles opened', value: '7' },
        { label: 'Bearish articles opened', value: '0' },
        { label: 'Timeframes checked', value: 'until one looked up' },
        { label: 'Stop', value: 'moved down twice' },
      ],
      body: [
        'The research is real and it is entirely one-directional. Every source consulted is chosen, unconsciously, for its likely conclusion, and each one that agrees makes the position feel better supported than it did an hour ago — while the position itself gets worse.',
        'The timeframe search is the clearest tell. A trader who entered on the hourly chart and is now examining the weekly is not gathering information; they are looking for a chart on which the trade is still working, and on a long enough horizon there is always one.',
        'What makes this expensive rather than merely irrational is that it operates on the exit. The stop was correct when it was set, and every piece of confirming evidence supplies a reason to move it — so a planned 1R loss becomes 3R by a series of individually defensible decisions.',
        'The practical counter is to write the invalidation down at entry, in terms of price rather than narrative: "this idea is wrong below $47." A price cannot be reinterpreted by a bullish article.',
      ],
    },
    mistakes: [
      'Changing the analysis timeframe after entry to justify holding.',
      'Adding indicators until one supports the position.',
      'Dismissing a structure break as a false signal without predefined criteria.',
    ],
    related: ['market-structure', 'trading-plan', 'stop-loss', 'timeframe', 'recency-bias'],
  },
  {
    slug: 'recency-bias',
    term: 'Recency Bias',
    category: 'psychology',
    aliases: ['recent bias'],
    short: 'Overweighting recent outcomes when judging what is likely to happen next.',
    explanation: [
      'A few recent wins make a strategy feel better than the data supports; a few recent losses make a sound strategy feel broken.',
      'It drives the most damaging cycle in trading: sizing up after a good run and abandoning the approach during an ordinary drawdown.',
      'Normal variance is far larger than intuition suggests. Runs of five or six consecutive losses are entirely expected at typical win rates.',
    ],
    whyItMatters:
      'Recency bias causes traders to make their largest bets right before mean reversion and to quit right before recovery.',
    example: {
      setup: 'Sizing up after six wins, quitting after six losses',
      steps: [
        { label: 'After a 6-win streak', value: 'risk raised to 3%' },
        { label: 'What the long-run edge was', value: 'unchanged' },
        { label: 'After a 6-loss streak', value: 'strategy abandoned' },
        { label: 'What the long-run edge was', value: 'unchanged' },
      ],
      body: [
        'Six in a row in either direction is entirely ordinary for a strategy that wins about half the time — over a few hundred trades it will happen repeatedly. It carries no information about the method, and it feels like it carries all of it.',
        'So the largest position gets taken at the point where nothing has been learned except that variance clustered favourably, and the method gets discarded at the point where variance clustered the other way. Both decisions are made on the same non-evidence, and they are timed to do the maximum damage.',
        'The asymmetry is what makes it costly. Sizing up before a reversion means the losses that follow are taken at triple weight; quitting before a recovery means the winning stretch that follows is not participated in at all.',
        'The defence is to fix the sample size in advance. Judge a strategy on a hundred trades and size on its long-run expectancy, not on the last six — and hold both numbers in writing, where a good streak cannot quietly revise them.',
      ],
    },
    mistakes: [
      'Increasing risk after a winning streak.',
      'Abandoning a strategy after a normal-length losing run.',
      'Judging performance over ten trades rather than a hundred.',
    ],
    related: ['expectancy', 'win-rate', 'drawdown', 'trading-journal', 'risk-per-trade'],
  },
  {
    slug: 'analysis-paralysis',
    term: 'Analysis Paralysis',
    category: 'psychology',
    aliases: ['overanalysis', 'indecision'],
    short: 'Being unable to act because you are still looking for more confirmation.',
    explanation: [
      'Adding indicators and timeframes past a certain point does not increase clarity. It increases the number of things that can disagree.',
      'The underlying wish is for certainty, which markets never provide. Every trade is a probability, and waiting for a sure thing means waiting forever.',
      'The practical remedy is a short, fixed checklist. If the criteria are met the trade is taken at the planned size; if not, it is skipped.',
    ],
    whyItMatters:
      'Correct position sizing is what makes acting under uncertainty reasonable. When no single trade can hurt you badly, you do not need certainty to act.',
    example: {
      setup: 'Six indicators, one decision, and the move happens anyway',
      steps: [
        { label: 'Indicators agreeing', value: '4' },
        { label: 'Indicators disagreeing', value: '2' },
        { label: 'Time spent resolving it', value: '35 minutes' },
        { label: 'Price at the end of it', value: 'past the entry' },
      ],
      body: [
        'Adding a sixth indicator did not produce clarity, and a seventh would not either. Past a small number of inputs, more information mostly generates more contradictions to adjudicate, and the confidence that was being searched for never arrives — because it was never available.',
        'The deeper problem is that certainty is the wrong thing to look for. Every trade is a probabilistic bet, and a setup that is right 55% of the time feels exactly as uncertain as one that is right 45% of the time. No amount of study converts either into a sure thing.',
        'This is where position sizing does psychological work rather than mathematical work. If no single trade can take more than 1% of the account, acting on incomplete information is obviously reasonable — the cost of being wrong is already known and already survivable.',
        'It is the trader risking 10% who genuinely cannot afford to act without certainty, and who therefore freezes. The paralysis is usually a sizing problem wearing a research problem’s clothes.',
      ],
    },
    mistakes: [
      'Adding indicators in search of confidence rather than information.',
      'Missing planned entries while seeking more confirmation, then chasing the move.',
      'Treating uncertainty as a problem to be solved rather than a condition to be sized for.',
    ],
    related: ['trading-plan', 'position-size', 'fomo', 'overtrading', 'risk-per-trade'],
  },
];
