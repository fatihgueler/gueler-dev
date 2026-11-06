import * as React from "react";

import { storyPitch } from "@/lib/content";
import { ScrubText } from "@/components/home/ScrubText";

/**
 * Problem: der Pitch als ein großer Satzblock (keine Karten), Akzente als
 * Signal-Marker. Darunter die Schmerzpunkte als nummerierte Mängelliste.
 */
export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="border-b-2 border-border py-[var(--spacing-section)]">
      <div className="frame">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="label flex items-center gap-3 self-start md:col-span-3">
            <span className="bg-foreground px-1.5 py-0.5 text-background rounded-full">01</span>
            Dein Problem
          </p>
          <ScrubText
            id="problem-title"
            segments={storyPitch.segments}
            className="font-display text-[clamp(2.1rem,1.2rem+4.2vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.02em] md:col-span-9"
          />
        </div>

        <ol data-sp data-rv-stagger="90" className="mt-[var(--spacing-section)] grid border-t-2 border-border md:grid-cols-2">
          {storyPitch.pains.map((pain, i) => (
            <li
              key={pain}
              data-rv="up"
              className="flex gap-5 border-b-2 border-border py-6 md:px-6 md:even:border-l-2 md:[&:nth-child(odd)]:pl-0"
            >
              <span className="label shrink-0 pt-1 text-signal-text">✕ {String(i + 1).padStart(2, "0")}</span>
              <p className="px-x text-[length:var(--text-lead)] leading-snug" style={{ "--speed": i % 2 ? -90 : 90 } as React.CSSProperties}>{pain}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
