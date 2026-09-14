import type { Term } from '@/types/dictionary';

export const stockTerms: Term[] = [
  {
    slug: 'share',
    term: 'Share',
    category: 'stocks',
    aliases: ['stock', 'equity'],
    short: 'A unit of ownership in a company.',
    explanation: [
      'Owning a share means owning a fractional claim on a company’s assets and future earnings, along with whatever voting rights the share class carries.',
      'Share price alone says nothing about whether a company is large or small. A $8 stock can be worth more in total than a $600 one — market capitalization is what determines size.',
      'For a trader, a share is simply a divisible unit of exposure. Because most equities trade in whole shares, position sizing usually rounds down.',
    ],
    whyItMatters:
      'Whole-share trading means your calculated position size rarely lands on an integer. Rounding down keeps your actual risk at or below your intended risk.',
    example: {
      setup: 'A calculation that returns 183.7 shares',
      steps: [
        { label: 'Exact size', value: '183.7 shares' },
        { label: 'Rounded down', value: '183 → risk $499.06' },
        { label: 'Rounded up', value: '184 → risk $501.78' },
        { label: 'Risk budget', value: '$500.00' },
      ],
      body: [
        'Round down and the risk is $499.06, a fraction under budget. Round up and it is $501.78, a fraction over. On one trade the difference is $2.72 and nobody would care.',
        'It matters because of which direction the habit points. Rounding down means every position is at or below the intended risk, so the account can only ever drift conservative. Rounding up means every position is slightly over, and across hundreds of trades a 1% rule is quietly being run at 1.02%.',
        'The effect is small and it is free to avoid, which is the argument for making it a rule rather than a judgement. Any place where a habit can only err in one direction, choose the direction that cannot hurt you.',
        'Fractional shares remove the rounding but not the principle: you still cannot buy a fraction of a futures contract, and on small accounts the granularity problem simply reappears somewhere else.',
      ],
    },
    mistakes: [
      'Judging whether a stock is cheap by its share price rather than its valuation.',
      'Rounding position size up, which pushes real risk above the planned limit.',
    ],
    related: ['market-cap', 'position-size', 'float', 'dividend', 'ticker-symbol'],
  },
  {
    slug: 'market-cap',
    term: 'Market Capitalization',
    category: 'stocks',
    aliases: ['market cap', 'mcap'],
    short: 'The total market value of a company’s shares — share price times shares outstanding.',
    explanation: [
      'Market cap is what the market currently says the whole company is worth. It is the only meaningful measure of a company’s size from a trading perspective.',
      'Companies are loosely grouped by it: large cap above roughly $10 billion, mid cap between $2 and $10 billion, small cap below $2 billion, and micro cap beneath that.',
      'Size correlates strongly with liquidity and volatility. Small caps move further and faster on less volume, and their spreads are wider.',
    ],
    formula: {
      label: 'Market Capitalization',
      expression: 'Share Price × Shares Outstanding',
    },
    whyItMatters:
      'Market cap is a fast proxy for how much volatility and slippage to expect, which feeds directly into stop width and position size.',
    example: {
      setup: 'The same 1% risk in a mega-cap and a micro-cap',
      steps: [
        { label: 'Mega-cap: typical daily range', value: '~1%' },
        { label: 'Slippage on exit', value: 'cents' },
        { label: 'Micro-cap: typical daily range', value: '~8%' },
        { label: 'Slippage on exit', value: 'percent' },
      ],
      body: [
        'Both trades are sized to risk 1% of the account, and only one of them will actually do so. The mega-cap stop fills essentially where it was placed. The micro-cap stop triggers into a book with a handful of buyers, and the fill can land several percent below the level the sizing assumed.',
        'Market cap does not cause any of this, but it correlates with all of it: larger companies have more shares outstanding, more holders, more coverage and deeper books, so they move less and absorb orders better.',
        'Which makes it a fast first filter rather than an analytical tool. Seeing a $400m market cap tells you immediately to expect a wider stop, a smaller position, and a fill worse than the screen — before looking at a single chart.',
        'The error it prevents is the common one: taking a sizing routine that works on liquid large-caps and applying it unchanged to a small name, where every assumption inside it is weaker.',
      ],
    },
    mistakes: [
      'Comparing companies by share price instead of market cap.',
      'Using large-cap position sizing and stop widths on micro-cap stocks.',
    ],
    related: ['share', 'float', 'liquidity', 'volatility', 'pe-ratio'],
  },
  {
    slug: 'pe-ratio',
    term: 'P/E Ratio',
    category: 'stocks',
    aliases: ['price to earnings', 'price earnings ratio', 'pe'],
    short: 'A company’s share price divided by its earnings per share.',
    explanation: [
      'The P/E ratio expresses how many dollars investors pay for each dollar of annual earnings. A P/E of 25 means $25 of price per $1 of earnings.',
      'Trailing P/E uses the last twelve months of reported earnings; forward P/E uses analyst estimates, which are forecasts and are often wrong.',
      'A high P/E is not automatically expensive and a low one is not automatically cheap. Fast-growing companies routinely carry high multiples, and low multiples often reflect real problems.',
    ],
    formula: {
      label: 'P/E Ratio',
      expression: 'Share Price ÷ Earnings Per Share',
    },
    whyItMatters:
      'P/E is context, not a signal. It tells you what expectations are priced in, which helps explain why a stock can fall on good news.',
    example: {
      setup: 'Good earnings, and the stock falls 9%',
      steps: [
        { label: 'P/E before the report', value: '48' },
        { label: 'Earnings growth reported', value: '+22%' },
        { label: 'Growth the price implied', value: '+35%' },
        { label: 'Reaction', value: '−9%' },
      ],
      body: [
        'Twenty-two percent growth is a good year by any ordinary standard, and the stock fell hard on it. Nothing irrational happened: at a P/E of 48 the price already contained an assumption of much faster growth, and the report was an argument against that assumption.',
        'This is what a high multiple actually means. It is not a verdict that a stock is expensive; it is a statement about what the market has already agreed to believe. Meeting a modest expectation beats missing an extravagant one, regardless of which company is better.',
        'For a trader the practical use is asymmetry. A richly valued stock has more room to disappoint than to surprise, which is a statement about the shape of the distribution around an event — and therefore about gap risk and position size.',
        'What it is not is a timing tool. Multiples can stay stretched for years, and "expensive" has ended a great many short positions that were eventually correct.',
      ],
    },
    mistakes: [
      'Comparing P/E ratios across industries with completely different growth profiles.',
      'Using P/E on companies with negative or barely positive earnings, where it is meaningless.',
      'Treating a low P/E as a trade signal on its own.',
    ],
    related: ['eps', 'earnings-report', 'market-cap', 'share', 'dividend'],
  },
  {
    slug: 'eps',
    term: 'Earnings Per Share',
    category: 'stocks',
    aliases: ['eps', 'earnings per share'],
    short: 'A company’s net profit divided by its number of outstanding shares.',
    explanation: [
      'EPS reduces total profit to a per-share figure, which makes it comparable across companies of different sizes and across time.',
      'Diluted EPS accounts for options and convertible securities that could become shares. It is the more conservative and generally more useful number.',
      'EPS is an accounting output and can be influenced by buybacks, one-time items and accounting choices, so the trend matters more than any single quarter.',
    ],
    formula: {
      label: 'Earnings Per Share',
      expression: 'Net Income ÷ Shares Outstanding',
    },
    whyItMatters:
      'EPS surprises against expectations are among the largest single-day movers in equities, and are a primary source of gap risk.',
    example: {
      setup: 'EPS of $1.42 against a consensus of $1.38',
      steps: [
        { label: 'Consensus estimate', value: '$1.38' },
        { label: 'Reported', value: '$1.42' },
        { label: 'Surprise', value: '+2.9%' },
        { label: 'What moves the stock', value: 'the surprise, not the $1.42' },
      ],
      body: [
        'The number that matters is the gap between reported and expected, not the reported figure itself. A company earning $1.42 against a $1.38 estimate is a positive surprise; the identical $1.42 against a $1.55 estimate is a miss, and the stock behaves accordingly.',
        'That is the whole reason earnings produce such violent single-day moves. The price already reflects the estimate, so only the difference is new information — and the difference arrives all at once, outside market hours, when nobody can trade on it.',
        'Guidance frequently matters more than the number. A company can beat on EPS and fall 15% because it cut its outlook for the coming year, which is the market repricing every future quarter rather than reacting to the one just reported.',
        'For sizing, the consequence is simple and unwelcome: across an earnings release, your stop is not a risk control. The position size is, because it is the only thing that still applies when the stock reopens past the stop.',
      ],
    },
    mistakes: [
      'Reacting to headline EPS without comparing it to what was expected.',
      'Ignoring share count changes that flatter per-share figures.',
    ],
    related: ['pe-ratio', 'earnings-report', 'gap', 'share', 'market-cap'],
  },
  {
    slug: 'dividend',
    term: 'Dividend',
    category: 'stocks',
    aliases: ['dividend yield', 'ex-dividend'],
    short: 'A cash payment distributed to shareholders out of company profits.',
    explanation: [
      'Dividends are usually paid quarterly. The dividend yield expresses the annual payment as a percentage of the current share price.',
      'On the ex-dividend date the share price typically drops by roughly the dividend amount. The value is transferred, not created.',
      'A yield that looks unusually high is often the result of a falling share price rather than a generous payout, and can signal a dividend at risk of being cut.',
    ],
    formula: {
      label: 'Dividend Yield',
      expression: 'Annual Dividend Per Share ÷ Share Price × 100',
    },
    whyItMatters:
      'The ex-dividend drop can look like a breakdown on a chart and can trigger stops that were placed without accounting for it.',
    example: {
      setup: 'A $0.94 dividend and a stop 80 cents below',
      steps: [
        { label: 'Close before ex-date', value: '$61.40' },
        { label: 'Dividend per share', value: '$0.94' },
        { label: 'Opens around', value: '$60.46' },
        { label: 'Stop at $60.60', value: 'triggered' },
      ],
      body: [
        'Nothing went wrong with the company and nothing went wrong with the thesis. On the ex-dividend date the stock opens lower by roughly the dividend, because a buyer from that morning no longer receives it — the value left the share and went to the holders of record.',
        'On a chart this is indistinguishable from a gap down through support, and it takes out a stop placed just underneath. The trader is out of a working position, holds a $0.94 dividend they were not trading for, and has recorded a loss caused by a scheduled accounting event.',
        'The drop is not always exactly the dividend — tax treatment and ordinary trading move it around — but it is close enough to matter and it is entirely predictable in advance.',
        'The habit is to check the ex-dividend date before placing a stop on any dividend payer, the same way one checks the earnings date. Both are calendar events that act on price without saying anything about the trade.',
      ],
    },
    mistakes: [
      'Reading the ex-dividend price drop as a technical breakdown.',
      'Chasing high yields without asking why the price fell.',
      'Holding a short position through an ex-dividend date, where the dividend is owed by the short seller.',
    ],
    related: ['share', 'pe-ratio', 'gap', 'short', 'eps'],
  },
  {
    slug: 'float',
    term: 'Float',
    category: 'stocks',
    aliases: ['free float', 'public float'],
    short: 'The number of shares actually available for public trading.',
    explanation: [
      'Float excludes shares locked up by insiders, founders and restricted holders. It is the supply that can genuinely change hands.',
      'A small float means limited supply. The same buying pressure produces far larger price moves than it would in a widely held stock.',
      'Low-float stocks are correspondingly dangerous: wide spreads, violent gaps, and stops that fill far from where they were placed.',
    ],
    whyItMatters:
      'Float is one of the best available predictors of how badly a stop might slip, which argues for smaller positions in low-float names regardless of what the risk math says.',
    example: {
      setup: 'A 4-million-share float meeting a day of real interest',
      steps: [
        { label: 'Shares outstanding', value: '30 million' },
        { label: 'Held by insiders and locked up', value: '26 million' },
        { label: 'Actually tradeable', value: '4 million' },
        { label: 'Normal daily volume', value: '~250,000' },
      ],
      body: [
        'Market cap is calculated on all thirty million shares. Price is set by whichever fraction of the four million happens to be for sale, and on a quiet day that is a few hundred thousand. The stock is far smaller, as a market, than its headline valuation suggests.',
        'This is why low-float names move the way they do. It does not take much buying to exhaust the available supply, so moves of 30 or 40% happen on news that would barely register elsewhere — and the same mechanism works in reverse when everyone wants out.',
        'For a stop, that thin supply is the problem. The order triggers into a book with very little resting size, and the fill can land far below the level. The risk calculation assumed a price the market could not provide.',
        'So the honest adjustment is not a wider stop — it is a smaller position than the arithmetic suggests, on the grounds that the arithmetic is built on an assumption this instrument does not support.',
      ],
    },
    mistakes: [
      'Sizing a low-float stock by risk math alone without allowing for slippage.',
      'Confusing float with shares outstanding when assessing liquidity.',
    ],
    related: ['liquidity', 'short-interest', 'slippage', 'volatility', 'market-cap'],
  },
  {
    slug: 'short-interest',
    term: 'Short Interest',
    category: 'stocks',
    aliases: ['short squeeze', 'days to cover'],
    short: 'The number of shares sold short but not yet bought back, often shown as a percent of float.',
    explanation: [
      'High short interest means many participants are positioned for a decline. Every one of them is a future buyer, because closing a short requires buying.',
      'Days to cover estimates how long it would take short sellers to exit at average daily volume. High readings indicate a crowded, hard-to-exit position.',
      'A short squeeze happens when rising prices force short sellers to buy back, which pushes prices higher and forces more buying. These moves are fast and detached from fundamentals.',
    ],
    whyItMatters:
      'Shorting a heavily shorted stock carries squeeze risk that ordinary stop placement handles poorly, because squeezes gap through levels.',
    example: {
      setup: 'Short interest at 22% of float, and the squeeze mechanism',
      steps: [
        { label: 'Short interest', value: '22% of float' },
        { label: 'Days to cover', value: '6.4' },
        { label: 'Shorts must buy to exit', value: 'always' },
        { label: 'Buying pushes price', value: 'higher, forcing more' },
      ],
      body: [
        'Every short position is a future buy order. When 22% of the float is sold short and it would take six days of normal volume for those positions to close, that is a very large quantity of guaranteed future demand sitting above the market.',
        'A squeeze is what happens when it arrives at once. Price rises, the earliest shorts buy to cover, that buying pushes price higher, which forces the next tier to cover, and so on. The move feeds itself and has nothing to do with the company — the fundamental case for the short can be entirely correct while it happens.',
        'Stops handle this badly because squeezes gap. Price does not walk up through your level politely; it jumps, often at the open, and the buy-stop fills well above where it was set on a position whose losses are already unbounded.',
        'High short interest is therefore not the confirmation it looks like. It tells you many people agree with your thesis, and that their agreement is stored as fuel for a move against you.',
      ],
    },
    mistakes: [
      'Treating high short interest as a reason to buy on its own.',
      'Shorting a crowded name with a tight stop that a squeeze will leap over.',
    ],
    related: ['short', 'float', 'liquidity', 'gap', 'volatility'],
  },
  {
    slug: 'earnings-report',
    term: 'Earnings Report',
    category: 'stocks',
    aliases: ['earnings', 'quarterly results', 'earnings season'],
    short: 'A company’s scheduled quarterly disclosure of financial results.',
    explanation: [
      'Earnings reports are released outside regular trading hours, so the market reprices the stock at the next open rather than gradually.',
      'The move depends on results relative to expectations, plus forward guidance — which frequently matters more than the reported quarter.',
      'Double-digit percentage gaps are routine. This is a scheduled, known event that regularly produces the largest single-day moves in a stock’s year.',
    ],
    whyItMatters:
      'Holding through earnings means accepting that your stop may not protect you. A gap can open well past it, so position size, not stop distance, is your real control.',
    example: {
      setup: 'A 1% risk that becomes a 4.4% loss overnight',
      steps: [
        { label: 'Position', value: '300 shares at $88.00' },
        { label: 'Stop at $85.50', value: 'planned loss $750' },
        { label: 'Reopens at', value: '$77.00' },
        { label: 'Actual loss', value: '$3,300' },
      ],
      body: [
        'The stop was well placed and it was irrelevant. The report came out after the close, the stock reopened at $77, and the order filled there — $8.50 below the level it was set at, for four and a half times the intended loss.',
        'Holding a position through an earnings release means accepting this in advance, because there is no order type that prevents it. The market is closed while the information arrives, and the first tradeable price is already on the other side of the move.',
        'That leaves exactly one control, and it is position size. A trader who wants to hold through earnings has to size the position so that a plausible gap — 10%, 15% on a volatile name — is survivable, which usually means a much smaller position than the ordinary stop-based calculation produces.',
        'The alternative is equally legitimate and often better: close before the release and reopen afterwards. The cost is a spread and a commission. The cost of the other choice is whatever the gap happens to be.',
      ],
    },
    mistakes: [
      'Holding a full-size position through earnings with a tight stop and assuming risk is capped.',
      'Not checking the earnings date before entering a swing trade.',
      'Assuming good results guarantee a higher price.',
    ],
    related: ['gap', 'eps', 'volatility', 'slippage', 'extended-hours'],
    popular: true,
  },
  {
    slug: 'extended-hours',
    term: 'Extended Hours',
    category: 'stocks',
    aliases: ['pre-market', 'premarket', 'after-hours', 'after hours'],
    short: 'Trading sessions before the open and after the close, with far less liquidity.',
    explanation: [
      'Pre-market and after-hours sessions let participants react to news released outside the regular session, but only a fraction of normal volume participates.',
      'Spreads widen dramatically, order books thin out, and prices can move substantially on very small trades.',
      'Extended-hours prices often fail to hold. A stock up 8% after hours can open flat once the full market weighs in.',
    ],
    whyItMatters:
      'Market orders in extended hours can fill catastrophically far from the quoted price, and many order types behave differently or are unavailable.',
    example: {
      setup: 'A market order at 5:40pm into a near-empty book',
      steps: [
        { label: 'Last regular-hours price', value: '$52.10' },
        { label: 'Post-market bid / ask', value: '$49.80 / $53.90' },
        { label: 'Spread', value: '$4.10' },
        { label: 'A market buy fills at', value: '$53.90 or worse' },
      ],
      body: [
        'The same stock that traded on a two-cent spread an hour earlier is now quoted four dollars wide, because almost nobody is there. A market order into that pays the full width, and the "price" it was placed against was a number from a session that had already ended.',
        'Volume in extended hours is a small fraction of regular trading, so every effect that liquidity normally suppresses is amplified: wider spreads, thinner depth, larger gaps between prints, and prices that can move a long way on very little size.',
        'Order handling changes too. Many brokers accept only limit orders outside regular hours, stop orders often do not work at all, and routing is limited to particular venues — which means the protective orders on your position may simply not be active while the stock is moving.',
        'The practical rule is narrow and firm: limit orders only, small size, and no assumption that a stop is guarding anything until the opening bell.',
      ],
    },
    mistakes: [
      'Using market orders in thin extended-hours conditions.',
      'Treating an after-hours price as a reliable indication of the next open.',
      'Assuming stop orders are active outside regular hours. Often they are not.',
    ],
    related: ['liquidity', 'spread', 'gap', 'earnings-report', 'time-in-force'],
  },
  {
    slug: 'circuit-breaker',
    term: 'Circuit Breaker',
    category: 'stocks',
    aliases: ['trading halt', 'limit up limit down', 'halted'],
    short: 'An automatic trading pause triggered by an extreme price move.',
    explanation: [
      'Exchanges halt trading in a security, or the entire market, when prices move beyond defined thresholds in a short window. The pause is meant to let information disseminate.',
      'For an individual stock, a halt typically lasts several minutes. Market-wide breakers trigger at set percentage declines and can close markets for the day at the extreme.',
      'During a halt you cannot trade at all. Your position is frozen and your stops cannot execute — and price often reopens far from where it stopped.',
    ],
    whyItMatters:
      'A halt is a period where your risk controls are switched off by the exchange. This is the clearest argument for sizing so that a single position cannot do serious damage.',
    example: {
      setup: 'A stock halted at $26, reopening at $19',
      steps: [
        { label: 'Price when halted', value: '$26.00' },
        { label: 'Stop resting at', value: '$25.20' },
        { label: 'Duration of halt', value: '18 minutes' },
        { label: 'Reopening print', value: '$19.00' },
      ],
      body: [
        'For eighteen minutes nothing could be done. Orders could not execute, the position could not be closed, and the stop sat there as inert as a note on a desk. When trading resumed it did so at $19, and the stop filled there.',
        'Halts exist for good reasons — to let news disseminate, or to interrupt a disorderly move — and the effect on an open position is the same regardless of the reason: every risk control you have is suspended by someone else, without notice, for an unknown length of time.',
        'They also tend to arrive on exactly the instruments and the days where a position is most likely to be in trouble. A halt is not a random event sprinkled across a calm market; it is correlated with the move that triggered it.',
        'Nothing in the order book protects against this. Only size does — a position small enough that reopening several points through the stop is an unpleasant day rather than a structural problem.',
      ],
    },
    mistakes: [
      'Assuming a stop will protect you through a volatility halt.',
      'Placing market orders immediately on a reopen when spreads are at their widest.',
    ],
    related: ['volatility', 'liquidity', 'slippage', 'gap', 'stop-loss'],
  },
  {
    slug: 'pattern-day-trader',
    term: 'Pattern Day Trader',
    category: 'stocks',
    aliases: ['pdt', 'pdt rule', 'day trading rule'],
    short: 'A US regulatory designation for accounts making four or more day trades in five business days.',
    explanation: [
      'The rule applies to margin accounts at US brokers. Four or more same-day round trips within five business days triggers the designation.',
      'Flagged accounts must maintain at least $25,000 in equity. Below that threshold, day trading is restricted until the balance is restored.',
      'It is a broker and regulatory constraint, not a market one, but it shapes what strategies are practical for smaller US accounts.',
    ],
    whyItMatters:
      'The rule can lock you out of closing a position the same day you opened it, which turns an intended day trade into an unintended overnight one with gap risk attached.',
    example: {
      setup: 'Three day trades used by Wednesday, on a $22,000 account',
      steps: [
        { label: 'Account equity', value: '$22,000' },
        { label: 'Threshold for the rule', value: '$25,000' },
        { label: 'Day trades allowed', value: '3 per 5 business days' },
        { label: 'Used by Wednesday', value: '3' },
      ],
      body: [
        'A fourth round trip before the window rolls forward flags the account as a pattern day trader, and below $25,000 that brings restrictions — commonly a freeze on opening new positions for ninety days.',
        'The dangerous version is not the restriction itself, it is the position it creates. A trade opened on Thursday cannot be closed on Thursday without using a day trade the account does not have, so a trade that was meant to last an hour is held overnight, with gap risk that was never part of the plan.',
        'Traders then manage the constraint rather than the trade: holding a loser into the next session to preserve a count, or refusing to enter a good setup because it is Thursday. Both are decisions about a brokerage rule being made inside a trading account.',
        'The rule applies to margin accounts in the US. The workable responses are to trade in a cash account and accept settlement timing, to hold positions longer than a day by design, or to keep equity above the threshold — but the one that causes damage is forgetting the count exists.',
      ],
    },
    mistakes: [
      'Being restricted mid-week and having to hold a losing trade overnight.',
      'Assuming the rule applies to cash accounts, where settlement rules apply instead.',
    ],
    related: ['broker', 'margin', 'gap', 'timeframe', 'trading-plan'],
  },
];
