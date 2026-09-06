/**
 * Search results truncate a description at roughly 160 characters, so a longer
 * one is not extra information — it is a sentence the reader never sees.
 */
export const MAX_DESCRIPTION = 158;

/** Titles are cut around 60 characters, including the brand suffix. */
export const MAX_TITLE = 60;

/** Characters the layout's title template appends: " · StopSize". */
export const BRAND_SUFFIX_LENGTH = 11;

/**
 * Picks the most descriptive title suffix that still leaves the finished
 * title, brand included, inside the display limit.
 */
export function buildTitle(name: string, suffixes: string[]): string {
  for (const suffix of suffixes) {
    if (name.length + suffix.length + BRAND_SUFFIX_LENGTH <= MAX_TITLE) {
      return `${name}${suffix}`;
    }
  }
  return name;
}

/**
 * The suffix ladders for dictionary term pages, longest first.
 *
 * These live here rather than in the page because the tests need the same
 * values. When the test kept its own copy, the page's pattern changed and
 * every assertion still passed against the old one.
 */
export function termTitleSuffixes(hasFormula: boolean): string[] {
  return hasFormula
    ? [' Meaning, Formula & Example', ' Meaning & Formula', ' Meaning']
    : [' Meaning & Example', ' Meaning'];
}

export function termDescriptionSuffixes(hasWidget: boolean): string[] {
  return hasWidget
    ? [
        'Explained in plain English, with a calculator you can try on the page.',
        'Plain English, plus a calculator on the page.',
        'With a calculator you can try here.',
      ]
    : [
        'Explained in plain English, with a worked example and the mistakes to avoid.',
        'Plain English, a worked example and the common mistakes.',
        'Plain English, with a worked example.',
      ];
}

/**
 * Builds a meta description from a required opening sentence plus the first
 * optional suffix that still fits. Suffixes should be ordered longest first.
 */
export function buildDescription(base: string, suffixes: string[] = []): string {
  const trimmed = base.trim().replace(/\s+/g, ' ');

  for (const suffix of suffixes) {
    const candidate = `${trimmed} ${suffix.trim()}`;
    if (candidate.length <= MAX_DESCRIPTION) return candidate;
  }

  if (trimmed.length <= MAX_DESCRIPTION) return trimmed;
  // Cut on a word boundary rather than mid-word.
  const cut = trimmed.slice(0, MAX_DESCRIPTION - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
