import * as React from "react";
import Link from "next/link";

import { cta } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Reveal, WordReveal } from "@/components/animation/Reveal";
import { ParallaxText } from "@/components/anim/ParallaxText";
import { DrawnAccent } from "@/components/anim/DrawnAccent";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="teal-glow pointer-events-none absolute inset-0" aria-hidden />
      <ParallaxText text="GÜLER.DEV" />
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <WordReveal
          text={cta.title}
          className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl"
        />
        <Reveal variant="fadeIn" delay={0.3}>
          <DrawnAccent className="mx-auto mt-5 w-44" />
          <p className="mt-5 font-mono text-sm tracking-wide text-muted md:text-base">
            {cta.subtitle}
          </p>
        </Reveal>
        <Reveal variant="scaleIn" delay={0.45}>
          <Button asChild size="lg" className="mt-10">
            <Link href={cta.primary.href}>{cta.primary.label}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
