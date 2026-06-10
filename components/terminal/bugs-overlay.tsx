"use client";

import { useEffect, useRef } from "react";

const BUG_EMOJIS = ["🐛", "🪲"];

// Tune this to change crawl speed (percentage points per frame at 60fps)
const BUG_SPEED = 0.08;

interface Bug {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotation: number;
  emoji: string;
  patched: boolean;
}

export function BugsOverlay({ onAllPatched }: { onAllPatched: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bugsRef = useRef<Bug[]>([]);
  const elemsRef = useRef<Map<number, HTMLButtonElement>>(new Map());
  const rafRef = useRef<number>(0);
  const callbackRef = useRef(onAllPatched);
  useEffect(() => {
    callbackRef.current = onAllPatched;
  }, [onAllPatched]);

  useEffect(() => {
    const count = 4 + Math.floor(Math.random() * 2);
    const container = containerRef.current;
    if (!container) return;

    bugsRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      dx:
        (Math.random() < 0.5 ? -1 : 1) *
        (BUG_SPEED + Math.random() * BUG_SPEED),
      dy:
        (Math.random() < 0.5 ? -1 : 1) *
        (BUG_SPEED + Math.random() * BUG_SPEED),
      rotation: 0,
      emoji: BUG_EMOJIS[i % 2],
      patched: false,
    }));

    bugsRef.current.forEach((bug) => {
      const btn = document.createElement("button");
      btn.textContent = bug.emoji;
      btn.title = "click to patch";
      Object.assign(btn.style, {
        position: "absolute",
        background: "transparent",
        border: "none",
        cursor: "cell",
        fontSize: "30px",
        padding: "4px",
        lineHeight: "1",
        userSelect: "none",
        pointerEvents: "auto",
        left: `${bug.x}%`,
        top: `${bug.y}%`,
        transform: `rotate(${bug.rotation}deg)`,
        willChange: "transform, left, top",
      });

      btn.addEventListener("click", () => {
        if (bug.patched) return;
        bug.patched = true;
        Object.assign(btn.style, {
          transition: "transform 0.25s ease-out, opacity 0.25s ease-out",
          transform: "scale(2.5) rotate(720deg)",
          opacity: "0",
        });
        setTimeout(() => btn.remove(), 280);
        const remaining = bugsRef.current.filter((b) => !b.patched).length;
        if (remaining === 0) setTimeout(() => callbackRef.current(), 300);
      });

      container.appendChild(btn);
      elemsRef.current.set(bug.id, btn);
    });

    const tick = () => {
      bugsRef.current.forEach((bug) => {
        if (bug.patched) return;
        const btn = elemsRef.current.get(bug.id);
        if (!btn) return;

        bug.x += bug.dx;
        bug.y += bug.dy;

        if (bug.x < 0) {
          bug.x = 0;
          bug.dx = Math.abs(bug.dx);
        }
        if (bug.x > 96) {
          bug.x = 96;
          bug.dx = -Math.abs(bug.dx);
        }
        if (bug.y < 0) {
          bug.y = 0;
          bug.dy = Math.abs(bug.dy);
        }
        if (bug.y > 94) {
          bug.y = 94;
          bug.dy = -Math.abs(bug.dy);
        }

        if (Math.random() < 0.007)
          bug.dx += (Math.random() - 0.5) * BUG_SPEED * 0.5;
        if (Math.random() < 0.007)
          bug.dy += (Math.random() - 0.5) * BUG_SPEED * 0.5;

        const speed = Math.hypot(bug.dx, bug.dy);
        const maxS = BUG_SPEED * 2,
          minS = BUG_SPEED * 0.5;
        if (speed > maxS) {
          bug.dx *= maxS / speed;
          bug.dy *= maxS / speed;
        }
        if (speed < minS && speed > 0) {
          bug.dx *= minS / speed;
          bug.dy *= minS / speed;
        }

        // rotation follows movement direction so bugs face where they crawl
        bug.rotation = Math.atan2(bug.dy, bug.dx) * (180 / Math.PI) + 90;

        btn.style.left = `${bug.x}%`;
        btn.style.top = `${bug.y}%`;
        btn.style.transform = `rotate(${bug.rotation}deg)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      elemsRef.current.forEach((btn) => btn.remove());
      elemsRef.current.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
