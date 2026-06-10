"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";
import { m } from "framer-motion";

import { hero } from "@/lib/content";

const LINE_STAGGER_SECONDS = 0.15;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Dezente Hintergrund-Ebenen */}
      <div className="teal-glow pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_55%_45%_at_50%_45%,black,transparent)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
        <h1 className="font-display font-semibold leading-[1.02] tracking-tight text-foreground">
          {hero.lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <m.span
                className="block text-[clamp(2.75rem,9vw,6.5rem)]"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * LINE_STAGGER_SECONDS,
                }}
              >
                {i === hero.lines.length - 1 ? (
                  <span className="text-gradient-teal">{line}</span>
                ) : (
                  line
                )}
              </m.span>
            </span>
          ))}
        </h1>

        <m.p
          className="mx-auto mt-8 max-w-xl font-mono text-sm tracking-wide text-muted md:text-base"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
        >
          {hero.subtitle}
        </m.p>
      </div>

      {/* Scroll-Hinweis */}
      <m.a
        href="#prozess"
        aria-label="Nach unten scrollen"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-2 transition-colors hover:text-cyan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em]">
          {hero.scrollHint}
        </span>
        <m.span
          aria-hidden
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </m.span>
      </m.a>
    </section>
  );
}
