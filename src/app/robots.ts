import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

/**
 * Staging safety: when NEXT_PUBLIC_SITE_URL is anything other than the
 * production origin, the whole site is disallowed. That makes it impossible to
 * accidentally get a staging build indexed alongside the real one.
 */
const PRODUCTION_ORIGIN = "https://www.supernovalandscape.com";
const isProduction = SITE_URL === PRODUCTION_ORIGIN;

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
