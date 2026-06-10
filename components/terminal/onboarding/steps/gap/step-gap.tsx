"use client";
import { useRef, useState } from "react";
import TornEdge from "./TornEdge";
import { LogoAssembly } from "./helpers";
import useStepGap from "./useStepGap";
import useStepGapOnLoad from "./useStepGapOnLoad";
import useMobile from "@/hooks/useMobile";

// ─────────────────────────────────────────────────────────────────────────────
// Layout constants
// ─────────────────────────────────────────────────────────────────────────────
export const GAP = 400; // px: total gap width (larger as requested)
export const SNAP_THRESHOLD = 90; // px: remaining gap that triggers magnetic snap
export const GAP_MOBILE = 300; // px: gap on mobile — keeps labels peeking in from sides
export const SNAP_THRESHOLD_MOBILE = 35; // px: remaining gap that triggers magnetic snap

// ─────────────────────────────────────────────────────────────────────────────
// Animation constants — every timing lives here
// ─────────────────────────────────────────────────────────────────────────────
export const ANIM = {
  // 1. initial pause
  initialDelay: 0.35, // s

  // 2. jolt
  joltX: 14, // px: horizontal jolt
  joltDuration: 0.08, // s

  // 3. halves split + torn edges draw — all at the same time
  splitDuration: 0.85, // s
  splitEase: "power4.out",
  splitRotation: 1, // deg: tilt per half
  borderEase: "power3.out", // torn-edge draw ease (slightly different feel)

  // 4. gap text
  gapFadeIn: 0.45, // s

  // 5. snap (magnetic) and snap-back (released before threshold)
  snapDuration: 0.5,
  snapEase: "elastic.out(1.1, 0.42)",
  snapMergeDelay: 0.42,
  snapBackDuration: 0.65,
  snapBackEase: "elastic.out(1, 0.45)",

  // 6. merge
  flashDuration: 0.5,
  assemblyDelay: 0.3,
  assemblyCharMs: 52,
  taglineDelay: 0.4,
  nextBtnDelay: 0.55,
} as const;

export const LOGO_FULL = "yeris[tech+resources]_"; // 22 chars

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
type Phase = "splitting" | "idle" | "dragging" | "snapping" | "assembling";

interface StepGapProps {
  lang: "en" | "es";
  onNext: (n: number) => void;
}

export function StepGap({ lang, onNext }: StepGapProps) {
  const isMobile = useMobile();
  const [phase, setPhase] = useState<Phase>("splitting");
  const [assembled, setAssembled] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [showNext, setShowNext] = useState(false);

  // Half wrappers (GSAP moves these)
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Labels
  const leftLabelRef = useRef<HTMLDivElement>(null);
  const rightLabelRef = useRef<HTMLDivElement>(null);

  // Torn-edge SVG paths (one per half)
  const leftBorderRef = useRef<SVGPathElement>(null);
  const rightBorderRef = useRef<SVGPathElement>(null);

  // Overlay elements
  const gapTextRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);

  // Mutable drag state — zero re-renders during drag
  const closureRef = useRef(0);
  const dragRef = useRef<{
    startX: number;
    startClosure: number;
    half: "left" | "right";
  } | null>(null);

  useStepGapOnLoad({
    leftRef,
    rightRef,
    gapTextRef,
    flashRef,
    assemblyRef,
    leftBorderRef,
    rightBorderRef,
    setPhase,
  });

  const { handlePointerUp, handlePointerDown, handlePointerMove } = useStepGap({
    dragRef,
    closureRef,
    phase,
    setPhase,
    leftRef,
    gapTextRef,
    rightRef,
    flashRef,
    assemblyRef,
    leftBorderRef,
    rightBorderRef,
    leftLabelRef,
    rightLabelRef,
    setAssembled,
    setShowTagline,
    setShowNext,
  });

  // ── Styles ───────────────────────────────────────────────────────────────
  const halfCursor =
    phase === "idle"
      ? "ew-resize"
      : phase === "dragging"
        ? "grabbing"
        : "default";

  // Oversized height to prevent rotated corners from peeking out.
  // zIndex: 2 keeps halves above the gap text so they cover it as they close.
  const halfBase: React.CSSProperties = {
    position: "absolute",
    top: "-10%",
    height: "120%",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: halfCursor,
    userSelect: "none",
    zIndex: 2,
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1000,
        overflow: "hidden",
        background: "#020202",
      }}
    >
      {/* ── Left half ─────────────────────────────────────────────────── */}
      <div
        ref={leftRef}
        style={{ ...halfBase, left: 0, background: "#030803" }}
        onPointerDown={handlePointerDown("left")}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div ref={leftLabelRef} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: isMobile ? "22px" : "36px",
              fontWeight: 700,
              color: "#00ff41",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow: "0 0 28px rgba(0,255,65,0.35)",
            }}
          >
            Software
          </div>
        </div>

        {/* Torn right edge — glowing jagged border, draws top→bottom with split */}
        <TornEdge side="left" pathRef={leftBorderRef} />
      </div>

      {/* ── Right half ────────────────────────────────────────────────── */}
      <div
        ref={rightRef}
        style={{ ...halfBase, right: 0, background: "#0e0a00" }}
        onPointerDown={handlePointerDown("right")}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div ref={rightLabelRef} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: isMobile ? "22px" : "36px",
              fontWeight: 700,
              color: "#ffb000",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow: "0 0 28px #ffb000",
            }}
          >
            {lang === "en" ? "Users" : "Usuarios"}
          </div>
        </div>

        {/* Torn left edge */}
        <TornEdge side="right" pathRef={rightBorderRef} />
      </div>

      {/* ── Gap center text ───────────────────────────────────────────── */}
      <div
        ref={gapTextRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 1,
          whiteSpace: "nowrap",
          opacity: 0,
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#ff4444",
            letterSpacing: "0.04em",
            marginBottom: "8px",
            textShadow: "0 0 10px #ff4444",
          }}
        >
          {lang === "en" ? "Something's missing." : "Algo esta fallando."}
        </div>
        <div
          style={{
            fontSize: "9px",
            color: "#ff4444",
            opacity: 0.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {lang === "en"
            ? "drag to close the gap"
            : "arrastra para cerrar la brecha"}
        </div>
      </div>

      {/* ── Merge flash ───────────────────────────────────────────────── */}
      <div
        ref={flashRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          pointerEvents: "none",
          background: "rgba(0,255,65,0.45)",
          opacity: 0,
        }}
      />

      {/* ── Logo assembly overlay ─────────────────────────────────────── */}
      <div
        ref={assemblyRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          background: "#020202",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "28px",
          opacity: 0,
          pointerEvents: phase === "assembling" ? "auto" : "none",
        }}
      >
        <LogoAssembly n={assembled} />

        {showTagline && (
          <div
            className="t-boot-line"
            style={{
              fontSize: "13px",
              color: "#006b1a",
              letterSpacing: "0.06em",
              textAlign: "center",
            }}
          >
            {lang === "en"
              ? "Close the gap between Software and Users."
              : "Cierra la brecha entre Software y Usuarios."}
            <br></br>
            {lang === "en"
              ? "That's what we do. Every day."
              : "Eso es lo que hacemos. Cada día."}
          </div>
        )}

        {showNext && (
          <div className="t-boot-line">
            <button onClick={() => onNext(4)} className="t-btn">
              {lang === "en" ? "next ──▶" : "siguiente ──▶"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
