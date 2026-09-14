import type { Guide } from '@/types/guide';

export const futuresSizingGuide: Guide = {
  slug: 'futures-position-sizing',
  title: 'How to Size a Futures Trade: ES, NQ and the Micros',
  shortTitle: 'How to Size a Futures Trade (ES, NQ, MES)',
  dek: 'In futures, a point is not a dollar and a contract cannot be split. Here is how to turn a stop in points into a contract count, and why the micros exist.',
  topic: 'Position Sizing',
  keyTakeaways: [
    'Risk per contract is the stop in points multiplied by the point value — $50 a point on ES, $5 on MES.',
    'Contracts cannot be fractional, so the result is always rounded down. Rounding down to zero means the trade does not fit the account.',
    'A 10-point stop on one ES contract risks $500. On a $25,000 account at 1%, that is twice the budget.',
    'The micro contracts are one tenth the size of the E-minis, and for most accounts they are the only way to size correctly.',
  ],
  intro: [
    'Position sizing in stocks is forgiving in one quiet way: shares come in units of one, so the calculated size can be matched almost exactly. Futures remove that forgiveness. The smallest position is one whole contract, and one contract on the E-mini S&P 500 moves $50 for every point the index moves. A stop that looks tight on a chart can still be far too large for the account.',
    'This guide works through the conversion from a stop on the chart to a number of contracts, with the real CME specifications, and explains the one decision futures traders get wrong more than any other: taking a trade that does not fit because the smallest available size is still too big.',
  ],
  sections: [
    {
      heading: 'Ticks, points and what they are worth',
      body: [
        'Every futures contract has a tick size — the smallest price increment it can move — and a tick value, which is what that increment is worth in dollars for one contract. ES moves in ticks of 0.25 index points, and each tick is worth $12.50. Four ticks make a point, so a point on ES is worth $50.',
        'The point value is the number that matters for sizing, and it is simply the tick value divided by the tick size. Storing it separately invites the two to disagree, which is why the calculators on this site derive it instead. The table below uses the exchange specifications for the most traded equity index contracts.',
      ],
      table: {
        caption: 'CME equity index contract specifications',
        headers: ['Contract', 'Tick size', 'Tick value', 'Point value'],
        rows: [
          ['ES — E-mini S&P 500', '0.25', '$12.50', '$50.00'],
          ['MES — Micro E-mini S&P 500', '0.25', '$1.25', '$5.00'],
          ['NQ — E-mini Nasdaq-100', '0.25', '$5.00', '$20.00'],
          ['MNQ — Micro E-mini Nasdaq-100', '0.25', '$0.50', '$2.00'],
          ['YM — E-mini Dow', '1', '$5.00', '$5.00'],
          ['MYM — Micro E-mini Dow', '1', '$0.50', '$0.50'],
        ],
      },
    },
    {
      heading: 'The formula',
      body: [
        'The structure is identical to sizing a stock trade, with the point value standing in for the share. First decide the risk budget as a percentage of current equity. Then work out what one contract loses if the stop is hit: the distance from entry to stop in points, multiplied by the point value. Divide the budget by that figure and round down.',
        'Contracts = (Account × Risk %) ÷ (Stop distance in points × Point value). Nothing else enters it. The margin requirement does not decide the size, and neither does how many contracts the broker will let you open — both are limits on what is possible, not a statement of what is sensible.',
      ],
    },
    {
      heading: 'A worked example that does not fit',
      body: [
        'Take a $25,000 account risking 1%, which is a $250 budget. The trade is long ES from 5,000 with a stop at 4,990, ten points below — a perfectly ordinary stop for an intraday trade on the index.',
        'One ES contract loses 10 × $50 = $500 if that stop is hit. The budget is $250. $250 ÷ $500 = 0.5 contracts, which rounds down to zero. The honest answer from the calculation is that this trade, on this instrument, does not fit this account.',
        'Two responses are common and both are mistakes. The first is to trade one contract anyway, which doubles the intended risk to 2% on a trade the trader believes is a 1% trade. The second is to tighten the stop to five points so that one contract fits, which moves the exit to a place chosen by the account balance rather than by the chart — and a stop inside normal noise is a stop that gets hit for no reason.',
      ],
    },
    {
      heading: 'Why the micros exist',
      body: [
        'The same trade on MES is one tenth the size. Ten points is 10 × $5 = $50 of risk per contract, so the $250 budget buys exactly five contracts. The stop stays at 4,990 where the chart put it, the risk is exactly 1%, and the position is five micros instead of an impossible half of an E-mini.',
        'This is not a beginner product. It is the granularity that makes correct sizing possible on accounts below roughly six figures, and it lets a larger account scale in and out in steps of $5 a point rather than $50. The same logic applies to MNQ against NQ and MYM against YM.',
      ],
      table: {
        caption: 'Contracts allowed on a $25,000 account risking 1% ($250)',
        headers: ['Contract', 'Stop', 'Risk per contract', 'Contracts'],
        rows: [
          ['ES', '10 points', '$500', '0'],
          ['MES', '10 points', '$50', '5'],
          ['NQ', '40 points', '$800', '0'],
          ['MNQ', '40 points', '$80', '3'],
        ],
      },
    },
    {
      heading: 'Margin is not the risk',
      body: [
        'Futures brokers quote an initial margin — the collateral required to open one contract — and it is tempting to read that number as the cost of the trade. It is not. Margin is set aside and returned when the position closes; the loss comes out of equity and can be far larger than the margin posted.',
        'Margin requirements are set by the exchange and the broker and are raised during volatile periods, so any specific figure goes out of date. What does not change is the relationship: a single E-mini controls an index position worth a quarter of a million dollars at an S&P level of 5,000, and a sharp session can move it by far more than a typical day-trading margin. Size from the stop, and treat margin as a ceiling you should never be near.',
      ],
    },
    {
      heading: 'Try it with your own contract',
      body: [
        'The futures calculator has these specifications built in. Pick the contract, enter the account, the risk percentage and the stop, and it returns the contract count rounded down, with the risk per contract shown so the arithmetic can be checked.',
      ],
    },
  ],
  conclusion: [
    'Futures sizing is the same calculation as any other, with two things that make it unforgiving: a point is worth a fixed and often large amount of money, and contracts cannot be divided. Put together, they mean the calculation will frequently return zero, and zero is a real answer rather than a rounding inconvenience.',
    'When it does, the choice is between a smaller instrument and no trade. The micros make the first option available to almost everyone, which is why, for most accounts, they are not the small version of the contract — they are the correct one.',
  ],
  relatedTerms: ['position-size', 'stop-distance', 'margin', 'leverage', 'notional-value', 'risk-per-trade'],
  tools: [{ label: 'Futures position size calculator', href: '/calculator/futures' }],
};
