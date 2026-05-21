import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lab — Notes from the Keyboard",
  description:
    "Sin gatekeeping. Escrito por nosotros, no por marketing. Technical insights from production.",
};

const posts = [
  {
    date: "nov 04 · 2025",
    tag: "infra",
    slug: "microservices-to-monolith",
    title: "Why we deleted half our",
    titleAccent: "microservices",
    titleEnd: "and slept better.",
    description: "Volver a un monolito modular redujo el infra bill en 60% y los incidents a la mitad.",
    readTime: "7 min",
  },
  {
    date: "oct 22 · 2025",
    tag: "process",
    slug: "4-hour-audit-rule",
    title: "La regla de las 4",
    titleAccent: "horas",
    titleEnd: ": cómo auditamos antes de cotizar.",
    description: "Cuatro horas pagadas que ahorran cuatro meses de proyecto torcido.",
    readTime: "5 min",
  },
  {
    date: "oct 09 · 2025",
    tag: "ai",
    slug: "agents-from-demos-to-infra",
    title: "Cuando los agentes dejan de ser",
    titleAccent: "demos",
    titleEnd: "y empiezan a ser infra.",
    description: "El gap entre prompt-eng en notebook y agentes con SLA en producción.",
    readTime: "9 min",
  },
  {
    date: "sep 28 · 2025",
    tag: "dx",
    slug: "monorepo-migration",
    title: "Migramos a",
    titleAccent: "monorepo",
    titleEnd: "— aquí está el playbook.",
    description: "Turborepo, shared configs, y el flujo de CI/CD que nos ahorra 20 minutos por PR.",
    readTime: "11 min",
  },
  {
    date: "sep 15 · 2025",
    tag: "design",
    slug: "design-system-tokens",
    title: "Design tokens que",
    titleAccent: "escalan",
    titleEnd: ": lecciones de 14 proyectos.",
    description: "El sistema de tokens que usamos en cada proyecto — y por qué nunca usamos Figma variables.",
    readTime: "6 min",
  },
  {
    date: "aug 30 · 2025",
    tag: "ai",
    slug: "rag-production-lessons",
    title: "RAG en producción:",
    titleAccent: "5 lecciones",
    titleEnd: "que no están en los tutoriales.",
    description: "Embeddings, chunking strategies, y el costo real de mantener un pipeline de retrieval.",
    readTime: "8 min",
  },
];

export default function LabPage() {
  return (
    <div className="bg-(--color-bg) min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-7 pt-24 pb-16">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] text-(--color-muted) tracking-[0.12em] mb-10 flex items-center">
          <span className="text-(--color-accent)">¶</span>
          <span className="font-serif italic mx-2.5">v.</span>
          <span className="text-(--color-border-strong)">—</span>
          <span className="mx-2.5">the lab</span>
          <span className="ml-auto text-(--color-muted-subtle)">notes from the keyboard</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
          <h1 className="font-serif text-[clamp(40px,8vw,60px)] leading-[0.99] tracking-[-0.02em] font-normal text-(--color-fg)">
            Lo que aprendemos<br/>
            <span className="italic text-(--color-italic)">en producción.</span>
          </h1>
          <p className="text-[14px] text-(--color-muted) max-w-[320px] leading-[1.6]">
            Sin gatekeeping. Escrito por nosotros, no por marketing. Technical insights que vienen de proyectos reales, no de tweets.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <article 
              key={post.slug}
              className="card-hover bg-(--color-bg-elev) border border-(--color-border-accent) rounded-[14px] p-6 cursor-pointer"
            >
              <div className="font-mono text-[10px] text-(--color-muted-subtle) tracking-[0.12em] mb-4 flex justify-between">
                <span>{post.date}</span>
                <span className="text-(--color-accent)">[{post.tag}]</span>
              </div>
              <h2 className="font-serif text-[21px] leading-[1.15] tracking-[-0.005em] font-normal text-(--color-fg) mb-3.5">
                {post.title} <span className="italic text-(--color-accent)">{post.titleAccent}</span> {post.titleEnd}
              </h2>
              <p className="text-[13px] leading-[1.6] text-(--color-muted) mb-5">
                {post.description}
              </p>
              <span className="font-mono text-[11px] text-(--color-italic)">
                Read · {post.readTime} &rarr;
              </span>
            </article>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-20 py-12 border-t border-(--color-border)">
          <div className="max-w-[480px]">
            <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-0.01em] font-normal text-(--color-fg) mb-3">
              Stay in the <span className="italic text-(--color-accent)">loop.</span>
            </h3>
            <p className="text-[14px] text-(--color-muted) leading-[1.6] mb-6">
              Un email al mes con lo que estamos aprendiendo. Sin spam, sin promociones.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-(--color-bg-elev) border border-(--color-border-strong) rounded-lg px-4 py-3 text-[14px] text-(--color-fg) placeholder:text-(--color-muted-subtle) focus:outline-none focus:border-(--color-accent)"
              />
              <button
                type="submit"
                className="cta-hover bg-(--color-accent-hover) px-6 py-3 rounded-lg text-[13px] font-medium text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
