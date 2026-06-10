"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Matter from "matter-js";
import { useLanguage } from "@/components/language-provider";

// ── Elements that make sense for a dev/tech agency ───────────────────────────
const ELEMENTS: { label: string; color: string }[] = [
  { label: "<div>", color: "#00cc33" },
  { label: "const x =", color: "#00ff41" },
  { label: "API", color: "#00bfff" },
  { label: "null", color: "#ff4444" },
  { label: "git push", color: "#00ff41" },
  { label: "npm install", color: "#00cc33" },
  { label: "404", color: "#ff4444" },
  { label: "async/await", color: "#00cc33" },
  { label: "JSON", color: "#ffb300" },
  { label: "console.log()", color: "#006620" },
  { label: "useEffect()", color: "#61dafb" },
  { label: "useState()", color: "#61dafb" },
  { label: "Promise", color: "#9966ff" },
  { label: "undefined", color: "#ff6600" },
  { label: "NaN", color: "#ff4444" },
  { label: "{ }", color: "#00ff41" },
  { label: "[ ]", color: "#00ff41" },
  { label: "() => { }", color: "#00cc33" },
  { label: "🐛 bug", color: "#cc0000" },
  { label: "deploy ✓", color: "#00ff41" },
  { label: "merge conflict", color: "#ff4444" },
  { label: "TODO:", color: "#ffb300" },
  { label: "deadline", color: "#ff4444" },
  { label: "import from", color: "#00cc33" },
  { label: "</>", color: "#00cc33" },
  { label: "sudo", color: "#ff4444" },
  { label: "☕ coffee", color: "#ffb300" },
  { label: "git blame", color: "#444" },
  { label: "it works!!!", color: "#00ff41" },
  { label: "...but why?", color: "#ffb300" },
  { label: "// FIXME", color: "#ff6600" },
  { label: "export default", color: "#00cc33" },
  { label: "try { }", color: "#00cc33" },
  { label: "catch (e)", color: "#ff4444" },
  { label: "404 Not Found", color: "#cc0000" },
  { label: "500 Error", color: "#cc0000" },
  { label: "design.figma", color: "#9966ff" },
  { label: "pixel-perfect", color: "#00bfff" },
  { label: "responsive", color: "#00cc33" },
  { label: "ship it!", color: "#00ff41" },
];

// trigger deploy

type GravityMode = "down" | "up" | "zero";
type GravityModeEs = "abajo" | "arriba" | "cero";

// ── Canvas helpers ────────────────────────────────────────────────────────────
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const FONT = "bold 11px 'Courier New', monospace";
const BODY_H = 32;

