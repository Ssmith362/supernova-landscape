import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CurveDivider } from "@/components/ui/CurveDivider";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { RatingBadge } from "@/components/RatingBadge";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ProcessTimeline } from "@/components/motion/ProcessTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

import { Hero } from "@/components/home/Hero";
import { StatStrip } from "@/components/home/StatStrip";
import { ServicesReel } from "@/components/home/ServicesReel";
import { WhyPoints } from "@/components/home/WhyPoints";
import { SeasonRibbon } from "@/components/home/SeasonRibbon";
import { ReviewsShowcase } from "@/components/home/ReviewsShowcase";

import { reputation } from "@/config/site";
import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { projects } from "@/content/projects";
import { reviews } from "@/content/reviews";
import { homepageFaqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Spokane Landscaping & Lawn Care | Supernova Landscape",
  description:
    "Family-owned landscaping, weekly mowing, irrigation and snow removal for Spokane, Spokane Valley and Liberty Lake. 4.9 stars from 53 Google reviews.",
  path: "/",
});

/**
 * REGISTER ALTERNATION
 * The page runs night → day → night down its whole length, and the ridge
 * dividers below sit at every one of those boundaries so a colour change
 * always reads as designed rather than as two blocks stacked.
 *
 *   hero · stats            night   (one continuous opening block)
 *   services                day
 *   before/after · why      night   (one continuous block, same reasoning)
 *   seasonal                day
 *   reviews                 night
 *   areas · process · faq   day     (alternating bone / sage tints)
 *   cta · footer            night
 *
 * The two light runs that touch — areas→process→faq — alternate between
 * `bone` and `sage-50` rather than repeating one flat white, which is the
 * case the "no two adjacent flat white sections" rule is actually about.
 */

const whyPoints = [
  {
    title: "The rating is the whole pitch",
    body: `${reputation.rating} stars across ${reputation.reviewCount} Google reviews, earned one job at a time. Read them yourself — we would rather you did that than take our word for it.`,
  },
  {
    title: "Weekly means weekly",
    body: "We do not run bi-weekly mowing. Two weeks of Spokane growth means cutting off too much blade at once, and it is worse for the lawn. Set routes, same day, every week.",
  },
  {
    title: "Family-owned and local",
    body: `Damien Barton started Supernova here in Spokane. You are dealing with the people doing the work, not a call centre in another state.`,
  },
  {
    title: "One crew, most of the yard",
    body: "Mowing, irrigation, installs, clean-ups and snow. It means the crew who mow your lawn are the ones who notice the sprinkler head that stopped turning.",
  },
];

/**
 * SEASON PHOTOGRAPHY
 * The ribbon needs one image per season, and the library has no shots taken
 * specifically as "a season". These are chosen because they genuinely depict
 * that season's work: fresh beds for the spring reset, the striped summer
 * lawn for mowing season, the bare-tree dormant yard for the fall clean-up,
 * and cleared walks for winter.
 *
 * Summer and Winter reuse the Lawn Maintenance and Residential Snow photos.
 * That reuse is honest — those services ARE the season — and the panels sit
 * several screens apart from the services section. Fall uses the one image
 * freed up when Seasonal Clean-Ups moved to the higher-resolution
 * side-yard-after.jpg; at 500x375 it is the weakest file here and is on the
 * list in PHOTO-SHOT-LIST.md.
 */
const seasons = [
  {
    season: "Spring",
    window: "March – May",
    image: {
      src: "/images/projects/front-entry-beds.jpg",
      alt: "Freshly cleared and edged front entry beds after a spring clean-up by Supernova Landscape",
    },
    items: [
      "Spring clean-up and bed clear-out",
      "Sprinkler turn-on and system check",
      "Weekly mowing routes start",
      "Dethatching as the lawn wakes up",
    ],
    slugs: ["seasonal-cleanups", "irrigation", "lawn-maintenance", "dethatching"],
  },
  {
    season: "Summer",
    window: "June – August",
    image: {
      src: "/images/projects/striped-lawn-barn.jpg",
      alt: "A large Spokane lawn in full summer growth, freshly cut with even mowing stripes beside a white fence and red barn",
    },
    items: [
      "Weekly mowing, edging and trimming",
      "Irrigation repairs and coverage fixes",
      "Landscape installs and sod",
      "Snow contracts arranged for winter",
    ],
    slugs: [
      "lawn-maintenance",
      "irrigation",
      "landscape-design-installation",
      "commercial-snow-removal",
    ],
  },
  {
    season: "Fall",
    window: "September – November",
    image: {
      src: "/images/projects/mulch-island-bed.jpg",
      alt: "A Spokane front yard cleared and freshly mulched for fall, with the trees bare and the lawn going dormant",
    },
    items: [
      "Aeration and overseeding — the best window of the year",
      "Sprinkler blow-outs before the first hard freeze",
      "Leaf and full-property clean-ups",
      "Last cut of the season",
    ],
    slugs: [
      "aeration-overseeding",
      "irrigation",
      "seasonal-cleanups",
      "lawn-maintenance",
    ],
  },
  {
    season: "Winter",
    window: "December – February",
    image: {
      src: "/images/services/snow-sidewalk.jpg",
      alt: "A Spokane sidewalk and entryway cleared of snow by Supernova Landscape",
    },
    items: [
      "Residential driveways, walks and entryways",
      "Commercial lots, sidewalks and entrances",
      "De-icing and ice control",
      "Seasonal contracts or call-by-call",
    ],
    slugs: ["residential-snow-removal", "commercial-snow-removal"],
  },
];

