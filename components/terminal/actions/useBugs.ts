"use client";

import { SetStateAction } from "react";
import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useBugs = () => {
  const execute = ({
    setHistory,
    id,
    cmd,
    lang,
    setShowBugs,
    onComplete,
    showBugs,
  }: CommandAction & {
    setShowBugs: (value: SetStateAction<boolean>) => void;
    showBugs: boolean;
  }) => {
    let response: ResponseLine[] = [
      {
        type: "text",
        content:
          lang === "en"
            ? "// detected active bugs in runtime..."
            : "// bugs activos detectados en tiempo de ejecución...",
      },
      {
        type: "download",
        label: lang === "en" ? "releasing bugs" : "liberando bugs",
        delay: 200,
        duration: 1400,
      },
      {
        type: "plain",
        content:
          lang === "en"
            ? "// click to patch them. good luck."
            : "// clic para parchearlos. buena suerte.",
        delay: 200,
        color: "#ffb300",
      },
    ];
    if (showBugs) {
      response = [
        {
          type: "text",
          content:
            lang === "en"
              ? "// the bugs are already released."
              : "// los bugs ya están liberados.",
        },
      ];
    }
    setHistory((h) => [
      ...h,
      {
        id,
        input: cmd,
        response,
        onComplete: () => {
          setShowBugs(true);
          onComplete?.();
        },
      },
    ]);
    return;
  };
  return execute;
};

export default useBugs;
