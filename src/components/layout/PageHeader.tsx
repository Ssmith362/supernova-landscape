import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import type { ImageRef } from "@/content/types";

/**
 * Standard interior page header. With `image` it renders a dark photographic
 * band; without one it renders a clean editorial header on the bone
 * background. Both keep a stable height so nothing shifts on load.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  image,
  actions,
  priority = true,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  crumbs: Crumb[];
  image?: ImageRef;
  actions?: ReactNode;
  priority?: boolean;
}) {
  if (!image) {
    return (
      <section className="border-b border-sage-200 bg-white">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-6 max-w-3xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="display-page mt-3.5 text-ink">{title}</h1>
            {lede && (
              <div className="mt-5 text-[1.08rem] leading-relaxed text-ink-soft">
                {lede}
              </div>
            )}
            {actions && (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {actions}
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-forest-950">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        quality={65}
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/88 to-forest-950/45"
      />
      <Container className="relative py-12 sm:py-20">
        <Breadcrumbs crumbs={crumbs} tone="dark" />
        <div className="mt-6 max-w-3xl">
          {eyebrow && <p className="eyebrow eyebrow-light">{eyebrow}</p>}
          <h1 className="display-page mt-3.5 text-white">{title}</h1>
          {lede && (
            <div className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-sage-100">
              {lede}
            </div>
          )}
          {actions && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>
          )}
        </div>
      </Container>
    </section>
  );
}
