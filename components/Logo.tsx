import * as React from "react";

import { cn } from "@/lib/utils";

const ACCENT = "#0e7a50";

/**
 * Güler.dev – Logo-System.
 *
 * Variante „Mark + Wortmarke":
 * - Mark: geometrisches „G" (monoline) auf violettem Tile – funktioniert
 *   identisch in beiden Themes, da das Tile immer die Brand-Farbe trägt.
 * - Wortmarke: „Güler" in currentColor (passt sich Light/Dark an), der
 *   Punkt vor „dev" ist das violette Signature-Element.
 *
 * `currentColor` macht die Wortmarke theme-aware, ohne zweite Datei.
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
      <rect width="32" height="32" rx="9" fill={ACCENT} />
      <path
        d="M21.6 11.4 A7 7 0 1 1 21.6 20.6 L21.6 16 L16.4 16"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display font-extrabold tracking-tight",
        className,
      )}
    >
      {withMark && <LogoMark size={28} className="shrink-0" />}
      <span className="text-current">
        Güler<span className="text-violet-3">.</span>dev
      </span>
    </span>
  );
}
