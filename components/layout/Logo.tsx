/**
 * The mark: a price level with risk below and reward above — the same idea the
 * whole product is built on, reduced to three strokes.
 */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect x="0.5" y="0.5" width="25" height="25" rx="7.5" className="stroke-line-strong" />
      <rect x="0.5" y="0.5" width="25" height="25" rx="7.5" className="fill-accent/[0.07]" />
      <line x1="6" y1="8" x2="20" y2="8" className="stroke-reward" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="6" y1="13" x2="20" y2="13" className="stroke-ink" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="6" y1="18" x2="20" y2="18" className="stroke-risk" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
