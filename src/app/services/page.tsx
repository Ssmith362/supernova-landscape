import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuoteCta } from "@/components/QuoteCta";
import { ServiceCard } from "@/components/ServiceCard";

import { locations } from "@/content/locations";
import { services, servicesByCategory } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Landscaping Services in Spokane, WA | Supernova",
  description:
    "Weekly mowing, irrigation, landscape installation, sod, aeration, clean-ups and snow removal across Spokane, Spokane Valley and Liberty Lake.",
  path: "/services",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

const categoryOrder = ["lawn", "landscape", "irrigation", "snow"] as const;

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Services"
        title="What Supernova does across the Spokane area"
        lede="Nine services covering the whole year — from the first mow in spring to plowing a commercial lot in January. Each one has its own page with what is included, when it should happen, and what it costs you to leave it."
        image={{
          src: "/images/heroes/services.jpg",
          alt: "A wide lawn cut with even mowing stripes on a Spokane-area property maintained by Supernova Landscape",
          width: 2400,
          height: 1000,
        }}
        actions={
          <QuoteCta location="services_hub_header" size="lg">
            Get a Free Quote
          </QuoteCta>
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <SectionHeading
              eyebrow="Where to start"
              title="Grouped by the kind of work"
              lede="If you are not sure which one you need, call and describe the property — it is usually a thirty-second answer."
            />
            <nav aria-label="Services by category">
              <ul className="grid gap-3 sm:grid-cols-2">
                {categoryOrder.map((key) => {
                  const group = servicesByCategory[key];
                  return (
                    <li
                      key={key}
                      className="border border-sage-200 bg-white p-5"
                    >
                      <h2 className="font-display text-[1.1rem] font-semibold text-ink">
                        {group.label}
                      </h2>
                      <p className="mt-1 text-[0.85rem] leading-snug text-ink-muted">
                        {group.blurb}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {group.services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className="text-[0.9rem] font-semibold text-forest-700 underline-offset-4 hover:underline"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      <section className="bg-sage-50 py-16 sm:py-20">
        <Container>
          <h2 className="sr-only">All services</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((s, i) => (
                <li key={s.slug}>
                  <ServiceCard service={s} priority={i < 3} />
                </li>
              ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Where we work"
            title="Every service, in all three service areas"
            lede="Conditions differ between the city, the Valley and Liberty Lake — and so does what a property actually needs."
          />
          <ul className="mt-8 flex flex-wrap gap-3">
            {locations.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/service-areas/${loc.slug}`}
                  className="inline-flex min-h-12 items-center rounded-xs border border-sage-300 bg-white px-5 text-[0.95rem] font-semibold text-ink transition-colors hover:border-forest-600 hover:text-forest-700"
                >
                  {loc.cityState}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand location="services_hub_footer" />
    </>
  );
}
