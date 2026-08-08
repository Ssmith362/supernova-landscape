"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { ImageRef } from "@/content/types";

/**
 * Before/after comparison driven by a native range input.
 *
 * Using a real <input type="range"> means the control is keyboard operable
 * (arrow keys), announced correctly by screen readers, and works without any
 * pointer-event or drag handling of our own. Both images stay in the DOM with
 * proper alt text so the content is available regardless of the slider.
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

  return (
    <figure className="group">
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
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-forest-900/85 text-white shadow-lift">
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

        <span className="pointer-events-none absolute left-3 top-3 bg-forest-950/80 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 bg-gold-500 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-forest-950">
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
          aria-valuetext={`Showing ${pos}% of the before photo`}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline-3 focus-visible:outline-gold-500 [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
        />
      </div>
      <figcaption className="mt-3 text-[0.9rem] text-ink-muted">
        {label}
      </figcaption>
    </figure>
  );
}
