import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/config/navigation";
import {
  business,
  clientPortalUrl,
  reputation,
  serviceAreaSummary,
  socials,
} from "@/config/site";
import { PhoneLink } from "@/components/PhoneLink";
import { Stars } from "@/components/Stars";
import { Reveal } from "@/components/motion/Reveal";

export function SiteFooter() {
  // Generated once, in one place — fixes the 2025/2026 mismatch on the old site.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t-4 border-gold-500 bg-forest-950 text-sage-200 pb-action-bar">
      <Reveal
        as="div"
        distance={14}
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          {/* Business identity + NAP */}
          <div>
            <Link href="/" aria-label="Supernova Landscape — home">
              <Image
                src="/brand/logo.png"
                alt="Supernova Landscape Company"
                width={900}
                height={495}
                sizes="200px"
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">
              Family-owned landscaping, lawn maintenance, irrigation and snow
              removal. {serviceAreaSummary}.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Stars rating={reputation.rating} size={16} />
              <span className="text-sm font-semibold text-white">
                {reputation.rating.toFixed(1)} · {reputation.reviewCount} Google
                reviews
              </span>
            </div>

            <dl className="mt-7 space-y-3 text-[0.95rem]">
              <div className="flex gap-3">
                <dt className="sr-only">Phone</dt>
                <dd>
                  <PhoneLink
                    location="footer"
                    className="text-lg font-bold text-white underline-offset-4 hover:text-gold-400 hover:underline"
                  />
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Email</dt>
                <dd>
                  <a
                    href={`mailto:${business.email}`}
                    className="underline-offset-4 hover:text-white hover:underline"
                  >
                    {business.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-sage-500">
                  Service area
                </dt>
                <dd className="mt-1">
                  Spokane · Spokane Valley · Liberty Lake, WA
                </dd>
              </div>
              {business.address && (
                <div>
                  <dt className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-sage-500">
                    Address
                  </dt>
                  <dd className="mt-1">
                    {business.address.street}, {business.address.city},{" "}
                    {business.address.region} {business.address.postalCode}
                  </dd>
                </div>
              )}
              {business.hours && (
                <div>
                  <dt className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-sage-500">
                    Hours
                  </dt>
                  <dd className="mt-1 space-y-0.5">
                    {business.hours.map((h) => (
                      <div key={h.days}>
                        {h.days}: {h.opens}–{h.closes}
                      </div>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            <ul className="mt-7 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center rounded-xs border border-white/20 px-3.5 text-[0.85rem] font-semibold text-white transition-colors hover:border-gold-500 hover:text-gold-400"
                  >
                    {s.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={reputation.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center rounded-xs border border-gold-500/60 bg-gold-500/10 px-3.5 text-[0.85rem] font-semibold text-gold-400 transition-colors hover:bg-gold-500/20"
                >
                  Google reviews
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-gold-400">
                  {col.heading}
                </h2>
                <ul className="mt-4 space-y-2.5 text-[0.92rem]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/12 pt-7 text-[0.82rem] sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <p>
              © {year} {business.legalName}. All rights reserved.
            </p>
            {business.contractorRegistration && (
              <p>
                WA contractor registration #{business.contractorRegistration}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={clientPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline-offset-4 hover:text-gold-400 hover:underline"
            >
              Client login
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link
              href="/careers"
              className="underline-offset-4 hover:text-white hover:underline"
            >
              Careers
            </Link>
            <Link
              href="/privacy-policy"
              className="underline-offset-4 hover:text-white hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/sitemap.xml"
              className="underline-offset-4 hover:text-white hover:underline"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
