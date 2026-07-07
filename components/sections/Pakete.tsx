import * as React from "react";
import { Check } from "lucide-react";

import { pakete } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Pakete — Brutalist-Preistafel: Haarlinien-Grid statt Cards mit
 * Glow-Schatten. Der Preis steht riesig in Mono, das Featured-Paket
 * ist komplett invertiert (voller Kontrast-Flip statt Gold-Glow),
 * das Badge ist ein gestempelter Sticker.
 */
export function Pakete() {
  return (
    <Section id="pakete">
      <SectionHeading
        eyebrow={pakete.eyebrow}
        title={pakete.title}
        subtitle={pakete.subtitle}
        centered
      />

      <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
        {pakete.items.map((item, i) => {
          const inverted = Boolean(item.featured);
          return (
            <Reveal key={item.title} delay={i * 90} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col p-8",
                  inverted
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground",
                )}
              >
                {item.badge ? (
                  <span
                    className={cn(
                      "absolute right-6 top-0 -translate-y-1/2 border px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.15em]",
                      inverted
                        ? "border-foreground bg-background text-foreground"
                        : "border-foreground bg-foreground text-background",
                    )}
                  >
                    {item.badge}
                  </span>
                ) : null}

                <h3 className="font-display text-2xl font-bold">
                  {item.title}
                </h3>
                <p className="mt-4 font-mono text-[clamp(2.25rem,3.5vw,3rem)] font-black leading-none tracking-tight">
                  {item.price}
                </p>
                <p
                  className={cn(
                    "mt-5 leading-relaxed",
                    inverted ? "text-background/70" : "text-muted",
                  )}
                >
                  {item.description}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-start gap-3 text-sm",
                        inverted ? "text-background/85" : "text-foreground/80",
                      )}
                    >
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          inverted ? "text-background" : "text-cyan",
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="/kontakt"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center border px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-100",
                    inverted
                      ? "border-background bg-background text-foreground hover:bg-transparent hover:text-background"
                      : "border-foreground text-foreground hover:bg-foreground hover:text-background",
                  )}
                >
                  Anfrage stellen
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
        {pakete.note}
      </p>
    </Section>
  );
}
