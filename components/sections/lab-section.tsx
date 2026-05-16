"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function LabSection() {
  const { t } = useLanguage();
  
  const posts = [
    {
      date: "nov 04 · 2025",
      tag: "infra",
      title: t("Por qué eliminamos la mitad de nuestros", "Why we deleted half our"),
      titleAccent: "microservices",
      titleEnd: t("y dormimos mejor.", "and slept better."),
      description: t(
        "Volver a un monolito modular redujo el infra bill en 60% y los incidents a la mitad.",
        "Going back to a modular monolith reduced the infra bill by 60% and incidents by half."
      ),
      readTime: "7 min",
    },
    {
      date: "oct 22 · 2025",
      tag: "process",
      title: t("La regla de las 4", "The 4"),
      titleAccent: t("horas", "hour"),
      titleEnd: t(": cómo auditamos antes de cotizar.", " rule: how we audit before quoting."),
      description: t(
        "Cuatro horas pagadas que ahorran cuatro meses de proyecto torcido.",
        "Four paid hours that save four months of twisted project."
      ),
      readTime: "5 min",
    },
    {
      date: "oct 09 · 2025",
      tag: "ai",
      title: t("Cuando los agentes dejan de ser", "When agents stop being"),
      titleAccent: "demos",
      titleEnd: t("y empiezan a ser infra.", "and start being infra."),
      description: t(
        "El gap entre prompt-eng en notebook y agentes con SLA en producción.",
        "The gap between prompt-eng in notebook and agents with SLA in production."
      ),
      readTime: "9 min",
    },
  ];

  return (
    <section className="py-16 md:py-20 px-6 md:px-10 lg:px-7 border-t border-theme bg-theme-bg">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] text-theme-muted tracking-[0.12em] mb-10 flex items-center">
          <span className="text-theme-primary">¶</span>
          <span className="font-serif italic mx-2.5">v.</span>
          <span style={{ color: 'var(--color-border)' }}>—</span>
          <span className="mx-2.5">the lab</span>
          <span className="ml-auto text-theme-muted">{t("notas desde el teclado", "notes from the keyboard")}</span>
        </div>

        {/* Header with description */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-theme-fg max-w-[380px]">
            {t("Lo que aprendemos", "What we learn")}<br/>
            <span className="italic text-theme-muted">{t("en producción.", "in production.")}</span>
          </h2>
          <p className="text-[13px] text-theme-muted max-w-[280px] leading-[1.6] mb-1.5">
            {t("Sin gatekeeping. Escrito por nosotros, no por marketing.", "No gatekeeping. Written by us, not by marketing.")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <article 
              key={i}
              className="card-hover bg-theme-card border border-theme rounded-[14px] p-5 cursor-pointer"
            >
              <div className="font-mono text-[10px] text-theme-muted tracking-[0.12em] mb-4 flex justify-between">
                <span>{post.date}</span>
                <span className="text-theme-primary">[{post.tag}]</span>
              </div>
              <h3 className="font-serif text-[21px] leading-[1.15] tracking-[-0.005em] font-normal text-theme-fg mb-3.5">
                {post.title} <span className="italic text-theme-primary">{post.titleAccent}</span> {post.titleEnd}
              </h3>
              <p className="text-[12px] leading-[1.6] text-theme-muted mb-5">
                {post.description}
              </p>
              <span className="font-mono text-[11px] text-theme-muted">
                {t("Leer", "Read")} · {post.readTime} &rarr;
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
