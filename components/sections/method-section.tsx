"use client";

import { useLanguage } from "@/components/language-provider";

export function MethodSection() {
  const { t } = useLanguage();
  
  const steps = [
    {
      num: "i.",
      title: t("Diagnosticar", "Diagnose"),
      subtitle: t("diagnosticamos", "diagnose"),
      description: t(
        "Antes de tocar el teclado, mapeamos el problema real — no el que te pediste, el que tienes. Esa diferencia paga el proyecto.",
        "Before touching the keyboard, we map the real problem — not the one you asked for, the one you have. That difference pays for the project."
      ),
    },
    {
      num: "ii.",
      title: t("Arquitectar", "Architect"),
      subtitle: t("arquitectamos", "architect"),
      description: t(
        "Elegimos stacks como otros eligen barrios — para los próximos diez años. Sin moda, sin hype, sólo decisiones que envejecen bien.",
        "We choose stacks like others choose neighborhoods — for the next ten years. No fashion, no hype, just decisions that age well."
      ),
    },
    {
      num: "iii.",
      title: t("Enviar", "Ship"),
      subtitle: t("enviamos", "ship"),
      description: t(
        "Producción no es el final, es el principio. Enviamos en semanas, no en cuatrimestres, y nos quedamos en línea hasta que la métrica se mueva.",
        "Production is not the end, it's the beginning. We ship in weeks, not quarters, and we stay online until the metric moves."
      ),
    },
  ];

  return (
    <section className="py-16 md:py-20 px-6 md:px-10 lg:px-7 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] bg-[#FBF8F3] dark:bg-[#0A0A0F]">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.12em] mb-10 flex items-center">
          <span className="text-[#E85D04] dark:text-[#9D4EDD]">¶</span>
          <span className="font-serif italic mx-2.5">ii.</span>
          <span className="text-[rgba(0,0,0,0.1)] dark:text-[rgba(255,255,255,0.06)]">—</span>
          <span className="mx-2.5">{t("el método", "the method")}</span>
          <span className="ml-auto text-[#5C5C5C] dark:text-[#888899]">{t("tres movimientos, un ritmo", "three movements, one rhythm")}</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-[#1A1A1A] dark:text-[#F5F5F7] max-w-[540px] mb-14">
          {t("Cómo trabajamos", "How we work")}<br/>
          <span className="italic text-[#5C5C5C] dark:text-[#888899]">{t("cuando trabajamos.", "when we work.")}</span>
        </h2>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
          {steps.map((step) => (
            <div key={step.num}>
              <div className="font-mono text-[11px] text-[#E85D04] dark:text-[#9D4EDD] tracking-[0.2em] mb-5">
                {step.num}
              </div>
              <h3 className="font-serif text-[30px] leading-none tracking-[-0.015em] font-normal text-[#1A1A1A] dark:text-[#F5F5F7] mb-1">
                {step.title}
              </h3>
              <p className="font-serif italic text-[14px] leading-none text-[#5C5C5C] dark:text-[#888899] mb-5">
                {step.subtitle}
              </p>
              <p className="text-[13px] leading-[1.65] text-[#5C5C5C] dark:text-[#888899]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
