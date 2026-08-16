"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSlidingIndicator } from "@/lib/motion/useSlidingIndicator";
import { primaryNav } from "@/config/navigation";
import { business, clientPortalUrl, reputation } from "@/config/site";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteCta } from "@/components/QuoteCta";
import { Stars } from "@/components/Stars";
import { StarMark } from "@/components/ui/StarMark";

/**
 * The header sits in the night register on every route, at every scroll
 * position. Its own colour is never conditional on what is underneath it.
 *
 * There was previously a "transparent until scrolled" state on the homepage,
 * on the assumption the bar was floating over the dark hero. It was not: this
 * header is `sticky` in normal document flow, so it occupies its own 73px and
 * the hero begins *below* it rather than behind it. Transparency therefore
 * revealed the bone `<body>` background, not the hero — white, sage and gold
 * text on cream, illegible on every first paint of the homepage.
 *
 * Making it genuinely overlay the hero would mean pulling the first section up
 * under the bar by the header's own height, which changes across breakpoints
 * (the utility strip is `lg`-only). That couples two components through a
 * magic number for a purely decorative gain, so the bar is simply always
 * opaque. `data-scrolled` still drives the shadow, which is what actually
 * communicates that the page has moved.
 *
 * The fill is flat `forest-950` rather than translucent glass for the same
 * reason: at 80% over the bone `<body>` it composited to rgb(53,67,59) while
 * the hero immediately below is rgb(4,21,12), which read as a lighter band
 * sitting on top of the hero. Matching the night register exactly removes
 * that seam and gives the text the most contrast available.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // One underline for the whole nav, slid to whichever item is current.
  const underline = useSlidingIndicator(navRef, pathname);

  // Close everything on navigation. Adjusting state during render (rather than
  // in an effect) avoids a second paint with the menu still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // A hairline + shadow once the page has scrolled — rAF-batched so the
  // scroll handler itself never does more than one boolean check per frame,
  // regardless of how many scroll events fire in between.
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes whichever layer is open; clicks outside close the dropdown.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (openMenu) setOpenMenu(null);
      else if (mobileOpen) setMobileOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu, mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  function openWithDelayClear(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  return (
    <>
      <header
        data-scrolled={scrolled}
        className="site-header sticky top-0 z-50 border-b border-white/12 bg-forest-950"
      >
        {/* Utility strip — desktop only, keeps the main bar uncluttered. */}
        <div className="hidden border-b border-white/10 text-white lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 py-1.5 text-[0.78rem]">
            <div className="flex items-center gap-2">
              <Stars rating={reputation.rating} size={13} />
              <span className="font-semibold">
                {reputation.rating.toFixed(1)} from {reputation.reviewCount}{" "}
                Google reviews
              </span>
              <span className="text-sage-300">
                · Serving Spokane, Spokane Valley &amp; Liberty Lake
              </span>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-sage-200">Free estimates</span>
              <a
                href={clientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold-400 underline-offset-4 hover:underline"
              >
                Client login
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="shrink-0"
            aria-label="Supernova Landscape — home"
          >
            <Image
              src="/brand/logo.png"
              alt="Supernova Landscape Company"
              width={900}
              height={495}
              priority
              sizes="(max-width: 1024px) 148px, 190px"
              className="h-11 w-auto brightness-0 invert sm:h-12 lg:h-14"
            />
          </Link>

          <nav
            ref={navRef}
            aria-label="Main"
            className="relative ml-auto hidden items-center gap-0.5 lg:flex"
          >
            {/* One shared underline that slides to the current page's item.
              Positioned with translate and scaled from a 1px base, so the
              movement is transform-only and stays off the main thread. It
              stays hidden until the first measurement lands, otherwise it
              would flash at the nav's left edge before jumping into place. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1 left-0 h-[2px] w-px origin-left bg-gold-500"
              style={{
                transform: `translateX(${underline.left}px) scaleX(${underline.width})`,
                opacity: underline.ready ? 1 : 0,
                transition:
                  "transform 420ms cubic-bezier(0.22,1,0.36,1), opacity 200ms linear",
              }}
            />

            {primaryNav.map((item) => {
              const active = isActive(item.href);

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    data-indicator-active={active || undefined}
                    className={`nav-link relative rounded-xs px-3 py-2 text-[0.9rem] font-semibold transition-colors ${
                      active ? "text-white" : "text-sage-200 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const expanded = openMenu === item.label;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openWithDelayClear(item.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    data-indicator-active={active || undefined}
                    aria-controls={`menu-${item.label.replace(/\s+/g, "-")}`}
                    onClick={() => setOpenMenu(expanded ? null : item.label)}
                    className={`nav-link relative flex items-center gap-1.5 rounded-xs px-3 py-2 text-[0.9rem] font-semibold transition-colors ${
                      active || expanded
                        ? "text-white"
                        : "text-sage-200 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                      className={`transition-transform duration-150 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>

                  {expanded && (
                    <div
                      id={`menu-${item.label.replace(/\s+/g, "-")}`}
                      className="absolute left-0 top-full z-50 w-[24rem] rounded-xs border border-white/12 bg-forest-950/95 p-2 shadow-lift backdrop-blur-md"
                    >
                      {item.overview && (
                        <Link
                          href={item.overview.href}
                          className="mb-1 block rounded-xs border-b border-white/10 px-3 py-2.5 text-[0.85rem] font-bold text-gold-400 hover:bg-white/5"
                        >
                          {item.overview.label}
                          <span aria-hidden="true"> →</span>
                        </Link>
                      )}
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-xs px-3 py-2 hover:bg-white/5"
                            >
                              <span className="block text-[0.9rem] font-semibold text-white">
                                {child.label}
                              </span>
                              {child.hint && (
                                <span className="mt-0.5 block text-[0.78rem] leading-snug text-sage-300">
                                  {child.hint}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-4 lg:gap-3">
            <PhoneLink
              location="header"
              className="hidden items-center gap-2 rounded-xs px-3 py-2 text-[0.95rem] font-bold text-gold-400 transition-colors hover:text-gold-200 md:inline-flex"
            >
              <PhoneIcon />
              {business.phone.display}
            </PhoneLink>

            <QuoteCta
              location="header"
              size="md"
              className="hidden sm:inline-flex"
            >
              Get a Free Quote
            </QuoteCta>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="inline-flex size-12 items-center justify-center rounded-xs border border-white/25 text-white lg:hidden"
            >
              <span className="sr-only">
                {mobileOpen ? "Close menu" : "Open menu"}
              </span>
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — a full-screen night overlay.

          It is rendered as a SIBLING of <header>, not inside it. The header
          carries `backdrop-blur`, and any non-`none` backdrop-filter makes an
          element a containing block for its fixed-position descendants — so
          nested inside the header, this drawer's `inset-0` resolved against
          the 375x73 header box instead of the viewport, and the drawer ended
          up covering its own close button. As a sibling at z-40 under the
          header's z-50, `inset-0` means the viewport and the bar stays above
          it and operable. */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="reveal-on-load fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-forest-950 lg:hidden"
        >
          <div aria-hidden="true" className="starfield opacity-70" />
          <nav
            aria-label="Mobile"
            className="relative px-5 pb-40 pt-[5.5rem] sm:pt-24"
          >
            <ul className="divide-y divide-white/10">
              {primaryNav.map((item, i) => (
                <li
                  key={item.href}
                  className="mobile-link-in py-1"
                  style={{ animationDelay: `${Math.min(i, 6) * 55}ms` }}
                >
                  {item.children ? (
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <svg
                          width="14"
                          height="9"
                          viewBox="0 0 10 6"
                          aria-hidden="true"
                          className="text-gold-400 transition-transform group-open:rotate-180"
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </summary>
                      <ul className="mb-2 ml-1 border-l border-white/15 pl-4">
                        {item.overview && (
                          <li>
                            <Link
                              href={item.overview.href}
                              className="block py-2.5 text-[0.95rem] font-bold text-gold-400"
                            >
                              {item.overview.label}
                            </Link>
                          </li>
                        )}
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-2.5 text-[0.95rem] text-sage-200"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 py-3.5 text-lg font-semibold text-white"
                    >
                      <StarMark size={10} className="shrink-0 text-gold-500" />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div
              className="mobile-link-in mt-6 space-y-3 border-t border-white/12 pt-6"
              style={{ animationDelay: "340ms" }}
            >
              <a
                href={clientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-[0.95rem] font-semibold text-gold-400"
              >
                Client login
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link
                href="/careers"
                className="block py-2 text-[0.95rem] font-semibold text-sage-200"
              >
                Careers
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4.6 2.5h2.6l1.3 3.3-1.6 1.2a10.6 10.6 0 0 0 4.6 4.6l1.2-1.6 3.3 1.3v2.6a1.6 1.6 0 0 1-1.7 1.6A13.3 13.3 0 0 1 3 4.2a1.6 1.6 0 0 1 1.6-1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path
        d="M3 6h16M3 11h16M3 16h16"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path
        d="M5 5l12 12M17 5L5 17"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}
