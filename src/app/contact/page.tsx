import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteForm } from "@/components/QuoteForm";
import { RatingBadge } from "@/components/RatingBadge";

import {
  business,
  clientPortalUrl,
  reputation,
  socials,
} from "@/config/site";
import { generalFaqs } from "@/content/faqs";
import { locations } from "@/content/locations";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact Supernova Landscape | Spokane, WA",
  description:
    "Call Supernova Landscape for free landscaping, lawn care, irrigation and snow removal estimates across Spokane, Spokane Valley and Liberty Lake.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(generalFaqs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Contact"
        title="Get in touch with Supernova"
        lede="The fastest route is the phone. If it is easier to write it down, the form below reaches the same place."
      />

      {/* Contact methods — phone first, tappable, above everything else */}
      <section className="border-b border-sage-200 bg-white py-10 sm:py-12">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            <li className="border-t-4 border-gold-500 bg-bone p-6">
              <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                Call or text
              </h2>
              <PhoneLink
                location="contact_card"
                className="mt-2 block font-display text-[1.75rem] font-semibold leading-tight text-ink underline-offset-4 hover:text-forest-700 hover:underline"
              />
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-muted">
                Quickest way to get an answer about scheduling or whether we
                cover your address.
              </p>
            </li>

            <li className="border-t-4 border-forest-600 bg-bone p-6">
              <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                Email
              </h2>
              <a
                href={`mailto:${business.email}`}
                className="mt-2 block break-words font-display text-[1.15rem] font-semibold leading-snug text-ink underline-offset-4 hover:text-forest-700 hover:underline"
              >
                {business.email}
              </a>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-muted">
                Good for photos of the yard, plans, or anything with detail
                attached.
              </p>
            </li>

            <li className="border-t-4 border-sage-500 bg-bone p-6">
              <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                Existing customer
              </h2>
              <a
                href={clientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block font-display text-[1.15rem] font-semibold leading-snug text-ink underline-offset-4 hover:text-forest-700 hover:underline"
              >
                Client login
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-muted">
                Invoices, scheduling and account details in the customer portal.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      {/* Form + details */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Send a request"
                title="Ask for a free estimate"
                lede="Same form as the quote page — it reaches the same place. Fill in what you can; the address helps us confirm we are on a route."
              />
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Service area
                </h2>
                <ul className="mt-3 space-y-2">
                  {locations.map((l) => (
                    <li key={l.slug}>
                      <Link
                        href={`/service-areas/${l.slug}`}
                        className="text-[0.95rem] font-semibold text-forest-700 underline-offset-4 hover:underline"
                      >
                        {l.cityState}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-muted">
                  Not sure whether your address is inside that? Call and ask —
                  it is a quick answer either way.
                </p>
              </div>

              {business.hours && (
                <div className="border border-sage-200 bg-white p-6">
                  <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                    Hours
                  </h2>
                  <dl className="mt-3 space-y-1.5 text-[0.92rem] text-ink-soft">
                    {business.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-4">
                        <dt>{h.days}</dt>
                        <dd className="font-semibold text-ink">
                          {h.opens}–{h.closes}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Find us elsewhere
                </h2>
                <RatingBadge showLink={false} className="mt-3" />
                <ul className="mt-4 flex flex-wrap gap-2">
                  <li>
                    <a
                      href={reputation.googleProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center rounded-xs border border-forest-600/40 bg-sage-50 px-3.5 text-[0.85rem] font-semibold text-forest-700 hover:border-forest-600"
                    >
                      Google
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                  {socials.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center rounded-xs border border-sage-300 px-3.5 text-[0.85rem] font-semibold text-ink-soft hover:border-forest-600 hover:text-forest-700"
                      >
                        {s.name}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-sage-200 bg-sage-50 p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Looking for work?
                </h2>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-soft">
                  Job applications have their own page so they do not get mixed
                  in with customer requests.
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

      {/* FAQs */}
      <section className="border-t border-sage-200 bg-sage-50 py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <SectionHeading
              eyebrow="Questions"
              title="Things people ask before they call"
              lede="Questions about a specific service are answered on that service's page."
            />
            <FaqList faqs={generalFaqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
