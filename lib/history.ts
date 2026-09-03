import { ALL_HISTORY_EVENTS } from '@/data/history';
import { TERM_MAP } from '@/lib/dictionary';
import type { HistoryCategory, HistoryEvent } from '@/types/history';
import type { Term } from '@/types/dictionary';

export { ALL_HISTORY_EVENTS };

const HISTORY_MAP: Map<string, HistoryEvent> = new Map(
  ALL_HISTORY_EVENTS.map((event) => [event.slug, event]),
);

export function getHistoryEvent(slug: string): HistoryEvent | undefined {
  return HISTORY_MAP.get(slug);
}

export function getAllHistorySlugs(): string[] {
  return ALL_HISTORY_EVENTS.map((event) => event.slug);
}

/** Resolves an event's related dictionary slugs to real terms, dropping any that don't exist. */
export function getHistoryRelatedTerms(event: HistoryEvent): Term[] {
  return event.relatedTerms
    .map((slug) => TERM_MAP.get(slug))
    .filter((term): term is Term => Boolean(term));
}

/** Previous/next in chronological order — the array is already sorted by year. */
export function getAdjacentHistoryEvents(slug: string): {
  previous: HistoryEvent | null;
  next: HistoryEvent | null;
} {
  const index = ALL_HISTORY_EVENTS.findIndex((event) => event.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? ALL_HISTORY_EVENTS[index - 1] : null,
    next: index < ALL_HISTORY_EVENTS.length - 1 ? ALL_HISTORY_EVENTS[index + 1] : null,
  };
}

/** Other events sharing the same category, falling back to chronological neighbors. */
export function getRelatedHistoryEvents(event: HistoryEvent, limit = 3): HistoryEvent[] {
  const sameCategory = ALL_HISTORY_EVENTS.filter(
    (e) => e.slug !== event.slug && e.category === event.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const seen = new Set([event.slug, ...sameCategory.map((e) => e.slug)]);
  const rest = ALL_HISTORY_EVENTS.filter((e) => !seen.has(e.slug));
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getHistoryCategories(): HistoryCategory[] {
  const seen = new Set<HistoryCategory>();
  for (const event of ALL_HISTORY_EVENTS) seen.add(event.category);
  return Array.from(seen);
}

export function getHistoryEventsByCategory(category: HistoryCategory): HistoryEvent[] {
  return ALL_HISTORY_EVENTS.filter((event) => event.category === category);
}
