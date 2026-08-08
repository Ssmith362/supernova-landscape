/**
 * Pre-launch crawler. Run against a local server:
 *
 *   npm run build && npm start
 *   node scripts/audit-site.mjs http://localhost:3000
 *
 * Checks, per page: title, meta description, canonical, exactly one H1,
 * heading order, OG/Twitter tags, image alt text, JSON-LD parses, and that
 * every internal link resolves. Exits non-zero if anything fails.
 */
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

const ROUTES = [
  "/",
  "/services",
  "/services/lawn-maintenance",
  "/services/irrigation",
  "/services/landscape-design-installation",
  "/services/sod-installation",
  "/services/aeration-overseeding",
  "/services/dethatching",
  "/services/seasonal-cleanups",
  "/services/residential-snow-removal",
  "/services/commercial-snow-removal",
  "/service-areas",
  "/service-areas/spokane-wa",
  "/service-areas/spokane-valley-wa",
  "/service-areas/liberty-lake-wa",
  "/projects",
  "/reviews",
  "/about",
  "/contact",
  "/get-a-quote",
  "/careers",
  "/resources",
  "/resources/spokane-sprinkler-blowout-timing",
  "/resources/lawn-aeration-overseeding-spokane",
  "/resources/fall-yard-cleanup-spokane",
  "/resources/commercial-snow-removal-planning-spokane",
  "/resources/preparing-your-spokane-lawn-for-winter",
  "/privacy-policy",
];

const failures = [];
const warnings = [];
const seenTitles = new Map();
const seenDescriptions = new Map();
const linkTargets = new Set();

function fail(route, msg) {
  failures.push(`${route}  ${msg}`);
}
function warn(route, msg) {
  warnings.push(`${route}  ${msg}`);
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? m[1] : null;
}

function metaContent(html, matcher) {
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (matcher.test(m[0])) return attr(m[0], "content");
  }
  return null;
}

function decode(s) {
  return (s ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

async function auditPage(route) {
  const url = `${BASE}${route}`;
  const res = await fetch(url, { redirect: "manual" });

  if (res.status !== 200) {
    fail(route, `HTTP ${res.status}`);
    return;
  }
  const html = await res.text();

  // --- title -------------------------------------------------------------
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/i) ?? [])[1]);
  if (!title) fail(route, "missing <title>");
  else {
    if (title.length > 65) warn(route, `title ${title.length} chars: "${title}"`);
    if (seenTitles.has(title))
      fail(route, `duplicate title, also on ${seenTitles.get(title)}`);
    else seenTitles.set(title, route);
  }

  // --- description -------------------------------------------------------
  const desc = decode(metaContent(html, /name="description"/i));
  if (!desc) fail(route, "missing meta description");
  else {
    if (desc.length > 165)
      warn(route, `description ${desc.length} chars (may truncate)`);
    if (desc.length < 70) warn(route, `description only ${desc.length} chars`);
    if (seenDescriptions.has(desc))
      fail(route, `duplicate description, also on ${seenDescriptions.get(desc)}`);
    else seenDescriptions.set(desc, route);
  }

  // --- canonical ---------------------------------------------------------
  const canonTag = (html.match(/<link[^>]*rel="canonical"[^>]*>/i) ?? [])[0];
  const canonical = canonTag ? attr(canonTag, "href") : null;
  if (!canonical) fail(route, "missing canonical");
  else {
    const expected =
      route === "/"
        ? "https://www.supernovalandscape.com"
        : `https://www.supernovalandscape.com${route}`;
    if (canonical !== expected)
      fail(route, `canonical "${canonical}" !== expected "${expected}"`);
  }

  // --- headings ----------------------------------------------------------
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1s.length === 0) fail(route, "no <h1>");
  if (h1s.length > 1) fail(route, `${h1s.length} <h1> elements`);

  // Heading level order: never skip a level going down.
  const levels = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map((m) =>
    Number(m[1]),
  );
  let prev = 0;
  for (const lvl of levels) {
    if (prev && lvl > prev + 1) {
      warn(route, `heading jumps h${prev} -> h${lvl}`);
      break;
    }
    prev = lvl;
  }

  // --- social ------------------------------------------------------------
  for (const [label, re] of [
    ["og:title", /property="og:title"/i],
    ["og:description", /property="og:description"/i],
    ["og:image", /property="og:image"/i],
    ["og:url", /property="og:url"/i],
    ["twitter:card", /name="twitter:card"/i],
    ["twitter:image", /name="twitter:image"/i],
  ]) {
    if (!metaContent(html, re)) fail(route, `missing ${label}`);
  }

  // --- images ------------------------------------------------------------
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const src = attr(tag, "src") ?? "";
    const alt = attr(tag, "alt");
    if (alt === null) fail(route, `<img> with no alt attribute: ${src.slice(0, 70)}`);
    else if (alt.trim() === "" && !/aria-hidden="true"/.test(tag))
      warn(route, `empty alt without aria-hidden: ${src.slice(0, 70)}`);
    else if (alt.trim() && alt.trim().length < 12)
      warn(route, `very short alt "${alt}"`);
  }

  // --- JSON-LD -----------------------------------------------------------
  const ldBlocks = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  if (ldBlocks.length === 0) warn(route, "no JSON-LD");
  for (const [, raw] of ldBlocks) {
    try {
      const parsed = JSON.parse(raw);
      if (!parsed["@context"]) fail(route, "JSON-LD missing @context");
      const nodes = parsed["@graph"] ?? [parsed];
      for (const n of nodes) {
        if (!n["@type"]) fail(route, "JSON-LD node missing @type");
        const s = JSON.stringify(n);
        if (/"(aggregateRating|reviewCount|ratingValue)"/i.test(s))
          fail(route, "self-serving review markup present — not allowed");
        if (/null|undefined/.test(s.replace(/"[^"]*"/g, '""')))
          fail(route, "JSON-LD contains a null/undefined value");
      }
    } catch (e) {
      fail(route, `JSON-LD does not parse: ${e.message}`);
    }
  }

  // --- phone -------------------------------------------------------------
  const telLinks = [...html.matchAll(/href="tel:([^"]+)"/gi)].map((m) => m[1]);
  if (telLinks.length === 0) fail(route, "no tappable tel: link on the page");
  for (const t of telLinks) {
    if (t !== "+15098083130") fail(route, `unexpected tel: target "${t}"`);
  }

  // Any phone number rendered as visible text outside an anchor is a
  // regression of the audit's most expensive finding. Strip <head>, scripts
  // and anchors first — meta descriptions and JSON-LD legitimately contain it.
  const visible = html
    .replace(/<head\b[\s\S]*?<\/head>/gi, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<a\b[\s\S]*?<\/a>/gi, "");
  if (/\(509\)\s*808-3130/.test(visible))
    fail(route, "phone number rendered as text without a tel: link");

  // --- collect internal links -------------------------------------------
  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gi)) {
    const href = m[1];
    if (
      href.startsWith("/") &&
      !href.startsWith("//") &&
      !href.startsWith("/api/")
    ) {
      linkTargets.add(href.split("#")[0] || "/");
    }
    if (href === "#" || href === "") fail(route, "dead placeholder link (href=#)");
  }

  // --- forbidden marketing filler ---------------------------------------
  const body = decode(html.replace(/<[^>]+>/g, " ")).toLowerCase();
  for (const phrase of [
    "transform your outdoor",
    "dream landscape",
    "we've got you covered",
    "we’ve got you covered",
    "elevate your property",
    "breathtaking",
    "tailored solutions",
    "quality you can trust",
    "lorem ipsum",
  ]) {
    if (body.includes(phrase)) fail(route, `banned phrase: "${phrase}"`);
  }
}

