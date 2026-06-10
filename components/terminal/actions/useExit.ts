"use client";

import { View } from "../commands";
import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useExit = () => {
  const execute = ({
    setHistory,
    id,
    cmd,
    lang,
    setActiveView,
  }: CommandAction & { setActiveView: (value: View) => void }) => {
    const response: ResponseLine[] = [
      {
        type: "text",
        content:
          lang === "en"
            ? "// initiating shutdown sequence..."
            : "// iniciando secuencia de apagado...",
      },
      {
        type: "download",
        label: lang === "en" ? "saving session" : "guardando sesión",
        delay: 300,
        duration: 1200,
      },
      {
        type: "plain",
        content:
          lang === "en"
            ? "// goodbye, cruel world..."
            : "// adiós, cruel mundo...",
        delay: 200,
      },
      {
        type: "download",
        label: lang === "en" ? "terminating processes" : "terminando procesos",
        delay: 400,
        duration: 1600,
      },
      {
        type: "plain",
        content: lang === "en" ? "// just kidding." : "// era broma.",
        delay: 300,
      },
      {
        type: "text",
        content: lang === "en" ? "// rebooting..." : "// reiniciando...",
        delay: 400,
      },
    ];
    setHistory((h) => [
      ...h,
      {
        id,
        input: cmd,
        response,
        onComplete: () => {
          setHistory([]);
          setActiveView("boot");
        },
      },
    ]);
    return;
  };
  return execute;
};

export default useExit;
