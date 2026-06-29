"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";

import { features } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";

export function FeaturesGrid() {
  const reduceMotion = useReducedMotion();

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
            <m.div
              key={item.title}
              className="group relative"
              initial={false}
            >
              <m.div
                className="grid cursor-default grid-cols-[3rem_1fr] gap-6 py-8 md:grid-cols-[5rem_1fr_2fr] md:gap-10 md:py-10"
                whileHover={
                  reduceMotion
                    ? {}
                    : { x: 4 }
                }
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Number */}
                <div className="flex items-start pt-1">
                  <span
                    className="font-mono font-bold leading-none text-border transition-colors duration-300 group-hover:text-violet-500"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <div className="md:flex md:flex-col md:justify-center">
                  <h3
                    className="font-display font-semibold text-foreground"
                    style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
                  >
                    {item.title}
                  </h3>
                  {/* Mobile description (shown below title on small screens) */}
                  <p className="mt-2 text-sm leading-relaxed text-muted md:hidden">
                    {item.description}
                  </p>
                </div>

                {/* Description — desktop only */}
                <div className="hidden items-center md:flex">
                  <p className="text-base leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </m.div>

              {/* Row divider */}
              <div className="h-px w-full bg-border" />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
