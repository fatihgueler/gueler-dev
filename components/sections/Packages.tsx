import * as React from "react";
import { Check, Star } from "lucide-react";

import { packages } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Packages() {
  return (
    <Section id="pakete">
      <SectionHeading
        eyebrow="Pakete"
        title="Meine Pakete"
        subtitle="Transparent, fair, ohne versteckte Kosten."
        centered
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg, i) => (
          <Reveal key={pkg.id} delay={i * 150} className="h-full">
            <article
              className={cn(
                "card-surface relative flex h-full flex-col rounded-[var(--radius-lg)] p-8 transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-xl",
                pkg.highlighted
                  ? "scale-[1.02] border-gold-deep shadow-[0_0_0_1px_rgba(201,162,74,0.35),0_24px_60px_-24px_rgba(201,162,74,0.45)]"
                  : "hover:border-border-strong",
              )}
            >
              {pkg.highlighted && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-20"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,162,74,0.4), transparent)",
                    animation: "pulse 3s ease-in-out infinite",
                  }}
                  aria-hidden
                />
              )}

              {pkg.badge ? (
                <Badge className="absolute -top-3 right-8 gap-1.5 rounded-full border-gold-deep bg-background px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold hover:bg-background">
                  <Star className="size-3.5 fill-current" aria-hidden />
                  {pkg.badge}
                </Badge>
              ) : null}

              <h3 className="font-display text-2xl font-medium text-foreground">
                {pkg.name}
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gradient-gold">
                {pkg.price}
              </p>
              <p className="mt-4 leading-relaxed text-muted">{pkg.description}</p>

              <ul className="mt-6 flex-1 space-y-2.5" role="list">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={pkg.highlighted ? "primary" : "outline"}
                className={cn(
                  "mt-8 w-full rounded-[var(--radius)] transition-all duration-150 hover:-translate-y-px hover:shadow-md",
                  pkg.highlighted
                    ? "border-gold-deep bg-gold text-background hover:bg-gold-bright"
                    : "border-border text-foreground hover:border-gold-deep hover:text-gold",
                )}
              >
                <a href={`/#kontakt?paket=${pkg.id}`}>{pkg.cta}</a>
              </Button>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
