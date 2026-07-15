/**
 * Text-Sampling für die Hero-Assembly (Feature A / Technik 2).
 *
 * Rastert einen Schriftzug ("GÜLER.DEV") auf einem Offscreen-Canvas,
 * liest die Pixel-Alpha und liefert daraus eine feste Anzahl 3D-Zielpunkte
 * (zentriert um den Ursprung, y nach oben). Diese Punkte sind die
 * Zielpositionen, an die die verstreuten 3D-Fragmente beim Scrollen fliegen.
 *
 * Läuft ausschließlich clientseitig (nutzt document); bei SSR oder fehlendem
 * 2D-Context fällt die Funktion auf ein deterministisches Raster zurück,
 * damit die Komponente nie ohne Ziele dasteht.
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface SampleResult {
  /** Zielpunkte (zentriert um den Ursprung, y nach oben). */
  targets: Vec3[];
  /** Rasterzellengröße in Welteinheiten — Tile-Größe für lückenlose Glyphen. */
  cell: number;
}

export interface SampleTextOptions {
  /** Gewünschte Anzahl Zielpunkte (= Fragmentanzahl). */
  count: number;
  /** Font-Family für die Buchstabenform (CSS-Wert). */
  fontFamily?: string;
  /** Font-Weight der Probe. */
  fontWeight?: number | string;
  /** Breite des Schriftzugs in Three.js-Welteinheiten. */
  worldWidth?: number;
  /** Seed für die deterministische Auswahl/Streuung. */
  seed?: number;
}

const DEFAULTS = {
  fontFamily: "system-ui, sans-serif",
  fontWeight: 800 as number | string,
  worldWidth: 9,
  seed: 1337,
};

/** Kleiner, schneller, deterministischer PRNG (mulberry32). */
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fallback: gleichmäßiges Raster, falls kein Canvas verfügbar ist. */
function fallbackGrid(count: number, worldWidth: number): Vec3[] {
  const pts: Vec3[] = [];
  const cols = Math.max(1, Math.ceil(Math.sqrt(count * 4)));
  for (let i = 0; i < count; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    pts.push({
      x: (c / (cols - 1 || 1) - 0.5) * worldWidth,
      y: (0.5 - r / (cols - 1 || 1)) * worldWidth * 0.3,
      z: 0,
    });
  }
  return pts;
}

/**
 * Liefert ~`count` 3D-Zielpunkte, die die Form von `text` als gleichmäßiges
 * Raster nachzeichnen (lesbare Low-Res-Stencil-Wortmarke statt Punktwolke),
 * plus die passende Tile-Größe. Zentriert um (0,0,0); x/y in Welteinheiten.
 */
export function sampleTextTargets(
  text: string,
  opts: SampleTextOptions,
): SampleResult {
  const count = Math.max(1, Math.floor(opts.count));
  const fontFamily = opts.fontFamily ?? DEFAULTS.fontFamily;
  const fontWeight = opts.fontWeight ?? DEFAULTS.fontWeight;
  const worldWidth = opts.worldWidth ?? DEFAULTS.worldWidth;
  const rand = mulberry32(opts.seed ?? DEFAULTS.seed);

  const fallback = (): SampleResult => ({
    targets: fallbackGrid(count, worldWidth),
    cell: (worldWidth / Math.ceil(Math.sqrt(count * 4))) * 0.9,
  });

  if (typeof document === "undefined") return fallback();

  // Hohe Sampling-Auflösung → genug feine Rasterzellen für tausende Partikel.
  const W = 720;
  const probe = 140;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return fallback();

  // Schrift so skalieren, dass der Text ~92 % der Sampling-Breite füllt.
  ctx.font = `${fontWeight} ${probe}px ${fontFamily}`;
  const probeW = ctx.measureText(text).width || probe;
  const fontSize = (probe * (W * 0.92)) / probeW;

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const m = ctx.measureText(text);
  const ascent = m.actualBoundingBoxAscent || fontSize * 0.78;
  const descent = m.actualBoundingBoxDescent || fontSize * 0.22;
  const textH = ascent + descent;
  const H = Math.max(2, Math.ceil(textH * 1.3));

  canvas.width = W;
  canvas.height = H;
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText(text, W / 2, H / 2);

  const data = ctx.getImageData(0, 0, W, H).data;
  const inside = (x: number, y: number) => data[(y * W + x) * 4 + 3] > 140;

  // Glyph-Fläche zählen → Rasterweite g, sodass ~count Zellen im Glyph liegen.
  let area = 0;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) if (inside(x, y)) area++;
  if (area === 0) return fallback();

  const collect = (g: number) => {
    const pts: { x: number; y: number }[] = [];
    const off = Math.floor(g / 2);
    for (let y = off; y < H; y += g)
      for (let x = off; x < W; x += g) if (inside(x, y)) pts.push({ x, y });
    return pts;
  };

  let g = Math.max(2, Math.round(Math.sqrt(area / count)));
  let pts = collect(g);
  // g anpassen, bis die Zellenzahl nahe an count liegt.
  let guard = 0;
  while (pts.length > count * 1.15 && guard < 8) {
    g += 1;
    pts = collect(g);
    guard++;
  }
  while (pts.length < count * 0.85 && g > 2 && guard < 16) {
    g -= 1;
    pts = collect(g);
    guard++;
  }
  if (pts.length === 0) return fallback();

  // Raster ist bereits gleichmäßig → nur überzählige Zellen zufällig kürzen.
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  const chosen = pts.slice(0, Math.min(count, pts.length));

  const scale = worldWidth / W;
  const targets: Vec3[] = chosen.map((p) => ({
    x: (p.x - W / 2) * scale,
    y: -(p.y - H / 2) * scale, // Canvas-y zeigt nach unten → invertieren
    z: 0, // koplanar → frontal klar lesbar
  }));

  // Falls weniger Zellen als count: bestehende Punkte leicht jittern.
  while (targets.length < count) {
    const src = targets[Math.floor(rand() * targets.length)] ?? {
      x: 0,
      y: 0,
      z: 0,
    };
    targets.push({
      x: src.x + (rand() - 0.5) * 0.15,
      y: src.y + (rand() - 0.5) * 0.15,
      z: 0, // koplanar → frontal klar lesbar
    });
  }

  return { targets, cell: g * scale };
}
