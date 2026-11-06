import * as React from "react";

import { process } from "@/lib/content";
import { SectionHead } from "@/components/Section";

/**
 * Ablauf als Treppe: fünf Spalten mit sichtbaren Linien, jeder Schritt
 * sitzt eine Stufe tiefer. Mobil: senkrechte Linie mit Stationen.
 */
export function ProcessStairs({ index = "03" }: { index?: string }) {
  return (
    <section id="ablauf" aria-labelledby="process-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead
          id="process-title"
          index={index}
          label={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
        />
      </div>
      <ol className="frame-ruled mt-16 grid border-t-2 border-border md:grid-cols-5">
        {process.steps.map((step, i) => (
          <li
            key={step.number}
            className="border-b-2 border-border px-[var(--spacing-gutter)] pb-8 md:border-b-0 md:border-r-2 md:px-5 md:pb-12 md:last:border-r-0"
          >
            <div className="hidden md:block" style={{ height: `${i * 4}rem` }} aria-hidden />
            <div className="flex items-baseline gap-4 border-b-2 border-border py-4 md:block md:border-b-0 md:py-6">
              <span className="display outline-text text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.8]">
                {step.number}
              </span>
              <h3 className="text-xl font-bold leading-tight md:mt-5">{step.title}</h3>
            </div>
            <p className="mt-4 leading-relaxed text-muted md:mt-0">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
