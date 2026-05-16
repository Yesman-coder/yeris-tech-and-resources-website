import type { Metadata } from "next";
import Link from "next/link";
import { Kicker } from "@/components/kicker";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";

export const metadata: Metadata = {
  title: "About",
  description:
    "Yeris Tech & Resources LLC — a product studio powered by Yesman Utrera (project management) and Boris Bruno (senior development). Nine clients, eight industries, every project shipped.",
};

const principles = [
  {
    title: "Ship the thing.",
    body: "Every project ends in production. Not a staging environment, not a Figma file — a working product your users can touch.",
  },
  {
    title: "No middlemen.",
    body: "You talk directly to the people doing the work. No account managers, no hand-offs, no version of the game of telephone.",
  },
  {
    title: "Move at startup speed.",
    body: "Weeks to a v1, not quarters. We scope tight, build fast, and ship before the window closes.",
  },
];

const howWeWork = [
  "Discovery call — 30 minutes to understand your project, timeline, and budget.",
  "Fixed-scope proposal — a clear document outlining exactly what gets built and for how much.",
  "2–6 week build — weekly check-ins, shared staging environment, no surprises.",
  "Handoff + 30 days of support — we stay available for questions, fixes, and follow-ons.",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">
          <div>
            <Reveal>
              <Kicker className="mb-4">About</Kicker>
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-(--color-fg) mb-8 leading-[1.05]">
                Two disciplines. One studio. Every project shipped.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4 text-base text-(--color-muted) leading-relaxed max-w-2xl">
                <p>
                  Yeris Tech & Resources LLC is built on the partnership of Yesman Utrera and Boris Bruno. Yesman brings seasoned project management — scoping, client communication, delivery timelines, and keeping every build on track. Boris brings the senior development muscle — architecture decisions, production-grade code, and the engineering depth to tackle whatever the project requires.
                </p>
                <p>
                  Together they cover the full stack of a product build, from first discovery call to final deployment. No outsourcing the hard parts, no handing you off mid-project — the same two people who scope the work are the ones who ship it.
                </p>
                <p>
                  The studio works with SMB founders and operators who need something real built, fast. Nine clients across eight industries — from non-profit donation flows to production AI agents to fitness e-commerce. Every project ends in production.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-6 sticky top-24">
              <div>
                <img
                  src="/yesman-utrera.png"
                  alt="Yesman Utrera"
                  className="w-full aspect-square rounded-2xl object-cover object-top border border-(--color-border)"
                />
                <p className="text-xs font-mono text-(--color-muted) mt-2 text-center">
                  Yesman Utrera — Project Management
                </p>
              </div>
              <div>
                <img
                  src="/boris-bruno.png"
                  alt="Boris Bruno"
                  className="w-full aspect-square rounded-2xl object-cover object-top border border-(--color-border)"
                />
                <p className="text-xs font-mono text-(--color-muted) mt-2 text-center">
                  Boris Bruno — Senior Development
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-(--color-border) bg-(--color-bg-elev)">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
          <Reveal>
            <Kicker className="mb-4">How we think</Kicker>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-(--color-fg) mb-12">
              Principles
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-medium text-(--color-accent)">{p.title}</h3>
                  <p className="text-sm text-(--color-muted) leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-(--color-border)">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
          <Reveal>
            <Kicker className="mb-4">The process</Kicker>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-(--color-fg) mb-12">
              How we work
            </h2>
          </Reveal>
          <ol className="flex flex-col gap-8 max-w-2xl">
            {howWeWork.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="flex items-start gap-6">
                  <span className="text-2xl font-mono tabular-nums text-(--color-accent) shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base text-(--color-muted) leading-relaxed pt-1">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12">
            <Link
              href="/contact"
              className="text-sm font-mono text-(--color-accent) hover:underline"
            >
              Start a project →
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="border-t border-(--color-border)">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
          <Reveal>
            <Kicker className="mb-4">Partners</Kicker>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-(--color-fg) mb-6">
              Extended reach when the project calls for it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-(--color-muted) leading-relaxed max-w-2xl mb-8">
              Yeris works in close partnership with{" "}
              <a
                href="https://www.thewaveestudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-fg) hover:text-(--color-accent) transition-colors underline underline-offset-4"
              >
                The Wave Estudio
              </a>
              {" "}— a creative studio that extends our capabilities in design, branding, and visual production. When a project needs that extra layer of craft, we have the right team already in the room.
            </p>
            <a
              href="https://www.thewaveestudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-(--color-accent) hover:underline"
            >
              Visit The Wave Estudio →
            </a>
          </Reveal>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
