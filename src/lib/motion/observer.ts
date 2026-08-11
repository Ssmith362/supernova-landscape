"use client";

/**
 * A shared, singleton IntersectionObserver registry.
 *
 * Every scroll-triggered reveal on the site (Reveal, ImageReveal,
 * StaggerGroup, ProcessTimeline, the before/after instructional pulse) goes
 * through `observeOnce` rather than constructing its own `IntersectionObserver`.
 * Observers are pooled by their options signature, so — in the typical case
 * where everything uses the same threshold/rootMargin — the entire page
 * shares ONE observer instance no matter how many elements are being watched.
 *
 * Each registration fires at most once: the element is unobserved and its
 * callback discarded the moment it intersects, which is all a one-shot
 * scroll reveal needs and keeps the registry from growing unbounded on
 * long pages.
 */

type Callback = (entry: IntersectionObserverEntry) => void;

type Registry = {
  observer: IntersectionObserver;
  callbacks: WeakMap<Element, Callback>;
};

const registries = new Map<string, Registry>();

function keyFor(options: IntersectionObserverInit): string {
  return `${options.threshold ?? ""}|${options.rootMargin ?? ""}`;
}

/**
 * Observe `el` and invoke `callback` the first time it intersects the
 * viewport, then stop watching it. Returns a cleanup function that cancels
 * the registration early (e.g. on unmount before it ever intersects).
 *
 * Falls back to firing immediately when IntersectionObserver is unavailable
 * (very old browsers), so content is never permanently stuck hidden.
 */
export function observeOnce(
  el: Element,
  callback: Callback,
  options: IntersectionObserverInit = {
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px",
  },
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    callback({ isIntersecting: true } as IntersectionObserverEntry);
    return () => {};
  }

  const key = keyFor(options);
  let registry = registries.get(key);

  if (!registry) {
    const callbacks = new WeakMap<Element, Callback>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const cb = callbacks.get(entry.target);
        if (!cb) continue;
        cb(entry);
        observer.unobserve(entry.target);
        callbacks.delete(entry.target);
      }
    }, options);
    registry = { observer, callbacks };
    registries.set(key, registry);
  }

  registry.callbacks.set(el, callback);
  registry.observer.observe(el);

  return () => {
    registry!.observer.unobserve(el);
    registry!.callbacks.delete(el);
  };
}
