// @ts-nocheck
/**
 * Platzhalter-Bildsequenz für das Kapitel "Der Prozess" (Feature B / Technik 1).
 *
 * Generiert 150 text-freie, abstrakt-geometrische Frames in der Site-Palette,
 * die sich sichtbar von verstreuten Fragmenten zu einer Struktur zusammensetzen
 * — gerastert über SVG → sharp → WebP, in zwei Auflösungen:
 *   public/sequence/lg/frame_0001.webp … (1600×900, Desktop)
 *   public/sequence/sm/frame_0001.webp … (800×450,  Mobile)
 *
 * Die Beats sind rein visuell angedeutet (der Beat-TEXT liegt als DOM-Overlay
 * in der Komponente, nicht im Bild):
 *   Anforderung (0–35)  · Struktur (35–75) · Design (75–110) · Launch (110–150)
 *
 * Asset-Strategie: Nur die Dateien tauschen (echte Blender-Renderings) — die
 * Komponente lädt ausschließlich über frameSrc(), kein Code-Eingriff nötig.
 *
 * Aufruf:  node scripts/generate-placeholder-sequence.mjs
 */

import sharp from "sharp";
import { mkdir, rm, readdir, stat } from "node:fs/promises";
import path from "node:path";

const TOTAL = 150;
const W = 1600;
const H = 900;
const SM_W = 800;
const SM_H = 450;
const STAGGER = 0.4;
const N = 48;

const OUT_LG = path.join("public", "sequence", "lg");
const OUT_SM = path.join("public", "sequence", "sm");

// Pine-Palette (Design-System 4.0): tiefes Grün + Bernstein.
const C = {
  bg: "#060a08",
  fg: "#eaf1ec",
  muted: "#90a497",
  violet: "#0e7a50", // Emerald-Fill
  violet3: "#48d19a", // Emerald-Akzent
  cyan: "#e9a93b", // Bernstein
  cyan2: "#f0be5e", // Bernstein hell
};

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t) => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};
const lerp = (a, b, t) => a + (b - a) * t;
const r2 = (n) => Math.round(n * 100) / 100;

// ── Fragmente einmalig deterministisch aufbauen (stabile Identität) ─────
const rand = mulberry32(4242);
const cols = 8;
const rows = 6;
const areaW = W * 0.64;
const areaH = H * 0.62;
const ax = (W - areaW) / 2;
const ay = (H - areaH) / 2;
const cellW = areaW / cols;
const cellH = areaH / rows;

const frags = [];
for (let i = 0; i < N; i++) {
  const c = i % cols;
  const r = Math.floor(i / cols) % rows;
  const pad = cellW * 0.16;
  const tw = cellW - 2 * pad;
  const th = cellH * (0.32 + rand() * 0.5);
  const tx = ax + c * cellW + pad + tw / 2;
  const ty = ay + r * cellH + cellH / 2;
  frags.push({
    tx,
    ty,
    tw,
    th,
    sx: rand() * W,
    sy: rand() * H,
    srot: (rand() - 0.5) * 140,
    sscale: 0.35 + rand() * 1.3,
    delay: rand() * STAGGER,
    outline: rand() > 0.5, // Blueprint-Kontur vs. Füllung
    accent: rand(), // Farbrolle (tint während Design/Launch)
  });
}

