import type { Review } from "./types";

/**
 * REAL REVIEWS ONLY.
 *
 * Every entry below is traceable to a published source:
 *  - "Website testimonial" — already published on supernovalandscape.com
 *  - "Google"  — Google reviews as syndicated to public review aggregators
 *  - "Nextdoor" — Supernova's Nextdoor business page
 *
 * Do not add a review here that you cannot point at. Do not paraphrase,
 * shorten mid-sentence or improve the wording of a real customer.
 *
 * Star ratings are only recorded where the source states one. Where a source
 * publishes a recommendation without a star value, `rating` is null and no
 * stars are rendered.
 *
 * NOTE ON STRUCTURED DATA: these are intentionally NOT marked up with Review /
 * AggregateRating schema. Google's guidelines disallow self-serving review
 * markup for a business about itself, and the rating is already published on
 * the Google profile where it belongs.
 */
export const reviews: Review[] = [
  {
    author: "Matt Gill",
    source: "Website testimonial",
    dateLabel: "Published on supernovalandscape.com",
    rating: null,
    city: "Spokane",
    serviceSlug: "seasonal-cleanups",
    quote:
      "Absolutely top notch service. Professional interactions and fast, quality work. We have a massive Maple tree that covers our entire property every year. Supernova had it cleaned up in no time and it looks great! Fair prices and a family owned local small business.",
  },
  {
    author: "Natasha Torok",
    source: "Google",
    dateLabel: "Google review",
    rating: 5,
    serviceSlug: "irrigation",
    quote:
      "I had my sprinklers blown out by Supernova and it was such a wonderful experience! Damien came out to do it for me and he was the kindest and most helpful person for the job!",
  },
  {
    author: "Brett Delegard",
    source: "Google",
    dateLabel: "Google review",
    rating: 5,
    serviceSlug: "landscape-design-installation",
    quote:
      "Supernova did an amazing job on our project. Always very clear with their communication regarding our expectations for the project and the price was affordable for the work performed.",
  },
  {
    author: "P & A",
    source: "Google",
    dateLabel: "Google review",
    rating: 5,
    serviceSlug: "seasonal-cleanups",
    quote:
      "Amazing service! Easy scheduling, fast and efficient. Takes so much off my plate as a homeowner to know my yard is ready for winter. Very trustworthy as well.",
  },
  {
    author: "Linda Palmer",
    source: "Google",
    dateLabel: "Google review",
    rating: 5,
    quote: "Great service and care to detail. Good bunch of guys to work with.",
  },
  {
    author: "C. M.",
    source: "Nextdoor",
    dateLabel: "26 May 2025",
    rating: null,
    city: "Spokane Valley",
    quote: "Always great to work with Damien and his crew!",
  },
];

/** Reviews shown on a given service page, where one clearly relates. */
export function reviewsForService(slug: string): Review[] {
  return reviews.filter((r) => r.serviceSlug === slug);
}
