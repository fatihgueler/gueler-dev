import * as React from "react";

import { timeline } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/anim/Reveal";

/** Vertikaler Werdegang mit Teal-Verlaufslinie. */
export function Timeline() {
  return (
    <Section id="werdegang" className="bg-surface/30">
      <SectionHeading eyebrow={timeline.eyebrow} title={timeline.title} />

      <div className="relative mt-16 max-w-3xl">
        <div
          className="absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-teal via-border-strong to-transparent"
          aria-hidden
        />
        <div className="space-y-10">
          {timeline.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="relative pl-12">
                <span className="absolute left-0 top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-teal bg-background">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-teal">
                  {step.period}
                </span>
                <h3 className="mt-1.5 font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
