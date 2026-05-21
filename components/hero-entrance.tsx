"use client";
import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

const ease = [0.23, 1, 0.32, 1] as const;

export function HeroEntrance({
  children,
  index = 0,
}: {
  children: ReactNode;
  index?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease }}
    >
      {children}
    </motion.div>
  );
}
