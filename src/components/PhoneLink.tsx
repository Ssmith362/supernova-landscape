"use client";

import type { ReactNode } from "react";
import { business } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

/**
 * The tappable phone link. This is the single most important element on the
 * site — the old one was styled as a link but had no href, so tapping it on a
 * phone did nothing.
 *
 * `location` identifies where the tap happened so phone conversions can be
 * attributed per placement once GA4 is connected.
 */
export function PhoneLink({
  children,
  className = "",
  location,
  ariaLabel,
}: {
  children?: ReactNode;
  className?: string;
  location: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={business.phone.href}
      className={className}
      aria-label={ariaLabel ?? `Call Supernova Landscape at ${business.phone.display}`}
      onClick={() => trackEvent("phone_click", { location })}
    >
      {children ?? business.phone.display}
    </a>
  );
}
