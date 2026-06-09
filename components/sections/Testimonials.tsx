import * as React from "react";
import { Star } from "lucide-react";

import { testimonials } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

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
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-display text-sm font-semibold text-gold"
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

      {/* Desktop: grid – Mobile: horizontal scroll snap */}
      <div
        className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
        role="list"
      >
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 120} className="min-w-[80vw] snap-start sm:min-w-0">
            <figure
              role="listitem"
              className="card-surface flex h-full flex-col rounded-[var(--radius-lg)] p-8"
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label={`${t.rating} von 5 Sternen`}>
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    className="size-4 fill-gold text-gold"
                    aria-hidden
                  />
                ))}
              </div>

              {/* Decorative quote mark */}
              <span
                className="mt-4 font-display text-6xl leading-none text-gold/20 select-none"
                aria-hidden
              >
                &ldquo;
              </span>

              <blockquote className="-mt-4 flex-1 text-base italic leading-relaxed text-muted">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar name={t.name} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-2">{t.company}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
