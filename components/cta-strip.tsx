import Link from "next/link";

export function CtaStrip() {
  return (
    <section style={{ background: "oklch(0.78 0.18 75)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <p className="text-xs font-mono uppercase tracking-[0.2em] mb-8" style={{ color: "oklch(0.35 0.08 75)" }}>
          Let&apos;s work together
        </p>
        <h2
          className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] mb-12 max-w-3xl"
          style={{ color: "oklch(0.15 0.02 75)" }}
        >
          Got something to build?
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-medium text-base px-8 py-4 rounded-2xl transition-opacity hover:opacity-80 active:scale-[0.97]"
          style={{
            background: "oklch(0.15 0.02 75)",
            color: "oklch(0.78 0.18 75)",
          }}
        >
          Start a project →
        </Link>
      </div>
    </section>
  );
}
