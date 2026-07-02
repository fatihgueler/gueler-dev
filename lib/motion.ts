/**
 * Motion-Helfer – zentrale Stelle für Reduced-Motion, Touch-Erkennung
 * und kleine Mathe-Utilities, die mehrere Animationskomponenten teilen.
 */
import * as React from "react";

/** Respektiert die System-Einstellung „Bewegung reduzieren". */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Touch- bzw. grobe Zeigegeräte (kein eigener Cursor, kein Magnetic). */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

/** Unterhalb dieser Breite wird WebGL deaktiviert (zu schwer für Mobile). */
export const DESKTOP_BREAKPOINT = 768;

export function isDesktopViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= DESKTOP_BREAKPOINT;
}

/** Lineare Interpolation für weiche Cursor-/Kamera-Bewegung. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Geräteklassen-Gating für die WebGL-/Canvas-Szenen — EINE Quelle statt
 * kopierter matchMedia-Blöcke in jedem Loader (Audit: Duplikat ×4).
 *
 * - "off":     reduced-motion oder Save-Data → statischer Fallback
 * - "mobile":  schmaler Viewport → leichte 2D-Canvas-Variante (kein three.js)
 * - "low":     schwache Hardware → three.js mit reduzierter Startqualität
 * - "desktop": volle Szene mit adaptiver Qualitätsregelung
 */
export type SceneTier = "off" | "mobile" | "low" | "desktop";

function resolveSceneTier(): SceneTier {
  if (typeof window === "undefined") return "off";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  const connection = (navigator as { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return "off";
  if (window.innerWidth < DESKTOP_BREAKPOINT) return "mobile";
  const memory = (navigator as { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  if ((memory !== undefined && memory <= 4) || (cores !== undefined && cores <= 4)) {
    return "low";
  }
  return "desktop";
}

export function useSceneEnabled(): SceneTier {
  // Start immer "off": Server und erster Client-Render stimmen überein
  // (kein Hydration-Mismatch), die Szene mountet erst nach der Hydration.
  const [tier, setTier] = React.useState<SceneTier>("off");

  React.useEffect(() => {
    const update = () => setTier(resolveSceneTier());
    update();
    const media = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`),
    ];
    media.forEach((m) => m.addEventListener("change", update));
    return () => media.forEach((m) => m.removeEventListener("change", update));
  }, []);

  return tier;
}
