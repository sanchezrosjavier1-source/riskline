export interface NewsItem {
  /** Stable identity for deduplication — the article URL. */
  url: string;
  title: string;
  /** The one-line summary the publisher syndicates in their own feed. */
  summary: string;
  /** Publisher name, always shown next to the headline. */
  source: string;
  /** Unix milliseconds. */
  publishedAt: number;
}

export interface NewsSnapshot {
  items: NewsItem[];
  /** True when every feed failed, so the page can say so instead of looking empty. */
  failed: boolean;
  /** When this set was assembled, for an honest "last updated" line. */
  fetchedAt: number;
}
