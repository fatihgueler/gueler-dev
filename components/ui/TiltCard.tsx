"use client";

import * as React from "react";
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * TiltCard — 3D-Pointer-Neigung + Cherenkov-Glow.
 *
 * Die Karte neigt sich leicht zum Zeiger (max. ±5°), ein violetter Sheen
 * folgt dem Cursor und beim Hover erscheint der "Glow Violet"-Schatten aus
 * dem Design-System — das "Aufleuchten" eines berührten Instruments.
 *
 * Reduced Motion: keine Neigung, kein Sheen — nur ein ruhiger Border-/Glow-
 * Hover. Pointer-Events bleiben durchlässig für den darunterliegenden Inhalt.
 */

const SPRING = { stiffness: 150, damping: 20, mass: 0.5 } as const;
const MAX_TILT = 5; // Grad

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: TiltCardProps) {
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), SPRING);
  const sheen = useTransform([px, py], (latest) => {
    const [x, y] = latest as number[];
    return `radial-gradient(340px circle at ${x * 100}% ${y * 100}%, rgba(167,139,250,0.14), transparent 62%)`;
  });

  if (reduce) {
    return (
      <div
        className={cn(
          "relative transition-[border-color,box-shadow] duration-300 hover:border-violet-2 hover:shadow-[var(--shadow-teal)]",
          className,
        )}
      >
        {children}
      </div>
    );
  }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <m.div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        "group/tilt relative [transform-style:preserve-3d] transition-[border-color,box-shadow] duration-300 hover:border-violet-2 hover:shadow-[var(--shadow-teal)]",
        className,
      )}
    >
      {/* Pointer-folgender Cherenkov-Sheen – dezenter Glanz auf der Fläche */}
      <m.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{ background: sheen }}
      />
      {children}
    </m.div>
  );
}
