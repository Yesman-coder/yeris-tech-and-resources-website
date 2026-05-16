import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Kicker } from "@/components/kicker";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";
import { Globe, Robot, DeviceMobile, ShoppingCart } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design & development, AI agents, mobile apps, and e-commerce — built fast and shipped to production.",
};

const serviceData = [
  {
    id: "web-design",
    icon: Globe,
    number: "01",
    title: "Web Design & Development",
    description: [
      "From marketing sites to full web applications, we build products that are fast, accessible, and built to scale. Every project starts with a clear scope and ends in production.",
      "We use Next.js, Tailwind CSS, and Vercel across the board — the same stack powering the most respected companies on the internet. No WordPress, no bloat, no mystery.",
    ],
    serviceMatch: "Web design",
  },
  {
    id: "ai-agents",
    icon: Robot,
    number: "02",
    title: "AI Agents & Automation",
    description: [
      "We design and deploy production-grade AI agents that handle repetitive work — triage, follow-up, back-office automation, and more. Built on the Vercel AI SDK and tested against real workloads.",
      "These aren't demos. They run in production, handle edge cases, and integrate with the tools your team already uses.",
    ],
    serviceMatch: "AI agent",
  },
  {
    id: "apps",
    icon: DeviceMobile,
    number: "03",
    title: "Mobile & Web Apps",
    description: [
      "Full-stack product builds from zero to shipped. We handle product design, engineering, auth, roles, and handoff — everything you need to go from idea to live product.",
      "Mobile-first by default, responsive everywhere. We build for real users on real devices.",
    ],
    serviceMatch: "Web app development",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    number: "04",
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
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#F5F5F7] leading-[1.02] mb-6">
            Services
          </h1>
          <p className="text-base text-[#5C5C5C] dark:text-[#888899] max-w-xl leading-relaxed">
            We ship working products. Pick the service that fits your project.
          </p>
        </Reveal>
      </section>

      <div className="border-t border-black/10 dark:border-white/10">
        {serviceData.map((svc, idx) => {
          const related = projects.filter((p) =>
            p.services.some((s) =>
              s.toLowerCase().includes(svc.serviceMatch.toLowerCase())
            )
          );
          const Icon = svc.icon;

          return (
            <section
              key={svc.id}
              id={svc.id}
              className="border-b border-black/10 dark:border-white/10"
            >
              <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
                <Reveal>
                  <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start">
                    {/* Left: number + icon */}
                    <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6 lg:pt-1">
                      <span className="text-5xl font-mono font-medium text-[#E85D04] dark:text-[#9D4EDD] tabular-nums leading-none">
                        {svc.number}
                      </span>
                      <Icon
                        size={28}
                        weight="light"
                        className="text-[#5C5C5C] dark:text-[#888899]"
                        aria-hidden
                      />
                    </div>

                    {/* Right: content */}
                    <div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#F5F5F7] mb-8 leading-tight">
                        {svc.title}
                      </h2>
                      <div className="flex flex-col gap-4 max-w-2xl mb-12">
                        {svc.description.map((para, i) => (
                          <p key={i} className="text-base text-[#5C5C5C] dark:text-[#888899] leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>

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
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <CtaStrip />
    </>
  );
}
