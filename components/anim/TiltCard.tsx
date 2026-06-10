"use client";

import * as React from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximale Neigung in Grad. */
  maxTilt?: number;
};

const SPRING = { stiffness: 250, damping: 25 };

/**
 * 3D-Tilt-Wrapper: neigt den Inhalt zur Mausposition und setzt beim
 * Verlassen sanft zurück. Bei Reduced Motion wird ohne Effekt gerendert.
 */
export function TiltCard({ children, className, maxTilt = 6 }: TiltCardProps) {
  const isReducedMotion = useReducedMotion() ?? false;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    SPRING,
  );

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    // Mausposition relativ zur Kartenmitte, normalisiert auf -0,5 … 0,5
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className="[perspective:1200px]">
      <m.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={className}
      >
        {children}
      </m.div>
    </div>
  );
}
