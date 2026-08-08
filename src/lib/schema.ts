import { SITE_URL, business, reputation, socials } from "@/config/site";
import { absoluteUrl } from "./seo";
import type { Faq } from "@/content/types";

/**
 * JSON-LD builders.
 *
 * Rules followed here:
 *  - Only facts that are visible on the page and verified in src/config/site.ts.
 *  - Nullable fields (address, hours, registration) are omitted entirely rather
 *    than filled with placeholders.
 *  - NO AggregateRating / Review markup. Google disallows self-serving review
 *    markup for a business about itself, and the audit specifically warned
 *    against chasing stars in the SERP with non-compliant markup.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type Json = Record<string, unknown>;

function compact(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined),
  );
}

export function organizationSchema(): Json {
  return compact({
    "@type": ["LocalBusiness", "LandscapingBusiness"],
    "@id": ORG_ID,
    name: business.name,
    legalName: business.legalName,
    url: `${SITE_URL}/`,
    telephone: business.phone.e164,
    email: business.email,
    description:
      "Family-owned landscaping, lawn maintenance, irrigation and snow removal company serving greater Spokane, Spokane Valley and Liberty Lake, Washington.",
    slogan: business.tagline,
    founder: { "@type": "Person", name: business.founder },
    priceRange: business.priceRange,
    image: `${SITE_URL}/brand/logo.png`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/logo.png`,
      width: 900,
      height: 495,
    },
    // Only emitted once Damien confirms the address (see site.ts).
    address: business.address
      ? {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.city,
          addressRegion: business.address.region,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        }
      : undefined,
    // Only emitted once hours are confirmed (see site.ts).
    openingHoursSpecification: business.hours
      ? business.hours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        }))
      : undefined,
    areaServed: [
      { "@type": "City", name: "Spokane", addressRegion: "WA" },
      { "@type": "City", name: "Spokane Valley", addressRegion: "WA" },
      { "@type": "City", name: "Liberty Lake", addressRegion: "WA" },
    ],
    sameAs: [...socials.map((s) => s.url), reputation.googleProfileUrl],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phone.e164,
      contactType: "customer service",
      email: business.email,
      areaServed: "US-WA",
      availableLanguage: "English",
    },
  });
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: business.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; href: string }[],
): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.name,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Spokane", addressRegion: "WA" },
      { "@type": "City", name: "Spokane Valley", addressRegion: "WA" },
      { "@type": "City", name: "Liberty Lake", addressRegion: "WA" },
    ],
  };
}

/**
 * FAQPage markup. Only ever attached to pages where the questions and answers
 * are genuinely visible to the visitor, and never duplicated across pages —
 * the old site had the same five questions on two pages.
 */
export function faqSchema(faqs: Faq[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}): Json {
  return {
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** Wraps one or more node objects into a single @graph document. */
export function graph(...nodes: Json[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}
