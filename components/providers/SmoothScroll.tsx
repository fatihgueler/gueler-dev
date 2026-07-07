"use client";

import * as React from "react";
import Lenis from "lenis";

import { prefersReducedMotion } from "@/lib/motion";

declare global {
  interface Window {
    /** Globale Lenis-Instanz für Anchor-Scrolls und Debugging.
        (window.lenis ist bereits von Lenis' eigenen Typen belegt.) */
    __lenis?: Lenis;
  }
}

/**
 * Globaler Smooth-Scroll (Lenis) mit eigenem rAF-Loop.
 * Die frühere GSAP-Ticker-/ScrollTrigger-Kopplung ist raus — nichts
 * nutzt mehr ScrollTrigger, und ohne GSAP schrumpft das JS-Bundle.
 * Bei „Bewegung reduzieren" wird natives Scrollen beibehalten.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
