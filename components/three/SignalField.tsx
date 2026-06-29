"use client";

import * as React from "react";

import { lerp } from "@/lib/motion";

/**
 * "Das Signal findet sich" — cinematischer Partikel-Morph (Award-Niveau).
 *
 * Hunderttausende Licht-Partikel = das Rauschen / der Traffic des Webs. Sie
 * schwärmen turbulent (Suche) und rasten beim Laden aus dem Chaos in eine
 * geordnete Signal-Form mit EINEM dominanten Leuchtkern ein (= „gefunden").
 * Der Cursor wird zum Suchstrahl, der die Partikel teilt.
 *
 * Iridiszent/spektral; der Kern bleibt in Violett→Cyan verankert. Komplett
 * theme-aware: im Light lesen sich die Partikel als Graphit-Staub auf Papier
 * (Normal-Blending, kein Additive-Washout), im Dark glühen sie im Void
 * (Additive). Farben kommen aus den CSS-Tokens, Blending wird beim
 * Theme-Wechsel live getauscht.
 *
 * Morph-basiert (kein FBO): die ganze Simulation läuft im Vertex-Shader →
 * robuste 60fps bei 150k Partikeln. Läuft nur Desktop + ohne reduced-motion.
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
uniform float uMode;
uniform float uCursorActive;
uniform float uPixelRatio;
uniform vec2 uCursor;
attribute vec3 aTarget;
attribute float aRnd;
attribute float aCore;
attribute float aHue;
varying float vCore;
varying float vHue;
${SIMPLEX}
void main() {
  vec3 chaos = position;
  float n = snoise(chaos * 0.25 + uTime * 0.15);
  vec3 turb = vec3(
    sin(chaos.y * 0.5 + uTime + n * 3.0),
    cos(chaos.z * 0.45 - uTime + n * 3.0),
    sin(chaos.x * 0.5 + uTime * 0.9 + n * 3.0)
  ) * 1.15;
  vec3 chaosPos = chaos + turb * (1.0 - uMorph);

  float m = smoothstep(0.0, 1.0, uMorph);
  vec3 pos = mix(chaosPos, aTarget, m);

  // Kern + Halo atmen leicht, wenn aufgelöst
  pos += normalize(pos - ${CORE_CENTER} + 0.001)
       * sin(uTime * 1.5 + aRnd * 6.2831) * 0.02 * m;

  // Cursor = Suchstrahl: teilt die Partikel
  vec2 d = pos.xy - uCursor;
  float dist = length(d);
  float push = uCursorActive * smoothstep(2.2, 0.0, dist) * 0.9;
  pos.xy += normalize(d + 0.001) * push;

  vCore = aCore;
  vHue = aHue;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float size = (aCore > 0.5 ? 3.0 : 1.6) * (0.7 + 0.6 * aRnd);
  gl_PointSize = size * uPixelRatio * (8.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAGMENT = /* glsl */ `
uniform float uMode;
uniform float uReveal;
uniform float uFade;
uniform vec3 uViolet;
uniform vec3 uCyan;
uniform vec3 uInk;
varying float vCore;
varying float vHue;
vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.0, d);

  vec3 coreCol = mix(uViolet, uCyan, vHue);

  // Dark: leuchtend spektral (Additive); Kern incandescent
  vec3 spectral = hsv2rgb(vec3(vHue, 0.85, 1.0));
  vec3 darkCol = (vCore > 0.5) ? coreCol * 1.6 : spectral;

  // Light: Graphit-Staub auf Papier (Normal-Blending), dezenter Juwel-Schimmer
  vec3 jewel = hsv2rgb(vec3(vHue, 0.62, 0.4));
  vec3 lightCol = (vCore > 0.5) ? mix(coreCol, uInk, 0.05) : mix(uInk, jewel, 0.42);

  vec3 col = mix(darkCol, lightCol, uMode);

  // Light: Staub muss auf Papier tragen → kräftigere Deckung als im Dark-Glow
  float baseA = (vCore > 0.5 ? 0.95 : mix(0.5, 0.72, uMode));
  float a = soft * baseA * uReveal * uFade;

  gl_FragColor = vec4(col, a);
}
`;

type Runtime = { dispose: () => void };

type Theme = { isLight: boolean; bg: string; fg: string; violet: string; cyan: string };

function readTheme(): Theme {
  const isLight = document.documentElement.classList.contains("light");
  return {
    isLight,
    bg: isLight ? "#fafaf8" : "#04040a",
    fg: isLight ? "#0e0e14" : "#f1f5f9",
    violet: isLight ? "#7c3aed" : "#8b5cf6",
    cyan: isLight ? "#0891b2" : "#22d3ee",
  };
}

