"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { useSceneEnabled } from "@/lib/motion";

// three.js-Szene nur laden, wenn die Geräteklasse sie trägt (Route-Split
// + ssr:false → nie im First-Load-Manifest; Mobile lädt NUR die 2D-Variante).
const SignalSpine = dynamic(
  () => import("@/components/three/SignalSpine").then((m) => m.SignalSpine),
  { ssr: false },
);
const SignalSpineMobile = dynamic(
  () => import("@/components/three/SignalSpineMobile").then((m) => m.SignalSpineMobile),
  { ssr: false },
);

/**
 * Persistenter Szenen-Layer der Startseite: fixiert hinter dem Inhalt,
 * erzählt die fünf Kapitel scroll-getrieben mit (siehe SignalSpine).
 * Tier "off" (reduced-motion/Save-Data) → statische Aura als Fallback.
 */
export function SignalSpineLoader() {
  const tier = useSceneEnabled();

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {tier === "desktop" || tier === "low" ? (
        <SignalSpine lowTier={tier === "low"} />
      ) : tier === "mobile" ? (
        <SignalSpineMobile />
      ) : (
        <div className="hero-aura absolute inset-0" />
      )}
    </div>
  );
}
