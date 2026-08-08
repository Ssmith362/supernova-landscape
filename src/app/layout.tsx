import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SITE_URL, analytics, business } from "@/config/site";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";

/**
 * Fonts are self-hosted variable WOFF2 (latin subset) rather than fetched from
 * Google at build time, so a build never depends on outbound network access —
 * which matters on Hostinger's build step.
 */
const fraunces = localFont({
  src: "../fonts/Fraunces-latin.woff2",
  weight: "300 900",
  style: "normal",
  display: "swap",
  variable: "--font-fraunces",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const archivo = localFont({
  src: "../fonts/Archivo-latin.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Supernova Landscape | Landscaping & Snow Removal in Spokane, WA",
    template: "%s | Supernova Landscape",
  },
  description:
    "Family-owned landscaping, weekly lawn maintenance, irrigation and snow removal for Spokane, Spokane Valley and Liberty Lake. 4.9 stars from 53 Google reviews. Free estimates.",
  applicationName: business.name,
  authors: [{ name: business.legalName }],
  creator: business.legalName,
  publisher: business.legalName,
  formatDetection: { telephone: true, address: false, email: false },
  ...(analytics.searchConsoleVerification
    ? { verification: { google: analytics.searchConsoleVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#04150c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${fraunces.variable} ${archivo.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xs focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-base focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>

        <SiteHeader />

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <SiteFooter />
        <MobileActionBar />

        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Analytics />
      </body>
    </html>
  );
}
