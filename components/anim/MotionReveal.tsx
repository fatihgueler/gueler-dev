"use client";

import * as React from "react";
import { m } from "framer-motion";

type MotionRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Verzögerung in Sekunden (für Stagger zwischen Geschwister-Elementen). */
  delay?: number;
};

/**
 * Scroll-Reveal im vectrfl-Stil: dezentes Fade-up beim ersten Sichtbarwerden.
 */
export function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  );
}
