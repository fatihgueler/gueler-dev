"use client";

import * as React from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ParallaxTextProps = {
  text: string;
};

/**
 * Dekorativer Outline-Text, der mit reduzierter Geschwindigkeit zum
 * Scroll mitläuft (Parallax). Füllt den nächsten relativen Container.
 */
export function ParallaxText({ text }: ParallaxTextProps) {
  const isReducedMotion = useReducedMotion() ?? false;
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <m.span
        style={isReducedMotion ? undefined : { y }}
        className="text-outline select-none whitespace-nowrap font-display text-[16vw] font-semibold tracking-tight opacity-60"
      >
        {text}
      </m.span>
    </div>
  );
}
