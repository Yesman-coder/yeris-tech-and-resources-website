"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { BootView } from "./views/boot-view";
import { HelpView } from "./views/help-view";
import { GameView } from "./views/runner-view";
import { SnakeView } from "./views/snake-view";
import { WordleView } from "./views/wordle-view";
import { PingView } from "./views/ping-view";
import { MatrixView } from "./views/matrix-view";
import { GravityView } from "./views/gravity-view";
import { ModelView } from "./views/model-view";
import { PageFrame } from "./views/page-frame";
import { OnboardingOverlay } from "./onboarding/overlay";
import { BugsOverlay } from "./bugs-overlay";
import useTerminal from "./useTerminal";
import HistoryTermianl from "./HistoryTermianl";
import { useTerminalStore } from "@/store/terminal";
import { Commands, decideSlide, View } from "./commands";
import useMobile from "@/hooks/useMobile";

// Map view → existing Next.js route
const VIEW_TO_PATH: Partial<Record<View, string>> = {
  work: "/work",
  about: "/about",
  services: "/services",
  contact: "/contact",
};

export function Terminal() {
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const {
    processCommand,
    history,
    activeView,
    setActiveView,
    lang,
    pageMode,
    isFlipped,
    handleKeyDown,
    showOnboarding,
    setShowOnboarding,
    showBugs,
    setShowBugs,
    input,
    setInput,
    isMenuActive,
    setLang,
    onMenuOptionClick,
  } = useTerminal();

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalLeftRef = useRef<HTMLDivElement>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [mobileTerminalOpen, setMobileTerminalOpen] = useState(false);
  const { pendingCommand, clearPendingCommand } = useTerminalStore();
  const isMobile = useMobile();

  useEffect(() => {
    const el = terminalLeftRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (mobileTerminalOpen || !isMobile) {
      gsap.to(el, {
        x: "0%",
        duration: 0.8,
        ease: "power3.out",
        zIndex: 800,
      });
    } else {
      // gsap.to(el, { x: "-100%", duration: 0.28, ease: "power3" });
      gsap.to(el, { x: "-100%", duration: 0.28, ease: "power3.in" });
    }
  }, [mobileTerminalOpen, isMobile]);

  // ── Resizable left panel ──────────────────────────────────────────────────
  const DEFAULT_WIDTH = 300;
  const [leftWidth, setLeftWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null);

  const onHandleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragRef.current = { startX: e.clientX, startWidth: leftWidth };
      setIsResizing(true);
    },
    [leftWidth],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const delta = e.clientX - dragRef.current.startX;
      const next = Math.max(
        200,
        Math.min(dragRef.current.startWidth + delta, window.innerWidth * 0.65),
      );
      setLeftWidth(next);
    };
    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      setIsResizing(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = historyContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  // Scroll on every DOM mutation inside the history panel (typewriter chars,
  // ASCII lines, download ticks, menu changes, weather updates, etc.)
  useEffect(() => {
    const container = historyContainerRef.current;
    if (!container) return;
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
        scheduled = false;
      });
    });
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, []);

  const simulateType = useCallback(
    (cmd: string) => {
      if (isSimulating) return;
      setIsSimulating(true);
      setInput("");
      inputRef.current?.focus();

      let afterComplete: (() => void) | undefined;
      if (isMobile) {
        const slideOut = decideSlide(cmd as Commands, "out");
        const slideIn = decideSlide(cmd as Commands, "in");
        if (slideIn !== undefined) setMobileTerminalOpen(slideIn);
        if (slideOut !== undefined)
          afterComplete = () => setMobileTerminalOpen(slideOut);
      }

      let i = 0;
      const typeNext = () => {
        if (i >= cmd.length) {
          setTimeout(() => {
            processCommand(cmd, afterComplete);
            setInput("");
            setIsSimulating(false);
          }, 500);
          return;
        }
        i++;
        setInput(cmd.slice(0, i));
        setTimeout(typeNext, 35 + Math.random() * 45);
      };
      setTimeout(typeNext, 80);
      scrollToBottom();
    },
    [isSimulating, isMobile, processCommand, setInput, scrollToBottom],
  );

  useEffect(() => {
    const alreadyVisited = !!localStorage.getItem("yeristech-visited");
    if (alreadyVisited) {
      // Returning visitor — fade terminal in immediately, no onboarding
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTerminalVisible(true)),
      );
    } else {
      // First visit — show onboarding; terminal stays hidden until dismissed
      setShowOnboarding(true);
    }
  }, []);

  // Fire simulate-type whenever something outside calls executeCommand()
  useEffect(() => {
    if (!pendingCommand) return;
    clearPendingCommand();
    simulateType(pendingCommand);
  }, [pendingCommand]);

  const dismissOnboarding = useCallback(() => {
    setShowOnboarding(false);
    localStorage.setItem("yeristech-visited", "1");
    localStorage.removeItem("yeristech-onboarding-step");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setTerminalVisible(true)),
    );
    setTimeout(() => inputRef.current?.focus(), 850);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let afterComplete: (() => void) | undefined;
    if (isMobile) {
      const slideOut = decideSlide(
        input.trim().toLowerCase() as Commands,
        "out",
      );
      const slideIn = decideSlide(input.trim().toLowerCase() as Commands, "in");
      if (slideIn !== undefined) setMobileTerminalOpen(slideIn);
      if (slideOut !== undefined)
        afterComplete = () => setMobileTerminalOpen(slideOut);
    }
    processCommand(input, afterComplete);
    setInput("");
  };

  const toggleMobileTerminal = () => setMobileTerminalOpen((prev) => !prev);

  const focus = () => inputRef.current?.focus();
  const isWebsiteView = activeView in VIEW_TO_PATH;
  const isFullBleed =
    isWebsiteView ||
    activeView === "matrix" ||
    activeView === "ping" ||
    activeView === "gravity" ||
    activeView === "model";

  // Reset panel width and kill any active drag when entering a website view
  useEffect(() => {
    if (isWebsiteView) {
      dragRef.current = null;
      setIsResizing(false);
      setLeftWidth(DEFAULT_WIDTH);
    }
  }, [isWebsiteView]);

  return (
    <div
      className="terminal-root"
      onClick={focus}
      style={{
        ...(isResizing ? { userSelect: "none", cursor: "col-resize" } : {}),
        transform: isFlipped ? "rotate(180deg)" : "none",
        transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {showOnboarding && (
        <OnboardingOverlay
          lang={lang}
          onDismiss={dismissOnboarding}
          setLang={setLang}
        />
      )}
      {showBugs && <BugsOverlay onAllPatched={() => setShowBugs(false)} />}

      {/* Terminal UI — invisible during onboarding, fades in after dismiss */}
      <div
        style={{
          opacity: terminalVisible ? 1 : 0,
          transition: "opacity 0.8s ease",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* ── Top bar ─────────────────────────────── */}
        <div className="terminal-topbar">
          <span className="terminal-logo">
            yeris
            <span className="terminal-logo-dim">[tech+resources]</span>
            <span className="terminal-cursor">_</span>
          </span>
          <span className="terminal-topbar-sep">·</span>
          <span className="terminal-location">Miami / LATAM</span>
          <span
            className="terminal-lang-indicator"
            title={
              lang === "en"
                ? "type /lang es to switch"
                : "escribe /lang en para cambiar"
            }
          >
            {lang.toUpperCase()}
          </span>
        </div>

        {/* ── Panels ──────────────────────────────── */}
        <div className="terminal-panels">
          {/* Left: command history + input */}
          <div
            className={`terminal-left${mobileTerminalOpen ? " mobile-open" : ""}`}
            ref={terminalLeftRef}
            style={isMobile ? undefined : { width: leftWidth }}
            onClick={(e) => {
              e.stopPropagation();
              focus();
            }}
          >
            <div className="terminal-panel-header">terminal</div>

            <div
              className="terminal-history"
              style={{ position: "relative" }}
              ref={historyContainerRef}
            >
              <div
                className="terminal-commands-hint"
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#020202",
                }}
              >
                <div className="terminal-cmd-hint-label">
                  {lang === "en"
                    ? "available commands"
                    : "comandos disponibles"}
                </div>
                {[
                  "/home",
                  "/work",
                  "/about",
                  "/services",
                  "/contact",
                  "/help",
                  "/clear",
                ].map((cmd) => (
                  <button
                    key={cmd}
                    className="terminal-cmd-chip"
                    disabled={isSimulating}
                    onClick={(e) => {
                      e.stopPropagation();
                      simulateType(cmd);
                    }}
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              <HistoryTermianl history={history} onMenuOptionClick={onMenuOptionClick} />
            </div>

            {!showOnboarding && (
              <form
                onSubmit={handleSubmit}
                className={`terminal-input-row${showOnboarding ? " terminal-input-spotlight" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="terminal-prompt">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  placeholder={
                    lang === "en"
                      ? "type a command..."
                      : "escribe un comando..."
                  }
                  autoComplete="off"
                  spellCheck={false}
                  autoFocus
                  readOnly={isSimulating || isMenuActive}
                />
                <button type="submit" className="terminal-submit-btn">
                  →
                </button>
              </form>
            )}
          </div>

          {/* Drag handle — locked when a full website view is active */}
          <div
            className={`terminal-resize-handle${isResizing ? " is-resizing" : ""}${isWebsiteView ? " is-locked" : ""}`}
            onMouseDown={isWebsiteView ? undefined : onHandleMouseDown}
          />

          {/* Right: rendered output */}
          <div className="terminal-right">
            <div className="terminal-panel-header">
              {activeView === "boot"
                ? lang === "en"
                  ? "system · ready"
                  : "sistema · listo"
                : `/${activeView}`}
            </div>

            {/* flush (no padding) for full-page iframes, padded for terminal views */}
            <div
              className={`terminal-output${isFullBleed ? " terminal-output-page" : ""} md:mx-[24px]`}
            >
              {/* ── Terminal-native views ── */}
              {activeView === "boot" && (
                <BootView lang={lang} onCommand={simulateType} />
              )}
              {activeView === "help" && (
                <HelpView lang={lang} onCommand={simulateType} />
              )}
              {activeView === "runner" && <GameView />}
              {activeView === "snake" && <SnakeView />}
              {activeView === "wordle" && <WordleView lang={lang} />}
              {activeView === "ping" && <PingView onCommand={simulateType} />}
              {activeView === "matrix" && (
                <MatrixView onExit={() => setActiveView("boot")} lang={lang} />
              )}
              {activeView === "gravity" && (
                <GravityView onExit={() => setActiveView("boot")} lang={lang} />
              )}
              {activeView === "model" && (
                <ModelView onExit={() => setActiveView("boot")} lang={lang} />
              )}

              {/* ── Real pages rendered in iframes ── */}
              {isWebsiteView && activeView in VIEW_TO_PATH && (
                <PageFrame
                  path={VIEW_TO_PATH[activeView]!}
                  lang={lang}
                  mode={pageMode}
                />
              )}
            </div>
          </div>
        </div>
        {/* Mobile-only bottom input bar */}
        {!showOnboarding && (
          <form
            onSubmit={handleSubmit}
            className="mobile-input-bar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={toggleMobileTerminal}
              aria-label={
                mobileTerminalOpen ? "Close terminal" : "Open terminal"
              }
            >
              <span
                className="terminal-prompt"
                style={{
                  display: "inline-block",
                  transform: mobileTerminalOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                ❯
              </span>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              placeholder={
                lang === "en" ? "type a command..." : "escribe un comando..."
              }
              autoComplete="off"
              spellCheck={false}
              readOnly={isSimulating || isMenuActive}
            />
            <button type="submit" className="terminal-submit-btn">
              →
            </button>
          </form>
        )}
      </div>
      {/* end terminal UI wrapper */}
    </div>
  );
}
