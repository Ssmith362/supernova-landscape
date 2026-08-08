import { Fragment, type ReactNode } from "react";
import { business } from "@/config/site";

/**
 * Renders body copy with any occurrence of the business phone number turned
 * into a real tel: link.
 *
 * The audit's single most expensive finding was a phone number styled to look
 * like a link that had no href. This guarantees the regression cannot come
 * back through prose: every rendered instance of the number is tappable,
 * wherever an author writes it.
 */
export function withPhoneLinks(text: string): ReactNode {
  const needle = business.phone.display;
  if (!text.includes(needle)) return text;

  const parts = text.split(needle);

  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a
          href={business.phone.href}
          className="font-semibold underline underline-offset-4 hover:no-underline"
        >
          {needle}
        </a>
      )}
    </Fragment>
  ));
}
