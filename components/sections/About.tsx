"use client";
import * as React from "react";
import Image from "next/image";

import { about, site } from "@/lib/content";
import { WordReveal, Reveal } from "@/components/animation/Reveal";

/**
 * Über-mich — Brutalist-Ausbau: Glow-Blobs, Gradient-Rahmen und
 * Glas-Badge raus. Das Foto steht in einem harten Rahmen auf einem
 * soliden violetten Offset-Block; es liegt entsättigt-kontrastig da
 * und bekommt erst beim Hover seine Farbe zurück (kein Filter-Look,
 * sondern ein bewusster "Entwickeln"-Moment). Mono-Datenzeile statt
 * Glassmorph-Badge.
 */
export function About() {
  return (
    <section id="ueber" className="relative overflow-hidden py-24 md:py-36">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">

          {/* Photo column */}
          <Reveal variant="fadeUp" className="order-2 lg:order-1">
            <div className="group relative mx-auto aspect-square w-full max-w-md">
              {/* Solider Offset-Block statt Glow */}
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 bg-violet"
              />
              <div className="relative h-full overflow-hidden border border-border-strong bg-surface">
                <Image
                  src="/fatih.jpg"
                  alt="Fatih Güler – Freelance Webentwickler aus Hannover"
                  fill
                  className="object-cover grayscale contrast-[1.15] transition-[filter] duration-200 group-hover:grayscale-0 group-hover:contrast-100 motion-reduce:grayscale-0 motion-reduce:contrast-100"
                  priority
                />
                {/* Mono-Datenzeile statt Glas-Badge */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border-strong bg-background px-4 py-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                    {site.ownerName}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {site.location}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <Reveal variant="fadeIn">
              <p
                className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
                style={{ textTransform: "uppercase" }}
              >
                {about.eyebrow}
              </p>
            </Reveal>

            {/* Headline */}
            <WordReveal
              text={about.title}
              className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-black leading-[1.02] tracking-tighter text-foreground"
            />

            {/* Paragraphs */}
            <div className="mt-7 space-y-4">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} variant="fadeUp" delay={0.35 + i * 0.1}>
                  <p className="text-base leading-relaxed text-muted md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Highlights */}
            <Reveal variant="fadeUp" delay={0.65}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {about.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-foreground/85"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-2 w-2 shrink-0 bg-violet"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
