import type { Faq } from "@/content/types";
import { withPhoneLinks } from "./PhoneText";

/**
 * Native <details>/<summary> accordion — keyboard accessible and fully
 * expandable without a single line of JavaScript, so the answers are in the
 * HTML for both crawlers and screen readers.
 */
export function FaqList({
  faqs,
  tone = "light",
}: {
  faqs: Faq[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`divide-y border-y ${
        dark ? "divide-white/12 border-white/12" : "divide-sage-200 border-sage-200"
      }`}
    >
      {faqs.map((faq) => (
        <details key={faq.q} className="group">
          <summary
            className={`flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-display text-[1.08rem] font-semibold leading-snug [&::-webkit-details-marker]:hidden ${
              dark ? "text-white" : "text-ink"
            }`}
          >
            {faq.q}
            <span
              className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-transform duration-200 group-open:rotate-45 ${
                dark
                  ? "border-white/25 text-gold-400"
                  : "border-sage-300 text-forest-600"
              }`}
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path
                  d="M6 1v10M1 6h10"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p
            className={`max-w-[62ch] pb-6 pr-10 text-[0.98rem] leading-relaxed ${
              dark ? "text-sage-200" : "text-ink-soft"
            }`}
          >
            {withPhoneLinks(faq.a)}
          </p>
        </details>
      ))}
    </div>
  );
}
