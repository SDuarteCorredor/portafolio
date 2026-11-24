// ─────────────────────────────────────────────────────────────────────────────
// AULA — la segunda puerta de la marca: «Aprende conmigo».
//
// El aula vive en otro sitio (bimo.ivansantiagoduarte.com, repo
// SDuarteCorredor/compas-academy). Este archivo es lo único que el portafolio
// sabe de ella: los cursos publicados, las formas de aprender y el aviso legal.
// Los resúmenes de los cursos salen del catálogo del aula
// (compas-academy/src/content/catalogo.js); si cambian allá, se copian acá.
//
// Reglas que no se negocian:
//   · Todo enlace al aula pasa por aulaUrl(), que le pega los UTM. El aula ya
//     lee utm_source / utm_medium / utm_campaign.
//   · Toda promoción de cursos muestra AULA_LEGAL (educación informal,
//     Decreto 1075 de 2015). Nunca se promete título, «técnico» ni «tecnólogo».
//   · No se publican precios de membresía: el cobro del aula todavía no abrió.
//     Lo único con precio público es la clase 1 a 1.
// ─────────────────────────────────────────────────────────────────────────────

import { profile } from '../data.js'

export const AULA_ORIGIN = 'https://bimo.ivansantiagoduarte.com'

/** Aviso obligatorio en cualquier pieza que promocione los cursos. */
export const AULA_LEGAL =
  'Educación informal: no conduce a título ni a certificado de aptitud ocupacional.'

/**
 * URL del aula con los parámetros de medición.
 * @param {string} path      ruta dentro del aula ('/', '/cursos/sql-desde-cero', '/agendar')
 * @param {string} campaign  sección del portafolio desde donde se hace clic
 */
export function aulaUrl(path = '/', campaign = 'portafolio') {
  const url = new URL(path, AULA_ORIGIN)
  url.searchParams.set('utm_source', 'portafolio')
  url.searchParams.set('utm_medium', 'web')
  url.searchParams.set('utm_campaign', campaign)
  return url.toString()
}

/** Los cursos publicados hoy en el aula, en el orden en que conviene leerlos. */
export const courses = [
  {
    slug: 'marketing-desde-cero',
    title: 'Marketing desde cero',
    level: 'Principiante',
    modules: 12,
    area: 'Marketing',
    summary:
      'Qué es el marketing de verdad, a quién le vendes, cómo te encuentran y cómo saber si funciona.',
  },
  {
    slug: 'ia-en-el-trabajo',
    title: 'IA para tu trabajo',
    level: 'Principiante',
    modules: 8,
    area: 'IA',
    summary:
      'Usar asistentes de IA para escribir, investigar y analizar: qué pedir, cómo revisar lo que entregan y dónde no confiar.',
  },
  {
    slug: 'diseno-grafico-desde-cero',
    title: 'Diseño gráfico desde cero',
    level: 'Principiante',
    modules: 8,
    area: 'Diseño',
    summary:
      'Jerarquía, color, tipografía, retícula e imágenes para que tus piezas se vean profesionales y se lean, en la herramienta que uses.',
  },
  {
    slug: 'sql-desde-cero',
    title: 'SQL desde cero',
    level: 'Principiante',
    modules: 8,
    area: 'Datos',
    summary:
      'Consultar, filtrar, resumir y unir tablas escribiendo SQL de verdad en el navegador, sin instalar nada.',
  },
  {
    slug: 'python-desde-cero',
    title: 'Python desde cero',
    level: 'Principiante',
    modules: 8,
    area: 'Programación',
    summary:
      'Programar paso a paso: cada clase termina con un ejercicio que corre en tu computador.',
  },
  {
    slug: 'economia-del-marketing',
    title: 'Economía del marketing',
    level: 'Avanzado',
    modules: 7,
    area: 'Marketing',
    summary:
      'Márgenes, ROAS, CAC, LTV, atribución y pruebas A/B: saber si una campaña gana plata y defender el presupuesto con números.',
  },
  {
    slug: 'estrategia-y-crecimiento',
    title: 'Estrategia y crecimiento',
    level: 'Avanzado',
    modules: 8,
    area: 'Marketing',
    summary:
      'Decidir precios, a qué clientes priorizar, cómo retener y qué palanca de crecimiento mover, con números.',
  },
]

