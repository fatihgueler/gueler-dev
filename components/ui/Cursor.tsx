"use client";

import * as React from "react";

import { isTouchDevice, lerp, prefersReducedMotion } from "@/lib/motion";

/**
 * Eigener Cursor: leuchtender Teal-Punkt + nachlaufender Ring,
 * der über interaktiven Elementen aufgeht. Auf Touch/Reduced-Motion aus.
 */
export function Cursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };
    // Skalierung ebenfalls im RAF-Loop lerpen statt per CSS-Transition –
    // Transition + Frame-Updates kämpfen sonst gegeneinander (Ruckeln).
    const RING_SCALE_IDLE = 0.59375;
    const RING_SCALE_HOVER = 1;
    let ringScale = RING_SCALE_IDLE;
    let targetScale = RING_SCALE_IDLE;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, textarea, label, [data-cursor='hover']",
      );
      ring.dataset.hovering = interactive ? "true" : "false";
      targetScale = interactive ? RING_SCALE_HOVER : RING_SCALE_IDLE;
    };

    const render = () => {
      ringPos.x = lerp(ringPos.x, mouse.x, 0.18);
      ringPos.y = lerp(ringPos.y, mouse.y, 0.18);
      ringScale = lerp(ringScale, targetScale, 0.16);
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${ringScale})`;
      raf = window.requestAnimationFrame(render);
    };
    raf = window.requestAnimationFrame(render);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-hovering="false" aria-hidden />
    </>
  );
}
