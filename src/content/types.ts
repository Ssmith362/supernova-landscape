export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Faq = {
  q: string;
  a: string;
};

export type ServiceCategory = "lawn" | "landscape" | "irrigation" | "snow";

export type Service = {
  slug: string;
  /** Short label for nav, cards and the quote form dropdown. */
  name: string;
  /** The exact wording used in Supernova's own quote form, where one exists. */
  quoteFormLabel: string;
  category: ServiceCategory;
  /** Page <h1>. Locally relevant, no keyword stuffing. */
  h1: string;
  title: string;
  description: string;
  /** One-line summary used on cards and in related-service links. */
  summary: string;
  /** Opening paragraphs of the page body. */
  intro: string[];
  /** "Who it's for" bullets. */
  whoFor: string[];
  /** What's actually included. */
  scope: { label: string; detail: string }[];
  /** Spokane-specific seasonal or climate context. */
  localContext?: { heading: string; body: string[] };
  /** Long-form body sections rendered after the scope block. */
  sections?: { heading: string; body: string[] }[];
  /** Used in the page body and as the social share image. */
  image: ImageRef;
  /**
   * Optional wide crop for the full-bleed header band. Worth adding for the
   * highest-traffic pages: a 4:3 source in a 2.4:1 band means the browser
   * downloads pixels it can never display.
   */
  heroImage?: ImageRef;
  faqs: Faq[];
  relatedSlugs: string[];
  /** Ordering on the services hub and in nav. */
  order: number;
  /** Marks the highest-commercial-value pages for internal linking emphasis. */
  featured?: boolean;
};

export type Location = {
  slug: string;
  /** e.g. "Spokane" */
  city: string;
  /** e.g. "Spokane, WA" */
  cityState: string;
  h1: string;
  title: string;
  description: string;
  intro: string[];
  /** Genuinely local detail — neighbourhoods, property types, conditions. */
  localNotes: { heading: string; body: string[] }[];
  /** Service slugs most relevant to this area, in priority order. */
  serviceSlugs: string[];
  faqs: Faq[];
  image: ImageRef;
  order: number;
};

export type Review = {
  author: string;
  /** Where the review can be traced to. Never invent one. */
  source: "Google" | "Nextdoor" | "Website testimonial";
  /** Free-text date as published by the source. */
  dateLabel: string;
  rating: 5 | 4 | 3 | 2 | 1 | null;
  quote: string;
  /** Optional service slug the review clearly relates to. */
  serviceSlug?: string;
  /** Optional city, only where the source states it. */
  city?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Only describes what is visibly in the photograph. No invented scope. */
  blurb: string;
  category: ServiceCategory;
  serviceSlug: string;
  before?: ImageRef;
  after: ImageRef;
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  /** Short deck shown under the H1. */
  standfirst: string;
  updated: string;
  readingMinutes: number;
  /** Body rendered as sections so no markdown parser is needed. */
  sections: {
    heading: string;
    body: string[];
    list?: string[];
  }[];
  relatedServiceSlugs: string[];
  faqs?: Faq[];
};
