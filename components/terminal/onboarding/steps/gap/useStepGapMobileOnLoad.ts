"use client";

import React, { SetStateAction, useEffect } from "react";
import { ANIM, GAP_MOBILE } from "./step-gap";
import gsap from "gsap";

interface UseStepGapMobileOnLoadProps {
  topRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  gapTextRef: React.RefObject<HTMLDivElement | null>;
  flashRef: React.RefObject<HTMLDivElement | null>;
  assemblyRef: React.RefObject<HTMLDivElement | null>;
  topBorderRef: React.RefObject<SVGPathElement | null>;
  bottomBorderRef: React.RefObject<SVGPathElement | null>;
  setPhase: (
    v: SetStateAction<
      "splitting" | "idle" | "dragging" | "snapping" | "assembling"
    >,
  ) => void;
}

const useStepGapMobileOnLoad = ({
  topRef,
  bottomRef,
  gapTextRef,
  flashRef,
  assemblyRef,
  topBorderRef,
  bottomBorderRef,
  setPhase,
}: UseStepGapMobileOnLoadProps) => {
  useEffect(() => {
    gsap.set([topRef.current, bottomRef.current], { y: 0 });
    gsap.set(gapTextRef.current, { opacity: 0 });
    gsap.set(flashRef.current, { opacity: 0 });
    gsap.set(assemblyRef.current, { opacity: 0 });

    const tLen = topBorderRef.current!.getTotalLength();
    const bLen = bottomBorderRef.current!.getTotalLength();
    gsap.set(topBorderRef.current, {
      strokeDasharray: tLen,
      strokeDashoffset: tLen,
    });
    gsap.set(bottomBorderRef.current, {
      strokeDasharray: bLen,
      strokeDashoffset: bLen,
    });

    const tl = gsap.timeline({ delay: ANIM.initialDelay });

    tl
      // ── Jolt ────────────────────────────────────────────────────────────
      .to(topRef.current, {
        y: -ANIM.joltX,
        duration: ANIM.joltDuration,
        ease: "power2.out",
      })
      .to(
        bottomRef.current,
        { y: ANIM.joltX, duration: ANIM.joltDuration, ease: "power2.out" },
        "<",
      )

      // ── Split + torn edges draw — all four start simultaneously ─────────
      .to(topRef.current, {
        y: -GAP_MOBILE / 2,
        duration: ANIM.splitDuration,
        ease: ANIM.splitEase,
      })
      .to(
        bottomRef.current,
        {
          y: GAP_MOBILE / 2,
          duration: ANIM.splitDuration,
          ease: ANIM.splitEase,
        },
        "<",
      )
      .to(
        topBorderRef.current,
        {
          strokeDashoffset: 0,
          duration: ANIM.splitDuration,
          ease: ANIM.borderEase,
        },
        "<",
      )
      .to(
        bottomBorderRef.current,
        {
          strokeDashoffset: 0,
          duration: ANIM.splitDuration,
          ease: ANIM.borderEase,
        },
        "<",
      )

      // ── Gap text ─────────────────────────────────────────────────────────
      .to(
        gapTextRef.current,
        { opacity: 1, duration: ANIM.gapFadeIn, ease: "power2.out" },
        `-=${ANIM.gapFadeIn * 0.4}`,
      )

      .call(() => setPhase("idle"));

    return () => {
      tl.kill();
    };
  }, []);

  return {};
};

export default useStepGapMobileOnLoad;
