"use client";

import * as React from "react";

import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

const CHARSET = "0123456789#/*+×–";
const SCRAMBLE_MS = 280;
const STEP_MS = 40;

/**
 * Text, der bei Mausbewegung kurz zu Zufallszeichen zerfällt und hart
 * wieder einrastet (Character-Scramble). Touch/reduced-motion: statisch.
 */
export function ScrambleText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const innerRef = React.useRef<HTMLSpanElement>(null);
  const stateRef = React.useRef<{ until: number; interval: number }>({
    until: 0,
    interval: 0,
  });

  const scramble = React.useCallback(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    const el = innerRef.current;
    if (!el) return;
    // Breite einfrieren, sonst wackelt das Layout während des Scrambles
    if (!el.style.width) {
      el.style.display = "inline-block";
      el.style.width = `${el.offsetWidth}px`;
      el.style.whiteSpace = "nowrap";
      el.style.overflow = "hidden";
    }
    const s = stateRef.current;
    s.until = performance.now() + SCRAMBLE_MS;
    if (s.interval) return; // läuft schon — nur verlängern
    s.interval = window.setInterval(() => {
      if (performance.now() >= s.until) {
        window.clearInterval(s.interval);
        s.interval = 0;
        el.textContent = text; // hartes Einrasten
        return;
      }
      el.textContent = Array.from(text)
        .map((ch) =>
          Math.random() < 0.7
            ? CHARSET[Math.floor(Math.random() * CHARSET.length)]
            : ch,
        )
        .join("");
    }, STEP_MS);
  }, [text]);

  React.useEffect(() => {
    const s = stateRef.current;
    return () => window.clearInterval(s.interval);
  }, []);

  return (
    <span
      className={className}
      style={style}
      onPointerMove={scramble}
      aria-label={text}
    >
      <span ref={innerRef} aria-hidden>
        {text}
      </span>
    </span>
  );
}
