import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  as: As = "h2",
  className = "",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <p className={`eyebrow ${dark ? "eyebrow-light" : ""}`}>{eyebrow}</p>
      )}
      <As
        className={`mt-3 text-[1.9rem] leading-[1.12] sm:text-[2.35rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </As>
      {lede && (
        <div
          className={`mt-4 text-[1.05rem] leading-relaxed ${
            dark ? "text-sage-200" : "text-ink-soft"
          }`}
        >
          {lede}
        </div>
      )}
      {children}
    </div>
  );
}
