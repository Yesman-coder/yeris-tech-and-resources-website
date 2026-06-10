"use client";

import { useRef, useEffect, useState } from "react";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Kicker } from "@/components/kicker";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";
import { useLanguage } from "@/components/language-provider";
import {
  Globe,
  Robot,
  DeviceMobile,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

function ProjectScroll({ items }: { items: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    sync();
  }, [items]);

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
    sync();
  };

  if (items.length === 0) return null;

  const showArrows = items.length > 1;

  return (
    <div>
      <div
        ref={ref}
        className="relative overflow-x-auto w-full max-w-[620px] pr-10 no-scrollbar py-5"
      >
        <div
          onScroll={sync}
          className="flex gap-6"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((p) => (
            <div
              key={p.slug}
              className="min-w-[320px] max-w-[320px] flex-shrink-0"
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
      {showArrows && (
        <div className="flex gap-2 mt-5">
          <button
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label="Previous"
            className="flex items-center justify-center w-9 h-9 border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label="Next"
            className="flex items-center justify-center w-9 h-9 border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

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
          "From marketing sites to full web applications, we build products that are fast, accessible, and built to scale. Every project starts with a clear scope and ends in production.",
        ),
        t(
          "Usamos Next.js, Tailwind CSS y Vercel en todo — el mismo stack que usan las empresas más respetadas de internet. Sin WordPress, sin bloat, sin misterio.",
          "We use Next.js, Tailwind CSS, and Vercel across the board — the same stack powering the most respected companies on the internet. No WordPress, no bloat, no mystery.",
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
          "We design and deploy production-grade AI agents that handle repetitive work — triage, follow-up, back-office automation, and more. Built on the Vercel AI SDK and tested against real workloads.",
        ),
        t(
          "Estos no son demos. Corren en producción, manejan casos edge, y se integran con las herramientas que tu equipo ya usa.",
          "These aren't demos. They run in production, handle edge cases, and integrate with the tools your team already uses.",
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
          "Full-stack product builds from zero to shipped. We handle product design, engineering, auth, roles, and handoff — everything you need to go from idea to live product.",
        ),
        t(
          "Mobile-first por defecto, responsive en todas partes. Construimos para usuarios reales en dispositivos reales.",
          "Mobile-first by default, responsive everywhere. We build for real users on real devices.",
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
          "Storefronts designed for conversion — fast product grids, clean PDPs, and checkout flows tuned for first-time mobile buyers. No Shopify lock-in. No theme limitations.",
        ),
        t(
          "Construimos storefronts headless que son completamente tuyos. Cuando tu negocio cambia, tu tienda cambia con él.",
          "We build headless storefronts that you own completely. When your business changes, your store changes with it.",
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
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-primary  leading-[1.02] mb-6">
            {t("Servicios", "Services")}
          </h1>
          <p className="text-base text-muted max-w-xl leading-relaxed">
            {t(
              "Enviamos productos funcionales. Elige el servicio que se ajuste a tu proyecto.",
              "We ship working products. Pick the service that fits your project.",
            )}
          </p>
        </Reveal>
      </section>

      <div className="border-t border-border">
        {serviceData.map((svc) => {
          const related = projects.filter((p) =>
            p.services.some((s) =>
              s.toLowerCase().includes(svc.serviceMatch.toLowerCase()),
            ),
          );
          const Icon = svc.icon;

          return (
            <section key={svc.id} id={svc.id}>
              <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
                <Reveal>
                  <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start">
                    {/* Left: number + icon */}
                    <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6 lg:pt-1">
                      <span className="text-5xl font-mono font-medium text-accent tabular-nums leading-none">
                        {svc.number}
                      </span>
                      <Icon
                        size={28}
                        weight="light"
                        className="text-accent"
                        aria-hidden
                      />
                    </div>

                    {/* Right: content */}
                    <div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-secondary mb-8 leading-tight">
                        {svc.title}
                      </h2>
                      <div className="flex flex-col gap-4 max-w-2xl mb-12">
                        {svc.description.map((para, i) => (
                          <p
                            key={i}
                            className="text-base text-muted leading-relaxed"
                          >
                            {para}
                          </p>
                        ))}
                      </div>

                      {related.length > 0 && (
                        <div>
                          <Kicker className="mb-6">
                            {t("Trabajos hechos", "Past work")}
                          </Kicker>
                          <ProjectScroll items={related} />
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
