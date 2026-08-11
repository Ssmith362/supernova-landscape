"use client";

import { useEffect, useRef, useState } from "react";
import { observeOnce } from "./observer";

export type RevealState = "visible" | "pending" | "revealed";

/**
 * The one hook every scroll-triggered animation on the site is built on.
 *
 * The three states exist to solve a specific problem: a scroll-reveal must
 * never be able to leave content invisible if JavaScript fails, is slow to
 * hydrate, or the user scrolls faster than the observer can react.
 *
 *   "visible"  — the default, and what both the server-rendered HTML and the
 *                first client render use. Nothing is hidden. If JS never
 *                runs, this is the permanent state and the element is fully
 *                shown with no animation — a plain, correct page.
 *   "pending"  — set (synchronously, no transition) only once, in an effect,
 *                and only for elements confirmed to be below the fold at
 *                mount time. This is the sole moment content becomes
 *                invisible, and it only happens for content the user is not
 *                currently looking at.
 *   "revealed" — set when the element scrolls into view. CSS transitions
 *                from the "pending" styles to the "revealed" styles, which
 *                are visually identical to "visible" — so the resting state
 *                is the same regardless of which path got there.
 *
 * Consumers map these three states to class names / inline styles; "visible"
 * and "revealed" should always render the same final look, "pending" is the
 * only one that differs.
 *
 * Registration is skipped entirely under `prefers-reduced-motion: reduce` —
 * the element jumps straight to "revealed" with no pending phase, so nothing
 * is ever waiting on an observer for those users.
 */
export function useReveal<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<RevealState>("visible");
  const threshold = options?.threshold;
  const rootMargin = options?.rootMargin;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("revealed");
      return;
    }

    // Already on screen at mount (above the fold, or the user scrolled
    // before hydration finished) — show it as-is, no pending phase, no flash.
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (alreadyVisible) {
      setState("revealed");
      return;
    }

    setState("pending");
    return observeOnce(
      el,
      () => setState("revealed"),
      threshold !== undefined || rootMargin !== undefined
        ? { threshold: threshold ?? 0.15, rootMargin: rootMargin ?? "0px 0px -10% 0px" }
        : undefined,
    );
  }, [threshold, rootMargin]);

  return { ref, state };
}
