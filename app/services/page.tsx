"use client";

import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Kicker } from "@/components/kicker";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";
import { useLanguage } from "@/components/language-provider";
import { Globe, Robot, DeviceMobile, ShoppingCart } from "@phosphor-icons/react/dist/ssr";

export default function ServicesPage() {
  const { t } = useLanguage();

  const serviceData = [
    {
      id: "web-design",
      icon: Globe,
      number: "01",
      title: t("Diseño y desarrollo web", "Web Design & Development"),
      description: [
        t(
          "Desde sitios de marketing hasta aplicaciones web completas, construimos productos rápidos, accesibles y escalables. Cada proyecto empieza con un alcance claro y termina en producción.",
          "From marketing sites to full web applications, we build products that are fast, accessible, and built to scale. Every project starts with a clear scope and ends in production."
        ),
        t(
          "Usamos Next.js, Tailwind CSS y Vercel en todo — el mismo stack que usan las empresas más respetadas de internet. Sin WordPress, sin bloat, sin misterio.",
          "We use Next.js, Tailwind CSS, and Vercel across the board — the same stack powering the most respected companies on the internet. No WordPress, no bloat, no mystery."
        ),
      ],
      serviceMatch: "Web design",
    },
    {
      id: "ai-agents",
      icon: Robot,
      number: "02",
      title: t("Agentes de IA y automatización", "AI Agents & Automation"),
      description: [
        t(
          "Diseñamos y desplegamos agentes de IA de grado producción que manejan trabajo repetitivo — triage, seguimiento, automatización de back-office y más. Construidos con Vercel AI SDK y probados contra cargas reales.",
          "We design and deploy production-grade AI agents that handle repetitive work — triage, follow-up, back-office automation, and more. Built on the Vercel AI SDK and tested against real workloads."
        ),
        t(
          "Estos no son demos. Corren en producción, manejan casos edge, y se integran con las herramientas que tu equipo ya usa.",
          "These aren't demos. They run in production, handle edge cases, and integrate with the tools your team already uses."
        ),
      ],
      serviceMatch: "AI agent",
    },
    {
      id: "apps",
      icon: DeviceMobile,
      number: "03",
      title: t("Apps móviles y web", "Mobile & Web Apps"),
      description: [
        t(
          "Builds de producto full-stack de cero a producción. Manejamos diseño de producto, ingeniería, auth, roles y handoff — todo lo que necesitas para ir de idea a producto en vivo.",
          "Full-stack product builds from zero to shipped. We handle product design, engineering, auth, roles, and handoff — everything you need to go from idea to live product."
        ),
        t(
          "Mobile-first por defecto, responsive en todas partes. Construimos para usuarios reales en dispositivos reales.",
          "Mobile-first by default, responsive everywhere. We build for real users on real devices."
        ),
      ],
      serviceMatch: "Web app development",
    },
    {
      id: "ecommerce",
      icon: ShoppingCart,
      number: "04",
      title: "E-commerce",
      description: [
        t(
          "Tiendas diseñadas para conversión — grids de producto rápidos, PDPs limpios, y flujos de checkout optimizados para compradores móviles primerizos. Sin lock-in de Shopify. Sin limitaciones de temas.",
          "Storefronts designed for conversion — fast product grids, clean PDPs, and checkout flows tuned for first-time mobile buyers. No Shopify lock-in. No theme limitations."
        ),
        t(
          "Construimos storefronts headless que son completamente tuyos. Cuando tu negocio cambia, tu tienda cambia con él.",
          "We build headless storefronts that you own completely. When your business changes, your store changes with it."
        ),
      ],
      serviceMatch: "E-commerce",
    },
  ];

  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <Reveal>
          <Kicker className="mb-4">{t("Lo que hacemos", "What we do")}</Kicker>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#F5F5F7] leading-[1.02] mb-6">
            {t("Servicios", "Services")}
          </h1>
          <p className="text-base text-[#5C5C5C] dark:text-[#888899] max-w-xl leading-relaxed">
            {t("Enviamos productos funcionales. Elige el servicio que se ajuste a tu proyecto.", "We ship working products. Pick the service that fits your project.")}
          </p>
        </Reveal>
      </section>

      <div className="border-t border-black/10 dark:border-white/10">
        {serviceData.map((svc) => {
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
                          <Kicker className="mb-6">{t("Trabajo anterior", "Past work")}</Kicker>
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
