import Link from "next/link";
import { type Project } from "@/lib/projects";
import { ProjectCover } from "./project-cover";
import { Kicker } from "./kicker";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-2xl border border-(--color-border) bg-(--color-bg-elev) overflow-hidden transition-all duration-300 hover:border-(--color-accent) hover:shadow-[0_8px_32px_-8px_oklch(0.78_0.18_75/0.25)] focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2"
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 group-hover:-translate-y-2">
          <ProjectCover
            url={project.liveUrl}
            alt={`${project.title} screenshot`}
            initials={initials}
            priority={priority}
          />
        </div>
      </div>
      <div className="p-6">
        <Kicker className="mb-2">
          {project.industry} · {project.year}
        </Kicker>
        <h3 className="text-xl font-medium text-(--color-fg) mb-1 group-hover:text-(--color-accent) transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-(--color-muted) leading-relaxed mb-4">
          {project.tagline}
        </p>
        <span className="text-sm font-mono text-(--color-accent) group-hover:underline">
          View case study →
        </span>
      </div>
    </Link>
  );
}
