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
 * Sequenced as: review proof, then heading, then supporting copy, then the
 * CTA group — each its own Reveal so they stage in as a short, deliberate
 * sequence rather than arriving as one block. The background watermark is a
 * static gradient, not an animation — nothing here loops.
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
    <section className="relative overflow-hidden bg-forest-900 text-white">
      {/* Subtle crest watermark — brand texture without a stock photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 size-[26rem] rounded-full bg-forest-800/60 blur-3xl"
      />
      <Reveal as="div">
        <Container className="relative py-16 sm:py-20">
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
                <h2 className="mt-4 max-w-xl text-[1.9rem] leading-[1.14] text-white sm:text-[2.3rem]">
                  {heading}
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-4 max-w-xl text-[1.03rem] leading-relaxed text-sage-200">
                  {body}
                </p>
              </Reveal>
            </div>

            <Reveal delay={270} className="flex flex-col gap-3 lg:items-end">
              <QuoteCta location={location} size="lg" className="w-full lg:w-auto">
                Get a Free Quote
              </QuoteCta>
              <PhoneLink
                location={location}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xs border border-white/35 px-7 text-[1.05rem] font-bold text-white transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:border-white hover:bg-white/10 focus-visible:-translate-y-px focus-visible:border-white focus-visible:bg-white/10 active:translate-y-0 lg:w-auto"
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
