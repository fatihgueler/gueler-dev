"use client";

import * as React from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Globale Framer-Motion-Konfiguration:
 * - LazyMotion lädt nur die DOM-Animation-Features (kleineres Bundle)
 * - reducedMotion="user" deaktiviert Transform-Animationen automatisch,
 *   wenn das System "Bewegung reduzieren" eingestellt hat
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
