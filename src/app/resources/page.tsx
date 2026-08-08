import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";

import { guides } from "@/content/guides";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Spokane Yard & Lawn Care Guides | Supernova",
  description:
    "Practical timing guides for Spokane yards: sprinkler blow-outs, aeration windows, fall clean-up order, winter lawn prep and commercial snow planning.",
  path: "/resources",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
];

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Resources"
        title="Spokane yard guides"
        lede="Landscaping here runs on narrow seasonal windows. These are the ones that cost real money to miss — written to be useful whether you hire us or do it yourself."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <article className="flex h-full flex-col border border-sage-200 bg-white p-6 transition-shadow hover:shadow-lift sm:p-8">
                  <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                    {g.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 font-display text-[1.45rem] font-semibold leading-snug text-ink">
                    <Link
                      href={`/resources/${g.slug}`}
                      className="underline-offset-4 hover:text-forest-700 hover:underline"
                    >
                      {g.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">
                    {g.standfirst}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-sage-100 pt-4">
                    {g.relatedServiceSlugs.slice(0, 3).map((slug) => {
                      const s = getService(slug);
                      if (!s) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/services/${slug}`}
                          className="text-[0.8rem] font-semibold text-ink-muted underline-offset-4 hover:text-forest-700 hover:underline"
                        >
                          {s.name}
                        </Link>
                      );
                    })}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-sage-200 bg-sage-50 py-14 sm:py-20">
        <Container size="prose">
          <SectionHeading
            eyebrow="Why only five"
            title="These will grow, slowly"
            lede="We would rather publish five guides worth reading than fifty written to fill a page. New ones get added when there is something genuinely useful to say about a Spokane season."
          />
        </Container>
      </section>

      <CtaBand location="resources_footer" />
    </>
  );
}
