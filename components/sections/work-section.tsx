import Link from "next/link";
import { Project } from "@/lib/projects";

interface WorkSectionProps {
  projects: Project[];
}

export function WorkSection({ projects }: WorkSectionProps) {
  // Sample featured works with outcomes
  const works = [
    {
      num: "01",
      title: "Stanton Financial",
      titleAccent: "Redesign.",
      meta: "2025 · finance + community · design + build",
      description: "Brand refresh + community page + consultation funnel.",
      outcome: "+218%",
      outcomeLabel: "CTA conversion en el primer mes.",
    },
    {
      num: "02",
      title: "AI Agents",
      titleAccent: "for Alto.",
      meta: "2025 · ai operations · agent design + delivery",
      description: "Agentes que automatizan triage de tickets.",
      outcome: "-72h/semana",
      outcomeLabel: "de trabajo manual del equipo de soporte.",
    },
    {
      num: "03",
      title: "Zulia",
      titleAccent: "Access.",
      meta: "2025 · civic tech · full product",
      description: "Plataforma de acceso a servicios públicos.",
      outcome: "14k",
      outcomeLabel: "usuarios en piloto antes del primer marketing push.",
    },
  ];

  return (
    <section className="section">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="eyebrow">
          <span className="text-(--color-accent)">¶</span>
          <span className="font-serif italic mx-2.5">iv.</span>
          <span className="text-(--color-border-strong)">—</span>
          <span className="mx-2.5">selected works</span>
          <span className="ml-auto text-(--color-muted-subtle)">14 shipments · 3 destacados</span>
        </div>

        {/* Heading */}
        <h2 className="section-heading max-w-[480px]">
          Lo que ha cambiado<br/>
          <span className="italic-accent">después de nosotros.</span>
        </h2>

        {/* Works list */}
        <div className="flex flex-col">
          {works.map((work, i) => (
            <div 
              key={work.num}
              className={`row-hover grid grid-cols-1 md:grid-cols-[50px_1.4fr_1fr_90px] gap-5 items-center py-7 px-2 -mx-2 border-t border-(--color-border) ${i === works.length - 1 ? 'border-b' : ''}`}
            >
              <div className="font-mono text-[11px] text-(--color-muted-subtle) hidden md:block">
                [ {work.num} ]
              </div>
              <div>
                <h3 className="font-serif text-[24px] leading-[1.1] tracking-[-0.01em] font-normal text-(--color-fg) mb-1.5">
                  {work.title} <span className="italic text-(--color-italic)">{work.titleAccent}</span>
                </h3>
                <div className="font-mono text-[10px] text-(--color-muted-subtle) tracking-[0.1em]">
                  {work.meta}
                </div>
              </div>
              <div className="text-[13px] text-(--color-muted) leading-[1.5]">
                {work.description} <span className="text-(--color-accent)">{work.outcome}</span> {work.outcomeLabel}
              </div>
              <div className="text-right hidden md:block">
                <Link href={`/work/${projects[i]?.slug || ''}`} className="link-hover text-[11px] text-(--color-italic) border-b border-(--color-border-strong) pb-0.5">
                  Case &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/work" className="link-hover text-[12px] text-(--color-accent) tracking-[0.04em] border-b border-(--color-border-strong) pb-0.5">
            View all 14 shipments &nbsp;&rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
