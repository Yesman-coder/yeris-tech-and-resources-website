interface ServicesViewProps {
  lang: 'en' | 'es'
}

const SERVICES_EN = [
  {
    name: 'Web Design & Development',
    desc: "Pixel-perfect sites and web apps. From marketing pages to full-stack products that ship.",
    tags: ['Next.js', 'React', 'Tailwind', 'TypeScript', 'Vercel'],
  },
  {
    name: 'AI Agents & Automation',
    desc: "Production AI that handles the work humans don't want to. Triage, follow-up, back-office ops.",
    tags: ['Vercel AI SDK', 'OpenAI', 'LangChain', 'Zapier', 'n8n'],
  },
  {
    name: 'E-commerce & Conversion',
    desc: 'Headless storefronts and checkout flows tuned for first-time mobile buyers.',
    tags: ['Shopify', 'Next.js', 'Stripe', 'Analytics'],
  },
  {
    name: 'Product Strategy',
    desc: 'Scope definition, stack selection, and roadmap — before a single line of code is written.',
    tags: ['Discovery', 'Wireframing', 'Architecture', 'Roadmapping'],
  },
  {
    name: 'Brand & Visual Identity',
    desc: 'Identity systems that grow with the product. Logos, color, type, design tokens.',
    tags: ['Logo', 'Color system', 'Typography', 'Design tokens'],
  },
]

const SERVICES_ES = [
  {
    name: 'Diseño y Desarrollo Web',
    desc: 'Sitios y aplicaciones web pixel-perfect. Desde páginas de marketing hasta productos full-stack.',
    tags: ['Next.js', 'React', 'Tailwind', 'TypeScript', 'Vercel'],
  },
  {
    name: 'Agentes IA y Automatización',
    desc: 'IA de producción que maneja el trabajo que los humanos no quieren. Triaje, seguimiento, back-office.',
    tags: ['Vercel AI SDK', 'OpenAI', 'LangChain', 'Zapier', 'n8n'],
  },
  {
    name: 'E-commerce y Conversión',
    desc: 'Tiendas headless y flujos de pago optimizados para compradores móviles de primera vez.',
    tags: ['Shopify', 'Next.js', 'Stripe', 'Analytics'],
  },
  {
    name: 'Estrategia de Producto',
    desc: 'Definición de alcance, selección de stack y hoja de ruta — antes de escribir una sola línea.',
    tags: ['Discovery', 'Wireframing', 'Arquitectura', 'Roadmapping'],
  },
  {
    name: 'Marca e Identidad Visual',
    desc: 'Sistemas de identidad que crecen con el producto. Logos, color, tipografía, tokens de diseño.',
    tags: ['Logo', 'Sistema de color', 'Tipografía', 'Design tokens'],
  },
]

export function ServicesView({ lang }: ServicesViewProps) {
  const services = lang === 'en' ? SERVICES_EN : SERVICES_ES

  return (
    <div>
      <div className="t-section-title">
        {lang === 'en' ? 'WHAT WE BUILD' : 'LO QUE CONSTRUIMOS'}
      </div>
      <div className="t-section-sub">
        {lang === 'en'
          ? '// full-spectrum product engineering — Miami / LATAM'
          : '// ingeniería de producto de espectro completo — Miami / LATAM'}
      </div>
      <hr className="t-divider" />

      {services.map((service, i) => (
        <div key={i} className="t-service-item">
          <div className="t-service-name">{service.name}</div>
          <div className="t-service-desc">{service.desc}</div>
          <div className="t-tags">
            {service.tags.map(tag => (
              <span key={tag} className="t-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      <hr className="t-divider" />
      <div className="t-green-dim" style={{ fontSize: '11px' }}>
        {lang === 'en'
          ? '// not sure what you need? type /contact and tell us what you\'re building'
          : '// ¿no sabes qué necesitas? escribe /contact y cuéntanos qué estás construyendo'}
      </div>
    </div>
  )
}
