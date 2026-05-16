"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function CtaSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 md:py-24 px-6 md:px-10 lg:px-7 border-t border-theme bg-theme-bg">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] text-theme-muted tracking-[0.12em] mb-10 flex items-center">
          <span className="text-theme-primary">¶</span>
          <span className="font-serif italic mx-2.5">vi.</span>
          <span style={{ color: 'var(--color-border)' }}>—</span>
          <span className="mx-2.5">{t("empecemos", "let's begin")}</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[clamp(36px,7vw,54px)] leading-none tracking-[-0.02em] font-normal text-theme-fg max-w-[520px] mb-5">
          {t("Tienes un proyecto", "Got an ambitious")}<br/>
          <span className="italic text-theme-primary">{t("ambicioso?", "project?")}</span>
        </h2>
        <p className="font-serif text-[21px] italic text-theme-muted max-w-[460px] leading-[1.4] mb-11">
          {t("Dos caminos para empezar. Elige tu velocidad.", "Two ways to start. Choose your speed.")}
        </p>

        {/* Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A */}
          <div className="card-hover bg-theme-card border border-theme rounded-2xl p-8">
            <div className="font-mono text-[10px] text-theme-primary tracking-[0.2em] mb-5">
              {t("opción a", "option a")} · 5 min
            </div>
            <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-0.01em] font-normal text-theme-fg mb-3">
              {t("Calcula el", "Calculate the")} <span className="italic text-theme-primary">{t("costo.", "cost.")}</span>
            </h3>
            <p className="text-[13px] leading-[1.6] text-theme-muted mb-6">
              {t(
                "6 preguntas. Te damos un rango de presupuesto realista, scope estimado y next steps concretos. Sin sales call obligado.",
                "6 questions. We give you a realistic budget range, estimated scope and concrete next steps. No mandatory sales call."
              )}
            </p>
            <Link 
              href="/estimator"
              className="cta-hover inline-block bg-theme-primary px-5 py-2.5 rounded-full text-[12px] font-medium text-white"
            >
              Start &nbsp;&rarr;
            </Link>
          </div>

          {/* Option B */}
          <div className="card-hover bg-theme-card border border-theme rounded-2xl p-8">
            <div className="font-mono text-[10px] text-theme-primary tracking-[0.2em] mb-5">
              {t("opción b", "option b")} · 30 min
            </div>
            <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-0.01em] font-normal text-theme-fg mb-3">
              {t("Agenda una", "Book a")} <span className="italic text-theme-primary">{t("llamada.", "call.")}</span>
            </h3>
            <p className="text-[13px] leading-[1.6] text-theme-muted mb-6">
              {t(
                "30 minutos directos con los founders. Sin sales, sin discovery teatral, sin BS. Calendly abierto.",
                "30 minutes direct with the founders. No sales, no theatrical discovery, no BS. Calendly open."
              )}
            </p>
            <Link 
              href="/contact"
              className="cta-hover inline-block bg-transparent border border-theme px-5 py-2.5 rounded-full text-[12px] font-medium text-theme-fg hover:bg-theme-secondary transition-colors"
            >
              {t("Abrir Calendly", "Open Calendly")} &nbsp;&rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
