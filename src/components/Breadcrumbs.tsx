import Link from "next/link";

export type Crumb = { name: string; href: string };

/**
 * Semantic breadcrumbs. The matching BreadcrumbList JSON-LD is emitted
 * separately by each page via lib/schema.ts.
 */
export function Breadcrumbs({
  crumbs,
  tone = "light",
}: {
  crumbs: Crumb[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const items = crumbs.slice(0, -1);
  const current = crumbs[crumbs.length - 1];

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] ${
          dark ? "text-sage-200" : "text-ink-muted"
        }`}
      >
        {items.map((c) => (
          <li key={c.href} className="flex items-center gap-2">
            <Link
              href={c.href}
              className={`underline-offset-4 hover:underline ${
                dark ? "hover:text-white" : "hover:text-forest-700"
              }`}
            >
              {c.name}
            </Link>
            <span aria-hidden="true" className="opacity-50">
              /
            </span>
          </li>
        ))}
        <li aria-current="page" className={dark ? "text-white" : "text-ink"}>
          {current.name}
        </li>
      </ol>
    </nav>
  );
}
