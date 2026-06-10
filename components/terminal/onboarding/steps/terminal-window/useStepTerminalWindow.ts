"use client";

import { SetStateAction, useCallback, useEffect } from "react";
import {
  DisplayItem,
  NARRATOR_CHAR_MS,
  NARRATOR_LINE_GAP,
  Phase,
  WindowItem,
} from "./step-terminal-window";
import { HistoryEntry } from "@/components/terminal/useTerminal";
import { NARRATOR } from "./narrator";

interface UseStepTerminalWindowProps {
  narratorIdRef: React.RefObject<number>;
  windowNarratorIdRef: React.RefObject<number>;
  setDisplayItems: (v: SetStateAction<DisplayItem[]>) => void;
  setWindowItems: (v: SetStateAction<WindowItem[]>) => void;
  narratorTimersRef: React.RefObject<ReturnType<typeof setTimeout>[]>;
  history: HistoryEntry[];
  lang: "en" | "es";
  setPhase: (v: Phase) => void;
  waitingForCoffeeRef: React.RefObject<boolean>;
  waitingForInspireRef: React.RefObject<boolean>;
  prevHistoryLenRef: React.RefObject<number>;
  estimateEntryDuration: (entry: HistoryEntry) => number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInspireComplete: () => void;
}

const useStepTerminalWindow = ({
  narratorIdRef,
  windowNarratorIdRef,
  setDisplayItems,
  setWindowItems,
  narratorTimersRef,
  history,
  lang,
  setPhase,
  waitingForCoffeeRef,
  waitingForInspireRef,
  prevHistoryLenRef,
  estimateEntryDuration,
  inputRef,
  onInspireComplete,
}: UseStepTerminalWindowProps) => {
  // ── Append one narrator line to the terminal display ─────────────────────
  const addNarratorLine = useCallback((line: string) => {
    const id = `n-${narratorIdRef.current++}`;
    setDisplayItems((prev) => [...prev, { kind: "narrator", line, id }]);
  }, []);

  // ── Type narrator lines with pre-calculated delays ───────────────────────
  const typeLines = useCallback(
    (lines: readonly string[], onDone?: () => void) => {
      let delay = 0;
      lines.forEach((line) => {
        const t = setTimeout(() => addNarratorLine(line), delay);
        narratorTimersRef.current.push(t);
        delay += line.length * NARRATOR_CHAR_MS + NARRATOR_LINE_GAP;
      });
      const finalT = setTimeout(() => onDone?.(), delay);
      narratorTimersRef.current.push(finalT);
    },
    [addNarratorLine],
  );

  // ── Append one narrator line to the window panel ─────────────────────────
  const addWindowLine = useCallback((line: string) => {
    const id = `w-${windowNarratorIdRef.current++}`;
    setWindowItems((prev) => [...prev, { id, line }]);
  }, []);

  // ── Type narrator lines into the window panel ────────────────────────────
  const typeWindowLines = useCallback(
    (lines: readonly string[], onDone?: () => void) => {
      let delay = 0;
      lines.forEach((line) => {
        const t = setTimeout(() => addWindowLine(line), delay);
        narratorTimersRef.current.push(t);
        delay += line.length * NARRATOR_CHAR_MS + NARRATOR_LINE_GAP;
      });
      const finalT = setTimeout(() => onDone?.(), delay);
      narratorTimersRef.current.push(finalT);
    },
    [addWindowLine],
  );

  // ── Sync new history entries into displayItems in arrival order ──────────
  useEffect(() => {
    const newEntries = history.slice(prevHistoryLenRef.current);
    if (newEntries.length === 0) return;
    prevHistoryLenRef.current = history.length;

    for (const entry of newEntries) {
      if (
        entry.input.trim().toLowerCase() === "/coffee" &&
        waitingForCoffeeRef.current
      ) {
        waitingForCoffeeRef.current = false;
        const animMs = estimateEntryDuration(entry);
        const t = setTimeout(() => {
          const afterLines =
            lang === "en" ? NARRATOR.en.afterCoffee : NARRATOR.es.afterCoffee;
          typeLines(afterLines, () => {
            setPhase("waitInspire");
            requestAnimationFrame(() => inputRef.current?.focus());
          });
        }, animMs);
        narratorTimersRef.current.push(t);
      }

      if (
        entry.input.trim().toLowerCase() === "/inspire" &&
        waitingForInspireRef.current
      ) {
        waitingForInspireRef.current = false;
        const animMs = estimateEntryDuration(entry);
        const t = setTimeout(() => onInspireComplete(), animMs);
        narratorTimersRef.current.push(t);
      }
    }

    setDisplayItems((prev) => [
      ...prev,
      ...newEntries.map((entry) => ({ kind: "history" as const, entry })),
    ]);
  }, [history, lang, typeLines]);

  return { typeLines, typeWindowLines };
};

export default useStepTerminalWindow;
