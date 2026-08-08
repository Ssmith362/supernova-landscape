/**
 * Renders a JSON-LD script tag. Server component — no client JS cost.
 * `data` must already be a serialised string from lib/schema.ts `graph()`.
 */
export function JsonLd({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      // Content is generated from our own typed builders, never user input.
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
