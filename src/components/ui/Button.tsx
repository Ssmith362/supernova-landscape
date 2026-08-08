import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs font-semibold " +
  "transition-colors duration-150 " +
  // 48px minimum tap target on every variant.
  "min-h-12 text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-forest-950 hover:bg-gold-400 active:bg-gold-600 shadow-card",
  secondary:
    "bg-forest-600 text-white hover:bg-forest-500 active:bg-forest-700 shadow-card",
  ghost:
    "border border-forest-600/35 bg-white text-forest-700 hover:border-forest-600 hover:bg-sage-50",
  onDark:
    "border border-white/35 bg-white/5 text-white hover:bg-white/15 hover:border-white/60",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-base sm:text-[1.05rem]",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/** A link that looks like a button. Use for navigation (including tel:). */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isExternal = /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    return (
      <a href={href} className={classes} {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** A real <button>. Use only for in-page actions, never for navigation. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
