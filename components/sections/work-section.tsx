"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Project } from "@/lib/projects";

interface WorkSectionProps {
  projects: Project[];
}

export function WorkSection({ projects }: WorkSectionProps) {
  const { t } = useLanguage();
  
  const works = [
    {
      num: "01",
      title: "Stanton Financial",
      titleAccent: "Redesign.",
      meta: "2025 · finance + community · design + build",
      description: t(
        "Brand refresh + página de comunidad + funnel de consultas.",
        "Brand refresh + community page + consultation funnel."
      ),
      outcome: "+218%",
      outcomeLabel: t("conversión CTA en el primer mes.", "CTA conversion in the first month."),
    },
    {
      num: "02",
      title: "AI Agents",
      titleAccent: "for Alto.",
      meta: "2025 · ai operations · agent design + delivery",
      description: t(
        "Agentes que automatizan triage de tickets.",
        "Agents that automate ticket triage."
      ),
      outcome: "-72h/" + t("semana", "week"),
      outcomeLabel: t("de trabajo manual del equipo de soporte.", "of manual work from the support team."),
    },
    {
      num: "03",
      title: "Zulia",
      titleAccent: "Access.",
      meta: "2025 · civic tech · full product",
      description: t(
        "Plataforma de acceso a servicios públicos.",
        "Public services access platform."
      ),
      outcome: "14k",
      outcomeLabel: t("usuarios en piloto antes del primer marketing push.", "users in pilot before the first marketing push."),
    },
  ];

  return (
    <section className="py-16 md:py-20 px-6 md:px-10 lg:px-7 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] bg-[#FBF8F3] dark:bg-[#0A0A0F]">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.12em] mb-10 flex items-center">
          <span className="text-[#E85D04] dark:text-[#9D4EDD]">¶</span>
          <span className="font-serif italic mx-2.5">iv.</span>
          <span className="text-[rgba(0,0,0,0.1)] dark:text-[rgba(255,255,255,0.06)]">—</span>
          <span className="mx-2.5">{t("trabajos seleccionados", "selected works")}</span>
          <span className="ml-auto text-[#5C5C5C] dark:text-[#888899]">14 shipments · 3 {t("destacados", "featured")}</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-[#1A1A1A] dark:text-[#F5F5F7] max-w-[480px] mb-12">
          {t("Lo que ha cambiado", "What has changed")}<br/>
          <span className="italic text-[#5C5C5C] dark:text-[#888899]">{t("después de nosotros.", "after us.")}</span>
        </h2>

        {/* Works list */}
        <div className="flex flex-col">
          {works.map((work, i) => (
            <div 
              key={work.num}
              className={`row-hover grid grid-cols-1 md:grid-cols-[50px_1.4fr_1fr_90px] gap-5 items-center py-7 px-2 -mx-2 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] ${i === works.length - 1 ? 'border-b' : ''}`}
            >
              <div className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] hidden md:block">
                [ {work.num} ]
              </div>
              <div>
                <h3 className="font-serif text-[24px] leading-[1.1] tracking-[-0.01em] font-normal text-[#1A1A1A] dark:text-[#F5F5F7] mb-1.5">
                  {work.title} <span className="italic text-[#5C5C5C] dark:text-[#888899]">{work.titleAccent}</span>
                </h3>
                <div className="font-mono text-[10px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.1em]">
                  {work.meta}
                </div>
              </div>
              <div className="text-[13px] text-[#5C5C5C] dark:text-[#888899] leading-[1.5]">
                {work.description} <span className="text-[#E85D04] dark:text-[#9D4EDD]">{work.outcome}</span> {work.outcomeLabel}
              </div>
              <div className="text-right hidden md:block">
                <Link href={`/work/${projects[i]?.slug || ''}`} className="text-[11px] text-[#5C5C5C] dark:text-[#888899] border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] pb-0.5 hover:text-[#E85D04] dark:hover:text-[#9D4EDD] transition-colors">
                  Case &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/work" className="text-[12px] text-[#E85D04] dark:text-[#9D4EDD] tracking-[0.04em] border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] pb-0.5 hover:border-[#E85D04] dark:hover:border-[#9D4EDD] transition-colors">
            {t("Ver los 14 shipments", "View all 14 shipments")} &nbsp;&rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
