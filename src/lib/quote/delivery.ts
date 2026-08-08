import type { QuoteFields } from "./schema";

/**
 * QUOTE DELIVERY ADAPTER — the one place that needs changing before launch.
 *
 * Right now no delivery provider is configured, and that is deliberate: this
 * build must never tell a visitor their request was sent when it was not.
 * With no provider configured, `deliverQuote` returns `configured: false`, and
 * the form tells the user plainly to call or email instead.
 *
 * TO CONNECT IT (see README "Connecting the quote form"):
 *   1. Choose a provider. Resend, Postmark and SendGrid all work on Hostinger;
 *      so does Damien's CoPilot CRM if it exposes an inbound webhook.
 *   2. Set the environment variables in Hostinger (never commit them):
 *        QUOTE_DELIVERY_PROVIDER=resend
 *        QUOTE_DELIVERY_API_KEY=...
 *        QUOTE_NOTIFY_EMAIL=Damien@supernovalandscape.com
 *        QUOTE_FROM_EMAIL=website@supernovalandscape.com   (a verified sender)
 *   3. Implement the branch below for the chosen provider.
 *   4. Send one live test through the form and confirm it arrives.
 */

export type DeliveryResult =
  | { configured: true; delivered: true }
  | { configured: true; delivered: false; error: string }
  | { configured: false };

const provider = process.env.QUOTE_DELIVERY_PROVIDER ?? "";
const apiKey = process.env.QUOTE_DELIVERY_API_KEY ?? "";
const notifyEmail = process.env.QUOTE_NOTIFY_EMAIL ?? "";
const fromEmail = process.env.QUOTE_FROM_EMAIL ?? "";

export function isDeliveryConfigured(): boolean {
  return Boolean(provider && apiKey && notifyEmail && fromEmail);
}

function formatBody(values: QuoteFields, serviceLabel: string): string {
  return [
    `New quote request from supernovalandscape.com`,
    ``,
    `Name:      ${values.firstName} ${values.lastName}`,
    `Phone:     ${values.phone}`,
    `Email:     ${values.email}`,
    `Address:   ${values.address || "(not provided)"}`,
    `Service:   ${serviceLabel}`,
    `Heard via: ${values.referral || "(not provided)"}`,
    ``,
    `Details:`,
    values.message || "(none)",
  ].join("\n");
}

export async function deliverQuote(
  values: QuoteFields,
  serviceLabel: string,
): Promise<DeliveryResult> {
  if (!isDeliveryConfigured()) return { configured: false };

  const subject = `Quote request — ${serviceLabel} — ${values.firstName} ${values.lastName}`;
  const text = formatBody(values, serviceLabel);

  try {
    switch (provider) {
      case "resend": {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [notifyEmail],
            reply_to: values.email,
            subject,
            text,
          }),
        });
        if (!res.ok) {
          return {
            configured: true,
            delivered: false,
            error: `Provider responded ${res.status}`,
          };
        }
        return { configured: true, delivered: true };
      }

      default:
        return {
          configured: true,
          delivered: false,
          error: `Unknown QUOTE_DELIVERY_PROVIDER "${provider}"`,
        };
    }
  } catch (err) {
    return {
      configured: true,
      delivered: false,
      error: err instanceof Error ? err.message : "Unknown delivery error",
    };
  }
}
