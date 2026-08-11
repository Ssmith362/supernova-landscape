"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/motion/useReveal";

export type ProcessStep = {
  n: string;
  title: string;
  body: ReactNode;
};

/**
 * The four-step "how it works" timeline. A connecting line draws across (or
 * down, on narrow screens) the steps once the section is roughly a fifth
 * visible, with each step's number, heading and description activating as
 * the line would reach it.
 *
 * This is a single visibility trigger, not a per-pixel scroll-scrubbed
 * progress bar — the whole sequence plays once, timed in CSS (see the
 * `.process-*` rules in globals.css), the same one-shot pattern as every
 * other reveal on the site. Two line elements are rendered (one horizontal,
 * one vertical) and Tailwind's responsive `hidden`/`flex` classes pick the
 * right one per breakpoint — no JS layout branching.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const { ref, state } = useReveal<HTMLOListElement>({ threshold: 0.2 });

  return (
    <ol
      ref={ref}
      data-reveal={state}
      className="relative mt-12 flex flex-col gap-9 lg:flex-row lg:gap-0"
    >
      {/* Horizontal connector — wide desktop only, one continuous row. */}
      <div
        aria-hidden="true"
        className="process-line absolute top-6 right-0 left-0 hidden h-px bg-sage-300 lg:block"
      />

      {steps.map((step, i) => (
        <li
          key={step.n}
          className="process-step relative lg:flex-1 lg:px-6 lg:first:pl-0 lg:last:pr-0"
        >
          {/* Vertical connector — mobile/tablet, one segment per step except the last. */}
          {i < steps.length - 1 && (
            <div
              aria-hidden="true"
              className="process-line-vertical absolute top-12 left-[1.125rem] h-[calc(100%+2.25rem)] w-px bg-sage-300 lg:hidden"
            />
          )}
          <span className="process-step-number relative z-10 grid size-9 place-items-center rounded-full border-2 border-current bg-bone font-display text-[1rem] font-semibold lg:size-12 lg:text-[1.3rem]">
            {step.n}
          </span>
          <h3 className="mt-4 text-[1.15rem] leading-snug text-ink">
            {step.title}
          </h3>
          <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
