# Needs confirmation from Damien / Supernova

Everything on this list is a fact the website either **omits** or **states
carefully** because it could not be verified from Supernova's public presence
or the July 2026 audit.

Nothing here has been guessed. Where a value was unavailable, the site is built
so the field simply does not render — no placeholders, no invented numbers.

Work through this list before the new site replaces the live one.

**Legend**
- 🔴 **Blocker** — should be resolved before launch
- 🟡 **Important** — launch is possible without it, but it costs conversions or rankings
- ⚪ **Nice to have**

---

## Business identity and NAP

### 1. 🔴 Street address
**Status:** not published anywhere on the new site.

A street address for Supernova appears on third-party directories, but that
listing is explicitly marked *"not yet verified by business"*. Publishing an
address Damien has not confirmed risks a NAP mismatch against the Google
Business Profile, which is a genuine local-ranking problem.

**Needed:** the exact address as it appears in the Google Business Profile,
character for character — and confirmation of whether it is a public,
customer-visiting address or a service-area-only listing (in which case it
should stay hidden on Google too).

**Where it goes:** `src/config/site.ts` → `business.address`. Setting it makes
the address appear automatically in the footer and in the LocalBusiness schema.

---

### 2. 🔴 Business hours
**Status:** not published anywhere on the new site.

Two directories disagree — one shows Mon–Fri 8am–6pm plus Sat 9am–2pm, another
shows Mon–Sat 8am–6pm. Publishing the wrong hours next to a phone number is
worse than publishing none.

**Needed:** the current opening hours exactly as set in the Google Business
Profile, including any seasonal difference between the mowing season and the
snow season.

**Where it goes:** `src/config/site.ts` → `business.hours`. Setting it makes a
Hours block appear on the Contact page and in the schema.

---

### 3. 🔴 Washington contractor registration number
**Status:** the site says Supernova maintains the required licenses, insurance
and bonding. It does **not** state a registration number, because none was
available.

In Washington the L&I contractor registration number is the thing a cautious
homeowner can actually check, and publishing it converts.

**Needed:** the L&I registration number.

**Where it goes:** `src/config/site.ts` → `business.contractorRegistration`.
Setting it makes it appear in the footer and on the About page automatically.

---

### 4. 🟡 Direct Google Business Profile URL
**Status:** the site currently links to a Google **search** for the business,
which always resolves to the right profile but is one step removed.

**Needed:** the short link from the Google Business Profile dashboard
(`g.page/...` or the full Maps place URL).

**Where it goes:** `src/config/site.ts` → `reputation.googleProfileUrl`.

---

### 5. 🟡 Current rating and review count
**Status:** the site states **4.9 stars from 53 Google reviews**.

- Recorded in the Spencer's Strategies audit on **23 July 2026**
- Cross-checked against public directory aggregations on **8 August 2026**

These move week to week. One aggregator showed a lower review count than
Google's own figure, which is normal for syndicated data but means the number
should be read from the dashboard before launch.

**Needed:** the live figures from the Google Business Profile dashboard on
launch day.

**Where it goes:** `src/config/site.ts` → `reputation.rating`,
`reputation.reviewCount`, `reputation.asOf`, `reputation.asOfLabel`. Then re-run
`node scripts/generate-og.mjs`, which bakes the rating into the share card.

---

## Services

### 6. 🟡 Services on the Google profile that have no page
The Google Business Profile and other listings mention services that do not
appear on Supernova's own website, so no page was built for them:

| Service | Seen on | Build a page? |
|---|---|---|
| Tree trimming / tree removal | Google profile | Confirm first |
| Stump grinding | Google profile | Confirm first |
| Hardscaping | Google profile | Partly covered by Landscape Design & Installation |
| Pressure washing | Nextdoor listing | Confirm first |
| Junk removal & hauling | Nextdoor listing | Confirm first |
| Gutter cleaning | A Nextdoor enquiry Supernova responded to | Confirm first |
| Mulch installation | Old About page | Covered inside Landscape Design & Installation |
| Hedge trimming | Facebook page | Confirm first |
| Dryscapes | Old contact form only | Confirm first |

**Question for Damien:** which of these does Supernova actually offer today?

- **Offered and want leads for it** → it gets its own service page.
- **Offered but not a priority** → it gets a mention inside a related page.
- **Not offered** → it must be removed from the Google profile, because a
  listing that advertises work you decline generates bad-fit calls and
  eventually bad reviews.

**Note:** "Sprinkler Turn-On / Blow-Out" is offered as a quote-form option and
covered in depth on the Irrigation page, but has no page of its own. If blowouts
are a significant seasonal revenue line, that is the strongest candidate for a
tenth service page — the search volume is concentrated and seasonal.

---

### 7. ⚪ Commercial snow specifics deliberately left out
The commercial snow page is written to be usable as a paid-advertising landing
page, but it makes **no claims** about response times, service-level
guarantees, equipment counts, crew numbers or contract terms, because none
could be verified.

**Needed if you want them on the page:** anything Damien is willing to commit
to in writing. Even one concrete, defensible commitment would materially
strengthen that page against competitors.

---

## Photography

### 8. 🔴 Owner and crew photography
**Status:** the About page renders two clearly-labelled placeholder panels
where these photos belong. No stock photo of a person is used anywhere on the
site, and none ever should be.

