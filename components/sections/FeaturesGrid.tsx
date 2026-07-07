"use client";

import * as React from "react";

import { features } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type Feature = (typeof features.items)[number];

/**
 * Feature-Zeile: Hover invertiert die volle Zeile hart (kein weiches
 * Easing), und ein Mono-Nummern-Sticker klebt am Cursor, solange er
 * über der Zeile steht (nur Desktop, transform-only im mousemove).
 */
function FeatureRow({ item, index }: { item: Feature; index: number }) {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const stickerRef = React.useRef<HTMLSpanElement>(null);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const row = rowRef.current;
    const sticker = stickerRef.current;
    if (!row || !sticker) return;
    if (isTouchDevice() || prefersReducedMotion()) return;
    const rect = row.getBoundingClientRect();
    sticker.style.transform = `translate(${event.clientX - rect.left}px, ${
      event.clientY - rect.top
    }px) translate(16px, -50%)`;
  };

  return (
    <div className="group relative">
      <div
        ref={rowRef}
        onMouseMove={onMouseMove}
        className="relative -mx-4 grid cursor-default grid-cols-[3rem_1fr] gap-6 px-4 py-8 transition-colors duration-100 group-hover:bg-foreground md:-mx-8 md:grid-cols-[5rem_1fr_2fr] md:gap-10 md:px-8 md:py-10"
      >
        {/* Nummern-Sticker am Cursor (dekorativ) */}
        <span
          ref={stickerRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 hidden select-none border border-foreground bg-background px-2 py-1 font-mono text-[0.6rem] font-bold tracking-[0.25em] text-foreground opacity-0 transition-opacity duration-100 group-hover:opacity-100 motion-reduce:hidden md:block"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Number */}
        <div className="flex items-start pt-1">
          <span
            className="font-mono font-bold leading-none text-border transition-colors duration-100 group-hover:text-background/30"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <div className="md:flex md:flex-col md:justify-center">
          <h3
            className="font-display font-semibold text-foreground transition-colors duration-100 group-hover:text-background"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
          >
            {item.title}
          </h3>
          {/* Mobile description (shown below title on small screens) */}
          <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-100 group-hover:text-background/70 md:hidden">
            {item.description}
          </p>
        </div>

        {/* Description — desktop only */}
        <div className="hidden items-center md:flex">
          <p className="text-base leading-relaxed text-muted transition-colors duration-100 group-hover:text-background/70">
            {item.description}
          </p>
        </div>
      </div>

      {/* Row divider */}
      <div className="h-px w-full bg-border" />
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section id="leistungen" className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Section header: split layout */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <Reveal variant="fadeUp">
            <h2
              className="font-display font-black tracking-tighter text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                maxWidth: "14ch",
              }}
            >
              {features.title}
            </h2>
          </Reveal>
          <Reveal variant="fadeIn" delay={0.1}>
            <p className="max-w-xs font-mono text-sm leading-relaxed text-muted md:text-right">
              Was du bekommst — und warum es wichtig ist.
            </p>
          </Reveal>
        </div>

        {/* Rules + rows */}
        <div className="mt-16">
          {/* Top rule */}
          <div className="h-px w-full bg-border" />

          {features.items.map((item, i) => (
            <FeatureRow key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
