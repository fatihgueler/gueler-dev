"use client";

import * as React from "react";

import { lerp } from "@/lib/motion";
import { createChapterTracker } from "@/components/three/chapter";

/**
 * Mobile Signal-Szene: dieselbe Fünf-Kapitel-Erzählung wie SignalSpine,
 * aber als 2D-Canvas mit ~1.200 Partikeln — three.js wird auf Mobilgeräten
 * GAR NICHT geladen (Audit: „Mobile verdient auch Kino", Budget: 0 kB WebGL
 * auf schwachen Geräten). Theme-aware über dieselben CSS-Klassen.
 */

const COUNT = 1200;
const CLUSTERS: Array<[number, number]> = [
  [0.28, 0.32],
  [0.74, 0.28],
  [0.3, 0.72],
  [0.72, 0.68],
];

type Particle = {
  // Alle Lagen in relativen [0..1]-Koordinaten
  chaosX: number;
  chaosY: number;
  orbitA: number;
  orbitR: number;
  gridX: number;
  gridY: number;
  clusterIdx: number;
  clusterR: number;
  clusterA: number;
  rnd: number;
  hue: number; // 0 violet … 1 cyan
};

function weight(c: number, i: number) {
  return Math.max(0, 1 - Math.abs(c - i));
}

export function SignalSpineMobile() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const cols = Math.ceil(Math.sqrt(COUNT * 1.6));
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        chaosX: Math.random(),
        chaosY: Math.random(),
        orbitA: Math.random() * Math.PI * 2,
        orbitR: 0.16 + Math.random() * 0.1,
        gridX: ((i % cols) + 0.5) / cols + (Math.random() - 0.5) * 0.02,
        gridY: (Math.floor(i / cols) + 0.5) / Math.ceil(COUNT / cols) + (Math.random() - 0.5) * 0.02,
        clusterIdx: i % CLUSTERS.length,
        clusterR: Math.pow(Math.random(), 1.8) * 0.13,
        clusterA: Math.random() * Math.PI * 2,
        rnd: Math.random(),
        hue: Math.random(),
      });
    }

    const chapters = createChapterTracker();
    chapters.measure();

    let dpr = Math.min(window.devicePixelRatio, 1.5);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      chapters.measure();
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("load", chapters.measure);

    let chapterSmooth = 0;
    let frameId = 0;
    let active = true;
    let startTime = 0;

    const isLight = () => document.documentElement.classList.contains("light");

    const animate = (now: number) => {
      if (!active) return;
      if (startTime === 0) startTime = now;
      const t = (now - startTime) / 1000;
      chapterSmooth = lerp(chapterSmooth, chapters.value(), 0.07);
      const c = chapterSmooth;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const light = isLight();
      const reveal = Math.min(t / 0.8, 1);
      // Intro-Morph wie beim großen Bruder: Chaos → Orbit
      const morph = 1 - Math.pow(1 - Math.max(0, Math.min(1, (t - 0.5) / 2.2)), 4);

      const w0 = weight(c, 0);
      const w1 = weight(c, 1);
      const w2 = weight(c, 2);
      const w3 = weight(c, 3);
      const w45 = weight(c, 4) + weight(c, 5);
      const alphaProfile =
        w0 * 1 + w1 * 0.5 + w2 * 0.45 + w3 * 0.7 + weight(c, 4) * 0.5 + weight(c, 5) * 0.35;

      // Orbit-Zentrum im Hero: rechts-mittig (Text steht links)
      const cx = 0.68;
      const cy = 0.42;

      for (const p of particles) {
        const wobX = Math.sin(t * 0.7 + p.rnd * 6.28) * 0.015;
        const wobY = Math.cos(t * 0.6 + p.rnd * 4.1) * 0.015;

        // Zustand 0: Chaos → Orbit
        const oa = p.orbitA + t * 0.1;
        const orbX = cx + Math.cos(oa) * p.orbitR;
        const orbY = cy + Math.sin(oa) * p.orbitR * 1.25;
        const s0x = p.chaosX + (orbX - p.chaosX) * morph;
        const s0y = p.chaosY + (orbY - p.chaosY) * morph;

        // Zustand 1: Zerstreuung
        const s1x = p.chaosX + wobX * 3;
        const s1y = p.chaosY + wobY * 3;

        // Zustand 2: Gitter
        const s2x = p.gridX + wobX * 0.4;
        const s2y = p.gridY + wobY * 0.4;

        // Zustand 3: Cluster
        const cl = CLUSTERS[p.clusterIdx];
        const ca = p.clusterA + t * 0.15;
        const s3x = cl[0] + Math.cos(ca) * p.clusterR;
        const s3y = cl[1] + Math.sin(ca) * p.clusterR;

        // Zustand 4/5: weite Konstellation
        const s4x = 0.5 + (p.gridX - 0.5) * 1.15 + wobX;
        const s4y = 0.5 + (p.gridY - 0.5) * 1.1 + wobY;

        const x = (s0x * w0 + s1x * w1 + s2x * w2 + s3x * w3 + s4x * w45) * w;
        const y = (s0y * w0 + s1y * w1 + s2y * w2 + s3y * w3 + s4y * w45) * h;

        const violet = light ? "124,58,237" : "139,92,246";
        const cyan = light ? "8,145,178" : "34,211,238";
        const col = p.hue < 0.55 ? violet : cyan;
        const baseA = light ? 0.5 : 0.6;
        const a = baseA * alphaProfile * reveal * (0.5 + p.rnd * 0.5);
        const r = (0.8 + p.rnd * 1.1) * dpr;

        ctx.fillStyle = `rgba(${col},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      frameId = window.requestAnimationFrame(animate);
    };
    frameId = window.requestAnimationFrame(animate);

    const handleVisibility = () => {
      if (document.hidden) {
        active = false;
        window.cancelAnimationFrame(frameId);
      } else if (!active) {
        active = true;
        frameId = window.requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      active = false;
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", chapters.measure);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="h-full w-full" />;
}
