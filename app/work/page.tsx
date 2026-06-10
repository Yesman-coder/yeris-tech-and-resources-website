"use client";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Pill } from "@/components/pill";
import { Kicker } from "@/components/kicker";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";
import { useLanguage } from "@/components/language-provider";

export default function WorkPage() {
  const [active, setActive] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const industries = Array.from(
    new Set(
      projects.map((p) => (language === "en" ? p.industry : p.industry_es)),
    ),
  ) as string[];

  const filtered = active
    ? projects.filter((p) => {
        if (language === "es") return p.industry_es === active;
        return p.industry === active;
      })
    : projects;

  function countFor(industry: string | number) {
    return projects.filter((p) => {
      if (language === "es") return p.industry_es === industry;
      return p.industry === industry;
    }).length;
  }

  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <Reveal>
          <Kicker className="mb-4">{t("Portafolio", "Portfolio")}</Kicker>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-primary mb-4">
            {t("Trabajo seleccionado", "Selected Work")}
          </h1>
          <p className="text-base text-[#5C5C5C] dark:text-[#888899] mb-12">
            {t(
              "Nueve proyectos en ocho industrias. Elige uno.",
              "Nine projects across eight industries. Pick one.",
            )}
          </p>
        </Reveal>

        {/* Filter pills */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filter by industry"
        >
          <Pill active={active === null} onClick={() => setActive(null)}>
            {t("Todos", "All")} ({projects.length})
          </Pill>
          {industries.map((industry) => {
            return (
              <Pill
                key={industry}
                active={active === industry}
                onClick={() =>
                  setActive((prev) => {
                    if (prev === industry) return null;
                    return industry as string;
                  })
                }
              >
                {industry} ({countFor(industry)})
              </Pill>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <Reveal key={project.slug} delay={i < 4 ? i * 0.06 : 0}>
              <ProjectCard project={project} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
