/**
 * The brand's 4-point star, as a real element.
 *
 * Most star markers on the site are drawn by the `.eyebrow::before` rule in
 * globals.css — that covers all 51 eyebrows with no markup change and keeps
 * the glyph out of the accessibility tree. This component exists for the
 * cases where the star needs to be a positioned element in its own right:
 * list bullets, the divider ornament, and the footer's centred mark.
 *
 * Always decorative. It carries no meaning that isn't already in the text
 * beside it, so it is unconditionally `aria-hidden`.
 */
export function StarMark({
  size = 12,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  /** Used by the seasonal tabs to tint the bullet with the season accent. */
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}
