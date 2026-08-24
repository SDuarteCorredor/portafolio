// Casos de estudio — cluster /trabajo/. Ver SCHEMA.md para el contrato de datos.
//
// REGLA DE ESTE ARCHIVO: los únicos datos duros que aparecen aquí son los que
// existen en src/data.js (+278% Bio Laboratorios, +120% Nona Gastrobar, 24+
// marcas, +6 años, +30 piezas, equipo de 5, años y descripciones de cada
// proyecto). Todo lo demás es método y criterio profesional, no cifras.
//
// Campos EXTRA sobre el schema base (los consume la plantilla de caso):
//   caseMeta: { client, year, role, scope[], headline, externalUrl, externalLabel }

export const trabajo = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. Lumi
  // ──────────────────────────────────────────────────────────────────────────
  {
    path: '/trabajo/lumi/',
    cluster: 'trabajo',
    parent: '/trabajo/',
    navLabel: 'Lumi',

    metaTitle: 'Lumi, app de bienestar emocional con IA | Caso',
    metaDescription:
      'Lumi es mi producto propio: chat con IA en tiempo real, detección de crisis y journey gamificado. React 19, Supabase y Claude, de la idea al deploy en vivo.',
    h1: 'De la idea al deploy: cómo construí Lumi con React, Supabase y Claude',
    keywords: [
      'producto digital con ia',
      'app de bienestar emocional',
      'mvp con inteligencia artificial',
      'react supabase claude',
      'construir producto con ia bogotá',
    ],

    caseMeta: {
      client: 'Producto propio',
      year: '2026',
      role: 'Idea, diseño de producto, desarrollo y deploy. Todo el proyecto, de punta a punta.',
      scope: ['Producto', 'IA aplicada', 'Diseño de producto', 'Desarrollo front', 'Deploy'],
      headline: 'De la idea al deploy, con el MVP en vivo',
      externalUrl: 'https://lumi-mvp-one.vercel.app',
      externalLabel: 'Ver Lumi en vivo',
    },

    intent: {
      type: 'informacional',
      query: 'cómo construir una app con inteligencia artificial',
      audience:
        'Fundadores y equipos de marketing que tienen una idea de producto con IA y no saben si se puede llevar a algo real y publicado.',
      problem:
        'La distancia entre un prototipo bonito en Figma y una aplicación desplegada, con base de datos, sesión de usuario y un modelo respondiendo de verdad.',
      outcome:
        'Ver cómo se recorta el alcance de un MVP con IA, qué stack lo sostiene y qué decisiones hay que tomar antes de escribir la primera línea.',
    },

    tldr: [
      'Lumi es producto propio: no hubo cliente, ni brief, ni presupuesto de pauta. Fue el proyecto donde comprobé que puedo llevar una idea de IA hasta un deploy público.',
      'Está armado con React 19 en el front, Supabase como base de datos y sesión, y Claude como motor de conversación.',
      'Tiene tres piezas: chat en tiempo real, detección de crisis y un journey gamificado que le da continuidad al uso.',
      'La decisión más difícil no fue técnica sino de criterio: qué hace la app cuando aparece una señal de riesgo. La respuesta fue sacar la conversación del chat, no resolverla dentro.',
      'El MVP está publicado y cualquiera puede abrirlo. No es un prototipo clickeable: es una aplicación desplegada.',
    ],

    lead:
      'Llevo más de seis años trabajando marketing y diseño, y durante buena parte de ese tiempo opiné sobre producto sin haber construido uno. Lumi nació justamente de esa incomodidad: quería saber si podía cerrar el ciclo completo, de la idea al deploy, sin delegar la parte que no dominaba. Elegí un tema difícil a propósito, bienestar emocional, porque obliga a tomar decisiones de criterio y no solo de interfaz. Lo que sigue es el recorrido real del proyecto: qué decidí construir, qué dejé por fuera y qué aprendí en el camino.',
    ctaInline: { label: 'Cuéntame qué producto tienes en la cabeza', href: 'whatsapp' },

    sections: [
      {
        h2: 'El punto de partida: una idea que no se podía quedar en Figma',
        body: [
          'Vengo de diseñar y de vender, no de programar. Eso significa que durante años entregué conceptos de producto que alguien más tenía que traducir a código, y en esa traducción se perdían justo las decisiones que importaban: qué pasa cuando falla, qué se guarda, qué se muestra primero.',
          'Lumi empezó como la prueba de que ese hueco se podía cerrar. No había cliente que pagara, así que tampoco había excusa: si el proyecto no llegaba a producción, no había a quién echarle la culpa.',
        ],
        list: {
          variant: 'ul',
          title: 'Las tres reglas que me puse antes de empezar',
          items: [
            'Tenía que quedar publicado en una URL que cualquiera pudiera abrir, no en un demo local.',
            'Tenía que resolver una conversación real con un modelo, no simular respuestas escritas de antemano.',
            'Si aparecía un tema sensible, la app tenía que tener una respuesta pensada de antemano, no improvisada por el modelo.',
          ],
        },
      },
      {
        h2: 'Qué decidí hacer: un MVP con el alcance recortado a propósito',
        body: [
          'La tentación en un producto con IA es meter todo lo que el modelo puede hacer. Ahí es donde mueren los MVP: en la lista de funcionalidades que nadie pidió. Recorté el alcance a lo mínimo que hacía la aplicación defendible, y dejé el resto anotado para después.',
        ],
        list: {
          variant: 'ol',
          title: 'El orden en el que tomé las decisiones',
          items: [
            'Primero el criterio: qué debe hacer la app frente a una señal de riesgo. Eso condiciona todo lo demás, incluso el tono de la interfaz.',
            'Después la conversación: cómo se siente hablar con Lumi y qué tan rápido responde, porque una conversación lenta no se siente como conversación.',
            'Luego la continuidad: sin una razón para volver, un chat de bienestar se usa una vez. De ahí salió el journey gamificado.',
            'Al final la infraestructura: base de datos, sesión y deploy. Es la parte que más se nombra y la que menos define si el producto sirve.',
          ],
        },
        subsections: [
          {
            h3: 'Lo que entró en el MVP',
            list: {
              variant: 'check',
              items: [
                'Chat con IA en tiempo real, con la respuesta apareciendo mientras se genera en lugar de un bloque que llega al final.',
                'Detección de crisis: señales que cambian el flujo de la conversación en vez de dejarla correr.',
                'Journey gamificado que le da progresión al uso y una razón concreta para volver al día siguiente.',
                'Sesión persistente, para que la conversación siga siendo la misma cuando el usuario vuelve.',
              ],
            },
          },
          {
            h3: 'Lo que dejé fuera, y por qué',
            body: [
              'Nada de esto se descartó por difícil. Se descartó porque no cambiaba la respuesta a la única pregunta que tenía el MVP: ¿esto se siente útil la primera vez que lo abro?',
            ],
            list: {
              variant: 'ul',
              items: [
                'Cuentas con perfil completo y edición: agregan fricción antes de que la persona vea el valor.',
                'Panel de métricas para el usuario: es la funcionalidad que suena bien en la demo y nadie abre dos veces.',
                'App nativa: en un MVP, la web hace el mismo trabajo y se publica el mismo día.',
                'Integraciones con calendario o recordatorios externos: dependen de que el hábito ya exista.',
              ],
            },
          },
        ],
      },
      {
        h2: 'Cómo se ejecutó: el stack, capa por capa',
        body: [
          'El stack se eligió por una razón simple: quería la menor cantidad de piezas posible entre la idea y algo publicado. Cada herramienta que se suma es una que hay que mantener, así que la pregunta en cada capa fue cuál es lo mínimo que resuelve esto bien.',
        ],
        table: {
          caption: 'Stack de Lumi por capa y por qué se eligió cada pieza',
          head: ['Capa', 'Herramienta', 'Por qué esa'],
          rows: [
            ['Interfaz', 'React 19', 'Componentes y estado sin traer un framework completo encima para un MVP de una sola vista principal.'],
            ['Conversación', 'Claude', 'El producto trata temas sensibles: pesaba más el manejo del tono que la velocidad bruta.'],
            ['Datos y sesión', 'Supabase', 'Base de datos y autenticación en una sola pieza, sin montar un backend propio para el MVP.'],
            ['Publicación', 'Vercel', 'Deploy continuo desde el repositorio: cada cambio queda en línea sin ritual de despliegue.'],
          ],
        },
        subsections: [
          {
            h3: 'La conversación en tiempo real',
            body: [
              'Una respuesta que aparece completa después de varios segundos se siente como un formulario. Una que se va escribiendo se siente como una conversación. Es la misma latencia, pero la percepción cambia por completo, y en un producto de acompañamiento esa percepción es el producto.',
            ],
          },
          {
            h3: 'La decisión más delicada: la detección de crisis',
            body: [
              'Este fue el punto donde tuve que decidir qué tipo de producto estaba construyendo. Un chat de bienestar puede intentar sostener cualquier conversación, o puede reconocer cuándo la conversación lo excede. Elegí lo segundo: la detección de crisis existe para cambiar el flujo cuando aparecen señales de riesgo, no para que el modelo se haga cargo de algo que no le corresponde.',
              'Lumi acompaña, no reemplaza atención profesional, y el producto tiene que decirlo con los hechos, no solo con un aviso legal en el pie.',
            ],
          },
        ],
      },
      {
        h2: 'Qué resultó: un MVP publicado, no un prototipo',
        body: [
          'El resultado del proyecto es verificable y por eso lo dejo con enlace: hay una URL pública, con la aplicación desplegada, funcionando con las tres piezas que definí al principio. No hay cifras de uso que mostrar y no voy a inventarlas: Lumi es un producto propio en fase de MVP, y el resultado que reclamo es exactamente ese, haber cerrado el ciclo completo.',
        ],
        list: {
          variant: 'check',
          title: 'Lo que quedó en pie',
          items: [
            'Aplicación desplegada y accesible desde cualquier navegador.',
            'Conversación con IA respondiendo en tiempo real sobre datos y sesión reales.',
            'Criterio de manejo de señales de riesgo definido antes de escribir la funcionalidad, no después de un incidente.',
            'Un stack que puedo explicar, mantener y volver a usar en el próximo proyecto.',
          ],
        },
      },
      {
        h2: 'Qué me llevé',
        body: [
          'Lumi cambió la forma en que trabajo con clientes que quieren producto. Ya no discuto funcionalidades en abstracto: puedo decir cuánto pesa cada decisión porque la tomé y la sostuve.',
        ],
        list: {
          variant: 'ul',
          items: [
            'El criterio se define antes que la interfaz. Si no sabes qué hace el producto en su peor momento, la pantalla bonita no te va a salvar.',
            'En un producto con IA, el modelo es la parte fácil. Lo difícil es decidir qué NO debe hacer.',
            'Recortar alcance es una habilidad de negocio, no de ingeniería: cada funcionalidad que no entra es tiempo que sí llega al deploy.',
            'Construir el producto propio me dio el vocabulario para trabajar mejor con equipos técnicos en proyectos de cliente.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Cuánto toma llevar un MVP con IA de la idea al deploy?',
        a: 'No te voy a dar el número de Lumi como si fuera un estándar, porque fue un producto propio que avanzó por rachas, entre proyectos de cliente. Lo que sí aplica a cualquier caso es el orden: cuando el alcance está recortado de verdad y las decisiones de criterio se toman antes de programar, el trabajo se mide en semanas, no en trimestres. Lo que estira los proyectos casi nunca es el código, es la indefinición.',
      },
      {
        q: '¿Se puede hacer algo así para mi negocio sin un equipo técnico grande?',
        a: 'Sí, si el alcance es honesto. Herramientas como Supabase y los modelos por API quitaron del camino buena parte de lo que antes obligaba a montar un equipo. Lo que no se puede recortar es la definición del producto: qué resuelve, para quién y qué pasa cuando falla. Esa parte no la hace el stack.',
      },
      {
        q: '¿Por qué Claude y no otro modelo?',
        a: 'Por el tipo de conversación que tiene Lumi. En un producto de bienestar emocional pesa más cómo maneja un tema delicado que qué tan rápido escribe. En otros proyectos la decisión puede ser distinta: si lo que necesitas es clasificar tickets o resumir texto, los criterios cambian y conviene comparar antes de casarse con uno.',
      },
      {
        q: '¿Cuánto cuesta mantener una aplicación con IA?',
        a: 'El costo tiene dos partes: la infraestructura, que en un MVP es baja y bastante predecible, y el consumo del modelo, que sube con el uso. Por eso conviene estimar el costo por conversación desde el principio: es lo que te dice si el producto tiene modelo de negocio o solo tiene demo.',
      },
      {
        q: '¿Lumi reemplaza terapia o atención profesional?',
        a: 'No, y el producto está diseñado para no pretenderlo. La detección de crisis existe precisamente para reconocer cuándo una conversación excede lo que una app puede acompañar. Es una decisión de producto, no un descargo de responsabilidad.',
      },
    ],

    related: [
      { path: '/servicios/producto-ia/', label: 'Producto digital con IA', note: 'El servicio detrás de este caso: cómo trabajo un producto con IA para un cliente.' },
      { path: '/perfil/', label: 'Sobre mí', note: 'De dónde sale el híbrido raro entre marketing, diseño y código.' },
      { path: '/trabajo/asignar/', label: 'Caso Asignar', note: 'El otro proyecto que sigue en curso: campañas y funnels de performance.' },
      { path: '/contacto/', label: 'Contacto', note: 'Si tienes una idea de producto y quieres saber si se sostiene, hablemos.' },
    ],

    image: {
      src: '/og/lumi-app-bienestar-emocional-ia.png',
      alt: 'Pantalla del chat de Lumi, la app de bienestar emocional con IA construida por Iván Santiago Duarte con React, Supabase y Claude',
      width: 1200,
      height: 630,
    },

    schemaType: 'CreativeWork',
    updated: '2026-08-24',
    priority: 0.8,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Bio Laboratorios
  // ──────────────────────────────────────────────────────────────────────────
  {
    path: '/trabajo/bio-laboratorios/',
    cluster: 'trabajo',
    parent: '/trabajo/',
    navLabel: 'Bio Laboratorios',

    metaTitle: 'Bio Laboratorios: +278% en ventas | Caso completo',
    metaDescription:
      'Rediseño de marca, tienda online y SEO/SEM para Bio Laboratorios: el caso que acompañó un crecimiento de +278% en ventas. Te cuento el orden que seguí.',
    h1: 'La marca no vendía sola: qué cambié en Bio Laboratorios',
    keywords: [
      'cómo aumentar las ventas de un laboratorio',
      'caso de éxito ecommerce colombia',
      'rediseño de marca y tienda online',
      'seo y sem para laboratorio',
      'estrategia digital laboratorio bogotá',
    ],

    caseMeta: {
      client: 'Bio Laboratorios',
      // src/data.js no registra el año de este proyecto y no lo invento:
      // en null, la plantilla omite la fila y el JSON-LD no emite dateCreated.
      year: null,
      role: 'Rediseño de marca, montaje y optimización del e-commerce, y estrategia de SEO y SEM.',
      scope: ['Branding', 'E-commerce', 'SEO', 'SEM', 'Analítica'],
      headline: '+278% en ventas',
      externalUrl: null,
      externalLabel: null,
    },

    intent: {
      type: 'comercial',
      query: 'cómo aumentar las ventas de un laboratorio',
      audience:
        'Negocios con producto sólido y presencia digital desordenada, que ya intentaron vender en línea sin que la marca, la tienda y la pauta se hablaran entre sí.',
      problem:
        'Invertir en tráfico hacia una tienda que no convierte, con una marca que no sostiene el precio ni la confianza que la categoría exige.',
      outcome:
        'El orden concreto en el que trabajé los tres frentes y por qué ese orden es lo que hace la diferencia entre gastar y crecer.',
    },

    tldr: [
      'El proyecto acompañó un crecimiento de +278% en ventas, el número más grande de mi portafolio.',
      'Eran tres frentes al tiempo: rediseño de marca, e-commerce y adquisición con SEO/SEM. No los trabajé en paralelo: los trabajé en orden.',
      'La regla que ordenó todo: no se paga tráfico hacia una tienda que todavía no convierte. Primero la casa, después las visitas.',
      'En una categoría de salud y bienestar, la marca hace un trabajo comercial concreto: sostiene la confianza que permite cobrar el precio.',
      'SEO y SEM se trabajaron juntos, no como equipos rivales: lo pago compra tiempo mientras lo orgánico se construye.',
    ],

    lead:
      'Cuando a alguien lo contratan al tiempo para rediseñar la marca, montar la tienda y trabajar SEO y SEM, el alcance ya está diciendo dónde está el problema: ninguna de las tres piezas está sosteniendo a las otras. La marca no genera confianza suficiente para el precio, la tienda pierde a la gente en el camino, y la inversión en tráfico termina pagando por visitas que se caen. Bio Laboratorios es el caso donde ese desorden se enderezó en un orden específico, y donde ese trabajo acompañó un crecimiento de +278% en ventas. Este es el recorrido, sin adornos.',
    ctaInline: { label: 'Cuéntame en qué punto está tu marca', href: 'whatsapp' },

    sections: [
      {
        h2: 'El punto de partida: tres arreglos pendientes al mismo tiempo',
        body: [
          'Un alcance que incluye marca, tienda y adquisición no aparece por capricho. Aparece cuando el negocio ya intentó resolver el problema por partes y ninguna parte funcionó sola: se cambió el logo y no subieron las ventas, se abrió la tienda y no llegó nadie, se puso pauta y el tráfico rebotó.',
          'Antes de proponer nada, lo primero es entender cuál de las tres piezas está frenando a las otras dos. Casi siempre hay una que es el cuello de botella, y trabajar las otras dos primero es la forma más rápida de gastar plata sin mover el número.',
        ],
        subsections: [
          {
            h3: 'Las preguntas con las que leo un punto de partida así',
            list: {
              variant: 'ul',
              items: [
                '¿Cuánto vale un cliente y cuánto margen deja? Sin eso, cualquier objetivo de costo por venta es un número inventado.',
                '¿La gente llega y no compra, o directamente no llega? Son dos problemas distintos y se arreglan en momentos distintos.',
                '¿La marca aguanta el precio que se está cobrando, o el descuento es lo único que sostiene la venta?',
                '¿Qué se está midiendo hoy, y ese dato tiene algo que ver con el dinero que entra?',
              ],
            },
          },
        ],
      },
      {
        h2: 'Qué decidimos hacer: un orden, no tres proyectos en paralelo',
        body: [
          'La decisión que ordenó el proyecto fue negarme a arrancar los tres frentes al tiempo. Trabajar en paralelo suena eficiente y casi nunca lo es: si la tienda cambia mientras corre la pauta, no sabes qué produjo el cambio en las ventas, y terminas optimizando a ciegas.',
        ],
        list: {
          variant: 'ol',
          title: 'El orden que seguimos',
          items: [
            'Marca primero: identidad, tono y reglas de comunicación, porque todo lo demás se construye encima y rehacerlo después cuesta el doble.',
            'Tienda después: fichas de producto, flujo de compra y todo lo que se puede arreglar antes de que llegue un solo visitante pago.',
            'Medición antes de invertir: si las conversiones no están bien configuradas, la pauta no se optimiza, se adivina.',
            'Adquisición al final: SEO para construir el activo que no se apaga, SEM para comprar el tiempo que el SEO todavía no da.',
          ],
        },
        subsections: [
          {
            h3: 'Por qué la marca fue primero y no al final',
            body: [
              'En categorías de salud y bienestar la confianza no es un adorno, es el permiso para cobrar. Una marca que se ve improvisada obliga a competir por precio, y competir por precio en una categoría con costos de producto reales es una carrera que se pierde.',
              'El rediseño no fue un ejercicio estético: fue definir cómo se ve y cómo habla un producto que la gente se va a meter al cuerpo. Eso condiciona la ficha de producto, el anuncio y hasta el tipo de búsqueda a la que tiene sentido responder.',
            ],
          },
          {
            h3: 'Por qué SEO y SEM no compitieron entre sí',
            body: [
              'Los veo como una sola operación con dos velocidades. Lo pago trae demanda hoy y, sobre todo, trae datos: en pocas semanas sabes qué términos convierten de verdad. Ese aprendizaje es el que le dice al SEO qué contenido construir, en vez de escribir a ciegas y esperar seis meses para descubrir que el tema no vendía.',
            ],
          },
        ],
      },
      {
        h2: 'Cómo se ejecutó: los tres frentes y qué desbloqueaba cada uno',
        body: [
          'Esta es la lectura corta del proyecto: qué se hizo en cada frente y, más importante, qué habilitaba ese trabajo para el frente siguiente. Ningún entregable existe por sí solo.',
        ],
        table: {
          caption: 'Frentes del proyecto, trabajo realizado y qué habilitaba cada uno',
          head: ['Frente', 'Qué se trabajó', 'Qué desbloqueaba'],
          rows: [
            ['Marca', 'Rediseño de identidad, tono y reglas de aplicación', 'Poder sostener el precio sin depender del descuento'],
            ['E-commerce', 'Fichas de producto, flujo de compra y presentación del catálogo', 'Que el tráfico que llega tenga a dónde aterrizar sin fugarse'],
            ['Medición', 'Configuración de conversiones y lectura de datos de negocio', 'Optimizar con hechos en vez de con impresiones y clics'],
            ['SEM', 'Campañas por intención de búsqueda y limpieza de desperdicio', 'Ventas ya, y datos de qué términos convierten'],
            ['SEO', 'Contenido y estructura sobre los términos que la pauta validó', 'Tráfico que no se apaga cuando se pausa el presupuesto'],
          ],
        },
      },
      {
        h2: 'Qué resultó: +278% en ventas',
        body: [
          'El resultado del proyecto es un crecimiento de +278% en ventas. Vale la pena decir con precisión qué significa ese número: es el crecimiento del negocio durante el periodo en que se hizo este trabajo, con los tres frentes operando juntos. No es el mérito de una campaña ni de un rediseño aislado, y quien te venda un porcentaje así atribuido a una sola táctica te está vendiendo humo.',
          'Lo que sí puedo afirmar es cuál fue la palanca: dejar de tratar marca, tienda y pauta como tres proyectos distintos con tres responsables distintos.',
        ],
        list: {
          variant: 'check',
          title: 'Lo que quedó funcionando después del proyecto',
          items: [
            'Una identidad con reglas claras, que cualquiera puede aplicar sin volver a preguntar.',
            'Una tienda donde el flujo de compra no pelea contra el usuario.',
            'Conversiones bien configuradas: la base para que cualquier inversión futura se pueda evaluar.',
            'Campañas ordenadas por intención de búsqueda, separando marca, genéricas y competencia.',
            'Contenido orgánico construido sobre términos que ya habían demostrado que convierten.',
          ],
        },
      },
      {
        h2: 'Qué me llevé',
        body: [
          'Este es el caso que más cambió mi forma de cotizar y de ordenar proyectos. Antes aceptaba arrancar por donde el cliente tenía más afán; hoy la secuencia es parte de la propuesta y la discuto antes de firmar.',
        ],
        list: {
          variant: 'ul',
          items: [
            'El orden vale más que la velocidad. Arrancar por el frente equivocado no retrasa el proyecto: lo encarece.',
            'El branding sin objetivo comercial es decoración; con objetivo comercial es la palanca de precio más barata que existe.',
            'La medición no es una fase técnica que se puede posponer. Es lo que separa optimizar de adivinar.',
            'Un número grande siempre tiene varias causas. Contarlo con honestidad genera más confianza que atribuírselo a una sola táctica.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Esto aplica a mi categoría o solo funciona en salud y bienestar?',
        a: 'El orden aplica a cualquier negocio que venda en línea: marca, tienda, medición y después adquisición. Lo que cambia por categoría es el peso de cada pieza. En salud y bienestar la marca pesa más porque la confianza habilita el precio; en categorías de comparación pura, como electrónica, pesan más la ficha de producto y la logística.',
      },
      {
        q: '¿Cuánto tiempo toma un proyecto con este alcance?',
        a: 'Depende del estado de cada frente, y prefiero no darte un cronograma inventado. Lo que sí es constante: la marca y la tienda son trabajo de semanas con un final claro, mientras que SEO y SEM son trabajo continuo que se evalúa mes a mes. Si alguien te promete el resultado completo en treinta días, está prometiendo la firma del contrato, no el resultado.',
      },
      {
        q: '¿El crecimiento fue solo por la pauta?',
        a: 'No, y sería deshonesto decirlo. La pauta trae tráfico, pero el tráfico no compra si la tienda pierde a la gente en el camino y la marca no sostiene el precio. Lo que hizo el trabajo fue quitar los frenos en el mismo periodo en que se abrió la llave del tráfico. Por eso insisto tanto en el orden.',
      },
      {
        q: '¿Qué necesito de mi lado para replicar algo así?',
        a: 'Tres cosas: acceso real a la tienda y a las cuentas de medición, claridad sobre tu margen y tu ticket promedio, y capacidad de decidir. La primera y la segunda son datos; la tercera es la que suele frenar los proyectos, porque el orden implica no arrancar por donde hay más afán.',
      },
      {
        q: '¿Sirve si vendo por distribuidores y no tengo tienda propia?',
        a: 'Sirve la parte de marca y la de demanda, pero cambia el objetivo. Sin tienda propia, la adquisición no se mide en ventas directas sino en demanda que llega a tus canales: búsquedas de marca, contactos y pedidos al distribuidor. Es medible, pero hay que definir bien qué cuenta como conversión antes de invertir un peso.',
      },
    ],

    related: [
      { path: '/servicios/seo-sem/', label: 'SEO y SEM', note: 'Los dos motores de adquisición que se trabajaron juntos en este caso.' },
      { path: '/servicios/ecommerce/', label: 'E-commerce', note: 'Cómo dejo una tienda lista antes de mandarle tráfico pago.' },
      { path: '/servicios/branding/', label: 'Branding y diseño', note: 'La pieza que va primero: la marca que sostiene el precio.' },
      { path: '/trabajo/limonada-pink/', label: 'Caso Limonada Pink', note: 'El mismo orden aplicado a una marca de bebidas que arrancaba con brand book.' },
    ],

    image: {
      src: '/og/bio-laboratorios-ecommerce-seo-caso.png',
      alt: 'Tienda online de Bio Laboratorios tras el rediseño de marca, proyecto de e-commerce y SEO/SEM de Iván Santiago Duarte',
      width: 1200,
      height: 630,
    },

    schemaType: 'CreativeWork',
    updated: '2026-08-24',
    priority: 0.8,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. BLU Smartphones
  // ──────────────────────────────────────────────────────────────────────────
  {
    path: '/trabajo/blu-smartphones/',
    cluster: 'trabajo',
    parent: '/trabajo/',
    navLabel: 'BLU Smartphones',

    metaTitle: 'BLU Smartphones: e-commerce y branding end-to-end',
    metaDescription:
      'Proyecto integral para BLU Smartphones: identidad, tienda online, contenido y analítica trabajados como una sola pieza. El caso completo está en Behance.',
    h1: 'Cuando la marca, la tienda y la medición se arman juntas',
    keywords: [
      'proyecto ecommerce end to end',
      'branding y ecommerce smartphones',
      'ficha de producto que vende',
      'analítica para tienda online',
      'caso ecommerce electrónica',
    ],

    caseMeta: {
      client: 'BLU Smartphones',
      year: '2025',
      role: 'Proyecto integral: identidad, e-commerce, contenido y analítica, de punta a punta.',
      scope: ['Branding', 'E-commerce', 'Contenido', 'Analítica'],
      headline: 'Proyecto end-to-end: marca, tienda, contenido y medición',
      externalUrl: 'https://www.behance.net/gallery/235221393/Blu-Smartphones-End-to-End-Project',
      externalLabel: 'Ver en Behance',
    },

    intent: {
      type: 'comercial',
      query: 'proyecto de ecommerce y branding de punta a punta',
      audience:
        'Marcas de producto que tienen la identidad por un lado, la tienda por otro y la medición en ninguno, y quieren que las tres cosas hablen el mismo idioma.',
      problem:
        'Proyectos partidos entre proveedores distintos, donde el diseño no conoce la ficha de producto y la analítica llega cuando ya no se puede cambiar nada.',
      outcome:
        'Ver cómo se ordena un proyecto integral y qué se gana cuando marca, tienda, contenido y datos los trabaja la misma cabeza.',
    },

    tldr: [
      'Proyecto integral de 2025: identidad, e-commerce, contenido y analítica para la marca de smartphones, trabajados como un solo encargo.',
      'La ventaja de un proyecto end-to-end no es el precio: es que nadie puede echarle la culpa al eslabón anterior.',
      'En electrónica la decisión de compra se toma comparando especificaciones, así que la ficha de producto es la pieza que más pesa.',
      'La medición se definió al principio del proyecto, no al final: qué se considera conversión se decide antes de construir la tienda.',
      'El caso está documentado y publicado en Behance, con las piezas visibles.',
    ],

    lead:
      'La mayoría de los proyectos digitales llegan partidos: una agencia hizo la marca, un freelance montó la tienda, alguien más escribe el contenido y la analítica la instaló un desarrollador que ya no responde. Cada pieza está bien por separado y el conjunto no funciona. BLU Smartphones fue lo contrario: un proyecto de punta a punta donde identidad, e-commerce, contenido y analítica se decidieron juntos. Este es el mapa de cómo se ordenó y qué cambia cuando el proyecto no está partido.',
    ctaInline: { label: 'Escríbeme si tu proyecto está partido en pedazos', href: 'whatsapp' },

    sections: [
      {
        h2: 'El punto de partida: cuatro frentes que suelen ir por separado',
        body: [
          'Identidad, tienda, contenido y analítica son cuatro trabajos distintos, con perfiles distintos, y por eso casi siempre se contratan por separado. El problema aparece en las costuras: el manual de marca no dice cómo se ve una ficha de producto, el contenido se escribe sin saber qué busca la gente, y la analítica se instala cuando la tienda ya está hecha y no se puede cambiar lo que se mide.',
          'Tomar los cuatro frentes en un mismo encargo tiene una ventaja concreta: las decisiones se pueden tomar en el orden correcto en lugar de en el orden en que se firmaron los contratos.',
        ],
        list: {
          variant: 'ul',
          title: 'Las costuras donde se rompen los proyectos partidos',
          items: [
            'La marca se entrega sin reglas para el entorno digital, y la tienda termina inventando su propio estilo.',
            'El contenido se produce sin saber qué términos de búsqueda importan para la categoría.',
            'La tienda se construye antes de definir qué es una conversión, y después medir bien implica rehacer.',
            'Nadie es responsable del resultado completo: cada proveedor entregó lo suyo y el número no se movió.',
          ],
        },
      },
      {
        h2: 'Qué decidimos hacer: una sola línea desde la marca hasta la ficha de producto',
        body: [
          'La decisión de fondo fue tratar el proyecto como una sola cadena. La identidad no terminaba en un manual: terminaba en cómo se ve un producto listado junto a otros seis y por qué alguien elige ese. En electrónica la gente compara especificaciones, precio y garantía, y compara en pestañas abiertas al tiempo. Diseñar sin asumir esa comparación es diseñar para un usuario que no existe.',
        ],
        subsections: [
          {
            h3: 'La ficha de producto como pieza central',
            body: [
              'En una tienda de smartphones, la ficha de producto no es una página más: es donde se gana o se pierde la venta. Ahí conviven la parte emocional de la marca y la parte fría de la comparación, y ambas tienen que caber sin estorbarse.',
            ],
            list: {
              variant: 'check',
              items: [
                'Especificaciones legibles y comparables, no un bloque de texto que hay que descifrar.',
                'Fotografía consistente entre productos, para que la comparación sea justa dentro del propio catálogo.',
                'Las dudas que frenan la compra resueltas en la misma página: garantía, compatibilidad, qué trae la caja.',
                'Jerarquía clara entre lo que diferencia al producto y lo que solo lo describe.',
              ],
            },
          },
          {
            h3: 'La medición se define antes, no después',
            body: [
              'Antes de construir, definimos qué cuenta como conversión y qué eventos hay que registrar en el camino. Trabajo la analítica con GA4 y Looker Studio, y esa decisión temprana es lo que evita el escenario clásico: una tienda en línea que vende y un reporte que no puede explicar por qué.',
            ],
          },
        ],
      },
      {
        h2: 'Cómo se ejecutó: el mapa del proyecto',
        body: [
          'Cada frente tuvo un entregable propio, pero todos respondían a la misma pregunta: qué necesita alguien que está comparando smartphones para decidirse aquí y no en otra pestaña.',
        ],
        table: {
          caption: 'Frentes del proyecto BLU Smartphones y decisión de fondo en cada uno',
          head: ['Frente', 'Entregable', 'Decisión de fondo'],
          rows: [
            ['Identidad', 'Sistema visual aplicado al entorno digital', 'Que la marca funcione en pantalla pequeña, no solo en presentación'],
            ['E-commerce', 'Tienda y arquitectura de catálogo', 'Diseñar para comparación, no para navegación curiosa'],
            ['Contenido', 'Fichas y piezas de comunicación', 'Responder dudas de compra antes de que se conviertan en abandono'],
            ['Analítica', 'Definición de conversiones y tablero de lectura', 'Decidir qué se mide antes de construir lo que se mide'],
          ],
        },
        subsections: [
          {
            h3: 'Qué gana el proyecto cuando no está partido',
            list: {
              variant: 'ol',
              items: [
                'Las decisiones se toman una sola vez y bajan a todas las piezas al tiempo.',
                'No hay traducción intermedia entre lo que se diseñó y lo que se implementó.',
                'Los cambios se hacen mientras todavía son baratos, no cuando ya hay que rehacer.',
                'Hay un solo responsable del resultado, y eso cambia por completo la conversación.',
              ],
            },
          },
        ],
      },
      {
        h2: 'Qué resultó: un proyecto que se puede revisar de cerca',
        body: [
          'Este es un caso donde el resultado se ve, así que lo dejo con enlace en lugar de describirlo. La documentación completa está publicada en Behance, con las piezas del proyecto: identidad aplicada, tienda y contenido. No hay cifras públicas de ventas para este caso y no voy a inventarlas.',
          'Lo que reclamo como resultado es lo que dice el proyecto: un encargo integral, entregado de punta a punta, donde los cuatro frentes salieron alineados.',
        ],
        list: {
          variant: 'ul',
          title: 'Lo que se puede ver en el caso publicado',
          items: [
            'Sistema de identidad aplicado al entorno de venta, no solo en un manual.',
            'Estructura de catálogo y fichas pensadas para comparación entre productos.',
            'Piezas de contenido consistentes con el sistema de marca.',
          ],
        },
      },
      {
        h2: 'Qué me llevé',
        list: {
          variant: 'check',
          items: [
            'En categorías de comparación, la ficha de producto vale más que la home. Ahí se decide.',
            'Definir la medición antes de construir cuesta un día; hacerlo después cuesta rehacer la tienda.',
            'Un proyecto end-to-end no es más barato: es más responsable. Nadie tiene a quién culpar.',
            'La consistencia visual entre productos no es estética, es lo que hace comparable tu propio catálogo.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Qué significa exactamente un proyecto end-to-end?',
        a: 'Que la misma persona o el mismo equipo se hace cargo desde la identidad hasta la medición, pasando por la tienda y el contenido. No es que se haga todo al tiempo: es que las decisiones se toman en un orden que tiene sentido, y no en el orden en que se firmaron proveedores distintos.',
      },
      {
        q: '¿Esto aplica si vendo un producto distinto a electrónica?',
        a: 'Aplica el método, cambia el peso de las piezas. En electrónica manda la comparación de especificaciones, así que la ficha de producto es la reina. En moda mandan la fotografía y la política de cambios; en alimentos, la confianza y la logística. Lo que no cambia es que hay que saber cuál es la página donde se decide la compra y trabajarla primero.',
      },
      {
        q: '¿Puedo contratar solo una parte del proyecto?',
        a: 'Sí, y pasa seguido. Lo importante en ese caso es ser explícito sobre qué queda por fuera y qué riesgo trae. Si solo hacemos la tienda pero la marca no tiene reglas, la tienda va a inventarlas; si solo hacemos contenido pero no hay medición, no vamos a poder decir si sirvió.',
      },
      {
        q: '¿Qué necesitas de mi lado para arrancar algo así?',
        a: 'El catálogo con la información real de producto, claridad sobre márgenes y garantías, y acceso a la plataforma de la tienda y a las cuentas de analítica. La información de producto es la que más suele demorar los proyectos: sin especificaciones consistentes no hay ficha que funcione.',
      },
      {
        q: '¿Dónde puedo ver el caso completo?',
        a: 'La documentación visual está publicada en Behance, en la galería del proyecto. Ahí se ven las piezas y la aplicación del sistema de marca en el entorno de venta.',
      },
    ],

    related: [
      { path: '/servicios/ecommerce/', label: 'E-commerce', note: 'El servicio que ordena tienda, catálogo y flujo de compra.' },
      { path: '/servicios/branding/', label: 'Branding y diseño', note: 'Cómo hago que un sistema de marca aguante el entorno digital.' },
      { path: '/servicios/seo-sem/', label: 'SEO y SEM', note: 'Lo que sigue cuando la tienda ya convierte: traerle demanda.' },
      { path: '/trabajo/bio-laboratorios/', label: 'Caso Bio Laboratorios', note: 'El mismo orden, con el resultado en ventas documentado.' },
    ],

    image: {
      src: '/og/blu-smartphones-ecommerce-branding.png',
      alt: 'Piezas del proyecto integral de BLU Smartphones: identidad de marca y fichas de producto de la tienda online',
      width: 1200,
      height: 630,
    },

    schemaType: 'CreativeWork',
    updated: '2026-08-24',
    priority: 0.75,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Nona Gastro Bar
  // ──────────────────────────────────────────────────────────────────────────
  {
    path: '/trabajo/nona-gastro-bar/',
    cluster: 'trabajo',
    parent: '/trabajo/',
    navLabel: 'Nona Gastro Bar',

    metaTitle: 'Nona Gastro Bar: +120% en ventas tras la apertura',
    metaDescription:
      'Identidad de marca y apertura de un restaurante: +30 piezas gráficas, contenido digital y un equipo de 5. El caso que acompañó un +120% en ventas.',
    h1: 'Abrir un restaurante y sostener la marca después del primer mes',
    keywords: [
      'marketing para restaurantes',
      'identidad de marca restaurante',
      'apertura de restaurante bogotá',
      'contenido digital gastronomía',
      'branding gastro bar',
    ],

    caseMeta: {
      client: 'Nona Gastro Bar',
      year: '2024–2025',
      role: 'Identidad de marca, dirección de las piezas gráficas, contenido digital y operación de marketing liderando un equipo de 5.',
      scope: ['Branding', 'Contenido', 'Marketing', 'Dirección de equipo'],
      headline: '+120% en ventas',
      externalUrl: 'https://www.behance.net/gallery/206774939/Nona-Gastro-Bar-Brand-Identity',
      externalLabel: 'Ver en Behance',
    },

    intent: {
      type: 'comercial',
      query: 'marketing para la apertura de un restaurante',
      audience:
        'Dueños de restaurantes y bares que van a abrir o que ya abrieron y ven cómo el ruido de la inauguración se apaga al segundo mes.',
      problem:
        'Aperturas que concentran todo el esfuerzo en el día uno y se quedan sin sistema para sostener la demanda cuando pasa la novedad.',
      outcome:
        'Cómo se organiza una identidad y una operación de contenido que aguante después de la inauguración, y con qué equipo se sostiene.',
    },

    tldr: [
      'Identidad de marca y apertura del restaurante entre 2024 y 2025, acompañando un crecimiento de +120% en ventas.',
      'Más de 30 piezas gráficas producidas: carta, señalización, redes y material de apertura, todas bajo el mismo sistema.',
      'Lideré un equipo de 5 personas en la operación, que es la parte del trabajo que casi nunca se muestra en un portafolio.',
      'La decisión clave fue producir un sistema, no piezas sueltas: la apertura consume material a una velocidad que ninguna producción por encargo aguanta.',
      'En gastronomía la marca no vive en el logo: vive en la carta, en el plato servido y en la foto que sube el cliente.',
    ],

    lead:
      'Una apertura tiene una trampa conocida: el día de la inauguración todo funciona. Hay gente, hay fotos, hay fila. El problema llega en la sexta semana, cuando la novedad se acaba y hay que sostener la operación con lo que quedó construido. En Nona Gastro Bar trabajé la identidad y la apertura pensando justamente en esa sexta semana, con más de treinta piezas gráficas y un equipo de cinco personas moviendo la operación. El trabajo acompañó un crecimiento de +120% en ventas, y este es el detalle de cómo se organizó.',
    ctaInline: { label: 'Cuéntame de tu apertura', href: 'whatsapp' },

    sections: [
      {
        h2: 'El punto de partida: una apertura tiene fecha y no se mueve',
        body: [
          'Abrir un restaurante es de los pocos proyectos de marketing con una restricción dura: hay una fecha y esa fecha no se negocia. Todo lo demás se ordena alrededor de eso, y lo que no esté listo el día de la apertura no llega tarde, sencillamente no existe.',
          'Esa restricción cambia la forma de trabajar. No se puede diseñar pieza por pieza esperando aprobación de cada una, porque la operación consume material más rápido de lo que un diseñador produce por encargo.',
        ],
        subsections: [
          {
            h3: 'Lo que hay que tener resuelto antes del día uno',
            list: {
              variant: 'check',
              items: [
                'La carta, que es la pieza de marca que más gente toca y la que más veces se reimprime.',
                'La señalización del local y todo lo que la gente ve antes de sentarse.',
                'El sistema para redes: no publicaciones sueltas, sino plantillas que el equipo pueda usar sin diseñador.',
                'El material de apertura, que tiene fecha de vencimiento y hay que producir sabiendo eso.',
              ],
            },
          },
        ],
      },
      {
        h2: 'Qué decidimos hacer: identidad primero, sistema después, piezas al final',
        body: [
          'La decisión que ordenó el proyecto fue no arrancar por las piezas. Es la tentación natural en gastronomía, donde todo el mundo quiere ver la carta y el letrero, pero producir piezas sin sistema significa volver a decidir tipografía, color y tono en cada una. Con más de treinta piezas por delante, eso es imposible.',
        ],
        list: {
          variant: 'ol',
          title: 'El orden del proyecto',
          items: [
            'Identidad: qué es Nona, cómo se ve y cómo habla, con reglas que se puedan aplicar sin preguntar.',
            'Sistema de aplicación: plantillas y criterios para que el equipo produzca sin romper la marca.',
            'Producción: las más de 30 piezas, ya con las decisiones tomadas de antemano.',
            'Operación: contenido digital sostenido, con un equipo de 5 personas moviendo la rutina.',
          ],
        },
        subsections: [
          {
            h3: 'Por qué el sistema importa más que la pieza bonita',
            body: [
              'Una pieza bonita la hace cualquiera con tiempo. Un sistema es lo que permite que la pieza número treinta salga tan bien como la primera, y que la haga alguien del equipo un martes a las siete de la noche sin llamar al diseñador.',
              'En un restaurante eso no es un lujo: la marca se aplica todos los días, en la promoción de la semana, en el menú del día, en la historia que hay que subir ahora. Si cada aplicación necesita un diseñador, la marca se rompe sola en un mes.',
            ],
          },
        ],
      },
      {
        h2: 'Cómo se ejecutó: tres fases y un equipo de cinco',
        body: [
          'El proyecto se movió en tres momentos, con focos distintos. Lo que cambia entre ellos no es la cantidad de trabajo sino el tipo: primero se decide, después se produce, después se sostiene.',
        ],
        table: {
          caption: 'Fases del proyecto de apertura, foco y tipo de trabajo en cada una',
          head: ['Fase', 'Foco', 'Tipo de trabajo'],
          rows: [
            ['Antes de abrir', 'Identidad y sistema de marca', 'Decidir: reglas, tono y plantillas'],
            ['Apertura', 'Piezas físicas y material de lanzamiento', 'Producir en volumen sin volver a decidir'],
            ['Después de abrir', 'Contenido digital y presencia sostenida', 'Rutina: publicar, medir y ajustar con el equipo'],
          ],
        },
        subsections: [
          {
            h3: 'Liderar un equipo de cinco en una operación de restaurante',
            body: [
              'Coordinar un equipo de cinco personas en una apertura es un trabajo distinto al de diseñar. La mayor parte del tiempo no se va en producir sino en definir quién decide qué, y en resolver las cosas que salen mal en el momento en que salen mal, que en gastronomía es siempre.',
              'Lo que hace funcionar un equipo así no es el talento individual: es que las reglas estén escritas. Si el sistema de marca es claro, cinco personas producen consistente. Si no lo es, cinco personas producen cinco marcas distintas.',
            ],
          },
        ],
      },
      {
        h2: 'Qué resultó: +120% en ventas y una marca que se sostuvo',
        body: [
          'El trabajo acompañó un crecimiento de +120% en ventas. Como en cualquier negocio de gastronomía, ese número tiene varios dueños: la cocina, el servicio, la ubicación y el marketing. Lo que sí puedo atribuir a este proyecto es el frente que me tocaba, y es concreto: la marca llegó lista al día de apertura, hubo material para sostener la comunicación después, y el equipo pudo seguir produciendo sin depender de mí.',
        ],
        list: {
          variant: 'ul',
          title: 'Lo que quedó instalado',
          items: [
            'Una identidad documentada, publicada y revisable en Behance.',
            'Más de 30 piezas gráficas producidas bajo un mismo sistema.',
            'Plantillas y criterios que el equipo puede usar sin diseñador de por medio.',
            'Una rutina de contenido digital que no dependía del entusiasmo de la apertura.',
          ],
        },
      },
      {
        h2: 'Qué me llevé',
        list: {
          variant: 'check',
          items: [
            'La fecha de apertura es la mejor herramienta de priorización que existe: obliga a decidir qué sí y qué no.',
            'En gastronomía la marca se juega en la carta y en el plato, no en el manual.',
            'Un sistema aplicable vale más que diez piezas perfectas que nadie puede repetir.',
            'Liderar equipo cambió mi forma de entregar: si el cliente no puede operar lo que le dejé, el trabajo está a medias.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Cuánto antes de abrir hay que empezar con la marca?',
        a: 'Antes de imprimir cualquier cosa, y bastante antes de lo que la gente cree. La carta, la señalización y el material físico tienen tiempos de producción propios, y esos tiempos no se comprimen. La regla práctica: la identidad debe estar cerrada antes de que empieces a cotizar impresión, o vas a pagar dos veces.',
      },
      {
        q: '¿Esto aplica a un restaurante que ya está abierto?',
        a: 'Sí, y suele ser más urgente. Un restaurante en operación normalmente tiene el problema contrario a una apertura: mucho material producido sin sistema, todo distinto entre sí. Ahí el trabajo empieza por ordenar lo que ya existe y definir las reglas, antes de producir una pieza nueva.',
      },
      {
        q: '¿Se necesita un equipo de cinco personas para lograr algo así?',
        a: 'No necesariamente. El tamaño del equipo lo define la operación, no el proyecto de marca. Lo que sí se necesita es que alguien tenga la responsabilidad de sostener la comunicación después de la apertura. Si esa responsabilidad no está asignada, el contenido se muere en la semana seis sin importar cuánta gente haya.',
      },
      {
        q: '¿Qué se necesita para replicar un resultado como este?',
        a: 'Producto que valga la pena y una operación que aguante la demanda. El marketing puede llenar un restaurante una vez; que la gente vuelva depende de la cocina y del servicio. Cuando esas dos cosas están, el trabajo de marca y contenido multiplica; cuando no están, lo único que hace es acelerar las reseñas malas.',
      },
      {
        q: '¿Dónde puedo ver la identidad de Nona?',
        a: 'El caso de identidad de marca está publicado en Behance, con las piezas del sistema y su aplicación. Es la mejor forma de ver el criterio de diseño aplicado a un negocio real.',
      },
    ],

    related: [
      { path: '/servicios/branding/', label: 'Branding y diseño', note: 'El servicio detrás de este caso: identidad con reglas que se pueden operar.' },
      { path: '/servicios/meta-ads/', label: 'Meta Ads', note: 'El canal natural para un negocio local con demanda por crear.' },
      { path: '/trabajo/limonada-pink/', label: 'Caso Limonada Pink', note: 'Otro proyecto de marca de consumo, esta vez con brand book y tienda.' },
      { path: '/contacto/', label: 'Contacto', note: 'Si vas a abrir y tienes fecha, conviene hablar temprano.' },
    ],

    image: {
      src: '/og/nona-gastro-bar-identidad-apertura.png',
      alt: 'Piezas de identidad de marca de Nona Gastro Bar: carta, señalización y material gráfico de la apertura del restaurante',
      width: 1200,
      height: 630,
    },

    schemaType: 'CreativeWork',
    updated: '2026-08-24',
    priority: 0.75,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Limonada Pink
  // ──────────────────────────────────────────────────────────────────────────
  {
    path: '/trabajo/limonada-pink/',
    cluster: 'trabajo',
    parent: '/trabajo/',
    navLabel: 'Limonada Pink',

    metaTitle: 'Limonada Pink: brand book, tienda online y ads',
    metaDescription:
      'Brand book completo, tienda online y campañas en Meta y Google Ads para una marca de bebidas. Así se ordena un lanzamiento de consumo masivo de punta a punta.',
    h1: 'Del brand book a la primera venta: el caso Limonada Pink',
    keywords: [
      'ejemplo de brand book para bebidas',
      'branding marca de bebidas',
      'tienda online marca de consumo',
      'meta ads y google ads para bebidas',
      'lanzamiento de producto de consumo',
    ],

    caseMeta: {
      client: 'Limonada Pink',
      year: '2025',
      role: 'Brand book completo, montaje de la tienda online y gestión de campañas en Meta y Google Ads.',
      scope: ['Branding', 'E-commerce', 'Meta Ads', 'Google Ads'],
      headline: 'Brand book completo + tienda online + campañas',
      externalUrl: 'https://www.behance.net/gallery/223342905/Limonada-Pink-Brand-Book',
      externalLabel: 'Ver el brand book en Behance',
    },

    intent: {
      type: 'comercial',
      query: 'ejemplo de brand book para una marca de bebidas',
      audience:
        'Marcas de consumo que están naciendo o relanzándose y necesitan reglas de marca antes de empezar a gastar en pauta.',
      problem:
        'Poner pauta sobre una marca que todavía no tiene reglas: cada anuncio se ve distinto, nada se acumula y la inversión no construye recuerdo.',
      outcome:
        'Ver qué entra en un brand book que sí se usa, cómo se conecta con la tienda y qué rol cumple cada canal de pauta.',
    },

    tldr: [
      'Proyecto de 2025 con tres piezas: brand book completo, tienda online y campañas en Meta y Google Ads, de punta a punta.',
      'Cuando un proyecto arranca por brand book es porque la marca todavía no tiene reglas. Ese fue el punto de partida.',
      'La regla que ordenó el trabajo: no se pauta una marca sin reglas, porque cada anuncio empieza de cero y nada se acumula.',
      'Meta y Google no compiten: en consumo masivo, Meta crea la demanda y Google la captura cuando ya existe.',
      'El brand book está publicado en Behance y se puede revisar completo.',
    ],

    lead:
      'Un brand book completo no se pide por gusto estético. Se pide cuando la marca va a empezar a existir en muchos lugares al tiempo (empaque, tienda, anuncios, redes) y no hay forma de sostener eso decidiendo pieza por pieza. Limonada Pink fue exactamente ese caso: primero las reglas, después la tienda, después la pauta. Este es el orden que seguí y por qué cada pieza fue donde fue.',
    ctaInline: { label: 'Hablemos de tu marca antes de pautar', href: 'whatsapp' },

    sections: [
      {
        h2: 'El punto de partida: una marca que iba a existir en muchos lados a la vez',
        body: [
          'Una marca de bebidas se enfrenta a un problema particular: compite en un estante (físico o digital) donde la decisión se toma en segundos y casi siempre por antojo, no por análisis. No hay ficha técnica que leer ni especificación que comparar. Lo que decide es cómo se ve y qué promete.',
          'Eso pone toda la carga en la consistencia. Si el envase dice una cosa, el anuncio otra y la tienda una tercera, no hay repetición y sin repetición no hay recuerdo. Por eso el proyecto arrancó por el brand book y no por la campaña.',
        ],
        list: {
          variant: 'ul',
          title: 'Lo que estaba en juego en la categoría',
          items: [
            'La decisión de compra es rápida y emocional: la marca tiene que comunicar antes de que alguien lea.',
            'El producto se ve en muchos formatos distintos, del empaque a la historia de Instagram.',
            'Sin reglas escritas, cada persona que toque la marca la va a interpretar distinto.',
            'La pauta amplifica lo que ya existe: si lo que existe es inconsistente, amplifica la inconsistencia.',
          ],
        },
      },
      {
        h2: 'Qué decidimos hacer: reglas primero, pauta al final',
        body: [
          'La secuencia fue deliberada y es la misma que defiendo en cualquier lanzamiento de consumo: brand book, tienda, campañas. Invertir el orden es la forma más común de quemar presupuesto en una marca nueva, porque pagas por llevar gente a un lugar que todavía no sabe qué decirles.',
        ],
        list: {
          variant: 'ol',
          title: 'Las tres etapas del proyecto',
          items: [
            'Brand book completo: identidad, aplicaciones y reglas de uso, para que cualquiera pueda producir sin romper la marca.',
            'Tienda online: el lugar donde la marca se convierte en transacción, con el sistema visual ya definido.',
            'Campañas en Meta y Google Ads: recién ahí se abre la llave del tráfico, cuando hay a dónde llevarlo.',
          ],
        },
        subsections: [
          {
            h3: 'Qué tiene que traer un brand book para que sí se use',
            body: [
              'La mayoría de los brand books se archivan porque responden preguntas que nadie hace. Un brand book útil resuelve las decisiones que aparecen todas las semanas, no las que aparecen en una presentación.',
            ],
            list: {
              variant: 'check',
              items: [
                'Cómo se ve la marca cuando hay poco espacio: un avatar, un ícono, una etiqueta pequeña.',
                'Qué hacer cuando la foto de producto no alcanza y hay que resolver con color y tipografía.',
                'Cómo habla la marca: no solo el tono, sino ejemplos concretos de lo que sí y lo que no se dice.',
                'Qué aplicaciones están permitidas y cuáles rompen el sistema, con el caso de uso al lado.',
              ],
            },
          },
          {
            h3: 'Por qué la tienda va antes que la pauta',
            body: [
              'Una tienda que no convierte hace que cada peso de pauta rinda menos, y lo peor es que no lo notas de inmediato: ves clics, ves tráfico, ves actividad. La factura llega cuando comparas la inversión contra las ventas. Es más barato arreglar la tienda antes que descubrir el problema pagando por tráfico.',
            ],
          },
        ],
      },
      {
        h2: 'Cómo se ejecutó: qué hace cada canal',
        body: [
          'Meta y Google no hacen el mismo trabajo, y tratarlos como intercambiables es el error más común en marcas de consumo. La diferencia es simple: en Google respondes a una búsqueda que ya existe, en Meta creas el interés antes de que exista búsqueda alguna. Para una limonada, la mayor parte de la demanda hay que crearla.',
        ],
        table: {
          caption: 'Rol de cada canal en el lanzamiento de una marca de consumo',
          head: ['Canal', 'Qué trabajo hace', 'Qué se mide'],
          rows: [
            ['Meta Ads', 'Crear demanda: mostrar el producto a quien todavía no lo busca', 'Costo por compra y aprendizaje de qué creatividad funciona'],
            ['Google Ads (marca)', 'Capturar a quien ya escuchó de la marca y la busca por nombre', 'Que la venta no se la lleve otro por no aparecer'],
            ['Google Ads (categoría)', 'Aparecer en búsquedas de la categoría cuando hay intención de compra', 'Costo por venta contra el margen del producto'],
            ['Tienda online', 'Convertir la visita en transacción', 'Tasa de conversión y fugas en el flujo de compra'],
          ],
        },
        subsections: [
          {
            h3: 'La creatividad es la variable de la que depende Meta',
            body: [
              'En Meta, la segmentación hace cada vez menos y la creatividad cada vez más. Por eso el brand book no fue un entregable decorativo: fue lo que permitió producir varias piezas distintas sin que se sintieran de marcas distintas. Poder producir volumen de creatividad consistente es lo que sostiene una cuenta de Meta en el tiempo.',
            ],
          },
        ],
      },
      {
        h2: 'Qué resultó',
        body: [
          'El resultado del proyecto es la marca operando en sus tres frentes: reglas, tienda y campañas, publicadas y funcionando. El brand book está documentado en Behance y se puede revisar completo, que es la mejor forma de juzgar el criterio de diseño.',
          'No tengo cifras públicas de ventas de este proyecto y no las voy a inventar para engordar el caso. Lo que reclamo es el alcance entregado y la coherencia entre las tres piezas.',
        ],
        list: {
          variant: 'ul',
          items: [
            'Brand book completo, publicado y consultable.',
            'Tienda online lista para recibir tráfico pago, no improvisada después.',
            'Campañas en Meta y Google con un rol definido para cada canal.',
          ],
        },
      },
      {
        h2: 'Qué me llevé',
        list: {
          variant: 'check',
          items: [
            'Un brand book vale por lo que resuelve el martes en la tarde, no por lo bien que se ve en la presentación.',
            'En consumo masivo, la consistencia es la estrategia. La repetición es lo único que construye recuerdo.',
            'Pautar antes de tener reglas de marca es pagar por enseñarle a la gente algo que después vas a cambiar.',
            'Definir el rol de cada canal desde el principio evita la discusión eterna de cuál funciona mejor: hacen cosas distintas.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Necesito un brand book completo o me sirve un manual corto?',
        a: 'Depende de cuánta gente vaya a tocar la marca. Si eres tú solo produciendo todo, un manual corto alcanza. Si hay un diseñador, alguien de redes, un proveedor de empaque y una agencia de pauta, el brand book se paga solo: cada regla escrita es una discusión que no vas a tener tres veces.',
      },
      {
        q: '¿Puedo empezar con las campañas y hacer la marca después?',
        a: 'Puedes, pero vas a pagar dos veces. La pauta amplifica lo que ya existe, así que si la marca cambia después, todo el reconocimiento que compraste queda desalineado. En marcas nuevas la secuencia reglas, tienda y pauta no es purismo: es economía.',
      },
      {
        q: '¿Esto aplica a mi producto si no es una bebida?',
        a: 'Aplica a cualquier producto de decisión rápida y compra repetida: alimentos, cuidado personal, accesorios. Lo que define el método no es la categoría sino cómo se decide la compra. Si tu cliente compara especificaciones y se demora semanas en decidir, el peso se corre hacia el contenido y la ficha técnica.',
      },
      {
        q: '¿Con cuánto presupuesto de pauta tiene sentido arrancar?',
        a: 'No hay una cifra universal, y desconfía de quien te la dé sin conocer tu margen. La forma correcta de calcularlo es al revés: cuánto puedes pagar por una venta según tu margen, y cuántas ventas necesitas al mes para que el aprendizaje del algoritmo sea estable. De ahí sale el piso de inversión, no de una tabla genérica.',
      },
      {
        q: '¿Dónde veo el brand book?',
        a: 'Está publicado en Behance, en la galería del proyecto. Ahí se ve el sistema completo y sus aplicaciones, que es la mejor referencia si estás evaluando cómo trabajo la identidad de una marca de consumo.',
      },
    ],

    related: [
      { path: '/servicios/branding/', label: 'Branding y diseño', note: 'Cómo armo un sistema de marca que el equipo pueda aplicar solo.' },
      { path: '/servicios/ecommerce/', label: 'E-commerce', note: 'La tienda que tiene que estar lista antes de abrir la llave de la pauta.' },
      { path: '/servicios/meta-ads/', label: 'Meta Ads', note: 'El canal que crea la demanda cuando la categoría no se busca sola.' },
      { path: '/trabajo/nona-gastro-bar/', label: 'Caso Nona Gastro Bar', note: 'Otro proyecto de marca de consumo, con el foco puesto en la apertura.' },
    ],

    image: {
      src: '/og/limonada-pink-brand-book-tienda.png',
      alt: 'Páginas del brand book de Limonada Pink junto a piezas de la tienda online y de las campañas de la marca',
      width: 1200,
      height: 630,
    },

    schemaType: 'CreativeWork',
    updated: '2026-08-24',
    priority: 0.7,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. AIISO Consulting
  // ──────────────────────────────────────────────────────────────────────────
  {
    path: '/trabajo/aiiso-consulting/',
    cluster: 'trabajo',
    parent: '/trabajo/',
    navLabel: 'AIISO Consulting',

    metaTitle: 'AIISO Consulting: estrategia digital end-to-end',
    metaDescription:
      'Perfil de negocio, redes y sitio web para una consultora, trabajados junto a GrowthBro. Cómo se ordena la presencia digital de un negocio de servicios.',
    h1: 'Perfil, redes y sitio: la presencia digital de una consultora',
    keywords: [
      'presencia digital para consultoras',
      'estrategia digital negocio de servicios',
      'perfil de negocio y redes',
      'sitio web para consultora',
      'marketing b2b bogotá',
    ],

    caseMeta: {
      client: 'AIISO Consulting',
      year: '2025',
      role: 'Estrategia digital end-to-end junto a GrowthBro: perfil de negocio, redes y sitio web.',
      scope: ['Estrategia', 'Web', 'Redes sociales'],
      headline: 'Estrategia digital end-to-end para una consultora',
      externalUrl: 'https://www.behance.net/gallery/244325825/AIISO-Consulting',
      externalLabel: 'Ver en Behance',
    },

    intent: {
      type: 'comercial',
      query: 'cómo armar la presencia digital de una consultora',
      audience:
        'Consultoras y negocios de servicios que viven de la referencia y no tienen una presencia digital que respalde lo que dicen en la reunión.',
      problem:
        'Un negocio que vende conocimiento pero no lo demuestra en ningún lado: sin perfil claro, sin sitio propio y con redes que no dicen a qué se dedica.',
      outcome:
        'El orden con el que armo la presencia digital de un negocio de servicios y por qué el perfil va antes que cualquier publicación.',
    },

    tldr: [
      'Proyecto de 2025 en alianza con GrowthBro: perfil de negocio, redes y sitio web para la consultora.',
      'En negocios de servicios la venta pasa por la confianza, y la confianza se verifica buscando el nombre en internet.',
      'La secuencia fue perfil primero, canales después: publicar antes de tener claro qué se ofrece produce ruido, no clientes.',
      'Trabajar en alianza obliga a definir quién decide qué; sin eso, dos equipos hacen el mismo trabajo dos veces.',
      'Es un caso de alcance acotado y así lo cuento: sin cifras públicas que mostrar.',
    ],

    lead:
      'Un negocio de servicios vive de una cosa: que cuando alguien lo recomienda y el otro busca el nombre en internet, lo que encuentra confirme la recomendación. Cuando no hay nada, o lo que hay no dice a qué se dedica, la referencia se enfría antes de la primera reunión. AIISO Consulting fue un proyecto de estrategia digital end-to-end que hice junto a GrowthBro, con tres frentes: perfil de negocio, redes y sitio web. Es un caso de alcance acotado y lo cuento como tal.',
    ctaInline: { label: 'Hablemos de tu presencia digital', href: '/contacto/' },

    sections: [
      {
        h2: 'El punto de partida: lo que dice un encargo así',
        body: [
          'Cuando el encargo es perfil de negocio, redes y sitio web al tiempo, el diagnóstico está implícito: la presencia digital está dispersa o no existe. Y para una consultora eso pesa distinto que para una tienda. Una tienda pierde una venta; una consultora pierde credibilidad justo en el momento en que alguien la está verificando.',
        ],
        subsections: [
          {
            h3: 'Qué reviso en un negocio de servicios antes de proponer',
            list: {
              variant: 'ul',
              items: [
                'Qué aparece hoy al buscar el nombre del negocio, que es lo que ve un prospecto referido.',
                'Si el negocio puede explicar en una frase a quién le sirve y qué problema resuelve.',
                'Dónde ocurre hoy la venta: referencia, red de contactos, licitación o entrada directa.',
                'Quién va a sostener la comunicación después del proyecto, porque en servicios eso siempre recae en el equipo interno.',
              ],
            },
          },
        ],
      },
      {
        h2: 'Qué decidimos hacer: el perfil antes que los canales',
        body: [
          'La decisión de fondo fue no empezar por publicar. En negocios de servicios hay una presión natural por mostrar actividad, pero publicar sin haber cerrado el perfil produce contenido que no se acumula: cada pieza cuenta una versión distinta de a qué se dedica el negocio.',
          'Cerrar el perfil primero significa decidir a quién le sirve la consultora, qué problema resuelve y con qué lenguaje lo dice. Eso es lo que después alimenta el sitio y las redes, no al revés.',
        ],
        list: {
          variant: 'ol',
          title: 'El orden del proyecto',
          items: [
            'Perfil de negocio: a quién le sirve, qué resuelve y cómo lo dice.',
            'Sitio web: el lugar propio donde esa promesa queda escrita y verificable.',
            'Redes: la superficie que da señales de actividad y consistencia con lo que dice el sitio.',
          ],
        },
      },
      {
        h2: 'Cómo se ejecutó: tres frentes, un solo relato',
        body: [
          'Cada frente tiene un trabajo distinto, y confundirlos es lo que hace que una consultora publique cosas que no le traen clientes. Esta es la lectura corta de para qué sirve cada uno.',
        ],
        table: {
          caption: 'Frentes de la presencia digital de un negocio de servicios',
          head: ['Frente', 'Para qué sirve', 'Qué falla si no está'],
          rows: [
            ['Perfil de negocio', 'Definir a quién le sirve y qué resuelve', 'Todo lo demás cuenta una historia distinta'],
            ['Sitio web', 'Ser el lugar propio que respalda la referencia', 'La verificación termina en un perfil de red social'],
            ['Redes', 'Dar señales de actividad y criterio', 'El negocio parece detenido aunque esté operando'],
          ],
        },
        subsections: [
          {
            h3: 'Trabajar en alianza con otro equipo',
            body: [
              'Este proyecto lo hice junto a GrowthBro, y esa es una parte del caso que vale la pena contar. Trabajar en alianza suma capacidad, pero solo funciona si la primera conversación es sobre quién decide qué. Sin esa frontera clara, dos equipos terminan haciendo el mismo trabajo dos veces o, peor, dejando un frente sin dueño porque cada uno asumió que era del otro.',
            ],
          },
        ],
      },
      {
        h2: 'Qué resultó y qué me llevé',
        body: [
          'El resultado es la presencia digital de la consultora armada en sus tres frentes, documentada y publicada en Behance. Es un proyecto de alcance acotado: no tengo cifras de negocio para mostrar y no voy a fabricarlas para que el caso parezca más grande de lo que fue.',
        ],
        list: {
          variant: 'check',
          title: 'Lo que me dejó el proyecto',
          items: [
            'En servicios, el sitio propio no es opcional: es donde termina la verificación de una referencia.',
            'El perfil de negocio es el entregable más barato y el que más ahorra trabajo después.',
            'En una alianza, definir fronteras al principio es más importante que repartir tareas.',
            'Un caso pequeño contado con honestidad genera más confianza que uno inflado con datos que nadie puede verificar.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Una consultora necesita redes sociales?',
        a: 'Necesita señales de actividad y criterio, y las redes son una forma de darlas, no la única. Para muchos negocios de servicios pesa más un sitio claro y un perfil profesional bien trabajado que publicar tres veces por semana. La pregunta correcta no es en qué red estar sino dónde te verifica quien te va a contratar.',
      },
      {
        q: '¿Por dónde empiezo si no tengo nada montado?',
        a: 'Por el perfil de negocio, siempre. Escribir en una frase a quién le sirves y qué problema resuelves es lo que hace que todo lo demás sea rápido de producir. Sin eso, cada pieza de contenido es una discusión nueva sobre qué decir.',
      },
      {
        q: '¿Qué tan grande fue este proyecto?',
        a: 'Fue acotado: tres frentes, en alianza con GrowthBro, durante 2025. Prefiero decirlo así en vez de presentarlo como una transformación digital completa. Si buscas un caso con resultado en ventas documentado, el de Bio Laboratorios es el que aplica.',
      },
      {
        q: '¿Trabajas con otras agencias o solo directo con el cliente?',
        a: 'Trabajo de las dos formas. En alianza suele funcionar bien cuando cada equipo aporta una capacidad distinta y las fronteras están claras desde el principio. Lo que no funciona es entrar sin definir quién decide: ahí el proyecto se estanca en reuniones.',
      },
    ],

    related: [
      { path: '/servicios/', label: 'Servicios', note: 'El panorama completo de en qué puedo entrar y en qué no.' },
      { path: '/trabajo/growthbro/', label: 'Caso GrowthBro', note: 'La agencia con la que hice este proyecto, y cuya operación de marketing monté.' },
      { path: '/servicios/seo-sem/', label: 'SEO y SEM', note: 'El paso siguiente cuando el sitio ya existe y hay que hacerlo encontrable.' },
      { path: '/contacto/', label: 'Contacto', note: 'Si tu negocio de servicios no aparece cuando lo buscan, empecemos por ahí.' },
    ],

    image: {
      src: '/og/aiiso-consulting-estrategia-digital.png',
      alt: 'Sitio web y piezas de redes de AIISO Consulting, proyecto de estrategia digital hecho junto a GrowthBro',
      width: 1200,
      height: 630,
    },

    schemaType: 'CreativeWork',
    updated: '2026-08-24',
    priority: 0.65,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. GrowthBro
  // ──────────────────────────────────────────────────────────────────────────
  {
    path: '/trabajo/growthbro/',
    cluster: 'trabajo',
    parent: '/trabajo/',
    navLabel: 'GrowthBro',

    metaTitle: 'GrowthBro: montar la operación de marketing desde cero',
    metaDescription:
      'Monté desde cero la operación de marketing y la presencia digital de una agencia. Qué se arma primero cuando no hay nada y por qué ese orden importa.',
    h1: 'Ser el primer marketero de una agencia de marketing',
    keywords: [
      'montar operación de marketing desde cero',
      'presencia digital para agencias',
      'marketing para agencia de marketing',
      'estructura de marketing interno',
      'growthbro',
    ],

    caseMeta: {
      client: 'GrowthBro',
      year: '2024',
      role: 'Montaje completo de la operación de marketing y de la presencia digital de la agencia.',
      scope: ['Estrategia', 'Marketing', 'Presencia digital', 'Operación'],
      headline: 'Operación de marketing montada desde cero',
      externalUrl: 'https://growthbro.co/',
      externalLabel: 'Ver el sitio',
    },

    intent: {
      type: 'comercial',
      query: 'cómo montar el marketing de una empresa desde cero',
      audience:
        'Empresas que van a hacer su primera contratación de marketing y no saben qué se arma primero cuando no hay absolutamente nada.',
      problem:
        'Empezar por publicar en redes porque es lo visible, en vez de por lo que sostiene la operación después del primer mes.',
      outcome:
        'El orden de montaje que uso cuando no hay nada previo, y qué señales indican que la base está lista para invertir en tráfico.',
    },

    tldr: [
      'En 2024 monté desde cero toda la operación de marketing y la presencia digital de GrowthBro.',
      'Una agencia de marketing sin su propio marketing es el caso clásico del zapatero descalzo: lo urgente del cliente siempre gana.',
      'Traté a la agencia como a un cliente, con el mismo orden y la misma exigencia, porque lo interno se abandona cuando no tiene método.',
      'Primero la base (posicionamiento, sitio y medición), después la superficie (contenido y canales). Nunca al revés.',
      'De esa operación salieron proyectos, como la estrategia digital de AIISO Consulting.',
    ],

    lead:
      'Hay un patrón que se repite en todas las agencias: el marketing propio es lo primero que se aplaza. Siempre hay un cliente con algo urgente, y lo interno no factura, así que se queda para el viernes que nunca llega. En GrowthBro me tocó romper ese patrón desde cero, montando la operación de marketing y la presencia digital completa de la agencia. Este es el orden con el que se arma algo cuando no hay absolutamente nada previo.',
    ctaInline: { label: 'Cuéntame qué tienes montado hoy', href: 'whatsapp' },

    sections: [
      {
        h2: 'El punto de partida: cero, literalmente',
        body: [
          'Empezar desde cero tiene una ventaja que se subestima: no hay que desmontar nada. No hay campañas heredadas mal configuradas, ni una medición rota que arreglar, ni una marca a medio camino que alguien defiende por cariño. Todo lo que se construye, se construye bien de entrada.',
          'La desventaja es la otra cara: no hay datos. No hay histórico que diga qué funcionó, así que las primeras decisiones se toman con criterio y con lo que se sabe de la categoría, y se corrigen rápido cuando llegan los primeros números.',
        ],
        list: {
          variant: 'ul',
          title: 'La trampa del zapatero descalzo',
          items: [
            'Lo interno no factura, así que siempre pierde contra lo urgente del cliente.',
            'Sin una rutina definida, el marketing propio depende del entusiasmo, y el entusiasmo se acaba.',
            'Una agencia que no puede mostrar su propio caso vende con el discurso, no con la evidencia.',
            'Cuando por fin se retoma, se empieza de cero otra vez, porque nada quedó documentado.',
          ],
        },
      },
      {
        h2: 'Qué decidí hacer: tratar la agencia como a un cliente',
        body: [
          'La decisión que hizo que el proyecto sobreviviera fue esa: darle a la agencia el mismo tratamiento que a un cliente que paga. Mismo orden, mismos entregables, misma exigencia de que quedara documentado. No porque sea más elegante, sino porque es lo único que evita que el trabajo interno se disuelva en la primera semana ocupada.',
        ],
        subsections: [
          {
            h3: 'Base antes que superficie',
            body: [
              'Lo primero que se ve de una operación de marketing es lo último que debería montarse. Las publicaciones son la superficie: son visibles, son rápidas y dan sensación de avance. La base (qué vendes, a quién, dónde aterriza la gente y cómo lo mides) no se ve, y es lo que determina si la superficie sirve de algo.',
            ],
            list: {
              variant: 'ol',
              items: [
                'Posicionamiento: qué hace la agencia, para quién y en qué se diferencia de las otras veinte.',
                'Sitio propio: el lugar donde la promesa queda escrita y se puede verificar.',
                'Medición: qué se considera un contacto de valor, antes de tener el primero.',
                'Contenido y canales: recién ahí, con las tres capas anteriores en pie.',
              ],
            },
          },
          {
            h3: 'Lo que hace que una operación interna sobreviva',
            body: [
              'La diferencia entre una operación que dura y una que se apaga en dos meses no es el talento, es la rutina. Tareas con dueño, una frecuencia sostenible y decisiones documentadas para no volver a discutirlas. Prefiero una rutina modesta que se cumpla a un plan ambicioso que se abandone en marzo.',
            ],
          },
        ],
      },
      {
        h2: 'Cómo se ejecutó: el orden de montaje',
        body: [
          'Este es el mapa de lo que se montó y por qué en ese orden. Cada capa habilita la siguiente: saltarse una no acelera el proyecto, solo lo obliga a devolverse después.',
        ],
        table: {
          caption: 'Capas de una operación de marketing montada desde cero',
          head: ['Capa', 'Qué se monta', 'Por qué va en ese momento'],
          rows: [
            ['Posicionamiento', 'Qué se ofrece, a quién y con qué diferencia', 'Sin esto, cada pieza dice algo distinto'],
            ['Presencia propia', 'Sitio web y perfiles oficiales', 'Es donde termina la verificación de un referido'],
            ['Medición', 'Qué cuenta como contacto de valor', 'Definirlo después obliga a rehacer lo construido'],
            ['Contenido', 'Rutina sostenible con dueño y frecuencia', 'Solo sirve si hay a dónde llevar a la gente'],
            ['Adquisición', 'Canales pagos cuando la base ya convierte', 'Pagar por tráfico hacia una base incompleta es caro'],
          ],
        },
        subsections: [
          {
            h3: 'La señal de que la base ya está lista',
            body: [
              'No hay que esperar a que todo esté perfecto para abrir la llave del tráfico, pero sí hay que poder responder tres preguntas sin dudar: a dónde llega la gente, qué queremos que haga ahí, y cómo nos enteramos de que lo hizo. Si alguna de las tres se responde con un quizá, todavía es temprano para invertir.',
            ],
            list: {
              variant: 'check',
              items: [
                'Hay un lugar propio a dónde llevar a la gente, no solo un perfil de red social.',
                'Está definido qué acción cuenta como contacto de valor.',
                'Ese contacto se registra en algún lado que se pueda revisar después.',
                'Alguien tiene la responsabilidad de responderle a quien escriba.',
              ],
            },
          },
          {
            h3: 'Qué se documenta y para qué',
            body: [
              'Cada decisión que se toma sin escribir se vuelve a discutir en tres meses. Documentar el posicionamiento, los criterios de contenido y lo que se considera un contacto de valor no es burocracia: es lo que hace que la operación siga siendo la misma cuando cambia quien la ejecuta.',
            ],
          },
        ],
      },
      {
        h2: 'Qué resultó: una operación que quedó en pie',
        body: [
          'El resultado verificable es que la presencia digital de GrowthBro existe y está en línea, y que la operación siguió funcionando después de montada. De ese trabajo salieron proyectos concretos: la estrategia digital de AIISO Consulting se hizo junto a la agencia.',
          'No tengo cifras públicas de la operación interna y no corresponde inventarlas. Lo que reclamo como resultado es haber montado desde cero algo que quedó funcionando y que hoy se puede visitar.',
        ],
        list: {
          variant: 'check',
          items: [
            'Posicionamiento definido y aplicado en todas las superficies.',
            'Sitio web propio, en línea y verificable.',
            'Una rutina de contenido con dueño y frecuencia, no dependiente del ánimo de la semana.',
            'Proyectos de cliente que salieron con la agencia, como AIISO Consulting.',
          ],
        },
      },
      {
        h2: 'Qué me llevé',
        list: {
          variant: 'ul',
          items: [
            'Montar algo desde cero enseña más que optimizar algo existente: te obliga a justificar cada pieza que agregas.',
            'La superficie es tentadora porque se ve. La base es la que decide si la superficie sirve.',
            'Una rutina modesta que se cumple vence a un plan ambicioso que se abandona.',
            'El trabajo interno necesita el mismo método que el trabajo facturable, o no sobrevive al primer mes ocupado.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Qué se monta primero cuando una empresa no tiene nada de marketing?',
        a: 'El posicionamiento y el sitio propio, en ese orden, y la definición de qué cuenta como contacto de valor. Suena menos emocionante que abrir las redes, pero es lo que hace que todo lo que venga después se acumule en vez de dispersarse. Publicar sin base produce actividad, no clientes.',
      },
      {
        q: '¿Cuánto tarda en verse resultado de una operación montada desde cero?',
        a: 'Depende de si vas a comprar demanda o a construirla. Con canales pagos las primeras señales llegan en semanas, porque estás alquilando atención. Con contenido y orgánico, el horizonte es de meses. Lo honesto es decidir desde el principio cuál de los dos caminos vas a financiar, porque mezclar las expectativas es lo que frustra a los equipos.',
      },
      {
        q: '¿Esto sirve para una empresa que no es agencia?',
        a: 'Sí, el orden es el mismo. La diferencia es que en una agencia el problema no es de conocimiento sino de prioridad: saben qué hacer y no lo hacen. En otras empresas el reto suele ser el contrario, hay disposición pero no criterio para saber por dónde empezar.',
      },
      {
        q: '¿Qué necesito para que la operación no se muera a los dos meses?',
        a: 'Un dueño para cada tarea y una frecuencia que aguante tu semana real, no la ideal. La causa más común de muerte de un plan de marketing interno no es la falta de ideas: es un calendario diseñado para una semana que nunca ocurre.',
      },
    ],

    related: [
      { path: '/servicios/', label: 'Servicios', note: 'Las piezas sueltas de esta operación, explicadas una por una.' },
      { path: '/trabajo/aiiso-consulting/', label: 'Caso AIISO Consulting', note: 'El proyecto de cliente que salió de esta operación, hecho junto a la agencia.' },
      { path: '/servicios/seo-sem/', label: 'SEO y SEM', note: 'Cómo se hace encontrable la presencia propia una vez está montada.' },
      { path: '/perfil/', label: 'Sobre mí', note: 'Los +6 años y las 24+ marcas detrás de este criterio de montaje.' },
    ],

    image: {
      src: '/og/growthbro-operacion-marketing.png',
      alt: 'Sitio web de GrowthBro y piezas de la operación de marketing que Iván Santiago Duarte montó desde cero para la agencia',
      width: 1200,
      height: 630,
    },

    schemaType: 'CreativeWork',
    updated: '2026-08-24',
    priority: 0.7,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. Asignar — trabajo en curso
  // ──────────────────────────────────────────────────────────────────────────
  {
    path: '/trabajo/asignar/',
    cluster: 'trabajo',
    parent: '/trabajo/',
    navLabel: 'Asignar',

    metaTitle: 'Asignar: campañas y funnels de performance en curso',
    metaDescription:
      'Proyecto en curso: estrategia de campañas y funnels de performance, con optimización interna mientras se renueva el diseño. Sin cifras públicas todavía.',
    h1: 'Un caso abierto: qué estoy haciendo hoy en Asignar',
    keywords: [
      'estrategia de campañas de performance',
      'funnels de conversión',
      'optimización de campañas',
      'performance marketing bogotá',
      'trabajo en curso',
    ],

    caseMeta: {
      client: 'Asignar',
      year: '2026',
      role: 'Estrategia de campañas y funnels de performance, con optimización interna mientras se renueva el diseño.',
      scope: ['Performance', 'Funnels', 'Optimización'],
      headline: 'Proyecto en curso: campañas y funnels de performance',
      externalUrl: null,
      externalLabel: null,
    },

    intent: {
      type: 'comercial',
      query: 'optimizar campañas mientras se rediseña el sitio',
      audience:
        'Negocios que están en pleno rediseño y no quieren apagar la adquisición mientras tanto.',
      problem:
        'La creencia de que hay que esperar al sitio nuevo para trabajar performance, cuando esa espera cuesta meses de aprendizaje.',
      outcome:
        'Cómo se ordena el trabajo de campañas y funnels en un proyecto que todavía está abierto, y qué se puede hacer sin esperar el rediseño.',
    },

    tldr: [
      'Proyecto en curso durante 2026: estrategia de campañas y funnels de performance.',
      'El trabajo se hace mientras el diseño se renueva, así que el foco está en optimización interna, no en vitrina.',
      'La decisión de fondo fue no esperar al sitio nuevo: los aprendizajes de campaña se acumulan y no conviene perderlos.',
      'No hay enlace público ni cifras que mostrar todavía. Cuando el proyecto cierre una etapa, esta página se actualiza.',
      'Lo incluyo así, abierto y sin adornos, porque un portafolio también debería mostrar lo que está en proceso.',
    ],

    lead:
      'Este caso está abierto, así que lo cuento como tal: sin enlace público, sin cifras y sin conclusiones. Asignar es un proyecto de estrategia de campañas y funnels de performance que estoy trabajando en 2026, en paralelo a una renovación del diseño. Prefiero mostrarlo en este estado antes que esperar a tener una historia redonda, porque la mayor parte del trabajo de performance ocurre justamente aquí, en la etapa que nadie publica.',
    ctaInline: { label: 'Escríbeme si estás en una situación parecida', href: 'whatsapp' },

    sections: [
      {
        h2: 'El punto de partida: performance mientras el diseño se renueva',
        body: [
          'La situación es más común de lo que parece: el sitio va a cambiar, hay un rediseño en camino, y aparece la pregunta de si vale la pena trabajar campañas mientras tanto. La respuesta corta es que sí, porque lo que se aprende en campañas no se pierde con el rediseño: qué mensajes responden, qué públicos convierten y qué términos traen gente que compra sobreviven al cambio de plantilla.',
          'Lo que sí hay que aceptar es que el foco cambia. Mientras el diseño está en obra, el trabajo es de optimización interna y no de vitrina.',
        ],
        subsections: [
          {
            h3: 'Qué sí se puede trabajar durante un rediseño',
            list: {
              variant: 'check',
              items: [
                'Estructura de campañas: separar por intención en vez de por producto.',
                'Limpieza de desperdicio: lo que consume presupuesto sin devolver nada.',
                'Definición del funnel: qué pasos hay entre el primer clic y la conversión, y dónde se cae la gente.',
                'Medición: dejar bien definido qué se considera conversión antes de que llegue el sitio nuevo.',
              ],
            },
          },
        ],
      },
      {
        h2: 'Qué decidimos hacer: optimizar lo que ya corre',
        body: [
          'La decisión fue no poner el performance en pausa esperando el rediseño. Pausar tiene un costo que casi nunca se calcula: se pierde el aprendizaje acumulado de las campañas y, cuando se retoma, hay que volver a pagar por esos datos.',
        ],
        list: {
          variant: 'ol',
          title: 'Las prioridades en este estado del proyecto',
          items: [
            'Primero medir bien: sin conversiones claras, cualquier optimización es una opinión.',
            'Después ordenar: estructura de campañas por intención y limpieza de lo que no aporta.',
            'Luego el funnel: mapear los pasos reales y dónde se pierde la gente hoy.',
            'Al final escalar, y solo donde el costo por conversión lo permita.',
          ],
        },
      },
      {
        h2: 'Cómo se está ejecutando',
        body: [
          'Como el proyecto sigue abierto, lo más honesto es mostrar el estado de cada frente en vez de presentarlo como algo cerrado.',
        ],
        table: {
          caption: 'Estado actual de cada frente del proyecto',
          head: ['Frente', 'Estado', 'Nota'],
          rows: [
            ['Campañas', 'En curso', 'Optimización sobre lo que ya está corriendo'],
            ['Funnels', 'En curso', 'Mapeo de pasos y puntos de fuga'],
            ['Diseño del sitio', 'En renovación', 'Trabajo de otro frente; condiciona el aterrizaje'],
            ['Caso público', 'Pendiente', 'Sin enlace ni cifras publicables por ahora'],
          ],
        },
        subsections: [
          {
            h3: 'Por qué publico un caso sin resultados',
            body: [
              'Un portafolio que solo muestra proyectos terminados da una idea equivocada del oficio. La mayor parte del trabajo de performance es esto: ajustar, medir y volver a ajustar, en proyectos que no tienen todavía una cifra bonita para mostrar. Prefiero que se vea el proceso a inflar el caso con números que no puedo sustentar.',
            ],
          },
        ],
      },
      {
        h2: 'Qué se puede contar hoy',
        body: [
          'Muy poco, y esa es la respuesta honesta. Hay un proyecto en curso, con un alcance definido de campañas y funnels, en paralelo a un rediseño. Cuando haya un resultado que se pueda sustentar, esta página se actualiza con el detalle y, si el cliente lo autoriza, con el enlace.',
        ],
        list: {
          variant: 'ul',
          title: 'Lo que sí aplica desde ya para cualquier proyecto parecido',
          items: [
            'Un rediseño no es razón para apagar la adquisición: es razón para ordenarla.',
            'Los aprendizajes de campaña sobreviven al cambio de sitio; el presupuesto quemado sin medición, no.',
            'Definir la medición antes del sitio nuevo evita perder la comparabilidad entre el antes y el después.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Por qué este caso no tiene enlace ni cifras?',
        a: 'Porque está en curso y el diseño se está renovando. Publicar un enlace a algo que va a cambiar en semanas no le sirve a nadie, y publicar cifras de un proyecto abierto sería adelantarme a un resultado que todavía no puedo sustentar. Cuando cierre una etapa, actualizo esta página.',
      },
      {
        q: '¿Conviene pausar la pauta mientras se rediseña el sitio?',
        a: 'Normalmente no. Pausar borra el aprendizaje acumulado de las campañas y, al retomar, hay que volver a pagar por esos datos. Lo que sí conviene es ajustar expectativas durante la obra y usar ese tiempo para lo que no depende del diseño: estructura, medición y limpieza de desperdicio.',
      },
      {
        q: '¿Qué es exactamente un funnel de performance?',
        a: 'Es el camino que recorre alguien desde el primer contacto con un anuncio hasta la conversión, con cada paso medido. Sirve para una cosa concreta: saber en qué punto se cae la gente. Sin ese mapa, cuando las ventas bajan solo se puede subir el presupuesto y esperar, que es la forma más cara de trabajar.',
      },
      {
        q: '¿Puedes trabajar campañas si mi sitio no es el ideal?',
        a: 'Sí, y es lo más común. Lo que hago en ese caso es ser explícito sobre el techo: si la página de aterrizaje tiene fugas, hay un límite de rendimiento que ninguna optimización de campaña va a romper. Mejor saberlo desde el principio que descubrirlo tres meses después.',
      },
    ],

    related: [
      { path: '/servicios/google-ads/', label: 'Google Ads', note: 'Cómo estructuro campañas de búsqueda por intención.' },
      { path: '/servicios/meta-ads/', label: 'Meta Ads', note: 'El otro motor de performance cuando la demanda hay que crearla.' },
      { path: '/trabajo/bio-laboratorios/', label: 'Caso Bio Laboratorios', note: 'Un proyecto cerrado, con el resultado en ventas documentado.' },
      { path: '/contacto/', label: 'Contacto', note: 'Si estás en pleno rediseño y no sabes qué hacer con la pauta, hablemos.' },
    ],

    image: {
      src: '/og/asignar-campanas-funnels-performance.png',
      alt: 'Tablero de trabajo del proyecto en curso de Asignar, con la estructura de campañas y el mapa de funnels de performance',
      width: 1200,
      height: 630,
    },

    schemaType: 'CreativeWork',
    updated: '2026-08-24',
    priority: 0.6,
  },
]
