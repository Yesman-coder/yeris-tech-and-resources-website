"use client";
import { useState, useEffect } from "react";

const LINES = {
  en: [
    "We grew up speaking two languages — the language of code and the language of people. For a long time, nobody asked us to use both at once.",
    "",
    "Most software is built for users. Almost none of it is built with them.",
    "",
    "We made this website a terminal because we wanted you to feel, even briefly, what it's like to be a developer. Not to intimidate you — to invite you in.",
    "",
    "When you understand how we think, we can build something together.",
    "That's the gap we close.",
  ],
  es: [
    "Crecimos hablando dos idiomas — el lenguaje del código y el de las personas. Por mucho tiempo, nadie nos pidió usar ambos a la vez.",
    "",
    "La mayoría del software se construye para los usuarios. Casi ninguno se construye con ellos.",
    "",
    "Hicimos este sitio una terminal porque queríamos que sintieras, aunque sea brevemente, lo que es ser desarrollador. No para intimidarte — sino para invitarte.",
    "",
    "Cuando entiendes cómo pensamos, podemos construir algo juntos.",
    "Esa es la brecha que cerramos.",
  ],
};

const CHAR_DELAY = 20;
const LINE_PAUSE = 380;
const EMPTY_PAUSE = 200;

interface StepIntroProps {
  lang: "en" | "es";
  onLangChange: (lang: "en" | "es") => void;
  onNext: (n: number) => void;
}

export function StepIntro({ lang, onLangChange, onNext }: StepIntroProps) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [done, setDone] = useState(false);

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

  return (
    <div className="onboarding-menu">
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          padding: "0 24px",
          pointerEvents: "auto",
        }}
      >
        {/* Language toggle */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "40px" }}>
          <button
            onClick={() => onLangChange("en")}
            className={lang === "en" ? "t-btn" : "t-btn t-btn-secondary"}
            style={{
              padding: "3px 12px",
              fontSize: "10px",
              letterSpacing: "0.12em",
            }}
          >
            EN
          </button>
          <button
            onClick={() => onLangChange("es")}
            className={lang === "es" ? "t-btn" : "t-btn t-btn-secondary"}
            style={{
              padding: "3px 12px",
              fontSize: "10px",
              letterSpacing: "0.12em",
            }}
          >
            ES
          </button>
        </div>

        {/* Typing text */}
        {displayed.map((line, i) => {
          if (line === "") return <div key={i} style={{ height: "18px" }} />;
          const isLast = i === displayed.length - 1;
          const isEmphasis = i === lines.length - 1;

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
          <div className="t-boot-line" style={{ marginTop: "40px" }}>
            <button onClick={() => onNext(2)} className="t-btn">
              {lang === "en" ? "next ──▶" : "siguiente ──▶"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
