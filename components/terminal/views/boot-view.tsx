'use client'
import { useState, useEffect } from 'react'

const BOOT_EN = [
  '> YERISTECH OS v2.0.0',
  '> Initializing...',
  '> Loading modules........................ [OK]',
  '> Hacking product building.............. [OK]',
  '> Making programming easy for you....... [OK]',
  '> Connecting Miami / LATAM node......... [OK]',
  '',
  '> System ready.',
  '',
  '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  '',
  '  Hack product building with us.',
  '  We make programming easy for you.',
  '  9 projects shipped. Counting.',
  '',
  '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  '',
  '  Type /help to see available commands.',
  '  Tab to autocomplete  ·  ↑↓ for history.',
]

const BOOT_ES = [
  '> YERISTECH OS v2.0.0',
  '> Inicializando...',
  '> Cargando módulos........................ [OK]',
  '> Hackeando la construcción de producto... [OK]',
  '> Haciendo la programación fácil.......... [OK]',
  '> Conectando nodo Miami / LATAM........... [OK]',
  '',
  '> Sistema listo.',
  '',
  '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  '',
  '  Hackeá la construcción de producto con nosotros.',
  '  Hacemos la programación fácil para ti.',
  '  9 proyectos enviados. Contando.',
  '',
  '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  '',
  '  Escribe /help para ver los comandos disponibles.',
  '  Tab para autocompletar  ·  ↑↓ para historial.',
]

interface BootViewProps {
  lang: 'en' | 'es'
  onCommand: (cmd: string) => void
}

export function BootView({ lang, onCommand }: BootViewProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const lines = lang === 'en' ? BOOT_EN : BOOT_ES

  useEffect(() => {
    setVisibleLines(0)
    const timers = lines.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), i * 90 + 40)
    )
    return () => timers.forEach(clearTimeout)
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  const done = visibleLines >= lines.length

  return (
    <div>
      {lines.slice(0, visibleLines).map((line, i) => {
        const isOk = line.includes('[OK]')
        const isDivider = line.startsWith('━')
        const isEmpty = line === ''
        const isHighlight =
          line.startsWith('  Hack') ||
          line.startsWith('  We make') ||
          line.startsWith('  Hackeá') ||
          line.startsWith('  Hacemos') ||
          line.startsWith('  9 ')
        const isReady = line.includes('ready') || line.includes('listo')

        if (isEmpty) return <div key={i} style={{ height: '8px' }} />

        return (
          <div
            key={i}
            className="t-boot-line"
            style={{
              color: isDivider
                ? '#0d2a14'
                : isHighlight
                ? '#f0f0f0'
                : isReady
                ? '#00ff41'
                : isOk
                ? undefined
                : '#006b1a',
              fontSize: isDivider ? '10px' : undefined,
            }}
          >
            {isOk ? (
              <>
                <span style={{ color: '#006b1a' }}>{line.replace('[OK]', '')}</span>
                <span className="t-green">[OK]</span>
              </>
            ) : (
              line
            )}
          </div>
        )
      })}

      {done && (
        <div style={{ marginTop: '28px' }}>
          {/* Primary CTA */}
          <button
            onClick={() => onCommand('/contact')}
            className="t-btn"
            style={{ marginBottom: '20px', fontSize: '12px', letterSpacing: '0.12em' }}
          >
            {lang === 'en' ? '▶  /start-project' : '▶  /iniciar-proyecto'}
          </button>

          {/* Secondary nudge */}
          <div style={{ fontSize: '11px', color: '#004d13', marginBottom: '20px' }}>
            {lang === 'en'
              ? "── or type /work to see what we've built"
              : '── o escribe /work para ver lo que hemos construido'}
          </div>

          {/* Quick access row */}
          <div className="t-heading">
            {lang === 'en' ? 'explore' : 'explorar'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['/work', '/about', '/services', '/game', '/contact', '/help'].map(cmd => (
              <button
                key={cmd}
                onClick={() => onCommand(cmd)}
                className="t-btn t-btn-secondary"
                style={{ padding: '5px 12px', fontSize: '11px' }}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
