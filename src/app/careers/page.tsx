import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";

import { business, reputation } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Careers | Supernova Landscape, Spokane WA",
  description:
    "Supernova Landscape accepts applications year-round for landscape and maintenance crew work across the Spokane area. Send us a resume.",
  path: "/careers",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Careers", href: "/careers" },
];

/**
 * Careers lives on its own page — the audit flagged that a job-application
 * form sat on the Contact page between the quote form and the FAQ, mixing
 * applicants into the highest-intent customer page.
 *
 * Deliberately light on specifics: no pay range, hours, benefits or
 * requirements are stated because none of those could be verified. See
 * content/needs-confirmation.md #9.
 */
const theWork = [
  "Weekly mowing routes — mowing, trimming, edging and blow-off",
  "Spring and fall clean-ups",
  "Landscape installs: beds, rock and boulder work, planting, mulch",
  "Irrigation repairs and seasonal blow-outs",
  "Snow clearing and ice control through the winter",
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Careers"
        title="Work with Supernova"
        lede="We are a small, family-owned Spokane crew. If you want to do the work properly and be on a team where that is noticed, get in touch."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div>
              <div className="prose-supernova">
                <p>
                  Supernova takes applications year-round. Crews run maintenance
                  routes through the growing season and switch to snow work in
                  winter, so the work is steady rather than a summer-only
                  arrangement.
                </p>
                <p>
                  The company is small enough that the person reading your
                  application is the person you would be working for. We are not
                  going to pretend that suits everyone — but if you have worked
                  somewhere you were a number, you will notice the difference.
                </p>
              </div>

              <h2 className="mt-12 font-display text-[1.6rem] font-semibold text-ink">
                The work
              </h2>
              <ul className="mt-5 space-y-2.5">
                {theWork.map((w) => (
                  <li
                    key={w}
                    className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-soft"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-forest-600"
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
                    {w}
                  </li>
                ))}
              </ul>

              <div className="mt-12 border-l-4 border-forest-600 bg-white p-6 sm:p-7">
                <h2 className="font-display text-[1.35rem] font-semibold text-ink">
                  How to apply
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
                  Email a resume to{" "}
                  <a
                    href={`mailto:${business.email}?subject=Application%20%E2%80%94%20Supernova%20Landscape`}
                    className="font-semibold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                  >
                    {business.email}
                  </a>
                  , or call{" "}
                  <PhoneLink
                    location="careers_apply"
                    className="font-semibold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                  />{" "}
                  and ask for Damien. Tell us what you have done before and
                  whether you are looking for seasonal or year-round work.
                </p>
                <a
                  href={`mailto:${business.email}?subject=Application%20%E2%80%94%20Supernova%20Landscape`}
                  className="mt-5 inline-flex min-h-14 items-center justify-center rounded-xs bg-forest-600 px-7 text-[1.02rem] font-bold text-white transition-colors hover:bg-forest-500"
                >
                  Email your resume
                </a>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  About the company
                </h2>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
                  Family-owned, founded by {business.founder}, working across
                  greater Spokane, Spokane Valley and Liberty Lake.{" "}
                  {reputation.rating} stars from {reputation.reviewCount} Google
                  reviews.
                </p>
                <Link
                  href="/about"
                  className="mt-3 inline-block text-[0.9rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                >
                  More about Supernova →
                </Link>
              </div>

              <div className="border border-sage-200 bg-sage-50 p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Not looking for a job?
                </h2>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-soft">
                  If you landed here by accident and you need a yard looked at,
                  the estimate request is over here.
                </p>
                <Link
                  href="/get-a-quote"
                  className="mt-3 inline-block text-[0.9rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                >
                  Get a free quote →
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-sage-200 bg-sage-50 py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="See the work"
            title="What the crew actually produces"
            lede="The project gallery is all Supernova jobs — a fair picture of the standard the work is held to."
          />
          <div className="mt-7">
            <Link
              href="/projects"
              className="inline-flex min-h-14 items-center rounded-xs border border-forest-600/40 bg-white px-7 text-[1rem] font-bold text-forest-700 transition-colors hover:border-forest-600 hover:bg-sage-50"
            >
              View the project gallery
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
