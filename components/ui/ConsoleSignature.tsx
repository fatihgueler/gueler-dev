"use client";

import * as React from "react";

import { site } from "@/lib/content";

/**
 * Signatur in der Browser-Konsole — für die Besucher, die F12 drücken.
 * Nutzt ausschließlich bestehende Inhalte (Wortmarke, Gloss, Kontakt).
 */
export function ConsoleSignature() {
  React.useEffect(() => {
    // Nur einmal pro Session, nicht bei jedem Route-Wechsel
    if (window.sessionStorage.getItem("gd-sig")) return;
    try {
      window.sessionStorage.setItem("gd-sig", "1");
    } catch {
      /* Storage gesperrt → Signatur trotzdem zeigen */
    }

    // eslint-disable-next-line no-console
    console.log(
      "%cGÜLER.DEV%c\ngüler (tr.) — der/die lacht.\n\n%c" +
        `${site.email}\n${site.github}`,
      "font-family:monospace;font-size:28px;font-weight:900;letter-spacing:-1px;color:#2bbe83;",
      "font-family:monospace;font-size:12px;color:#94a3b8;",
      "font-family:monospace;font-size:12px;color:#e9a93b;",
    );
  }, []);

  return null;
}
