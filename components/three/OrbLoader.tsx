"use client";

import dynamic from "next/dynamic";
import * as React from "react";

import { isDesktopViewport, prefersReducedMotion } from "@/lib/motion";

const OrbScene = dynamic(
  () => import("@/components/three/OrbScene").then((mod) => mod.OrbScene),
  { ssr: false },
);

/**
 * Lädt die WebGL-Szene nur auf Desktop ohne Reduced-Motion.
 * Sonst: leichter CSS-Orb als Alternative.
 */
export function OrbLoader({ className }: { className?: string }) {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const check = () => setEnabled(isDesktopViewport() && !prefersReducedMotion());
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!enabled) {
    return (
      <div className={className} aria-hidden>
        <div className="orb-fallback" />
      </div>
    );
  }

  return <OrbScene className={className} />;
}
