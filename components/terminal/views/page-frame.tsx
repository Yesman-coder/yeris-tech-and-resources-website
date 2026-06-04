interface PageFrameProps {
  path: string
  lang: 'en' | 'es'
}

/**
 * Renders an existing Next.js page inside the terminal's right panel.
 * Language is passed via ?lang= URL param so LanguageProvider picks it up.
 * Changing lang remounts the iframe (via key) so the page re-initialises.
 * Uses flex: 1 so it fills the parent terminal-output-page column.
 */
export function PageFrame({ path, lang }: PageFrameProps) {
  return (
    <iframe
      key={`${path}?lang=${lang}`}
      src={`${path}?lang=${lang}`}
      style={{
        flex: 1,
        width: '100%',
        minHeight: 0,
        border: 'none',
        display: 'block',
        background: '#0A0A0F',
      }}
      title={path}
    />
  )
}
