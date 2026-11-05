"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
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
 * Der gepinnte Hero (210vh) scrubbt eine 3D-Assembly: verstreute Fragmente
 * setzen sich beim Scrollen zum Schriftzug "GÜLER.DEV" zusammen (r3f,
 * prozedural). Auf DERSELBEN Scroll-Timeline laufen Kamerafahrt + Gesamt-
 * rotation (in ExplodedWordmark) und drei Story-Beats als Text-Overlays:
 *   0–30 %  "Aus Einzelteilen."
 *   35–65 % "wird Struktur."
 *   Headline/Subline + CTA stehen ab dem ersten Frame (Conversion: der
 *   erste Bildschirm muss sagen, was es gibt und was es kostet). Die Beats
 *   laufen nur ab md oben mit; auf dem Handy wäre dafür kein Platz.
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
    // Partikelzahl an die Geräteleistung koppeln: schnelles Scrollen aktualisiert
    // pro Frame N Instanz-Matrizen — auf schwachen CPUs (≤4 Kerne) / Mobile deutlich
    // reduzieren, damit 60fps auch beim Fling gehalten werden.
    const apply = () => {
      const mobile = mq.matches;
      const cores = navigator.hardwareConcurrency || 8;
      const weak = cores <= 4;
      setCount(mobile ? (weak ? 900 : 1500) : weak ? 2800 : 6000);
    };
    apply();
    // three.js erst laden, wenn der Seitenaufbau durch ist: konkurriert sonst
    // mit Hydration und Text-Rendering (LCP/TBT). Die Partikel erscheinen
    // ~einen Moment später, die Headline steht sofort.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const start = () => setMounted(true);
    const schedule = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(start, { timeout: 2000 });
      else timeoutId = window.setTimeout(start, 600);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  // Story-Beats: kurze, harte-ish Cross-Cuts (Brand: harte Schnitte).
  const beat1 = useTransform(progress, [0, 0.28, 0.34], [1, 1, 0]);
  const beat2 = useTransform(progress, [0.34, 0.4, 0.62, 0.68], [0, 1, 1, 0]);
  // Opener: volle Headline + Preis + CTA ab dem ersten Frame, blendet aus,
  // sobald sich der Schriftzug zusammensetzt (sonst Überlagerung).
  const opener = useTransform(progress, [0, 0.24, 0.32], [1, 1, 0]);
  const openerPE = useTransform(progress, (v) => (v < 0.3 ? "auto" : "none"));
  // Beat 3: kompakte Headline + CTA unter dem fertigen Schriftzug (Original-Timing).
  const beat3 = useTransform(progress, [0.64, 0.7, 0.86, 0.98], [0, 1, 1, 0]);
  const beat3PE = useTransform(progress, (v) =>
    v > 0.68 && v < 0.94 ? "auto" : "none",
  );

  return (
    <section id="top" ref={sectionRef} className="relative h-[210vh]">
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
          className="pointer-events-none absolute inset-x-0 top-[20%] z-10 hidden flex-col items-center px-6 text-center md:flex"
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
          className="pointer-events-none absolute inset-x-0 top-[20%] z-10 hidden flex-col items-center px-6 text-center md:flex"
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

        {/* Lesbarkeit: weicher Verlauf hinter dem Opener, Partikel bleiben sichtbar */}
        <m.div
          style={{ opacity: opener }}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[78%] bg-gradient-to-t from-background from-55% via-background/90 to-transparent md:h-[65%] md:from-35%"
        />

        {/* Opener — ab dem ersten Frame sichtbar */}
        <m.div
          style={{ opacity: opener, pointerEvents: openerPE }}
          className="absolute inset-x-0 bottom-[5%] z-10 mx-auto flex w-full max-w-3xl flex-col items-start px-6 text-left md:bottom-[8%] md:items-center md:text-center"
        >
          <HeroCopy />
        </m.div>

        {/* Beat 3 — kompakt unter dem fertigen Schriftzug */}
        <m.div
          style={{ opacity: beat3, pointerEvents: beat3PE }}
          className="absolute inset-x-0 bottom-[8%] z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center"
          aria-hidden
        >
          <p
            className="font-display font-bold leading-[1.05] tracking-tight text-foreground [text-wrap:balance]"
            style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}
          >
            <span className="block">{hero.lines[0]}</span>
            <span className="block text-violet-3">{hero.lines[1]}</span>
          </p>
          <a
            href={hero.cta.href}
            tabIndex={-1}
            className="group mt-6 inline-flex shrink-0 items-center gap-3 border border-violet-3 bg-violet px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-violet-2"
          >
            {hero.cta.label}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </m.div>
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
        <div className="mt-10 max-w-3xl md:mt-12">
          <HeroCopy as="h1" />
        </div>
      </div>
    </section>
  );
}

/** Gemeinsamer Copy-Block für animierten und statischen Hero. */
function HeroCopy({ as = "p" }: { as?: "p" | "h1" }) {
  const Headline = as;
  return (
    <>
      <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-violet-3">
        {hero.overline}
      </p>
      <Headline
        className="font-display font-black leading-[1.0] tracking-tighter text-foreground [text-wrap:balance]"
        style={{ fontSize: "clamp(2.35rem, 5vw, 4rem)" }}
      >
        <span className="block">{hero.lines[0]}</span>
        <span className="block text-violet-3">{hero.lines[1]}</span>
      </Headline>
      <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed tracking-wide text-muted">
        {hero.subtitle}
      </p>
      <div className="mt-6 flex w-full flex-col items-stretch gap-3 md:w-auto md:flex-row md:items-center md:gap-6">
        <a
          href={hero.cta.href}
          className="group inline-flex shrink-0 items-center justify-center gap-3 border border-violet-3 bg-violet px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-violet-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {hero.cta.label}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
        <a
          href={hero.secondary.href}
          className="tap inline-flex items-center gap-2 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-foreground underline-offset-4 hover:text-violet-3 hover:underline"
        >
          {hero.secondary.label}
          <ArrowDown className="size-3.5" aria-hidden />
        </a>
      </div>
      <ul className="mt-6 flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-center md:gap-x-6">
        {hero.checks.map((item) => (
          <li key={item} className="flex items-center gap-2 font-mono text-xs text-foreground/80">
            <Check className="size-3.5 shrink-0 text-violet-3" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
