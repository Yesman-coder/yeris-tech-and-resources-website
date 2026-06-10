interface AboutViewProps {
  lang: 'en' | 'es'
}

const METHODOLOGY_EN = [
  ['01 · DIAGNOSE',   'We map the real problem, not the one you ordered.'],
  ['02 · ARCHITECT',  'Stacks chosen for the next ten years — no hype, no trends.'],
  ['03 · SHIP',       'We ship in weeks, not quarters. Then we stay online.'],
]

const METHODOLOGY_ES = [
  ['01 · DIAGNOSTICAR', 'Mapeamos el problema real, no el que pediste.'],
  ['02 · ARQUITECTAR',  'Stacks elegidos para los próximos diez años — sin hype.'],
  ['03 · ENVIAR',       'Enviamos en semanas, no trimestres. Luego seguimos en línea.'],
]

export function AboutView({ lang }: AboutViewProps) {
  const methodology = lang === 'en' ? METHODOLOGY_EN : METHODOLOGY_ES

  return (
    <div style={{ maxWidth: '640px' }}>
      <div className="t-section-title">
        {lang === 'en' ? 'ABOUT US' : 'SOBRE NOSOTROS'}
      </div>
      <div className="t-section-sub">
        {lang === 'en'
          ? '// who we are and what drives us'
          : '// quiénes somos y qué nos mueve'}
      </div>
      <hr className="t-divider" />

      {/* Mission */}
      <div style={{ marginBottom: '24px' }}>
        <div className="t-heading">
          {lang === 'en' ? 'mission' : 'misión'}
        </div>
        <p
          className="t-white"
          style={{ fontSize: '17px', lineHeight: '1.65', marginBottom: '10px', fontWeight: '600' }}
        >
          {lang === 'en'
            ? 'We make programming easy for you.'
            : 'Hacemos la programación fácil para ti.'}
        </p>
        <p className="t-gray" style={{ fontSize: '13px', lineHeight: '1.75' }}>
          {lang === 'en'
            ? 'Yeris Tech & Resources is a product studio that transforms complex ideas into software that works. We diagnose the real problem, architect the right solution, and ship in weeks — not quarters.'
            : 'Yeris Tech & Resources es un estudio de producto que transforma ideas complejas en software que funciona. Diagnosticamos el problema real, arquitectamos la solución correcta y enviamos en semanas, no trimestres.'}
        </p>
      </div>

      <hr className="t-divider" />

      {/* Team */}
      <div style={{ marginBottom: '24px' }}>
        <div className="t-heading">
          {lang === 'en' ? 'the team' : 'el equipo'}
        </div>
        <div style={{ display: 'grid', gap: '10px' }}>
          {[
            {
              name: 'Yesman Utrera',
              role: lang === 'en' ? 'Co-Founder · Strategy & Design' : 'Co-Fundador · Estrategia y Diseño',
              bio: lang === 'en'
                ? 'Product vision, experience design, and business strategy.'
                : 'Visión de producto, diseño de experiencia y estrategia de negocio.',
            },
            {
              name: 'Boris Bruno',
              role: lang === 'en' ? 'Tech Co-Founder · Engineering' : 'Co-Fundador Técnico · Ingeniería',
              bio: lang === 'en'
                ? 'Technical architecture, software engineering, and AI implementation.'
                : 'Arquitectura técnica, ingeniería de software e implementación de IA.',
            },
          ].map(person => (
            <div
              key={person.name}
              style={{ padding: '12px', border: '1px solid #0d2a14' }}
            >
              <div className="t-green" style={{ fontWeight: '700', marginBottom: '2px', fontSize: '14px' }}>
                {person.name}
              </div>
              <div className="t-purple" style={{ fontSize: '11px', marginBottom: '6px' }}>
                {person.role}
              </div>
              <div className="t-gray" style={{ fontSize: '12px' }}>
                {person.bio}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="t-divider" />

      {/* Methodology */}
      <div>
        <div className="t-heading">
          {lang === 'en' ? 'how we work' : 'cómo trabajamos'}
        </div>
        {methodology.map(([title, desc]) => (
          <div
            key={title}
            style={{ padding: '10px 0', borderBottom: '1px solid #0a1a0d' }}
          >
            <div className="t-green" style={{ fontSize: '12px', fontWeight: '700', marginBottom: '3px' }}>
              {title}
            </div>
            <div className="t-gray" style={{ fontSize: '12px', lineHeight: '1.6' }}>
              {desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
