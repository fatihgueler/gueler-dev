import * as React from "react";

import { timeline } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/anim/Reveal";

/**
 * Werdegang — Brutalist-Ausbau: die Teal-Verlaufslinie ist raus.
 * Jede Station ist eine Haarlinien-Zeile mit der Periode als riesiger
 * Outline-Jahreszahl; Hover invertiert die Zeile hart.
 */
export function Timeline() {
  return (
    <Section id="werdegang" className="bg-surface/30">
      <SectionHeading eyebrow={timeline.eyebrow} title={timeline.title} />

      <div className="mt-16 border-t border-border">
        {timeline.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.06}>
            <div className="group border-b border-border">
              <div className="-mx-4 grid grid-cols-1 gap-2 px-4 py-8 transition-colors duration-100 group-hover:bg-foreground md:-mx-6 md:grid-cols-[16rem_1fr] md:gap-10 md:px-6 md:py-10">
                <span
                  className="text-outline-strong timeline-year select-none font-mono text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-none tracking-tight"
                  aria-hidden
                >
                  {step.period}
                </span>
                <div>
                  <span className="sr-only">{step.period} — </span>
                  <h3 className="font-display text-xl font-bold text-foreground transition-colors duration-100 group-hover:text-background md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted transition-colors duration-100 group-hover:text-background/70">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
