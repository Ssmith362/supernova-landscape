"use client";

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type Props = {
  children: ReactNode;
  location: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  size?: "md" | "lg";
  className?: string;
};

/** Quote CTA wrapper so every "get an estimate" click is measurable. */
export function QuoteCta({
  children,
  location,
  href = "/get-a-quote",
  variant = "primary",
  size = "md",
  className,
}: Props) {
  return (
    <ButtonLink
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => trackEvent("quote_cta_click", { location })}
    >
      {children}
    </ButtonLink>
  );
}
