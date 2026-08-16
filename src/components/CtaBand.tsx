import { business } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { PhoneLink } from "@/components/PhoneLink";
import { QuoteCta } from "@/components/QuoteCta";
import { RatingBadge } from "@/components/RatingBadge";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The closing CTA. Every commercial page ends with this, so no page is a
 * dead end and every page offers both conversion routes: call, or request.
 *
 * This is the page's supernova moment — the one place the ember accent is
 * allowed to bloom rather than just mark. The glow is a pair of decorative
 * siblings behind the content (a wide radial wash plus a tighter core), both
 * animating only opacity and scale on their own slow cycle. Nothing here
 * animates the headline or the button themselves, so the breathing can never
 * interfere with the CTA's hover lift, its shiny sweep, or text rendering.
 *
 * Sequenced as: review proof, then heading, then supporting copy, then the
 * CTA group — each its own Reveal so they stage in as a short, deliberate
 * sequence rather than arriving as one block.
 */
export function CtaBand({
  heading = "Get a free estimate",
  body = "Tell us what the property needs and we will come and look at it. Estimates and consultations are free — there is no charge for the visit.",
  location,
}: {
  heading?: string;
  body?: string;
  /** Analytics label identifying which page this band sits on. */
  location: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-white">
      <div aria-hidden="true" className="starfield opacity-80" />

      {/* The bloom, behind everything. */}
      <div
        aria-hidden="true"
        className="ember-bloom pointer-events-none absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/12 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="ember-bloom pointer-events-none absolute left-1/2 top-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/14 blur-[80px]"
        style={{ animationDelay: "1.4s" }}
      />

      <Reveal as="div">
        <Container className="relative py-20 sm:py-28">
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <span
              aria-hidden="true"
              className="reveal-rule-y absolute inset-y-0 left-[calc(56%+1.25rem)] hidden w-px bg-white/15 lg:block"
            />

            <div>
              <Reveal>
                <RatingBadge tone="dark" />
              </Reveal>
              <Reveal delay={90}>
                <h2 className="display-2 mt-5 max-w-xl text-white">
                  {heading}
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-5 max-w-xl text-[1.03rem] leading-relaxed text-sage-200">
                  {body}
                </p>
              </Reveal>
            </div>

            <Reveal delay={270} className="flex flex-col gap-3 lg:items-end">
              <div className="relative w-full lg:w-auto">
                <span
                  aria-hidden="true"
                  className="ember-bloom pointer-events-none absolute -inset-4 rounded-xs bg-gold-500/30 blur-xl"
                />
                <QuoteCta
                  location={location}
                  size="lg"
                  className="relative w-full lg:w-auto"
                >
                  Get a Free Quote
                </QuoteCta>
              </div>
              <PhoneLink
                location={location}
                className="glass inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xs px-7 text-[1.05rem] font-bold text-white transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:border-white/45 hover:bg-white/10 focus-visible:-translate-y-px focus-visible:border-white/45 focus-visible:bg-white/10 active:translate-y-0 lg:w-auto"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    d="M4.6 2.5h2.6l1.3 3.3-1.6 1.2a10.6 10.6 0 0 0 4.6 4.6l1.2-1.6 3.3 1.3v2.6a1.6 1.6 0 0 1-1.7 1.6A13.3 13.3 0 0 1 3 4.2a1.6 1.6 0 0 1 1.6-1.7Z"
                    fill="currentColor"
                  />
                </svg>
                {business.phone.display}
              </PhoneLink>
              <p className="text-[0.82rem] text-sage-300 lg:text-right">
                Spokane · Spokane Valley · Liberty Lake
              </p>
            </Reveal>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
