"use client";

import { useEffect, useState } from "react";

/**
 * Live `prefers-reduced-motion` value, for the handful of effects that are
 * genuinely JS-driven rather than CSS-transition-based (the hero parallax
 * ticker, chiefly) and so can't rely on the global CSS override in
 * globals.css to neutralise them. Everything else on the site is a CSS
 * transition/animation and is already covered by that blanket rule.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
