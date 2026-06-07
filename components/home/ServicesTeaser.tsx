import * as React from "react";
import Link from "next/link";
import { Globe, Sparkles, Layers, LifeBuoy, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { services } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/anim/Reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/MagneticButton";

const iconMap: Record<string, LucideIcon> = { Globe, Sparkles, Layers, LifeBuoy };

/** Kompakter Leistungs-Teaser für die Startseite (verlinkt auf /leistungen). */
export function ServicesTeaser() {
  return (
    <Section id="leistungen-teaser">
      <SectionHeading
        eyebrow={services.eyebrow}
        title={services.title}
        subtitle={services.subtitle}
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.items.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Globe;
          return (
            <Reveal key={service.title} delay={i * 0.08}>
              <article className="card-surface group h-full rounded-[var(--radius-lg)] p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-background text-teal transition-colors group-hover:border-teal-deep">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Magnetic strength={0.35}>
          <Button asChild variant="outline" size="lg">
            <Link href="/leistungen">
              Alle Leistungen ansehen
              <ArrowRight />
            </Link>
          </Button>
        </Magnetic>
      </div>
    </Section>
  );
}
