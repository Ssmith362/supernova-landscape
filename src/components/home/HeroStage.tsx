"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { trackEvent } from "@/lib/analytics";

export type HeroSlide = {
  /** Service page this rail item navigates to. Validated in Hero.tsx. */
  slug: string;
  /** Short rail label. Deliberately not the full service name — "Landscape
   *  Design & Installation" does not fit a quarter of the viewport. */
  label: string;
  /** One line of scope, so the rail is informative and not just a switcher. */
  blurb: string;
  src: string;
  alt: string;
};

const DWELL = 7000;

/**
 * The hero's photographic stage and its service rail.
 *
 * WHY THIS IS SHAPED THE WAY IT IS
 * The live Webflow site rotates four *headlines* through the hero. That is
 * the part of a carousel that measurably costs conversions — NN/g's
 * eye-tracking puts interaction with the first slide near 1% and every slide
 * after it under 0.5%, and auto-advancing copy fails users mid-read. Four
 * rotating H1s also means four generic headlines competing for the same
 * query and four LCP candidates competing for the same paint.
 *
 * So only the PHOTOGRAPH changes here. The H1, the lede and both CTAs are
 * server-rendered by Hero.tsx and passed in as `children` — they are never
 * re-rendered by this component and never move. What rotates is imagery, and
 * the control for it is a labelled rail of real `<Link>`s to the four service
 * pages. That is the fix for banner blindness: an anonymous dot array reads
 * as decoration, a named row of services reads as navigation, because it is.
 *
 * PROGRESSIVE ENHANCEMENT
 * Slide 0 renders on the server with `priority`, so the LCP image is in the
 * initial HTML and is identical to what a static hero would ship. Slides 1–3
 * are mounted only after hydration, on idle — they cannot compete with the
 * LCP paint because they do not exist during it. If JavaScript never runs,
 * the hero is slide 0 plus four working service links, which is a perfectly
 * good hero.
 *
 * PAUSING
 * Hover, focus or click freezes the rotation, and the progress bar freezes
 * with it via `animation-play-state` (see globals.css). The timer resumes on
 * the same wall-clock remainder the bar does, so the two never drift apart.
 * Rotation is also suspended entirely while the hero is off screen, and never
 * starts at all under `prefers-reduced-motion`.
 */
export function HeroStage({
  slides,
  children,
}: {
  slides: HeroSlide[];
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  /** Bumped on every slide change so the progress bar remounts and its
   *  fill animation restarts. Pausing does NOT bump it — the bar must keep
   *  its element (and therefore its paused animation) across a pause. */
  const [cycle, setCycle] = useState(0);
  /** Slides 1–3 are withheld until after hydration. See above. */
  const [enhanced, setEnhanced] = useState(false);

  const startedAt = useRef(0);
  const remaining = useRef(DWELL);

  // Mount the remaining slides once the browser is idle and the LCP paint is
  // safely behind us.
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(() => setEnhanced(true));
      return;
    }
    const t = setTimeout(() => setEnhanced(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Only rotate while the hero is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The advance timer. `remaining` is only ever recomputed in `pause()`, so
  // this effect's cleanup can stay a plain clearTimeout and never has to
  // reason about whether it is unmounting because the slide changed or
  // because the user hovered.
  useEffect(() => {
    if (reduced || paused || !inView || !enhanced || slides.length < 2) return;
    startedAt.current = Date.now();
    const t = setTimeout(() => {
      remaining.current = DWELL;
      setActive((a) => (a + 1) % slides.length);
      setCycle((c) => c + 1);
    }, remaining.current);
    return () => clearTimeout(t);
  }, [active, cycle, paused, inView, reduced, enhanced, slides.length]);

  function pause() {
    setPaused((was) => {
      if (was) return was;
      remaining.current = Math.max(
        600,
        remaining.current - (Date.now() - startedAt.current),
      );
      return true;
    });
  }

  function resume() {
    setPaused(false);
  }

  function select(i: number) {
    if (i === active) {
      pause();
      return;
    }
    remaining.current = DWELL;
    setActive(i);
    setCycle((c) => c + 1);
    pause();
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[min(94svh,900px)] flex-col overflow-hidden bg-forest-950"
    >
      {/* -------------------------------------------------------- Slides */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {slides.map((s, i) => {
          // Slide 0 is server-rendered and always present; the rest wait.
          if (i > 0 && !enhanced) return null;
          return (
            <Image
              key={s.src}
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              quality={65}
              sizes="100vw"
              data-on={i === active}
              className="hero-slide ken-burns object-cover"
              style={{ objectPosition: "center 58%" }}
            />
          );
        })}
      </div>

      <div aria-hidden="true" className="hero-grade-x absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-grade-y absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="starfield -z-10 opacity-70 [mask-image:linear-gradient(180deg,#000_0%,transparent_58%)]"
      />

      {/* The copy column, server-rendered by Hero.tsx and never re-rendered
          by the rotation above it. */}
      <Container className="relative flex flex-1 items-end">
        <div className="w-full max-w-3xl pb-10 pt-32 sm:pb-14 sm:pt-36">
          {children}
        </div>
      </Container>

      {/* ---------------------------------------------------------- Rail */}
      <Container className="relative">
        <div
          // Column count follows the data rather than a hard-coded 4, so
          // adding or removing a rail service in Hero.tsx cannot leave an
          // orphan column here. The value is handed to CSS as a variable
          // because Tailwind cannot generate an arbitrary class from a
          // runtime value; the mobile/desktop switch and the odd-count
          // orphan fix both live in `.hero-rail` in globals.css.
          className="hero-rail grid border-t border-white/20"
          data-odd={slides.length % 2 === 1}
          style={{ "--rail-cols-lg": slides.length } as React.CSSProperties}
          onMouseLeave={resume}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) resume();
          }}
        >
          {slides.map((s, i) => {
            const isActive = i === active;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-hero-rail-active={isActive}
                data-hero-rail-paused={paused}
                style={{ "--hero-dwell": `${DWELL}ms` } as React.CSSProperties}
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
                onClick={() =>
                  trackEvent("hero_rail_click", { service: s.slug })
                }
                className="group relative flex flex-col gap-1 border-b border-white/10 py-4 pr-4 lg:border-b-0 lg:border-r lg:py-6 lg:pr-6 lg:last:border-r-0 [&:not(:first-child)]:pl-4 lg:[&:not(:first-child)]:pl-6"
              >
                {/* Progress bar. Keyed on `cycle` so a slide change remounts
                    it and restarts the fill; a pause does not. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -top-px h-0.5 overflow-hidden"
                >
                  <span
                    key={cycle}
                    className="hero-rail-prog block h-full w-full bg-gold-500"
                  />
                </span>

                <span
                  className={`font-display text-[1rem] font-semibold leading-tight tracking-[-0.01em] transition-colors duration-300 lg:text-[1.18rem] ${
                    isActive
                      ? "text-white"
                      : "text-white/60 group-hover:text-white group-focus-visible:text-white"
                  }`}
                >
                  {s.label}
                </span>

                <span
                  className={`hidden text-[0.82rem] leading-snug transition-colors duration-300 lg:block ${
                    isActive ? "text-sage-200" : "text-sage-200/50"
                  }`}
                >
                  {s.blurb}
                </span>

                <span
                  aria-hidden="true"
                  className={`mt-0.5 hidden items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-gold-400 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:inline-flex ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  }`}
                >
                  Learn more
                  <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
