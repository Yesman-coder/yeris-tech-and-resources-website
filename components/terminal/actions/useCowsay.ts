"use client";

import { commands } from "../commands";
import { CommandAction } from "./useMode";

const useCowsay = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const text = cmd.slice("/cowsay".length).trim() || "...";
    const response = commands["/cowsay"]?.[lang] ?? [
      { type: "plain" as const, content: "// done" },
    ];
    setHistory((h) => [
      ...h,
      {
        id,
        input: cmd,
        response: [
          ...response,
          { type: "ascii" as const, art: "cow", extra: text },
        ],
      },
    ]);
  };
  return execute;
};

export default useCowsay;
