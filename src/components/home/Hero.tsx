import { Fragment } from "react";

import { PhoneLink } from "@/components/PhoneLink";
import { QuoteCta } from "@/components/QuoteCta";
import { Stars } from "@/components/Stars";
import { StarMark } from "@/components/ui/StarMark";
import { HeroStage, type HeroSlide } from "@/components/home/HeroStage";
import { business, reputation } from "@/config/site";
import { services } from "@/content/services";

/**
 * The homepage hero: a cinematic full-bleed stage with the headline sitting
 * INSIDE the photograph, and a rail of four featured services along its foot
 * that swaps the photograph behind the copy.
 *
 * WHAT CHANGED AND WHY
 * The previous version was a night-sky text block stacked on top of a
 * height-capped band of the lawn panorama, joined by a gradient. That
 * gradient was doing the job a composition should do: nothing in the copy
 * reached into the image and nothing in the image reached into the copy, so
 * the two read as separate rectangles that happened to touch. The panorama's
 * 2.4:1 crop had driven the layout, rather than the layout choosing a crop.
 *
 * The fix was upstream of the CSS. `striped-lawn-barn.jpg` is the same scene
 * at 2000x1500, which is a usable hero ratio, so the hero now uses that and
 * the composition is free to be full-bleed. The scrim (`.hero-grade-x` /
 * `.hero-grade-y` in globals.css) is directional — heavy under the type at
 * the left, clearing across the right third so the barn and the finished
 * installs stay readable as photographs rather than as texture.
 *
 * ON THE SPLIT WITH HeroStage
 * Everything in this file is server-rendered and stays that way: the H1 is
 * the LCP element and must paint before any JavaScript arrives, and its word
 * stagger is a CSS transition out of `@starting-style` on a fixed delay — no
 * observer, no client component, correct even if React never hydrates.
 * HeroStage is the only client boundary, and this copy passes through it as
 * `children`, so rotating the photograph never re-renders a word of it.
 *
 * The proof line here is deliberately just the rating. The four claims that
 * used to sit under the CTAs ("free estimates", "weekly not bi-weekly",
 * year-round) are exactly StatStrip's four tiles, which follow immediately
 * below in the same night register — repeating them twice inside one screen
 * was the old hero's other problem.
 */

const HEADLINE = "Landscaping, lawn care and snow removal, done properly.";
const AREAS = ["Spokane", "Spokane Valley", "Liberty Lake"];

const words = HEADLINE.split(" ");
const lastWord = words[words.length - 1];
const leadWords = words.slice(0, -1);

/**
 * The five services on the rail, and the photograph each one puts behind the
 * headline.
 *
 * These are hero images, not the service pages' own `image` fields, because a
 * full-bleed hero needs landscape-orientation source and several service
 * photos are portrait (irrigation and dethatching are both 748x1000).
 *
 * ON THE IRRIGATION SLIDE — this is the one honest compromise in the file and
 * it should not be quietly inherited. There is no photograph in the library
 * of a working irrigation system. `services/irrigation.jpg` is a broken head
 * spraying across a weedy, muddy bed full of dandelions: exactly right on a
 * repair page, wrong as a full-screen brand statement.
 *
 * `striped-lawn-acreage.jpg` is used instead because it makes the irrigation
 * argument better than a photograph of a sprinkler would — an emerald striped
 * lawn in high summer with scorched brown pasture directly behind the fence
 * line. That contrast IS what irrigation buys you in a Spokane August, and
 * the alt text says so rather than implying the picture shows equipment.
 *
 * The cost: this photo is also `aeration-overseeding`'s service image, so it
 * appears twice on the homepage — once here, once in the services ribbon. It
 * is the only cross-service reuse on the page (the other four rail slides
 * each match their own service's ribbon panel, which is consistency rather
 * than duplication). Replace it the moment there is a wide shot of a system
 * running over green turf; see PHOTO-SHOT-LIST.md.
 *
 * The guard below is not decoration. It resolves at build time, so a slug
 * that no longer exists in the content file fails `next build` rather than
 * shipping a rail item that 404s.
 */
