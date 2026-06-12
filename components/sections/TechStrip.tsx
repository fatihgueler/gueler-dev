"use client";

import * as React from "react";
import { m } from "framer-motion";

import { techStack } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";

/**
 * Horizontal ziehbare Tech-Stack-Leiste (Drag/Swipe).
 * touch-pan-y erlaubt weiterhin vertikales Scrollen auf Touch-Geräten.
 */
export function TechStrip() {
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      aria-label="Technologie-Stack"
      className="relative border-y border-border bg-surface/40 py-7"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
        aria-hidden
      />

      <Reveal variant="fadeIn">
      <div ref={constraintsRef} className="overflow-hidden">
        <m.ul
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.08}
          className="flex w-max cursor-grab touch-pan-y items-center gap-14 px-10 active:cursor-grabbing"
        >
          {techStack.map((tech) => (
            <li
              key={tech}
              className="whitespace-nowrap text-lg font-medium tracking-wide text-muted-2 transition-colors hover:text-cyan"
            >
              {tech}
            </li>
          ))}
        </m.ul>
      </div>
      </Reveal>
    </section>
  );
}
