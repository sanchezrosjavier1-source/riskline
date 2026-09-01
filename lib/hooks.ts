'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Tracks the user's motion preference and reacts to live changes. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

const EASE_OUT = (t: number) => 1 - (1 - t) ** 3;

/**
 * Eases a displayed number toward its target so a changed result reads as a
 * transition rather than a swap. Returns the target immediately when the user
 * prefers reduced motion, or when the change is trivially small.
 */
export function useAnimatedNumber(target: number, duration = 420): number {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(target)) {
      setDisplay(0);
      fromRef.current = 0;
      return;
    }

    const from = Number.isFinite(fromRef.current) ? fromRef.current : target;

    if (reduced || from === target) {
      fromRef.current = target;
      setDisplay(target);
      return;
    }

    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const value = from + (target - from) * EASE_OUT(progress);
      setDisplay(value);
      fromRef.current = value;

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        fromRef.current = target;
        setDisplay(target);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, reduced]);

  return display;
}

/** Fires `true` briefly whenever the watched value changes, for flash feedback. */
export function useChangePulse(value: unknown, ms = 500): boolean {
  const [pulsing, setPulsing] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPulsing(true);
    const timer = window.setTimeout(() => setPulsing(false), ms);
    return () => window.clearTimeout(timer);
  }, [value, ms]);

  return pulsing;
}

/**
 * State persisted for the current browser session only. Deliberately not
 * localStorage: saved scenarios and recent terms are conveniences, not data
 * the product asks anyone to trust long term.
 */
export function useSessionState<T>(key: string, initial: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initial);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // Private mode, blocked storage, or corrupt JSON — the default stands.
    }
    loaded.current = true;
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        try {
          window.sessionStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Storage unavailable — keep working in memory.
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, update];
}

/** Debounces a rapidly changing value, used to keep search feeling instant but cheap. */
export function useDebounced<T>(value: T, ms = 120): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), ms);
    return () => window.clearTimeout(timer);
  }, [value, ms]);
  return debounced;
}

/** Closes a popover or menu on outside click and on Escape. */
export function useDismissable(open: boolean, onDismiss: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onDismiss();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onDismiss]);

  return ref;
}

const RECENT_KEY = 'riskline:recent-terms';
const RECENT_LIMIT = 8;

/** Remembers which term pages have been visited this session. */
export function useRecentTerms(): {
  recent: string[];
  record: (slug: string) => void;
  clear: () => void;
} {
  const [recent, setRecent] = useSessionState<string[]>(RECENT_KEY, []);

  const record = useCallback(
    (slug: string) => {
      setRecent((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, RECENT_LIMIT));
    },
    [setRecent],
  );

  const clear = useCallback(() => setRecent([]), [setRecent]);

  return { recent, record, clear };
}

/** True once the component has mounted, for anything that must not render on the server. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
