import type { Term } from '@/types/dictionary';

export const riskTerms: Term[] = [
  {
    slug: 'position-size',
    term: 'Position Size',
    category: 'risk',
    aliases: ['position sizing', 'how many shares', 'trade size', 'lot size'],
    short: 'The amount of an asset you buy or sell in a single trade.',
    explanation: [
      'Position size is the answer to "how many?" — shares, contracts, coins or lots. It is the one variable in a trade you control completely.',
      'The right size is not a preference. It falls out of two numbers you have already decided: how much money you are willing to lose on this trade, and how far away your stop sits. Divide the first by the second and you have your size.',
      'This means position size is a consequence of your stop, not an independent choice. Move the stop further away and the correct size shrinks. Bring it closer and the size grows — while the dollar risk stays identical.',
    ],
    formula: {
      label: 'Position Size',
      expression: 'Maximum Risk ÷ Risk Per Share',
      legend: [
        { symbol: 'Maximum Risk', meaning: 'Account Size × Risk Per Trade %' },
        { symbol: 'Risk Per Share', meaning: 'The distance between your entry and your stop loss' },
      ],
    },
    widget: 'position-size',
    diagram: 'stop-loss',
    example: {
      setup: 'A $25,000 account risking 1% on a stock at $48.50 with a stop at $46.80',
      steps: [
        { label: 'Risk budget', value: '$250.00' },
        { label: 'Risk per share', value: '$1.70' },
        { label: 'Position size', value: '147 shares' },
        { label: 'Capital tied up', value: '$7,129.50' },
      ],
      body: [
        'Two divisions and it is done. One percent of $25,000 is $250. Entry minus stop is $1.70 a share. $250 ÷ $1.70 is 147 shares, rounded down — always down, because rounding up takes you over the risk you set.',
        'The last line is the one that surprises people. The position costs $7,129, which is 28% of the account, while risking $250, which is 1%. Position size and risk are different numbers and they are not close to each other. Confusing the two is why traders describe a trade as "a quarter of my account" when what they mean is "a one percent risk".',
        'Now move the stop to $45.00 and nothing else. Risk per share becomes $3.50, the size falls to 71 shares, and the capital committed drops to $3,443. The wider stop did not make the trade riskier — it made it smaller, which is exactly what should happen. The risk stayed at $250 because $250 was the decision, and everything else was arithmetic.',
      ],
    },
    whyItMatters:
      'Position size is the single largest determinant of whether a losing streak is an inconvenience or the end of the account. Two traders can take exactly the same trades and end up in completely different places purely because of size.',
    mistakes: [
      'Choosing a round number of shares first and discovering the risk afterward.',
      'Using the same size on every trade regardless of how wide the stop is.',
      'Sizing up after losses to "make it back", which is when the math turns hostile fastest.',
      'Ignoring whether the account can actually fund the resulting position value.',
    ],
    related: ['risk-per-trade', 'stop-loss', 'risk-reward-ratio', 'drawdown', 'notional-value'],
    tools: [
      { label: 'Calculate your position size', href: '/tools/position-size' },
      { label: 'Full Risk Calculator', href: '/calculator' },
    ],
    popular: true,
  },
  {
    slug: 'risk-per-trade',
    term: 'Risk Per Trade',
    category: 'risk',
    aliases: ['risk percentage', 'r', 'one r', '1% rule'],
    short: 'The fixed share of your account you are willing to lose on any single trade.',
    explanation: [
      'Risk per trade is usually expressed as a percentage of account equity — commonly 0.5% to 2%. Multiply it by your account size and you get a dollar figure: your risk budget for this trade.',
      'Keeping it constant is what makes results comparable. Every trade becomes one unit of risk, so a run of outcomes can be read as a sequence rather than a set of unrelated dollar amounts.',
      'Because the percentage applies to current equity, the dollar risk shrinks automatically during a drawdown and grows during a winning run. The rule defends itself.',
    ],
    formula: {
      label: 'Maximum Risk',
      expression: 'Account Size × (Risk Per Trade % ÷ 100)',
      legend: [
        { symbol: 'Account Size', meaning: 'Your current account equity' },
        { symbol: 'Risk Per Trade %', meaning: 'The fixed percentage you accept losing, e.g. 1' },
      ],
    },
    widget: 'position-size',
    example: {
      setup: 'The same ten consecutive losses, taken at 1% and at 10%',
      steps: [
        { label: 'At 1%: account remaining', value: '90.4%' },
        { label: 'Gain needed to recover', value: '+10.6%' },
        { label: 'At 10%: account remaining', value: '34.9%' },
        { label: 'Gain needed to recover', value: '+187%' },
      ],
      body: [
        'Ten losses in a row is not a catastrophe or a sign of a broken strategy. A method that wins 45% of the time throws a ten-loss streak roughly once every few hundred trades. It is a Tuesday that arrives eventually.',
        'At 1% the account finishes the streak at 90.4% and needs 10.6% to get whole. That is a bad month. At 10% it finishes at 34.9% and needs 187% — the account must nearly triple, on a strategy that just lost ten straight, with a third of the capital left to do it with.',
        'The two traders took identical trades. Every entry, every exit, every decision the same. The only difference was a number typed into a box before any of them happened, and it decided whether the streak was survivable.',
        'This is also why the percentage must be applied to current equity rather than the original deposit. Risking 1% of the starting balance after a 30% drawdown is really risking 1.4% of what is left, which accelerates exactly when it should be slowing down.',
      ],
    },
    whyItMatters:
      'At 1% per trade, ten straight losses cost about 10% of the account — recoverable. At 10% per trade, the same streak takes roughly 65% and requires nearly tripling what is left to get back to even.',
    mistakes: [
      'Raising risk on trades that feel especially good. Conviction is not an edge multiplier.',
      'Applying the percentage to the original deposit rather than to current equity.',
      'Counting each position separately while holding five correlated trades that all lose together.',
    ],
    related: ['position-size', 'risk-management', 'portfolio-heat', 'drawdown', 'risk-of-ruin'],
    tools: [{ label: 'See what your risk % actually costs', href: '/calculator' }],
    popular: true,
  },
  {
    slug: 'risk-reward-ratio',
    term: 'Risk/Reward Ratio',
    category: 'risk',
    aliases: ['rr', 'r:r', 'r/r', 'reward to risk', 'risk to reward'],
    short: 'How much you stand to gain compared with how much you stand to lose on a trade.',
    explanation: [
      'The ratio compares the distance from entry to target against the distance from entry to stop. Risk $2 to make $6 and the ratio is 1:3.',
      'It is a property of the trade’s geometry alone. Account size and position size do not change it — only where you place the entry, the stop and the target.',
      'Paired with your win rate, it tells you whether a strategy makes money. At 1:3 you only need to be right about 25% of the time to break even before costs. At 1:1 you need better than 50%.',
    ],
    formula: {
      label: 'Risk/Reward Ratio',
      expression: 'Reward Per Share ÷ Risk Per Share',
      legend: [
        { symbol: 'Reward Per Share', meaning: 'Distance from entry to take profit' },
        { symbol: 'Risk Per Share', meaning: 'Distance from entry to stop loss' },
        { symbol: 'Break-even Win Rate', meaning: '1 ÷ (1 + Ratio) × 100' },
      ],
    },
    widget: 'risk-reward',
    diagram: 'risk-reward',
    example: {
      setup: 'A 1:2 strategy that wins 40% of the time, over 100 trades',
      steps: [
        { label: '40 wins at +2R', value: '+80R' },
        { label: '60 losses at −1R', value: '−60R' },
        { label: 'Net', value: '+20R' },
        { label: 'Break-even win rate for 1:2', value: '33.3%' },
      ],
      body: [
        'Losing six trades out of every ten and still finishing ahead is not a trick. It is what a 1:2 ratio buys: each win covers two losses, so the strategy only needs to be right a third of the time to stand still, and anything above that is profit.',
        'This is the calculation that settles arguments about entries. A trader agonising over a setup that wins 55% of the time at 1:1 is doing worse than one taking a sloppier 40% setup at 1:2 — the second makes 20R over a hundred trades and the first makes 10R.',
        'The honest version has costs in it. Spread and commission come off every trade, and they come off the small side hardest: a 1:2 that costs 0.1R a round turn is really 1.9 up against 1.1 down, and the break-even win rate creeps from 33.3% to about 36.7%. That is still a comfortable margin, but it is not free, and on a 1:1 strategy the same costs are the difference between profitable and not.',
      ],
    },
    whyItMatters:
      'It converts a vague sense that a trade "looks good" into a number you can test against your actual win rate. Most losing strategies fail here, not at the entry.',
    mistakes: [
      'Moving the target further out to manufacture a better ratio on paper.',
      'Chasing high ratios with targets price realistically never reaches.',
      'Judging the ratio without accounting for spread and commissions, which hit the small side hardest.',
    ],
    related: ['take-profit', 'stop-loss', 'win-rate', 'expectancy', 'break-even-win-rate'],
    tools: [{ label: 'Risk/Reward Calculator', href: '/tools/risk-reward' }],
    popular: true,
  },
  {
    slug: 'risk-management',
    term: 'Risk Management',
    category: 'risk',
    aliases: ['managing risk', 'risk control'],
    short: 'The set of rules that decides how much you can lose, before you think about what you can win.',
    explanation: [
      'Risk management is the part of trading that is fully within your control. You cannot make a position go up, but you can decide exactly how much it costs you if it goes down.',
      'In practice it is a small number of decisions applied consistently: a fixed risk per trade, a stop on every position, a cap on total exposure, and a limit on how much can be lost in a day, week or month.',
      'The goal is not to avoid losses. It is to guarantee that no single loss, and no plausible streak of losses, can remove you from the game.',
    ],
    example: {
      setup: 'Two traders take identical trades through one bad month',
      body: [
        'Both take the same eighteen trades. Both are right about the market in the same places and wrong in the same places. One risks a fixed 1% and stops trading for the day after two losses; the other sizes by feel and doubles up on the setups that look strongest.',
        'The month is a poor one — eleven losses against seven wins. The first trader ends it down about 4% of the account, irritated, and takes the next trade the same way. The second lost 6% on one trade that felt certain, added to it, and ends the month down 31%, which means the next winning stretch has to produce 45% before any of it counts as progress.',
        'Nothing in that outcome came from analysis. Neither trader had a better read on the market; the difference was entirely in decisions made before the trades existed, about size and about when to stop.',
        'That is the whole of it. Risk management is a handful of limits — a fixed fraction per trade, a stop on every position, a ceiling on total open risk, a point at which the day ends — chosen while calm and applied when not. It does not improve any single trade. It decides whether you are still in the chair for the good stretch when it comes.',
      ],
    },
    whyItMatters:
      'Every strategy has losing periods. Risk management is what determines whether you are still trading when the good period arrives.',
    mistakes: [
      'Treating risk rules as guidelines that can be suspended for a great setup.',
      'Managing each trade in isolation while ignoring how much total risk is live at once.',
      'Only tightening risk after a bad stretch, rather than having the limits set in advance.',
    ],
    related: ['risk-per-trade', 'position-size', 'portfolio-heat', 'max-drawdown', 'trading-plan'],
    tools: [{ label: 'Put numbers on your rules', href: '/calculator' }],
    popular: true,
  },
  {
    slug: 'r-multiple',
    term: 'R-Multiple',
    category: 'risk',
    aliases: ['r multiple', 'in r', 'measured in r'],
    short: 'A trade’s result expressed as a multiple of the amount you originally risked.',
    explanation: [
      'One R is your initial risk on a trade. If you risked $100 and made $300, the trade returned 3R. If you were stopped out, it was −1R.',
      'This strips out account size and position size, so trades of wildly different dollar values become directly comparable. A month becomes a sequence like +2R, −1R, −1R, +4R.',
      'Thinking in R also removes emotional weight from the numbers. A $1,400 loss is frightening; a −1R result on a plan that expects them is routine.',
    ],
    formula: {
      label: 'R-Multiple',
      expression: 'Trade Profit or Loss ÷ Initial Risk',
      legend: [{ symbol: 'Initial Risk', meaning: 'Position size × distance from entry to original stop' }],
    },
    widget: 'r-multiple',
    example: {
      setup: 'A $400 win and a $900 win, and which one was better',
      steps: [
        { label: 'Trade A profit', value: '$400 on $200 risked' },
        { label: 'Trade A in R', value: '+2.0R' },
        { label: 'Trade B profit', value: '$900 on $750 risked' },
        { label: 'Trade B in R', value: '+1.2R' },
      ],
      body: [
        'In currency, trade B is more than twice the win. In R, trade A is the better trade — it returned twice what it put at stake, while B risked nearly four times as much to produce less than half again.',
        'Currency cannot tell you this, because it mixes two things together: how good the trade was, and how big the bet was. R separates them. It asks only what the trade returned per unit of risk, which is the part that says something about the method rather than about the size of the account that day.',
        'That separation is what makes a track record readable. A year of results in dollars is dominated by whichever months you happened to be sizing up; the same year in R shows the strategy itself, and lets a trade from a $5,000 account sit in the same column as one from $50,000.',
        'One rule keeps it honest: R is always measured against the original stop, never a stop you moved later. Recalculating from a trailed stop turns a 1R win into a 4R win on paper and quietly destroys the only thing the number was good for.',
      ],
    },
    whyItMatters:
      'R-multiples let you evaluate a strategy over hundreds of trades without account growth distorting the picture, and they make expectancy calculable.',
    mistakes: [
      'Recalculating R from a moved stop instead of the original one.',
      'Reporting R while quietly varying risk per trade, which makes the numbers meaningless.',
    ],
    related: ['risk-per-trade', 'expectancy', 'win-rate', 'trading-journal', 'risk-reward-ratio'],
  },
  {
    slug: 'drawdown',
    term: 'Drawdown',
    category: 'risk',
    aliases: ['dd', 'equity drawdown'],
    short: 'The decline from an account’s peak value to its lowest point before a new peak.',
    explanation: [
      'Drawdown measures the depth of the hole, not the daily fluctuation. It is always calculated from the highest equity value reached so far.',
      'The recovery math is asymmetric and unforgiving. A 20% drawdown needs a 25% gain to recover. A 50% drawdown needs 100%. An 80% drawdown needs 400%.',
      'Drawdowns are unavoidable — every strategy has them. What is controllable is their depth, and depth is set by position size far more than by trade selection.',
    ],
    formula: {
      label: 'Drawdown',
      expression: '(Peak Equity − Current Equity) ÷ Peak Equity × 100',
      legend: [{ symbol: 'Gain needed to recover', meaning: 'Drawdown ÷ (100 − Drawdown) × 100' }],
    },
    widget: 'drawdown',
    diagram: 'drawdown',
    example: {
      setup: 'What it takes to climb back out, at four depths',
      steps: [
        { label: 'Down 10%', value: 'needs +11.1%' },
        { label: 'Down 25%', value: 'needs +33.3%' },
        { label: 'Down 50%', value: 'needs +100%' },
        { label: 'Down 75%', value: 'needs +300%' },
      ],
      body: [
        'The gap between the two columns is the whole point. Losing and recovering are not symmetrical, because the loss is taken on the full account and the recovery has to be earned on what is left of it.',
        'At 10% down it barely matters — 11.1% instead of 10% is a rounding error in a trader’s year. At 50% the account must double, which for most strategies is not a bad quarter but a good couple of years. The curve is gentle and then it is not, and the steep part arrives faster than intuition expects.',
        'This is the mathematical case for small, boring position sizes, and it does not depend on being cautious by temperament. A trader who never lets a drawdown past 15% is always within a normal winning stretch of a new high. One who reaches 50% has turned a trading problem into an arithmetic one.',
        'It also explains why sizing up inside a drawdown is the most expensive instinct in trading. It is applied precisely when the account can least afford the variance, and it moves you along the curve in the direction where every further step costs more than the last.',
      ],
    },
    whyItMatters:
      'Because recovery is non-linear, avoiding a deep drawdown is worth far more than a slightly better entry. Small consistent risk is what keeps the hole shallow.',
    mistakes: [
      'Measuring drawdown from the starting balance rather than from the equity peak.',
      'Increasing size during a drawdown to recover faster, which deepens it.',
      'Underestimating the psychological difficulty of trading normally while 25% down.',
    ],
    related: ['max-drawdown', 'risk-per-trade', 'position-size', 'risk-of-ruin', 'compounding'],
    tools: [{ label: 'See what a drawdown costs to recover', href: '/trading-dictionary/drawdown' }],
    popular: true,
  },
  {
    slug: 'max-drawdown',
    term: 'Maximum Drawdown',
    category: 'risk',
    aliases: ['max dd', 'peak to trough'],
    short: 'The largest peak-to-trough decline an account or strategy has ever experienced.',
    explanation: [
      'Maximum drawdown is the worst single stretch in a track record. It answers the question that actually matters: what is the most pain this approach has ever delivered?',
      'It is a far better description of risk than volatility, because it is the number that decides whether a trader abandons a strategy at the worst possible moment.',
      'The historical maximum is a floor, not a ceiling. The worst drawdown a strategy has seen is simply the worst one so far.',
    ],
    example: {
      setup: 'A backtest showing a 22% maximum drawdown',
      body: [
        'The number is real: across the tested period, the worst peak-to-trough fall the strategy suffered was 22%. It is tempting to read that as a boundary — this system loses about a fifth at its worst — and to size the live account accordingly.',
        'But 22% is not a limit the strategy obeys. It is the deepest hole it happened to fall into across the particular stretch of history that was tested, in the particular order those trades arrived. Reshuffle the same trades into a different sequence and the maximum drawdown changes, sometimes considerably, without a single trade being different.',
        'Run the live account at a size where 22% is survivable and you have prepared for the worst thing that has already happened. The useful question is the other one: what happens at 35%, at 45%? If the honest answer is "I would stop trading" or "I could not fund my life", the position size is wrong regardless of what the backtest says.',
        'Every strategy that has ever blown up had, on the day before, a maximum drawdown that had never been exceeded.',
      ],
    },
    whyItMatters:
      'Sizing decisions should be made against a drawdown larger than any you have experienced, because eventually you will experience one.',
    mistakes: [
      'Treating a backtest’s maximum drawdown as a hard limit on future losses.',
      'Choosing a strategy on returns alone without asking what the ride looked like.',
    ],
    related: ['drawdown', 'risk-of-ruin', 'risk-management', 'expectancy', 'position-size'],
  },
  {
    slug: 'leverage',
    term: 'Leverage',
    category: 'risk',
    aliases: ['leveraged', 'gearing', '10x'],
    short: 'Using borrowed capital to control a position larger than your account balance.',
    explanation: [
      'Leverage is expressed as a multiple. At 10x, $1,000 of your own capital controls a $10,000 position. Every price move is amplified by that same factor against your equity.',
      'Leverage does not change the percentage move of the asset. It changes what that move does to you. A 2% adverse move on a 10x position removes 20% of your capital.',
      'Crucially, leverage does not have to increase risk. Leverage sets how large a position you can hold; your stop distance and position size set how much you can lose. Used deliberately, leverage lets a small account hold a properly sized position it could not otherwise fund.',
    ],
    formula: {
      label: 'Position Value',
      expression: 'Account Capital × Leverage',
      legend: [
        { symbol: 'Effective leverage', meaning: 'Position Value ÷ Account Equity' },
        { symbol: 'Loss on equity', meaning: 'Price move % × Leverage' },
      ],
    },
    widget: 'leverage',
    diagram: 'leverage',
    example: {
      setup: 'A $2,000 account controlling $20,000 of exposure',
      steps: [
        { label: 'Leverage', value: '10x' },
        { label: 'A 1% move is worth', value: '$200' },
        { label: 'As a share of the account', value: '10%' },
        { label: 'Move that erases the account', value: '10%' },
      ],
      body: [
        'Leverage does not change what the market does. A 1% move is a 1% move. What it changes is what that move means to you: at 10x, an ordinary day in the instrument is a tenth of the account, and a 10% move — which most things do a few times a year — is all of it.',
        'Whether this is dangerous depends on one thing, and it is not the leverage number. It is whether a stop is attached. A trader with 10x and a stop 1% away is risking $200. A trader with 2x and no stop is risking everything, slowly. The leverage ratio describes the position; the stop describes the risk.',
        'Used deliberately, leverage is what lets a small account size a trade properly rather than being forced into a position too large or too small for its stop. Used as a setting to be maximised, it is the fastest route to having the broker close the trade for you.',
        'The thing it never does is improve the idea. A leveraged wrong opinion is just a wrong opinion that arrives at its conclusion sooner.',
      ],
    },
    whyItMatters:
      'Leverage is the fastest route to a margin call, and also the tool that makes correct position sizing possible on a small account. Which one it is depends entirely on whether a stop is attached.',
    mistakes: [
      'Treating available leverage as a target rather than a ceiling.',
      'Sizing to maximum leverage and leaving no margin buffer for normal fluctuation.',
      'Forgetting that leverage magnifies the loss but never the accuracy of the idea.',
    ],
    related: ['margin', 'margin-call', 'position-size', 'notional-value', 'liquidation-price'],
    tools: [{ label: 'Size a leveraged position properly', href: '/calculator' }],
    popular: true,
  },
  {
    slug: 'margin',
    term: 'Margin',
    category: 'risk',
    aliases: ['margin requirement', 'initial margin', 'maintenance margin'],
    short: 'The capital your broker requires you to post to open and hold a leveraged position.',
    explanation: [
      'Margin is collateral, not a fee. Initial margin is what you must put up to open a position; maintenance margin is the minimum equity you must keep to hold it.',
      'As a position moves against you, your equity falls toward the maintenance level. Reach it and the broker issues a margin call or liquidates the position on your behalf.',
      'Margin requirements are not fixed. Brokers raise them during volatile periods, which can force position reductions at the worst possible time.',
    ],
    example: {
      setup: 'One ES futures contract with $15,000 of account equity',
      steps: [
        { label: 'Initial margin', value: '≈ $13,000' },
        { label: 'Maintenance margin', value: '≈ $12,000' },
        { label: 'Buffer above maintenance', value: '$3,000' },
        { label: 'ES points that consumes', value: '60' },
      ],
      body: [
        'Margin figures are set by the exchange and the broker and change with volatility, so treat these as the shape rather than today’s quote. The structure is what matters: initial margin is what you post to open, maintenance margin is the floor you must stay above to keep it open.',
        'With $15,000 of equity against roughly $12,000 of maintenance, there is a $3,000 cushion. At $50 a point on ES that is 60 points — a distance the index can cover in a single session without anything unusual happening.',
        'The critical word is collateral. Margin is not the cost of the trade and it is not the maximum loss; it is money set aside that you get back when the position closes. Losses come out of equity, and equity can fall past the posted margin. On a gap, a futures position can owe more than was ever deposited.',
        'This is also the boundary your stop does not control. Your stop is an instruction to the market. Maintenance margin is a condition on your account, and when it is breached the broker acts first — choosing what to close, when, at whatever price is available.',
      ],
    },
    whyItMatters:
      'Margin defines the point where your broker takes control of your trade. That is a hard boundary independent of where you placed your stop.',
    mistakes: [
      'Confusing margin posted with maximum loss. You can lose more than the initial margin.',
      'Running so close to maintenance margin that normal noise triggers liquidation.',
      'Not knowing whether your broker calls first or liquidates immediately.',
    ],
    related: ['leverage', 'margin-call', 'liquidation-price', 'broker', 'notional-value'],
  },
  {
    slug: 'margin-call',
    term: 'Margin Call',
    category: 'risk',
    aliases: ['called', 'maintenance call'],
    short: 'A broker demand for more capital when account equity falls below the required minimum.',
    explanation: [
      'A margin call arrives when losses push your equity below maintenance margin. You must add funds or reduce positions, usually within a very short window.',
      'If you do not act, the broker closes positions for you. They choose what to sell and when, with no regard for your plan or your stop levels.',
      'Forced liquidations tend to cluster at market extremes, which is precisely when prices are worst and liquidity is thinnest.',
    ],
    example: {
      setup: 'A stop at $92 and an overnight gap to $88',
      steps: [
        { label: 'Stop placed at', value: '$92.00' },
        { label: 'Previous close', value: '$95.40' },
        { label: 'Opening print', value: '$88.10' },
        { label: 'Filled at', value: '$88.10' },
      ],
      body: [
        'The stop did its job exactly as designed and it did not help. A stop order becomes a market order once the level trades, and the level never traded — the stock closed at $95.40 and opened at $88.10 after an earnings release. The first available price was the fill.',
        'For an unleveraged position that is a bad morning. For a margined one it can be a margin call, because equity has fallen past maintenance before any order could act. The broker now has the right to close positions, and it chooses which and when.',
        'The instinct at that moment is to wire more money and hold on. That converts a position that has already been wrong into a larger commitment to the same view, funded by capital that was not allocated to it. Reducing exposure is almost always the better answer, and it is almost never the one that feels right.',
        'The defence is not a better stop. It is size: a position small enough that a gap of the size this instrument actually produces leaves the account comfortably above maintenance, so the decision stays yours.',
      ],
    },
    whyItMatters:
      'A margin call means the outcome of your trade is no longer yours to determine. Avoiding that state is a core function of position sizing.',
    mistakes: [
      'Meeting a margin call by adding funds to a losing position rather than reducing exposure.',
      'Assuming a stop loss makes a margin call impossible. A gap can move equity past maintenance before the stop trades.',
    ],
    related: ['margin', 'leverage', 'liquidation-price', 'drawdown', 'broker'],
  },
  {
    slug: 'expectancy',
    term: 'Expectancy',
    category: 'risk',
    aliases: ['edge', 'expected value', 'ev'],
    short: 'The average amount you expect to win or lose per trade over a large sample.',
    explanation: [
      'Expectancy combines your win rate with the size of your average win and average loss. A high win rate with tiny winners and large losers produces negative expectancy.',
      'It is the only honest measure of whether a strategy works. Any individual trade, or any individual month, tells you almost nothing.',
      'Positive expectancy is necessary but not sufficient. A profitable edge traded at reckless size can still end an account before the average has time to assert itself.',
    ],
    formula: {
      label: 'Expectancy Per Trade',
      expression: '(Win Rate × Average Win) − (Loss Rate × Average Loss)',
      legend: [
        { symbol: 'Win Rate', meaning: 'Winning trades ÷ total trades' },
        { symbol: 'Loss Rate', meaning: '1 − Win Rate' },
      ],
    },
    widget: 'expectancy',
    example: {
      setup: 'A strategy that wins 45% of the time, +1.8R on wins, −1R on losses',
      steps: [
        { label: 'Win contribution', value: '0.45 × 1.8 = +0.81R' },
        { label: 'Loss contribution', value: '0.55 × 1.0 = −0.55R' },
        { label: 'Expectancy per trade', value: '+0.26R' },
        { label: 'Over 200 trades', value: '+52R' },
      ],
      body: [
        'A quarter of an R per trade sounds like almost nothing, and that is the correct feeling. Individually these trades are forgettable; more than half of them lose. The edge only exists in aggregate, and it only becomes visible after a few hundred repetitions.',
        'Which is why the honest way to read +0.26R is as a long-run average, not a prediction. Any twenty-trade stretch can easily be negative without the strategy having changed at all. Traders abandon methods with real edges constantly, on sample sizes far too small to have told them anything.',
        'Costs belong inside the number, not beside it. A strategy at +0.26R gross that pays 0.08R a round turn in spread and commission is really at +0.18R — still good, but a third of the edge now belongs to the broker. On thinner edges that arithmetic is the difference between a business and a hobby.',
        'And a positive expectancy does not make any position size safe. It says the account drifts upward over hundreds of trades; it says nothing about whether a bad thirty can happen first, which at 55% losers it absolutely can.',
      ],
    },
    whyItMatters:
      'Expectancy tells you whether to keep trading a strategy at all. Everything else — sizing, psychology, execution — is downstream of having a positive one.',
    mistakes: [
      'Judging expectancy from a handful of trades, where randomness dominates.',
      'Calculating it on gross results and ignoring spreads, commissions and financing.',
      'Assuming positive expectancy makes any position size safe.',
    ],
    related: ['win-rate', 'risk-reward-ratio', 'r-multiple', 'trading-journal', 'risk-of-ruin'],
    tools: [{ label: 'Test an edge', href: '/trading-dictionary/expectancy' }],
  },
  {
    slug: 'win-rate',
    term: 'Win Rate',
    category: 'risk',
    aliases: ['hit rate', 'accuracy', 'strike rate'],
    short: 'The percentage of your trades that close at a profit.',
    explanation: [
      'Win rate is the most quoted and least useful number in trading when taken alone. It says nothing about the size of the wins or the losses.',
      'A 90% win rate is easy to manufacture: set a tiny target and an enormous stop. One loss erases twenty wins.',
      'Win rate only becomes meaningful next to risk/reward. Together they produce expectancy, which is the number that actually decides profitability.',
    ],
    formula: {
      label: 'Win Rate',
      expression: 'Winning Trades ÷ Total Trades × 100',
    },
    example: {
      setup: 'A 90% win rate that loses money',
      steps: [
        { label: '90 wins at +0.2R', value: '+18R' },
        { label: '10 losses at −3R', value: '−30R' },
        { label: 'Net over 100 trades', value: '−12R' },
        { label: 'Win rate', value: '90%' },
      ],
      body: [
        'Nine trades in ten are winners and the account shrinks. The wins are small because the target was close; the losses are large because the stop was far away, or moved, or was not there at all. Every individual trade felt like it was going well.',
        'This shape is not exotic — it is what happens naturally when a trader takes profits quickly to enjoy being right and lets losers run in the hope of getting back to flat. It produces a beautiful win rate and a falling balance, and the win rate is the number people quote.',
        'Which is the whole lesson: win rate alone says nothing. It is half of a fraction, and the other half is the average size of a win against the average size of a loss. Either number can be made to look excellent by ruining the other.',
        'Read the two together and a 40% win rate at 1:2.5 beats this 90% comfortably. It also feels much worse to trade, which is why the worse strategy is the one people keep.',
      ],
    },
    whyItMatters:
      'Knowing the win rate your risk/reward requires stops you from abandoning a perfectly good strategy during an ordinary run of losses.',
    mistakes: [
      'Optimizing for a high win rate at the expense of the size of the average win.',
      'Comparing win rates between strategies with completely different risk/reward profiles.',
    ],
    related: ['expectancy', 'risk-reward-ratio', 'break-even-win-rate', 'r-multiple', 'loss-aversion'],
  },
  {
    slug: 'break-even-win-rate',
    term: 'Break-Even Win Rate',
    category: 'risk',
    aliases: ['breakeven win rate', 'minimum win rate'],
    short: 'The win rate a strategy needs, at a given risk/reward, just to avoid losing money.',
    explanation: [
      'For any risk/reward ratio there is a win rate below which the strategy loses money and above which it makes money. That threshold is the break-even win rate.',
      'At 1:1 you need better than 50%. At 1:2, about 33%. At 1:3, about 25%. At 1:0.5, you need 67% just to stand still.',
      'This is why traders with modest accuracy can be highly profitable, and why traders who are right most of the time can still lose.',
    ],
    formula: {
      label: 'Break-Even Win Rate',
      expression: '1 ÷ (1 + Risk/Reward Ratio) × 100',
      legend: [{ symbol: 'Risk/Reward Ratio', meaning: 'Reward per share ÷ risk per share' }],
    },
    widget: 'risk-reward',
    example: {
      setup: 'What each ratio demands before it makes a penny',
      steps: [
        { label: '1:1 needs', value: '50.0%' },
        { label: '1:2 needs', value: '33.3%' },
        { label: '1:3 needs', value: '25.0%' },
        { label: '3:1 needs', value: '75.0%' },
      ],
      body: [
        'One division produces each of these: 1 ÷ (1 + ratio). A 1:2 trade needs 1 ÷ 3, which is 33.3%. Nothing about the market is in that number — it is arithmetic, and it is the floor the strategy has to clear just to stand still.',
        'Read the last row before the others. A trader taking a 3:1 — risking three to make one, which is what "I will just take a quick profit and give it room" amounts to — has to be right three times in four merely to break even. That is a very high bar, and it is being cleared by accident rather than by design.',
        'The comparison worth making is with your own history. If your journal says you win 45% of the time, a 1:1 setup is a losing trade before you take it, and a 1:2 has real room. That turns "this looks like a good level" into a claim that can be checked.',
        'Costs raise every row. Spread and commission come off the winning side and add to the losing side, so a 1:2 that needs 33.3% in theory usually needs something closer to 36% in practice. Small on a wide ratio, decisive on a narrow one.',
      ],
    },
    whyItMatters:
      'It converts a chart setup into a testable claim: to take this trade profitably, I need to be right at least this often. Costs push the real threshold higher.',
    mistakes: [
      'Forgetting that spread and commissions raise the true break-even.',
      'Assuming a high theoretical ratio is achievable when targets are rarely reached.',
    ],
    related: ['risk-reward-ratio', 'win-rate', 'expectancy', 'take-profit', 'spread'],
    tools: [{ label: 'Risk/Reward Calculator', href: '/tools/risk-reward' }],
  },
  {
    slug: 'portfolio-heat',
    term: 'Portfolio Heat',
    category: 'risk',
    aliases: ['total risk', 'open risk', 'aggregate risk'],
    short: 'The combined risk of every open position, measured as a percentage of your account.',
    explanation: [
      'Per-trade risk is only half the picture. Five open trades at 1% each mean 5% of the account is exposed simultaneously.',
      'Portfolio heat sums the live risk across all positions. Many traders cap it at 4–6%, so that a broad market shock cannot cause an outsized loss.',
      'Heat falls as trades move into profit and stops are trailed to break-even, which naturally makes room for new positions.',
    ],
    formula: {
      label: 'Portfolio Heat',
      expression: 'Sum of open trade risks ÷ Account Equity × 100',
    },
    example: {
      setup: 'Eight open positions, each obeying the 1% rule perfectly',
      steps: [
        { label: 'Risk per position', value: '1%' },
        { label: 'Positions open', value: '8' },
        { label: 'Portfolio heat', value: '8%' },
        { label: 'All eight stop out', value: '−8% in a day' },
      ],
      body: [
        'Not one of these trades broke the rule. Each was sized to lose exactly 1% at its stop, and each was entered on its own merits, hours apart, on a different chart. The rule was followed eight times and the account is down 8% by the close.',
        'Portfolio heat is the number that would have shown this coming: the sum of what is currently at risk across everything open. It is the only figure that treats the account as one thing rather than as eight unrelated decisions, and almost no platform displays it.',
        'A working limit is a ceiling on total heat — commonly 4 to 6% — enforced at the moment of entry. Once heat is at the cap, the next setup is simply not taken, however good it looks. That rule does its work exactly when it is most unwelcome, which is on the days everything looks like it is lining up.',
        'It matters most when the positions rhyme. Eight unrelated bets losing together is bad luck; eight expressions of the same idea losing together is a certainty, and the second is far more common than it looks from inside.',
      ],
    },
    whyItMatters:
      'It is entirely possible to follow a 1% rule perfectly and still lose 8% in a day by holding eight correlated positions at once.',
    mistakes: [
      'Counting only the largest position instead of the total.',
      'Treating positions in the same sector or currency as independent risks.',
      'Adding a new trade without checking what is already open.',
    ],
    related: ['risk-per-trade', 'correlation-risk', 'risk-management', 'drawdown', 'position-size'],
  },
  {
    slug: 'correlation-risk',
    term: 'Correlation Risk',
    category: 'risk',
    aliases: ['correlated positions', 'concentration risk'],
    short: 'The hidden risk of holding several positions that tend to move together.',
    explanation: [
      'Two trades are only genuinely separate if they can lose independently. Three long tech stocks are, in practice, one large bet on tech.',
      'Correlation also rises exactly when it hurts. Assets that behave independently in calm markets often move as one during a sell-off.',
      'It shows up in less obvious places too: currency pairs sharing a base currency, commodity producers tied to the same underlying price, and crypto assets that follow bitcoin.',
    ],
    example: {
      setup: 'Long four semiconductor names, 1% risk on each',
      steps: [
        { label: 'Tickers held', value: '4' },
        { label: 'Risk per name', value: '1%' },
        { label: 'Behaves like', value: 'one 4% bet' },
        { label: 'On a sector selloff', value: 'all four stop out' },
      ],
      body: [
        'Four different companies, four different balance sheets, four separate pieces of analysis. And one shared driver: demand for chips. On the day that story changes, the four charts stop being four charts.',
        'Correlation is not a binary. Two unrelated stocks sit near zero, two names in the same sector might run at 0.7, and two share classes of the same company are effectively one position wearing two tickers. The higher the number, the more the separate risks collapse into a single one.',
        'The cruel part is that correlation rises in exactly the conditions where diversification was supposed to help. On quiet days these four drift apart and the book looks nicely spread; in a panic almost everything moves together, and a portfolio built on normal-market correlations discovers it was one trade all along.',
        'Practically: count exposures, not tickers. Four semiconductor positions are one semiconductor position, and it should be sized as one.',
      ],
    },
    whyItMatters:
      'Correlation quietly multiplies your real risk per trade. Four correlated 1% positions can behave like a single 4% one.',
    mistakes: [
      'Counting positions rather than independent risks.',
      'Assuming diversification across tickers means diversification across drivers.',
      'Relying on historical correlations that break down under stress.',
    ],
    related: ['portfolio-heat', 'risk-management', 'risk-per-trade', 'drawdown', 'bear-market'],
  },
  {
    slug: 'risk-of-ruin',
    term: 'Risk of Ruin',
    category: 'risk',
    aliases: ['ruin', 'blowing up'],
    short: 'The probability that a series of losses reduces an account below the point of recovery.',
    explanation: [
      'Risk of ruin combines win rate, risk/reward and position size into a single probability: the chance of losing so much that continuing is not realistic.',
      'The dominant variable is position size. A positive-expectancy strategy risking 25% per trade still has a meaningful chance of ruin; the same strategy at 1% is effectively safe from it.',
      'Losing streaks are longer than intuition suggests. With a 40% win rate, a run of eight consecutive losses is entirely ordinary over a few hundred trades.',
    ],
    example: {
      setup: 'A coin flip that pays 2:1 — and still ends at zero',
      body: [
        'The bet is excellent: heads doubles your stake, tails loses it, and the coin is fair. Any sensible analysis says take it repeatedly. Now bet the entire account on every flip.',
        'The expectancy is strongly positive and the outcome is certain. Not likely — certain. Somewhere in the sequence a tail comes up, the balance is zero, and zero multiplied by every favourable flip that follows is still zero. There is no recovery from ruin, which is what separates it from an ordinary loss.',
        'This is the case for fractional sizing stated at its starkest. Risk a fixed small part of what remains and the account can absorb any streak, because each bet is smaller than the last after a loss. Risk all of it and a positive edge guarantees ruin rather than preventing it.',
        'Real accounts rarely reach literal zero. They reach a balance too small to trade meaningfully, or a trader too shaken to continue, which is the same outcome by a different route. That is why survival is not one goal among several — it is the condition on which all the others depend.',
      ],
    },
    whyItMatters:
      'Survival is the precondition for every other outcome. A strategy that works but occasionally destroys the account has an expected long-run value of zero.',
    mistakes: [
      'Assuming a positive edge makes ruin impossible.',
      'Underestimating the length of a normal losing streak.',
      'Sizing for the best case rather than for the worst plausible sequence.',
    ],
    related: ['risk-per-trade', 'drawdown', 'expectancy', 'max-drawdown', 'position-size'],
  },
  {
    slug: 'notional-value',
    term: 'Notional Value',
    category: 'risk',
    aliases: ['position value', 'exposure', 'market value'],
    short: 'The total market value of a position — size multiplied by price.',
    explanation: [
      'Notional value is what your position is worth in the market, regardless of how much of your own capital funded it. 50 shares at $50 is $2,500 of notional value.',
      'It is not the same as your risk. That $2,500 position with a $2 stop risks $100. Notional value tells you how much market you are holding; risk tells you how much you can lose.',
      'It matters for funding. If notional value exceeds your account equity, the position requires margin, and margin brings its own set of rules.',
    ],
    formula: {
      label: 'Notional Value',
      expression: 'Position Size × Entry Price',
      legend: [{ symbol: 'Account exposure', meaning: 'Notional Value ÷ Account Equity × 100' }],
    },
    example: {
      setup: 'A 1% risk that needs more capital than the account holds',
      steps: [
        { label: 'Account', value: '$10,000' },
        { label: 'Risk budget at 1%', value: '$100' },
        { label: 'Entry $210, stop $209.50', value: '$0.50 per share' },
        { label: 'Position size', value: '200 shares = $42,000' },
      ],
      body: [
        'The risk is textbook: $100, exactly 1%. The stop is 50 cents away, so 200 shares is the correct size, and 200 shares of a $210 stock is $42,000 of stock against a $10,000 account.',
        'Nothing was calculated wrongly. Risk and notional are simply different quantities, and a very tight stop pushes them far apart — the tighter the stop, the larger the position needed to put the same money at risk. On a cash account this trade cannot be placed at all; on margin it can, at four times leverage, for a 1% risk.',
        'That is the number worth checking before the order goes in. It decides whether you can fund the trade, what margin it consumes, how much buying power is left for anything else, and what a gap would do — because a gap does not respect the 50-cent stop, and it acts on the full $42,000.',
        'Risk tells you what the plan costs when it works as intended. Notional tells you what you are actually holding when it does not.',
      ],
    },
    whyItMatters:
      'A correctly sized trade with a tight stop can still produce a position far larger than your account. Knowing your notional value tells you whether you can actually fund it.',
    mistakes: [
      'Confusing notional value with the amount at risk.',
      'Discovering only at order entry that the correct position size needs margin.',
    ],
    related: ['position-size', 'leverage', 'margin', 'stop-distance', 'risk-per-trade'],
  },
  {
    slug: 'stop-distance',
    term: 'Stop Distance',
    category: 'risk',
    aliases: ['risk per share', 'stop width', 'risk per unit'],
    short: 'The gap between your entry and your stop loss — your risk on a single unit.',
    explanation: [
      'Stop distance is the per-share, per-contract or per-coin version of your risk. For a long it is entry minus stop; for a short it is stop minus entry.',
      'It is the denominator in the position size formula, which makes it the most leveraged number in your trade plan. Halving the stop distance doubles the correct position size at identical dollar risk.',
      'Expressed as a percentage of entry, it also tells you how much room the trade has relative to the instrument’s normal movement.',
    ],
    formula: {
      label: 'Stop Distance',
      expression: 'Entry − Stop   (long)   ·   Stop − Entry   (short)',
      legend: [{ symbol: 'As a percentage', meaning: 'Stop Distance ÷ Entry × 100' }],
    },
    widget: 'stop-distance',
    diagram: 'stop-loss',
    example: {
      setup: 'The same $500 risk at three different stop distances',
      steps: [
        { label: 'Stop $0.40 away', value: '1,250 shares' },
        { label: 'Stop $1.00 away', value: '500 shares' },
        { label: 'Stop $2.50 away', value: '200 shares' },
        { label: 'Risk in every case', value: '$500' },
      ],
      body: [
        'Three completely different positions, identical risk. Stop distance and position size move in opposite directions, and their product is the one number you actually chose.',
        'This is why "a wide stop is risky" is wrong as usually meant. A wide stop is not riskier; it is smaller. The risk only grows if the size stays the same while the stop moves out, which is what happens when size is decided first.',
        'It also removes the false choice between giving a trade room and keeping risk small. You can do both — the price is a smaller position, not a larger loss. The real cost of a wide stop is that the move has to travel further to pay the same amount, which is a question about the target, not about the risk.',
        'Two details decide whether the distance you used is the distance you get. The stop belongs where the idea is disproved — beyond the level, not at it — and slippage means the fill is usually a little worse than the trigger. Both argue for measuring honestly rather than shaving the distance to justify a bigger position.',
      ],
    },
    whyItMatters:
      'Every dollar figure in your trade — position size, position value, exposure — is derived from this one distance. Getting it wrong scales the error through everything else.',
    mistakes: [
      'Setting stop distance from a desired position size, which reverses the logic.',
      'Using the same distance across instruments with very different volatility.',
      'Placing the stop inside the instrument’s normal daily range and calling it precision.',
    ],
    related: ['stop-loss', 'position-size', 'atr', 'atr-stop', 'volatility'],
    tools: [{ label: 'Turn a stop into a position size', href: '/tools/position-size' }],
  },
  {
    slug: 'atr-stop',
    term: 'Volatility-Based Stop',
    category: 'risk',
    aliases: ['atr stop', 'volatility stop'],
    short: 'A stop placed at a multiple of the instrument’s Average True Range rather than a fixed percentage.',
    explanation: [
      'A fixed 2% stop is far too tight on a volatile instrument and far too wide on a quiet one. A volatility-based stop adapts to how the instrument actually moves.',
      'The usual construction is a multiple of ATR — commonly 1.5x to 3x — placed beyond the entry. If ATR is $1.20 and you use 2x, the stop sits $2.40 away.',
      'Because position size is derived from stop distance, this automatically reduces size in violent markets and increases it in calm ones, at constant dollar risk.',
    ],
    formula: {
      label: 'Volatility Stop',
      expression: 'Entry ∓ (ATR × Multiplier)',
      legend: [
        { symbol: 'ATR', meaning: 'Average True Range over a lookback, usually 14 periods' },
        { symbol: 'Multiplier', meaning: 'How many ranges of room the trade gets, typically 1.5–3' },
      ],
    },
    example: {
      setup: 'A 2×ATR stop on a stock whose ATR is $1.80',
      steps: [
        { label: 'Average True Range (14)', value: '$1.80' },
        { label: 'Stop distance at 2×ATR', value: '$3.60' },
        { label: 'Entry', value: '$64.00' },
        { label: 'Stop', value: '$60.40' },
      ],
      body: [
        'The stock moves about $1.80 in an average day, so a stop $3.60 away sits outside two ordinary days of movement. Getting hit means something happened beyond the instrument’s normal behaviour — which is what a stop should mean.',
        'Compare that with a round-number stop. "I will risk a dollar" on this stock is a stop inside a single average day: it will be taken out routinely by noise that says nothing about whether the idea was right, and the trader will conclude the setup does not work when what does not work is the stop.',
        'The other direction matters just as much. Put the same $3.60 stop on a stock with an ATR of $0.40 and you are giving away nine average days of room, sizing the position down to almost nothing for no reason. ATR adapts the distance to the instrument instead of imposing one number on all of them.',
        'Two cautions. ATR is a trailing average, so it understates the required distance when volatility is rising — often just before the move you were waiting for. And it says nothing about where the idea is invalidated: a level-based stop that also clears two ATR is better than either method alone.',
      ],
    },
    whyItMatters:
      'It stops the market’s ordinary noise from closing trades that were never actually wrong, without requiring you to accept larger losses.',
    mistakes: [
      'Using a multiplier so small the stop sits inside the instrument’s normal daily swing.',
      'Recalculating ATR mid-trade and moving the stop wider as volatility expands.',
    ],
    related: ['atr', 'stop-loss', 'stop-distance', 'volatility', 'position-size'],
  },
  {
    slug: 'compounding',
    term: 'Compounding',
    category: 'risk',
    aliases: ['compound growth', 'compound interest'],
    short: 'Growth applied to a balance that already includes previous growth.',
    explanation: [
      'Compounding means each period’s return is calculated on the new, larger balance. Gains generate gains, and the curve bends upward over time.',
      'It works in reverse too. Losses compound against a shrinking base, which is precisely why drawdown recovery is so asymmetric.',
      'In percentage-based risk models compounding is automatic: risking 1% of current equity means your dollar risk grows with the account and shrinks during drawdowns.',
    ],
    formula: {
      label: 'Compound Growth',
      expression: 'Final = Starting × (1 + Rate)^Periods',
      legend: [
        { symbol: 'Rate', meaning: 'Return per period, as a decimal' },
        { symbol: 'Periods', meaning: 'Number of compounding periods' },
      ],
    },
    widget: 'compound',
    example: {
      setup: 'Two years at 2% a month, with and without one bad month',
      steps: [
        { label: '24 months at +2%', value: '$10,000 → $16,084' },
        { label: '23 at +2%, one at −30%', value: '$10,000 → $11,038' },
        { label: 'Cost of that single month', value: '$5,046' },
        { label: 'Months of gains erased', value: '19' },
      ],
      body: [
        'Two percent a month is unremarkable — it is a good but entirely ordinary result. Compounded across twenty-four of them it turns $10,000 into just over $16,000, and almost all of that growth arrives in the final third, because each month builds on a larger base than the last.',
        'Replace any one of those months with a 30% loss and the ending balance falls to about $11,038. Where in the sequence it lands barely matters; what matters is that every month afterwards compounds from a smaller base. That single month cost $5,046, and closing the gap at 2% a month takes another nineteen.',
        'That asymmetry is the argument for boring risk, and it does not rely on being timid. The compounding curve is built on the base, so protecting the base is worth more than any individual gain added to it. One avoided disaster outweighs a long run of slightly better entries.',
        'It is also why "I need a big win to catch up" has the mathematics backwards. Big wins require big risk, big risk produces the months that reset the base, and the base is the only thing doing the compounding.',
      ],
    },
    whyItMatters:
      'It reframes the goal from making a lot on one trade to avoiding the large losses that reset the base the whole curve is built on.',
    mistakes: [
      'Projecting a good month forward indefinitely and treating the result as a plan.',
      'Ignoring that a single large loss removes many periods of compounding.',
      'Withdrawing gains while still assuming the compounded projection holds.',
    ],
    related: ['drawdown', 'risk-per-trade', 'expectancy', 'max-drawdown', 'trading-plan'],
  },
];
