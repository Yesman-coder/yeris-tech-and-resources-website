interface LabViewProps {
  lang: 'en' | 'es'
  onCommand?: (cmd: string) => void
}

const LAB_EN = [
  {
    name: 'Yeris Runner',
    desc: 'A side-scrolling runner game that mirrors our product-building process. Dodge the bugs, ship the features. Built with HTML5 Canvas.',
    status: 'LIVE',
    action: { label: '→ Type /game to play', type: 'cmd' as const, value: '/game' },
  },
  {
    name: 'Project Estimator',
    desc: 'An interactive tool that gives you a rough scope and cost estimate based on your project type and budget.',
    status: 'LIVE',
    action: { label: '→ Open estimator ↗', type: 'link' as const, value: '/estimator' },
  },
  {
    name: 'AI Agents Playground',
    desc: 'Experimental multi-agent workflows we are testing for client use cases — triage bots, document parsers, data extraction pipelines.',
    status: 'WIP',
    action: null,
  },
  {
    name: 'Design System v2',
    desc: 'Our internal component library — terminal-native, built for speed. This terminal UI is a preview of it.',
    status: 'WIP',
    action: null,
  },
]

const LAB_ES = [
  {
    name: 'Yeris Runner',
    desc: 'Un juego runner de desplazamiento lateral que refleja nuestro proceso de construcción de producto. Esquiva los bugs, envía las features.',
    status: 'LIVE',
    action: { label: '→ Escribe /game para jugar', type: 'cmd' as const, value: '/game' },
  },
  {
    name: 'Estimador de Proyectos',
    desc: 'Una herramienta interactiva que da una estimación aproximada de alcance y costo según tu tipo de proyecto y presupuesto.',
    status: 'LIVE',
    action: { label: '→ Abrir estimador ↗', type: 'link' as const, value: '/estimator' },
  },
  {
    name: 'Playground de Agentes IA',
    desc: 'Flujos de trabajo multi-agente experimentales que estamos probando para casos de uso de clientes.',
    status: 'WIP',
    action: null,
  },
  {
    name: 'Sistema de Diseño v2',
    desc: 'Nuestra biblioteca de componentes interna — nativa de terminal, construida para velocidad. Este terminal es una preview.',
    status: 'WIP',
    action: null,
  },
]

export function LabView({ lang, onCommand }: LabViewProps) {
  const items = lang === 'en' ? LAB_EN : LAB_ES

  return (
    <div>
      <div className="t-section-title">
        {lang === 'en' ? 'THE LAB' : 'EL LAB'}
      </div>
      <div className="t-section-sub">
        {lang === 'en'
          ? '// experimental projects & tools we\'re building in public'
          : '// proyectos y herramientas experimentales que construimos en público'}
      </div>
      <hr className="t-divider" />

      {items.map((item, i) => (
        <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #0a1a0d' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '6px',
            }}
          >
            <span
              className="t-green"
              style={{ fontWeight: '700', fontSize: '14px', textShadow: '0 0 6px rgba(0,255,65,0.3)' }}
            >
              {item.name}
            </span>
            <span
              style={{
                fontSize: '9px',
                letterSpacing: '0.12em',
                padding: '1px 6px',
                border: `1px solid ${item.status === 'LIVE' ? '#00ff41' : '#1a1a1a'}`,
                color: item.status === 'LIVE' ? '#00ff41' : '#444',
              }}
            >
              {item.status}
            </span>
          </div>
          <p className="t-gray" style={{ fontSize: '12px', lineHeight: '1.65', marginBottom: '8px' }}>
            {item.desc}
          </p>
          {item.action && (
            item.action.type === 'cmd' ? (
              <button
                onClick={() => onCommand?.(item.action!.value)}
                className="t-green-dim"
                style={{
                  fontSize: '11px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                  padding: 0,
                }}
              >
                {item.action.label}
              </button>
            ) : (
              <a
                href={item.action.value}
                target="_blank"
                rel="noopener noreferrer"
                className="t-project-link"
                style={{ fontSize: '11px' }}
              >
                {item.action.label}
              </a>
            )
          )}
        </div>
      ))}
    </div>
  )
}
