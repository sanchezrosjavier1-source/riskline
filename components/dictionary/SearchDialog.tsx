'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CornerDownLeft, Search, Sparkles, X } from 'lucide-react';
import { searchRecords, type SearchRecord } from '@/lib/search';
import { CATEGORY_MAP } from '@/data/categories';

const QUICK_PICKS = ['position size', 'stop loss', 'risk reward', 'leverage', 'drawdown'];

/**
 * Command-palette style search over the dictionary. Opens with the header
 * button or Ctrl/Cmd-K, filters as you type, and navigates with the keyboard.
 */
export function SearchDialog({ index }: { index: SearchRecord[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => searchRecords(index, query, 8), [index, query]);

  const popular = useMemo(() => index.filter((record) => record.popular).slice(0, 6), [index]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  // Global shortcut.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close]);

  // Focus the field and lock background scrolling while open.
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  // Keep the highlighted row in view when navigating by keyboard.
  useEffect(() => {
    const node = listRef.current?.children[active] as HTMLElement | undefined;
    node?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (slug: string) => {
    close();
    router.push(`/trading-dictionary/${slug}`);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((prev) => (prev + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((prev) => (prev - 1 + results.length) % results.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(results[active].record.slug);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-xl border border-line bg-base-raised/50 px-3 py-2 text-ink-faint transition-all duration-200 hover:border-line-strong hover:text-ink-muted md:w-56 lg:w-64"
        aria-label="Search trading terms"
      >
        <Search size={14} className="shrink-0" aria-hidden />
        <span className="hidden text-xs md:inline">Search terms…</span>
        <kbd className="ml-auto hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.5625rem] text-ink-ghost md:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]">
          <div
            className="absolute inset-0 animate-fade-in bg-base/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search trading terms"
            className="panel relative z-10 w-full max-w-xl animate-scale-in overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="shrink-0 text-ink-faint" aria-hidden />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search trading terms…"
                aria-label="Search trading terms"
                aria-controls="search-results"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent py-4 text-sm text-ink placeholder:text-ink-ghost focus:outline-none"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="shrink-0 rounded-lg p-1.5 text-ink-ghost transition-colors hover:bg-white/[0.05] hover:text-ink"
              >
                <X size={14} aria-hidden />
              </button>
            </div>

            <div className="max-h-[min(26rem,55vh)] overflow-y-auto">
              {query.trim().length === 0 ? (
                <div className="p-4">
                  <p className="label mb-2.5">Start here</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PICKS.map((pick) => (
                      <button
                        key={pick}
                        type="button"
                        onClick={() => setQuery(pick)}
                        className="rounded-lg border border-line bg-base-sunken/50 px-2.5 py-1.5 text-xs text-ink-muted transition-all duration-200 hover:border-accent/30 hover:bg-accent-wash hover:text-accent-soft"
                      >
                        {pick}
                      </button>
                    ))}
                  </div>

                  <p className="label mb-2.5 mt-5">Most looked up</p>
                  <ul className="space-y-0.5">
                    {popular.map((record) => (
                      <li key={record.slug}>
                        <button
                          type="button"
                          onClick={() => go(record.slug)}
                          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/[0.04]"
                        >
                          <span className="text-xs font-medium text-ink">{record.term}</span>
                          <span className="truncate text-2xs text-ink-ghost">{record.short}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm text-ink-muted">
                    No terms match “<span className="text-ink">{query}</span>”
                  </p>
                  <p className="mx-auto mt-1.5 max-w-[34ch] text-xs leading-relaxed text-ink-ghost">
                    Try a shorter phrase, or search for the idea rather than the abbreviation — for
                    example “stop” instead of “SL”.
                  </p>
                </div>
              ) : (
                <ul id="search-results" ref={listRef} className="p-2">
                  {results.map((hit, index) => {
                    const record = hit.record;
                    const isActive = index === active;
                    return (
                      <li key={record.slug}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(index)}
                          onClick={() => go(record.slug)}
                          aria-current={isActive || undefined}
                          className={`flex w-full items-start gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors ${
                            isActive ? 'bg-accent-wash' : 'hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-medium ${
                                  isActive ? 'text-accent-soft' : 'text-ink'
                                }`}
                              >
                                {record.term}
                              </span>
                              {record.interactive && (
                                <Sparkles size={11} className="text-accent" aria-label="Interactive" />
                              )}
                            </div>
                            <p className="mt-0.5 truncate text-xs text-ink-faint">{record.short}</p>
                          </div>
                          <span className="mt-0.5 shrink-0 text-2xs text-ink-ghost">
                            {CATEGORY_MAP[record.category]?.label}
                          </span>
                          {isActive && (
                            <CornerDownLeft
                              size={12}
                              aria-hidden
                              className="mt-1 shrink-0 text-accent"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5">
              <span className="text-2xs text-ink-ghost">
                {query.trim().length > 0
                  ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
                  : `${index.length} terms`}
              </span>
              <span className="hidden items-center gap-2.5 text-2xs text-ink-ghost sm:flex">
                <span>↑↓ to move</span>
                <span>↵ to open</span>
                <span>esc to close</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
