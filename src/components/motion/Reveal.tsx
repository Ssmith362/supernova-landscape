"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/motion/useReveal";

const TAGS = {
  div: "div",
  li: "li",
  article: "article",
  header: "header",
  section: "section",
} as const;

type Tag = keyof typeof TAGS;

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. See `useReveal` for the visible/pending/revealed state machine that
 * guarantees content is never left invisible if JS fails or hydration lags.
 *
 * `delay` is a plain millisecond number rather than a Tailwind class because
 * Tailwind's build can't see arbitrary values assembled from a loop index at
 * runtime — callers computing a stagger delay (`i * 70`) must pass it here.
 */
export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  distance = 20,
  duration = 620,
  disabled = false,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /** Milliseconds. Use for hand-rolled stagger sequences. */
  delay?: number;
  /** Reveal travel distance in pixels. */
  distance?: number;
  duration?: number;
  /** Escape hatch — renders children with no animation wrapper behaviour. */
  disabled?: boolean;
}) {
  const { ref, state } = useReveal<HTMLElement>();
  const As = TAGS[as] as ElementType;

  if (disabled) {
    return <As className={className}>{children}</As>;
  }

  const pending = state === "pending";

  return (
    <As
      ref={ref}
      data-reveal={state}
      className={className}
      style={{
        opacity: pending ? 0 : 1,
        transform: pending ? `translateY(${distance}px)` : "translateY(0)",
        transition: pending
          ? "none"
          : `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </As>
  );
}
