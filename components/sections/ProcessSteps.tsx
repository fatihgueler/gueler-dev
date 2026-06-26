"use client";

import * as React from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { process } from "@/lib/content";
import { Reveal, WordReveal } from "@/components/animation/Reveal";

type Step = (typeof process.steps)[number];

/**
 * Einzelner Prozess-Schritt. Die große Zahl ist scroll-gekoppelt
 * (scrub): Opacity/Position folgen direkt der Scroll-Position statt
 * getweent zu werden – dadurch läuft die Animation immer flüssig
 * und ohne sichtbare Sprünge.
 */
function ProcessStep({ step }: { step: Step }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 20%"],
  });

  // Zahl blendet weich ein, ist im Viewport-Zentrum voll sichtbar
  // und dimmt beim Rausscrollen wieder ab.
  const numberOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.75, 1],
    [0.12, 1, 1, 0.3],
  );
  const numberX = useTransform(scrollYProgress, [0, 0.3], [-28, 0]);

  return (
    <div
      ref={ref}
      className="grid gap-6 md:min-h-[18rem] md:grid-cols-[1fr_1.6fr] md:gap-16"
    >
      <div>
        <m.span
          className="step-number block font-display text-7xl font-semibold md:text-8xl"
          style={
            shouldReduceMotion
              ? undefined
              : { opacity: numberOpacity, x: numberX }
          }
          aria-hidden
        >
          {step.number}
        </m.span>
      </div>
      <Reveal delay={0.1}>
        <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
          <span className="sr-only">{step.number} — </span>
          {step.title}
        </h3>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {step.description}
        </p>
      </Reveal>
    </div>
  );
}

export function ProcessSteps() {
  return (
    <section id="prozess" className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <WordReveal
          text={process.title}
          className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl"
        />

        <div className="mt-20 space-y-24 md:space-y-36">
          {process.steps.map((step) => (
            <ProcessStep key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
