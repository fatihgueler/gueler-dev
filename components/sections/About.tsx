"use client";
import * as React from "react";
import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { about, site } from "@/lib/content";
import { WordReveal, Reveal } from "@/components/animation/Reveal";
import { DrawnAccent } from "@/components/anim/DrawnAccent";

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="ueber" className="relative overflow-hidden py-24 md:py-36">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">

          {/* Photo column */}
          <Reveal variant="fadeUp" className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {/* Ambient glow behind the card */}
              {!reduceMotion && (
                <m.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
                    filter: "blur(36px)",
                  }}
                  animate={{ opacity: [0.45, 0.85, 0.45] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Gradient border wrapper */}
              <div
                className="relative h-full rounded-none p-px"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.65) 0%, rgba(34,211,238,0.4) 55%, rgba(139,92,246,0.3) 100%)",
                }}
              >
                {/* Inner card */}
                <div
                  className="relative h-full overflow-hidden rounded-none"
                  style={{
                    background:
                      "linear-gradient(150deg, rgba(13,8,28,0.95) 0%, rgba(18,6,38,0.95) 100%)",
                  }}
                >
                  <Image
                    src="/fatih.jpg"
                    alt="Fatih Güler – Freelance Webentwickler aus Hannover"
                    fill
                    className="object-cover opacity-90"
                    priority
                  />

                  {/* Subtle bottom fade */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,8,28,0.85) 0%, transparent 100%)",
                    }}
                  />

                  {/* Name badge */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div
                      className="flex items-center justify-between rounded-none border border-white/10 px-4 py-3"
                      style={{
                        background: "rgba(13,8,28,0.75)",
                        backdropFilter: "blur(14px)",
                      }}
                    >
                      <span className="text-sm font-semibold text-white">
                        {site.ownerName}
                      </span>
                      <span className="font-mono text-xs text-cyan-400">
                        {site.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            {/* Eyebrow badge */}
            <Reveal variant="scaleIn">
              <div className="mb-6 inline-flex items-center gap-2 rounded-none border border-violet-400/25 bg-violet-500/10 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span className="font-mono text-xs tracking-widest text-cyan-300">
                  {about.eyebrow.toUpperCase()}
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <WordReveal
              text={about.title}
              className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl"
            />

            {/* Accent line */}
            <Reveal variant="fadeIn" delay={0.35}>
              <DrawnAccent className="mt-4 w-32" />
            </Reveal>

            {/* Paragraphs */}
            <div className="mt-7 space-y-4">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} variant="fadeUp" delay={0.45 + i * 0.1}>
                  <p className="text-base leading-relaxed text-muted md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Highlights */}
            <Reveal variant="fadeUp" delay={0.75}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {about.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-foreground/85"
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(124,58,237,0.2)",
                        border: "1px solid rgba(139,92,246,0.45)",
                      }}
                    >
                      <svg
                        className="h-3 w-3 text-violet-400"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    </span>
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
