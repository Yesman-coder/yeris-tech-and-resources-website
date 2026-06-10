"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import useTerminal, { HistoryEntry } from "@/components/terminal/useTerminal";
import HistoryTermianl from "@/components/terminal/HistoryTermianl";
import { MatrixView } from "@/components/terminal/views/matrix-view";
import { estimateEntryDuration, NarratorLine } from "./helpers";
import { NARRATOR } from "./narrator";
import useStepTerminalWindow from "./useStepTerminalWindow";
import useStepUseEffects from "./useStepUseEffects";
import useMobile from "@/hooks/useMobile";

// ─────────────────────────────────────────────────────────────────────────────
// Narrator typewriter constants
// Keep in sync so pre-calculated delays match actual typing speed
// ─────────────────────────────────────────────────────────────────────────────
export const NARRATOR_CHAR_MS = 28; // ms per character typed
export const NARRATOR_LINE_GAP = 160; // ms gap between lines (after prev finishes)

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export type Phase =
  | "idle" // 2 s silence before intro starts
  | "intro" // narrator typing intro lines
  | "waitCoffee" // user must type /coffee
  | "afterCoffee" // narrator typing after-coffee lines
  | "waitInspire" // user must type /inspire
  | "inInspire" // /inspire is executing — user watches, then terminal slides out
  | "done" // terminal slid out → right panel visible (rightText + next button)
  | "windowIntro" // narrator types about the window section
  | "windowPrompt" // mobile-only: window visible, tap ❯ to slide terminal in
  | "waitMatrix" // user must type /matrix
  | "inMatrix" // matrix simulation is running
  | "afterMatrix"; // conclusion text + next button

// Narrator lines and real history entries are merged in arrival order
export type DisplayItem =
  | { kind: "narrator"; line: string; id: string }
  | { kind: "history"; entry: HistoryEntry };

export type WindowItem = { id: string; line: string };

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
interface StepTerminalProps {
  lang: "en" | "es";
  onNext: (n: number) => void;
  onDismiss: () => void;
}

