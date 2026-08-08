import type { ReactNode } from "react";

const widths = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  narrow: "max-w-3xl",
  prose: "max-w-[46rem]",
} as const;

export function Container({
  children,
  size = "default",
  className = "",
}: {
  children: ReactNode;
  size?: keyof typeof widths;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 ${widths[size]} ${className}`}>
      {children}
    </div>
  );
}