/** Cómo se aprende dentro del aula (el método, no el precio). */
export const method = [
  {
    title: 'Práctica que se corrige sola',
    body: 'Cada módulo trae ejercicios que te dicen al instante qué hiciste bien y qué no, sin esperar a que alguien los revise.',
  },
  {
    title: 'Un desafío aplicado a tu negocio',
    body: 'Lo que aprendes lo aplicas a un caso real: el tuyo, el de tu trabajo o uno que conozcas.',
  },
  {
    title: 'Repaso para que no se olvide',
    body: 'El aula te devuelve a lo que ya viste para que lo recuerdes la semana siguiente, no solo el día del examen.',
  },
  {
    title: 'Certificado verificable',
    body: 'Al terminar un curso recibes un certificado con un enlace que cualquiera puede comprobar.',
  },
]

const groupMessage = encodeURIComponent(
  'Hola Iván, quiero información de las clases en grupo y en vivo del aula.',
)

/**
 * Formas de aprender. `href` es una URL completa del aula (se le pegan los UTM
 * al renderizar con la campaña de la sección) o un enlace de contacto.
 */
export const modes = [
  {
    id: 'ritmo',
    title: 'A tu ritmo',
    price: 'Primer módulo gratis',
    body: 'El primer módulo de cada curso es gratis y no pide tarjeta. Entras, lo haces completo y decides si sigues.',
    cta: 'Empezar gratis',
    aulaPath: '/',
  },
  {
    id: 'grupo',
    title: 'En grupo y en vivo',
    price: 'Lunes a jueves · 7:30 p. m.',
    body: 'Clases por Google Meet de lunes a jueves a las 7:30 p. m. (hora de Colombia). Cada módulo se abre el día de su clase, así el grupo avanza junto.',
    cta: 'Escríbeme',
    externalHref: `${profile.whatsappLink}?text=${groupMessage}`,
  },
  {
    id: 'personal',
    title: 'Clase personalizada 1 a 1',
    price: '30 min · $50.000 / 60 min · $90.000',
    body: 'Una sesión solo para ti, sobre el curso que llevas o sobre un problema concreto de tu trabajo. Eliges el horario en la agenda.',
    cta: 'Agendar clase',
    aulaPath: '/agendar',
  },
]

// ═════════════════════════════════════════════════════════════════════════════
// Textos de la home: el bloque de las tres puertas y la sección «Aprende conmigo»
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Las tres puertas de la marca. ivansantiagoduarte.com es la página maestra:
 * desde acá se entra a trabajar conmigo, a aprender conmigo o a los recursos
 * abiertos. `to` es una ruta interna; `aulaPath`, una ruta del aula.
 */
export const doors = {
  eyebrow: 'Tres puertas',
  title: 'Elige *por dónde* entrar.',
  items: [
    {
      n: '01',
      title: 'Trabajemos juntos',
      body: 'Estrategia, pauta, tienda, marca o producto con IA para tu negocio. Mira los casos y los servicios.',
      cta: 'Ver servicios y casos',
      to: '/servicios/',
    },
    {
      n: '02',
      title: 'Aprende conmigo',
      body: 'Cursos de marketing, IA, diseño y datos en mi aula, con práctica que se corrige sola. El primer módulo es gratis.',
      cta: 'Ver los cursos',
      to: '/aprende/',
    },
    {
      n: '03',
      title: 'Recursos abiertos',
      body: 'Herramientas de código abierto que uso en mi propio trabajo, gratis y listas para clonar.',
      cta: 'Ver los recursos',
      to: '/recursos/',
    },
  ],
}

