import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteCta } from "@/components/QuoteCta";
import { RatingBadge } from "@/components/RatingBadge";
import { ReviewCard } from "@/components/ReviewCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Stars } from "@/components/Stars";

import { business, reputation } from "@/config/site";
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

const heroPoints = [
  "Free estimates and consultations",
  "Weekly mowing routes — never bi-weekly",
  "Landscape installs, irrigation and snow",
];

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

const seasons = [
  {
    season: "Spring",
    window: "March – May",
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
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);
  const beforeAfters = projects.filter((p) => p.before).slice(0, 2);
  const showcase = projects.find(
    (p) => p.slug === "boulder-slope-planting",
  )!;

  return (
    <>
      <JsonLd data={graph(faqSchema(homepageFaqs))} />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative isolate overflow-hidden bg-forest-950">
        <Image
          src="/images/heroes/home.jpg"
          alt="A large lawn maintained by Supernova Landscape, freshly cut with even mowing stripes, beside a white fence and a red barn"
          fill
          priority
          fetchPriority="high"
          quality={65}
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/50"
        />

        <Container className="relative py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-light">
              Spokane · Spokane Valley · Liberty Lake
            </p>

            <h1 className="mt-4 text-[2.3rem] leading-[1.06] text-white sm:text-[3.1rem] lg:text-[3.5rem]">
              Landscaping, lawn care and snow removal, done properly.
            </h1>

            <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-sage-100 sm:text-[1.15rem]">
              Supernova Landscape is a family-owned Spokane crew handling weekly
              mowing, irrigation, landscape installs, seasonal clean-ups and
              snow — for homes and businesses across the greater Spokane area.
            </p>

            {/* The trust signal, above the fold, on the first screen. */}
            <div className="mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 border border-white/20 bg-forest-950/45 px-4 py-3 backdrop-blur-sm">
              <Stars rating={reputation.rating} size={19} />
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteCta location="hero" size="lg">
                Get a Free Quote
              </QuoteCta>
              <PhoneLink
                location="hero"
                className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xs border border-white/40 px-7 text-[1.05rem] font-bold text-white transition-colors hover:border-white hover:bg-white/10"
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

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {heroPoints.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 text-[0.9rem] text-sage-100"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="shrink-0 text-gold-400"
                  >
                    <path
                      d="M2.5 8.5l3.5 3.5 7.5-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- TRUST STRIP */}
      <section className="border-b border-sage-200 bg-white">
        <Container>
          <dl className="grid divide-sage-200 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {[
              {
                k: `${reputation.rating} ★`,
                v: `Average across ${reputation.reviewCount} Google reviews`,
              },
              { k: "Free", v: "Estimates and on-site consultations" },
              { k: "Weekly", v: "Mowing routes — we do not run bi-weekly" },
              { k: "Year-round", v: "Mowing through summer, plowing through winter" },
            ].map((item) => (
              <div key={item.k} className="px-2 py-7 sm:px-6">
                <dt className="font-display text-[1.6rem] font-semibold leading-none text-forest-700">
                  {item.k}
                </dt>
                <dd className="mt-2 text-[0.9rem] leading-snug text-ink-soft">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ------------------------------------------------------------ SERVICES */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What we do"
              title="Nine services, nine places to start"
              lede="Everything below has its own page with real detail — what is included, what it costs you to skip it, and when in a Spokane year it should happen."
            />
            <ButtonLink href="/services" variant="ghost">
              All services
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <ServiceCard key={s.slug} service={s} priority={i < 3} />
            ))}
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start justify-between gap-4 border border-sage-200 bg-white p-5 transition-colors hover:border-forest-600"
                >
                  <span>
                    <span className="block font-display text-[1.05rem] font-semibold text-ink">
                      {s.name}
                    </span>
                    <span className="mt-1 block text-[0.86rem] leading-snug text-ink-muted">
                      {s.summary}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-forest-600 transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------ BEFORE / AFTER */}
      <section className="bg-sage-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Real Spokane jobs"
            title="Drag the handle. These are our yards."
            lede="Every photograph on this site is Supernova's own work — no stock imagery. Most of these started as yards nobody had touched in years."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {beforeAfters.map((p) => (
              <BeforeAfter
                key={p.slug}
                before={p.before!}
                after={p.after}
                label={p.title}
              />
            ))}
          </div>

          <div className="mt-10 grid items-center gap-8 border border-sage-200 bg-white p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative aspect-4/3 overflow-hidden bg-sage-100">
              <Image
                src={showcase.after.src}
                alt={showcase.after.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">From the gallery</p>
              <h3 className="mt-3 text-[1.55rem] leading-tight text-ink">
                {showcase.title}
              </h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
                {showcase.blurb}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/projects" variant="secondary">
                  See the full gallery
                </ButtonLink>
                <ButtonLink
                  href="/services/landscape-design-installation"
                  variant="ghost"
                >
                  About landscape installs
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- WHY */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why homeowners pick us"
            title="Four things worth knowing before you call anyone"
          />
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {whyPoints.map((p, i) => (
              <div key={p.title} className="border-t-2 border-forest-600 pt-5">
                <span className="font-display text-[0.9rem] font-bold text-forest-600">
                  0{i + 1}
                </span>
                <h3 className="mt-1.5 text-[1.25rem] leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[0.98rem] leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- SEASON */}
      <section className="bg-forest-950 py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="A Spokane year"
            title="What we are doing, and when"
            lede="Landscaping here is seasonal work with narrow windows. Miss the overseeding window or the blow-out window and it costs you — either a thin lawn next spring or a split irrigation line."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((s) => (
              <div
                key={s.season}
                className="flex h-full flex-col border border-white/15 bg-white/[0.04] p-6"
              >
                <h3 className="text-[1.3rem] text-white">{s.season}</h3>
                <p className="mt-1 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-gold-400">
                  {s.window}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5 text-[0.92rem] leading-snug text-sage-200">
                  {s.items.map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-sage-500"
                      />
                      {i}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 border-t border-white/12 pt-4">
                  {s.slugs.map((slug) => {
                    const svc = services.find((x) => x.slug === slug)!;
                    return (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        className="text-[0.8rem] font-semibold text-gold-400 underline-offset-4 hover:underline"
                      >
                        {svc.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- REVIEWS */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What people say"
              title={`${reputation.rating} stars, ${reputation.reviewCount} reviews`}
              lede="Real reviews from Google, Nextdoor and customers who wrote to us directly. Nothing here is written by us."
            />
            <div className="flex flex-col items-start gap-3">
              <RatingBadge showLink={false} />
              <ButtonLink href="/reviews" variant="ghost">
                All reviews
              </ButtonLink>
            </div>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.author}>
                <ReviewCard review={r} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* -------------------------------------------------------- SERVICE AREA */}
      <section className="bg-sage-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Where we work"
            title="Greater Spokane, Spokane Valley and Liberty Lake"
            lede="Three areas, three genuinely different sets of conditions — old trees and steep lots in the city, big irrigated lawns in the Valley, HOA frontage standards in Liberty Lake."
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {locations.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/service-areas/${loc.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-sage-200 bg-white transition-shadow hover:shadow-lift"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-sage-100">
                    <Image
                      src={loc.image.src}
                      alt={loc.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[1.25rem] text-ink">{loc.cityState}</h3>
                    <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-ink-soft">
                      {loc.localNotes[0].heading}.
                    </p>
                    <span className="mt-4 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-forest-700 group-hover:text-forest-500">
                      What we do here →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------- PROCESS */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What happens next"
            title="From your call to work on the ground"
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.n}>
                <span className="font-display text-[2.4rem] font-semibold leading-none text-sage-300">
                  {step.n}
                </span>
                <h3 className="mt-3 text-[1.15rem] leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- FAQ */}
      <section className="border-t border-sage-200 py-20 sm:py-24">
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

      <CtaBand location="home_footer" />
    </>
  );
}
