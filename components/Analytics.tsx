import Script from "next/script";

import { analytics } from "@/lib/content";

/**
 * Umami (cookielos). Lädt NUR, wenn in lib/content.ts eine Website-ID
 * eingetragen ist — ohne ID wird nichts geladen und nichts gezählt.
 * Events setzen die Seiten per data-umami-event-Attribut bzw. trackEvent().
 */
export function Analytics() {
  if (!analytics.umamiWebsiteId) return null;
  return (
    <Script
      src={analytics.umamiScriptSrc}
      data-website-id={analytics.umamiWebsiteId}
      data-domains={analytics.domains}
      strategy="afterInteractive"
    />
  );
}

/** Event aus Code heraus senden (z.B. nach erfolgreichem Formularversand). */
export function trackEvent(name: string, data?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as Window & {
    umami?: { track: (n: string, d?: Record<string, string>) => void };
  };
  try {
    w.umami?.track(name, data);
  } catch {
    // Zählen darf nie die Seite stören.
  }
}
