import type { CategoryId, Term } from '@/types/dictionary';

/**
 * The minimal shape search needs. Kept separate from `Term` so client
 * components can hold the whole index without pulling every explanation
 * paragraph into the JavaScript bundle.
 */
export interface SearchRecord {
  slug: string;
  term: string;
  short: string;
  category: CategoryId;
  aliases?: string[];
  popular?: boolean;
  /** Whether the term page carries a live mini-tool. */
  interactive?: boolean;
}

export interface RecordHit {
  record: SearchRecord;
  score: number;
  reason: 'term' | 'alias' | 'definition';
}

export function toSearchRecord(term: Term): SearchRecord {
  return {
    slug: term.slug,
    term: term.term,
    short: term.short,
    category: term.category,
    ...(term.aliases ? { aliases: term.aliases } : {}),
    ...(term.popular ? { popular: true } : {}),
    ...(term.widget ? { interactive: true } : {}),
  };
}

export function normalizeQuery(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s/-]/g, '')
    .trim();
}

/**
 * Ranked prefix-then-substring matching across name, aliases and definition.
 * Dependency-free and fast enough to run on every keystroke over the whole
 * corpus — a few hundred short strings.
 */
export function searchRecords(records: SearchRecord[], query: string, limit = 8): RecordHit[] {
  const normalized = normalizeQuery(query);
  if (normalized.length === 0) return [];

  const words = normalized.split(/\s+/).filter(Boolean);
  const hits: RecordHit[] = [];

  for (const record of records) {
    const name = normalizeQuery(record.term);
    const aliases = (record.aliases ?? []).map(normalizeQuery);
    const definition = normalizeQuery(record.short);

    let score = 0;
    let reason: RecordHit['reason'] = 'definition';

    if (name === normalized) {
      score = 1000;
      reason = 'term';
    } else if (name.startsWith(normalized)) {
      score = 800 - name.length;
      reason = 'term';
    } else if (aliases.some((alias) => alias === normalized)) {
      score = 700;
      reason = 'alias';
    } else if (name.includes(normalized)) {
      score = 600 - name.indexOf(normalized);
      reason = 'term';
    } else if (aliases.some((alias) => alias.startsWith(normalized))) {
      score = 500;
      reason = 'alias';
    } else if (aliases.some((alias) => alias.includes(normalized))) {
      score = 400;
      reason = 'alias';
    } else if (words.length > 0 && words.every((word) => name.includes(word))) {
      score = 350;
      reason = 'term';
    } else if (definition.includes(normalized)) {
      score = 200;
      reason = 'definition';
    } else if (words.length > 1 && words.every((word) => definition.includes(word))) {
      score = 120;
      reason = 'definition';
    }

    if (score > 0) {
      // Nudge widely searched concepts up when scores are otherwise close.
      if (record.popular) score += 25;
      hits.push({ record, score, reason });
    }
  }

  return hits
    .sort((a, b) => b.score - a.score || a.record.term.localeCompare(b.record.term))
    .slice(0, limit);
}
