import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
