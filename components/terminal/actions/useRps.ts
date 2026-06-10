"use client";

import { SetStateAction } from "react";
import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useRps = () => {
  const execute = ({
    setHistory,
    id,
    cmd,
    lang,
    setRpsMenu,
  }: CommandAction & {
    setRpsMenu: (
      value: SetStateAction<{ entryId: number; selectedIdx: number } | null>,
    ) => void;
  }) => {
    const response: ResponseLine[] = [
      {
        type: "text",
        content:
          lang === "en"
            ? "// starting rock-paper-scissors..."
            : "// iniciando piedra-papel-tijeras...",
      },
      {
        type: "text",
        content:
          lang === "en" ? "// make your decision:" : "// toma tu decisión:",
        delay: 200,
      },
      {
        type: "text",
        content:
          lang === "en"
            ? "// ↑↓ navigate · enter to select · esc to exit"
            : "// ↑↓ navegar · enter para elegir · esc para salir",
        color: "#004d13",
      },
      {
        type: "menu",
        options: ["✊  Rock", "✋  Paper", "✂️  Scissors"],
        delay: 100,
      },
    ];
    setHistory((h) => [...h, { id, input: cmd, response, menuSelectedIdx: 0 }]);
    setRpsMenu({ entryId: id, selectedIdx: 0 });
  };
  return execute;
};

export default useRps;
