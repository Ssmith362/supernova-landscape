"use client";

import { useEffect, useId, useState } from "react";
import type { Faq } from "@/content/types";
import { withPhoneLinks } from "./PhoneText";

/**
 * Accordion built from real buttons with `aria-expanded`/`aria-controls`,
 * animating open/closed via the CSS grid-template-rows technique (see
 * `.faq-panel` in globals.css) rather than the native <details> element,
 * which has no built-in height transition.
 *
 * No-JS / pre-hydration safety: every panel renders OPEN by default (both on
 * the server and on the very first client render, so there is no hydration
 * mismatch) and only snaps closed in an effect immediately after mount. That
 * means if JavaScript never loads, every answer is simply visible — content
 * fails open, never fails invisible.
 *
 * That initial open-to-closed snap is deliberately instant, not animated —
 * `skipMountTransition` disables the grid-rows transition for exactly the one
 * render where mounting collapses everything, so the page never visibly
 * flashes "all open, then collapsing" on load. It's released one frame later,
 * so any answer the user actually clicks open still animates normally.
 *
 * A collapsed panel is also marked `inert` so a phone number inside a closed
 * answer can't be tabbed to while hidden.
 */
export function FaqList({
  faqs,
  tone = "light",
}: {
  faqs: Faq[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const uid = useId();
  const [mounted, setMounted] = useState(false);
  const [skipMountTransition, setSkipMountTransition] = useState(true);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
    const raf = requestAnimationFrame(() => setSkipMountTransition(false));
    return () => cancelAnimationFrame(raf);
  }, []);

  function toggle(i: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div
      className={`divide-y border-y ${
        dark ? "divide-white/12 border-white/12" : "divide-sage-200 border-sage-200"
      } ${skipMountTransition ? "faq-no-transition" : ""}`}
    >
      {faqs.map((faq, i) => {
        // Before mount, every panel reads as open — matching the server
        // render exactly, so hydration can't mismatch or flash.
        const open = mounted ? openSet.has(i) : true;
        const triggerId = `${uid}-trigger-${i}`;
        const panelId = `${uid}-panel-${i}`;

        return (
          <div key={faq.q}>
            <button
              type="button"
              id={triggerId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              className={`flex w-full cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-display text-[1.08rem] font-semibold leading-snug ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {faq.q}
              <span
                className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-transform duration-200 ${
                  open ? "rotate-45" : ""
                } ${dark ? "border-white/25 text-gold-400" : "border-sage-300 text-forest-600"}`}
                aria-hidden="true"
              >
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path
                    d="M6 1v10M1 6h10"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!open}
              data-open={open}
              className="faq-panel"
            >
              <div>
                <p
                  className={`max-w-[62ch] pb-6 pr-10 text-[0.98rem] leading-relaxed ${
                    dark ? "text-sage-200" : "text-ink-soft"
                  }`}
                >
                  {withPhoneLinks(faq.a)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
