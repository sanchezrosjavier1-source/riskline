import type { Guide } from '@/types/guide';

export const positionSizeGuide: Guide = {
  slug: 'how-to-calculate-position-size',
  title: 'How to Calculate Position Size: A Complete Guide',
  dek: 'Position size is not a guess or a round number — it falls out of two decisions you have already made. Here is exactly how to get from those decisions to a number of shares.',
  topic: 'Position Sizing',
  keyTakeaways: [
    'Position size is a consequence of your risk budget and your stop distance, not an independent choice.',
    'The formula is one division: Maximum Risk ÷ Risk Per Share.',
    'Moving the stop changes the size without changing the dollars you risk.',
    'Round down to a whole share, contract, or lot — rounding up quietly raises your real risk.',
  ],
  intro: [
    'Ask ten traders how they decide how many shares to buy, and a surprising number will describe a feeling rather than a calculation — "that felt like a good amount," or "I usually do a hundred shares." Position size is one of the few parts of a trade that should never be a feeling. It is arithmetic, and it is arithmetic you can do in under ten seconds once you know the two numbers that feed into it.',
      'This guide walks through where those two numbers come from, works a full example step by step, and covers the places people most often get it wrong — rounding the wrong direction, sizing before the stop is set, and forgetting that the formula changes nothing about how much the trade can go right, only how much it can go wrong.',
  ],
  sections: [
    {
      heading: 'The two numbers you need before you size anything',
      body: [
        'Position size depends on exactly two inputs, and both of them should exist before you think about how many shares to buy.',
        'The first is your maximum risk: the dollar amount you are willing to lose if the trade fails completely. This is not a feeling either — it comes from multiplying your account size by a fixed risk percentage, commonly somewhere between 0.5% and 2% per trade. A $20,000 account risking 1% has a maximum risk of $200 on this trade, full stop, regardless of how good the setup looks.',
        'The second is your risk per share: the distance between your entry price and your stop loss. This number should come from the chart, not from how much money you want to lose. Find the price level where your reason for taking the trade would be proven wrong — a swing low, a support zone, a level the instrument should not trade back below if your thesis holds — and that is your stop. The distance from entry to that level, in dollars, is your risk per share.',
        'Only once both of these exist does position size become a calculation instead of a guess.',
      ],
    },
    {
      heading: 'The formula',
      body: [
        'Position size is your maximum risk divided by your risk per share. That is the entire formula. Everything else in this guide is about getting the two inputs right before you divide them.',
      ],
      table: {
        caption: 'The formula in one line',
        headers: ['Term', 'Where it comes from'],
        rows: [
          ['Maximum Risk', 'Account Size × Risk Per Trade %'],
          ['Risk Per Share', 'Entry Price − Stop Loss (long) or Stop Loss − Entry Price (short)'],
          ['Position Size', 'Maximum Risk ÷ Risk Per Share'],
        ],
      },
    },
    {
      heading: 'A worked example, start to finish',
      body: [
        'Say you have a $20,000 account and you have decided, in advance, to risk 1% per trade. That sets your maximum risk at $200.',
        'You are looking at a long setup with an entry at $84.00. The chart shows a clear support zone at $81.20, and you decide that a close below $81.00 would invalidate the setup — so you place your stop at $80.90, just beyond the zone. Your risk per share is $84.00 minus $80.90, which is $3.10.',
        'Divide $200 by $3.10 and you get roughly 64.5 shares. Round down to 64 whole shares. At 64 shares, if the stop is hit exactly, the real loss is 64 × $3.10, which is $198.40 — just under your $200 budget, exactly as intended.',
        'Notice what did not happen: you did not pick 64 shares first and then check whether the risk looked reasonable. The size was the output of the calculation, not an input to it.',
      ],
    },
    {
      heading: 'Try it with your own numbers',
      body: [
        'The calculator below runs the exact same formula. Change the account size, the risk percentage, or the stop, and watch the position size respond — including what changes when the stop moves closer or further from the entry.',
      ],
      widget: 'position-size',
    },
    {
      heading: 'Why a tighter stop means a bigger position',
      body: [
        'This is the part that surprises people the first time they see it: shrinking your stop distance grows your position size, at exactly the same dollar risk.',
        'Take the same $200 maximum risk. With a $3.10 stop, you get 64 shares. Tighten the stop to $1.55 — half the distance — and the position size doubles to roughly 129 shares. The dollar risk is still $200 either way. What changed is how sensitive the position is to each cent of movement, not how much you stand to lose if the stop is hit.',
        'This relationship is worth sitting with, because it explains why "a tight stop" is not automatically the safer choice. A tighter stop on a volatile instrument gets hit by ordinary noise more often, and a larger position at that same dollar risk means each of those routine stop-outs still costs the full $200 — you are just paying it more frequently. The stop should come from where the setup is actually invalidated, not from a desire to trade a bigger position.',
      ],
    },
    {
      heading: 'What changes by asset class',
      body: [
        'The formula itself never changes, but the unit you are solving for does.',
        'For stocks and most exchange-traded instruments, the output is a share count, and you round down to a whole share.',
        'For forex, position size is usually expressed in lots, and the risk-per-share step is replaced by risk-per-pip — the pip value depends on the pair and the lot size, so the same maximum-risk-divided-by-risk-per-unit logic applies, just with pips standing in for dollars of price movement.',
        'For leveraged instruments like futures or crypto perpetuals, the position size calculation is identical, but it is worth separately checking that the resulting notional value does not exceed what your margin can actually fund — a mathematically correct position can still be one your account cannot open.',
      ],
    },
    {
      heading: 'Common mistakes',
      body: [
        'Choosing a round number of shares — 50, 100, 500 — and only afterward checking what that implies about dollar risk. This inverts the whole process: the size should be the output, never the starting point.',
        'Rounding the position size up instead of down. Rounding up pushes the real risk above your intended budget, which defeats the purpose of calculating it in the first place.',
        'Using the same position size across setups with very different stop distances. A trade with a wide stop and a trade with a tight stop should almost never use the same share count if the dollar risk is meant to stay constant.',
        'Sizing up after a string of losses to recover faster. This is the single fastest way to turn a manageable drawdown into a serious one — the formula does not know or care about your recent results, and it should not change because of them.',
      ],
    },
  ],
  conclusion: [
    'Position size is the one part of a trade you control completely, and it rewards being boring about it. Decide your risk percentage once, in advance. Let the chart decide your stop. Divide one by the other. The moment position sizing starts to involve a feeling is the moment it stops doing its job.',
  ],
  relatedTerms: ['position-size', 'risk-per-trade', 'stop-distance', 'stop-loss', 'notional-value'],
  tools: [
    { label: 'Position Size Calculator', href: '/tools/position-size' },
    { label: 'Full Risk Calculator', href: '/calculator' },
  ],
};
