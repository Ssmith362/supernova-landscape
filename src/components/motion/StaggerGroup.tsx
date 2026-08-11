"use client";

import { Children, type ElementType, type ReactNode } from "react";
import { Reveal } from "./Reveal";

const TAGS = {
  div: "div",
  ul: "ul",
  ol: "ol",
  dl: "dl",
} as const;

type Tag = keyof typeof TAGS;

/**
 * Sugar over `Reveal` for the common case: a row or grid of uniform items
 * that should stagger in left-to-right / top-to-bottom rather than all
 * fading in at once.
 *
 * Takes `children` — an array of already-rendered elements — rather than a
 * `renderItem` callback. Most call sites here are server components (the
 * page itself), and a function prop can't cross the server→client boundary
 * (only already-resolved JSX can); mapping the data to elements has to
 * happen in the caller, before it reaches this component.
 *
 * Renders the wrapper tag itself (so it can BE the `<ul>` a list of `<li>`
 * needs) and gives each child its own `Reveal`, so every item still shares
 * the single app-wide IntersectionObserver — this is not one observer per
 * card. The delay is capped at `cap` items' worth of stagger so a long grid
 * doesn't end up waiting most of a second to appear.
 */
export function StaggerGroup({
  children,
  as = "div",
  itemAs = "div",
  className = "",
  itemClassName = "",
  stagger = 70,
  cap = 6,
  baseDelay = 0,
}: {
  children: ReactNode;
  as?: Tag;
  itemAs?: Parameters<typeof Reveal>[0]["as"];
  className?: string;
  itemClassName?: string;
  /** Milliseconds between each item's entrance. */
  stagger?: number;
  /** Item index beyond which the delay stops increasing. */
  cap?: number;
  /** Extra delay added to every item, e.g. to land after a heading reveal. */
  baseDelay?: number;
}) {
  const Wrapper = TAGS[as] as ElementType;
  const items = Children.toArray(children);

  return (
    <Wrapper className={className}>
      {items.map((child, i) => (
        <Reveal
          key={i}
          as={itemAs}
          delay={baseDelay + Math.min(i, cap) * stagger}
          className={itemClassName}
        >
          {child}
        </Reveal>
      ))}
    </Wrapper>
  );
}
