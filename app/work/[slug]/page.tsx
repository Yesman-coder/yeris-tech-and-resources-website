"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getProject, getRelatedProjects } from "@/lib/projects";
import { ProjectCover } from "@/components/project-cover";
import { ProjectCard } from "@/components/project-card";
import { Pill } from "@/components/pill";
import { Kicker } from "@/components/kicker";
import { CtaStrip } from "@/components/cta-strip";
import { ExternalLinkIcon } from "@/components/external-link-icon";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { useMemo } from "react";

export default function CaseStudyPage({}) {
  const { slug } = useParams();
  const project = useMemo(() => {
    return getProject((slug as string) || "");
  }, [slug]);
  const { t, language } = useLanguage();

  if (!project) notFound();

  const related = useMemo(() => {
    return getRelatedProjects((slug as string) || "", 2);
  }, [slug]);

  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const services = useMemo(() => {
    if (!project) return [];
    return language === "es" ? project.services_es : project.services;
  }, [project, language]);

  return (
    <>
      <article className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <Kicker>
            <Link href="/work" className="text-popover text-lg">
              {"< Work"}
            </Link>
          </Kicker>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-primary mb-4">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted mb-6">
            {t(project.tagline_es, project.tagline)}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Kicker>
              {t(project.industry_es, project.industry)} · {project.year}
            </Kicker>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-secondary hover:underline"
              >
                {t("Visitar sitio web >", "Visit live site >")}
              </a>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-secondary/10 text-secondary border border-secondary/30">
                {t(
                  "Privado — caso de estudio disponible en solicitud",
                  "Private — case study available on request",
                )}
              </span>
            )}
          </div>
        </div>

        {/* Cover screenshot */}
        <div className="mb-16">
          <ProjectCover
            url={project.liveUrl}
            alt={`${project.title} screenshot`}
            initials={initials}
            priority
          />
        </div>

        {/* Two-column overview */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-medium text-primary mb-4">
              {t("Descripción", "Overview")}
            </h2>
            <p className="text-base text-muted leading-relaxed">
              {t(project.summary_es, project.summary)}
            </p>
          </div>
          <aside className="flex flex-col gap-6">
            <dl className="flex flex-col gap-4">
              <div>
                <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  {t("Cliente", "Client")}
                </dt>
                <dd className="text-sm text-muted">{project.client}</dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  {t("Año", "Year")}
                </dt>
                <dd className="text-sm text-muted font-mono tabular-nums">
                  {project.year}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  {t("Servicios", "Services")}
                </dt>
                <dd className="flex flex-col gap-1">
                  {services.map((s) => (
                    <span key={s} className="text-sm text-muted">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  {"Stack"}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* What we delivered */}
        <div className="mb-12 border-t border-(--color-border) pt-12">
          <h2 className="text-2xl font-medium text-primary mb-6">
            {t("Lo que entregamos", "What we delivered")}
          </h2>
          <ul className="flex flex-col gap-3">
            {services.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 text-base text-secondary"
              >
                <span className="text-muted mt-0.5 shrink-0">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome */}
        {project.outcome && (
          <div className="mb-12 border-t border-(--color-border) pt-12">
            <p className="text-xl font-medium text-primary-foreground bg-primary">
              {t(project.outcome_es || "", project.outcome)}
            </p>
          </div>
        )}

        {/* CTA to live site */}
        {project.liveUrl && (
          <div className="mb-16 border-t border-(--color-border) pt-12">
            <Button
              asChild
              size="lg"
              className="bg-primary text-background hover:opacity-90 transition-opacity font-medium text-base px-8 py-4 h-auto rounded-2xl"
            >
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("Ir al website", "See it live")}{" "}
                <ExternalLinkIcon className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        )}

        {/* Related work */}
        {related.length > 0 && (
          <div className="border-t border-(--color-border) pt-12">
            <h2 className="text-2xl font-medium text-primary mb-8">
              {t("Trabajo relacionado", "Related work")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        )}
      </article>
      <CtaStrip />
    </>
  );
}
