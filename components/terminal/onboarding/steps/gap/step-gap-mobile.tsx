"use client";

import { useRef, useState } from "react";
import TornEdgeHorizontal from "./TornEdgeHorizontal";
import { LogoAssembly } from "./helpers";
import useStepGapMobile from "./useStepGapMobile";
import useStepGapMobileOnLoad from "./useStepGapMobileOnLoad";

type Phase = "splitting" | "idle" | "dragging" | "snapping" | "assembling";

interface StepGapMobileProps {
  lang: "en" | "es";
  onNext: (n: number) => void;
}

export function StepGapMobile({ lang, onNext }: StepGapMobileProps) {
  const [phase, setPhase] = useState<Phase>("splitting");
  const [assembled, setAssembled] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [showNext, setShowNext] = useState(false);

  // Half wrappers — GSAP moves these vertically
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Labels
  const topLabelRef = useRef<HTMLDivElement>(null);
  const bottomLabelRef = useRef<HTMLDivElement>(null);

  // Horizontal torn-edge SVG paths
  const topBorderRef = useRef<SVGPathElement>(null);
  const bottomBorderRef = useRef<SVGPathElement>(null);

  // Overlay elements
  const gapTextRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);

  // Mutable drag state — zero re-renders during drag
  const closureRef = useRef(0);
  const dragRef = useRef<{
    startY: number;
    startClosure: number;
    half: "top" | "bottom";
  } | null>(null);

  useStepGapMobileOnLoad({
    topRef,
    bottomRef,
    gapTextRef,
    flashRef,
    assemblyRef,
    topBorderRef,
    bottomBorderRef,
    setPhase,
  });

  const { handlePointerUp, handlePointerDown, handlePointerMove } =
    useStepGapMobile({
      dragRef,
      closureRef,
      phase,
      setPhase,
      topRef,
      bottomRef,
      flashRef,
      assemblyRef,
      topBorderRef,
      bottomBorderRef,
      topLabelRef,
      bottomLabelRef,
      setAssembled,
      setShowTagline,
      setShowNext,
      gapTextRef,
    });

  const halfCursor =
    phase === "idle"
      ? "ns-resize"
      : phase === "dragging"
        ? "grabbing"
        : "default";

  const halfBase: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: halfCursor,
    userSelect: "none",
    touchAction: "none", // prevent browser scroll hijacking during drag
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
      {/* ── Top half (Software) ──────────────────────────────────────────── */}
      <div
        ref={topRef}
        style={{
          ...halfBase,
          top: 0,
          background: "#030803",
          alignItems: "flex-end",
          paddingBottom: "50px",
        }}
        onPointerDown={handlePointerDown("top")}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div ref={topLabelRef} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "28px",
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

        {/* Torn bottom edge of the top half */}
        <TornEdgeHorizontal side="top" pathRef={topBorderRef} />
      </div>

      {/* ── Bottom half (Users) ───────────────────────────────────────────── */}
      <div
        ref={bottomRef}
        style={{
          ...halfBase,
          bottom: 0,
          background: "#0e0a00",
          alignItems: "flex-start",
          paddingTop: "50px",
        }}
        onPointerDown={handlePointerDown("bottom")}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div ref={bottomLabelRef} style={{ textAlign: "start" }}>
          <div
            style={{
              fontSize: "28px",
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

        {/* Torn top edge of the bottom half */}
        <TornEdgeHorizontal side="bottom" pathRef={bottomBorderRef} />
      </div>

      {/* ── Gap center text ───────────────────────────────────────────────── */}
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

      {/* ── Merge flash ───────────────────────────────────────────────────── */}
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

      {/* ── Logo assembly overlay ─────────────────────────────────────────── */}
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
            <br />
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
