"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { process } from "@/lib/content";
import { MotionReveal } from "@/components/anim/MotionReveal";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PIN_DISTANCE = 200;

export function ProcessSteps() {
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      steps.forEach((step) => {
        const number = step.querySelector<HTMLElement>("[data-step-number]");
        if (!number) return;

        // Zahl "klebt" kurz auf der linken Seite, während der Text vorbeizieht
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: `+=${PIN_DISTANCE}`,
          pin: number,
          pinSpacing: false,
        });

        // Aktiven Step hervorheben
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            gsap.to(number, {
              opacity: self.isActive ? 1 : 0.35,
              duration: 0.3,
              overwrite: "auto",
            });
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="prozess" className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <MotionReveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
            {process.eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {process.title}
          </h2>
        </MotionReveal>

        <div className="mt-20 space-y-24 md:space-y-36">
          {process.steps.map((step, i) => (
            <div
              key={step.number}
              data-step
              className="grid gap-6 md:min-h-[18rem] md:grid-cols-[1fr_1.6fr] md:gap-16"
            >
              <div>
                <MotionReveal delay={i * 0.05}>
                  <span
                    data-step-number
                    className="step-number block font-display text-7xl font-semibold opacity-35 md:text-8xl"
                    aria-hidden
                  >
                    {step.number}
                  </span>
                </MotionReveal>
              </div>
              <MotionReveal delay={0.1}>
                <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                  <span className="sr-only">{step.number} — </span>
                  {step.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  {step.description}
                </p>
              </MotionReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
