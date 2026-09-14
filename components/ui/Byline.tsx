import Link from 'next/link';
import { SITE } from '@/lib/site';

/** "Written by …", linking to the page that says who that is. */
export function Byline() {
  return (
    <p className="mt-4 text-xs text-ink-ghost">
      Written by{' '}
      <Link href="/about" className="text-ink-faint transition-colors hover:text-accent-soft">
        {SITE.author.name}
      </Link>
    </p>
  );
}
