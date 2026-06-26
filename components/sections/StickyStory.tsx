"use client";

import * as React from "react";
import { Globe, Layers, Sparkles, type LucideIcon } from "lucide-react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { services } from "@/lib/content";
import { WordReveal } from "@/components/animation/Reveal";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Sparkles,
  Layers,
};

// Die ersten drei Leistungs-Säulen als durchwechselnde Story-Panels
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

  // Panel blendet in seinem Scroll-Abschnitt ein und wieder aus
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

  return (
    <m.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="glass rounded-[var(--radius-xl)] p-8 md:p-10">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius)] border border-violet/40 bg-violet/10 text-violet-3">
          <Icon className="size-6" aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-foreground md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {item.description}
        </p>
        <ul className="mt-6 space-y-2.5">
          {item.points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-sm text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </m.div>
  );
}

/**
 * Sticky-Storytelling: Das große Statement bleibt beim Scrollen stehen,
 * während rechts die Leistungs-Panels nacheinander durchwechseln
 * (position: sticky + Framer-Motion-Scroll-Progress).
 */
export function StickyStory() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Reduced Motion / einfaches Fallback: statische Liste statt Sticky-Scroll
  if (shouldReduceMotion) {
    return (
      <section aria-label={services.title} className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {services.title}
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PANELS.map((item) => {
              const Icon = ICONS[item.icon] ?? Globe;
              return (
                <article
                  key={item.title}
                  className="glass rounded-[var(--radius-xl)] p-8"
                >
                  <Icon className="size-6 text-violet-3" aria-hidden />
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
      ref={sectionRef}
      aria-label={services.title}
      className="relative h-[320vh]"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-20">
          {/* Sticky-Statement (bleibt stehen) */}
          <div>
            <WordReveal
              text={services.title}
              className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl"
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              {services.subtitle}
            </p>
            {/* Scroll-Fortschritt */}
            <div className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-surface-2">
              <m.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-violet to-cyan"
                style={{ scaleX: progressScaleX }}
              />
            </div>
          </div>

          {/* Durchwechselnde Panels */}
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
