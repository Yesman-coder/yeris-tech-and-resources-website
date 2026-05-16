"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function HeroGlow() {
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(-2000);
  const mouseY = useMotionValue(-2000);

  const x = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const y = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    if (prefersReduced) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 400);
      mouseY.set(e.clientY - 400);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReduced, mouseX, mouseY]);

  if (prefersReduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full blur-[160px]"
        style={{
          width: 800,
          height: 800,
          background: "oklch(0.78 0.18 75 / 1)",
          opacity: 0.1,
          x,
          y,
        }}
      />
    </div>
  );
}
