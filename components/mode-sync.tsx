"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ModeSync() {
  const { setTheme } = useTheme();
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("mode");
    if (param === "light" || param === "dark") setTheme(param);
  }, [setTheme]);
  return null;
}
