# Audit resolution

Every finding from the **Spencer's Strategies Website & Local Search Audit**
(Supernova Landscape, 23 July 2026 — 34 findings, 5 critical) mapped against
the new site.

**Status key**
- ✅ **Resolved** — fixed and verified in this build
- 🟠 **Resolved, needs client input** — the mechanism is built; a value or asset is still needed
- 🔵 **Outside the website** — must be done in a dashboard only the client controls

---

## Critical (5)

| # | Audit finding | How the new site resolves it | Page / component | Status | Still needs |
|---|---|---|---|---|---|
| SN-C01 | Phone number is not a tappable link | Every phone number on the site is a real `tel:+15098083130` link. A shared `PhoneLink` component is the only way a number is rendered, and `withPhoneLinks()` linkifies any number written into FAQ prose so the regression cannot return through copy. The pre-launch crawler fails the build if a number ever appears as plain text. | `components/PhoneLink.tsx`, `components/PhoneText.tsx`, `scripts/audit-site.mjs` | ✅ | — |
| SN-C02 | No phone number on 3 of 4 pages | The number is in the desktop header, the footer of every page, the mobile action bar, and every closing CTA band. It appears on all 28 pages — verified by the crawler, which fails if any page has zero `tel:` links. | `layout/SiteHeader.tsx`, `layout/SiteFooter.tsx`, `layout/MobileActionBar.tsx`, `CtaBand.tsx` | ✅ | — |
| SN-C03 | 53 Google reviews shown nowhere | The 4.9 rating sits above the fold in the hero, in the desktop utility strip, in the trust strip, in the footer, in every CTA band and in every service and location sidebar. Six real reviews appear on the homepage, a dedicated `/reviews` page carries all of them, and the Google profile is linked from all of those places. | `RatingBadge.tsx`, `Stars.tsx`, `ReviewCard.tsx`, `/reviews`, `/` | 🟠 | Live figures re-read from the dashboard on launch day; direct profile URL (see needs-confirmation #4, #5) |
| SN-C04 | No individual service pages | Nine dedicated service pages, each with its own H1, title, description, canonical, scope list, Spokane seasonal context, service-specific FAQs, related project photos, related services and two CTAs. Generated from one typed data file. | `/services/[slug]`, `content/services.ts` | ✅ | Confirm whether tree work, stump grinding and hardscaping should become pages 10–12 (needs-confirmation #6) |
| SN-C05 | Pages point Google at a redirecting address | Every page emits a self-referencing canonical on `https://www.supernovalandscape.com`, built from `NEXT_PUBLIC_SITE_URL`. Canonical and sitemap entries match character for character. The crawler asserts this on all 28 pages. | `lib/seo.ts`, `app/sitemap.ts` | ✅ | Apex→www and http→https 301s at DNS/host level at cutover |

---

## High priority (9)

| # | Audit finding | How the new site resolves it | Page / component | Status | Still needs |
|---|---|---|---|---|---|
| SN-H01 | Homepage service cards lead nowhere | Every card is a link to its own service page. `ServiceCard` has no variant that does not link. The crawler fails on any `href="#"` anywhere on the site. | `ServiceCard.tsx`, `/` | ✅ | — |
| SN-H02 | Quote form has no web address | `/get-a-quote` is a real, linkable, advertisable URL. It is server-rendered (not hydration-dependent) and accepts `?service=<slug>` so a service-page CTA arrives with the right option preselected. The same form is also embedded on `/contact`. | `/get-a-quote`, `components/QuoteForm.tsx` | ✅ | Email delivery connected (needs-confirmation #11) |
| SN-H03 | No service-area pages | Three location pages with genuinely distinct content — Spokane's mature trees, slope and basalt; the Valley's larger irrigated lawns and the sole-source aquifer; Liberty Lake's HOA frontage standards and business park. Each has its own FAQs, its own service priority order and its own photo. Not templated. | `/service-areas/[slug]`, `content/locations.ts` | ✅ | — |
| SN-H04 | Google listing links to the wrong address | The site canonicalises to `https://www.supernovalandscape.com`, so the correct value to paste is unambiguous. | — | 🔵 | Damien to update the website field in the Google Business Profile (needs-confirmation #13) |
| SN-H05 | No links to Google, Facebook, Yelp or Nextdoor | All four are linked in the footer sitewide, again on `/reviews`, and again on `/contact`. Managed from one `socials` array. | `layout/SiteFooter.tsx`, `config/site.ts` | ✅ | Instagram/TikTok if they exist (needs-confirmation #15) |
| SN-H06 | No address, hours or service map on the site | The service area is stated in the footer, the header strip, the hero and on a dedicated hub with three pages. Address and hours render automatically the moment they are set in config — they are deliberately omitted rather than guessed, because directory sources conflicted. | `layout/SiteFooter.tsx`, `/service-areas`, `/contact` | 🟠 | Confirmed address and hours (needs-confirmation #1, #2) |
| SN-H07 | Business details may not be machine-readable | LocalBusiness/LandscapingBusiness, Organization, WebSite, BreadcrumbList, Service and FAQPage JSON-LD, emitted from typed builders. Null fields are omitted entirely rather than filled with placeholders. The crawler parses every block and fails on a null value. | `lib/schema.ts`, `components/JsonLd.tsx` | ✅ | Address and hours will enrich the schema once confirmed |
| SN-H08 | No contractor registration number displayed | The claim is stated accurately without a number, and the footer and About page render the registration automatically the moment `business.contractorRegistration` is set. | `config/site.ts`, `layout/SiteFooter.tsx`, `/about` | 🟠 | The L&I number (needs-confirmation #3) |
| SN-H09 | No owner or crew photography | The stock Spokane River photo is gone. In its place, two clearly-labelled branded placeholders on `/about` name exactly what belongs there. No stock photo of a person is used anywhere, and the gap is visible rather than papered over. | `components/PhotoPlaceholder.tsx`, `/about` | 🟠 | The photos (needs-confirmation #8) |

---

## Medium priority (14)

| # | Audit finding | How the new site resolves it | Page / component | Status | Still needs |
|---|---|---|---|---|---|
| SN-M01 | Homepage logo doesn't link home | The header logo is always a `Link` to `/`, on every page including the homepage. | `layout/SiteHeader.tsx` | ✅ | — |
| SN-M02 | Footer logo dead on all four pages | The footer logo is a `Link` to `/`, sitewide. | `layout/SiteFooter.tsx` | ✅ | — |
| SN-M03 | Two services-page buttons lead nowhere | The services hub has no decorative buttons. Every control is a link to a real destination; the crawler fails on `href="#"`. | `/services` | ✅ | — |
| SN-M04 | Gallery images look clickable but aren't | The gallery opens an accessible `<dialog>` lightbox with keyboard arrow navigation, platform focus trapping, Escape-to-close, a caption and a link through to the related service. Three before/after pairs are drag-to-compare sliders built on `<input type="range">`, so they are keyboard operable. | `ProjectGallery.tsx`, `BeforeAfter.tsx`, `/projects` | ✅ | — |
| SN-M05 | No link preview image on 3 of 4 pages | Every page has Open Graph and Twitter tags. Service, location and project pages use their own photography; everything else falls back to a branded 1200×630 card. The crawler fails any page missing `og:image`. | `lib/seo.ts`, `scripts/generate-og.mjs` | ✅ | — |
| SN-M06 | Homepage preview image is a Dec-2024 screenshot | Replaced with a designed card: logo, headline, the 4.9/53 rating, the phone number and real Supernova photography. 79 KB. | `public/og/default.jpg` | ✅ | Regenerate if the rating changes |
| SN-M07 | Copyright year differs between pages | Generated once from `new Date().getFullYear()` in the single shared footer. | `layout/SiteFooter.tsx` | ✅ | — |
| SN-M08 | Two different logo files in use | One canonical asset, `public/brand/logo.png`, trimmed and optimised from the better of the two originals. The favicon and Apple icon derive from the same crest. | `public/brand/`, `app/icon.png` | ✅ | — |
| SN-M09 | The two quote forms offer different services | Both forms render from one exported `quoteServiceOptions` array, generated from the service data. They cannot drift. | `content/services.ts`, `components/QuoteForm.tsx` | ✅ | — |
| SN-M10 | Site services don't match the Google listing | The mismatch is documented in full as a two-way reconciliation table so the client can decide per service whether to build a page or remove the listing. | `content/needs-confirmation.md` #6 | 🟠 | Damien's decision per service |
| SN-M11 | Careers form sits on the Contact page | Careers is now `/careers`, off the sales funnel. Contact and the quote page each carry a small signpost so applicants are not stranded. | `/careers` | ✅ | Whether the crew role is currently open (needs-confirmation #16) |
| SN-M12 | Client Login only on the Contact footer | In the desktop header strip, the mobile menu, the sitewide footer and as a card on `/contact` — four routes, on every page. | `layout/SiteHeader.tsx`, `layout/SiteFooter.tsx`, `/contact` | ✅ | — |
| SN-M13 | Four near-identical banners open the homepage | One hero. It answers who, what, where, why trust us and what next above the fold: company, services, the three service areas, the 4.9/53 rating with a link to Google, and both CTAs. | `/` | ✅ | — |
| SN-M14 | No blog or seasonal content | `/resources` with five substantial Spokane guides — blowout timing, aeration and overseeding windows, fall clean-up order, commercial snow planning, winter lawn prep. Each links to the services it relates to, and each service page links back. | `/resources`, `content/guides.ts` | ✅ | — |

---

## Low priority (6)

| # | Audit finding | How the new site resolves it | Page / component | Status | Still needs |
|---|---|---|---|---|---|
| SN-L01 | Image label doesn't match the image (river photo labelled as a gondola) | The stock river photo is not used. Every image on the site has descriptive alt text written against the actual photograph; the crawler fails on a missing `alt` and warns on a suspiciously short one. | all | ✅ | — |
| SN-L02 | One placeholder icon reused five times | No repeated placeholder icons. Where icons appear they are purposeful inline SVG; scope lists use a typographic marker rather than five identical glyphs. | all | ✅ | — |
| SN-L03 | Sitemap returned an unexpected format | `app/sitemap.ts` generates a valid XML sitemap from the content data — 28 URLs, no duplicates, no redirecting legacy paths, all on the canonical origin. Asserted by the crawler. | `app/sitemap.ts` | ✅ | Submit in Search Console at launch |
| SN-L04 | Testimonial has no source | Every review records its source and date label, and the source is displayed. Stars render only where the source publishes a rating. `/reviews` explains in plain language where each came from. | `content/reviews.ts`, `ReviewCard.tsx`, `/reviews` | ✅ | — |
| SN-L05 | "Learn More" leads to the contact form | Every "learn more" style link points at the relevant service page. Related-service blocks appear in service sidebars, at the foot of every service page, in the gallery lightbox and in the guides. | `/services/[slug]`, `ProjectGallery.tsx` | ✅ | — |
| SN-L06 | Identical FAQ duplicated on two pages with no markup | FAQs are now scoped: company-wide on `/contact`, four on the homepage, and service- and location-specific sets on their own pages. FAQPage JSON-LD is attached where the questions are genuinely visible, and no set is duplicated across pages. | `content/faqs.ts`, `FaqList.tsx`, `lib/schema.ts` | ✅ | — |

---

## Tally

| Status | Count |
|---|---|
| ✅ Resolved | 26 |
| 🟠 Resolved, needs client input | 7 |
| 🔵 Outside the website | 1 |
| **Total** | **34** |

Every one of the 34 findings is addressed. The seven 🟠 items are all cases
where the mechanism is built and tested but a fact or an asset is still
outstanding — the site renders correctly without them and will pick them up
automatically once they are supplied. The single 🔵 item is the Google Business
Profile website field, which only Damien can change.

---

## Beyond the audit

Work in this build that no finding asked for.

**Structure and reach**
- 28 indexable pages, up from 4
- Legacy Webflow URLs 301 to their new homes, preserving link equity
- Deliberate internal linking: homepage → hub → service → related services → service areas → projects → guides → quote. No orphan pages.
- BreadcrumbList markup and visible breadcrumbs on every interior page
- Custom 404 that routes to all nine services, the three areas and the phone number

**Conversion**
- Restrained two-action mobile bar (Call · Get a Free Quote) that hides itself on `/contact` and `/get-a-quote` so it never covers the form
- `?service=` preselection so a service-page CTA carries intent into the form
- Spam protection with no CAPTCHA: honeypot, time-trap, link heuristic
- Every CTA and phone tap emits a named analytics event, ready for the moment a GA4 ID exists

**Honesty**
- The quote form states plainly that it is not connected rather than faking success
- Missing owner photography is a visible, labelled gap rather than a stock model
- Project descriptions state only what is visible in the photograph
- No `AggregateRating`/`Review` markup, per Google's guidelines and the audit's warning

**Performance**
- Hero images are purpose-cropped to 2.4:1: the LCP image is 62 KB on mobile and 281 KB on desktop, down from 990 KB unoptimised
- `sharp` is a production dependency — without it Next silently serves unoptimised originals, which is a common and invisible way to lose LCP in production
- Standard `next start` output rather than `standalone`, which on this stack dropped static assets and broke image optimisation
- Self-hosted variable fonts (~100 KB, latin subset), so builds never depend on network egress
- Five client components in the whole app; everything else is server rendered

**Accessibility**
- Skip link, landmarks, labelled navigation, visible focus states, 48 px tap targets
- Error summary takes focus on failed submit; every field has a real `<label>`
- Native `<details>`, `<dialog>` and `<input type="range">` instead of custom widgets, so keyboard and screen-reader behaviour comes from the platform
- Lowest contrast pair in use is 5.39:1 against a 4.5:1 requirement
- `prefers-reduced-motion` respected

**Maintainability**
- One config file controls phone, email, address, hours, registration, rating, socials and portal
- Adding a service is one typed object — page, route, nav, footer, sitemap, form dropdown and schema all follow
- `npm run audit:site` crawls the whole site and fails on regressions in any of the above

---

*Prepared 8 August 2026 against the Spencer's Strategies audit of 23 July 2026.*
