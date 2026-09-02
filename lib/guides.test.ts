import { describe, expect, it } from 'vitest';
import {
  ALL_GUIDES,
  getAdjacentGuides,
  getAllGuideSlugs,
  getGuide,
  getGuideRelatedTerms,
  getReadingMinutes,
  getRelatedGuides,
} from './guides';
import { TERM_MAP } from './dictionary';
import { buildDescription, buildTitle, BRAND_SUFFIX_LENGTH, MAX_TITLE } from './seo';

describe('guide corpus', () => {
  it('has at least 5 guides', () => {
    expect(ALL_GUIDES.length).toBeGreaterThanOrEqual(5);
  });

  it('has unique slugs', () => {
    const slugs = ALL_GUIDES.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has unique titles', () => {
    const titles = ALL_GUIDES.map((g) => g.title.toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('uses URL-safe slugs', () => {
    for (const guide of ALL_GUIDES) {
      expect(guide.slug, `${guide.title} has a bad slug`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});

describe('every guide has real depth', () => {
  it.each(ALL_GUIDES.map((g) => [g.title, g] as const))('%s is substantial', (_title, guide) => {
    expect(guide.dek.length).toBeGreaterThan(30);
    expect(guide.intro.length).toBeGreaterThanOrEqual(1);
    expect(guide.sections.length).toBeGreaterThanOrEqual(4);
    expect(guide.conclusion.length).toBeGreaterThanOrEqual(1);
    expect(guide.keyTakeaways.length).toBeGreaterThanOrEqual(3);

    for (const paragraph of guide.intro) expect(paragraph.length).toBeGreaterThan(60);
    for (const paragraph of guide.conclusion) expect(paragraph.length).toBeGreaterThan(60);

    for (const section of guide.sections) {
      expect(section.heading.length).toBeGreaterThan(5);
      expect(section.body.length).toBeGreaterThanOrEqual(1);
      for (const paragraph of section.body) {
        expect(paragraph.length, `${guide.title} → ${section.heading}`).toBeGreaterThan(40);
      }
    }
  });

  it('runs to a real reading time, not a stub', () => {
    for (const guide of ALL_GUIDES) {
      expect(getReadingMinutes(guide), `${guide.title} is too short`).toBeGreaterThanOrEqual(3);
    }
  });

  it('has no placeholder or filler text', () => {
    const banned = /lorem ipsum|coming soon|tbd|todo|placeholder|xxx/i;
    for (const guide of ALL_GUIDES) {
      const blob = [
        guide.dek,
        ...guide.intro,
        ...guide.conclusion,
        ...guide.sections.flatMap((s) => [s.heading, ...s.body]),
      ].join(' ');
      expect(blob, `${guide.title} contains filler`).not.toMatch(banned);
    }
  });
});

describe('guide tables are well-formed', () => {
  it('every row has exactly as many cells as there are headers', () => {
    for (const guide of ALL_GUIDES) {
      for (const section of guide.sections) {
        if (!section.table) continue;
        for (const row of section.table.rows) {
          expect(
            row.length,
            `${guide.title} → ${section.heading} row "${row[0]}"`,
          ).toBe(section.table.headers.length);
        }
      }
    }
  });
});

describe('internal linking', () => {
  it('resolves every related term to a real dictionary entry', () => {
    for (const guide of ALL_GUIDES) {
      for (const slug of guide.relatedTerms) {
        expect(TERM_MAP.has(slug), `${guide.title} links to missing term "${slug}"`).toBe(true);
      }
    }
  });

  it('gives every guide at least 3 related terms', () => {
    for (const guide of ALL_GUIDES) {
      expect(getGuideRelatedTerms(guide).length).toBeGreaterThanOrEqual(3);
    }
  });

  it('points every tool link at a known route', () => {
    const routes = new Set(['/calculator', '/tools', '/tools/position-size', '/tools/risk-reward']);
    for (const guide of ALL_GUIDES) {
      for (const tool of guide.tools ?? []) {
        expect(routes.has(tool.href), `${guide.title} links to unknown route ${tool.href}`).toBe(
          true,
        );
      }
    }
  });

  it('never suggests the guide itself as a related guide', () => {
    for (const guide of ALL_GUIDES) {
      expect(getRelatedGuides(guide).map((g) => g.slug)).not.toContain(guide.slug);
    }
  });

  it('links previous/next into a continuous chain', () => {
    const first = getAdjacentGuides(ALL_GUIDES[0].slug);
    const last = getAdjacentGuides(ALL_GUIDES[ALL_GUIDES.length - 1].slug);
    expect(first.previous).toBeNull();
    expect(first.next).not.toBeNull();
    expect(last.next).toBeNull();
    expect(last.previous).not.toBeNull();
  });

  it('returns nulls for an unknown slug instead of throwing', () => {
    expect(getAdjacentGuides('not-a-real-guide')).toEqual({ previous: null, next: null });
  });
});

describe('lookup helpers', () => {
  it('finds guides by slug', () => {
    expect(getGuide('how-to-calculate-position-size')?.title).toContain('Position Size');
    expect(getGuide('nope')).toBeUndefined();
  });

  it('lists every slug', () => {
    expect(getAllGuideSlugs()).toEqual(ALL_GUIDES.map((g) => g.slug));
  });
});

describe('guide SEO fits search-result limits', () => {
  it.each(ALL_GUIDES.map((g) => [g.title, g] as const))('%s title fits', (_title, guide) => {
    // Mirrors app/guides/[slug]/page.tsx: shortTitle overrides the display
    // title for the <title> tag when the full title would truncate.
    const title = buildTitle(guide.shortTitle ?? guide.title, []);
    expect(title.length + BRAND_SUFFIX_LENGTH).toBeLessThanOrEqual(MAX_TITLE);
  });

  it.each(ALL_GUIDES.map((g) => [g.title, g] as const))('%s description fits', (_title, guide) => {
    const description = buildDescription(guide.dek);
    expect(description.length).toBeLessThanOrEqual(158);
  });
});
