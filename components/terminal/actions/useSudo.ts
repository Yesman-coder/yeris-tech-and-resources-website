"use client";

import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useSudo = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const response: ResponseLine[] = [
      {
        type: "text",
        content: "// sudo: no tty present and no askpass program specified.",
      },
      {
        type: "plain",
        content:
          lang === "en"
            ? "// also — you're already root. of our hearts."
            : "// además — ya eres root. de nuestros corazones.",
        delay: 300,
        color: "#ffb300",
      },
    ];
    setHistory((h) => [...h, { id, input: cmd, response, isError: true }]);
  };
  return execute;
};

export default useSudo;
