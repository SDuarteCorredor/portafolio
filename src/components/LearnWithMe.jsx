import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { SplitText } from './motion/SplitText'
import { homeAula, courses, aulaUrl } from '../content/aula.js'
import { AulaCourses, AulaLegal } from './aula/AulaBlocks'
import { trackCta, trackOutbound } from '../seo/analytics'

// Segunda puerta en la home: el aula. Va entre el trabajo con clientes y los
// recursos abiertos, que es el orden de las tres puertas.

const CAMPAIGN = 'home-aprende'

export function LearnWithMe() {
  const primaryHref = aulaUrl(homeAula.primary.aulaPath, CAMPAIGN)

  return (
    <section id="aprende" className="container-x py-16 md:py-24">
      <Reveal>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">(05)</span>
              <p className="eyebrow">{homeAula.eyebrow}</p>
            </div>
            <SplitText
              as="h2"
              text={homeAula.title}
              className="block font-grotesk text-huge font-bold leading-[0.95] tracking-[-0.03em]"
            />
            <p className="mt-6 max-w-xl text-pretty text-muted md:text-lg">{homeAula.body}</p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener"
              onClick={() => trackOutbound(primaryHref, 'Aula home')}
              className="btn-blue"
            >
              {homeAula.primary.label} ↗
            </a>
            <Link
              to={homeAula.secondary.to}
              onClick={() => trackCta('Ver página aprende', 'home_aprende')}
              className="link-underline font-grotesk text-sm text-santi"
            >
              {homeAula.secondary.label}
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <AulaCourses campaign={CAMPAIGN} limit={homeAula.shown} />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <AulaLegal />
          {courses.length > homeAula.shown && (
            <Link
              to="/aprende/"
              onClick={() => trackCta('Ver todos los cursos', 'home_aprende_cursos')}
              className="link-underline font-grotesk text-sm text-santi"
            >
              Ver los {courses.length} cursos →
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  )
}
