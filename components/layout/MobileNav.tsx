'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/site';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Any navigation closes the sheet.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="rounded-xl border border-line p-2 text-ink-muted transition-colors hover:border-line-strong hover:text-ink lg:hidden"
      >
        <Menu size={16} aria-hidden />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 animate-fade-in bg-base/85 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            aria-label="Main"
            className="panel absolute right-3 top-3 w-[min(20rem,calc(100vw-1.5rem))] animate-scale-in p-2"
          >
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="label">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-1.5 text-ink-ghost transition-colors hover:bg-white/[0.05] hover:text-ink"
              >
                <X size={15} aria-hidden />
              </button>
            </div>

            <ul className="mt-1 space-y-0.5">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? 'bg-accent-wash text-accent-soft'
                          : 'text-ink-muted hover:bg-white/[0.04] hover:text-ink'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/calculator"
              className="mt-2 flex h-11 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
            >
              Calculate Your Risk
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
