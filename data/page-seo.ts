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
    // brand to, so it carries the name itself.
    title: 'StopSize — Know Your Risk Before You Trade',
    description:
      'Work out your position size and risk in seconds, track your trades, and learn what every number means. Free trading risk management, no sign-up.',
    keywords: ['trading risk management', 'know your risk', 'risk before you trade'],
  },

  calculator: {
    path: '/calculator',
    title: 'Trading Risk Calculator — Free Position Sizing',
    description:
      'Free trading risk calculator. Enter account size, risk percent, entry and stop to get position size, exposure and risk/reward, with the maths shown.',
    keywords: ['trading risk calculator', 'position size calculator', 'free risk calculator'],
  },

  tools: {
    path: '/tools',
    title: 'Free Trading Calculators',
    description:
      'Position size, risk/reward and full risk calculators for stocks, forex, futures and crypto. All free, all instant, and none of them need an account.',
    keywords: ['trading calculators', 'free trading tools', 'trading calculator'],
  },

  positionSize: {
    path: '/tools/position-size',
    title: 'Position Size Calculator — How Many Shares',
    description:
      'Work out how many shares to buy from your account size, risk percent and stop distance. Free, instant, and no sign-up needed to use it.',
    keywords: ['position size calculator', 'how many shares to buy', 'share size calculator'],
  },

  riskReward: {
    path: '/tools/risk-reward',
    title: 'Risk/Reward Calculator & Break-Even Win Rate',
    description:
      'Compare what a trade can win against what it risks, and see the win rate that ratio needs just to break even. Free risk/reward ratio calculator.',
    keywords: ['risk reward calculator', 'break even win rate', 'risk reward ratio'],
  },

  dictionary: {
    path: '/trading-dictionary',
    title: 'Trading Dictionary — 135 Terms Explained',
    description:
      '135 trading terms explained in plain language, most of them with a working calculator inside the explanation. Free, searchable, and no sign-up.',
    keywords: ['trading dictionary', 'trading terms explained', 'trading glossary'],
  },

  guides: {
    path: '/guides',
    title: 'Trading Risk Management Guides',
    description:
      'Long-form guides on position sizing, stop placement, risk/reward and leverage, each worked through with real numbers and a live calculator.',
    keywords: ['risk management guide', 'position sizing guide', 'trading guides'],
  },

  markets: {
    path: '/markets',
    title: 'Live Crypto Prices & Forex Rates',
    description:
      'Live crypto prices and the official ECB forex reference rates, each one click away from a position size calculator. Free, and no account needed.',
    keywords: ['live crypto prices', 'forex rates', 'crypto and forex prices'],
  },

  journal: {
    path: '/journal',
    title: 'Free Trading Journal — No Sign-Up',
    description:
      'Log trades and see your real win rate, average R, profit factor and drawdown. A free trading journal with no account — data stays on your device.',
    keywords: ['free trading journal', 'trading journal no sign up', 'trade log'],
  },

  news: {
    path: '/news',
    title: "Market News — This Week's Headlines",
    description:
      'Nine market headlines from CNBC and MarketWatch, refreshed every hour and linked straight back to the publisher. Nobody curates this page.',
    keywords: ['market news today', 'stock market headlines', 'financial news'],
  },

  faq: {
    path: '/faq',
    title: 'Trading Risk Management FAQ',
    description:
      'Straight answers on position sizing, stop losses, risk per trade and risk/reward — the questions people actually ask before their first sized trade.',
    keywords: ['risk management questions', 'position sizing faq', 'trading risk faq'],
  },

  learn: {
    path: '/learn',
    title: 'Trading Risk Quiz — Test Your Knowledge',
    description:
      'Twelve questions on position sizing, stop distance and risk/reward. Every answer comes with the reasoning, whether you got it right or wrong.',
    keywords: ['trading quiz', 'risk management quiz', 'trading knowledge test'],
  },

  marketHistory: {
    path: '/market-history',
    title: 'Market History — 24 Crashes & Crises',
    description:
      'Twenty-four landmark stock market crashes and crises, from Black Monday to the 2025 tariff shock, each with the risk lesson still worth knowing.',
    keywords: ['stock market crashes', 'market history', 'financial crises'],
  },
} as const satisfies Record<string, PageSeo>;

export type PageSeoKey = keyof typeof PAGE_SEO;

export const ALL_PAGE_SEO: PageSeo[] = Object.values(PAGE_SEO);
