"use client";

import * as React from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

/**
 * ScrollSequence — Kapitel "Der Prozess" (Feature B / Technik 1).
 *
 * Ein gepinnter 260vh-Abschnitt scrubbt eine Bildsequenz frame-genau am
 * Scroll: ein Canvas zeichnet pro Frame ein WebP (drawImage, cover-Verhalten,
 * DPR-scharf). Kein Flackern, rückwärts identisch — jeder Frame ersetzt den
 * vorherigen vollflächig-opak.
 *
 * Die vier Beats sind an Frame-Bereiche gekoppelt (Text als DOM-Overlay):
 *   Anforderung (0–35) · Struktur (35–75) · Design (75–110) · Launch (110–150)
 *
 * Asset-Strategie: Frames werden AUSSCHLIESSLICH über frameSrc() geladen —
 * echte Blender-Renderings später nur als Dateien tauschen, kein Code-Eingriff.
 *
 * Performance: Frame 0 wird zuerst geladen (LCP-Poster + Priorität), der Rest
 * gestaffelt sequenziell. <768px lädt die sm-Sequenz. prefers-reduced-motion
 * zeigt ein statisches letztes Frame.
 */

const TOTAL = 150;
const LAST = TOTAL - 1;

const pad = (n: number) => String(n).padStart(4, "0");
/** Einzige Ladequelle der Frames — hier später auf echte Renderings zeigen. */
const frameSrc = (size: "lg" | "sm", i: number) =>
  `/sequence/${size}/frame_${pad(i + 1)}.webp`;

const BEATS = [
  { n: "01", label: "Anforderung" },
  { n: "02", label: "Struktur" },
  { n: "03", label: "Design" },
  { n: "04", label: "Launch" },
] as const;

export function ScrollSequence() {
  const reduceMotion = useReducedMotion();
  const [size, setSize] = React.useState<"lg" | "sm">("lg");

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setSize(mq.matches ? "sm" : "lg");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduceMotion ? (
    <SequenceStatic size={size} />
  ) : (
    <SequenceScrub size={size} />
  );
}

function SequenceScrub({ size }: { size: "lg" | "sm" }) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imagesRef = React.useRef<HTMLImageElement[]>([]);
  const loadedRef = React.useRef<boolean[]>([]);
  const loadedCountRef = React.useRef(0);
  const frameRef = React.useRef(0);
  const rafRef = React.useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Beat-Opazitäten (harte-ish Cross-Cuts, an die Frame-Bereiche gekoppelt).
  const o1 = useTransform(scrollYProgress, [0, 0.2, 0.235], [1, 1, 0]);
  const o2 = useTransform(
    scrollYProgress,
    [0.235, 0.26, 0.48, 0.503],
    [0, 1, 1, 0],
  );
  const o3 = useTransform(
    scrollYProgress,
    [0.503, 0.53, 0.71, 0.738],
    [0, 1, 1, 0],
  );
  const o4 = useTransform(scrollYProgress, [0.738, 0.76, 1], [0, 1, 1]);
  const beatOpacities = [o1, o2, o3, o4];

  const draw = React.useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Frames werden in Reihenfolge geladen → geladene Menge ist ein Präfix.
    // Für noch nicht geladene Frames das zuletzt geladene zeichnen (kein Blank).
    let i = Math.max(0, Math.min(LAST, idx));
    if (!loadedRef.current[i]) i = loadedCountRef.current - 1;
    if (i < 0) return;
    const img = imagesRef.current[i];
    if (!img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (cw === 0 || ch === 0) return;
    const bw = Math.round(cw * dpr);
    const bh = Math.round(ch * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }

    // cover: skaliert so, dass der Canvas komplett gefüllt ist, zentriert.
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(bw / iw, bh / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.clearRect(0, 0, bw, bh);
    ctx.drawImage(img, (bw - dw) / 2, (bh - dh) / 2, dw, dh);
  }, []);

  const scheduleDraw = React.useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(frameRef.current));
  }, [draw]);

  // Sequenz laden: Frame 0 zuerst (LCP), dann gestaffelt der Rest.
  React.useEffect(() => {
    imagesRef.current = new Array(TOTAL);
    loadedRef.current = new Array(TOTAL).fill(false);
    loadedCountRef.current = 0;
    let cancelled = false;

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          loadedRef.current[i] = true;
          imagesRef.current[i] = img;
          loadedCountRef.current = Math.max(loadedCountRef.current, i + 1);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameSrc(size, i);
      });

    (async () => {
      await loadOne(0);
      if (cancelled) return;
      scheduleDraw();
      for (let i = 1; i < TOTAL; i++) {
        if (cancelled) return;
        await loadOne(i);
        if (i % 12 === 0) scheduleDraw();
      }
      scheduleDraw();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [size, scheduleDraw]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.round(p * LAST);
    if (idx !== frameRef.current) {
      frameRef.current = idx;
      scheduleDraw();
    }
  });

  React.useEffect(() => {
    const onResize = () => scheduleDraw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scheduleDraw]);

  return (
    <section
      id="prozess"
      ref={sectionRef}
      aria-label="Der Prozess"
      className="relative h-[260vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-background">
        {/* Frame-0-Poster für LCP; Canvas legt sich opak darüber. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameSrc(size, 0)}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 block h-full w-full"
        />
        {/* Lesbarkeits-Verlauf für die Overlays */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-background/35"
        />

        <h2 className="sr-only">
          Der Prozess — Anforderung, Struktur, Design, Launch
        </h2>

        {BEATS.map((beat, i) => (
          <SequenceBeat key={beat.n} beat={beat} opacity={beatOpacities[i]} />
        ))}
      </div>
    </section>
  );
}

function SequenceBeat({
  beat,
  opacity,
}: {
  beat: (typeof BEATS)[number];
  opacity: MotionValue<number>;
}) {
  return (
    <m.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 mx-auto flex w-full max-w-5xl flex-col px-6"
    >
      <span className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-violet-3">
        {beat.n} — Prozess
      </span>
      <span
        className="font-display font-black tracking-tighter text-foreground [text-wrap:balance]"
        style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", lineHeight: 1.0 }}
      >
        {beat.label}
      </span>
    </m.div>
  );
}

/** prefers-reduced-motion: statisches letztes Frame, kein Pin, kein Scrub. */
function SequenceStatic({ size }: { size: "lg" | "sm" }) {
  return (
    <section
      id="prozess"
      aria-label="Der Prozess"
      className="relative min-h-[70svh] overflow-hidden bg-background"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc(size, LAST)}
        alt="Abstrakte Darstellung des Arbeitsprozesses: aus verstreuten Fragmenten wird eine Struktur."
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-background/85 to-background/30"
      />
      <div className="relative z-10 mx-auto flex min-h-[70svh] w-full max-w-5xl flex-col justify-end px-6 py-24">
        <span className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-violet-3">
          Der Prozess
        </span>
        <h2
          className="font-display font-black tracking-tighter text-foreground [text-wrap:balance]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.0 }}
        >
          Anforderung · Struktur · Design · Launch
        </h2>
      </div>
    </section>
  );
}
