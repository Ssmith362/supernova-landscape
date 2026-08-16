import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs font-semibold " +
  "transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  // A restrained 1-2px lift on hover/focus, and a 150ms press-down on tap.
  "hover:-translate-y-px focus-visible:-translate-y-px active:translate-y-0 active:scale-[0.985] " +
  // 48px minimum tap target on every variant.
  "min-h-12 text-center";

/**
 * `shiny` (see globals.css) adds the single specular sweep on hover/focus.
 * It goes on the two SOLID variants only — on the outlined ghost/onDark
 * variants a highlight passing over a transparent background reads as a
 * glitch rather than a sheen.
 */
const variants: Record<Variant, string> = {
  primary:
    "shiny bg-gold-500 text-forest-950 shadow-card hover:bg-gold-400 hover:shadow-lift focus-visible:bg-gold-400 focus-visible:shadow-lift active:bg-gold-600 active:shadow-card",
  secondary:
    "shiny bg-forest-600 text-white shadow-card hover:bg-forest-500 hover:shadow-lift focus-visible:bg-forest-500 focus-visible:shadow-lift active:bg-forest-700 active:shadow-card",
  ghost:
    "border border-forest-600/35 bg-white text-forest-700 hover:border-forest-600 hover:bg-sage-50 focus-visible:border-forest-600 focus-visible:bg-sage-50",
  onDark:
    "border border-white/35 bg-white/5 text-white hover:bg-white/15 hover:border-white/60 focus-visible:bg-white/15 focus-visible:border-white/60",
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
