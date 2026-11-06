"use client";

import * as React from "react";

import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

/** Zieht das Kind sanft zum Cursor, sobald dieser in der Nähe ist. */
export function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || isTouchDevice() || prefersReducedMotion()) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) * 0.9;
      if (Math.hypot(dx, dy) < reach) {
        el.style.translate = `${dx * strength}px ${dy * strength}px`;
      } else {
        el.style.translate = "0 0";
      }
    };
    const reset = () => (el.style.translate = "0 0");
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", reset);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`transition-[translate] duration-200 ease-out ${className ?? ""}`}>
      {children}
    </div>
  );
}
