import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { getPopularTerms } from '@/lib/dictionary';
import { ALL_GUIDES } from '@/lib/guides';
import { DISCLAIMER, SITE } from '@/lib/site';
import { Logo } from './Logo';

const TOOL_LINKS = [
  { href: '/calculator', label: 'Risk Calculator' },
  { href: '/tools/position-size', label: 'Position Size Calculator' },
  { href: '/tools/risk-reward', label: 'Risk/Reward Calculator' },
  { href: '/tools', label: 'All tools' },
];

/** A spread across decades and categories, not just the most recent events. */
const FEATURED_HISTORY = [
  { slug: 'black-monday-1987', label: 'Black Monday (1987)' },
  { slug: 'global-financial-crisis-2008', label: 'The 2008 Financial Crisis' },
  { slug: 'flash-crash-2010', label: 'The 2010 Flash Crash' },
  { slug: 'swiss-franc-shock-2015', label: 'The Swiss Franc Shock' },
  { slug: 'gamestop-short-squeeze-2021', label: 'The GameStop Squeeze' },
  { slug: 'ftx-collapse-2022', label: 'The FTX Collapse' },
];

export function SiteFooter() {
  const popular = getPopularTerms(8);

  return (
    <footer className="mt-24 border-t border-line bg-base-sunken/40">
      <div className="mx-auto max-w-[86rem] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2.4fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={24} />
              <span className="text-sm font-semibold tracking-tight text-ink">{SITE.name}</span>
            </div>
            <p className="mt-3 max-w-[32ch] text-xs leading-relaxed text-ink-faint">
              {SITE.tagline} Learn the concept, calculate the number, and understand what it means
              before you place the trade.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FooterColumn title="Tools">
              {TOOL_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
              <FooterLink href="/markets">Markets</FooterLink>
              <FooterLink href="/news">Market News</FooterLink>
              <FooterLink href="/journal">Trading Journal</FooterLink>
              <FooterLink href="/learn">Test Yourself</FooterLink>
            </FooterColumn>

            <FooterColumn title="Guides">
              {ALL_GUIDES.map((guide) => (
                <FooterLink key={guide.slug} href={`/guides/${guide.slug}`}>
                  {guide.title}
                </FooterLink>
              ))}
              <FooterLink href="/guides">All guides</FooterLink>
            </FooterColumn>

            <FooterColumn title="Market History">
              {FEATURED_HISTORY.map((event) => (
                <FooterLink key={event.slug} href={`/market-history/${event.slug}`}>
                  {event.label}
                </FooterLink>
              ))}
              <FooterLink href="/market-history">All 24 events</FooterLink>
            </FooterColumn>

            <FooterColumn title="Browse by topic">
              {CATEGORIES.slice(0, 6).map((category) => (
                <FooterLink
                  key={category.id}
                  href={`/trading-dictionary?category=${category.id}`}
                >
                  {category.label}
                </FooterLink>
              ))}
              <FooterLink href="/trading-dictionary">All terms</FooterLink>
            </FooterColumn>

            <FooterColumn title="Popular terms">
              {popular.map((term) => (
                <FooterLink key={term.slug} href={`/trading-dictionary/${term.slug}`}>
                  {term.term}
                </FooterLink>
              ))}
              <FooterLink href="/faq">FAQ</FooterLink>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="max-w-[70ch] text-2xs leading-relaxed text-ink-ghost">
            <strong className="font-medium text-ink-faint">Educational use only.</strong>{' '}
            {DISCLAIMER} Calculations are provided as-is for learning purposes. Markets involve
            substantial risk, including the loss of your capital. Always verify numbers with your
            broker before placing a trade.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-2xs text-ink-ghost">
              © {new Date().getFullYear()} {SITE.name}
            </span>
            <Link
              href="/disclaimer"
              className="text-2xs text-ink-ghost transition-colors hover:text-ink-muted"
            >
              Disclaimer
            </Link>
            <Link
              href="/privacy"
              className="text-2xs text-ink-ghost transition-colors hover:text-ink-muted"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              className="text-2xs text-ink-ghost transition-colors hover:text-ink-muted"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-2xs text-ink-ghost transition-colors hover:text-ink-muted"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label mb-3">{title}</h2>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-xs text-ink-faint transition-colors hover:text-accent-soft"
      >
        {children}
      </Link>
    </li>
  );
}
