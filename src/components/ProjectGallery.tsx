"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/types";
import { getService } from "@/content/services";
import { ImageReveal } from "@/components/motion/ImageReveal";

type Slide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  blurb: string;
  serviceSlug: string;
  stage?: "Before" | "After";
};

/**
 * Filterable gallery with a native <dialog> lightbox.
 *
 * <dialog showModal()> gives us focus trapping, inertness of the background,
 * and Escape-to-close from the platform rather than from a library. Arrow keys
 * move between images.
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | "landscape" | "lawn">("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = projects.filter(
    (p) => filter === "all" || p.category === filter,
  );

  // Flatten to slides: a before/after pair contributes two slides.
  const slides: Slide[] = visible.flatMap((p) => {
    const common = {
      title: p.title,
      blurb: p.blurb,
      serviceSlug: p.serviceSlug,
    };
    const after: Slide = {
      ...common,
      ...p.after,
      stage: p.before ? ("After" as const) : undefined,
    };
    return p.before
      ? [{ ...common, ...p.before, stage: "Before" as const }, after]
      : [after];
  });

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const open = useCallback((i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setIndex((cur) => {
        if (cur === null) return cur;
        return (cur + delta + slides.length) % slides.length;
      });
    },
    [slides.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    }
    function onClose() {
      setIndex(null);
    }
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const active = index === null ? null : slides[index];
  const activeService = active ? getService(active.serviceSlug) : undefined;

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by type"
        className="mb-8 flex flex-wrap gap-2"
      >
        {(
          [
            ["all", "All projects"],
            ["landscape", "Landscape installs"],
            ["lawn", "Lawn maintenance"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            aria-pressed={filter === id}
            className={`min-h-11 rounded-xs border px-4 text-[0.88rem] font-semibold transition-colors ${
              filter === id
                ? "border-forest-600 bg-forest-600 text-white"
                : "border-sage-300 bg-white text-ink-soft hover:border-forest-600 hover:text-forest-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {slides.map((slide, i) => (
          <li key={`${slide.src}-${i}`}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden bg-sage-100"
              style={{ aspectRatio: "4 / 3" }}
            >
              <ImageReveal
                className="absolute inset-0"
                delay={Math.min(i, 5) * 60}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                  loading={i < 4 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </ImageReveal>
              <span className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-forest-950/5 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              {slide.stage && (
                <span
                  className={`absolute left-2.5 top-2.5 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] ${
                    slide.stage === "After"
                      ? "bg-gold-500 text-forest-950"
                      : "bg-forest-950/85 text-white"
                  }`}
                >
                  {slide.stage}
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 p-3 text-left text-[0.8rem] font-semibold leading-snug text-white sm:p-4 sm:text-[0.9rem]">
                {slide.title}
                <span className="mt-1 block text-[0.68rem] font-normal uppercase tracking-[0.1em] text-sage-200 opacity-0 transition-opacity group-hover:opacity-100">
                  View larger
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Project photo viewer"
        className="gallery-dialog m-auto max-h-[92dvh] w-[min(72rem,94vw)] bg-transparent p-0 backdrop:bg-forest-950/88 backdrop:backdrop-blur-sm"
      >
        {active && (
          <div className="flex max-h-[92dvh] flex-col bg-bone">
            <div className="flex items-center justify-between gap-4 border-b border-sage-200 px-4 py-2.5">
              <p className="text-[0.85rem] font-semibold text-ink">
                {index !== null && `${index + 1} of ${slides.length}`}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-11 items-center justify-center rounded-xs text-ink hover:bg-sage-100"
              >
                <span className="sr-only">Close photo viewer</span>
                <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
                  <path
                    d="M5 5l12 12M17 5L5 17"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-forest-950">
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="(max-width: 1200px) 94vw, 72rem"
                className="mx-auto max-h-[62dvh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-bone/90 text-ink shadow-lift hover:bg-bone"
              >
                <span className="sr-only">Previous photo</span>
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path
                    d="M11.5 3L5.5 9l6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-bone/90 text-ink shadow-lift hover:bg-bone"
              >
                <span className="sr-only">Next photo</span>
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path
                    d="M6.5 3l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="border-t border-sage-200 px-4 py-4 sm:px-6">
              <h2 className="font-display text-[1.15rem] font-semibold text-ink">
                {active.title}
                {active.stage && (
                  <span className="ml-2 align-middle text-[0.7rem] font-bold uppercase tracking-[0.12em] text-forest-600">
                    {active.stage}
                  </span>
                )}
              </h2>
              <p className="mt-1.5 max-w-2xl text-[0.92rem] leading-relaxed text-ink-soft">
                {active.blurb}
              </p>
              {activeService && (
                <Link
                  href={`/services/${activeService.slug}`}
                  onClick={close}
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-bold text-forest-700 underline underline-offset-4 hover:text-forest-500"
                >
                  About our {activeService.name.toLowerCase()} work
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
