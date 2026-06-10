"use client";

import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useDeploy = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const response: ResponseLine[] = [
      {
        type: "text",
        content:
          lang === "en"
            ? "// deploying to production..."
            : "// desplegando a producción...",
      },
      {
        type: "download",
        label: lang === "en" ? "pushing to prod" : "subiendo a prod",
        delay: 200,
        duration: 1800,
      },
      {
        type: "text",
        content:
          lang === "en"
            ? "// aborted. it's friday. we have standards."
            : "// cancelado. es viernes. tenemos estándares.",
        delay: 300,
        color: "#ffb300",
      },
    ];
    setHistory((h) => [...h, { id, input: cmd, response, isError: true }]);
    return;
  };
  return execute;
};

export default useDeploy;
