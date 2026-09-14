import type { Term } from '@/types/dictionary';

export const basicsTerms: Term[] = [
  {
    slug: 'bid',
    term: 'Bid',
    category: 'basics',
    aliases: ['bid price', 'best bid'],
    short: 'The highest price a buyer is currently willing to pay for an asset.',
    explanation: [
      'Every market is really two prices at once. The bid is the buying side: the best price someone has publicly committed to pay right now.',
      'If you want to sell immediately, the bid is the price you get. You are not selling at "the price" you see quoted on a news site — you are selling into whatever buyer is standing closest to the market.',
      'Bids sit in the order book stacked by price. The best bid is the top of that stack, and behind it are lower bids waiting in line.',
    ],
    diagram: 'order-book',
    whyItMatters:
      'The bid is half of your real entry and exit cost. A trade plan built on the last traded price rather than the bid and ask will consistently miss by the width of the spread.',
    example: {
      setup: 'A stop at $30.00 with the bid sitting at $29.94',
      steps: [
        { label: 'Last traded price', value: '$30.02' },
        { label: 'Bid', value: '$29.94' },
        { label: 'Ask', value: '$30.02' },
        { label: 'A market sell fills at', value: '$29.94' },
      ],
      body: [
        'The chart shows $30.02 and that is the ask — the price someone will sell to you. Selling is the other side of the book, and the best available buyer is bidding $29.94. Eight cents lower, before anything has gone wrong.',
        'This matters most on the exit, which is where the bid does its work. A stop set at $30.00 does not get $30.00; it gets whatever the bid is when the order becomes a market order, and on a thin book that is lower still as the order eats through the resting buyers.',
        'So a risk calculation built on chart prices is optimistic on both legs — buying at the ask, selling at the bid — and the error is the full spread on every round trip. On liquid instruments that is a rounding error. On anything else it is a permanent tax that never appears in the plan.',
      ],
    },
    mistakes: [
      'Assuming you can sell at the last traded price. You sell at the bid.',
      'Ignoring how much size sits at the bid. A large sell order can eat through it and fill far worse than expected.',
    ],
    related: ['ask', 'spread', 'liquidity', 'order-book', 'slippage'],
    popular: true,
  },
  {
    slug: 'ask',
    term: 'Ask',
    category: 'basics',
    aliases: ['offer', 'ask price', 'best offer'],
    short: 'The lowest price a seller is currently willing to accept for an asset.',
    explanation: [
      'The ask — also called the offer — is the selling side of the market. It is the cheapest price at which someone will hand you the asset right now.',
      'If you buy immediately with a market order, you pay the ask. That is why a position is usually showing a small loss the instant it opens: you bought at the ask and it is being marked against the bid.',
      'The ask always sits above the bid. The distance between them is the spread, and it is the first cost of every trade.',
    ],
    diagram: 'order-book',
    whyItMatters:
      'Your entry price on a market buy is the ask, not the number on the chart. On wide-spread instruments that difference can be a meaningful share of your expected profit.',
    example: {
      setup: 'Buying 500 shares when only 200 are offered at the ask',
      steps: [
        { label: 'Best ask', value: '$14.10 × 200' },
        { label: 'Next ask', value: '$14.14 × 150' },
        { label: 'Next ask', value: '$14.19 × 400' },
        { label: 'Average paid', value: '$14.145' },
      ],
      body: [
        'The screen says $14.10 and 200 shares are available there. The remaining 300 come from higher levels, so the real average entry is $14.145 — four and a half cents above the quote, on a purchase nobody would describe as large.',
        'The ask is the price of the next share, not of your order. How far your order climbs past it depends entirely on how much size is resting at each level, which is a property of the instrument rather than of your intention.',
        'For a trade with a 30-cent stop, four and a half cents is 15% of the risk budget, spent before the position exists. This is the argument for limit orders on entries in anything but the deepest instruments: on the way in you can usually afford to wait, and waiting is free.',
      ],
    },
    mistakes: [
      'Planning an entry from the chart price and being surprised by the fill.',
      'Buying at the ask on illiquid instruments where a limit order a few cents lower would have filled anyway.',
    ],
    related: ['bid', 'spread', 'limit-order', 'market-order', 'slippage'],
    popular: true,
  },
  {
    slug: 'spread',
    term: 'Spread',
    category: 'basics',
    aliases: ['bid-ask spread', 'bid ask spread'],
    short: 'The gap between the bid and the ask — the built-in cost of entering a trade.',
    explanation: [
      'The spread is what you pay for immediacy. Buy at the ask, sell at the bid, and the difference is gone before the trade has done anything.',
      'Highly liquid instruments have tight spreads — often a single cent on a large-cap stock. Thin instruments can have spreads of several percent, which quietly destroys short-term strategies.',
      'Spreads widen when liquidity dries up: outside regular hours, around news, and in fast-moving markets. The same instrument can be cheap to trade at 11am and expensive at 4:01pm.',
    ],
    formula: {
      label: 'Spread',
      expression: 'Ask − Bid',
      legend: [
        { symbol: 'Spread %', meaning: '(Ask − Bid) ÷ Ask × 100' },
        { symbol: 'Round-trip cost', meaning: 'Spread × Position Size' },
      ],
    },
    widget: 'spread',
    diagram: 'spread',
    whyItMatters:
      'The spread is a fixed tax on every round trip. If your average winner is 0.5% and the spread is 0.2%, nearly half your edge is gone before commissions.',
    example: {
      setup: 'A 0.2% spread against a 0.5% average winner',
      steps: [
        { label: 'Average winning trade', value: '+0.50%' },
        { label: 'Spread paid per round trip', value: '0.20%' },
        { label: 'Net per winner', value: '+0.30%' },
        { label: 'Share of the edge lost', value: '40%' },
      ],
      body: [
        'Two fifths of the strategy belongs to the spread. Not to a bad month, not to a mistake — to the mechanical cost of getting in at the ask and out at the bid, charged identically on every trade whether it wins or loses.',
        'The ratio is what makes this decisive rather than annoying. A trader holding for 5% moves pays the same 0.2% and loses 4% of the edge; a scalper working 0.5% moves loses 40%. Same instrument, same cost, completely different business.',
        'This is why spread — not commission, which is usually smaller — is the first thing to check before shortening a timeframe. Trading more often multiplies the tax while the edge per trade shrinks, and the two move in opposite directions faster than most people expect.',
        'It also widens exactly when you need it not to. Quoted spreads are peacetime figures; during news, at the open, and in a fast market they can be several times as wide, which is when stop orders are filling.',
      ],
    },
    mistakes: [
      'Scalping instruments whose spread is a large fraction of the target move.',
      'Trading at the open or close without checking that the spread has normalized.',
      'Comparing brokers on commission alone while ignoring much wider spreads.',
    ],
    related: ['bid', 'ask', 'liquidity', 'slippage', 'market-order'],
    popular: true,
  },
  {
    slug: 'liquidity',
    term: 'Liquidity',
    category: 'basics',
    aliases: ['liquid', 'illiquid', 'depth'],
    short: 'How easily an asset can be bought or sold without moving its price.',
    explanation: [
      'A liquid market has many buyers and sellers at closely spaced prices. You can put size in and take it out again without the price noticing.',
      'An illiquid market has gaps in the order book. Your own order becomes the news: it pushes price away from you on the way in, and there is nobody to sell to on the way out.',
      'Liquidity is not constant. The same stock is deeply liquid at midday and thin in after-hours trading. Liquidity also disappears exactly when you most want it — during a sharp sell-off.',
    ],
    diagram: 'liquidity',
    whyItMatters:
      'Liquidity determines whether your stop loss can actually be filled near your stop price. In an illiquid instrument, a stop is a hope, not a guarantee.',
    example: {
      setup: 'The same 2,000-share stop in a deep book and a thin one',
      steps: [
        { label: 'Deep book: shares near the bid', value: 'tens of thousands' },
        { label: 'Fill', value: 'within a cent or two' },
        { label: 'Thin book: shares near the bid', value: 'a few hundred' },
        { label: 'Fill', value: 'several percent lower' },
      ],
      body: [
        'The order is identical. What differs is how many buyers are standing underneath it. In a deep book, 2,000 shares is a fraction of what is resting at the first level and the fill is essentially the stop price. In a thin one, the order clears the first few levels and keeps going until it finds enough size, which can be a long way down.',
        'The position size was calculated assuming the stop price. That assumption is not about your analysis — it is about the other participants, and it holds or fails for reasons entirely outside the trade.',
        'Liquidity also disappears precisely when it is called upon. A book that looks respectable at midday empties in a panic, because the same event that triggers your stop triggers everyone else’s and removes the buyers at the same moment.',
        'The practical test costs nothing: before sizing a position, look at the book at the level where the stop sits and ask whether your order is a rounding error there or the whole of it.',
      ],
    },
    mistakes: [
      'Sizing a position by risk math alone without checking whether the market can absorb it.',
      'Treating average daily volume as available liquidity. Most of that volume is not there at the moment you need it.',
      'Assuming a stop loss caps your loss in a market that can gap through it.',
    ],
    related: ['spread', 'volume', 'slippage', 'order-book', 'stop-loss'],
    popular: true,
  },
  {
    slug: 'volatility',
    term: 'Volatility',
    category: 'basics',
    aliases: ['vol', 'volatile'],
    short: 'How much and how quickly an asset’s price moves over a given period.',
    explanation: [
      'Volatility measures the size of price swings, not their direction. A market that falls 3% and rallies 3% every day is highly volatile whether or not it ends the week higher.',
      'It is usually quantified as the standard deviation of returns, or in trading terms via Average True Range, which reports the typical daily range in the instrument’s own price units.',
      'Volatility clusters. Quiet periods tend to follow quiet periods, and once a market becomes violent it usually stays that way for a while.',
    ],
    whyItMatters:
      'Volatility should set your stop distance, and your stop distance sets your position size. Using the same stop on a calm and a violent instrument means taking wildly different real risks.',
    example: {
      setup: 'A 2% stop on a utility and on a small-cap biotech',
      steps: [
        { label: 'Utility: typical daily range', value: '~0.8%' },
        { label: 'A 2% stop is', value: '2.5 average days' },
        { label: 'Biotech: typical daily range', value: '~6%' },
        { label: 'A 2% stop is', value: 'a third of one day' },
      ],
      body: [
        'The same rule, applied honestly, produces a sensible trade in one case and a guaranteed loser in the other. On the utility, 2% is genuine room; on the biotech it is inside the ordinary noise of a single session, so the stop is taken out by movement that carries no information at all.',
        'The trader will read this as the setup failing. It is not — the setup was never given a chance to be right or wrong, because the exit was placed inside the instrument’s normal breathing.',
        'Volatility is what makes a fixed percentage stop meaningless across instruments. The distance has to be measured in units of how much this thing moves, which is what average true range is for, and only then converted into a percentage.',
        'Position size then does the rest. A wider stop on the biotech is not more risk — it is a smaller position for the same risk, which is the correct response to a more violent instrument rather than a reason to avoid it.',
      ],
    },
    mistakes: [
      'Using a fixed percentage stop across instruments with completely different ranges.',
      'Confusing volatility with opportunity. More movement also means more ways to be stopped out.',
      'Sizing up during quiet periods and forgetting that volatility can triple overnight.',
    ],
    related: ['atr', 'atr-stop', 'stop-distance', 'implied-volatility', 'position-size'],
    popular: true,
  },
  {
    slug: 'long',
    term: 'Long',
    category: 'basics',
    aliases: ['go long', 'buy side', 'long position'],
    short: 'A position that profits when the price rises.',
    explanation: [
      'Going long means buying with the expectation of selling higher. It is the default direction most people mean by "investing".',
      'On a long trade the risk sits below your entry and the reward sits above it. Your stop loss belongs under the entry price, because below is the direction the trade loses.',
      'The most you can lose on an unleveraged long is the full position value, because price cannot go below zero. The upside has no fixed ceiling.',
    ],
    diagram: 'risk-reward',
    whyItMatters:
      'Direction determines which side of your entry the stop belongs on. Getting this backwards is the single most common way a position size calculation goes wrong.',
    example: {
      setup: 'Long from $75.00 with a stop at $73.20',
      steps: [
        { label: 'Entry', value: '$75.00' },
        { label: 'Stop, below entry', value: '$73.20' },
        { label: 'Risk per share', value: '$1.80' },
        { label: 'Maximum loss', value: 'bounded at $75.00' },
      ],
      body: [
        'Long means you profit as price rises, so the thing that hurts you is a fall, so the stop goes below. Stated that plainly it is obvious, and it is still the most common place a sizing calculation goes wrong — a stop entered above the entry on a long produces a negative risk per share, and whatever the calculator does with that number, it is not a position size.',
        'The bound on the downside is worth noticing while it is here. A long position cannot lose more than it cost, because price cannot go below zero. That ceiling on the damage is the quiet structural advantage of being long, and it does not exist on the other side.',
        'None of which makes a long safe. The floor at zero is a long way down, and a position large enough to matter will have done its damage well before reaching it. Direction decides where the stop sits; size decides what the stop costs.',
      ],
    },
    mistakes: [
      'Placing the stop above the entry on a long, which turns the risk calculation negative.',
      'Assuming long is inherently safer than short. A long in a collapsing asset loses just as fast.',
    ],
    related: ['short', 'entry', 'exit', 'stop-loss', 'position-size'],
    popular: true,
  },
  {
    slug: 'short',
    term: 'Short',
    category: 'basics',
    aliases: ['go short', 'short selling', 'sell side'],
    short: 'A position that profits when the price falls.',
    explanation: [
      'Shorting means selling an asset you do not own — typically borrowed from your broker — with the intention of buying it back cheaper.',
      'On a short trade the geometry flips. Risk sits above your entry, reward sits below it, and your stop loss belongs above the entry price.',
      'The risk profile is asymmetric in an uncomfortable way. Your maximum profit is capped, because price can only fall to zero, while your maximum loss is theoretically unlimited as price rises.',
    ],
    diagram: 'risk-reward',
    whyItMatters:
      'Because losses on a short grow as the position moves against you, disciplined stops and correct position sizing matter more here than anywhere else.',
    example: {
      setup: 'Short 200 shares at $40, and the stock triples',
      steps: [
        { label: 'Proceeds from the short', value: '$8,000' },
        { label: 'Best possible outcome', value: '+$8,000' },
        { label: 'At $120 to buy back', value: '−$16,000' },
        { label: 'Maximum loss', value: 'unbounded' },
      ],
      body: [
        'The whole position is asymmetric and the asymmetry runs the wrong way. Everything that can go right is capped at $8,000, because the stock can fall to zero and no further. Everything that can go wrong has no ceiling at all: at $120 the loss is twice what the position was ever worth, and $120 is not an extreme price for a stock that was $40.',
        'It gets worse as it goes against you rather than better. A losing long shrinks — as price falls, the position is a smaller share of the account. A losing short grows, so the exposure expands at exactly the moment the thesis is being disproved.',
        'On top of that sit costs a long never meets: borrow fees that rise as a stock becomes hard to locate, dividends payable to the lender, and the possibility of a forced buy-in if the borrow is recalled, which closes the position whether or not you wanted out.',
        'None of this makes shorting wrong. It makes the stop non-negotiable and the size smaller than the equivalent long, because on this side the market is not bounded by anything.',
      ],
    },
    mistakes: [
      'Placing the stop below the entry on a short, which inverts the risk math.',
      'Ignoring borrow fees and the risk of a forced buy-in on hard-to-borrow stocks.',
      'Shorting into a crowded position without accounting for short squeeze risk.',
    ],
    related: ['long', 'short-interest', 'stop-loss', 'position-size', 'margin'],
    popular: true,
  },
  {
    slug: 'entry',
    term: 'Entry',
    category: 'basics',
    aliases: ['entry price', 'open a position'],
    short: 'The price at which you open a position.',
    explanation: [
      'Your entry is the reference point for everything else in the trade. Risk is measured from it, reward is measured from it, and your position size is derived from the distance between it and your stop.',
      'The entry you plan and the entry you get are different things. A market order fills at the ask or bid; a limit order fills at your price or not at all.',
      'A good entry is not the lowest price of the move. It is a price where your invalidation level is close enough that the trade can be sized properly.',
    ],
    whyItMatters:
      'Entry quality controls stop distance, and stop distance controls position size. A tighter, better-defined entry lets you take the same dollar risk with a larger, more responsive position.',
    example: {
      setup: 'The same idea, entered at the level and entered after it breaks',
      steps: [
        { label: 'Entry at the level', value: '$22.10, stop $21.70' },
        { label: 'Risk per share', value: '$0.40' },
        { label: 'Entry after confirmation', value: '$22.80, stop $21.70' },
        { label: 'Risk per share', value: '$1.10' },
      ],
      body: [
        'Same thesis, same invalidation point, same target. The only difference is where the trade was entered, and it changes the risk per share by a factor of nearly three — which changes the position size by the same factor, and the risk/reward with it.',
        'That is the real cost of waiting for confirmation, and it is usually paid without being noticed. Confirmation is not free: it buys a higher probability of being right in exchange for a worse ratio when you are. Whether that is a good trade depends on the numbers, not on how much safer it feels.',
        'The opposite error is just as expensive. Entering early, before the level has done anything, means a tight stop attached to an idea that was never actually triggered, and a string of small losses on trades that had no signal behind them.',
        'The useful discipline is to define the entry and the invalidation together, before either exists. An entry chosen without knowing where the stop goes is not an entry, it is a purchase.',
      ],
    },
    mistakes: [
      'Chasing an entry after price has already run, which widens the stop and shrinks the position.',
      'Using the chart’s last price as the entry when the spread is wide.',
      'Entering before defining where the idea would be proven wrong.',
    ],
    related: ['exit', 'stop-loss', 'take-profit', 'position-size', 'limit-order'],
  },
  {
    slug: 'exit',
    term: 'Exit',
    category: 'basics',
    aliases: ['close a position', 'exit price'],
    short: 'The price at which you close a position, whether at a profit or a loss.',
    explanation: [
      'Every trade has two decisions, and the exit is the one that determines the result. An entry only creates exposure; the exit converts it into a number.',
      'Exits come in three flavors: the stop loss, which ends the trade when the idea is wrong; the take profit, which ends it when the idea has worked; and the discretionary exit, when conditions change.',
      'Both exits should exist before the position does. Deciding where to get out while you are already losing money is the worst possible time to decide anything.',
    ],
    whyItMatters:
      'Traders spend most of their effort on entries, but exits are where the distribution of outcomes is actually shaped. Two people can take the same entry and end the year in opposite places.',
    example: {
      setup: 'One entry, two exit rules, over the same hundred trades',
      steps: [
        { label: 'Rule A: fixed 2R target', value: '38% hit rate' },
        { label: 'Rule A result', value: '+14R' },
        { label: 'Rule B: exit on any green day', value: '71% hit rate' },
        { label: 'Rule B result', value: '−9R' },
      ],
      body: [
        'Identical entries. Every trade opened at the same price on the same signal, and the two records are unrecognisable — one profitable with a losing majority, one losing with a winning majority.',
        'Rule B feels immeasurably better to trade. Seven trades in ten close green, the equity curve is smooth for weeks at a time, and the trader can describe themselves as right most of the time. It is also the losing rule, because the wins are trimmed to a fraction of an R while the losses run the full distance.',
        'This is why effort spent on entries has such poor returns relative to effort spent on exits. The entry determines whether you are in the move; the exit determines how much of it you keep, and the second question has a far wider range of answers.',
        'The illustrative numbers are there to show the shape, not to describe a real system. The shape is the point: two sets of exit rules on one set of entries can sit on opposite sides of zero.',
      ],
    },
    mistakes: [
      'Letting a planned exit drift because the position is "almost" back to break-even.',
      'Taking profits early on winners while giving losers unlimited room.',
      'Having no exit plan for the case where the trade goes nowhere for weeks.',
    ],
    related: ['entry', 'stop-loss', 'take-profit', 'trailing-stop', 'r-multiple'],
  },
  {
    slug: 'order-book',
    term: 'Order Book',
    category: 'basics',
    aliases: ['depth of market', 'dom', 'level 2'],
    short: 'The live list of all resting buy and sell orders at each price level.',
    explanation: [
      'The order book shows unfilled limit orders stacked by price: bids below the current market, asks above it. The top of each side is the best bid and best ask.',
      'Depth is the quantity waiting at each level. A book with thousands of shares at every price absorbs large orders quietly; a book with a handful of shares gaps.',
      'The book is a snapshot of intent, not a promise. Resting orders can be pulled in an instant, and often are, exactly when a large order starts pushing into them.',
    ],
    diagram: 'order-book',
    whyItMatters:
      'Reading the book tells you what your fill will realistically look like. Position size math assumes you can transact at your entry — the book is where you check that assumption.',
    example: {
      setup: 'Checking whether a 3,000-share order is small or large here',
      steps: [
        { label: 'Shares at the best bid', value: '4,200' },
        { label: 'Shares within 5 cents', value: '11,800' },
        { label: 'Your order', value: '3,000' },
        { label: 'Verdict', value: 'a rounding error' },
      ],
      body: [
        'Three thousand shares is not big or small in the abstract. It is small here, because the first level alone can absorb it, and it would be enormous in a book showing 200 shares at the bid and nothing within a dollar.',
        'That is the only question the book is being asked: relative to the resting size, is my order noise or is it the event? The answer decides whether the fill will be at the price on the screen or somewhere the calculation never considered.',
        'Two cautions about reading it. Displayed size is not all the size — iceberg and hidden orders mean real depth can exceed what is shown — and displayed orders can be cancelled in microseconds, so a book that looks solid can evaporate as your order arrives.',
        'Used honestly it is still the best available check on the one assumption every position size calculation makes: that you can actually transact at the price you planned around.',
      ],
    },
    mistakes: [
      'Treating displayed size as guaranteed liquidity.',
      'Reading large resting orders as a reliable signal of direction.',
    ],
    related: ['bid', 'ask', 'liquidity', 'slippage', 'limit-order'],
  },
  {
    slug: 'slippage',
    term: 'Slippage',
    category: 'basics',
    aliases: ['slip', 'bad fill'],
    short: 'The difference between the price you expected and the price you actually got.',
    explanation: [
      'Slippage happens when the market moves, or the book thins out, between your decision and your fill. It can go in your favor, but it usually does not.',
      'It is worst exactly where it hurts most: on stop orders during fast moves. A stop is a trigger, not a guarantee, and once triggered it becomes a market order that takes whatever is available.',
      'Gaps are slippage in its most extreme form. If an instrument closes at $50 and opens at $42, a stop at $48 fills near $42.',
    ],
    whyItMatters:
      'Your calculated maximum risk assumes the stop fills at the stop price. Slippage is the gap between that assumption and reality, and it is the main reason to keep per-trade risk modest.',
    example: {
      setup: 'A $250 planned loss that costs $312',
      steps: [
        { label: 'Position', value: '500 shares' },
        { label: 'Stop', value: '$18.60' },
        { label: 'Actual fill', value: '$18.4757' },
        { label: 'Loss', value: '$312 instead of $250' },
      ],
      body: [
        'Twelve cents of slippage on an eighteen-dollar stock is unremarkable, and it made the loss 25% bigger than the number the position was sized from. Nothing went wrong; the stop simply became a market order in a moment when the book was moving.',
        'This is the gap between a risk model and the market. Every position size calculation assumes the stop fills at the stop, and it never quite does — sometimes by a cent, occasionally by a great deal more.',
        'The correct response is not a tighter stop, which makes slippage a larger share of a smaller distance. It is to keep per-trade risk modest enough that a 25% overrun is an irritation rather than an event, and to expect it as normal rather than treat each instance as bad luck.',
        'Slippage is also not random in its timing. It is smallest in calm, liquid conditions and largest on gaps, news and fast moves — which is to say, on the trades where the stop actually gets used.',
      ],
    },
    mistakes: [
      'Believing a stop loss caps risk at exactly the stop price.',
      'Holding through scheduled events like earnings with a tight stop that a gap can leap over.',
      'Using market orders in thin conditions when a limit order would do.',
    ],
    related: ['stop-loss', 'liquidity', 'spread', 'gap', 'market-order'],
    popular: true,
  },
  {
    slug: 'ticker-symbol',
    term: 'Ticker Symbol',
    category: 'basics',
    aliases: ['ticker', 'symbol'],
    short: 'The short code that uniquely identifies a tradable instrument on an exchange.',
    explanation: [
      'A ticker is an address, not a description. It points at one specific listing on one specific venue.',
      'The same company can trade under different symbols in different countries, and similar-looking symbols can be completely unrelated instruments — a stock, a leveraged fund tracking it, and an options chain on it are three different things.',
      'Symbols get reused after delistings and change after corporate actions, which is a real hazard when reading old analysis.',
    ],
    whyItMatters:
      'Trading the wrong symbol is a surprisingly common and expensive error, especially between a stock and a leveraged product that tracks it with very different volatility.',
    example: {
      setup: 'An index fund and a 3× leveraged product on the same index',
      steps: [
        { label: 'Index falls', value: '−3%' },
        { label: 'Unleveraged fund', value: '−3%' },
        { label: '3× product', value: '≈ −9%' },
        { label: 'Stop sized for the first', value: 'wrong by 3×' },
      ],
      body: [
        'The two track the same index and their tickers often differ by a letter or two. A position sized against the ordinary fund’s behaviour, opened by mistake in the leveraged one, takes three times the intended risk with every other number in the plan unchanged.',
        'Leveraged products carry a second difference that has nothing to do with the ticker being similar. They reset their exposure daily, so over more than a day their return is not three times the index return — in a choppy market that goes nowhere, they lose value steadily. They are built for one-day exposure, and holding one for a month is a different instrument from the one the label suggests.',
        'The same trap exists in quieter forms: two share classes of one company, a stock and its ADR, a spot pair and a perpetual on it, an index and a fund that tracks it. All move together enough to look interchangeable and differ enough to break a calculation.',
        'The habit that prevents it is reading the symbol on the order ticket rather than on the chart, every time, including on the trade you have taken fifty times.',
      ],
    },
    mistakes: [
      'Confusing a company’s stock with a leveraged ETF or ETN on the same theme.',
      'Acting on old research where the symbol has since been reassigned.',
    ],
    related: ['share', 'broker', 'liquidity', 'market-cap'],
  },
  {
    slug: 'broker',
    term: 'Broker',
    category: 'basics',
    aliases: ['brokerage', 'trading platform'],
    short: 'The firm that routes your orders to the market and holds your account.',
    explanation: [
      'A broker sits between you and the exchange. They accept your orders, route them for execution, hold your cash and positions, and apply margin rules to your account.',
      'Brokers differ in ways that directly change your results: commission structure, spread markup, execution quality, available order types, margin rates, and what happens to your position when you breach a margin requirement.',
      'Every broker also imposes its own risk controls. Understanding when they will liquidate your position for you is part of understanding your own risk.',
    ],
    whyItMatters:
      'Your broker defines the real cost of every trade and the exact rules under which your position can be closed without your consent.',
    example: {
      setup: 'What a "zero commission" account still charges',
      steps: [
        { label: 'Commission', value: '$0' },
        { label: 'Spread', value: 'on every round trip' },
        { label: 'Overnight financing', value: 'daily on leverage' },
        { label: 'Currency conversion', value: 'on non-base trades' },
      ],
      body: [
        'Zero commission is accurate and it is one line of four. The spread is a cost whether or not anyone calls it one; financing accrues nightly on anything leveraged; and buying a foreign-listed instrument converts currency twice, at a rate the broker sets. None of these appear as a fee on the statement.',
        'Then there are the rules that matter more than the costs. At what equity level does the broker issue a margin call, and does it call first or liquidate immediately? Which positions does it choose to close? Is your cash segregated from the firm’s own money, and what protection scheme covers the account if the firm fails?',
        'These are answered in the account documentation and almost nobody reads them until the answer is being applied to their account in real time. They are the terms under which your trade can be ended without your consent, which makes them part of your risk model rather than paperwork.',
        'A broker is not a neutral pipe to the market. It is a counterparty with its own rules, its own costs and its own solvency, and all three sit underneath every position you hold there.',
      ],
    },
    mistakes: [
      'Comparing brokers on headline commission while ignoring spreads and financing costs.',
      'Not knowing the margin call and forced-liquidation policy until it is triggered.',
    ],
    related: ['margin', 'margin-call', 'spread', 'time-in-force', 'pattern-day-trader'],
  },
];
