"use client";

import { SetStateAction } from "react";
import { CommandAction } from "./useMode";
import { ResponseLine } from "../useTerminal";

const useFlip = () => {
  const execute = ({
    isFlipped,
    setIsFlipped,
    lang,
    setHistory,
    id,
    cmd,
    onComplete,
  }: CommandAction & {
    setIsFlipped: (value: SetStateAction<boolean>) => void;
    isFlipped: boolean;
  }) => {
    const next = !isFlipped;
    setIsFlipped(next);
    const response: ResponseLine[] = [
      {
        type: "text",
        content: next
          ? lang === "en"
            ? "// flipping render window..."
            : "// girando la ventana..."
          : lang === "en"
            ? "// restoring orientation..."
            : "// restaurando orientación...",
      },
      {
        type: "text",
        content: next
          ? lang === "en"
            ? "// /flip again to restore"
            : "// /flip de nuevo para restaurar"
          : lang === "en"
            ? "// you're welcome."
            : "// de nada.",
        delay: 200,
        color: next ? "#ffb300" : "#00ff41",
      },
    ];
    setHistory((h) => [...h, { id, input: cmd, response, onComplete }]);
  };
  return execute;
};

export default useFlip;
