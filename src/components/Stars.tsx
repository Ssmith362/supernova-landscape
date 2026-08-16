/**
 * Star display. Renders as an image with an accessible label rather than a
 * string of characters, so screen readers announce "4.9 out of 5 stars" once
 * instead of reading five glyphs.
 */
export function Stars({
  rating,
  size = 18,
  className = "",
  sequential = false,
}: {
  rating: number;
  size?: number;
  className?: string;
  /**
   * Fills the stars one at a time on arrival instead of showing them filled.
   * Used once, in the hero's rating chip. The animation's end state is this
   * component's normal output, so it degrades to the static row.
   */
  sequential?: boolean;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className={`relative inline-block leading-none ${className}`}
      style={{ width: size * 5 + 4 * 2, height: size }}
    >
      <span className="absolute inset-0 flex gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={size} className="text-sage-300" />
        ))}
      </span>
      <span
        className={`absolute inset-0 flex gap-0.5 overflow-hidden ${
          sequential ? "stars-fill" : ""
        }`}
        aria-hidden="true"
        style={{ width: `${pct}%` }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={size} className="shrink-0 text-gold-500" />
        ))}
      </span>
    </span>
  );
}

function Star({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M10 1.6l2.47 5.35 5.86.68-4.35 3.98 1.18 5.78L10 14.45l-5.16 2.94 1.18-5.78L1.67 7.63l5.86-.68L10 1.6z" />
    </svg>
  );
}
