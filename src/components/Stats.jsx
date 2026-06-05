import { stats } from '../data'
import { Reveal } from './Reveal'

export function Stats() {
  return (
    <section className="container-x py-24 md:py-36">
      <Reveal>
        <p className="eyebrow mb-14">Resultados, no promesas</p>
      </Reveal>
      <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="group border-t border-white/15 pt-5">
              <div className="font-grotesk text-huge font-bold leading-none tracking-tightest transition-colors group-hover:text-santi-soft">
                {s.value}
              </div>
              <p className="mt-4 text-sm text-mist">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
