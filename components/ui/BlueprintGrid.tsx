"use client";

import * as React from "react";

import { isTouchDevice, lerp, prefersReducedMotion } from "@/lib/motion";

const CELL = 56;
const CROSS = 5;
const RADIUS = 180;

/**
 * Blueprint-Raster (Ersatz für den alten Partikel-Hintergrund auf
 * /projekte): technisches Kreuzraster wie auf Konstruktionspapier.
 * Kreuze im Cursor-Radius drehen sich auf und färben violett.
 *
 * Canvas 2D, zeichnet nur bei Mausbewegung neu (ein statisches Raster
 * kostet nichts). Touch / reduced-motion: statisches Raster ohne Reaktion.
 */
export function BlueprintGrid({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isStatic = isTouchDevice() || prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let colLine = "rgba(148,163,184,0.16)";
    let colHot = "#48d19a";
    const mouse = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };
    let raf = 0;
    let running = false;
    let idleFrames = 0;

    const resolveTokens = () => {
      const s = getComputedStyle(document.documentElement);
      const fg = s.getPropertyValue("--color-muted").trim();
      const hot = s.getPropertyValue("--color-violet-3").trim();
      if (fg) colLine = fg;
      if (hot) colHot = hot;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cell = CELL * dpr;
      const cross = CROSS * dpr;
      const radius = RADIUS * dpr;
      for (let y = cell / 2; y < H + cell; y += cell) {
        for (let x = cell / 2; x < W + cell; x += cell) {
          const dx = x - eased.x;
          const dy = y - eased.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const heat = Math.max(0, 1 - dist / radius);
          ctx.save();
          ctx.translate(x, y);
          if (heat > 0.01) {
            ctx.rotate(heat * Math.PI * 0.25);
            ctx.strokeStyle = colHot;
            ctx.globalAlpha = 0.15 + heat * 0.75;
          } else {
            ctx.strokeStyle = colLine;
            ctx.globalAlpha = 0.35;
          }
          const s = cross * (1 + heat * 0.9);
          ctx.lineWidth = dpr;
          ctx.beginPath();
          ctx.moveTo(-s, 0);
          ctx.lineTo(s, 0);
          ctx.moveTo(0, -s);
          ctx.lineTo(0, s);
          ctx.stroke();
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      const before = { x: eased.x, y: eased.y };
      eased.x = lerp(eased.x, mouse.x, 0.16);
      eased.y = lerp(eased.y, mouse.y, 0.16);
      draw();
      // Loop schlafen legen, sobald der Cursor eingerastet ist
      if (
        Math.abs(eased.x - before.x) < 0.1 &&
        Math.abs(eased.y - before.y) < 0.1
      ) {
        idleFrames += 1;
        if (idleFrames > 10) {
          running = false;
          return;
        }
      } else {
        idleFrames = 0;
      }
      raf = window.requestAnimationFrame(loop);
    };

    const wake = () => {
      if (running || isStatic) return;
      running = true;
      idleFrames = 0;
      raf = window.requestAnimationFrame(loop);
    };

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX * dpr;
      mouse.y = event.clientY * dpr;
      wake();
    };

    const resize = () => {
      W = canvas.width = Math.round(window.innerWidth * dpr);
      H = canvas.height = Math.round(window.innerHeight * dpr);
      resolveTokens();
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    if (!isStatic) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }
    const themeObserver = new MutationObserver(() => resize());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