/** Sección «Aprende conmigo» de la home. */
export const homeAula = {
  eyebrow: 'Aprende conmigo',
  title: 'Mi *aula*.',
  body: 'Lo que aplico con marcas también lo enseño. Cursos en línea con práctica que se corrige sola, un desafío aplicado a tu negocio, repaso y certificado verificable. Empiezas gratis con el primer módulo, sin tarjeta.',
  primary: { label: 'Entrar al aula', aulaPath: '/' },
  secondary: { label: 'Cursos, formas de aprender y preguntas →', to: '/aprende/' },
  shown: 3,
}

// ═════════════════════════════════════════════════════════════════════════════
// Página /aprende/
// ═════════════════════════════════════════════════════════════════════════════

const totalModules = courses.reduce((n, c) => n + c.modules, 0)

export const aprende = [
  {
    path: '/aprende/',
    cluster: 'aprende',
    parent: '/',
    navLabel: 'Aprende',

    metaTitle: 'Cursos de marketing digital Colombia | Iván Santiago Duarte',
    metaDescription:
      'Cursos de marketing digital, IA, diseño, SQL y Python con práctica que se corrige sola y certificado verificable. El primer módulo es gratis y sin tarjeta.',
    h1: 'Aprende marketing practicando, a tu ritmo o en vivo',
    keywords: [
      'cursos de marketing digital colombia',
      'curso de marketing desde cero',
      'curso de sql gratis en el navegador',
      'curso de python desde cero',
      'curso de ia para el trabajo',
      'aula iván santiago duarte',
    ],

    intent: {
      type: 'comercial',
      query: 'cursos de marketing digital colombia',
      audience:
        'Personas en Colombia que quieren aprender marketing, IA, diseño o datos desde cero, o profundizar en la economía del marketing.',
      problem:
        'Los cursos que existen son horas de video sin práctica: terminas sin saber si de verdad aprendiste a hacerlo.',
      outcome:
        'Saber qué cursos hay, cómo se aprende en el aula, cuánto cuesta cada forma de estudiar y por dónde empezar gratis.',
    },

    tldr: [
      `${courses.length} cursos publicados y ${totalModules} módulos: marketing, IA, diseño gráfico, SQL y Python desde cero, más dos cursos avanzados.`,
      'Cada módulo tiene práctica que se corrige sola, un desafío aplicado a tu negocio y repaso para que no se olvide.',
      'El primer módulo de cada curso es gratis y no pide tarjeta.',
      'También hay clases en grupo por Meet de lunes a jueves a las 7:30 p. m. y clases 1 a 1 desde $50.000.',
      AULA_LEGAL,
    ],

    lead:
      'Además de trabajar con marcas, enseño. Mi academia, BIMO Academy, está en bimo.ivansantiagoduarte.com y la armé con lo que me habría gustado tener cuando empecé: menos video, más práctica, y casos de negocios reales en lugar de ejemplos de manual. Cada curso empieza con un módulo gratis, sin tarjeta, para que veas cómo se aprende antes de decidir nada.',
    ctaInline: { label: 'Entrar al aula', href: aulaUrl('/', 'pagina-aprende-lead') },
    ctaNote: 'Primer módulo gratis, sin tarjeta.',

    sections: [
      {
        h2: 'Qué es el aula y cómo se aprende',
        body: [
          'El aula es una plataforma propia, no un canal de videos. Cada módulo se lee y se hace: explicación corta, ejercicios que se corrigen al instante y un desafío que aplicas a tu propio negocio o trabajo.',
          'La enseño yo, con lo que uso todos los días en los proyectos que ves en /trabajo/. Por eso los ejemplos son de negocios colombianos y los números son los que de verdad se miran en una cuenta de pauta o en una tienda.',
        ],
        list: {
          variant: 'check',
          title: 'Cómo es un módulo por dentro',
          items: method.map((m) => `${m.title}: ${m.body}`),
        },
      },
      {
        h2: 'Los cursos disponibles',
        body: [
          'Cinco cursos para empezar desde cero y dos avanzados para quien ya maneja presupuesto. Todos se toman en línea y el primer módulo de cada uno está abierto.',
        ],
        table: {
          caption: 'Cursos publicados en el aula, con nivel y número de módulos',
          head: ['Curso', 'Nivel', 'Módulos', 'Qué aprendes'],
          rows: courses.map((c) => [c.title, c.level, String(c.modules), c.summary]),
        },
        custom: 'aula-cursos',
      },
      {
        h2: 'Tres formas de aprender',
        body: [
          'Puedes estudiar solo, con un grupo o conmigo uno a uno. No son excluyentes: hay quien lleva el curso a su ritmo y agenda una clase personalizada cuando se traba.',
        ],
        list: {
          variant: 'ul',
          title: 'En resumen',
          items: modes.map((m) => `${m.title} (${m.price}): ${m.body}`),
        },
        custom: 'aula-formas',
      },
      {
        h2: 'Qué recibes al terminar y qué no',
        body: [
          'Al completar un curso recibes un certificado con enlace de verificación, útil para mostrar en tu hoja de vida o en LinkedIn qué estudiaste y cuándo.',
          `Lo digo claro porque importa: ${AULA_LEGAL} Los cursos del aula son educación informal según el Decreto 1075 de 2015. No son un programa técnico, tecnológico ni universitario, y no reemplazan uno.`,
        ],
        list: {
          variant: 'ul',
          title: 'Lo que sí te llevas',
          items: [
            'Lo que construiste en los desafíos: un plan, unas piezas o unas consultas aplicadas a un negocio real.',
            'Un certificado de participación que cualquiera puede verificar en línea.',
            'Criterio para seguir solo: saber qué mirar, qué preguntar y cuándo un resultado no cuadra.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Los cursos de marketing digital son gratis?',
        a: 'El primer módulo de cada curso es gratis y no pide tarjeta. Así puedes ver cómo se aprende en el aula antes de decidir si sigues. Las clases en grupo se coordinan por mensaje y la clase personalizada cuesta $50.000 por 30 minutos o $90.000 por 60 minutos.',
      },
      {
        q: '¿Necesito saber algo antes de empezar?',
        a: 'Para los cursos «desde cero» no. Marketing, IA, diseño y SQL solo necesitan el navegador; para Python necesitas un computador donde instalar VS Code y Python. Los cursos avanzados, Economía del marketing y Estrategia y crecimiento, son para quien ya maneja pauta o presupuesto.',
      },
      {
        q: '¿El certificado es válido como título?',
        a: `No. ${AULA_LEGAL} Es un certificado de participación con enlace de verificación: sirve para mostrar qué estudiaste, pero no equivale a un título técnico, tecnológico ni profesional.`,
      },
      {
        q: '¿Cómo funcionan las clases en vivo?',
        a: 'Son por Google Meet, de lunes a jueves a las 7:30 p. m., hora de Colombia. Cada módulo se abre el día de su clase para que el grupo avance al mismo ritmo. Para entrar a un grupo escríbeme y te cuento cuándo empieza el próximo.',
      },
      {
        q: '¿Puedo estudiar desde fuera de Colombia?',
        a: 'Sí. El aula es en línea y los módulos a tu ritmo se hacen a cualquier hora. Las clases en vivo y las personalizadas usan la hora de Colombia, así que conviene revisar la diferencia horaria antes de agendar.',
      },
    ],

    related: [
      {
        path: '/servicios/',
        label: 'Servicios',
        note: 'Si prefieres que lo haga contigo en tu negocio en lugar de aprenderlo, estos son los seis frentes de trabajo.',
      },
      {
        path: '/recursos/',
        label: 'Recursos abiertos',
        note: 'Herramientas de código abierto para producir contenido y hacer marketing con IA, gratis y listas para clonar.',
      },
      {
        path: '/perfil/',
        label: 'Quién enseña',
        note: 'La trayectoria de diseñador gráfico a marketing y producto con IA, con formación y certificaciones.',
      },
    ],

    image: {
      src: '/og/cursos-marketing-digital-aula-ivan-santiago-duarte.png',
      alt: 'Tarjeta del aula de Iván Santiago Duarte con el titular de la página de cursos de marketing digital',
      width: 1200,
      height: 630,
    },

    schemaType: 'CourseList',
    updated: '2026-11-17',
    priority: 0.8,
  },
]
