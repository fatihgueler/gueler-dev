import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
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
