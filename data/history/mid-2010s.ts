import type { HistoryEvent } from '@/types/history';

export const mid2010sEvents: HistoryEvent[] = [
  {
    slug: 'swiss-franc-shock-2015',
    title: 'The Swiss Franc Shock: A Currency Peg That Broke Without Warning',
    shortTitle: 'The Swiss Franc Shock',
    date: 'January 15, 2015',
    year: 2015,
    category: 'Currency Crisis',
    dek: 'The Swiss National Bank abruptly abandoned its franc-to-euro cap, sending the currency up as much as 30% in minutes and instantly wiping out — or reversing into deep negative balances — countless leveraged retail forex positions.',
    facts: [
      { label: 'EUR/CHF move', value: 'Roughly 30% in minutes' },
      { label: 'Warning given', value: 'None' },
      { label: 'Broker impact', value: 'Several forced into insolvency or large losses' },
    ],
    body: [
      'Since 2011, the Swiss National Bank (SNB) had maintained a floor under the EUR/CHF exchange rate, committing to buy unlimited euros to prevent the Swiss franc from strengthening past a set level. Years of consistent defense of that floor led much of the market to treat it as a near-permanent fact, and many traders held leveraged positions built on the assumption it would hold.',
      'On January 15, 2015, with no advance warning, the SNB abandoned the cap entirely. The franc surged against the euro by as much as 30% within minutes — a move that, for most currency pairs, would be considered enormous over the course of an entire year, not a few minutes.',
      'For leveraged forex accounts positioned on the assumption the peg would hold, the losses were often larger than the capital in the account. Several retail brokers found their clients owing them more money than the clients had deposited, and at least one major broker (Alpari UK) was forced into insolvency as a direct result, while others required emergency capital.',
    ],
    lesson: [
      'This event is the modern, near-exact echo of Black Wednesday decades earlier: a currency peg held for years, treated by the market as effectively permanent, and then removed without warning — because central banks are not obligated to give the market advance notice of a policy change.',
      'For anyone trading currency pairs with leverage, it is the clearest possible argument for always having a real stop in place, even on positions that seem structurally safe. A pegged or tightly managed currency can still gap violently — the peg does not remove the risk, it just compresses years of potential movement into a single moment when it eventually breaks.',
    ],
    relatedTerms: ['leverage', 'currency-pair', 'gap', 'margin-call', 'stop-loss'],
  },
  {
    slug: 'china-circuit-breaker-2016',
    title: 'China\'s Circuit Breaker Backfire: When a Safety Mechanism Made Things Worse',
    shortTitle: "China's Circuit Breaker",
    date: 'January 2016',
    year: 2016,
    category: 'Stock Market Crash',
    dek: 'China introduced market-wide circuit breakers meant to calm panic selling — and pulled them after just four trading days, when the mechanism instead encouraged investors to sell faster, racing to get out before a halt locked them in.',
    facts: [
      { label: 'Circuit breaker lifespan', value: '4 trading days' },
      { label: 'Trigger thresholds', value: '5% and 7% index moves' },
      { label: 'Notable effect', value: 'A 7% morning drop closed the market for the day, twice' },
    ],
    body: [
      'Following a sharp market decline in the summer of 2015, Chinese regulators introduced a new circuit breaker system for the CSI 300 index, intended to reduce volatility: a 5% move would trigger a 15-minute trading pause, and a 7% move would halt trading for the remainder of the day.',
      'The mechanism went live on January 4, 2016. On that day and again on January 7, the market fell fast enough to trigger the 7% threshold and close entirely — on January 7, trading lasted less than 30 minutes before the full-day halt kicked in.',
      'Rather than calming the market, the design appeared to accelerate selling: because the thresholds were relatively close together (5% and 7%), and because a full-day closure meant investors could not trade at all once triggered, many rushed to sell as the market approached the 5% mark, trying to get out before a halt could trap their positions. Regulators suspended the entire system after only four trading days.',
    ],
    lesson: [
      'This is a rare, well-documented case of a risk-management mechanism changing trader behavior in a way that undermined its own purpose — when a rule creates an incentive to race for the exits before it activates, it can concentrate selling rather than spreading it out.',
      'It is a useful reminder for personal risk rules too: a stop-loss or a daily loss limit should reduce panic, not create a new reason to panic earlier. A limit set too close to normal volatility can produce the same effect on a much smaller scale — getting triggered by routine noise and forcing a reaction that a wider, better-calibrated rule would have avoided.',
    ],
    relatedTerms: ['circuit-breaker', 'volatility', 'liquidity', 'stop-loss', 'market-structure'],
  },
  {
    slug: 'brexit-referendum-2016',
    title: 'Brexit: An Overnight Vote That Repriced the Pound in Hours',
    shortTitle: "Brexit's Market Shock",
    date: 'June 23–24, 2016',
    year: 2016,
    category: 'Currency Crisis',
    dek: 'The pound fell over 8% against the dollar within hours as referendum results came in showing the UK had voted to leave the European Union — a result most markets had been positioned against.',
    facts: [
      { label: 'GBP/USD overnight move', value: '−8%+ in hours' },
      { label: '31-year low reached', value: 'Yes, briefly' },
      { label: 'Result vs. market expectation', value: 'Markets were positioned for "Remain"' },
    ],
    body: [
      'On June 23, 2016, the UK held a referendum on whether to remain in the European Union. Polling and betting markets leading into the vote suggested "Remain" was the more likely outcome, and currency markets were broadly positioned accordingly, with the pound having strengthened in the days before the vote.',
      'As results came in overnight and it became clear "Leave" had won, the pound collapsed against the dollar, falling more than 8% within hours to levels not seen in over three decades — one of the sharpest moves ever recorded in a G10 currency pair outside of a currency crisis.',
      'The move happened almost entirely while major markets were closed or thinly traded, meaning many traders woke up to a price dramatically different from where they had left it the evening before, with no opportunity to react as it happened.',
    ],
    lesson: [
      'Scheduled political events with a binary outcome — referendums, major elections, court rulings — carry gap risk that ordinary daily volatility does not. The market can be confidently positioned one way right up until the result, then reprice entirely within a single overnight session.',
      'This is the core argument for reducing position size, or exiting entirely, ahead of a known binary event rather than holding full size through it. A stop-loss offers little protection when the price can gap straight past it — the only real control at that point is how large the position was going in.',
    ],
    relatedTerms: ['gap', 'currency-pair', 'volatility', 'position-size', 'slippage'],
  },
  {
    slug: 'volmageddon-2018',
    title: 'Volmageddon: The Day Short Volatility Products Were Wiped Out',
    shortTitle: 'Volmageddon (2018)',
    date: 'February 5, 2018',
    year: 2018,
    category: 'Leverage & Derivatives',
    dek: 'A sharp spike in market volatility triggered a feedback loop in products designed to profit from calm markets, destroying the value of one popular fund (XIV) by 96% in a single session and effectively ending it.',
    facts: [
      { label: 'XIV single-day decline', value: '~96%' },
      { label: 'VIX (volatility index) spike', value: 'More than doubled intraday' },
      { label: 'Fund outcome', value: 'Liquidated shortly after' },
    ],
    body: [
      'In the years leading up to 2018, several exchange-traded products let investors bet that market volatility would stay low, effectively earning a steady return during calm periods. These products had grown popular and large, having delivered smooth gains for an extended stretch of low-volatility markets.',
      'On February 5, 2018, US markets fell sharply, and the volatility index (VIX) that these products were tied to spiked dramatically in a single session — more than doubling. Because the products were structured with leverage and needed to rebalance their exposure daily based on the prior day\'s move, the spike triggered forced buying of volatility-linked futures into an already fast-moving market, which pushed volatility even higher.',
      'The largest of these products, known by its ticker XIV, lost approximately 96% of its value in that one session and was liquidated shortly afterward, wiping out billions of dollars for investors who had held it, many treating it as a steady income strategy rather than the highly leveraged, structurally fragile product it actually was.',
    ],
    lesson: [
      'Volmageddon is a sharp lesson in product structure risk: an investment can look like a smooth, low-risk income strategy for a long stretch of time while carrying a hidden mechanism that produces catastrophic, near-total losses in a single adverse event, rather than a gradual decline that gives a trader time to react.',
      'It also illustrates how leverage embedded inside a product — not just leverage a trader chooses explicitly through a margin account — can carry the exact same risk of ruin. Many investors in these funds did not think of themselves as using leverage at all.',
    ],
    relatedTerms: ['volatility', 'leverage', 'risk-of-ruin', 'drawdown', 'liquidity'],
  },
  {
    slug: 'bitcoin-bubble-2017',
    title: "Bitcoin's 2017 Bubble: From ~$1,000 to ~$20,000 and Back",
    shortTitle: "Bitcoin's 2017 Bubble",
    date: '2017 – 2018',
    year: 2017,
    category: 'Crypto',
    dek: 'Bitcoin rose roughly twentyfold in a single year on a wave of retail enthusiasm, then fell more than 80% over the following year — a textbook speculative bubble, compressed into crypto\'s characteristically extreme volatility.',
    facts: [
      { label: '2017 gain (approx.)', value: 'From ~$1,000 to ~$19,700' },
      { label: '2018 decline from peak', value: 'More than 80%' },
      { label: 'Time to reclaim 2017 peak', value: 'About 3 years' },
    ],
    body: [
      'Bitcoin began 2017 trading around $1,000 and, driven by a wave of mainstream and retail attention, rose to nearly $20,000 by December — a gain of roughly 20 times in under twelve months. Media coverage, the launch of Bitcoin futures on major exchanges, and a broader "ICO" boom in newly created cryptocurrencies fed the enthusiasm.',
      'Much of the buying in the final months of the rally showed classic signs of speculative mania rather than considered investment: people entering because the price was rising and the fear of missing out outweighed any analysis of value, often using leverage on unregulated exchanges to amplify the bet further.',
      'The decline through 2018 was steep and prolonged, with Bitcoin losing more than 80% of its value from the peak over the following twelve months, and thousands of smaller cryptocurrencies from the same period losing effectively all of their value.',
    ],
    lesson: [
      'This cycle is a clean illustration of a pattern that recurs across very different asset classes throughout this history, from the dot-com bubble to crypto: an asset tied to a genuinely important trend can still be priced far ahead of any reasonable near-term value, driven by the expectation that someone else will pay more later rather than by underlying fundamentals.',
      'For anyone trading a fast-moving, high-volatility asset, it underscores why position size and predefined exits matter more, not less, when the asset is exciting. The instinct to size up during a strong rally, driven by recency bias, is exactly what turns a bubble into a personal financial event rather than something watched from a safe distance.',
    ],
    relatedTerms: ['volatility', 'fomo', 'recency-bias', 'risk-per-trade', 'leverage'],
  },
];
