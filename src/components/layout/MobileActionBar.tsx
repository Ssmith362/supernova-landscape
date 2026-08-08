"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { business } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Two-action bar pinned to the bottom on small screens: CALL and GET A QUOTE.
 *
 * Restrained by design — 2 actions, one row, no badges or animation. It hides
 * on /get-a-quote and /contact, where the page already is the conversion
 * surface and the bar would just cover the form.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === "/get-a-quote" || pathname === "/contact") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-forest-800/40 bg-forest-900/97 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden print:hidden">
      <div className="grid grid-cols-2">
        <a
          href={business.phone.href}
          onClick={() => trackEvent("phone_click", { location: "mobile_bar" })}
          className="flex min-h-14 items-center justify-center gap-2 border-r border-white/15 text-[0.95rem] font-bold text-white"
        >
          <svg width="17" height="17" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4.6 2.5h2.6l1.3 3.3-1.6 1.2a10.6 10.6 0 0 0 4.6 4.6l1.2-1.6 3.3 1.3v2.6a1.6 1.6 0 0 1-1.7 1.6A13.3 13.3 0 0 1 3 4.2a1.6 1.6 0 0 1 1.6-1.7Z"
              fill="currentColor"
            />
          </svg>
          Call {business.phone.display}
        </a>
        <Link
          href="/get-a-quote"
          onClick={() =>
            trackEvent("quote_cta_click", { location: "mobile_bar" })
          }
          className="flex min-h-14 items-center justify-center bg-gold-500 text-[0.95rem] font-bold text-forest-950"
        >
          Get a Free Quote
        </Link>
      </div>
    </div>
  );
}
