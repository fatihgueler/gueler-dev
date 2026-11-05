import * as React from "react";

import { ausblick } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/**
 * Ausblick 2027 — offener Hinweis auf Umschulung und Erreichbarkeit.
 * Bewusst auf /ueber statt auf der Startseite: wer hier liest, will die
 * Person kennenlernen; die Sorge "ist der bald weg?" wird direkt beantwortet.
 */
export function Ausblick() {
  return (
    <Section id="ausblick">
      <SectionHeading eyebrow={ausblick.eyebrow} title={ausblick.title} />
      <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
        {ausblick.paragraphs.map((text, i) => (
          <Reveal key={text} delay={i * 90} className="h-full">
            <p className="flex h-full gap-4 bg-background p-7 text-base leading-relaxed text-foreground/85">
              <span aria-hidden className="font-mono text-xs font-bold text-violet-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{text}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
