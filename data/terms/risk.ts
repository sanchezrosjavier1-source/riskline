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
