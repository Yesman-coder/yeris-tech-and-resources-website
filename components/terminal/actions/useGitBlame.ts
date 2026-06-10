"use client";

import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useGitBlame = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const response: ResponseLine[] = [
      {
        type: "text",
        content:
          lang === "en"
            ? "// analyzing commit history..."
            : "// analizando historial de commits...",
      },
      {
        type: "download",
        label: lang === "en" ? "blaming" : "culpando",
        delay: 200,
        duration: 1600,
      },
      {
        type: "plain",
        content:
          lang === "en"
            ? "// it was you. it's always you."
            : "// fuiste tú. siempre eres tú.",
        delay: 300,
        color: "#ff4444",
      },
    ];
    setHistory((h) => [...h, { id, input: cmd, response, isError: true }]);
    return;
  };
  return execute;
};

export default useGitBlame;
