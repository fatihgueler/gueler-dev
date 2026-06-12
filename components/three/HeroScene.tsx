"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Group } from "three";

import { lerp, prefersReducedMotion } from "@/lib/motion";

const ROTATION_SPEED = 0.18;
const POINTER_INFLUENCE = 0.55;

/**
 * Großer, metallisch glänzender TorusKnot mit organischem
 * Distort-Material – rotiert langsam und neigt sich zum Mauszeiger.
 */
function Knot() {
  const groupRef = React.useRef<Group>(null);
  const pointer = React.useRef({ x: 0, y: 0 });
  const reduced = React.useRef(false);

  React.useEffect(() => {
    reduced.current = prefersReducedMotion();
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group || reduced.current) return;

    const elapsed = state.clock.getElapsedTime();
    group.rotation.y = lerp(
      group.rotation.y,
      elapsed * ROTATION_SPEED + pointer.current.x * POINTER_INFLUENCE,
      0.05,
    );
    group.rotation.x = lerp(
      group.rotation.x,
      pointer.current.y * POINTER_INFLUENCE * 0.6,
      0.05,
    );
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.9}>
        <mesh scale={1.45}>
          {/* 200×28 Segmente reichen visuell – spart ~40% Vertices im Distort-Shader */}
          <torusKnotGeometry args={[1.15, 0.36, 200, 28]} />
          <MeshDistortMaterial
            color="#6d28d9"
            emissive="#2e1065"
            emissiveIntensity={0.35}
            metalness={0.92}
            roughness={0.18}
            distort={0.22}
            speed={1.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      {/* Farbige Lichter passend zur Palette: Violett (primär) + Cyan (sekundär) */}
      <pointLight position={[-5, 3, 4]} intensity={120} color="#7c3aed" />
      <pointLight position={[5, -2, 4]} intensity={90} color="#22d3ee" />
      <directionalLight position={[0, 4, 6]} intensity={1.4} color="#f1f5f9" />
      <Knot />
    </Canvas>
  );
}
