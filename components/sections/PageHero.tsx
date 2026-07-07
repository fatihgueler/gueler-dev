import * as React from "react";

import { Eyebrow } from "@/components/Section";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Seiten-Index für den Riesenstempel im Hintergrund, z.B. "01". */
  stamp?: string;
  children?: React.ReactNode;
}

/**
 * Einheitlicher Kopfbereich für alle Unterseiten — Brutalist-Ausbau:
 * riesige kantige Headline mit hartem Slice-Reveal (CSS steps(), kein Fade),
 * Seiten-Index als Outline-Riesenstempel, technisches Dot-Grid statt Glow.
 */
export function PageHero({ eyebrow, title, subtitle, stamp, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-36 md:pb-20 md:pt-44">
      <div
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_50%_55%_at_50%_30%,black,transparent)]"
        aria-hidden
      />

      {/* Seiten-Index-Riesenstempel */}
      {stamp && (
        <span
          aria-hidden
          className="text-outline-strong pointer-events-none absolute -top-8 right-0 select-none font-mono font-black leading-none md:-top-14"
          style={{ fontSize: "clamp(10rem, 24vw, 22rem)" }}
        >
          {stamp}
        </span>
      )}

      <div className="relative mx-auto max-w-6xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className="hard-reveal font-display font-black leading-[0.95] tracking-tighter text-foreground [text-wrap:balance]"
          style={{ fontSize: "clamp(3rem, 8.5vw, 7.5rem)", letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
        {/* Subline oft LCP-Element → CSS-Reveal statt JS-abhängigem Framer */}
        {subtitle && (
          <p
            className="hard-reveal mt-8 max-w-2xl font-mono text-base leading-relaxed text-muted md:text-lg"
            style={{ animationDelay: "0.15s" }}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
