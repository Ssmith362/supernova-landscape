"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/content/types";
import { Stars } from "@/components/Stars";

/**
 * The reviews section: one large featured quote that crossfades on a timer,
 * with the full set drifting past in two marquee rows beneath it.
 *
 * CONTENT VISIBILITY, same rule as the seasonal tabs: every review is in the
 * DOM at all times. The featured quotes are stacked in a single grid cell and
 * crossfaded, never mounted/unmounted, so all six are in the served HTML and
 * the block's height is fixed to the tallest quote — no layout shift when it
 * advances. The marquee rows are `aria-hidden` because they are a duplicate
 * presentation of the same reviews; the featured stack carries the real text.
 *
 * Autoplay rules, all of which are the accessible defaults rather than
 * extras: it pauses on hover, pauses on keyboard focus anywhere inside, stops
 * permanently the moment the reader takes manual control, and never starts at
 * all under `prefers-reduced-motion`. Explicit previous/next buttons mean the
 * carousel is fully operable without waiting for or fighting the timer.
 */
const INTERVAL = 6500;

export function ReviewsShowcase({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userTook, setUserTook] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (userTook || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % reviews.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [userTook, paused, reviews.length]);

  function go(next: number) {
    setUserTook(true);
    setIndex((next + reviews.length) % reviews.length);
  }

  // Two rows, split so neither is a repeat of the other's order.
  const rowA = reviews;
  const rowB = [...reviews].reverse();

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ------------------------------------------------- Featured quote */}
      <div
        className="relative"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 45) go(dx < 0 ? index + 1 : index - 1);
          touchX.current = null;
        }}
      >
        {/* Oversized ghosted quotation mark. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 left-0 font-display text-[12rem] leading-none text-white/[0.06] sm:-top-16 sm:text-[16rem]"
        >
          &ldquo;
        </span>

        <div className="relative grid" aria-live="polite">
          {reviews.map((r, i) => {
            const shown = i === index;
            return (
              <figure
                key={r.author}
                inert={!shown}
                className={`col-start-1 row-start-1 px-1 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 ${
                  shown
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0"
                }`}
              >
                {r.rating !== null && (
                  <Stars
                    rating={r.rating}
                    size={20}
                    className="mb-6"
                    sequential={shown}
                  />
                )}
                <blockquote className="max-w-3xl font-display text-[1.35rem] leading-[1.5] text-white sm:text-[1.7rem]">
                  <p>&ldquo;{r.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-bold text-white">{r.author}</span>
                  {r.city && (
                    <span className="text-[0.9rem] text-sage-300">
                      {r.city}
                    </span>
                  )}
                  <span
                    className="glass px-3 py-1 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-sage-100"
                    style={{ borderRadius: "var(--radius-pill)" }}
                  >
                    {r.source === "Website testimonial"
                      ? "Customer testimonial"
                      : `via ${r.source}`}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-9 flex items-center gap-4 px-1 sm:px-8">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="hairline-dark grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <span className="sr-only">Previous review</span>
            <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
              <path
                d="M6.5 1L1 7l5.5 6M1 7h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="hairline-dark grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <span className="sr-only">Next review</span>
            <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
              <path
                d="M9.5 1L15 7l-5.5 6M15 7H1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="ml-1 flex gap-2" aria-hidden="true">
            {reviews.map((r, i) => (
              <span
                key={r.author}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-7 bg-gold-500" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- Marquees */}
      <div
        aria-hidden="true"
        className="marquee relative mt-16 space-y-3 overflow-hidden opacity-50 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {[rowA, rowB].map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`marquee-track gap-3 ${
              rowIndex === 0 ? "marquee-left" : "marquee-right"
            }`}
          >
            {/* Rendered twice — the animation translates exactly -50%, so the
                second copy is what makes the loop seamless. */}
            {[...row, ...row].map((r, i) => (
              <div
                key={`${r.author}-${i}`}
                className="hairline-dark w-[19rem] shrink-0 rounded-xs bg-white/[0.03] p-5"
              >
                <p className="line-clamp-3 font-display text-[0.95rem] leading-relaxed text-sage-100">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p className="mt-3 text-[0.8rem] font-bold text-white">
                  {r.author}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
