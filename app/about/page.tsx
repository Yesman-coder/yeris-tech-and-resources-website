"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

const principlesEs = [
  {
    title: "Enviamos el producto.",
    body: "Cada proyecto termina en producción. No en staging, no en un Figma — un producto real que tus usuarios pueden tocar.",
  },
  {
    title: "Sin intermediarios.",
    body: "Hablas directamente con las personas que hacen el trabajo. Sin account managers, sin hand-offs, sin teléfono descompuesto.",
  },
  {
    title: "A velocidad de startup.",
    body: "Un v1 en semanas, no en trimestres. Hacemos scope ajustado, construimos rápido, y enviamos antes de que se cierre la ventana.",
  },
];

const principlesEn = [
  {
    title: "Ship the thing.",
    body: "Every project ends in production. Not a staging environment, not a Figma file — a working product your users can touch.",
  },
  {
    title: "No middlemen.",
    body: "You talk directly to the people doing the work. No account managers, no hand-offs, no version of the game of telephone.",
  },
  {
    title: "Move at startup speed.",
    body: "Weeks to a v1, not quarters. We scope tight, build fast, and ship before the window closes.",
  },
];

const howWeWorkEs = [
  "Llamada de descubrimiento — 30 minutos para entender tu proyecto, timeline y presupuesto.",
  "Propuesta de alcance fijo — un documento claro que detalla exactamente qué se construye y por cuánto.",
  "Build de 2-6 semanas — check-ins semanales, staging compartido, sin sorpresas.",
  "Entrega + 30 días de soporte — nos quedamos disponibles para preguntas, ajustes y seguimiento.",
];

const howWeWorkEn = [
  "Discovery call — 30 minutes to understand your project, timeline, and budget.",
  "Fixed-scope proposal — a clear document outlining exactly what gets built and for how much.",
  "2-6 week build — weekly check-ins, shared staging environment, no surprises.",
  "Handoff + 30 days of support — we stay available for questions, fixes, and follow-ons.",
];

