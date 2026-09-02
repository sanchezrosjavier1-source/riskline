/**
 * The mark: a stop level and an entry level, with the gap between them
 * measured by a small dimension bracket — literally what the product name
 * describes. The same idea the whole calculator is built on, in five strokes.
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

      {/* Stop level */}
      <line
        x1="6"
        y1="8.5"
        x2="15"
        y2="8.5"
        className="stroke-risk"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Entry level */}
      <line
        x1="6"
        y1="17.5"
        x2="15"
        y2="17.5"
        className="stroke-ink"
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {/* Dimension bracket measuring the gap between them — the "size" */}
      <line x1="19.5" y1="8.5" x2="19.5" y2="17.5" className="stroke-accent" strokeWidth="1.25" />
      <line x1="18" y1="8.5" x2="21" y2="8.5" className="stroke-accent" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="18" y1="17.5" x2="21" y2="17.5" className="stroke-accent" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
