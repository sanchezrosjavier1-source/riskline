import type { Guide } from '@/types/guide';

export const drawdownRecoveryGuide: Guide = {
  slug: 'drawdown-recovery-math',
  title: 'Why Drawdown Recovery Math Works Against You',
  dek: 'A 50% loss does not need a 50% gain to break even — it needs a 100% gain. The deeper the hole, the more that asymmetry bends against you. Here is the arithmetic, and what it argues for.',
  topic: 'Risk Management',
  keyTakeaways: [
    'Percentage losses and the percentage gains needed to recover them are not symmetric — recovery always requires the larger number.',
    'A 20% drawdown needs a 25% gain to recover. An 80% drawdown needs a 400% gain.',
    'The asymmetry gets sharply worse as the drawdown deepens, not gradually worse.',
    'This is the strongest argument for small, consistent per-trade risk over large, infrequent bets.',
  ],
  intro: [
    'Here is a question that trips up a surprising number of people the first time they actually work it out: if an account falls 50%, what gain is needed to get back to where it started? The intuitive answer is 50%. The correct answer is 100%. That gap between intuition and arithmetic is not a rounding error — it is one of the more important facts in trading, and it gets worse, not better, the deeper the drawdown goes.',
  ],
  sections: [
    {
      heading: 'The asymmetry, explained simply',
      body: [
        'A percentage loss and the percentage gain that undoes it are calculated from different starting points, which is the entire source of the asymmetry. The loss is calculated from the original, larger balance. The recovery gain is calculated from the new, smaller balance — and a smaller base needs a proportionally larger percentage gain to add back the same number of dollars.',
        'A $10,000 account that falls 50% is left with $5,000. Getting from $5,000 back to $10,000 is a $5,000 gain on a $5,000 base — 100%, not 50%. The dollars lost and the dollars needed to recover them are identical; the percentages are not, because the base they are measured against changed.',
      ],
      diagram: 'drawdown',
    },
    {
      heading: 'How fast it gets worse',
      body: [
        'The relationship is not linear. Small drawdowns require only a slightly larger recovery gain; deep drawdowns require a dramatically larger one. The gap between the loss and the required recovery widens sharply as the loss deepens — which is exactly why avoiding a deep drawdown is worth more than most traders instinctively credit it for.',
      ],
      table: {
        caption: 'Loss vs. gain required to recover it',
        headers: ['Drawdown', 'Gain needed to recover'],
        rows: [
          ['5%', '5.3%'],
          ['10%', '11.1%'],
          ['20%', '25.0%'],
          ['30%', '42.9%'],
          ['40%', '66.7%'],
          ['50%', '100.0%'],
          ['60%', '150.0%'],
          ['70%', '233.3%'],
          ['80%', '400.0%'],
          ['90%', '900.0%'],
        ],
      },
    },
    {
      heading: 'See it on your own account',
      body: [
        'Enter a peak equity value and a current value below to see the exact drawdown and the exact gain required to recover it, calculated live.',
      ],
      widget: 'drawdown',
    },
    {
      heading: 'Why this argues for small, consistent risk',
      body: [
        'The practical conclusion is not "avoid all losses" — losses are a normal, unavoidable part of any trading strategy. It is "avoid the deep ones specifically," because the cost of a deep drawdown is not proportional to its size; it compounds. A strategy that occasionally produces a 50% drawdown is not twice as costly as one that produces 25% drawdowns — it requires four times the recovery gain, and takes disproportionately longer to actually achieve at any realistic rate of return.',
        'This is the strongest argument available for keeping per-trade risk small and consistent rather than large and occasional. A string of losses at 1% per trade produces a shallow, survivable drawdown. The same string at 10% per trade — or one oversized trade during a losing streak — can produce a drawdown deep enough that the recovery math genuinely works against getting back to even within a reasonable time frame.',
      ],
    },
    {
      heading: 'The moment this matters most',
      body: [
        'The asymmetry is easy to accept in the abstract and hardest to respect in the exact moment it applies — partway through a losing streak, when the instinct to increase size and "make it back faster" is strongest. Increasing risk at that moment does not fight the asymmetry; it deepens the drawdown the asymmetry is already working against, and does so at the point in the sequence where a mistake is most expensive.',
        'The alternative is not heroic. It is simply continuing to size every trade the same way regardless of the recent run of results, and trusting the math on the way back up the same way it was trusted on the way down.',
      ],
    },
  ],
  conclusion: [
    'The recovery math is fixed and does not negotiate — a 50% loss needs a 100% gain no matter how the loss happened or how the recovery is attempted. The only lever a trader actually controls is how deep the drawdown is allowed to get in the first place, and that lever is pulled at the position-sizing stage, before any of this arithmetic becomes relevant.',
  ],
  relatedTerms: ['drawdown', 'max-drawdown', 'risk-of-ruin', 'risk-per-trade', 'compounding'],
  tools: [
    { label: 'Full Risk Calculator', href: '/calculator' },
    { label: 'Position Size Calculator', href: '/tools/position-size' },
  ],
};
