import Link from "next/link";

export function CtaSection() {
  return (
    <section className="section py-24 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="eyebrow">
          <span className="text-(--color-accent)">¶</span>
          <span className="font-serif italic mx-2.5">vi.</span>
          <span className="text-(--color-border-strong)">—</span>
          <span className="mx-2.5">{"let's begin"}</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[clamp(36px,7vw,54px)] leading-none tracking-[-0.02em] font-normal text-(--color-fg) max-w-[520px] mb-5">
          Tienes un proyecto<br/>
          <span className="italic text-(--color-accent)">ambicioso?</span>
        </h2>
        <p className="font-serif text-[21px] italic text-(--color-italic) max-w-[460px] leading-[1.4] mb-11">
          Dos caminos para empezar. Elige tu velocidad.
        </p>

        {/* Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A */}
          <div className="card-hover bg-(--color-bg-elev) border border-(--color-border-strong) rounded-2xl p-8">
            <div className="font-mono text-[10px] text-(--color-accent) tracking-[0.2em] mb-5">
              option a · 5 min
            </div>
            <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-0.01em] font-normal text-(--color-fg) mb-3">
              Take the <span className="italic text-(--color-accent)">assessment.</span>
            </h3>
            <p className="text-[13px] leading-[1.6] text-(--color-muted) mb-6">
              6 preguntas. Te damos un rango de presupuesto realista, scope estimado y next steps concretos. Sin sales call obligado.
            </p>
            <Link 
              href="/assessment"
              className="cta-hover inline-block bg-(--color-accent-hover) px-5 py-2.5 rounded-full text-[12px] font-medium text-white"
            >
              Start &nbsp;&rarr;
            </Link>
          </div>

          {/* Option B */}
          <div className="card-hover bg-(--color-bg-elev) border border-(--color-border-strong) rounded-2xl p-8">
            <div className="font-mono text-[10px] text-(--color-accent) tracking-[0.2em] mb-5">
              option b · 30 min
            </div>
            <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-0.01em] font-normal text-(--color-fg) mb-3">
              Book a <span className="italic text-(--color-accent)">call.</span>
            </h3>
            <p className="text-[13px] leading-[1.6] text-(--color-muted) mb-6">
              30 minutos directos con los founders. Sin sales, sin discovery teatral, sin BS. Calendly abierto.
            </p>
            <Link 
              href="/contact"
              className="cta-hover inline-block bg-transparent border border-(--color-border-strong) px-5 py-2.5 rounded-full text-[12px] font-medium text-(--color-fg)"
            >
              Open Calendly &nbsp;&rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
