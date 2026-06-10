"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomWord } from "@/lib/wordle-words";

async function checkWord(word: string, lang: "en" | "es"): Promise<boolean> {
  try {
    const base = "https://api.dictionaryapi.dev/api/v2/entries";
    const res = await fetch(`${base}/${lang}/${word.toLowerCase()}`);
    return res.ok;
  } catch {
    return true; // fail open — don't block player if offline
  }
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

// ── Types ─────────────────────────────────────────────────────────────────────
type LetterState = "correct" | "present" | "absent" | "tbd" | "empty";
type GameState = "playing" | "won" | "lost";

// ── Scoring logic ─────────────────────────────────────────────────────────────
function scoreGuess(guess: string, target: string): LetterState[] {
  const result: LetterState[] = Array(5).fill("absent");
  const pool: (string | null)[] = target.split("");

  // Pass 1 — correct positions
  guess.split("").forEach((l, i) => {
    if (l === pool[i]) {
      result[i] = "correct";
      pool[i] = null;
    }
  });
  // Pass 2 — present elsewhere
  guess.split("").forEach((l, i) => {
    if (result[i] === "correct") return;
    const idx = pool.indexOf(l);
    if (idx !== -1) {
      result[i] = "present";
      pool[idx] = null;
    }
  });

  return result;
}

function buildKeyMap(
  guesses: string[],
  target: string,
): Record<string, LetterState> {
  const map: Record<string, LetterState> = {};
  const rank: Record<LetterState, number> = {
    correct: 3,
    present: 2,
    absent: 1,
    tbd: 0,
    empty: 0,
  };
  guesses.forEach((g) => {
    scoreGuess(g, target).forEach((state, i) => {
      const l = g[i];
      if (!map[l] || rank[state] > rank[map[l]]) map[l] = state;
    });
  });
  return map;
}

// ── Colours ───────────────────────────────────────────────────────────────────
const TILE: Record<
  LetterState,
  { bg: string; border: string; color: string; shadow?: string }
> = {
  correct: {
    bg: "#003d10",
    border: "#00ff41",
    color: "#00ff41",
    shadow: "0 0 10px rgba(0,255,65,0.35)",
  },
  present: { bg: "#2a1a00", border: "#ffb300", color: "#ffb300" },
  absent: { bg: "#0a150a", border: "#0d2a14", color: "#004d13" },
  tbd: { bg: "transparent", border: "#006620", color: "#00ff41" },
  empty: { bg: "transparent", border: "#0d2a14", color: "transparent" },
};

// ── Keyboard layout ───────────────────────────────────────────────────────────
const KB_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

// ── Component ─────────────────────────────────────────────────────────────────
export function WordleView({ lang }: { lang: "en" | "es" }) {
  const [target, setTarget] = useState<string>(() => getRandomWord(lang));
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [gameState, setGameState] = useState<GameState>("playing");
  const [shake, setShake] = useState(false);
  const [notAWord, setNotAWord] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [elapsed, setElapsed] = useState<number | null>(null);
  // eslint-disable-next-line
  const startTimeRef = useRef<number | null>(Date.now());

  const loadWord = useCallback(() => {
    setTarget(getRandomWord(lang));
    setGuesses([]);
    setCurrent("");
    setGameState("playing");
    setElapsed(null);
    startTimeRef.current = Date.now();
  }, [lang]);

  const addLetter = useCallback((l: string) => {
    setCurrent((c) => (c.length < 5 ? c + l : c));
  }, []);

  const delLetter = useCallback(() => {
    setCurrent((c) => c.slice(0, -1));
  }, []);

  const submit = useCallback(async () => {
    if (!target || current.length !== 5) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    // Win condition first — no API call needed if the guess is already correct
    if (current === target) {
      setGuesses((prev) => [...prev, current]);
      setCurrent("");
      setGameState("won");
      setElapsed(
        startTimeRef.current
          ? Math.floor((Date.now() - startTimeRef.current) / 1000)
          : null,
      );
      return;
    }
    setIsChecking(true);
    const valid = await checkWord(current, lang);
    setIsChecking(false);
    if (!valid) {
      setNotAWord(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setNotAWord(false);
      }, 1600);
      return;
    }
    const next = [...guesses, current];
    setGuesses(next);
    setCurrent("");
    if (next.length >= 6) {
      setGameState("lost");
      setElapsed(
        startTimeRef.current
          ? Math.floor((Date.now() - startTimeRef.current) / 1000)
          : null,
      );
    }
  }, [target, current, guesses, lang]);

  // Physical keyboard (only when terminal input is NOT focused)
  useEffect(() => {
    if (gameState !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (isChecking) return;
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Enter") {
        e.preventDefault();
        void submit();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        delLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) addLetter(e.key.toUpperCase());
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [gameState, isChecking, submit, delLetter, addLetter]);

  // Build the 6 display rows
  const rows: { letters: string[]; states: LetterState[] }[] = Array.from(
    { length: 6 },
    (_, i) => {
      if (i < guesses.length) {
        return {
          letters: guesses[i].split(""),
          states: target
            ? scoreGuess(guesses[i], target)
            : Array(5).fill("absent" as LetterState),
        };
      }
      if (i === guesses.length && gameState === "playing") {
        const letters = [
          ...current.split(""),
          ...Array(5 - current.length).fill(""),
        ];
        return {
          letters,
          states: letters.map((l) => (l ? "tbd" : "empty")) as LetterState[],
        };
      }
      return {
        letters: Array(5).fill(""),
        states: Array(5).fill("empty" as LetterState),
      };
    },
  );

  const keyMap = target ? buildKeyMap(guesses, target) : {};

  return (
    // stopPropagation prevents terminal-root's onClick={focus} from stealing
    // keyboard focus back to the terminal input when the user clicks here
    <div
      style={{ padding: "0 8px 16px", height: "100%", overflowY: "auto" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Hint ── */}
      <div className="t-section-sub" style={{ marginBottom: "14px" }}>
        {lang === "en"
          ? "// click panel · type letters · enter to submit · backspace to delete"
          : "// clic en el panel · escribe letras · enter para enviar · retroceso para borrar"}
      </div>

      {/* ── Centred game area ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* State banner */}
        {isChecking && (
          <div style={{ color: "#006620", fontSize: "12px" }}>
            {lang === "en" ? "// checking word…" : "// verificando palabra…"}
          </div>
        )}
        {notAWord && (
          <div style={{ color: "#ff4444", fontSize: "12px" }}>
            {lang === "en"
              ? "// not in word list — try another"
              : "// no está en la lista — intenta con otra"}
          </div>
        )}
        {gameState === "won" && (
          <div
            style={{
              color: "#00ff41",
              fontSize: "12px",
              textAlign: "center",
              lineHeight: "1.7",
            }}
          >
            {lang === "en"
              ? `// "${target}" — solved in ${guesses.length}/6`
              : `// "${target}" — resuelta en ${guesses.length}/6`}
            {elapsed !== null && (
              <>
                <br />
                {lang === "en"
                  ? `// time: ${formatTime(elapsed)}`
                  : `// tiempo: ${formatTime(elapsed)}`}
              </>
            )}
          </div>
        )}
        {gameState === "lost" && (
          <div
            style={{
              color: "#ff4444",
              fontSize: "12px",
              textAlign: "center",
              lineHeight: "1.7",
            }}
          >
            {lang === "en"
              ? `// game over — the word was "${target}"`
              : `// fin — la palabra era "${target}"`}
            {elapsed !== null && (
              <>
                <br />
                <span style={{ color: "#888" }}>
                  {lang === "en"
                    ? `// time: ${formatTime(elapsed)}`
                    : `// tiempo: ${formatTime(elapsed)}`}
                </span>
              </>
            )}
          </div>
        )}

        {/* ── Grid ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {rows.map((row, ri) => {
            const isActive = ri === guesses.length && gameState === "playing";
            return (
              <div
                key={ri}
                style={{
                  display: "flex",
                  gap: "6px",
                  animation:
                    isActive && shake ? "wordle-shake 0.4s ease" : undefined,
                }}
              >
                {row.letters.map((letter, ci) => {
                  const s = row.states[ci];
                  const t = TILE[s];
                  return (
                    <div
                      key={ci}
                      style={{
                        width: "52px",
                        height: "52px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: t.bg,
                        border: `1px solid ${t.border}`,
                        color: t.color,
                        fontFamily: "inherit",
                        fontSize: "18px",
                        fontWeight: "700",
                        boxShadow: t.shadow,
                        transition: "background 0.2s, border-color 0.2s",
                      }}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <hr className="t-divider" style={{ width: "100%", margin: "2px 0" }} />

        {/* ── On-screen keyboard ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          {KB_ROWS.map((row, ri) => (
            <div key={ri} style={{ display: "flex", gap: "5px" }}>
              {row.map((key) => {
                const isSpecial = key.length > 1;
                const state = !isSpecial ? keyMap[key] : undefined;
                const t =
                  state === "absent"
                    ? {
                        bg: "#1a0000",
                        border: "#660000",
                        color: "#ff4444",
                        shadow: undefined,
                      }
                    : state
                      ? TILE[state]
                      : TILE.empty;
                return (
                  <button
                    key={key}
                    disabled={key === "ENTER" && isChecking}
                    onClick={() => {
                      if (key === "ENTER") void submit();
                      else if (key === "⌫") delLetter();
                      else addLetter(key);
                    }}
                    style={{
                      minWidth: isSpecial ? "52px" : "32px",
                      height: "38px",
                      padding: "0 4px",
                      background: state ? t.bg : "#0a150a",
                      border: `1px solid ${state ? t.border : "#0d2a14"}`,
                      color: state ? t.color : "#006620",
                      fontFamily: "inherit",
                      fontSize: isSpecial ? "9px" : "11px",
                      fontWeight: "700",
                      cursor: "pointer",
                      boxShadow: state ? t.shadow : undefined,
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!state) e.currentTarget.style.borderColor = "#006620";
                    }}
                    onMouseLeave={(e) => {
                      if (!state) e.currentTarget.style.borderColor = "#0d2a14";
                    }}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* New game button */}
        {(gameState === "won" || gameState === "lost") && (
          <button
            onClick={loadWord}
            style={{
              background: "transparent",
              border: "1px solid #006620",
              color: "#00ff41",
              fontFamily: "inherit",
              fontSize: "12px",
              fontWeight: "700",
              padding: "8px 20px",
              cursor: "pointer",
              textShadow: "0 0 6px rgba(0,255,65,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00ff41";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(0,255,65,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#006620";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {lang === "en" ? "// new game" : "// nueva partida"}
          </button>
        )}
      </div>

      {/* Shake animation */}
      <style>{`
        @keyframes wordle-shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-6px); }
          40%     { transform: translateX(6px); }
          60%     { transform: translateX(-4px); }
          80%     { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
