import * as React from "react";

import { process } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/animation/Reveal";

export function Process() {
  return (
    <Section id="ablauf">
      <SectionHeading
        eyebrow={process.eyebrow}
        title={process.title}
        subtitle={process.subtitle}
      />

      <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.09}>
            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="font-display text-5xl font-medium text-gradient-gold">
                  {step.number}
                </span>
                {i < process.steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-gold-deep to-transparent lg:block" />
                )}
              </div>
              <h3 className="mt-5 font-display text-xl font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
