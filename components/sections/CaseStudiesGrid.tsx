import * as React from "react";
import Link from "next/link";

import { caseStudies } from "@/lib/content";
import { SectionHead } from "@/components/Section";

/**
 * Case-Study-Register: jede Zeile ist ein Link auf /projekte/[slug].
 * Tabellen-Logik statt Kartenraster, Hover invertiert die Zeile.
 */
export function CaseStudiesGrid() {
  return (
    <section aria-labelledby="cases-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead
          id="cases-title"
          index="02"
          label="Projekte im Detail"
          title="Wie die Projekte gebaut sind"
          subtitle="Von der Herausforderung bis zur Lösung – ein genauer Blick auf ein Kundenprojekt und meine eigenen Produkte."
        />
      </div>

      <div className="frame mt-16 hidden grid-cols-12 gap-6 border-b-2 border-border pb-3 md:grid">
        <span className="label col-span-1 text-muted">Nr.</span>
        <span className="label col-span-4 text-muted">Projekt</span>
        <span className="label col-span-4 text-muted">Kurz gesagt</span>
        <span className="label col-span-3 text-muted">Kennzahl</span>
      </div>
      <ol data-rv-stagger="90" className="mt-10 border-t-2 border-border md:mt-0 md:border-t-0">
        {caseStudies.map((study, i) => (
          <li key={study.id} data-rv="up" className="border-b-2 border-border last:border-b-0">
            <Link
              href={`/projekte/${study.id}`}
              data-cursor="Case öffnen"
              className="row-invert group block"
              aria-label={`Case Study ansehen: ${study.title}`}
            >
              <div className="frame grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-6">
                <span className="label md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="md:col-span-4">
                  <span className="display block text-[clamp(2.5rem,1.6rem+3vw,4.5rem)]">{study.title}</span>
                  <span className="label muted-inv mt-2 block text-muted">{study.category}</span>
                </span>
                <span className="text-lg leading-snug md:col-span-4">{study.tagline}</span>
                <span className="flex items-baseline justify-between gap-4 md:col-span-3">
                  {study.metrics[0] && (
                    <span>
                      <span className="display block text-[2rem]">{study.metrics[0].value}</span>
                      <span className="label muted-inv text-muted">{study.metrics[0].label}</span>
                    </span>
                  )}
                  <span aria-hidden className="font-mono text-2xl transition-transform duration-[90ms] group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
