import Image from "next/image";

/**
 * Intentional placeholder for photography Supernova has not supplied yet.
 *
 * The audit flagged the absence of owner and crew photos as a high-priority
 * trust gap. Rather than putting a stock model on the About page and implying
 * it is Damien, this renders a deliberate branded slot that names exactly what
 * belongs there — so the gap is visible to the client and impossible to ship
 * by accident.
 */
export function PhotoPlaceholder({
  label,
  note,
  aspect = "4 / 5",
}: {
  label: string;
  note: string;
  aspect?: string;
}) {
  return (
    <figure
      className="relative flex flex-col items-center justify-center overflow-hidden border border-forest-800 bg-forest-900 p-8 text-center"
      style={{ aspectRatio: aspect }}
    >
      <Image
        src="/brand/mark.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={512}
        className="mb-5 h-16 w-auto opacity-70 brightness-0 invert"
      />
      <figcaption>
        <span className="block font-sans text-[0.72rem] font-bold uppercase tracking-[0.16em] text-gold-400">
          Photography to come
        </span>
        <span className="mt-2 block font-display text-[1.15rem] font-semibold leading-snug text-white">
          {label}
        </span>
        <span className="mt-2.5 block max-w-xs text-[0.85rem] leading-relaxed text-sage-300">
          {note}
        </span>
      </figcaption>
    </figure>
  );
}
