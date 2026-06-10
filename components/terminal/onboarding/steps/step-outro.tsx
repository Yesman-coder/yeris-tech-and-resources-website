"use client";
import { useState, useEffect } from "react";

const LINES = {
  en: [
    "You just did what developers do.",
    "You talked to a machine. It listened.",
    "You told it where to go. It went.",
    "",
    "That's not magic. That's just software. And now you speak both languages.",
    "",
    "Some commands only live in the terminal.",
    "If you feel stuck just enter the command /help — it will show you all the commands you can use.",
    "",
    "Welcome to the other side.",
  ],
  es: [
    "Acabas de hacer lo que hacen los desarrolladores.",
    "Le hablaste a una máquina. Te escuchó.",
    "Le dijiste a dónde ir. Fue.",
    "",
    "Eso no es magia. Es software. Y ahora hablas los dos idiomas.",
    "",
    "Algunos comandos solo viven en la terminal.",
    "Si te pierdes escribe el comando /help — te mostrará todos los comandos disponibles.",
    "",
    "Bienvenido al otro lado.",
  ],
};

const CHAR_DELAY = 20;
const LINE_PAUSE = 380;
const EMPTY_PAUSE = 200;

interface StepOutroProps {
  lang: "en" | "es";
  onDismiss: () => void;
}

export function StepOutro({ lang, onDismiss }: StepOutroProps) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  function handleDismissWithFade() {
    setFading(true);
    setTimeout(() => onDismiss(), 400);
  }

  useEffect(() => {
    setDisplayed([]);
    setDone(false);

    const lines = LINES[lang];
    let lineIdx = 0;
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }

      const line = lines[lineIdx];

      if (line === "") {
        setDisplayed((prev) => [...prev, ""]);
        lineIdx++;
        charIdx = 0;
        timer = setTimeout(tick, EMPTY_PAUSE);
        return;
      }

      if (charIdx === 0) {
        setDisplayed((prev) => [...prev, line[0]]);
        charIdx = 1;
        timer = setTimeout(tick, CHAR_DELAY);
        return;
      }

      if (charIdx < line.length) {
        setDisplayed((prev) => {
          const next = [...prev];
          next[next.length - 1] = line.slice(0, charIdx + 1);
          return next;
        });
        charIdx++;
        timer = setTimeout(tick, CHAR_DELAY);
        return;
      }

      lineIdx++;
      charIdx = 0;
      timer = setTimeout(tick, LINE_PAUSE);
    }

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [lang]);

  const lines = LINES[lang];
  const lastNonEmptyLine = [...lines].reverse().find((l) => l !== "");

  return (
    <div
      className="onboarding-menu"
      style={{
        opacity: fading ? 0 : visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          padding: "0 24px",
          pointerEvents: "auto",
        }}
      >
        {displayed.map((line, i) => {
          if (line === "") return <div key={i} style={{ height: "18px" }} />;
          const isLast = i === displayed.length - 1;
          const isEmphasis = line === lastNonEmptyLine;

          return (
            <div
              key={i}
              className="t-boot-line"
              style={{
                color: isEmphasis ? "#00ff41" : "#00cc33",
                fontSize: "13px",
                lineHeight: "1.75",
              }}
            >
              {line}
              {isLast && !done && (
                <span className="terminal-typing-cursor">█</span>
              )}
            </div>
          );
        })}

        {done && (
          <div
            className="t-boot-line"
            style={{ marginTop: "40px", cursor: "pointer" }}
          >
            <button onClick={handleDismissWithFade} className="t-btn">
              {lang === "en"
                ? "[ start exploring ]"
                : "[ comenzar a explorar ]"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
