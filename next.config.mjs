/**
 * Plain .mjs rather than next.config.ts.
 *
 * This started as a hard requirement of the previous host, whose build image
 * could not load the native SWC binary needed to transpile a TypeScript
 * config. That no longer applies on Vercel, where either format works — the
 * file stays .mjs because it works and churning it buys nothing. The JSDoc
 * type annotation keeps editor autocomplete and type checking regardless.
 *
 * NO `output` KEY, deliberately. Vercel's Next.js preset handles the build
 * output itself, and setting `output: "standalone"` here would opt out of that
 * in favour of a copy-the-bundle layout meant for Docker — which does not copy
 * `public/` or `.next/static/`, and whose dependency tracing does not reliably
 * carry sharp's native binaries. A sharp that fails to load is silent: Next
 * just serves the unoptimised original, a 990 KB hero instead of 62 KB, with
 * nothing in the logs. Leave this key absent.
 *
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // All imagery is local, so no remote patterns are needed.
    // WebP only: AVIF encodes several times slower per image, which is a poor
    // trade on shared hosting for a marginal size gain on photography.
    formats: ["image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    // Any quality used by a next/image call must be listed here. 65 is used
    // for full-bleed hero art sitting behind a dark scrim, where the detail is
    // not visible and the byte saving goes straight into LCP.
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
