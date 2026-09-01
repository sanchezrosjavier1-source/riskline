import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';

export interface Crumb {
  label: string;
  href: string;
}

/**
 * Visible breadcrumbs plus the matching BreadcrumbList structured data, so the
 * trail Google shows in results matches the one on the page.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-faint">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="text-ink-muted">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-accent-soft">
                    {item.label}
                  </Link>
                )}
                {!last && <ChevronRight size={12} className="text-ink-ghost" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
