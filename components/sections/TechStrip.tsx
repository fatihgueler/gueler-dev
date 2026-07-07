"use client";

import * as React from "react";

import { techStack } from "@/lib/content";
import { isTouchDevice, lerp, prefersReducedMotion } from "@/lib/motion";

/**
 * Brutalist-Marquee: riesige Outline-Begriffe laufen endlos durch.
 * Die Laufrichtung folgt der Scrollrichtung, Hover stoppt die Leiste
 * ABRUPT (kein Auslaufen). Begriffe füllen sich unterm Cursor.
 *
 * Reduced Motion / Touch ohne Hover: statisch umbrechende Liste.
 */
export function TechStrip() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [isStatic, setIsStatic] = React.useState(false);

  React.useEffect(() => {
    if (prefersReducedMotion()) {
      setIsStatic(true);
      return;
    }
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    let vel = 0;
    let dir = 1;
    let paused = false;
    let lastScrollY = window.scrollY;
    let raf = 0;
    let running = false;
    // scrollWidth NIE im RAF-Loop lesen (Forced Layout pro Frame!) —
    // einmal messen und nur bei Resize/Font-Load aktualisieren.
    let half = 0;
    const BASE_SPEED = 1.1;

    const measure = () => {
      half = track.scrollWidth / 2;
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastScrollY) > 2) dir = y > lastScrollY ? 1 : -1;
      lastScrollY = y;
    };

    const onEnter = () => {
      paused = true;
      vel = 0; // harter Stopp, kein Auslaufen
    };
    const onLeave = () => {
      paused = false;
    };

    const render = () => {
      if (half > 0) {
        vel = paused ? 0 : lerp(vel, dir * BASE_SPEED, 0.06);
        pos += vel;
        if (pos >= half) pos -= half;
        if (pos < 0) pos += half;
        track.style.transform = `translate3d(${-pos}px, 0, 0)`;
      }
      if (running) raf = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = window.requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    measure();
    document.fonts?.ready.then(() => measure()).catch(() => {});
    const ro = new ResizeObserver(() => measure());
    ro.observe(track);

    // Loop nur, wenn die Leiste tatsächlich im Viewport ist
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(track);

    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isTouchDevice()) {
      track.addEventListener("pointerenter", onEnter);
      track.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const terms = (ariaHidden: boolean) => (
    <ul
      className="flex w-max items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {techStack.map((tech) => (
        <li key={tech} className="flex items-center whitespace-nowrap">
          <span
            className="marquee-term font-display font-black uppercase tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
          >
            {tech}
          </span>
          <span
            className="px-8 font-mono text-base text-violet-3 md:px-12"
            aria-hidden
          >
            ✳
          </span>
        </li>
      ))}
    </ul>
  );

  if (isStatic) {
    return (
      <section
        aria-label="Technologie-Stack"
        className="relative border-y border-border py-8"
      >
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6">
          {techStack.map((tech) => (
            <li
              key={tech}
              className="marquee-term whitespace-nowrap font-display text-2xl font-black uppercase tracking-tight"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      aria-label="Technologie-Stack"
      className="relative overflow-hidden border-y border-border py-6 md:py-8"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {terms(false)}
        {terms(true)}
      </div>
    </section>
  );
}
