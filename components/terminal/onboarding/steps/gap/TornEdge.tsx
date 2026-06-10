"use client";

import React from "react";

interface TornEdgeProps {
  side: "left" | "right";
  pathRef: React.Ref<SVGPathElement>;
}

export const BORDER_W = 14; // px: width of each torn-edge SVG strip
export const BORDER_CX = BORDER_W / 2; // = 7, center x of the strip
export const BORDER_VB_H = 1000; // SVG internal viewBox height

// ─────────────────────────────────────────────────────────────────────────────
// Torn-edge path — small jagged zigzag, centered at x=BORDER_CX within BORDER_W
// Spikes: ±3–4 px from center (small as requested)
// ─────────────────────────────────────────────────────────────────────────────
export const BORDER_PATH_D = (
  [
    [BORDER_CX, 0],
    [BORDER_CX - 3, BORDER_VB_H * 0.065],
    [BORDER_CX + 4, BORDER_VB_H * 0.13],
    [BORDER_CX - 3, BORDER_VB_H * 0.195],
    [BORDER_CX + 4, BORDER_VB_H * 0.26],
    [BORDER_CX - 3, BORDER_VB_H * 0.325],
    [BORDER_CX + 4, BORDER_VB_H * 0.39],
    [BORDER_CX - 3, BORDER_VB_H * 0.455],
    [BORDER_CX + 4, BORDER_VB_H * 0.52],
    [BORDER_CX - 3, BORDER_VB_H * 0.585],
    [BORDER_CX + 4, BORDER_VB_H * 0.65],
    [BORDER_CX - 3, BORDER_VB_H * 0.715],
    [BORDER_CX + 4, BORDER_VB_H * 0.78],
    [BORDER_CX - 3, BORDER_VB_H * 0.845],
    [BORDER_CX + 4, BORDER_VB_H * 0.91],
    [BORDER_CX - 3, BORDER_VB_H * 0.975],
    [BORDER_CX, BORDER_VB_H],
  ] as [number, number][]
)
  .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`)
  .join(" ");

const TornEdge: React.FC<TornEdgeProps> = ({ side, pathRef }) => (
  <svg
    style={{
      position: "absolute",
      // Overlap slightly into the gap so the glow bleeds outward
      [side === "left" ? "right" : "left"]: -(BORDER_W / 2),
      // The parent half starts at top: -10vh (120% trick), so shift down 10vh
      // to align the path with the actual viewport top.
      top: "10vh",
      width: BORDER_W,
      height: "100vh",
      overflow: "visible",
      pointerEvents: "none",
      // CSS filter is NOT clipped by clip-path (none here), so glow is free
      filter: `drop-shadow(0 0 2px ${side === "right" ? "#ffb000" : "#00ff41"}) drop-shadow(0 0 6px ${side === "right" ? "#ffb000" : "#00ff41"})`,
    }}
    viewBox={`0 0 ${BORDER_W} ${BORDER_VB_H}`}
    preserveAspectRatio="none"
  >
    <path
      ref={pathRef}
      d={BORDER_PATH_D}
      stroke={side === "right" ? "#ffb000" : "#00ff41"}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default TornEdge;
