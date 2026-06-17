"use client";

import { SplineScene } from "@/components/three/SplineScene";

/**
 * Platzhalter-Szene (öffentliche Spline-Demo). Durch eine eigene
 * guler.dev-Szene ersetzen, bevor dies live geht.
 */
const PLACEHOLDER_SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function HeroScene() {
  return (
    <SplineScene
      scene={PLACEHOLDER_SCENE_URL}
      className="h-full w-full"
    />
  );
}
