"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Service } from "@/content/types";

/**
 * "What we do", as a horizontal filmstrip.
 *
 * ScrollX-UI's Reel / Carousel pattern: nine tall poster cards on one track
 * you drag, scroll, arrow or tab through, with snap points. It replaces the
 * bento (which demoted four of the nine services to text rows) and the
 * expandable accordion that briefly stood in for it — that accordion now
 * lives on the seasons section, where four panels suit it far better than
 * nine did.
 *
 * WHY A REEL FOR THIS SECTION
 * Nine services in any grid is either a wall of small tiles or a very tall
 * block, and this homepage is already long. A reel gives every service
 * identical, generous treatment in roughly the vertical space of two grid
 * rows, and horizontal overflow is the one direction the page has to spare.
 *
 * BUILT ON NATIVE SCROLL, NOT A CAROUSEL LIBRARY
 * The track is a plain overflow-x container with CSS scroll snap. That means
 * trackpad swipes, shift-scroll, touch flings, and tabbing to an off-screen
 * card all work for free and correctly, because they are the browser's own
 * behaviours rather than reimplementations of them. The JavaScript here only
 * adds pointer-dragging and the arrow buttons; if it never runs, the reel is
 * still fully scrollable and every card is still a working link.
 *
 * THE DRAG / CLICK PROBLEM
 * Cards are links, so a drag that ends on a card would otherwise navigate.
 * `movedRef` tracks total pointer travel and a click is suppressed in the
 * capture phase past a small threshold, so a deliberate tap still navigates
 * but a flick never does.
 */

const DRAG_THRESHOLD = 6;

export function ServicesReel({ services }: { services: Service[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Pointer-drag bookkeeping. Refs, not state — these change on every
  // pointermove and must not cause a re-render.
  const downRef = useRef(false);
  const startXRef = useRef(0);
  const startLeftRef = useRef(0);
  const movedRef = useRef(0);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
  }, []);

  useEffect(() => {
    measure();
    const el = trackRef.current;
    if (!el) return;
    // Card width is a clamp() on viewport, so the scrollable range changes
    // with the container, not just with the window.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  /** One card plus its gap — read from the DOM so it survives restyling. */
  function step() {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return 320;
    const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    return card.offsetWidth + gap;
  }

  function nudge(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    el.scrollBy({
      left: dir * step(),
      behavior: reduced ? "auto" : "smooth",
    });
  }

  function onPointerDown(e: React.PointerEvent) {
    // Mouse only. Touch and trackpad already scroll this natively, and
    // hijacking them makes the track feel worse, not better.
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    downRef.current = true;
    movedRef.current = 0;
    startXRef.current = e.clientX;
    startLeftRef.current = el.scrollLeft;
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!downRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - startXRef.current;
    movedRef.current = Math.max(movedRef.current, Math.abs(dx));
    el.scrollLeft = startLeftRef.current - dx;
  }

  function endDrag() {
    if (!downRef.current) return;
    downRef.current = false;
    setDragging(false);
  }

  // Capture phase: a click that concludes a drag is swallowed before it can
  // reach the card's <Link>.
  function onClickCapture(e: React.MouseEvent) {
    if (movedRef.current > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = 0;
    }
  }

  return (
    <div className="mt-10">
      {/* Controls. Hidden from assistive tech: they are a convenience over a
          region that is already scrollable and fully tabbable, so announcing
          them would only add noise. */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <p className="text-[0.9rem] leading-relaxed text-ink-muted">
          Drag the strip, scroll it sideways, or use the arrows.
        </p>

        <div aria-hidden="true" className="hidden shrink-0 gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              tabIndex={-1}
              onClick={() => nudge(dir)}
              disabled={dir === -1 ? !canPrev : !canNext}
              className="flex size-12 items-center justify-center rounded-xs border border-forest-600/30 bg-white text-forest-700 transition-[background-color,border-color,color,opacity] duration-200 hover:border-forest-600 hover:bg-forest-600 hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              <svg width="16" height="12" viewBox="0 0 14 10" aria-hidden="true">
                <path
                  d={
                    dir === 1
                      ? "M8.6 1L12.5 5M12.5 5L8.6 9M12.5 5H1"
                      : "M5.4 1L1.5 5M1.5 5L5.4 9M1.5 5H13"
                  }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------- The track */}
      <div
        ref={trackRef}
        data-dragging={dragging}
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="reel-track mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-5"
      >
        {services.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            data-card
            draggable={false}
            className="group relative isolate aspect-3/4 w-[15rem] shrink-0 snap-start overflow-hidden rounded-xs bg-forest-950 sm:w-[17rem] lg:aspect-[3/4.3] lg:w-[19rem]"
          >
            <Image
              src={s.image.src}
              alt={s.image.alt}
              fill
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 34vw, 19rem"
              loading={i < 3 ? undefined : "lazy"}
              draggable={false}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/10"
            />

            <span
              aria-hidden="true"
              className="absolute left-4 top-4 z-[2] font-display text-[0.8rem] font-semibold text-forest-950"
              style={{
                background: "var(--color-gold-400)",
                borderRadius: "var(--radius-pill)",
                padding: "0.25rem 0.7rem",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-x-0 bottom-0 z-[2] p-5">
              <h3 className="font-display text-[1.15rem] font-semibold leading-snug text-white">
                {s.name}
              </h3>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-sage-100">
                {s.summary}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-gold-400">
                Learn more
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
                >
                  <path
                    d="M8.6 1L12.5 5M12.5 5L8.6 9M12.5 5H1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Scroll position. Decorative — the track's own scrollbar is the
          accessible affordance; this is the one that matches the brand. */}
      <div
        aria-hidden="true"
        className="mx-auto w-full max-w-6xl px-5 sm:px-8"
      >
        <div className="h-px w-full bg-ink/10">
          <div
            className="h-full origin-left bg-gold-500 transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
