'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { getStoredConsent, setStoredConsent } from '@/lib/consent';

/**
 * A minimal, functional cookie-consent banner. It does not load any script
 * itself — its only job is to record a yes/no choice that AdSense's script
 * (added separately, once approved) reads before requesting personalized
 * ads. Required for EEA/UK traffic under Google's EU user consent policy.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  const choose = (accepted: boolean) => {
    setStoredConsent(accepted ? 'accepted' : 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="consent-copy"
      className="fixed inset-x-0 bottom-0 z-50 animate-fade-up border-t border-line bg-base/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[86rem] flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 sm:flex-1">
          <Cookie size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <p id="consent-copy" className="text-xs leading-relaxed text-ink-muted">
            We use cookies for essential site function and, once ads are enabled, to show
            relevant advertising. See the{' '}
            <Link href="/privacy" className="link-underline">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
        </div>
        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            onClick={() => choose(false)}
            className="h-10 rounded-xl border border-line-strong px-4 text-xs font-medium text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="h-10 rounded-xl bg-accent px-4 text-xs font-semibold text-[#06080c] transition-colors hover:bg-accent-soft"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
