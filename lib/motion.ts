/**
 * Motion-Helfer – zentrale Stelle für Reduced-Motion, Touch-Erkennung
 * und kleine Mathe-Utilities, die mehrere Animationskomponenten teilen.
 */

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
