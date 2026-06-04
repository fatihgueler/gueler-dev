import * as React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

import { about, site } from "@/lib/content";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <Section id="ueber-mich" className="bg-surface/30">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        {/* Visual: Monogramm-Karte (Platzhalter für echtes Foto) */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="gold-glow absolute inset-0 scale-110" aria-hidden />
            <div className="card-surface relative flex h-full items-center justify-center overflow-hidden rounded-[var(--radius-xl)]">
              <Image
                src="/fatih.jpg"
                alt="Fatih Güler"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-[var(--radius)] border border-border bg-background/70 px-5 py-3 backdrop-blur">
                <span className="text-sm font-medium text-foreground">
                  {site.ownerName}
                </span>
                <span className="text-xs text-gold">{site.location}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={100} className="order-1 lg:order-2">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {about.title}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-sm text-foreground/85"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="size-3" />
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
