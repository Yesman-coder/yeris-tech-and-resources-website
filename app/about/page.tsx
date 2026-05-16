import type { Metadata } from "next";
import Link from "next/link";
import { Kicker } from "@/components/kicker";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";

export const metadata: Metadata = {
  title: "About",
  description:
    "Yeris Tech & Resources LLC — a one-person product studio run by Yesman Utrera. Nine clients, eight industries, every project shipped.",
};

const principles = [
  {
    title: "Ship the thing.",
    body: "Every project ends in production. Not a staging environment, not a Figma file — a working product your users can touch.",
  },
  {
    title: "One throat to choke.",
    body: "You talk to the person doing the work. No account managers, no hand-offs, no version of the game of telephone.",
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
                A studio of one, in the room with you the whole way.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4 text-base text-(--color-muted) leading-relaxed max-w-2xl">
                {/* PLACEHOLDER — Yesman: rewrite these 3 paragraphs with your real story */}
                <p>
                  Yeris Tech & Resources LLC is a product studio founded by Yesman Utrera — a full-stack engineer and product designer based in Florida. The studio has shipped nine products across eight industries, from non-profit donation flows to production AI agents to fitness e-commerce stores.
                </p>
                <p>
                  Every project at Yeris is handled end-to-end by the same person who picks up your call. That means faster decisions, fewer misunderstandings, and a finished product that actually reflects what you asked for.
                </p>
                <p>
                  The studio works with SMB founders and operators who need something real built — fast. Not an agency retainer, not a six-month engagement. A scope, a timeline, and a shipped product.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div
              className="aspect-square rounded-2xl border border-(--color-border) bg-gradient-to-br from-(--color-bg-elev) to-(--color-bg) flex items-center justify-center sticky top-24"
              aria-label="Portrait placeholder — swap public/yesman-portrait.jpg with a real photo"
            >
              <span className="text-5xl font-mono text-(--color-muted)">YU</span>
            </div>
            <p className="text-xs font-mono text-(--color-muted) mt-3 text-center">
              Yesman Utrera — Founder
            </p>
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

      <CtaStrip />
    </>
  );
}
