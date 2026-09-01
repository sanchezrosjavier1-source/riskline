/**
 * A reserved, height-stable placement for a future ad unit.
 *
 * Nothing is rendered today — the product ships ad-free — but the slot exists
 * so that adding a network later cannot cause layout shift or force the page
 * structure to be reworked. Set NEXT_PUBLIC_ADS_ENABLED to turn the reserved
 * frame on; the surrounding layout is identical either way.
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
