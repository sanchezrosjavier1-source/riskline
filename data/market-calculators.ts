import type { MarketCalculatorPage } from '@/types/market-page';

/**
 * One entry per market-specific calculator page. Everything a page says lives
 * here; the route component reads it and renders. Adding a fourth market means
 * adding an object, not another page.
 */
export const MARKET_CALCULATOR_PAGES: MarketCalculatorPage[] = [
  // ------------------------------------------------------------------- forex
  {
    slug: 'forex',
    market: 'forex',
    title: 'Forex Position Size Calculator',
    metaTitle: 'Forex Position Size Calculator — Pips & Lots',
    metaDescription:
      'Work out forex lot size from your account, risk percent and stop in pips. Shows standard, mini and micro lots plus what each pip is worth to you.',
    keywords: [
      'forex position size calculator',
      'lot size calculator',
      'pip calculator',
      'forex risk calculator',
      'how many lots to trade',
    ],
    h1: 'Forex Position Size Calculator',
    dek: 'Set your account, the percent you are risking and how far your stop sits in pips. It returns the lot size that keeps the loss to exactly what you chose.',
    unit: 'unit',
    unitPlural: 'units',
    cardBlurb: 'Sized in pips and lots, the way a forex platform asks for it.',
    example: {
      accountSize: 10000,
      riskPercent: 1,
      entry: 1.085,
      stopLoss: 1.08,
      takeProfit: 1.095,
    },
    sections: [
      {
        heading: 'Why pips make the sizing easier, not harder',
        body: [
          'A pip is the standard unit a currency pair moves in: 0.0001 for most pairs, and 0.01 for anything quoted in yen. Measuring your stop in pips rather than in decimals is what lets you compare a EUR/USD trade against a USD/JPY one without doing arithmetic in your head.',
          'The useful number that falls out of it is risk per pip. If you are risking 100 of your account currency and your stop is 50 pips away, each pip is worth 2 to you. That figure holds no matter which pair you trade or what currency your account is denominated in, because it is simply your risk budget divided across the distance to your stop.',
        ],
      },
      {
        heading: 'Standard, mini and micro lots',
        body: [
          'A standard lot is 100,000 units of the base currency, a mini lot is 10,000 and a micro lot is 1,000. Your broker will ask for one of these, so the calculator converts the raw unit count into whichever you trade in.',
          'Fractional lots are normal and expected. A correctly sized position frequently comes out at something like 0.27 standard lots — that is not a rounding error, it is what the arithmetic produced, and rounding it up to a whole lot means quietly risking more than you decided to.',
        ],
      },
      {
        heading: 'Leverage does not change the answer',
        body: [
          'Leverage decides whether your broker will let you open the position and how much margin it ties up. It does not decide how much you lose if the stop is hit — that is set by your stop distance and your position size, both of which you control.',
          'This is why the calculator never asks for your leverage. Two traders on 30:1 and 500:1 with the same account, the same risk percent and the same stop should place exactly the same size.',
        ],
      },
    ],
    faq: [
      {
        question: 'How do I calculate lot size from a stop in pips?',
        answer:
          'Divide the money you are risking by the pip distance to get the value of each pip, then divide that by what one pip is worth per lot. The calculator does both steps and shows the lot size directly.',
      },
      {
        question: 'What is a pip worth?',
        answer:
          'It depends on the pair, the lot size and your account currency. Rather than assume any of those, this calculator works backwards from your own risk: your total risk divided by your stop in pips is what each pip is worth to you on this trade.',
      },
      {
        question: 'Should I use standard, mini or micro lots?',
        answer:
          'Whichever your broker offers and your account can size sensibly. Smaller accounts usually need mini or micro lots, because one standard lot can represent more risk per pip than a small account should take on a single trade.',
      },
      {
        question: 'Does this account for spread and swap?',
        answer:
          'No. It sizes the position from your stop distance. Spread widens your effective entry and swap accrues overnight, so both make the real outcome slightly worse than the calculated one. Check them with your broker before placing the trade.',
      },
    ],
    relatedTerms: ['pip', 'pip-value', 'lot', 'currency-pair', 'major-pair', 'leverage', 'spread'],
  },

  // ----------------------------------------------------------------- futures
  {
    slug: 'futures',
    market: 'futures',
    title: 'Futures Position Size Calculator',
    metaTitle: 'Futures Position Size Calculator — Ticks',
    metaDescription:
      'How many ES, NQ or MES contracts to trade. Enter account, risk percent and stop in ticks, with real CME tick values already filled in.',
    keywords: [
      'futures position size calculator',
      'how many contracts to trade',
      'es tick value calculator',
      'futures risk calculator',
      'nq contract calculator',
    ],
    h1: 'Futures Position Size Calculator',
    dek: 'Pick your contract, set your risk, and see how many contracts that actually allows. Tick sizes and tick values for the CME contracts are already in.',
    unit: 'contract',
    unitPlural: 'contracts',
    cardBlurb: 'Ticks and contract specs for ES, NQ, MES, CL and more.',
    example: {
      accountSize: 50000,
      riskPercent: 1,
      entry: 5000,
      stopLoss: 4995,
      takeProfit: 5015,
    },
    sections: [
      {
        heading: 'Why futures maths is genuinely different',
        body: [
          'In stocks, a one dollar move on one share is one dollar. In futures it is not: each contract has a tick size set by the exchange and a fixed amount of money attached to that tick. An E-mini S&P contract moves in quarter-point ticks worth $12.50 each, so a ten-point stop is forty ticks and $500 of risk on a single contract.',
          'Getting this wrong is expensive in a specific way. Sizing an ES trade as though a point were a dollar understates your risk by a factor of fifty, and the mistake only becomes visible when the stop is hit.',
        ],
      },
      {
        heading: 'Ticks, points and contract value',
        body: [
          'Tick value divided by tick size gives the point value: $12.50 over 0.25 is $50 a point for ES. This page derives it rather than storing it separately, so the two can never disagree.',
          'Micro contracts are exactly one tenth of their full-size sibling. MES is $1.25 a tick against ES at $12.50, which is what makes them the practical choice for an account too small to risk a full contract on a sensible stop.',
        ],
      },
      {
        heading: 'When one contract is already too much',
        body: [
          'Futures cannot be traded fractionally. If the arithmetic says 0.4 contracts, the honest reading is that this trade at this stop distance does not fit your account — not that you should round up to one.',
          'The two real options are a smaller contract, if a micro version exists, or a tighter stop that you would have placed anyway for reasons other than making the size work. Widening your risk percent to justify the position is how accounts get into trouble.',
        ],
      },
    ],
    faq: [
      {
        question: 'How many futures contracts should I trade?',
        answer:
          'Divide the money you are risking by the risk on one contract, which is your stop in ticks multiplied by the tick value. Round down: a partial contract cannot be traded.',
      },
      {
        question: 'What is the tick value of ES?',
        answer:
          'The E-mini S&P 500 moves in ticks of 0.25 index points, each worth $12.50, which works out to $50 per full point. The micro version, MES, is $1.25 a tick and $5 a point.',
      },
      {
        question: 'Why does the calculator say I can only trade 0.4 contracts?',
        answer:
          'Because at that stop distance a single contract would risk more than the percent you set. Use a micro contract if one exists for that market, or accept that the trade does not fit the account — do not round up.',
      },
      {
        question: 'Does this include margin?',
        answer:
          'No, and the two are separate questions. Margin is what the broker requires you to post to hold the position; risk is what you lose if the stop is hit. A position can be well within your margin and still be far too large for your account.',
      },
    ],
    relatedTerms: ['notional-value', 'leverage', 'margin', 'liquidation-price', 'stop-loss', 'volatility'],
  },

  // ------------------------------------------------------------------ crypto
  {
    slug: 'crypto',
    market: 'crypto',
    title: 'Crypto Position Size Calculator',
    metaTitle: 'Crypto Position Size Calculator — Satoshis',
    metaDescription:
      'Size a crypto trade to a fixed risk. Handles fractional positions down to satoshi precision, so a real position never rounds away to zero.',
    keywords: [
      'crypto position size calculator',
      'bitcoin position size calculator',
      'crypto risk calculator',
      'satoshi calculator',
      'how much bitcoin to buy',
    ],
    h1: 'Crypto Position Size Calculator',
    dek: 'Set what you are willing to lose and where you are wrong. It returns a position size with enough decimal places to actually be placed, in coins and in satoshis.',
    unit: 'coin',
    unitPlural: 'coins',
    cardBlurb: 'Fractional sizing down to satoshis, for six-figure coin prices.',
    example: {
      accountSize: 10000,
      riskPercent: 1,
      entry: 78000,
      stopLoss: 74000,
      takeProfit: 90000,
    },
    sections: [
      {
        heading: 'Why crypto needs more decimal places',
        body: [
          'When one coin costs tens of thousands, a correctly sized position for a normal account is a fraction of one. Risking 100 with a 4,000 stop distance gives 0.025 coins — a real, placeable position that a calculator built for share counts would round to zero and a calculator built for whole units would refuse.',
          'Below a whole coin the display here widens to as many as eight decimal places, which is the smallest unit bitcoin divides into. That unit is called a satoshi, and 0.025 BTC is 2,500,000 of them.',
        ],
      },
      {
        heading: 'Volatility is the reason the stop is wide',
        body: [
          'Crypto routinely moves several percent in a session, so a stop placed close enough to feel cheap is usually just a stop that gets hit by noise. A wider stop is not a bigger loss — it is a smaller position for the same loss, which is the trade-off this calculator exists to make explicit.',
          'The number worth watching on this page is position value against your account. A modest risk percent on a volatile asset can still produce a position worth more than the account, which is only possible on leverage and brings liquidation into play well before your stop does.',
        ],
      },
      {
        heading: 'Exchange risk is not in these numbers',
        body: [
          'This sizes the market risk of the trade. It cannot size the risk of the venue holding your coins, which has historically been the larger of the two: the failures in this market have wiped out balances that were never in a losing position at all.',
          'Position sizing assumes the account still exists when the trade closes. Keep on any single platform only what you need to trade with.',
        ],
      },
    ],
    faq: [
      {
        question: 'How much bitcoin should I buy for a trade?',
        answer:
          'Divide the money you are risking by the distance from your entry to your stop. Risking 100 with a 4,000 stop gives 0.025 BTC, regardless of what the coin costs.',
      },
      {
        question: 'What is a satoshi?',
        answer:
          'The smallest unit of bitcoin: one hundred millionth of a coin. Position sizes below a whole coin are often clearer read in satoshis, so this calculator shows both.',
      },
      {
        question: 'Does this work for altcoins?',
        answer:
          'Yes. The arithmetic does not care what the asset is called or what it costs — only your risk budget and your stop distance. Sub-cent prices are handled with extra precision rather than rounded away.',
      },
      {
        question: 'Does it account for leverage or liquidation?',
        answer:
          'No. It sizes the position from your stop. If the position value exceeds your account you are using leverage, and a liquidation price then sits somewhere that your stop may never be reached — check it on the exchange before entering.',
      },
    ],
    relatedTerms: ['altcoin', 'volatility', 'liquidation-price', 'cold-storage', 'spot-market', 'stablecoin'],
  },
];

export function getMarketCalculatorPage(slug: string): MarketCalculatorPage | undefined {
  return MARKET_CALCULATOR_PAGES.find((page) => page.slug === slug);
}

export function getAllMarketCalculatorSlugs(): string[] {
  return MARKET_CALCULATOR_PAGES.map((page) => page.slug);
}
