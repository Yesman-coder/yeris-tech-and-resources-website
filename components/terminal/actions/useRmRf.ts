"use client";

import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useRmRf = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const response: ResponseLine[] = [
      {
        type: "text",
        content:
          lang === "en"
            ? "// rm: it is dangerous to operate recursively on '/'"
            : "// rm: es peligroso operar recursivamente en '/'",
      },
      {
        type: "plain",
        content:
          lang === "en"
            ? "// Permission denied. (Nice try though.)"
            : "// Permiso denegado. (Buen intento, igual.)",
        delay: 300,
        color: "#ff4444",
      },
    ];
    setHistory((h) => [...h, { id, input: cmd, response, isError: true }]);
    return;
  };
  return execute;
};

export default useRmRf;
