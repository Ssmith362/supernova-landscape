"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/content/types";
import { ReviewCard } from "@/components/ReviewCard";

const FAN_DEGREES = 3;
const MAX_FAN = 15;

/**
 * A pinned, scroll-driven stack of review cards on wide desktop screens —
 * a fanned hand of cards where scrolling peels the front one away and
 * promotes the next.
 *
 * The plain grid below is the ONLY thing that ever server-renders or shows
 * on first paint. The deck is opt-in, added in an effect, and only once two
 * things are confirmed via matchMedia: the viewport is wide enough
 * (`min-width: 1024px`) and the user has not asked for reduced motion. If
 * JavaScript never runs, or runs but either check fails, the grid is what
 * stays — every review fully visible, side by side, forever. This is the
 * same fail-safe shape as the FAQ accordion elsewhere in this codebase:
 * start with the safe, always-correct rendering, upgrade only once capability
 * is proven.
 *
 * That matters here specifically because the previous attempt at an image
 * reveal on this site used an *always-hidden-until-proven-otherwise*
 * default (clip-path) and a batch of images got stuck invisible on the live
 * site when the reveal never fired. This component is built the other way
 * around on purpose: the default is the fully correct, fully visible state,
 * and the fancy version only replaces it once it's confirmed safe to.
 *
 * The rotation itself is driven by direct style writes in a rAF-batched
 * scroll handler (not React state per frame), reading fresh geometry each
 * time via getBoundingClientRect — so it doesn't depend on
 * IntersectionObserver, and there is nothing to get "stuck": if the scroll
 * handler never ran at all, the cards simply sit at their static resting
 * fan angles, which are themselves a complete, correctly fanned deck.
 */
export function ReviewDeck({ reviews }: { reviews: Review[] }) {
  const [deckEnabled, setDeckEnabled] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const widthOk = window.matchMedia("(min-width: 1024px)").matches;
    const motionOk = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    ).matches;
    setDeckEnabled(widthOk && motionOk);
  }, []);

  useEffect(() => {
    if (!deckEnabled) return;
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;

    function apply() {
      const rect = track!.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
      const activeFloat = progress * (reviews.length - 1);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const offset = i - activeFloat;
        if (offset <= 0) {
          // Already the front card, or already passed — peels away as
          // scroll continues, capped so it fully clears in one card's worth
          // of scroll distance rather than continuing to travel forever.
          const peel = Math.min(-offset, 1);
          card.style.transform = `rotate(${-peel * 14}deg) translateY(${-peel * 46}px)`;
          card.style.opacity = String(1 - peel * 0.85);
          card.style.zIndex = String(reviews.length + 10 - i);
        } else {
          const angle = Math.min(offset * FAN_DEGREES, MAX_FAN);
          card.style.transform = `rotate(${angle}deg) translateY(0)`;
          card.style.opacity = "1";
          card.style.zIndex = String(reviews.length - i);
        }
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        apply();
        ticking = false;
      });
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
    };
  }, [deckEnabled, reviews.length]);

  if (!deckEnabled) {
    return (
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.author}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      ref={trackRef}
      className="relative mt-12"
      style={{ height: `${(reviews.length - 1) * 48 + 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div
          className="relative grid w-full max-w-md sm:max-w-lg"
          aria-hidden="true"
        >
          {reviews.map((r, i) => (
            <div
              key={r.author}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="col-start-1 row-start-1 min-h-[19rem]"
              style={{
                transformOrigin: "center",
                transform: `rotate(${Math.min(i * FAN_DEGREES, MAX_FAN)}deg)`,
                zIndex: reviews.length - i,
              }}
            >
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      </div>
      {/* The real, accessible content — one instance per review, in normal
          document order, for screen readers and for anyone whose browser
          doesn't run the visual effect above. */}
      <ul className="sr-only">
        {reviews.map((r) => (
          <li key={r.author}>
            {r.author}: &ldquo;{r.quote}&rdquo;
            {r.rating ? ` — rated ${r.rating} out of 5` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
