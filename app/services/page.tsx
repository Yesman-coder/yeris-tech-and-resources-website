import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Kicker } from "@/components/kicker";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";
import { Globe, Bot, Smartphone, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design & development, AI agents, mobile apps, and e-commerce — built fast and shipped to production.",
};

const serviceData = [
  {
    id: "web-design",
    icon: Globe,
    title: "Web Design & Development",
    description: [
      "From marketing sites to full web applications, we build products that are fast, accessible, and built to scale. Every project starts with a clear scope and ends in production.",
      "We use Next.js, Tailwind CSS, and Vercel across the board — the same stack powering the most respected companies on the internet. No WordPress, no bloat, no mystery.",
    ],
    serviceMatch: "Web design",
  },
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI Agents & Automation",
    description: [
      "We design and deploy production-grade AI agents that handle repetitive work — triage, follow-up, back-office automation, and more. Built on the Vercel AI SDK and tested against real workloads.",
      "These aren't demos. They run in production, handle edge cases, and integrate with the tools your team already uses.",
    ],
    serviceMatch: "AI agent",
  },
  {
    id: "apps",
    icon: Smartphone,
    title: "Mobile & Web Apps",
    description: [
      "Full-stack product builds from zero to shipped. We handle product design, engineering, auth, roles, and handoff — everything you need to go from idea to live product.",
      "Mobile-first by default, responsive everywhere. We build for real users on real devices.",
    ],
    serviceMatch: "Web app development",
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "E-commerce",
    description: [
      "Storefronts designed for conversion — fast product grids, clean PDPs, and checkout flows tuned for first-time mobile buyers. No Shopify lock-in. No theme limitations.",
      "We build headless storefronts that you own completely. When your business changes, your store changes with it.",
    ],
    serviceMatch: "E-commerce",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <Reveal>
          <Kicker className="mb-4">What we do</Kicker>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-(--color-fg) mb-6">
            Services
          </h1>
          <p className="text-base text-(--color-muted) max-w-2xl leading-relaxed">
            We ship working products. Pick the service that fits your project.
          </p>
        </Reveal>
      </section>

      {serviceData.map((svc, idx) => {
        const related = projects.filter((p) =>
          p.services.some((s) =>
            s.toLowerCase().includes(svc.serviceMatch.toLowerCase())
          )
        );

        return (
          <section
            key={svc.id}
            id={svc.id}
            className={`border-t border-(--color-border) ${idx % 2 === 1 ? "bg-(--color-bg-elev)" : ""}`}
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <svc.icon className="w-7 h-7 text-(--color-accent)" aria-hidden="true" />
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-(--color-fg)">
                    {svc.title}
                  </h2>
                </div>
                <div className="max-w-2xl flex flex-col gap-4 mb-12">
                  {svc.description.map((para, i) => (
                    <p key={i} className="text-base text-(--color-muted) leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              {related.length > 0 && (
                <div>
                  <Kicker className="mb-6">Past work</Kicker>
                  <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory">
                    {related.map((p) => (
                      <div key={p.slug} className="min-w-[320px] snap-start">
                        <ProjectCard project={p} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <CtaStrip />
    </>
  );
}
