import { StarMark } from "./StarMark";

/**
 * The organic ridge that separates a light section from a night one.
 *
 * The page alternates registers (night hero → light services → night
 * before/after → …). Butting those colours together in a hard horizontal
 * line reads as "stacked blocks"; a rolling lawn-silhouette ridge makes the
 * change look intended. This is the only shape used for it, in both
 * directions, so the transitions all rhyme.
 *
 * Implementation notes that matter:
 *  - The path is filled with the colour of the section being entered, and
 *    the divider is rendered as the LAST child of the section being left.
 *    That way the ridge is always drawn over the outgoing background and
 *    needs no negative margins or overlap hacks.
 *  - `preserveAspectRatio="none"` plus a fixed CSS height means the SVG
 *    occupies exactly the same box at every viewport width, so it can never
 *    contribute layout shift.
 *  - `display: block` (not inline) — an inline SVG would sit on the text
 *    baseline and leave a hairline of background showing beneath it.
 */
export function CurveDivider({
  /** Any CSS colour — the fill of the section being entered. */
  fill,
  /** Mirrors the ridge so consecutive dividers aren't identical. */
  flip = false,
  /** Places the 4-point star ornament on the ridge line. */
  ornament = false,
  className = "",
}: {
  fill: string;
  flip?: boolean;
  ornament?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-16 lg:h-20"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
      >
        <path
          d="M0 120V63.5c118.6-33.9 236.4-9.7 353 8.6 130.9 20.6 259.4 27.1 386-11.4C877.7 20 1002 .6 1130 12.7c110.8 10.5 214 34.9 310 25.6V120H0Z"
          fill={fill}
        />
      </svg>

      {ornament && (
        <StarMark
          size={14}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gold-500 sm:bottom-4"
        />
      )}
    </div>
  );
}
