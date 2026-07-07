"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";

import { outcomes } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";

/**
 * Kapitel 04 — "Dein Erfolg" / Transformation.
 *
 * Ehrliche Outcome-Projektion (was sich für DICH ändert) als eckig-editoriales
 * 2-Spalten-Raster mit Haarlinien-Trennern. Ersetzt die früheren, erfundenen
 * Testimonials – kein fremder Social Proof, nur belegbare Fähigkeiten.
 *
 * Eyecatcher: Zellen "stanzen" nacheinander ein (instant on, kein Fade),
 * Riesenindex als Outline-Ziffer, Hover invertiert die Zelle hart.
 */
export function Outcomes() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="chapter-4" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 md:mb-20">
          {/* Kapitel-Label steht im HardCut-Balken über der Sektion */}
          <Reveal variant="fadeIn">
            <p
              className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
              style={{ textTransform: "uppercase" }}
            >
              {outcomes.eyebrow}
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            <h2
              className="font-display font-black tracking-tighter text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                maxWidth: "16ch",
              }}
            >
              {outcomes.title}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {outcomes.items.map((item, i) => (
            <m.div
              key={item.title}
              className="group relative flex h-full flex-col gap-3 overflow-hidden bg-background p-8 transition-colors duration-100 hover:bg-foreground md:p-10"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              // Stanzen: instant on, nur der Versatz staffelt
              transition={{ duration: 0.01, delay: i * 0.09 }}
            >
              {/* Riesenindex als Outline-Stempel in der Ecke */}
              <span
                aria-hidden
                className="outcome-index pointer-events-none absolute -right-3 -top-6 select-none font-mono font-black leading-none"
                style={{ fontSize: "clamp(5rem, 9vw, 8rem)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative font-mono text-xs text-violet-3 transition-colors duration-100 group-hover:text-background/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative max-w-[85%] font-display text-xl font-bold text-foreground transition-colors duration-100 group-hover:text-background md:text-2xl">
                {item.title}
              </h3>
              <p className="relative max-w-[85%] text-sm leading-relaxed text-muted transition-colors duration-100 group-hover:text-background/70 md:text-base">
                {item.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
