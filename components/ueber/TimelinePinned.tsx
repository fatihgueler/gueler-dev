"use client";

import * as React from "react";

import { timeline } from "@/lib/content";
import { SectionHead } from "@/components/Section";
import { usePinnedHorizontal } from "@/lib/usePinnedHorizontal";

/**
 * Werdegang als gepinnte Zeitleiste (≥ md): Die Sektion bleibt stehen, die
 * Stationen fahren seitlich durch, eine Linie mit Knoten zeigt den Weg.
 * Mobil / ohne JS / reduzierte Bewegung: senkrechte Liste.
 */
export function TimelinePinned() {
  const pinRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLOListElement>(null);
  const { progress, pinned } = usePinnedHorizontal(pinRef, trackRef);
  const n = timeline.steps.length;
  const active = Math.min(n - 1, Math.floor(progress * n * 0.999));

  return (
    <section aria-labelledby="timeline-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead id="timeline-title" index="02" label={timeline.eyebrow} title={timeline.title} />
      </div>

      <div ref={pinRef} className="relative mt-16">
        <div
          className={`relative border-t-2 border-border md:flex md:flex-col md:justify-center ${
            pinned ? "md:sticky md:top-16 md:h-[calc(100svh-4rem)] md:overflow-hidden" : "md:overflow-x-auto"
          }`}
        >
          {/* Zeitachse: Linie über die volle Breite, füllt sich mit dem Fortschritt */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[38%] hidden h-[2px] bg-border md:block" />
          <div
            aria-hidden
            className="sig-dot pointer-events-none absolute left-0 top-[calc(38%-2px)] hidden h-[6px] w-full origin-left bg-signal md:block"
            style={{ transform: `scaleX(${progress})` }}
          />
          <span
            aria-hidden
            className="sig-dot absolute left-0 top-0 z-10 h-full w-[6px] origin-top bg-signal md:hidden"
            style={{ transform: `scaleY(${progress})` }}
          />
          {pinned && (
            <p aria-hidden className="label absolute right-[var(--spacing-gutter)] top-6 hidden md:block">
              Station {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
          )}

          <ol ref={trackRef} className="relative md:flex md:w-max md:will-change-transform">
            {timeline.steps.map((step, i) => {
              const on = pinned ? i <= active : true;
              const isActive = pinned && i === active;
              return (
                <li
                  key={step.title}
                  className="relative border-b-2 border-border px-[var(--spacing-gutter)] py-8 md:flex md:h-[min(70svh,38rem)] md:w-[min(72vw,52rem)] md:flex-col md:justify-between md:border-b-0 md:px-12 md:py-10"
                >
                  <span
                    className={`display block text-[clamp(2.5rem,1.5rem+5vw,9rem)] transition-colors duration-200 ${
                      isActive ? "" : pinned ? "text-muted" : ""
                    }`}
                  >
                    {step.period}
                  </span>
                  {/* Knoten auf der Zeitachse */}
                  <span
                    aria-hidden
                    className={`absolute left-12 top-[calc(38%-13px)] hidden size-7 rounded-full border-2 border-ink transition-colors duration-200 md:block ${
                      on ? "bg-signal" : "bg-background"
                    }`}
                  />
                  <div className="mt-4 max-w-md md:mt-0">
                    <h3 className="text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] font-extrabold leading-tight" style={{ fontStretch: "86%" }}>
                      {step.title}
                    </h3>
                    <p className="mt-3 text-lg leading-snug text-muted">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
