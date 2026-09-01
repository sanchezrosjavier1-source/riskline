import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { getPopularTerms } from '@/lib/dictionary';

export default function NotFound() {
  const popular = getPopularTerms(6);

  return (
    <div className="mx-auto flex max-w-[52rem] flex-col items-start px-4 py-20 sm:px-6 lg:px-8">
      <span className="display-num text-xs text-ink-ghost">404</span>
      <h1 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
        That page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-muted">
        The link may be out of date, or the term may be filed under a different name. Try the
        dictionary search — it matches abbreviations and alternate names too.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <ButtonLink href="/trading-dictionary">
          Search the dictionary
          <ArrowRight size={15} aria-hidden />
        </ButtonLink>
        <ButtonLink href="/calculator" variant="secondary">
          Open the calculator
        </ButtonLink>
      </div>

      <div className="mt-12 w-full border-t border-line pt-6">
        <p className="label mb-3">Most looked up</p>
        <div className="flex flex-wrap gap-1.5">
          {popular.map((term) => (
            <Link
              key={term.slug}
              href={`/trading-dictionary/${term.slug}`}
              className="rounded-lg border border-line bg-base-raised/40 px-3 py-1.5 text-xs text-ink-muted transition-all duration-200 hover:border-accent/30 hover:bg-accent-wash hover:text-accent-soft"
            >
              {term.term}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
