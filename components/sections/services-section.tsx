import Link from "next/link";

export function ServicesSection() {
  const services = [
    {
      num: "01",
      title: "Diagnóstico + ingeniería",
      titleAccent: "a la medida.",
      description: "Llegas con un problema borroso. Salimos contigo a producción con una solución concreta, probada, y mantenible.",
      tags: ["discovery", "architecture", "delivery", "handoff"],
    },
    {
      num: "02",
      title: "IA aplicada al",
      titleAccent: "trabajo real.",
      description: "No demos bonitos. Agentes, pipelines y copilotos que se meten a tu operación y empiezan a devolverte horas la primera semana.",
      tags: ["agents", "copilots", "retrieval", "evals"],
    },
    {
      num: "03",
      title: "Producto a medida,",
      titleAccent: "sin atajos.",
      description: "Cuando lo que necesitas no existe en SaaS, lo construimos con los estándares de quien lo va a mantener cinco años — no cinco meses.",
      tags: ["product", "platform", "infra", "ops"],
    },
  ];

  return (
    <section className="section">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="eyebrow">
          <span className="text-(--color-accent)">¶</span>
          <span className="font-serif italic mx-2.5">iii.</span>
          <span className="text-(--color-border-strong)">—</span>
          <span className="mx-2.5">services</span>
          <span className="ml-auto text-(--color-muted-subtle)">tres formas de empezar</span>
        </div>

        {/* Heading */}
        <h2 className="section-heading max-w-[480px] mb-6">
          Tres caminos<br/>
          <span className="italic-accent">para entrar.</span>
        </h2>

        {/* Services list */}
        <div className="flex flex-col">
          {services.map((svc, i) => (
            <div 
              key={svc.num}
              className={`row-hover grid grid-cols-1 md:grid-cols-[60px_1fr_110px] gap-6 items-start py-8 px-2 -mx-2 border-t border-(--color-border) ${i === services.length - 1 ? 'border-b' : ''}`}
            >
              <div className="font-mono text-[11px] text-(--color-muted-subtle) tracking-[0.12em] pt-1.5">
                [ {svc.num} ]
              </div>
              <div>
                <h3 className="font-serif text-[30px] leading-[1.05] tracking-[-0.015em] font-normal text-(--color-fg) mb-3.5">
                  {svc.title} <span className="italic text-(--color-italic)">{svc.titleAccent}</span>
                </h3>
                <p className="text-[14px] leading-[1.65] text-(--color-muted) mb-4 max-w-[480px]">
                  {svc.description}
                </p>
                <div className="font-mono text-[10px] text-(--color-muted-subtle) tracking-[0.12em] flex gap-3.5 flex-wrap">
                  {svc.tags.map((tag, j) => (
                    <span key={tag} className="flex items-center gap-3.5">
                      <span>{tag}</span>
                      {j < svc.tags.length - 1 && <span className="text-(--color-border-strong)">·</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right pt-2 hidden md:block">
                <Link href="/services" className="link-hover text-[12px] text-(--color-italic) border-b border-(--color-border-strong) pb-0.5">
                  Read more &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
