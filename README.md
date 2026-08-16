# Supernova Landscape — website

Production website for **Supernova Landscape Company LLC**, Spokane WA.

Next.js 15.5 · App Router · TypeScript · Tailwind CSS 4 · deployed to Vercel.

> ### Note on the Next.js version
>
> This project is pinned to **Next 15.5.7**. That pin was originally a hard
> constraint of the previous host (Hostinger's build image shipped glibc 2.28,
> while Next 16's native SWC binary needs 2.30, so the build failed there).
>
> **That constraint no longer applies on Vercel.** Upgrading to Next 16 is now
> possible. It is deliberately not done as part of the migration, because a
> major-version bump is its own change with its own breaking-change surface —
> do it on a branch, run `npm run lint && npm run typecheck && npm run build`
> plus `npm run audit:site`, and check the homepage motion and image behaviour
> before merging.
>
> Two other choices are leftovers from the same era and are worth knowing about:
>
> - **`next.config.mjs`, not `.ts`.** Originally because a TypeScript config
>   has to be compiled by SWC before Next can read it, which broke on the old
>   host. On Vercel either works. It is kept as `.mjs` because it works and
>   there is nothing to gain from churning it — not because it is required.
> - **Build-time packages live in `dependencies`, not `devDependencies`.** The
>   old host set `NODE_ENV=production` before installing, which made npm skip
>   `devDependencies` entirely. Vercel installs both, so this is no longer
>   necessary — but it is also harmless, and moving `sharp` in particular has
>   a silent failure mode (see the note in section 2).

Built to replace the four-page Webflow site, addressing the 34 findings in the
July 2026 audit. See [`AUDIT-RESOLUTION.md`](./AUDIT-RESOLUTION.md) for the
finding-by-finding record, and
[`content/needs-confirmation.md`](./content/needs-confirmation.md) for
everything still waiting on the client.

---

## Contents

1. [Local development](#1-local-development)
2. [Production build](#2-production-build)
3. [Environment variables](#3-environment-variables)
4. [GitHub workflow](#4-github-workflow)
5. [Vercel deployment](#5-vercel-deployment)
6. [Changing business information](#6-changing-business-information)
7. [Adding a service](#7-adding-a-service)
8. [Adding a service area](#8-adding-a-service-area)
9. [Adding projects and photos](#9-adding-projects-and-photos)
10. [Adding reviews](#10-adding-reviews)
11. [Connecting the quote form](#11-connecting-the-quote-form)
12. [Analytics and Search Console](#12-analytics-and-search-console)
13. [Pre-launch checklist](#13-pre-launch-checklist)
14. [Project structure](#14-project-structure)

---

## 1. Local development

Requires **Node 20.9 or newer** (Node 22 LTS recommended — it matches the
version pinned in `.nvmrc`, which Vercel reads).

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run audit:site <url>` | Crawl a running site and check SEO, links, a11y basics |

---

## 2. Production build

```bash
npm run build
```

Then to serve it locally exactly as production does:

```bash
npm start
```

`npm run audit:site http://localhost:3000` crawls all 28 indexable pages and
checks titles, descriptions, canonicals, H1 counts, Open Graph tags, image alt
text, JSON-LD validity, tappable phone links, dead links, the sitemap, robots,
legacy redirects and the 404. It exits non-zero on failure, so it works in CI.

> **Note on `sharp`.** It is a **production** dependency, not a dev one. Next
> uses it to optimise images at runtime. If it is missing, Next silently serves
> the unoptimised original — a 990 KB hero instead of a 62 KB one — with no
> error in the logs. Do not move it to `devDependencies`.

---

## 3. Environment variables

Copy `.env.example` to `.env.local` for local work, and set the same keys in
Vercel (Project → Settings → Environment Variables) for production. **Never
commit real keys** — `.env*.local` is gitignored.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Canonical origin. Drives every canonical tag, the sitemap and all OG URLs. |
| `QUOTE_DELIVERY_PROVIDER` | For the form | Currently `resend` |
| `QUOTE_DELIVERY_API_KEY` | For the form | Provider API key |
| `QUOTE_NOTIFY_EMAIL` | For the form | Where quote requests go |
| `QUOTE_FROM_EMAIL` | For the form | Verified sender address |
| `NEXT_PUBLIC_GA_ID` | No | GA4, e.g. `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | No | Google Ads, e.g. `AW-XXXXXXXXX` |
| `NEXT_PUBLIC_GSC_VERIFICATION` | No | Search Console HTML-tag token |

**Staging safety.** If `NEXT_PUBLIC_SITE_URL` is anything other than
`https://www.supernovalandscape.com`, `robots.txt` disallows the entire site.
A staging build therefore cannot be indexed or become the canonical by
accident. Set it correctly in production or nothing will be crawled.

---

## 4. GitHub workflow

```bash
git checkout -b feature/whatever
# make changes
npm run lint && npm run build
git add -A
git commit -m "Describe the change"
git push -u origin feature/whatever
```

Open a pull request into `main`. Vercel builds a preview deployment for every
pull request, and `main` is the production branch — so anything merged there
goes live automatically.

Before every push, run:

```bash
npm run lint && npm run typecheck && npm run build
```

---

## 5. Vercel deployment

The target is **Vercel**, building from this GitHub repository. Next.js needs no
adapter or custom configuration there — the framework preset detects everything.

### One-time setup

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project**, import the repository, and accept the
   detected **Next.js** framework preset. The defaults are correct:
   - **Install command:** `npm install`
   - **Build command:** `npm run build`
   - **Output:** handled by the Next.js preset — do not set `output` in
     `next.config.mjs`
   - **Node version:** read from `.nvmrc` (22); `engines` also requires ≥20.9
3. Add every environment variable from section 3, for **Production**,
   **Preview** and **Development** as appropriate.
4. Deploy. Vercel gives the project a `*.vercel.app` URL — test there first.

> On preview and `*.vercel.app` deployments, leave `NEXT_PUBLIC_SITE_URL` set to
> that deployment's own origin. `robots.txt` then disallows the whole site (see
> section 3), so a preview can never be indexed or become the canonical. Only
> Production should carry `https://www.supernovalandscape.com`.

### Connecting the domain

Do this only once the staging build has been signed off.

1. In Vercel → **Project → Settings → Domains**, add both
   `supernovalandscape.com` and `www.supernovalandscape.com`.
2. Set `www` as the primary domain and let Vercel 301 the apex to it — the
   canonical URLs in this build all use `www`.
3. Point DNS at Vercel (the `A` / `CNAME` records Vercel shows for each domain).
   SSL is issued automatically once DNS resolves, and HTTPS is forced by
   default — there is nothing to configure.
4. Change `NEXT_PUBLIC_SITE_URL` to `https://www.supernovalandscape.com` and
   redeploy, so canonicals and the sitemap point at the live domain.
5. Confirm `https://www.supernovalandscape.com/robots.txt` allows crawling and
   lists the sitemap.

### Subsequent deploys

Pushing to `main` deploys to production automatically. Every other branch and
pull request gets its own preview deployment at a unique URL.

**`main` is live.** There is no separate "trigger deploy" step to forget, so a
push to `main` *is* a deploy to the client's production site. Work on a branch
and merge deliberately. If a deploy needs undoing, Vercel's **Deployments** tab
can promote a previous build back to production immediately — that is faster
and safer than pushing a revert commit.

**Do not deploy over the live site without explicit authorisation from the
client.** Nothing in this repository touches DNS, the Google Business Profile,
or any external account.

---

## 6. Changing business information

Almost everything lives in **one file**: [`src/config/site.ts`](./src/config/site.ts).

| Change | Edit |
|---|---|
| Phone number | `business.phone` — updates the header, footer, every CTA, the mobile bar, all `tel:` links and the schema |
| Email | `business.email` |
| Address | `business.address` — currently `null`; setting it makes it appear in the footer and schema |
| Hours | `business.hours` — currently `null`; setting it adds an Hours block to the Contact page and the schema |
| Contractor registration | `business.contractorRegistration` — currently `null`; setting it adds it to the footer and About page |
| Rating / review count | `reputation` — then re-run `node scripts/generate-og.mjs` |
| Social links | `socials` |
| Client portal URL | `clientPortalUrl` |

Navigation is in [`src/config/navigation.ts`](./src/config/navigation.ts), and
is generated from the service, location and guide data — add a service and it
appears in the menu and footer automatically.

Every field carries an `@verified` comment saying where the value came from.
**Keep that up to date.** Nullable fields are designed to disappear from the UI
cleanly rather than render a placeholder.

---

## 7. Adding a service

1. Add an entry to the `services` array in
   [`src/content/services.ts`](./src/content/services.ts). TypeScript will tell
   you what is required.
2. Put its photo in `public/images/services/`.
3. That is it. The page, the route, navigation, the services hub, the footer,
   the sitemap, the quote-form dropdown, related-service links and the JSON-LD
   are all generated from that entry.

Write a genuinely useful page. The `Service` type has fields for `whoFor`,
`scope`, `localContext`, `sections` and `faqs` because a 300-word doorway page
does not rank and does not convert.

---

## 8. Adding a service area

1. Add an entry to `locations` in
   [`src/content/locations.ts`](./src/content/locations.ts).
2. Give it a photo in `public/images/projects/` or `public/images/services/`.

**Only add an area you can write honestly about.** Each existing page describes
the housing stock, terrain, soil and seasonal conditions that genuinely differ
between Spokane, the Valley and Liberty Lake. A page that is the same text with
the town swapped is a doorway page — Google discounts them and they make the
site look mass-produced.

If Supernova expands, add the area once there is real local detail to write.

---

## 9. Adding projects and photos

Projects live in [`src/content/projects.ts`](./src/content/projects.ts).
A `before` is optional; supplying one turns the entry into a drag-to-compare
slider on `/projects`.

To import and optimise new photos:

```bash
npm i -D sharp
node scripts/process-images.mjs /path/to/folder/of/photos
```

Edit the `PHOTOS` and `HEROES` arrays in
[`scripts/process-images.mjs`](./scripts/process-images.mjs) to map source
filenames to output paths. `HEROES` produces the wide 2400×1000 crops used by
full-bleed header bands — a 4:3 photo in a 2.4:1 band means the browser
downloads pixels it can never show.

**Rules:**
- Real Supernova work only. No stock.
- Alt text describes what is in the photo, for someone who cannot see it.
- Descriptions state only what is **visible**. Do not infer a location, budget
  or scope from an image.

---

## 10. Adding reviews

Reviews live in [`src/content/reviews.ts`](./src/content/reviews.ts).

**Every review must be traceable to a published source.** Copy the text word
for word — do not shorten mid-sentence, tidy the grammar or write on a
customer's behalf. Set `rating` only where the source publishes one; Nextdoor
recommendations have no stars, so those entries use `null` and no stars render.

**Do not add `Review` or `AggregateRating` structured data.** Google's
guidelines do not allow a business to mark up reviews about itself, and the
audit specifically warned against chasing stars in search results with
non-compliant markup. The rating already lives on the Google profile, which is
linked from the header, footer, homepage, reviews page and every service page.

---

## 11. Connecting the quote form

Right now the form validates properly and then tells the visitor plainly that
it is not connected, pointing them at the phone number and email. **It never
claims a request was delivered when it was not.**

To connect it:

1. Pick a provider. [Resend](https://resend.com) is implemented; Postmark and
   SendGrid are a small addition to the same adapter.
2. Verify a sending domain with the provider. Without SPF/DKIM alignment,
   requests land in spam — which is worse than no form at all.
3. Set in Vercel (Project → Settings → Environment Variables):
   ```
   QUOTE_DELIVERY_PROVIDER=resend
   QUOTE_DELIVERY_API_KEY=re_xxxxxxxx
   QUOTE_NOTIFY_EMAIL=Damien@supernovalandscape.com
   QUOTE_FROM_EMAIL=website@supernovalandscape.com
   ```
4. Redeploy and **send one live test through the form**, then confirm it
   arrived.

For a different provider, add a `case` to the `switch` in
[`src/lib/quote/delivery.ts`](./src/lib/quote/delivery.ts). That file is the
only thing that needs changing — nothing else in the app knows how delivery
works.

**Spam protection** is already in place and invisible to real users: a honeypot
field, a time-trap that rejects submissions completed in under three seconds,
and a link-count heuristic. Bots get a success response so they have no signal
to adapt to. No CAPTCHA, so no accessibility cost.

---

## 12. Analytics and Search Console

Nothing loads and no third-party JavaScript ships until an ID is set. There are
no invented IDs anywhere in the repository.

**GA4** — create a property, then set `NEXT_PUBLIC_GA_ID`. These events fire
automatically once it is present:

| Event | Fires when | Parameters |
|---|---|---|
| `phone_click` | Any `tel:` link is tapped | `location` (header, hero, footer, mobile_bar, per-page) |
| `quote_cta_click` | Any "Get a Free Quote" button | `location` |
| `quote_start` | First interaction with the quote form | — |
| `quote_submit` | Form validated and submitted | `service` |

Mark `phone_click` and `quote_submit` as key events in GA4 — those are the two
real conversions for this business.

**Google Ads** — set `NEXT_PUBLIC_GOOGLE_ADS_ID`, then import the GA4 key
events as conversions. `/get-a-quote` and `/services/commercial-snow-removal`
are both built to work as paid landing pages.

**Search Console** — verify the `https://www.supernovalandscape.com` property.
Either use the DNS method, or set `NEXT_PUBLIC_GSC_VERIFICATION` to the token
from the HTML-tag method. Then submit
`https://www.supernovalandscape.com/sitemap.xml`.

Event wiring lives in [`src/lib/analytics.ts`](./src/lib/analytics.ts).

---

## 13. Pre-launch checklist

### Content and accuracy
- [ ] Every 🔴 item in [`content/needs-confirmation.md`](./content/needs-confirmation.md) resolved
- [ ] Rating and review count re-read from the Google dashboard, `reputation.asOf` updated
- [ ] OG card regenerated after any rating change (`node scripts/generate-og.mjs`)
- [ ] Owner and crew photos in place; both `<PhotoPlaceholder>` panels removed from `/about`
- [ ] Service list agrees with the Google Business Profile in both directions
- [ ] Damien has read every page and confirmed nothing overstates what Supernova does

### Technical
- [ ] `npm run lint` clean
- [ ] `npm run typecheck` clean
- [ ] `npm run build` succeeds
- [ ] `npm run audit:site https://www.supernovalandscape.com` passes
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production origin in Vercel
- [ ] `robots.txt` allows crawling and lists the sitemap
- [ ] `sitemap.xml` returns 28 URLs, all on the `www` origin
- [ ] Apex 301s to `www`; `http` 301s to `https`
- [ ] SSL issued and forced
- [ ] Legacy Webflow URLs redirect (check Search Console's Pages report for any not already handled)

### Conversion
- [ ] Phone link opens the dialer on a real iPhone and a real Android device
- [ ] Mobile action bar visible, not overlapping the footer, hidden on `/contact` and `/get-a-quote`
- [ ] Quote form connected, and one live test received
- [ ] Client portal link works
- [ ] `?service=` preselection works from a service page CTA

### Post-launch, same day
- [ ] Google Business Profile website field updated to `https://www.supernovalandscape.com`
- [ ] Sitemap submitted in Search Console
- [ ] GA4 receiving traffic; `phone_click` firing
- [ ] Run PageSpeed Insights on the homepage, the commercial snow page and one service page

---

## 14. Project structure

```
src/
├── app/                        # Routes (App Router)
│   ├── layout.tsx              # Shell: fonts, header, footer, mobile bar, org schema
│   ├── page.tsx                # Homepage
│   ├── services/               # Hub + [slug] template (9 pages)
│   ├── service-areas/          # Hub + [slug] template (3 pages)
│   ├── resources/              # Guides hub + [slug] template (5 guides)
│   ├── projects/ reviews/ about/ contact/ get-a-quote/ careers/
│   ├── api/quote/route.ts      # Form endpoint
│   ├── sitemap.ts robots.ts    # Generated from the content data
│   └── icon.png apple-icon.png
│
├── components/
│   ├── layout/                 # SiteHeader, SiteFooter, MobileActionBar, PageHeader
│   ├── ui/                     # Container, Button, SectionHeading
│   └── …                       # QuoteForm, BeforeAfter, ProjectGallery, FaqList, etc.
│
├── config/
│   ├── site.ts                 # ← single source of truth for business info
│   └── navigation.ts           # Generated from content data
│
├── content/                    # All copy and data, typed
│   ├── types.ts services.ts locations.ts projects.ts reviews.ts faqs.ts guides.ts
│
├── lib/
│   ├── seo.ts                  # buildMetadata(): canonical, OG, Twitter
│   ├── schema.ts               # JSON-LD builders
│   ├── analytics.ts            # Event helpers
│   └── quote/                  # Validation + the delivery adapter
│
└── fonts/                      # Self-hosted variable WOFF2 (latin subset)

scripts/
├── process-images.mjs          # Import and optimise photography
├── generate-og.mjs             # Build the branded share card
└── audit-site.mjs              # Pre-launch crawler
```

### Notes on a few decisions

**Server components by default.** Only five components are client components,
and each has a reason: the header (menus), the mobile bar (route awareness),
the quote form, the before/after slider, and the gallery lightbox. Everything
else — including all page content, all schema and all FAQs — is server
rendered.

**Fonts are self-hosted**, not fetched from Google at build time, so a build
never depends on outbound network access. Two variable WOFF2 files, latin
subset, about 100 KB total.

**No animation library, no UI framework, no icon package.** Icons are inline
SVG. The FAQ accordion is `<details>`. The lightbox is `<dialog>`, which gives
focus trapping and Escape-to-close from the platform. The before/after slider
is an `<input type="range">`, so it is keyboard operable for free.

**Accessibility** targets WCAG 2.2 AA: skip link, landmarks, labelled navs,
visible focus states, 48px minimum tap targets, an error summary that takes
focus on failed submit, `prefers-reduced-motion` respected, and contrast
checked on every colour pair in use (the lowest is 5.39:1, against a 4.5:1
requirement).

---

Built by Spencer's Strategies.
