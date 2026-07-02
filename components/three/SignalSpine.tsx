"use client";

import * as React from "react";

import { lerp } from "@/lib/motion";
import { createChapterTracker } from "@/components/three/chapter";

/**
 * „Das Signal" — die persistente Szene der Startseite (Kapitel-Spine).
 *
 * Statt eines Hero-Splashes, der nach einem Viewport stirbt, erzählt EINE
 * Szene die fünf Kapitel mit (Scroll-getrieben, Werte aus chapter.ts):
 *   0 Hero        Rauschen rastet in Orbit + Kristall ein (das Signal)
 *   1 Ihr Problem das Signal zerstreut sich wieder im Rauschen
 *   2 Ihr Weg     Arbeit schafft Ordnung — ruhiges Gitter
 *   3 Der Beweis  Verdichtung zu wenigen hellen Werk-Clustern
 *   4 Ihr Erfolg  weite, ruhige Konstellation
 *   5 Ihr Moment  fast still; der Kristall kehrt klein und stetig zurück
 *
 * Performance-Vertrag (Audit-Budget): Buffer einmal auf Maximum alloziert,
 * aktive Partikelzahl adaptiv über drawRange (Start 16k, 8–48k je nach
 * gemessener Frame-Zeit), DPR ≤ 1.5, Pause bei Sichtbarkeitsverlust.
 * Theme-aware wie zuvor; Canvas ist aria-hidden, Inhalt lebt im HTML.
 */

const SIMPLEX = /* glsl */ `
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

const CORE_CENTER = "vec3(2.4, 0.25, 0.0)";

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uSnap;
uniform float uChapter;
uniform float uCursorActive;
uniform float uPixelRatio;
uniform vec2 uCursor;
attribute vec3 aTarget;
attribute vec3 aGrid;
attribute vec3 aCluster;
attribute float aRnd;
attribute float aCore;
attribute float aHue;
varying float vCore;
varying float vHue;
varying float vAlphaMul;
${SIMPLEX}

// Dreiecksgewicht: 1 bei c == i, linear auf 0 bis |c-i| == 1
float w(float c, float i) { return max(0.0, 1.0 - abs(c - i)); }

void main() {
  vec3 chaos = position;
  float n = snoise(chaos * 0.25 + uTime * 0.15);
  vec3 turb = vec3(
    sin(chaos.y * 0.5 + uTime + n * 3.0),
    cos(chaos.z * 0.45 - uTime + n * 3.0),
    sin(chaos.x * 0.5 + uTime * 0.9 + n * 3.0)
  ) * 1.15;

  // ── Zustand 0: Hero — Chaos rastet in den Orbit ein (zeitgetrieben)
  vec3 chaosPos = chaos + turb * (1.0 - uMorph);
  float m = smoothstep(0.0, 1.0, uMorph);
  vec3 s0 = mix(chaosPos, aTarget, m);
  vec3 outward = normalize(s0 - ${CORE_CENTER} + 0.001);
  s0 += outward * sin(uTime * 1.5 + aRnd * 6.2831) * 0.02 * m;
  s0 += outward * uSnap * 1.2;

  // ── Zustand 1: Zerstreuung — das Signal verliert sich im Rauschen
  vec3 s1 = chaos * vec3(1.25, 1.1, 1.0) + turb * 0.9;

  // ── Zustand 2: Ordnung — ruhiges Gitter mit minimalem Atmen
  vec3 s2 = aGrid + vec3(
    snoise(aGrid * 0.6 + uTime * 0.06) * 0.08,
    snoise(aGrid.yzx * 0.6 - uTime * 0.05) * 0.08,
    0.0
  );

  // ── Zustand 3: Beweis — Verdichtung zu Werk-Clustern (leichtes Kreisen)
  float orbitA = uTime * 0.12 + aRnd * 6.2831;
  vec3 s3 = aCluster + vec3(cos(orbitA), sin(orbitA), 0.0) * (0.12 + aRnd * 0.25);

  // ── Zustand 4/5: Konstellation → Stille (gleiche Lage, weiter + ruhiger)
  vec3 s4 = aGrid * vec3(1.55, 1.45, 1.0) + vec3(
    sin(uTime * 0.05 + aRnd * 6.2831) * 0.05,
    cos(uTime * 0.04 + aRnd * 4.0) * 0.05,
    0.0
  );

  float w0 = w(uChapter, 0.0);
  float w1 = w(uChapter, 1.0);
  float w2 = w(uChapter, 2.0);
  float w3 = w(uChapter, 3.0);
  float w4 = w(uChapter, 4.0);
  float w5 = w(uChapter, 5.0);

  vec3 pos = s0 * w0 + s1 * w1 + s2 * w2 + s3 * w3 + s4 * (w4 + w5);

  // Cursor = Suchstrahl: teilt die Partikel lokal
  vec2 d = pos.xy - uCursor;
  float dist = length(d);
  float push = uCursorActive * smoothstep(2.2, 0.0, dist) * 0.9;
  pos.xy += normalize(d + 0.001) * push;

  vCore = aCore;
  vHue = aHue;
  // Lesbarkeits-Profil: Szene tritt in den textlastigen Kapiteln zurück
  vAlphaMul = w0 * 1.0 + w1 * 0.55 + w2 * 0.5 + w3 * 0.75 + w4 * 0.55 + w5 * 0.4;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float sizeProfile = w0 * 1.0 + w1 * 0.8 + w2 * 0.75 + w3 * 1.05 + w4 * 0.8 + w5 * 0.7;
  float size = (aCore > 0.5 ? 3.0 : 1.6) * (0.7 + 0.6 * aRnd) * sizeProfile;
  gl_PointSize = size * uPixelRatio * (8.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAGMENT = /* glsl */ `
