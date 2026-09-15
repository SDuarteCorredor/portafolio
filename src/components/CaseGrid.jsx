import { Reveal } from './Reveal'
import { CaseCard } from './CaseCard'

// Grilla de casos, compartida por la home y el hub /trabajo/.
//
// Su trabajo aparte de maquetar: que ninguna fila quede coja.
//
// Con siete tarjetas en tres columnas quedaba 3 + 3 + 1, y esa última colgaba
// con dos columnas de vacío al lado. La primera solución fue estirarla a lo
// ancho, pero entonces el último proyecto se lleva una fila entera para él
// solo — que es justo lo contrario de lo que se quiere cuando la lista está
// ordenada por importancia y el último es el menos prioritario.
//
// La solución es repartir el sobrante: la grilla base es de seis columnas, las
// tarjetas ocupan dos (tres por fila) y las del final pasan a ocupar tres (dos
// por fila) las que hagan falta para que todas las filas cierren completas.
//
//   7 casos → 3 + 2 + 2
//   8 casos → 3 + 3 + 2
//   6 casos → 3 + 3
//
// Las clases van literales porque Tailwind compila leyendo el código fuente y
// no vería una clase armada por concatenación.

/**
 * Cuántas tarjetas del final pasan a media fila para que no sobre ninguna.
 * Devuelve el índice a partir del cual son anchas.
 */
function wideTailStart(n) {
  if (n <= 2) return n === 1 ? 0 : 0 // una sola o dos: ambas a media fila
  const rest = n % 3
  if (rest === 0) return n // todas de a tres, no sobra nada
  if (rest === 2) return n - 2 // la última fila lleva dos
  return n - 4 // sobra una: las últimas cuatro se reparten en dos filas de dos
}

export function CaseGrid({ items, source = 'work_card' }) {
  const n = items.length
  const tail = wideTailStart(n)

  // Una sola tarjeta no tiene con quién compartir fila: ocupa el ancho entero.
  const soloCard = n === 1

  // A dos columnas (md) el reparto es distinto: si el total es impar, la
  // primera ocupa la fila entera. Va la primera y no la última a propósito —
  // la lista está ordenada por importancia, así que el hueco lo aprovecha el
  // proyecto más prioritario, no el menos.
  const mdLead = n % 2 === 1

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
      {items.map((w, i) => {
        const mdWide = mdLead && i === 0
        const xlWide = soloCard || i >= tail

        const span =
          (mdWide ? 'md:col-span-6 ' : 'md:col-span-3 ') +
          (soloCard ? 'xl:col-span-6' : xlWide ? 'xl:col-span-3' : 'xl:col-span-2')

        // El formato horizontal se activa donde la tarjeta es más ancha de lo
        // normal. Si solo lo es en md, vuelve a vertical en xl.
        const wide = mdWide ? (xlWide ? 'md' : 'mdOnly') : xlWide ? 'xl' : null

        return (
          <Reveal key={w.slug || w.title} delay={(i % 3) * 0.06} className={`h-full ${span}`}>
            <CaseCard w={w} source={source} wide={wide} />
          </Reveal>
        )
      })}
    </div>
  )
}
