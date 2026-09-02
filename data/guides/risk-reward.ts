import type { Guide } from '@/types/guide';

export const riskRewardGuide: Guide = {
  slug: 'risk-reward-ratio-explained',
  title: 'Risk/Reward Ratio Explained: What It Actually Means for Your Results',
  shortTitle: 'Risk/Reward Ratio Explained',
  dek: 'A risk/reward ratio is not a score for how good a trade looks. It is a specific, calculable claim about how often you need to be right — and most traders never check whether their win rate actually clears it.',
  topic: 'Trade Planning',
  keyTakeaways: [
    'The ratio compares reward per share to risk per share — it says nothing about how likely the trade is to work.',
    'Every ratio implies a break-even win rate: 1 ÷ (1 + ratio).',
    'A 1:3 trade only needs to win 25% of the time to break even; a 1:1 trade needs better than 50%.',
    'Spread and commissions raise the real threshold above the theoretical one.',
  ],
  intro: [
    'Two traders can look at the same setup, take the same entry, and describe it completely differently. One says "this looks like a great trade." The other says "this is a 1:3, so I need to be right about a quarter of the time for it to work." Only one of those descriptions is checkable, and it is the second one.',
    'Risk/reward ratio is one of the few numbers in trading that converts a subjective judgment — does this setup look good — into an objective, testable claim: at this ratio, here is the win rate required to make money. This guide covers where that number comes from, what it actually implies, and where the theory breaks down against real costs.',
  ],
  sections: [
    {
      heading: 'What the ratio actually measures',
      body: [
        'Risk/reward ratio compares two distances: how far your target sits from your entry, against how far your stop sits from your entry. Risk $2 per share to make $6 per share, and the ratio is 1:3 — for every dollar you can lose, you stand to make three.',
        'That is the entire calculation, and it is worth noticing what it does not include. It says nothing about how likely the trade is to reach the target, nothing about the quality of the setup, and nothing about your account size. It is pure geometry — a property of where you placed three price levels, not a judgment about whether the trade will work.',
      ],
    },
    {
      heading: 'The number that actually matters: break-even win rate',
      body: [
        'A risk/reward ratio only becomes useful once you pair it with the question it implies: given this ratio, what win rate do I need just to avoid losing money over time?',
        'The formula is short: break-even win rate equals 1 divided by (1 plus the ratio). At a 1:1 ratio, that is 1 ÷ 2, or 50% — you need to win more than half the time. At 1:3, it is 1 ÷ 4, or 25%. At 1:5, it drops to about 16.7%.',
        'This is why traders who are right less than half the time can still be solidly profitable, and why traders who are right most of the time can still lose money. Win rate on its own tells you almost nothing — it only means something next to the ratio it was earned at.',
      ],
    },
    {
      heading: 'The full table',
      body: [
        'A wider target relative to the stop lowers the bar for how often you need to be right. The relationship is not linear — moving from 1:1 to 1:2 drops the required win rate by nearly 17 points, while moving from 1:4 to 1:5 only drops it by about 3.',
      ],
      table: {
        caption: 'Break-even win rate at common risk/reward ratios',
        headers: ['Risk : Reward', 'Break-Even Win Rate'],
        rows: [
          ['1 : 0.5', '66.7%'],
          ['1 : 1', '50.0%'],
          ['1 : 1.5', '40.0%'],
          ['1 : 2', '33.3%'],
          ['1 : 3', '25.0%'],
          ['1 : 4', '20.0%'],
          ['1 : 5', '16.7%'],
        ],
      },
    },
    {
      heading: 'Try it on your own trade',
      body: [
        'Enter an entry, stop and target below and the ratio and break-even win rate update immediately, along with a slider that shows what different win rates actually return in dollars.',
      ],
      widget: 'risk-reward',
    },
    {
      heading: 'Why this explains counterintuitive results',
      body: [
        'This is the mechanism behind an outcome that confuses a lot of new traders: two people can trade the same strategy with the same win rate and get opposite results, purely because of where they placed their targets and stops.',
        'A trader taking 1:1 setups with a 45% win rate is losing money by design — 45% falls short of the 50% the ratio demands, no matter how disciplined the execution is. A trader taking 1:3 setups with that same 45% win rate is comfortably profitable, because 45% clears the 25% threshold with room to spare. Same accuracy, opposite outcome, entirely because of the ratio.',
        'This is also why "just be right more often" is often the wrong fix for a losing strategy. If the ratio is working against you, improving accuracy by a few percentage points may not be enough to cross the threshold — widening the target, tightening the stop, or being more selective about which setups qualify can do more for the bottom line than trying to predict price more accurately.',
      ],
    },
    {
      heading: 'Where the theory meets real costs',
      body: [
        'The break-even figures above are the arithmetic of the ratio alone — they assume every winning trade fills at the exact target and every losing trade fills at the exact stop, with nothing subtracted in between.',
        'In practice, the spread is paid on every round trip, and commissions come out of both winners and losers. Both costs eat proportionally more into the small side of a ratio, which means the real break-even win rate is always somewhat higher than the theoretical one — how much higher depends on the size of those costs relative to your typical risk per share.',
        'It is also worth being honest about how often targets are actually reached versus how often price merely approaches them. A theoretical 1:5 ratio is not worth much if the instrument rarely travels that far before reversing — the target has to reflect a level price genuinely tends to reach, not just a number that produces a favorable ratio on paper.',
      ],
    },
  ],
  conclusion: [
    'A risk/reward ratio is a tool for answering one specific question before you take a trade: given where I am placing my stop and my target, how often do I actually need to be right? Answering that question honestly — and comparing it to your real, tracked win rate — does more to separate a working strategy from a losing one than almost any other single check.',
  ],
  relatedTerms: ['risk-reward-ratio', 'break-even-win-rate', 'win-rate', 'expectancy', 'take-profit'],
  tools: [
    { label: 'Risk/Reward Calculator', href: '/tools/risk-reward' },
    { label: 'Full Risk Calculator', href: '/calculator' },
  ],
};
