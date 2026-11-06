"use client";

import * as React from "react";

import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

/**
 * Eigener Cursor: ein Quadrat, das den Untergrund invertiert (difference),
 * über klickbaren Elementen aufzieht und – wo gesetzt – ein Mono-Label aus
 * data-cursor zeigt. Nur bei feinem Zeiger und ohne reduzierte Bewegung;
 * in Formularfeldern bleibt der System-Cursor.
 */
export function Cursor() {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [label, setLabel] = React.useState("");

  React.useEffect(() => {
    const box = boxRef.current;
    if (!box || isTouchDevice() || prefersReducedMotion()) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let tx = -100, ty = -100, x = -100, y = -100, size = 14, tsize = 14;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as Element | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      const interactive = t?.closest("a, button, summary, [role='button'], label");
      const field = t?.closest("input, textarea, select, [role='combobox']");
      tsize = field ? 0 : labelled ? 96 : interactive ? 48 : 14;
      setLabel(labelled?.dataset.cursor ?? "");
    };
    const onDown = () => (box.style.scale = "0.8");
    const onUp = () => (box.style.scale = "1");
    const onLeave = () => (tsize = 0);

    const loop = () => {
      x += (tx - x) * 0.3;
      y += (ty - y) * 0.3;
      size += (tsize - size) * 0.25;
      box.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      box.style.width = box.style.height = `${size}px`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={boxRef} aria-hidden className="cursor-box">
      {label && <span className="cursor-label">{label}</span>}
    </div>
  );
}
