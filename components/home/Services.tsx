import * as React from "react";

import { services } from "@/lib/content";
import { SectionHead } from "@/components/Section";

/**
 * Leistungen als Tabellenzeilen: Nummer · Titel · Beschreibung · Punkte.
 * Hover invertiert die ganze Zeile.
 */
export function Services({ index = "02", label = services.eyebrow }: { index?: string; label?: string }) {
  return (
    <section id="leistungen" aria-labelledby="services-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead
          id="services-title"
          index={index}
          label={label}
          title={services.title}
          subtitle={services.subtitle}
        />
      </div>
      <ol data-sp data-rv-stagger="90" className="mt-16 border-t-2 border-border">
        {services.items.map((item, i) => (
          <li key={item.title} data-rv="up" className="row-invert group relative overflow-hidden border-b-2 border-border last:border-b-0">
            <span
              aria-hidden
              className="svc-num ghost-glyph display pointer-events-none absolute -bottom-[0.18em] right-[var(--spacing-gutter)] hidden select-none text-[clamp(8rem,14vw,14rem)] leading-none md:block"
              data-num={String(i + 1).padStart(2, "0")}
            />
            <div className="frame relative grid gap-4 py-8 md:grid-cols-12 md:gap-6 md:py-10">
              <span className="label signal-inv text-signal-text md:col-span-1 md:pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display px-x text-[clamp(2.25rem,1.5rem+3vw,4.25rem)] md:col-span-4" style={{ "--speed": i % 2 ? -140 : 140 } as React.CSSProperties}>{item.title}</h3>
              <p className="muted-inv text-[length:var(--text-lead)] leading-snug text-muted md:col-span-4">
                {item.description}
              </p>
              <ul className="font-mono text-sm md:col-span-3">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2 border-b border-current/30 py-2 first:pt-0">
                    <span aria-hidden>→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
