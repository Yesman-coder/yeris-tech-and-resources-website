"use client";

import React, { useState, useEffect, useRef } from "react";
import { HistoryEntry, ResponseLine } from "./useTerminal";
import { ASCII_ART } from "@/lib/ascii";

// ── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

const ASCII_LINE_MS = 100; // ms between each revealed line of ASCII art

// How long each line type takes to complete its animation
const animDuration = (line: ResponseLine): number => {
  if (line.type === "text") return line.content.length * 35;
  if (line.type === "download") return line.duration ?? 2000;
  if (line.type === "ascii") {
    const render = ASCII_ART[line.art];
    const output = render ? render(line.extra) : "";
    return output.split("\n").length * ASCII_LINE_MS;
  }
  if (line.type === "menu") return 0;
  return 0; // plain: instant
};

// ── ASCII art line — reveals one row at a time ────────────────────────────────

const AsciiLine: React.FC<{ art: string; extra?: string; color?: string }> = ({
  art,
  extra,
  color,
}) => {
  const render = ASCII_ART[art];
  const allLines = (render ? render(extra) : (extra ?? "")).split("\n");

  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const total = allLines.length;
    let step = 0;
    intervalRef.current = setInterval(() => {
      step++;
      setCount(step);
      if (step >= total && intervalRef.current)
        clearInterval(intervalRef.current);
    }, ASCII_LINE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <pre
      className="terminal-response-line terminal-ascii terminal-glow"
      style={color ? { color } : undefined}
    >
      {allLines.slice(0, count).join("\n")}
    </pre>
  );
};

// ── Typewriter line ──────────────────────────────────────────────────────────

const TypewriterLine: React.FC<{
  content: string;
  isError?: boolean;
  color?: string;
}> = ({ content, isError, color }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let idx = 0;
    const typeNext = () => {
      if (idx >= content.length) {
        setDone(true);
        return;
      }
      idx++;
      setDisplayed(content.slice(0, idx));
      timerRef.current = setTimeout(typeNext, 16 + Math.random() * 38);
    };
    timerRef.current = setTimeout(typeNext, 0);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [content]);

  return (
    <div
      className={`terminal-response-line${isError ? " terminal-error" : ""}`}
      style={color ? { color } : undefined}
    >
      {displayed}
      {!done && <span className="terminal-typing-cursor">▋</span>}
    </div>
  );
};

// ── Download progress bar ────────────────────────────────────────────────────

const BAR_SLOTS = 14;

const DownloadLine: React.FC<{
  label: string;
  duration?: number;
  isError?: boolean;
}> = ({ label, duration = 2000, isError }) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let step = 0;
    intervalRef.current = setInterval(() => {
      step++;
      setProgress(step);
      if (step >= BAR_SLOTS && intervalRef.current)
        clearInterval(intervalRef.current);
    }, duration / BAR_SLOTS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration]);

  const filled = "|".repeat(progress);
  const empty = " ".repeat(BAR_SLOTS - progress);
  const pct = Math.floor((progress / BAR_SLOTS) * 100);

  return (
    <div
      className={`terminal-response-line terminal-download-line${isError ? " terminal-error" : ""}`}
    >
      <span className="terminal-download-label">{label}</span>
      <span className="terminal-download-bar">
        {"{"}
        <span className="terminal-download-filled">{filled}</span>
        <span className="terminal-download-empty">{empty}</span>
        {"}"}
      </span>
      <span className="terminal-download-pct">{pct}%</span>
    </div>
  );
};

// ── Inline menu — keyboard-navigated by useTerminal ─────────────────────────

const MenuLine: React.FC<{
  options: string[];
  selectedIdx: number;
  onSelect?: (idx: number) => void;
}> = ({ options, selectedIdx, onSelect }) => (
  <div>
    {options.map((opt, i) => (
      <div
        key={i}
        className="terminal-response-line"
        onClick={() => onSelect?.(i)}
        style={{
          color: i === selectedIdx ? "#00ff41" : "#004d13",
          fontWeight: i === selectedIdx ? "700" : "400",
          textShadow: i === selectedIdx ? "0 0 6px rgba(0,255,65,0.4)" : "none",
          cursor: onSelect ? "pointer" : "default",
          userSelect: "none",
        }}
      >
        {i === selectedIdx ? "❯ " : "  "}
        {opt}
      </div>
    ))}
  </div>
);

// ── Single history entry — sequential async runner ────────────────────────────

const TerminalEntryComp: React.FC<{
  entry: HistoryEntry;
  onMenuOptionClick?: (entryId: number, idx: number) => void;
}> = ({ entry, onMenuOptionClick }) => {
  const [visibleUpTo, setVisibleUpTo] = useState(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    const run = async () => {
      for (let i = 0; i < entry.response.length; i++) {
        const line = entry.response[i];

        // Pause before this line (relative to when previous line finished)
        const prePause = line.delay ?? 0;
        if (prePause > 0) {
          await sleep(prePause);
          if (cancelledRef.current) return;
        }

        // Show this line
        setVisibleUpTo(i + 1);

        // Wait for its animation to finish before moving on
        const dur = animDuration(line);
        if (dur > 0) {
          await sleep(dur);
          if (cancelledRef.current) return;
        }
      }

      // Short pause so the user can read the last line before the view switches
      await sleep(500);
      if (!cancelledRef.current) entry.onComplete?.();
    };

    run();
    return () => {
      cancelledRef.current = true;
    };
  }, [entry.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="terminal-entry">
      <div className="terminal-entry-input">
        <span className="terminal-prompt">❯</span>
        <span className="terminal-entry-cmd">{entry.input}</span>
      </div>
      <div className="terminal-entry-response">
        {(entry.response.slice(0, visibleUpTo) as ResponseLine[]).map(
          (line, i) => {
            if (line.type === "menu") {
              return (
                <MenuLine
                  key={i}
                  options={line.options}
                  selectedIdx={entry.menuSelectedIdx ?? 0}
                  onSelect={
                    onMenuOptionClick
                      ? (idx) => onMenuOptionClick(entry.id, idx)
                      : undefined
                  }
                />
              );
            }
            if (line.type === "ascii") {
              return (
                <AsciiLine
                  key={i}
                  art={line.art}
                  extra={line.extra}
                  color={line.color}
                />
              );
            }
            if (line.type === "text") {
              return (
                <TypewriterLine
                  key={i}
                  content={line.content}
                  isError={entry.isError}
                  color={line.color}
                />
              );
            }
            if (line.type === "download") {
              return (
                <DownloadLine
                  key={i}
                  label={line.label}
                  duration={line.duration}
                  isError={entry.isError}
                />
              );
            }
            return (
              <div
                key={i}
                className={`terminal-response-line${entry.isError ? " terminal-error" : ""}`}
                style={line.color ? { color: line.color } : undefined}
              >
                {line.content}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

// ── Public component ─────────────────────────────────────────────────────────

const HistoryTermianl: React.FC<{
  history: HistoryEntry[];
  onMenuOptionClick?: (entryId: number, idx: number) => void;
}> = ({ history, onMenuOptionClick }) => (
  <>
    {history.map((entry) => (
      <TerminalEntryComp
        key={`${entry.id}-${entry.version ?? 0}`}
        entry={entry}
        onMenuOptionClick={onMenuOptionClick}
      />
    ))}
  </>
);

export default HistoryTermianl;