async function createScene(canvas: HTMLCanvasElement): Promise<Runtime> {
  const THREE = await import("three");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / Math.max(canvas.clientHeight, 1),
    0.1,
    100,
  );
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "high-performance",
  });
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setClearAlpha(0);

  // Partikelzahl an die Fläche koppeln (Perf)
  const area = canvas.clientWidth * canvas.clientHeight;
  const COUNT = area > 1_400_000 ? 150000 : area > 800_000 ? 110000 : 70000;

  const positions = new Float32Array(COUNT * 3); // Chaos
  const targets = new Float32Array(COUNT * 3); // Signal-Form
  const rnd = new Float32Array(COUNT);
  const coreFlag = new Float32Array(COUNT);
  const hue = new Float32Array(COUNT);

  const coreCenter = new THREE.Vector3(2.4, 0.25, 0);
  for (let i = 0; i < COUNT; i++) {
    // Chaos: breit gestreut = Rauschen des Webs
    positions[i * 3] = (Math.random() * 2 - 1) * 9;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * 5;
    positions[i * 3 + 2] = -5 + Math.random() * 4;

    const isCore = Math.random() < 0.62;
    coreFlag[i] = isCore ? 1 : 0;

    // Zufalls-Einheitsvektor
    const u = Math.random() * 2 - 1;
    const t = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const dir = new THREE.Vector3(s * Math.cos(t), s * Math.sin(t), u);

    if (isCore) {
      // dichter, dominanter Kern (weich zur Mitte verdichtet)
      const r = Math.pow(Math.random(), 2.3) * 1.0;
      targets[i * 3] = coreCenter.x + dir.x * r;
      targets[i * 3 + 1] = coreCenter.y + dir.y * r;
      targets[i * 3 + 2] = coreCenter.z + dir.z * r * 0.7;
      hue[i] = Math.random(); // Kern → Violett→Cyan-Ramp über vHue
    } else {
      // geordnete Schale (Aura) um den Kern
      const r = 2.1 + Math.random() * 0.5;
      targets[i * 3] = coreCenter.x + dir.x * r;
      targets[i * 3 + 1] = coreCenter.y + dir.y * r;
      targets[i * 3 + 2] = coreCenter.z + dir.z * r * 0.7;
      hue[i] = Math.random();
    }
    rnd[i] = Math.random();
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
  geo.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));
  geo.setAttribute("aCore", new THREE.BufferAttribute(coreFlag, 1));
  geo.setAttribute("aHue", new THREE.BufferAttribute(hue, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uMode: { value: 0 },
    uCursorActive: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uCursor: { value: new THREE.Vector2(-10, -10) },
    uReveal: { value: 0 },
    uFade: { value: 1 },
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
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  scene.add(points);

  const applyTheme = (t: Theme) => {
    uniforms.uMode.value = t.isLight ? 1 : 0;
    uniforms.uViolet.value.set(t.violet);
    uniforms.uCyan.value.set(t.cyan);
    uniforms.uInk.value.set(t.fg);
    // Blending tauschen: Light = Normal (kein Washout), Dark = Additive (Glow)
    material.blending = t.isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
    material.needsUpdate = true;
  };
  applyTheme(readTheme());
  const themeObserver = new MutationObserver(() => applyTheme(readTheme()));
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Pointer
  const pointerNdc = { x: 0, y: 0 };
  let cursorActiveTarget = 0;
  const handlePointerMove = (e: PointerEvent) => {
    pointerNdc.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerNdc.y = -((e.clientY / window.innerHeight) * 2 - 1);
    cursorActiveTarget = 1;
  };
  window.addEventListener("pointermove", handlePointerMove);

  let halfH = Math.tan((50 * Math.PI) / 360) * 8;
  let halfW = halfH * camera.aspect;
  const resizeObserver = new ResizeObserver(() => {
    const { clientWidth, clientHeight } = canvas;
    if (clientWidth === 0 || clientHeight === 0) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
    halfH = Math.tan((50 * Math.PI) / 360) * camera.position.z;
    halfW = halfH * camera.aspect;
  });
  resizeObserver.observe(canvas);

  let lastFound = false;
  let frameId = 0;
  let startTime = 0;
  let lastTime = 0;

  const animate = (now: number) => {
    if (startTime === 0) {
      startTime = now;
      lastTime = now;
    }
    const elapsed = (now - startTime) / 1000;
    lastTime = now;

    uniforms.uTime.value = elapsed;

    // Auto-Load-Choreografie: kurz Chaos zeigen, dann ins Signal einrasten
    const morphRaw = Math.max(0, Math.min(1, (elapsed - 0.6) / 2.4));
    uniforms.uMorph.value = 1 - Math.pow(1 - morphRaw, 4); // easeOutQuart
    uniforms.uReveal.value = Math.min(elapsed / 0.8, 1);

    // Cursor → Welt-XY
    uniforms.uCursor.value.set(pointerNdc.x * halfW, pointerNdc.y * halfH);
    uniforms.uCursorActive.value = lerp(uniforms.uCursorActive.value, cursorActiveTarget, 0.05);

    // Scroll-Rückzug
    const scrollFraction = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    uniforms.uFade.value = lerp(uniforms.uFade.value, 1 - scrollFraction * 0.9, 0.1);

    // sanfter Kamera-Parallax
    camera.position.x = lerp(camera.position.x, pointerNdc.x * 0.5 + Math.sin(elapsed * 0.1) * 0.3, 0.04);
    camera.position.y = lerp(camera.position.y, pointerNdc.y * 0.35, 0.04);
    camera.lookAt(0.8, 0, 0);

    // "gefunden", sobald das Signal eingerastet ist
    const nowFound = uniforms.uMorph.value > 0.82;
    if (nowFound !== lastFound) {
      lastFound = nowFound;
      window.dispatchEvent(new CustomEvent(nowFound ? "signal:found" : "signal:lost"));
    }

    renderer.render(scene, camera);
    if (active) frameId = window.requestAnimationFrame(animate);
  };

  let active = false;
  let onScreen = true;
  const start = () => {
    if (active) return;
    active = true;
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
      resizeObserver.disconnect();
      if (lastFound) window.dispatchEvent(new CustomEvent("signal:lost"));
      geo.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}

export function SignalField({ className }: { className?: string }) {
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
