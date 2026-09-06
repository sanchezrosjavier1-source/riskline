import { describe, expect, it } from 'vitest';
import {
  BRAND_SUFFIX_LENGTH,
  MAX_DESCRIPTION,
  MAX_TITLE,
  buildDescription,
  buildTitle,
  termDescriptionSuffixes,
  termTitleSuffixes,
} from './seo';
import { ALL_TERMS } from './dictionary';
import { SITE } from './site';

// Imported, not copied. This file used to keep its own duplicate of both
// ladders, so when the term page changed its pattern every assertion here
// carried on passing against a format the site no longer served.
const TERM_SUFFIXES = termDescriptionSuffixes(false);
const titleSuffixesFor = termTitleSuffixes;

describe('buildDescription', () => {
  it('appends the longest suffix that fits', () => {
    const result = buildDescription('A short definition.', TERM_SUFFIXES);
    expect(result).toBe(
      'A short definition. Explained in plain English, with a worked example and the mistakes to avoid.',
    );
  });

  it('falls back to a shorter suffix when the long one would overflow', () => {
    const base = 'A'.repeat(110);
    const result = buildDescription(base, TERM_SUFFIXES);
    expect(result.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
    expect(result).toContain('Plain English, with a worked example.');
  });

  it('drops every suffix rather than overflowing', () => {
    const base = 'A'.repeat(150);
    const result = buildDescription(base, TERM_SUFFIXES);
    expect(result).toBe(base);
  });

  it('truncates on a word boundary when the base alone is too long', () => {
    const base = `${'word '.repeat(50)}end`;
    const result = buildDescription(base);
    expect(result.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
    expect(result.endsWith('…')).toBe(true);
    expect(result).not.toMatch(/wor…$/);
  });

  it('collapses stray whitespace', () => {
    expect(buildDescription('  a   b  ')).toBe('a b');
  });
});

describe('buildTitle', () => {
  it('keeps the richest suffix when it fits', () => {
    expect(buildTitle('Position Size', titleSuffixesFor(true))).toBe(
      'Position Size Meaning, Formula & Example',
    );
  });

  it('steps down to a shorter suffix for a long name', () => {
    const title = buildTitle('Exponential Moving Average', titleSuffixesFor(false));
    expect(title.length + BRAND_SUFFIX_LENGTH).toBeLessThanOrEqual(MAX_TITLE);
  });

  it('returns the bare name when no suffix can fit', () => {
    const name = 'A'.repeat(55);
    expect(buildTitle(name, titleSuffixesFor(true))).toBe(name);
  });
});

describe('page titles stay within the search-result limit', () => {
  it.each(ALL_TERMS.map((t) => [t.term, Boolean(t.formula)] as const))(
    '%s produces a title that fits',
    (name, hasFormula) => {
      const title = buildTitle(name, titleSuffixesFor(hasFormula));
      expect(title.length + BRAND_SUFFIX_LENGTH).toBeLessThanOrEqual(MAX_TITLE);
    },
  );

  it('never promises a formula on a page that has none', () => {
    for (const term of ALL_TERMS) {
      if (term.formula) continue;
      const title = buildTitle(term.term, titleSuffixesFor(false));
      expect(title.toLowerCase(), `${term.term} has no formula`).not.toContain('formula');
    }
  });
});

describe('meta descriptions stay within the search-result limit', () => {
  it('site default fits', () => {
    expect(SITE.description.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
  });

  it.each(ALL_TERMS.map((t) => [t.term, t.short, Boolean(t.widget)] as const))(
    '%s produces a description that fits',
    (_name, short, hasWidget) => {
      const description = buildDescription(short, termDescriptionSuffixes(hasWidget));
      expect(description.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
      // A description that is only the bare definition is fine, but it should
      // never be so short that it wastes the slot.
      expect(description.length).toBeGreaterThan(50);
    },
  );
});
