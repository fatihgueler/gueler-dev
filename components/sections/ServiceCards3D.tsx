"use client";

import * as React from "react";
import { Globe, Sparkles, Layers, LifeBuoy, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { services } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

const iconMap: Record<string, LucideIcon> = { Globe, Sparkles, Layers, LifeBuoy };

/** Karte, die sich bei Mausbewegung im 3D-Raum zum Cursor neigt. */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isTouchDevice() || prefersReducedMotion()) return;

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateZ(0)`;
    };
    const onLeave = () => {
      el.style.transform = "rotateY(0deg) rotateX(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div style={{ perspective: "1100px" }} className="h-full">
      <div
        ref={ref}
        className="card-surface h-full rounded-[var(--radius-lg)] p-8 [transform-style:preserve-3d]"
        style={{ transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {children}
      </div>
    </div>
  );
}

export function ServiceCards3D() {
  return (
    <Section id="leistungen">
      <SectionHeading
        eyebrow={services.eyebrow}
        title={services.title}
        subtitle={services.subtitle}
      />

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {services.items.map((service) => {
          const Icon = iconMap[service.icon] ?? Globe;
          return (
            <TiltCard key={service.title}>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius)] border border-border bg-background text-gold">
                <Icon className="size-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{service.description}</p>
              <ul className="mt-6 space-y-2.5">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm text-foreground/80"
                  >
                    <Check className="size-4 shrink-0 text-teal" />
                    {point}
                  </li>
                ))}
              </ul>
            </TiltCard>
          );
        })}
      </div>
    </Section>
  );
}
