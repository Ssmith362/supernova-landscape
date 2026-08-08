import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuoteCta } from "@/components/QuoteCta";
import { ReviewCard } from "@/components/ReviewCard";
import { Stars } from "@/components/Stars";

import { reputation, socials } from "@/config/site";
import { reviews } from "@/content/reviews";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Supernova Landscape Reviews | Spokane, WA",
  description:
    "What Spokane homeowners say about Supernova Landscape. Real reviews from Google, Nextdoor and direct customer testimonials — 4.9 stars from 53 Google reviews.",
  path: "/reviews",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Reviews", href: "/reviews" },
];

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Reviews"
        title={`${reputation.rating} stars from ${reputation.reviewCount} Google reviews`}
        lede="The strongest thing Supernova has is a reputation built one job at a time. Below is a selection of real reviews — every one is traceable to a published source, and none of them were written by us."
        actions={
          <QuoteCta location="reviews_header" size="lg">
            Get a Free Quote
          </QuoteCta>
        }
      />

      {/* Rating summary */}
      <section className="border-b border-sage-200 bg-forest-950 py-12 text-white sm:py-14">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="font-display text-[3.6rem] font-semibold leading-none text-white">
                  {reputation.rating}
                </p>
                <Stars rating={reputation.rating} size={20} className="mt-2" />
              </div>
              <div className="border-l border-white/15 pl-6">
                <p className="text-[1.05rem] font-semibold text-white">
                  {reputation.reviewCount} Google reviews
                </p>
                <p className="mt-1 text-[0.88rem] text-sage-300">
                  Rating recorded {reputation.asOfLabel}. Live figures move week
                  to week — check the profile for the current number.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={reputation.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center rounded-xs bg-gold-500 px-6 text-[1rem] font-bold text-forest-950 transition-colors hover:bg-gold-400"
              >
                Read all reviews on Google
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 items-center rounded-xs border border-white/30 px-5 text-[0.95rem] font-semibold text-white transition-colors hover:border-gold-500 hover:text-gold-400"
                >
                  {s.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews grid */}
      <section className="py-14 sm:py-20">
        <Container>
          <h2 className="sr-only">Customer reviews</h2>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => {
              const svc = r.serviceSlug ? getService(r.serviceSlug) : undefined;
              return (
                <li key={r.author} className="flex flex-col">
                  <ReviewCard review={r} />
                  {svc && (
                    <Link
                      href={`/services/${svc.slug}`}
                      className="mt-2.5 text-[0.85rem] font-semibold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                    >
                      About our {svc.name.toLowerCase()} →
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Honesty note — the audit specifically warned against faking proof */}
      <section className="border-t border-sage-200 bg-sage-50 py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="About these reviews"
                title="Where each of these came from"
              />
              <div className="prose-supernova mt-5">
                <p>
                  Every review on this page is reproduced word for word from a
                  published source — Supernova&rsquo;s Google profile, its
                  Nextdoor page, or a testimonial the customer gave us directly.
                  Nothing has been shortened mid-sentence, tidied up or written
                  on a customer&rsquo;s behalf.
                </p>
                <p>
                  Where a source publishes a star rating, we show it. Where it
                  publishes a recommendation without one — Nextdoor works this
                  way — we show the words and no stars rather than assigning a
                  rating nobody gave.
                </p>
                <p>
                  We have also deliberately not added review markup to this page
                  to try to make star ratings appear in Google search results.
                  Google&rsquo;s guidelines do not allow a business to mark up
                  reviews about itself that way, and the rating is already
                  published on the Google profile where it belongs.
                </p>
              </div>
            </div>

            <div className="border-t-4 border-gold-500 bg-white p-6 shadow-card lg:self-start">
              <h2 className="font-display text-[1.25rem] font-semibold text-ink">
                Worked with us?
              </h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                A review is the single most useful thing a customer can do for a
                small local business. It takes about a minute.
              </p>
              <a
                href={reputation.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-xs bg-forest-600 px-6 text-[1rem] font-bold text-white transition-colors hover:bg-forest-500"
              >
                Leave a Google review
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        location="reviews_footer"
        heading="Ready to be the next one?"
        body="Tell us what the property needs and we will come and look at it. Estimates and consultations are free."
      />
    </>
  );
}
