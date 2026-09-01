import { describe, expect, it } from 'vitest';
import {
  ALL_TERMS,
  TERM_MAP,
  getAdjacentTerms,
  getAvailableLetters,
  getPopularTerms,
  getRelatedTerms,
  getTerm,
  getTermsByCategory,
  searchTerms,
} from './dictionary';
import { CATEGORIES } from '@/data/categories';

const VALID_CATEGORIES = new Set(CATEGORIES.map((c) => c.id));
const VALID_WIDGETS = new Set([
  'position-size',
  'risk-reward',
  'stop-distance',
  'leverage',
  'spread',
  'drawdown',
  'expectancy',
  'compound',
  'pip-value',
  'r-multiple',
]);

describe('dictionary corpus', () => {
  it('has at least 100 terms', () => {
    expect(ALL_TERMS.length).toBeGreaterThanOrEqual(100);
  });

  it('has unique slugs', () => {
    const slugs = ALL_TERMS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has unique display names', () => {
    const names = ALL_TERMS.map((t) => t.term.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it('uses URL-safe slugs', () => {
    for (const term of ALL_TERMS) {
      expect(term.slug, `${term.term} has a bad slug`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('is sorted alphabetically', () => {
    const names = ALL_TERMS.map((t) => t.term);
    const sorted = [...names].sort((a, b) => a.localeCompare(b, 'en-US'));
    expect(names).toEqual(sorted);
  });
});

describe('every term is complete', () => {
  it.each(ALL_TERMS.map((t) => [t.term, t] as const))('%s has required content', (_name, term) => {
    expect(term.short.length).toBeGreaterThan(20);
    expect(term.short.length).toBeLessThan(200);
    expect(term.explanation.length).toBeGreaterThanOrEqual(2);
    expect(term.whyItMatters.length).toBeGreaterThan(30);
    expect(term.mistakes.length).toBeGreaterThanOrEqual(2);
    expect(term.related.length).toBeGreaterThanOrEqual(3);
    expect(VALID_CATEGORIES.has(term.category)).toBe(true);
    for (const paragraph of term.explanation) {
      expect(paragraph.length).toBeGreaterThan(40);
    }
  });

  it('has no placeholder or filler text', () => {
    const banned = /lorem ipsum|coming soon|tbd|todo|placeholder|xxx/i;
    for (const term of ALL_TERMS) {
      const blob = [term.short, term.whyItMatters, ...term.explanation, ...term.mistakes].join(' ');
      expect(blob, `${term.term} contains filler`).not.toMatch(banned);
    }
  });

  it('declares only known widgets', () => {
    for (const term of ALL_TERMS) {
      if (term.widget) expect(VALID_WIDGETS.has(term.widget)).toBe(true);
    }
  });
});

describe('internal linking', () => {
  it('resolves every related slug to a real term', () => {
    for (const term of ALL_TERMS) {
      for (const slug of term.related) {
        expect(TERM_MAP.has(slug), `${term.term} links to missing term "${slug}"`).toBe(true);
      }
    }
  });

  it('never links a term to itself', () => {
    for (const term of ALL_TERMS) {
      expect(term.related, `${term.term} links to itself`).not.toContain(term.slug);
    }
  });

  it('points every tool link at a real route', () => {
    const routes = new Set([
      '/calculator',
      '/tools',
      '/tools/position-size',
      '/tools/risk-reward',
      '/learn',
    ]);
    for (const term of ALL_TERMS) {
      for (const tool of term.tools ?? []) {
        const isTermPage = tool.href.startsWith('/trading-dictionary/');
        if (isTermPage) {
          const slug = tool.href.replace('/trading-dictionary/', '');
          expect(TERM_MAP.has(slug), `${term.term} links to missing page ${tool.href}`).toBe(true);
        } else {
          expect(routes.has(tool.href), `${term.term} links to unknown route ${tool.href}`).toBe(true);
        }
      }
    }
  });

  it('gives every term at least three resolvable related terms', () => {
    for (const term of ALL_TERMS) {
      expect(getRelatedTerms(term).length, `${term.term} has too few relations`).toBeGreaterThanOrEqual(3);
    }
  });

  it('is a well-connected graph — every term is linked to by another', () => {
    const linkedTo = new Set<string>();
    for (const term of ALL_TERMS) {
      for (const slug of term.related) linkedTo.add(slug);
    }
    const orphans = ALL_TERMS.filter((t) => !linkedTo.has(t.slug)).map((t) => t.slug);
    expect(orphans).toEqual([]);
  });
});

describe('categories', () => {
  it('every category has terms', () => {
    for (const category of CATEGORIES) {
      expect(getTermsByCategory(category.id).length, `${category.label} is empty`).toBeGreaterThan(0);
    }
  });

  it('surfaces popular terms', () => {
    expect(getPopularTerms().length).toBeGreaterThanOrEqual(8);
  });
});

describe('search', () => {
  it('returns nothing for an empty query', () => {
    expect(searchTerms('')).toHaveLength(0);
    expect(searchTerms('   ')).toHaveLength(0);
  });

  it('ranks an exact name first', () => {
    expect(searchTerms('position size')[0].term.slug).toBe('position-size');
    expect(searchTerms('stop loss')[0].term.slug).toBe('stop-loss');
  });

  it('finds the documented "risk" suggestions', () => {
    const slugs = searchTerms('risk', 10).map((h) => h.term.slug);
    expect(slugs).toContain('risk-per-trade');
    expect(slugs).toContain('risk-reward-ratio');
    expect(slugs).toContain('risk-management');
  });

  it('finds the documented "stop" suggestions', () => {
    const slugs = searchTerms('stop', 10).map((h) => h.term.slug);
    expect(slugs).toContain('stop-loss');
    expect(slugs).toContain('trailing-stop');
    expect(slugs).toContain('stop-order');
    expect(slugs).toContain('stop-limit-order');
  });

  it('matches aliases', () => {
    expect(searchTerms('iv').some((h) => h.term.slug === 'implied-volatility')).toBe(true);
    expect(searchTerms('rr').some((h) => h.term.slug === 'risk-reward-ratio')).toBe(true);
    expect(searchTerms('take profit').some((h) => h.term.slug === 'take-profit')).toBe(true);
  });

  it('is case and punctuation insensitive', () => {
    expect(searchTerms('R/R').some((h) => h.term.slug === 'risk-reward-ratio')).toBe(true);
    expect(searchTerms('P/E').some((h) => h.term.slug === 'pe-ratio')).toBe(true);
  });

  it('returns an empty list for nonsense rather than throwing', () => {
    expect(searchTerms('zzzzqqqq')).toEqual([]);
  });

  it('respects the result limit', () => {
    expect(searchTerms('a', 5).length).toBeLessThanOrEqual(5);
  });
});

describe('navigation', () => {
  it('links terms into a continuous chain', () => {
    const first = getAdjacentTerms(ALL_TERMS[0].slug);
    const last = getAdjacentTerms(ALL_TERMS[ALL_TERMS.length - 1].slug);
    expect(first.previous).toBeNull();
    expect(first.next).not.toBeNull();
    expect(last.next).toBeNull();
    expect(last.previous).not.toBeNull();
  });

  it('returns nulls for an unknown slug instead of throwing', () => {
    expect(getAdjacentTerms('not-a-real-term')).toEqual({ previous: null, next: null });
  });

  it('looks terms up by slug', () => {
    expect(getTerm('position-size')?.term).toBe('Position Size');
    expect(getTerm('nope')).toBeUndefined();
  });

  it('reports available letters for the A–Z rail', () => {
    const letters = getAvailableLetters();
    expect(letters.length).toBeGreaterThan(15);
    expect(letters).toEqual([...letters].sort());
  });
});
