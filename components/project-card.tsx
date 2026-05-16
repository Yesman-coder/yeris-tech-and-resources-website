"use client";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { type Project } from "@/lib/projects";
import { ProjectCover } from "./project-cover";
import { Kicker } from "./kicker";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXCard = useMotionValue(0);
  const mouseYCard = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 200,
    damping: 20,
  });

  const spotlightBg = useMotionTemplate`radial-gradient(200px circle at ${mouseXCard}px ${mouseYCard}px, oklch(0.78 0.18 75 / 0.12), transparent 80%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseXCard.set(e.clientX - rect.left);
    mouseYCard.set(e.clientY - rect.top);
    if (prefersReduced) return;
    mouseX.set(nx);
    mouseY.set(ny);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 800 }}
    >
      <motion.div
        style={prefersReduced ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <Link
          href={`/work/${project.slug}`}
          className="group relative block rounded-2xl border border-(--color-border) bg-(--color-bg-elev) overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-(--color-accent) hover:shadow-[0_8px_32px_-8px_oklch(0.78_0.18_75/0.25)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2"
        >
          {/* Spotlight overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            style={{ background: spotlightBg }}
            aria-hidden="true"
          />

          <div className="overflow-hidden">
            <div className="transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2">
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
      </motion.div>
    </div>
  );
}
