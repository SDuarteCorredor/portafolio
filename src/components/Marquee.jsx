import { ticker } from '../data'

function Row({ reverse = false }) {
  const items = [...ticker, ...ticker]
  const anim = reverse ? 'animate-marquee-rev' : 'animate-marquee'
  return (
    <div className="flex overflow-hidden">
      {[0, 1].map((dup) => (
        <div key={dup} className={`flex shrink-0 items-center gap-10 pr-10 ${anim}`} aria-hidden={dup === 1}>
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-grotesk text-2xl font-medium md:text-3xl">
              <span className={i % 3 === 1 ? 'text-santi' : reverse ? 'text-outline' : 'text-fg/80'}>{t}</span>
              <span className="text-santi">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export function Marquee() {
  return (
    <section className="relative border-y border-line bg-surface/50 py-6">
      <div className="space-y-3">
        <Row />
        <Row reverse />
      </div>
      {/* Difuminado en los bordes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </section>
  )
}
