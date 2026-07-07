"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";

import { process } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";
import { Separator } from "@/components/ui/separator";

type Step = (typeof process.steps)[number];

/** Gestuftes Einrasten: n harte Sprünge statt weichem Easing. */
const stepsEase = (n: number) => (t: number) =>
  Math.min(1, Math.floor(t * n) / (n - 1));

function ProcessRow({ step, index }: { step: Step; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className="group border-t border-border"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: stepsEase(4) }}
    >
      {/* Hover: kompletter Zeilen-Invert, hart (kurze Duration, kein Easing-Gefühl) */}
      <div className="-mx-4 grid grid-cols-1 px-4 py-12 transition-colors duration-100 group-hover:bg-foreground md:-mx-8 md:grid-cols-[auto_1fr] md:gap-20 md:px-8 md:py-16">
        {/* Giant step number */}
        <div className="mb-3 md:mb-0 md:w-64 lg:w-80">
          <span
            className="block font-mono font-black leading-[0.85] text-border transition-colors duration-100 group-hover:text-background/25"
            style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <h3
            className="font-display font-bold tracking-tight text-foreground transition-colors duration-100 group-hover:text-background"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            <span className="sr-only">{String(index + 1).padStart(2, "0")} — </span>
            {step.title}
          </h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted transition-colors duration-100 group-hover:text-background/70 md:text-lg">
            {step.description}
          </p>
        </div>
      </div>
    </m.div>
  );
}

export function ProcessSteps() {
  return (
    <section id="chapter-2" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          {/* Kapitel-Label steht im HardCut-Balken über der Sektion */}
          <Reveal variant="fadeIn">
            <p
              className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
              style={{ textTransform: "uppercase" }}
            >
              {process.eyebrow}
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
              {process.title}
            </h2>
          </Reveal>
          <Reveal variant="fadeIn" delay={0.15}>
            <p className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-muted">
              {process.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Steps */}
        <div>
          {process.steps.map((step, i) => (
            <ProcessRow key={step.number} step={step} index={i} />
          ))}
          <Separator />
        </div>
      </div>
    </section>
  );
}
