import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteCta } from "@/components/QuoteCta";

import { business } from "@/config/site";
import { locations } from "@/content/locations";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Service Areas | Spokane, Valley & Liberty Lake",
  description:
    "Supernova Landscape serves greater Spokane, Spokane Valley and Liberty Lake with lawn maintenance, irrigation, landscape installation and snow removal.",
  path: "/service-areas",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Service Areas", href: "/service-areas" },
];

export default function ServiceAreasHubPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Service areas"
        title="Where Supernova works"
        lede="Greater Spokane, Spokane Valley and Liberty Lake. Three areas that look similar on a map and behave very differently in a yard — different housing stock, different soil, different irrigation, different winter."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <ul className="space-y-8">
            {locations.map((loc) => (
              <li key={loc.slug}>
                <article className="grid gap-8 border border-sage-200 bg-white p-6 sm:p-8 lg:grid-cols-[22rem_1fr] lg:gap-10">
                  <div className="relative aspect-4/3 overflow-hidden bg-sage-100 lg:aspect-auto lg:min-h-64">
                    <Image
                      src={loc.image.src}
                      alt={loc.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 22rem"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="font-display text-[1.65rem] font-semibold leading-tight text-ink">
                      <Link
                        href={`/service-areas/${loc.slug}`}
                        className="underline-offset-4 hover:text-forest-700 hover:underline"
                      >
                        {loc.cityState}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
                      {loc.intro[0]}
                    </p>

                    <h3 className="mt-6 font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                      Most requested here
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {loc.serviceSlugs.slice(0, 5).map((slug) => {
                        const svc = getService(slug);
                        if (!svc) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/services/${slug}`}
                              className="inline-flex min-h-10 items-center rounded-xs border border-sage-300 px-3.5 text-[0.85rem] font-semibold text-ink-soft transition-colors hover:border-forest-600 hover:text-forest-700"
                            >
                              {svc.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-6">
                      <Link
                        href={`/service-areas/${loc.slug}`}
                        className="inline-flex items-center gap-1.5 text-[0.9rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                      >
                        What we do in {loc.city}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-sage-200 bg-sage-50 py-16 sm:py-20">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
            <SectionHeading
              eyebrow="Not sure?"
              title="If your address is near the edge, just ask"
              lede="Our routes are built around geography, so whether we can take on a property depends on where it sits relative to the rest of the route. It is a quick answer either way — we would rather tell you honestly than take a job we cannot service well."
            />
            <div className="flex flex-col gap-3">
              <PhoneLink
                location="service_areas_hub"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xs bg-forest-600 px-7 text-[1.05rem] font-bold text-white transition-colors hover:bg-forest-500"
              >
                Call {business.phone.display}
              </PhoneLink>
              <QuoteCta
                location="service_areas_hub"
                variant="ghost"
                size="lg"
              >
                Send us the address
              </QuoteCta>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand location="service_areas_hub_footer" />
    </>
  );
}
