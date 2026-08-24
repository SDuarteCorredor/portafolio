import { Link } from 'react-router-dom'
import { pagesByPath } from '../../content/index.js'

// Punto 17 — interlinkeado contextual dentro del cuerpo.
//
// Los archivos de contenido escriben las rutas internas en texto plano
// (".../servicios/google-ads/"). Acá se convierten en enlaces reales solo si la
// ruta existe en el registro: así es imposible publicar un enlace roto, y quien
// redacta no necesita escribir JSX.
//
// Si la ruta viene precedida de dos puntos y un espacio ("Google Ads: /servicios/
// google-ads/"), se toma la etiqueta anterior como texto del enlace y se elimina
// la ruta cruda, que en pantalla no aporta nada.

const ROUTE_RE = /(\/(?:servicios|trabajo|perfil|contacto)\/(?:[a-z-]+\/)?)/g

function labelFor(path) {
  return pagesByPath.get(path)?.navLabel || path
}

export function Linkify({ children }) {
  if (typeof children !== 'string') return children

  const text = children
  const parts = text.split(ROUTE_RE)
  if (parts.length === 1) return text

  const out = []

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue

    const page = pagesByPath.get(part)
    if (!page) {
      out.push(<span key={i}>{part}</span>)
      continue
    }

    // Se limpia el separador que quedó justo antes de la ruta ("… Ads: ").
    const prev = out[out.length - 1]
    if (prev && typeof prev.props?.children === 'string') {
      const trimmed = prev.props.children.replace(/[:—–-]\s*$/, '')
      if (trimmed !== prev.props.children) {
        out[out.length - 1] = <span key={`t${i}`}>{trimmed.replace(/\s+$/, '') + ' '}</span>
      }
    }

    out.push(
      <Link
        key={i}
        to={part}
        className="font-medium text-santi underline decoration-santi/30 underline-offset-[3px] transition-colors hover:decoration-santi"
      >
        {labelFor(part)}
      </Link>,
    )

    // Y el separador que quedaba después ("… /servicios/seo-sem/ ·").
    const next = parts[i + 1]
    if (typeof next === 'string' && /^\s*[)»]?\s*$/.test(next) === false) {
      parts[i + 1] = next.replace(/^\s*[:—–]\s*/, ' ')
    }
  }

  return <>{out}</>
}
