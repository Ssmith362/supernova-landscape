import Script from "next/script";
import { analytics } from "@/config/site";

/**
 * GA4 + Google Ads loader.
 *
 * Renders nothing at all unless a measurement ID is present in the
 * environment, so no invented IDs exist in the repo and the demo build ships
 * zero third-party JavaScript. Set NEXT_PUBLIC_GA_ID (and optionally
 * NEXT_PUBLIC_GOOGLE_ADS_ID) to switch it on — see README.
 */
export function Analytics() {
  const { ga4Id, googleAdsId } = analytics;
  if (!ga4Id && !googleAdsId) return null;

  const primaryId = ga4Id ?? googleAdsId;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
          ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
        `}
      </Script>
    </>
  );
}
