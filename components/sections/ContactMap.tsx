"use client";

import * as React from "react";
import { MapPin } from "lucide-react";

/**
 * DSGVO-freundliche Karte: OpenStreetMap wird erst nach Klick geladen,
 * vorher werden keine Daten an Dritte übertragen.
 */
export function ContactMap() {
  const [loaded, setLoaded] = React.useState(false);

  // Großraum Hannover / Garbsen
  const bbox = "9.5400,52.3850,9.6700,52.4550";
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=52.4200,9.6000`;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-lg)] border border-border">
      {loaded ? (
        <iframe
          title="Standort: Großraum Hannover"
          src={src}
          loading="lazy"
          className="h-full w-full grayscale-[0.2]"
          style={{ border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface text-center"
        >
          <div className="bg-dot-grid absolute inset-0 opacity-40" aria-hidden />
          <div className="teal-glow absolute inset-0 opacity-60" aria-hidden />
          <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-teal-deep bg-background text-teal transition-transform group-hover:scale-110">
            <MapPin className="size-6" />
          </span>
          <span className="relative font-display text-lg font-semibold text-foreground">
            Karte von OpenStreetMap laden
          </span>
          <span className="relative max-w-xs text-xs text-muted-2">
            Erst beim Klick werden Daten an OpenStreetMap übertragen (DSGVO-konform).
          </span>
        </button>
      )}
    </div>
  );
}
