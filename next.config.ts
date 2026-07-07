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

const nextConfig: NextConfig = {
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
