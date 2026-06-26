"use client";

import * as React from "react";

const PARTICLE_COUNT = 1100;
const FIELD_RADIUS = 8;

const PALETTE = ["#7c3aed", "#8b5cf6", "#06b6d4", "#22d3ee"];

function buildPositions(): Float32Array {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const radius = FIELD_RADIUS * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

function buildColors(): Float32Array {
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const hex = PALETTE[i % PALETTE.length];
    colors[i * 3] = parseInt(hex.slice(1, 3), 16) / 255;
    colors[i * 3 + 1] = parseInt(hex.slice(3, 5), 16) / 255;
    colors[i * 3 + 2] = parseInt(hex.slice(5, 7), 16) / 255;
  }
  return colors;
}

type Runtime = { dispose: () => void };

async function createScene(canvas: HTMLCanvasElement): Promise<Runtime> {
  const THREE = await import("three");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 11);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(buildPositions(), 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(buildColors(), 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const pointer = { x: 0, y: 0 };
  const handlePointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", handlePointerMove);

  const resizeObserver = new ResizeObserver(() => {
    const { clientWidth, clientHeight } = canvas;
    if (clientWidth === 0 || clientHeight === 0) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
  });
  resizeObserver.observe(canvas);

  const clock = new THREE.Clock();
  let frameId = 0;

  const animate = () => {
    const elapsed = clock.getElapsedTime();
    const scrollFactor = window.scrollY * 0.0006;

    points.rotation.y = elapsed * 0.03 + scrollFactor;
    points.rotation.x = Math.sin(elapsed * 0.05) * 0.1 + scrollFactor * 0.4;

    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.6 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(animate);
  };
  frameId = window.requestAnimationFrame(animate);

  return {
    dispose: () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let runtime: Runtime | null = null;
    let cancelled = false;

    createScene(canvas).then((created) => {
      if (cancelled) {
        created.dispose();
        return;
      }
      runtime = created;
    });

    return () => {
      cancelled = true;
      runtime?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
