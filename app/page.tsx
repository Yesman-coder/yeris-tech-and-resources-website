import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { CtaStrip } from "@/components/cta-strip";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { HeroEntrance } from "@/components/hero-entrance";
import { Kicker } from "@/components/kicker";
import { HeroGlow } from "@/components/hero-glow";
import { ScrambleText } from "@/components/scramble-text";
import { MagneticButton } from "@/components/magnetic-button";
import { CountUpNumber } from "@/components/count-up-number";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Yeris Tech & Resources LLC — Product Studio",
  description:
    "We build the things companies wish they'd already shipped. A product studio for founders who don't have time to hire a team.",
};

const clientNames = [
  "Stanton Financial",
  "The Born Leader Family Way",
  "Alto",
  "Shift Active",
  "FusFit",
  "Rent Mate",
  "World Fixer",
  "Zulia Access",
  "Moto Pana",
];

const services = [
  {
    title: "Web Design & Development",
    description: "From landing pages to full web apps, built fast and built to last.",
    anchor: "web-design",
  },
  {
    title: "AI Agents & Automation",
    description: "Production agents that handle the work your team shouldn't have to.",
    anchor: "ai-agents",
  },
  {
    title: "Mobile & Web Apps",
    description: "Full-stack product builds from zero to shipped.",
    anchor: "apps",
  },
  {
    title: "E-commerce",
    description: "Storefronts tuned for conversion, built for real buyers.",
    anchor: "ecommerce",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[calc(100dvh-4rem)] flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        {/* Ambient glow — follows mouse */}
        <HeroGlow />

        <div className="flex justify-between gap-16">
          {/* Left: all hero content */}
          <div className="flex flex-col min-w-0 flex-1">
            <HeroEntrance index={0}>
              <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-(--color-fg) leading-[1.05] mb-8 max-w-5xl">
                <ScrambleText text="We build the things companies wish they'd already " delay={200} />{" "}
                <span className="text-(--color-accent)">shipped.</span>
              </h1>
            </HeroEntrance>
            <HeroEntrance index={1}>
              <p className="text-xl md:text-2xl text-(--color-muted) leading-relaxed max-w-2xl mb-10">
                A product studio for founders who don&apos;t have time to hire a team.
              </p>
            </HeroEntrance>
            <HeroEntrance index={2}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <MagneticButton href="/contact">Start a project →</MagneticButton>
                <Link
                  href="/work"
                  className="text-sm font-mono text-(--color-muted) hover:text-(--color-fg) transition-colors"
                >
                  View all work
                </Link>
              </div>
            </HeroEntrance>
            <HeroEntrance index={3}>
              <div className="mt-16 pt-8 border-t border-(--color-border)">
                <p className="text-sm font-mono text-(--color-muted) tracking-[0.12em]">
                  <span className="text-(--color-fg)">9</span> projects shipped{" "}
                  <span className="opacity-40 mx-2">·</span>{" "}
                  <span className="text-(--color-fg)">8</span> industries{" "}
                  <span className="opacity-40 mx-2">·</span>{" "}
                  Florida &amp; worldwide
                </p>
              </div>
            </HeroEntrance>
          </div>

          {/* Right: service preview anchored to bottom, lg+ only */}
          <div className="hidden lg:flex flex-col justify-end items-end gap-3 shrink-0 pb-2">
            {services.map((svc) => (
              <Link
                key={svc.anchor}
                href={`/services#${svc.anchor}`}
                className="text-xs font-mono uppercase tracking-[0.2em] text-(--color-muted) hover:text-(--color-accent) transition-colors duration-150 text-right"
              >
                {svc.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-(--color-muted)">
            Selected work
          </span>
          <span className="text-(--color-muted) animate-bounce-y inline-block" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </section>

      {/* Selected Work */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <Reveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <Kicker className="mb-4">Selected work</Kicker>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg)">
                Four projects worth your time.
              </h2>
            </div>
            <span
              className="hidden md:block text-[96px] font-mono font-medium leading-none select-none"
              style={{ color: "oklch(0.78 0.18 75 / 0.12)" }}
              aria-hidden="true"
            >
              04
            </span>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => {
            const colSpan = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"][i];
            return (
              <Reveal
                key={project.slug}
                delay={i === 0 ? 0 : Math.min(i * 0.08, 0.24)}
                className={colSpan}
              >
                <ProjectCard project={project} priority={i < 2} />
              </Reveal>
            );
          })}
        </div>
        <div className="mt-12">
          <Link
            href="/work"
            className="text-sm font-mono text-(--color-muted) hover:text-(--color-fg) transition-colors"
          >
            View all 9 projects →
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-(--color-border)">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 md:pt-32 pb-16">
          <Reveal>
            <Kicker className="mb-4">What we do</Kicker>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg)">
              Services
            </h2>
          </Reveal>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 border-t border-(--color-border) pb-24 md:pb-32">
          {services.map((svc, i) => (
            <Reveal
              key={svc.anchor}
              delay={i * 0.08}
              className={cn(
                "border-b border-(--color-border)",
                i % 2 === 0 ? "md:border-r" : ""
              )}
            >
              <Link
                href={`/services#${svc.anchor}`}
                className="group flex gap-8 items-start p-8 hover:bg-(--color-bg-elev) transition-colors duration-200 h-full"
              >
                <CountUpNumber
                  to={i + 1}
                  className="text-6xl md:text-7xl font-medium font-mono text-(--color-accent) shrink-0 tabular-nums leading-none"
                />
                <div className="pt-3">
                  <h3 className="text-lg font-medium text-(--color-fg) mb-2 group-hover:text-(--color-accent) transition-colors duration-200">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-(--color-muted) leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Social proof marquee */}
      <section className="border-t border-(--color-border) py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 mb-6">
          <Kicker>Clients we&apos;ve shipped with</Kicker>
        </div>
        <Marquee items={clientNames} />
      </section>

      {/* Team */}
      <section className="border-t border-(--color-border) bg-(--color-bg-elev)">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
          <Reveal>
            <Kicker className="mb-16">The team</Kicker>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-(--color-border)">
            <Reveal className="border-b lg:border-b-0 lg:border-r border-(--color-border) py-12 lg:pr-16">
              <div className="flex items-start gap-6 mb-6">
                <img
                  src="/yesman-utrera.png"
                  alt="Yesman Utrera"
                  width={72}
                  height={72}
                  className="rounded-full object-cover object-top shrink-0"
                  style={{ width: 72, height: 72 }}
                />
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-(--color-accent) mb-2">
                    Project Management
                  </p>
                  <h3 className="text-3xl lg:text-4xl font-medium text-(--color-fg) tracking-tight">
                    Yesman Utrera
                  </h3>
                </div>
              </div>
              <p className="text-base text-(--color-muted) leading-relaxed max-w-sm">
                Keeps every build on schedule and every client in the loop. Scope, communication, delivery: that&apos;s the lane.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="py-12 lg:pl-16">
              <div className="flex items-start gap-6 mb-6">
                <img
                  src="/boris-bruno.png"
                  alt="Boris Bruno"
                  width={72}
                  height={72}
                  className="rounded-full object-cover object-top shrink-0"
                  style={{ width: 72, height: 72 }}
                />
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-(--color-accent) mb-2">
                    Senior Development
                  </p>
                  <h3 className="text-3xl lg:text-4xl font-medium text-(--color-fg) tracking-tight">
                    Boris Bruno
                  </h3>
                </div>
              </div>
              <p className="text-base text-(--color-muted) leading-relaxed max-w-sm">
                Architecture decisions, production-grade code, and the engineering depth to tackle whatever the project demands.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-12 border-t border-(--color-border) mt-12">
              <p className="text-sm text-(--color-muted)">
                9 projects shipped across 8 industries.
              </p>
              <Link
                href="/about"
                className="text-sm font-mono text-(--color-accent) hover:underline shrink-0"
              >
                Meet the team →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-(--color-border)">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-end">
            <Reveal>
              <Kicker className="mb-6">Strategic partner</Kicker>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg) leading-[1.05]">
                When the project calls for more,{" "}
                <a
                  href="https://www.thewaveestudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--color-accent) hover:underline underline-offset-4 decoration-1"
                >
                  The Wave Estudio
                </a>{" "}
                is already in the room.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6">
                <p className="text-base text-(--color-muted) leading-relaxed">
                  A creative studio specializing in brand identity, visual design, and production. When Yeris takes on a project that requires that extra layer of craft — photography, branding systems, motion design — The Wave Estudio handles it at the same level of quality we hold our engineering to.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-(--color-border)">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-(--color-muted)">Design · Branding · Visual Production</span>
                  <a
                    href="https://www.thewaveestudio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-(--color-accent) hover:underline shrink-0 sm:ml-auto"
                  >
                    thewaveestudio.com →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <CtaStrip />
    </>
  );
}
