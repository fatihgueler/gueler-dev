import * as React from "react";
import { Globe, Sparkles, Layers, LifeBuoy, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { services } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Sparkles,
  Layers,
  LifeBuoy,
};

export function Services() {
  return (
    <Section id="leistungen">
      <SectionHeading
        eyebrow={services.eyebrow}
        title={services.title}
        subtitle={services.subtitle}
      />

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {services.items.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Globe;
          return (
            <Reveal key={service.title} delay={i * 90}>
              <article className="card-surface group h-full rounded-[var(--radius-lg)] p-8">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius)] border border-border bg-background text-gold transition-colors group-hover:border-gold-deep">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display text-2xl font-medium text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-sm text-foreground/80"
                    >
                      <Check className="size-4 shrink-0 text-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
