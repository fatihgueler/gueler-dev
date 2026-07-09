"use client";

import * as React from "react";

import { isTouchDevice, lerp, prefersReducedMotion } from "@/lib/motion";

/**
 * Brutalist-Cursor: Fadenkreuz-Core (folgt sofort) + kantiger Rahmen
 * (läuft nach), beides in mix-blend-difference — invertiert alles darunter.
 *
 * - Kontextuelle Labels: Elemente mit [data-cursor="view|open|drag|…"]
 *   zeigen ein Mono-Label neben dem Cursor; externe Links automatisch "open".
 * - Magnet-Snap: über kompakten Interaktionszielen (Buttons, Nav-Links)
 *   rastet der Rahmen auf die Element-Box ein statt dem Cursor zu folgen.
 * - Touch / prefers-reduced-motion: komplett deaktiviert.
 */

const FRAME_BASE = 34;
const SNAP_MAX_W = 320;
const SNAP_MAX_H = 140;
const SNAP_PAD = 10;
const FOLLOW = 0.22;
const RESIZE = 0.3;

export function Cursor() {
  const coreRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;

    const core = coreRef.current;
    const frame = frameRef.current;
    const label = labelRef.current;
    if (!core || !frame || !label) return;

    document.documentElement.classList.add("has-cursor");

    // Vor dem ersten echten mousemove kennen wir die Pointer-Position nicht —
    // ohne Guard rastet der Cursor default in der Viewport-Mitte ein und
    // liegt dort sichtbar auf dem Content (z.B. der Hero-Gloss-Zeile), bis
    // sich die Maus zum ersten Mal bewegt. Bleibt bis dahin ausgeblendet.
    let hasMoved = false;
    core.dataset.hidden = "true";
    frame.dataset.hidden = "true";

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    const size = { w: FRAME_BASE, h: FRAME_BASE };
    let target: { x: number; y: number; w: number; h: number } | null = null;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      core.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      if (!hasMoved) {
        hasMoved = true;
        // Rahmen sofort an die echte Position springen lassen statt aus der
        // Mitte "einzufliegen" (Lerp würde sonst über mehrere Frames ziehen).
        pos.x = mouse.x;
        pos.y = mouse.y;
        delete core.dataset.hidden;
        delete frame.dataset.hidden;
      }
    };

    const onOver = (event: MouseEvent) => {
      const el = event.target as HTMLElement | null;
      const interactive = el?.closest<HTMLElement>(
        "a, button, input, textarea, label, [role='button'], [data-cursor]",
      );

      // Label bestimmen: explizites data-cursor > externe Links > nichts
      let text = "";
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      if (tagged?.dataset.cursor && tagged.dataset.cursor !== "glitch") {
        text = tagged.dataset.cursor;
      } else if (
        interactive instanceof HTMLAnchorElement &&
        interactive.target === "_blank"
      ) {
        text = "open";
      }
      label.textContent = text;
      frame.dataset.mode = interactive ? "hover" : "idle";

      // Magnet-Snap nur auf kompakte Ziele (Buttons, Nav-Links, Icons)
      if (interactive && interactive.tagName !== "CANVAS") {
        const rect = interactive.getBoundingClientRect();
        if (rect.width <= SNAP_MAX_W && rect.height <= SNAP_MAX_H) {
          target = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            w: rect.width + SNAP_PAD * 2,
            h: rect.height + SNAP_PAD * 2,
          };
          frame.dataset.mode = "snap";
          return;
        }
      }
      target = null;
    };

    const onLeaveWindow = () => {
      core.dataset.hidden = "true";
      frame.dataset.hidden = "true";
    };
    const onEnterWindow = () => {
      delete core.dataset.hidden;
      delete frame.dataset.hidden;
    };

    const render = () => {
      const hover = frame.dataset.mode === "hover";
      const destX = target ? target.x : mouse.x;
      const destY = target ? target.y : mouse.y;
      const destW = target ? target.w : hover ? FRAME_BASE * 1.5 : FRAME_BASE;
      const destH = target ? target.h : hover ? FRAME_BASE * 1.5 : FRAME_BASE;

      pos.x = lerp(pos.x, destX, target ? 0.35 : FOLLOW);
      pos.y = lerp(pos.y, destY, target ? 0.35 : FOLLOW);
      size.w = lerp(size.w, destW, RESIZE);
      size.h = lerp(size.h, destH, RESIZE);

      frame.style.width = `${size.w}px`;
      frame.style.height = `${size.h}px`;
      frame.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      raf = window.requestAnimationFrame(render);
    };
    raf = window.requestAnimationFrame(render);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={coreRef} className="cursor-core" aria-hidden />
      <div ref={frameRef} className="cursor-frame" data-mode="idle" aria-hidden>
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
