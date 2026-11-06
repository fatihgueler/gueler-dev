"use client";

import * as React from "react";

import { prefersReducedMotion } from "@/lib/motion";

/**
 * Zählt die Zahl in einem Preistext („ab 1.000 €") beim Hereinscrollen hoch.
 * Server/ohne JS: steht sofort der Endwert da. Screenreader lesen immer den
 * vollständigen Text (aria-label), die laufenden Ziffern sind aria-hidden.
 * Texte ohne Zahl („auf Anfrage") bleiben unverändert.
 */
export function CountUp({ text, duration = 1600 }: { text: string; duration?: number }) {
  const match = text.match(/^(\D*)([\d.]+)(\D*)$/);
  const target = match ? Number(match[2].replace(/\./g, "")) : NaN;
  const ref = React.useRef<HTMLSpanElement>(null);
  const [value, setValue] = React.useState(target);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target) || prefersReducedMotion()) return;
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 2.2);
          // In 50er-Schritten zählen wirkt wie ein mechanisches Zählwerk
          setValue(t === 1 ? target : Math.round((eased * target) / 50) * 50);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  if (!match) return <>{text}</>;
  return (
    <span ref={ref} aria-label={text} role="text">
      <span aria-hidden className="tabular-nums">
        {match[1]}
        {value.toLocaleString("de-DE")}
        {match[3]}
      </span>
    </span>
  );
}
