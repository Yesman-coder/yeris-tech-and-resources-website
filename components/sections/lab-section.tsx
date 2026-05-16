import Link from "next/link";

export function LabSection() {
  const posts = [
    {
      date: "nov 04 · 2025",
      tag: "infra",
      title: "Why we deleted half our",
      titleAccent: "microservices",
      titleEnd: "and slept better.",
      description: "Volver a un monolito modular redujo el infra bill en 60% y los incidents a la mitad.",
      readTime: "7 min",
    },
    {
      date: "oct 22 · 2025",
      tag: "process",
      title: "La regla de las 4",
      titleAccent: "horas",
      titleEnd: ": cómo auditamos antes de cotizar.",
      description: "Cuatro horas pagadas que ahorran cuatro meses de proyecto torcido.",
      readTime: "5 min",
    },
    {
      date: "oct 09 · 2025",
      tag: "ai",
      title: "Cuando los agentes dejan de ser",
      titleAccent: "demos",
      titleEnd: "y empiezan a ser infra.",
      description: "El gap entre prompt-eng en notebook y agentes con SLA en producción.",
      readTime: "9 min",
    },
  ];

  return (
    <section className="section">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="eyebrow">
          <span className="text-(--color-accent)">¶</span>
          <span className="font-serif italic mx-2.5">v.</span>
          <span className="text-(--color-border-strong)">—</span>
          <span className="mx-2.5">the lab</span>
          <span className="ml-auto text-(--color-muted-subtle)">notes from the keyboard</span>
        </div>

        {/* Header with description */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <h2 className="section-heading max-w-[380px] mb-0">
            Lo que aprendemos<br/>
            <span className="italic-accent">en producción.</span>
          </h2>
          <p className="text-[13px] text-(--color-muted) max-w-[280px] leading-[1.6] mb-1.5">
            Sin gatekeeping. Escrito por nosotros, no por marketing.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <article 
              key={i}
              className="card-hover bg-(--color-bg-elev) border border-(--color-border-accent) rounded-[14px] p-5 cursor-pointer"
            >
              <div className="font-mono text-[10px] text-(--color-muted-subtle) tracking-[0.12em] mb-4 flex justify-between">
                <span>{post.date}</span>
                <span className="text-(--color-accent)">[{post.tag}]</span>
              </div>
              <h3 className="font-serif text-[21px] leading-[1.15] tracking-[-0.005em] font-normal text-(--color-fg) mb-3.5">
                {post.title} <span className="italic text-(--color-accent)">{post.titleAccent}</span> {post.titleEnd}
              </h3>
              <p className="text-[12px] leading-[1.6] text-(--color-muted) mb-5">
                {post.description}
              </p>
              <span className="font-mono text-[11px] text-(--color-italic)">
                Read · {post.readTime} &rarr;
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
