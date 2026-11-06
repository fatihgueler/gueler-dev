import * as React from "react";

import { outcomes } from "@/lib/content";
import { SectionHead } from "@/components/Section";

/**
 * Ergebnis: gebrochenes Raster – die erste Zelle ist breit und in Signal,
 * die übrigen ungleich breit. Riesige Outline-Ziffern als Anker.
 */
export function Outcomes() {
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-4", "md:col-span-8"];
  return (
    <section aria-labelledby="outcomes-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead id="outcomes-title" index="07" label={outcomes.eyebrow} title={outcomes.title} />
      </div>
      <ul data-rv-stagger="110" className="frame-ruled mt-16 grid border-t-2 border-border md:grid-cols-12">
        {outcomes.items.map((item, i) => (
          <li
            key={item.title}
            data-rv="up"
            className={`relative flex min-h-[18rem] flex-col md:min-h-[22rem] justify-end overflow-hidden border-b-2 border-border p-[var(--spacing-gutter)] md:p-8 ${spans[i]} ${
              i % 2 === 0 ? "md:border-r-2" : ""
            } ${i >= 2 ? "md:border-b-0" : ""} ${i === 0 ? "bg-signal text-on-signal" : ""}`}
          >
            <span
              aria-hidden
              className={`display pointer-events-none absolute right-3 top-3 select-none text-[clamp(6rem,10vw,10rem)] leading-[0.8] ${
                i === 0 ? "text-transparent [-webkit-text-stroke:2px_var(--color-ink)]" : "outline-text"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="relative text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-extrabold leading-[1] tracking-tight" style={{ fontStretch: "75%" }}>
              {item.title}
            </h3>
            <p className={`relative mt-4 max-w-lg text-lg leading-snug ${i === 0 ? "" : "text-muted"}`}>
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
