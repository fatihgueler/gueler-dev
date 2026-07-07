"use client";

import * as React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";

import { hero } from "@/lib/content";
import { CodeWordmark } from "@/components/hero/CodeWordmark";

/**
 * Hero — "GÜLER aus echtem Code".
 *
 * Die Wortmarke ist das Signature-Piece: Buchstaben aus laufendem,
 * kuratiertem Code dieses Repos (CodeWordmark). Darunter bleibt die
 * bestehende Copy (H1, Subline, CTA) als echter Text erhalten.
 *
 * Performance: Die Text-Reveals laufen als reine CSS-Animationen
 * (.hard-reveal) — sie hängen NICHT an der JS-Hydration. Die Subline
 * ist das LCP-Element und bleibt deshalb komplett unanimiert.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-28 md:pt-32"
    >
      {/* Dot-Grid als technischer Untergrund */}
      <div
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* Wortmarke aus echtem Code (eigene Glitch-Entrance im Canvas) */}
        <CodeWordmark className="w-full" />

        {/* Gloss-Zeile */}
        <p
          className="hard-reveal mt-4 font-mono text-xs tracking-[0.18em] text-muted md:text-sm"
          style={{ animationDelay: "0.15s" }}
        >
          güler (tr.) — der/die lacht.
        </p>

        {/* Haarlinie */}
        <div className="mt-10 h-px w-full bg-border-strong md:mt-14" />

        {/* Copy-Zeile: Headline + Subline links, CTA rechts */}
        <div className="mt-10 flex flex-col gap-10 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="max-w-2xl">
            <h1
              className="hard-reveal font-display font-bold leading-[1.05] tracking-tight text-foreground [text-wrap:balance]"
              style={{
                fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)",
                animationDelay: "0.1s",
              }}
            >
              {hero.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            {/* LCP-Element: bewusst OHNE Animation */}
            <p className="mt-5 max-w-xl font-mono text-sm leading-relaxed tracking-wide text-muted">
              {hero.subtitle}
            </p>
          </div>

          <a
            href={hero.cta.href}
            className="hard-reveal group inline-flex shrink-0 items-center gap-3 border border-violet-3 bg-violet px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-violet-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{ animationDelay: "0.3s" }}
          >
            {hero.cta.label}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <m.a
        href="#chapter-1"
        aria-label="Nach unten scrollen"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-2 transition-colors hover:text-cyan"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <span className="font-mono text-xs">{hero.scrollHint}</span>
        {reduceMotion ? (
          <ArrowDown className="size-4" />
        ) : (
          <m.span
            aria-hidden
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" />
          </m.span>
        )}
      </m.a>
    </section>
  );
}