async function checkLinks() {
  const results = [];
  for (const href of [...linkTargets].sort()) {
    const res = await fetch(`${BASE}${href}`, { redirect: "manual" });
    const ok = res.status === 200 || (res.status >= 300 && res.status < 400);
    if (!ok) results.push(`${href} -> HTTP ${res.status}`);
  }
  return results;
}

async function checkInfra() {
  const out = [];

  const sm = await fetch(`${BASE}/sitemap.xml`);
  if (sm.status !== 200) out.push(`sitemap.xml HTTP ${sm.status}`);
  else {
    const xml = await sm.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const r of ROUTES) {
      const expected =
        r === "/"
          ? "https://www.supernovalandscape.com"
          : `https://www.supernovalandscape.com${r}`;
      if (!locs.includes(expected)) out.push(`sitemap missing ${r}`);
    }
    if (new Set(locs).size !== locs.length) out.push("sitemap has duplicate URLs");
    for (const l of locs) {
      if (/\/our-services|\/about-us|\/contact-us/.test(l))
        out.push(`sitemap lists a redirecting legacy URL: ${l}`);
    }
    console.log(`  sitemap.xml: ${locs.length} URLs`);
  }

  const rb = await fetch(`${BASE}/robots.txt`);
  if (rb.status !== 200) out.push(`robots.txt HTTP ${rb.status}`);
  else {
    const txt = await rb.text();
    if (!txt.includes("Sitemap:")) out.push("robots.txt has no Sitemap line");
    if (!/Disallow: \/api\//.test(txt)) out.push("robots.txt does not disallow /api/");
    if (/^Disallow: \/$/m.test(txt))
      out.push("robots.txt disallows everything — is NEXT_PUBLIC_SITE_URL set?");
  }

  // Legacy Webflow URLs must 308 to their new homes.
  for (const [from, to] of [
    ["/our-services", "/services"],
    ["/about-us", "/about"],
  ]) {
    const res = await fetch(`${BASE}${from}`, { redirect: "manual" });
    if (res.status !== 308 && res.status !== 301)
      out.push(`${from} did not redirect (HTTP ${res.status})`);
    else if (!(res.headers.get("location") ?? "").endsWith(to))
      out.push(`${from} redirects to ${res.headers.get("location")}, expected ${to}`);
  }

  const nf = await fetch(`${BASE}/this-page-does-not-exist`);
  if (nf.status !== 404) out.push(`404 page returned HTTP ${nf.status}`);

  return out;
}

async function main() {
  console.log(`Auditing ${BASE}\n`);

  for (const route of ROUTES) {
    process.stdout.write(`  ${route} … `);
    try {
      await auditPage(route);
      console.log("done");
    } catch (e) {
      console.log("ERROR");
      fail(route, `crawl threw: ${e.message}`);
    }
  }

  console.log(`\nChecking ${linkTargets.size} unique internal link targets …`);
  const badLinks = await checkLinks();
  badLinks.forEach((l) => failures.push(`LINK  ${l}`));

  console.log("Checking sitemap, robots, redirects and 404 …");
  const infra = await checkInfra();
  infra.forEach((i) => failures.push(`INFRA  ${i}`));

  console.log("\n" + "=".repeat(72));
  if (warnings.length) {
    console.log(`\nWARNINGS (${warnings.length}):`);
    warnings.forEach((w) => console.log(`  ! ${w}`));
  }
  if (failures.length) {
    console.log(`\nFAILURES (${failures.length}):`);
    failures.forEach((f) => console.log(`  x ${f}`));
    process.exitCode = 1;
  } else {
    console.log(`\nPASS — ${ROUTES.length} pages, no failures.`);
  }
}

main();
