"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const CHAPTERS = [
  { id: "chapter-1", label: "Dein Problem" },
  { id: "chapter-2", label: "Dein Weg" },
  { id: "projekte", label: "Der Beweis" },
  { id: "chapter-4", label: "Dein Erfolg" },
  { id: "prozess", label: "Der Prozess" },
  { id: "chapter-5", label: "Dein Moment" },
];
const LAST = CHAPTERS.length - 1;

/**
 * ChapterProgress — die kalibrierte Kapitel-Anzeige der "Präzisionswerkstatt".
 *
 * Nur ≥2xl (≥1536px, echte Gutter neben max-w-7xl): vertikale Instrumenten-
 * Schiene mit scroll-gescrubbtem Fill — so überlappt das aktive Label nie den
 * Content. Darunter (<2xl): schlanke Lese-Leiste unten ("0X / 06 — Label"), die
 * sich am Conversion-Ende (Kontakt) ausblendet, damit sie nie den CTA verdeckt.
 */
export function ChapterProgress() {
  const [active, setActive] = React.useState(-1);

  React.useEffect(() => {
    const visible = new Set<string>();

    const pick = () => {
      for (let i = 0; i < CHAPTERS.length; i++) {
        if (visible.has(CHAPTERS[i].id)) {
          setActive(i);
          return;
        }
      }
      // Kein Kapitel im Mittelband (Hero/Footer/Übergang): letzten Stand halten,
      // damit der Fill nicht flackert.
    };

    const observers = CHAPTERS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
          pick();
        },
        { rootMargin: "-25% 0px -25% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const fraction = active < 0 ? 0 : active / LAST;
  const showMobile = active >= 0 && active < LAST;
  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Desktop: vertikale Instrumenten-Schiene (≥1024px) */}
      <nav
        aria-label="Kapitel-Navigation"
        className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
      >
        <div className="relative flex flex-col gap-5">
          {/* Track + scroll-gescrubbter Fill */}
          <span
            aria-hidden
            className="absolute left-[2px] top-[3px] bottom-[3px] w-px bg-border"
          />
          <span
            aria-hidden
            className="absolute left-[2px] top-[3px] w-px origin-top bg-violet-3 transition-transform duration-500 ease-out"
            style={{ height: "calc(100% - 6px)", transform: `scaleY(${fraction})` }}
          />
          {CHAPTERS.map(({ id, label }, i) => {
            const isActive = i === active;
            const reached = i <= active;
            return (
              <button
                key={id}
                onClick={() => jump(id)}
                className="group relative flex min-h-[24px] items-center gap-3 py-1 text-left"
                aria-label={`Kapitel ${i + 1}: ${label}`}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={cn(
                    "relative z-10 block h-1.5 w-1.5 shrink-0 transition-all duration-300",
                    isActive
                      ? "scale-[1.6] bg-violet-3"
                      : reached
                        ? "bg-violet-3"
                        : "bg-border",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[0.58rem] uppercase tracking-[0.22em] transition-all duration-200",
                    isActive
                      ? "text-violet-3 opacity-100"
                      : "text-muted opacity-0 group-hover:opacity-60",
                  )}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobil/Tablet: schlanke Lese-Leiste unten (<1024px) */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-opacity duration-300 2xl:hidden",
          showMobile ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 pb-[calc(env(safe-area-inset-bottom)+0.55rem)] pt-2">
          <span className="font-mono text-[0.6rem] tabular-nums tracking-[0.2em] text-violet-3">
            {String(Math.max(active, 0) + 1).padStart(2, "0")}
            <span className="text-muted-2"> / 06</span>
          </span>
          <span className="relative h-px flex-1 bg-border">
            <span
              className="absolute inset-y-0 left-0 w-full origin-left bg-violet-3 transition-transform duration-500 ease-out"
              style={{ transform: `scaleX(${fraction})` }}
            />
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
            {CHAPTERS[Math.max(active, 0)].label}
          </span>
        </div>
      </div>
    </>
  );
}
