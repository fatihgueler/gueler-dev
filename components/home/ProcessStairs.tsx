"use client";

import * as React from "react";

import { process } from "@/lib/content";
import { SectionHead } from "@/components/Section";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Ablauf.
 * Desktop (≥ md, mit JS, ohne reduzierte Bewegung): gepinnter Horizontal-
 * Scroll – die Sektion bleibt stehen, die fünf Schritte fahren seitlich
 * durch, eine Signal-Linie zeigt den Fortschritt, der aktive Schritt füllt
 * seine Riesenziffer.
 * Fallback (ohne JS / reduzierte Bewegung): dieselbe Leiste ist nativ
 * horizontal scrollbar. Mobil: senkrechte Liste mit Fortschrittslinie links.
 */
export function ProcessStairs({ index = "03" }: { index?: string }) {
  const pinRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLOListElement>(null);
  const [progress, setProgress] = React.useState(1);
  const [pinned, setPinned] = React.useState(false);

  React.useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track || prefersReducedMotion()) return;

    const mq = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    let distance = 0;

    const layout = () => {
      if (mq.matches) {
        distance = Math.max(0, track.scrollWidth - window.innerWidth);
        pin.style.height = `calc(100svh + ${distance}px)`;
        setPinned(true);
      } else {
        pin.style.height = "";
        track.style.transform = "";
        setPinned(false);
      }
      update();
    };

    const update = () => {
      raf = 0;
      const r = pin.getBoundingClientRect();
      if (mq.matches) {
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
        track.style.transform = `translate3d(${-p * distance}px,0,0)`;
        setProgress(p);
      } else {
        const vh = window.innerHeight;
        setProgress(Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height * 0.9))));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    mq.addEventListener("change", layout);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      mq.removeEventListener("change", layout);
      if (raf) cancelAnimationFrame(raf);
      pin.style.height = "";
    };
  }, []);

  const n = process.steps.length;
  const active = Math.min(n - 1, Math.floor(progress * n * 0.999));

  return (
    <section id="ablauf" aria-labelledby="process-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead
          id="process-title"
          index={index}
          label={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
        />
      </div>

      <div ref={pinRef} className="relative mt-16">
        <div
          className={`border-t-2 border-border md:flex md:flex-col md:justify-center ${
            pinned ? "md:sticky md:top-16 md:h-[calc(100svh-4rem)] md:overflow-hidden" : "md:overflow-x-auto"
          }`}
        >
          {/* Fortschritt: oben (Desktop), links (mobil) */}
          <span
            aria-hidden
            className="absolute left-0 top-0 z-10 hidden h-[6px] w-full origin-left bg-signal md:block sig-dot"
            style={{ transform: `scaleX(${progress})` }}
          />
          <span
            aria-hidden
            className="absolute left-0 top-0 z-10 h-full w-[6px] origin-top bg-signal md:hidden sig-dot"
            style={{ transform: `scaleY(${progress})` }}
          />
          {pinned && (
            <p aria-hidden className="label absolute right-[var(--spacing-gutter)] top-6 hidden md:block">
              Schritt {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
          )}

          <ol ref={trackRef} className="md:flex md:w-max md:will-change-transform">
            {process.steps.map((step, i) => {
              const on = pinned ? i <= active : progress >= (i + 0.5) / n;
              return (
                <li
                  key={step.number}
                  className={`border-b-2 border-border px-[var(--spacing-gutter)] py-8 transition-colors duration-150 md:flex md:h-[min(70svh,40rem)] md:w-[min(64vw,46rem)] md:flex-col md:justify-between md:border-b-0 md:border-r-2 md:px-10 md:py-12 ${
                    pinned && i === active ? "md:bg-foreground md:text-background" : ""
                  }`}
                >
                  <div>
                    <span
                      className={`display block text-[clamp(3.5rem,14vw,16rem)] leading-[0.8] transition-colors duration-150 ${
                        on ? "step-on" : "outline-text"
                      } ${pinned && i === active ? "md:![-webkit-text-stroke-color:var(--color-signal)] md:!text-background" : ""}`}
                    >
                      {step.number}
                    </span>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <h3
                      className="font-display text-2xl font-bold leading-[0.95] tracking-[-0.03em] md:text-[clamp(2.25rem,1.4rem+2.2vw,4rem)]"
                      style={{ fontStretch: "84%" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`max-w-md leading-relaxed md:mt-5 md:text-lg ${
                        pinned && i === active ? "" : "text-muted"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
