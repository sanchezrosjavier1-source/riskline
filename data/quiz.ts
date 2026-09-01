export interface QuizOption {
  label: string;
  correct?: boolean;
  /** Shown after answering, whether or not this option was chosen. */
  why: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  /** Dictionary slug for "read more about this". */
  slug: string;
  termLabel: string;
}

/**
 * Questions target the relationships that decide real outcomes, not
 * vocabulary recall. Every option explains itself so a wrong answer teaches
 * as much as a right one.
 */
export const QUIZ: QuizQuestion[] = [
  {
    id: 'stop-width',
    question: 'Your stop moves further from your entry. What happens to the correct position size?',
    slug: 'position-size',
    termLabel: 'Position Size',
    options: [
      {
        label: 'It gets smaller',
        correct: true,
        why: 'Position size is your risk budget divided by the distance to your stop. A wider stop means a larger denominator, so the size shrinks — and the dollars you risk stay exactly the same.',
      },
      {
        label: 'It gets larger',
        why: 'This is backwards. A wider stop means each share can lose more, so you need fewer of them to keep the same dollar risk.',
      },
      {
        label: 'It stays the same',
        why: 'It only stays the same if you ignore the stop entirely — which means your dollar risk changes instead, quietly and without you deciding it.',
      },
    ],
  },
  {
    id: 'rr-win-rate',
    question: 'At a 1:3 risk/reward ratio, roughly what win rate do you need just to break even?',
    slug: 'break-even-win-rate',
    termLabel: 'Break-Even Win Rate',
    options: [
      {
        label: 'About 25%',
        correct: true,
        why: 'Break-even win rate is 1 ÷ (1 + ratio). With a ratio of 3 that is 1 ÷ 4, or 25%. Costs push the real number a little higher.',
      },
      {
        label: 'About 50%',
        why: '50% is what a 1:1 ratio demands. When your winners are three times your losers, you can be wrong far more often.',
      },
      {
        label: 'About 75%',
        why: 'That would be true if the ratio were inverted — risking $3 to make $1. At 1:3 the math is strongly in your favor.',
      },
    ],
  },
  {
    id: 'drawdown-recovery',
    question: 'You lose 50% of your account. What gain do you need to get back to where you started?',
    slug: 'drawdown',
    termLabel: 'Drawdown',
    options: [
      {
        label: '100%',
        correct: true,
        why: '$10,000 falling 50% leaves $5,000. Getting from $5,000 back to $10,000 is a 100% gain. Recovery is always harder than the loss that caused it.',
      },
      {
        label: '50%',
        why: 'A 50% gain on the remaining $5,000 only reaches $7,500. Percentages are calculated on a smaller base after a loss.',
      },
      {
        label: '75%',
        why: 'Closer, but still short. $5,000 plus 75% is $8,750. You need the full 100% to return to even.',
      },
    ],
  },
  {
    id: 'stop-guarantee',
    question: 'Does a stop loss guarantee you lose no more than the amount you calculated?',
    slug: 'slippage',
    termLabel: 'Slippage',
    options: [
      {
        label: 'No — it can fill worse than the stop price',
        correct: true,
        why: 'A stop is a trigger, not a price guarantee. Once touched it becomes a market order, and in a gap or a fast move it fills at whatever is available.',
      },
      {
        label: 'Yes — that is the whole point of a stop',
        why: 'A stop caps risk under normal conditions, which is most of the time. But gaps, halts and thin liquidity can all push the fill past your stop price.',
      },
      {
        label: 'Yes, as long as you use a stop limit',
        why: 'A stop limit does cap the price — by risking no fill at all. In a genuine crash that leaves you holding the position while it keeps falling.',
      },
    ],
  },
  {
    id: 'leverage-risk',
    question: 'Does using leverage necessarily mean taking more risk?',
    slug: 'leverage',
    termLabel: 'Leverage',
    options: [
      {
        label: 'No — position size and stop distance determine risk',
        correct: true,
        why: 'Leverage sets how large a position you can fund. What you can lose is set by your position size and your stop. Leverage becomes dangerous when it is used to justify a bigger position, not by existing.',
      },
      {
        label: 'Yes — leverage always multiplies risk',
        why: 'It multiplies the effect of a price move on your equity, but if the position size and stop are unchanged, your dollar risk is unchanged too.',
      },
      {
        label: 'Only above 10x',
        why: 'There is no threshold where leverage becomes risky. The risk comes from the size of the position relative to the stop, at any multiple.',
      },
    ],
  },
  {
    id: 'portfolio-heat',
    question: 'You follow a strict 1% rule and hold five open trades. How much of your account is at risk?',
    slug: 'portfolio-heat',
    termLabel: 'Portfolio Heat',
    options: [
      {
        label: 'Up to 5%, and more if the positions are correlated',
        correct: true,
        why: 'Per-trade risk sums across open positions. Five trades at 1% is 5% of total exposure — and if they move together, they behave like one larger position.',
      },
      {
        label: '1% — the rule caps it',
        why: 'The rule caps each trade individually. It says nothing about how many you hold at once, which is what portfolio heat measures.',
      },
      {
        label: '5%, but correlation does not matter',
        why: 'Correlation matters enormously. Five long positions in the same sector are, in practice, one bet that can lose all at once.',
      },
    ],
  },
  {
    id: 'win-rate-alone',
    question: 'A strategy wins 90% of the time. Is it profitable?',
    slug: 'expectancy',
    termLabel: 'Expectancy',
    options: [
      {
        label: 'Not necessarily — it depends on the size of the losses',
        correct: true,
        why: 'A 90% win rate with tiny winners and enormous losers is a losing strategy. Expectancy combines win rate with average win and average loss; only that combination tells you anything.',
      },
      {
        label: 'Yes — a 90% win rate is excellent',
        why: 'A high win rate is easy to manufacture with a tiny target and a huge stop. One loss can erase twenty wins.',
      },
      {
        label: 'Yes, as long as risk per trade is fixed',
        why: 'Fixed risk protects you from ruin but does not make a negative edge positive. The average win still has to outweigh the average loss.',
      },
    ],
  },
  {
    id: 'short-stop',
    question: 'On a short trade, where does the stop loss belong?',
    slug: 'short',
    termLabel: 'Short',
    options: [
      {
        label: 'Above the entry',
        correct: true,
        why: 'A short profits when price falls, so it loses when price rises. The stop belongs on the losing side — above the entry.',
      },
      {
        label: 'Below the entry',
        why: 'Below the entry is where a short makes money. A stop there would close the trade exactly when it is working.',
      },
      {
        label: 'It depends on volatility',
        why: 'Volatility affects how far above the entry the stop sits, but never which side of the entry it belongs on.',
      },
    ],
  },
  {
    id: 'exposure',
    question: 'Your position value is 150% of your account. Does that mean you are risking 150%?',
    slug: 'notional-value',
    termLabel: 'Notional Value',
    options: [
      {
        label: 'No — risk is set by the stop, exposure is what the position is worth',
        correct: true,
        why: 'Notional value is how much market you are holding. Your risk is the position size multiplied by the stop distance, which can still be 1% of the account. The exposure figure tells you whether you can fund it, not what you can lose.',
      },
      {
        label: 'Yes — exposure and risk are the same thing',
        why: 'They are different measurements. A large position with a very tight stop has high exposure and low risk.',
      },
      {
        label: 'Yes, unless you use a stop limit order',
        why: 'The order type does not change the distinction. Exposure is position value; risk is what the stop allows you to lose.',
      },
    ],
  },
  {
    id: 'iv-crush',
    question: 'You buy calls before earnings and the stock rises as predicted, but you lose money. Why?',
    slug: 'implied-volatility',
    termLabel: 'Implied Volatility',
    options: [
      {
        label: 'Implied volatility collapsed after the event',
        correct: true,
        why: 'Options get expensive ahead of known events because uncertainty is priced in. Once the news is out that premium deflates, and the drop can exceed what the price move gained.',
      },
      {
        label: 'The broker mispriced the option',
        why: 'This is normal market behavior, not an error. It is predictable enough to have a name: IV crush.',
      },
      {
        label: 'Theta decay over a single day',
        why: 'Theta contributes, but a single day of decay rarely explains a loss on a correctly predicted move. The volatility collapse is the larger factor.',
      },
    ],
  },
  {
    id: 'tight-stop',
    question: 'Halving your stop distance while keeping the same dollar risk does what to your position?',
    slug: 'stop-distance',
    termLabel: 'Stop Distance',
    options: [
      {
        label: 'Doubles the position size',
        correct: true,
        why: 'Same budget, half the cost per share, so twice the shares. Your dollar risk is unchanged — but the position is larger and more sensitive to every cent of movement.',
      },
      {
        label: 'Halves the position size',
        why: 'This is inverted. A smaller risk per share means your budget stretches to more shares, not fewer.',
      },
      {
        label: 'Leaves the position unchanged and halves the risk',
        why: 'That would be true only if you fixed the share count first. When risk is fixed, the size is what moves.',
      },
    ],
  },
  {
    id: 'losing-streak',
    question: 'With a 40% win rate, how unusual is a run of eight losing trades in a row?',
    slug: 'risk-of-ruin',
    termLabel: 'Risk of Ruin',
    options: [
      {
        label: 'Entirely ordinary over a few hundred trades',
        correct: true,
        why: 'Losing streaks are far longer than intuition suggests. Position sizing has to survive the worst plausible sequence, not the average one.',
      },
      {
        label: 'Almost impossible — something is broken',
        why: 'Nothing is broken. At a 40% win rate, eight consecutive losses will happen to anyone who trades long enough.',
      },
      {
        label: 'A clear sign to increase size and recover faster',
        why: 'This is the reasoning behind most account-ending days. Increasing size during a drawdown deepens the hole precisely when recovery is hardest.',
      },
    ],
  },
];
