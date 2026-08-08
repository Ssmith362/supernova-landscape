import { reputation } from "@/config/site";
import { Stars } from "./Stars";

/**
 * The trust signal the old site never showed. Appears in the hero, the header
 * on desktop, the reviews section and the footer.
 */
export function RatingBadge({
  tone = "light",
  showLink = true,
  className = "",
}: {
  tone?: "light" | "dark";
  showLink?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}
    >
      <Stars rating={reputation.rating} size={17} />
      <span
        className={`text-sm font-semibold ${dark ? "text-white" : "text-ink"}`}
      >
        {reputation.rating.toFixed(1)}
      </span>
      <span
        className={`text-sm ${dark ? "text-sage-200" : "text-ink-muted"}`}
      >
        from {reputation.reviewCount} Google reviews
      </span>
      {showLink && (
        <a
          href={reputation.googleProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-semibold underline underline-offset-4 ${
            dark
              ? "text-gold-400 hover:text-gold-200"
              : "text-forest-700 hover:text-forest-500"
          }`}
        >
          Read them
          <span className="sr-only"> on Google (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
