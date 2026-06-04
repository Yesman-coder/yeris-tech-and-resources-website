'use client'
import { useEffect } from 'react'

interface OnboardingOverlayProps {
  lang: 'en' | 'es'
  onDismiss: () => void
}

const COMMANDS = {
  en: [
    { cmd: '/work',      desc: 'see our projects' },
    { cmd: '/about',     desc: 'meet the team' },
    { cmd: '/services',  desc: 'what we build' },
    { cmd: '/contact',   desc: 'start a project' },
    { cmd: '/game',      desc: 'play Yeris Runner' },
    { cmd: '/lang es',   desc: 'cambiar a español' },
  ],
  es: [
    { cmd: '/work',      desc: 'ver nuestros proyectos' },
    { cmd: '/about',     desc: 'conoce al equipo' },
    { cmd: '/services',  desc: 'qué construimos' },
    { cmd: '/contact',   desc: 'iniciar un proyecto' },
    { cmd: '/game',      desc: 'jugar Yeris Runner' },
    { cmd: '/lang en',   desc: 'switch to english' },
  ],
}

export function OnboardingOverlay({ lang, onDismiss }: OnboardingOverlayProps) {
  useEffect(() => {
    // Grace period — ignore keypresses for the first 600ms so page-load
    // events (console Enter, autofocus, etc.) don't instantly dismiss
    let keyEnabled = false
    const grace = setTimeout(() => { keyEnabled = true }, 600)

    const onKey = () => { if (keyEnabled) onDismiss() }
    window.addEventListener('keydown', onKey)
    const timer = setTimeout(onDismiss, 20000)

    return () => {
      clearTimeout(grace)
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [onDismiss])

  const cmds = COMMANDS[lang]

  return (
    <>
      <div className="onboarding-scrim" onClick={onDismiss} />

      {/* Centered command menu */}
      <div className="onboarding-menu" aria-hidden="true">
        <div className="onboarding-menu-eyebrow">
          {lang === 'en' ? 'yeristech os — navigate with commands' : 'yeristech os — navega con comandos'}
        </div>

        <div className="onboarding-menu-grid">
          {cmds.map(({ cmd, desc }, i) => (
            <div
              key={cmd}
              className="onboarding-menu-item"
              style={{ animationDelay: `${i * 0.18 + 0.4}s` }}
            >
              <span className="onboarding-menu-cmd">{cmd}</span>
              <span className="onboarding-menu-sep">──</span>
              <span className="onboarding-menu-desc">{desc}</span>
            </div>
          ))}
        </div>

        <div className="onboarding-menu-hint">
          {lang === 'en'
            ? 'type any command below  ·  or press any key to continue'
            : 'escribe cualquier comando  ·  o presiona una tecla para continuar'}
        </div>
      </div>

      {/* Coach mark above input */}
      <div className="onboarding-coach" aria-hidden="true">
        <div className="onboarding-coach-text">
          {lang === 'en' ? 'type a command to begin' : 'escribe un comando para comenzar'}
        </div>
        <div className="onboarding-coach-arrow">↓</div>
      </div>
    </>
  )
}
