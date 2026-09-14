import { describe, expect, it } from 'vitest';
import { NOINDEX_ROBOTS, isIndexable, robotsFor } from './indexing';

describe('isIndexable', () => {
  it('indexes the pages that carry original writing', () => {
    for (const path of [
      '/',
      '/calculator',
      '/calculator/forex',
      '/tools/position-size',
      '/trading-dictionary',
      '/trading-dictionary/pip',
      '/guides/stop-loss-placement-guide',
      '/market-history/black-monday-1987',
      '/faq',
    ]) {
      expect(isIndexable(path), path).toBe(true);
    }
  });

  it('keeps the markets index but drops the per-asset pages', () => {
    // /markets is a written page that lists and explains. /markets/bitcoin is
    // a price and a chart, and there are eighteen of them.
    expect(isIndexable('/markets')).toBe(true);
    expect(isIndexable('/markets/bitcoin')).toBe(false);
    expect(isIndexable('/markets/eur-usd')).toBe(false);
  });

  it('ignores a trailing slash either way', () => {
    expect(isIndexable('/markets/')).toBe(true);
    expect(isIndexable('/faq/')).toBe(true);
  });

  it('does not exclude a route that merely starts with the same letters', () => {
    expect(isIndexable('/newsletter')).toBe(true);
    expect(isIndexable('/markets-overview')).toBe(true);
  });
});

describe('robotsFor', () => {
  it('returns nothing for an indexable page, so the default applies', () => {
    expect(robotsFor('/faq')).toBeUndefined();
  });

  it('blocks indexing but keeps the links followable', () => {
    // The page should not rank. The links it carries back into the
    // calculators and the dictionary should still count.
    expect(robotsFor('/markets/bitcoin')).toEqual(NOINDEX_ROBOTS);
    expect(NOINDEX_ROBOTS.follow).toBe(true);
  });
});

describe('the sitemap agrees with the policy', () => {
  it('lists nothing that carries a noindex', async () => {
    // The sitemap and the robots tag are written in different files, and a
    // page listed as worth crawling while telling the crawler to go away is
    // the kind of contradiction nobody notices by reading.
    const { default: sitemap } = await import('@/app/sitemap');
    const offenders = sitemap()
      .map((entry) => new URL(entry.url).pathname)
      .filter((path) => !isIndexable(path));

    expect(offenders).toEqual([]);
  });

  it('still lists the sections those pages hang off', async () => {
    const { default: sitemap } = await import('@/app/sitemap');
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(paths).toContain('/markets');
    expect(paths).toContain('/trading-dictionary');
  });
});
