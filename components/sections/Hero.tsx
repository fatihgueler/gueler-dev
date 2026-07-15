"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { hero } from "@/lib/content";

// Die r3f/three-Schwergewichte erst clientseitig nachladen (kein SSR, aus dem
// initialen Bundle raus) — schützt LCP/Lighthouse. Unter reduced-motion wird
// HeroStatic gerendert, three lädt dann gar nicht.
const ExplodedWordmark = dynamic(
  () =>
    import("@/components/hero/ExplodedWordmark").then(
      (mod) => mod.ExplodedWordmark,
    ),
  { ssr: false },
);

/**
 * Hero — Echtzeit-Assembly (Feature A / Technik 2).
 *
 * Der gepinnte Hero (250vh) scrubbt eine 3D-Assembly: verstreute Fragmente
 * setzen sich beim Scrollen zum Schriftzug "GÜLER.DEV" zusammen (r3f,
 * prozedural). Auf DERSELBEN Scroll-Timeline laufen Kamerafahrt + Gesamt-
 * rotation (in ExplodedWordmark) und drei Story-Beats als Text-Overlays:
 *   0–30 %  "Aus Einzelteilen."
 *   35–65 % "wird Struktur."
 *   70–100% assembliert + echte Headline/Subline + CTA.
 *
 * scrub-Charakter: scrollYProgress → useSpring (weiches, symmetrisches
 * Nachziehen, rückwärts identisch sauber). progressRef-Pattern: die Spring
 * ist ein MotionValue, den ExplodedWordmark in useFrame liest.
 *
 * prefers-reduced-motion: statischer Schriftzug (kein Pin, kein Canvas).
 * <768px: halbe Fragmentzahl.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  return reduceMotion ? <HeroStatic /> : <HeroAssembly />;
}

function HeroAssembly() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.6,
  });

  // Fragmentzahl an Viewport koppeln (<768px halbieren) + Canvas erst nach
  // Mount rendern, damit die Breite feststeht.
  const [count, setCount] = React.useState(64);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setCount(mq.matches ? 1500 : 6000);
    apply();
    setMounted(true);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Story-Beats: kurze, harte-ish Cross-Cuts (Brand: harte Schnitte).
  const beat1 = useTransform(progress, [0, 0.28, 0.34], [1, 1, 0]);
  const beat2 = useTransform(progress, [0.34, 0.4, 0.62, 0.68], [0, 1, 1, 0]);
  // Beat 3 (Wortmarke steht + CTA) im „Halte"-Fenster, blendet beim Zerfall aus.
  const beat3 = useTransform(progress, [0.64, 0.7, 0.86, 0.98], [0, 1, 1, 0]);
  const beat3PE = useTransform(progress, (v) =>
    v > 0.68 && v < 0.94 ? "auto" : "none",
  );
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Technischer Untergrund */}
        <div
          aria-hidden
          className="bg-dot-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
        />

        {/* 3D-Assembly */}
        {mounted && (
          <div className="absolute inset-0" data-cursor="glitch">
            <ExplodedWordmark progress={progress} count={count} />
          </div>
        )}
        {/* Zugänglicher Schriftzug + echte Headline für SEO/Screenreader */}
        <h1 className="sr-only">
          GÜLER.DEV — {hero.lines.join(" ")}
        </h1>

        {/* Beat 1 — Narration oben */}
        <m.div
          style={{ opacity: beat1 }}
          className="pointer-events-none absolute inset-x-0 top-[20%] z-10 flex flex-col items-center px-6 text-center"
          aria-hidden
        >
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-violet-3">
            Kapitel 00 — Ursprung
          </p>
          <p
            className="font-display font-black tracking-tighter text-foreground [text-wrap:balance]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.0 }}
          >
            Aus Einzelteilen.
          </p>
        </m.div>

        {/* Beat 2 — Narration oben */}
        <m.div
          style={{ opacity: beat2 }}
          className="pointer-events-none absolute inset-x-0 top-[20%] z-10 flex flex-col items-center px-6 text-center"
          aria-hidden
        >
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-cyan">
            wird
          </p>
          <p
            className="font-display font-black tracking-tighter text-foreground [text-wrap:balance]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.0 }}
          >
            wird Struktur.
          </p>
        </m.div>

        {/* Beat 3 — Headline + Subline + CTA unten */}
        <m.div
          style={{ opacity: beat3, pointerEvents: beat3PE }}
          className="absolute inset-x-0 bottom-[8%] z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center"
        >
          <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-violet-3">
            GÜLER.DEV
          </p>
          <p
            className="font-display font-bold leading-[1.05] tracking-tight text-foreground [text-wrap:balance]"
            style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}
          >
            {hero.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed tracking-wide text-muted">
            {hero.subtitle}
          </p>
          <a
            href={hero.cta.href}
            className="group mt-8 inline-flex shrink-0 items-center gap-3 border border-violet-3 bg-violet px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-violet-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {hero.cta.label}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </m.div>

        {/* Scroll-Hinweis (blendet sofort beim Scrollen aus) */}
        <m.a
          href="#chapter-1"
          aria-label="Nach unten scrollen"
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-2 transition-colors hover:text-cyan"
        >
          <span className="font-mono text-xs">{hero.scrollHint}</span>
          <m.span
            aria-hidden
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" />
          </m.span>
        </m.a>
      </div>
    </section>
  );
}

/** prefers-reduced-motion: statischer Schriftzug, kein Canvas, kein Pin. */
function HeroStatic() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-28 md:pt-32"
    >
      <div
        aria-hidden
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <p
          className="font-display font-black leading-none tracking-tighter text-foreground"
          style={{ fontSize: "clamp(2.5rem, 11vw, 9rem)" }}
        >
          GÜLER.DEV
        </p>
        <div className="mt-10 h-px w-full bg-border-strong md:mt-14" />
        <div className="mt-10 flex flex-col gap-10 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="max-w-2xl">
            <h1
              className="font-display font-bold leading-[1.05] tracking-tight text-foreground [text-wrap:balance]"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
            >
              {hero.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-5 max-w-xl font-mono text-sm leading-relaxed tracking-wide text-muted">
              {hero.subtitle}
            </p>
          </div>
          <a
            href={hero.cta.href}
            className="group inline-flex shrink-0 items-center gap-3 border border-violet-3 bg-violet px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-violet-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {hero.cta.label}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
