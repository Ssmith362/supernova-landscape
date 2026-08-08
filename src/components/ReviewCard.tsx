import type { Review } from "@/content/types";
import { Stars } from "./Stars";

export function ReviewCard({
  review,
  tone = "light",
}: {
  review: Review;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <figure
      className={`flex h-full flex-col border p-6 sm:p-7 ${
        dark
          ? "border-white/15 bg-white/[0.04]"
          : "border-sage-200 bg-white shadow-card"
      }`}
    >
      {review.rating !== null && (
        <Stars rating={review.rating} size={17} className="mb-4" />
      )}
      <blockquote
        className={`flex-1 font-display text-[1.05rem] leading-relaxed ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        <p>&ldquo;{review.quote}&rdquo;</p>
      </blockquote>
      <figcaption
        className={`mt-6 border-t pt-4 text-[0.85rem] ${
          dark ? "border-white/15 text-sage-200" : "border-sage-100 text-ink-muted"
        }`}
      >
        <span
          className={`block font-bold ${dark ? "text-white" : "text-ink"}`}
        >
          {review.author}
        </span>
        <span className="mt-0.5 block">
          {review.city ? `${review.city} · ` : ""}
          {review.source === "Website testimonial"
            ? "Customer testimonial"
            : `via ${review.source}`}
        </span>
      </figcaption>
    </figure>
  );
}
