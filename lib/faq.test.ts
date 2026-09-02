import { describe, expect, it } from 'vitest';
import { FAQ_GROUPS } from '@/data/faq';
import { getAllGuideSlugs, getGuide } from './guides';
import { getAllSlugs, getTerm } from './dictionary';

const ALL_ENTRIES = FAQ_GROUPS.flatMap((group) => group.entries);

describe('FAQ corpus', () => {
  it('has at least 10 questions', () => {
    expect(ALL_ENTRIES.length).toBeGreaterThanOrEqual(10);
  });

  it('has unique questions', () => {
    const questions = ALL_ENTRIES.map((e) => e.question.toLowerCase());
    expect(new Set(questions).size).toBe(questions.length);
  });

  it('every question ends with a question mark', () => {
    for (const entry of ALL_ENTRIES) {
      expect(entry.question.trim().endsWith('?'), entry.question).toBe(true);
    }
  });

  it('every answer is substantial, not a one-liner', () => {
    for (const entry of ALL_ENTRIES) {
      expect(entry.answer.length, entry.question).toBeGreaterThan(60);
    }
  });

  it('has no placeholder or filler text', () => {
    const banned = /lorem ipsum|coming soon|tbd|todo|placeholder|xxx/i;
    for (const entry of ALL_ENTRIES) {
      expect(`${entry.question} ${entry.answer}`).not.toMatch(banned);
    }
  });
});

describe('FAQ internal links resolve', () => {
  const termSlugs = new Set(getAllSlugs());
  const guideSlugs = new Set(getAllGuideSlugs());
  const staticRoutes = new Set([
    '/',
    '/calculator',
    '/tools',
    '/trading-dictionary',
    '/guides',
    '/learn',
    '/about',
    '/disclaimer',
    '/privacy',
    '/contact',
    '/faq',
  ]);

  it('every href points somewhere real', () => {
    for (const entry of ALL_ENTRIES) {
      if (!entry.href) continue;
      const isTerm = entry.href.startsWith('/trading-dictionary/');
      const isGuide = entry.href.startsWith('/guides/');

      if (isTerm) {
        const slug = entry.href.replace('/trading-dictionary/', '');
        expect(termSlugs.has(slug), `"${entry.question}" links to missing term ${slug}`).toBe(
          true,
        );
        expect(getTerm(slug)).toBeDefined();
      } else if (isGuide) {
        const slug = entry.href.replace('/guides/', '');
        expect(guideSlugs.has(slug), `"${entry.question}" links to missing guide ${slug}`).toBe(
          true,
        );
        expect(getGuide(slug)).toBeDefined();
      } else {
        expect(
          staticRoutes.has(entry.href),
          `"${entry.question}" links to unknown route ${entry.href}`,
        ).toBe(true);
      }
    }
  });

  it('every href with a label has non-trivial label text', () => {
    for (const entry of ALL_ENTRIES) {
      if (entry.href) {
        expect(entry.hrefLabel?.length ?? 0).toBeGreaterThan(3);
      }
    }
  });
});
