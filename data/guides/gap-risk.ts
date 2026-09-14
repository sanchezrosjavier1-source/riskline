import type { Guide } from '@/types/guide';

export const gapRiskGuide: Guide = {
  slug: 'gap-risk-earnings-weekends',
  title: 'Gap Risk: Holding Through Earnings, News and Weekends',
  shortTitle: 'Gap Risk: Earnings, News and Weekends',
  dek: 'A stop loss assumes price moves through your level. A gap jumps over it. Here is when gaps happen, why no order type protects you, and how to size a position that has to survive one.',
  topic: 'Risk Management',
  keyTakeaways: [
    'A stop becomes a market order when its level is passed. If price opens beyond it, the fill is the opening price, not the stop.',
    'Gaps cluster around known events: earnings, scheduled economic releases, weekends and trading halts.',
    'Across a gap, position size is the only risk control still working.',
    'Size overnight positions twice: once for the stop, once for a plausible gap. Take the smaller of the two.',
  ],
  intro: [
    'Every position size calculation on this site, and almost every one anywhere else, rests on an assumption that is usually true and occasionally catastrophic: that price moves continuously, so a stop placed at a level will be filled at or near that level. Most of the time the assumption holds to within a few cents.',
    'A gap is the case where it fails completely. The market closes at one price and opens at another, nothing trades in between, and the stop is filled wherever trading resumes. This guide covers when that happens, why it cannot be engineered away with a cleverer order, and the sizing adjustment that turns it from a disaster into a bad morning.',
  ],
  sections: [
    {
      heading: 'Why a stop cannot protect you across a gap',
      body: [
        'A stop order is an instruction, not a guarantee. It sits inactive until its trigger price trades, and then becomes a market order to be filled at the best price available. When price walks down through $92, the stop at $92 fills close to $92.',
        'When a stock closes at $95.40 and opens at $88.10 after overnight news, $92 never trades. The first price is $88.10, the stop triggers on that print, and the position is sold at $88.10. The stop worked exactly as designed. The design simply has nothing to say about prices that never existed.',
        'A stop-limit does not solve this either. It avoids the bad fill by refusing to sell below its limit, which means that on a gap through the limit it does not sell at all, and the position stays open as the price keeps moving.',
      ],
    },
    {
      heading: 'When gaps happen',
      body: [
        'Gaps are not scattered randomly across the calendar. They cluster around moments when information arrives while a market cannot trade on it, and most of those moments are known in advance.',
      ],
      table: {
        caption: 'Where gap risk comes from, and what still protects you',
        headers: ['Situation', 'Why it gaps', 'What still works'],
        rows: [
          ['Intraday, liquid market', 'Rarely gaps; prices are continuous', 'Stop, with some slippage'],
          ['Overnight', 'News arrives while the market is shut', 'Position size'],
          ['Earnings release', 'Results published outside regular hours', 'Position size, or closing first'],
          ['Scheduled economic data', 'Reports such as US CPI publish before the US equity open', 'Position size'],
          ['Weekend', 'Two days of news priced in at one open', 'Position size'],
          ['Trading halt', 'Trading suspended, resumes at a new price', 'Position size'],
        ],
      },
    },
    {
      heading: 'Size for the stop, then size for the gap',
      body: [
        'The adjustment is to calculate the position twice and take the smaller answer. The first calculation is the normal one: risk budget divided by the distance to the stop. The second asks what happens if the stop is jumped entirely: a separate, deliberately chosen maximum loss for a gap, divided by the size of a gap this instrument could plausibly produce.',
        'Consider a $50,000 account risking 1% on a stock at $80 with a stop at $76. The normal calculation gives $500 ÷ $4 = 125 shares. Now suppose the position will be held through an earnings release, and this stock has recently moved around 12% on results. A 12% gap is $9.60 a share, and 125 shares × $9.60 is $1,200 — 2.4% of the account, on a trade believed to risk 1%.',
        'If the most the trader is willing to lose to an earnings gap is 1.5%, which is $750, the gap calculation gives $750 ÷ $9.60 = 78 shares. The position is the smaller of 125 and 78: 78 shares. The stop still sits at $76 and still does its job on an ordinary day. The size now also survives the day the stop cannot.',
      ],
    },
    {
      heading: 'Estimating a plausible gap',
      body: [
        'The size of a plausible gap cannot be known exactly, and it does not need to be. The purpose is to pick a number large enough to be honest. For earnings, the stock’s own recent reactions are the most direct evidence — how far it moved on its last several reports — and the largest of those is a better planning figure than the average.',
        'Where listed options exist, their prices offer a second estimate. The combined cost of the at-the-money call and put expiring just after the event is roughly the move the options market expects, and it is often a useful sense check against a recent history that may have been unusually calm. Neither method predicts the direction; both only estimate the size.',
        'For weekends and overnight holds without a specific event, the instrument’s typical overnight moves are the reference, with an allowance for the fact that the gaps that matter are the unusual ones.',
      ],
    },
    {
      heading: 'The other choice: do not hold it',
      body: [
        'For many trades the cleanest answer to gap risk is to avoid it. Closing a position before an earnings release and reopening afterwards costs a spread and a commission. Holding through costs whatever the gap happens to be. When the trade idea has nothing to do with the earnings result, paying the small, known cost to avoid the large, unknown one is usually the better trade.',
        'Checking the earnings date and the economic calendar before entering an overnight position is therefore a risk control rather than research, in the same way that checking the stop is. The ex-dividend date belongs on the same list: a stock opens lower by roughly the dividend, which can trigger a stop placed without it in mind.',
      ],
    },
    {
      heading: 'Where leverage makes it worse',
      body: [
        'On an unleveraged position, the worst a gap can do is take a large share of what the position cost. On a leveraged one it can take more than the account holds. A futures position or a margined stock position that gaps far enough can leave the account owing money to the broker, because the loss is calculated on the full position rather than on the margin posted.',
        'This is the strongest argument for keeping leverage well below what a broker permits on anything held overnight. The stop is irrelevant across the gap, the margin is irrelevant across the gap, and the only number that decides the outcome is how large the position was when the market closed.',
      ],
    },
  ],
  conclusion: [
    'Gap risk is not a flaw in stop orders and it is not bad luck. It is the part of trading where prices stop being continuous, and it concentrates on dates that are mostly known in advance. Every calculated maximum loss quietly assumes it away.',
    'Treat it directly: know when the next gap-prone event is, decide whether the trade needs to be held through it, and if it does, size it for the gap as well as the stop. The trader who does this has a bad morning when the gap comes. The one who does not can lose a month.',
  ],
  relatedTerms: ['gap', 'earnings-report', 'stop-order', 'slippage', 'position-size', 'circuit-breaker'],
  tools: [{ label: 'Position size calculator', href: '/tools/position-size' }],
};
