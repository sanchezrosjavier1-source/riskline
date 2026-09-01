import Link from 'next/link';
import { SearchDialog } from '@/components/dictionary/SearchDialog';
import { MobileNav } from './MobileNav';
import { SEARCH_INDEX } from '@/lib/dictionary';
import { NAV_LINKS, SITE } from '@/lib/site';
import { Logo } from './Logo';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[86rem] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${SITE.name} home`}
        >
          <Logo />
          <span className="hidden text-[0.9375rem] font-semibold tracking-tight text-ink sm:block">
            {SITE.name}
          </span>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-[0.8125rem] text-ink-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchDialog index={SEARCH_INDEX} />
          <Link
            href="/calculator"
            className="hidden h-9 items-center rounded-xl bg-accent px-4 text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft sm:inline-flex"
          >
            Calculate Risk
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
