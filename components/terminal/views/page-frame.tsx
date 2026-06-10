interface PageFrameProps {
  path: string
  lang: 'en' | 'es'
  mode: 'dark' | 'light'
}

export function PageFrame({ path, lang, mode }: PageFrameProps) {
  return (
    <iframe
      key={`${path}?lang=${lang}&mode=${mode}`}
      src={`${path}?lang=${lang}&mode=${mode}`}
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
