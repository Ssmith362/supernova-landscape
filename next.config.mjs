/**
 * Plain .mjs, deliberately — NOT next.config.ts.
 *
 * Next has to transpile a TypeScript config with SWC before it can read it.
 * On Hostinger's build image the native SWC binary will not load, Next falls
 * back to the WASM build, and that fallback fails to resolve the compiled
 * config, killing the build before it starts:
 *
 *   Failed to load next.config.ts
 *   Cannot find module '.../<hash>.next.config'
 *
 * A .mjs config is read directly with no compile step, so it cannot fail that
 * way. The JSDoc type annotation keeps editor autocomplete and type checking.
 *
 * Output is the standard Next server, started with `next start`. Deliberately
 * NOT `output: "standalone"` — standalone is built for copy-the-bundle
 * (Docker) deployments and on this stack it does not copy `public/` or
 * `.next/static/`, and its dependency tracing does not reliably carry sharp's
 * native binaries. When sharp fails to load, Next silently serves the
 * unoptimised original: a 990 KB hero instead of 62 KB, with nothing in the
 * logs. Hostinger installs and builds in the repo itself, so the full
 * node_modules is present and plain `next start` is simpler and more reliable.
 * Nothing here is Vercel-specific.
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
