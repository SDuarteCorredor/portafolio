// ─────────────────────────────────────────────────────────────────────────────
// RECURSOS — lo que se escribe a mano encima de lo que llega de GitHub.
//
// La lista de recursos NO se mantiene acá: sale sola de src/content/repos.json,
// que la GitHub Action refresca desde la cuenta pública. Un repo nuevo aparece
// en el sitio aunque no tenga entrada en este archivo, con su página armada a
// partir de la descripción, los temas, la licencia y el README.
//
// Este archivo existe para cuando uno quiere que la página de un repo diga más
// que eso: el nombre bien escrito, el gancho de la tarjeta, una portada, el
// texto en español o preguntas propias. Todo campo es opcional y, si falta, se
// usa el automático. Ver `buildResource` en recursos.js para el detalle.
//
//   title            nombre legible ("Generación de carruseles")
//   slug             URL propia si el nombre del repo no sirve (sin números ni
//                    conectores: la auditoría SEO los rechaza)
//   kind             qué tipo de recurso es, en dos o tres palabras
//   hook             una línea para la tarjeta
//   description      el párrafo corto, en español
//   tags             etiquetas visibles (si no, los temas de GitHub + lenguaje)
//   accent           color propio, como en los casos de /trabajo/
//   cover, coverAlt  portada 16:10 en public/img/recursos/ (png + webp + avif)
//   featured         va primero y grande en la home y en /recursos/
//   metaTitle, metaDescription, h1, lead, keywords, intent, tldr, sections
//   faq              preguntas propias; se suman a las automáticas de licencia
//                    e instalación, que salen de los datos y no se desactualizan
// ─────────────────────────────────────────────────────────────────────────────

/** Repos públicos que NO se muestran, sin tener que tocar GitHub. También se
 *  puede agregar el tema `no-portafolio` al repo. */
export const hidden = []

