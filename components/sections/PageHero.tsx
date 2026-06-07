import * as React from "react";

import { Eyebrow } from "@/components/Section";
import { TextReveal } from "@/components/anim/TextReveal";
import { Reveal } from "@/components/anim/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/** Einheitlicher Kopfbereich für alle Unterseiten. */
export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-36 md:pb-20 md:pt-44">
      <div className="teal-glow pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_50%_55%_at_50%_30%,black,transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <TextReveal
          as="h1"
          text={title}
          className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        />
        {subtitle && (
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
