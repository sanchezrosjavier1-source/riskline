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
    example: {
      setup: 'The same 30-pip stop on EUR/USD and on USD/JPY',
      steps: [
        { label: 'EUR/USD entry', value: '1.0850' },
        { label: 'Stop 30 pips below', value: '1.0820' },
        { label: 'USD/JPY entry', value: '151.20' },
        { label: 'Stop 30 pips below', value: '150.90' },
      ],
      body: [
        'Both stops are 30 pips, but they are not the same distance on the price ladder. On EUR/USD, 30 pips is 0.0030 of price. On USD/JPY it is 0.30, a hundred times larger as a number, because the yen pair is quoted to two decimals rather than four.',
        'This is why the pip, not the decimal, is the unit worth thinking in. Thirty pips is thirty pips on both, and both cost you the same if your position is sized so that a pip is worth the same amount.',
        'The trap is the fifth decimal. A broker showing EUR/USD as 1.08502 is quoting pipettes, and a stop placed 30 away on that screen is 3 pips, not 30. A trade sized for a 30-pip stop but stopped out at 3 loses a tenth of what was planned, which sounds harmless until the same mistake runs the other way and a 300-pip stop gets sized as 30.',
      ],
    },
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
    example: {
      setup: 'One mini lot of EUR/USD, account held in US dollars',
      steps: [
        { label: 'Position size', value: '10,000 units' },
        { label: 'Pip size', value: '0.0001' },
        { label: 'Pip value', value: '$1.00' },
        { label: 'A 40-pip move is worth', value: '$40.00' },
      ],
      body: [
        'The arithmetic is one multiplication: 0.0001 × 10,000 = $1 per pip. Ten times the size gives ten times the pip value, so a standard lot is $10 a pip and a micro lot is 10 cents.',
        'It stays this clean only because the quote currency and the account currency are both dollars. Take the same mini lot on EUR/GBP and each pip is worth £1, not $1 — and £1 is worth whatever GBP/USD happens to be that day. At 1.2700 your pip is $1.27; a month later at 1.2400 the identical position has a pip worth $1.24.',
        'The practical consequence is that a trade sized on a remembered pip value slowly drifts off target on any pair not quoted in your own currency. Two percent risk becomes 2.1%, then 1.9%, and nothing on the chart tells you.',
      ],
    },
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
    example: {
      setup: 'A $5,000 account risking 1% on EUR/USD with a 25-pip stop',
      steps: [
        { label: 'Risk budget', value: '$50.00' },
        { label: 'Stop distance', value: '25 pips' },
        { label: 'Affordable risk per pip', value: '$2.00' },
        { label: 'Lot size', value: '0.20 lots' },
      ],
      body: [
        'The order runs one way only. First the risk budget: 1% of $5,000 is $50. Then what a pip can be allowed to cost: $50 spread over a 25-pip stop is $2 a pip. Only then the lot size, because $1 a pip is a mini lot, so $2 a pip is two mini lots — 20,000 units, or 0.20 standard lots.',
        'Notice that lot size is the last number produced and the only one not chosen. Every trader who starts the other way round — deciding to trade one lot and then placing a stop — has fixed their risk at whatever the chart happens to hand them.',
        'On this account one standard lot would be $10 a pip. The same 25-pip stop would then risk $250, which is 5% of the account, on a trade the trader believed was a 1% risk.',
      ],
    },
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
    example: {
      setup: 'Long EUR/USD, long GBP/USD and long AUD/USD, each risking 1%',
      steps: [
        { label: 'Positions open', value: '3' },
        { label: 'Risk per position', value: '1%' },
        { label: 'Risk as it appears', value: '3%' },
        { label: 'Shared short leg', value: 'USD ×3' },
      ],
      body: [
        'Three separate tickets, three separate charts, three separate 1% risks. The blotter says the book is diversified across Europe, Britain and Australia.',
        'It is not. Every one of those trades is long something and short the dollar. There is one bet here, taken three times: the dollar falls. A strong US inflation print moves all three against you at once, and the 3% that looked like three independent chances to be wrong behaves like a single 3% bet on one number.',
        'This is the part of forex that catches people who came from equities. Buying three unrelated stocks really does spread the risk. Buying three dollar pairs in the same direction does not, because the second currency is not a detail of the quote — it is half the position.',
      ],
    },
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
    example: {
      setup: 'One standard lot of GBP/USD with the pair at 1.2700',
      steps: [
        { label: 'Base currency', value: 'GBP' },
        { label: 'Position size', value: '£100,000' },
        { label: 'Notional value', value: '$127,000' },
        { label: 'If the pair moves to 1.2800', value: '$128,000' },
      ],
      body: [
        'A standard lot is 100,000 units of the base currency, so this position is a hundred thousand pounds — not a hundred thousand dollars. Its dollar value depends on the rate, and at 1.2700 that is $127,000.',
        'The distinction is easy to skip and expensive to skip. A trader with a $10,000 account who reads "100,000" as dollars thinks they are running ten times leverage. They are running 12.7 times, and the margin requirement will be calculated on the larger figure.',
        'It also tells you what you actually own. Long GBP/USD is long pounds, so the position gains when the pound strengthens for any reason at all — including reasons that have nothing to do with the dollar chart you were watching.',
      ],
    },
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
    example: {
      setup: 'A 40-pip win on one mini lot of EUR/GBP, account held in dollars',
      steps: [
        { label: 'Quote currency', value: 'GBP' },
        { label: 'Profit in quote currency', value: '£40.00' },
        { label: 'GBP/USD on the day', value: '1.2700' },
        { label: 'Credited to the account', value: '$50.80' },
      ],
      body: [
        'The trade was right about the euro against the pound, and the profit arrives in pounds, because pounds are what the price is quoted in. Only then is it converted into the currency the account is denominated in.',
        'That second step is a separate, uncontrolled bet. Win the same 40 pips on a day when GBP/USD sits at 1.2400 and the identical trade pays $49.60 instead of $50.80. Nothing about the analysis changed; a currency you never chose to trade moved.',
        'For a single trade the difference is loose change. Across a year of them it is a slow drift between the profit-and-loss you calculated from the charts and the balance the broker shows, and it accounts for most cases of "my numbers do not match the statement".',
      ],
    },
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
    example: {
      setup: 'The same 20-pip scalp on EUR/USD and on a thin cross',
      steps: [
        { label: 'Target', value: '20 pips' },
        { label: 'EUR/USD spread', value: '~0.6 pips' },
        { label: 'Thin cross spread', value: '~6 pips' },
        { label: 'Cost as share of target', value: '3% vs 30%' },
      ],
      body: [
        'Spreads move with the session and the broker, so treat these as the usual order of magnitude rather than a quote. The ratio is what survives: a major costs a fraction of a pip to enter, a thin cross costs several.',
        'On a 20-pip target that is the difference between paying 3% of the move to get in and paying 30%. The second trade has to be right far more often to end up in the same place, and it is the same strategy on the same timeframe — only the instrument changed.',
        'Widen the target to 200 pips and the picture inverts: 0.6 pips and 6 pips are both noise against a move that size. Spread is a fixed toll, so it only matters relative to the distance you are travelling. That is the real reason short-timeframe trading concentrates in the majors.',
      ],
    },
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
    example: {
      setup: 'A mini lot held for six weeks at a swap of $0.42 a night',
      steps: [
        { label: 'Ordinary nights charged', value: '24' },
        { label: 'Wednesdays, charged triple', value: '6 × 3 = 18' },
        { label: 'Total nights', value: '42' },
        { label: 'Total swap', value: '$17.64' },
      ],
      body: [
        'Six weeks is thirty rollovers, not forty-two — the market does not roll over the weekend. But each of the six Wednesdays is charged three times, to settle the Saturday and Sunday nobody trades, which brings the count back to forty-two.',
        'The rate here is an illustration; yours comes from your broker and moves with central bank policy. What does not change is the shape: swap accrues quietly, every night, in a column most platforms put on a different screen from the profit and loss.',
        'At $17.64 against a position risking, say, $50, the swap has consumed a third of the risk budget before the price has done anything at all. Run the same position the other way round and that number is a credit instead — which is the entire idea behind the carry trade.',
      ],
    },
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
    example: {
      setup: 'The yen carry unwind of August 2024',
      body: [
        'For years the Bank of Japan held rates near zero while other central banks raised theirs. Borrowing yen to hold higher-yielding currencies paid a small amount every single night, and it had paid reliably for so long that the position stopped being thought of as a position.',
        'On 31 July 2024 the Bank of Japan raised its policy rate. The yen strengthened sharply over the following days, and because the trade was leveraged and enormously crowded, the first wave of exits forced the next: margin calls closed positions, closing positions bought yen, buying yen strengthened it further. On 5 August the Nikkei fell more than 12% in a single session.',
        'Nothing about the daily carry had changed. What changed was the exchange rate, which had been the ignored half of the trade for years. Months of accumulated interest were erased in days — the classic shape of a strategy that wins almost every day and loses everything on the few it does not.',
      ],
    },
    whyItMatters:
      'The carry trade is the classic example of a strategy with a high win rate and a devastating tail — profitable most days, occasionally catastrophic.',
    mistakes: [
      'Sizing a carry trade for the yield while ignoring the exchange-rate risk.',
      'Assuming a long run of quiet accumulation means low risk.',
    ],
    related: ['swap-rate', 'leverage', 'risk-of-ruin', 'volatility', 'currency-pair'],
  },
];
