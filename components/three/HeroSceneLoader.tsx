"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { DESKTOP_BREAKPOINT } from "@/lib/motion";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

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
      {/* Cherenkov-Glow: tiefer Violett-Kern mit Cyan-Halo */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_50%_42%,rgba(124,58,237,0.50)_0%,rgba(139,92,246,0.22)_28%,rgba(6,182,212,0.10)_52%,transparent_72%)]"
        aria-hidden
      />
      {/* Atmosphärischer Sekundär-Haze für Tiefenwirkung */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_62%_55%,rgba(6,182,212,0.07)_0%,transparent_60%)]"
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
