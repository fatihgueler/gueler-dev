"use client";

import * as React from "react";

import { HERO_TEXT_POOL } from "@/lib/hero-code";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

/**
 * "GÜLER aus echtem Code" — die Hero-Wortmarke.
 *
 * Die Buchstaben von GÜLER.DEV sind nicht gefüllt, sondern maskieren ein
 * scrollendes Textfeld aus echtem, kuratiertem Code dieses Repos
 * (lib/hero-code.ts). Rendering: Canvas 2D, Textur-Spalte pro Buchstabe,
 * per destination-in in die Buchstabenformen geclippt.
 *
 * Interaktion:
 * - Erster Scroll / Entrance: harter Slice-Glitch (gestufte Zufalls-Offsets,
 *   KEIN Easing), danach rastet die Marke in eine leicht schiefe,
 *   "grinsende" Ruhelage ein.
 * - Hover: JOKER-GRIN. Die Wortmarke verwandelt sich per Glitch-Cut in ein
 *   breites Lächeln — die Buchstaben legen sich auf einen tiefen Smile-Bogen,
 *   rotieren der Kurventangente entlang, die Mitte wölbt sich nach vorn
 *   (Pseudo-3D über per-Letter rotate/scale) und die ganze Marke "lacht"
 *   mit einem leichten Wobble, solange der Cursor drüber steht. Beim
 *   Verlassen federt sie zurück in die Ruhelage (unterdämpfte Feder).
 *
 * Touch / prefers-reduced-motion: ein einziger statischer Composite-Frame,
 * kein RAF-Loop, kein Glitch, kein Morph.
 */

const WORD = "GÜLER.DEV";
const LETTERS = Array.from(WORD);

/** Negative Laufweite in em — die Marke steht dicht, brutalistisch. */
const TRACKING_EM = -0.03;
/** Baseline-Position innerhalb der Canvas-Höhe. */
const BASELINE_RATIO = 0.78;
/** Amplitude der Ruhe-Grin-Kurve relativ zur Fontgröße. */
const GRIN_AMP = 0.07;
/** Anzahl horizontaler Glitch-Slices. */
const SLICE_COUNT = 7;
const CUT_MS = 240;
const CUT_STEP_MS = 60;
const SETTLE_MS = 280;
const TRIGGER_COOLDOWN_MS = 1500;

/** Joker-Grin: Tiefe des Smile-Bogens relativ zur Fontgröße. */
const SMILE_DEPTH = 0.7;
/** Extra-Haken an den Mundwinkeln: zieht NUR die Enden weiter hoch (u⁴). */
const SMILE_HOOK = 0.22;
/** Basis-Rotation entlang der Kurve (rad) … */
const SMILE_ROT = 0.4;
/** … plus kubischer Zuschlag an den Enden (Mundwinkel drehen stärker ein). */
const SMILE_ROT_END = 0.25;
/** Horizontale Spreizung: das Lächeln wird BREITER als die Ruhelage. */
const SMILE_SPREAD = 0.12;
/** Längs-Streckung der Endbuchstaben (u⁴) → spitze Mundwinkel. */
const SMILE_STRETCH = 0.55;
/** Verjüngung der Endbuchstaben in der Breite (u⁴) → Spitze läuft zu. */
const SMILE_POINT = 0.3;
/** Fiese Scherung: Buchstaben-Oberkanten kippen nach außen. */
const SMILE_SHEAR = 0.14;
/** Globaler Zoom-Out beim vollen Grin, damit der Bogen in die Canvas passt. */
const SMILE_SHRINK = 0.34;
/** Overshoot-Klemme der Feder: mehr als 120 % Grin verformt nicht weiter. */
const SMILE_MAX = 1.2;

/** Mundwinkel-Kurve der Ruhelage: Enden bleiben, Mitte sackt minimal ab. */
const GRIN_OFFSETS = LETTERS.map((_, i) => {
  const t = i / (LETTERS.length - 1);
  const smile = 1 - Math.pow(2 * t - 1, 2); // 0 an den Enden, 1 in der Mitte
  return smile;
});
/** Deterministische Mini-Schiefe pro Buchstabe (in em·0.01). */
const SKEW_JITTER = [0, -0.6, 0.4, -0.2, 0.7, 0, -0.5, 0.3, -0.8];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type Phase = "idle" | "cut" | "settle";

