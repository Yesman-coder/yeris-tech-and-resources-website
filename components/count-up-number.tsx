"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface CountUpNumberProps {
  to: number;
  className?: string;
}

export function CountUpNumber({ to, className }: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 900, bounce: 0 });
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  useEffect(() => {
    if (inView && !prefersReduced) motionVal.set(to);
  }, [inView, prefersReduced, motionVal, to]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = String(Math.round(v)).padStart(2, "0");
      }
    });
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {prefersReduced ? String(to).padStart(2, "0") : "00"}
    </span>
  );
}
