"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ href, children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 300,
    damping: 30,
  });
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block"
    >
      <motion.div style={prefersReduced ? {} : { x, y }}>
        <Link
          href={href}
          className={
            className ??
            "inline-flex items-center gap-2 bg-(--color-accent) text-(--color-accent-fg) font-medium text-base px-8 py-4 rounded-2xl active:scale-[0.97] transition-transform duration-100"
          }
        >
          {children}
        </Link>
      </motion.div>
    </div>
  );
}
