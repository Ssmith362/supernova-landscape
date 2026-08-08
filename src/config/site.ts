/**
 * SINGLE SOURCE OF TRUTH for business information.
 *
 * Change phone, email, social links, service areas or the review numbers HERE
 * and every page, footer, schema block and CTA updates automatically.
 *
 * VERIFICATION POLICY
 * Every value below carries a `@verified` note saying where it came from.
 * Anything that could not be verified is set to `null` and listed in
 * content/needs-confirmation.md. Do not invent values to fill a gap — a null
 * field is designed to disappear from the UI cleanly.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.supernovalandscape.com"
).replace(/\/$/, "");

/** Digits only — used to build tel: links and schema. */
const PHONE_DIGITS = "5098083130";

export const business = {
  /** @verified Legal name from Washington LLC naming on the audit + GBP. */
  legalName: "Supernova Landscape Company LLC",
  /** @verified Name used across the current site and logo. */
  name: "Supernova Landscape",
  /** @verified Logo lockup tagline: "YOUR VISION OUR CRAFTSMANSHIP". */
  tagline: "Your vision, our craftsmanship",
  /** @verified Founder named on the current /about-us page. */
  founder: "Damien Barton",

  /** @verified Listed on the current /contact page and every directory listing. */
  phone: {
    display: "(509) 808-3130",
    href: `tel:+1${PHONE_DIGITS}`,
    e164: `+1${PHONE_DIGITS}`,
  },

  /** @verified Listed on the current /contact page. */
  email: "Damien@supernovalandscape.com",

  /**
   * @unverified A street address appears on third-party directories but the
   * listing is marked "not yet verified by business". Publishing an address
   * Damien has not confirmed risks a NAP mismatch with the Google Business
   * Profile, so nothing is shown until he confirms it.
   * See content/needs-confirmation.md #1.
   */
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  },

  /**
   * @unverified Directory listings disagree (one shows Mon–Fri 8–6 / Sat 9–2,
   * another Mon–Sat 8–6). Hours are omitted rather than guessed.
   * See content/needs-confirmation.md #2.
   */
  hours: null as null | { days: string; opens: string; closes: string }[],

  /**
   * @unverified The current site claims "licensed, insured and bonded" but
   * shows no registration number. In Washington the L&I contractor number is
   * the proof a homeowner can check, so it converts. Set this string once
   * Damien supplies it and it will appear in the footer, the About page and
   * the LocalBusiness schema automatically.
   * See content/needs-confirmation.md #3.
   */
  contractorRegistration: null as string | null,

  /** Geographic centre of the service area — used for the map embed only. */
  geo: { lat: 47.6588, lng: -117.4260 },

  priceRange: "$$",
} as const;

/**
 * Reputation figures.
 * @verified 4.9 / 53 Google reviews recorded in the Spencer's Strategies audit
 * (23 July 2026) and cross-checked against directory aggregations on
 * 8 August 2026. These move week to week — confirm in the Google Business
 * Profile dashboard before launch and update `asOf`.
 */
export const reputation = {
  rating: 4.9,
  reviewCount: 53,
  asOf: "2026-07-23",
  asOfLabel: "July 2026",
  /**
   * @unverified The exact Google Maps place URL has not been confirmed. This
   * search link always resolves to the correct profile; swap it for the direct
   * `g.page` / place URL once Damien shares it from his dashboard.
   * See content/needs-confirmation.md #4.
   */
  googleProfileUrl:
    "https://www.google.com/search?q=Supernova+Landscape+Company+Spokane+WA",
} as const;

/** @verified Profiles confirmed to exist during research. */
export const socials = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/p/Supernova-Landscape-Company-100089233548176/",
  },
  { name: "Yelp", url: "https://www.yelp.com/biz/supernova-landscape-spokane" },
  {
    name: "Nextdoor",
    url: "https://nextdoor.com/pages/supernova-landscape-company-llc-spokane-wa/",
  },
] as const;

/** @verified Live CoPilot CRM portal linked from the current /contact footer. */
export const clientPortalUrl =
  "https://secure.copilotcrm.com/client/login/portal/7760";

/**
 * @verified Service area wording taken from the current site FAQ:
 * "We cover all of the greater Spokane area, Spokane Valley, and Liberty Lake."
 */
export const serviceAreaSummary =
  "Greater Spokane, Spokane Valley and Liberty Lake";

export const analytics = {
  /** Set NEXT_PUBLIC_GA_ID in .env.local to switch GA4 on. No ID is hardcoded. */
  ga4Id: process.env.NEXT_PUBLIC_GA_ID ?? null,
  /** Google Ads conversion ID, e.g. AW-XXXXXXXXX. */
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? null,
  /** Search Console HTML tag verification token (the `content` value only). */
  searchConsoleVerification:
    process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? null,
} as const;
