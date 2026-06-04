'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { BootView } from './views/boot-view'
import { HelpView } from './views/help-view'
import { GameView } from './views/game-view'
import { PageFrame } from './views/page-frame'
import { OnboardingOverlay } from './onboarding-overlay'

type View =
  | 'boot'
  | 'help'
  | 'work'
  | 'about'
  | 'services'
  | 'lab'
  | 'contact'
  | 'game'
  | 'estimator'

type Lang = 'en' | 'es'

interface HistoryEntry {
  id: number
  input: string
  response: string
  isError?: boolean
}

// Views that render a real page in an iframe (full-bleed, no padding)
const PAGE_VIEWS: View[] = ['work', 'about', 'services', 'lab', 'contact', 'estimator']

// Map view → existing Next.js route
const VIEW_TO_PATH: Partial<Record<View, string>> = {
  work:      '/work',
  about:     '/about',
  services:  '/services',
  lab:       '/lab',
  contact:   '/contact',
  estimator: '/estimator',
}

const CMD_LIST = [
  '/home', '/work', '/about', '/services', '/lab', '/contact',
  '/game', '/estimator', '/help', '/lang', '/lang en',
  '/lang es', '/clear',
]

const CMD_TO_VIEW: Record<string, View> = {
  '/home':         'boot',
  '/work':         'work',
  '/about':        'about',
  '/services':     'services',
  '/lab':          'lab',
  '/contact':      'contact',
  '/start-project':'contact',
  '/hire':         'contact',
  '/game':         'game',
  '/estimator':    'estimator',
  '/help':         'help',
}

function langResponse(newLang: Lang) {
  return newLang === 'en'
    ? '// switched to English — all pages will reload in EN'
    : '// cambiando a español — las páginas se recargan en ES'
}

