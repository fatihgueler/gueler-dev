"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";

import { sampleTextTargets } from "@/lib/text-sampling";

/**
 * ExplodedWordmark — Hero-Assembly (Feature A / Technik 2).
 *
 * Prozedurale, monochrome, flat-shaded Tiles (InstancedMesh, KEIN Modell)
 * schweben chaotisch und fliegen beim Scrollen mit Stagger + smoothstep an
 * ihre Zielzellen. Die Ziele stammen aus gleichmäßigem Canvas-Raster-Sampling
 * von "GÜLER.DEV" (lib/text-sampling) — koplanar & frontal, sodass sich die
 * Fragmente zu einer klar lesbaren Low-Res-Stencil-Wortmarke fügen.
 *
 * Hover-Grin: Steht die Wortmarke (Scroll ~fertig) und fährt die Maus drüber,
 * biegen sich die Tiles über eine unterdämpfte Feder in ein Lächeln (Mundwinkel
 * hoch, Mitte wölbt sich vor, leichtes Lach-Wobble) und federn beim Verlassen
 * mit Overshoot zurück — die 3D-Neuauflage des alten Joker-Grins.
 *
 * progressRef-Pattern: der gepinnte Hero schreibt den Scroll-Fortschritt in
 * einen MotionValue; useFrame liest ihn. frameloop="demand": Frames kommen bei
 * Scroll (invalidate on change) und während der Grin animiert (rAF-Loop).
 */

const WORLD_WIDTH = 9;
/** Anteil der Timeline, über den die Fragmente gestaffelt starten. */
const STAGGER = 0.45;
/** Maximale Gesamtrotation der Fragment-Gruppe (dezent, ≤ 0.35·π). */
const MAX_GROUP_ROT = 0.3 * Math.PI;
/** Ab diesem Fortschritt gilt die Wortmarke als „gesetzt" → Grin erlaubt. */
const GRIN_READY = 0.55;

const smoothstep = (t: number) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

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
  /** Normierte x-Lage im Wort (−1 … 1) für die Grin-Kurve. */
  u: number;
}

/** Geteilter Grin-Zustand zwischen DOM-Hover-Handlern und der r3f-Schleife. */
interface GrinAnim {
  hover: boolean;
  grin: number;
  vel: number;
  invalidate: (() => void) | null;
  raf: number;
  running: boolean;
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
    // Zielrotation: exakt frontal (Identität) → die Tiles kacheln die Glyphen
    // sauber, kein Kanten-Zerreißen. Kantigkeit kommt aus der Assembly-Bewegung.
    const qTarget = new THREE.Quaternion();
    // Tile ≈ Rasterzelle (dünn in z): füllt die Buchstaben-Striche lückenlos.
    const scale = new THREE.Vector3(cell * 0.98, cell * 0.98, cell * 0.34);
    frags.push({
      target,
      scattered,
      qTarget,
      qScatter,
      scale,
      delay: rand() * STAGGER,
      u: clamp(t.x / (WORLD_WIDTH * 0.5), -1, 1),
    });
  }
  return frags;
}

function Fragments({
  progress,
  count,
  color,
  fontFamily,
  anim,
}: {
  progress: MotionValue<number>;
  count: number;
  color: string;
  fontFamily: string;
  anim: React.RefObject<GrinAnim>;
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

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const p = progress.get();
    const assembled = smoothstep(p);

    // Grin als unterdämpfte Feder (Overshoot → „Nachlachen"). Nur wenn die
    // Wortmarke steht und gehovert wird, sonst zieht es zurück auf 0.
    const a = anim.current;
    const grinTarget = a.hover && p > GRIN_READY ? 1 : 0;
    a.vel += (grinTarget - a.grin) * 0.05;
    a.vel *= 0.86;
    a.grin += a.vel;
    const grin = clamp(a.grin, 0, 1.15) * assembled;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < frags.length; i++) {
      const f = frags[i];
      const local = smoothstep((p - f.delay) / (1 - STAGGER));
      dummy.position.lerpVectors(f.scattered, f.target, local);
      q.copy(f.qScatter).slerp(f.qTarget, local);
      dummy.quaternion.copy(q);

      if (grin > 0.0001) {
        const u = f.u;
        // Smile-Bogen: Mundwinkel hoch, Mitte runter (U-Form).
        dummy.position.y += 0.8 * (u * u - 0.375) * grin;
        // Mitte wölbt sich zur Kamera vor (Pseudo-3D).
        dummy.position.z += 0.55 * (1 - u * u) * grin;
        // Lach-Wobble, solange der Grin steht.
        dummy.position.y += Math.sin(time * 7 + i * 0.6) * 0.03 * grin;
        // Tiles kippen entlang der Smile-Tangente ein.
        dummy.rotateZ(-0.5 * u * grin);
      }

      dummy.scale.copy(f.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    if (groupRef.current) {
      // Dreht sich beim Zusammensetzen in die Frontale (0 bei p=1).
      groupRef.current.rotation.y = (1 - assembled) * MAX_GROUP_ROT;
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

/** Reicht die r3f-invalidate-Funktion an den DOM-getriebenen Grin-Loop weiter. */
function InvalidateBridge({ anim }: { anim: React.RefObject<GrinAnim> }) {
  const invalidate = useThree((s) => s.invalidate);
  React.useEffect(() => {
    anim.current.invalidate = invalidate;
  }, [invalidate, anim]);
  return null;
}

export function ExplodedWordmark({
  progress,
  count = 140,
}: {
  progress: MotionValue<number>;
  count?: number;
}) {
  const [color, setColor] = React.useState("#f1f5f9");
  const [fontFamily, setFontFamily] = React.useState(
    "system-ui, sans-serif",
  );
  const anim = React.useRef<GrinAnim>({
    hover: false,
    grin: 0,
    vel: 0,
    invalidate: null,
    raf: 0,
    running: false,
  });

  // Solange gehovert wird ODER der Grin noch nachfedert: Frames anfordern.
  const startGrinLoop = React.useCallback(() => {
    const a = anim.current;
    if (a.running) return;
    a.running = true;
    const tick = () => {
      a.invalidate?.();
      if (a.hover || Math.abs(a.grin) > 0.002 || Math.abs(a.vel) > 0.002) {
        a.raf = requestAnimationFrame(tick);
      } else {
        a.running = false;
      }
    };
    a.raf = requestAnimationFrame(tick);
  }, []);

  React.useEffect(() => {
    const a = anim.current;
    return () => cancelAnimationFrame(a.raf);
  }, []);

  React.useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      const c = s.getPropertyValue("--color-foreground").trim();
      const f = s.getPropertyValue("--font-display").trim();
      if (c) setColor(c);
      if (f) setFontFamily(f);
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: 0 }}
      onPointerEnter={() => {
        anim.current.hover = true;
        startGrinLoop();
      }}
      onPointerLeave={() => {
        anim.current.hover = false;
        startGrinLoop();
      }}
    >
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
          anim={anim}
        />
        <CameraRig progress={progress} />
        <InvalidateOnProgress progress={progress} />
        <InvalidateBridge anim={anim} />
      </Canvas>
    </div>
  );
}
