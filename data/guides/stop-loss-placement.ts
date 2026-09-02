import type { Guide } from '@/types/guide';

export const stopLossPlacementGuide: Guide = {
  slug: 'stop-loss-placement-guide',
  title: 'Stop Loss Placement: A Practical Guide',
  dek: 'Where you put your stop decides your position size, your risk, and often whether the trade even makes sense. Most guides skip straight to money. This one starts with the chart, where the answer actually lives.',
  topic: 'Trade Planning',
  keyTakeaways: [
    'A stop should mark the price where your reason for the trade is proven wrong — not the amount of money you feel comfortable losing.',
    'Stops placed at obvious levels get hit more often, because that is exactly where other stops are clustered too.',
    'Volatility-based stops adapt to how far an instrument actually moves, instead of applying the same distance everywhere.',
    'The stop comes first. Position size is calculated from it afterward, never the other way around.',
  ],
  intro: [
    'The most common question about stop losses is "how much room should I give this trade" — and it is the wrong question, asked in the wrong order. A stop is not a cushion for comfort. It is the price at which the reason you took the trade is no longer true. Money comes into it only afterward, when that price is used to calculate how large a position you can safely hold.',
    'This guide covers how to find that price on the chart, why the most obvious-looking stop placements are often the worst ones, and when a fixed distance should give way to one that adapts to how the instrument actually moves.',
  ],
  sections: [
    {
      heading: 'Start with structure, not with money',
      body: [
        'Before a stop distance becomes a dollar figure, it needs to be a price level with a reason behind it. For a long trade, that is usually the most recent swing low, a support zone, or a level below which the setup no longer makes sense — if price trades there, whatever pattern or thesis justified the entry has failed.',
        'This ordering matters. "I am willing to lose $200, so my stop goes wherever $200 lands" produces a stop with no relationship to the chart — it might sit in the middle of normal noise, guaranteeing an early exit, or it might sit so far away that the position size required to keep the risk at $200 becomes uncomfortably small. A stop derived from structure first, with the position size calculated afterward from that distance, avoids both problems.',
      ],
      diagram: 'stop-loss',
    },
    {
      heading: 'Why obvious stops get hit',
      body: [
        'Stop orders cluster at obvious places — just beyond a round number, just below a visible swing low, just past a support line everyone can see on the same chart. That clustering is not a coincidence; it is exactly why those levels get tested. A large order moving through the market can use the liquidity sitting at those clustered stops to fill, pushing price just far enough to trigger them before reversing.',
        'The practical implication is not "never use structure" — structure is still where the stop belongs. It is "leave a buffer beyond the level, rather than placing the stop exactly at it." A stop a few cents or a fraction of a percent beyond the obvious level survives a brief probe of that level; a stop placed exactly on it does not.',
      ],
    },
    {
      heading: 'Fixed distance vs. volatility-based stops',
      body: [
        'A fixed percentage stop — always 2% below entry, say — treats every instrument identically, and that is precisely the problem. Two percent is tight on a slow-moving, low-volatility instrument and far too tight on a fast one, where it gets clipped by routine daily movement that has nothing to do with the trade being wrong.',
        'A volatility-based stop solves this by sizing the distance to the instrument itself, commonly using a multiple of Average True Range — a measure of how far the instrument typically moves in a period. A stop of 2x ATR automatically sits further away on a volatile instrument and closer on a calm one, adjusting the position size that follows from it in the same direction. The result is a stop that reflects normal noise for that specific instrument, rather than an arbitrary number applied everywhere.',
      ],
    },
    {
      heading: 'Turning the stop into a position size',
      body: [
        'Once the stop has a price — whether from structure, a volatility multiple, or both — the distance from entry to that price is your risk per unit, and everything downstream follows automatically: divide your risk budget by that distance and the position size falls out. Widen the stop and the size shrinks; tighten it and the size grows, at an unchanged dollar risk either way.',
        'Use the calculator below to see this directly: change the stop and watch both the distance and the resulting position size respond in real time.',
      ],
      widget: 'stop-distance',
    },
    {
      heading: 'What a stop cannot promise',
      body: [
        'A stop order is a trigger, not a guaranteed price. Under normal conditions it fills close to where it was set. During a gap, a halt, or a sudden loss of liquidity, it can fill considerably worse — a stop set at $48.00 during a gap that opens at $44.00 fills near $44.00, not $48.00.',
        'This is not an argument against using stops; it is an argument for sizing conservatively enough that a worse-than-expected fill is a bad trade rather than a catastrophic one. Holding a position through a known event — earnings, a major economic release — with a tight stop and full size is where this risk is most likely to show up in practice.',
      ],
    },
  ],
  conclusion: [
    'A good stop is a statement about the market, decided from the chart, before it is ever converted into a dollar figure or a share count. Everything that makes position sizing work — the formula, the calculator, the discipline of not overriding it — depends on that ordering being right in the first place.',
  ],
  relatedTerms: ['stop-loss', 'stop-distance', 'support', 'resistance', 'atr-stop'],
  tools: [
    { label: 'Full Risk Calculator', href: '/calculator' },
    { label: 'Position Size Calculator', href: '/tools/position-size' },
  ],
};
