"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { prefersReducedMotion } from "@/lib/motion";

/**
 * Zentrale Scroll-Engine: EINE rAF-Schleife für alle Parallax-Effekte.
 *
 * - Jedes Element mit [data-sp] bekommt --p (0 = betritt unten, 1 = verlässt
 *   oben) als CSS-Variable; die Effekte selbst sind reines CSS (globals.css).
 * - <html> bekommt --vel (geglättetes Scroll-Tempo, −1…1) für Schräglagen.
 * - Nur sichtbare Elemente werden gerechnet (IntersectionObserver).
 * - Bei „Bewegung reduzieren" läuft nichts; die CSS-Defaults (--p: .5)
 *   ergeben dann die neutrale Ruheposition.
 */
export function ScrollEngine() {
  const pathname = usePathname();

  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-sp]"));
    const visible = new Set<HTMLElement>();

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target as HTMLElement);
          else visible.delete(e.target as HTMLElement);
        }),
      { rootMargin: "20% 0px 20% 0px" },
    );
    els.forEach((el) => io.observe(el));

    let lastY = window.scrollY;
    let vel = 0;
    let raf = 0;

    const measure = (el: HTMLElement, vh: number) => {
      const r = el.getBoundingClientRect();
      const p = (vh - r.top) / (vh + r.height);
      el.style.setProperty("--p", Math.min(1.2, Math.max(-0.2, p)).toFixed(4));
    };

    const tick = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      vel += (Math.max(-60, Math.min(60, y - lastY)) / 60 - vel) * 0.15;
      lastY = y;
      root.style.setProperty("--vel", vel.toFixed(3));
      visible.forEach((el) => measure(el, vh));
      raf = requestAnimationFrame(tick);
    };

    // Erste Messung für alle, damit nichts in der Default-Lage springt
    const vh = window.innerHeight;
    els.forEach((el) => measure(el, vh));
    root.classList.add("sp-on");
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
