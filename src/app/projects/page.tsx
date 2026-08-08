import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectGallery } from "@/components/ProjectGallery";
import { QuoteCta } from "@/components/QuoteCta";

import { beforeAfterProjects, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Before & After Landscaping Projects | Spokane",
  description:
    "Real before-and-after photos of Supernova Landscape jobs across Spokane: yard rebuilds, boulder and stone work, planting beds and patios.",
  path: "/projects",
  image: {
    url: "/images/projects/flagstone-patio-after.jpg",
    width: 1600,
    height: 1200,
    alt: "A flagstone patio set into gravel with a raised planter, installed by Supernova Landscape",
  },
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
];

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Project gallery"
        title="Real yards, real before and afters"
        lede="Every photograph here is Supernova's own work in the Spokane area. No stock imagery — the overgrown ones are what the yard actually looked like when we arrived."
        image={{
          src: "/images/heroes/projects.jpg",
          alt: "A flagstone patio set into gravel with a raised timber planter along the fence, installed by Supernova Landscape",
          width: 2400,
          height: 1000,
        }}
        actions={
          <QuoteCta location="projects_header" size="lg">
            Get a Free Quote
          </QuoteCta>
        }
      />

      {/* Before/after comparisons */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Before and after"
            title="Drag the handle to compare"
            lede="Three yards that had gone past the point of a clean-up. Use the slider, or the arrow keys once it has focus."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {beforeAfterProjects.map((p, i) => (
              <BeforeAfter
                key={p.slug}
                before={p.before!}
                after={p.after}
                label={p.title}
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Full filterable gallery with lightbox */}
      <section className="border-t border-sage-200 bg-sage-50 py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Everything else"
            title="The full gallery"
            lede="Select any photo to open it larger, with a link through to the service it relates to."
          />
          <div className="mt-10">
            <ProjectGallery projects={projects} />
          </div>
        </Container>
      </section>

      {/* Honest note about scope, rather than inventing project details */}
      <section className="py-14 sm:py-20">
        <Container size="prose">
          <div className="border-l-4 border-forest-600 bg-white p-6 sm:p-8">
            <h2 className="font-display text-[1.4rem] font-semibold text-ink">
              Want to know what one of these cost?
            </h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
              We have deliberately not put budgets or timelines against these
              photos, because every one of them depended on the site — what had
              to come out first, access, grade and how much material went in.
              Call and describe your yard and we will tell you honestly whether
              it is a similar job.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <QuoteCta location="projects_scope_note" size="lg">
                Get a Free Quote
              </QuoteCta>
              <Link
                href="/services/landscape-design-installation"
                className="inline-flex min-h-12 items-center text-[0.95rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
              >
                How landscape installs work →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Service cross-links so the gallery feeds the money pages */}
      <section className="border-t border-sage-200 bg-sage-50 py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The work behind the photos"
            title="Services shown in this gallery"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "landscape-design-installation",
              "sod-installation",
              "lawn-maintenance",
              "seasonal-cleanups",
            ].map((slug) => {
              const s = getService(slug)!;
              return (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="group flex h-full flex-col border border-sage-200 bg-white p-5 transition-colors hover:border-forest-600"
                  >
                    <span className="font-display text-[1.05rem] font-semibold text-ink">
                      {s.name}
                    </span>
                    <span className="mt-1.5 flex-1 text-[0.86rem] leading-snug text-ink-muted">
                      {s.summary}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-3 text-forest-600 transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaBand
        location="projects_footer"
        heading="Your yard could be the next one on this page"
        body="Send us the address and a couple of photos if you have them. Estimates and consultations are free."
      />
    </>
  );
}