/** Ein Frame als SVG-String (viewBox fix → beide Auflösungen scharf). */
function frameSVG(frame, w, h) {
  const t = frame / (TOTAL - 1);
  const st = smooth(t);
  let els = `<rect width="${W}" height="${H}" fill="${C.bg}"/>`;

  // Blueprint-Raster, Intensität wächst mit dem Fortschritt
  const gridA = r2(lerp(0.02, 0.11, st));
  let grid = `<g stroke="${C.cyan}" stroke-width="1" opacity="${gridA}">`;
  for (let gx = 1; gx < 12; gx++) {
    const x = r2((gx / 12) * W);
    grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`;
  }
  for (let gy = 1; gy < 7; gy++) {
    const y = r2((gy / 7) * H);
    grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;
  }
  els += grid + "</g>";

  // Fragmente: verstreut → Zielraster
  for (const f of frags) {
    const local = smooth((t - f.delay) / (1 - STAGGER));
    const cx = r2(lerp(f.sx, f.tx, local));
    const cy = r2(lerp(f.sy, f.ty, local));
    const rot = r2(lerp(f.srot, 0, local));
    const scale = r2(lerp(f.sscale, 1, local));
    const op = r2(lerp(0.08, 0.92, local));

    // Farbrolle: Grundton monochrom; ab "Design" tinten einige Fragmente,
    // ab "Launch" glühen wenige Akzente auf.
    let fill = C.fg;
    let stroke = C.muted;
    if (t > 0.5 && f.accent > 0.72) {
      fill = C.violet3;
      stroke = C.violet3;
    }
    if (t > 0.72 && f.accent > 0.86) {
      fill = C.cyan2;
      stroke = C.cyan2;
    }

    const x = r2(-f.tw / 2);
    const y = r2(-f.th / 2);
    const wRect = r2(f.tw);
    const hRect = r2(f.th);
    const paint = f.outline
      ? `fill="none" stroke="${stroke}" stroke-width="${r2(2 / scale)}"`
      : `fill="${fill}" stroke="none"`;
    els +=
      `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${scale})" opacity="${op}">` +
      `<rect x="${x}" y="${y}" width="${wRect}" height="${hRect}" ${paint}/></g>`;
  }

  // Launch-Signatur: eine kräftige Grundlinie zieht sich ein (110–150).
  if (t > 0.72) {
    const p = smooth((t - 0.72) / 0.28);
    const lineW = r2(areaW * p);
    const ly = r2(ay + areaH + cellH * 0.5);
    els +=
      `<rect x="${r2(ax)}" y="${ly}" width="${lineW}" height="6" fill="${C.violet}"/>` +
      `<rect x="${r2(ax)}" y="${r2(ly + 10)}" width="${r2(lineW * 0.6)}" height="3" fill="${C.cyan}" opacity="0.8"/>`;
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${w}" height="${h}">` +
    els +
    `</svg>`
  );
}

async function dirSize(dir) {
  let total = 0;
  for (const name of await readdir(dir)) {
    total += (await stat(path.join(dir, name))).size;
  }
  return total;
}

async function main() {
  await rm(OUT_LG, { recursive: true, force: true });
  await rm(OUT_SM, { recursive: true, force: true });
  await mkdir(OUT_LG, { recursive: true });
  await mkdir(OUT_SM, { recursive: true });

  for (let i = 0; i < TOTAL; i++) {
    const name = `frame_${String(i + 1).padStart(4, "0")}.webp`;
    const svgLg = Buffer.from(frameSVG(i, W, H));
    const svgSm = Buffer.from(frameSVG(i, SM_W, SM_H));
    await sharp(svgLg)
      .webp({ quality: 72, effort: 5 })
      .toFile(path.join(OUT_LG, name));
    await sharp(svgSm)
      .webp({ quality: 66, effort: 5 })
      .toFile(path.join(OUT_SM, name));
    if ((i + 1) % 25 === 0) console.log(`  … ${i + 1}/${TOTAL} Frames`);
  }

  const lgBytes = await dirSize(OUT_LG);
  const smBytes = await dirSize(OUT_SM);
  const mb = (b) => (b / (1024 * 1024)).toFixed(2);
  console.log(`\nFertig: ${TOTAL} Frames × 2 Auflösungen`);
  console.log(`  lg (1600×900): ${mb(lgBytes)} MB  (Limit 10 MB)`);
  console.log(`  sm (800×450):  ${mb(smBytes)} MB  (Limit 4 MB)`);
  if (lgBytes > 10 * 1024 * 1024 || smBytes > 4 * 1024 * 1024) {
    console.error("⚠️  Größenlimit überschritten — Qualität senken.");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
