export type HistoryCategory =
  | 'Stock Market Crash'
  | 'Currency Crisis'
  | 'Leverage & Derivatives'
  | 'Fraud & Collapse'
  | 'Crypto'
  | 'Systemic Risk';

export interface HistoryFact {
  label: string;
  value: string;
}

/**
 * The shape of the price/rate move a given event is best illustrated by.
 * Kept as a small, reusable set rather than one bespoke drawing per event —
 * each shape is a real, distinct pattern that several events genuinely share.
 */
export type ChartShape =
  | 'decline'
  | 'spike'
  | 'peg-break'
  | 'v-recovery'
  | 'boom-bust';

export interface HistoryChart {
  shape: ChartShape;
  /** Label at the start of the move, e.g. "Aug 2007" or "Before". */
  startLabel: string;
  /** Label at the extreme point, e.g. "−57%" or "EUR/CHF +30%". */
  extremeLabel: string;
  /** Label at the end of the move, if different from the extreme. */
  endLabel?: string;
}

export interface HistoryEvent {
  slug: string;
  title: string;
  /**
   * A shorter version of the title for the <title> tag, used when the full
   * title would push the browser-tab title past search-result truncation.
   * Falls back to `title` when omitted. The H1 always shows the full title.
   */
  shortTitle?: string;
  /** Display date, e.g. "October 19, 1987" — kept as text since precision varies by event. */
  date: string;
  /** Sortable year, used for chronological ordering. */
  year: number;
  category: HistoryCategory;
  /** One or two sentences shown on the index card. */
  dek: string;
  /** Two to four short stat callouts shown at the top of the article. */
  facts: HistoryFact[];
  /** Illustrates the shape of the move on the article page. Optional — some
   * events (e.g. a fraud discovered rather than a price move) don't map to
   * a real chart shape, and forcing one would misrepresent what happened. */
  chart?: HistoryChart;
  /** What happened, in order. */
  body: string[];
  /** The risk-management lesson — why this still matters for how you trade today. */
  lesson: string[];
  /** Dictionary slugs this event illustrates. Validated at build time. */
  relatedTerms: string[];
}
