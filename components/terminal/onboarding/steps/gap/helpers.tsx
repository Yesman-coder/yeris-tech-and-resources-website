"use client";

import useMobile from "@/hooks/useMobile";

export function playMergeSound() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(330, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
    setTimeout(() => ctx.close(), 700);
  } catch (e) {
    console.error("ERROR: playMergeSound", e);
  }
}

export function LogoAssembly({ n }: { n: number }) {
  const isMobile = useMobile();
  return (
    <span
      className="terminal-logo"
      style={{ fontSize: isMobile ? "22px" : "30px", letterSpacing: "0.02em" }}
    >
      {"yeris".slice(0, Math.min(n, 5))}
      {n > 5 && (
        <span className="terminal-logo-dim">
          {"[tech+resources]".slice(0, Math.min(n - 5, 16))}
        </span>
      )}
      {n >= 22 && <span className="terminal-cursor">_</span>}
    </span>
  );
}
