import React, { SetStateAction, useEffect } from "react";
import { ANIM, GAP, GAP_MOBILE } from "./step-gap";
import gsap from "gsap";

interface UseStepGapOnLoadProps {
  leftRef: React.RefObject<HTMLDivElement | null>;
  rightRef: React.RefObject<HTMLDivElement | null>;
  gapTextRef: React.RefObject<HTMLDivElement | null>;
  flashRef: React.RefObject<HTMLDivElement | null>;
  assemblyRef: React.RefObject<HTMLDivElement | null>;
  leftBorderRef: React.RefObject<SVGPathElement | null>;
  rightBorderRef: React.RefObject<SVGPathElement | null>;
  setPhase: (
    v: SetStateAction<
      "splitting" | "idle" | "dragging" | "snapping" | "assembling"
    >,
  ) => void;
}

const useStepGapOnLoad = ({
  leftRef,
  rightRef,
  gapTextRef,
  flashRef,
  assemblyRef,
  leftBorderRef,
  rightBorderRef,
  setPhase,
}: UseStepGapOnLoadProps) => {
  useEffect(() => {
    const realGap = window.innerWidth < 768 ? GAP_MOBILE : GAP;

    gsap.set([leftRef.current, rightRef.current], { x: 0, rotation: 0 });
    gsap.set(gapTextRef.current, { opacity: 0 });
    gsap.set(flashRef.current, { opacity: 0 });
    gsap.set(assemblyRef.current, { opacity: 0 });

    // Hide torn-edge paths via strokeDashoffset (drawn top→bottom during split)
    const lLen = leftBorderRef.current!.getTotalLength();
    const rLen = rightBorderRef.current!.getTotalLength();
    gsap.set(leftBorderRef.current, {
      strokeDasharray: lLen,
      strokeDashoffset: lLen,
    });
    gsap.set(rightBorderRef.current, {
      strokeDasharray: rLen,
      strokeDashoffset: rLen,
    });

    const tl = gsap.timeline({ delay: ANIM.initialDelay });

    tl
      // ── Jolt ────────────────────────────────────────────────────────────
      .to(leftRef.current, {
        x: -ANIM.joltX,
        duration: ANIM.joltDuration,
        ease: "power2.out",
      })
      .to(
        rightRef.current,
        { x: ANIM.joltX, duration: ANIM.joltDuration, ease: "power2.out" },
        "<",
      )

      // ── Split + torn edges draw — all four start simultaneously ─────────
      .to(leftRef.current, {
        x: -realGap / 2,
        rotation: -ANIM.splitRotation,
        duration: ANIM.splitDuration,
        ease: ANIM.splitEase,
      })
      .to(
        rightRef.current,
        {
          x: realGap / 2,
          rotation: ANIM.splitRotation,
          duration: ANIM.splitDuration,
          ease: ANIM.splitEase,
        },
        "<",
      )
      .to(
        leftBorderRef.current,
        {
          strokeDashoffset: 0,
          duration: ANIM.splitDuration,
          ease: ANIM.borderEase,
        },
        "<",
      )
      .to(
        rightBorderRef.current,
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

export default useStepGapOnLoad;
