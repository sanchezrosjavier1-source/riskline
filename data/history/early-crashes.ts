import type { HistoryEvent } from '@/types/history';

export const earlyCrashesEvents: HistoryEvent[] = [
  {
    slug: 'black-monday-1987',
    title: 'Black Monday: The Day the Market Fell 22% in One Session',
    shortTitle: 'Black Monday (1987)',
    date: 'October 19, 1987',
    year: 1987,
    category: 'Stock Market Crash',
    dek: 'The Dow Jones Industrial Average fell 22.6% in a single trading day — still the largest one-day percentage decline in its history — with no single piece of news to explain it.',
    image: {
      src: '/images/history/black-monday-1987.jpg',
      alt: 'The New York Stock Exchange building facade with American flags',
    },
    facts: [
      { label: 'One-day decline', value: '−22.6%' },
      { label: 'Index', value: 'Dow Jones Industrial Average' },
      { label: 'Time to recover', value: 'About 2 years' },
    ],
    body: [
      'On October 19, 1987, the Dow Jones Industrial Average fell 508 points — 22.6% of its value — in a single session. Markets around the world followed within hours, with Hong Kong, Australia, the UK and other major exchanges posting double-digit losses of their own.',
      'There was no single headline behind it. Investigators later pointed to a combination of overvaluation after a strong multi-year rally, rising interest rates, and — critically — a new practice called portfolio insurance, where large institutions used computer-driven programs to automatically sell stock index futures as prices fell, intended to protect their portfolios.',
      'The problem was that thousands of institutions were running similar programs at the same time. As prices dropped, the programs sold, which pushed prices down further, which triggered more automated selling. The mechanism designed to protect individual portfolios amplified the crash for the market as a whole.',
    ],
    lesson: [
      'Black Monday is the reason exchanges now have circuit breakers — automatic trading halts triggered when an index falls a set percentage in a short window, giving the market a pause to absorb information instead of free-falling on automated momentum.',
      'The deeper lesson is about correlated, automated behavior. A strategy that looks safe when you are the only one using it can become dangerous when thousands of participants run the same logic simultaneously — the market has no mechanism to know that everyone is trying to exit through the same door at once.',
    ],
    relatedTerms: ['circuit-breaker', 'volatility', 'liquidity', 'drawdown', 'market-structure'],
  },
  {
    slug: 'black-wednesday-1992',
    title: 'Black Wednesday: Betting Against a Central Bank',
    date: 'September 16, 1992',
    year: 1992,
    category: 'Currency Crisis',
    dek: 'The UK was forced out of the European Exchange Rate Mechanism in a single day after speculators, including George Soros, bet billions against the pound holding its pegged value.',
    image: {
      src: '/images/history/black-wednesday-1992.jpg',
      alt: 'A pile of British pound sterling banknotes',
    },
    facts: [
      { label: 'Estimated UK Treasury cost', value: '£3.3 billion+' },
      { label: 'Soros fund profit (reported)', value: '~$1 billion' },
      { label: 'Outcome', value: 'UK exits the ERM within hours' },
    ],
    body: [
      'The UK had pegged the pound to the German mark within a fixed band under the European Exchange Rate Mechanism (ERM). By September 1992, most traders believed that peg was unsustainable — the UK\'s interest rates and economic conditions did not match what the peg required, and the pound was, in the market\'s view, overvalued.',
      'Currency speculators, most famously George Soros\'s fund, built enormous short positions against the pound — betting it would be devalued or forced out of the band. The Bank of England tried to defend the peg by buying pounds and raising interest rates twice in a single day, from 10% to 15%, in a last attempt to make holding the currency attractive.',
      'It did not work. The scale of selling overwhelmed the defense, and by the evening the UK withdrew the pound from the ERM entirely, letting it float freely and devalue.',
    ],
    lesson: [
      'This is one of the clearest historical examples of a currency peg failing under enough pressure — no institution, including a central bank, can defend a price level indefinitely if the market fundamentally disagrees with it and has the size to press the point.',
      'For anyone trading currency pairs today, it is a reminder that pegs and fixed bands carry a specific kind of risk: they hold steady for long stretches and then move suddenly and violently when they break, rather than adjusting gradually. Leverage into a pegged pair on the assumption the peg is permanent has caused outsized losses more than once — see the Swiss franc shock decades later for a near-identical pattern.',
    ],
    relatedTerms: ['currency-pair', 'leverage', 'volatility', 'major-pair', 'liquidity'],
  },
  {
    slug: 'ltcm-collapse-1998',
    title: 'Long-Term Capital Management: When the Smartest People in the Room Used Too Much Leverage',
    shortTitle: 'The LTCM Collapse (1998)',
    date: 'September 1998',
    year: 1998,
    category: 'Leverage & Derivatives',
    dek: 'A hedge fund run by Nobel laureates and star traders lost over $4 billion in a matter of weeks, threatening the wider financial system and forcing a Wall Street-funded bailout.',
    image: {
      src: '/images/history/ltcm-collapse-1998.jpg',
      alt: 'A black-and-white photo of a Wall Street street sign',
    },
    facts: [
      { label: 'Peak leverage', value: 'Reported around 25:1 on capital' },
      { label: 'Losses', value: '$4.6 billion in under 4 months' },
      { label: 'Resolution', value: '$3.6B bailout by 14 banks, coordinated by the Fed' },
    ],
    body: [
      'Long-Term Capital Management was a hedge fund founded in 1994, staffed with elite traders and two Nobel Prize-winning economists. Its strategy relied on sophisticated statistical models identifying small, reliable pricing gaps between related securities — and using very high leverage to turn those small gaps into large returns.',
      'The models assumed that historical relationships between markets would hold, or at worst, revert gradually. In 1998, Russia defaulted on its debt, and global markets reacted in ways the models had not anticipated — volatility spiked and the statistical relationships LTCM relied on broke down simultaneously, across nearly every position the fund held at once.',
      'Because the fund was leveraged so heavily, losses that would have been manageable at a normal position size instead threatened to wipe out the fund entirely — and because LTCM\'s positions were so large relative to the markets it traded, its potential collapse threatened to disrupt those markets directly. The Federal Reserve organized a consortium of banks to inject capital and unwind the fund in an orderly way rather than risk a disorderly one.',
    ],
    lesson: [
      'LTCM is the definitive case study for why leverage turns a survivable loss into an existential one. The fund\'s underlying trades were not obviously wrong — many of the pricing gaps it identified did eventually close as predicted. It failed because it was sized so aggressively that it could not survive the time it took to be right.',
      'It is also a lesson about model risk: a strategy validated on historical data can fail exactly when it matters most, because a genuine crisis is, by definition, a period where historical relationships stop holding. Sizing a leveraged position assuming your model is correct is different from sizing it assuming your model could be wrong at the worst possible time.',
    ],
    relatedTerms: ['leverage', 'risk-of-ruin', 'margin-call', 'correlation-risk', 'drawdown'],
  },
  {
    slug: 'dotcom-bubble-2000',
    title: 'The Dot-Com Bubble: When Growth Stories Replaced Profits',
    shortTitle: 'The Dot-Com Bubble',
    date: 'March 2000 – October 2002',
    year: 2000,
    category: 'Stock Market Crash',
    dek: 'The Nasdaq Composite fell nearly 78% from its peak as investors realized that many internet companies trading at enormous valuations had little revenue and no path to profit.',
    image: {
      src: '/images/history/dotcom-bubble-2000.jpg',
      alt: 'A retro white Macintosh computer from the late 1990s',
    },
    facts: [
      { label: 'Nasdaq peak-to-trough decline', value: '−78%' },
      { label: 'Duration of decline', value: 'About 2.5 years' },
      { label: 'Recovery to prior peak', value: 'About 15 years' },
    ],
    body: [
      'Through the late 1990s, the rise of the internet drove enormous speculative investment into any company associated with it. Many of these companies had little or no revenue, and some had no clear plan to ever generate profit — the market was pricing them on growth narratives and user counts rather than earnings.',
      'The Nasdaq Composite, heavy with technology stocks, rose roughly fivefold between 1995 and its peak in March 2000. Starting that month, sentiment reversed. Companies that had been valued in the billions on projected future growth began reporting the losses and cash burn that had been there all along, and the market began pricing that reality in.',
      'The decline was not a single crash but a prolonged grind lower over roughly two and a half years, wiping out the vast majority of value in many internet-era companies — most of which never recovered and eventually shut down entirely.',
    ],
    lesson: [
      'The dot-com bubble is a case study in how a genuinely important trend — the internet was, in fact, transformative — does not mean every company riding that trend is a good investment at any price. Being right about the theme and being right about the specific position are two different questions.',
      'For traders, the long, grinding nature of the decline (not one crash, but two and a half years of lower highs and lower lows) is also instructive: a bear market does not need a single dramatic event to be destructive. Positions held through the entire decline on the belief that a recovery was imminent compounded losses for years.',
    ],
    relatedTerms: ['bear-market', 'volatility', 'trend', 'drawdown', 'expectancy'],
  },
  {
    slug: 'enron-collapse-2001',
    title: 'Enron: Concentration Risk and the Cost of Trusting One Company Too Much',
    shortTitle: "Enron's Collapse",
    date: 'October – December 2001',
    year: 2001,
    category: 'Fraud & Collapse',
    dek: 'Once America\'s seventh-largest company by revenue, Enron collapsed into bankruptcy within weeks after accounting fraud that had hidden billions in debt was exposed — wiping out employees who held their retirement savings in company stock.',
    image: {
      src: '/images/history/enron-collapse-2001.jpg',
      alt: 'An industrial tower at an energy plant lit up at night',
    },
    facts: [
      { label: 'Market value at peak', value: '~$70 billion' },
      { label: 'Time from scandal to bankruptcy', value: 'About 6 weeks' },
      { label: 'Employee retirement losses', value: 'Estimated at $1B+' },
    ],
    body: [
      'Enron was an energy trading company that, through the late 1990s, was celebrated as one of the most innovative firms in America. In October 2001, it was revealed that the company had used complex off-the-books accounting structures to hide billions of dollars in debt and inflate its reported earnings for years.',
      'Confidence collapsed almost immediately. The stock, which had traded above $90 a year earlier, fell below $1 within weeks, and the company filed for what was then the largest bankruptcy in US history. Its auditor, Arthur Andersen, also collapsed as a result of the scandal.',
      'The most severe damage fell on Enron\'s own employees. Many held a large share of their 401(k) retirement savings in company stock — encouraged, in part, by company matching programs paid in Enron shares — and had restrictions preventing them from selling during the critical weeks of the collapse. Many lost the majority of their retirement savings at the same time they lost their jobs.',
    ],
    lesson: [
      'Enron is the clearest possible illustration of concentration risk: holding a large share of your wealth in a single asset, especially one tied to your own employer, means a single company-specific event can devastate both your income and your savings simultaneously — there is no diversification left to absorb the shock.',
      'It is also a reminder that a stock\'s price is not proof that a company\'s underlying numbers are sound. Enron traded near its all-time high mere months before the fraud was exposed — the market had priced in trust that turned out to be unearned.',
    ],
    relatedTerms: ['correlation-risk', 'portfolio-heat', 'risk-management', 'market-cap', 'volatility'],
  },
];
