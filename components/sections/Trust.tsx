import * as React from "react";

import { trust } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/**
 * Warum-ich — Brutalist-Ausbau: Card-Surface + Icons raus, stattdessen
 * das Haarlinien-Grid der Startseiten-Outcomes (Stil-Konsistenz):
 * Riesenindex als Outline-Stempel, Hover invertiert die Zelle hart.
 */
export function Trust() {
  return (
    <Section id="warum-ich">
      <SectionHeading
        eyebrow={trust.eyebrow}
        title={trust.title}
        centered
      />

      <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {trust.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 90} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden bg-background p-7 transition-colors duration-100 hover:bg-foreground">
              <span
                aria-hidden
                className="outcome-index pointer-events-none absolute -right-2 -top-4 select-none font-mono text-[clamp(3.5rem,6vw,5rem)] font-black leading-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative font-mono text-xs text-violet-3 transition-colors duration-100 group-hover:text-background/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative mt-3 font-display text-lg font-bold text-foreground transition-colors duration-100 group-hover:text-background">
                {item.title}
              </h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-muted transition-colors duration-100 group-hover:text-background/70">
                {item.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
