"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Vertikaler Versatz beim Einblenden. */
  y?: number;
  /** Verzögerung in Sekunden (für gestaffelte Effekte). */
  delay?: number;
}

/**
 * Scroll-Reveal (Framer Motion, whileInView). Ersetzt die frühere
 * GSAP-ScrollTrigger-Variante — damit fliegt GSAP komplett aus dem
 * Bundle (Framer trägt bereits alle übrigen Animationen).
 * Bei Reduced-Motion sofort sichtbar.
 */
export function Reveal({ children, className, y = 30, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
