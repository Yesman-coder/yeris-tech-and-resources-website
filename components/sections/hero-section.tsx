"use client";

import Link from "next/link";
import { useRef } from "react";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100dvh-72px)] overflow-hidden bg-(--color-bg)">
      {/* Breathing Y logo background */}
      <svg 
        className="absolute right-[-34px] top-[100px] w-[320px] h-[320px] opacity-[0.06] pointer-events-none animate-breathe" 
        viewBox="0 0 100 100" 
        aria-hidden="true"
      >
        <path d="M82 18 L52 56 L52 92" stroke="var(--color-accent)" strokeWidth="0.7" fill="none" strokeLinecap="square"/>
        <path d="M22 18 L44 46" stroke="var(--color-accent)" strokeWidth="0.7" fill="none" strokeLinecap="square"/>
      </svg>

      {/* Floating particles */}
      <div className="animate-drift absolute top-24 left-12 w-[3px] h-[3px] bg-(--color-accent) rounded-full opacity-55 pointer-events-none" />
      <div className="animate-drift animate-drift-2 absolute top-[182px] left-[340px] w-[2px] h-[2px] bg-(--color-accent-hover) rounded-full opacity-40 pointer-events-none" />
      <div className="animate-drift animate-drift-3 absolute top-[264px] left-32 w-[4px] h-[4px] bg-(--color-accent-deep) rounded-full opacity-50 pointer-events-none" />
      <div className="animate-drift animate-drift-4 absolute top-[148px] right-22 w-[2px] h-[2px] bg-(--color-accent) rounded-full opacity-35 pointer-events-none" />
      <div className="animate-drift animate-drift-5 absolute top-[316px] left-60 w-[3px] h-[3px] bg-(--color-accent-hover) rounded-full opacity-45 pointer-events-none" />
      <div className="animate-drift animate-drift-6 absolute top-[228px] right-40 w-[2px] h-[2px] bg-(--color-accent) rounded-full opacity-40 pointer-events-none" />

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-7 pt-[72px]">
        <div className="pt-16 pb-10">
          {/* Eyebrow */}
          <div className="animate-rise animate-rise-d2 font-mono text-[11px] text-(--color-muted) tracking-[0.12em] mb-11 flex items-center">
            <span className="text-(--color-accent)">¶</span>
            <span className="font-serif italic mx-2.5">i.</span>
            <span className="text-(--color-border-strong)">—</span>
            <span className="mx-2.5">the studio</span>
            <span className="ml-auto text-(--color-muted-subtle)">est. mmxxiv · miami / latam</span>
          </div>

          {/* Hero grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-7 items-end mb-11">
            {/* Headline */}
            <h1 className="font-serif text-[clamp(40px,8vw,60px)] leading-[0.99] tracking-[-0.02em] font-normal text-(--color-fg)">
              <span className="block animate-rise animate-rise-d3">Diseñamos</span>
              <span className="block animate-rise animate-rise-d4 italic text-(--color-italic)">lo complejo,</span>
              <span className="block animate-rise animate-rise-d5">para que experimentes</span>
              <span className="block animate-rise animate-rise-d6 italic text-(--color-accent)">
                lo simple.
                <span className="inline-block w-[0.55em] h-[0.78em] bg-(--color-accent) align-[-2px] ml-1 animate-cursor" />
              </span>
            </h1>

            {/* English translation */}
            <div className="relative pl-5 pt-3.5 pb-2.5 self-end">
              <span className="animate-leader absolute left-0 top-0 w-0 border-l border-dashed border-(--color-border-strong)" />
              <div className="animate-rise animate-rise-d6 font-mono text-[10px] text-(--color-muted-subtle) tracking-[0.2em] mb-3">en /</div>
              <p className="animate-rise animate-rise-d7 font-serif text-[19px] leading-[1.35] italic text-(--color-italic)">
                Architecting the space between ambition <span className="text-(--color-accent)">&amp;</span> reality.
              </p>
            </div>
          </div>

          {/* CTAs + Stats */}
          <div className="animate-rise animate-rise-d7 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-5 border-t border-(--color-border)">
            <div className="flex gap-1 items-center">
              <Link
                href="/contact"
                className="cta-hover bg-(--color-accent-hover) px-5 py-3 rounded-full text-[13px] font-medium text-white"
              >
                Start a project &nbsp;&rarr;
              </Link>
              <Link
                href="/assessment"
                className="ghost-hover px-5 py-3 rounded-full text-[13px] text-(--color-fg)"
              >
                Take the assessment
              </Link>
            </div>

            <div className="font-mono text-[11px] text-(--color-muted-subtle) tracking-[0.04em] text-right leading-[1.95]">
              <span className="font-serif text-[15px] text-(--color-italic) italic">14</span> shipments &nbsp;·&nbsp; 
              <span className="font-serif text-[15px] text-(--color-italic) italic">042</span>
              <span className="text-(--color-accent)">ms°</span> avg lcp<br/>
              <span className="font-serif text-[15px] text-(--color-italic) italic">100</span>/100 lighthouse &nbsp;·&nbsp; 
              <span className="font-serif text-[15px] text-(--color-italic) italic">99.99%</span> uptime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
