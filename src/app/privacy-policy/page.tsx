import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { business } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Supernova Landscape",
  description:
    "How Supernova Landscape Company LLC handles information submitted through this website.",
  path: "/privacy-policy",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

/**
 * Plain-language policy describing only what this site actually does.
 *
 * NOTE FOR LAUNCH: if analytics is switched on, or the quote form is connected
 * to an email provider or CRM, this page must be reviewed so it still matches
 * reality. See content/needs-confirmation.md #12.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Legal"
        title="Privacy policy"
        lede="What happens to information you send us through this website."
      />

      <section className="py-14 sm:py-20">
        <Container size="prose">
          <div className="prose-supernova">
            <h2>Who we are</h2>
            <p>
              This website is operated by {business.legalName}, a landscaping
              company serving greater Spokane, Spokane Valley and Liberty Lake,
              Washington. You can reach us on{" "}
              <a href={business.phone.href}>{business.phone.display}</a> or at{" "}
              <a href={`mailto:${business.email}`}>{business.email}</a>.
            </p>

            <h2>What we collect</h2>
            <p>
              The only information this site asks for is what you type into the
              quote request form: your name, phone number, email address,
              optionally the property address, the service you are interested
              in, how you heard about us, and whatever you write in the message
              field.
            </p>
            <p>
              We do not ask for payment details anywhere on this site, and there
              is no account to create.
            </p>

            <h2>What we do with it</h2>
            <p>
              We use it to respond to your request — to contact you about the
              work, arrange a visit and provide an estimate. We do not sell it,
              rent it or pass it to anyone for marketing purposes.
            </p>

            <h2>Analytics</h2>
            <p>
              This site is built to support Google Analytics, but analytics only
              runs when a measurement ID has been configured. If it is active,
              it records aggregate usage — pages viewed, roughly where visitors
              came from, and which buttons get used — to help us understand what
              is useful. It is not used to identify individual people.
            </p>

            <h2>Links to other sites</h2>
            <p>
              We link out to our Google, Facebook, Yelp and Nextdoor profiles,
              and to our customer portal. Those services have their own privacy
              policies, and this one does not cover them.
            </p>

            <h2>Getting your information removed</h2>
            <p>
              If you have sent us a request and would like the details deleted,
              email{" "}
              <a href={`mailto:${business.email}`}>{business.email}</a> and we
              will remove them.
            </p>

            <h2>Changes</h2>
            <p>
              If how we handle information changes, this page will be updated to
              match.
            </p>
          </div>

          <p className="mt-10 border-t border-sage-200 pt-6 text-[0.92rem] text-ink-muted">
            Questions about any of this?{" "}
            <Link
              href="/contact"
              className="font-semibold text-forest-700 underline underline-offset-4"
            >
              Get in touch
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
