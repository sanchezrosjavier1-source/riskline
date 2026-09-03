import { describe, expect, it } from 'vitest';
import {
  ALL_HISTORY_EVENTS,
  getAdjacentHistoryEvents,
  getAllHistorySlugs,
  getHistoryCategories,
  getHistoryEvent,
  getHistoryEventsByCategory,
  getHistoryRelatedTerms,
  getRelatedHistoryEvents,
} from './history';
import { TERM_MAP } from './dictionary';
import { buildDescription, buildTitle, BRAND_SUFFIX_LENGTH, MAX_TITLE } from './seo';

describe('history corpus', () => {
  it('has exactly 24 events', () => {
    expect(ALL_HISTORY_EVENTS.length).toBe(24);
  });

  it('has unique slugs', () => {
    const slugs = ALL_HISTORY_EVENTS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has unique titles', () => {
    const titles = ALL_HISTORY_EVENTS.map((e) => e.title.toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('uses URL-safe slugs', () => {
    for (const event of ALL_HISTORY_EVENTS) {
      expect(event.slug, `${event.title} has a bad slug`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('is sorted chronologically, oldest first', () => {
    const years = ALL_HISTORY_EVENTS.map((e) => e.year);
    const sorted = [...years].sort((a, b) => a - b);
    expect(years).toEqual(sorted);
  });

  it('spans a real range of years, not clustered in one period', () => {
    const years = ALL_HISTORY_EVENTS.map((e) => e.year);
    expect(Math.min(...years)).toBeLessThanOrEqual(1990);
    expect(Math.max(...years)).toBeGreaterThanOrEqual(2020);
  });

  it('covers more than one category', () => {
    expect(getHistoryCategories().length).toBeGreaterThanOrEqual(4);
  });
});

describe('event images', () => {
  it('every event has a real image with a non-empty src and alt', () => {
    for (const event of ALL_HISTORY_EVENTS) {
      expect(event.image.src, event.title).toMatch(/^\/images\/history\/.+\.jpg$/);
      expect(event.image.alt.length, event.title).toBeGreaterThan(10);
    }
  });

  it('every image path matches its event slug, and no two events share one', () => {
    const paths = ALL_HISTORY_EVENTS.map((e) => e.image.src);
    expect(new Set(paths).size).toBe(paths.length);
    for (const event of ALL_HISTORY_EVENTS) {
      expect(event.image.src).toBe(`/images/history/${event.slug}.jpg`);
    }
  });

  it('describes what is in the photo, not the event itself', () => {
    // A caption like "Black Monday 1987" would be a mislabeled illustration, not a
    // real photo description — alt text should describe the literal image content.
    for (const event of ALL_HISTORY_EVENTS) {
      expect(event.image.alt.toLowerCase(), event.title).not.toContain(
        event.title.toLowerCase().slice(0, 15),
      );
    }
  });
});

describe('every event has real depth', () => {
  it.each(ALL_HISTORY_EVENTS.map((e) => [e.title, e] as const))('%s is substantial', (_t, event) => {
    expect(event.dek.length).toBeGreaterThan(30);
    expect(event.date.length).toBeGreaterThan(3);
    expect(event.year).toBeGreaterThan(1900);
    expect(event.year).toBeLessThanOrEqual(new Date().getFullYear());
    expect(event.facts.length).toBeGreaterThanOrEqual(2);
    expect(event.facts.length).toBeLessThanOrEqual(4);
    expect(event.body.length).toBeGreaterThanOrEqual(2);
    expect(event.lesson.length).toBeGreaterThanOrEqual(1);

    for (const paragraph of event.body) expect(paragraph.length).toBeGreaterThan(80);
    for (const paragraph of event.lesson) expect(paragraph.length).toBeGreaterThan(80);
    for (const fact of event.facts) {
      expect(fact.label.length).toBeGreaterThan(2);
      expect(fact.value.length).toBeGreaterThan(0);
    }
  });

  it('has no placeholder or filler text', () => {
    const banned = /lorem ipsum|coming soon|tbd\b|todo\b|placeholder|xxx/i;
    for (const event of ALL_HISTORY_EVENTS) {
      const blob = [
        event.dek,
        ...event.body,
        ...event.lesson,
        ...event.facts.map((f) => `${f.label} ${f.value}`),
      ].join(' ');
      expect(blob, `${event.title} contains filler`).not.toMatch(banned);
    }
  });

  it('never frames a lesson as a promise of future returns', () => {
    // The site is educational-only; a history lesson should never imply
    // guaranteed outcomes or give directional trading advice.
    const banned = /guaranteed|will definitely|sure thing|can't lose|risk-free profit/i;
    for (const event of ALL_HISTORY_EVENTS) {
      expect(event.lesson.join(' '), event.title).not.toMatch(banned);
    }
  });
});

describe('internal linking', () => {
  it('resolves every related term to a real dictionary entry', () => {
    for (const event of ALL_HISTORY_EVENTS) {
      for (const slug of event.relatedTerms) {
        expect(TERM_MAP.has(slug), `${event.title} links to missing term "${slug}"`).toBe(true);
      }
    }
  });

  it('gives every event at least 3 related terms', () => {
    for (const event of ALL_HISTORY_EVENTS) {
      expect(getHistoryRelatedTerms(event).length).toBeGreaterThanOrEqual(3);
    }
  });

  it('never suggests the event itself as a related event', () => {
    for (const event of ALL_HISTORY_EVENTS) {
      expect(getRelatedHistoryEvents(event).map((e) => e.slug)).not.toContain(event.slug);
    }
  });

  it('links previous/next into a continuous chronological chain', () => {
    const first = getAdjacentHistoryEvents(ALL_HISTORY_EVENTS[0].slug);
    const last = getAdjacentHistoryEvents(ALL_HISTORY_EVENTS[ALL_HISTORY_EVENTS.length - 1].slug);
    expect(first.previous).toBeNull();
    expect(first.next).not.toBeNull();
    expect(last.next).toBeNull();
    expect(last.previous).not.toBeNull();
  });

  it('returns nulls for an unknown slug instead of throwing', () => {
    expect(getAdjacentHistoryEvents('not-a-real-event')).toEqual({ previous: null, next: null });
  });

  it('every category has at least one event', () => {
    for (const category of getHistoryCategories()) {
      expect(getHistoryEventsByCategory(category).length).toBeGreaterThan(0);
    }
  });
});

describe('lookup helpers', () => {
  it('finds events by slug', () => {
    expect(getHistoryEvent('black-monday-1987')?.year).toBe(1987);
    expect(getHistoryEvent('nope')).toBeUndefined();
  });

  it('lists every slug', () => {
    expect(getAllHistorySlugs()).toEqual(ALL_HISTORY_EVENTS.map((e) => e.slug));
  });
});

describe('history event SEO fits search-result limits', () => {
  it.each(ALL_HISTORY_EVENTS.map((e) => [e.title, e] as const))('%s title fits', (_t, event) => {
    const title = buildTitle(event.shortTitle ?? event.title, []);
    expect(
      title.length + BRAND_SUFFIX_LENGTH,
      `"${title}" is too long for the <title> tag`,
    ).toBeLessThanOrEqual(MAX_TITLE);
  });

  it.each(ALL_HISTORY_EVENTS.map((e) => [e.title, e] as const))('%s description fits', (_t, event) => {
    const description = buildDescription(event.dek);
    expect(description.length).toBeLessThanOrEqual(158);
  });
});
