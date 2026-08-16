"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { StarMark } from "@/components/ui/StarMark";

export type SeasonPanel = {
  season: string;
  window: string;
  items: string[];
  links: { slug: string; name: string }[];
  image: { src: string; alt: string };
};

/**
 * A Spokane year, as a photographic accordion.
 *
 * This is the expandable-ribbon treatment that used to be on "What we do",
 * moved here. It suits a calendar better than it suited a service list: four
 * panels rather than nine means each collapsed spine still gets real width,
 * and a year genuinely is a sequence, so a left-to-right ribbon is saying
 * something true about the content rather than just looking busy.
 *
 * WHAT CARRIED OVER FROM SeasonTabs, DELIBERATELY
 * The old tab version documented one property worth more than its styling:
 * every panel's copy is always in the DOM, so all four seasons' worth of
 * scope is crawlable and switching panels causes no layout shift. That holds
 * here — only opacity changes, nothing mounts or unmounts.
 *
 * The per-season accent is likewise unchanged, and still applied to exactly
 * three things (the window label, the bullets, the active hairline) so a
 * season reads as a tint on the brand rather than a theme of its own.
 *
 * ON `inert` AND THE DESKTOP-ONLY COLLAPSE
 * A collapsed panel is invisible but its service links are still in the DOM,
 * so without care a keyboard user tabs into links they cannot see. The old
 * tabs component solved this with `inert`, and so does this one — but only
 * when the collapse is actually happening. Below `lg` every panel is fully
 * expanded, so applying `inert` there would disable working links. `inert` is
 * a DOM attribute and cannot be media-queried in CSS, which is why the
 * breakpoint is read here with matchMedia rather than expressed as a class.
 *
 * Focusing a panel opens it, so the whole ribbon is operable from the
 * keyboard: tab to a season, it expands, tab again into its services.
 */
const ACCENT: Record<string, string> = {
  Spring: "#4f9d5d",
  Summer: "#e0a02a",
  Fall: "#b5652c",
  Winter: "#6b8494",
};

/** True from the `lg` breakpoint up, where the accordion actually collapses. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 64rem)");
    setIsDesktop(mql.matches);
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

export function SeasonRibbon({ seasons }: { seasons: SeasonPanel[] }) {
  const [active, setActive] = useState(0);
  const isDesktop = useIsDesktop();

  return (
    <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:h-[34rem] lg:gap-4">
      {seasons.map((s, i) => {
        const open = i === active;
        const accent = ACCENT[s.season] ?? "var(--color-gold-500)";
        // Only meaningful where panels actually collapse.
        const hidden = isDesktop && !open;

        return (
          <div
            key={s.season}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            style={{ flexGrow: open ? 3 : 1, flexBasis: 0 }}
            className="group relative isolate aspect-4/5 overflow-hidden rounded-xs bg-forest-950 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:aspect-3/2 lg:aspect-auto lg:h-full lg:min-w-[5rem]"
          >
            <Image
              src={s.image.src}
              alt={s.image.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 40vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/20"
            />

            {/* Season accent hairline, on the open panel only. */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "lg:scale-x-100" : "lg:scale-x-0"
              } scale-x-100`}
              style={{ background: accent }}
            />

            {/* Full-panel hit area. Sits UNDER the content (z-1 vs z-2) so the
                service links inside an open panel stay clickable. */}
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setActive(i)}
              className="absolute inset-0 z-[1] cursor-pointer"
            >
              <span className="sr-only">{`Show ${s.season} services`}</span>
            </button>

            {/* Collapsed spine — desktop only. */}
            <span
              aria-hidden="true"
              className={`absolute bottom-5 left-1/2 hidden -translate-x-1/2 rotate-180 whitespace-nowrap font-display text-[1.15rem] font-semibold text-white/85 [writing-mode:vertical-rl] transition-opacity duration-300 lg:block ${
                open ? "opacity-0" : "opacity-100"
              }`}
            >
              {s.season}
            </span>

            <div
              inert={hidden}
              className={`pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex flex-col p-5 lg:p-6 lg:transition-opacity lg:duration-500 ${
                open ? "lg:opacity-100" : "lg:opacity-0"
              }`}
            >
              <h3 className="font-display text-[1.35rem] font-semibold text-white lg:text-[1.7rem]">
                {s.season}
              </h3>
              <p
                className="mt-1 text-[0.78rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: accent }}
              >
                {s.window}
              </p>

              <ul className="mt-4 flex flex-col gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-sage-100"
                  >
                    <StarMark
                      size={10}
                      className="mt-1.5 shrink-0"
                      style={{ color: accent }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pointer-events-auto mt-5 flex flex-wrap gap-2">
                {s.links.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/services/${l.slug}`}
                    // `var(--radius-pill)` inline rather than a `rounded-pill`
                    // class, matching the two existing pill call sites — the
                    // codebase does not rely on Tailwind generating that
                    // utility from the theme token.
                    style={{ borderRadius: "var(--radius-pill)" }}
                    className="glass px-3 py-1.5 text-[0.78rem] font-bold text-white transition-colors duration-200 hover:bg-white/20"
                  >
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
