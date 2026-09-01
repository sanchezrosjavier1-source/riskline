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
    mistakes: [
      'Adding indicators in search of confidence rather than information.',
      'Missing planned entries while seeking more confirmation, then chasing the move.',
      'Treating uncertainty as a problem to be solved rather than a condition to be sized for.',
    ],
    related: ['trading-plan', 'position-size', 'fomo', 'overtrading', 'risk-per-trade'],
  },
];
