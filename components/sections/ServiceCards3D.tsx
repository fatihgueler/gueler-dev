import * as React from "react";

import { services } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/**
 * Leistungen — Brutalist-Ausbau: der generische 3D-Tilt ist raus.
 * Jede Leistung ist eine full-width Haarlinien-Zeile mit riesiger
 * Outline-Nummer; Hover invertiert die komplette Zeile hart.
 * (Dateiname bleibt wegen bestehender Imports.)
 */
export function ServiceCards3D() {
  return (
    <Section id="leistungen">
      <SectionHeading
        eyebrow={services.eyebrow}
        title={services.title}
        subtitle={services.subtitle}
      />

      <div className="mt-16 border-t border-border">
        {services.items.map((service, i) => (
          <Reveal key={service.title} delay={i * 80}>
            <div className="group border-b border-border">
              <div className="-mx-4 grid grid-cols-[3.5rem_1fr] gap-6 px-4 py-10 transition-colors duration-100 group-hover:bg-foreground md:-mx-8 md:grid-cols-[10rem_1fr_1fr] md:gap-12 md:px-8 md:py-14">
                {/* Riesige Nummer */}
                <span
                  aria-hidden
                  className="text-outline-strong timeline-year select-none font-mono text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.85]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground transition-colors duration-100 group-hover:text-background md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted transition-colors duration-100 group-hover:text-background/70">
                    {service.description}
                  </p>
                </div>

                <ul className="col-span-2 space-y-2.5 md:col-span-1 md:self-center">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 font-mono text-sm text-foreground/80 transition-colors duration-100 group-hover:text-background/80"
                    >
                      <span
                        aria-hidden
                        className="h-px w-4 shrink-0 bg-cyan"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
