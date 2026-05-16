"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function ServicesSection() {
  const { t } = useLanguage();
  
  const services = [
    {
      num: "01",
      title: t("Diagnóstico + ingeniería", "Diagnosis + engineering"),
      titleAccent: t("a la medida.", "tailored."),
      description: t(
        "Llegas con un problema borroso. Salimos contigo a producción con una solución concreta, probada, y mantenible.",
        "You arrive with a blurry problem. We go to production with you with a concrete, tested, and maintainable solution."
      ),
      tags: ["discovery", "architecture", "delivery", "handoff"],
    },
    {
      num: "02",
      title: t("IA aplicada al", "AI applied to"),
      titleAccent: t("trabajo real.", "real work."),
      description: t(
        "No demos bonitos. Agentes, pipelines y copilotos que se meten a tu operación y empiezan a devolverte horas la primera semana.",
        "No pretty demos. Agents, pipelines and copilots that get into your operation and start giving you back hours the first week."
      ),
      tags: ["agents", "copilots", "retrieval", "evals"],
    },
    {
      num: "03",
      title: t("Producto a medida,", "Custom product,"),
      titleAccent: t("sin atajos.", "no shortcuts."),
      description: t(
        "Cuando lo que necesitas no existe en SaaS, lo construimos con los estándares de quien lo va a mantener cinco años — no cinco meses.",
        "When what you need doesn't exist in SaaS, we build it with the standards of someone who will maintain it for five years — not five months."
      ),
      tags: ["product", "platform", "infra", "ops"],
    },
  ];

  return (
    <section className="py-16 md:py-20 px-6 md:px-10 lg:px-7 border-t border-border bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] mb-10 flex items-center">
          <span className="text-primary">¶</span>
          <span className="font-serif italic mx-2.5">iii.</span>
          <span className="text-border">—</span>
          <span className="mx-2.5">{t("servicios", "services")}</span>
          <span className="ml-auto text-muted-foreground">{t("tres formas de empezar", "three ways to start")}</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-foreground max-w-[480px] mb-6">
          {t("Tres caminos", "Three paths")}<br/>
          <span className="italic text-muted-foreground">{t("para entrar.", "to enter.")}</span>
        </h2>

        {/* Services list */}
        <div className="flex flex-col">
          {services.map((svc, i) => (
            <div 
              key={svc.num}
              className={`row-hover grid grid-cols-1 md:grid-cols-[60px_1fr_110px] gap-6 items-start py-8 px-2 -mx-2 border-t border-border ${i === services.length - 1 ? 'border-b' : ''}`}
            >
              <div className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] pt-1.5">
                [ {svc.num} ]
              </div>
              <div>
                <h3 className="font-serif text-[30px] leading-[1.05] tracking-[-0.015em] font-normal text-foreground mb-3.5">
                  {svc.title} <span className="italic text-muted-foreground">{svc.titleAccent}</span>
                </h3>
                <p className="text-[14px] leading-[1.65] text-muted-foreground mb-4 max-w-[480px]">
                  {svc.description}
                </p>
                <div className="font-mono text-[10px] text-muted-foreground tracking-[0.12em] flex gap-3.5 flex-wrap">
                  {svc.tags.map((tag, j) => (
                    <span key={tag} className="flex items-center gap-3.5">
                      <span>{tag}</span>
                      {j < svc.tags.length - 1 && <span className="text-border">·</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right pt-2 hidden md:block">
                <Link href="/services" className="link-hover text-[12px] text-muted-foreground border-b border-border pb-0.5 hover:text-primary hover:border-primary transition-colors">
                  {t("Leer más", "Read more")} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
