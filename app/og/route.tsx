import { ImageResponse } from "next/og";

import { hero, site } from "@/lib/content";

export const runtime = "edge";

const PAPER = "#f3f2ed";
const INK = "#121110";
const SIGNAL = "#c6ff00";

/**
 * OG-Bild im Werkstattzettel-System: Papier, sichtbares 12er-Raster,
 * Kernaussage riesig, „Zum Festpreis." als gedrehter Signal-Stempel.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: PAPER,
          color: INK,
          position: "relative",
          border: `12px solid ${INK}`,
        }}
      >
        {/* Raster-Hilfslinien */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderLeft: i === 0 ? "none" : "1px solid rgba(18,17,16,0.15)",
              }}
            />
          ))}
        </div>

        {/* Kopfzeile */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `4px solid ${INK}`,
            padding: "18px 40px",
            fontSize: 22,
            letterSpacing: 3,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 22, height: 22, background: SIGNAL, marginRight: 14 }} />
            GÜLER.DEV
          </div>
          <div style={{ display: "flex" }}>WEBDESIGN HANNOVER · DEUTSCHLANDWEIT</div>
        </div>

        {/* Kernaussage */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "0 40px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: -4,
              maxWidth: 1080,
            }}
          >
            {hero.lines[0]}
          </div>
          <div style={{ display: "flex", marginTop: 18 }}>
            <div
              style={{
                display: "flex",
                background: SIGNAL,
                border: `4px solid ${INK}`,
                boxShadow: `10px 10px 0 0 ${INK}`,
                fontSize: 92,
                fontWeight: 900,
                letterSpacing: -3,
                padding: "4px 22px 0",
                transform: "rotate(-3deg)",
              }}
            >
              {hero.lines[1]}
            </div>
          </div>
        </div>

        {/* Fußzeile */}
        <div
          style={{
            display: "flex",
            borderTop: `4px solid ${INK}`,
            fontSize: 24,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", padding: "18px 40px", borderRight: `4px solid ${INK}`, flex: 1 }}>
            One Pager ab 1.000 € · Business ab 2.500 €
          </div>
          <div style={{ display: "flex", padding: "18px 40px", background: INK, color: PAPER }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
