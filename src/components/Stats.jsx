import { motion } from 'framer-motion'
import { stats } from '../data'
import { Reveal } from './Reveal'
import { Counter } from './Counter'

export function Stats() {
  return (
    <section className="container-x py-16 md:py-24">
      <Reveal>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(02)</span>
              <p className="eyebrow">Resultados, no promesas</p>
            </div>
            <h2 className="max-w-2xl font-grotesk text-big font-bold leading-[1.02] tracking-[-0.02em]">
              Estrategia que se traduce en{' '}
              <span className="font-serif font-normal italic text-santi">ventas</span>.
            </h2>
          </div>
          <p className="max-w-xs text-balance text-muted">
            Números reales de marcas con las que trabajé — no proyecciones.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.06} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line p-8 transition-all duration-300 hover:border-santi/40 hover:bg-fg/[0.02] md:p-10">
              {/* Línea azul superior que se dibuja al entrar */}
              <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-line">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full origin-left bg-santi"
                />
              </div>

              <span className="font-mono text-[10px] text-santi">0{i + 1}</span>

              <Counter
                value={s.value}
                className="mt-6 font-grotesk text-[clamp(3rem,7vw,5rem)] font-extrabold leading-none tracking-[-0.03em] transition-colors duration-300 group-hover:text-santi"
              />

              <p className="mt-4 font-grotesk text-lg font-medium text-fg">
                {s.metric}
                {s.client && <span className="text-muted"> — {s.client}</span>}
              </p>

              {s.note && (
                <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {s.note}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
