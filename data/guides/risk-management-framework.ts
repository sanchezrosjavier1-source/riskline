import type { Guide } from '@/types/guide';

export const riskManagementFrameworkGuide: Guide = {
  slug: 'risk-management-framework',
  title: 'A Practical Framework for Risk Management',
  dek: 'Risk management is not a mindset — it is a small number of rules, decided once, in advance, and applied without exception. Here is how to build one from three numbers.',
  topic: 'Risk Management',
  keyTakeaways: [
    'A workable framework is built from three numbers: risk per trade, total portfolio heat, and a hard stopping point.',
    'Every rule should be decided before a position is open, when there is no money at stake in the decision.',
    'The framework has to survive the worst plausible sequence of trades, not the average one.',
    'Positive expectancy does not make a framework unnecessary — a good edge, oversized, can still end an account.',
  ],
  intro: [
    'Ask what "risk management" means and you will get answers ranging from "trading carefully" to "not being greedy." Neither of those is a framework — they are moods, and moods do not survive a losing streak. A framework is different: it is a small set of numeric rules, fixed in advance, that decide the outcome of a bad stretch before the bad stretch happens.',
    'This guide builds one from the ground up, using three numbers that between them cover the situations that actually end accounts: a single bad trade, several bad trades at once, and a bad month.',
  ],
  sections: [
    {
      heading: 'The first number: risk per trade',
      body: [
        'This is the foundation everything else sits on. Pick a fixed percentage of your account you are willing to lose on any single trade — commonly between 0.5% and 2% — and multiply it by your current account size every time you size a position. Not your starting balance from six months ago: your current equity, recalculated each time.',
        'The specific percentage matters less than the discipline of never deviating from it. A trade that "feels" like it deserves more risk than usual is exactly the trade where that instinct is least trustworthy — conviction is not a reliable predictor of outcome, and sizing as though it were is how a single trade turns into a disproportionate loss.',
      ],
    },
    {
      heading: 'The second number: portfolio heat',
      body: [
        'Risk per trade controls one position. It says nothing about five positions open at once, each individually within the rule, that collectively put far more of the account at risk than any single trade would suggest.',
        'Portfolio heat is the sum of the risk across every open position, measured as a percentage of the account. Five trades at 1% each is 5% of total exposure — and if those five trades are correlated, sharing a sector, a currency, or a broader market direction, the real risk behaves like a single, much larger position rather than five independent ones.',
        'A workable framework caps total heat, commonly somewhere around 4-6% of the account, and treats correlated positions as sharing a slot rather than each getting their own. Before adding a new position, the relevant question is not "does this trade pass the 1% rule on its own" — it is "what does total exposure look like with this trade added."',
      ],
    },
    {
      heading: 'The third number: a hard stopping point',
      body: [
        'The first two numbers govern individual trades and the combination of open trades. The third governs the day, the week, or the month as a whole — a fixed loss threshold that, once reached, ends trading for that period regardless of how the next setup looks.',
        'This rule exists specifically for the moment when it is hardest to follow: after a string of losses, when the pull to make it back immediately is strongest and judgment is least reliable. A stopping point decided while calm — "if I am down 5% this week, I am done for the week" — removes that decision from the moment it would otherwise be made under pressure.',
      ],
    },
    {
      heading: 'Putting it together',
      body: [
        'A complete, simple framework built from the three numbers above might read: risk 1% per trade, cap total open risk at 5%, and stop trading for the week if the account is down 6% from where it started. None of these numbers is universally correct — they depend on account size, strategy, and how much drawdown a trader can tolerate without abandoning the plan — but the structure holds regardless of the exact figures chosen.',
        'What matters is that all three exist, are written down, and are decided before any of them is tested by an actual losing streak.',
      ],
    },
    {
      heading: 'Why the framework has to survive the worst case, not the average one',
      body: [
        'A framework that works during a normal month and fails during a bad one has not actually solved the problem it exists to solve — bad months are exactly when it is needed. Losing streaks are also considerably longer, more often, than intuition suggests: at a 40% win rate, a run of eight consecutive losses is well within normal variance over a few hundred trades, not a sign that something has gone wrong.',
        'This is also where positive expectancy stops being sufficient on its own. A strategy that wins money on average can still carry a meaningful chance of a catastrophic sequence if it is traded at reckless size — the math of the edge and the math of survival are related but separate questions, and a framework has to answer both.',
      ],
    },
    {
      heading: 'Check whether your numbers actually work',
      body: [
        'A framework is only as good as the expectancy of what you are trading inside it. Use the calculator below to check whether a given win rate and average win/loss size actually produce a positive result before assuming the framework alone will carry a losing edge.',
      ],
      widget: 'expectancy',
    },
    {
      heading: 'Where frameworks fail in practice',
      body: [
        'Not from the framework being wrong on paper, but from it being suspended in the exact moments it was built for. Raising risk after a string of losses to "get back to even faster." Treating a particularly convincing setup as an exception to the per-trade cap. Adding a new position without checking what total heat looks like with it included. Telling yourself the weekly stop does not apply this week because the next trade "is different."',
        'A framework that only holds when nothing is testing it is not really a framework — it is a description of what happens when things are going well. The value of deciding these numbers in advance is precisely that they do not require willpower in the moment; they only require having been written down before the moment arrived.',
      ],
    },
  ],
  conclusion: [
    'Risk management done well is almost boring: three numbers, decided in advance, applied without negotiation. The framework does not need to be clever. It needs to survive contact with a losing streak, which is the one thing intuition reliably fails to do.',
  ],
  relatedTerms: ['risk-management', 'risk-per-trade', 'portfolio-heat', 'risk-of-ruin', 'trading-plan'],
  tools: [
    { label: 'Full Risk Calculator', href: '/calculator' },
    { label: 'Position Size Calculator', href: '/tools/position-size' },
  ],
};
