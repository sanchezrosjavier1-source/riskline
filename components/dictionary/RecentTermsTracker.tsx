'use client';

import { useEffect } from 'react';
import { useRecentTerms } from '@/lib/hooks';

/**
 * Records a visit so the dictionary can offer "continue where you left off".
 * Renders nothing; the list lives in session storage only.
 */
export function RecentTermsTracker({ slug }: { slug: string }) {
  const { record } = useRecentTerms();

  useEffect(() => {
    record(slug);
  }, [slug, record]);

  return null;
}
