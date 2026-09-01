/**
 * The tool registry. Adding a calculator means adding an entry here plus its
 * route — the tools index, the footer and internal links all read from this.
 *
 * `embedded` tools are fully working mini-calculators that live inside a
 * dictionary page rather than on their own route, because the concept and the
 * calculation are the same lesson.
 */
export interface ToolEntry {
  slug: string;
  href: string;
  name: string;
  blurb: string;
  /** A concrete input, so the card shows what the tool actually does. */
  example: string;
  result: string;
  icon: 'gauge' | 'calculator' | 'scale' | 'trending-down' | 'percent' | 'layers';
  /** Dictionary slugs this tool teaches. */
  concepts: string[];
  embedded?: boolean;
}

export const TOOLS: ToolEntry[] = [
  {
    slug: 'risk-calculator',
    href: '/calculator',
    name: 'Risk Calculator',
    blurb:
      'The complete picture for a single trade: position size, exposure, potential profit and loss, and risk/reward — with the arithmetic shown step by step.',
    example: '$10,000 account · 1% risk · $50 entry · $48 stop',
    result: '50 shares · $100 at risk · $2,500 position',
    icon: 'gauge',
    concepts: ['risk-per-trade', 'position-size', 'stop-loss', 'risk-reward-ratio', 'notional-value'],
  },
  {
    slug: 'position-size',
    href: '/tools/position-size',
    name: 'Position Size Calculator',
    blurb:
      'One question, answered immediately: how many shares should this trade be? Handles long and short, and rounds to whole shares.',
    example: 'Risk $100 with a $2 stop distance',
    result: '50 shares',
    icon: 'calculator',
    concepts: ['position-size', 'stop-distance', 'risk-per-trade'],
  },
  {
    slug: 'risk-reward',
    href: '/tools/risk-reward',
    name: 'Risk/Reward Calculator',
    blurb:
      'Compare the upside to the downside, see the win rate the trade demands, and test what different win rates actually return.',
    example: 'Risk $2 per share to make $6 per share',
    result: '1 : 3 · break even at 25%',
    icon: 'scale',
    concepts: ['risk-reward-ratio', 'break-even-win-rate', 'expectancy', 'win-rate'],
  },
];

/** Working calculators that live inside a dictionary page. */
export const EMBEDDED_TOOLS: ToolEntry[] = [
  {
    slug: 'drawdown',
    href: '/trading-dictionary/drawdown',
    name: 'Drawdown Calculator',
    blurb: 'How deep the hole is, and the gain required to climb back out of it.',
    example: '$10,000 peak falling to $8,000',
    result: '−20% · needs +25% to recover',
    icon: 'trending-down',
    concepts: ['drawdown', 'max-drawdown'],
    embedded: true,
  },
  {
    slug: 'leverage',
    href: '/trading-dictionary/leverage',
    name: 'Leverage & Liquidation',
    blurb: 'What leverage does to a position, and how far price can move before margin runs out.',
    example: '$1,000 capital at 10× leverage',
    result: '$10,000 position · 10% to liquidation',
    icon: 'layers',
    concepts: ['leverage', 'margin', 'liquidation-price'],
    embedded: true,
  },
  {
    slug: 'compound',
    href: '/trading-dictionary/compounding',
    name: 'Compound Growth Calculator',
    blurb: 'What a consistent return per period does to a balance over time.',
    example: '$10,000 at 2% for 24 periods',
    result: '$16,084 · 1.61×',
    icon: 'percent',
    concepts: ['compounding', 'drawdown'],
    embedded: true,
  },
  {
    slug: 'expectancy',
    href: '/trading-dictionary/expectancy',
    name: 'Expectancy Calculator',
    blurb: 'Whether an edge actually makes money once win rate and average sizes are combined.',
    example: '40% win rate · $300 wins · $100 losses',
    result: '+$60 per trade',
    icon: 'scale',
    concepts: ['expectancy', 'win-rate', 'r-multiple'],
    embedded: true,
  },
  {
    slug: 'pip-value',
    href: '/trading-dictionary/pip-value',
    name: 'Pip Value Calculator',
    blurb: 'Turns forex pip movement into money, so a stop in pips becomes a risk in dollars.',
    example: '100,000 units · 20 pip stop',
    result: '$10 per pip · $200 at risk',
    icon: 'calculator',
    concepts: ['pip', 'pip-value', 'lot'],
    embedded: true,
  },
  {
    slug: 'spread',
    href: '/trading-dictionary/spread',
    name: 'Spread Cost Calculator',
    blurb: 'The cost baked into every round trip, before commissions.',
    example: '$49.98 bid · $50.02 ask · 200 shares',
    result: '$0.04 spread · $8.00 to enter',
    icon: 'percent',
    concepts: ['spread', 'bid', 'ask'],
    embedded: true,
  },
];
