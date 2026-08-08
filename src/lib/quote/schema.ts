import { quoteServiceOptions } from "@/content/services";

export type QuoteFields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  message: string;
  referral: string;
  /** Honeypot — must stay empty. Hidden from humans and assistive tech. */
  website: string;
  /** Client render timestamp, used as a time-trap against instant bot posts. */
  renderedAt: string;
};

export type FieldName = keyof Omit<QuoteFields, "website" | "renderedAt">;

export type QuoteErrors = Partial<Record<FieldName, string>>;

export const referralOptions = [
  { value: "online-search", label: "Online search" },
  { value: "google-reviews", label: "Google reviews" },
  { value: "referral", label: "Referred by someone" },
  { value: "social-media", label: "Social media" },
  { value: "previous-client", label: "I'm a previous client" },
  { value: "saw-a-truck", label: "Saw a Supernova truck or crew" },
  { value: "other", label: "Other" },
];

const validServiceValues = new Set(quoteServiceOptions.map((o) => o.value));

/** Accepts common US formats; we only care that there are 10 usable digits. */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Shared by the client (for inline feedback) and the API route (as the real
 * gate). Never trust the client-side pass — the route runs this again.
 */
export function validateQuote(values: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "Enter your first name.";
  }
  if (!values.lastName.trim()) {
    errors.lastName = "Enter your last name.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Enter a phone number so we can reach you.";
  } else if (!normalisePhone(values.phone)) {
    errors.phone = "Enter a 10-digit phone number, for example (509) 555-0142.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter an email address.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "That email address does not look right — please check it.";
  }

  if (!values.service) {
    errors.service = "Choose the service you need.";
  } else if (!validServiceValues.has(values.service)) {
    errors.service = "Choose a service from the list.";
  }

  if (values.message.length > 4000) {
    errors.message = "Please keep the details under 4,000 characters.";
  }

  return errors;
}

/** Server-only spam heuristics, kept separate from user-facing validation. */
export function looksAutomated(values: QuoteFields): boolean {
  if (values.website.trim() !== "") return true;

  const rendered = Number(values.renderedAt);
  if (!Number.isFinite(rendered)) return true;
  // A human cannot complete this form in under three seconds.
  if (Date.now() - rendered < 3000) return true;

  // Link-stuffed message bodies are the dominant spam pattern on these forms.
  const linkCount = (values.message.match(/https?:\/\//gi) ?? []).length;
  if (linkCount >= 3) return true;

  return false;
}
