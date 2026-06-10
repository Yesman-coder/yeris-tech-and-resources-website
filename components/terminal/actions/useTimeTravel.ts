"use client";

import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useTimeTravel = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const response: ResponseLine[] = [
      {
        type: "text",
        content:
          lang === "en"
            ? "// calculating spacetime coordinates..."
            : "// calculando coordenadas espacio-temporales...",
      },
      {
        type: "download",
        label: lang === "en" ? "bending reality" : "doblando la realidad",
        delay: 200,
        duration: 2000,
      },
      {
        type: "plain",
        content:
          lang === "en"
            ? "// Error: causality violation at T-42."
            : "// Error: violación de causalidad en T-42.",
        delay: 300,
        color: "#ff4444",
      },
      {
        type: "plain",
        content:
          lang === "en"
            ? "// Your request has been denied by the universe."
            : "// El universo ha denegado tu solicitud.",
        color: "#ff4444",
      },
    ];
    setHistory((h) => [...h, { id, input: cmd, response, isError: true }]);
    return;
  };
  return execute;
};

export default useTimeTravel;
