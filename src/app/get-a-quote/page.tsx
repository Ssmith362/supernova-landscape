import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/JsonLd";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteForm } from "@/components/QuoteForm";
import { RatingBadge } from "@/components/RatingBadge";
import { Breadcrumbs } from "@/components/Breadcrumbs";

import { business, reputation } from "@/config/site";
import { quoteServiceOptions } from "@/content/services";
import { reviews } from "@/content/reviews";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Get a Free Landscaping Quote | Spokane, WA",
  description:
    "Request a free landscaping, lawn care, irrigation or snow removal estimate for your Spokane, Spokane Valley or Liberty Lake property. No charge for the visit.",
  path: "/get-a-quote",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Get a Free Quote", href: "/get-a-quote" },
];

const expectations = [
  {
    title: "It is genuinely free",
    body: "Estimates and consultations cost nothing. There is no charge for the visit and no obligation afterwards.",
  },
  {
    title: "We look at the property",
    body: "For anything beyond routine mowing, we would rather walk the site than price it off a description. It is the only way the number means anything.",
  },
  {
    title: "You get a real number",
    body: "A written estimate for the work discussed, so you know what it costs before anything starts.",
  },
];

/**
 * `?service=<slug>` preselects the dropdown, so a CTA on a service page lands
 * here with the right option chosen. Read on the server rather than with
 * useSearchParams so the form is present in the initial HTML — on the site's
 * most important conversion page, the form should not wait for hydration.
 */
export default async function GetAQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const requested = Array.isArray(service) ? service[0] : service;
  const defaultService = quoteServiceOptions.some((o) => o.value === requested)
    ? requested
    : undefined;

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <section className="border-b border-sage-200 bg-white">
        <Container className="py-8 sm:py-12">
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-5 max-w-3xl">
            <p className="eyebrow">Free estimate</p>
            <h1 className="mt-3 text-[2.1rem] leading-[1.08] text-ink sm:text-[2.7rem]">
              Tell us what the property needs
            </h1>
            <p className="mt-4 text-[1.08rem] leading-relaxed text-ink-soft">
              Fill this in and we will get back to you to arrange a look at the
              property. If it is quicker to talk, call{" "}
              <PhoneLink
                location="quote_page_intro"
                className="font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
              />
              .
            </p>
            <RatingBadge className="mt-5" />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
            <div>
              <h2 className="sr-only">Quote request form</h2>
              <QuoteForm defaultService={defaultService} />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="border-t-4 border-forest-600 bg-white p-6 shadow-card">
                <h2 className="font-display text-[1.2rem] font-semibold text-ink">
                  Rather just call?
                </h2>
                <PhoneLink
                  location="quote_page_sidebar"
                  className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xs bg-forest-600 px-5 text-[1.05rem] font-bold text-white transition-colors hover:bg-forest-500"
                >
                  {business.phone.display}
                </PhoneLink>
                <a
                  href={`mailto:${business.email}`}
                  className="mt-2.5 inline-flex min-h-12 w-full items-center justify-center rounded-xs border border-sage-300 px-5 text-[0.92rem] font-semibold text-ink-soft transition-colors hover:border-forest-600 hover:text-forest-700"
                >
                  {business.email}
                </a>
              </div>

              <div className="border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  What happens next
                </h2>
                <ol className="mt-4 space-y-4">
                  {expectations.map((e, i) => (
                    <li key={e.title} className="flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sage-100 font-sans text-[0.72rem] font-bold text-forest-700">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-[0.92rem] font-semibold text-ink">
                          {e.title}
                        </span>
                        <span className="mt-1 block text-[0.85rem] leading-relaxed text-ink-muted">
                          {e.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border border-sage-200 bg-sage-50 p-6">
                <p className="font-display text-[0.98rem] leading-relaxed text-ink">
                  &ldquo;{reviews[3].quote}&rdquo;
                </p>
                <p className="mt-3 text-[0.82rem] font-bold text-ink-muted">
                  {reviews[3].author} · via {reviews[3].source}
                </p>
                <Link
                  href="/reviews"
                  className="mt-3 inline-block text-[0.85rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                >
                  {reputation.reviewCount} more reviews →
                </Link>
              </div>

              <div className="border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Looking for a job?
                </h2>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-soft">
                  Applications go through the careers page rather than this
                  form.
                </p>
                <Link
                  href="/careers"
                  className="mt-3 inline-block text-[0.9rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                >
                  Careers at Supernova →
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
