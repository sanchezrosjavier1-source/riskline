import { ALL_GUIDES } from '@/data/guides';
import { TERM_MAP } from '@/lib/dictionary';
import type { Guide } from '@/types/guide';
import type { Term } from '@/types/dictionary';

export { ALL_GUIDES };

const GUIDE_MAP: Map<string, Guide> = new Map(ALL_GUIDES.map((guide) => [guide.slug, guide]));

export function getGuide(slug: string): Guide | undefined {
  return GUIDE_MAP.get(slug);
}

export function getAllGuideSlugs(): string[] {
  return ALL_GUIDES.map((guide) => guide.slug);
}

/** Resolves a guide's related dictionary slugs to real terms, dropping any that don't exist. */
export function getGuideRelatedTerms(guide: Guide): Term[] {
  return guide.relatedTerms
    .map((slug) => TERM_MAP.get(slug))
    .filter((term): term is Term => Boolean(term));
}

export function getAdjacentGuides(slug: string): { previous: Guide | null; next: Guide | null } {
  const index = ALL_GUIDES.findIndex((guide) => guide.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? ALL_GUIDES[index - 1] : null,
    next: index < ALL_GUIDES.length - 1 ? ALL_GUIDES[index + 1] : null,
  };
}

/** Other guides sharing the same topic, falling back to the reading-order neighbors. */
export function getRelatedGuides(guide: Guide, limit = 3): Guide[] {
  const sameTopic = ALL_GUIDES.filter((g) => g.slug !== guide.slug && g.topic === guide.topic);
  if (sameTopic.length >= limit) return sameTopic.slice(0, limit);

  const seen = new Set([guide.slug, ...sameTopic.map((g) => g.slug)]);
  const rest = ALL_GUIDES.filter((g) => !seen.has(g.slug));
  return [...sameTopic, ...rest].slice(0, limit);
}

/** Rough reading time from total word count across every prose field. */
export function getReadingMinutes(guide: Guide): number {
  const words = [
    ...guide.intro,
    ...guide.conclusion,
    ...guide.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(' ');
  const wordCount = words.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 220));
}
