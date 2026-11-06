"use client";

import * as React from "react";

import { prefersReducedMotion } from "@/lib/motion";

/**
 * Laufband-Motor: Grundtempo + Scroll-Boost, Richtung folgt der Scroll-
 * richtung, Schräglage nur während des Boosts. Erwartet einen Track mit
 * zweifach gerendertem Inhalt (für den nahtlosen Umbruch).
 */
export function useVelocityMarquee(
  ref: React.RefObject<HTMLElement | null>,
  { base = 0.6, skew = 0.35, reverse = false }: { base?: number; skew?: number; reverse?: boolean } = {},
) {
  React.useEffect(() => {
    const track = ref.current;
    if (!track || prefersReducedMotion()) return;

    track.style.animation = "none";
    let x = 0;
    let dir = reverse ? -1 : 1;
    let boost = 0;
    let lastY = window.scrollY;
    let raf = 0;
    let visible = true;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = (dy > 0 ? 1 : -1) * (reverse ? -1 : 1);
      boost = Math.min(boost + Math.abs(dy) * 0.12, 28);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(track);

    const tick = () => {
      if (visible) {
        const half = track.scrollWidth / 2;
        x -= (base + boost) * dir;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        track.style.transform = `translate3d(${x}px,0,0) skewX(${(-boost * skew * dir).toFixed(2)}deg)`;
      }
      boost *= 0.9;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref, base, skew, reverse]);
}
