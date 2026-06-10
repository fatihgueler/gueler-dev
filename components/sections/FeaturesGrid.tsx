"use client";

import * as React from "react";
import { Brain, Shield, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import { m } from "framer-motion";

import { features } from "@/lib/content";
import { MotionReveal } from "@/components/anim/MotionReveal";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Brain,
  TrendingUp,
};

export function FeaturesGrid() {
  return (
    <section id="leistungen" className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <MotionReveal>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {features.title}
          </h2>
        </MotionReveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {features.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Zap;
            return (
              <MotionReveal key={item.title} delay={i * 0.08}>
                <m.article
                  className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-8 transition-colors duration-200 hover:border-violet md:p-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-background text-cyan">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {item.description}
                  </p>
                </m.article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
