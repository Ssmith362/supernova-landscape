"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/motion/useReveal";

export type ProcessStep = {
  n: string;
  title: string;
  body: ReactNode;
};

/**
 * The four-step "how it works" timeline, as a vertical spine with the cards
 * alternating sides on desktop.
 *
 * The line appears to draw downward as the reader scrolls, but there is no
 * scroll listener and no scrubbed progress value anywhere in here. Each step
 * owns its own segment and its own reveal trigger, so the segment above a
 * card draws exactly as that card comes into view. The result reads as one
 * continuous line being drawn at reading pace, while costing nothing more
 * than the four one-shot observer registrations the rest of the site already
 * uses — and it degrades to a complete, fully-drawn timeline if the observer
 * never fires.
 *
 * On mobile the spine moves to the left edge and every card sits to its
 * right; the alternation is desktop-only, because alternating sides on a
 * narrow screen just produces two very thin columns.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative mt-14">
      {steps.map((step, i) => (
        <Step
          key={step.n}
          step={step}
          index={i}
          isLast={i === steps.length - 1}
        />
      ))}
    </ol>
  );
}

function Step({
  step,
  index,
  isLast,
}: {
  step: ProcessStep;
  index: number;
  isLast: boolean;
}) {
  const { ref, state } = useReveal<HTMLLIElement>({ threshold: 0.35 });
  const pending = state === "pending";
  const left = index % 2 === 0;

  return (
    <li
      ref={ref}
      data-reveal={state}
      className="relative pb-10 pl-16 last:pb-0 lg:pl-0"
    >
      {/* The spine segment beneath this step's node. */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute top-6 left-[1.375rem] w-px bg-sage-300 lg:left-1/2 lg:-translate-x-1/2"
          style={{
            height: "calc(100% - 1.5rem)",
            transformOrigin: "top center",
            transform: pending ? "scaleY(0)" : "scaleY(1)",
            transition: pending
              ? "none"
              : "transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      )}

      {/* The node. Pulses ember as it activates. */}
      <span
        className={`absolute top-0 left-0 z-10 grid size-11 place-items-center rounded-full border-2 bg-bone font-display text-[1rem] font-semibold transition-colors duration-500 lg:left-1/2 lg:-translate-x-1/2 ${
          pending
            ? "border-sage-300 text-sage-300"
            : "border-gold-500 text-forest-700"
        } ${pending ? "" : "handle-pulse"}`}
      >
        {step.n}
      </span>

      <div
        className="lg:grid lg:grid-cols-2 lg:gap-16"
        style={{
          opacity: pending ? 0 : 1,
          transform: pending ? "translateY(18px)" : "translateY(0)",
          transition: pending
            ? "none"
            : "opacity 620ms cubic-bezier(0.22,1,0.36,1) 140ms, transform 620ms cubic-bezier(0.22,1,0.36,1) 140ms",
        }}
      >
        <div
          className={
            left
              ? "lg:col-start-1 lg:pr-4 lg:text-right"
              : "lg:col-start-2 lg:pl-4"
          }
        >
          <h3 className="display-3 text-ink">{step.title}</h3>
          <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
            {step.body}
          </p>
        </div>
      </div>
    </li>
  );
}
