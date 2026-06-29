"use client";

import * as React from "react";

import { lerp } from "@/lib/motion";

/* Ashima/Gustavson 3D-Simplex-Noise (webgl-noise) – Public Domain. */
const SIMPLEX_NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uDisplacement;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vViewPosition;
${SIMPLEX_NOISE}
void main() {
  float n1 = snoise(normal * 1.6 + uTime * 0.26);
  float n2 = snoise(position * 2.6 - uTime * 0.16);
  float displacement = (n1 * 0.62 + n2 * 0.38) * uDisplacement;
  vNoise = displacement;
  vec3 newPosition = position + normal * displacement;
  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vViewPosition;
void main() {
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - clamp(dot(viewDir, normalize(vNormal)), 0.0, 1.0), 2.0);
  vec3 base = mix(uColorA, uColorB, smoothstep(-0.35, 0.55, vNoise));
  vec3 color = mix(base, uColorC, fresnel * 0.9);
  color += fresnel * 0.85 * uColorB;
  gl_FragColor = vec4(color, 1.0);
}
`;

type Runtime = { dispose: () => void };

async function createScene(canvas: HTMLCanvasElement): Promise<Runtime> {
  const THREE = await import("three");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 4.6);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const group = new THREE.Group();
  scene.add(group);

  // Organischer Orb mit Noise-Displacement + Fresnel
  const geometry = new THREE.IcosahedronGeometry(1.85, 32);
  const uniforms = {
    uTime: { value: 0 },
    uDisplacement: { value: 0.18 },
    uColorA: { value: new THREE.Color("#2d0f6e") },
    uColorB: { value: new THREE.Color("#8b5cf6") },
    uColorC: { value: new THREE.Color("#22d3ee") },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
  });
  const orb = new THREE.Mesh(geometry, material);
  group.add(orb);

  // Feiner Wireframe-Mantel für Tiefe
  const shellGeometry = new THREE.IcosahedronGeometry(2.6, 2);
  const shellMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#a78bfa"),
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const shell = new THREE.Mesh(shellGeometry, shellMaterial);
  group.add(shell);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0, displacement: 0.18 };

  const handlePointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    target.displacement = 0.3;
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
    uniforms.uTime.value = elapsed;

    // Maus-Reaktion: Orb neigt sich zum Cursor, Displacement beruhigt sich
    target.x = pointer.y * 0.4;
    target.y = pointer.x * 0.6;
    group.rotation.x = lerp(group.rotation.x, target.x, 0.04);
    group.rotation.y = lerp(group.rotation.y, target.y + elapsed * 0.08, 0.04);

    target.displacement = lerp(target.displacement, 0.18, 0.02);
    uniforms.uDisplacement.value = lerp(
      uniforms.uDisplacement.value,
      target.displacement,
      0.06,
    );

    shell.rotation.y = -elapsed * 0.05;
    shell.rotation.z = elapsed * 0.03;

    // Scroll-Reaktion: Der Orb zieht sich in die Tiefe zurück und der
    // Wireframe-Mantel verblasst, während der Leser ins Narrativ scrollt –
    // das Instrument "fährt herunter", die Geschichte übernimmt.
    const scrollFraction = Math.min(
      window.scrollY / Math.max(window.innerHeight, 1),
      1,
    );
    camera.position.z = lerp(camera.position.z, 4.6 + scrollFraction * 2.4, 0.06);
    group.scale.setScalar(lerp(group.scale.x, 1 - scrollFraction * 0.14, 0.06));
    shellMaterial.opacity = 0.12 * (1 - scrollFraction);

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
      shellGeometry.dispose();
      shellMaterial.dispose();
      renderer.dispose();
    },
  };
}

export function OrbScene({ className }: { className?: string }) {
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
