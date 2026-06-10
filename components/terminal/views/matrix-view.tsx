"use client";

import { useEffect, useRef } from "react";

// Half-width katakana + digits — classic Matrix character set
const CHARS =
  "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ012345678901234567890123456789".split(
    "",
  );

const FONT_SIZE = 14;

interface MatrixViewProps {
  onExit: () => void;
  lang: "en" | "es";
}

export function MatrixView({ onExit, lang }: MatrixViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Any printable key or Escape exits the simulation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key.length === 1) {
        onExit();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onExit]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let intervalId: ReturnType<typeof setInterval> | null = null;

    function init() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (canvas.width === 0 || canvas.height === 0) return;

      columns = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from(
        { length: columns },
        () => Math.random() * -(canvas.height / FONT_SIZE),
      );
      speeds = Array.from({ length: columns }, () => 0.8 + Math.random() * 0.6);

      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(draw, 40);
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < columns; i++) {
        const y = Math.floor(drops[i]) * FONT_SIZE;
        const x = i * FONT_SIZE;

        ctx.fillStyle = "#e0ffe8";
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y);

        ctx.fillStyle = "#00ff41";
        ctx.fillText(
          CHARS[Math.floor(Math.random() * CHARS.length)],
          x,
          y - FONT_SIZE,
        );

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }
    }

    // ResizeObserver fires on any layout change (CSS transitions, display toggle)
    // unlike window.resize which only fires on viewport resize
    const observer = new ResizeObserver(init);
    observer.observe(canvas);
    init();

    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#000",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={onExit}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          zIndex: 1000,
          right: 0,
          textAlign: "center",
          color: "#004d13",
          fontFamily: "monospace",
          fontSize: 11,
          letterSpacing: "0.05em",
          pointerEvents: "none",
        }}
      >
        {lang === "en"
          ? "// tap or type anything to exit the simulation"
          : "// toca o escribe cualquier cosa para salir"}
      </div>
    </div>
  );
}
