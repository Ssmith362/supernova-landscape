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
      {/* `display-2` is the one H2 scale used site-wide (globals.css). All 24
          call sites take the default `h2`, so the scale lives here rather
          than being repeated per page. */}
      <As className={`display-2 mt-3.5 ${dark ? "text-white" : "text-ink"}`}>
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