export default function AboutPage() {
  const { t, language } = useLanguage();
  const principles = language === "es" ? principlesEs : principlesEn;
  const howWeWork = language === "es" ? howWeWorkEs : howWeWorkEn;

  return (
    <div className="bg-[#FBF8F3] dark:bg-[#0A0A0F] min-h-screen">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-7 pt-24 pb-16">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.12em] mb-10 flex items-center">
          <span className="text-[#E85D04] dark:text-[#9D4EDD]">¶</span>
          <span className="font-serif italic mx-2.5">vii.</span>
          <span className="text-[rgba(0,0,0,0.1)] dark:text-[rgba(255,255,255,0.06)]">—</span>
          <span className="mx-2.5">{t("nosotros", "about")}</span>
          <span className="ml-auto text-[#5C5C5C] dark:text-[#888899]">{t("el estudio detrás de los envíos", "the studio behind the shipments")}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-start">
          <div>
            <h1 className="font-serif text-[clamp(40px,8vw,60px)] leading-[0.99] tracking-[-0.02em] font-normal text-[#1A1A1A] dark:text-[#F5F5F7] mb-10">
              {t("Dos disciplinas.", "Two disciplines.")}<br/>
              <span className="italic text-[#5C5C5C] dark:text-[#888899]">{t("Un estudio.", "One studio.")}</span><br/>
              {t("Cada proyecto", "Every project")} <span className="italic text-[#E85D04] dark:text-[#9D4EDD]">{t("enviado.", "shipped.")}</span>
            </h1>
            
            <div className="flex flex-col gap-5 text-[15px] text-[#5C5C5C] dark:text-[#888899] leading-[1.7] max-w-2xl">
              <p>
                {t(
                  "Yeris Tech & Resources LLC nace de la asociación entre Yesman Utrera y Boris Bruno. Yesman aporta gestión de proyectos experimentada — alcance, comunicación con clientes, timelines de entrega, y mantener cada build en curso. Boris aporta la fuerza de desarrollo senior — decisiones de arquitectura, código de grado producción, y la profundidad técnica para abordar lo que el proyecto requiera.",
                  "Yeris Tech & Resources LLC is built on the partnership of Yesman Utrera and Boris Bruno. Yesman brings seasoned project management — scoping, client communication, delivery timelines, and keeping every build on track. Boris brings the senior development muscle — architecture decisions, production-grade code, and the engineering depth to tackle whatever the project requires."
                )}
              </p>
              <p>
                {t(
                  "Juntos cubren el stack completo de un build de producto, desde la primera llamada de descubrimiento hasta el deployment final. Sin subcontratar las partes difíciles, sin entregarte a alguien más a mitad de proyecto — las mismas dos personas que definen el alcance son las que lo envían.",
                  "Together they cover the full stack of a product build, from first discovery call to final deployment. No outsourcing the hard parts, no handing you off mid-project — the same two people who scope the work are the ones who ship it."
                )}
              </p>
              <p>
                {t(
                  "El estudio trabaja con fundadores y operadores de PyMEs que necesitan algo real construido, rápido. 14 envíos en 8 industrias — desde flujos de donación para non-profits hasta agentes de IA en producción y e-commerce de fitness. Cada proyecto termina en producción.",
                  "The studio works with SMB founders and operators who need something real built, fast. 14 shipments across 8 industries — from non-profit donation flows to production AI agents to fitness e-commerce. Every project ends in production."
                )}
              </p>
            </div>
          </div>

          {/* Team photos */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-24">
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)]">
                <Image
                  src="/images/yesman-portrait.jpg"
                  alt="Yesman Utrera"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4">
                <p className="font-mono text-[10px] text-[#E85D04] dark:text-[#9D4EDD] tracking-[0.2em] mb-1">
                  {t("GESTIÓN DE PROYECTOS", "PROJECT MANAGEMENT")}
                </p>
                <p className="font-serif text-[24px] text-[#1A1A1A] dark:text-[#F5F5F7]">
                  Yesman Utrera
                </p>
              </div>
            </div>
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)]">
                <Image
                  src="/images/developer-portrait.jpg"
                  alt="Boris Bruno"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4">
                <p className="font-mono text-[10px] text-[#E85D04] dark:text-[#9D4EDD] tracking-[0.2em] mb-1">
                  {t("DESARROLLO SENIOR", "SENIOR DEVELOPMENT")}
                </p>
                <p className="font-serif text-[24px] text-[#1A1A1A] dark:text-[#F5F5F7]">
                  Boris Bruno
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 px-6 md:px-10 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] bg-[#FBF8F3] dark:bg-[#0A0A0F]">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.12em] mb-10 flex items-center">
            <span className="text-[#E85D04] dark:text-[#9D4EDD]">¶</span>
            <span className="font-serif italic mx-2.5">viii.</span>
            <span className="text-[rgba(0,0,0,0.1)] dark:text-[rgba(255,255,255,0.06)]">—</span>
            <span className="mx-2.5">{t("principios", "principles")}</span>
          </div>
          
          <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-[#1A1A1A] dark:text-[#F5F5F7] max-w-[480px] mb-14">
            {t("Cómo", "How we")} <span className="italic text-[#5C5C5C] dark:text-[#888899]">{t("pensamos.", "think.")}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {principles.map((p, i) => (
              <div key={p.title}>
                <div className="font-mono text-[11px] text-[#E85D04] dark:text-[#9D4EDD] tracking-[0.2em] mb-4">
                  {["i.", "ii.", "iii."][i]}
                </div>
                <h3 className="font-serif text-[24px] leading-[1.1] text-[#1A1A1A] dark:text-[#F5F5F7] mb-3">
                  {p.title}
                </h3>
                <p className="text-[13px] text-[#5C5C5C] dark:text-[#888899] leading-[1.65]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 px-6 md:px-10 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] bg-[#FBF8F3] dark:bg-[#0A0A0F]">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.12em] mb-10 flex items-center">
            <span className="text-[#E85D04] dark:text-[#9D4EDD]">¶</span>
            <span className="font-serif italic mx-2.5">ix.</span>
            <span className="text-[rgba(0,0,0,0.1)] dark:text-[rgba(255,255,255,0.06)]">—</span>
            <span className="mx-2.5">{t("proceso", "process")}</span>
          </div>
          
          <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-[#1A1A1A] dark:text-[#F5F5F7] max-w-[480px] mb-14">
            {t("Cómo", "How we")} <span className="italic text-[#5C5C5C] dark:text-[#888899]">{t("trabajamos.", "work.")}</span>
          </h2>

          <ol className="flex flex-col max-w-2xl">
            {howWeWork.map((step, i) => (
              <li 
                key={i} 
                className={`flex items-start gap-6 py-6 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] ${i === howWeWork.length - 1 ? 'border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-[rgba(255,255,255,0.06)]' : ''}`}
              >
                <span className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.12em] pt-1 shrink-0">
                  [ {String(i + 1).padStart(2, "0")} ]
                </span>
                <p className="text-[14px] text-[#5C5C5C] dark:text-[#888899] leading-[1.65]">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Link
              href="/contact"
              className="text-[12px] text-[#E85D04] dark:text-[#9D4EDD] tracking-[0.04em] border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] pb-0.5 hover:border-[#E85D04] dark:hover:border-[#9D4EDD] transition-colors"
            >
              {t("Iniciar proyecto", "Start a project")} &nbsp;&rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-16 px-6 md:px-10 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] bg-[#FBF8F3] dark:bg-[#0A0A0F]">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-[11px] text-[#5C5C5C] dark:text-[#888899] tracking-[0.12em] mb-10 flex items-center">
            <span className="text-[#E85D04] dark:text-[#9D4EDD]">¶</span>
            <span className="font-serif italic mx-2.5">x.</span>
            <span className="text-[rgba(0,0,0,0.1)] dark:text-[rgba(255,255,255,0.06)]">—</span>
            <span className="mx-2.5">{t("socio", "partner")}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
            <div>
              <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.02em] font-normal text-[#1A1A1A] dark:text-[#F5F5F7] max-w-[480px] mb-6">
                {t("Alcance extendido cuando el proyecto", "Extended reach when the project")} <span className="italic text-[#5C5C5C] dark:text-[#888899]">{t("lo necesita.", "calls for it.")}</span>
              </h2>
              <p className="text-[14px] text-[#5C5C5C] dark:text-[#888899] leading-[1.65] max-w-md mb-8">
                {t(
                  "Yeris trabaja en asociación cercana con ",
                  "Yeris works in close partnership with "
                )}
                <a
                  href="https://www.thewaveestudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A1A1A] dark:text-[#F5F5F7] hover:text-[#E85D04] dark:hover:text-[#9D4EDD] transition-colors underline underline-offset-4"
                >
                  The Wave Estudio
                </a>
                {t(
                  " — un estudio creativo que extiende nuestras capacidades en diseño, branding y producción visual. Cuando un proyecto necesita esa capa extra de craft, tenemos al equipo correcto ya en la sala.",
                  " — a creative studio that extends our capabilities in design, branding, and visual production. When a project needs that extra layer of craft, we have the right team already in the room."
                )}
              </p>
              <a
                href="https://www.thewaveestudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[#E85D04] dark:text-[#9D4EDD] tracking-[0.04em] border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] pb-0.5 hover:border-[#E85D04] dark:hover:border-[#9D4EDD] transition-colors"
              >
                {t("Visitar The Wave Estudio", "Visit The Wave Estudio")} &nbsp;&rarr;
              </a>
            </div>
            <div className="flex justify-center items-center bg-[#F5F0E8] dark:bg-[#14141C] rounded-2xl p-12 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)]">
              <Image
                src="/images/wave-estudio.webp"
                alt="The Wave Estudio"
                width={200}
                height={80}
                className="opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-10 border-t border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] bg-[#FBF8F3] dark:bg-[#0A0A0F]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-serif text-[clamp(36px,7vw,54px)] leading-none tracking-[-0.02em] font-normal text-[#1A1A1A] dark:text-[#F5F5F7] mb-5">
            {t("Listo para", "Ready to")} <span className="italic text-[#E85D04] dark:text-[#9D4EDD]">{t("construir?", "build?")}</span>
          </h2>
          <p className="font-serif text-[19px] italic text-[#5C5C5C] dark:text-[#888899] max-w-[400px] mx-auto leading-[1.4] mb-10">
            {t("Hablemos de tu proyecto.", "Let's talk about your project.")}
          </p>
          <Link
            href="/contact"
            className="cta-hover inline-block bg-[#E85D04] dark:bg-[#9D4EDD] px-8 py-4 rounded-full text-[14px] font-medium text-white"
          >
            {t("Iniciar proyecto", "Start a project")} &nbsp;&rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
