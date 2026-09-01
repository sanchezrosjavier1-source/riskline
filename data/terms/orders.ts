import type { Term } from '@/types/dictionary';

export const ordersTerms: Term[] = [
  {
    slug: 'market-order',
    term: 'Market Order',
    category: 'orders',
    aliases: ['market buy', 'market sell'],
    short: 'An instruction to buy or sell immediately at the best price currently available.',
    explanation: [
      'A market order prioritizes certainty of execution over certainty of price. It will fill, and it will fill now — but at whatever the book offers.',
      'Buying with a market order pays the ask. Selling with one hits the bid. In a liquid instrument that difference is a cent; in a thin one it can be several percent.',
      'Large market orders walk the book. The first shares fill at the best price, the rest fill at progressively worse prices as each level is consumed.',
    ],
    whyItMatters:
      'Market orders are the right tool when getting out matters more than getting a good price. They are the wrong tool for building a position in anything illiquid.',
    mistakes: [
      'Using market orders in pre-market or after-hours sessions where spreads balloon.',
      'Placing a market order sized larger than the visible depth of the book.',
      'Using them around news releases when the book momentarily empties.',
    ],
    related: ['limit-order', 'spread', 'slippage', 'liquidity', 'order-book'],
    popular: true,
  },
  {
    slug: 'limit-order',
    term: 'Limit Order',
    category: 'orders',
    aliases: ['limit buy', 'limit sell'],
    short: 'An order to buy or sell at a specified price or better — it may not fill at all.',
    explanation: [
      'A limit order sets your worst acceptable price. A buy limit fills at your price or lower; a sell limit fills at your price or higher.',
      'The tradeoff is the mirror image of a market order: you control price completely and execution not at all. If the market never trades at your level, nothing happens.',
      'Resting limit orders are what make up the order book. When you place one away from the market, you become the liquidity someone else trades against.',
    ],
    whyItMatters:
      'Limit orders let you plan an entry precisely, which keeps your actual stop distance — and therefore your position size — matching the trade you calculated.',
    mistakes: [
      'Setting a limit so far from the market that a good trade is missed for a penny.',
      'Assuming a limit order guarantees a fill when price touches it. You are in a queue.',
      'Forgetting resting limit orders exist until they fill unexpectedly days later.',
    ],
    related: ['market-order', 'order-book', 'time-in-force', 'entry', 'stop-limit-order'],
    popular: true,
  },
  {
    slug: 'stop-order',
    term: 'Stop Order',
    category: 'orders',
    aliases: ['stop market order', 'stop market'],
    short: 'A dormant order that becomes a market order once price reaches a trigger level.',
    explanation: [
      'A stop order does nothing until the market touches its stop price. At that moment it converts into a market order and takes the best price available.',
      'That conversion is the important detail. The stop price is where the order wakes up, not where it fills.',
      'Stop orders work in both directions. A sell stop below the market protects a long position; a buy stop above the market protects a short, or triggers a breakout entry.',
    ],
    whyItMatters:
      'Understanding that a stop is a trigger rather than a guaranteed price is the difference between a risk model that holds up and one that fails in the exact conditions it was built for.',
    mistakes: [
      'Believing the fill will match the stop price during a fast move or an overnight gap.',
      'Placing stops at obvious round numbers where many other stops cluster.',
      'Using a stop order in an illiquid instrument where the resulting market order fills badly.',
    ],
    related: ['stop-loss', 'stop-limit-order', 'slippage', 'gap', 'market-order'],
  },
  {
    slug: 'stop-limit-order',
    term: 'Stop Limit Order',
    category: 'orders',
    aliases: ['stop limit'],
    short: 'A stop order that becomes a limit order instead of a market order when triggered.',
    explanation: [
      'A stop limit has two prices: the stop, which arms the order, and the limit, which caps how bad a fill you will accept.',
      'It solves the slippage problem and creates a worse one. If price blows straight through your limit, the order sits unfilled while the position keeps losing.',
      'It is well suited to entries, where missing a fill is merely disappointing, and poorly suited to protective exits, where not filling is the disaster.',
    ],
    whyItMatters:
      'On a protective stop you are choosing between a bad fill and no fill. In a genuine crash, no fill is far more expensive.',
    mistakes: [
      'Using a stop limit as a protective stop and being left holding a position through a gap.',
      'Setting the limit price identical to the stop price, which makes a fill unlikely in a fast move.',
    ],
    related: ['stop-order', 'stop-loss', 'limit-order', 'slippage', 'gap'],
  },
  {
    slug: 'stop-loss',
    term: 'Stop Loss',
    category: 'orders',
    aliases: ['stop', 'sl', 'protective stop'],
    short: 'A predefined exit that closes a losing trade before the loss becomes serious.',
    explanation: [
      'A stop loss is the price at which your trade idea is proven wrong. It is a statement about the market, not about how much money you feel like losing.',
      'Its location should come from structure — below the swing low that would invalidate a long, or beyond a volatility band the instrument does not usually cross. Only after that do you translate it into money.',
      'The distance between entry and stop is your risk per unit. That single number, divided into your risk budget, is what determines position size. Move the stop and the correct position size changes with it.',
    ],
    formula: {
      label: 'Risk Per Share',
      expression: 'Entry − Stop Loss   (long)   ·   Stop Loss − Entry   (short)',
      legend: [
        { symbol: 'Entry', meaning: 'The price you open the position at' },
        { symbol: 'Stop Loss', meaning: 'The price where the idea is invalidated' },
      ],
    },
    widget: 'stop-distance',
    diagram: 'stop-loss',
    whyItMatters:
      'Without a stop, one trade can undo months of work. With one, every loss is a known, survivable, pre-priced cost of doing business.',
    mistakes: [
      'Setting the stop by dollar comfort rather than by where the setup fails.',
      'Widening the stop while the trade is open, which silently turns a 1% risk into a 3% risk.',
      'Placing stops just beyond obvious levels where liquidity is thickest.',
      'Assuming the stop caps the loss exactly. Gaps and slippage can push the fill well past it.',
    ],
    related: ['position-size', 'risk-per-trade', 'stop-distance', 'take-profit', 'atr-stop'],
    tools: [
      { label: 'Size a trade around your stop', href: '/calculator' },
      { label: 'Position Size Calculator', href: '/tools/position-size' },
    ],
    popular: true,
  },
  {
    slug: 'take-profit',
    term: 'Take Profit',
    category: 'orders',
    aliases: ['tp', 'profit target', 'target'],
    short: 'A predefined price where a winning trade is closed automatically.',
    explanation: [
      'A take profit is a resting limit order at the level where you believe the move is likely to run out. It removes the decision from the moment when greed and fear are loudest.',
      'Its placement should be based on where price is genuinely likely to stall — a prior high, a range boundary, a measured move — rather than on a round profit number.',
      'The target, paired with your stop, defines the trade’s risk/reward ratio. A target too close to the entry can make an otherwise good setup mathematically not worth taking.',
    ],
    diagram: 'risk-reward',
    whyItMatters:
      'The distance to your target relative to your stop determines what win rate you need to break even. Setting targets carelessly means taking trades whose math never worked.',
    mistakes: [
      'Picking a target because it is a round dollar amount rather than a real level.',
      'Setting targets so far away that they are almost never reached.',
      'Taking profit early on winners while holding losers to the full stop, which quietly inverts your risk/reward.',
    ],
    related: ['stop-loss', 'risk-reward-ratio', 'exit', 'trailing-stop', 'limit-order'],
    tools: [{ label: 'Check the risk/reward on your target', href: '/tools/risk-reward' }],
    popular: true,
  },
  {
    slug: 'trailing-stop',
    term: 'Trailing Stop',
    category: 'orders',
    aliases: ['trail stop', 'trailing stop loss'],
    short: 'A stop loss that follows price in your favor and never moves back against you.',
    explanation: [
      'A trailing stop is defined by a distance rather than a fixed price — say $2, or 5%, or one ATR below the highest price reached.',
      'As price advances the stop ratchets along behind it. When price retraces, the stop stays put. It only ever moves in the direction that reduces your risk.',
      'The trail distance is a direct tradeoff. A tight trail locks in gains but gets shaken out by normal noise; a wide trail rides bigger trends but gives back more at the end.',
    ],
    whyItMatters:
      'A trailing stop converts an open profit into a protected one without requiring you to guess the exact top, which is the part nobody does reliably.',
    mistakes: [
      'Trailing so tightly that ordinary intraday noise closes the trade.',
      'Starting to trail before the trade has moved far enough to have a profit worth protecting.',
      'Manually loosening the trail when it gets close, which defeats the entire mechanism.',
    ],
    related: ['stop-loss', 'take-profit', 'atr', 'atr-stop', 'exit'],
  },
  {
    slug: 'bracket-order',
    term: 'Bracket Order',
    category: 'orders',
    aliases: ['bracket', 'entry with stop and target'],
    short: 'An entry order submitted together with its stop loss and take profit.',
    explanation: [
      'A bracket packages all three decisions into one submission: the entry, the level where you are wrong, and the level where you are right.',
      'Once the entry fills, both exits go live. When either one triggers, the other is automatically canceled.',
      'The practical value is that it forces the exits to be defined before the position exists, when you are still thinking clearly.',
    ],
    whyItMatters:
      'Brackets make the disciplined version of a trade the default version. The stop is already working before you have any emotional stake in the outcome.',
    mistakes: [
      'Placing the bracket and then manually widening the stop once the trade is open.',
      'Using identical bracket distances across instruments with very different volatility.',
    ],
    related: ['oco-order', 'stop-loss', 'take-profit', 'entry', 'trading-plan'],
  },
  {
    slug: 'oco-order',
    term: 'OCO Order',
    category: 'orders',
    aliases: ['one cancels other', 'one-cancels-the-other'],
    short: 'A pair of orders where filling one automatically cancels the other.',
    explanation: [
      'One-Cancels-the-Other links two orders so only one can ever execute. The classic use is a stop loss and a take profit on the same open position.',
      'Without the link you risk a dangerous outcome: both exits fill, closing your position and then opening a new one in the opposite direction without you noticing.',
      'OCO pairs are also used for breakout entries — a buy stop above a range and a sell stop below it, taking whichever side breaks first.',
    ],
    whyItMatters:
      'It is the mechanism that lets you leave a trade unattended without risking an accidental reversed position.',
    mistakes: [
      'Placing separate stop and target orders that are not actually linked.',
      'Forgetting an OCO breakout pair is still live long after the setup has expired.',
    ],
    related: ['bracket-order', 'stop-loss', 'take-profit', 'breakout', 'time-in-force'],
  },
  {
    slug: 'fill',
    term: 'Fill',
    category: 'orders',
    aliases: ['execution', 'filled'],
    short: 'The actual execution of an order, at the price and quantity you really received.',
    explanation: [
      'A fill is the moment an order stops being an intention and becomes a position. The fill price — not the price you were watching — is what all of your math runs on.',
      'A single order can produce several fills at different prices as it consumes multiple levels of the book. Your effective entry is the volume-weighted average of them.',
      'Reviewing fills against intended prices is the cheapest audit in trading. Persistent gaps between the two point at order type, timing, or size problems.',
    ],
    whyItMatters:
      'Recalculating your risk from the real fill, not the planned entry, is what keeps your actual exposure equal to the exposure you designed.',
    mistakes: [
      'Journaling planned prices instead of fill prices, which hides the real cost of execution.',
      'Leaving the stop at its planned distance from a fill that came in far away from the intended entry.',
    ],
    related: ['partial-fill', 'slippage', 'entry', 'order-book', 'trading-journal'],
  },
  {
    slug: 'partial-fill',
    term: 'Partial Fill',
    category: 'orders',
    aliases: ['partially filled'],
    short: 'When only part of your order executes and the rest stays open or is canceled.',
    explanation: [
      'Partial fills happen when there is not enough size available at your price. You get what was there; the remainder waits, or is canceled depending on the order’s time in force.',
      'This leaves you with a smaller position than planned, which quietly changes your risk. Half the intended size means half the intended risk — and half the intended reward.',
      'They are common in illiquid instruments, in large orders, and with immediate-or-cancel instructions.',
    ],
    whyItMatters:
      'A partially filled entry paired with a full-size stop calculation means your position no longer matches your plan in either direction.',
    mistakes: [
      'Assuming the whole order filled and managing the trade at the wrong size.',
      'Chasing the unfilled remainder at a worse price, ruining the average entry.',
    ],
    related: ['fill', 'liquidity', 'time-in-force', 'limit-order', 'position-size'],
  },
  {
    slug: 'time-in-force',
    term: 'Time In Force',
    category: 'orders',
    aliases: ['tif', 'day order', 'gtc', 'good til canceled', 'ioc', 'fok'],
    short: 'The instruction that says how long an order stays active before it expires.',
    explanation: [
      'Day orders expire at the close of the session. Good-Til-Canceled orders persist across days until filled or pulled — often with a broker-imposed maximum.',
      'Immediate-Or-Cancel fills whatever it can right now and cancels the rest. Fill-Or-Kill demands the entire quantity instantly or nothing at all.',
      'Some brokers also offer at-the-open and at-the-close instructions that participate only in the auction at either end of the session.',
    ],
    whyItMatters:
      'Time in force decides whether a forgotten order quietly disappears or fires days later into a market that has completely changed.',
    mistakes: [
      'Leaving GTC orders live after the setup that justified them has expired.',
      'Using day orders for a swing-trade stop, leaving the position unprotected overnight.',
    ],
    related: ['limit-order', 'oco-order', 'fill', 'broker', 'extended-hours'],
  },
];
