"use client";

import { SetStateAction } from "react";
import { CM_WEBSITE_VIEWS, View, WEBSITE_VIEWS } from "../commands";
import { HistoryEntry, ResponseLine } from "../useTerminal";

export interface CommandAction {
  activeView: View;
  lang: "en" | "es";
  pageMode: "dark" | "light";
  setHistory: (value: SetStateAction<HistoryEntry[]>) => void;
  id: number;
  cmd: string;
  onComplete: () => void;
}

const useMode = () => {
  const execute = ({
    activeView,
    lang,
    pageMode,
    setPageMode,
    setHistory,
    id,
    cmd,
  }: CommandAction & {
    setPageMode: (value: SetStateAction<"dark" | "light">) => void;
  }) => {
    if (!WEBSITE_VIEWS.has(activeView)) {
      const response: ResponseLine[] = [
        {
          type: "text",
          content:
            lang === "en"
              ? "// /mode only works inside a page view — try:"
              : "// /mode solo funciona dentro de una vista de página — prueba:",
        },
        ...CM_WEBSITE_VIEWS.map(
          (v): ResponseLine => ({
            type: "text",
            content: `  ${v}`,
          }),
        ),
      ];
      setHistory((h) => [...h, { id, input: cmd, response, isError: true }]);
      return;
    }
    const newMode: "dark" | "light" =
      cmd === "/mode light"
        ? "light"
        : cmd === "/mode dark"
          ? "dark"
          : pageMode === "dark"
            ? "light"
            : "dark";
    setPageMode(newMode);
    setHistory((h) => [
      ...h,
      {
        id,
        input: cmd,
        response: [
          {
            type: "text",
            content:
              lang === "en"
                ? `// switched to ${newMode} mode`
                : `// cambiado a modo ${newMode === "dark" ? "oscuro" : "claro"}`,
          },
        ],
      },
    ]);
    return;
  };

  return execute;
};

export default useMode;
