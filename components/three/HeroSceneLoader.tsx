"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { DESKTOP_BREAKPOINT } from "@/lib/motion";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

export function HeroSceneLoader({ className }: { className?: string }) {
  // Die WebGL-Szene läuft nur auf Desktop UND ohne prefers-reduced-motion.
  // Bei reduced-motion bleiben die statischen Cherenkov-Glows als Fallback
  // (PRODUCT.md: jedes 3D-Element braucht eine reduced-motion-Alternative).
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    const desktop = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(desktop.matches && !reduce.matches);
    update();
    desktop.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className={className} aria-hidden>
      {animate ? (
        // Theme-aware 3D-Szene; clear-alpha 0 → der Theme-Grund scheint durch.
        <div className="absolute inset-0">
          <HeroScene />
        </div>
      ) : (
        // Statischer, theme-tauglicher Fallback (reduced-motion / Mobile).
        <div className="hero-aura absolute inset-0" aria-hidden />
      )}
    </div>
  );
}
