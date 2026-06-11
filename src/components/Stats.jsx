import { motion } from 'framer-motion'
import { stats } from '../data'
import { Reveal } from './Reveal'
import { Counter } from './Counter'

export function Stats() {
  return (
    <section className="container-x py-24 md:py-36">
      <Reveal>
        <div className="mb-14 flex items-end justify-between">
          <p className="eyebrow">Resultados, no promesas</p>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(02)</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="group relative">
              {/* Línea azul que crece al entrar */}
              <div className="relative h-px w-full overflow-hidden bg-fg/15">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 origin-left bg-santi"
                />
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-mono text-[10px] text-santi-soft">0{i + 1}</span>
              </div>

              <Counter
                value={s.value}
                className="block font-grotesk text-huge font-bold leading-none tracking-tightest transition-colors duration-300 group-hover:text-santi-soft"
              />
              <p className="mt-4 text-sm leading-snug text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
