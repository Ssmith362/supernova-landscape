import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * TEMPORARY — demo gate. Delete this file (or the branch it lives on) when the
 * walkthrough is over.
 *
 * Exists so a client can be shown the finished homepage without wandering into
 * the pages that are not ready yet. Everything except `/` is answered with a
 * holding page rather than a hard 404: a browser's default "can't be reached"
 * screen reads as a broken build, which is the opposite of the impression a
 * demo is meant to leave.
 *
 * This must never reach production. `main` deploys straight to the client's
 * site, so this file only ever belongs on a preview branch.
 */

/** Paths that stay reachable. Everything else gets the holding page. */
const ALLOWED = new Set([
  "/",
  // The homepage quote form posts here — without it the primary CTA fails
  // mid-demo, which is the one interaction most worth showing off.
  "/api/quote",
]);

const HOLDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>In progress — Supernova Landscape</title>
<style>
  :root { color-scheme: dark; }
  body {
    margin: 0; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0b1710; color: #e8e4d9;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    text-align: center; padding: 2rem;
  }
  main { max-width: 32rem; }
  p.eyebrow {
    margin: 0 0 1rem; font-size: .75rem; letter-spacing: .18em;
    text-transform: uppercase; color: #9aab9c;
  }
  h1 { margin: 0 0 1rem; font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 600; line-height: 1.15; }
  p.body { margin: 0 0 2rem; color: #b9c4b6; line-height: 1.6; }
  a {
    display: inline-block; padding: .8rem 1.6rem; border-radius: 999px;
    background: #e8e4d9; color: #0b1710; text-decoration: none; font-weight: 600;
  }
  a:hover { background: #fff; }
</style>
</head>
<body>
  <main>
    <p class="eyebrow">Preview build</p>
    <h1>This page is still being built</h1>
    <p class="body">Only the homepage is part of this preview. The rest of the site is in progress and will be ready for review shortly.</p>
    <a href="/">Back to the homepage</a>
  </main>
</body>
</html>`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (ALLOWED.has(pathname)) {
    return NextResponse.next();
  }

  // 404 rather than 200: the holding page is a stand-in for something that does
  // not exist yet, and a preview that returns 200 for every URL is the kind of
  // thing that quietly poisons a later crawl.
  return new NextResponse(HOLDING_PAGE, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export const config = {
  /**
   * Static assets are excluded in the matcher rather than in ALLOWED — the
   * homepage pulls fonts, photography and JS chunks from these paths, and
   * gating them would leave the demo unstyled.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|images/|brand/|og/|fonts/).*)",
  ],
};
