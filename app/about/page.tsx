import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Yeris Tech & Resources LLC — a product studio powered by Yesman Utrera (project management) and Boris Bruno (senior development). 14 shipments, 8 industries, every project shipped.",
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
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-7 pt-24 pb-16">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] mb-10 flex items-center">
          <span className="text-primary">¶</span>
          <span className="font-serif italic mx-2.5">vii.</span>
          <span className="text-border">—</span>
          <span className="mx-2.5">about</span>
          <span className="ml-auto text-muted-foreground/70">the studio behind the shipments</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-start">
          <div>
            <h1 className="font-serif text-[clamp(40px,8vw,60px)] leading-[0.99] tracking-[-0.02em] font-normal text-foreground mb-10">
              Two disciplines.<br/>
              <span className="italic text-foreground/80">One studio.</span><br/>
              Every project <span className="italic text-primary">shipped.</span>
            </h1>
            
            <div className="flex flex-col gap-5 text-[15px] text-foreground/70 leading-[1.7] max-w-2xl">
              <p>
                Yeris Tech & Resources LLC is built on the partnership of Yesman Utrera and Boris Bruno. Yesman brings seasoned project management — scoping, client communication, delivery timelines, and keeping every build on track. Boris brings the senior development muscle — architecture decisions, production-grade code, and the engineering depth to tackle whatever the project requires.
              </p>
              <p>
                Together they cover the full stack of a product build, from first discovery call to final deployment. No outsourcing the hard parts, no handing you off mid-project — the same two people who scope the work are the ones who ship it.
              </p>
              <p>
                The studio works with SMB founders and operators who need something real built, fast. 14 shipments across 8 industries — from non-profit donation flows to production AI agents to fitness e-commerce. Every project ends in production.
              </p>
            </div>
          </div>

          {/* Team photos */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-24">
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/images/yesman-portrait.jpg"
                  alt="Yesman Utrera"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4">
                <p className="font-mono text-[10px] text-primary tracking-[0.2em] mb-1">
                  PROJECT MANAGEMENT
                </p>
                <p className="font-serif text-[24px] text-foreground">
                  Yesman Utrera
                </p>
              </div>
            </div>
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/images/developer-portrait.jpg"
                  alt="Boris Bruno"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4">
                <p className="font-mono text-[10px] text-primary tracking-[0.2em] mb-1">
                  SENIOR DEVELOPMENT
                </p>
                <p className="font-serif text-[24px] text-foreground">
                  Boris Bruno
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 px-6 md:px-10 border-t border-border bg-background">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] mb-10 flex items-center">
            <span className="text-primary">¶</span>
            <span className="font-serif italic mx-2.5">viii.</span>
            <span className="text-border">—</span>
            <span className="mx-2.5">principles</span>
          </div>
          
          <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-foreground max-w-[480px] mb-14">
            How we <span className="italic text-foreground/80">think.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {principles.map((p, i) => (
              <div key={p.title}>
                <div className="font-mono text-[11px] text-primary tracking-[0.2em] mb-4">
                  {["i.", "ii.", "iii."][i]}
                </div>
                <h3 className="font-serif text-[24px] leading-[1.1] text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="text-[13px] text-foreground/60 leading-[1.65]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 px-6 md:px-10 border-t border-border bg-background">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] mb-10 flex items-center">
            <span className="text-primary">¶</span>
            <span className="font-serif italic mx-2.5">ix.</span>
            <span className="text-border">—</span>
            <span className="mx-2.5">process</span>
          </div>
          
          <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-foreground max-w-[480px] mb-14">
            How we <span className="italic text-foreground/80">work.</span>
          </h2>

          <ol className="flex flex-col max-w-2xl">
            {howWeWork.map((step, i) => (
              <li 
                key={i} 
                className={`flex items-start gap-6 py-6 border-t border-border ${i === howWeWork.length - 1 ? 'border-b' : ''}`}
              >
                <span className="font-mono text-[11px] text-muted-foreground/70 tracking-[0.12em] pt-1 shrink-0">
                  [ {String(i + 1).padStart(2, "0")} ]
                </span>
                <p className="text-[14px] text-foreground/70 leading-[1.65]">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Link
              href="/contact"
              className="link-hover text-[12px] text-primary tracking-[0.04em] border-b border-border pb-0.5"
            >
              Start a project &nbsp;&rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-16 px-6 md:px-10 border-t border-border bg-background">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] mb-10 flex items-center">
            <span className="text-primary">¶</span>
            <span className="font-serif italic mx-2.5">x.</span>
            <span className="text-border">—</span>
            <span className="mx-2.5">partner</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
            <div>
              <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-foreground max-w-[480px] mb-6">
                Extended reach when the project <span className="italic text-foreground/80">calls for it.</span>
              </h2>
              <p className="text-[14px] text-foreground/70 leading-[1.65] max-w-md mb-8">
                Yeris works in close partnership with{" "}
                <a
                  href="https://www.thewaveestudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  The Wave Estudio
                </a>
                {" "}— a creative studio that extends our capabilities in design, branding, and visual production. When a project needs that extra layer of craft, we have the right team already in the room.
              </p>
              <a
                href="https://www.thewaveestudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover text-[12px] text-primary tracking-[0.04em] border-b border-border pb-0.5"
              >
                Visit The Wave Estudio &nbsp;&rarr;
              </a>
            </div>
            <div className="flex justify-center items-center bg-secondary rounded-2xl p-12 border border-border">
              <Image
                src="/images/wave-estudio.webp"
                alt="The Wave Estudio"
                width={200}
                height={80}
                className="opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-10 border-t border-border bg-background">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-serif text-[clamp(36px,7vw,54px)] leading-none tracking-[-0.02em] font-normal text-foreground mb-5">
            Ready to <span className="italic text-primary">build?</span>
          </h2>
          <p className="font-serif text-[19px] italic text-foreground/70 max-w-[400px] mx-auto leading-[1.4] mb-10">
            {"Let's talk about your project."}
          </p>
          <Link
            href="/contact"
            className="cta-hover inline-block bg-primary px-8 py-4 rounded-full text-[14px] font-medium text-primary-foreground"
          >
            Start a project &nbsp;&rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