function makeBody(
  label: string,
  color: string,
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
): Matter.Body {
  ctx.font = FONT;
  const bw = Math.max(ctx.measureText(label).width + 28, 52);
  const body = Matter.Bodies.rectangle(x, y, bw, BODY_H, {
    restitution: 0.4,
    friction: 0.08,
    frictionAir: 0.018,
    label,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const b = body as any;
  b._color = color;
  b._w = bw;
  return body;
}

// ── Component ─────────────────────────────────────────────────────────────────
interface GravityViewProps {
  lang: "en" | "es";
  onExit: () => void;
}

export function GravityView({ lang, onExit }: GravityViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const animRef = useRef<number>(0);
  const [mode, setMode] = useState<GravityMode>("down");
  const modeRef = useRef<GravityMode>("down");
  const { language } = useLanguage();

  // ── ESC to exit ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onExit]);

  // ── Gravity mode switcher ───────────────────────────────────────────────────
  const changeMode = useCallback((m: GravityMode) => {
    modeRef.current = m;
    setMode(m);
    const engine = engineRef.current;
    if (!engine) return;
    if (m === "down") {
      engine.gravity.x = 0;
      engine.gravity.y = 1;
    } else if (m === "up") {
      engine.gravity.x = 0;
      engine.gravity.y = -1;
    } else {
      engine.gravity.x = 0;
      engine.gravity.y = 0;
      // nudge all bodies so they drift visibly
      Matter.Composite.allBodies(engine.world).forEach((b) => {
        if (b.isStatic) return;
        Matter.Body.applyForce(b, b.position, {
          x: (Math.random() - 0.5) * 0.08,
          y: (Math.random() - 0.5) * 0.08,
        });
      });
    }
  }, []);

  // ── Main physics + render setup ─────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Engine
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1 } });
    engineRef.current = engine;

    // Walls (slightly oversized to avoid gaps at corners)
    const WALL = 60;
    Matter.Composite.add(engine.world, [
      Matter.Bodies.rectangle(W / 2, H + WALL / 2, W + 200, WALL, {
        isStatic: true,
        label: "_floor",
      }),
      Matter.Bodies.rectangle(W / 2, -WALL / 2, W + 200, WALL, {
        isStatic: true,
        label: "_ceiling",
      }),
      Matter.Bodies.rectangle(-WALL / 2, H / 2, WALL, H + 200, {
        isStatic: true,
        label: "_left",
      }),
      Matter.Bodies.rectangle(W + WALL / 2, H / 2, WALL, H + 200, {
        isStatic: true,
        label: "_right",
      }),
    ]);

    // Spawn initial elements in a loose grid
    const initial = ELEMENTS.slice(0, 18);
    const cols = 4;
    const padX = 80;
    const padY = 60;
    const stepX = (W - padX * 2) / (cols - 1);
    const bodies = initial.map((el, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jitter = (Math.random() - 0.5) * 30;
      return makeBody(
        el.label,
        el.color,
        padX + col * stepX + jitter,
        padY + row * (BODY_H + 24) + jitter,
        ctx,
      );
    });
    Matter.Composite.add(engine.world, bodies);

    // Mouse constraint for drag-and-drop
    const mouse = Matter.Mouse.create(canvas);
    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, damping: 0.1, render: { visible: false } },
    });
    Matter.Composite.add(engine.world, mc);

    // Click-to-spawn (only when clicking on empty space)
    let dragStart = { x: 0, y: 0 };
    let startedOnBody = false;

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      dragStart = { x: px, y: py };
      const nonStatic = Matter.Composite.allBodies(engine.world).filter(
        (b) => !b.isStatic,
      );
      startedOnBody =
        Matter.Query.point(nonStatic, { x: px, y: py }).length > 0;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (startedOnBody) return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (Math.hypot(px - dragStart.x, py - dragStart.y) > 8) return;
      const el = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
      Matter.Composite.add(
        engine.world,
        makeBody(el.label, el.color, px, py, ctx),
      );
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);

    // Runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // Render loop
    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Dark background
      ctx.fillStyle = "#020202";
      ctx.fillRect(0, 0, W, H);

      // Subtle dot grid
      ctx.fillStyle = "rgba(0,40,9,0.5)";
      for (let gx = 24; gx < W; gx += 32) {
        for (let gy = 24; gy < H; gy += 32) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw bodies
      const allBodies = Matter.Composite.allBodies(engine.world);
      for (const body of allBodies) {
        if (body.isStatic) continue;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const b = body as any;
        const bw: number = b._w ?? 80;
        const color: string = b._color ?? "#00cc33";

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        // Fill
        ctx.fillStyle = "rgba(0,16,4,0.92)";
        roundRect(ctx, -bw / 2, -BODY_H / 2, bw, BODY_H, 5);
        ctx.fill();

        // Border + glow
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        roundRect(ctx, -bw / 2, -BODY_H / 2, bw, BODY_H, 5);
        ctx.stroke();

        ctx.shadowColor = color;
        ctx.shadowBlur = 7;
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.6;
        roundRect(ctx, -bw / 2, -BODY_H / 2, bw, BODY_H, 5);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Text
        ctx.fillStyle = color;
        ctx.font = FONT;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(body.label, 0, 0);

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(render);
    }
    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(engine.world, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modes = useMemo(() => {
    if (language === "es") return ["abajo", "arriba", "cero"];
    return ["down", "up", "zero"];
  }, [language]);

  const modesEn: Record<GravityModeEs, GravityMode> = {
    abajo: "down",
    arriba: "up",
    cero: "zero",
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", position: "absolute", inset: 0 }}
      />

      {/* Gravity mode controls */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          gap: 6,
          zIndex: 10,
        }}
      >
        {modes.map((m) => (
          <button
            key={m}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              const mode =
                language === "es" ? modesEn[m as keyof typeof modesEn] : m;
              changeMode(mode as GravityMode);
            }}
            className={mode === m ? "t-btn" : "t-btn t-btn-secondary"}
            style={{
              fontSize: 10,
              padding: "4px 12px",
              letterSpacing: "0.1em",
            }}
          >
            {m === "down" ? "↓ " + m : m === "up" ? "↑ " + m : "○ " + m}
          </button>
        ))}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onExit}
          className="t-btn t-btn-secondary"
          style={{ fontSize: 10, padding: "4px 12px" }}
        >
          esc
        </button>
      </div>

      {/* Hint */}
      <p
        style={{
          position: "absolute",
          bottom: 12,
          left: 14,
          color: "#003309",
          fontSize: 11,
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.05em",
          pointerEvents: "none",
        }}
      >
        {lang === "en"
          ? "click empty space to spawn · drag to throw"
          : "click para crear · arrastra para lanzar"}
      </p>
    </div>
  );
}
