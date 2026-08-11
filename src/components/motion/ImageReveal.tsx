"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/motion/useReveal";

const CLIP_HIDDEN = {
  up: "inset(0 0 100% 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
} as const;

/**
 * Directional clip-path mask reveal for imagery — the "restrained
 * directional mask" used on service cards, location cards and the gallery.
 *
 * Two layers, deliberately: this outer element owns the fixed frame (sizing,
 * `overflow-hidden`, the animated `clip-path`), and an inner layer owns a
 * small settle-in scale. Scaling the outer frame itself would grow the
 * card's footprint on screen; scaling only the inner layer keeps the frame
 * static and lets the image breathe within it.
 *
 * `children` is whatever fills the frame — typically a `next/image` with
 * `fill`, which already renders as `position:absolute; inset:0`, so it drops
 * straight into the inner layer without extra wrapping markup on the caller's
 * side.
 */
export function ImageReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: keyof typeof CLIP_HIDDEN;
  delay?: number;
}) {
  const { ref, state } = useReveal<HTMLDivElement>();
  const pending = state === "pending";

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        clipPath: pending ? CLIP_HIDDEN[direction] : "inset(0 0 0 0)",
        transition: pending
          ? "none"
          : `clip-path 680ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: pending ? "scale(1.08)" : "scale(1)",
          transition: pending
            ? "none"
            : `transform 780ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
