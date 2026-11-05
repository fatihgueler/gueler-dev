"use client";

import * as React from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Hydration-sichere Variante von framer-motions useReducedMotion().
 *
 * framer liefert im Browser schon beim ersten Render `true`, der Server aber
 * `false` — Komponenten, die daran verzweigen (Hero, Reveal …), erzeugten bei
 * Nutzern mit „Bewegung reduzieren" einen Hydration-Fehler (React #418) und
 * React baute den ganzen Baum neu. Hier gilt beim Hydrieren der Server-Wert
 * (false), direkt danach der echte.
 */
export function useReducedMotionSafe(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
