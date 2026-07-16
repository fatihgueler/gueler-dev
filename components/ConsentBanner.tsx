"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";

import { Button } from "@/components/ui/button";

const CONSENT_KEY = "cookie-consent";

export type ConsentValue = "accepted" | "declined";

/** Liest die gespeicherte Einwilligung – z.B. um später Analytics zu gaten. */
export function getConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function ConsentBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  const choose = (value: ConsentValue) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Privater Modus – Banner bleibt dann pro Sitzung einmal sichtbar.
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.aside
          role="region"
          aria-label="Cookie-Hinweis"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          // Bottom-left statt zentriert: die Hero-CTA sitzt rechtsbündig
          // (md:justify-between) — zentriert/breit überlappte der Banner bei
          // gängigen Laptop-Höhen (768-900px) deren untere linke Ecke.
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-xl rounded-[var(--radius-lg)] border border-border bg-surface/95 p-4 shadow-lg backdrop-blur-xl sm:inset-x-auto sm:left-4 sm:right-auto sm:max-w-sm sm:p-5 md:p-6"
        >
          {/* Kurzform auf Mobile (schmalste Höhe, geringste Kollisionsfläche
              mit gestapeltem Hero-Content), volle Erklärung ab sm. */}
          <p className="text-xs leading-snug text-muted sm:hidden">
            Keine Tracking-Cookies ohne Zustimmung.{" "}
            <Link href="/datenschutz" className="text-violet-3 underline-offset-4 hover:underline">
              Details
            </Link>
            .
          </p>
          <p className="hidden text-sm leading-relaxed text-muted sm:block">
            Diese Website nutzt aktuell <strong className="text-foreground">keine Tracking-Cookies</strong>.
            Optionale Statistik-Dienste werden erst nach deiner Zustimmung geladen.
            Details in der{" "}
            <Link href="/datenschutz" className="text-violet-3 underline-offset-4 hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
          {/* Immer nebeneinander (auch mobil) statt gestapelt — spart auf
              schmalen Screens rund 50px Höhe, die sonst leichter mit
              gestapeltem Hero-Content kollidiert. */}
          <div className="mt-3 flex gap-3 sm:mt-4">
            <Button size="sm" className="tap flex-1 sm:flex-none" onClick={() => choose("accepted")}>
              Einverstanden
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="tap flex-1 sm:flex-none"
              onClick={() => choose("declined")}
            >
              Nur notwendige
            </Button>
          </div>
        </m.aside>
      )}
    </AnimatePresence>
  );
}
