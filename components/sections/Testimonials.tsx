import * as React from "react";
import Image from "next/image";

import { testimonials } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";

/**
 * Kundenstimmen — Brutalist-Hairline-Grid, konsistent mit Outcomes/Trust:
 * je Karte ein großes Anführungszeichen als Outline-Stempel, das Zitat, eine
 * optionale Ergebniszahl als Akzent, darunter Name · Rolle / Firma (+ optional
 * Porträt). Struktur: Zitat, Name, Firma, optional Foto, optional Ergebniszahl.
 *
 * Rendert NICHTS, solange Platzhalter aktiv sind ([TESTIMONIAL_x]) — so steht
 * die Sektion live erst, wenn echte Stimmen eingetragen sind.
 */
export function Testimonials() {
  const items = testimonials.filter((t) => !t.quote.trim().startsWith("["));
  if (items.length === 0) return null;

  return (
    <Section id="stimmen" className="bg-surface/30">
      <SectionHeading
        eyebrow="Kundenstimmen"
        title="Was Kunden sagen"
        subtitle="Ehrliches Feedback aus echten Projekten — von Selbstständigen und kleinen Unternehmen."
        centered
      />

      <RevealGroup
        className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
        stagger={0.1}
      >
        {items.map((t) => (
          <RevealItem key={t.name} className="h-full">
            <figure className="group relative flex h-full flex-col bg-background p-8 transition-colors duration-100 hover:bg-foreground">
              <span
                aria-hidden
                className="outcome-index pointer-events-none absolute -right-1 -top-5 select-none font-display text-[clamp(4rem,8vw,6rem)] font-black leading-none"
              >
                &rdquo;
              </span>

              {t.result && (
                <div className="relative font-display text-2xl font-black tracking-tight text-violet-3 transition-colors duration-100 group-hover:text-background">
                  {t.result}
                </div>
              )}

              <blockquote className="relative mt-3 flex-1 text-base leading-relaxed text-foreground transition-colors duration-100 group-hover:text-background">
                {t.quote}
              </blockquote>

              <figcaption className="relative mt-6 flex items-center gap-3 border-t border-border pt-5 transition-colors duration-100 group-hover:border-background/20">
                {t.image && (
                  <Image
                    src={t.image}
                    alt={`${t.name}, ${t.company}`}
                    width={44}
                    height={44}
                    className="size-11 shrink-0 border border-border-strong object-cover grayscale"
                  />
                )}
                <div className="min-w-0">
                  <div className="truncate font-display text-sm font-bold text-foreground transition-colors duration-100 group-hover:text-background">
                    {t.name}
                  </div>
                  <div className="truncate font-mono text-xs text-muted transition-colors duration-100 group-hover:text-background/70">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
