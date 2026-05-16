import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { CtaStrip } from "@/components/cta-strip";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { Kicker } from "@/components/kicker";
import { Button } from "@/components/ui/button";
import { Globe, Bot, ShoppingBag, Smartphone } from "lucide-react";

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
    icon: Globe,
    title: "Web Design & Development",
    description: "From landing pages to full web apps — built fast, built to last.",
    anchor: "web-design",
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description: "Production agents that handle the work your team shouldn't have to.",
    anchor: "ai-agents",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Apps",
    description: "Full-stack product builds from zero to shipped.",
    anchor: "apps",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description: "Storefronts tuned for conversion, built for real buyers.",
    anchor: "ecommerce",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-(--color-fg) leading-[1.05] mb-8 max-w-5xl">
          We build the things companies wish they&apos;d already shipped.
        </h1>
        <p className="text-xl md:text-2xl text-(--color-muted) leading-relaxed max-w-2xl mb-10">
          A product studio for founders who don&apos;t have time to hire a team.
        </p>
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
        <div className="mt-16 pt-8 border-t border-(--color-border)">
          <p className="text-xs font-mono text-(--color-muted) tracking-[0.15em]">
            9 projects shipped · 8 industries · Based in Florida, working everywhere
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-start gap-1">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-(--color-muted)">
            Selected work
          </span>
          <span className="text-(--color-muted) text-xs">↓</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i === 0 ? 0 : Math.min(i * 0.08, 0.24)}>
              <ProjectCard project={project} priority={i < 2} />
            </Reveal>
          ))}
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
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
          <Reveal>
            <Kicker className="mb-4">What we do</Kicker>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg) mb-12">
              Services
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc, i) => (
              <Reveal key={svc.anchor} delay={i * 0.08}>
                <Link
                  href={`/services#${svc.anchor}`}
                  className="group flex flex-col gap-4 p-6 rounded-2xl border border-(--color-border) bg-(--color-bg-elev) hover:border-(--color-accent) transition-colors duration-200 h-full"
                >
                  <svc.icon
                    className="w-6 h-6 text-(--color-accent)"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-base font-medium text-(--color-fg) mb-2 group-hover:text-(--color-accent) transition-colors">
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
              <div
                className="aspect-square max-w-xs rounded-2xl border border-(--color-border) bg-gradient-to-br from-(--color-bg-elev) to-(--color-bg) flex items-center justify-center"
                aria-label="Portrait placeholder — swap public/yesman-portrait.jpg"
              >
                <span className="text-4xl font-mono text-(--color-muted)">YU</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Kicker className="mb-4">About</Kicker>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg) mb-6">
                One studio. End-to-end.
              </h2>
              <p className="text-base text-(--color-muted) leading-relaxed mb-6">
                Yeris Tech & Resources LLC is a one-person product studio run by Yesman Utrera. Nine clients across eight industries. Every project ships to production. No hand-offs, no middle-men — you talk to the person building the thing.
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
