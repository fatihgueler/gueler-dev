import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Güler.dev – Logo-System (Werkstattzettel).
 * Mark: das bekannte monoline „G" – jetzt auf eckigem Signal-Tile, ink-Strich.
 * Wortmarke: schmale, schwere Versalien; der Punkt ist ein Signal-Quadrat.
 */
export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Güler.dev"
      className={className}
    >
      <rect width="32" height="32" fill="var(--color-signal)" />
      <path
        d="M21.6 11.4 A7 7 0 1 1 21.6 20.6 L21.6 16 L16.4 16"
        stroke="#121110"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Logo({
  className,
  withMark = true,
}: {
  className?: string;
  /** Mark-Tile vor der Wortmarke anzeigen. */
  withMark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {withMark && <LogoMark size={28} className="shrink-0" />}
      <span
        className="font-display text-[1.35rem] font-black uppercase leading-none tracking-tight"
        style={{ fontStretch: "70%" }}
      >
        Güler
        <span
          aria-hidden
          className="mx-[0.06em] inline-block size-[0.22em] translate-y-[-0.02em] bg-signal align-baseline"
        />
        <span className="sr-only">.</span>
        dev
      </span>
    </span>
  );
}
