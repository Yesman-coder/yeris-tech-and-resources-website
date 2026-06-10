"use client";

import React, { SetStateAction } from "react";
import {
  ANIM,
  GAP,
  GAP_MOBILE,
  LOGO_FULL,
  SNAP_THRESHOLD,
  SNAP_THRESHOLD_MOBILE,
} from "./step-gap";
import { playMergeSound } from "./helpers";
import gsap from "gsap";
import useMobile from "@/hooks/useMobile";

interface UseStepGepProps {
  dragRef: React.RefObject<{
    startX: number;
    startClosure: number;
    half: "left" | "right";
  } | null>;
  leftRef: React.RefObject<HTMLDivElement | null>;
  rightRef: React.RefObject<HTMLDivElement | null>;
  closureRef: React.RefObject<number>;
  flashRef: React.RefObject<HTMLDivElement | null>;
  assemblyRef: React.RefObject<HTMLDivElement | null>;
  leftBorderRef: React.RefObject<SVGPathElement | null>;
  rightBorderRef: React.RefObject<SVGPathElement | null>;
  leftLabelRef: React.RefObject<HTMLDivElement | null>;
  rightLabelRef: React.RefObject<HTMLDivElement | null>;
  gapTextRef: React.RefObject<HTMLDivElement | null>;
  phase: "splitting" | "idle" | "dragging" | "snapping" | "assembling";
  setPhase: (
    v: SetStateAction<
      "splitting" | "idle" | "dragging" | "snapping" | "assembling"
    >,
  ) => void;
  setAssembled: (v: SetStateAction<number>) => void;
  setShowTagline: (v: SetStateAction<boolean>) => void;
  setShowNext: (v: SetStateAction<boolean>) => void;
}

const useStepGap = ({
  dragRef,
  closureRef,
  phase,
  setPhase,
  leftRef,
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
  gapTextRef,
}: UseStepGepProps) => {
  const isMobile = useMobile();
  function handlePointerUp() {
    if (!dragRef.current) return;
    dragRef.current = null;
    closureRef.current = 0;
    setPhase("idle");
    const realGap = isMobile ? GAP_MOBILE : GAP;
    // Spring halves back to their fully-separated positions
    gsap.to(leftRef.current, {
      x: -realGap / 2,
      rotation: -ANIM.splitRotation,
      duration: ANIM.snapBackDuration,
      ease: ANIM.snapBackEase,
    });
    gsap.to(rightRef.current, {
      x: realGap / 2,
      rotation: ANIM.splitRotation,
      duration: ANIM.snapBackDuration,
      ease: ANIM.snapBackEase,
    });
  }

  function triggerMerge() {
    playMergeSound();

    gsap.fromTo(
      flashRef.current,
      { opacity: 0.5 },
      { opacity: 0, duration: ANIM.flashDuration, ease: "power2.out" },
    );
    gsap.to([leftLabelRef.current, rightLabelRef.current], {
      opacity: 0,
      duration: 0.2,
    });
    gsap.to([leftBorderRef.current, rightBorderRef.current], {
      opacity: 0,
      duration: 0.25,
    });

    setTimeout(() => {
      setPhase("assembling");
      gsap.to(assemblyRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      let i = 0;
      const iv = setInterval(() => {
        i++;
        setAssembled(i);
        if (i >= LOGO_FULL.length) {
          clearInterval(iv);
          setTimeout(() => {
            setShowTagline(true);
            setTimeout(() => setShowNext(true), ANIM.nextBtnDelay * 1000);
          }, ANIM.taglineDelay * 1000);
        }
      }, ANIM.assemblyCharMs);
    }, ANIM.assemblyDelay * 1000);
  }

  function handlePointerDown(half: "left" | "right") {
    return (e: React.PointerEvent<HTMLDivElement>) => {
      if (phase !== "idle") return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startClosure: closureRef.current,
        half,
      };
      setPhase("dragging");
    };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    const { startX, startClosure, half } = dragRef.current;
    const delta = half === "left" ? e.clientX - startX : startX - e.clientX;
    const realGap = isMobile ? GAP_MOBILE : GAP;
    const realSnapTreshold = isMobile ? SNAP_THRESHOLD_MOBILE : SNAP_THRESHOLD;
    const next = Math.max(0, Math.min(realGap, startClosure + delta));

    if (realGap - next <= realSnapTreshold) {
      // ── Magnetic snap ──────────────────────────────────────────────────
      dragRef.current = null;
      e.currentTarget.releasePointerCapture(e.pointerId);
      closureRef.current = realGap;
      setPhase("snapping");

      gsap.to([leftBorderRef.current, rightBorderRef.current], {
        opacity: 0,
        duration: 0.15,
      });
      gsap.to(leftRef.current, {
        x: 0,
        rotation: 0,
        duration: ANIM.snapDuration,
        ease: ANIM.snapEase,
      });
      gsap.to(rightRef.current, {
        x: 0,
        rotation: 0,
        duration: ANIM.snapDuration,
        ease: ANIM.snapEase,
      });
      gsap.to(gapTextRef.current, { opacity: 0, duration: 0.15 });

      setTimeout(
        triggerMerge,
        (ANIM.snapDuration + ANIM.snapMergeDelay) * 1000,
      );
    } else {
      // ── Live drag update (zero re-renders) ─────────────────────────────
      closureRef.current = next;
      const halfShift = (realGap - next) / 2;
      const rot = ANIM.splitRotation * (halfShift / (realGap / 2));

      gsap.set(leftRef.current, { x: -halfShift, rotation: -rot });
      gsap.set(rightRef.current, { x: halfShift, rotation: rot });
      // Gap text disappears naturally behind the halves (zIndex: 2) — no opacity tweak needed
    }
  }

  return { handlePointerUp, handlePointerDown, handlePointerMove };
};

export default useStepGap;
