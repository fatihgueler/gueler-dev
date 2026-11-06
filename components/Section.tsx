import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
}

/** Standard-Abschnitt: Seitenrahmen + 2px-Linie oben. */
export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("border-b-2 border-border py-[var(--spacing-section)]", className)}
      {...props}
    >
      <div className="frame">{children}</div>
    </section>
  );
}

/** Mono-Label mit Signal-Quadrat – ersetzt den alten „Signal-Tick". */
export function Eyebrow({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <p data-rv="wipe" className="label mb-5 flex items-center gap-3">
      {index ? (
        <span className="bg-foreground px-1.5 py-0.5 text-background rounded-full">{index}</span>
      ) : (
        <span aria-hidden className="size-2.5 shrink-0 bg-signal sig-dot" />
      )}
      <span>{children}</span>
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Nummerierung, z. B. "03". */
  index?: string;
  centered?: boolean;
  className?: string;
}

/**
 * Abschnittskopf: Nummer + Label in Mono, darunter die schmale Display-Zeile.
 * Bewusst linksbündig (centered wird ignoriert – keine Zentrierung im System).
 */
export function SectionHeading({ eyebrow, title, subtitle, index, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-5xl", className)}>
      {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
      <h2 data-rv="rise" className="display text-[clamp(2.5rem,1.4rem+5vw,6rem)]">{title}</h2>
      {subtitle && <p data-rv="up" className="mt-6 max-w-2xl text-[length:var(--text-lead)] text-muted">{subtitle}</p>}
    </div>
  );
}

/**
 * Großer Abschnittskopf mit Nummer im Raster: links Index-Spalte, rechts Titel.
 */
export function SectionHead({
  index,
  label,
  title,
  subtitle,
  className,
  id,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div data-sp className={cn("relative grid gap-6 md:grid-cols-12", className)}>
      {/* Riesige Outline-Nummer, wandert beim Scrollen quer durch */}
      <span
        aria-hidden
        className="display ghost-num px-x pointer-events-none absolute -top-[0.35em] right-0 select-none text-[clamp(9rem,24vw,24rem)] leading-none"
        style={{ "--speed": 420 } as React.CSSProperties}
      >
        {index}
      </span>
      <div className="relative md:col-span-3">
        <p data-rv="wipe" className="label flex items-center gap-3">
          <span className="bg-foreground px-1.5 py-0.5 text-background rounded-full">{index}</span>
          {label}
        </p>
      </div>
      <div className="sp-skew relative origin-left md:col-span-9">
        <h2 id={id} data-rv="rise" className="display sp-fill text-[clamp(2.75rem,1.2rem+6.5vw,8rem)]">
          {title}
        </h2>
        {subtitle && (
          <p data-rv="up" className="mt-6 max-w-2xl text-[length:var(--text-lead)] text-muted">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