export function CodeWordmark({ className }: { className?: string }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isStatic = isTouchDevice() || prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Offscreen-Ebenen: Code-Textur, Buchstaben-Maske, Composite.
    const tex = document.createElement("canvas");
    const mask = document.createElement("canvas");
    const comp = document.createElement("canvas");
    const texCtx = tex.getContext("2d")!;
    const maskCtx = mask.getContext("2d")!;
    const compCtx = comp.getContext("2d")!;

    // ── Metriken & Farben ──────────────────────────────────────────
    let W = 0;
    let H = 0;
    let fontSize = 0;
    let letterX: number[] = [];
    let letterW: number[] = [];
    let baseline = 0;
    let displayFont = "system-ui, sans-serif";
    let monoFont = "monospace";
    let colFg = "#f1f5f9";
    let colAccentA = "#48d19a";
    let colAccentB = "#e9a93b";
    let texH = 0;
    let lineH = 0;

    const resolveTokens = () => {
      const s = getComputedStyle(document.documentElement);
      displayFont =
        s.getPropertyValue("--font-display").trim() || displayFont;
      monoFont = s.getPropertyValue("--font-mono").trim() || monoFont;
      colFg = s.getPropertyValue("--color-foreground").trim() || colFg;
      colAccentA = s.getPropertyValue("--color-violet-3").trim() || colAccentA;
      colAccentB = s.getPropertyValue("--color-cyan").trim() || colAccentB;
    };

    /** Buchstaben-Layout: Wortmarke exakt auf Containerbreite skalieren. */
    const layout = () => {
      W = Math.round(wrap.clientWidth * dpr);
      H = Math.round(wrap.clientHeight * dpr);
      if (W === 0 || H === 0) return false;
      for (const c of [canvas, mask, comp]) {
        c.width = W;
        c.height = H;
      }

      const PROBE = 100;
      maskCtx.font = `800 ${PROBE}px ${displayFont}`;
      const widths = LETTERS.map((ch) => maskCtx.measureText(ch).width);
      const total =
        widths.reduce((a, b) => a + b, 0) +
        PROBE * TRACKING_EM * (LETTERS.length - 1);
      fontSize = (PROBE * (W * 0.99)) / total;
      // Höhen-Deckel: Umlaut + Grin-/Smile-Offsets müssen in die Canvas passen.
      fontSize = Math.min(fontSize, H / 1.22);

      const scale = fontSize / PROBE;
      letterW = widths.map((w) => w * scale);
      const totalW =
        letterW.reduce((a, b) => a + b, 0) +
        fontSize * TRACKING_EM * (LETTERS.length - 1);
      let x = (W - totalW) / 2;
      letterX = letterW.map((w) => {
        const cur = x;
        x += w + fontSize * TRACKING_EM;
        return cur;
      });
      baseline = H * BASELINE_RATIO;
      return true;
    };

    /** Code-Textur einmalig rendern (bei Resize/Theme-Wechsel neu). */
    const buildTexture = () => {
      const codeSize = Math.max(9 * dpr, fontSize * 0.045);
      lineH = codeSize * 1.3;
      const lines = Math.max(48, Math.ceil((H * 2) / lineH));
      texH = Math.ceil(lines * lineH);
      tex.width = W;
      tex.height = texH;
      texCtx.clearRect(0, 0, W, texH);
      texCtx.font = `500 ${codeSize}px ${monoFont}`;
      texCtx.textBaseline = "alphabetic";
      for (let i = 0; i < lines; i++) {
        const text = HERO_TEXT_POOL[i % HERO_TEXT_POOL.length];
        // Deterministischer x-Versatz pro Zeile → kein Blocksatz-Muster
        const xShift = -((i * 53) % 140) * dpr;
        if (i % 9 === 3) {
          texCtx.fillStyle = colAccentA;
          texCtx.globalAlpha = 0.95;
        } else if (i % 13 === 7) {
          texCtx.fillStyle = colAccentB;
          texCtx.globalAlpha = 0.9;
        } else {
          texCtx.fillStyle = colFg;
          texCtx.globalAlpha = 0.85;
        }
        // Zeile ggf. wiederholen, bis die Breite gefüllt ist
        let x = xShift;
        while (x < W) {
          texCtx.fillText(text, x, (i + 0.8) * lineH);
          x += texCtx.measureText(text).width + codeSize * 2.5;
        }
      }
      texCtx.globalAlpha = 1;
    };

    // ── Animations-Zustand ─────────────────────────────────────────
    let phase: Phase = "idle";
    let phaseStart = 0;
    let lastCutStep = 0;
    let lastTrigger = -Infinity;
    let lastNow = 0;
    let grinP = 0; // 0 = gerade Baseline, 1 = Ruhe-Grinsen (bleibt nach 1. Cut)
    // Joker-Grin als unterdämpfte Feder → Overshoot + Nachwippen = "Lachen"
    let smileP = 0;
    let smileV = 0;
    let smileTarget = 0;
    const jitterX = new Array(LETTERS.length).fill(0);
    const jitterY = new Array(LETTERS.length).fill(0);
    const settleFromX = new Array(LETTERS.length).fill(0);
    const settleFromY = new Array(LETTERS.length).fill(0);
    let settleFromGrin = 0;
    const sliceDX = new Array(SLICE_COUNT).fill(0);
    // Scroll pro Buchstabe (Nähte fallen in die Buchstabenlücken,
    // nie mitten durch eine Glyphe) — Geschwindigkeit px/s, deterministisch.
    const colSpeed = LETTERS.map((_, i) => 22 + ((i * 37) % 5) * 7);
    const colPhase = LETTERS.map((_, i) => ((i * 137) % 100) / 100);

    const randomizeCut = () => {
      for (let s = 0; s < SLICE_COUNT; s++) {
        sliceDX[s] =
          Math.random() < 0.65 ? (Math.random() - 0.5) * W * 0.07 : 0;
      }
      for (let i = 0; i < LETTERS.length; i++) {
        jitterX[i] = (Math.random() - 0.5) * fontSize * 0.06;
        jitterY[i] = (Math.random() - 0.5) * fontSize * 0.12;
      }
    };

    const trigger = () => {
      const now = performance.now();
      if (phase !== "idle" || now - lastTrigger < TRIGGER_COOLDOWN_MS) return;
      lastTrigger = now;
      phase = "cut";
      phaseStart = now;
      lastCutStep = 0;
      randomizeCut();
    };

    /**
     * Buchstaben zeichnen (Füllung ODER Kontur) — eine Transform-Pipeline
     * für Ruhe-Grin, Glitch-Jitter und Joker-Smile:
     * Position auf dem Smile-Bogen, Rotation entlang der Kurventangente,
     * Pseudo-3D (Ecken kippen weg, Mitte wölbt sich vor), Lach-Wobble.
     */
    const drawLetters = (
      c2: CanvasRenderingContext2D,
      stroke: boolean,
      now: number,
    ) => {
      c2.font = `800 ${fontSize}px ${displayFont}`;
      c2.textBaseline = "alphabetic";
      // Klemme: kein negativer Grin (Rückfeder) und begrenzter Overshoot,
      // sonst schießen die Spitzen über den Canvas-Rand hinaus.
      const s = Math.max(0, Math.min(SMILE_MAX, smileP));
      const g = 1 - SMILE_SHRINK * s;
      const pivotY = H * 0.58;

      for (let i = 0; i < LETTERS.length; i++) {
        const t = i / (LETTERS.length - 1);
        const u = 2 * t - 1; // -1 … 1, 0 = Wortmitte
        const u4 = u * u * u * u; // Enden-Gewicht: wirkt fast nur auf G und V

        const grinY =
          GRIN_OFFSETS[i] * fontSize * GRIN_AMP * grinP +
          SKEW_JITTER[i] * fontSize * 0.01 * grinP;

        // Smile-Bogen: Ecken hoch, Mitte runter (Canvas-y wächst nach unten),
        // plus Haken: die Mundwinkel ziehen überproportional weiter hoch.
        const smileY =
          s * fontSize * (SMILE_DEPTH * (0.5 - u * u) - SMILE_HOOK * u4);
        // Tangenten-Rotation, an den Enden stärker eingedreht
        const rot = s * u * (SMILE_ROT + SMILE_ROT_END * u * u);
        // Spitze Mundwinkel: Enden längs gestreckt und in der Breite verjüngt,
        // Mitte wölbt sich nach vorn (Pseudo-3D)
        const sy = 1 + s * (SMILE_STRETCH * u4 - 0.06 * Math.abs(u));
        const sx = 1 + s * (0.12 * (1 - u * u) - SMILE_POINT * u4);
        // Fiese Scherung: Oberkanten kippen nach außen
        const shear = -u * SMILE_SHEAR * s;
        // Lach-Wobble, solange der Grin steht
        const wy = Math.sin(now * 0.018 + i * 1.9) * fontSize * 0.02 * s;
        const wrot = Math.sin(now * 0.021 + i * 1.3) * 0.03 * s;

        // Breiter: Buchstaben spreizen horizontal auseinander
        const cx =
          letterX[i] +
          letterW[i] / 2 +
          jitterX[i] +
          s * u * fontSize * SMILE_SPREAD;
        const cy = baseline + grinY + jitterY[i] + smileY + wy;

        c2.save();
        // Globaler Zoom-Out um die Wortmitte, damit der Bogen Platz hat
        c2.translate(W / 2, pivotY);
        c2.scale(g, g);
        c2.translate(-W / 2, -pivotY);
        // Per-Letter-Transform um den Baseline-Mittelpunkt
        c2.translate(cx, cy);
        c2.rotate(rot + wrot);
        c2.scale(sx, sy);
        c2.transform(1, 0, shear, 1, 0, 0);
        if (stroke) {
          c2.strokeText(LETTERS[i], -letterW[i] / 2, 0);
        } else {
          c2.fillText(LETTERS[i], -letterW[i] / 2, 0);
        }
        c2.restore();
      }
    };

    /** Maske: Buchstaben mit Grin/Smile/Jitter als Alpha-Form. */
    const drawMask = (now: number) => {
      maskCtx.clearRect(0, 0, W, H);
      maskCtx.fillStyle = "#fff";
      drawLetters(maskCtx, false, now);
    };

    /** Composite: Textur-Spalten (je Buchstabe) → destination-in Maske → Kontur. */
    const drawComposite = (now: number) => {
      compCtx.clearRect(0, 0, W, H);
      const s = Math.max(0, Math.min(SMILE_MAX, smileP));
      // Beim Grin verlassen gestreckte/rotierte Buchstaben ihre Spalten →
      // volle Textur-Grundschicht darunter, damit KEINE Spitze leer ausgeht.
      if (s > 0.01) {
        const off = ((28 * dpr * now) / 1000) % texH;
        const h1 = Math.min(H, texH - off);
        compCtx.drawImage(tex, 0, off, W, h1, 0, 0, W, h1);
        if (h1 < H) {
          compCtx.drawImage(tex, 0, 0, W, H - h1, 0, h1, W, H - h1);
        }
      }
      // Beim Smile wandern/rotieren die Buchstaben → Spalten breiter fassen
      const pad = fontSize * (0.08 + 0.5 * s);
      for (let c = 0; c < LETTERS.length; c++) {
        const off =
          ((colSpeed[c] * dpr * now) / 1000 + colPhase[c] * texH) % texH;
        const x = Math.max(0, letterX[c] - pad);
        const colW = Math.min(W - x, letterW[c] + pad * 2);
        const h1 = Math.min(H, texH - off);
        compCtx.drawImage(tex, x, off, colW, h1, x, 0, colW, h1);
        if (h1 < H) {
          compCtx.drawImage(tex, x, 0, colW, H - h1, x, h1, colW, H - h1);
        }
      }
      compCtx.globalCompositeOperation = "destination-in";
      compCtx.drawImage(mask, 0, 0);
      compCtx.globalCompositeOperation = "source-over";
      // Feine Kontur, damit die Buchstabenform auch bei Zeilenlücken steht
      compCtx.strokeStyle = colFg;
      compCtx.lineWidth = Math.max(1, dpr);
      compCtx.globalAlpha = 0.42;
      drawLetters(compCtx, true, now);
      compCtx.globalAlpha = 1;
    };

    /** Sichtbare Canvas: idle direkt, im Cut in versetzten Slices. */
    const blit = () => {
      ctx.clearRect(0, 0, W, H);
      if (phase === "cut") {
        const sliceH = Math.ceil(H / SLICE_COUNT);
        for (let s = 0; s < SLICE_COUNT; s++) {
          const sy = s * sliceH;
          ctx.drawImage(comp, 0, sy, W, sliceH, sliceDX[s], sy, W, sliceH);
        }
      } else {
        ctx.drawImage(comp, 0, 0);
      }
    };

    const step = (now: number) => {
      const dt = lastNow ? Math.min(48, now - lastNow) : 16.7;
      lastNow = now;
      const dtn = dt / 16.7;

      // Unterdämpfte Feder Richtung smileTarget → Overshoot + Nachwippen
      smileV += (smileTarget - smileP) * 0.045 * dtn;
      smileV *= Math.pow(0.86, dtn);
      smileP += smileV * dtn;

      if (phase === "cut") {
        // Harte Stufen: Offsets springen alle CUT_STEP_MS, kein Easing.
        if (now - lastCutStep >= CUT_STEP_MS) {
          lastCutStep = now;
          randomizeCut();
        }
        if (now - phaseStart >= CUT_MS) {
          phase = "settle";
          phaseStart = now;
          for (let i = 0; i < LETTERS.length; i++) {
            settleFromX[i] = jitterX[i];
            settleFromY[i] = jitterY[i];
          }
          settleFromGrin = grinP;
          sliceDX.fill(0);
        }
      } else if (phase === "settle") {
        // Kurzes Einrasten: NUR hier gibt es Easing.
        const p = Math.min(1, (now - phaseStart) / SETTLE_MS);
        const e = easeOutCubic(p);
        for (let i = 0; i < LETTERS.length; i++) {
          jitterX[i] = settleFromX[i] * (1 - e);
          jitterY[i] = settleFromY[i] * (1 - e);
        }
        grinP = settleFromGrin + (1 - settleFromGrin) * e;
        if (p >= 1) {
          phase = "idle";
          jitterX.fill(0);
          jitterY.fill(0);
          grinP = 1;
        }
      }
      drawMask(now);
      drawComposite(now);
      blit();
      wrap.dataset.phase = phase;
    };

    // ── Setup, Loop & Events ───────────────────────────────────────
    let raf = 0;
    let running = false;
    let disposed = false;

    const loop = (now: number) => {
      step(now);
      if (running) raf = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || isStatic || disposed) return;
      running = true;
      lastNow = 0;
      raf = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    const renderStatic = () => {
      grinP = 1;
      smileP = 0;
      drawMask(0);
      drawComposite(0);
      blit();
    };

    const rebuild = () => {
      resolveTokens();
      if (!layout()) return;
      buildTexture();
      if (isStatic) renderStatic();
      else step(performance.now());
    };

    const ro = new ResizeObserver(() => rebuild());
    const themeObserver = new MutationObserver(() => rebuild());
    let io: IntersectionObserver | null = null;

    const onScrollOnce = () => trigger();
    const onEnter = () => {
      // Joker-Grin an: Glitch-Cut als Auftakt, Feder zieht in den Bogen.
      smileTarget = 1;
      trigger();
    };
    const onLeave = () => {
      // Zurückfedern in die Ruhelage (Overshoot macht das "Nachlachen").
      smileTarget = 0;
    };

    const init = async () => {
      // Bricolage + JetBrains müssen geladen sein, sonst misst measureText
      // den Fallback und die Marke springt nach dem Font-Swap.
      resolveTokens();
      try {
        await Promise.all([
          document.fonts.load(`800 100px ${displayFont}`, WORD),
          document.fonts.load(`500 16px ${monoFont}`, "abc"),
          document.fonts.ready,
        ]);
      } catch {
        /* Font-API nicht verfügbar → Fallback-Metriken sind ok */
      }
      if (disposed) return;

      rebuild();
      ro.observe(wrap);
      // Nur class beobachten (Theme-Toggle) — style fasst Lenis laufend an.
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      if (isStatic) return;

      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 },
      );
      io.observe(wrap);

      wrap.addEventListener("pointerenter", onEnter);
      wrap.addEventListener("pointerleave", onLeave);
      window.addEventListener("scroll", onScrollOnce, {
        once: true,
        passive: true,
      });
      // Entrance: die Marke materialisiert per Glitch-Cut.
      window.setTimeout(() => trigger(), 350);
    };

    void init();

    return () => {
      disposed = true;
      stop();
      ro.disconnect();
      themeObserver.disconnect();
      io?.disconnect();
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScrollOnce);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ aspectRatio: "4 / 1", position: "relative" }}
      data-cursor="glitch"
    >
      <span className="sr-only">GÜLER.DEV</span>
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