uniform float uMode;
uniform float uReveal;
uniform vec3 uViolet;
uniform vec3 uCyan;
uniform vec3 uInk;
varying float vCore;
varying float vHue;
varying float vAlphaMul;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.0, d);

  vec3 coreCol = mix(uViolet, uCyan, vHue);
  // Marken-Gradient + vereinzelte weiße Funken statt Regenbogen-Konfetti
  float sparkle = step(0.92, fract(vHue * 7.13));
  vec3 spectral = mix(coreCol * 0.9, vec3(1.0), sparkle * 0.7);
  vec3 darkCol = (vCore > 0.5) ? coreCol * 1.6 : spectral;

  vec3 jewel = mix(coreCol, uInk, 0.25);
  vec3 lightCol = (vCore > 0.5) ? mix(coreCol, uInk, 0.05) : mix(uInk, jewel, 0.5);

  vec3 col = mix(darkCol, lightCol, uMode);

  float baseA = (vCore > 0.5 ? 0.95 : mix(0.5, 0.72, uMode));
  float a = soft * baseA * uReveal * vAlphaMul;

  gl_FragColor = vec4(col, a);
}
`;

type Runtime = { dispose: () => void };

type Theme = { isLight: boolean; fg: string; violet: string; cyan: string };

function readTheme(): Theme {
  const isLight = document.documentElement.classList.contains("light");
  return {
    isLight,
    fg: isLight ? "#0e0e14" : "#f1f5f9",
    violet: isLight ? "#7c3aed" : "#8b5cf6",
    cyan: isLight ? "#0891b2" : "#22d3ee",
  };
}

function makeHalo(THREE: typeof import("three")) {
  const s = 128;
  const cv = document.createElement("canvas");
  cv.width = s;
  cv.height = s;
  const x = cv.getContext("2d")!;
  const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(196,232,255,0.95)");
  g.addColorStop(0.35, "rgba(124,148,255,0.4)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(cv);
}

/**
 * Marken-Umgebung fürs Glas. Dark: Violet→Void→Cyan (glühende Reflexe).
 * Light: helle Lavendel/Weiß-Umgebung, damit der Kristall auf Papier als
 * Glas mit sichtbarer Iridiszenz liest statt als matte dunkle Kugel
 * (Design-Audit: „muddy planet").
 */
function makeGemEnvScene(THREE: typeof import("three"), isLight: boolean) {
  const scene = new THREE.Scene();
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  if (isLight) {
    gradient.addColorStop(0, "#f6f3ff");
    gradient.addColorStop(0.35, "#c4b5fd");
    gradient.addColorStop(0.65, "#ffffff");
    gradient.addColorStop(1, "#67e8f9");
  } else {
    gradient.addColorStop(0, "#8b5cf6");
    gradient.addColorStop(0.35, "#1a1230");
    gradient.addColorStop(0.65, "#0a0a14");
    gradient.addColorStop(1, "#22d3ee");
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.add(
    new THREE.HemisphereLight(isLight ? "#ffffff" : "#22d3ee", isLight ? "#c4b5fd" : "#8b5cf6", 2.2),
  );
  return { scene, texture };
}

/** Kristall-Choreografie: Ziel-Position/-Größe je Kapitelwert. */
function crystalTargets(c: number, heroScale: number) {
  // Kapitel 0: rechts neben dem Hero-Text, volle Größe (Morph-getrieben)
  if (c <= 0.5) return { x: 2.4, y: 0.25, scale: heroScale };
  // Kapitel 0.5–4: versinkt — die Geschichte gehört den Partikeln
  if (c <= 4) {
    const t = Math.min(1, (c - 0.5) / 0.6);
    return { x: 2.4, y: 0.25 - t * 1.2, scale: Math.max(0.001, heroScale * (1 - t)) };
  }
  // Kapitel 4→5: kehrt klein, ruhig und mittig über dem CTA zurück
  const t = Math.min(1, c - 4);
  return { x: 0, y: 1.1, scale: 0.001 + t * 0.5 };
}

async function createScene(canvas: HTMLCanvasElement, lowTier: boolean): Promise<Runtime> {
  const THREE = await import("three");

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, w / Math.max(h, 1), 0.1, 100);
  camera.position.set(0, 0, 10.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !lowTier,
    alpha: true,
    powerPreference: "high-performance",
  });
  // Audit-Budget: DPR-Kappe 1.5 (vorher 1.75)
  const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(w, h, false);
  renderer.setClearAlpha(0);

  let theme = readTheme();
  const pmrem = new THREE.PMREMGenerator(renderer);
  let gemEnv = makeGemEnvScene(THREE, theme.isLight);
  let envRT = pmrem.fromScene(gemEnv.scene, 0.04);
  scene.environment = envRT.texture;

  const coreCenter = new THREE.Vector3(2.4, 0.25, 0);

  const glassMat = new THREE.MeshPhysicalMaterial({
    metalness: 0.0,
    roughness: 0.02,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    envMapIntensity: 2.0,
    iridescence: 1.0,
    iridescenceIOR: 1.6,
    iridescenceThicknessRange: [140, 520],
    color: new THREE.Color("#eef2ff"),
  });
  const glass = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 2), glassMat);
  glass.position.copy(coreCenter);
  glass.scale.setScalar(0.001);
  scene.add(glass);

  const haloTex = makeHalo(THREE);
  const haloMat = new THREE.SpriteMaterial({
    map: haloTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0,
  });
  const halo = new THREE.Sprite(haloMat);
  halo.position.copy(coreCenter);
  scene.add(halo);

  // ── Partikel: Buffer EINMAL auf Maximum, aktive Zahl über drawRange ──
  const MAX_COUNT = lowTier ? 24000 : 48000;
  const START_COUNT = lowTier ? 8000 : 16000;
  const MIN_COUNT = 6000;

  const positions = new Float32Array(MAX_COUNT * 3);
  const targets = new Float32Array(MAX_COUNT * 3);
  const grid = new Float32Array(MAX_COUNT * 3);
  const cluster = new Float32Array(MAX_COUNT * 3);
  const rnd = new Float32Array(MAX_COUNT);
  const coreFlag = new Float32Array(MAX_COUNT);
  const hue = new Float32Array(MAX_COUNT);

  // Werk-Cluster (Kapitel 3): vier helle Verdichtungen = die vier Projekte
  const CLUSTERS = [
    [-3.6, 1.3],
    [3.4, 1.6],
    [-2.4, -1.7],
    [3.0, -1.4],
  ];

  const gridCols = Math.ceil(Math.sqrt(MAX_COUNT * 1.7));
  const gridRows = Math.ceil(MAX_COUNT / gridCols);

  for (let i = 0; i < MAX_COUNT; i++) {
    positions[i * 3] = (Math.random() * 2 - 1) * 9;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * 5;
    positions[i * 3 + 2] = -5 + Math.random() * 4;

    const isCore = Math.random() < 0.4;
    coreFlag[i] = isCore ? 1 : 0;

    const u = Math.random() * 2 - 1;
    const t = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const dir = { x: s * Math.cos(t), y: s * Math.sin(t), z: u };

    if (isCore) {
      const r = 1.0 + Math.pow(Math.random(), 1.6) * 0.8;
      targets[i * 3] = coreCenter.x + dir.x * r;
      targets[i * 3 + 1] = coreCenter.y + dir.y * r;
      targets[i * 3 + 2] = coreCenter.z + dir.z * r * 0.7;
    } else {
      const r = 2.5 + (Math.random() - 0.5) * 0.25;
      targets[i * 3] = coreCenter.x + dir.x * r;
      targets[i * 3 + 1] = coreCenter.y + dir.y * r;
      targets[i * 3 + 2] = coreCenter.z + dir.z * r * 0.7;
    }

    // Gitter (Kapitel 2): jitterte Zellen über die volle Bühne
    const col = i % gridCols;
    const row = Math.floor(i / gridCols) % gridRows;
    grid[i * 3] = (col / (gridCols - 1) - 0.5) * 13 + (Math.random() - 0.5) * 0.35;
    grid[i * 3 + 1] = (row / (gridRows - 1) - 0.5) * 7.5 + (Math.random() - 0.5) * 0.35;
    grid[i * 3 + 2] = (Math.random() - 0.5) * 1.2;

    // Cluster (Kapitel 3): Zuordnung + gaußartiger Offset
    const cl = CLUSTERS[i % CLUSTERS.length];
    const cr = Math.pow(Math.random(), 1.8) * 0.9;
    const ca = Math.random() * Math.PI * 2;
    cluster[i * 3] = cl[0] + Math.cos(ca) * cr;
    cluster[i * 3 + 1] = cl[1] + Math.sin(ca) * cr * 0.75;
    cluster[i * 3 + 2] = (Math.random() - 0.5) * 0.8;

    hue[i] = Math.random();
    rnd[i] = Math.random();
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
  geo.setAttribute("aGrid", new THREE.BufferAttribute(grid, 3));
  geo.setAttribute("aCluster", new THREE.BufferAttribute(cluster, 3));
  geo.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));
  geo.setAttribute("aCore", new THREE.BufferAttribute(coreFlag, 1));
  geo.setAttribute("aHue", new THREE.BufferAttribute(hue, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 30);
  geo.setDrawRange(0, START_COUNT);

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uMode: { value: 0 },
    uSnap: { value: 0 },
    uChapter: { value: 0 },
    uCursorActive: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uCursor: { value: new THREE.Vector2(-10, -10) },
    uReveal: { value: 0 },
    uViolet: { value: new THREE.Color("#8b5cf6") },
    uCyan: { value: new THREE.Color("#22d3ee") },
    uInk: { value: new THREE.Color("#0e0e14") },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  scene.add(points);

  // ── Theme ─────────────────────────────────────────────────────
  let haloBase = 0.55;
  const applyTheme = (t: Theme) => {
    theme = t;
    haloBase = t.isLight ? 0.0 : 0.55;
    uniforms.uMode.value = t.isLight ? 1 : 0;
    uniforms.uViolet.value.set(t.violet);
    uniforms.uCyan.value.set(t.cyan);
    uniforms.uInk.value.set(t.fg);
    material.blending = t.isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
    material.needsUpdate = true;
    glassMat.color.set(t.isLight ? "#f0f2ff" : "#e7ecff");
    glassMat.envMapIntensity = t.isLight ? 1.9 : 2.3;
    // Umgebung passend zum Theme neu backen (heller Raum im Light-Mode)
    gemEnv.texture.dispose();
    envRT.texture.dispose();
    gemEnv = makeGemEnvScene(THREE, t.isLight);
    envRT = pmrem.fromScene(gemEnv.scene, 0.04);
    scene.environment = envRT.texture;
  };
  applyTheme(readTheme());
  const themeObserver = new MutationObserver(() => applyTheme(readTheme()));
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  // ── Kapitel-Tracking ──────────────────────────────────────────
  const chapters = createChapterTracker();
  chapters.measure();
  let chapterSmooth = 0;

  // ── Pointer ───────────────────────────────────────────────────
  const pointerNdc = { x: 0, y: 0 };
  let cursorActiveTarget = 0;
  const handlePointerMove = (e: PointerEvent) => {
    pointerNdc.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerNdc.y = -((e.clientY / window.innerHeight) * 2 - 1);
    cursorActiveTarget = 1;
  };
  window.addEventListener("pointermove", handlePointerMove);

  const resizeObserver = new ResizeObserver(() => {
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (cw === 0 || ch === 0) return;
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
    renderer.setSize(cw, ch, false);
    chapters.measure();
  });
  resizeObserver.observe(canvas);
  // Anker verschieben sich, wenn Inhalte/Fonts nachladen
  window.addEventListener("load", chapters.measure);

  // ── Adaptive Qualität: Frame-Zeit-Messung steuert drawRange ──
  let activeCount = START_COUNT;
  let frameSamples = 0;
  let frameAccum = 0;
  let lastFrameStart = 0;

  const adaptQuality = (frameMs: number) => {
    frameAccum += frameMs;
    frameSamples += 1;
    if (frameSamples < 60) return;
    const avg = frameAccum / frameSamples;
    frameSamples = 0;
    frameAccum = 0;
    if (avg < 8 && activeCount < MAX_COUNT) {
      activeCount = Math.min(MAX_COUNT, Math.round(activeCount * 1.5));
      geo.setDrawRange(0, activeCount);
    } else if (avg > 20 && activeCount > MIN_COUNT) {
      activeCount = Math.max(MIN_COUNT, Math.round(activeCount * 0.6));
      geo.setDrawRange(0, activeCount);
    }
  };

  // ── Loop ──────────────────────────────────────────────────────
  let lastFound = false;
  let snapTime = -1;
  let frameId = 0;
  let startTime = 0;

  const animate = (now: number) => {
    if (startTime === 0) startTime = now;
    if (lastFrameStart > 0) adaptQuality(now - lastFrameStart);
    lastFrameStart = now;
    const elapsed = (now - startTime) / 1000;
    uniforms.uTime.value = elapsed;

    // Intro-Choreografie (nur relevant in Kapitel 0)
    const morphRaw = Math.max(0, Math.min(1, (elapsed - 0.7) / 2.6));
    const morph = 1 - Math.pow(1 - morphRaw, 4);
    uniforms.uMorph.value = morph;
    uniforms.uReveal.value = Math.min(elapsed / 0.8, 1);

    const nowFound = morph > 0.82;
    if (nowFound !== lastFound) {
      lastFound = nowFound;
      if (nowFound) snapTime = elapsed;
      window.dispatchEvent(new CustomEvent(nowFound ? "signal:found" : "signal:lost"));
    }
    let snap = 0;
    if (snapTime >= 0) {
      const st = (elapsed - snapTime) / 0.55;
      if (st < 1) snap = Math.sin(st * Math.PI) * 0.45;
    }
    uniforms.uSnap.value = snap;

    // Kapitelwert weich nachziehen (Scroll ist die Erzähl-Achse)
    chapterSmooth = lerp(chapterSmooth, chapters.value(), 0.07);
    uniforms.uChapter.value = chapterSmooth;

    // Cursor → Welt-XY
    const halfH = Math.tan((50 * Math.PI) / 360) * camera.position.z;
    const halfW = halfH * camera.aspect;
    uniforms.uCursor.value.set(pointerNdc.x * halfW, pointerNdc.y * halfH);
    uniforms.uCursorActive.value = lerp(uniforms.uCursorActive.value, cursorActiveTarget, 0.05);

    // Kristall-Choreografie
    const gm = Math.min(1, morph * 1.12);
    const heroScale = (1 - Math.pow(1 - gm, 3)) * (1 + snap * 0.45);
    const ct = crystalTargets(chapterSmooth, Math.max(0.001, heroScale));
    glass.position.x = lerp(glass.position.x, ct.x, 0.06);
    glass.position.y = lerp(glass.position.y, ct.y, 0.06);
    glass.scale.setScalar(lerp(glass.scale.x, ct.scale, 0.08));
    glass.rotation.y = elapsed * 0.25;
    glass.rotation.x = Math.sin(elapsed * 0.2) * 0.25;

    halo.position.copy(glass.position);
    const haloScale = (3.4 + snap * 5.0) * Math.min(1, glass.scale.x / 0.9 + 0.15);
    halo.scale.setScalar(Math.max(0.001, haloScale));
    haloMat.opacity = (haloBase + snap * 1.0) * Math.min(1, glass.scale.x * 1.4);

    // Kamera: sanfte Cursor-Parallaxe; Blick wandert zur Mitte, je tiefer
    // der Leser in der Geschichte ist
    const px = cursorActiveTarget > 0 ? pointerNdc.x : 0;
    const py = cursorActiveTarget > 0 ? pointerNdc.y : 0;
    const targetZ = lerp(10.5, 8.6, morph);
    camera.position.z = lerp(camera.position.z, targetZ, 0.05);
    camera.position.x = lerp(camera.position.x, px * 1.2 + Math.sin(elapsed * 0.1) * 0.3, 0.04);
    camera.position.y = lerp(camera.position.y, py * 0.6 + Math.cos(elapsed * 0.08) * 0.25, 0.04);
    const lookX = lerp(0.8, 0, Math.min(1, chapterSmooth));
    camera.lookAt(lookX, 0, 0);

    renderer.render(scene, camera);
    if (active) frameId = window.requestAnimationFrame(animate);
  };

  let active = false;
  let onScreen = true;
  const start = () => {
    if (active) return;
    active = true;
    lastFrameStart = 0;
    frameId = window.requestAnimationFrame(animate);
  };
  const stop = () => {
    active = false;
    window.cancelAnimationFrame(frameId);
  };
  const intersection = new IntersectionObserver(
    (entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen && document.visibilityState === "visible") start();
      else stop();
    },
    { threshold: 0 },
  );
  intersection.observe(canvas);
  const handleVisibility = () => {
    if (document.hidden) stop();
    else if (onScreen) start();
  };
  document.addEventListener("visibilitychange", handleVisibility);
  start();

  return {
    dispose: () => {
      stop();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("load", chapters.measure);
      resizeObserver.disconnect();
      if (lastFound) window.dispatchEvent(new CustomEvent("signal:lost"));
      geo.dispose();
      material.dispose();
      glass.geometry.dispose();
      glassMat.dispose();
      haloTex.dispose();
      haloMat.dispose();
      envRT.texture.dispose();
      gemEnv.texture.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}

export function SignalSpine({ lowTier = false }: { lowTier?: boolean }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let runtime: Runtime | null = null;
    let cancelled = false;
    createScene(canvas, lowTier).then((created) => {
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
  }, [lowTier]);

  return <canvas ref={canvasRef} aria-hidden className="h-full w-full" />;
}
