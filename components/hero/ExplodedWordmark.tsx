"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";

import { sampleTextTargets } from "@/lib/text-sampling";

/**
 * ExplodedWordmark — Hero-Assembly (Feature A / Technik 2).
 *
 * 40–80 kantige, monochrome, flat-shaded Fragmente (prozedurale Boxen,
 * KEIN importiertes Modell) schweben chaotisch im Raum und fliegen beim
 * Scrollen mit Stagger + smoothstep-Easing an ihre Zielpositionen. Die Ziele
 * stammen aus Canvas-Text-Sampling von "GÜLER.DEV" (lib/text-sampling).
 *
 * progressRef-Pattern: Der gepinnte Hero (framer-motion useScroll) schreibt
 * den Scroll-Fortschritt in einen MotionValue; useFrame LIEST ihn hier — die
 * r3f-Renderschleife ist damit von React-Re-Renders entkoppelt.
 *
 * Performance: frameloop="demand" + invalidate() bei jeder Progress-Änderung,
 * dpr [1,2]. Im Ruhezustand (kein Scroll) rendert nichts.
 */

const WORLD_WIDTH = 9;
/** Anteil der Timeline, über den die Fragmente gestaffelt starten. */
const STAGGER = 0.45;
/** Maximale Gesamtrotation der Fragment-Gruppe (dezent, ≤ 0.35·π). */
const MAX_GROUP_ROT = 0.3 * Math.PI;

const smoothstep = (t: number) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface FragData {
  target: THREE.Vector3;
  scattered: THREE.Vector3;
  qTarget: THREE.Quaternion;
  qScatter: THREE.Quaternion;
  scale: THREE.Vector3;
  delay: number;
}

function buildFragments(count: number, fontFamily: string): FragData[] {
  const seed = 20260714;
  const rand = mulberry32(seed);
  const { targets, cell } = sampleTextTargets("GÜLER.DEV", {
    count,
    worldWidth: WORLD_WIDTH,
    fontFamily,
    seed,
  });

  const frags: FragData[] = [];
  for (let i = 0; i < count; i++) {
    const t = targets[i] ?? { x: 0, y: 0, z: 0 };
    const target = new THREE.Vector3(t.x, t.y, t.z);
    // Chaotische Streuung: weites Volumen, leicht hinter die Zielebene gezogen.
    const scattered = new THREE.Vector3(
      (rand() - 0.5) * 20,
      (rand() - 0.5) * 12,
      (rand() - 0.5) * 16 - 2,
    );
    const qScatter = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        (rand() - 0.5) * Math.PI * 2,
        (rand() - 0.5) * Math.PI * 2,
        (rand() - 0.5) * Math.PI * 2,
      ),
    );
    // Zielrotation: nahezu koplanar & frontal — nur ein Hauch Versatz, damit
    // die Tiles zusammen die Buchstaben von GÜLER.DEV als flache Stencil-Fläche
    // lesbar formen (Rotation würde die Glyphenkanten zerreißen).
    const qTarget = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        (rand() - 0.5) * 0.04,
        (rand() - 0.5) * 0.04,
        (rand() - 0.5) * 0.05,
      ),
    );
    // Kantige Tiles ≈ Rasterzelle (dünn in z): füllen die Buchstaben-Striche
    // fast lückenlos → GÜLER.DEV liest sich als Low-Res-Stencil.
    const scale = new THREE.Vector3(
      cell * (0.82 + rand() * 0.22),
      cell * (0.82 + rand() * 0.22),
      cell * (0.28 + rand() * 0.3),
    );
    frags.push({
      target,
      scattered,
      qTarget,
      qScatter,
      scale,
      delay: rand() * STAGGER,
    });
  }
  return frags;
}

function Fragments({
  progress,
  count,
  color,
  fontFamily,
}: {
  progress: MotionValue<number>;
  count: number;
  color: string;
  fontFamily: string;
}) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const groupRef = React.useRef<THREE.Group>(null);
  const frags = React.useMemo(
    () => buildFragments(count, fontFamily),
    [count, fontFamily],
  );
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  const q = React.useMemo(() => new THREE.Quaternion(), []);

  React.useEffect(() => {
    meshRef.current?.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const p = progress.get();
    for (let i = 0; i < frags.length; i++) {
      const f = frags[i];
      const local = smoothstep((p - f.delay) / (1 - STAGGER));
      dummy.position.lerpVectors(f.scattered, f.target, local);
      q.copy(f.qScatter).slerp(f.qTarget, local);
      dummy.quaternion.copy(q);
      dummy.scale.copy(f.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    if (groupRef.current) {
      // Dreht sich beim Zusammensetzen in die Frontale (0 bei p=1).
      groupRef.current.rotation.y = (1 - smoothstep(p)) * MAX_GROUP_ROT;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          flatShading
          roughness={0.85}
          metalness={0.05}
        />
      </instancedMesh>
    </group>
  );
}

function CameraRig({ progress }: { progress: MotionValue<number> }) {
  const camera = useThree((s) => s.camera);
  const from = React.useMemo(() => new THREE.Vector3(6.5, 3.4, 15), []);
  const to = React.useMemo(() => new THREE.Vector3(0, 0, 10.5), []);
  const tmp = React.useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const e = smoothstep(progress.get());
    tmp.lerpVectors(from, to, e);
    camera.position.copy(tmp);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Fordert bei jeder Progress-Änderung genau einen Frame an (frameloop demand). */
function InvalidateOnProgress({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const invalidate = useThree((s) => s.invalidate);
  React.useEffect(() => {
    const unsub = progress.on("change", () => invalidate());
    invalidate();
    return unsub;
  }, [progress, invalidate]);
  return null;
}

export function ExplodedWordmark({
  progress,
  count = 80,
}: {
  progress: MotionValue<number>;
  count?: number;
}) {
  const [color, setColor] = React.useState("#f1f5f9");
  const [fontFamily, setFontFamily] = React.useState(
    "system-ui, sans-serif",
  );

  React.useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      const c = s.getPropertyValue("--color-foreground").trim();
      const f = s.getPropertyValue("--font-display").trim();
      if (c) setColor(c);
      if (f) setFontFamily(f);
    };
    read();
    // Theme-Wechsel: Farbe neu lesen (class-Toggle am <html>).
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="demand"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 42, position: [6.5, 3.4, 15], near: 0.1, far: 100 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 8]} intensity={1.5} />
      <directionalLight position={[-6, -2, 4]} intensity={0.55} />
      <Fragments
        key={count}
        progress={progress}
        count={count}
        color={color}
        fontFamily={fontFamily}
      />
      <CameraRig progress={progress} />
      <InvalidateOnProgress progress={progress} />
    </Canvas>
  );
}
