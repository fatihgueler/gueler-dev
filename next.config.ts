import type { NextConfig } from "next";
import path from "node:path";
import { execSync } from "node:child_process";

/** Build-Stempel: echter Commit-Hash + Datum (Entwickler-Echtheit im Footer). */
function buildStamp() {
  let hash = "dev";
  try {
    hash = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    /* Kein Git im Build-Kontext → "dev" */
  }
  return { hash, date: new Date().toISOString().slice(0, 10) };
}
const stamp = buildStamp();

/**
 * Content-Security-Policy — aufgebaut aus dem TATSÄCHLICHEN Bedarf der Codebasis:
 * - Fonts: next/font → selbst gehostet (font-src 'self'); Calendly-Fonts erlaubt.
 * - Calendly: widget.js/.css (assets.calendly.com), Popup-iframe (calendly.com).
 * - OpenStreetMap: Embed-iframe (www.openstreetmap.org).
 * - Inline: next-themes-Theme-Script, Preloader-Script, JSON-LD, Next-Bootstrap
 *   → script-src 'unsafe-inline' (bewusst statt Nonce, damit statisches Rendering
 *   und damit die Performance erhalten bleiben); framer-motion/Next-Inline-Styles
 *   → style-src 'unsafe-inline' (dokumentierter Trade-off).
 * Keine Analytics geladen (Consent-Gate ist bislang nur Vorbereitung).
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "img-src 'self' data: https://assets.calendly.com https://calendly.com",
  "font-src 'self' https://assets.calendly.com",
  "connect-src 'self' https://calendly.com https://assets.calendly.com",
  "frame-src https://calendly.com https://assets.calendly.com https://www.openstreetmap.org",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  env: {
    NEXT_PUBLIC_BUILD_HASH: stamp.hash,
    NEXT_PUBLIC_BUILD_DATE: stamp.date,
  },
  // Verhindert, dass Next bei mehreren Lockfiles ein falsches Workspace-Root wählt.
  outputFileTracingRoot: path.resolve(),
  // 'standalone' erzeugt einen self-contained Build (ideal für Docker / eigenen Server).
  // Für Vercel ist diese Zeile unschädlich, kann dort aber auch entfernt werden.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },

};

export default nextConfig;
