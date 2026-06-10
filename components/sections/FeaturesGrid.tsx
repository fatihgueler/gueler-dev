"use client";

import * as React from "react";
import { Brain, Shield, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import { m, type Variants } from "framer-motion";

import { features } from "@/lib/content";
import { MotionReveal } from "@/components/anim/MotionReveal";

const ICONS: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Brain,
  TrendingUp,
};

const GRID_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
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

        <m.div
          className="mt-16 grid gap-5 sm:grid-cols-2"
          variants={GRID_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Zap;
            return (
              <m.article
                key={item.title}
                variants={CARD_VARIANTS}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-8 transition-colors duration-200 hover:border-violet md:p-10"
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
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
