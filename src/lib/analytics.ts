/**
 * Thin analytics layer.
 *
 * Nothing fires unless NEXT_PUBLIC_GA_ID is set, so the demo build stays clean
 * and no invented measurement IDs exist anywhere in the repo. Every CTA on the
 * site routes through `trackEvent`, so once Damien supplies real IDs the
 * conversions are already wired.
 *
 * Events emitted by the site:
 *   phone_click     — any tap on a tel: link  (params: location)
 *   quote_start     — first interaction with the quote form
 *   quote_submit    — quote form passed validation and was submitted
 *   quote_cta_click — any "Get a free estimate" button (params: location)
 *   hero_rail_click — a service tapped on the hero rail  (params: service)
 *
 * `hero_rail_click` is worth watching on its own: the hero rail exists on the
 * argument that four named services convert better than a rotating carousel,
 * and this is the number that either supports that or doesn't.
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "phone_click"
  | "quote_start"
  | "quote_submit"
  | "quote_cta_click"
  | "hero_rail_click";

export function trackEvent(name: AnalyticsEvent, params: GtagParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
