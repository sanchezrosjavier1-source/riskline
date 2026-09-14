import type { Guide } from '@/types/guide';

export const journalReviewGuide: Guide = {
  slug: 'how-to-review-a-trading-journal',
  title: 'How to Review a Trading Journal and Find Your Edge',
  shortTitle: 'How to Review Your Trading Journal',
  dek: 'A journal nobody reads is a diary. Here is what to record, how many trades you need before the numbers mean anything, and how to find which part of your trading actually pays.',
  topic: 'Trade Planning',
  keyTakeaways: [
    'Record the reason for a trade before the outcome is known. A reason written afterwards is a justification.',
    'Judge results in R, not in currency, so that trades taken at different sizes can sit in the same column.',
    'Twenty trades tell you almost nothing. Read nothing into a sample under about thirty, and make no big decisions under a hundred.',
    'The most useful review is a split: by setup, by time of day, and by whether the plan was followed.',
  ],
  intro: [
    'Almost everyone who trades for long enough starts a journal, and most journals die the same way: a few weeks of careful entries, then gaps, then nothing. The reason is rarely laziness. It is that the journal never gave anything back. Rows accumulated and no decision ever changed because of them.',
    'A journal earns its keep in the review, not the recording. This guide covers what is worth writing down, the statistics that actually describe a method, how large a sample has to be before those statistics can be believed, and the handful of splits that usually reveal where the results are really coming from.',
  ],
  sections: [
    {
      heading: 'What to record, and when',
      body: [
        'The essential fields are the ones needed to rebuild the trade: instrument, direction, entry, stop, target, size, exit, and the date and time. From entry, stop and size the journal can compute the risk taken; from the exit it can compute the result. Everything else is analysis layered on top of those numbers.',
        'Two further fields do most of the work in a review. The first is the setup — a short, consistent label for why the trade was taken, from a fixed list rather than free text, so trades can be grouped. The second is whether the plan was followed: did the entry, stop and size match what was intended. Both have to be written before the exit, because once the result is known, memory reliably rewrites the reason to fit it.',
      ],
    },
    {
      heading: 'Measure in R, not in money',
      body: [
        'R is the result of a trade divided by the amount that was risked on it. A $300 win on a trade that risked $150 is +2R. A $300 win on a trade that risked $600 is +0.5R. In currency they look identical; as evidence about the method they are completely different trades.',
        'Converting to R removes position size from the picture, which matters because size changes over time — the account grows, confidence rises and falls, a rule gets adjusted. A year of results in dollars is dominated by whichever months happened to be traded largest. The same year in R describes the method itself. R must always be calculated against the original stop, never a stop moved later, or the number stops meaning anything.',
      ],
    },
    {
      heading: 'The four numbers that describe a method',
      body: [
        'Expectancy is the average R per trade, and it is the single number that says whether a method makes money at all. Win rate and the average win and loss in R explain how it makes that money — a 40% method with large wins and a 65% method with small ones can have the same expectancy and feel completely different to trade.',
        'Maximum drawdown, measured from the running equity peak, describes the worst stretch the method has produced so far. It is the number that decides whether a trader can keep following a method through a bad run, which makes it at least as important as the return. Profit factor — gross profit divided by gross loss — is a useful summary, but it adds little once expectancy and the win and loss sizes are known.',
      ],
    },
    {
      heading: 'How many trades before the numbers mean anything',
      body: [
        'This is the question that decides whether a review helps or harms, and the honest answer is: more than feels necessary. Individual trade results in R are noisy. A method with a genuine edge of +0.2R per trade routinely produces twenty-trade stretches that are negative, simply through the order the wins and losses happen to arrive in.',
        'A rough way to see it: if individual results vary by about 1.3R around their average, which is ordinary for a method with 2R targets, the uncertainty on an average taken over 25 trades is around 1.3 ÷ 5, or ±0.26R. An observed expectancy of +0.4R over 25 trades is therefore consistent with a real edge anywhere from roughly +0.15R to +0.65R — and a little further out, with no edge at all. Over 100 trades the same uncertainty halves.',
        'The practical rule follows. Under about thirty trades, record and do not conclude. Between thirty and a hundred, notice patterns and test them. Beyond a hundred, it is reasonable to make real decisions — to drop a setup, change a rule, or size up.',
      ],
    },
    {
      heading: 'The splits that find the edge',
      body: [
        'An overall expectancy hides more than it shows, because most traders are running several methods at once without calling them that. Splitting the record is where the useful findings are. The table below is an illustration of the kind of result a split produces, using round numbers.',
        'Here the overall result is positive, and it is positive despite setup B rather than because of it. Setup A carries the whole account while B quietly gives a third of it back. Dropping B would lift expectancy from about +0.11R to +0.40R per trade — but with 25 and 35 trades in each group, the section above says to treat that as a strong suspicion to test over the next fifty trades, not as a verdict.',
      ],
      table: {
        caption: 'Illustrative review of 60 trades split by setup',
        headers: ['Setup', 'Trades', 'Expectancy', 'Total'],
        rows: [
          ['A — pullback to prior high', '25', '+0.40R', '+10.0R'],
          ['B — breakout, first hour', '35', '−0.10R', '−3.5R'],
          ['All trades', '60', '+0.11R', '+6.5R'],
        ],
      },
    },
    {
      heading: 'Other splits worth running',
      body: [
        'Time of day is the split most likely to surprise. Many discretionary traders find their results concentrated in one part of the session and eroded in another — often the quiet middle of the day, when trades are taken out of boredom rather than because a setup appeared.',
        'The plan-followed column is the most uncomfortable split and usually the most valuable. Compare the expectancy of trades where the entry, stop and size matched the plan against trades where something was changed. When the second group is clearly worse, the method is fine and the problem is execution, which calls for a completely different fix than changing the strategy.',
        'Holding time, day of week and instrument round out the useful set. Beyond those, splits start slicing the sample so thin that every group is too small to mean anything, and the review turns into a search for patterns in noise.',
      ],
    },
    {
      heading: 'A review routine that survives',
      body: [
        'A short weekly pass and a longer monthly one work better than an occasional marathon. Weekly: check every trade from the week has all its fields, and mark any where the plan was broken while the memory is fresh. Monthly: recompute expectancy, win rate, average win and loss, and drawdown, and run the setup and time-of-day splits.',
        'Change one thing at a time, and only when the sample justifies it. Changing three rules after a bad month makes it impossible to know which change did anything, and it usually means reacting to the most recent twenty trades — which is precisely the sample size that cannot be trusted.',
      ],
    },
  ],
  conclusion: [
    'A journal is the only instrument that tells a trader which part of their method is actually paying. Memory cannot do it, because memory keeps the trade that hurt and the trade that felt brilliant and drops the quiet run of small losses that decide most results.',
    'Record the reason before the outcome, measure in R against the original stop, wait for a sample large enough to believe, and split the record until the source of the results is visible. That is the whole discipline, and it is the difference between repeating a year of trading and learning from one.',
  ],
  relatedTerms: ['trading-journal', 'r-multiple', 'expectancy', 'win-rate', 'max-drawdown', 'recency-bias'],
  tools: [{ label: 'Open the trading journal', href: '/journal' }],
};
