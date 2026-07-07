import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cta } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/anim/Reveal";

/**
 * Wiederverwendbarer Call-to-Action-Block (alle Unterseiten) —
 * Brutalist-Angleichung: Mesh-Glow raus, Haarlinie + riesige schwarze
 * Headline + Mono-Subline. Gleiche Sprache wie FinalCta auf der Startseite.
 */
export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2
            className="font-display font-black leading-[1.02] tracking-tighter text-foreground"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
          >
            {cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-mono text-sm leading-relaxed text-muted md:text-base">
            {cta.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic strength={0.4}>
              <Button asChild size="lg">
                <Link href={cta.primary.href}>
                  {cta.primary.label}
                  <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Button asChild variant="outline" size="lg">
                <Link href={cta.secondary.href}>{cta.secondary.label}</Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
