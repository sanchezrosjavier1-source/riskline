import type { Market } from './trade';

export interface MarketFaq {
  question: string;
  answer: string;
}

export interface MarketSection {
  heading: string;
  body: string[];
}

/**
 * Everything that makes one market's calculator page different from another's.
 *
 * The maths is shared; only the vocabulary, the worked example and the
 * explanation change. Keeping that in data rather than in three near-identical
 * page components is what stops them drifting apart.
 */
export interface MarketCalculatorPage {
  /** URL segment under /calculator. */
  slug: string;
  market: Market;

  // --------------------------------------------------------------------- seo
  /** Kept inside the search-result title limit by lib/seo. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];

  // -------------------------------------------------------------------- copy
  h1: string;
  dek: string;
  /** The unit a position is measured in on this page. */
  unit: string;
  unitPlural: string;
  /** Short label for the card that links here from other pages. */
  cardBlurb: string;

  /** Worked example the page opens on, in this market's own numbers. */
  example: {
    accountSize: number;
    riskPercent: number;
    entry: number;
    stopLoss: number;
    takeProfit: number;
  };

  sections: MarketSection[];
  faq: MarketFaq[];
  /** Dictionary slugs this page should link out to. Validated by tests. */
  relatedTerms: string[];
}
