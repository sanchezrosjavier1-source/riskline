import type { Term } from '@/types/dictionary';

export const forexTerms: Term[] = [
  {
    slug: 'pip',
    term: 'Pip',
    category: 'forex',
    aliases: ['pips', 'percentage in point', 'pipette'],
    short: 'The standard smallest price increment in a currency pair — usually 0.0001.',
    explanation: [
      'For most pairs a pip is the fourth decimal place. EUR/USD moving from 1.0850 to 1.0851 is a one-pip move.',
      'Yen pairs are the main exception. Because they are quoted to two decimals, a pip there is 0.01.',
      'Many brokers quote a fifth decimal, called a pipette or fractional pip, which is a tenth of a pip. It is easy to misread a quote by a factor of ten.',
    ],
    whyItMatters:
      'Pips are the unit your stop distance is measured in, and stop distance is what your position size is calculated from. Getting the pip definition wrong scales the entire trade incorrectly.',
    mistakes: [
      'Applying the 0.0001 pip definition to yen pairs.',
      'Confusing pipettes with pips and sizing ten times too large.',
    ],
    related: ['pip-value', 'lot', 'currency-pair', 'stop-distance', 'position-size'],
    popular: true,
  },
  {
    slug: 'pip-value',
    term: 'Pip Value',
    category: 'forex',
    aliases: ['value per pip', 'dollar per pip'],
    short: 'How much one pip of movement is worth in your account currency, given your position size.',
    explanation: [
      'Pip value converts price movement into money. On a standard lot of 100,000 units with the US dollar as the quote currency, one pip is worth $10.',
      'It scales linearly with size: a mini lot (10,000 units) is $1 per pip, a micro lot (1,000 units) is $0.10 per pip.',
      'When the quote currency is not your account currency, the pip value floats with the exchange rate and must be converted.',
    ],
    formula: {
      label: 'Pip Value',
      expression: '(Pip Size ÷ Exchange Rate) × Lot Size',
      legend: [
        { symbol: 'Pip Size', meaning: '0.0001 for most pairs, 0.01 for yen pairs' },
        { symbol: 'Lot Size', meaning: 'Units of the base currency in the position' },
      ],
    },
    widget: 'pip-value',
    whyItMatters:
      'Pip value is the forex equivalent of risk per share. Your risk budget divided by (stop in pips × pip value) is your position size.',
    mistakes: [
      'Assuming $10 per pip on every pair regardless of quote currency.',
      'Ignoring exchange-rate drift on pairs where the quote currency is not your account currency.',
    ],
    related: ['pip', 'lot', 'position-size', 'stop-distance', 'currency-pair'],
    tools: [{ label: 'Size a forex position', href: '/calculator' }],
  },
  {
    slug: 'lot',
    term: 'Lot',
    category: 'forex',
    aliases: ['standard lot', 'mini lot', 'micro lot', 'lot size'],
    short: 'The standardized unit of trade size in forex.',
    explanation: [
      'A standard lot is 100,000 units of the base currency. A mini lot is 10,000, a micro lot 1,000, and some brokers offer nano lots of 100.',
      'Lot size is the forex equivalent of share count. It is the variable you adjust to bring a trade’s risk in line with your risk budget.',
      'Because lots are large and leverage is common, small errors in lot sizing produce disproportionately large errors in risk.',
    ],
    whyItMatters:
      'Choosing lot size before calculating risk is the most common forex sizing error. It should be the output of the calculation, not the input.',
    mistakes: [
      'Trading a standard lot on a small account because the platform defaults to it.',
      'Confusing lot sizes between broker platforms that label them differently.',
    ],
    related: ['pip-value', 'pip', 'position-size', 'leverage', 'margin'],
  },
  {
    slug: 'currency-pair',
    term: 'Currency Pair',
    category: 'forex',
    aliases: ['fx pair', 'pair'],
    short: 'Two currencies quoted against each other, showing how much of one buys the other.',
    explanation: [
      'A pair like EUR/USD quotes the euro in terms of dollars. Buying the pair means buying euros and simultaneously selling dollars.',
      'Every forex trade is therefore two positions at once. You are always long one currency and short another.',
      'This is why forex has no true "short". Selling EUR/USD is simply buying USD/EUR, which is one reason there are no borrow costs.',
    ],
    whyItMatters:
      'Because each trade involves two currencies, positions across different pairs can be far more correlated than they look — several trades can be the same dollar bet in disguise.',
    mistakes: [
      'Holding several pairs that share a currency and treating them as independent risks.',
      'Forgetting that news on the quote currency moves the pair just as much as news on the base.',
    ],
    related: ['base-currency', 'quote-currency', 'major-pair', 'correlation-risk', 'pip'],
  },
  {
    slug: 'base-currency',
    term: 'Base Currency',
    category: 'forex',
    aliases: ['first currency'],
    short: 'The first currency in a pair — the one being bought or sold.',
    explanation: [
      'In EUR/USD, the euro is the base currency. The quote tells you how many dollars one euro costs.',
      'Position size in forex is denominated in units of the base currency. A standard lot of EUR/USD is 100,000 euros.',
      'When the pair rises, the base currency is strengthening relative to the quote currency.',
    ],
    whyItMatters:
      'Lot sizes are measured in base currency units, so the base currency determines what your position size actually represents.',
    mistakes: [
      'Mixing up which currency you are actually long.',
      'Assuming position value is in your account currency when it is in the base currency.',
    ],
    related: ['quote-currency', 'currency-pair', 'lot', 'pip-value', 'major-pair'],
  },
  {
    slug: 'quote-currency',
    term: 'Quote Currency',
    category: 'forex',
    aliases: ['counter currency', 'second currency'],
    short: 'The second currency in a pair — the one the price is expressed in.',
    explanation: [
      'In EUR/USD the dollar is the quote currency. The price 1.0850 means one euro costs 1.0850 dollars.',
      'Profit and loss are calculated in the quote currency, then converted to your account currency if they differ.',
      'This conversion is why pip value is fixed on pairs quoted in your account currency and floats on all the others.',
    ],
    whyItMatters:
      'The quote currency determines your pip value, which determines your position size. On cross pairs, that value drifts with the exchange rate.',
    mistakes: [
      'Assuming a fixed pip value on pairs not quoted in your account currency.',
      'Ignoring the conversion when reconciling expected and actual profit.',
    ],
    related: ['base-currency', 'pip-value', 'currency-pair', 'major-pair', 'pip'],
  },
  {
    slug: 'major-pair',
    term: 'Major Pair',
    category: 'forex',
    aliases: ['majors', 'major currency pair'],
    short: 'The most heavily traded currency pairs, all involving the US dollar.',
    explanation: [
      'The majors are EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD and NZD/USD.',
      'They carry the deepest liquidity and tightest spreads, which makes execution cheaper and more predictable.',
      'Pairs without the dollar are called crosses, and pairs involving smaller economies are exotics. Both have wider spreads and thinner books.',
    ],
    whyItMatters:
      'Spread is a fixed cost on every trade. On majors it is a small fraction of a typical move; on exotics it can consume a meaningful part of the expected profit.',
    mistakes: [
      'Trading exotics on short timeframes where the spread dominates the edge.',
      'Assuming exotic spreads stay stable during volatile sessions.',
    ],
    related: ['currency-pair', 'spread', 'liquidity', 'base-currency', 'quote-currency'],
  },
  {
    slug: 'swap-rate',
    term: 'Swap Rate',
    category: 'forex',
    aliases: ['rollover', 'overnight financing', 'swap'],
    short: 'The interest charged or earned for holding a forex position overnight.',
    explanation: [
      'Every currency has an interest rate. Holding a pair means earning interest on the currency you are long and paying it on the one you are short.',
      'The net difference is applied daily as a swap. It can be a credit or a debit depending on direction and the rate differential.',
      'Wednesday rollovers usually carry triple swap to account for weekend settlement.',
    ],
    whyItMatters:
      'On positions held for weeks, swap can quietly become a significant cost or benefit that no chart-based analysis will show you.',
    mistakes: [
      'Ignoring swap costs on long-held positions in high-differential pairs.',
      'Being surprised by triple swap on Wednesday.',
    ],
    related: ['carry-trade', 'currency-pair', 'leverage', 'broker', 'margin'],
  },
  {
    slug: 'carry-trade',
    term: 'Carry Trade',
    category: 'forex',
    aliases: ['carry', 'positive carry'],
    short: 'Borrowing in a low-interest currency to hold a higher-interest one, collecting the difference.',
    explanation: [
      'A carry trade earns the interest rate differential daily. It is a strategy about yield rather than direction.',
      'It works quietly for long stretches and then unwinds violently. The accumulated carry can be erased in days when the exchange rate moves against the position.',
      'Carry trades are typically leveraged, since the daily differential is small relative to capital, which amplifies the unwind.',
    ],
    whyItMatters:
      'The carry trade is the classic example of a strategy with a high win rate and a devastating tail — profitable most days, occasionally catastrophic.',
    mistakes: [
      'Sizing a carry trade for the yield while ignoring the exchange-rate risk.',
      'Assuming a long run of quiet accumulation means low risk.',
    ],
    related: ['swap-rate', 'leverage', 'risk-of-ruin', 'volatility', 'currency-pair'],
  },
];
