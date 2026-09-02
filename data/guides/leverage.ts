import type { Guide } from '@/types/guide';

export const leverageGuide: Guide = {
  slug: 'understanding-leverage',
  title: 'Understanding Leverage: How It Multiplies Both Gains and Losses',
  shortTitle: 'Understanding Leverage',
  dek: 'Leverage does not make a trade riskier by existing. It makes a given price move do more to your account. The difference between those two statements is the entire subject of this guide.',
  topic: 'Leverage & Margin',
  keyTakeaways: [
    'Leverage multiplies the effect of a price move on your equity — it does not change the accuracy of your idea.',
    'A position with a stop and a fixed size carries the same dollar risk at 2x leverage as it does at 20x, if the position and stop are unchanged.',
    'Liquidation price moves closer to your entry as leverage increases — roughly 100 ÷ leverage as a percentage move.',
    'Leverage becomes dangerous specifically when it is used to justify a larger position, not by being used at all.',
  ],
  intro: [
    'Leverage has a reputation problem. It is blamed, correctly, for a large share of the fastest account-ending losses in trading — and yet the mechanism itself is neutral. Leverage is what lets a trader with $1,000 hold a $10,000 position. Whether that is reckless or perfectly reasonable depends entirely on what happens after: what the stop is, how large the resulting risk is, and whether the account can actually fund the position it creates.',
    'This guide separates what leverage actually does from what careless use of it does, works through the math of liquidation, and ends with the one rule that keeps leverage from being the thing that ends an account.',
  ],
  sections: [
    {
      heading: 'What leverage actually does',
      body: [
        'Leverage is a multiple. At 10x, $1,000 of your own capital controls a $10,000 position. The asset itself has not become more volatile — a 2% move in the underlying is still a 2% move. What changes is what that 2% move does to your $1,000: at 10x, it becomes a 20% swing in your equity, not a 2% one.',
        'This is the entire mechanism, and it cuts identically in both directions. A favorable 2% move also becomes a 20% gain on equity. Leverage does not bias the outcome toward loss — it amplifies whatever the outcome already was.',
      ],
      diagram: 'leverage',
    },
    {
      heading: 'The part leverage does not control',
      body: [
        'Leverage sets how large a position you can hold relative to your capital. It does not set how much you can lose — that is governed entirely by your position size and where your stop sits, exactly as it would be without any leverage at all.',
        'A $1,000 account using 10x leverage to hold a $10,000 position, with a stop placed 1% below entry and a position size calculated to risk $100, loses $100 if the stop is hit — the same $100 it would lose holding a $10,000 position with no leverage and $10,000 of capital behind it. The leverage changed how much capital was required to open the position. It did not change the loss.',
        'This is the distinction worth holding onto: leverage determines what you can afford to hold. Position size and stop distance determine what you can lose. Conflating the two is where the reputation for recklessness comes from.',
      ],
    },
    {
      heading: 'Where it actually goes wrong',
      body: [
        'Leverage becomes dangerous specifically when it is used as a reason to size up — when available leverage is treated as a target rather than a ceiling, and a position grows to fill whatever capital the leverage frees up, without the stop or the risk-per-trade math changing to match.',
        'The failure mode is almost never "I used leverage." It is "I used the leverage to open a position ten times larger than my risk plan called for, with a stop distance I did not adjust for the larger size." The leverage was a tool that made the mistake possible; it was not the mistake itself.',
      ],
    },
    {
      heading: 'How liquidation actually works',
      body: [
        'On margin and leveraged products, there is a price at which losses have consumed the capital backing the position, and the position is closed automatically — often with the entire margin lost and no further input from the trader.',
        'The math is straightforward: the approximate percentage move needed to reach liquidation is 100 divided by the leverage multiple. At 10x, roughly a 10% adverse move reaches liquidation. At 50x, roughly 2%. At 100x, roughly 1% — a move well within a single volatile session for many instruments.',
      ],
      table: {
        caption: 'Approximate distance to liquidation by leverage',
        headers: ['Leverage', 'Approx. move to liquidation'],
        rows: [
          ['2×', '50%'],
          ['5×', '20%'],
          ['10×', '10%'],
          ['20×', '5%'],
          ['50×', '2%'],
          ['100×', '1%'],
        ],
      },
    },
    {
      heading: 'The rule that keeps it safe',
      body: [
        'A stop loss should always trigger well before the liquidation price. If a position’s stop sits closer to entry than its liquidation price, the stop is doing its job and the leverage is incidental to the risk. If the liquidation price sits closer than the stop — or there is no stop at all — the exchange is managing the risk instead of the trader, at a price and a moment of its own choosing rather than one that was planned.',
        'Checked in that order — position size and stop first, leverage as the mechanism that funds the resulting position — leverage stops being the explanation for a blown account and becomes what it actually is: a tool for using capital efficiently.',
      ],
    },
    {
      heading: 'See it on your own numbers',
      body: [
        'Enter your capital, a leverage multiple, and a hypothetical adverse move to see the effect on your position value and equity directly, alongside the approximate distance to liquidation.',
      ],
      widget: 'leverage',
    },
  ],
  conclusion: [
    'Leverage is a multiplier applied to a decision that was already made elsewhere — in the position size, and in the stop. Get those two right first, and leverage is simply the mechanism that lets a smaller account hold the position that decision calls for. Get them wrong, and leverage is what turns the error into a liquidation instead of a manageable loss.',
  ],
  relatedTerms: ['leverage', 'margin', 'margin-call', 'liquidation-price', 'volatility'],
  tools: [
    { label: 'Full Risk Calculator', href: '/calculator' },
    { label: 'Position Size Calculator', href: '/tools/position-size' },
  ],
};
