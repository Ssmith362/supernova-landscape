import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteCta } from "@/components/QuoteCta";
import { business } from "@/config/site";
import { services } from "@/content/services";
import { locations } from "@/content/locations";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-[2.1rem] leading-[1.08] text-ink sm:text-[2.7rem]">
            That page isn&rsquo;t here
          </h1>
          <p className="mt-4 text-[1.08rem] leading-relaxed text-ink-soft">
            The link may be out of date, or the page may have moved when the
            site was rebuilt. Everything Supernova does is listed below — or
            call{" "}
            <PhoneLink
              location="404"
              className="font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
            />{" "}
            and we will point you the right way.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <QuoteCta location="404" size="lg">
              Get a Free Quote
            </QuoteCta>
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center rounded-xs border border-forest-600/40 px-7 text-[1.02rem] font-bold text-forest-700 transition-colors hover:border-forest-600 hover:bg-sage-50"
            >
              Back to the homepage
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-sage-200 pt-10 sm:grid-cols-2">
          <nav aria-label="Services">
            <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
              Services
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {services
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-[0.92rem] font-semibold text-ink-soft underline-offset-4 hover:text-forest-700 hover:underline"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <nav aria-label="Other pages">
            <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-forest-600">
              Elsewhere on the site
            </h2>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/projects", label: "Project gallery" },
                { href: "/reviews", label: `Reviews` },
                { href: "/about", label: "About Supernova" },
                { href: "/resources", label: "Spokane yard guides" },
                { href: "/contact", label: `Contact — ${business.phone.display}` },
                ...locations.map((l) => ({
                  href: `/service-areas/${l.slug}`,
                  label: l.cityState,
                })),
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.92rem] font-semibold text-ink-soft underline-offset-4 hover:text-forest-700 hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