export const curated = {
  'generacion-carruseles': {
    title: 'Generación de carruseles',
    kind: 'Espacio de trabajo para Claude Code',
    featured: true,
    accent: '#C9A46A',
    hook: 'Del link de un carrusel que funcionó a los PNG de tu marca, listos para publicar.',
    description:
      'Espacio de trabajo para Claude Code que convierte un carrusel de referencia en uno propio: analiza el gancho, lo adapta a tu marca, te entrega el guion y los prompts de imagen, y exporta las láminas finales a 1080×1350.',
    tags: ['Claude Code', 'Instagram', 'LinkedIn', 'Remotion', 'Multimarca'],
    cover: '/img/recursos/generacion-carruseles.png',
    coverAlt:
      'Tres láminas del carrusel «nadie aplaude» producido con el espacio de trabajo: un pasillo de hotel en penumbra, una cama tendida con luz lateral y un salón vacío al amanecer, con titulares en serif blanca.',

    metaTitle: 'Generador de carruseles para Instagram con Claude',
    metaDescription:
      'Espacio de trabajo abierto para Claude Code: de un carrusel de referencia a láminas de 1080×1350 para Instagram, Facebook y LinkedIn, con guion y prompts.',
    h1: 'Carruseles de marca a partir de un referente, con Claude Code',
    keywords: [
      'generador de carruseles instagram',
      'carruseles con claude code',
      'plantilla carruseles linkedin',
      'automatizar carruseles redes sociales',
    ],

    intent: {
      type: 'informacional',
      query: 'cómo hacer carruseles para instagram con ia',
      audience:
        'Quien produce contenido para una o varias marcas y quiere dejar de armar cada carrusel desde una hoja en blanco.',
      problem:
        'Un carrusel que funciona se puede estudiar, pero adaptarlo a otra marca a mano toma horas y el resultado suele perder el gancho.',
      outcome:
        'Un flujo repetible: pasas el link del referente y sales con guion, prompts de imagen y PNG finales en el formato de cada red.',
    },

    tldr: [
      'Es un espacio de trabajo para Claude Code: clonas la carpeta, la abres y las instrucciones y la skill cargan solas.',
      'Le pasas el link de un carrusel de referencia; devuelve el guion lámina por lámina y los prompts de imagen para ChatGPT, ya adaptados a la marca.',
      'Con las fotos en su carpeta, arma el diseño final y exporta los PNG a 1080×1350 para Instagram, Facebook y LinkedIn.',
      'Es multimarca: cada marca vive en su carpeta con reglas visuales, tono, calendario y carruseles aprobados, y hay una plantilla para sumar una nueva.',
      'Lo uso en producción: los carruseles de la marca configurada salieron de acá, incluido el de «nadie aplaude».',
    ],

    lead:
      'Armar un carrusel desde cero cada semana es la forma más lenta de hacer contenido. Lo que sí funciona es partir de uno que ya demostró que engancha, entender por qué, y adaptarlo a la marca sin copiarlo. Este repositorio es el espacio de trabajo con el que hago eso con Claude Code: le paso el link del referente y el resto del flujo, del guion a los PNG finales, queda ordenado y repetible.',

    sections: [
      {
        h2: 'Cómo funciona, del referente al PNG',
        body: [
          'El flujo está escrito en el propio repositorio para que Claude lo siga igual cada vez. Lo importante es el orden: el guion se aprueba antes de generar imágenes, porque si cambia el texto después puede cambiar lo que la foto tiene que mostrar.',
        ],
        list: {
          variant: 'ol',
          title: 'Los cinco pasos',
          items: [
            'Pasas el link de un carrusel de referencia, casi siempre de Instagram.',
            'Claude lo analiza por dentro: el gancho, la estructura, cuántas láminas, dónde rompe el patrón y cómo cierra.',
            'Te entrega en el chat el guion lámina por lámina y un bloque con los prompts de imagen, en inglés y con especificaciones técnicas, máximo cinco imágenes.',
            'Generas las fotos en ChatGPT y las dejas en la carpeta del carrusel, numeradas en el orden de las láminas.',
            'Se arma el diseño final y se exportan los PNG a 1080×1350, junto con el caption para cada red.',
          ],
        },
      },
      {
        h2: 'Qué trae el repositorio',
        table: {
          caption: 'Carpetas del espacio de trabajo y para qué sirve cada una',
          head: ['Carpeta', 'Qué es'],
          rows: [
            ['CLAUDE.md', 'Las instrucciones que Claude lee al abrir la carpeta'],
            ['.context/', 'Conocimiento común: flujo, cómo adaptar referentes, prompts de imagen, captions y lecciones técnicas'],
            ['.claude/', 'La skill carrusel-corporativo y los permisos'],
            ['marcas/<marca>/', 'Todo lo de cada marca: reglas, LinkedIn, calendario, carruseles aprobados y producidos'],
            ['marcas/_plantilla/', 'El punto de partida para configurar una marca nueva'],
            ['src/ y scripts/', 'Un motor en Remotion de respaldo, para reproducir un carrusel exacto'],
          ],
        },
        subsections: [
          {
            h3: 'Lo que se queda fuera a propósito',
            body: [
              'Las capturas de otras cuentas usadas como referencia y los datos de quién pide y aprueba cada pieza no se suben: viven solo en el computador donde se trabaja. Es una decisión de privacidad y de derechos de autor, no un olvido.',
            ],
          },
        ],
      },
      {
        h2: 'Qué necesitas para usarlo',
        body: [
          'Claude Code, Node.js 20 o superior, ffmpeg y Git. La primera exportación descarga sola un navegador sin interfaz que el motor usa para renderizar. Para arrancar basta con escribirle "Quiero configurar una marca nueva" y responder lo que pregunta antes del primer carrusel.',
        ],
      },
    ],

    faq: [
      {
        q: '¿Sirve para varias marcas a la vez?',
        a: 'Sí, está pensado así. Cada marca vive en su propia carpeta con sus reglas visuales, tono, línea de LinkedIn, calendario y carruseles aprobados, y Claude pregunta para qué marca es antes de proponer nada. La regla es explícita: nunca se usan datos de una marca en otra.',
      },
      {
        q: '¿Copia el carrusel de referencia?',
        a: 'No. Del referente se conserva lo que lo hace funcionar, que es el gancho, la estructura y el ritmo, y se adapta el contenido, el tono y la identidad a la marca. El criterio de qué se toma y qué se cambia está documentado en el propio repositorio.',
      },
      {
        q: '¿Puedo reutilizar los carruseles de ejemplo que trae?',
        a: 'No. La licencia MIT cubre el código, las instrucciones y la plantilla de marca. El material de cada marca en la carpeta marcas/, con sus fotos, textos y carruseles producidos, pertenece a esa marca y está en el repositorio solo como ejemplo de uso.',
      },
    ],
  },

  'vertical-video-kit': {
    title: 'Vertical Video Kit',
    kind: 'Kit de video por código',
    accent: '#7C5CFF',
    hook: 'TikToks, Reels y Shorts por código: voz natural, subtítulos palabra por palabra y render real.',
    description:
      'Kit de código abierto para hacer TikToks, Reels y Shorts por código: narración con IA que no suena a robot, subtítulos palabra por palabra y un render real en 1080×1920 con Remotion.',
    tags: ['Remotion', 'Whisper', 'FFmpeg', 'Text-to-Speech'],
    cover: '/img/recursos/vertical-video-kit.png',
    coverAlt:
      'Tres escenas verticales renderizadas con el kit: un gancho en tipografía grande, una lista numerada de tres puntos y una cifra de 80% en verde, con subtítulos resaltados palabra por palabra.',

    metaTitle: 'Vertical Video Kit: Reels y TikToks hechos con código',
    metaDescription:
      'Kit gratis y de código abierto para crear TikToks, Reels y Shorts con código: voz con IA, subtítulos palabra por palabra y render 1080×1920 con Remotion.',
    h1: 'Videos verticales que se corrigen editando una línea, no una línea de tiempo',
    keywords: [
      'crear reels con código',
      'remotion tiktok plantilla',
      'subtítulos automáticos palabra por palabra',
      'video vertical con ia gratis',
    ],

    intent: {
      type: 'informacional',
      query: 'cómo hacer reels y tiktoks con código gratis',
      audience:
        'Quien produce video corto con frecuencia y está cansado de rehacer a mano cada corrección en un editor.',
      problem:
        'En una línea de tiempo cada corrección es un rehacer manual, así que las correcciones no se hacen y los videos salen con errores.',
      outcome:
        'Un proyecto donde el contenido vive aparte del diseño: cambias el texto, corres un script y voz, escenas y subtítulos se vuelven a sincronizar.',
    },

    tldr: [
      'Kit de código abierto con licencia MIT para producir TikToks, Reels y Shorts en 1080×1920 con Remotion.',
      'La locución se normaliza para el oído antes de llegar a la voz; los motores por defecto son gratis y se puede clonar voz de forma local.',
      'Los subtítulos se generan del audio realmente renderizado, así que el resaltado cae sobre la palabra que se está diciendo.',
      'Un solo comando lo instala todo y abre la vista previa en vivo; hay un asistente de cinco preguntas que no necesita ninguna IA.',
      'Se instala también como skill para Claude Code, Codex, Cursor, Gemini CLI y más de 75 agentes.',
    ],

    lead:
      'Editar un video corto en una línea de tiempo tiene un problema escondido: cada corrección es rehacer a mano. Entonces las correcciones no se hacen. Armé este kit para que el contenido viva aparte del diseño: cambiar una línea de la narración es editar una línea y volver a correr un script, y la voz, la duración de las escenas, la animación y los subtítulos se ajustan solos.',

    sections: [
      {
        h2: 'Los tres problemas que resuelve',
        list: {
          variant: 'check',
          items: [
            'Voz que suena a voz sintética: cada línea se normaliza para el oído antes de llegar al motor, con siglas deletreadas, símbolos expandidos y pausas reales.',
            'Subtítulos puestos al final: se generan del audio que realmente se renderizó, y el diseño les reserva su franja desde el principio.',
            'Texto debajo de la interfaz de la plataforma: la plantilla sabe qué zonas tapan TikTok e Instagram, y se puede encender una capa para verlas.',
          ],
        },
      },
      {
        h2: 'Qué trae el kit',
        table: {
          caption: 'Las piezas del kit y qué hace cada una',
          head: ['Pieza', 'Qué hace'],
          rows: [
            ['vertical-video', 'Guion, voz, subtítulos y render: la skill principal'],
            ['clip-cutter', 'Convierte un video horizontal largo en clips verticales con subtítulos quemados'],
            ['footage-edit', 'Une tomas de celular en un solo video: enderezado, estabilizado, zoom lento, color y fundidos'],
            ['reference-research', 'Desarma un video que funciona y reutiliza su estructura'],
            ['remotion-vertical', 'La plantilla de proyecto en 9:16 que usa cada video nuevo'],
          ],
        },
        subsections: [
          {
            h3: 'Motores de voz',
            body: [
              'Se elige uno por proyecto y todos comparten la misma interfaz. Edge es gratis y no necesita cuenta; VoiceStudio también es gratis, suena mejor y clona voces en local; OpenAI y ElevenLabs son de pago. Para español conviene usar el acento del país de la audiencia: un video para Colombia narrado con acento de España distrae más de lo que uno esperaría.',
            ],
          },
        ],
      },
      {
        h2: 'Cómo empezar sin pagar una IA',
        body: [
          'No hace falta ninguna suscripción. El kit es Python y Node: los agentes lo hacen más rápido, pero cada script corre solo desde una terminal. El comando de instalación deja Node, FFmpeg y los paquetes de Python listos, crea el primer proyecto y abre el visualizador de Remotion en el navegador.',
        ],
        list: {
          variant: 'ol',
          items: [
            'Clona el repositorio y entra a la carpeta.',
            'Corre python install.py: instala lo que falte y abre la vista previa en vivo.',
            'Corre el asistente, responde cinco preguntas y sale un MP4 terminado.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Necesito pagar una IA para usarlo?',
        a: 'No. Hay un asistente que hace cinco preguntas y entrega el video sin usar ninguna IA, y los textos también se pueden escribir a mano o pedir a cualquier chat gratuito con los prompts que trae el kit. Un agente como Claude Code o Codex lo hace más cómodo, pero es opcional.',
      },
      {
        q: '¿Remotion es gratis para uso comercial?',
        a: 'Remotion es gratis para personas y equipos pequeños, pero pide licencia de empresa por encima de cierto tamaño. El resto de las piezas del kit son gratuitas. Si lo vas a usar en una empresa grande, revisa la licencia de Remotion antes de producir.',
      },
    ],
  },
}
