"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { ImageRef } from "@/content/types";
import { useReveal } from "@/lib/motion/useReveal";

/**
 * Before/after comparison driven by a native range input.
 *
 * Using a real <input type="range"> means the control is keyboard operable
 * (arrow keys), announced correctly by screen readers, and works without any
 * pointer-event or drag handling of our own. Both images stay in the DOM with
 * proper alt text so the content is available regardless of the slider.
 *
 * The native input covers the full frame (so the whole image is draggable),
 * which means its own focus outline would draw a rectangle around the entire
 * photo — not the visual handle a sighted user is actually aiming for. That
 * default outline is suppressed and a ring drawn around the visual handle
 * instead, via `:has()` reading the input's focus state from a shared
 * ancestor — see the `group-has-[input:focus-visible]` classes below.
 */
export function BeforeAfter({
  before,
  after,
  label,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  before: ImageRef;
  after: ImageRef;
  label: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();
  const { ref, state } = useReveal<HTMLElement>();
  const settled = state !== "pending";

  // Subtle, not disappearing — a label never drops below 55% opacity, so it
  // stays readable even at the extremes of the slider.
  const beforeOpacity = Math.max(0.55, Math.min(1, pos / 18));
  const afterOpacity = Math.max(0.55, Math.min(1, (100 - pos) / 18));

  return (
    <figure ref={ref} className="group">
      <div
        className="relative overflow-hidden bg-sage-100 select-none"
        style={{ aspectRatio: "4 / 3" }}
      >
        {/* AFTER sits underneath and is fully visible at the right edge. */}
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />

        {/* BEFORE is clipped from the left by the slider position. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </div>

        {/* Divider line + handle. Purely decorative; the input is the control. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(11,23,16,0.25)]"
          style={{ left: `${pos}%` }}
        >
          <span
            className={`absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-forest-900/85 text-white shadow-lift transition-shadow duration-200 group-has-[input:focus-visible]:shadow-[0_0_0_3px_white,0_0_0_7px_#e0a02a] ${
              settled ? "handle-pulse" : ""
            }`}
          >
            <svg width="20" height="14" viewBox="0 0 20 14">
              <path
                d="M7 2L2.5 7 7 12M13 2l4.5 5-4.5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <span
          className="pointer-events-none absolute left-3 top-3 bg-forest-950/80 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white transition-[opacity,transform] duration-500"
          style={{
            opacity: state === "pending" ? 0 : beforeOpacity,
            transform: state === "pending" ? "translateY(-6px)" : "translateY(0)",
          }}
        >
          Before
        </span>
        <span
          className="pointer-events-none absolute right-3 top-3 bg-gold-500 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-forest-950 transition-[opacity,transform] duration-500"
          style={{
            opacity: state === "pending" ? 0 : afterOpacity,
            transform: state === "pending" ? "translateY(-6px)" : "translateY(0)",
            transitionDelay: "60ms",
          }}
        >
          After
        </span>

        <label htmlFor={id} className="sr-only">
          {label} — drag to compare before and after
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pos}
          aria-valuetext={`Showing ${pos}% of the before photo`}
          className="ba-range absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent outline-none [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
        />
      </div>
      <figcaption className="mt-3 text-[0.9rem] text-ink-muted">
        {label}
      </figcaption>
    </figure>
  );
}
