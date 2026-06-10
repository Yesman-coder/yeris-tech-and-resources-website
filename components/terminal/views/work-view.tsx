import Link from 'next/link'
import { projects } from '@/lib/projects'

interface WorkViewProps {
  lang: 'en' | 'es'
}

export function WorkView({ lang }: WorkViewProps) {
  return (
    <div>
      <div className="t-section-title">
        {lang === 'en' ? 'PORTFOLIO' : 'PORTAFOLIO'}
      </div>
      <div className="t-section-sub">
        {lang === 'en'
          ? `// ${projects.length} projects shipped — stacks built to last a decade`
          : `// ${projects.length} proyectos enviados — stacks construidos para durar una década`}
      </div>
      <hr className="t-divider" />

      {projects.map((project, i) => (
        <div key={project.slug} className="t-project-row">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '3px',
            }}
          >
            <span className="t-project-num">
              [{String(i + 1).padStart(2, '0')}]
            </span>
            <Link
              href={`/work/${project.slug}`}
              className="t-project-title"
              style={{ textDecoration: 'none' }}
              onClick={e => e.stopPropagation()}
            >
              {project.title}
            </Link>
            {project.featured && (
              <span
                style={{
                  fontSize: '9px',
                  color: '#c77dff',
                  border: '1px solid #2a1040',
                  padding: '0px 5px',
                  letterSpacing: '0.1em',
                }}
              >
                FEATURED
              </span>
            )}
          </div>

          <div className="t-project-tagline">{project.tagline}</div>

          <div className="t-project-meta">
            <span className="t-project-industry">{project.industry}</span>
            <span className="t-project-year">{project.year}</span>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="t-project-link"
                onClick={e => e.stopPropagation()}
              >
                ↗ {project.liveUrl.replace('https://', '')}
              </a>
            ) : (
              <span className="t-gray" style={{ fontSize: '11px' }}>
                // case study on request
              </span>
            )}
          </div>
        </div>
      ))}

      <hr className="t-divider" />
      <div className="t-green-dim" style={{ fontSize: '11px' }}>
        {lang === 'en'
          ? '// click any project title for full case study'
          : '// clic en cualquier título para ver el caso de estudio completo'}
      </div>
    </div>
  )
}
