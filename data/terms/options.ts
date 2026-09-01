import type { Term } from '@/types/dictionary';

export const optionTerms: Term[] = [
  {
    slug: 'call-option',
    term: 'Call Option',
    category: 'options',
    aliases: ['call', 'calls', 'long call'],
    short: 'A contract giving the right, but not the obligation, to buy an asset at a set price before expiration.',
    explanation: [
      'A call buyer pays a premium for the right to buy at the strike price. If the asset finishes above the strike by more than the premium paid, the trade is profitable.',
      'The maximum loss for a call buyer is the premium. That cap is genuine, which makes calls a defined-risk way to express an upside view.',
      'The seller of the call takes the other side: they collect the premium and accept the obligation to deliver at the strike, with losses that grow as price rises.',
    ],
    diagram: 'option-payoff',
    whyItMatters:
      'Because the maximum loss is known upfront, the premium paid is your risk per contract — which makes position sizing on long options unusually clean.',
    mistakes: [
      'Treating the capped loss as low risk. Options routinely expire worthless, and 100% losses are common.',
      'Buying short-dated out-of-the-money calls where time decay dominates the outcome.',
      'Being right on direction but losing because the move arrived too slowly.',
    ],
    related: ['put-option', 'strike-price', 'premium', 'expiration', 'delta'],
    popular: true,
  },
  {
    slug: 'put-option',
    term: 'Put Option',
    category: 'options',
    aliases: ['put', 'puts', 'long put'],
    short: 'A contract giving the right, but not the obligation, to sell an asset at a set price before expiration.',
    explanation: [
      'A put buyer profits when the underlying falls below the strike price by more than the premium paid. Maximum loss is the premium.',
      'Puts are widely used as insurance. Holding a stock and buying a put creates a floor under the position, at the cost of the premium.',
      'They are also the defined-risk alternative to short selling, avoiding both unlimited loss and borrow costs — but with time working against you.',
    ],
    diagram: 'option-payoff',
    whyItMatters:
      'A protective put caps downside at a known price without the gap risk of a stop order, because the right to sell at the strike does not depend on liquidity.',
    mistakes: [
      'Buying puts only after volatility has already spiked, when premium is most expensive.',
      'Treating puts as cheap insurance without accounting for how quickly that cost accumulates.',
    ],
    related: ['call-option', 'strike-price', 'premium', 'implied-volatility', 'delta'],
    popular: true,
  },
  {
    slug: 'strike-price',
    term: 'Strike Price',
    category: 'options',
    aliases: ['strike', 'exercise price'],
    short: 'The price at which an option contract can be exercised.',
    explanation: [
      'The strike is the fixed reference point of the contract. For a call it is the price you may buy at; for a put, the price you may sell at.',
      'Where the strike sits relative to the current price determines the option’s character. Strikes far out of the money are cheap, low-probability bets; strikes deep in the money behave much more like the underlying.',
      'Strike selection is a bigger determinant of outcome than most beginners expect — often more important than getting the direction right.',
    ],
    whyItMatters:
      'The distance between the current price and the strike sets how much the underlying must move, and how fast, for the trade to work at all.',
    mistakes: [
      'Choosing far out-of-the-money strikes because they look cheap.',
      'Ignoring that a low-priced option usually reflects a low probability of paying off.',
    ],
    related: ['call-option', 'put-option', 'in-the-money', 'out-of-the-money', 'delta'],
  },
  {
    slug: 'expiration',
    term: 'Expiration',
    category: 'options',
    aliases: ['expiry', 'expiration date', 'dte'],
    short: 'The date an options contract ceases to exist.',
    explanation: [
      'After expiration the contract is gone. In-the-money options are typically exercised automatically; everything else expires worthless.',
      'Time remaining is a core input to an option’s value. As expiration approaches, extrinsic value decays toward zero, and the decay accelerates in the final weeks.',
      'Near expiration options become extremely sensitive: small moves in the underlying produce large percentage swings in the option price.',
    ],
    whyItMatters:
      'Options are the rare instrument where being right too late is identical to being wrong. Expiration puts a hard deadline on your thesis.',
    mistakes: [
      'Buying short-dated options for a thesis that needs weeks to develop.',
      'Holding through expiration week and being surprised by accelerating decay.',
      'Forgetting that automatic exercise can create an unwanted stock position.',
    ],
    related: ['theta', 'extrinsic-value', 'premium', 'assignment', 'open-interest'],
  },
  {
    slug: 'premium',
    term: 'Premium',
    category: 'options',
    aliases: ['option price', 'option premium'],
    short: 'The price paid for an options contract.',
    explanation: [
      'Premium is what the buyer pays and the seller collects. It is quoted per share, so a $2.40 premium on a standard 100-share contract costs $240.',
      'It has two components: intrinsic value, the amount already in the money, and extrinsic value, which reflects remaining time and implied volatility.',
      'For a buyer, the premium is the entire risk. For a seller, it is the entire maximum profit — while the risk can be far larger.',
    ],
    formula: {
      label: 'Option Premium',
      expression: 'Intrinsic Value + Extrinsic Value',
      legend: [
        { symbol: 'Contract cost', meaning: 'Premium × 100 (standard US equity contract)' },
      ],
    },
    whyItMatters:
      'For long options the premium is your maximum risk, which makes it the number you divide your risk budget by to get contract count.',
    mistakes: [
      'Forgetting the 100x multiplier and buying ten times the intended exposure.',
      'Paying inflated premium into an event where implied volatility collapses immediately after.',
    ],
    related: ['intrinsic-value', 'extrinsic-value', 'implied-volatility', 'theta', 'position-size'],
  },
  {
    slug: 'intrinsic-value',
    term: 'Intrinsic Value',
    category: 'options',
    aliases: ['in the money value'],
    short: 'The portion of an option’s premium that would be realized if exercised right now.',
    explanation: [
      'For a call, intrinsic value is the current price minus the strike, floored at zero. For a put it is the strike minus the current price, also floored at zero.',
      'Out-of-the-money options have zero intrinsic value. Their entire premium is extrinsic, which is another way of saying it can all disappear.',
      'Intrinsic value moves essentially one-for-one with the underlying once an option is deep in the money.',
    ],
    formula: {
      label: 'Intrinsic Value',
      expression: 'max(Price − Strike, 0)   call   ·   max(Strike − Price, 0)   put',
    },
    whyItMatters:
      'Intrinsic value is the part of the premium that is real and durable. Everything above it decays toward zero as expiration approaches.',
    mistakes: [
      'Buying purely extrinsic value without recognizing it is a wasting asset.',
      'Assuming an in-the-money option cannot lose value. It can — the extrinsic portion still decays.',
    ],
    related: ['extrinsic-value', 'premium', 'in-the-money', 'out-of-the-money', 'theta'],
  },
  {
    slug: 'extrinsic-value',
    term: 'Extrinsic Value',
    category: 'options',
    aliases: ['time value'],
    short: 'The part of an option’s premium beyond intrinsic value, reflecting time and volatility.',
    explanation: [
      'Extrinsic value is what buyers pay for the possibility that the option becomes more valuable before expiration.',
      'It is driven by two things: time remaining and implied volatility. More of either means more extrinsic value.',
      'It always decays to zero at expiration. That decay is not linear — it accelerates sharply in the final weeks.',
    ],
    formula: {
      label: 'Extrinsic Value',
      expression: 'Premium − Intrinsic Value',
    },
    whyItMatters:
      'Extrinsic value is the portion of your premium that is guaranteed to disappear if nothing happens. It is the real cost of being early.',
    mistakes: [
      'Buying high-extrinsic options before an event and losing to the volatility collapse afterward.',
      'Holding out-of-the-money options into expiration week, where decay is fastest.',
    ],
    related: ['intrinsic-value', 'theta', 'implied-volatility', 'premium', 'expiration'],
  },
  {
    slug: 'in-the-money',
    term: 'In The Money',
    category: 'options',
    aliases: ['itm'],
    short: 'An option that currently has intrinsic value.',
    explanation: [
      'A call is in the money when the underlying trades above the strike. A put is in the money when it trades below.',
      'In-the-money options cost more but behave more like the underlying, with a higher delta and a lower proportion of decaying extrinsic value.',
      'They also carry a higher probability of finishing profitable, which is exactly what the extra premium is paying for.',
    ],
    whyItMatters:
      'In-the-money options trade convexity for reliability. Less leverage, less decay, and outcomes far less dependent on precise timing.',
    mistakes: [
      'Dismissing in-the-money options as expensive without comparing probability of profit.',
      'Forgetting that automatic exercise at expiration creates a stock position needing capital.',
    ],
    related: ['out-of-the-money', 'intrinsic-value', 'delta', 'strike-price', 'assignment'],
  },
  {
    slug: 'out-of-the-money',
    term: 'Out Of The Money',
    category: 'options',
    aliases: ['otm'],
    short: 'An option with no intrinsic value, whose entire premium is time and volatility.',
    explanation: [
      'A call is out of the money when the underlying is below the strike; a put when it is above.',
      'These options are cheap because they are unlikely to pay off. The low price is the market’s estimate of probability, not a discount.',
      'They offer the largest percentage gains when they work, and expire worthless most of the time.',
    ],
    whyItMatters:
      'Out-of-the-money options are the most common way beginners lose money in options: the lottery-ticket payoff obscures how often the outcome is a total loss.',
    mistakes: [
      'Buying far out-of-the-money options because more contracts fit the budget.',
      'Assuming a directional call is enough. The move must also be large enough and fast enough.',
    ],
    related: ['in-the-money', 'extrinsic-value', 'theta', 'delta', 'strike-price'],
  },
  {
    slug: 'delta',
    term: 'Delta',
    category: 'options',
    aliases: ['option delta'],
    short: 'How much an option’s price moves for a $1 move in the underlying.',
    explanation: [
      'Delta ranges from 0 to 1 for calls and 0 to −1 for puts. A 0.60 delta call gains roughly $0.60 per $1 rise in the underlying.',
      'It is also a rough approximation of the probability the option finishes in the money, which makes it useful for strike selection.',
      'Delta is not fixed. It rises as an option moves into the money and falls as it moves out — that rate of change is gamma.',
    ],
    whyItMatters:
      'Delta converts option positions into equivalent share exposure, which is what lets you size an options trade against the same risk framework you use everywhere else.',
    mistakes: [
      'Treating delta as constant while the underlying moves.',
      'Reading delta as an exact probability rather than an approximation.',
    ],
    related: ['gamma', 'theta', 'vega', 'strike-price', 'in-the-money'],
    popular: true,
  },
  {
    slug: 'gamma',
    term: 'Gamma',
    category: 'options',
    aliases: ['option gamma'],
    short: 'The rate at which delta changes as the underlying moves.',
    explanation: [
      'Gamma is the second derivative: it measures how quickly your directional exposure shifts as price moves.',
      'It is highest for at-the-money options near expiration. That is when a small move in the underlying can swing delta dramatically.',
      'High gamma cuts both ways. Positions gain exposure quickly in your favor and just as quickly against you.',
    ],
    whyItMatters:
      'Gamma is why short-dated at-the-money options feel unstable. Your effective position size is changing continuously without you doing anything.',
    mistakes: [
      'Holding high-gamma positions near expiration without watching them closely.',
      'Sizing on current delta while ignoring how fast it can change.',
    ],
    related: ['delta', 'theta', 'expiration', 'implied-volatility', 'vega'],
  },
  {
    slug: 'theta',
    term: 'Theta',
    category: 'options',
    aliases: ['time decay', 'option theta'],
    short: 'How much value an option loses per day purely from the passage of time.',
    explanation: [
      'Theta is quoted as a negative number for option buyers. A theta of −0.05 means the option loses about $0.05 of value per day, all else equal.',
      'Decay accelerates as expiration approaches, and it is concentrated in extrinsic value. At-the-money options in their final weeks decay fastest.',
      'Option sellers collect theta. It is the compensation for taking on obligation and undefined risk.',
    ],
    whyItMatters:
      'Theta is the cost of being early, charged daily. It is why an options trade needs a thesis about timing, not just direction.',
    mistakes: [
      'Buying options for a slow-developing thesis and paying decay the whole way.',
      'Ignoring that weekends still cost theta.',
    ],
    related: ['extrinsic-value', 'expiration', 'gamma', 'premium', 'delta'],
    popular: true,
  },
  {
    slug: 'vega',
    term: 'Vega',
    category: 'options',
    aliases: ['option vega'],
    short: 'How much an option’s price changes for a one-point move in implied volatility.',
    explanation: [
      'Vega measures sensitivity to volatility expectations rather than to price. A vega of 0.12 means the option gains about $0.12 if implied volatility rises one point.',
      'Long options always have positive vega. Rising volatility helps them; falling volatility hurts, even when the underlying moves the right way.',
      'Vega is largest for at-the-money options with more time remaining.',
    ],
    whyItMatters:
      'Vega explains the most confusing outcome in options: being right on direction and still losing money because volatility collapsed after an event.',
    mistakes: [
      'Buying elevated-volatility options right before an event and being crushed by the post-event drop.',
      'Attributing a loss to the wrong cause when volatility, not price, moved against you.',
    ],
    related: ['implied-volatility', 'premium', 'theta', 'delta', 'earnings-report'],
  },
  {
    slug: 'implied-volatility',
    term: 'Implied Volatility',
    category: 'options',
    aliases: ['iv', 'vol crush', 'iv crush'],
    short: 'The market’s expectation of future price movement, derived from option prices.',
    explanation: [
      'Implied volatility is backed out of option prices rather than measured from history. It is the volatility the market is currently pricing in.',
      'High IV means expensive options. It typically rises ahead of known events — earnings, decisions, product announcements — and collapses immediately afterward.',
      'That collapse, often called IV crush, can produce a loss on a correctly predicted move because the premium deflated faster than the price gained.',
    ],
    whyItMatters:
      'IV determines whether you are buying options cheaply or expensively. Ignoring it means you may be right about direction and still lose.',
    mistakes: [
      'Buying options into an event without checking whether IV is already elevated.',
      'Comparing IV levels across instruments without reference to their own historical range.',
    ],
    related: ['vega', 'premium', 'extrinsic-value', 'volatility', 'earnings-report'],
    popular: true,
  },
  {
    slug: 'open-interest',
    term: 'Open Interest',
    category: 'options',
    aliases: ['oi'],
    short: 'The total number of option contracts currently outstanding at a given strike.',
    explanation: [
      'Open interest counts contracts that exist and have not been closed or expired. It is distinct from volume, which counts contracts traded today.',
      'Rising open interest with rising volume means new positions are being opened. Falling open interest means positions are being closed out.',
      'Strikes with high open interest tend to have tighter spreads and better liquidity, which materially affects your fill quality.',
    ],
    whyItMatters:
      'Low open interest means wide spreads and difficulty exiting. On options, a bad exit fill can consume a large share of the intended profit.',
    mistakes: [
      'Trading illiquid strikes and losing a significant portion of the edge to spread.',
      'Confusing open interest with volume when assessing activity.',
    ],
    related: ['liquidity', 'spread', 'volume', 'strike-price', 'premium'],
  },
  {
    slug: 'assignment',
    term: 'Assignment',
    category: 'options',
    aliases: ['assigned', 'exercise'],
    short: 'When an option seller is required to fulfill the contract’s obligation.',
    explanation: [
      'When a buyer exercises, a seller somewhere is assigned. A short call seller must deliver shares; a short put seller must buy them.',
      'American-style options can be assigned any time before expiration, though early assignment is most common around dividends and deep in-the-money contracts.',
      'Assignment converts an options position into a stock position, often overnight and often much larger than the trader expected.',
    ],
    whyItMatters:
      'An unexpected assignment can create a position far larger than your account can comfortably hold, turning a defined-risk trade into a margin problem.',
    mistakes: [
      'Holding short in-the-money options through an ex-dividend date.',
      'Assuming assignment can only happen at expiration.',
      'Not knowing what stock position an assignment would create, or whether the account could fund it.',
    ],
    related: ['expiration', 'in-the-money', 'margin', 'dividend', 'call-option'],
  },
];
