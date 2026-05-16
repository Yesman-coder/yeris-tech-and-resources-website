import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { CtaStrip } from "@/components/cta-strip";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { HeroEntrance } from "@/components/hero-entrance";
import { Kicker } from "@/components/kicker";
import { Button } from "@/components/ui/button";
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
    description: "From landing pages to full web apps — built fast, built to last.",
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
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
          <div
            className="hero-glow absolute rounded-full blur-[160px]"
            style={{
              top: "-200px",
              left: "-200px",
              width: "800px",
              height: "800px",
              background: "oklch(0.78 0.18 75 / 1)",
            }}
          />
        </div>

        <HeroEntrance index={0}>
          <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-(--color-fg) leading-[1.05] mb-8 max-w-5xl">
            We build the things companies wish they&apos;d already{" "}
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
            <Button
              asChild
              size="lg"
              className="bg-(--color-accent) text-(--color-accent-fg) hover:opacity-90 transition-opacity font-medium text-base px-8 py-4 h-auto rounded-2xl"
            >
              <Link href="/contact">Start a project →</Link>
            </Button>
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
              9 projects shipped · 8 industries · Florida & worldwide
            </p>
          </div>
        </HeroEntrance>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-start gap-1">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-(--color-muted)">
            Selected work
          </span>
          <span className="text-(--color-muted) text-xs animate-bounce-y inline-block">↓</span>
        </div>
      </section>

      {/* Selected Work */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <Reveal>
          <Kicker className="mb-4">Selected work</Kicker>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg) mb-12">
            Four projects worth your time.
          </h2>
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
        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="text-sm font-mono text-(--color-muted) hover:text-(--color-fg) transition-colors border border-(--color-border) hover:border-(--color-accent) px-6 py-3 rounded-full"
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
                <span className="text-5xl font-medium font-mono text-(--color-accent) shrink-0 tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-2">
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

      {/* About teaser */}
      <section className="border-t border-(--color-border)">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="flex gap-4 max-w-xs">
                <div
                  className="flex-1 aspect-square rounded-2xl border border-(--color-border) bg-gradient-to-br from-(--color-bg-elev) to-(--color-bg) flex items-center justify-center"
                  aria-label="Yesman Utrera portrait placeholder"
                >
                  <span className="text-2xl font-mono text-(--color-muted)">YU</span>
                </div>
                <div
                  className="flex-1 aspect-square rounded-2xl border border-(--color-border) bg-gradient-to-br from-(--color-bg-elev) to-(--color-bg) flex items-center justify-center"
                  aria-label="Boris Bruno portrait placeholder"
                >
                  <span className="text-2xl font-mono text-(--color-muted)">BB</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Kicker className="mb-4">About</Kicker>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg) mb-6">
                Two disciplines. End-to-end.
              </h2>
              <p className="text-base text-(--color-muted) leading-relaxed mb-6">
                Yeris Tech & Resources LLC is run by Yesman Utrera and Boris Bruno — a seasoned project manager and a senior developer who share resources, experience, and a track record of shipping. Nine clients across eight industries. Every project lands in production.
              </p>
              <Link
                href="/about"
                className="text-sm font-mono text-(--color-accent) hover:underline"
              >
                More about Yeris →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <CtaStrip />
    </>
  );
}
