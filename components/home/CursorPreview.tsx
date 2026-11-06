"use client";

import * as React from "react";

import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

/**
 * Hängt die Live-Vorschau einer Projekt-Tafel an den Mauszeiger: folgt mit
 * leichter Verzögerung und kippt mit der Bewegungsrichtung. Ohne Maus
 * (Tastatur-Fokus) bleibt sie an ihrer Ruheposition rechts neben dem Titel.
 */
export function CursorPreview({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    const row = el?.parentElement;
    if (!el || !row || isTouchDevice() || prefersReducedMotion()) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let active = false;

    const loop = () => {
      const dx = tx - x;
      x += dx * 0.18;
      y += (ty - y) * 0.18;
      const tilt = Math.max(-7, Math.min(7, dx * 0.06));
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt.toFixed(2)}deg)`;
      if (active || Math.abs(dx) > 0.5) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const r = row.getBoundingClientRect();
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      tx = Math.min(Math.max(e.clientX - r.left + 28, 16), r.width - w - 16);
      ty = Math.min(Math.max(e.clientY - r.top - h / 2, 8), r.height - h - 8);
      if (!active) {
        active = true;
        // Erst ab der ersten Mausbewegung frei positionieren
        el.style.left = "0";
        el.style.top = "0";
        el.style.right = "auto";
        x = tx;
        y = ty;
        raf = requestAnimationFrame(loop);
      }
    };
    const onLeave = () => {
      active = false;
    };

    row.addEventListener("mousemove", onMove);
    row.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      row.removeEventListener("mousemove", onMove);
      row.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="preview-pop absolute right-[38%] top-6 z-20 hidden w-[min(30rem,32vw)] border-2 border-border bg-background shadow-[8px_8px_0_0_var(--color-signal)] md:block overflow-hidden rounded-[1.25rem]"
    >
      {children}
    </div>
  );
}
