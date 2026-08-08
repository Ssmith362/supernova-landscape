import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { QuoteCta } from "@/components/QuoteCta";
import { RatingBadge } from "@/components/RatingBadge";
import { ReviewCard } from "@/components/ReviewCard";

import { business, reputation, serviceAreaSummary } from "@/config/site";
import { reviews } from "@/content/reviews";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About Supernova Landscape | Spokane, WA",
  description:
    "Supernova Landscape was founded by Damien Barton in Spokane. A family-owned crew handling lawn care, irrigation, landscape installs and snow removal.",
  path: "/about",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const values = [
  {
    title: "We turn down work that would make us unreliable",
    body: "The bi-weekly mowing policy is the clearest example. Taking every job going means missing days, and a maintenance crew that misses days is worse than no crew at all.",
  },
  {
    title: "The estimate is a conversation, not a form",
    body: "We come out, walk the property and talk about what it needs. Some of those visits end with us telling someone they do not need the thing they called about.",
  },
  {
    title: "We would rather explain than upsell",
    body: "Dethatching and aeration get confused constantly, and plenty of lawns only need one. Selling the wrong one is easy money and a customer who does not call back.",
  },
  {
    title: "The reviews are the reputation",
    body: `${reputation.rating} stars across ${reputation.reviewCount} Google reviews, built one job at a time. That is the whole marketing strategy and we would like to keep it that way.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="About"
        title="A Spokane crew, doing Spokane yards"
        lede={`Supernova Landscape Company was founded by ${business.founder}. Family-owned, working across ${serviceAreaSummary.toLowerCase()}.`}
        image={{
          src: "/images/projects/boulder-retaining-wall.jpg",
          alt: "A retaining wall of large stacked boulders built by Supernova Landscape",
          width: 500,
          height: 375,
        }}
      />

      {/* ------------------------------------------------------------- STORY */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">The company</p>
              <h2 className="mt-3 text-[1.9rem] leading-tight text-ink sm:text-[2.2rem]">
                Started by Damien Barton, and still run that way
              </h2>

              <div className="prose-supernova mt-6">
                <p>
                  Supernova Landscape Company was founded by {business.founder}{" "}
                  here in Spokane, on a fairly simple premise: most people do
                  not want a landscaping company, they want their yard handled
                  by someone who turns up and does what they said they would.
                </p>
                <p>
                  That is still how it runs. Damien is the person you talk to
                  about an estimate, and there is a good chance he is the person
                  who shows up to look at the property. Customers write about
                  him by name in their reviews, which tells you most of what you
                  need to know about how the business is structured.
                </p>
                <p>
                  The work covers most of what a Spokane property needs across a
                  year — weekly mowing routes through the growing season,
                  irrigation repairs and blow-outs, landscape installs and yard
                  rebuilds, seasonal clean-ups, and plowing for homes and
                  businesses through the winter. Keeping all of that under one
                  crew is deliberate. The people mowing your lawn every week are
                  the ones who notice a sprinkler head that has stopped turning
                  before it becomes a brown patch in August.
                </p>
                <p>
                  We are not the biggest landscaping company in Spokane and
                  are not trying to be. There are firms in this market with five
                  times our review count. What we would rather have is the
                  rating — and the sort of relationship where a customer texts
                  Damien directly about a gate that got left open.
                </p>
              </div>

              <RatingBadge className="mt-8" />
            </div>

            <div className="space-y-6">
              {/* Audit finding SN-H09: no owner or crew photography exists. */}
              <PhotoPlaceholder
                label="Damien Barton, founder"
                note="A portrait of Damien on a job site. The single highest-value trust asset still missing from this site."
              />
              <PhotoPlaceholder
                label="The crew and the trucks"
                note="Two or three shots of the team working, and the trucks with the logo on them."
                aspect="4 / 3"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ VALUES */}
      <section className="border-t border-sage-200 bg-sage-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Four things that shape the way we run jobs"
          />
          <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className="border-t-2 border-forest-600 pt-5">
                <span className="font-display text-[0.9rem] font-bold text-forest-600">
                  0{i + 1}
                </span>
                <h3 className="mt-1.5 text-[1.2rem] leading-snug text-ink">
                  {v.title}
                </h3>
                <p className="mt-2.5 text-[0.98rem] leading-relaxed text-ink-soft">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- CREDENTIALS */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="The details"
              title="Licensing, insurance and how to check us out"
            />
            <div className="space-y-5">
              <div className="border border-sage-200 bg-white p-6">
                <h3 className="font-display text-[1.15rem] font-semibold text-ink">
                  Licensed, insured and bonded
                </h3>
                <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-soft">
                  Supernova Landscape Company LLC maintains the licenses,
                  insurance and bonding required for the work we take on. If you
                  would like to see current documentation before a project
                  starts, ask and we will send it over.
                </p>
                {business.contractorRegistration ? (
                  <p className="mt-3 text-[0.96rem] font-semibold text-ink">
                    Washington contractor registration #
                    {business.contractorRegistration}
                  </p>
                ) : null}
              </div>

              <div className="border border-sage-200 bg-white p-6">
                <h3 className="font-display text-[1.15rem] font-semibold text-ink">
                  Check the reviews first
                </h3>
                <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-soft">
                  We would genuinely rather you read what customers have written
                  than take our word for any of this.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/reviews"
                    className="inline-flex min-h-12 items-center rounded-xs border border-forest-600/40 px-5 text-[0.95rem] font-bold text-forest-700 hover:bg-sage-50"
                  >
                    Reviews on this site
                  </Link>
                  <a
                    href={reputation.googleProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center rounded-xs border border-sage-300 px-5 text-[0.95rem] font-bold text-ink-soft hover:border-forest-600 hover:text-forest-700"
                  >
                    Google profile
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>

              <div className="border border-sage-200 bg-white p-6">
                <h3 className="font-display text-[1.15rem] font-semibold text-ink">
                  Talk to Damien
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <PhoneLink
                    location="about_credentials"
                    className="text-[1.2rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                  />
                  <a
                    href={`mailto:${business.email}`}
                    className="text-[0.96rem] font-semibold text-ink-soft underline underline-offset-4 hover:text-forest-700"
                  >
                    {business.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ PROOF */}
      <section className="border-t border-sage-200 bg-sage-50 py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="In their words"
              title="What people actually say"
            />
            <Link
              href="/reviews"
              className="text-[0.9rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
            >
              All reviews →
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <li key={r.author}>
                <ReviewCard review={r} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* --------------------------------------------------------- WORK HERE */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-8 border border-sage-200 bg-white p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow">Join the crew</p>
              <h2 className="mt-2.5 text-[1.6rem] leading-tight text-ink">
                We take applications year-round
              </h2>
              <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
                Applications go through the careers page, not the quote form —
                so job seekers get a proper route and customers get an
                uninterrupted one.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href="/careers"
                className="inline-flex min-h-14 items-center justify-center rounded-xs bg-forest-600 px-7 text-[1.02rem] font-bold text-white transition-colors hover:bg-forest-500"
              >
                Careers at Supernova
              </Link>
              <QuoteCta location="about_work_here" variant="ghost">
                Or get a quote instead
              </QuoteCta>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand location="about_footer" />
    </>
  );
}
