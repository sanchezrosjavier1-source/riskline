/**
 * A reserved, height-stable placement for a future ad unit.
 *
 * Nothing is rendered today — the product ships ad-free — but the slot exists
 * so that adding a network later cannot cause layout shift or force the page
 * structure to be reworked. Set NEXT_PUBLIC_ADS_ENABLED to turn the reserved
 * frame on; the surrounding layout is identical either way.
 *
 * To go live once AdSense approves the site:
 *   1. In the AdSense dashboard, create an ad unit and copy the publisher ID
 *      (ca-pub-XXXXXXXXXXXXXXXX) and the ad unit's slot ID.
 *   2. Replace public/ads.txt with the real line AdSense gives you.
 *   3. Load the AdSense script (once, in app/layout.tsx) and swap the
 *      placeholder <aside> below for the real <ins class="adsbygoogle">
 *      snippet, gated on ConsentBanner's stored choice via lib/consent.ts.
 *   4. Set NEXT_PUBLIC_ADS_ENABLED=true in Vercel's environment variables.
 */
const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

interface AdSlotProps {
  /** Where this slot sits, so a network can be targeted per placement later. */
  id: string;
  /** Leaderboard reserves 90px, in-article 250px. */
  format?: 'leaderboard' | 'in-article';
  className?: string;
}

export function AdSlot({ id, format = 'in-article', className = '' }: AdSlotProps) {
  if (!ADS_ENABLED) return null;

  const height = format === 'leaderboard' ? 'min-h-[90px]' : 'min-h-[250px]';

  return (
    <aside
      aria-label="Advertisement"
      data-ad-slot={id}
      className={`flex items-center justify-center rounded-xl border border-dashed border-line bg-base-raised/30 ${height} ${className}`}
    >
      <span className="text-2xs uppercase tracking-label text-ink-ghost">Advertisement</span>
    </aside>
  );
}