export function Terminal() {
  const [input, setInput]           = useState('')
  const [history, setHistory]       = useState<HistoryEntry[]>([])
  const [activeView, setActiveView] = useState<View>('boot')
  const [lang, setLang]             = useState<Lang>('en')
  const [counter, setCounter]       = useState(0)
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const inputRef      = useRef<HTMLInputElement>(null)
  const historyEndRef = useRef<HTMLDivElement>(null)

  // Show onboarding scrim only on first visit
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('yeristech-visited')) {
      setShowOnboarding(true)
    }
  }, [])

  const dismissOnboarding = useCallback(() => {
    setShowOnboarding(false)
    localStorage.setItem('yeristech-visited', '1')
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const processCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase()
      if (!cmd) return

      const id = counter
      setCounter(c => c + 1)
      setCmdHistory(h => [raw.trim(), ...h].slice(0, 50))
      setCmdHistoryIdx(-1)

      // /clear
      if (cmd === '/clear') {
        setHistory([])
        return
      }

      // /lang [en|es] — toggle or explicit
      if (cmd === '/lang' || cmd === '/language' ||
          cmd === '/lang en' || cmd === '/lang es' ||
          cmd === '/language en' || cmd === '/language es') {
        let newLang: Lang
        if (cmd.endsWith(' en')) {
          newLang = 'en'
        } else if (cmd.endsWith(' es')) {
          newLang = 'es'
        } else {
          newLang = lang === 'en' ? 'es' : 'en'
        }
        setLang(newLang)
        setHistory(h => [...h, { id, input: raw.trim(), response: langResponse(newLang) }])
        return
      }

      const view = CMD_TO_VIEW[cmd]
      if (view) {
        setActiveView(view)
        const responses: Record<string, Record<Lang, string>> = {
          '/home':         { en: '// returning home...',                       es: '// volviendo al inicio...' },
          '/work':         { en: '// loading portfolio...',                   es: '// cargando portafolio...' },
          '/about':        { en: '// fetching team data...',                   es: '// obteniendo datos del equipo...' },
          '/services':     { en: '// listing capabilities...',                 es: '// listando capacidades...' },
          '/lab':          { en: '// accessing experimental projects...',       es: '// accediendo proyectos experimentales...' },
          '/contact':      { en: '// opening communication channel...',         es: '// abriendo canal de comunicación...' },
          '/start-project':{ en: '// opening communication channel...',         es: '// abriendo canal de comunicación...' },
          '/hire':         { en: '// opening communication channel...',         es: '// abriendo canal de comunicación...' },
          '/game':         { en: '// launching Yeris Runner...',                es: '// iniciando Yeris Runner...' },
          '/estimator':    { en: '// loading cost estimator...',                es: '// cargando estimador de costos...' },
          '/help':         { en: '// listing available commands...',             es: '// listando comandos disponibles...' },
        }
        const response = responses[cmd]?.[lang] ?? '// loading...'
        setHistory(h => [...h, { id, input: raw.trim(), response }])
      } else {
        const errMsg = lang === 'en'
          ? `// command not found: "${cmd}" — type /help`
          : `// comando no encontrado: "${cmd}" — escribe /help`
        setHistory(h => [...h, { id, input: raw.trim(), response: errMsg, isError: true }])
      }
    },
    [counter, lang],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processCommand(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const matches = CMD_LIST.filter(c => c.startsWith(input.toLowerCase()))
      if (matches.length >= 1 && input.length > 0) setInput(matches[0])
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1)
      setCmdHistoryIdx(next)
      if (cmdHistory[next]) setInput(cmdHistory[next])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(cmdHistoryIdx - 1, -1)
      setCmdHistoryIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next] ?? '')
      return
    }
  }

  const focus = () => inputRef.current?.focus()
  const isPage = PAGE_VIEWS.includes(activeView)

  return (
    <div className="terminal-root" onClick={focus}>
      {showOnboarding && (
        <OnboardingOverlay lang={lang} onDismiss={dismissOnboarding} />
      )}
      {/* ── Top bar ─────────────────────────────── */}
      <div className="terminal-topbar">
        <span className="terminal-logo">
          yeris
          <span className="terminal-logo-dim">[tech+resources]</span>
          <span className="terminal-cursor">_</span>
        </span>
        <span className="terminal-topbar-sep">·</span>
        <span className="terminal-location">Miami / LATAM</span>
        <span
          className="terminal-lang-indicator"
          title={lang === 'en' ? 'type /lang es to switch' : 'escribe /lang en para cambiar'}
        >
          {lang.toUpperCase()}
        </span>
      </div>

      {/* ── Panels ──────────────────────────────── */}
      <div className="terminal-panels">
        {/* Left: command history + input */}
        <div
          className="terminal-left"
          onClick={e => { e.stopPropagation(); focus() }}
        >
          <div className="terminal-panel-header">terminal</div>

          <div className="terminal-history">
            <div className="terminal-commands-hint">
              <div className="terminal-cmd-hint-label">
                {lang === 'en' ? 'available commands' : 'comandos disponibles'}
              </div>
              {['/work', '/about', '/services', '/lab', '/contact', '/game', '/estimator', '/help', '/lang en', '/lang es', '/home', '/clear'].map(cmd => (
                <button
                  key={cmd}
                  className="terminal-cmd-chip"
                  onClick={e => { e.stopPropagation(); processCommand(cmd) }}
                >
                  {cmd}
                </button>
              ))}
            </div>

            {history.map(entry => (
              <div key={entry.id} className="terminal-entry">
                <div className="terminal-entry-input">
                  <span className="terminal-prompt">❯</span>
                  <span className="terminal-entry-cmd">{entry.input}</span>
                </div>
                <div className={`terminal-entry-response${entry.isError ? ' terminal-error' : ''}`}>
                  {entry.response}
                </div>
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className={`terminal-input-row${showOnboarding ? ' terminal-input-spotlight' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <span className="terminal-prompt">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              placeholder={lang === 'en' ? 'type a command...' : 'escribe un comando...'}
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
            <button type="submit" className="terminal-submit-btn">→</button>
          </form>
        </div>

        {/* Right: rendered output */}
        <div className="terminal-right">
          <div className="terminal-panel-header">
            {activeView === 'boot'
              ? (lang === 'en' ? 'system · ready' : 'sistema · listo')
              : `/${activeView}`}
          </div>

          {/* flush (no padding) for full-page iframes, padded for terminal views */}
          <div className={`terminal-output${isPage ? ' terminal-output-page' : ''}`}>

            {/* ── Terminal-native views ── */}
            {activeView === 'boot' && (
              <BootView lang={lang} onCommand={processCommand} />
            )}
            {activeView === 'help' && (
              <HelpView lang={lang} onCommand={processCommand} />
            )}
            {activeView === 'game' && <GameView />}

            {/* ── Real pages rendered in iframes ── */}
            {isPage && activeView in VIEW_TO_PATH && (
              <PageFrame
                path={VIEW_TO_PATH[activeView]!}
                lang={lang}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
