import { Reveal } from './Reveal'
import { CaseCard } from './CaseCard'

// Grilla de casos, compartida por la home y el hub /trabajo/.
//
// Su único trabajo aparte de maquetar: que ningún proyecto cierre la fila solo.
// En la home son siete tarjetas en tres columnas (3 + 3 + 1), y esa última
// quedaba colgando con dos columnas de vacío al lado. Se lee como un error de
// maquetación, y de paso castiga justo al proyecto que quedó último.
//
// Cuando el resto de la división deja un solo elemento, esa tarjeta ocupa el
// ancho que le sobra a la fila y pasa a formato horizontal. Funciona para
// cualquier cantidad: con ocho casos (3 + 3 + 2) no se activa nada.

export function CaseGrid({ items, source = 'work_card' }) {
  const n = items.length

  // La grilla es de 2 columnas desde md y de 3 desde xl, así que la orfandad
  // hay que evaluarla en cada breakpoint por separado.
  const orphanMd = n % 2 === 1
  const orphanXl = n % 3 === 1

  const spanFor = (i) => {
    if (i !== n - 1) return ''
    return `${orphanMd ? 'md:col-span-2 ' : ''}${orphanXl ? 'xl:col-span-3' : ''}`.trim()
  }

  // El formato horizontal se activa en el breakpoint más chico donde la tarjeta
  // se estira: si ya es ancha desde md, no tiene sentido esperar a xl.
  const wideFor = (i) => {
    if (i !== n - 1) return null
    if (orphanMd) return 'md'
    if (orphanXl) return 'xl'
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((w, i) => (
        <Reveal key={w.slug || w.title} delay={(i % 3) * 0.06} className={`h-full ${spanFor(i)}`}>
          <CaseCard w={w} source={source} wide={wideFor(i)} />
        </Reveal>
      ))}
    </div>
  )
}