const RAIL: HeroSlide[] = [
  {
    slug: "lawn-maintenance",
    label: "Lawn Maintenance",
    blurb: "Weekly mowing, edging, trimming and clippings haul-off",
    src: "/images/projects/striped-lawn-barn.jpg",
    alt: "A large lawn maintained by Supernova Landscape, freshly cut with even mowing stripes, beside a white fence and a red barn",
  },
  {
    slug: "irrigation",
    label: "Irrigation",
    blurb: "Broken heads, dead zones, valves, coverage and blow-outs",
    src: "/images/projects/striped-lawn-acreage.jpg",
    alt: "A deep green, freshly striped acreage lawn maintained by Supernova Landscape in high summer, with dry brown unirrigated pasture visible beyond the fence line",
  },
  {
    slug: "landscape-design-installation",
    label: "Landscape Installs",
    blurb: "Design and build — boulders, beds, planting and hardscape",
    src: "/images/projects/backyard-reset-after.jpg",
    alt: "A Spokane backyard rebuilt by Supernova Landscape, with new beds, planting and a clean lawn",
  },
  {
    slug: "sod-installation",
    label: "Sod Installation",
    blurb: "Grading, prep and sod laid so it actually takes",
    src: "/images/projects/sod-lawn.jpg",
    alt: "A newly laid sod lawn installed by Supernova Landscape",
  },
  {
    slug: "residential-snow-removal",
    label: "Snow Removal",
    blurb: "Driveways, walks, commercial lots and ice control",
    src: "/images/services/snow-plow-truck.jpg",
    alt: "A Supernova Landscape plow truck clearing snow from a property",
  },
];

// Build-time guard: every rail slug must be a real service page.
RAIL.forEach((slide) => {
  if (!services.some((s) => s.slug === slide.slug)) {
    throw new Error(
      `Hero rail references unknown service slug "${slide.slug}". ` +
        `Update RAIL in src/components/home/Hero.tsx or src/content/services.ts.`,
    );
  }
});

export function Hero() {
  return (
    <HeroStage slides={RAIL}>
      <p className="reveal-on-load eyebrow eyebrow-light">
        {AREAS.map((area, i) => (
          <span key={area} className="flex items-center gap-[0.6em]">
            {i > 0 && (
              <StarMark size={7} className="shrink-0 text-gold-500/70" />
            )}
            {area}
          </span>
        ))}
      </p>

      <h1 className="display-1 mt-5 text-white [text-shadow:0_2px_24px_rgb(4_21_12_/_0.55)]">
        {/* The separating space is a SIBLING of each word span, never its
            last child — as a trailing child it renders as `&nbsp;`, which
            removes the line-break opportunity after every word. */}
        {leadWords.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span
              className="word-rise"
              style={{ transitionDelay: `${140 + i * 60}ms` }}
            >
              {word}
            </span>{" "}
          </Fragment>
        ))}
        <span
          className="word-rise text-gold-400"
          style={{ transitionDelay: `${140 + leadWords.length * 60}ms` }}
        >
          {lastWord}
        </span>
      </h1>

      <p
        className="reveal-on-load mt-6 max-w-xl text-[1.05rem] leading-relaxed text-sage-100 [text-shadow:0_1px_16px_rgb(4_21_12_/_0.6)]"
        style={{ transitionDelay: "560ms" }}
      >
        Supernova Landscape is a family-owned Spokane crew handling weekly
        mowing, irrigation, landscape installs, seasonal clean-ups and snow —
        for homes and businesses across the greater Spokane area.
      </p>

      <div
        className="reveal-on-load mt-8 flex flex-col gap-3 sm:flex-row"
        style={{ transitionDelay: "640ms" }}
      >
        {/* The bloom is a sibling of the button, never a style on it, so its
            slow breathing can never fight the button's hover lift. */}
        <div className="relative sm:w-auto">
          <span
            aria-hidden="true"
            className="ember-bloom pointer-events-none absolute -inset-3 rounded-xs bg-gold-500/25 blur-xl"
          />
          <QuoteCta
            location="hero"
            size="lg"
            className="relative w-full sm:w-auto"
          >
            Get a Free Quote
          </QuoteCta>
        </div>

        <PhoneLink
          location="hero"
          className="glass inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xs px-7 text-[1.05rem] font-bold text-white transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:border-white/45 hover:bg-white/10 focus-visible:-translate-y-px focus-visible:border-white/45 focus-visible:bg-white/10 active:translate-y-0"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4.6 2.5h2.6l1.3 3.3-1.6 1.2a10.6 10.6 0 0 0 4.6 4.6l1.2-1.6 3.3 1.3v2.6a1.6 1.6 0 0 1-1.7 1.6A13.3 13.3 0 0 1 3 4.2a1.6 1.6 0 0 1 1.6-1.7Z"
              fill="currentColor"
            />
          </svg>
          {business.phone.display}
        </PhoneLink>
      </div>

      <div
        className="reveal-on-load mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5"
        style={{ transitionDelay: "720ms" }}
      >
        <Stars rating={reputation.rating} size={19} sequential />
        <span className="text-[1.05rem] font-bold text-white">
          {reputation.rating.toFixed(1)}
        </span>
        <span className="text-[0.95rem] text-sage-100">
          from {reputation.reviewCount} Google reviews
        </span>
        <a
          href={reputation.googleProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.9rem] font-bold text-gold-400 underline underline-offset-4 hover:text-gold-200"
        >
          Read them
          <span className="sr-only"> on Google (opens in a new tab)</span>
        </a>
      </div>
    </HeroStage>
  );
}