This was a high-priority audit finding, and it is the cheapest trust asset
available. Customers already name Damien in their reviews; there is currently
no photograph of him anywhere.

**Needed:**
- A portrait of Damien on a job site — working, not posed in a studio
- Two or three shots of the crew working
- The trucks and trailers with the logo visible
- Ideally a few in winter with the plow gear

Half a day with a decent camera covers all of it. Drop the files in
`public/images/team/` and replace the `<PhotoPlaceholder>` components in
`src/app/about/page.tsx`.

---

### 9. 🟡 Which snow photos are actually Supernova's?
The project gallery uses **only** photography confirmed as Supernova's own
work. Four snow images were imported from the old site but their filenames
suggest some may be stock:

| File on the new site | Original filename | Assessment |
|---|---|---|
| `images/services/snow-sidewalk.jpg` | `Snow-Removal 3.jpg` | Plausibly real |
| `images/services/snow-plow-truck.jpg` | `Commercial-Snow-Plowing-60014.jpg` | Likely stock |
| *(not imported)* | `5191-boot-salt-sstock-2105718500.jpg` | Stock — excluded |
| *(not imported)* | `mowing stock photo.jpg` | Stock — excluded |
| *(not imported)* | `Spokane_Washington_Spokane_River.jpg` | Stock — excluded |

The two snow images that were imported appear **only** on the snow service
pages and the commercial snow hero — never in the project gallery, which is
kept to verified Supernova work.

**Needed:** confirmation of which are Supernova's own, and real photos from a
Spokane snow event to replace any that are not.

---

### 10. ⚪ Project details for case studies
The gallery describes only what is **visible in each photograph**. No location,
budget, timeline or scope has been inferred from an image.

The code is structured so individual project case studies can be added later
(`src/content/projects.ts`). For any job Damien can describe — what the problem
was, what was done, roughly when — that project can become a full case study
page, which is strong material for both search and sales.

---

## Website operations

### 11. 🔴 Quote form delivery
**Status:** the form is fully built and validated, but **no email provider is
connected**. Submitting it tells the visitor plainly that the form is not
connected yet and points them at the phone number and email. It never claims a
request was delivered.

**Needed before launch:**
1. A sending provider (Resend, Postmark or SendGrid — or Damien's CoPilot CRM
   if it accepts an inbound webhook)
2. A verified sender domain, so requests do not land in spam
3. The environment variables in `.env.example` set in Hostinger
4. One live test submission, confirmed received

See "Connecting the quote form" in `README.md`.

---

### 12. 🟡 Privacy policy review
`/privacy-policy` describes what the site does **today**: it collects quote form
data and runs no analytics. Both of those change at launch.

**Needed:** a review once analytics is switched on and the form is connected,
so the page still matches reality.

---

### 13. 🟡 Google Business Profile website link
The audit found that the website link on the Google profile sends visitors
through two redirects before the page loads. This is Supernova's highest-intent
traffic source.

**Needed:** Damien to update the website field in the Google Business Profile
dashboard to `https://www.supernovalandscape.com` exactly — with `https`, with
`www`, no trailing path.

**This is not something the website can fix.** It is a two-minute change in a
dashboard only Damien has access to, and it is the single cheapest item in the
whole audit.

---

### 14. 🟡 Analytics and Search Console
No measurement IDs exist in this repo, by design.

**Needed:**
- A GA4 property and its measurement ID
- Search Console verified for the `www` property
- A Google Ads conversion ID, if ads are planned

Everything is already wired: phone taps, quote CTA clicks and form submissions
all fire named events the moment an ID is present. See "Analytics" in
`README.md`.

---

### 15. ⚪ Instagram and TikTok
The audit could not confirm whether these accounts exist — both platforms block
automated checks. Facebook, Yelp and Nextdoor were confirmed and are linked
sitewide.

**Needed:** confirm whether the handles exist. If they do, add them to
`socials` in `src/config/site.ts`. If they do not, they are worth claiming
before someone else does.

---

### 16. ⚪ Careers
The old site advertised a "Maintenance Crew Member" role. The new careers page
describes the type of work honestly but states **no** pay range, hours,
benefits or requirements, because none could be verified.

**Needed:** whether that role is currently open, and any details Damien wants
published. Real specifics attract better applicants than "competitive pay".

---

### 17. ⚪ Domain and redirects at launch
**Needed at cutover:**
- `supernovalandscape.com` (no www) 301s to `https://www.supernovalandscape.com`
- `http://` 301s to `https://`
- Old Webflow paths redirect to their new homes. The app already handles
  `/our-services`, `/about-us`, `/contact-us`, `/quote` and `/free-quote` —
  confirm no other indexed URLs exist by checking Search Console's Pages report
  before switching over.

---

## Summary

| Priority | Count | Items |
|---|---|---|
| 🔴 Blocker | 5 | Address, hours, registration number, owner/crew photos, form delivery |
| 🟡 Important | 8 | Google profile URL, live rating, service list, snow photos, privacy review, GBP link, analytics, — |
| ⚪ Nice to have | 4 | Commercial snow specifics, case study details, Instagram/TikTok, careers detail |

*Compiled 8 August 2026, against the Spencer's Strategies website audit of
23 July 2026 and the live site at supernovalandscape.com.*
