/**
 * The single source of truth for color. Tailwind reads these, and
 * `palette.test.ts` checks every text color against the page background so a
 * future tweak cannot quietly drop below WCAG AA.
 */

/** `DEFAULT` is the page background; Tailwind maps it to `bg-base`. */
export const BACKGROUND = {
  DEFAULT: '#07090c',
  raised: '#0b0e13',
  sunken: '#050609',
} as const;

/** Text colors, brightest to dimmest. Every one clears 4.5:1 on all surfaces. */
export const TEXT = {
  /** Primary body and headings. */
  DEFAULT: '#e9edf3',
  /** Secondary paragraphs. */
  muted: '#98a2b3',
  /** Hints, captions, supporting detail. */
  faint: '#7c8698',
  /** Tertiary labels and legal copy — the dimmest text we will render. */
  ghost: '#717c8d',
} as const;

export const ACCENT = {
  DEFAULT: '#7f8dff',
  soft: '#a3adff',
  deep: '#5a68e0',
  wash: 'rgba(127,141,255,0.10)',
} as const;

export const REWARD = {
  DEFAULT: '#43bf9c',
  soft: '#6ed3b6',
  wash: 'rgba(67,191,156,0.10)',
} as const;

export const RISK = {
  DEFAULT: '#e0705e',
  soft: '#ec9382',
  wash: 'rgba(224,112,94,0.10)',
} as const;

export const WARN = {
  DEFAULT: '#d9a441',
  wash: 'rgba(217,164,65,0.10)',
} as const;

/** Foreground used on top of a filled accent surface, e.g. primary buttons. */
export const ON_ACCENT = '#06080c';

function channelLuminance(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const n = Number.parseInt(hex.replace('#', ''), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (
    0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
  );
}

/** WCAG 2.1 contrast ratio between two opaque hex colors. */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}
