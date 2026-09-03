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

export interface HistoryImage {
  /** Path under /public, e.g. "/images/history/black-monday-1987.jpg". */
  src: string;
  /** Describes what's in the photo, not the event — read by screen readers. */
  alt: string;
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
  /** A real, related photo shown at the top of the article. */
  image: HistoryImage;
  /** Two to four short stat callouts shown at the top of the article. */
  facts: HistoryFact[];
  /** What happened, in order. */
  body: string[];
  /** The risk-management lesson — why this still matters for how you trade today. */
  lesson: string[];
  /** Dictionary slugs this event illustrates. Validated at build time. */
  relatedTerms: string[];
}
