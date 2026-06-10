import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { projectHighlight } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/anim/MotionReveal";
import { TiltCard } from "@/components/anim/TiltCard";

export function ProjectHighlight() {
  return (
    <section id="projekte" className="relative py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        {/* Visual */}
        <MotionReveal>
          <TiltCard className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface">
            <div className="mesh-bg" aria-hidden />
            <div className="relative aspect-[16/11] p-8 md:p-12">
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-wrap gap-3">
                  {projectHighlight.highlights.map((p) => (
                    <span
                      key={p.name}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
                      {p.name} · {p.tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-3" aria-hidden>
                  <div className="h-3 w-3/4 rounded-full bg-foreground/10" />
                  <div className="h-3 w-1/2 rounded-full bg-foreground/10" />
                  <div className="h-3 w-2/3 rounded-full bg-violet/30" />
                  <div className="h-3 w-1/3 rounded-full bg-foreground/10" />
                </div>
              </div>
            </div>
          </TiltCard>
        </MotionReveal>

        {/* Text */}
        <MotionReveal delay={0.1}>
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {projectHighlight.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {projectHighlight.description}
          </p>
          <Button asChild variant="outline" size="lg" className="mt-9">
            <Link href={projectHighlight.cta.href}>
              {projectHighlight.cta.label}
              <ArrowRight />
            </Link>
          </Button>
        </MotionReveal>
      </div>
    </section>
  );
}
