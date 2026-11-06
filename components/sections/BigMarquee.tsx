"use client";

import * as React from "react";
import Link from "next/link";

import { hero } from "@/lib/content";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";

/**
 * Riesiges Outline-Laufband als Klickfläche zum Kontakt. Läuft gegen die
 * Richtung des oberen Bandes, füllt sich beim Hover in Signal.
 */
export function BigMarquee() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  useVelocityMarquee(trackRef, { base: 1.1, skew: 0.25, reverse: true });

  const item = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className={`flex shrink-0 items-center ${hidden ? "marquee-dup" : ""}`}>
      {[0, 1].map((k) => (
        <span key={k} className="flex items-center">
          <span className="big-marquee-text display whitespace-nowrap px-6 text-[clamp(4rem,2rem+10vw,13rem)] leading-[0.9]">
            {hero.cta.label}
          </span>
          <span aria-hidden className="display text-[clamp(4rem,2rem+10vw,13rem)] leading-[0.9] text-signal">→</span>
        </span>
      ))}
    </span>
  );

  return (
    <Link
      href={hero.cta.href.startsWith("#") ? `/${hero.cta.href}` : hero.cta.href}
      data-cursor="Anfragen →"
      className="big-marquee group block overflow-hidden border-b-2 border-border bg-foreground py-6 text-background"
    >
      <span className="sr-only">{hero.cta.label}</span>
      <div ref={trackRef} className="marquee-track will-change-transform" aria-hidden>
        {item(false)}
        {item(true)}
      </div>
    </Link>
  );
}
