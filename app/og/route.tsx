import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Yeris Tech & Resources LLC";
  const kicker = searchParams.get("kicker") ?? "Product Studio";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "oklch(0.09 0.005 240)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 500,
              color: "oklch(0.98 0.002 240)",
              letterSpacing: "-0.02em",
            }}
          >
            Yeris
          </span>
          <span style={{ fontSize: "24px", color: "oklch(0.78 0.18 75)" }}>.</span>
        </div>

        {/* Center: kicker + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "oklch(0.78 0.18 75)",
            }}
          >
            {kicker}
          </span>
          <h1
            style={{
              fontSize: title.length > 40 ? "52px" : "64px",
              fontWeight: 500,
              color: "oklch(0.98 0.002 240)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom: domain */}
        <span
          style={{
            fontSize: "16px",
            fontFamily: "monospace",
            color: "oklch(0.65 0.015 240)",
            letterSpacing: "0.05em",
          }}
        >
          yeristech.com
        </span>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
