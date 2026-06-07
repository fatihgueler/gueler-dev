"use client";

import dynamic from "next/dynamic";

export const HeroSceneLoader = dynamic(
  () => import("@/components/sections/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);
