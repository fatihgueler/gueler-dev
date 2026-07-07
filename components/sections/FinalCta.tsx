"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { cta } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";

const TRUST_ITEMS = [
  "Kostenlos & unverbindlich",
  "Antwort in 24h",
  "Fester Ansprechpartner statt Agentur",
];

/**
 * Kapitel 05 — Dein Moment.
 *
 * Eyecatcher: Die Headline läuft als full-bleed Riesen-Marquee
 * (abwechselnd gefüllt und Outline; semantisch bleibt sie EIN <h2>,
 * die Wiederholungen sind aria-hidden). Der CTA ist ein Block über die
 * volle Breite, dessen Hover die Fläche hart invertiert.
 */
export function FinalCta() {
  return (
    <section id="chapter-5" className="relative overflow-hidden py-24 md:py-36">
      {/* Top rule */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px w-full bg-border" />
      </div>

      {/* Marquee-Headline, full-bleed */}
      <h2 className="sr-only">{cta.title}</h2>
      <div aria-hidden className="mt-16 overflow-hidden md:mt-24">
        <div className="cta-track flex w-max items-center">
          {[0, 1].map((half) => (
            <div key={half} className="flex w-max shrink-0 items-center">
              {[0, 1, 2].map((rep) => (
                <span
                  key={rep}
                  className={
                    "whitespace-nowrap px-6 font-display font-black tracking-tighter md:px-10 " +
                    (rep % 2 === 0 ? "text-foreground" : "marquee-term")
                  }
                  style={{
                    fontSize: "clamp(3rem, 9vw, 7.5rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {cta.title}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Rule after headline */}
        <Reveal variant="fadeIn" delay={0.1}>
          <div className="mt-14 h-px w-full bg-border md:mt-20" />
        </Reveal>

        {/* Subtitle */}
        <Reveal variant="fadeUp" delay={0.15}>
          <p className="mt-10 max-w-md font-mono text-sm leading-relaxed text-muted md:text-base">
            {cta.subtitle}
          </p>
        </Reveal>

        {/* CTA: Block über volle Breite, Hover invertiert hart */}
        <Reveal variant="fadeUp" delay={0.2}>
          <a
            href={cta.primary.href}
            className="group mt-10 flex w-full items-center justify-between gap-6 border border-foreground px-6 py-6 font-display font-bold uppercase tracking-tight text-foreground transition-colors duration-100 hover:bg-foreground hover:text-background md:px-10 md:py-8"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.25rem)" }}
          >
            {cta.primary.label}
            <ArrowUpRight
              className="size-7 shrink-0 transition-transform duration-100 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-10"
              aria-hidden
            />
          </a>
        </Reveal>

        {/* Trust line */}
        <Reveal variant="fadeIn" delay={0.25}>
          <p className="mt-6 font-mono text-xs text-muted">
            {TRUST_ITEMS.join(" · ")}
          </p>
        </Reveal>

        {/* Bottom rule */}
        <Reveal variant="fadeIn" delay={0.3}>
          <div className="mt-16 h-px w-full bg-border md:mt-20" />
        </Reveal>
      </div>
    </section>
  );
}
