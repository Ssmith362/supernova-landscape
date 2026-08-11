"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/motion/useReveal";

const OFFSET = {
  up: "translateY(14px) scale(1.04)",
  left: "translateX(-14px) scale(1.04)",
  right: "translateX(14px) scale(1.04)",
} as const;

/**
 * Image entrance — a small settle-in fade, slide and scale, played the first
 * time the frame scrolls into view.
 *
 * This used to be a `clip-path` mask (an animated crop that swept open), but
 * that combination — an animated `clip-path` on an `overflow-hidden` frame,
 * driven by state a scroll observer sets — turned out to be the wrong choice
 * for something this load-bearing: on the live site a batch of images got
 * stuck in their fully-clipped starting state and simply never appeared. This
 * component now uses the exact opacity/transform pattern `Reveal` uses, which
 * has been verified directly (DOM event testing, not just code review) to
 * settle correctly. If the reveal state machine ever fails to fire — an
 * unproven edge case worth guarding regardless — an image at worst renders
 * slightly faded and offset rather than invisible; a `clip-path` stuck at its
 * starting value renders nothing at all. See `useReveal`'s own timeout
 * safety-net for the same reasoning at the source.
 *
 * `children` is whatever fills the frame — typically a `next/image` with
 * `fill`, which already renders as `position:absolute; inset:0`.
 */
export function ImageReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: keyof typeof OFFSET;
  delay?: number;
}) {
  const { ref, state } = useReveal<HTMLDivElement>();
  const pending = state === "pending";

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          opacity: pending ? 0 : 1,
          transform: pending ? OFFSET[direction] : "translate(0, 0) scale(1)",
          transition: pending
            ? "none"
            : `opacity 620ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 680ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
