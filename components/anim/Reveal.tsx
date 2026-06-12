"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Vertikaler Versatz beim Einblenden. */
  y?: number;
  /** Verzögerung in Sekunden (für gestaffelte Effekte). */
  delay?: number;
}

/**
 * GSAP-ScrollTrigger-Reveal: blendet ein Element ein, sobald es in den
 * Viewport scrollt. Bei Reduced-Motion sofort sichtbar.
 */
export function Reveal({ children, className, y = 30, delay = 0 }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        },
      );
    });

    return () => ctx.revert();
  }, [y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
