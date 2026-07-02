import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cta } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/animation/Reveal";

/** Wiederverwendbarer Call-to-Action-Block mit animiertem Mesh-Hintergrund. */
export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mesh-bg" aria-hidden />
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
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
