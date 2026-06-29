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
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-xl rounded-[var(--radius-lg)] border border-border bg-surface/95 p-5 shadow-lg backdrop-blur-xl md:p-6"
        >
          <p className="text-sm leading-relaxed text-muted">
            Diese Website nutzt aktuell <strong className="text-foreground">keine Tracking-Cookies</strong>.
            Optionale Statistik-Dienste werden erst nach deiner Zustimmung geladen.
            Details in der{" "}
            <Link href="/datenschutz" className="text-violet-3 underline-offset-4 hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button size="sm" onClick={() => choose("accepted")}>
              Einverstanden
            </Button>
            <Button size="sm" variant="outline" onClick={() => choose("declined")}>
              Nur notwendige
            </Button>
          </div>
        </m.aside>
      )}
    </AnimatePresence>
  );
}
