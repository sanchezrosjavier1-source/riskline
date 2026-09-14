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
    example: {
      setup: 'Four calls at $2.35 on a $60,000 account risking 1%',
      steps: [
        { label: 'Premium per contract', value: '$235' },
        { label: 'Risk budget at 1%', value: '$600' },
        { label: 'Contracts affordable', value: '2' },
        { label: 'Maximum loss', value: '$470, fully known' },
      ],
      body: [
        'Sizing a long call is the cleanest calculation in trading, because the maximum loss is the premium and nothing else. Two contracts at $235 puts $470 at risk, full stop — no stop order required, no gap risk, no slippage on the exit that matters.',
        'The trap is that the number sounds small and the leverage is enormous. Two contracts control 200 shares, which at $58 is $11,600 of exposure for $470. That ratio is why traders buy eight contracts instead of two: the premium still looks modest and the risk is now $1,880, or 3.1% of the account.',
        'The other half of the arithmetic is how often the full loss happens. Unlike a stock position, where a total loss is remote, an option expiring out of the money is worth exactly zero and that is an ordinary outcome rather than a disaster scenario.',
        'So the honest framing is that the risk per contract is certain and the frequency of realising it is high. Size as though the premium will be lost, because a meaningful share of the time it will be.',
      ],
    },
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
    example: {
      setup: 'A protective put against the gap that defeats a stop',
      steps: [
        { label: 'Holding', value: '100 shares at $95.40' },
        { label: 'Put strike', value: '$90.00' },
        { label: 'Stock gaps to', value: '$78.00' },
        { label: 'Still able to sell at', value: '$90.00' },
      ],
      body: [
        'A stop at $90 would have filled at $78, because a stop is an instruction to trade at the next available price and the next available price was twelve dollars lower. The put is not an instruction — it is a right to sell at $90, and a right does not care what the market opened at.',
        'That is the one thing options do that no order type can. The floor holds through gaps, halts and illiquidity, because it is a contractual entitlement rather than a request to the order book.',
        'It is not free, and the premium is the honest comparison. A stop costs nothing to place and fails exactly when it is needed; a put costs real money every time and works precisely then. Whether that is worth paying depends on the size of the position and the likelihood of a gap — which is why puts are bought around earnings and rarely in quiet stretches.',
        'The protection also expires. A put bought for three weeks protects for three weeks, and the position is uncovered afterwards unless another one is bought, which makes it a recurring cost rather than a one-off.',
      ],
    },
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
    example: {
      setup: 'Three strikes on the same bullish view, stock at $58',
      steps: [
        { label: '$55 call', value: '$4.20 — already in the money' },
        { label: '$60 call', value: '$1.80 — needs +3.4%' },
        { label: '$70 call', value: '$0.22 — needs +20.7%' },
        { label: 'Break-even on the $70', value: '$70.22' },
      ],
      body: [
        'The $70 call is cheap for a reason that the price tag hides: it requires the stock to rise more than a fifth, before expiry, merely to be worth anything at all. Break-even is $70.22, so even a 20% rally to $69 pays exactly zero.',
        'The cheapness is what makes it attractive and it is the same thing as the improbability. Options are priced by the market’s estimate of how likely each outcome is, so a strike that costs a tenth of another is, roughly speaking, being judged far less likely to pay.',
        'The $55 call is the opposite trade dressed in the same thesis. It costs more, moves closer to one-for-one with the stock, and pays on a modest rise — less leverage, far less dependence on being right about the size of the move.',
        'Choosing a strike is therefore not about what fits the budget. It is a statement about how far and how fast, and the trader who buys the cheapest strike is usually making a much more specific prediction than they realise.',
      ],
    },
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
    example: {
      setup: 'The thesis was correct, and the option expired first',
      steps: [
        { label: 'Call bought', value: '$65 strike, 30 days' },
        { label: 'Stock at expiry', value: '$63.80' },
        { label: 'Option worth', value: '$0' },
        { label: 'Stock nine days later', value: '$71.40' },
      ],
      body: [
        'The view was right. The stock did exactly what was expected and did it nine days after the contract ceased to exist, which for the holder is indistinguishable from having been wrong.',
        'This is the property that makes options fundamentally different from shares. A stock position can be wrong for a year and still be rescued; an option has a date attached, and after that date being right is worth nothing.',
        'It means an options trade requires two predictions rather than one — direction and timing — and the second is considerably harder. A trader who would confidently say "this goes up" is often much less confident saying "this goes up within four weeks", and the option requires the second statement.',
        'Which is why buying more time is usually money well spent. A longer-dated contract costs more premium and decays more slowly, and it removes the failure mode where the analysis was sound and the calendar was not.',
      ],
    },
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
    example: {
      setup: 'Why a $3.10 option costs $310',
      steps: [
        { label: 'Quoted premium', value: '$3.10' },
        { label: 'Contract multiplier', value: '100' },
        { label: 'Cost per contract', value: '$310' },
        { label: 'Five contracts', value: '$1,550' },
      ],
      body: [
        'Premiums are quoted per share and options are sold per hundred, so every number on the screen is a hundredth of what leaves the account. It is the single most common arithmetic error new options traders make, and it is off by two orders of magnitude.',
        'Once the multiplier is applied, the sizing is straightforward. Premium times 100 is the maximum loss per contract, so the risk budget divided by that figure is the number of contracts — no stop distance, no slippage, no gap adjustment.',
        'What the premium is made of matters for what happens next. Part of it is intrinsic value, which is real and survives to expiry; the rest is extrinsic, which decays to zero on a schedule. Paying $3.10 for a contract with no intrinsic value is buying something that is guaranteed to be worthless if nothing happens.',
        'The bid-ask spread deserves a mention too. Options spreads are much wider than stock spreads, and a 15-cent spread is $15 per contract on the way in and again on the way out — a meaningful share of a small premium.',
      ],
    },
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
    example: {
      setup: 'Splitting a $6.40 premium into its two parts',
      steps: [
        { label: 'Stock', value: '$104.00' },
        { label: 'Call strike', value: '$100.00' },
        { label: 'Intrinsic value', value: '$4.00' },
        { label: 'Extrinsic value', value: '$2.40' },
      ],
      body: [
        'Four dollars of this premium is not an estimate of anything. The right to buy at $100 something trading at $104 is worth $4 today and would be worth $4 if expiry were this afternoon. That portion cannot decay, because it is arithmetic rather than expectation.',
        'The remaining $2.40 is the market’s price for what might still happen before expiry, and it is the part with a deadline. Hold to expiration with the stock unchanged and that $2.40 is gone, leaving a contract worth exactly $4.',
        'Making the split explicit answers a question that otherwise has no obvious answer: what am I actually paying for? A deep in-the-money option is mostly intrinsic, so it behaves much like the stock and decays slowly. A far out-of-the-money option is entirely extrinsic, so all of it is on a timer.',
        'It also sets the floor. An in-the-money option cannot fall below its intrinsic value, which is a genuine structural difference from one that has none — the second can reach zero, and routinely does.',
      ],
    },
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
    example: {
      setup: 'The same option, 45 days out and 7 days out',
      steps: [
        { label: '45 days: extrinsic value', value: '$2.40' },
        { label: '21 days: extrinsic value', value: '$1.55' },
        { label: '7 days: extrinsic value', value: '$0.60' },
        { label: 'At expiry', value: '$0' },
      ],
      body: [
        'The destination is certain. Extrinsic value is zero at expiration on every option ever written, and the only question is the path — which is not a straight line. Decay accelerates as expiry approaches, so the final week gives up far more per day than the first.',
        'That shape explains a common and expensive mistake. A short-dated option looks cheap because its total premium is small, and it is losing value fastest of all — the buyer is paying the highest rate of decay for the least remaining time.',
        'It is the reason an option trade needs a view on timing. Holding a stock that goes sideways costs nothing; holding an option that goes sideways costs the extrinsic value, charged daily, whether or not anything happens.',
        'And it is why the same decay is what option sellers are collecting. Every day the buyer loses to time, someone on the other side gains it — which makes selling premium a genuinely different business with genuinely different risks, not simply the opposite trade.',
      ],
    },
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
    example: {
      setup: 'A deep in-the-money call as a substitute for the shares',
      steps: [
        { label: 'Stock', value: '$104.00' },
        { label: '$85 call', value: '$20.10 — delta 0.92' },
        { label: 'Capital for 100 shares', value: '$10,400' },
        { label: 'Capital for the call', value: '$2,010' },
      ],
      body: [
        'With a delta of 0.92 this contract moves almost one-for-one with the stock, so it behaves like owning 92 shares while tying up a fifth of the capital. Almost all of the premium is intrinsic value, which means very little of it is exposed to time decay.',
        'That is the trade being made: giving up the explosive convexity of an out-of-the-money option in exchange for something that tracks the underlying reliably and does not need the move to happen by a particular date.',
        'It is not free of the things that make options options. The $20.10 is still the maximum loss, and losing all of it requires the stock to fall below $85 — a 19% decline, unlikely but entirely possible, and a far larger loss than a stop on the shares would have produced.',
        'The costs to weigh are the spread, which is wider than the stock’s, and the absence of dividends, which the shareholder receives and the option holder does not.',
      ],
    },
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
    example: {
      setup: 'Twenty weekly lottery tickets at $0.18',
      steps: [
        { label: 'Cost per contract', value: '$18' },
        { label: 'Twenty contracts', value: '$360' },
        { label: 'Move required to break even', value: '+9%, within days' },
        { label: 'Most likely outcome', value: '$0' },
      ],
      body: [
        'Three hundred and sixty dollars does not feel like a serious risk, and that is the whole problem. The position is not risky because it is large; it is risky because the likeliest single outcome is losing all of it, and that outcome arrives most weeks.',
        'The maths is not hidden. The option costs eighteen dollars because the market judges a 9%-plus move in a few days to be improbable, and improbable things are improbable whether or not the ticket is cheap. Buying twenty of them does not diversify anything — it is one bet, taken twenty times, on the same move.',
        'What makes it so common is the shape of the payoff. The rare win is spectacular and memorable, the frequent total losses are small and forgettable, and the memory of the one overwhelms the arithmetic of the many.',
        'Used deliberately these contracts have a place — as a small, explicitly speculative slice of an account, sized as money already spent. Used as a way to make a small account grow quickly, they are the fastest route to it not growing at all.',
      ],
    },
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
    example: {
      setup: 'Turning six contracts into a share count',
      steps: [
        { label: 'Contracts', value: '6' },
        { label: 'Delta per contract', value: '0.38' },
        { label: 'Shares per contract', value: '100' },
        { label: 'Equivalent exposure', value: '228 shares' },
      ],
      body: [
        'Six times 0.38 times 100 gives 228. That single number is what makes an options position comparable to everything else in the account: the trader is, for the moment, long the equivalent of 228 shares, and can size it against the same rules used for stock.',
        'The phrase "for the moment" is doing real work. Delta is not fixed — it rises as the option moves into the money and falls as it moves out — so the 228 is a snapshot. A 5% rally might make it 340 without a single additional contract being bought.',
        'Delta is also frequently described as the probability of expiring in the money, and as a rough approximation that is useful. A 0.38 delta option is, loosely, a bit better than a one-in-three shot, which is a more sobering way to read the same position.',
        'Its practical value is that it makes options positions auditable. Without it, "six contracts" means nothing next to "200 shares"; with it, both are exposure, and portfolio heat can be calculated across them.',
      ],
    },
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
    example: {
      setup: 'A position that doubles in size without a trade being placed',
      steps: [
        { label: 'Stock at $50', value: 'delta 0.50 → 500 shares' },
        { label: 'Stock at $52', value: 'delta 0.74 → 740 shares' },
        { label: 'Stock at $48', value: 'delta 0.26 → 260 shares' },
        { label: 'Contracts held throughout', value: '10' },
      ],
      body: [
        'Nothing was bought or sold. The same ten contracts represent 260 shares of exposure at one price and 740 at another, because delta itself moves — and gamma is the rate at which it moves.',
        'This is why short-dated at-the-money options feel so unstable to hold. Gamma is highest exactly there: close to the strike, close to expiry, where a small move in the underlying flips the option between likely-worthless and likely-profitable.',
        'For a buyer that cuts favourably. Exposure expands as the trade works and contracts as it fails, which is the convexity people are paying for when they buy options in the first place.',
        'For a seller it is the reverse and it is the main hazard of the business. A short option position grows against you as price moves, so a manageable exposure becomes a large one precisely when the move is going the wrong way — which is why selling short-dated options near the strike demands far more attention than the premium suggests.',
      ],
    },
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
    example: {
      setup: 'Theta of −0.09 across a flat week',
      steps: [
        { label: 'Theta per day', value: '−$9 per contract' },
        { label: 'Contracts held', value: '4' },
        { label: 'Cost per day', value: '−$36' },
        { label: 'Seven days, stock unchanged', value: '−$252' },
      ],
      body: [
        'The stock did nothing all week and the position lost $252. No mistake was made and no order was filled; the calendar simply advanced, and the part of the premium that was paying for future possibility had a week less to justify itself.',
        'This is the clearest way in which options differ from shares. A stock position that goes sideways costs nothing to hold. An option position that goes sideways has a running meter, and the meter charges on weekends too.',
        'The rate is not constant. Theta accelerates as expiry approaches and is largest for at-the-money options with little time left — which are exactly the contracts that look cheapest to a trader shopping by price.',
        'The practical consequence is that direction alone is not a thesis. The trade needs the move to happen within a window, and buying more time is the straightforward way to widen that window, at the cost of more premium up front.',
      ],
    },
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
    example: {
      setup: 'Right about the earnings, wrong about the volatility',
      steps: [
        { label: 'Implied volatility before', value: '78%' },
        { label: 'Implied volatility after', value: '39%' },
        { label: 'Stock move', value: '+4%, as hoped' },
        { label: 'Call premium', value: 'lower than before' },
      ],
      body: [
        'The direction was correct and the position lost money. This is the outcome that makes people give up on options, and it is entirely explicable: the call was bought when implied volatility was 78%, and part of the premium was paying for that uncertainty. Once the results were out, the uncertainty was gone.',
        'Vega measures exactly this sensitivity — how much the option price moves per point of implied volatility. A 39-point collapse against a meaningful vega overwhelms the gain from a 4% move in the underlying.',
        'The phenomenon has a name, volatility crush, and it is not an accident or a market failure. It is the predictable consequence of buying an option precisely when the event it is priced around is most uncertain, and holding it through the moment that uncertainty resolves.',
        'Which is why the practical question before any earnings trade is not only "which way" but "what is implied volatility, and what will it be afterwards". Buying a 78% IV option to trade an event is paying a price that is designed to fall.',
      ],
    },
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
    example: {
      setup: 'The same strike at 28% IV and at 71% IV',
      steps: [
        { label: 'At 28% IV', value: 'premium $1.15' },
        { label: 'At 71% IV', value: 'premium $2.95' },
        { label: 'Strike, expiry, stock', value: 'identical' },
        { label: 'Extra move needed to break even', value: 'much larger' },
      ],
      body: [
        'Same contract, same underlying, same date — and more than twice the price. The difference is entirely the market’s estimate of how much the stock will move, and that estimate is baked into what you pay.',
        'Implied volatility is therefore not a forecast you can act on directly; it is the price of the trade. Buying at 71% means the move has to be bigger than the already-elevated expectation in order to pay, which is a much harder claim than simply "this goes up".',
        'The useful comparison is against the same instrument’s own history rather than against other stocks. A biotech at 60% may be quiet by its standards while a utility at 60% is extraordinary, so the question is always whether IV is high or low for this thing.',
        'It also determines which side of the trade makes sense. High IV favours selling premium, low IV favours buying it — and a trader who only ever buys options is, by construction, paying whatever the market is asking regardless of whether it is cheap.',
      ],
    },
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
    example: {
      setup: 'Two strikes, and the cost of exiting each',
      steps: [
        { label: 'Strike A open interest', value: '4,200 — spread $0.05' },
        { label: 'Strike B open interest', value: '18 — spread $0.65' },
        { label: 'Round trip on A', value: '$10 per contract' },
        { label: 'Round trip on B', value: '$130 per contract' },
      ],
      body: [
        'Open interest counts the contracts currently outstanding at that strike, which is a direct read on whether anyone else is trading it. Four thousand means a functioning market; eighteen means you are likely to be the only participant when you want out.',
        'The cost shows up in the spread, and on options it is brutal. Sixty-five cents is $65 per contract each way, so entering and exiting Strike B costs $130 before the trade has done anything — frequently more than the profit the trade was aiming for.',
        'The failure is on the exit rather than the entry, which is why it surprises people. Getting in is optional and can be worked with a limit order; getting out of a position that is going wrong is not optional, and a thin strike will make you pay for the urgency.',
        'The rule that follows is to trade where the volume already is: near-the-money strikes, standard monthly expirations, liquid underlyings. A slightly less perfect strike with a real market beats an ideal one nobody else is trading.',
      ],
    },
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
    example: {
      setup: 'A $340 credit that becomes a $46,000 position',
      steps: [
        { label: 'Sold', value: '5 puts, $92 strike' },
        { label: 'Premium collected', value: '$340' },
        { label: 'Assigned', value: '500 shares at $92' },
        { label: 'Obligation', value: '$46,000' },
      ],
      body: [
        'Selling the puts felt small: $340 collected, five contracts, a strike comfortably below the current price. Then the stock fell through $92, the options were assigned, and the account is required to buy 500 shares for $46,000 — an obligation roughly a hundred and thirty times the premium.',
        'This is the asymmetry that defines short options. The credit is fixed and known; the obligation behind it is the full value of the underlying, and it lands on a Monday morning as a margin call rather than as a choice.',
        'Assignment can also arrive early. American-style options may be exercised at any time before expiry, and it becomes considerably more likely around an ex-dividend date on a call you are short — which is a calendar event rather than a market one.',
        'The practical guard is to ask, before selling any option, whether the account could actually take delivery of the underlying position. If the answer is no, the trade is not defined-risk, whatever the premium suggests.',
      ],
    },
    mistakes: [
      'Holding short in-the-money options through an ex-dividend date.',
      'Assuming assignment can only happen at expiration.',
      'Not knowing what stock position an assignment would create, or whether the account could fund it.',
    ],
    related: ['expiration', 'in-the-money', 'margin', 'dividend', 'call-option'],
  },
];
