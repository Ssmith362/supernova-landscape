"use client";

import { useEffect, useId, useRef, useState } from "react";
import { quoteServiceOptions } from "@/content/services";
import { business } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import {
  referralOptions,
  validateQuote,
  type FieldName,
  type QuoteErrors,
  type QuoteFields,
} from "@/lib/quote/schema";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "delivered" }
  | { kind: "not_configured" }
  | { kind: "error"; message: string };

const emptyValues: QuoteFields = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  service: "",
  message: "",
  referral: "",
  website: "",
  renderedAt: "",
};

export function QuoteForm({
  /** Preselects a service, e.g. from a service page CTA. */
  defaultService,
  compact = false,
}: {
  defaultService?: string;
  compact?: boolean;
}) {
  const uid = useId();
  const [values, setValues] = useState<QuoteFields>({
    ...emptyValues,
    service: defaultService ?? "",
  });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [startedTracked, setStartedTracked] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Time-trap baseline. Held in a ref and stamped after hydration so it
  // reflects a real page view, and so it never triggers a re-render.
  const renderedAtRef = useRef<number | null>(null);
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const fid = (name: string) => `${uid}-${name}`;
  const eid = (name: string) => `${uid}-${name}-error`;

  function update(name: keyof QuoteFields, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as FieldName]) {
      setErrors((e) => ({ ...e, [name]: undefined }));
    }
    if (!startedTracked) {
      trackEvent("quote_start");
      setStartedTracked(true);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateQuote(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the summary so the errors are announced, not just shown.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const payload: QuoteFields = {
        ...values,
        renderedAt: String(renderedAtRef.current ?? Date.now()),
      };
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        delivered?: boolean;
        reason?: string;
        errors?: QuoteErrors;
      };

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
          setStatus({ kind: "idle" });
          requestAnimationFrame(() => summaryRef.current?.focus());
          return;
        }
        setStatus({
          kind: "error",
          message:
            "We could not send that just now. Please call or email us and we will pick it up right away.",
        });
        return;
      }

      if (data.delivered) {
        trackEvent("quote_submit", { service: values.service });
        setStatus({ kind: "delivered" });
      } else {
        // Honest state: the form works, the mailbox is not connected yet.
        setStatus({ kind: "not_configured" });
      }
    } catch {
      setStatus({
        kind: "error",
        message:
          "Something went wrong sending that. Please call or email us instead.",
      });
    } finally {
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  }

  if (status.kind === "delivered") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        className="border-l-4 border-forest-600 bg-white p-7 shadow-card"
      >
        <h2 className="font-display text-[1.4rem] text-ink">
          Thanks — we have your request.
        </h2>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
          Damien or a member of the crew will be in touch to arrange a time to
          look at the property. If you need us sooner, call{" "}
          <a
            href={business.phone.href}
            className="font-semibold text-forest-700 underline underline-offset-4"
          >
            {business.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const errorList = (Object.entries(errors) as [FieldName, string][]).filter(
    ([, msg]) => Boolean(msg),
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Error summary — focused on failed submit so it is announced. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={errorList.length ? "alert" : undefined}
        className={errorList.length ? "" : "sr-only"}
      >
        {errorList.length > 0 && (
          <div className="border-l-4 border-red-700 bg-red-50 p-4">
            <p className="text-[0.92rem] font-bold text-red-900">
              Please fix {errorList.length}{" "}
              {errorList.length === 1 ? "field" : "fields"} below.
            </p>
            <ul className="mt-2 space-y-1 text-[0.88rem] text-red-900">
              {errorList.map(([name, msg]) => (
                <li key={name}>
                  <a
                    href={`#${fid(name)}`}
                    className="underline underline-offset-2"
                  >
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={fid("firstName")}
          errorId={eid("firstName")}
          label="First name"
          required
          error={errors.firstName}
        >
          <input
            id={fid("firstName")}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? eid("firstName") : undefined}
            className={inputClass(Boolean(errors.firstName))}
          />
        </Field>

        <Field
          id={fid("lastName")}
          errorId={eid("lastName")}
          label="Last name"
          required
          error={errors.lastName}
        >
          <input
            id={fid("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={values.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? eid("lastName") : undefined}
            className={inputClass(Boolean(errors.lastName))}
          />
        </Field>

        <Field
          id={fid("phone")}
          errorId={eid("phone")}
          label="Phone"
          required
          error={errors.phone}
          hint="Best number to reach you on"
        >
          <input
            id={fid("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="(509) 555-0142"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone ? eid("phone") : `${fid("phone")}-hint`
            }
            className={inputClass(Boolean(errors.phone))}
          />
        </Field>

        <Field
          id={fid("email")}
          errorId={eid("email")}
          label="Email"
          required
          error={errors.email}
        >
          <input
            id={fid("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? eid("email") : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>
      </div>

      <Field
        id={fid("address")}
        errorId={eid("address")}
        label="Property address"
        hint="Where the work would be — helps us confirm we're on a route and size the job"
        error={errors.address}
      >
        <input
          id={fid("address")}
          name="address"
          type="text"
          autoComplete="street-address"
          value={values.address}
          onChange={(e) => update("address", e.target.value)}
          aria-describedby={`${fid("address")}-hint`}
          className={inputClass(false)}
        />
      </Field>

      <Field
        id={fid("service")}
        errorId={eid("service")}
        label="What do you need?"
        required
        error={errors.service}
      >
        <select
          id={fid("service")}
          name="service"
          required
          value={values.service}
          onChange={(e) => update("service", e.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? eid("service") : undefined}
          className={`${inputClass(Boolean(errors.service))} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%235c6b61%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-11`}
        >
          <option value="">Choose a service…</option>
          {quoteServiceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fid("message")}
        errorId={eid("message")}
        label="Tell us about the project"
        hint="Rough size, what you're hoping for, anything we should know"
        error={errors.message}
      >
        <textarea
          id={fid("message")}
          name="message"
          rows={compact ? 3 : 5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? eid("message") : `${fid("message")}-hint`
          }
          className={`${inputClass(Boolean(errors.message))} resize-y`}
        />
      </Field>

      <Field id={fid("referral")} errorId={eid("referral")} label="How did you hear about us?">
        <select
          id={fid("referral")}
          name="referral"
          value={values.referral}
          onChange={(e) => update("referral", e.target.value)}
          className={`${inputClass(false)} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%235c6b61%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-11`}
        >
          <option value="">Prefer not to say</option>
          {referralOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      {/* Honeypot. Hidden from sighted users and from assistive technology. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fid("website")}>Leave this field empty</label>
        <input
          id={fid("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          disabled={status.kind === "submitting"}
          className="w-full sm:w-auto"
        >
          {status.kind === "submitting"
            ? "Sending…"
            : "Request my free estimate"}
        </Button>
        <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-muted">
          Free estimates and consultations. We will use your details to get back
          to you about this request and nothing else.
        </p>
      </div>

      <div ref={resultRef} tabIndex={-1} aria-live="polite">
        {status.kind === "not_configured" && (
          <div className="border-l-4 border-gold-500 bg-gold-500/10 p-5">
            <p className="font-display text-[1.05rem] font-semibold text-ink">
              Preview build — this form is not connected yet.
            </p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
              Your details passed validation but were{" "}
              <strong>not sent to anyone</strong>, because email delivery has
              not been configured on this build. To reach Supernova right now,
              call{" "}
              <a
                href={business.phone.href}
                className="font-semibold text-forest-700 underline underline-offset-4"
              >
                {business.phone.display}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${business.email}`}
                className="font-semibold text-forest-700 underline underline-offset-4"
              >
                {business.email}
              </a>
              .
            </p>
          </div>
        )}
        {status.kind === "error" && (
          <div className="border-l-4 border-red-700 bg-red-50 p-5">
            <p className="text-[0.95rem] text-red-900">{status.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full min-h-12 border bg-white px-4 py-3 text-[1rem] text-ink",
    "placeholder:text-ink-muted/70",
    "transition-colors",
    hasError
      ? "border-red-700 focus:border-red-700"
      : "border-sage-300 focus:border-forest-600",
  ].join(" ");
}

function Field({
  id,
  errorId,
  label,
  hint,
  required,
  error,
  children,
}: {
  id: string;
  errorId: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.85rem] font-bold uppercase tracking-[0.06em] text-ink"
      >
        {label}
        {required && (
          <>
            {" "}
            <span className="text-forest-600" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.82rem] text-ink-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={errorId} className="mt-1.5 text-[0.85rem] font-medium text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
