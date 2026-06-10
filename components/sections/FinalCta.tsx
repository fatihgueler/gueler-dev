import * as React from "react";
import Link from "next/link";

import { cta } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/anim/MotionReveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="teal-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-4xl px-6 text-center">
        <MotionReveal>
          <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            {cta.title}
          </h2>
          <p className="mt-6 font-mono text-sm tracking-wide text-muted md:text-base">
            {cta.subtitle}
          </p>
          <Button asChild size="lg" className="mt-10">
            <Link href={cta.primary.href}>{cta.primary.label}</Link>
          </Button>
        </MotionReveal>
      </div>
    </section>
  );
}
