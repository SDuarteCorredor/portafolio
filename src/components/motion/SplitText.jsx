import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Titular cinético: el texto entra letra por letra desde abajo, detrás de una
// máscara por palabra.
//
// Por qué por palabra y no por línea: la máscara por línea exigiría medir el
// salto real de línea después del layout, y estos títulos son fluidos
// (clamp + text-balance), así que la medida cambiaría en cada resize. La
// máscara por palabra da el mismo efecto visual y es estable.
//
// Entiende la sintaxis *acento* de Accent.jsx, así que los títulos siguen
// viviendo en los archivos de contenido sin perder la itálica azul.

const EASE = [0.22, 1, 0.36, 1]

/** Divide "hola *mundo*" en tokens con su marca de acento. */
function tokenize(text) {
  return String(text)
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) => {
      const accent = part.startsWith('*') && part.endsWith('*') && part.length > 2
      return { text: accent ? part.slice(1, -1) : part, accent }
    })
}

export function SplitText({
  text = '',
  className = '',
  as: Tag = 'span',
  delay = 0,
  stagger = 0.026,
  duration = 0.9,
  once = true,
  inView = true,        // false → anima al montar (útil en el hero)
}) {
  const reduce = useReducedMotion()

  // Con "reducir movimiento" se entrega el texto ya puesto, con el acento
  // intacto. Nada de animación, ni siquiera un fundido.
  if (reduce) {
    return (
      <Tag className={className}>
        {tokenize(text).map((t, i) => (
          <span key={i} className={t.accent ? 'font-serif font-normal italic text-santi' : undefined}>
            {t.text}
          </span>
        ))}
      </Tag>
    )
  }

  // Se aplana a una lista de palabras conservando el acento de cada una, para
  // que el retraso de cada letra sea global y no se reinicie por token.
  const words = []
  tokenize(text).forEach((token) => {
    token.text.split(/\s+/).filter(Boolean).forEach((w) => {
      words.push({ word: w, accent: token.accent })
    })
  })

  let charIndex = -1

  const anim = inView
    ? { whileInView: 'show', viewport: { once, margin: '-12%' } }
    : { animate: 'show' }

  return (
    <Tag className={className}>
      <motion.span initial="hidden" {...anim} className="inline">
        {words.map(({ word, accent }, w) => (
          <Fragment key={w}>
          <span
            // La máscara: -0.14em de margen inferior compensa el padding que
            // deja respirar a las colas de g, j, p, q, y.
            className="inline-block overflow-hidden pb-[0.14em] align-bottom"
            style={{ marginBottom: '-0.14em' }}
          >
            {Array.from(word).map((ch, c) => {
              charIndex += 1
              return (
                <motion.span
                  key={c}
                  className={`inline-block will-change-transform ${
                    accent ? 'font-serif font-normal italic text-santi' : ''
                  }`}
                  variants={{
                    hidden: { y: '115%' },
                    show: {
                      y: '0%',
                      transition: { duration, delay: delay + charIndex * stagger, ease: EASE },
                    },
                  }}
                >
                  {ch}
                </motion.span>
              )
            })}
          </span>
          {/* Espacio real entre palabras, no un margen.
              Con `margin-right` el texto se ve bien pero textContent devuelve
              "Marketingdigitalcon…" — sin separación. Eso degrada el H1 para
              Google y para los lectores de pantalla, que es justo lo que este
              sitio no se puede permitir. Un nodo de texto lo resuelve y además
              da el punto de corte natural para que el título fluya. */}
          {' '}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  )
}
