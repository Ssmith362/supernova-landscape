import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteCta } from "@/components/QuoteCta";

import { business } from "@/config/site";
import { getGuide, guides } from "@/content/guides";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
} from "@/lib/schema";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return buildMetadata({
    title: guide.metaTitle,
    description: guide.description,
    path: `/resources/${guide.slug}`,
  });
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources" },
    { name: guide.title, href: `/resources/${guide.slug}` },
  ];

  const relatedServices = guide.relatedServiceSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const otherGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  const schemaNodes = [
    breadcrumbSchema(crumbs),
    articleSchema({
      headline: guide.title,
      description: guide.description,
      path: `/resources/${guide.slug}`,
      datePublished: guide.updated,
      dateModified: guide.updated,
    }),
  ];
  if (guide.faqs?.length) schemaNodes.push(faqSchema(guide.faqs));

  return (
    <>
      <JsonLd data={graph(...schemaNodes)} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Spokane guide"
        title={guide.title}
        lede={guide.standfirst}
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
            <article>
              <p className="border-b border-sage-200 pb-5 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                <time dateTime={guide.updated}>
                  Updated {dateFmt.format(new Date(guide.updated))}
                </time>
                <span aria-hidden="true"> · </span>
                {guide.readingMinutes} min read
              </p>

              {guide.sections.map((sec) => (
                <section key={sec.heading} className="mt-10 first:mt-8">
                  <h2 className="font-display text-[1.55rem] font-semibold leading-snug text-ink">
                    {sec.heading}
                  </h2>
                  <div className="prose-supernova mt-4">
                    {sec.body.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                    {sec.list && (
                      <ul>
                        {sec.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}

              {guide.faqs && guide.faqs.length > 0 && (
                <section className="mt-14">
                  <h2 className="font-display text-[1.55rem] font-semibold text-ink">
                    Questions
                  </h2>
                  <div className="mt-5">
                    <FaqList faqs={guide.faqs} />
                  </div>
                </section>
              )}

              {/* In-article conversion, contextual to the guide's topic */}
              <div className="mt-14 border-t-4 border-gold-500 bg-white p-6 shadow-card sm:p-8">
                <h2 className="font-display text-[1.4rem] font-semibold text-ink">
                  Want us to handle it instead?
                </h2>
                <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
                  Supernova covers all of this across greater Spokane, Spokane
                  Valley and Liberty Lake. Estimates and consultations are free.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <QuoteCta location={`guide_${guide.slug}_inline`} size="lg">
                    Get a Free Quote
                  </QuoteCta>
                  <PhoneLink
                    location={`guide_${guide.slug}_inline`}
                    className="inline-flex min-h-14 items-center justify-center rounded-xs border border-forest-600/40 px-7 text-[1.02rem] font-bold text-forest-700 transition-colors hover:border-forest-600 hover:bg-sage-50"
                  >
                    {business.phone.display}
                  </PhoneLink>
                </div>
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Services in this guide
                </h2>
                <ul className="mt-3 space-y-3">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group block">
                        <span className="block text-[0.95rem] font-semibold text-ink group-hover:text-forest-700">
                          {s.name}
                        </span>
                        <span className="mt-0.5 block text-[0.82rem] leading-snug text-ink-muted">
                          {s.summary}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  More guides
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {otherGuides.map((g) => (
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
                <Link
                  href="/resources"
                  className="mt-4 inline-block text-[0.85rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                >
                  All guides →
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBand location={`guide_${guide.slug}_footer`} />
    </>
  );
}
