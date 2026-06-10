import Link from 'next/link'

interface EstimatorViewProps {
  lang: 'en' | 'es'
}

const TIERS_EN = [
  {
    tier: 'STARTER',
    range: '$5k – $15k',
    desc: 'Landing pages, marketing sites, simple web presence',
    color: '#00ff41',
  },
  {
    tier: 'GROWTH',
    range: '$15k – $40k',
    desc: 'Web apps, API integrations, AI tools, complex UIs',
    color: '#c77dff',
  },
  {
    tier: 'SCALE',
    range: '$40k+',
    desc: 'Full product suites, custom platforms, enterprise builds',
    color: '#ffb000',
  },
]

const TIERS_ES = [
  {
    tier: 'STARTER',
    range: '$5k – $15k',
    desc: 'Landing pages, sitios de marketing, presencia web simple',
    color: '#00ff41',
  },
  {
    tier: 'GROWTH',
    range: '$15k – $40k',
    desc: 'Aplicaciones web, integraciones API, herramientas IA, UIs complejas',
    color: '#c77dff',
  },
  {
    tier: 'SCALE',
    range: '$40k+',
    desc: 'Suites de producto completas, plataformas custom, builds empresariales',
    color: '#ffb000',
  },
]

export function EstimatorView({ lang }: EstimatorViewProps) {
  const tiers = lang === 'en' ? TIERS_EN : TIERS_ES

  return (
    <div>
      <div className="t-section-title">
        {lang === 'en' ? 'PROJECT ESTIMATOR' : 'ESTIMADOR DE PROYECTO'}
      </div>
      <div className="t-section-sub">
        {lang === 'en'
          ? '// transparent scoping — no hidden costs'
          : '// alcance transparente — sin costos ocultos'}
      </div>
      <hr className="t-divider" />

      <div className="t-heading">
        {lang === 'en' ? 'how we price' : 'cómo cotizamos'}
      </div>

      <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
        {tiers.map(({ tier, range, desc, color }) => (
          <div
            key={tier}
            style={{
              padding: '14px',
              border: `1px solid ${color}20`,
              borderLeft: `3px solid ${color}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '5px',
              }}
            >
              <span
                style={{
                  color,
                  fontWeight: '700',
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                }}
              >
                {tier}
              </span>
              <span style={{ color, fontSize: '13px' }}>{range}</span>
            </div>
            <div className="t-gray" style={{ fontSize: '12px', lineHeight: '1.5' }}>
              {desc}
            </div>
          </div>
        ))}
      </div>

      <hr className="t-divider" />

      <p className="t-gray" style={{ fontSize: '12px', lineHeight: '1.75', marginBottom: '18px' }}>
        {lang === 'en'
          ? '// Every project is scoped individually. These are rough ranges — exact quotes require a conversation.'
          : '// Cada proyecto se define individualmente. Estos son rangos aproximados — las cotizaciones exactas requieren una conversación.'}
      </p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Link
          href="/estimator"
          target="_blank"
          rel="noopener noreferrer"
          className="t-btn t-btn-secondary"
          style={{
            textDecoration: 'none',
            fontSize: '11px',
            padding: '7px 14px',
          }}
        >
          {lang === 'en' ? '↗ OPEN FULL ESTIMATOR' : '↗ ABRIR ESTIMADOR COMPLETO'}
        </Link>
      </div>
    </div>
  )
}
