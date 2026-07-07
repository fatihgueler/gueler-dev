"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface HardCutProps {
  /** Kapitel-Nummer, z.B. "01". */
  chapter: string;
  /** Kapitel-Titel, z.B. "Dein Problem". */
  title: string;
  className?: string;
}

/**
 * HardCut — die harte Kapitel-Transition (sitewide-System).
 *
 * Full-bleed invertierter Balken (Vordergrund-Farbe als Fläche) mit
 * laufender Mono-Marquee des Kapitel-Titels. Der Einbau ins Viewport
 * passiert als gestufter clip-path-Wipe (steps(), kein Easing) — ein
 * bewusst abrupter Schnitt statt Fade.
 *
 * Dekorativ (aria-hidden): die Kapitel-Info steht semantisch in der
 * jeweils folgenden Sektion.
 */
export function HardCut({ chapter, title, className }: HardCutProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [cut, setCut] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCut(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const unit = `Kapitel ${chapter} — ${title}`;
  // Genug Wiederholungen für nahtloses 50%-Looping auf breiten Screens
  const half = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="hardcut-item">
      {unit}
      <span className="hardcut-sep">✳</span>
    </span>
  ));

  return (
    <div ref={ref} aria-hidden className={cn("hardcut", className)}>
      <div className={cn("hardcut-bar", cut && "is-cut")}>
        <div className="hardcut-track">
          <div className="hardcut-half">{half}</div>
          <div className="hardcut-half">{half}</div>
        </div>
      </div>
    </div>
  );
}
