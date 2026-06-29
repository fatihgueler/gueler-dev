"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cta } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";

const TRUST_ITEMS = [
  "Kostenlos & unverbindlich",
  "Antwort in 24h",
  "Fester Ansprechpartner statt Agentur",
];

export function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="chapter-5" className="relative py-24 md:py-36">
      {/* Top rule */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px w-full bg-border" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-24">
        {/* Label */}
        <Reveal variant="fadeIn">
          <p
            className="mb-8 font-mono text-[0.65rem] tracking-[0.3em] text-violet-3"
            style={{ textTransform: "uppercase" }}
          >
            Kapitel 05 — Dein Moment
          </p>
        </Reveal>

        {/* Massive headline */}
        <Reveal variant="fadeUp" delay={0.05}>
          <h2
            className="font-display font-black tracking-tighter text-foreground"
            style={{
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            {cta.title}
          </h2>
        </Reveal>

        {/* Rule after headline */}
        <Reveal variant="fadeIn" delay={0.15}>
          <div className="mt-10 h-px w-full bg-border md:mt-14" />
        </Reveal>

        {/* Action row */}
        <Reveal variant="fadeUp" delay={0.2}>
          <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-16">
            {/* Left: subtitle */}
            <p className="max-w-md font-mono text-sm leading-relaxed text-muted md:text-base">
              {cta.subtitle}
            </p>

            {/* Right: CTA */}
            <div className="flex flex-col items-start gap-5 md:items-end">
              <m.a
                href={cta.primary.href}
                className="group inline-flex items-center gap-3 border border-violet-500 bg-violet-600 px-7 py-4 font-display text-base font-semibold text-white"
                style={{ borderRadius: 2 }}
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        backgroundColor: "#6d28d9",
                        x: 2,
                        y: -2,
                        boxShadow: "4px 4px 0px 0px rgba(167,139,250,0.5)",
                      }
                }
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {cta.primary.label}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </m.a>

              {/* Trust line */}
              <p className="font-mono text-xs text-muted">
                {TRUST_ITEMS.join(" · ")}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Bottom rule */}
        <Reveal variant="fadeIn" delay={0.3}>
          <div className="mt-16 h-px w-full bg-border md:mt-20" />
        </Reveal>
      </div>
    </section>
  );
}
