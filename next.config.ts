import type { NextConfig } from "next";

/**
 * Standard Next.js server output, started with `next start`.
 *
 * Deliberately NOT `output: "standalone"`. Standalone is designed for
 * copy-the-bundle deployments (Docker), and it traded away two things we need
 * on a Hostinger git deploy:
 *   1. It does not copy `public/` or `.next/static/`, so every asset 404s
 *      unless a postbuild step patches it up.
 *   2. Its dependency tracing does not reliably carry sharp's platform-native
 *      binaries, and when sharp fails to load Next silently serves the
 *      unoptimised original — a 1 MB hero image instead of a 90 KB one.
 * Hostinger runs `npm install` then `npm run build` in the repo itself, so the
 * full node_modules is present and plain `next start` is both simpler and
 * more reliable. Nothing here is Vercel-specific.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // All imagery is local, so no remote patterns are needed.
    // WebP only: AVIF encodes several times slower per image, which is a poor
    // trade on shared hosting for a marginal size gain on photography.
    formats: ["image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    // Next 16 rejects any quality not listed here. 65 is used for full-bleed
    // hero art that sits behind a dark scrim, where the detail is not visible
    // and the byte saving goes straight into LCP.
    qualities: [65, 75],
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    // The live Webflow site uses these paths. Preserve their link equity.
    return [
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/quote", destination: "/get-a-quote", permanent: true },
      { source: "/free-quote", destination: "/get-a-quote", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
