"use client";

import React from "react";

const BORDER_H = 14;
const BORDER_CY = BORDER_H / 2;
const BORDER_VB_W = 1000;

const BORDER_PATH_D = (
  [
    [0, BORDER_CY],
    [BORDER_VB_W * 0.065, BORDER_CY - 3],
    [BORDER_VB_W * 0.13, BORDER_CY + 4],
    [BORDER_VB_W * 0.195, BORDER_CY - 3],
    [BORDER_VB_W * 0.26, BORDER_CY + 4],
    [BORDER_VB_W * 0.325, BORDER_CY - 3],
    [BORDER_VB_W * 0.39, BORDER_CY + 4],
    [BORDER_VB_W * 0.455, BORDER_CY - 3],
    [BORDER_VB_W * 0.52, BORDER_CY + 4],
    [BORDER_VB_W * 0.585, BORDER_CY - 3],
    [BORDER_VB_W * 0.65, BORDER_CY + 4],
    [BORDER_VB_W * 0.715, BORDER_CY - 3],
    [BORDER_VB_W * 0.78, BORDER_CY + 4],
    [BORDER_VB_W * 0.845, BORDER_CY - 3],
    [BORDER_VB_W * 0.91, BORDER_CY + 4],
    [BORDER_VB_W * 0.975, BORDER_CY - 3],
    [BORDER_VB_W, BORDER_CY],
  ] as [number, number][]
)
  .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`)
  .join(" ");

interface TornEdgeHorizontalProps {
  side: "top" | "bottom";
  pathRef: React.Ref<SVGPathElement>;
}

const TornEdgeHorizontal: React.FC<TornEdgeHorizontalProps> = ({
  side,
  pathRef,
}) => {
  const color = side === "top" ? "#00ff41" : "#ffb000";
  return (
    <svg
      style={{
        position: "absolute",
        // Bleed slightly into the gap so the glow bridges both halves
        [side === "top" ? "bottom" : "top"]: -(BORDER_H / 2),
        left: 0,
        width: "100%",
        height: BORDER_H,
        overflow: "visible",
        pointerEvents: "none",
        filter: `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 6px ${color})`,
      }}
      viewBox={`0 0 ${BORDER_VB_W} ${BORDER_H}`}
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d={BORDER_PATH_D}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default TornEdgeHorizontal;
