import type { HistoryEvent } from '@/types/history';

export const financialCrisisEraEvents: HistoryEvent[] = [
  {
    slug: 'global-financial-crisis-2008',
    title: 'The 2008 Financial Crisis: How Leverage Turned a Housing Slowdown Into a Global Collapse',
    shortTitle: 'The 2008 Financial Crisis',
    date: '2007 – 2009',
    year: 2008,
    category: 'Systemic Risk',
    dek: 'A downturn in the US housing market cascaded into a global financial crisis after highly leveraged bets on mortgage debt, spread across the banking system, turned manageable losses into a solvency crisis.',
    facts: [
      { label: 'S&P 500 peak-to-trough decline', value: '−57%' },
      { label: 'Lehman Brothers', value: 'Filed the largest bankruptcy in US history' },
      { label: 'Recovery to prior peak', value: 'About 5.5 years' },
    ],
    body: [
      'Through the mid-2000s, mortgage lending standards loosened substantially in the US, and a large volume of loans were made to borrowers with weak credit. These mortgages were packaged into complex securities and sold to investors worldwide, often repackaged multiple times into instruments that made the underlying risk difficult to assess.',
      'Many financial institutions held these securities using significant leverage, and insured against their default through instruments like credit default swaps — themselves often written by insurers who had not set aside enough capital to cover the risk they were taking on. When US home prices began falling and mortgage defaults rose, the losses moved through this leveraged, interconnected chain far faster and further than the size of the original housing decline alone would suggest.',
      'In September 2008, the investment bank Lehman Brothers collapsed, and panic spread through the global banking system as institutions realized they could not be certain which counterparties were solvent. Credit markets froze, major banks required government rescue, and the S&P 500 fell 57% from its 2007 peak to its March 2009 low.',
    ],
    lesson: [
      'The 2008 crisis is the largest-scale demonstration of a theme that runs through nearly every entry in this history: leverage does not just amplify your own losses, it can transmit risk to parties you have never interacted with, through a chain of counterparty relationships that is often invisible until it breaks.',
      'It is also a lesson in correlation at the worst possible time. Mortgage securities from different regions and lenders were assumed to be diversified from one another — until a nationwide decline in home prices made them fail together, all at once, exactly when investors most needed them not to.',
    ],
    relatedTerms: ['leverage', 'margin-call', 'correlation-risk', 'drawdown', 'risk-of-ruin'],
  },
  {
    slug: 'madoff-ponzi-scheme-2008',
    title: 'Bernie Madoff: The $65 Billion Ponzi Scheme That Ran for Decades',
    shortTitle: 'The Madoff Ponzi Scheme',
    date: 'Exposed December 2008',
    year: 2008,
    category: 'Fraud & Collapse',
    dek: 'Bernie Madoff ran the largest Ponzi scheme in history, reporting steady, market-beating returns for decades that were entirely fabricated — the fraud only surfaced when the 2008 crisis triggered enough redemption requests to expose it.',
    facts: [
      { label: 'Estimated scale of fraud', value: '~$65 billion (reported balances)' },
      { label: 'Duration', value: 'Reportedly decades' },
      { label: 'What was reported', value: 'Consistently smooth, positive returns' },
    ],
    body: [
      'Bernie Madoff ran an investment firm that reported steady, unusually consistent positive returns year after year, including through periods when the broader market fell. In reality, no trading was occurring — the firm was a Ponzi scheme, paying existing investors\' returns using money from new investors, a structure that requires a continuously growing pool of new money to survive.',
      'The scheme survived for decades in part because Madoff had built substantial credibility, having previously chaired the Nasdaq stock exchange, and in part because his reported returns, while impressive, were not so extreme that they demanded scrutiny — a subtler and more sustainable fraud than a scheme promising extraordinary short-term gains.',
      'It collapsed in December 2008, when the broader financial crisis caused a wave of investors to request redemptions simultaneously. With no real underlying assets to sell, Madoff could not meet the requests, and the fraud unraveled. He was later sentenced to 150 years in prison.',
    ],
    lesson: [
      'The defining warning sign, visible in hindsight, was consistency that was too good: real markets have volatility, and a strategy reporting smooth positive returns with none of the drawdowns the rest of the market experienced should raise questions rather than confidence.',
      'It is also a lesson in the limits of reputation as due diligence. Sophisticated investors, charities and financial institutions were all deceived for years — credibility and a respected background are not a substitute for verifying how returns are actually being generated.',
    ],
    relatedTerms: ['expectancy', 'volatility', 'drawdown', 'risk-management', 'correlation-risk'],
  },
  {
    slug: 'flash-crash-2010',
    title: 'The Flash Crash: When the Market Fell 9% and Recovered in Minutes',
    shortTitle: 'The 2010 Flash Crash',
    date: 'May 6, 2010',
    year: 2010,
    category: 'Systemic Risk',
    dek: 'The Dow Jones plunged around 9% in minutes — including a period where some stocks traded for pennies — before largely recovering the same afternoon, exposing how thin liquidity had become in electronic, algorithm-driven markets.',
    facts: [
      { label: 'Intraday decline', value: '~9% in about 36 minutes' },
      { label: 'Recovery', value: 'Most of the loss reversed the same day' },
      { label: 'Some stocks briefly traded at', value: 'As low as $0.01' },
    ],
    body: [
      'On the afternoon of May 6, 2010, US markets already under pressure from European debt concerns began falling sharply and rapidly. Within about 36 minutes, the Dow Jones Industrial Average dropped roughly 9%, erasing close to a trillion dollars in market value, before recovering the majority of the loss within the same session.',
      'During the worst of the plunge, the automated liquidity that normally keeps markets functioning evaporated. Some large, well-known stocks briefly traded for a single cent, while others spiked to absurdly high prices, as market makers\' systems paused or withdrew rather than trade into conditions their models could not make sense of.',
      'Investigation later pointed to a combination of factors, including a very large automated sell order in futures contracts interacting with high-frequency trading algorithms in a feedback loop, compounded by that sudden withdrawal of liquidity across many stocks at once.',
    ],
    lesson: [
      'The Flash Crash is the sharpest illustration available of how thin liquidity can become in seconds, even in the most heavily traded markets in the world. A stop order resting during that window would have filled at a price with no relationship to the stock\'s value moments earlier.',
      'It is also why exchanges introduced more granular, stock-by-stock circuit breakers afterward, rather than relying solely on market-wide ones — a mechanism that pauses trading in an individual stock when it moves too far, too fast, giving liquidity time to return before more orders execute into a vacuum.',
    ],
    relatedTerms: ['liquidity', 'slippage', 'stop-loss', 'circuit-breaker', 'volatility'],
  },
  {
    slug: 'european-debt-crisis-2010',
    title: 'The European Sovereign Debt Crisis: When "Safe" Government Bonds Weren\'t',
    shortTitle: 'The European Debt Crisis',
    date: '2010 – 2012',
    year: 2010,
    category: 'Systemic Risk',
    dek: 'Greece, and later other eurozone countries, came close to defaulting on sovereign debt that investors had long treated as essentially risk-free — forcing a reassessment of what "safe" actually means in a currency union without a shared fiscal backstop.',
    facts: [
      { label: 'Greek 10-year bond yield peak', value: 'Above 30%' },
      { label: 'Countries requiring bailouts', value: 'Greece, Ireland, Portugal, Cyprus' },
      { label: 'Resolution mechanism', value: 'ECB and EU-led bailout programs' },
    ],
    body: [
      'Government bonds from developed economies are typically treated by markets as close to risk-free — a benchmark other assets are priced against. Starting in 2009, it became clear that Greece\'s government debt and deficits were far larger than previously reported, and the market began questioning whether Greece could repay what it owed.',
      'Because Greece shared a currency with the rest of the eurozone, it could not simply devalue its own currency to ease the burden the way a country with an independent currency might. Yields on Greek bonds — the interest rate the market demanded to hold them — rose dramatically as the perceived risk of default increased, at one point exceeding 30% on 10-year debt.',
      'The crisis spread as investors began questioning other eurozone countries with high debt loads, including Ireland, Portugal, Spain and Italy. Multiple rounds of bailouts, restructuring and, in Greece\'s case, an eventual default on part of its debt, unfolded over several years before the situation stabilized, with the European Central Bank\'s later commitment to do "whatever it takes" to preserve the currency union widely credited with calming markets.',
    ],
    lesson: [
      'The crisis is a reminder that "safe asset" is a relative label, not an absolute one — government debt carries real credit risk that can reprice sharply when fiscal conditions deteriorate, even for developed economies.',
      'It also illustrates correlation risk at the level of an entire currency union: eurozone assets that seemed unrelated to Greece specifically still moved together as the crisis spread, because participants realized the currency union itself connected their fates in ways that were easy to overlook during calmer periods.',
    ],
    relatedTerms: ['volatility', 'correlation-risk', 'drawdown', 'risk-management', 'currency-pair'],
  },
  {
    slug: 'knight-capital-2012',
    title: 'Knight Capital: A $440 Million Loss in 45 Minutes From a Software Error',
    shortTitle: "Knight Capital's Glitch",
    date: 'August 1, 2012',
    year: 2012,
    category: 'Leverage & Derivatives',
    dek: 'A botched software deployment caused Knight Capital\'s trading systems to flood the market with unintended orders, losing roughly $440 million in 45 minutes and destroying the firm — a pure technology and process failure, with no market crash involved at all.',
    facts: [
      { label: 'Losses', value: '~$440 million' },
      { label: 'Duration', value: '45 minutes' },
      { label: 'Outcome', value: 'Firm required emergency rescue funding, later acquired' },
    ],
    body: [
      'Knight Capital was one of the largest market-making firms in the US, handling a significant share of daily US equity trading volume. On August 1, 2012, the firm deployed new trading software to its systems — but old, unused testing code was accidentally left active on one of the servers being updated.',
      'When markets opened, that old code began executing a rapid, unintended stream of erroneous orders across around 150 stocks, buying high and selling low repeatedly in a pattern that made no economic sense. It took Knight\'s engineers 45 minutes to identify the problem and shut the system down — by which point the firm had accumulated a loss of roughly $440 million, more than its entire net worth.',
      'The firm survived only through an emergency capital injection from a group of investors, arranged within days, and was acquired by a competitor the following year.',
    ],
    lesson: [
      'Unlike almost every other event in this history, Knight Capital was not caused by a market crash, a bad trade thesis, or excess leverage in the traditional sense — it was a pure operational and technology failure that happened to occur in a market context where mistakes execute instantly and at scale.',
      'For any trader who automates part of their process — even something as simple as an alert or a script — it is a reminder that the speed automation provides cuts both ways: a human making a bad decision loses money slowly enough to notice and stop; software with a bug can lose a comparable amount before anyone realizes something is wrong.',
    ],
    relatedTerms: ['liquidity', 'slippage', 'risk-management', 'volatility', 'market-order'],
  },
];
