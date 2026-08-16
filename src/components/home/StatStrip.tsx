import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/motion/Counter";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StarMark } from "@/components/ui/StarMark";
import { reputation } from "@/config/site";

/**
 * The four proof tiles, sitting on the hero's own night register as its foot
 * rather than as the first light section. No divider separates them from the
 * hero above — they read as the base of one continuous opening block, and the
 * ridge divider into the light services section is placed after them.
 *
 * Only the rating is a real number, so only the rating counts up; "Free",
 * "Weekly" and "Year-round" are words and are left alone. Animating a
 * counter under text that never changes would be motion for its own sake.
 */
const trustItems: {
  k: string;
  v: string;
  /** Present only where the headline value is genuinely numeric. */
  count?: { value: number; decimals: number };
}[] = [
  {
    k: `${reputation.rating} ★`,
    v: `Average across ${reputation.reviewCount} Google reviews`,
    count: { value: reputation.rating, decimals: 1 },
  },
  { k: "Free", v: "Estimates and on-site consultations" },
  { k: "Weekly", v: "Mowing routes — we do not run bi-weekly" },
  {
    k: "Year-round",
    v: "Mowing through summer, plowing through winter",
  },
];

export function StatStrip() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 pb-4">
      <Container>
        <StaggerGroup
          as="dl"
          itemAs="div"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={80}
        >
          {trustItems.map((item) => (
            <div
              key={item.k}
              className="hairline-dark lift glass h-full rounded-xs px-5 py-6"
            >
              <dt className="flex items-baseline gap-1.5 font-display text-[2rem] font-semibold leading-none text-white">
                {item.count ? (
                  <>
                    <Counter
                      value={item.count.value}
                      decimals={item.count.decimals}
                    />
                    <StarMark
                      size={16}
                      className="self-center text-gold-500"
                    />
                  </>
                ) : (
                  item.k
                )}
              </dt>
              <dd className="mt-2.5 text-[0.9rem] leading-snug text-sage-200">
                {item.v}
              </dd>
              <span
                aria-hidden="true"
                className="reveal-rule-x mt-4 block h-px w-8 bg-gold-500"
              />
            </div>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
