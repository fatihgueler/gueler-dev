"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";

type DrawnAccentProps = {
  className?: string;
};

/** SVG-Akzentlinie, die sich beim Sichtbarwerden selbst zeichnet (pathLength). */
export function DrawnAccent({ className }: DrawnAccentProps) {
  // pathLength fällt nicht unter MotionConfig reducedMotion="user"
  // (nur Transforms/Layout) — deshalb hier ein expliziter Guard.
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 220 12" className={className} aria-hidden>
      <m.path
        d="M3 9 C 60 2, 160 2, 217 7"
        className="fill-none stroke-cyan"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={shouldReduceMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  );
}
