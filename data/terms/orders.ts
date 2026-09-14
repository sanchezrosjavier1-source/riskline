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
    example: {
      setup: 'A market order for 5,000 shares into a book holding 800 at the ask',
      steps: [
        { label: 'Displayed ask', value: '$31.20 × 800' },
        { label: 'Next levels', value: '$31.26, $31.35, $31.48' },
        { label: 'Average fill', value: '$31.37' },
        { label: 'Cost above the screen price', value: '$850' },
      ],
      body: [
        'A market order says fill me now at whatever is available. It walks the book: the first 800 shares come at $31.20, then the price it pays climbs through each thinner level above until the order is complete.',
        'The quote on the screen was never a promise. It was the price of the first 800 shares, and the trader who read $31.20 and multiplied by 5,000 is $850 out before the position has done anything.',
        'On a liquid large-cap with thousands of shares at every level, this effect is invisible and market orders are entirely reasonable. On a thin name, at the open, or in a fast market, it is the dominant cost of the trade.',
        'The exception is worth stating plainly, because it runs the other way. When you need out of a position that is going wrong, certainty of exit is worth more than price, and that is exactly what a market order buys.',
      ],
    },
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
    example: {
      setup: 'Planning a 60-cent stop, then chasing the entry by 20 cents',
      steps: [
        { label: 'Planned entry', value: '$44.00' },
        { label: 'Stop', value: '$43.40' },
        { label: 'Actual entry after chasing', value: '$44.20' },
        { label: 'Real stop distance', value: '$0.80, not $0.60' },
      ],
      body: [
        'The position was sized for a 60-cent stop. Entering 20 cents higher without moving the stop makes the real distance 80 cents — a third more risk than the number the size was calculated from, on a position that was never resized.',
        'A limit order at $44.00 prevents this by construction. Either the price comes to you and the trade is the one you planned, or it does not and you take nothing. The cost is the trades you miss; the benefit is that every trade you do take has the risk you intended.',
        'Chasing feels like the smaller error because 20 cents is a small number. It is not: risk is measured against the stop distance, and a 20-cent slip on a 60-cent stop is a 33% overrun. Do it habitually and a 1% rule quietly becomes a 1.3% rule.',
        'The honest trade-off is missed opportunity. A limit that never fills on a setup that then works is genuinely annoying, and it is still cheaper than a book full of positions whose real risk nobody recalculated.',
      ],
    },
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
    example: {
      setup: 'A stop at $92 on a stock that gaps to $88.10',
      steps: [
        { label: 'Stop trigger', value: '$92.00' },
        { label: 'Previous close', value: '$95.40' },
        { label: 'Next open', value: '$88.10' },
        { label: 'Loss against plan', value: '$3.90 per share worse' },
      ],
      body: [
        'The stop worked exactly as specified. $92 was never traded — the stock closed at $95.40 and opened at $88.10 — so the order was triggered by the opening print and filled there, because a stop order becomes a market order the moment its level is passed.',
        'That is the distinction the word "stop" hides. It is a trigger, not a price. It guarantees you will be taken out; it guarantees nothing about where.',
        'Most of the time the difference is a cent or two and nobody notices. It matters on gaps, on news, and in fast markets — which is to say, precisely in the conditions the stop was bought for.',
        'The practical answer is not to abandon stops, which is the wrong lesson. It is to size positions so that a gap of the size this instrument actually produces is survivable, and to know that overnight and weekend risk is not covered by any order type.',
      ],
    },
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
    example: {
      setup: 'A stop-limit at $92 trigger, $91.50 limit, on a day the stock falls to $80',
      steps: [
        { label: 'Trigger', value: '$92.00' },
        { label: 'Limit', value: '$91.50' },
        { label: 'Prices traded', value: '$92.00 → $80.00' },
        { label: 'Position at the close', value: 'still open' },
      ],
      body: [
        'The trigger fired correctly at $92 and placed a limit order to sell at $91.50 or better. Price went straight through and never came back, so the limit sat unfilled while the stock fell another $11.50 with the trader still fully exposed.',
        'That is the trade-off in one line. A stop-limit protects you from a terrible fill by accepting the possibility of no fill at all, and no fill is unbounded. A plain stop guarantees the exit and accepts whatever price the market offers, which is bounded by the exit happening.',
        'Which one is right depends on why the order exists. For taking profit, or entering on a breakout, a limit is sensible: missing the trade costs you an opportunity. For protection it is usually the wrong instrument, because missing the exit costs you the account.',
        'The failure mode is especially cruel because the order looks like it is working. It is live, it is visible on the platform, and it will keep being visible all the way down.',
      ],
    },
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
    example: {
      setup: 'The same losing trade, held and stopped',
      steps: [
        { label: 'Entry', value: '$50.00' },
        { label: 'Stop at $48.30', value: '−$1.70 per share' },
        { label: 'Price four weeks later', value: '$38.40' },
        { label: 'Difference', value: '6.8× the planned loss' },
      ],
      body: [
        'Nothing unusual happens in this story. The trade is simply wrong, the way roughly half of all trades are wrong, and the only variable is whether an order was sitting there to end it.',
        'With the stop, the loss is $1.70 a share — a number chosen in advance, sized so the account barely notices, and forgotten by the following week. Without it, the position is still open at $38.40 and the trader now owns a decision they never consciously made: to risk 6.8 times what they intended.',
        'The reason the second version happens is not carelessness. It is that closing a losing position converts a temporary, deniable loss into a permanent, recorded one, and the mind will produce a great deal of analysis to avoid that. A resting order is not susceptible to any of it.',
        'That is really what a stop buys. Not a better exit price — often it is a worse one — but a decision made while calm, executing at a moment when you are not.',
      ],
    },
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
    example: {
      setup: 'A target set at resistance versus a target set at a round number',
      steps: [
        { label: 'Entry', value: '$27.40' },
        { label: 'Stop', value: '$26.60 (−$0.80)' },
        { label: 'Target at prior high $29.00', value: '+$1.60 = 1:2' },
        { label: 'Target at $30.00', value: '+$2.60 = 1:3.25' },
      ],
      body: [
        'The second target has the better ratio on paper, and it is the worse trade. $29.00 is where the stock turned back last time, so it is where sellers are waiting; $30.00 is a number that looks tidy on a screen. Moving the target through known resistance to improve the ratio does not improve the odds of getting there — it just moves the exit past the place the move is likely to stop.',
        'This is the most common way a risk/reward ratio gets manufactured. The ratio is arithmetic and will report whatever you feed it, so a target chosen to make 1:3 appear will produce 1:3 and a lower hit rate that no spreadsheet shows.',
        'The discipline is to set the target where price is plausibly going, read whatever ratio that produces, and then decide whether to take the trade. If the honest ratio is 1:1.2, the answer is usually to pass — not to move the target until the number looks acceptable.',
        'Costs land on this side hardest. Spread and commission come out of the winning leg, so a thin target loses a larger share of itself than a distant one does.',
      ],
    },
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
    example: {
      setup: 'A $1.50 trailing stop on a move from $40 to $47',
      steps: [
        { label: 'Entry', value: '$40.00' },
        { label: 'Highest price reached', value: '$47.00' },
        { label: 'Stop ratchets to', value: '$45.50' },
        { label: 'Locked in', value: '+$5.50 per share' },
      ],
      body: [
        'The stop follows the high and never retreats. At $42 it sits at $40.50, at $45 it sits at $43.50, at $47 it sits at $45.50 — and if price then falls back, it stays at $45.50 while the position closes there.',
        'What this solves is the problem of the exact top, which nobody identifies reliably and everybody tries to. The trailing stop does not try. It accepts giving back a fixed amount from the high in exchange for never having to decide when the move is over.',
        'The width is the entire design. Too tight and normal pullbacks — the ones every trend makes — take you out near the start of the move; $1.50 on a stock with an average daily range of $2.00 will not survive a single ordinary session. Too wide and you hand back most of the profit before it triggers.',
        'One thing it does not do is improve your accounting. R-multiples are measured against the original stop, not the trailed one, or a routine trade starts reporting as a five-bagger and the track record stops meaning anything.',
      ],
    },
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
    example: {
      setup: 'One ticket: entry, stop and target submitted together',
      steps: [
        { label: 'Entry limit', value: '$18.20' },
        { label: 'Stop', value: '$17.60' },
        { label: 'Target', value: '$19.40' },
        { label: 'Orders live the moment you fill', value: 'both' },
      ],
      body: [
        'The stop and the target are attached before the position exists. The instant the entry fills, both are working — no window in which the trade is open and unprotected, and no separate action required from a trader who is now watching a live position instead of a plan.',
        'That window is where discipline actually fails. It is very easy to intend to place a stop and then not do it, because by the time the entry fills the trade is already moving and every instinct says watch it for a moment first. A bracket removes the opportunity to make that decision badly.',
        'It also forces the ratio to be stated up front. You cannot submit this ticket without naming both exits, which means the risk/reward is decided while you are still deciding whether to take the trade at all — rather than discovered afterwards, when the answer can no longer change anything.',
        'Two things worth checking on your platform: whether filling one leg automatically cancels the other, and what happens to the bracket on a partial fill. The answers differ between brokers, and finding out during a live trade is expensive.',
      ],
    },
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
    example: {
      setup: 'What happens without the cancel half of the pair',
      steps: [
        { label: 'Position', value: 'long 300 shares' },
        { label: 'Target fills at $19.40', value: 'position closed, flat' },
        { label: 'Stop at $17.60', value: 'still live' },
        { label: 'If price later reaches $17.60', value: 'short 300 shares' },
      ],
      body: [
        'The target filled, the trade is over, and the account is flat. But the protective stop was a separate sell order and nobody cancelled it, so it is still resting in the market. Price drifts down over the following days, touches $17.60, and the order does what sell orders do — except there is nothing left to sell, so it opens a short.',
        'The trader now holds a position in the opposite direction to their original view, on an instrument they stopped following, with no stop attached to it. Usually they find out from the statement.',
        'One-cancels-other exists precisely to make this impossible. The two exits are linked: whichever fills first kills the other automatically, so the pair cannot outlive the position it was protecting.',
        'It is the small piece of plumbing that makes unattended trading safe, and it is why brackets are built on top of it rather than on two independent orders.',
      ],
    },
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
    example: {
      setup: 'Planned at $12.00, filled at $12.09',
      steps: [
        { label: 'Planned entry', value: '$12.00' },
        { label: 'Planned stop', value: '$11.70 (−$0.30)' },
        { label: 'Actual fill', value: '$12.09' },
        { label: 'Real risk per share', value: '$0.39, not $0.30' },
      ],
      body: [
        'Nine cents of slippage on a twelve-dollar stock is nothing to look at. Against a 30-cent stop it is 30% more risk than the position was sized for, and the position has already been placed at the old size.',
        'This is why the fill, not the plan, is the number that belongs in the journal. The plan describes a trade you considered; the fill describes the trade you own. Everything downstream — risk in currency, R-multiple, the ratio to the target — has to be recomputed from it or the whole record drifts.',
        'There are two honest responses and neither is to ignore it. Trim the position so the risk matches what was intended, or accept the larger risk deliberately and write it down as such. The one that causes damage is the third: keep the size, keep the original number in the journal, and let the account run hotter than the spreadsheet believes.',
        'Across hundreds of trades this is how a carefully designed 1% rule turns into something closer to 1.3%, without a single rule ever being consciously broken.',
      ],
    },
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
    example: {
      setup: 'An order for 1,000 shares that fills 340',
      steps: [
        { label: 'Ordered', value: '1,000 shares' },
        { label: 'Filled', value: '340 shares' },
        { label: 'Risk actually taken', value: '34% of planned' },
        { label: 'Stop order still sized for', value: '1,000' },
      ],
      body: [
        'The price came to the limit, took 340 shares, and moved away. The position is real but it is a third of the intended size, and every number attached to it is now wrong: the risk is a third of plan, the profit at target is a third, and the protective stop — if it was entered separately for the full amount — is sized for a position that does not exist.',
        'That last part is the dangerous one. A stop for 1,000 shares against a 340-share position will close the 340 and open a 660-share short, in exactly the way a stale one-cancels-other leg does.',
        'The decision itself is genuinely awkward. Complete the position at a worse price and the average entry moves against you, widening the real stop distance. Leave it at 340 and a correct call pays a third of what the analysis was worth. Neither is wrong; what is wrong is not noticing.',
        'The habit that prevents all of it: before doing anything else, read what actually filled, and make the exits match that number rather than the number you typed.',
      ],
    },
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
    example: {
      setup: 'A good-till-cancelled limit that fills eleven days later',
      steps: [
        { label: 'Order placed', value: 'buy limit $61.00' },
        { label: 'Day order would have', value: 'expired that evening' },
        { label: 'GTC instead', value: 'rests until filled' },
        { label: 'Filled on day 11', value: 'after an earnings miss' },
      ],
      body: [
        'The limit was placed on a Monday, on a thesis that made sense that Monday. It did not fill, the trader moved on, and the order stayed in the market. Eleven days later the company missed earnings, the stock fell through $61, and the order bought exactly as instructed.',
        'The instruction was obeyed. The reasoning behind it had expired a week and a half earlier, and the fill arrives into a situation that is the opposite of the one the trade was designed for — with no stop attached, because the bracket was never set up.',
        'That is the whole of what time in force decides: whether a forgotten order dies quietly at the close or waits patiently for the day it can do the most damage. Day orders forget for you. GTC remembers, including things you would rather it did not.',
        'Neither is better in the abstract. GTC suits a level you genuinely want for weeks; a day order suits a setup that is only valid in today’s conditions. What causes trouble is picking one out of habit and then not reviewing the open-orders screen.',
      ],
    },
    whyItMatters:
      'Time in force decides whether a forgotten order quietly disappears or fires days later into a market that has completely changed.',
    mistakes: [
      'Leaving GTC orders live after the setup that justified them has expired.',
      'Using day orders for a swing-trade stop, leaving the position unprotected overnight.',
    ],
    related: ['limit-order', 'oco-order', 'fill', 'broker', 'extended-hours'],
  },
];
