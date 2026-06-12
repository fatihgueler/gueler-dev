"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { DESKTOP_BREAKPOINT } from "@/lib/motion";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

/**
 * Lädt die WebGL-Szene nur auf Desktop-Viewports nach.
 * Auf Mobile (<768px) bleibt ein leichter CSS-Gradient als Ersatz –
 * der liegt auch auf Desktop als Glow hinter dem Canvas (kein Layout-Shift).
 */
export function HeroSceneLoader({ className }: { className?: string }) {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className={className} aria-hidden>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(124,58,237,0.32)_0%,rgba(6,182,212,0.10)_45%,transparent_72%)]"
        aria-hidden
      />
      {isDesktop && (
        <div className="absolute inset-0">
          <HeroScene />
        </div>
      )}
    </div>
  );
}
