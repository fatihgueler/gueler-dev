"use client";

import * as React from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/lib/motion";

declare global {
  interface Window {
    /** Globale Lenis-Instanz für Anchor-Scrolls und Debugging.
        (window.lenis ist bereits von Lenis' eigenen Typen belegt.) */
    __lenis?: Lenis;
  }
}

/**
 * Globaler Smooth-Scroll (Lenis) + GSAP-ScrollTrigger-Kopplung.
 * Bei „Bewegung reduzieren" wird natives Scrollen beibehalten.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    window.__lenis = lenis;

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Nach erstem Layout neu messen (Fonts, Bilder, dynamische Inhalte)
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(onTick);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
