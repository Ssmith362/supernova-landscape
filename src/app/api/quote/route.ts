import { NextResponse } from "next/server";
import { quoteServiceOptions } from "@/content/services";
import { deliverQuote, isDeliveryConfigured } from "@/lib/quote/delivery";
import {
  looksAutomated,
  validateQuote,
  type QuoteFields,
} from "@/lib/quote/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, reason: "bad_request" },
      { status: 400 },
    );
  }

  const body = raw as Record<string, unknown>;
  const values: QuoteFields = {
    firstName: str(body.firstName).trim(),
    lastName: str(body.lastName).trim(),
    phone: str(body.phone).trim(),
    email: str(body.email).trim(),
    address: str(body.address).trim(),
    service: str(body.service),
    message: str(body.message).trim(),
    referral: str(body.referral),
    website: str(body.website),
    renderedAt: str(body.renderedAt),
  };

  // Silently accept obvious bots so they get no signal to adapt to.
  if (looksAutomated(values)) {
    return NextResponse.json({ ok: true, delivered: false, spam: true });
  }

  const errors = validateQuote(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, reason: "validation", errors },
      { status: 422 },
    );
  }

  const serviceLabel =
    quoteServiceOptions.find((o) => o.value === values.service)?.label ??
    values.service;

  // No provider configured: report that honestly rather than faking success.
  if (!isDeliveryConfigured()) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      reason: "delivery_not_configured",
    });
  }

  const result = await deliverQuote(values, serviceLabel);

  if (result.configured && result.delivered) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  if (result.configured && !result.delivered) {
    console.error("[quote] delivery failed:", result.error);
    return NextResponse.json(
      { ok: false, delivered: false, reason: "delivery_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: false,
    reason: "delivery_not_configured",
  });
}
