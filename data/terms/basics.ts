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
    mistakes: [
      'Comparing brokers on headline commission while ignoring spreads and financing costs.',
      'Not knowing the margin call and forced-liquidation policy until it is triggered.',
    ],
    related: ['margin', 'margin-call', 'spread', 'time-in-force', 'pattern-day-trader'],
  },
];
