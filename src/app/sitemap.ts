import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { guides } from "@/content/guides";

/**
 * Every indexable URL, once each, on the production origin.
 *
 * Excluded deliberately: /api/*, and anything marked noIndex. Redirecting
 * legacy paths (/our-services, /about-us) are NOT listed — a sitemap should
 * only contain canonical destinations.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/service-areas", priority: 0.8, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.8, changeFrequency: "weekly" },
    { path: "/get-a-quote", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.6, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticPages.map((p) => ({
      // Root is the bare origin, matching the canonical tag exactly.
      url: p.path === "/" ? SITE_URL : `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: s.featured ? 0.9 : 0.8,
    })),
    ...locations.map((l) => ({
      url: `${SITE_URL}/service-areas/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...guides.map((g) => ({
      url: `${SITE_URL}/resources/${g.slug}`,
      lastModified: new Date(g.updated),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
