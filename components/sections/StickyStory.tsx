"use client";

import * as React from "react";
import { Globe, Layers, Zap, type LucideIcon } from "lucide-react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { services } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Sparkles: Zap,
  Layers,
};

const PANELS = services.items.slice(0, 3);

function StoryPanel({
  item,
  index,
  total,
  progress,
}: {
  item: (typeof PANELS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;

  const opacity = useTransform(
    progress,
    index === 0
      ? [start, start + segment * 0.15, end - segment * 0.2, end]
      : [start, start + segment * 0.25, end - segment * 0.2, end],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const y = useTransform(
    progress,
    [start, start + segment * 0.25],
    index === 0 ? [0, 0] : [60, 0],
  );

  const Icon = ICONS[item.icon] ?? Globe;
  const panelNumber = String(index + 1).padStart(2, "0");

  return (
    <m.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="border border-border bg-background p-8 md:p-10">
        <div className="mb-6 flex items-center gap-4">
          <span
            className="font-mono text-xs tracking-[0.3em] text-muted"
            style={{ textTransform: "uppercase" }}
          >
            {panelNumber}
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden />
          <Icon className="size-5 text-violet-3" aria-hidden />
        </div>
        <h3
          className="font-display font-bold tracking-tight text-foreground"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          {item.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {item.description}
        </p>
        <ul className="mt-6 space-y-2.5">
          {item.points.map((point) => (
            <li key={point} className="flex items-center gap-3 font-mono text-xs text-muted">
              <span className="h-px w-4 shrink-0 bg-cyan" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </m.div>
  );
}

export function StickyStory() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (shouldReduceMotion) {
    return (
      <section id="loesung" aria-label={services.title} className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-3 font-mono text-[0.65rem] tracking-[0.3em] text-violet-3" style={{ textTransform: "uppercase" }}>
            Leistungen
          </p>
          <p
            className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
            style={{ textTransform: "uppercase" }}
          >
            Was ich anbiete
          </p>
          <h2
            className="max-w-2xl font-display font-black tracking-tighter text-foreground"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
          >
            {services.title}
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PANELS.map((item) => {
              const Icon = ICONS[item.icon] ?? Globe;
              return (
                <article key={item.title} className="border border-border bg-background p-8">
                  <Icon className="size-5 text-violet-3" aria-hidden />
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="loesung"
      ref={sectionRef}
      aria-label={services.title}
      className="relative h-[320vh]"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-20">
          {/* Sticky statement */}
          <div>
            <Reveal variant="fadeIn">
              <p className="mb-3 font-mono text-[0.65rem] tracking-[0.3em] text-violet-3" style={{ textTransform: "uppercase" }}>
                Leistungen
              </p>
              <p
                className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
                style={{ textTransform: "uppercase" }}
              >
                Was ich anbiete
              </p>
            </Reveal>
            <h2
              className="font-display font-black tracking-tighter text-foreground"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              {services.title}
            </h2>
            <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-muted">
              {services.subtitle}
            </p>
            {/* Progress indicator */}
            <div className="relative mt-10 h-px w-48 bg-border">
              <m.div
                className="absolute inset-y-0 left-0 origin-left bg-violet-3"
                style={{ scaleX: progressScaleX }}
              />
            </div>
          </div>

          {/* Switching panels */}
          <div className="relative h-[26rem] md:h-[30rem]">
            {PANELS.map((item, i) => (
              <StoryPanel
                key={item.title}
                item={item}
                index={i}
                total={PANELS.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
