import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/types";

/**
 * Every card links to its own page. On the old site the three homepage service
 * cards were the best copy on the page and all three led nowhere.
 */
export function ServiceCard({
  service,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  service: Service;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden border border-sage-200 bg-white transition-shadow duration-200 hover:shadow-lift">
      <div className="relative aspect-4/3 overflow-hidden bg-sage-100">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.2rem] leading-snug text-ink">
          <Link
            href={`/services/${service.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {service.name}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-[0.93rem] leading-relaxed text-ink-soft">
          {service.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-bold uppercase tracking-[0.08em] text-forest-700 transition-colors group-hover:text-forest-500">
          Learn more
          <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
            <path
              d="M8.6 1L12.5 5M12.5 5L8.6 9M12.5 5H1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </article>
  );
}
