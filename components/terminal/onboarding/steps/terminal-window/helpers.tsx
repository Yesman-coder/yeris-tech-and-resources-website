"use client";

import { useEffect, useState } from "react";
import { NARRATOR_CHAR_MS } from "./step-terminal-window";
import { HistoryEntry } from "@/components/terminal/useTerminal";

// ─────────────────────────────────────────────────────────────────────────────
export function NarratorLine({ text, color }: { text: string; color: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;
    function typeNext() {
      if (idx >= text.length) {
        setDone(true);
        return;
      }
      idx++;
      setDisplayed(text.slice(0, idx));
      timer = setTimeout(typeNext, NARRATOR_CHAR_MS);
    }
    timer = setTimeout(typeNext, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="t-boot-line"
      style={{ color, fontSize: "12px", lineHeight: 1.7 }}
    >
      {displayed}
      {!done && <span className="terminal-typing-cursor">▋</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Estimate how long a history entry's animations take (mirrors HistoryTermianl)
// Used to delay narrator until command output finishes
// ─────────────────────────────────────────────────────────────────────────────
export function estimateEntryDuration(entry: HistoryEntry): number {
  const CHAR_MS = 35; // matches TypewriterLine average in HistoryTermianl
  const ASCII_MS = 100;
  const END_PAUSE_MS = 500; // TerminalEntryComp waits 500 ms after last line

  return (
    entry.response.reduce((acc, line) => {
      const pre = line.delay ?? 0;
      if (line.type === "text")
        return acc + pre + line.content.length * CHAR_MS;
      if (line.type === "download")
        return acc + pre + ((line as { duration?: number }).duration ?? 2000);
      if (line.type === "ascii") return acc + pre + ASCII_MS * 15;
      return acc + pre;
    }, 0) + END_PAUSE_MS
  );
}
