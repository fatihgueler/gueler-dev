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
  // Kanonische Variante: non-www (https://guelerdev.de).
  // Jeder Aufruf über www.* wird dauerhaft auf die non-www-Domain
  // umgeleitet – verhindert Duplicate Content und hält die URLs konsistent.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.guelerdev.de" }],
        destination: "https://guelerdev.de/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
