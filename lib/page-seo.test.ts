import { describe, expect, it } from 'vitest';
import { ALL_PAGE_SEO, PAGE_SEO } from '@/data/page-seo';
import { BRAND_SUFFIX_LENGTH, MAX_TITLE } from './seo';

/**
 * The homepage renders its title without the brand suffix; every other page
 * gets " · StopSize" appended by the layout template.
 */
function renderedLength(entry: { path: string; title: string }): number {
  return entry.path === '/' ? entry.title.length : entry.title.length + BRAND_SUFFIX_LENGTH;
}

describe('static page titles fit in a search result', () => {
  it.each(ALL_PAGE_SEO.map((entry) => [entry.path, entry] as const))(
    '%s is not truncated',
    (_path, entry) => {
      expect(
        renderedLength(entry),
        `"${entry.title}" renders at ${renderedLength(entry)} characters`,
      ).toBeLessThanOrEqual(MAX_TITLE);
    },
  );

  it('does not waste the budget on titles too short to say anything', () => {
    for (const entry of ALL_PAGE_SEO) {
      expect(entry.title.length, entry.path).toBeGreaterThan(20);
    }
  });

  it('gives every page a distinct title, so results do not compete with each other', () => {
    const titles = ALL_PAGE_SEO.map((entry) => entry.title.toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('never repeats the brand inside the title, since the template adds it', () => {
    // The homepage is the exception: the layout template does not append the
    // brand there, so its title has to carry the name itself.
    for (const entry of ALL_PAGE_SEO) {
      if (entry.path === '/') {
        expect(entry.title.toLowerCase()).toContain('stopsize');
        continue;
      }
      expect(entry.title.toLowerCase(), entry.path).not.toContain('stopsize');
    }
  });
});

describe('static page descriptions', () => {
  it.each(ALL_PAGE_SEO.map((entry) => [entry.path, entry] as const))(
    '%s description fits',
    (_path, entry) => {
      expect(entry.description.length, entry.path).toBeLessThanOrEqual(158);
      expect(entry.description.length, entry.path).toBeGreaterThan(90);
    },
  );

  it('gives every page a distinct description', () => {
    const descriptions = ALL_PAGE_SEO.map((entry) => entry.description.toLowerCase());
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it('never promises a result, on any page', () => {
    const banned = /guaranteed|make money|profit every|risk-free|can't lose|beat the market/i;
    for (const entry of ALL_PAGE_SEO) {
      expect(`${entry.title} ${entry.description}`, entry.path).not.toMatch(banned);
    }
  });
});

describe('keyword targeting', () => {
  it('gives every page something specific to rank for', () => {
    for (const entry of ALL_PAGE_SEO) {
      expect(entry.keywords.length, entry.path).toBeGreaterThanOrEqual(3);
      for (const keyword of entry.keywords) {
        expect(keyword.length, `${entry.path}: "${keyword}"`).toBeGreaterThan(5);
        expect(keyword, `${entry.path}: "${keyword}"`).toBe(keyword.toLowerCase());
      }
    }
  });

  it('does not point two pages at the same primary keyword', () => {
    // Two pages competing for one term is two pages ranking worse than one would.
    const primaries = ALL_PAGE_SEO.map((entry) => entry.keywords[0]);
    expect(new Set(primaries).size).toBe(primaries.length);
  });

  it('uses each page\'s own primary keyword in its title or description', () => {
    for (const entry of ALL_PAGE_SEO) {
      const haystack = `${entry.title} ${entry.description}`.toLowerCase();
      const primary = entry.keywords[0];
      // Match on the distinctive noun rather than the exact phrase, so natural
      // wording ("risk/reward calculator") still counts for "risk reward calculator".
      const head = primary.split(' ')[0];
      expect(haystack, `${entry.path} never mentions "${head}"`).toContain(head);
    }
  });
});

describe('paths', () => {
  it('has a unique, root-relative path per page', () => {
    const paths = ALL_PAGE_SEO.map((entry) => entry.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) expect(path.startsWith('/')).toBe(true);
  });

  it('exposes the entries the pages actually import', () => {
    expect(PAGE_SEO.calculator.path).toBe('/calculator');
    expect(PAGE_SEO.journal.path).toBe('/journal');
    expect(PAGE_SEO.home.path).toBe('/');
  });
});
