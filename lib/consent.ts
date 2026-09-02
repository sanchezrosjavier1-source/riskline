'use client';

/**
 * Minimal cookie-consent state: 'accepted' | 'declined' | null (undecided).
 * Persisted in localStorage — unlike the session-only saved scenarios, a
 * consent choice should survive across visits so the banner does not
 * reappear on every session.
 */
export type ConsentState = 'accepted' | 'declined';

const STORAGE_KEY = 'riskline:consent';

export function getStoredConsent(): ConsentState | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(state: ConsentState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
    window.dispatchEvent(new CustomEvent('riskline:consent-change', { detail: state }));
  } catch {
    // Storage unavailable (private mode, blocked) — the banner will just
    // reappear next visit, which is the safe default.
  }
}
