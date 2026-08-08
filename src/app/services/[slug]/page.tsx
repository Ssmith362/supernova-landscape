import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteCta } from "@/components/QuoteCta";
import { RatingBadge } from "@/components/RatingBadge";
import { ReviewCard } from "@/components/ReviewCard";

import { business } from "@/config/site";
import { locations } from "@/content/locations";
import { projects } from "@/content/projects";
import { reviewsForService } from "@/content/reviews";
import { guides } from "@/content/guides";
import {
  commercialSnowQuoteFactors,
  getService,
  services,
} from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
} from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    image: {
      url: service.image.src,
      width: service.image.width,
      height: service.image.height,
      alt: service.image.alt,
    },
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: `/services/${service.slug}` },
  ];

  const related = service.relatedSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const serviceReviews = reviewsForService(service.slug);

  const relatedProjects = projects
    .filter((p) => p.serviceSlug === service.slug)
    .slice(0, 3);

  const relatedGuides = guides.filter((g) =>
    g.relatedServiceSlugs.includes(service.slug),
  );

  const isCommercialSnow = service.slug === "commercial-snow-removal";

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: service.name,
            description: service.description,
            path: `/services/${service.slug}`,
          }),
          faqSchema(service.faqs),
        )}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Service"
        title={service.h1}
        lede={service.summary}
        image={service.heroImage ?? service.image}
        actions={
          <>
            <QuoteCta
              location={`service_${service.slug}_header`}
              href={`/get-a-quote?service=${service.slug}`}
              size="lg"
            >
              Get a Free Quote
            </QuoteCta>
            <PhoneLink
              location={`service_${service.slug}_header`}
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xs border border-white/40 px-7 text-[1.05rem] font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {business.phone.display}
            </PhoneLink>
          </>
        }
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            {/* --------------------------------------------------- MAIN BODY */}
            <div>
              <div className="prose-supernova">
                {service.intro.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              {/* Who it's for */}
              <div className="mt-12 border-l-4 border-forest-600 bg-white p-6 sm:p-7">
                <h2 className="font-display text-[1.35rem] font-semibold text-ink">
                  Who this is for
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {service.whoFor.map((w) => (
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
              </div>

              {/* Scope */}
              <div className="mt-14">
                <h2 className="font-display text-[1.6rem] font-semibold text-ink">
                  What&rsquo;s included
                </h2>
                <dl className="mt-6 divide-y divide-sage-200 border-y border-sage-200">
                  {service.scope.map((item) => (
                    <div
                      key={item.label}
                      className="grid gap-1.5 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6"
                    >
                      <dt className="font-display text-[1.05rem] font-semibold text-ink">
                        {item.label}
                      </dt>
                      <dd className="text-[0.98rem] leading-relaxed text-ink-soft">
                        {item.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Extra sections */}
              {service.sections?.map((sec) => (
                <div key={sec.heading} className="mt-14">
                  <h2 className="font-display text-[1.6rem] font-semibold text-ink">
                    {sec.heading}
                  </h2>
                  <div className="prose-supernova mt-4">
                    {sec.body.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                  {/* The commercial snow page lists its quoting factors here. */}
                  {isCommercialSnow &&
                    sec.heading === "What we need to know to quote your property" && (
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {commercialSnowQuoteFactors.map((f) => (
                          <li
                            key={f}
                            className="flex gap-2.5 border border-sage-200 bg-white p-4 text-[0.92rem] leading-snug text-ink-soft"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-gold-500"
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}

              {/* Spokane context */}
              {service.localContext && (
                <div className="mt-14 border border-sage-200 bg-sage-50 p-6 sm:p-8">
                  <p className="eyebrow">Spokane specifics</p>
                  <h2 className="mt-2.5 font-display text-[1.5rem] font-semibold leading-snug text-ink">
                    {service.localContext.heading}
                  </h2>
                  <div className="prose-supernova mt-4">
                    {service.localContext.body.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Related project photos */}
              {relatedProjects.length > 0 && (
                <div className="mt-14">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 className="font-display text-[1.6rem] font-semibold text-ink">
                      Our work
                    </h2>
                    <Link
                      href="/projects"
                      className="text-[0.88rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                    >
                      Full project gallery →
                    </Link>
                  </div>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                    {relatedProjects.map((p) => (
                      <li key={p.slug}>
                        <figure>
                          <div className="relative aspect-4/3 overflow-hidden bg-sage-100">
                            <Image
                              src={p.after.src}
                              alt={p.after.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, 30vw"
                              loading="lazy"
                              className="object-cover"
                            />
                          </div>
                          <figcaption className="mt-2 text-[0.85rem] text-ink-muted">
                            {p.title}
                          </figcaption>
                        </figure>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Reviews for this service */}
              {serviceReviews.length > 0 && (
                <div className="mt-14">
                  <h2 className="font-display text-[1.6rem] font-semibold text-ink">
                    What customers said about this work
                  </h2>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {serviceReviews.map((r) => (
                      <li key={r.author}>
                        <ReviewCard review={r} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs */}
              <div className="mt-14">
                <h2 className="font-display text-[1.6rem] font-semibold text-ink">
                  {service.name} questions
                </h2>
                <div className="mt-5">
                  <FaqList faqs={service.faqs} />
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------ SIDEBAR */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border-t-4 border-gold-500 bg-white p-6 shadow-card">
                <h2 className="font-display text-[1.25rem] font-semibold text-ink">
                  Free estimate for {service.name.toLowerCase()}
                </h2>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                  Tell us the address and what you need. We will come and look
                  at it — there is no charge for the visit.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <QuoteCta
                    location={`service_${service.slug}_sidebar`}
                    href={`/get-a-quote?service=${service.slug}`}
                    size="lg"
                  >
                    Get a Free Quote
                  </QuoteCta>
                  <PhoneLink
                    location={`service_${service.slug}_sidebar`}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xs border border-forest-600/40 px-5 text-[1.02rem] font-bold text-forest-700 transition-colors hover:border-forest-600 hover:bg-sage-50"
                  >
                    {business.phone.display}
                  </PhoneLink>
                </div>
                <RatingBadge showLink={false} className="mt-5 border-t border-sage-100 pt-4" />
              </div>

              <div className="mt-6 border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Related services
                </h2>
                <ul className="mt-3 space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/services/${r.slug}`}
                        className="group block"
                      >
                        <span className="block text-[0.95rem] font-semibold text-ink group-hover:text-forest-700">
                          {r.name}
                        </span>
                        <span className="mt-0.5 block text-[0.82rem] leading-snug text-ink-muted">
                          {r.summary}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Available in
                </h2>
                <ul className="mt-3 space-y-2">
                  {locations
                    .filter((l) => l.serviceSlugs.includes(service.slug))
                    .map((l) => (
                      <li key={l.slug}>
                        <Link
                          href={`/service-areas/${l.slug}`}
                          className="text-[0.92rem] font-semibold text-forest-700 underline-offset-4 hover:underline"
                        >
                          {l.cityState}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {relatedGuides.length > 0 && (
                <div className="mt-6 border border-sage-200 bg-white p-6">
                  <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                    Read more
                  </h2>
                  <ul className="mt-3 space-y-2.5">
                    {relatedGuides.map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={`/resources/${g.slug}`}
                          className="text-[0.92rem] font-semibold leading-snug text-ink underline-offset-4 hover:text-forest-700 hover:underline"
                        >
                          {g.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>

      {/* Related services, full width, so no page is a dead end */}
      <section className="border-t border-sage-200 bg-sage-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Often booked together"
            title="Related services"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col border border-sage-200 bg-white p-5 transition-colors hover:border-forest-600"
                >
                  <span className="font-display text-[1.05rem] font-semibold text-ink">
                    {r.name}
                  </span>
                  <span className="mt-1.5 flex-1 text-[0.86rem] leading-snug text-ink-muted">
                    {r.summary}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-3 text-forest-600 transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/services" variant="ghost">
              All nine services
            </ButtonLink>
          </div>
        </Container>
      </section>

      <CtaBand
        location={`service_${service.slug}_footer`}
        heading={
          isCommercialSnow
            ? "Request a commercial snow estimate"
            : `Get a free ${service.name.toLowerCase()} estimate`
        }
        body={
          isCommercialSnow
            ? "Commercial pricing is site-specific. Tell us about the property and we will come and look at it before quoting anything."
            : "Tell us the address and what the property needs. Estimates and consultations are free — there is no charge for the visit."
        }
      />
    </>
  );
}
