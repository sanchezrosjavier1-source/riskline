export type CategoryId =
  | 'basics'
  | 'orders'
  | 'risk'
  | 'technical'
  | 'indicators'
  | 'structure'
  | 'stocks'
  | 'options'
  | 'forex'
  | 'crypto'
  | 'psychology';

export interface Category {
  id: CategoryId;
  label: string;
  /** One line shown under the category name in the explorer. */
  blurb: string;
}

/** Live mini-tools that can be embedded directly inside a term page. */
export type WidgetKind =
  | 'position-size'
  | 'risk-reward'
  | 'stop-distance'
  | 'leverage'
  | 'spread'
  | 'drawdown'
  | 'expectancy'
  | 'compound'
  | 'pip-value'
  | 'r-multiple';

/** Static SVG explainers drawn from hand-tuned components. */
export type DiagramKind =
  | 'stop-loss'
  | 'risk-reward'
  | 'leverage'
  | 'spread'
  | 'market-structure'
  | 'support-resistance'
  | 'candlestick'
  | 'drawdown'
  | 'trend'
  | 'liquidity'
  | 'order-book'
  | 'option-payoff';

export interface Formula {
  /** e.g. "Position Size" */
  label: string;
  /** e.g. "Maximum Risk ÷ Risk Per Share" */
  expression: string;
  /** Optional plain-language gloss of each part. */
  legend?: Array<{ symbol: string; meaning: string }>;
}

export interface ToolLink {
  label: string;
  href: string;
}

export interface Term {
  slug: string;
  term: string;
  category: CategoryId;
  /** Extra strings the search should match, e.g. "TP", "profit target". */
  aliases?: string[];
  /** One-sentence definition. Used for meta descriptions and search results. */
  short: string;
  /** Plain-language explanation, one string per paragraph. */
  explanation: string[];
  formula?: Formula;
  widget?: WidgetKind;
  diagram?: DiagramKind;
  whyItMatters: string;
  mistakes: string[];
  /** Slugs of related terms. Validated at build time by lib/dictionary.ts. */
  related: string[];
  tools?: ToolLink[];
  /** Surfaced in the "Start here" rail on the dictionary landing page. */
  popular?: boolean;
}

export interface SearchHit {
  term: Term;
  score: number;
  /** Which field produced the match, used to label the suggestion. */
  reason: 'term' | 'alias' | 'definition';
}
