"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The hero's background photo: a one-time settle from a slight scale down to
 * rest, plus a very small desktop-only scroll parallax. Isolated into its
 * own small client component so the rest of the hero — headline, CTAs, proof
 * — stays server-rendered; only the pixel that actually needs scroll math is
 * client-side.
 *
 * The settle plays as a CSS *transition* (not a `@keyframes` animation)
 * specifically so it can hand the `transform` property back cleanly: a
 * running CSS animation continues to own a property for its full duration
 * (including through `fill-mode: both`), which would fight the parallax
 * ticker's direct style writes forever. A transition, once finished, releases
 * the property normally.
 */
export function HeroBackground({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    // One frame late, so the browser paints the initial scale(1.03) first
    // and the flip to scale(1) is an actual observable transition.
    const raf = requestAnimationFrame(() => setSettled(true));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => cancelAnimationFrame(raf);
    }

    const isDesktop = () => window.innerWidth >= 1024;
    let active = isDesktop();
    let ticking = false;

    function onScroll() {
      if (!active || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        const img = imgRef.current;
        if (wrap && img) {
          const rect = wrap.getBoundingClientRect();
          const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
          // Capped well under 3% of the image's own rendered height.
          img.style.transform = `translate3d(0, ${(progress * 2.4).toFixed(2)}%, 0)`;
        }
        ticking = false;
      });
    }

    function onResize() {
      active = isDesktop();
      if (!active && imgRef.current) imgRef.current.style.transform = "";
    }

    // Wait for the settle transition to fully release the transform property
    // before the parallax ticker starts writing to it directly.
    const settleTimer = setTimeout(() => {
      const img = imgRef.current;
      if (img) img.style.transition = "none";
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      onScroll();
    }, 1050);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        quality={65}
        sizes="100vw"
        className="object-cover object-center opacity-55 will-change-transform"
        style={{
          transform: settled ? "scale(1)" : "scale(1.03)",
          transition: "transform 1000ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}
