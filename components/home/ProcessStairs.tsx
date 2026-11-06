"use client";

import * as React from "react";

import { prefersReducedMotion } from "@/lib/motion";

import { process } from "@/lib/content";
import { SectionHead } from "@/components/Section";

/**
 * Ablauf als Treppe: fünf Spalten mit sichtbaren Linien, jeder Schritt
 * sitzt eine Stufe tiefer. Beim Scrollen zieht sich eine Signal-Linie über
 * die Treppe; erreichte Schritte füllen ihre Outline-Ziffer.
 */
export function ProcessStairs({ index = "03" }: { index?: string }) {
  const listRef = React.useRef<HTMLOListElement>(null);
  const [progress, setProgress] = React.useState(1);

  React.useEffect(() => {
    const el = listRef.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.8 - r.top) / (r.height * 0.9);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const n = process.steps.length;

  return (
    <section id="ablauf" aria-labelledby="process-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead
          id="process-title"
          index={index}
          label={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
        />
      </div>
      <ol ref={listRef} data-rv-stagger="120" className="relative frame-ruled mt-16 grid border-t-2 border-border md:grid-cols-5">
        {/* Fortschrittslinie: oben über alle Spalten (Desktop), links (mobil) */}
        <span
          aria-hidden
          className="absolute left-0 top-0 z-10 hidden h-[6px] w-full origin-left bg-signal md:block"
          style={{ transform: `scaleX(${progress})` }}
        />
        <span
          aria-hidden
          className="absolute left-0 top-0 z-10 h-full w-[6px] origin-top bg-signal md:hidden"
          style={{ transform: `scaleY(${progress})` }}
        />
        {process.steps.map((step, i) => (
          <li
            key={step.number}
            data-rv="up"
            className="border-b-2 border-border px-[var(--spacing-gutter)] pb-8 md:border-b-0 md:border-r-2 md:px-5 md:pb-12 md:last:border-r-0"
          >
            <div className="hidden md:block" style={{ height: `${i * 4}rem` }} aria-hidden />
            <div className="flex items-baseline gap-4 border-b-2 border-border py-4 md:block md:border-b-0 md:py-6">
              <span
                className={`display text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.8] transition-colors duration-150 ${
                  progress >= (i + 0.5) / n ? "step-on" : "outline-text"
                }`}
              >
                {step.number}
              </span>
              <h3 className="text-xl font-bold leading-tight md:mt-5">{step.title}</h3>
            </div>
            <p className="mt-4 leading-relaxed text-muted md:mt-0">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
