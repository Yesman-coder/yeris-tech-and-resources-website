export function MethodSection() {
  const steps = [
    {
      num: "i.",
      title: "Diagnose",
      subtitle: "diagnosticamos",
      description: "Antes de tocar el teclado, mapeamos el problema real — no el que te pediste, el que tienes. Esa diferencia paga el proyecto.",
    },
    {
      num: "ii.",
      title: "Architect",
      subtitle: "arquitectamos",
      description: "Elegimos stacks como otros eligen barrios — para los próximos diez años. Sin moda, sin hype, sólo decisiones que envejecen bien.",
    },
    {
      num: "iii.",
      title: "Ship",
      subtitle: "enviamos",
      description: "Producción no es el final, es el principio. Enviamos en semanas, no en cuatrimestres, y nos quedamos en línea hasta que la métrica se mueva.",
    },
  ];

  return (
    <section className="section">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <div className="eyebrow">
          <span className="text-(--color-accent)">¶</span>
          <span className="font-serif italic mx-2.5">ii.</span>
          <span className="text-(--color-border-strong)">—</span>
          <span className="mx-2.5">the method</span>
          <span className="ml-auto text-(--color-muted-subtle)">three movements, one rhythm</span>
        </div>

        {/* Heading */}
        <h2 className="section-heading max-w-[540px] mb-14">
          Cómo trabajamos<br/>
          <span className="italic-accent">cuando trabajamos.</span>
        </h2>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
          {steps.map((step) => (
            <div key={step.num}>
              <div className="font-mono text-[11px] text-(--color-accent) tracking-[0.2em] mb-5">
                {step.num}
              </div>
              <h3 className="font-serif text-[30px] leading-none tracking-[-0.015em] font-normal text-(--color-fg) mb-1">
                {step.title}
              </h3>
              <p className="font-serif italic text-[14px] leading-none text-(--color-italic) mb-5">
                {step.subtitle}
              </p>
              <p className="text-[13px] leading-[1.65] text-(--color-muted)">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
