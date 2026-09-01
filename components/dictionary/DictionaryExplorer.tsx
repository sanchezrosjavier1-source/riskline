'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Sparkles, X } from 'lucide-react';
import { CATEGORIES, CATEGORY_MAP } from '@/data/categories';
import { searchRecords, type SearchRecord } from '@/lib/search';
import { useDebounced, useMounted, useRecentTerms } from '@/lib/hooks';
import type { CategoryId } from '@/types/dictionary';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface DictionaryExplorerProps {
  index: SearchRecord[];
  initialCategory?: CategoryId | null;
  initialQuery?: string;
}

export function DictionaryExplorer({
  index,
  initialCategory = null,
  initialQuery = '',
}: DictionaryExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryId | null>(initialCategory);
  const [letter, setLetter] = useState<string | null>(null);
  const debouncedQuery = useDebounced(query, 90);

  const mounted = useMounted();
  const { recent, clear } = useRecentTerms();

  const availableLetters = useMemo(
    () => new Set(index.map((record) => record.term[0].toUpperCase())),
    [index],
  );

  const counts = useMemo(() => {
    const map = {} as Record<CategoryId, number>;
    for (const item of CATEGORIES) map[item.id] = 0;
    for (const record of index) map[record.category] += 1;
    return map;
  }, [index]);

  // Search first (it is already ranked), then narrow. Browsing without a query
  // stays in alphabetical order, which is what a dictionary should do.
  const results = useMemo(() => {
    const searching = debouncedQuery.trim().length > 0;
    const base = searching
      ? searchRecords(index, debouncedQuery, index.length).map((hit) => hit.record)
      : index;

    return base.filter((record) => {
      if (category && record.category !== category) return false;
      if (letter && record.term[0].toUpperCase() !== letter) return false;
      return true;
    });
  }, [index, debouncedQuery, category, letter]);

  // A letter that no longer has matches would leave an unexplained empty list.
  useEffect(() => {
    if (!letter) return;
    if (!results.some((record) => record.term[0].toUpperCase() === letter)) setLetter(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, debouncedQuery]);

  const recentRecords = useMemo(
    () =>
      recent
        .map((slug) => index.find((record) => record.slug === slug))
        .filter((record): record is SearchRecord => Boolean(record)),
    [recent, index],
  );

  const filtered = Boolean(query.trim() || category || letter);

  const reset = () => {
    setQuery('');
    setCategory(null);
    setLetter(null);
  };

  return (
    <div>
      {/* ------------------------------------------------------------- search */}
      <div className="relative">
        <Search
          size={16}
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search trading terms…"
          aria-label="Search trading terms"
          autoComplete="off"
          spellCheck={false}
          className="h-12 w-full rounded-xl border border-line bg-base-raised/60 pl-11 pr-11 text-sm text-ink placeholder:text-ink-ghost transition-colors focus:border-accent/50 focus:bg-base-raised focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink-ghost transition-colors hover:bg-white/[0.05] hover:text-ink"
          >
            <X size={14} aria-hidden />
          </button>
        )}
      </div>

      {/* --------------------------------------------------------- categories */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        <FilterChip active={category === null} onClick={() => setCategory(null)}>
          All
          <span className="ml-1.5 text-ink-ghost">{index.length}</span>
        </FilterChip>
        {CATEGORIES.map((item) => (
          <FilterChip
            key={item.id}
            active={category === item.id}
            onClick={() => setCategory(category === item.id ? null : item.id)}
          >
            {item.label}
            <span className="ml-1.5 text-ink-ghost">{counts[item.id]}</span>
          </FilterChip>
        ))}
      </div>

      {/* ------------------------------------------------------------- a to z */}
      <nav aria-label="Jump to letter" className="mt-4 flex flex-wrap gap-0.5">
        {ALPHABET.map((char) => {
          const available = availableLetters.has(char);
          const active = letter === char;
          return (
            <button
              key={char}
              type="button"
              disabled={!available}
              aria-pressed={active}
              onClick={() => setLetter(active ? null : char)}
              className={`h-7 w-7 rounded-md font-mono text-xs transition-colors ${
                active
                  ? 'bg-accent text-[#06080c]'
                  : available
                    ? 'text-ink-faint hover:bg-white/[0.05] hover:text-ink'
                    : 'cursor-not-allowed text-ink-ghost/40'
              }`}
            >
              {char}
            </button>
          );
        })}
      </nav>

      {/* -------------------------------------------------------- status line */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <p className="text-xs text-ink-faint">
          <span className="display-num text-ink">{results.length}</span>{' '}
          {results.length === 1 ? 'term' : 'terms'}
          {category && <> in {CATEGORY_MAP[category].label}</>}
          {letter && <> starting with {letter}</>}
          {/* Uses the debounced query so the count and the phrase always agree. */}
          {debouncedQuery.trim() && (
            <>
              {' '}
              matching “<span className="text-ink-muted">{debouncedQuery.trim()}</span>”
            </>
          )}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs text-ink-ghost transition-colors hover:text-accent-soft"
          >
            <X size={12} aria-hidden />
            Clear filters
          </button>
        )}
      </div>

      {/* --------------------------------------------------- recently viewed */}
      {mounted && recentRecords.length > 0 && !filtered && (
        <section className="mt-6" aria-label="Recently viewed">
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <p className="label">Continue where you left off</p>
            <button
              type="button"
              onClick={clear}
              className="text-2xs text-ink-ghost transition-colors hover:text-ink-muted"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recentRecords.map((record) => (
              <Link
                key={record.slug}
                href={`/trading-dictionary/${record.slug}`}
                className="rounded-lg border border-line bg-base-raised/40 px-3 py-1.5 text-xs text-ink-muted transition-all duration-200 hover:border-accent/30 hover:bg-accent-wash hover:text-accent-soft"
              >
                {record.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ results */}
      {results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <p className="text-sm text-ink-muted">Nothing matches those filters</p>
          <p className="mx-auto mt-2 max-w-[40ch] text-xs leading-relaxed text-ink-ghost">
            Try a shorter phrase, or search for the idea rather than the abbreviation — “stop”
            instead of “SL”, “risk reward” instead of “R:R”.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex h-9 items-center rounded-xl border border-line-strong px-4 text-xs font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent-soft"
          >
            Show all terms
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((record) => (
            <li key={record.slug}>
              <Link
                href={`/trading-dictionary/${record.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-base-raised/40 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent-wash"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-sm font-medium text-ink transition-colors group-hover:text-accent-soft">
                      {record.term}
                    </span>
                    {record.interactive && (
                      <Sparkles size={11} className="shrink-0 text-accent" aria-label="Interactive" />
                    )}
                  </span>
                  <ArrowRight
                    size={13}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-ink-ghost opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-faint">{record.short}</p>
                <span className="mt-3 text-2xs text-ink-ghost">
                  {CATEGORY_MAP[record.category]?.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-xs transition-all duration-200 ${
        active
          ? 'border-accent/40 bg-accent-wash text-accent-soft'
          : 'border-line bg-base-raised/40 text-ink-muted hover:border-line-strong hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}
