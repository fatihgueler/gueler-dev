"use client";

import * as React from "react";

const PARTICLE_COUNT = 900;
const FIELD_RADIUS = 7;
const ROTATION_SPEED = 0.00009;
const POINTER_INFLUENCE = 0.45;

const GOLD = "#c9a24a";
const GOLD_BRIGHT = "#e8ce8b";
const GOLD_DEEP = "#9a7a33";

function buildPositions(): Float32Array {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const radius = FIELD_RADIUS * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

function buildColors(): Float32Array {
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const palette = [GOLD, GOLD_BRIGHT, GOLD_DEEP];

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const hex = palette[i % palette.length];
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }
  return colors;
}

type ThreeRuntime = {
  dispose: () => void;
};

async function createScene(canvas: HTMLCanvasElement): Promise<ThreeRuntime> {
  const THREE = await import("three");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0.6, 10);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(buildPositions(), 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(buildColors(), 3));

  const material = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: GOLD_DEEP,
    wireframe: true,
    transparent: true,
    opacity: 0.16,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(core);

  const pointer = { x: 0, y: 0 };
  const handlePointerMove = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
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

  let frameId = 0;
  const clock = new THREE.Clock();

  const animate = () => {
    const elapsed = clock.getElapsedTime();

    points.rotation.y = elapsed * ROTATION_SPEED * 1000;
    points.rotation.x = Math.sin(elapsed * 0.05) * 0.08;

    core.rotation.y = -elapsed * 0.04;
    core.rotation.x = elapsed * 0.025;

    camera.position.x += (pointer.x * POINTER_INFLUENCE - camera.position.x) * 0.04;
    camera.position.y += (0.6 - pointer.y * POINTER_INFLUENCE - camera.position.y) * 0.04;
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
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    },
  };
}

export function HeroScene() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let runtime: ThreeRuntime | null = null;
    let isCancelled = false;

    createScene(canvas).then((created) => {
      if (isCancelled) {
        created.dispose();
        return;
      }
      runtime = created;
    });

    return () => {
      isCancelled = true;
      runtime?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70 [mask-image:radial-gradient(ellipse_65%_55%_at_60%_45%,black,transparent)]"
    />
  );
}
