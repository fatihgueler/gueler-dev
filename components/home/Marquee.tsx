"use client";

import * as React from "react";

import { techStack } from "@/lib/content";
import { useVelocityMarquee } from "@/lib/useVelocityMarquee";

function Band({ tone, reverse, hidden }: { tone: "ink" | "signal"; reverse?: boolean; hidden?: boolean }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  useVelocityMarquee(trackRef, { base: tone === "ink" ? 0.6 : 0.9, reverse });

  const row = (dup: boolean) => (
    <ul aria-hidden={hidden || dup || undefined} className={`flex shrink-0 items-center ${dup ? "marquee-dup" : ""}`}>
      {techStack.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="display px-5 text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-none">{item}</span>
          <span aria-hidden className={`size-3 ${tone === "ink" ? "bg-signal" : "bg-ink"}`} />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`-mx-[5vw] w-[110vw] border-y-2 border-ink py-3 ${
        tone === "ink" ? "relative z-10 -rotate-2 bg-foreground text-background" : "absolute left-0 top-1/2 -translate-y-1/2 rotate-2 bg-signal text-on-signal"
      }`}
    >
      <div ref={trackRef} className="marquee-track will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/**
 * Zwei gekreuzte Laufbänder („Absperrband"): Ink oben, Signal darunter,
 * gegenläufig, beide an Scroll-Tempo und -Richtung gekoppelt. Das Signal-
 * Band ist reine Deko (aria-hidden). Reduced-Motion: stehen still.
 */
export function Marquee() {
  return (
    <section aria-label="Kurz gesagt" className="relative overflow-hidden border-b-2 border-border py-14 md:py-20">
      <Band tone="signal" reverse hidden />
      <Band tone="ink" />
    </section>
  );
}
