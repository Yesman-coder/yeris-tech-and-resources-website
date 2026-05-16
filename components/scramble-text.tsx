"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function ScrambleText({ text, className, delay = 0 }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const prefersReduced = useReducedMotion();
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReduced) return;

    const timeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 3;

      function tick() {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " " || char === "'" || char === ".") return char;
              if (i < iteration / 3) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        if (iteration < maxIterations) {
          iteration++;
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, prefersReduced]);

  return <span className={className}>{display}</span>;
}
