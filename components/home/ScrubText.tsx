"use client";

import * as React from "react";

import { prefersReducedMotion } from "@/lib/motion";

type Segment = { text: string; accent?: boolean };

/**
 * Satz, der sich beim Scrollen Wort für Wort einfärbt. Akzent-Segmente
 * bekommen ihren Signal-Marker erst, wenn sie „erreicht" sind.
 * Ohne JS bzw. bei reduzierter Bewegung: alles sofort eingefärbt.
 */
export function ScrubText({ segments, className, id }: { segments: Segment[]; className?: string; id?: string }) {
  const ref = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    el.classList.add("scrub-on");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 wenn die Oberkante bei 85 % steht, 1 wenn die Unterkante bei 45 % steht
      const start = vh * 0.85;
      const end = vh * 0.45;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.toggleAttribute("data-lit", i < lit));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <h2 ref={ref} id={id} className={className} style={{ fontStretch: "78%" }}>
      {segments.map((seg, s) => (
        <React.Fragment key={s}>
          {seg.accent ? (
            <span className="mark scrub-mark">
              {seg.text.split(" ").map((w, i, arr) => (
                <React.Fragment key={i}>
                  <span data-w>{w}</span>
                  {i < arr.length - 1 ? " " : null}
                </React.Fragment>
              ))}
            </span>
          ) : (
            seg.text.split(" ").map((w, i, arr) => (
              <React.Fragment key={i}>
                <span data-w>{w}</span>
                {i < arr.length - 1 ? " " : null}
              </React.Fragment>
            ))
          )}{" "}
        </React.Fragment>
      ))}
    </h2>
  );
}
