"use client";

import * as React from "react";
import { LazyMotion, MotionConfig, domMax } from "framer-motion";

/**
 * Globale Framer-Motion-Konfiguration:
 * - LazyMotion mit domMax: enthält zusätzlich Drag-, Pan- und
 *   Layout-Animationen (TechStrip, ProjectsFilter, layoutId)
 * - reducedMotion="user" deaktiviert Transform-Animationen automatisch,
 *   wenn das System "Bewegung reduzieren" eingestellt hat
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
