import { ticker } from '../data'
import { VelocityMarquee } from './motion/VelocityMarquee'

// La cinta ya no corre a velocidad fija: acelera con el scroll y cambia de
// sentido cuando el visitante sube. El movimiento pasa a ser una respuesta al
// gesto, no un adorno en bucle.

function Items({ reverse = false }) {
  return ticker.map((t, i) => (
    <span key={i} className="flex items-center gap-10 whitespace-nowrap font-grotesk text-2xl font-medium md:text-3xl">
      <span className={i % 3 === 1 ? 'text-santi' : reverse ? 'text-outline' : 'text-fg/80'}>{t}</span>
      <span className="text-santi">✦</span>
    </span>
  ))
}

export function Marquee() {
  return (
    <section className="relative border-y border-line bg-surface/50 py-6">
      <div className="space-y-3">
        {/* Velocidades base distintas y de signo opuesto: las dos filas nunca
            quedan sincronizadas, que es lo que delata un marquee automático. */}
        <VelocityMarquee baseVelocity={-3.2}>
          <Items />
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={2.4}>
          <Items reverse />
        </VelocityMarquee>
      </div>

      {/* Difuminado en los bordes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </section>
  )
}
