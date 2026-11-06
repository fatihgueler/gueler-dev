"use client";

import * as React from "react";

import { techStack } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Laufband in Ink, gekoppelt an das Scroll-Tempo: schneller Scroll = schnelles
 * Band, Scroll nach oben dreht die Richtung. Ohne JS läuft die CSS-Animation,
 * bei reduzierter Bewegung steht es still. Für Screenreader nur einmal da.
 */
export function Marquee() {
  const trackRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    track.style.animation = "none";
    let x = 0;
    let dir = 1;
    let boost = 0;
    let lastY = window.scrollY;
    let raf = 0;
    let visible = true;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = dy > 0 ? 1 : -1;
      boost = Math.min(boost + Math.abs(dy) * 0.12, 28);
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(track);

    const tick = () => {
      if (visible) {
        const half = track.scrollWidth / 2;
        x -= (0.6 + boost) * dir;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        // Harte Schräglage nur während des Boosts
        track.style.transform = `translate3d(${x}px,0,0) skewX(${(-boost * 0.35 * dir).toFixed(2)}deg)`;
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
  }, []);

  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center ${hidden ? "marquee-dup" : ""}`}
    >
      {techStack.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="display px-5 text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-none">{item}</span>
          <span aria-hidden className="size-3 bg-signal" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Kurz gesagt"
      className="marquee overflow-hidden border-b-2 border-border bg-foreground py-4 text-background"
    >
      <div ref={trackRef} className="marquee-track will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
