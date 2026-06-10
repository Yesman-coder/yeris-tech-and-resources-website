"use client";

import { ResponseLine } from "../useTerminal";
import { CommandAction } from "./useMode";

const useWhoami = () => {
  const execute = ({ setHistory, id, cmd, lang }: CommandAction & {}) => {
    const ua = navigator.userAgent;
    let browser = "Unknown";
    if (ua.includes("Edg/"))
      browser = "Edge " + (ua.match(/Edg\/([\d]+)/)?.[1] ?? "");
    else if (ua.includes("Chrome/"))
      browser = "Chrome " + (ua.match(/Chrome\/([\d]+)/)?.[1] ?? "");
    else if (ua.includes("Firefox/"))
      browser = "Firefox " + (ua.match(/Firefox\/([\d]+)/)?.[1] ?? "");
    else if (ua.includes("Safari/") && !ua.includes("Chrome"))
      browser = "Safari";

    let os = "Unknown";
    if (/android/i.test(ua)) os = "Android";
    else if (/iphone|ipad/i.test(ua)) os = "iOS";
    else if (/win/i.test(ua)) os = "Windows";
    else if (/mac/i.test(ua)) os = "macOS";
    else if (/linux/i.test(ua)) os = "Linux";

    const res = `${screen.width}×${screen.height}`;
    const time = new Date().toLocaleTimeString();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const pad = (l: string, v: string) => `  ${l.padEnd(9)}${v}`;

    const response: ResponseLine[] = [
      {
        type: "text",
        content:
          lang === "en"
            ? "// scanning user environment..."
            : "// escaneando entorno del usuario...",
      },
      {
        type: "plain",
        content: "  ─────────────────────────",
        delay: 200,
        color: "#006620",
      },
      { type: "text", content: pad("USER", "anonymous"), color: "#00ff41" },
      { type: "text", content: pad("BROWSER", browser), color: "#00ff41" },
      { type: "text", content: pad("OS", os), color: "#00ff41" },
      { type: "text", content: pad("SCREEN", res), color: "#00ff41" },
      { type: "text", content: pad("TIME", time), color: "#00ff41" },
      { type: "text", content: pad("TZ", tz), color: "#00ff41" },
      {
        type: "plain",
        content: "  ─────────────────────────",
        color: "#006620",
      },
    ];
    setHistory((h) => [...h, { id, input: cmd, response }]);
    return;
  };
  return execute;
};

export default useWhoami;
