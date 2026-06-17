"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

type SplineSceneProps = {
  scene: string;
  className?: string;
};

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<div className={className} aria-hidden />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
