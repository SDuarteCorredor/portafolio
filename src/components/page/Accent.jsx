// Renderiza acentos tipográficos dentro de un texto plano: lo que va entre
// *asteriscos* sale en serif itálica azul, la firma visual del sitio.
// Permite que los títulos vivan en los archivos de contenido (donde los edita
// quien escribe) sin perder el detalle de diseño.

export function Accent({ text = '' }) {
  const parts = String(text).split(/(\*[^*]+\*)/g).filter(Boolean)

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <span key={i} className="font-serif font-normal italic text-santi">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

/** Versión en texto plano — para <title>, alt, JSON-LD y auditoría. */
export function stripAccent(text = '') {
  return String(text).replace(/\*/g, '')
}
