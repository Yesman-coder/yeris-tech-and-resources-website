interface HelpViewProps {
  lang: 'en' | 'es'
  onCommand: (cmd: string) => void
}

const COMMANDS_EN = [
  { cmd: '/home',      desc: 'Return to the home screen' },
  { cmd: '/work',      desc: 'View our portfolio — 9 projects shipped' },
  { cmd: '/about',     desc: 'Who we are and what drives us' },
  { cmd: '/services',  desc: 'What we build for you' },
  { cmd: '/lab',       desc: 'Experimental projects & tools' },
  { cmd: '/contact',   desc: 'Open a project with us' },
  { cmd: '/estimator', desc: 'Get a rough cost estimate' },
  { cmd: '/game',      desc: 'Play Yeris Runner 🎮' },
  { cmd: '/lang',      desc: 'Toggle language (EN ↔ ES)' },
  { cmd: '/clear',     desc: 'Clear terminal history' },
  { cmd: '/help',      desc: 'Show this menu' },
]

const COMMANDS_ES = [
  { cmd: '/home',      desc: 'Volver a la pantalla de inicio' },
  { cmd: '/work',      desc: 'Ver portafolio — 9 proyectos enviados' },
  { cmd: '/about',     desc: 'Quiénes somos y qué nos mueve' },
  { cmd: '/services',  desc: 'Lo que construimos para ti' },
  { cmd: '/lab',       desc: 'Proyectos y herramientas experimentales' },
  { cmd: '/contact',   desc: 'Abrir un proyecto con nosotros' },
  { cmd: '/estimator', desc: 'Obtener una estimación de costo' },
  { cmd: '/game',      desc: 'Jugar Yeris Runner 🎮' },
  { cmd: '/lang',      desc: 'Cambiar idioma (EN ↔ ES)' },
  { cmd: '/clear',     desc: 'Limpiar historial del terminal' },
  { cmd: '/help',      desc: 'Mostrar este menú' },
]

export function HelpView({ lang, onCommand }: HelpViewProps) {
  const commands = lang === 'en' ? COMMANDS_EN : COMMANDS_ES

  return (
    <div>
      <div className="t-section-title">
        {lang === 'en' ? 'AVAILABLE COMMANDS' : 'COMANDOS DISPONIBLES'}
      </div>
      <div className="t-section-sub">
        {lang === 'en'
          ? '// Tab to autocomplete  ·  ↑↓ for command history  ·  click to run'
          : '// Tab para autocompletar  ·  ↑↓ para historial  ·  clic para ejecutar'}
      </div>
      <hr className="t-divider" />

      {commands.map(({ cmd, desc }) => (
        <div
          key={cmd}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '16px',
            padding: '7px 0',
            borderBottom: '1px solid #0a1a0d',
          }}
        >
          <button
            onClick={() => onCommand(cmd)}
            style={{
              color: '#00ff41',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: '700',
              minWidth: '110px',
              textAlign: 'left',
              padding: 0,
              textShadow: '0 0 6px rgba(0,255,65,0.3)',
              transition: 'text-shadow 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.textShadow =
                '0 0 14px rgba(0,255,65,0.9)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.textShadow =
                '0 0 6px rgba(0,255,65,0.3)'
            }}
          >
            {cmd}
          </button>
          <span className="t-gray" style={{ fontSize: '12px' }}>
            {desc}
          </span>
        </div>
      ))}

      <hr className="t-divider" />
      <div className="t-green-dim" style={{ fontSize: '11px', marginTop: '4px' }}>
        {lang === 'en'
          ? '// yeristech.com — hack product building with us'
          : '// yeristech.com — hackeá la construcción de producto con nosotros'}
      </div>
    </div>
  )
}
