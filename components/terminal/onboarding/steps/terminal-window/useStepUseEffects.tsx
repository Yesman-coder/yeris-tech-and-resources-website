"use client";

import { SetStateAction, useEffect } from "react";
import { DisplayItem, Phase, WindowItem } from "./step-terminal-window";

interface UseStepUseEffectsProps {
  setVisible: (v: SetStateAction<boolean>) => void;
  narratorTimersRef: React.RefObject<ReturnType<typeof setTimeout>[]>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  windowScrollRef: React.RefObject<HTMLDivElement | null>;
  displayItems: DisplayItem[];
  windowItems: WindowItem[];
  phase: Phase;
}

const useStepUseEffects = ({
  setVisible,
  narratorTimersRef,
  scrollRef,
  windowScrollRef,
  displayItems,
  windowItems,
  phase,
}: UseStepUseEffectsProps) => {
  // ── Trigger fade-in on mount ─────────────────────────────────────────────
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // ── Clear narrator timers on unmount ─────────────────────────────────────
  useEffect(() => {
    return () => {
      narratorTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  // ── Auto-scroll terminal history whenever content grows ──────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [displayItems]);

  // ── Auto-scroll window panel whenever content grows ──────────────────────
  useEffect(() => {
    const el = windowScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [windowItems, phase]);

  return {};
};

export default useStepUseEffects;
