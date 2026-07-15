import { ImageResponse } from "next/og";

import { CODE_LINES } from "@/lib/hero-code";

export const runtime = "edge";

/**
 * OG-Image im Brutalist-System der Seite: Zeilen aus echtem, kuratiertem
 * Code (lib/hero-code.ts) als Hintergrund, darüber die Wortmarke + Gloss.
 * Jeder geteilte Link trägt so das Signature-Piece nach draußen.
 */
export async function GET() {
  // 14 Code-Zeilen, deterministisch versetzt — Akzente in Violett/Cyan
  const rows = Array.from({ length: 14 }, (_, i) => {
    const text = CODE_LINES[(i * 3) % CODE_LINES.length];
    const color =
      i % 9 === 3
        ? "rgba(72,209,154,0.35)"
        : i % 7 === 5
          ? "rgba(240,190,94,0.28)"
          : "rgba(234,241,236,0.13)";
    return { text: `${text}  ${text}`, color, shift: -((i * 53) % 140) };
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#060a08",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Code-Zeilen-Hintergrund */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px 0",
          }}
        >
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                whiteSpace: "nowrap",
                fontSize: 22,
                color: row.color,
                marginLeft: row.shift,
              }}
            >
              {row.text}
            </div>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            padding: "48px 72px",
            position: "relative",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(234,241,236,0.6)",
                fontSize: 22,
                letterSpacing: 4,
              }}
            >
              WEBDESIGN HANNOVER · DEUTSCHLANDWEIT
            </span>
            <span
              style={{
                color: "#48d19a",
                fontSize: 22,
                letterSpacing: 2,
              }}
            >
              fatih.gueler75@gmail.com
            </span>
          </div>

          {/* Wortmarke */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: "#eaf1ec",
                fontSize: 164,
                fontWeight: 800,
                letterSpacing: -8,
                lineHeight: 1,
              }}
            >
              GÜLER.DEV
            </div>
            <div
              style={{
                display: "flex",
                color: "#48d19a",
                fontSize: 26,
                marginTop: 14,
                letterSpacing: 3,
              }}
            >
              güler (tr.) — der/die lacht.
            </div>
          </div>

          {/* Bottom bar: harter Invert-Block */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                background: "#f1f5f9",
                color: "#04040a",
                fontSize: 30,
                fontWeight: 800,
                padding: "14px 28px",
                letterSpacing: 1,
              }}
            >
              Websites, die Kunden bringen.
            </div>
            <div
              style={{
                display: "flex",
                border: "2px solid rgba(234,241,236,0.4)",
                color: "rgba(234,241,236,0.8)",
                fontSize: 24,
                fontWeight: 600,
                padding: "14px 24px",
                marginLeft: 16,
              }}
            >
              One Pager ab 500€ · Business ab 1.500€
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
