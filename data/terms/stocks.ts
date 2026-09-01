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
    mistakes: [
      'Being restricted mid-week and having to hold a losing trade overnight.',
      'Assuming the rule applies to cash accounts, where settlement rules apply instead.',
    ],
    related: ['broker', 'margin', 'gap', 'timeframe', 'trading-plan'],
  },
];
