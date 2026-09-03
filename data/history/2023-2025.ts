import type { HistoryEvent } from '@/types/history';

export const events2023to2025: HistoryEvent[] = [
  {
    slug: 'silicon-valley-bank-collapse-2023',
    title: 'Silicon Valley Bank: The Fastest Bank Run in History',
    shortTitle: 'The SVB Collapse (2023)',
    date: 'March 2023',
    year: 2023,
    category: 'Systemic Risk',
    dek: 'SVB, the go-to bank for tech startups and venture capital, lost $42 billion in deposits in a single day and was seized by regulators within 48 hours — the fastest large-bank failure in US history, driven by a depositor base that could coordinate an exit through group chats and a mobile app.',
    image: {
      src: '/images/history/silicon-valley-bank-collapse-2023.jpg',
      alt: 'A heavy steel bank vault door with a large circular locking wheel',
    },
    facts: [
      { label: 'Deposits withdrawn in one day', value: '$42 billion' },
      { label: 'Time from disclosure to seizure', value: '~48 hours' },
      { label: 'Rank among US bank failures', value: '2nd-largest ever' },
    ],
    body: [
      'Silicon Valley Bank had built its business almost entirely around the tech and venture capital industry, holding deposits for thousands of startups and the venture funds that backed them. Much of that deposit base sat well above the $250,000 FDIC insurance limit, and much of it also moved in close, fast-communicating circles — founders on the same group chats, venture funds advising portfolio companies to pull their cash at the same moment.',
      'On March 8, 2023, SVB disclosed a $1.8 billion loss from selling long-term bonds to raise cash, a sign it was under liquidity pressure after those bonds had lost value as interest rates rose sharply through 2022. The disclosure, instead of reassuring the market, triggered exactly the reaction it was meant to prevent: within a day, depositors pulled $42 billion, and regulators closed the bank on March 10.',
      'The speed was the defining feature. Unlike prior bank runs that unfolded over days or weeks of lines outside branches, this one moved through mobile banking apps and group chats in hours — a modern deposit base can coordinate and execute an exit at a pace no bank balance sheet is built to survive.',
    ],
    lesson: [
      'SVB is a lesson in concentration risk at the level of an entire balance sheet: a bank whose depositors mostly come from one industry, one social network and one communication style is exposed to a coordinated exit that a more diversified deposit base would never produce.',
      'It also updates an old lesson for a faster world. Bank runs were already well understood before 2023; what changed is the speed at which one can unfold. Any position — a bank deposit, a broker balance, a leveraged trade — that assumes there is time to react to bad news should be re-examined for what happens if that window shrinks to hours.',
    ],
    relatedTerms: ['liquidity', 'correlation-risk', 'risk-management', 'drawdown'],
  },
  {
    slug: 'credit-suisse-collapse-2023',
    title: 'Credit Suisse: A 167-Year-Old Bank Gone in a Weekend',
    shortTitle: 'The Credit Suisse Collapse',
    date: 'March 2023',
    year: 2023,
    category: 'Systemic Risk',
    dek: 'One of the world\'s most storied banks, founded in 1856, was forced into an emergency sale to UBS over a single weekend after a confidence crisis — and Swiss regulators then wrote roughly $17 billion of a specific bond class to zero while shareholders still got paid, inverting the order investors normally expect.',
    image: {
      src: '/images/history/credit-suisse-collapse-2023.jpg',
      alt: 'A Swiss flag flying over Lake Geneva under a stormy sky',
    },
    facts: [
      { label: 'Founded', value: '1856' },
      { label: 'AT1 bonds written to zero', value: '~$17 billion (CHF 16.5B)' },
      { label: 'Deal arranged', value: 'Over a single weekend' },
    ],
    body: [
      'Credit Suisse had spent years working through scandals, losses and leadership turnover before 2023, leaving confidence in the bank already fragile. When Silicon Valley Bank collapsed in the US in early March, it renewed global scrutiny of bank balance sheets, and a large shareholder\'s comment that it would provide no further capital tipped Credit Suisse into a full deposit and confidence crisis within days.',
      'Swiss authorities, unwilling to let a bank of Credit Suisse\'s size and global interconnectedness fail outright, arranged an emergency takeover by UBS over the weekend of March 18–19, 2023, using emergency powers to push the deal through without a normal shareholder vote.',
      'As part of the deal, Swiss regulator FINMA ordered the complete write-down of roughly CHF 16.5 billion (about $17 billion) of Credit Suisse\'s Additional Tier 1 bonds — a class of debt specifically designed to absorb losses in a crisis — to zero, while shareholders still received UBS stock worth billions. That order inverted the order investors normally expect, where bondholders are protected ahead of shareholders.',
    ],
    lesson: [
      'The bond write-down is the sharpest lesson here: the formal seniority of an asset class on paper is only as reliable as the legal and regulatory system enforcing it, and a government acting under emergency powers can rewrite that order when it decides financial stability requires it.',
      'More broadly, Credit Suisse shows that a large, systemically important institution can survive years of individually manageable scandals and still be brought down in days once confidence itself becomes the failing asset — reputation and trust are not soft factors, they are load-bearing parts of a bank\'s actual solvency.',
    ],
    relatedTerms: ['liquidity', 'correlation-risk', 'risk-management', 'volatility'],
  },
  {
    slug: 'yen-carry-trade-unwind-2024',
    title: "The Yen Carry Trade Unwind: Japan's Worst Day Since 1987",
    shortTitle: 'The Yen Carry Trade Unwind',
    date: 'August 5, 2024',
    year: 2024,
    category: 'Currency Crisis',
    dek: 'A small Bank of Japan rate hike unwound years of borrowed-yen trades funding investments worldwide, sending the Nikkei down over 12% in a single session — Japan\'s worst day since Black Monday 1987 — and dragging global markets down with it before recovering within weeks.',
    image: {
      src: '/images/history/yen-carry-trade-unwind-2024.jpg',
      alt: 'Tokyo Tower lit up against the city skyline at dusk',
    },
    facts: [
      { label: 'Nikkei one-day decline', value: '−12.4%' },
      { label: 'Trigger', value: 'BOJ rate hike, near 0% to 0.25%' },
      { label: 'S&P 500 same-week decline', value: '~3% in a day' },
    ],
    body: [
      'For years, traders borrowed yen at Japan\'s near-zero interest rates and used the proceeds to buy higher-yielding assets elsewhere — a strategy known as a carry trade. It worked reliably as long as the yen stayed weak and Japanese rates stayed near zero, and by mid-2024 an enormous amount of leveraged money worldwide depended on both conditions holding.',
      'On July 31, 2024, the Bank of Japan raised its policy rate from near 0% to 0.25% — a small move by the standards of most central banks, but enough to strengthen the yen and make the borrowing side of the carry trade suddenly more expensive. As the yen rose, leveraged carry positions started losing money, forcing funds to unwind them by selling the assets they had bought and buying back yen to repay what they had borrowed.',
      'That unwinding accelerated into itself: selling pushed asset prices down and yen-buying pushed the yen up further, forcing more of the same trades to unwind under worse terms. On August 5, 2024, the Nikkei 225 fell about 12.4% in a single session — its worst day since the 1987 crash — while US markets fell sharply the same week and the VIX volatility index spiked to levels last seen during COVID and the 2008 crisis.',
    ],
    lesson: [
      'The carry trade unwind is a clean example of hidden, cross-border leverage: the risk was not visible in any single market\'s own data, because the trade borrowed in one country\'s currency to invest in assets in others, and it only became visible once the funding side of the trade moved against it.',
      'It is also a reminder that a strategy\'s stability can depend entirely on a variable a trader does not directly control — in this case, another country\'s central bank policy. A position that is only safe as long as a specific rate stays near zero is a leveraged bet on that rate, whether or not it is framed that way.',
    ],
    relatedTerms: ['carry-trade', 'leverage', 'volatility', 'correlation-risk'],
  },
  {
    slug: 'liberation-day-tariff-shock-2025',
    title: '"Liberation Day": How a Tariff Announcement Erased Trillions in a Week',
    shortTitle: 'The 2025 Tariff Shock',
    date: 'April 2025',
    year: 2025,
    category: 'Systemic Risk',
    dek: 'A sweeping new US tariff announcement, dubbed "Liberation Day," erased trillions of dollars in global stock market value within days — one of the sharpest policy-driven selloffs on record — before a partial reversal a week later drove one of the largest single-day rallies in market history.',
    image: {
      src: '/images/history/liberation-day-tariff-shock-2025.jpg',
      alt: 'Stacked shipping containers and cranes at a busy port',
    },
    facts: [
      { label: 'S&P 500 decline, Apr 2–9', value: 'Over 12%' },
      { label: 'Announcement date', value: 'April 2, 2025' },
      { label: 'Tariff pause announced', value: 'April 9, 2025' },
    ],
    body: [
      'On April 2, 2025, the US administration announced a sweeping package of new tariffs on imports from most of its trading partners, framed as a "Liberation Day" for US manufacturing. The scale and breadth of the tariffs went beyond what markets had priced in, and investors immediately began repricing the earnings of any company exposed to global trade.',
      'Over the following week, US and global stock markets fell sharply — the S&P 500 lost more than 12% in the seven trading days after the announcement, one of the fastest broad-market declines outside an actual financial or health crisis, as investors weighed higher costs, disrupted supply chains and possible retaliation from other countries.',
      'On April 9, 2025, the administration announced a 90-day pause on the country-specific portion of the tariffs for most trading partners. Markets reversed just as sharply as they had fallen, with the S&P 500 posting one of its largest single-day percentage gains in decades, as investors who had sold into the decline scrambled to re-enter.',
    ],
    lesson: [
      'This episode is a clean example of policy risk: a single announcement from one government, unrelated to any company\'s earnings or any economic data release, moved trillions of dollars in global market value within days — a risk no amount of fundamental analysis of an individual stock would have flagged in advance.',
      'The sharp reversal matters just as much as the decline. Traders who sized positions as if the initial selloff were the final word, either by panic-selling into the bottom or shorting aggressively into the fear, were caught by a reversal nearly as violent as the drop that preceded it — a reminder that a position sized to survive being wrong in either direction holds up better than one that bets on a single outcome.',
    ],
    relatedTerms: ['volatility', 'gap', 'drawdown', 'risk-management'],
  },
];
