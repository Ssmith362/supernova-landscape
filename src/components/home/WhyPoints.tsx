"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Four things worth knowing" as a pinned narrative on desktop: the giant
 * numeral column sticks while the four cards scroll past it, crossfading
 * 01 → 04 as each becomes the one in view.
 *
 * THE COLUMN MUST OUT-SCROLL THE VIEWPORT
 * A first version of this had the cards at their natural height, which made
 * the whole grid 709px in a 900px viewport — every card on screen at once,
 * so the pin had nothing to pin against and the numeral never counted. A
 * sticky element only reads as "pinned" if the content beside it is taller
 * than the screen, so each card claims roughly half a viewport on desktop and
 * centres its own copy in that space. Four cards then run to about twice the
 * screen height, which is the travel the effect needs.
 *
 * The pin is offset to the vertical middle rather than a fixed distance from
 * the top, so the numeral sits level with whichever card is centred — the two
 * halves track each other instead of drifting apart.
 *
 * The pinning is `position: sticky` — no scroll handler, no measured offsets,
 * no pinning library. The only JavaScript is one IntersectionObserver
 * watching the four cards. It is built here rather than taken from the shared
 * `observeOnce` registry because that registry is one-shot by design, and
 * this needs to keep firing as the reader scrolls back up.
 *
 * Below `lg` none of this applies: no pin, no tall cards, just a stagger of
 * compact stacked cards. Pinned scroll on a phone fights the browser's own
 * scroll gestures, and half-viewport cards on a short screen are mostly
 * empty space.
 *
 * All four cards, numerals included, server-render fully visible. The active
 * index only changes which numeral is emphasised; it can never hide content.
 */
export function WhyPoints({
  points,
}: {
  points: { title: string; body: string }[];
}) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // A dedicated observer: this one must fire repeatedly as the reader
    // scrolls up and down, unlike the one-shot shared reveal registry.
    //
    // The observer is only a TRIGGER — the decision of which card is active
    // is made geometrically, by measuring which one's centre is nearest the
    // viewport's. An earlier version instead called setActive() for every
    // intersecting entry in the callback, which meant that whenever more
    // than one card crossed the trigger band between frames — a fast scroll,
    // a jump-to-anchor, a trackpad fling — the LAST entry in the batch won
    // rather than the one on screen. It showed up as the numeral jumping
    // 01 → 04 and never displaying 02 or 03.
    const pickNearest = () => {
      const middle = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs((rect.top + rect.bottom) / 2 - middle);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
    };

    const io = new IntersectionObserver(pickNearest, {
      // Several thresholds so the callback fires through a card's whole
      // pass, not only as its edge clips the band.
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: "-35% 0px -35% 0px",
    });

    for (const el of cardRefs.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, [points.length]);

  return (
    <div className="mt-14 lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
      {/* Pinned numeral column — desktop only. The offset centres the 14rem
          numeral block in the viewport so it sits level with the centred copy
          of whichever card is currently active. */}
      <div aria-hidden="true" className="hidden lg:block">
        <div className="sticky h-[14rem]" style={{ top: "calc(50vh - 8rem)" }}>
          <div className="relative h-full">
            {points.map((p, i) => (
              <span
                key={p.title}
                className={`numeral numeral-outline absolute inset-0 text-[11rem] leading-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i === active
                    ? "translate-y-0 text-gold-500 opacity-100"
                    : "translate-y-3 text-white/25 opacity-0"
                }`}
              >
                0{i + 1}
              </span>
            ))}
          </div>
          <div className="mt-4 h-px w-16 bg-gold-500/60" />
        </div>
      </div>

      <div className="space-y-4 lg:space-y-10">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`hairline-dark flex flex-col justify-center rounded-xs bg-white/[0.03] p-6 transition-colors duration-500 sm:p-8 lg:min-h-[48vh] lg:p-12 ${
                i === active ? "lg:bg-white/[0.06]" : ""
              }`}
            >
              {/* The inline numeral is the mobile counterpart of the pinned
                  column, and the printed fallback everywhere. */}
              <span
                className={`numeral text-[1.5rem] transition-colors duration-500 lg:hidden ${
                  i === active ? "text-gold-500" : "text-gold-500/70"
                }`}
              >
                0{i + 1}
              </span>
              <h3 className="display-3 mt-2 text-white lg:mt-0">{p.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-sage-200">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
