"use client";
import { useState } from "react";
import type { Industry } from "@/lib/projects";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Pill } from "@/components/pill";
import { Kicker } from "@/components/kicker";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";

const industries = Array.from(new Set(projects.map((p) => p.industry))) as Industry[];

export default function WorkPage() {
  const [active, setActive] = useState<Industry | null>(null);

  const filtered = active ? projects.filter((p) => p.industry === active) : projects;

  function countFor(industry: Industry) {
    return projects.filter((p) => p.industry === industry).length;
  }

  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <Reveal>
          <Kicker className="mb-4">Portfolio</Kicker>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#F5F5F7] mb-4">
            Selected Work
          </h1>
          <p className="text-base text-[#5C5C5C] dark:text-[#888899] mb-12">
            Nine projects across eight industries. Pick one.
          </p>
        </Reveal>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by industry">
          <Pill active={active === null} onClick={() => setActive(null)}>
            All ({projects.length})
          </Pill>
          {industries.map((industry) => (
            <Pill
              key={industry}
              active={active === industry}
              onClick={() => setActive(active === industry ? null : industry)}
            >
              {industry} ({countFor(industry)})
            </Pill>
          ))}
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
