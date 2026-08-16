"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

/**
 * Measures the currently-active child of a container and reports where an
 * indicator should sit, so a single shared bar or pill can slide between
 * items instead of cross-fading in place.
 *
 * This is the hand-rolled replacement for Framer Motion's `layoutId`. It
 * exists because `layoutId` needs the full layout-animation engine, and
 * pulling that in cost 39 kB gzipped on EVERY route — the navbar is in the
 * root layout, so nothing about it was ever scoped to one page. Two sliding
 * indicators did not justify that, particularly against a mobile performance
 * budget. The measurement below is a `getBoundingClientRect` pair and a
 * `ResizeObserver`; the movement itself is a plain CSS transition.
 *
 * Mark the active child with `data-indicator-active="true"`. Pass a key that
 * changes whenever the active item changes, so the measurement re-runs.
 *
 * `ready` is false until the first measurement lands. Consumers should keep
 * the indicator invisible until then — otherwise it would flash at the
 * container's left edge on first paint before jumping into position.
 */
export type IndicatorRect = { left: number; width: number; ready: boolean };

export function useSlidingIndicator(
  containerRef: RefObject<HTMLElement | null>,
  activeKey: string | number | null,
): IndicatorRect {
  const [rect, setRect] = useState<IndicatorRect>({
    left: 0,
    width: 0,
    ready: false,
  });

  // Layout effect, not effect: this reads geometry and positions an element,
  // so it must run before the browser paints or the indicator visibly jumps.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function measure() {
      const c = containerRef.current;
      if (!c) return;
      const active = c.querySelector<HTMLElement>(
        '[data-indicator-active="true"]',
      );
      if (!active) {
        setRect((r) => ({ ...r, ready: false }));
        return;
      }
      const cr = c.getBoundingClientRect();
      const ar = active.getBoundingClientRect();
      setRect({ left: ar.left - cr.left, width: ar.width, ready: true });
    }

    measure();

    // Re-measure on container resize — covers viewport changes, font swap
    // (Fraunces and Archivo both load async and change label widths) and any
    // reflow that moves the items without changing which one is active.
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    for (const child of Array.from(container.children)) ro.observe(child);

    return () => ro.disconnect();
  }, [containerRef, activeKey]);

  return rect;
}
