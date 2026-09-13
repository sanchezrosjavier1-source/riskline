/**
 * Which routes belong in the search index.
 *
 * Not every useful page is a page worth indexing. Two parts of this site exist
 * for someone already here and have no original writing of their own: the
 * per-asset pages under /markets, which are a live price and a chart, and
 * /news, which republishes headlines that belong to CNBC and MarketWatch.
 *
 * Left in the index they are 19 of 202 URLs with nothing to say, and a
 * reviewer sampling the site lands on one often enough to conclude the whole
 * site is thin. Out of the index they cost nothing: the visitor who wants a
 * BTC chart still clicks through from /markets and gets it.
 *
 * "follow" stays on deliberately. The pages should not rank, but the links
 * they carry back into the calculators and the dictionary should still count.
 */
export const NOINDEX_ROBOTS = { index: false, follow: true } as const;

/**
 * Prefixes whose *child* routes are excluded. The section index itself is
 * written content and stays indexed — /markets lists and explains, while
 * /markets/bitcoin only quotes a number.
 */
const NOINDEX_CHILD_PREFIXES = ['/markets/'];

/** Whole routes excluded, index page included. */
const NOINDEX_EXACT = ['/news'];

export function isIndexable(path: string): boolean {
  const clean = path.replace(/\/+$/, '') || '/';
  if (NOINDEX_EXACT.includes(clean)) return false;
  // startsWith on the path itself, not on path + "/": the prefix ends in a
  // slash, so "/markets" cannot match it but "/markets/bitcoin" does. That is
  // exactly the line between the written index page and its bare quote pages.
  return !NOINDEX_CHILD_PREFIXES.some((prefix) => clean.startsWith(prefix));
}

/** The metadata block for a route the sitemap also has to leave out. */
export function robotsFor(path: string) {
  return isIndexable(path) ? undefined : NOINDEX_ROBOTS;
}
