import { ALL_TERMS } from '@/data/terms';
import { CATEGORIES } from '@/data/categories';
import { searchRecords, toSearchRecord, type SearchRecord } from '@/lib/search';
import type { CategoryId, SearchHit, Term } from '@/types/dictionary';

export { ALL_TERMS };

export const TERM_MAP: Map<string, Term> = new Map(ALL_TERMS.map((term) => [term.slug, term]));

/**
 * The compact index handed to client components. Passing this instead of the
 * full corpus keeps every explanation paragraph out of the JavaScript bundle.
 */
export const SEARCH_INDEX: SearchRecord[] = ALL_TERMS.map(toSearchRecord);

export function getTerm(slug: string): Term | undefined {
  return TERM_MAP.get(slug);
}

export function getAllSlugs(): string[] {
  return ALL_TERMS.map((term) => term.slug);
}

/**
 * Resolves related slugs to real terms, silently dropping any that do not
 * exist so a typo can never render a dead link.
 */
export function getRelatedTerms(term: Term, limit = 6): Term[] {
  const seen = new Set<string>([term.slug]);
  const resolved: Term[] = [];

  for (const slug of term.related) {
    if (seen.has(slug)) continue;
    const found = TERM_MAP.get(slug);
    if (!found) continue;
    seen.add(slug);
    resolved.push(found);
    if (resolved.length >= limit) break;
  }

  // If a term has few explicit relations, fill from the same category so the
  // "keep exploring" rail is never sparse.
  if (resolved.length < 3) {
    for (const candidate of ALL_TERMS) {
      if (resolved.length >= 3) break;
      if (seen.has(candidate.slug)) continue;
      if (candidate.category !== term.category) continue;
      seen.add(candidate.slug);
      resolved.push(candidate);
    }
  }

  return resolved;
}

export function getTermsByCategory(category: CategoryId): Term[] {
  return ALL_TERMS.filter((term) => term.category === category);
}

export function getPopularTerms(limit = 12): Term[] {
  return ALL_TERMS.filter((term) => term.popular).slice(0, limit);
}

/** Terms that carry a live mini-tool, used to promote interactive pages. */
export function getInteractiveTerms(limit = 8): Term[] {
  return ALL_TERMS.filter((term) => Boolean(term.widget)).slice(0, limit);
}

export function countByCategory(): Record<CategoryId, number> {
  const counts = {} as Record<CategoryId, number>;
  for (const category of CATEGORIES) counts[category.id] = 0;
  for (const term of ALL_TERMS) counts[term.category] += 1;
  return counts;
}

/** First letters that actually have entries, for the A–Z rail. */
export function getAvailableLetters(): string[] {
  const letters = new Set(ALL_TERMS.map((term) => term.term[0].toUpperCase()));
  return Array.from(letters).sort();
}

/**
 * Previous and next term in alphabetical order, so every page has somewhere
 * to go next.
 */
export function getAdjacentTerms(slug: string): { previous: Term | null; next: Term | null } {
  const index = ALL_TERMS.findIndex((term) => term.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? ALL_TERMS[index - 1] : null,
    next: index < ALL_TERMS.length - 1 ? ALL_TERMS[index + 1] : null,
  };
}

/** Server-side search returning full terms. Client search uses `searchRecords`. */
export function searchTerms(query: string, limit = 8): SearchHit[] {
  return searchRecords(SEARCH_INDEX, query, limit).map((hit) => ({
    term: TERM_MAP.get(hit.record.slug) as Term,
    score: hit.score,
    reason: hit.reason,
  }));
}

/**
 * Every term that links to the given tool path, so a tool page can show the
 * concepts behind it without maintaining a second list by hand.
 */
export function getTermsLinkingToTool(href: string, limit = 6): Term[] {
  return ALL_TERMS.filter((term) => term.tools?.some((tool) => tool.href === href)).slice(0, limit);
}
