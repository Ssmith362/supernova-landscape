"use client";

import { useEffect, useRef, useState } from "react";
import { observeOnce } from "@/lib/motion/observer";

/**
 * A number that counts up the first time it scrolls into view.
 *
 * Follows the same fail-open contract as `useReveal`: the final value is what
 * server-renders and what the first client render shows. The counter only
 * ever winds *back* to its start in an effect, and only for an element
 * confirmed to be below the fold at mount. So if JS never runs, hydration
 * lags, or the observer never fires, the visitor sees the correct final
 * number — never a stuck "0".
 *
 * `tabular-nums` is not optional here: proportional digits change width as
 * they animate, which would reflow the surrounding text on every frame and
 * put real layout shift into the page for the sake of a decorative effect.
 */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  duration = 1100,
  className = "",
}: {
  value: number;
  /** Fixed decimal places. The 4.9 rating needs 1; whole counts need 0. */
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen at mount — animating now would mean visibly winding
    // a number the user is already reading back down to zero first.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) return;

    setDisplay(0);

    let raf = 0;
    let start = 0;

    const stopObserving = observeOnce(el, () => {
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min((now - start) / duration, 1);
        // Same curve as every other motion on the site, expressed as an
        // easing function rather than a bezier string.
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });

    // Safety net, mirroring useReveal's: if the observer never fires, the
    // number must still end up correct rather than sitting at zero.
    const fallback = window.setTimeout(() => setDisplay(value), 2500);

    return () => {
      stopObserving();
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
