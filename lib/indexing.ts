/**
 * Which routes belong in the search index.
 *
 * Not every useful page is a page worth indexing. The per-asset pages under
 * /markets exist for someone already here — a live price and a chart — and
 * have no original writing of their own.
 *
 * Left in the index they are eighteen URLs with nothing to say, and a
 * reviewer sampling the site lands on one often enough to conclude the whole
 * site is thin. Out of the index they cost nothing: the visitor who wants a
 * BTC chart still clicks through from /markets and gets it.
 *
 * follow stays on deliberately. The pages should not rank, but the links
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
const NOINDEX_EXACT: string[] = [];

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
