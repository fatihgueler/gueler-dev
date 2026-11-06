"use client";

import * as React from "react";

import { techStack } from "@/lib/content";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";

/**
 * Laufband in Ink, gekoppelt an das Scroll-Tempo: schneller Scroll = schnelles
 * Band, Scroll nach oben dreht die Richtung. Ohne JS läuft die CSS-Animation,
 * bei reduzierter Bewegung steht es still. Für Screenreader nur einmal da.
 */
export function Marquee() {
  const trackRef = React.useRef<HTMLDivElement>(null);

  useVelocityMarquee(trackRef);

  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center ${hidden ? "marquee-dup" : ""}`}
    >
      {techStack.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="display px-5 text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-none">{item}</span>
          <span aria-hidden className="size-3 bg-signal" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Kurz gesagt"
      className="marquee overflow-hidden border-b-2 border-border bg-foreground py-4 text-background"
    >
      <div ref={trackRef} className="marquee-track will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
