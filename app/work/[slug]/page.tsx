import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, getRelatedProjects } from "@/lib/projects";
import { ProjectCover } from "@/components/project-cover";
import { ProjectCard } from "@/components/project-card";
import { Pill } from "@/components/pill";
import { Kicker } from "@/components/kicker";
import { CtaStrip } from "@/components/cta-strip";
import { ExternalLinkIcon } from "@/components/external-link-icon";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [
        {
          url: `/og?title=${encodeURIComponent(project.title)}&kicker=${encodeURIComponent(project.industry)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug, 2);

  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <article className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <Kicker>
            <Link href="/work" className="hover:text-(--color-fg) transition-colors">
              Work
            </Link>
            {" / "}
            {project.title}
          </Kicker>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-(--color-fg) mb-4">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-(--color-muted) mb-6">
            {project.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Kicker>{project.industry} · {project.year}</Kicker>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-(--color-accent) hover:underline"
              >
                Visit live site <ExternalLinkIcon />
              </a>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-(--color-accent)/10 text-(--color-accent) border border-(--color-accent)/30">
                Private — case study available on request
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
            <h2 className="text-2xl font-medium text-(--color-fg) mb-4">Overview</h2>
            <p className="text-base text-(--color-muted) leading-relaxed">
              {project.summary}
            </p>
          </div>
          <aside className="flex flex-col gap-6">
            <dl className="flex flex-col gap-4">
              <div>
                <dt className="text-xs font-mono uppercase tracking-[0.15em] text-(--color-muted) mb-1">Client</dt>
                <dd className="text-sm text-(--color-fg)">{project.client}</dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-[0.15em] text-(--color-muted) mb-1">Year</dt>
                <dd className="text-sm text-(--color-fg) font-mono tabular-nums">{project.year}</dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-[0.15em] text-(--color-muted) mb-1">Services</dt>
                <dd className="flex flex-col gap-1">
                  {project.services.map((s) => (
                    <span key={s} className="text-sm text-(--color-fg)">{s}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-[0.15em] text-(--color-muted) mb-1">Stack</dt>
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
          <h2 className="text-2xl font-medium text-(--color-fg) mb-6">What we delivered</h2>
          <ul className="flex flex-col gap-3">
            {project.services.map((s) => (
              <li key={s} className="flex items-start gap-3 text-base text-(--color-muted)">
                <span className="text-(--color-accent) mt-0.5 shrink-0">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome */}
        {project.outcome && (
          <div className="mb-12 border-t border-(--color-border) pt-12">
            <p className="text-xl font-medium text-(--color-accent)">
              {project.outcome}
            </p>
          </div>
        )}

        {/* CTA to live site */}
        {project.liveUrl && (
          <div className="mb-16 border-t border-(--color-border) pt-12">
            <Button
              asChild
              size="lg"
              className="bg-(--color-accent) text-(--color-accent-fg) hover:opacity-90 transition-opacity font-medium text-base px-8 py-4 h-auto rounded-2xl"
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                See it live <ExternalLinkIcon className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        )}

        {/* Related work */}
        {related.length > 0 && (
          <div className="border-t border-(--color-border) pt-12">
            <h2 className="text-2xl font-medium text-(--color-fg) mb-8">Related work</h2>
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
