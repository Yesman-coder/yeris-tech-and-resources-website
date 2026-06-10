"use client";

import React, { SetStateAction } from "react";
import { ANIM, GAP_MOBILE, LOGO_FULL, SNAP_THRESHOLD_MOBILE } from "./step-gap";
import { playMergeSound } from "./helpers";
import gsap from "gsap";

type Phase = "splitting" | "idle" | "dragging" | "snapping" | "assembling";

interface UseStepGapMobileProps {
  dragRef: React.RefObject<{
    startY: number;
    startClosure: number;
    half: "top" | "bottom";
  } | null>;
  topRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  closureRef: React.RefObject<number>;
  flashRef: React.RefObject<HTMLDivElement | null>;
  assemblyRef: React.RefObject<HTMLDivElement | null>;
  topBorderRef: React.RefObject<SVGPathElement | null>;
  bottomBorderRef: React.RefObject<SVGPathElement | null>;
  topLabelRef: React.RefObject<HTMLDivElement | null>;
  bottomLabelRef: React.RefObject<HTMLDivElement | null>;
  gapTextRef: React.RefObject<HTMLDivElement | null>;
  phase: Phase;
  setPhase: (v: SetStateAction<Phase>) => void;
  setAssembled: (v: SetStateAction<number>) => void;
  setShowTagline: (v: SetStateAction<boolean>) => void;
  setShowNext: (v: SetStateAction<boolean>) => void;
}

const useStepGapMobile = ({
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
}: UseStepGapMobileProps) => {
  function handlePointerUp() {
    if (!dragRef.current) return;
    dragRef.current = null;
    closureRef.current = 0;
    setPhase("idle");
    gsap.to(topRef.current, {
      y: -GAP_MOBILE / 2,
      duration: ANIM.snapBackDuration,
      ease: ANIM.snapBackEase,
    });
    gsap.to(bottomRef.current, {
      y: GAP_MOBILE / 2,
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
    gsap.to([topLabelRef.current, bottomLabelRef.current], {
      opacity: 0,
      duration: 0.2,
    });
    gsap.to([topBorderRef.current, bottomBorderRef.current], {
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

  function handlePointerDown(half: "top" | "bottom") {
    return (e: React.PointerEvent<HTMLDivElement>) => {
      if (phase !== "idle") return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        startY: e.clientY,
        startClosure: closureRef.current,
        half,
      };
      setPhase("dragging");
    };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    const { startY, startClosure, half } = dragRef.current;
    // top half: drag down closes gap; bottom half: drag up closes gap
    const delta = half === "top" ? e.clientY - startY : startY - e.clientY;
    const next = Math.max(0, Math.min(GAP_MOBILE, startClosure + delta));

    if (GAP_MOBILE - next <= SNAP_THRESHOLD_MOBILE) {
      // ── Magnetic snap ──────────────────────────────────────────────────
      dragRef.current = null;
      e.currentTarget.releasePointerCapture(e.pointerId);
      closureRef.current = GAP_MOBILE;
      setPhase("snapping");

      gsap.to([topBorderRef.current, bottomBorderRef.current], {
        opacity: 0,
        duration: 0.15,
      });
      gsap.to(topRef.current, {
        y: 0,
        duration: ANIM.snapDuration,
        ease: ANIM.snapEase,
      });
      gsap.to(bottomRef.current, {
        y: 0,
        duration: ANIM.snapDuration,
        ease: ANIM.snapEase,
      });
      gsap.to(gapTextRef.current, { opacity: 0, duration: 0.15 });

      setTimeout(
        triggerMerge,
        (ANIM.snapDuration + ANIM.snapMergeDelay) * 1000,
      );
    } else {
      // ── Live drag update ────────────────────────────────────────────────
      closureRef.current = next;
      const halfShift = (GAP_MOBILE - next) / 2;
      gsap.set(topRef.current, { y: -halfShift });
      gsap.set(bottomRef.current, { y: halfShift });
    }
  }

  return { handlePointerUp, handlePointerDown, handlePointerMove };
};

export default useStepGapMobile;
