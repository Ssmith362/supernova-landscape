import type { Faq } from "./types";

/**
 * Company-wide FAQs. The answers reproduce the factual substance already
 * published in Supernova's own FAQ (free estimates, licensing, service area,
 * payment methods, and the weekly-only mowing policy) — that content was good
 * and answered real objections. It has been rewritten for clarity, not
 * embellished.
 *
 * Service-specific and location-specific FAQs live on their own pages so the
 * same five questions are not duplicated across the site the way they were on
 * the old one.
 */
export const generalFaqs: Faq[] = [
  {
    q: "Do you offer free estimates?",
    a: "Yes — estimates and consultations are free. We would rather come out, look at the property and understand what you are after than price a job off a description. Call (509) 808-3130 or send a request through the quote form.",
  },
  {
    q: "What areas do you serve?",
    a: "Greater Spokane, Spokane Valley and Liberty Lake. If you are not sure whether your address falls inside that, call and ask — it is a quick answer.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Supernova Landscape Company LLC maintains the licenses, insurance and bonding required for the work we take on. If you would like to see current documentation before we start a project, ask and we will provide it.",
  },
  {
    q: "Do you offer bi-weekly mowing?",
    a: "No, and it is a deliberate choice. Two weeks of Spokane growth in spring means cutting off too much of the blade at once, which stresses the lawn and leaves clumps behind. Weekly service keeps the cut consistent, the equipment in good shape and our routes reliable for everyone on them.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash, check, and credit or debit cards from all major carriers.",
  },
  {
    q: "Do you work with commercial properties?",
    a: "Yes. Commercial snow removal for Spokane and Spokane Valley businesses, property managers and HOAs is a significant part of our winter work, covering parking lots, sidewalks, entrances and access areas.",
  },
  {
    q: "How soon can you start?",
    a: "It depends on the service and the time of year. Maintenance routes and snow contracts fill up before their seasons start, and irrigation blow-outs book solid through October. The earlier you call, the more choice you have over timing.",
  },
  {
    q: "Am I an existing customer? Where do I log in?",
    a: "Existing customers can reach the client portal from the link in the site footer, or from the Client Login link on the Contact page.",
  },
];

/** The four questions shown in the homepage FAQ preview. */
export const homepageFaqs: Faq[] = [
  generalFaqs[0],
  generalFaqs[1],
  generalFaqs[3],
  generalFaqs[2],
];
