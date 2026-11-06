import * as React from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Seiten-Index, z. B. "01" – erscheint als Raster-Marke. */
  stamp?: string;
  children?: React.ReactNode;
}

/**
 * Kopf aller Unterseiten: links eine schmale Index-Spalte (Seitennummer
 * riesig, angeschnitten), rechts die Display-Headline. Sichtbare Spaltenlinie.
 */
export function PageHero({ eyebrow, title, subtitle, stamp, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b-2 border-border">
      <div className="mx-auto grid w-full max-w-[96rem] md:grid-cols-12">
        <div className="flex items-start justify-between gap-4 border-b-2 border-border px-[var(--spacing-gutter)] py-4 md:col-span-3 md:flex-col md:border-b-0 md:border-r-2 md:py-8">
          <p className="label flex items-center gap-3">
            <span aria-hidden className="size-2.5 bg-signal" />
            {eyebrow}
          </p>
          {stamp && (
            <span
              aria-hidden
              className="display outline-text select-none text-[clamp(2.5rem,8vw,9rem)] leading-[0.8]"
            >
              {stamp}
            </span>
          )}
        </div>
        <div className="px-[var(--spacing-gutter)] pb-12 pt-10 md:col-span-9 md:pb-16 md:pt-14">
          <h1 className="display hero-line text-[length:var(--text-h1)]">{title}</h1>
          {subtitle && (
            <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