export function StepTerminal({
  lang,
  onNext,
  onDismiss: _onDismiss,
}: StepTerminalProps) {
  const txt = NARRATOR[lang];
  const isMobile = useMobile();

  // Phase — both state (triggers render) and ref (stable in closures)
  const [phase, _setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  function setPhase(p: Phase) {
    phaseRef.current = p;
    _setPhase(p);
  }

  const isWaitingToType = useMemo(
    () =>
      phase === "waitCoffee" ||
      phase === "waitInspire" ||
      phase === "waitMatrix",
    [phase],
  );

  const isWindowPhase =
    phase === "windowIntro" ||
    phase === "windowPrompt" ||
    phase === "waitMatrix" ||
    phase === "inMatrix" ||
    phase === "afterMatrix";

  // Interleaved display items (left panel: terminal history)
  const [displayItems, setDisplayItems] = useState<DisplayItem[]>([]);
  const prevHistoryLenRef = useRef(0);
  const narratorIdRef = useRef(0);
  const narratorTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const waitingForCoffeeRef = useRef(false);
  const waitingForInspireRef = useRef(false);

  // Root fade-out when advancing to step 4
  const [rootFading, setRootFading] = useState(false);

  // Right panel — inspire sub-phase
  const [showRight, setShowRight] = useState(false);
  const [inspireFaded, setInspireFaded] = useState(false);

  // Right panel — window section
  const [windowItems, setWindowItems] = useState<WindowItem[]>([]);
  const windowNarratorIdRef = useRef(0);
  const wasInMatrixRef = useRef(false);
  const [showNextButton, setShowNextButton] = useState(false);

  // Fade-in state — panel starts invisible, transitions in on mount
  const [visible, setVisible] = useState(false);

  // DOM refs
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const windowScrollRef = useRef<HTMLDivElement>(null);
  const terminalPanelRef = useRef<HTMLDivElement>(null);

  // Triggers slide-in animation after React renders the terminal as display:flex
  const [pendingSlideIn, setPendingSlideIn] = useState(false);

  useLayoutEffect(() => {
    if (!pendingSlideIn || !isMobile) return;
    const el = terminalPanelRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.set(el, { x: "-100%" });
    gsap.to(el, {
      x: "0%",
      duration: 0.45,
      ease: "back.out(1.5)",
      onComplete: () => requestAnimationFrame(() => inputRef.current?.focus()),
    });
    setPendingSlideIn(false);
  }, [pendingSlideIn, isMobile]);

  function handleTapTerminalPrompt() {
    setPhase("waitMatrix");
    setPendingSlideIn(true);
  }

  // useTerminal — completely independent fresh instance
  const {
    processCommand: termProcess,
    handleKeyDown,
    history,
    input,
    setInput,
    isMenuActive,
    activeView,
    setActiveView,
    setLang,
  } = useTerminal();

  useEffect(() => {
    setLang(lang);
  }, [lang]);

  // After /inspire animations finish: slide terminal out on mobile, then reveal right panel
  const handleInspireComplete = useCallback(() => {
    const el = terminalPanelRef.current;
    if (isMobile && el) {
      gsap.to(el, {
        x: "-100%",
        duration: 0.28,
        ease: "power3.in",
        onComplete: () => {
          setPhase("done");
          setShowRight(true);
        },
      });
    } else {
      setPhase("done");
      setShowRight(true);
    }
  }, [isMobile]);

  const { typeLines, typeWindowLines } = useStepTerminalWindow({
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
    onInspireComplete: handleInspireComplete,
  });

  useStepUseEffects({
    setVisible,
    narratorTimersRef,
    scrollRef,
    windowScrollRef,
    displayItems,
    windowItems,
    phase,
  });

  // ── Detect matrix enter / exit ───────────────────────────────────────────
  useEffect(() => {
    if (activeView === "matrix") {
      wasInMatrixRef.current = true;
      if (phaseRef.current === "waitMatrix") setPhase("inMatrix");
      return;
    }
    if (wasInMatrixRef.current && phaseRef.current === "inMatrix") {
      wasInMatrixRef.current = false;
      // Clear windowIntro narrator lines before showing afterMatrix text
      setWindowItems([]);
      setPhase("afterMatrix");
      const afterLines =
        lang === "en" ? NARRATOR.en.afterMatrix : NARRATOR.es.afterMatrix;
      typeWindowLines(afterLines, () => setShowNextButton(true));
    }
  }, [activeView, lang, typeWindowLines]);

  // ── Intro sequence — starts 2 s after mount ───────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("intro");
      typeLines(txt.intro, () => {
        setPhase("waitCoffee");
        requestAnimationFrame(() => inputRef.current?.focus());
      });
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  // ── "next" clicked in inspire panel → transition to window section ────────
  function handleNextPhase() {
    // Fade out inspire content first
    setInspireFaded(true);
    setTimeout(() => {
      // Collapse inspire panel, expand window section
      setShowRight(false);
      setPhase("windowIntro");
      const windowLines =
        lang === "en" ? NARRATOR.en.windowIntro : NARRATOR.es.windowIntro;
      typeWindowLines(windowLines, () => {
        if (isMobile) {
          // Mobile: pause and wait for the user to tap ❯ before sliding in
          setPhase("windowPrompt");
        } else {
          setPhase("waitMatrix");
          requestAnimationFrame(() => inputRef.current?.focus());
        }
      });
    }, 400);
  }

  // ── Wrapped processCommand — intercepts guided commands ───────────────────
  const handleCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      const p = phaseRef.current;

      if (
        (cmd === "/coffee" || cmd === "coffee") &&
        p !== "afterCoffee" &&
        p !== "waitInspire" &&
        p !== "done" &&
        p !== "windowIntro" &&
        p !== "waitMatrix" &&
        p !== "afterMatrix"
      ) {
        setPhase("afterCoffee");
        waitingForCoffeeRef.current = true;
      } else if (
        (cmd === "/inspire" || cmd === "inspire") &&
        p === "waitInspire"
      ) {
        setPhase("inInspire");
        waitingForInspireRef.current = true;
      }

      const helpCommand =
        phase === "waitMatrix"
          ? "/matrix"
          : phase === "waitInspire"
            ? "/inspire"
            : phase === "waitCoffee"
              ? "/coffee"
              : "/help";

      // Always forward to the real terminal
      termProcess(raw, () => {}, helpCommand);
    },
    [termProcess],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  // Input is locked while the narrator is mid-typing or matrix is running
  const inputLocked = isMobile
    ? phase === "idle" ||
      phase === "intro" ||
      phase === "afterCoffee" ||
      phase === "inInspire" ||
      phase === "windowIntro" ||
      phase === "windowPrompt" ||
      phase === "done" ||
      phase === "inMatrix"
    : isMenuActive ||
      phase === "idle" ||
      phase === "intro" ||
      phase === "afterCoffee" ||
      phase === "inInspire" ||
      phase === "windowIntro" ||
      phase === "windowPrompt" ||
      phase === "inMatrix";

  function handleExitToStep4() {
    setRootFading(true);
    setTimeout(() => onNext(3), 400);
  }

  const pahsesTerminalMobileVisible = [
    "done",
    "windowIntro",
    "windowPrompt",
    "inMatrix",
    "afterMatrix",
  ];

  const isTerminalMobileVisible = useMemo(() => {
    if (isMobile && pahsesTerminalMobileVisible.includes(phase)) {
      return false;
    }
    return true;
  }, [isMobile, phase]);

  const typeInCommand = useMemo(() => {
    if (phase === "waitMatrix") {
      return "/matrix";
    }
    if (phase === "waitCoffee") {
      return "/coffee";
    }
    if (phase === "waitInspire") {
      return "/inspire";
    }
    return "the";
  }, [phase]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#000",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1000,
          top: 80,
          display: "flex",
          background: "#020202",
          opacity: rootFading ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        {/* ── Terminal left panel ──────────────────────────────────────── */}
        <div
          id="terminal-left"
          ref={terminalPanelRef}
          className="w-full md:w-[300px]"
          style={{
            flexShrink: 0,
            background: "#000",
            transition: "opacity 0.8s ease",
            opacity: visible ? 1 : 0,
            display: isTerminalMobileVisible ? "flex" : "none",
            flexDirection: "column",
            borderTop: "1px solid #003309",
            borderRight: "1px solid #003309",
            overflow: "hidden",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="terminal-panel-header">terminal</div>
          {isWaitingToType && (
            <div className="onboarding-coach" aria-hidden="true">
              <div className="onboarding-coach-text">
                {lang === "en"
                  ? `type and enter "${typeInCommand}" here`
                  : `escribe "${typeInCommand}" presion enter aquí`}
              </div>
              <div className="onboarding-coach-arrow">↓</div>
            </div>
          )}

          {/* Scrollable history + narrator area */}
          <div
            ref={scrollRef}
            className="terminal-history"
            style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}
          >
            {displayItems.map((item) => {
              if (item.kind === "narrator") {
                const isComment = item.line.startsWith("//");
                return (
                  <NarratorLine
                    key={item.id}
                    text={item.line}
                    color={isComment ? "#006b1a" : "#00cc33"}
                  />
                );
              }
              return (
                <HistoryTermianl key={item.entry.id} history={[item.entry]} />
              );
            })}
          </div>
          {/* Input form — hidden on mobile (replaced by fixed bottom bar) */}
          <form
            onSubmit={handleSubmit}
            className="terminal-input-row"
            onClick={(e) => e.stopPropagation()}
            style={{ display: isMobile ? "none" : undefined }}
          >
            <span className="terminal-prompt">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") handleKeyDown(e);
              }}
              className="terminal-input"
              placeholder={inputLocked ? txt.loading : txt.placeholder}
              autoComplete="off"
              spellCheck={false}
              readOnly={inputLocked}
            />
            <button
              type="submit"
              className="terminal-submit-btn"
              disabled={inputLocked}
            >
              →
            </button>
          </form>
        </div>

        {/* ── Inspire panel — fades in after /inspire, collapses on next ── */}
        <div
          style={{
            width: showRight ? (isMobile ? "100%" : "50%") : "0%",
            opacity: showRight ? 1 : 0,
            overflow: "hidden",
            flexShrink: 0,
            transition:
              "width 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: showRight ? "48px 40px" : "0",
          }}
        >
          <div
            style={{
              maxWidth: 320,
              textAlign: "center",
              opacity: inspireFaded ? 0 : 1,
              transition: "opacity 0.35s ease",
            }}
          >
            <p
              className="t-boot-line"
              style={{
                fontSize: "14px",
                lineHeight: 1.85,
                color: "#00cc33",
                marginBottom: "36px",
                letterSpacing: "0.02em",
              }}
            >
              {txt.rightText}
            </p>
            <button onClick={handleNextPhase} className="t-btn">
              {txt.next}
            </button>
          </div>
        </div>

        {/* ── Window render section — appears after inspire panel collapses ── */}
        <div
          style={{
            flex: 1,
            maxWidth: isWindowPhase ? "100vw" : "0px",
            opacity: isWindowPhase ? 1 : 0,
            overflow: "hidden",
            transition:
              "max-width 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease 0.15s",
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid #003309",
            borderLeft: "1px solid #003309",
            paddingBottom: isMobile ? 52 : 0,
          }}
        >
          <div className="terminal-panel-header">Window render section</div>

          {/* Matrix view — fills the panel when active */}
          {activeView === "matrix" && isWindowPhase && (
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <MatrixView onExit={() => setActiveView("boot")} lang={lang} />
            </div>
          )}

          {/* Narrator + conclusion — hidden while matrix is running */}
          {activeView !== "matrix" && (
            <div
              ref={windowScrollRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 32px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Typed narrator lines */}
              {windowItems.map((item) => (
                <NarratorLine key={item.id} text={item.line} color="#00cc33" />
              ))}

              {/* Next button appears after all afterMatrix lines finish typing */}
              {showNextButton && (
                <div style={{ marginTop: "40px", textAlign: "center" }}>
                  <button onClick={handleExitToStep4} className="t-btn">
                    {txt.next}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {phase === "windowPrompt" && isMobile && (
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: "35px",
              width: "300px",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0 0 12px 15px",
              gap: "4px",
              pointerEvents: "none",
              animation: "onboarding-fade-in 0.5s ease-out 0.25s both",
            }}
            aria-hidden="true"
            id="TIP"
          >
            <div className="onboarding-coach-text">
              {lang === "en"
                ? `Click here to open the terminal`
                : `Presion aquí para abrir la terminal`}
            </div>
            <div
              style={{
                fontSize: "22px",
                lineHeight: 1,
                color: "#00ff41",
                textShadow: "0 0 12px rgba(0,255,65,0.9)",
                animation: "onboarding-arrow-bounce 0.75s ease-in-out infinite",
              }}
            >
              ↓
            </div>
          </div>
        )}

        {/* ── Mobile: fixed bottom input bar (always visible) ── */}
        {isMobile && (
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 52,
              background: "#020202",
              borderTop: "1px solid #0d2a14",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 12px",
              zIndex: 20,
            }}
          >
            <button
              type="button"
              onClick={
                phase === "windowPrompt" ? handleTapTerminalPrompt : undefined
              }
              disabled={phase !== "windowPrompt"}
              style={{
                background: "transparent",
                border: "none",
                cursor: phase === "windowPrompt" ? "pointer" : "default",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                opacity: phase === "windowPrompt" ? 1 : 0.35,
              }}
            >
              <span className="terminal-prompt">❯</span>
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") handleKeyDown(e);
              }}
              className="terminal-input"
              placeholder={inputLocked ? txt.loading : txt.placeholder}
              autoComplete="off"
              spellCheck={false}
              readOnly={inputLocked}
            />
            <button
              type="submit"
              className="terminal-submit-btn"
              disabled={inputLocked}
            >
              →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
