/**
 * Search metadata for the hand-written pages.
 *
 * The templated pages — dictionary terms, guides, market history — build their
 * titles through lib/seo.ts, which enforces the length budget. The static
 * pages used to write theirs inline, which is how eight of them drifted past
 * the point where Google truncates. Keeping them here means one test covers
 * all of them.
 *
 * Budget: the layout appends " · StopSize" (11 characters) to everything
 * except the homepage, so a title has 49 characters to work with.
 */
export interface PageSeo {
  /** Canonical path, and the key this entry is looked up by. */
  path: string;
  title: string;
  description: string;
  /** What the page is actually trying to rank for — asserted to be distinct. */
  keywords: string[];
}

export const PAGE_SEO = {
  home: {
    path: '/',
    // The homepage is the one page the layout template does not append the
    // brand to, so it carries the name itself. Someone searching the brand
    // already knows the name; what they need confirming is what the site is.
    title: 'StopSize — Free Position Size & Risk Calculator',
    description:
      'Work out your position size and risk in seconds, track your trades, and learn what every number means. Free trading risk management, no sign-up.',
    keywords: ['trading risk management', 'know your risk', 'risk before you trade'],
  },

  calculator: {
    path: '/calculator',
    // "No Sign-Up" answers the objection almost every competitor raises, so
    // the reader does not have to click through to find out.
    title: 'Trading Risk Calculator — Free, No Sign-Up',
    description:
      'Enter your account, risk percent, entry and stop. Get position size, exposure and risk/reward instantly, with every step of the maths shown.',
    keywords: ['trading risk calculator', 'position size calculator', 'free risk calculator'],
  },

  tools: {
    path: '/tools',
    title: 'Free Trading Calculators — Stocks to Crypto',
    description:
      'Position size, risk and risk/reward calculators for stocks, forex, futures and crypto. All free, all instant, and none of them need an account.',
    keywords: ['trading calculators', 'free trading tools', 'trading calculator'],
  },

  positionSize: {
    path: '/tools/position-size',
    // The question mark is the whole change: it turns a category label into
    // the reader's own question, so the result reads as the answer.
    title: 'Position Size Calculator — How Many Shares?',
    description:
      'Work out how many shares to buy from your account size, risk percent and stop distance. Free, instant, and nothing to sign up for.',
    keywords: ['position size calculator', 'how many shares to buy', 'share size calculator'],
  },

  riskReward: {
    path: '/tools/risk-reward',
    title: 'Risk/Reward Calculator — Win Rate to Break Even',
    description:
      'Compare what a trade can win against what it risks, then see the win rate that ratio needs just to break even. Free, and no account required.',
    keywords: ['risk reward calculator', 'break even win rate', 'risk reward ratio'],
  },

  dictionary: {
    path: '/trading-dictionary',
    // Every glossary claims to explain. "Plain English" claims something a
    // reader can check.
    title: 'Trading Dictionary — 135 Terms, Plain English',
    description:
      '135 trading terms explained in plain language, most of them with a working calculator inside the explanation. Free, searchable, no sign-up.',
    keywords: ['trading dictionary', 'trading terms explained', 'trading glossary'],
  },

  guides: {
    path: '/guides',
    title: 'Risk Management Guides — Sizing, Stops & R:R',
    description:
      'Long-form guides on position sizing, stop placement, risk/reward and leverage, each worked through with real numbers and a live calculator.',
    keywords: ['risk management guide', 'position sizing guide', 'trading guides'],
  },

  markets: {
    path: '/markets',
    // Competing with CoinMarketCap on the word "prices" is unwinnable, so
    // this sells the thing they do not have: the price wired to a calculator.
    title: 'Crypto & Forex Prices, Ready to Size a Trade',
    description:
      'Live crypto prices and the official ECB forex reference rates, each one click away from a position size calculator. Free, and no account needed.',
    keywords: ['live crypto prices', 'forex rates', 'crypto and forex prices'],
  },

  journal: {
    path: '/journal',
    // The one claim almost no competitor can make: rival journals require an
    // account and keep your trades on their server.
    title: 'Free Trading Journal — No Account, No Upload',
    description:
      'Log trades and see your real win rate, average R, profit factor and drawdown. Free, no account, and the data never leaves your device.',
    keywords: ['free trading journal', 'trading journal no sign up', 'trade log'],
  },


  faq: {
    path: '/faq',
    // Naming the three topics acts as a filter: whoever came for stops sees
    // themselves, and whoever did not skips the click.
    title: 'Trading Risk FAQ — Position Size, Stops, R:R',
    description:
      'Straight answers on position sizing, stop losses, risk per trade and risk/reward — the questions people actually ask before their first sized trade.',
    keywords: ['risk management questions', 'position sizing faq', 'trading risk faq'],
  },

  learn: {
    path: '/learn',
    title: 'Can You Size a Trade? 12-Question Risk Quiz',
    description:
      'Twelve questions on position sizing, stop distance and risk/reward. Every answer comes with the reasoning, whether you got it right or wrong.',
    keywords: ['risk management quiz', 'trading quiz', 'trading knowledge test'],
  },

  methodology: {
    path: '/methodology',
    // A finance site that shows its working is making a claim a reader can
    // check, which is worth more than any assurance that it is trustworthy.
    title: 'How Every Calculation Here Works',
    description:
      'Every formula StopSize uses for position size and risk/reward, the real CME contract specs, where the market data comes from, and what it refuses to show.',
    keywords: ['position size formula', 'trading calculator methodology', 'how position size is calculated'],
  },

  marketHistory: {
    path: '/market-history',
    // Leading with the number wins the eye in a results list, and the year
    // range answers "is this current?" before it is asked.
    title: '24 Market Crashes That Explain Risk (1987–2025)',
    description:
      'Twenty-four landmark stock market crashes and crises, from Black Monday to the 2025 tariff shock, each with the risk lesson still worth knowing.',
    keywords: ['stock market crashes', 'market history', 'financial crises'],
  },
} as const satisfies Record<string, PageSeo>;

export type PageSeoKey = keyof typeof PAGE_SEO;

export const ALL_PAGE_SEO: PageSeo[] = Object.values(PAGE_SEO);
