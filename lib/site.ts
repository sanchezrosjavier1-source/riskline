/**
 * Single source of truth for site-wide identity, used by metadata,
 * structured data, the sitemap and the header.
 */
export const SITE = {
  name: 'Riskline',
  tagline: 'Know the trade. Know the risk.',
  /** Kept under 158 characters so search results never truncate it. */
  description:
    'Learn trading concepts, understand the numbers, and calculate your risk before you trade. A free risk calculator and interactive trading dictionary.',
  /** Override at deploy time with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://riskline.app',
  /** Public contact address, shown on /contact and /privacy. Change freely — used in one place. */
  contactEmail: 'triobucks09@gmail.com',
  locale: 'en_US',
} as const;

export const NAV_LINKS = [
  { href: '/calculator', label: 'Risk Calculator' },
  { href: '/tools', label: 'Tools' },
  { href: '/trading-dictionary', label: 'Dictionary' },
  { href: '/guides', label: 'Guides' },
  { href: '/learn', label: 'Test Yourself' },
] as const;

export const DISCLAIMER =
  'This website provides educational information only. It is not financial, investment, or trading advice.';

export function absoluteUrl(path: string): string {
  if (!path.startsWith('/')) return `${SITE.url}/${path}`;
  return `${SITE.url}${path}`;
}
