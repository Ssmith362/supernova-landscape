import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteCta } from "@/components/QuoteCta";
import { RatingBadge } from "@/components/RatingBadge";
import { ServiceCard } from "@/components/ServiceCard";

import { business } from "@/config/site";
import { getLocation, locations } from "@/content/locations";
import { getService } from "@/content/services";
import { guides } from "@/content/guides";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};

  return buildMetadata({
    title: loc.title,
    description: loc.description,
    path: `/service-areas/${loc.slug}`,
    image: {
      url: loc.image.src,
      width: loc.image.width,
      height: loc.image.height,
      alt: loc.image.alt,
    },
  });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: loc.cityState, href: `/service-areas/${loc.slug}` },
  ];

  const locServices = loc.serviceSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const otherAreas = locations.filter((l) => l.slug !== loc.slug);

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(crumbs), faqSchema(loc.faqs))}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Service area"
        title={loc.h1}
        lede={loc.intro[0]}
        image={loc.image}
        actions={
          <>
            <QuoteCta location={`area_${loc.slug}_header`} size="lg">
              Get a Free Quote
            </QuoteCta>
            <PhoneLink
              location={`area_${loc.slug}_header`}
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
            <div>
              <div className="prose-supernova">
                {loc.intro.slice(1).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              <h2 className="mt-12 font-display text-[1.7rem] font-semibold text-ink">
                What we run into in {loc.city}
              </h2>

              <div className="mt-6 space-y-10">
                {loc.localNotes.map((note, i) => (
                  <div key={note.heading} className="border-t border-sage-200 pt-6">
                    <span className="font-display text-[0.9rem] font-bold text-forest-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1.5 font-display text-[1.3rem] font-semibold leading-snug text-ink">
                      {note.heading}
                    </h3>
                    <div className="prose-supernova mt-3">
                      {note.body.map((p) => (
                        <p key={p.slice(0, 40)}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14">
                <h2 className="font-display text-[1.7rem] font-semibold text-ink">
                  {loc.city} questions
                </h2>
                <div className="mt-5">
                  <FaqList faqs={loc.faqs} />
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border-t-4 border-gold-500 bg-white p-6 shadow-card">
                <h2 className="font-display text-[1.25rem] font-semibold text-ink">
                  Free estimate in {loc.city}
                </h2>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                  Send us the address and what the property needs. Estimates and
                  consultations are free.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <QuoteCta location={`area_${loc.slug}_sidebar`} size="lg">
                    Get a Free Quote
                  </QuoteCta>
                  <PhoneLink
                    location={`area_${loc.slug}_sidebar`}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xs border border-forest-600/40 px-5 text-[1.02rem] font-bold text-forest-700 transition-colors hover:border-forest-600 hover:bg-sage-50"
                  >
                    {business.phone.display}
                  </PhoneLink>
                </div>
                <RatingBadge
                  showLink={false}
                  className="mt-5 border-t border-sage-100 pt-4"
                />
              </div>

              <div className="mt-6 border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Other areas we serve
                </h2>
                <ul className="mt-3 space-y-2">
                  {otherAreas.map((l) => (
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

              <div className="mt-6 border border-sage-200 bg-white p-6">
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                  Spokane yard guides
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {guides.slice(0, 4).map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/resources/${g.slug}`}
                        className="text-[0.9rem] font-semibold leading-snug text-ink underline-offset-4 hover:text-forest-700 hover:underline"
                      >
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-sage-200 bg-sage-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={`Services in ${loc.city}`}
            title={`What we do most in ${loc.cityState}`}
            lede="Every service is available across the whole service area — these are the ones this part of it asks for most."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locServices.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        location={`area_${loc.slug}_footer`}
        heading={`Get a free estimate in ${loc.city}`}
      />
    </>
  );
}
