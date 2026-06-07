import * as React from "react";
import { Check, Star } from "lucide-react";

import { pakete } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Pakete() {
  return (
    <Section id="pakete">
      <SectionHeading
        eyebrow={pakete.eyebrow}
        title={pakete.title}
        subtitle={pakete.subtitle}
        centered
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {pakete.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 90} className="h-full">
            <article
              className={cn(
                "card-surface relative flex h-full flex-col rounded-[var(--radius-lg)] p-8",
                item.featured &&
                  "border-gold-deep shadow-[0_0_0_1px_rgba(201,162,74,0.35),0_24px_60px_-24px_rgba(201,162,74,0.45)]",
              )}
            >
              {item.badge ? (
                <span className="absolute -top-3 right-8 inline-flex items-center gap-1.5 rounded-full border border-gold-deep bg-background px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold">
                  <Star className="size-3.5 fill-current" />
                  {item.badge}
                </span>
              ) : null}

              <h3 className="font-display text-2xl font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gradient-gold">
                {item.price}
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                {item.description}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/kontakt"
                className={cn(
                  "mt-8 inline-flex items-center justify-center rounded-[var(--radius)] border px-6 py-3 text-sm font-medium transition-colors",
                  item.featured
                    ? "border-gold-deep bg-gold text-background hover:bg-gold-bright"
                    : "border-border text-foreground hover:border-gold-deep hover:text-gold",
                )}
              >
                Anfrage stellen
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
        {pakete.note}
      </p>
    </Section>
  );
}
