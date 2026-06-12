import * as React from "react";
import { Star } from "lucide-react";

import { testimonials } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <span
      aria-hidden
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-2/40 bg-violet/10 font-display text-sm font-semibold text-violet-3"
    >
      {initials}
    </span>
  );
}

export function Testimonials() {
  return (
    <Section id="referenzen">
      <SectionHeading
        eyebrow="Referenzen"
        title="Was meine Kunden sagen"
        subtitle="Echte Ergebnisse, echte Stimmen."
        centered
      />

      <RevealGroup
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.1}
      >
        {testimonials.map((t, i) => (
          <RevealItem key={i} variant="fadeUp" className="h-full">
            <figure className="card-surface flex h-full flex-col rounded-[var(--radius-lg)] p-8">
              {/* Stars */}
              <div
                className="flex gap-1"
                aria-label={`${t.rating} von 5 Sternen`}
              >
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    className="size-4 fill-violet-2 text-violet-2"
                    aria-hidden
                  />
                ))}
              </div>

              {/* Decorative quote mark */}
              <span
                className="mt-4 select-none font-display text-6xl leading-none text-violet-2/20"
                aria-hidden
              >
                &ldquo;
              </span>

              <blockquote className="-mt-4 flex-1 text-base leading-relaxed text-muted">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <Avatar name={t.name} />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-2">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
