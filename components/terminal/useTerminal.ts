"use client";

import { useState } from "react";
import { fireConfetti } from "@/lib/confetti";
import { CMD_LIST, CMD_TO_VIEW, commands, Lang, View } from "./commands";
import useMode, { CommandAction } from "./actions/useMode";
import useFlip from "./actions/useFlip";
import useExit from "./actions/useExit";
import useRmRf from "./actions/useRmRf";
import useTimeTravel from "./actions/useTimeTravel";
import useSudo from "./actions/useSudo";
import useBugs from "./actions/useBugs";
import useDeploy from "./actions/useDeploy";
import useGitBlame from "./actions/useGitBlame";
import useInspire from "./actions/useInspire";
import useCowsay from "./actions/useCowsay";
import useWeather from "./actions/useWeather";
import useWhoami from "./actions/useWhoami";
import useUptime from "./actions/useUptime";
import useRps from "./actions/useRps";
import useHello from "./actions/useHello";

export type ResponseLine =
  | { type: "text"; content: string; delay?: number; color?: string }
  | {
      type: "download";
      label: string;
      delay?: number;
      duration?: number;
      color?: string;
    }
  | { type: "plain"; content: string; delay?: number; color?: string }
  | {
      type: "ascii";
      art: string;
      extra?: string;
      delay?: number;
      color?: string;
    }
  | {
      type: "menu";
      options: string[];
      delay?: number;
      color?: string;
    };

export interface HistoryEntry {
  id: number;
  version?: number;
  menuSelectedIdx?: number;
  input: string;
  response: ResponseLine[];
  isError?: boolean;
  onComplete?: () => void;
}

function langResponse(newLang: Lang): ResponseLine[] {
  return [
    {
      type: "text",
      content:
        newLang === "en"
          ? "// switched to English — all pages will reload in EN"
          : "// cambiando a español — las páginas se recargan en ES",
    },
  ];
}

const RPS_CHOICES = ["rock", "paper", "scissors"] as const;
type RpsChoice = (typeof RPS_CHOICES)[number];
const RPS_SYMBOLS: Record<RpsChoice, string> = {
  rock: "✊",
  paper: "✋",
  scissors: "✂️",
};
const RPS_BEATS: Record<RpsChoice, RpsChoice> = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};
const RPS_QUIPS: Record<"win" | "lose" | "tie", string[]> = {
  win: [
    "// you got lucky. don't get used to it.",
    "// error: expected to win. recalculating.",
    "// fine. this round.",
    "// beginner's luck. noted.",
  ],
  lose: [
    "// the machine wins again. shocking.",
    "// skill issue detected.",
    "// too easy.",
    "// better luck next time.",
  ],
  tie: [
    "// we think alike. concerning.",
    "// a tie? boring.",
    "// you copied me. probably.",
    "// same wavelength.",
  ],
};

export const SESSION_START = Date.now();

const useTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [activeView, setActiveView] = useState<View>("boot");
  const [lang, setLang] = useState<Lang>("en");
  const [pageMode, setPageMode] = useState<"dark" | "light">("dark");
  const [isFlipped, setIsFlipped] = useState(false);
  const [counter, setCounter] = useState(0);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showBugs, setShowBugs] = useState(false);
  const [rpsMenu, setRpsMenu] = useState<{
    entryId: number;
    selectedIdx: number;
  } | null>(null);
  const executeMode = useMode();
  const executeFlip = useFlip();
  const executeExit = useExit();
  const executeRmRf = useRmRf();
  const executeTimeTravel = useTimeTravel();
  const executeSudo = useSudo();
  const executeBugs = useBugs();
  const executeDeploy = useDeploy();
  const executeGitBlame = useGitBlame();
  const executeInspire = useInspire();
  const executeCowsay = useCowsay();
  const executeWeather = useWeather();
  const executeWhoami = useWhoami();
  const executeUptime = useUptime();
  const executeRps = useRps();
  const executeHello = useHello();

  const processCommand = (
    raw: string,
    onAfterComplete?: () => void,
    helpCommand: string = "/help",
  ) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const id = counter;
    setCounter((c) => c + 1);
    setCmdHistory((h) => [raw.trim(), ...h].slice(0, 50));
    setCmdHistoryIdx(-1);

    if ("/" + activeView === cmd) {
      setHistory((h) => [
        ...h,
        {
          id,
          input: raw.trim(),
          response: [
            {
              type: "text",
              content:
                lang === "en"
                  ? `// you already are in ${raw.trim()}`
                  : `// ya estás en ${raw.trim()}`,
              delay: 200,
            },
          ],
        },
      ]);
      return;
    }

    // /clear
    if (cmd === "/clear") {
      setHistory([]);
      return;
    }

    // /lang [en|es] — toggle or explicit
    if (
      cmd === "/lang" ||
      cmd === "/language" ||
      cmd === "/lang en" ||
      cmd === "/lang es" ||
      cmd === "/language en" ||
      cmd === "/language es"
    ) {
      let newLang: Lang;
      if (cmd.endsWith(" en")) {
        newLang = "en";
      } else if (cmd.endsWith(" es")) {
        newLang = "es";
      } else {
        newLang = lang === "en" ? "es" : "en";
      }
      setLang(newLang);
      setHistory((h) => [
        ...h,
        { id, input: raw.trim(), response: langResponse(newLang) },
      ]);
      return;
    }

    const executeProp: CommandAction = {
      activeView,
      lang,
      pageMode,
      setHistory,
      id,
      cmd: raw.trim(),
      onComplete: () => {
        onAfterComplete?.();
      },
    };

    // /mode [light|dark] — toggle page theme, only works inside a website view
    if (cmd === "/mode" || cmd === "/mode light" || cmd === "/mode dark") {
      executeMode({ setPageMode, ...executeProp });
      return;
    }

    // /flip — rotate right panel 180°, toggle back on second call
    if (cmd === "/flip") {
      executeFlip({ setIsFlipped, isFlipped, ...executeProp });
      return;
    }

    // /exit — dramatic fake shutdown → reboot
    if (cmd === "/exit") {
      executeExit({ setActiveView, ...executeProp });
      return;
    }

    // /rm -rf / — classic Unix troll
    if (cmd === "/rm -rf /" || cmd === "/rm -rf" || cmd === "/rm") {
      executeRmRf({ ...executeProp });
      return;
    }

    // ── Fake / joke commands ──────────────────────────────────────────────────
    if (cmd === "/time-travel") {
      executeTimeTravel({ ...executeProp });
      return;
    }

    if (cmd === "/sudo" || cmd.startsWith("/sudo ")) {
      executeSudo({ ...executeProp });
      return;
    }

    if (cmd === "/bugs") {
      executeBugs({ ...executeProp, setShowBugs, showBugs });
      return;
    }

    if (cmd === "/deploy") {
      executeDeploy({ ...executeProp });
      return;
    }

    if (cmd === "/git-blame") {
      executeGitBlame({ ...executeProp });
      return;
    }

    // /fortune — random dev/startup/philosophy quote
    if (cmd === "/inspire") {
      executeInspire({ ...executeProp });
      return;
    }

    // /cowsay [text] — render ASCII cow with speech bubble
    if (cmd.startsWith("/cowsay")) {
      executeCowsay({ ...executeProp });
      return;
    }

    // /weather — real weather via geolocation + Open-Meteo (no API key needed)
    if (cmd === "/weather") {
      executeWeather({ ...executeProp });
      return;
    }

    // /whoami — browser environment snapshot
    if (cmd === "/whoami") {
      executeWhoami({ ...executeProp });
      return;
    }

    // /uptime — session duration with snarky commentary
    if (cmd === "/uptime") {
      executeUptime({ ...executeProp });
      return;
    }

    // /date — ISO datetime
    if (cmd === "/date") {
      const response: ResponseLine[] = [
        {
          type: "text",
          content: `// ${new Date().toISOString()}`,
          color: "#00ff41",
        },
      ];
      setHistory((h) => [...h, { id, input: raw.trim(), response }]);
      return;
    }

    // /rps — inline rock-paper-scissors with keyboard menu
    if (cmd === "/rps") {
      executeRps({ ...executeProp, setRpsMenu });
      return;
    }

    // /hello — random funny greeting
    if (cmd === "/hello") {
      executeHello({ ...executeProp });
      return;
    }

    // /tutorial — reset onboarding and restart from step 1
    if (cmd === "/tutorial") {
      localStorage.removeItem("yeristech-visited");
      localStorage.removeItem("yeristech-onboarding-step");
      const response: ResponseLine[] = [
        {
          type: "text",
          content:
            lang === "en"
              ? "// restarting onboarding..."
              : "// reiniciando el tutorial...",
          color: "#00ff41",
        },
      ];
      setHistory((h) => [
        ...h,
        {
          id,
          input: raw.trim(),
          response,
          onComplete: () => {
            onAfterComplete?.();
          },
        },
      ]);
      setTimeout(() => setShowOnboarding(true), 600);
      return;
    }

    // /hack, /confetti, /coffee — side-effect only, no view change
    if (cmd === "/confetti" || cmd === "/coffee") {
      const response = commands[cmd]?.[lang] ?? [
        { type: "plain" as const, content: "// done" },
      ];
      setHistory((h) => [
        ...h,
        {
          id,
          input: raw.trim(),
          response,
          onComplete:
            cmd === "/confetti"
              ? () => {
                  fireConfetti();
                  onAfterComplete?.();
                }
              : undefined,
        },
      ]);
      return;
    }

    const view = CMD_TO_VIEW[cmd];
    if (view) {
      const response = commands[cmd]?.[lang] ?? [
        { type: "plain" as const, content: "// loading..." },
      ];
      setHistory((h) => [
        ...h,
        {
          id,
          input: raw.trim(),
          response,
          onComplete: () => {
            setActiveView(view);
            onAfterComplete?.();
          },
        },
      ]);
    } else {
      const errMsg: ResponseLine[] = [
        {
          type: "text",
          content:
            lang === "en"
              ? `// command not found: "${cmd}" — type ${helpCommand}`
              : `// comando no encontrado: "${cmd}" — escribe ${helpCommand}`,
        },
      ];
      setHistory((h) => [
        ...h,
        { id, input: raw.trim(), response: errMsg, isError: true },
      ]);
    }
  };

  const resolveRps = (entryId: number, selectedIdx: number) => {
    const player = RPS_CHOICES[selectedIdx];
    const terminal =
      RPS_CHOICES[Math.floor(Math.random() * RPS_CHOICES.length)];
    const result: "win" | "lose" | "tie" =
      player === terminal
        ? "tie"
        : RPS_BEATS[player] === terminal
          ? "win"
          : "lose";
    const quips = RPS_QUIPS[result];
    const quip = quips[Math.floor(Math.random() * quips.length)];
    const resultText =
      result === "win"
        ? lang === "en"
          ? "YOU WIN"
          : "GANASTE"
        : result === "lose"
          ? lang === "en"
            ? "YOU LOSE"
            : "PERDISTE"
          : lang === "en"
            ? "TIE"
            : "EMPATE";
    const resultColor =
      result === "win" ? "#00ff41" : result === "lose" ? "#ff4444" : "#ffb300";
    const pad = (l: string, v: string) => `  ${l.padEnd(12)}${v}`;
    const resultResponse: ResponseLine[] = [
      {
        type: "plain",
        content: pad("YOU", `${RPS_SYMBOLS[player]} ${player.toUpperCase()}`),
        color: "#00ff41",
      },
      {
        type: "plain",
        content: pad(
          "TERMINAL",
          `${RPS_SYMBOLS[terminal]} ${terminal.toUpperCase()}`,
        ),
        color: "#00bfff",
      },
      { type: "plain", content: pad("RESULT", resultText), color: resultColor },
      { type: "plain", content: quip, delay: 200, color: "#006620" },
    ];
    const resultId = counter;
    setCounter((c) => c + 1);
    setHistory((h) => [
      ...h.map((entry) =>
        entry.id === entryId
          ? { ...entry, menuSelectedIdx: selectedIdx }
          : entry,
      ),
      { id: resultId, input: player, response: resultResponse },
    ]);
    setRpsMenu(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // RPS inline menu intercepts arrows, enter, esc
    if (rpsMenu) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const dir = e.key === "ArrowUp" ? -1 : 1;
        const newIdx =
          (rpsMenu.selectedIdx + dir + RPS_CHOICES.length) % RPS_CHOICES.length;
        setRpsMenu({ ...rpsMenu, selectedIdx: newIdx });
        setHistory((h) =>
          h.map((entry) =>
            entry.id === rpsMenu.entryId
              ? { ...entry, menuSelectedIdx: newIdx }
              : entry,
          ),
        );
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        resolveRps(rpsMenu.entryId, rpsMenu.selectedIdx);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setRpsMenu(null);
        return;
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const matches = CMD_LIST.filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length >= 1 && input.length > 0) setInput(matches[0]);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1);
      setCmdHistoryIdx(next);
      if (cmdHistory[next]) setInput(cmdHistory[next]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdHistoryIdx - 1, -1);
      setCmdHistoryIdx(next);
      setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
      return;
    }
  };

  return {
    processCommand,
    handleKeyDown,
    history,
    activeView,
    setActiveView,
    lang,
    pageMode,
    isFlipped,
    showOnboarding,
    setShowOnboarding,
    showBugs,
    setShowBugs,
    input,
    setInput,
    isMenuActive: rpsMenu !== null,
    setLang,
    onMenuOptionClick: (entryId: number, idx: number) => {
      if (!rpsMenu || rpsMenu.entryId !== entryId) return;
      resolveRps(entryId, idx);
    },
  };
};

export default useTerminal;
