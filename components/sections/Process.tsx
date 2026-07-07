import * as React from "react";

import { process } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/**
 * Ablauf (/leistungen) — gleiche Brutalist-Sprache wie die
 * Startseiten-ProcessSteps: Haarlinien-Zeilen, riesige Outline-Nummer,
 * harter Zeilen-Invert beim Hover.
 */
export function Process() {
  return (
    <Section id="ablauf">
      <SectionHeading
        eyebrow={process.eyebrow}
        title={process.title}
        subtitle={process.subtitle}
      />

      <div className="mt-16 border-t border-border">
        {process.steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 70}>
            <div className="group border-b border-border">
              <div className="-mx-4 grid grid-cols-[3.5rem_1fr] gap-6 px-4 py-8 transition-colors duration-100 group-hover:bg-foreground md:-mx-8 md:grid-cols-[10rem_1fr_2fr] md:gap-12 md:px-8 md:py-12">
                <span
                  aria-hidden
                  className="text-outline-strong timeline-year select-none font-mono text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.85]"
                >
                  {step.number}
                </span>
                <h3 className="self-center font-display text-xl font-bold text-foreground transition-colors duration-100 group-hover:text-background md:text-2xl">
                  <span className="sr-only">{step.number} — </span>
                  {step.title}
                </h3>
                <p className="col-span-2 self-center text-sm leading-relaxed text-muted transition-colors duration-100 group-hover:text-background/70 md:col-span-1 md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
