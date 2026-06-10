"use client";

import { ResponseLine, SESSION_START } from "../useTerminal";
import { CommandAction } from "./useMode";

const useUptime = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const elapsed = Math.floor((Date.now() - SESSION_START) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    const quip =
      elapsed < 30
        ? lang === "en"
          ? "// just getting started."
          : "// recién comenzando."
        : elapsed < 120
          ? lang === "en"
            ? "// still reading? good."
            : "// ¿aún leyendo? bien."
          : elapsed < 300
            ? lang === "en"
              ? "// we like your vibe."
              : "// nos gusta tu energía."
            : elapsed < 600
              ? lang === "en"
                ? "// impressive. building something?"
                : "// impresionante. ¿construyendo algo?"
              : elapsed < 1800
                ? lang === "en"
                  ? "// you're really here. try /coffee."
                  : "// de verdad estás aquí. prueba /coffee."
                : lang === "en"
                  ? "// log off. touch grass. we'll be here."
                  : "// desconéctate. sal afuera. seguiremos aquí.";
    const response: ResponseLine[] = [
      {
        type: "text",
        content:
          lang === "en"
            ? `// session uptime: ${timeStr}`
            : `// tiempo de sesión: ${timeStr}`,
        color: "#00ff41",
      },
      { type: "text", content: quip, delay: 200, color: "#006620" },
    ];
    setHistory((h) => [...h, { id, input: cmd, response }]);
  };
  return execute;
};

export default useUptime;
