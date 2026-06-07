"use client";

import dynamic from "next/dynamic";
import * as React from "react";

import { isDesktopViewport, prefersReducedMotion } from "@/lib/motion";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((mod) => mod.ParticleField),
  { ssr: false },
);

/** Partikel-Hintergrund nur auf Desktop ohne Reduced-Motion. */
export function ParticleLoader({ className }: { className?: string }) {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const check = () => setEnabled(isDesktopViewport() && !prefersReducedMotion());
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!enabled) return null;

  return <ParticleField className={className} />;
}
