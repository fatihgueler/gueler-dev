import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#0d0d0d",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -150,
            left: -150,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle, #2a2a2a 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
            opacity: 0.8,
            display: "flex",
          }}
        />
        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "56px 80px",
            flex: 1,
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Logo bar */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#7c3aed",
                marginRight: 12,
              }}
            />
            <span
              style={{
                color: "#7c3aed",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 4,
                marginRight: 14,
              }}
            >
              GÜLER.DEV
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 18,
                letterSpacing: 1,
              }}
            >
              · Webdesign Hannover
            </span>
          </div>

          {/* Headline block */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#7c3aed",
                  marginRight: 10,
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 20,
                  letterSpacing: 2,
                }}
              >
                Webentwickler für KMU · Hannover
              </span>
            </div>
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: 80,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -2,
              }}
            >
              Websites, die
            </div>
            <div
              style={{
                display: "flex",
                color: "#7c3aed",
                fontSize: 80,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -2,
                marginBottom: 20,
              }}
            >
              Kunden bringen.
            </div>
            <div
              style={{
                display: "flex",
                color: "rgba(255,255,255,0.45)",
                fontSize: 24,
                fontWeight: 400,
              }}
            >
              Modern, schnell & auf Wachstum ausgelegt.
            </div>
          </div>

          {/* Footer bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 18 }}>
              fatih.gueler75@gmail.com · Hannover
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.45)",
                borderRadius: 100,
                padding: "12px 30px",
              }}
            >
              <span
                style={{
                  color: "#7c3aed",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                One-Pager ab 500 € · Business-Website ab 1.500 €
              </span>
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
