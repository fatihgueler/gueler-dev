"use client";

import * as React from "react";

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
    <div className="relative aspect-[16/10] w-full border-2 border-border">
      {loaded ? (
        <iframe
          title="Standort: Großraum Hannover"
          src={src}
          loading="lazy"
          className="h-full w-full grayscale"
          style={{ border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="grid-lines group absolute inset-0 flex flex-col items-start justify-end gap-2 p-5 text-left hover:bg-foreground hover:text-background"
        >
          {/* Fadenkreuz statt Pin-im-Kreis */}
          <span aria-hidden className="absolute left-1/2 top-[40%] h-0.5 w-16 -translate-x-1/2 bg-signal" />
          <span aria-hidden className="absolute left-1/2 top-[40%] h-16 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-signal" />
          <span className="display relative text-[clamp(1.5rem,1.2rem+1vw,2.25rem)]">
            Karte von OpenStreetMap laden
          </span>
          <span className="relative max-w-sm text-sm">
            Erst beim Klick werden Daten an OpenStreetMap übertragen (DSGVO-konform).
          </span>
        </button>
      )}
    </div>
  );
}
