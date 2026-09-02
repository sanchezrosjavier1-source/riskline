export interface FaqEntry {
  question: string;
  answer: string;
  /** Optional dictionary or guide slug for a "Read more" link. */
  href?: string;
  hrefLabel?: string;
}

export interface FaqGroup {
  title: string;
  entries: FaqEntry[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'About the calculator',
    entries: [
      {
        question: 'Is Riskline’s calculator financial advice?',
        answer:
          'No. It performs arithmetic on numbers you provide — it does not recommend a trade, a direction, an entry price, or an instrument. Riskline provides educational information only, and nothing on this site should be treated as financial, investment, or trading advice.',
        href: '/disclaimer',
        hrefLabel: 'Read the full disclaimer',
      },
      {
        question: 'Does the calculator guarantee my loss will be exactly the amount shown?',
        answer:
          'No. The calculated risk assumes your stop loss fills exactly at the stop price. In real markets, gaps, slippage, trading halts, and thin liquidity can all cause a worse fill, so your actual loss can exceed the figure shown. Spread, commissions, and financing costs are also not included in the calculation.',
        href: '/trading-dictionary/slippage',
        hrefLabel: 'Learn about slippage',
      },
      {
        question: 'Why does my broker show a different position size than Riskline?',
        answer:
          'The most common reasons are rounding (Riskline rounds down to a whole share, contract, or lot, since your broker cannot fill a fraction of one), a different risk percentage than you intended, or a stop distance that does not match what you entered. Double-check the entry and stop prices first — a small difference there compounds through the whole calculation.',
      },
      {
        question: 'Can I use this for forex, crypto, or options?',
        answer:
          'The main Risk Calculator is built around share-style instruments. For forex position sizing, the dictionary’s pip value tool converts a pip-based stop into dollar risk. For leveraged instruments, the leverage tool shows the relationship between capital, leverage, and liquidation distance. Options carry additional mechanics — premium, time decay, and volatility — that a share-based position size formula does not capture.',
        href: '/trading-dictionary/pip-value',
        hrefLabel: 'Open the pip value tool',
      },
      {
        question: 'What risk percentage per trade should I use?',
        answer:
          'There is no universally correct number, and Riskline does not recommend one for your specific situation — that would be personalized advice, which this site does not provide. Common risk management frameworks use figures between 0.5% and 2% per trade. The right number for you depends on your risk tolerance, strategy, and how many trades you typically hold at once.',
        href: '/trading-dictionary/risk-per-trade',
        hrefLabel: 'Read about risk per trade',
      },
    ],
  },
  {
    title: 'About the dictionary',
    entries: [
      {
        question: 'Is the trading dictionary free to use?',
        answer:
          'Yes, entirely. There is no paywall, no sign-up, and no limit on how many terms you can look up. The calculator and every embedded mini-tool inside a term page work the same way.',
      },
      {
        question: 'How many terms does the dictionary cover?',
        answer:
          'The dictionary currently covers 135 terms across eleven categories — basics, orders, risk management, technical analysis, indicators, market structure, stocks, options, forex, crypto, and trading psychology.',
        href: '/trading-dictionary',
        hrefLabel: 'Browse the full dictionary',
      },
      {
        question: 'Why do some terms have a calculator built into the page?',
        answer:
          'Because a definition alone rarely makes a concept click the way changing the numbers does. Fourteen of the most calculation-heavy terms — position size, drawdown, leverage, and others — carry a live, working mini-tool directly in the explanation, so you can see the relationship the definition describes rather than just read about it.',
      },
      {
        question: 'Can I suggest a term that is missing?',
        answer:
          'Yes — that kind of feedback is genuinely useful. Send the term through the contact page and it will be considered for a future addition.',
        href: '/contact',
        hrefLabel: 'Contact Riskline',
      },
    ],
  },
  {
    title: 'Accounts, data, and privacy',
    entries: [
      {
        question: 'Do I need to create an account?',
        answer:
          'No. The calculator, the dictionary, the guides, and the knowledge check all work immediately, with no sign-up required for any of it.',
      },
      {
        question: 'What happens to the scenarios I save in the calculator?',
        answer:
          'Saved scenarios, recently viewed terms, and knowledge check answers are stored only in your browser, using session storage. Nothing is uploaded to a server. Closing the browser tab clears them, and there is a manual “Clear all” control next to each saved list if you want to clear them sooner.',
        href: '/privacy',
        hrefLabel: 'Read the privacy policy',
      },
      {
        question: 'Does Riskline use cookies?',
        answer:
          'Riskline does not set its own tracking cookies. If advertising is active, Google AdSense may set cookies subject to its own policies, and you are asked for consent before any non-essential cookie is set.',
        href: '/privacy',
        hrefLabel: 'Read the privacy policy',
      },
    ],
  },
  {
    title: 'About the concepts',
    entries: [
      {
        question: 'What is the single most important number in risk management?',
        answer:
          'If only one, it would be risk per trade — the fixed percentage of your account you are willing to lose on any single position. Nearly every other risk concept, from position sizing to drawdown recovery, is built on top of that one decision being made in advance and applied consistently.',
        href: '/trading-dictionary/risk-per-trade',
        hrefLabel: 'Read about risk per trade',
      },
      {
        question: 'Why does position size matter more than picking the right entry?',
        answer:
          'Because position size is the variable that determines whether a losing streak is survivable or account-ending — and every strategy has losing streaks. Two traders taking identical entries can end up in completely different places purely because of how much they risked on each one.',
        href: '/guides/how-to-calculate-position-size',
        hrefLabel: 'Read the full guide',
      },
      {
        question: 'Is a high win rate the same as a profitable strategy?',
        answer:
          'Not on its own. A 90% win rate with tiny winners and one occasional large loser can still lose money overall. Win rate only becomes meaningful next to the size of the average win and average loss — together, those produce expectancy, which is what actually determines profitability.',
        href: '/trading-dictionary/expectancy',
        hrefLabel: 'Read about expectancy',
      },
    ],
  },
];