const processSteps = [
  {
    n: "01",
    title: "Call or send a request",
    body: "Tell us the address and what the property needs. Anything from weekly mowing to a full yard rebuild.",
  },
  {
    n: "02",
    title: "We come and look at it",
    body: "Estimates and consultations are free. We would rather walk the property with you than price a job off a description.",
  },
  {
    n: "03",
    title: "You get a real number",
    body: "A written estimate for the work discussed, so you know what it costs before anything starts.",
  },
  {
    n: "04",
    title: "It gets scheduled and done",
    body: "Maintenance goes onto a set weekly route. Project work gets a start date and a realistic timeline.",
  },
];

export default function HomePage() {
  // The reel shows all nine services in content order and weights none of
  // them, so the featured/rest split the bento needed is gone from here. The
  // `featured` flag is still read by /services.
  const beforeAfters = projects.filter((p) => p.before).slice(0, 2);
  const showcase = projects.find((p) => p.slug === "boulder-slope-planting")!;

  // Resolve service names here so the tabs component stays free of content
  // imports and receives only serialisable props.
  const seasonPanels = seasons.map((s) => ({
    season: s.season,
    window: s.window,
    items: s.items,
    image: s.image,
    links: s.slugs.map((slug) => {
      const svc = services.find((x) => x.slug === slug)!;
      return { slug, name: svc.name };
    }),
  }));

  return (
    <>
      <JsonLd data={graph(faqSchema(homepageFaqs))} />

      {/* ============================================================ NIGHT */}
      <Hero />
      <StatStrip />
      <div className="bg-forest-950">
        <CurveDivider fill="var(--color-bone)" />
      </div>

      {/* ============================================================== DAY */}
      <section className="bg-bone py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading
                eyebrow="What we do"
                title="Nine services, nine places to start"
                lede="Everything below has its own page with real detail — what is included, what it costs you to skip it, and when in a Spokane year it should happen."
              />
            </Reveal>
            <Reveal delay={80}>
              <ButtonLink href="/services" variant="ghost">
                All services
              </ButtonLink>
            </Reveal>
          </div>
        </Container>

        {/* Outside the Container on purpose. The reel is full-bleed so cards
            scroll out to the screen edge — that overflow is what signals
            there is more to the right. Its own `--reel-inset` keeps the first
            card aligned with the heading above; see `.reel-track`. */}
        <ServicesReel services={services} />
      </section>
      <div className="bg-bone">
        <CurveDivider fill="var(--color-forest-950)" flip ornament />
      </div>

      {/* ============================================================ NIGHT */}
      <section className="relative isolate overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="starfield opacity-60" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Real Spokane jobs"
              title="Drag the handle. These are our yards."
              lede="Every photograph on this site is Supernova's own work — no stock imagery. Most of these started as yards nobody had touched in years."
            />
          </Reveal>

          <StaggerGroup
            as="div"
            itemAs="div"
            className="mt-12 grid gap-8 md:grid-cols-2"
            stagger={100}
          >
            {beforeAfters.map((p) => (
              <BeforeAfter
                key={p.slug}
                before={p.before!}
                after={p.after}
                label={p.title}
                tone="dark"
              />
            ))}
          </StaggerGroup>

          <Reveal
            as="div"
            delay={140}
            className="hairline-dark mt-10 grid items-center gap-8 rounded-xs bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr]"
          >
            <ImageReveal className="aspect-4/3 overflow-hidden rounded-xs bg-forest-900">
              <Image
                src={showcase.after.src}
                alt={showcase.after.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                className="object-cover"
              />
            </ImageReveal>
            <div>
              <p className="eyebrow eyebrow-light">From the gallery</p>
              <h3 className="display-3 mt-3 text-white">{showcase.title}</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-sage-200">
                {showcase.blurb}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/projects" variant="secondary">
                  See the full gallery
                </ButtonLink>
                <ButtonLink
                  href="/services/landscape-design-installation"
                  variant="onDark"
                >
                  About landscape installs
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Continuous with the section above — same night register, no divider.

          NOTE: no `overflow-hidden` here, deliberately. WhyPoints pins its
          numeral column with `position: sticky`, and any ancestor with a
          clipping overflow silently turns a sticky element back into a
          static one — it scrolls away instead of pinning, with no error.
          Nothing in this section overflows (the starfield elsewhere clips
          its own children), so there is nothing to clip. */}
      <section className="relative isolate bg-forest-950 pb-20 sm:pb-24">
        <Container className="relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Why homeowners pick us"
              title="Four things worth knowing before you call anyone"
            />
          </Reveal>
          <WhyPoints points={whyPoints} />
        </Container>
      </section>
      <div className="bg-forest-950">
        <CurveDivider fill="var(--color-bone)" />
      </div>

      {/* ============================================================== DAY */}
      <section className="bg-bone py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="A Spokane year"
              title="What we are doing, and when"
              lede="Landscaping here is seasonal work with narrow windows. Miss the overseeding window or the blow-out window and it costs you — either a thin lawn next spring or a split irrigation line."
            />
          </Reveal>
          <SeasonRibbon seasons={seasonPanels} />
        </Container>
      </section>
      <div className="bg-bone">
        <CurveDivider fill="var(--color-forest-950)" flip ornament />
      </div>

      {/* ============================================================ NIGHT */}
      <section className="relative isolate overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="starfield opacity-60" />
        <Container className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading
                tone="dark"
                eyebrow="What people say"
                title={`${reputation.rating} stars, ${reputation.reviewCount} reviews`}
                lede="Real reviews from Google, Nextdoor and customers who wrote to us directly. Nothing here is written by us."
              />
            </Reveal>
            <Reveal delay={80} className="flex flex-col items-start gap-3">
              <RatingBadge tone="dark" showLink={false} />
              <ButtonLink href="/reviews" variant="onDark">
                All reviews
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-14">
            <ReviewsShowcase reviews={reviews} />
          </div>
        </Container>
      </section>
      <div className="bg-forest-950">
        <CurveDivider fill="var(--color-sage-50)" />
      </div>

      {/* ============================================================== DAY */}
      <section className="bg-sage-50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="Greater Spokane, Spokane Valley and Liberty Lake"
              lede="Three areas, three genuinely different sets of conditions — old trees and steep lots in the city, big irrigated lawns in the Valley, HOA frontage standards in Liberty Lake."
            />
          </Reveal>

          <StaggerGroup
            as="ul"
            itemAs="li"
            className="mt-12 grid gap-6 md:grid-cols-3"
            stagger={90}
          >
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/service-areas/${loc.slug}`}
                className="hairline lift group relative flex h-full flex-col overflow-hidden rounded-xs bg-forest-950"
              >
                <ImageReveal className="aspect-16/10 bg-forest-900">
                  <Image
                    src={loc.image.src}
                    alt={loc.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
                  />
                </ImageReveal>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 aspect-16/10 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent"
                />
                <span
                  className="glass absolute left-4 top-4 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white"
                  style={{ borderRadius: "var(--radius-pill)" }}
                >
                  {loc.city}
                </span>

                <div className="relative flex flex-1 flex-col p-6">
                  <h3 className="display-3 text-white">{loc.cityState}</h3>
                  <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-sage-200">
                    {loc.localNotes[0].heading}.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-gold-400">
                    What we do here
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-bone py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What happens next"
              title="From your call to work on the ground"
            />
          </Reveal>
          <ProcessTimeline steps={processSteps} />
        </Container>
      </section>

      <section className="bg-sage-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <SectionHeading
              eyebrow="Common questions"
              title="Before you call"
              lede={
                <>
                  More on the{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-forest-700 underline underline-offset-4"
                  >
                    contact page
                  </Link>
                  , and each service page answers questions specific to that
                  job.
                </>
              }
            />
            <FaqList faqs={homepageFaqs} />
          </div>
        </Container>
      </section>
      <div className="bg-sage-50">
        <CurveDivider fill="var(--color-forest-950)" flip ornament />
      </div>

      {/* ============================================================ NIGHT */}
      <CtaBand location="home_footer" />
    </>
  );
}
