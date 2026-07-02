import * as React from "react";
import { Zap, FileCheck, ShieldCheck, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { trust } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/animation/Reveal";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  FileCheck,
  ShieldCheck,
  Rocket,
};

export function Trust() {
  return (
    <Section id="warum-ich">
      <SectionHeading
        eyebrow={trust.eyebrow}
        title={trust.title}
        centered
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trust.items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Zap;
          return (
            <Reveal key={item.title} delay={i * 0.09} className="h-full">
              <article className="card-surface group flex h-full flex-col items-start rounded-[var(--radius-lg)] p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-background text-gold transition-colors group-hover:border-gold-deep">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
