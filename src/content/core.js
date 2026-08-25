// ─────────────────────────────────────────────────────────────────────────────
// PÁGINAS NÚCLEO — home, los dos hubs (servicios y trabajo), perfil y contacto.
// Contrato de datos: ver src/content/SCHEMA.md. Hechos: ver src/data.js.
// Nada de lo que se afirma aquí sale de otro lado que no sea el perfil real.
// ─────────────────────────────────────────────────────────────────────────────

export const core = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. HOME
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/',
    cluster: 'home',
    parent: null,
    navLabel: 'Inicio',

    metaTitle: 'Iván Santiago Duarte — Marketing Digital en Bogotá',
    metaDescription:
      'Especialista en marketing digital en Bogotá con más de 6 años: Google Ads, Meta Ads, SEO, e-commerce y producto con IA. Mira los casos y escríbeme.',
    h1: 'Marketing digital con criterio: estrategia, pauta y producto con IA',
    keywords: [
      'especialista en marketing digital bogotá',
      'iván santiago duarte',
      'marketing digital colombia',
      'google ads y meta ads bogotá',
      'freelance marketing digital bogotá',
    ],

    intent: {
      type: 'comercial',
      query: 'especialista en marketing digital bogotá',
      audience:
        'Dueños de negocio y equipos de marca en Colombia que necesitan a alguien que ejecute, no solo que asesore.',
      problem:
        'Invierten en marca y en pauta sin una lectura clara de qué parte de esa plata está volviendo como venta.',
      outcome:
        'Saber por dónde empezar, con qué servicio, y ver casos reales de cómo se ve ese trabajo terminado.',
    },

    tldr: [
      'Más de 6 años en el oficio y 24+ marcas posicionadas, entre nacionales e internacionales.',
      'Con Bio Laboratorios el rediseño de marca, la tienda y el trabajo de SEO/SEM acompañaron un crecimiento de +278% en ventas; con Nona Gastro Bar, +120%.',
      'Seis frentes de trabajo: Google Ads, Meta Ads, SEO y SEM, e-commerce, branding y producto con IA. Se contratan sueltos o combinados.',
      'Vengo del diseño gráfico (2016), me formé en marketing y hoy construyo producto: Lumi está desplegada, no en una presentación.',
      'Base en Bogotá, trabajo remoto con Colombia y el resto de LATAM. Español nativo, inglés C1.',
    ],

    lead:
      'Soy Iván Santiago Duarte, especialista en marketing digital en Bogotá. Llevo más de seis años haciendo la misma pregunta incómoda en cada proyecto: cuánto de lo que estamos gastando vuelve como venta. Vengo del diseño gráfico, me formé en marketing y hoy también construyo producto digital con inteligencia artificial, así que puedo entrar por la marca, por la pauta o por el producto según lo que el negocio necesite. Lo que no hago es vender alcance como si fuera resultado.',
    ctaInline: { label: 'Cuéntame en qué está tu negocio', href: 'whatsapp' },

    sections: [
      {
        h2: 'Qué hago y con quién funciona bien',
        body: [
          'Trabajo en la franja donde se cruzan tres cosas que normalmente están separadas: la marca, la pauta y el producto. Ese cruce es el que suele estar roto. Hay marcas preciosas que no venden porque nadie las encuentra, campañas bien optimizadas que llevan tráfico a una tienda que se cae en el checkout, y productos digitales que nunca salieron del PDF.',
          'No soy agencia. Eso significa que hablas conmigo, que quien revisa la cuenta es el mismo que arma la estrategia, y también que no puedo tomar quince clientes al tiempo. Prefiero decirlo de entrada.',
        ],
        list: {
          variant: 'ul',
          title: 'Lo que traigo a la mesa',
          items: [
            'Criterio de diseño de verdad: seis años en Adobe Suite antes de tocar una campaña, no un curso de fin de semana.',
            'Medición antes que optimización: GA4 y Looker Studio configurados para que los números signifiquen algo.',
            'Ejecución en tienda: WooCommerce y Shopify, del montaje al arreglo de la fuga de conversión.',
            'Capacidad de construir producto: React y modelos de IA hasta el deploy, no solo hasta el prototipo.',
          ],
        },
        subsections: [
          {
            h3: 'Negocios que ya venden y quieren escalar',
            body: [
              'Es el caso más común. Ya hay demanda, ya hay pauta corriendo y el problema no es empezar sino entender qué parte del gasto sostiene el resultado. Aquí el primer mes casi siempre es de limpieza: medición, canibalización entre campañas y desperdicio en términos que nunca iban a convertir.',
            ],
          },
          {
            h3: 'Marcas que están saliendo al mercado',
            body: [
              'Cuando la demanda todavía no existe, empezar por Google Ads es pagar por búsquedas que nadie hace. En ese escenario el orden es otro: primero identidad y mensaje, después contenido y Meta Ads para crear la demanda, y solo entonces capturarla en buscadores. Así fue con Nona Gastro Bar, donde el trabajo de identidad y las más de 30 piezas gráficas venían antes que cualquier campaña.',
            ],
          },
        ],
      },
      {
        h2: 'Los seis frentes de trabajo',
        body: [
          'Cada servicio tiene su propia página con el método completo, lo que necesito de tu lado y cómo se reporta. El hub con la comparación completa está en /servicios/.',
        ],
        table: {
          caption: 'Los seis servicios, qué resuelve cada uno y dónde leer el detalle',
          head: ['Servicio', 'Qué resuelve', 'Página'],
          rows: [
            ['Google Ads', 'Capturar demanda que ya existe y medirla al CPA', '/servicios/google-ads/'],
            ['Meta Ads', 'Crear demanda donde todavía no la buscan', '/servicios/meta-ads/'],
            ['SEO y SEM', 'Dejar de depender del presupuesto diario para aparecer', '/servicios/seo-sem/'],
            ['E-commerce', 'Que la tienda no se caiga justo donde se cierra la venta', '/servicios/ecommerce/'],
            ['Branding y diseño', 'Que la marca se entienda y se recuerde', '/servicios/branding/'],
            ['Producto con IA', 'Convertir una idea en algo desplegado y usable', '/servicios/producto-ia/'],
          ],
        },
      },
      {
        h2: 'Resultados y casos que puedo mostrar',
        body: [
          'Prefiero mostrar trabajo terminado antes que adjetivos. Estos son los casos con los que empezaría si quieres ver cómo trabajo antes de escribirme. El listado completo, con los ocho proyectos y su tabla resumen, está en /trabajo/.',
        ],
        list: {
          variant: 'check',
          title: 'Por dónde empezar a mirar',
          items: [
            'Bio Laboratorios — rediseño de marca, e-commerce y SEO/SEM, con +278% en ventas: /trabajo/bio-laboratorios/',
            'Nona Gastro Bar — identidad, apertura, +30 piezas y liderazgo de un equipo de 5, con +120% en ventas: /trabajo/nona-gastro-bar/',
            'BLU Smartphones — proyecto integral de e-commerce, identidad, contenido y analítica: /trabajo/blu-smartphones/',
            'Lumi — app de bienestar emocional con IA, de la idea al deploy: /trabajo/lumi/',
          ],
        },
      },
      {
        h2: 'Cómo trabajo',
        body: [
          'El orden no es negociable, y es el mismo en un proyecto de marca que en una cuenta publicitaria: primero entender el negocio, después arreglar la medición, después ejecutar, y solo al final escalar lo que ya demostró que aguanta.',
        ],
        list: {
          variant: 'ol',
          title: 'Las cuatro etapas',
          items: [
            'Diagnóstico: qué vendes, cuánto deja de margen, cuánto vale un cliente y qué se está midiendo hoy.',
            'Arreglo de la base: conversiones en GA4, eventos que corresponden a plata real, tablero en Looker Studio.',
            'Ejecución: campañas, tienda, piezas o producto, según por dónde entre el proyecto.',
            'Escalado: subir inversión o alcance solo donde el costo por resultado aguanta, con el cambio documentado.',
          ],
        },
        subsections: [
          {
            h3: 'Antes de tocar nada: la medición',
            body: [
              'Optimizar sobre una medición rota es la forma más cara de perder tiempo. Si las conversiones están duplicadas, si un formulario abierto cuenta igual que una compra, o si GA4 y la plataforma de pauta reportan universos distintos, cualquier decisión que tomemos va a estar sesgada. Por eso el primer entregable de casi todo proyecto es aburrido: un tablero que dice la verdad.',
            ],
          },
          {
            h3: 'Cómo reporto',
            body: [
              'Con tableros en Looker Studio conectados en vivo, para que no dependas de que yo te mande un PDF a fin de mes. Y con una conversación corta donde explico qué cambió y por qué, porque un tablero sin lectura es solo colores.',
            ],
          },
        ],
      },
      {
        h2: 'Quién está detrás de esto',
        body: [
          'Empecé como diseñador gráfico en 2016, hice una Tecnología en Diseño Gráfico en la Universidad Central, una Maestría en Marketing en la Universidad Santo Tomás y una Diplomatura en Marketing Digital en Coderhouse. En el camino sumé 12 certificaciones entre Google Skillshop, Coderhouse, Santander y Daxus Latam.',
          'La trayectoria completa, con la formación y las certificaciones año por año, está en /perfil/. Si prefieres saltarte todo eso y contarme el problema de una vez, el camino corto es /contacto/.',
        ],
      },
    ],

    faq: [
      {
        q: '¿Cuánto cuesta contratar un especialista en marketing digital?',
        a: 'No publico una tarifa fija porque el alcance cambia demasiado entre un proyecto de identidad y la gestión mensual de varias cuentas de pauta. Lo que sí es fijo es cómo se arma: definimos entregables y frecuencia, y de ahí sale una propuesta con alcance cerrado. No cobro un porcentaje de la inversión publicitaria, porque eso me daría el incentivo de que gastes más y no de que gastes mejor.',
      },
      {
        q: '¿Qué conviene más, una agencia o un especialista independiente?',
        a: 'Depende del tamaño del problema. Una agencia tiene músculo para operar muchos frentes al tiempo y varios equipos en paralelo. Trabajando conmigo hablas siempre con quien ejecuta, no con un ejecutivo de cuenta que traduce, y eso hace el ciclo de decisión mucho más corto. La contracara honesta es que no puedo tomar un volumen ilimitado de proyectos al mismo tiempo.',
      },
      {
        q: '¿En cuánto tiempo se ven resultados en marketing digital?',
        a: 'Cambia según el canal, y desconfía de quien te dé una sola cifra para todo. En pauta las primeras señales aparecen entre dos y tres semanas, que es lo que tarda una campaña en salir de aprendizaje, y algo comparable contra el mes anterior toma entre sesenta y noventa días. En SEO el horizonte es de meses, no de semanas. En marca el resultado se nota cuando el mensaje empieza a repetirse solo.',
      },
      {
        q: '¿Trabajas con negocios fuera de Bogotá?',
        a: 'Sí. Estoy basado en Bogotá, trabajo remoto con el resto de Colombia y atiendo proyectos en LATAM, España y Estados Unidos. La operación es la misma: acceso a las plataformas, tableros en vivo y llamadas en el horario que acordemos. Mi horario base es de lunes a viernes, de 8:00 a 18:00 hora de Colombia.',
      },
      {
        q: '¿Qué necesitas para empezar a trabajar con una marca?',
        a: 'Tres cosas: acceso de lectura a lo que ya existe (pauta, analítica, tienda), los números del negocio que no salen en ninguna plataforma (margen, ticket promedio, cuánto vale un cliente) y una conversación de treinta minutos. Sin el segundo punto cualquier objetivo de costo por venta que definamos es un número inventado.',
      },
    ],

    related: [
      {
        path: '/servicios/',
        label: 'Servicios',
        note: 'Los seis frentes explicados, con la tabla de qué necesitas según el punto en el que está tu negocio.',
      },
      {
        path: '/trabajo/',
        label: 'Casos y proyectos',
        note: 'Los ocho proyectos con tipo, año y resultado, para ver el método aplicado y no solo descrito.',
      },
      {
        path: '/perfil/',
        label: 'Sobre mí',
        note: 'La ruta de diseñador gráfico a producto con IA, con formación y las 12 certificaciones.',
      },
      {
        path: '/contacto/',
        label: 'Contacto',
        note: 'Canales, tiempos de respuesta y qué traer a la primera conversación para no perder la llamada.',
      },
    ],

    image: {
      src: '/og/ivan-santiago-duarte-marketing-digital-bogota.png',
      alt: 'Iván Santiago Duarte, especialista en marketing digital en Bogotá, junto a los indicadores de +278% en ventas y 24+ marcas posicionadas',
      width: 1200,
      height: 630,
    },

    schemaType: 'ProfilePage',
    updated: '2026-08-24',
    priority: 1.0,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. HUB DE SERVICIOS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/servicios/',
    cluster: 'servicios',
    parent: '/',
    navLabel: 'Servicios',

    metaTitle: 'Servicios de marketing digital | Iván Santiago Duarte',
    metaDescription:
      'Google Ads, Meta Ads, SEO/SEM, e-commerce, branding y producto con IA. Mira qué servicio necesita tu negocio según el punto en el que está hoy.',
    h1: 'Seis servicios que se contratan sueltos o se combinan según el problema',
    keywords: [
      'servicios de marketing digital bogotá',
      'agencia google ads y meta ads',
      'servicio seo sem colombia',
      'diseño de marca y e-commerce bogotá',
    ],

    intent: {
      type: 'comercial',
      query: 'servicios de marketing digital en bogotá',
      audience:
        'Negocios que saben que necesitan ayuda pero no tienen claro si el problema es la marca, la pauta o la tienda.',
      problem:
        'Contratan el servicio equivocado para el momento en que están y queman presupuesto en el canal que no era.',
      outcome:
        'Un criterio claro para elegir por dónde empezar y el detalle de cada servicio en su propia página.',
    },

    tldr: [
      'Seis servicios: Google Ads, Meta Ads, SEO y SEM, e-commerce, branding y diseño, y producto digital con IA.',
      'No todos sirven al mismo tiempo: la tabla de esta página cruza el momento del negocio con el servicio que corresponde.',
      'La regla que aplico: si la tienda no convierte, mejorar la campaña solo encarece la fuga.',
      'Cada servicio se puede contratar solo, pero el resultado grande casi siempre viene de combinar dos o tres.',
      'Todo proyecto arranca por medición en GA4 y un tablero en Looker Studio, sin importar por dónde entre.',
    ],

    lead:
      'La pregunta que más me hacen no es cuánto cuesta, sino por dónde empezar. Y la respuesta honesta es que depende del punto en el que esté el negocio: no le sirve lo mismo a una marca que abre la semana entrante que a una tienda que ya factura y está estancada. Estos seis servicios son los frentes en los que trabajo, y esta página está armada para que elijas con criterio y no por lo que esté de moda. Si después de leerla sigues sin saber cuál es el tuyo, escríbeme y lo miramos juntos.',
    ctaInline: { label: 'No sé cuál necesito, ayúdame a elegir', href: '/contacto/' },

    sections: [
      {
        h2: 'Los seis servicios y qué resuelve cada uno',
        body: [
          'Cada uno tiene su propia página con el método completo, lo que necesito de tu lado, cómo reporto y las preguntas frecuentes de ese frente en particular. Esta tabla es el mapa; el detalle está un clic más adentro.',
        ],
        table: {
          caption: 'Los seis servicios: qué problema resuelve cada uno y dónde leer el método completo',
          head: ['Servicio', 'El problema que resuelve', 'Página'],
          rows: [
            [
              'Google Ads',
              'Hay gente buscando lo que vendes y le está apareciendo otro',
              '/servicios/google-ads/',
            ],
            [
              'Meta Ads',
              'Nadie te busca todavía porque no saben que existes',
              '/servicios/meta-ads/',
            ],
            [
              'SEO y SEM',
              'El día que apagas la pauta desapareces de internet',
              '/servicios/seo-sem/',
            ],
            [
              'E-commerce',
              'Llega tráfico, agregan al carrito y ahí se pierde la venta',
              '/servicios/ecommerce/',
            ],
            [
              'Branding y diseño',
              'La marca no se entiende, no se recuerda o no se ve seria',
              '/servicios/branding/',
            ],
            [
              'Producto con IA',
              'Hay una idea de producto que lleva meses sin salir del documento',
              '/servicios/producto-ia/',
            ],
          ],
        },
      },
      {
        h2: 'Qué servicio necesitas según en qué punto está tu negocio',
        body: [
          'Esta es la tabla que más uso en las primeras llamadas. Ubica tu negocio en la primera columna y lee el resto de la fila: normalmente el diagnóstico se cae de maduro y la conversación deja de ser sobre canales para volverse sobre prioridades.',
        ],
        table: {
          caption: 'Momento del negocio, síntoma típico y por dónde conviene empezar',
          head: ['En qué punto estás', 'Síntoma típico', 'Por dónde empiezo', 'Servicio'],
          rows: [
            [
              'Vas a lanzar y no existes todavía',
              'No hay nombre, ni identidad, ni quién te busque',
              'Identidad, mensaje y piezas antes de gastar un peso en pauta',
              '/servicios/branding/',
            ],
            [
              'Ya tienes marca pero nadie te conoce',
              'Buenas piezas, cero tráfico, cero demanda',
              'Crear demanda con contenido y campañas de alcance y conversión en Meta',
              '/servicios/meta-ads/',
            ],
            [
              'Ya te buscan pero no te encuentran',
              'La categoría se busca y aparece la competencia',
              'Capturar esa búsqueda con campañas medidas al costo por venta',
              '/servicios/google-ads/',
            ],
            [
              'Vendes online pero se cae la conversión',
              'Tráfico que llega, carritos que se abandonan',
              'Arreglar ficha, checkout y medición antes de subir inversión',
              '/servicios/ecommerce/',
            ],
            [
              'Vives de la pauta y quieres soltarte',
              'Si apagas las campañas, se apaga el negocio',
              'Construir tráfico orgánico que no dependa del presupuesto diario',
              '/servicios/seo-sem/',
            ],
            [
              'Tienes una idea de producto sin salir',
              'Meses de documento y ningún usuario probándolo',
              'Definir el alcance mínimo y llevarlo a producción con IA',
              '/servicios/producto-ia/',
            ],
          ],
        },
      },
      {
        h2: 'Cómo se combinan entre sí',
        body: [
          'Contratar un servicio suelto funciona cuando el problema está bien localizado. Cuando el problema es el negocio completo, la combinación importa más que cada pieza. Estos son los tres combos que más he armado.',
        ],
        subsections: [
          {
            h3: 'Marca nueva que sale al mercado',
            body: [
              'Branding primero, contenido después, pauta al final. Si sales a comprar clics con una marca que no se entiende, estás pagando para que la gente conozca algo confuso. Nona Gastro Bar siguió este orden: identidad y más de 30 piezas gráficas antes de la apertura, y el acompañamiento en ventas vino después.',
            ],
            list: {
              variant: 'ul',
              items: [
                'Identidad, sistema visual y mensaje: /servicios/branding/',
                'Contenido y campañas para crear demanda: /servicios/meta-ads/',
                'Captura de la demanda ya creada: /servicios/google-ads/',
              ],
            },
          },
          {
            h3: 'Tienda que ya vende y quiere escalar',
            body: [
              'Aquí el orden se invierte: primero tienda, después pauta. Subir inversión sobre una tienda que pierde gente en el checkout es multiplicar la fuga. Bio Laboratorios es el caso donde esta combinación se ve completa: marca, tienda y buscadores trabajando juntos, con un crecimiento de +278% en ventas.',
            ],
            list: {
              variant: 'ul',
              items: [
                'Auditoría de conversión y arreglo de la tienda: /servicios/ecommerce/',
                'Escalado de campañas sobre una base que ya convierte: /servicios/google-ads/',
                'Tráfico orgánico para bajar la dependencia del presupuesto: /servicios/seo-sem/',
              ],
            },
          },
          {
            h3: 'Negocio que depende solo de pauta',
            body: [
              'Es el escenario más frágil y el más común. Todo el tráfico es pago, el costo por venta sube cada trimestre y no hay ningún activo propio. La salida es lenta pero es la única: construir contenido y posicionamiento orgánico mientras la pauta sostiene el presente.',
            ],
            list: {
              variant: 'ul',
              items: [
                'Posicionamiento orgánico y arquitectura de contenido: /servicios/seo-sem/',
                'Pauta sosteniendo la venta mientras el orgánico madura: /servicios/meta-ads/',
                'Producto propio para dejar de alquilar toda la audiencia: /servicios/producto-ia/',
              ],
            },
          },
        ],
      },
      {
        h2: 'Cómo trabajo un encargo, entre por donde entre',
        body: [
          'El servicio cambia; el orden de trabajo no. Estas cuatro etapas son iguales en un brand book, en una cuenta publicitaria y en un producto digital.',
        ],
        list: {
          variant: 'ol',
          title: 'Las cuatro etapas',
          items: [
            'Diagnóstico del negocio: margen, ticket promedio, valor de un cliente y qué se está midiendo hoy.',
            'Base de medición: eventos en GA4 que correspondan a plata real y un tablero en Looker Studio.',
            'Ejecución del alcance acordado, con revisiones en puntos definidos y no solo al final.',
            'Lectura y ajuste: qué funcionó, qué se corta y qué se escala, documentado para que lo puedas auditar.',
          ],
        },
        subsections: [
          {
            h3: 'Qué necesito de tu lado',
            list: {
              variant: 'check',
              items: [
                'Acceso de lectura a lo que ya existe: pauta, analítica, tienda, redes.',
                'Los números que no salen en ninguna plataforma: margen, ticket promedio y valor de un cliente.',
                'Una persona que decida. No necesito un comité, necesito a quien pueda aprobar.',
                'Treinta minutos iniciales para entender el negocio antes de proponer nada.',
              ],
            },
          },
          {
            h3: 'Qué entrego yo',
            list: {
              variant: 'check',
              items: [
                'Un diagnóstico por escrito de lo que está mal, con el impacto estimado de cada arreglo.',
                'Los archivos y accesos a tu nombre desde el día uno: trabajo con acceso, no con propiedad.',
                'Tableros en Looker Studio conectados en vivo, que quedan funcionando aunque dejemos de trabajar juntos.',
                'La documentación de lo que se cambió, para que otro pueda continuar sin arqueología.',
              ],
            },
          },
        ],
      },
      {
        h2: 'Lo que no hago',
        body: [
          'Decir que no también es parte del servicio. Estas son las cosas que me piden con frecuencia y que prefiero aclarar antes de una propuesta y no después.',
        ],
        list: {
          variant: 'ul',
          items: [
            'No cobro un porcentaje de la inversión publicitaria: crea el incentivo de que gastes más, no mejor.',
            'No prometo primeras posiciones en Google en un plazo fijo. Nadie serio puede garantizar eso.',
            'No compro seguidores ni interacciones. Inflan el reporte y no mueven una sola venta.',
            'No trabajo sobre cuentas a las que no puedo acceder ni auditar.',
            'No entrego estrategias sin ejecución, ni ejecución sin poder cuestionar la estrategia.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Puedo contratar un solo servicio o tengo que tomarlos todos?',
        a: 'Uno solo, sin problema, y es lo más común cuando el problema está bien localizado. Si lo que se rompió es el checkout, no tiene sentido rehacer la marca. Ahora, si en el diagnóstico veo que el servicio que me pediste no va a mover la aguja porque el cuello de botella está en otro lado, te lo digo antes de cotizar.',
      },
      {
        q: '¿Trabajas por proyecto cerrado o por mensualidad?',
        a: 'Las dos formas, según la naturaleza del trabajo. Un brand book, una tienda o un producto son proyectos con inicio y fin. La gestión de pauta y el SEO son trabajo continuo, porque optimizar una cuenta una sola vez y desaparecer no sirve de nada. Lo que definimos siempre por adelantado es el alcance y los entregables, no las horas.',
      },
      {
        q: '¿El presupuesto de pauta va incluido en lo que se cobra?',
        a: 'No. La inversión publicitaria se paga directamente desde tus cuentas de Google y Meta, a tu nombre y con tu método de pago. Yo gestiono esa inversión, no la facturo. Así ves cada peso que sale y no dependes de que alguien te reporte cuánto se gastó.',
      },
      {
        q: '¿De quién son las cuentas y los archivos cuando termina el trabajo?',
        a: 'Tuyos, desde el primer día. Las cuentas de Google Ads, Meta, GA4 y la tienda se crean o se mantienen a tu nombre y yo entro con acceso de usuario. Al cerrar un proyecto entrego los archivos editables, la documentación de lo que se cambió y los tableros funcionando.',
      },
      {
        q: '¿Atiendes negocios fuera de Colombia?',
        a: 'Sí. Además de Colombia, atiendo proyectos de forma remota en LATAM, España y Estados Unidos. El inglés lo manejo en nivel C1, así que las reuniones y la documentación en inglés no son problema. Lo único que ajustamos es la franja horaria de las llamadas.',
      },
    ],

    related: [
      {
        path: '/servicios/google-ads/',
        label: 'Google Ads',
        note: 'El servicio con el que más se entra cuando ya existe demanda que capturar.',
      },
      {
        path: '/servicios/ecommerce/',
        label: 'E-commerce',
        note: 'Antes de escalar inversión conviene revisar que la tienda no esté perdiendo la venta.',
      },
      {
        path: '/trabajo/',
        label: 'Casos y proyectos',
        note: 'Los ocho casos donde estos servicios se ven aplicados y combinados de verdad.',
      },
      {
        path: '/contacto/',
        label: 'Contacto',
        note: 'Si sigues sin saber cuál es tu caso, la llamada de diagnóstico lo resuelve rápido.',
      },
    ],

    image: {
      src: '/og/servicios-marketing-digital-bogota.png',
      alt: 'Mapa de los seis servicios de marketing digital que ofrece Iván Santiago Duarte, desde branding hasta producto con inteligencia artificial',
      width: 1200,
      height: 630,
    },

    schemaType: 'CollectionPage',
    updated: '2026-08-24',
    priority: 0.9,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. HUB DE TRABAJO
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/trabajo/',
    cluster: 'trabajo',
    parent: '/',
    navLabel: 'Trabajo',

    metaTitle: 'Portafolio de casos: marketing, marca y producto',
    metaDescription:
      'Ocho proyectos reales: +278% en ventas con Bio Laboratorios, +120% con Nona Gastro Bar, e-commerce, marca y la app Lumi. Mira cada caso por dentro.',
    h1: 'Ocho proyectos, de una identidad de marca a una app con IA en producción',
    keywords: [
      'portafolio marketing digital colombia',
      'casos de éxito marketing digital',
      'proyectos e-commerce y branding bogotá',
      'portafolio iván santiago duarte',
    ],

    intent: {
      type: 'informacional',
      query: 'portafolio de marketing digital colombia casos reales',
      audience:
        'Quien está evaluando con quién trabajar y quiere ver trabajo terminado antes de escribir un mensaje.',
      problem:
        'Los portafolios suelen mostrar piezas bonitas sin decir qué problema resolvían ni qué pasó después.',
      outcome:
        'Un mapa de los ocho proyectos con tipo, año y resultado, y el detalle de cada uno en su ficha.',
    },

    tldr: [
      'Ocho casos documentados que cubren marca, e-commerce, pauta, operación de marketing y producto con IA.',
      'Dos con resultado en ventas medido: Bio Laboratorios con +278% y Nona Gastro Bar con +120%.',
      'Tres son proyectos de punta a punta: BLU Smartphones, Limonada Pink y AIISO Consulting.',
      'Lumi es producto propio: app de bienestar emocional con IA en React 19, Supabase y Claude, desplegada.',
      'Varios se pueden revisar en vivo, en Behance o en el sitio del cliente, sin que medie una presentación mía.',
    ],

    lead:
      'Un portafolio sirve para una sola cosa: que no tengas que creerme. Acá están los ocho proyectos que mejor explican cómo trabajo, ordenados por lo que resolvían y no por lo bonitos que quedaron. Algunos son de marca, otros de tienda y pauta, uno es una operación de marketing montada desde cero y otro es un producto propio con IA que está desplegado. Cada ficha cuenta el problema, lo que hice y hasta dónde llega lo que puedo afirmar.',
    ctaInline: { label: 'Quiero algo así para mi marca', href: 'whatsapp' },

    sections: [
      {
        h2: 'Los ocho casos de un vistazo',
        body: [
          'La tabla es el índice del cluster: cada fila enlaza a la ficha completa del proyecto. Bio Laboratorios aparece sin año porque el trabajo se dio por etapas y prefiero no ponerle una fecha que no me consta.',
        ],
        table: {
          caption: 'Los ocho proyectos: tipo de trabajo, año y resultado documentado',
          head: ['Proyecto', 'Tipo', 'Año', 'Resultado', 'Ficha'],
          rows: [
            [
              'Bio Laboratorios',
              'Marca · E-commerce · SEO/SEM',
              '—',
              '+278% en ventas',
              '/trabajo/bio-laboratorios/',
            ],
            [
              'Nona Gastro Bar',
              'Branding · Marketing',
              '2024–2025',
              '+120% en ventas',
              '/trabajo/nona-gastro-bar/',
            ],
            [
              'BLU Smartphones',
              'E-commerce · Branding',
              '2025',
              'Proyecto end-to-end',
              '/trabajo/blu-smartphones/',
            ],
            [
              'Limonada Pink',
              'Branding · E-commerce · Ads',
              '2025',
              'Brand book y tienda online',
              '/trabajo/limonada-pink/',
            ],
            [
              'AIISO Consulting',
              'Estrategia · Web · Redes',
              '2025',
              'Estrategia end-to-end',
              '/trabajo/aiiso-consulting/',
            ],
            [
              'GrowthBro',
              'Marketing · Operación',
              '2024',
              'Operación montada desde cero',
              '/trabajo/growthbro/',
            ],
            [
              'Lumi',
              'Producto propio · IA',
              '2026',
              'De la idea al deploy',
              '/trabajo/lumi/',
            ],
            [
              'Asignar',
              'Campañas · Funnels',
              '2026',
              'Campañas y funnels de performance',
              '/trabajo/asignar/',
            ],
          ],
        },
      },
      {
        h2: 'Los casos agrupados por tipo de trabajo',
        body: [
          'La misma lista, ordenada por la naturaleza del encargo. Sirve si llegaste buscando algo puntual: quien necesita una marca no tiene por qué leer sobre funnels.',
        ],
        subsections: [
          {
            h3: 'Marca, identidad y contenido',
            body: [
              'Proyectos donde el punto de partida fue visual y de mensaje. Aquí es donde se nota que vengo del diseño gráfico: el sistema tiene que aguantar el uso diario, no solo verse bien en la presentación.',
            ],
            list: {
              variant: 'ul',
              items: [
                'Nona Gastro Bar — identidad, más de 30 piezas y la apertura del restaurante liderando un equipo de 5, con +120% en ventas: /trabajo/nona-gastro-bar/',
                'Limonada Pink — brand book completo y tienda online, con campañas en Meta y Google encima: /trabajo/limonada-pink/',
                'BLU Smartphones — identidad y contenido dentro de un proyecto integral de marca y e-commerce: /trabajo/blu-smartphones/',
              ],
            },
          },
          {
            h3: 'E-commerce, pauta y crecimiento',
            body: [
              'Proyectos donde el objetivo era vender más, y donde el trabajo se reparte entre arreglar la tienda, ordenar la medición y hacer rendir la inversión.',
            ],
            list: {
              variant: 'ul',
              items: [
                'Bio Laboratorios — rediseño de marca, e-commerce y SEO/SEM, con un crecimiento de +278% en ventas: /trabajo/bio-laboratorios/',
                'BLU Smartphones — e-commerce, identidad, contenido y analítica de punta a punta: /trabajo/blu-smartphones/',
                'Asignar — estrategia de campañas y funnels de performance, optimizando lo interno mientras se renueva el diseño: /trabajo/asignar/',
              ],
            },
          },
          {
            h3: 'Estrategia, operación y producto',
            body: [
              'Proyectos donde el encargo no era una pieza sino un sistema: montar la operación de marketing de una agencia, ordenar la presencia digital de una consultora o llevar un producto propio hasta producción.',
            ],
            list: {
              variant: 'ul',
              items: [
                'GrowthBro — la operación de marketing y la presencia digital de la agencia, montadas desde cero: /trabajo/growthbro/',
                'AIISO Consulting — perfil de negocio, redes y sitio web, junto al equipo de GrowthBro: /trabajo/aiiso-consulting/',
                'Lumi — app de bienestar emocional con chat de IA, detección de crisis y journey gamificado, en React 19, Supabase y Claude: /trabajo/lumi/',
              ],
            },
          },
        ],
      },
      {
        h2: 'Qué tienen en común estos proyectos',
        body: [
          'Son negocios distintos, con presupuestos distintos y en categorías que no se parecen. Lo que se repite es el método, no el sector.',
        ],
        list: {
          variant: 'check',
          title: 'El patrón que se repite',
          items: [
            'Empezar por el negocio y no por el canal: primero margen y ticket, después plataforma.',
            'Dejar la medición antes que la optimización, para que los números signifiquen algo.',
            'Trabajar la marca y el rendimiento como una sola cosa, porque una campaña no arregla un mensaje confuso.',
            'Entregar accesos y archivos a nombre del cliente, sin dejar dependencias artificiales.',
            'Documentar lo que se cambió, para que el proyecto sobreviva a que yo no esté.',
          ],
        },
        subsections: [
          {
            h3: 'Lo que sí puedo afirmar',
            body: [
              'Las cifras que aparecen acá son las que el cliente midió y compartió: +278% en ventas en Bio Laboratorios y +120% en Nona Gastro Bar. En el resto de los casos hablo de alcance de trabajo, no de resultados, porque no todos los proyectos terminaron con un número comparable en la mano.',
            ],
          },
          {
            h3: 'Lo que no voy a inventar',
            body: [
              'No vas a encontrar acá testimonios inventados, premios que no existen ni cifras redondeadas hacia arriba para que se vean mejor. Si un proyecto no tiene un resultado medible que yo pueda sostener, se cuenta por lo que fue: el trabajo que se hizo y las decisiones detrás.',
            ],
          },
        ],
      },
      {
        h2: 'Cómo leer estos números sin engañarse',
        body: [
          'Un crecimiento en ventas nunca tiene una sola causa. Decir lo contrario es marketing de marketeros. Estas son las tres advertencias que le doy a cualquiera que esté evaluando resultados ajenos, incluidos los míos.',
        ],
        list: {
          variant: 'ol',
          items: [
            'Ningún porcentaje es atribuible a una sola persona: en estos proyectos había producto, equipo, operación y momento de mercado.',
            'Un porcentaje alto sobre una base pequeña se ve espectacular y significa menos de lo que parece. Pregunta siempre por la base.',
            'Lo que sí es transferible no es el número, es el método: qué se midió, qué se cortó y qué se escaló, y en qué orden.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Los resultados que muestras son atribuibles solo a tu trabajo?',
        a: 'No, y quien te diga lo contrario sobre su portafolio te está vendiendo humo. En Bio Laboratorios y en Nona Gastro Bar mi trabajo fue una parte importante del cambio, junto con producto, operación y equipo. Lo que sí puedo sostener es qué hice exactamente en cada caso, y eso está descrito en cada ficha.',
      },
      {
        q: '¿Puedo ver estos proyectos en vivo y no solo en capturas?',
        a: 'Varios sí. Nona Gastro Bar, Limonada Pink, BLU Smartphones y AIISO Consulting están publicados en mi Behance, GrowthBro se puede visitar en su sitio y Lumi está desplegada y se puede usar. Cada ficha tiene el enlace directo cuando existe.',
      },
      {
        q: '¿Tienes casos en mi industria?',
        a: 'Los ocho casos cubren gastronomía, e-commerce de consumo, consultoría, operación de agencia y producto digital propio. Si tu categoría no está en esa lista, lo relevante no es el sector sino el tipo de problema: capturar demanda existente, crear demanda nueva o arreglar la conversión. Escríbeme con tu caso y te digo con franqueza si se parece a algo que ya resolví.',
      },
      {
        q: '¿Trabajas con negocios pequeños o solo con marcas grandes?',
        a: 'Con ambos, y en la lista se nota: hay un restaurante y una marca joven al lado de un proyecto para una marca de smartphones. Lo que cambia con el tamaño no es la calidad del trabajo sino el alcance y el ritmo. Un negocio pequeño suele necesitar menos frentes abiertos y más foco en el que sí mueve la caja.',
      },
      {
        q: '¿Por qué algunos casos no muestran cifras?',
        a: 'Porque no todos los proyectos terminan con un número limpio y comparable, y porque en varios la información de ventas es del cliente y no me corresponde publicarla. En esos casos cuento el alcance del trabajo: qué se entregó, qué decisiones se tomaron y por qué. Prefiero una ficha sin cifra a una cifra que no pueda sostener.',
      },
    ],

    related: [
      {
        path: '/trabajo/bio-laboratorios/',
        label: 'Caso Bio Laboratorios',
        note: 'El caso con el resultado más alto y la combinación completa de marca, tienda y buscadores.',
      },
      {
        path: '/trabajo/lumi/',
        label: 'Caso Lumi',
        note: 'Producto propio con IA, desplegado: el mejor ejemplo de hasta dónde llega la parte técnica.',
      },
      {
        path: '/servicios/',
        label: 'Servicios',
        note: 'Los seis frentes que se combinaron en estos proyectos, explicados uno por uno.',
      },
      {
        path: '/contacto/',
        label: 'Contacto',
        note: 'Si alguno de estos casos se parece a tu situación, es la conversación más corta.',
      },
    ],

    image: {
      src: '/og/portafolio-casos-marketing-digital-bogota.png',
      alt: 'Mosaico con los ocho proyectos del portafolio de Iván Santiago Duarte, entre identidades de marca, tiendas online y la app Lumi',
      width: 1200,
      height: 630,
    },

    schemaType: 'CollectionPage',
    updated: '2026-08-24',
    priority: 0.9,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. PERFIL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/perfil/',
    cluster: 'perfil',
    parent: '/',
    navLabel: 'Perfil',

    metaTitle: 'Sobre mí: de diseñador gráfico a producto con IA',
    metaDescription:
      'Quién soy: más de 6 años del diseño gráfico al marketing y al producto con IA. Maestría en Marketing, 12 certificaciones y base en Bogotá, remote-ready.',
    h1: 'Un marketero que diseña y ahora también construye producto',
    keywords: [
      'iván santiago duarte perfil',
      'especialista marketing digital bogotá cv',
      'diseñador gráfico y marketing digital',
      'perfil profesional marketing colombia',
    ],

    intent: {
      type: 'navegacional',
      query: 'iván santiago duarte marketing digital quién es',
      audience:
        'Clientes, reclutadores y socios que quieren verificar con quién van a trabajar antes de una llamada.',
      problem:
        'Un perfil de LinkedIn no explica por qué alguien que diseña, pauta y programa no es un aprendiz de todo.',
      outcome:
        'La trayectoria completa, la formación verificable y las 12 certificaciones con emisor y año.',
    },

    tldr: [
      'Más de 6 años de oficio: diseñador gráfico desde 2016, marketing después, producto con IA hoy.',
      'Formación: Maestría en Marketing en la Universidad Santo Tomás, Tecnología en Diseño Gráfico en la Universidad Central y Diplomatura en Marketing Digital en Coderhouse.',
      '12 certificaciones entre Google Skillshop, Coderhouse, Santander y Daxus Latam, con emisor y año.',
      'Idiomas: español nativo, inglés C1, italiano básico. Base en Bogotá y trabajo remoto.',
      '24+ marcas posicionadas, nacionales e internacionales.',
    ],

    lead:
      'Soy un híbrido raro: marketero que diseña y que ahora construye productos con inteligencia artificial. Empecé como diseñador gráfico en 2016, crecí hasta liderar estrategias de marketing que mueven números reales, y en el camino aprendí algo poco común: a unir la creatividad con el análisis, el diseño con las métricas. Hoy manejo Google y Meta Ads, SEO/SEM, e-commerce y analítica, y escribo el código de mis propios productos. Mi propósito es simple y no ha cambiado: aportar valor y generar resultados comerciales tangibles para las marcas con las que trabajo.',
    ctaInline: { label: 'Ver el perfil completo en LinkedIn', href: 'linkedin' },

    sections: [
      {
        h2: 'La ruta, de 2016 a hoy',
        body: [
          'No fue un cambio de carrera, fue una acumulación. Cada etapa se montó encima de la anterior sin botar nada, y por eso hoy puedo entrar a un proyecto por la marca, por la campaña o por el producto sin cambiar de persona.',
        ],
        subsections: [
          {
            h3: 'Diseño gráfico, desde 2016',
            body: [
              'Empecé donde empiezan muchos: haciendo piezas. Estudié la Tecnología en Diseño Gráfico en la Universidad Central entre 2017 y 2019, y esos años dejaron una obsesión que todavía tengo con la jerarquía visual, la tipografía y el detalle. La diferencia práctica es que hoy no dependo de nadie para producir una pieza ni para revisar si una identidad aguanta el uso real.',
            ],
            list: {
              variant: 'ul',
              items: [
                'Sistemas de identidad y brand books completos, no logos sueltos.',
                'Producción de piezas en volumen: en Nona Gastro Bar fueron más de 30.',
                'Adobe Suite como herramienta de trabajo diario, no como línea en un CV.',
              ],
            },
          },
          {
            h3: 'Marketing: la formación y las marcas',
            body: [
              'La Maestría en Marketing en la Universidad Santo Tomás, entre 2019 y 2024, fue el puente entre hacer piezas y responder por resultados. En paralelo pasé a operar cuentas, montar tiendas y liderar equipos: en Nona Gastro Bar lideré un equipo de 5 durante la apertura, y en GrowthBro monté la operación de marketing y la presencia digital de la agencia desde cero, un caso que está en /trabajo/growthbro/.',
            ],
            list: {
              variant: 'ul',
              items: [
                'Google Ads y Meta Ads gestionados a métricas de negocio: costo por venta, ROAS y ticket promedio.',
                'SEO y SEM para dejar de depender del presupuesto diario.',
                'E-commerce en WooCommerce y Shopify, del lanzamiento a la optimización.',
                'Analítica con GA4 y tableros en vivo en Looker Studio.',
              ],
            },
          },
          {
            h3: 'Producto con IA, hoy',
            body: [
              'La etapa actual empezó por curiosidad y terminó en producción. Lumi es una app de bienestar emocional con chat de IA en tiempo real, detección de crisis y un journey gamificado, construida en React 19 con Supabase y Claude, y está desplegada: el caso completo está en /trabajo/lumi/. Certifiqué en Git y GitHub, en primeros pasos en IA y en aplicaciones con IA con Daxus Latam para no quedarme en el nivel de conversación.',
            ],
            list: {
              variant: 'ul',
              items: [
                'De la idea al deploy: no solo lo imagino, lo llevo a producción.',
                'React, Supabase y modelos de IA como parte del stack de trabajo.',
                'Automatización aplicada al marketing, no como demo sino como operación.',
              ],
            },
          },
        ],
      },
      {
        h2: 'Formación',
        body: [
          'Tres titulaciones, todas en Colombia y todas verificables. El orden es tan importante como el contenido: diseño primero, marketing encima, y la parte digital como capa más reciente.',
        ],
        table: {
          caption: 'Titulaciones, institución y periodo',
          head: ['Titulación', 'Institución', 'Periodo'],
          rows: [
            ['Diplomatura en Marketing Digital', 'Coderhouse', '2024 — 2026'],
            ['Maestría en Marketing', 'Universidad Santo Tomás', '2019 — 2024'],
            ['Tecnología en Diseño Gráfico', 'Universidad Central', '2017 — 2019'],
          ],
        },
      },
      {
        h2: 'Las 12 certificaciones',
        body: [
          'Certifico por una razón práctica: las plataformas cambian cada año y la certificación obliga a volver a estudiar lo que uno cree que ya sabe. Están ordenadas por emisor, con el año en que se obtuvieron.',
        ],
        table: {
          caption: 'Las 12 certificaciones, con su emisor y el año en que se obtuvieron',
          head: ['Certificación', 'Emisor', 'Año'],
          rows: [
            ['Display de Google Ads', 'Google Skillshop', '2026'],
            ['Búsqueda de Google Ads', 'Google Skillshop', '2026'],
            ['Search Ads 360', 'Google Skillshop', '2025'],
            ['Google Analytics (GA4)', 'Google Skillshop', '2025'],
            ['Google Ads — Medición', 'Google Skillshop', '2025'],
            ['SEO y Content Marketing', 'Santander', '2026'],
            ['Git & GitHub', 'Daxus Latam', '2026'],
            ['Primeros pasos en IA', 'Daxus Latam', '2026'],
            ['Aplicaciones con IA', 'Daxus Latam', '2026'],
            ['Fundamentos de Power BI', 'Daxus Latam', '2025'],
            ['Community Manager y Publicidad', 'Coderhouse', '2021'],
            ['E-commerce', 'Coderhouse', '2021'],
          ],
        },
        subsections: [
          {
            h3: 'Qué significan en la práctica',
            body: [
              'Una certificación no reemplaza haber operado una cuenta con plata real de un cliente, y no la presento como si lo hiciera. Lo que sí garantizan es que conozco de primera mano lo que la plataforma acaba de cambiar, que es exactamente donde se pierde dinero cuando alguien opera con manuales de hace tres años.',
            ],
          },
        ],
      },
      {
        h2: 'Stack, idiomas y base de operación',
        body: [
          'La lista corta de con qué trabajo, en qué idiomas y desde dónde. Sin adornos: si una herramienta no está acá es porque no la uso lo suficiente como para responder por ella.',
        ],
        table: {
          caption: 'Datos de trabajo: herramientas, idiomas y ubicación',
          head: ['Campo', 'Detalle'],
          rows: [
            ['Pauta', 'Google Ads · Meta Ads · remarketing · funnels'],
            ['Analítica', 'GA4 · Looker Studio · Power BI (fundamentos)'],
            ['E-commerce', 'WooCommerce · Shopify · CRO'],
            ['Diseño', 'Adobe Suite · identidad · sistemas de piezas'],
            ['Producto', 'React · Supabase · modelos de IA · Git y GitHub'],
            ['Idiomas', 'Español nativo · Inglés C1 · Italiano básico'],
            ['Base', 'Bogotá, Colombia · remote-ready'],
          ],
        },
        list: {
          variant: 'check',
          title: 'Cómo se traduce eso en el día a día',
          items: [
            'Puedo auditar una cuenta, rediseñar la pieza y arreglar la tienda sin coordinar tres proveedores.',
            'Leo y escribo documentación técnica en inglés sin intermediarios.',
            'Trabajo en horario de Colombia, de lunes a viernes, y ajusto franja para clientes de otros países.',
            'Puedo hablar con un desarrollador en sus términos y con un dueño de negocio en los suyos.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Eres freelance o tienes una agencia?',
        a: 'Trabajo de forma independiente. Cuando un proyecto necesita más manos, armo equipo, como pasó en la apertura de Nona Gastro Bar donde lideré a cinco personas, o en AIISO Consulting donde trabajé junto al equipo de GrowthBro. Pero el interlocutor y el responsable del trabajo soy yo, no un ejecutivo de cuenta.',
      },
      {
        q: '¿Un diseñador que hace marketing no es aprendiz de todo?',
        a: 'Sería un riesgo real si cada disciplina se hubiera quedado a medias. Lo que hice fue secuencial y con formación detrás: seis años de diseño con una tecnología en la Universidad Central, una maestría en marketing en la Santo Tomás y certificaciones anuales en las plataformas que opero. La ventaja concreta es que el brief no se pierde entre tres proveedores que no se hablan.',
      },
      {
        q: '¿Trabajas de forma remota o presencial?',
        a: 'Estoy basado en Bogotá y trabajo remoto por defecto, con toda la operación en línea: accesos, tableros en vivo y llamadas. En proyectos locales que lo requieren, como una apertura o una sesión de producción, la presencialidad se acuerda por etapas puntuales y no como norma.',
      },
      {
        q: '¿Hablas inglés para proyectos internacionales?',
        a: 'Sí, inglés en nivel C1, además de español nativo e italiano básico. Puedo llevar reuniones, documentación y comunicación con equipos en inglés sin necesitar intermediario, que es lo que suele importar cuando el cliente está fuera del país.',
      },
      {
        q: '¿Qué herramientas manejas realmente en el día a día?',
        a: 'Google Ads y Meta Ads para pauta, GA4 y Looker Studio para medición y reporte, WooCommerce y Shopify para tienda, Adobe Suite para diseño y React con Supabase y modelos de IA para producto. La tabla de esta página tiene el desglose completo por frente de trabajo.',
      },
    ],

    related: [
      {
        path: '/trabajo/',
        label: 'Casos y proyectos',
        note: 'La trayectoria contada acá, aplicada en ocho proyectos concretos.',
      },
      {
        path: '/servicios/producto-ia/',
        label: 'Producto con IA',
        note: 'La etapa más reciente del perfil, convertida en un servicio contratable.',
      },
      {
        path: '/servicios/branding/',
        label: 'Branding y diseño',
        note: 'De donde vengo: los años de diseño gráfico aplicados a marcas que se recuerdan.',
      },
      {
        path: '/contacto/',
        label: 'Contacto',
        note: 'Si el perfil encaja con lo que necesitas, acá está cómo empezar la conversación.',
      },
    ],

    image: {
      src: '/og/perfil-ivan-santiago-duarte-bogota.png',
      alt: 'Retrato de Iván Santiago Duarte en su espacio de trabajo en Bogotá, junto a una línea de tiempo de diseñador gráfico a especialista en producto con IA',
      width: 1200,
      height: 630,
    },

    schemaType: 'AboutPage',
    updated: '2026-08-24',
    priority: 0.7,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. CONTACTO
  // ═══════════════════════════════════════════════════════════════════════════
  {
    path: '/contacto/',
    cluster: 'contacto',
    parent: '/',
    navLabel: 'Contacto',

    metaTitle: 'Contacto | Marketing digital en Bogotá, Colombia',
    metaDescription:
      'Escríbeme por WhatsApp o correo y hablamos de tu proyecto. Qué información traer, cómo son las etapas de trabajo y en cuánto tiempo te respondo.',
    h1: 'Hablemos: qué traer a la primera conversación',
    keywords: [
      'contactar especialista marketing digital bogotá',
      'asesoría marketing digital colombia',
      'contratar freelance google ads bogotá',
      'contacto iván santiago duarte',
    ],

    intent: {
      type: 'transaccional',
      query: 'contactar especialista en marketing digital bogotá',
      audience:
        'Quien ya decidió pedir ayuda y quiere escribir un mensaje que no termine en veinte correos de ida y vuelta.',
      problem:
        'La primera conversación se va en preguntas básicas que se podían haber resuelto antes de la llamada.',
      outcome:
        'El canal correcto, el tiempo de respuesta real y la lista exacta de lo que conviene traer.',
    },

    tldr: [
      'WhatsApp para lo urgente y correo para lo que tiene documentos: son los dos canales que reviso siempre.',
      'Respondo WhatsApp el mismo día hábil y el correo entre 24 y 48 horas.',
      'Horario base: lunes a viernes, de 8:00 a 18:00, hora de Colombia (GMT-5).',
      'La primera conversación dura unos treinta minutos y sirve para diagnosticar, no para venderte nada.',
      'Trabajo desde Bogotá y atiendo proyectos en Colombia, LATAM, España y Estados Unidos.',
    ],

    lead:
      'Escribirme es fácil; lo que quiero es que la primera conversación sirva. Por eso esta página no es solo una lista de canales: es lo que conviene traer para que en treinta minutos podamos pasar de la presentación al diagnóstico. Si ya tienes claro el problema, ve directo al canal que prefieras y cuéntamelo en tres líneas. Si todavía no sabes ni cómo nombrarlo, con más razón hablemos, porque nombrar bien el problema suele ser la mitad del trabajo.',
    ctaInline: { label: 'Escribirme por WhatsApp', href: 'whatsapp' },

    sections: [
      {
        h2: 'Canales y tiempos de respuesta',
        body: [
          'Estos son los cuatro canales por los que estoy y para qué sirve cada uno. Los tiempos son reales, no promesas de landing: si algo se va a demorar más, lo aviso antes de que lo preguntes.',
        ],
        table: {
          caption: 'Canales de contacto, uso recomendado y tiempo de respuesta',
          head: ['Canal', 'Para qué sirve mejor', 'Tiempo de respuesta'],
          rows: [
            [
              'WhatsApp — +57 316 537 1483',
              'Primer contacto, dudas cortas y coordinar una llamada',
              'El mismo día hábil',
            ],
            [
              'Correo — ivansantiagoduarte@outlook.com',
              'Briefs, accesos, propuestas y todo lo que deje rastro',
              'Entre 24 y 48 horas hábiles',
            ],
            [
              'LinkedIn — /in/santiagoduartec',
              'Verificar el perfil, contactos profesionales y oportunidades laborales',
              'Algunos días: no es mi canal principal',
            ],
            [
              'Behance — /santiagoduartec',
              'Revisar el trabajo de marca y diseño antes de escribir',
              'Solo consulta, sin mensajería',
            ],
          ],
        },
        subsections: [
          {
            h3: 'Horario y zona horaria',
            body: [
              'Trabajo de lunes a viernes, de 8:00 a 18:00, hora de Colombia (GMT-5). Un mensaje de sábado se responde el lunes, salvo que estemos en medio de un lanzamiento y hayamos acordado otra cosa. Si el proyecto está en España, México o Estados Unidos, la franja de las llamadas se acuerda al inicio y queda fija.',
            ],
          },
        ],
      },
      {
        h2: 'Qué traer a la primera conversación',
        body: [
          'No necesitas un brief formal ni una presentación. Necesitas tener a mano cuatro o cinco datos que casi siempre están en la cabeza del dueño y casi nunca escritos. Con eso, la llamada rinde el doble.',
        ],
        list: {
          variant: 'check',
          title: 'Lo mínimo para que la llamada sirva',
          items: [
            'Qué vendes y a quién, en una frase que un desconocido entienda.',
            'Cuánto vale en promedio una venta y qué margen deja.',
            'Qué has intentado hasta ahora y qué pasó, incluyendo lo que salió mal.',
            'Qué resultado querrías ver y en qué plazo lo estás pensando.',
            'Quién decide y quién ejecuta del lado tuyo.',
          ],
        },
        subsections: [
          {
            h3: 'Si ya inviertes en pauta',
            body: [
              'Trae los accesos de lectura, o al menos las cifras gruesas: cuánto inviertes al mes, en qué plataformas y qué costo por venta estás viendo. Con eso puedo decirte en la misma llamada si el problema está en la campaña, en la medición o en la página a la que llega la gente, que son tres diagnósticos muy distintos y llevan a servicios distintos: /servicios/google-ads/ o /servicios/ecommerce/.',
            ],
            list: {
              variant: 'ul',
              items: [
                'Acceso de lectura a Google Ads, Meta Business y GA4.',
                'Inversión mensual actual y desde cuándo se sostiene.',
                'Si alguien más gestionó la cuenta antes y qué se cambió.',
              ],
            },
          },
          {
            h3: 'Si estás empezando de cero',
            body: [
              'Mucho más simple: no traigas plataformas, trae negocio. Qué vendes, por qué alguien te compraría a ti y no al de al lado, y cuánta plata puedes sostener durante tres meses sin depender de que la primera campaña funcione. Empezar sin ese margen de aire es la causa más común de que un proyecto se apague en la semana cuatro. Si todavía no hay marca, el punto de partida suele ser /servicios/branding/.',
            ],
            list: {
              variant: 'ul',
              items: [
                'La propuesta de valor en una frase, aunque esté cruda.',
                'Si ya existe marca, logo o piezas, y en qué estado están.',
                'Cuánto puedes sostener durante los primeros tres meses.',
              ],
            },
          },
        ],
      },
      {
        h2: 'Cómo es trabajar conmigo, etapa por etapa',
        body: [
          'Así es como funciona una colaboración de principio a fin. No es una promesa de resultados sino de método: el orden en que ocurren las cosas y quién responde por qué en cada tramo.',
        ],
        list: {
          variant: 'ol',
          title: 'Las cinco etapas de una colaboración',
          items: [
            'Conversación inicial de unos treinta minutos: entiendo el negocio y te digo con franqueza si puedo ayudarte o no.',
            'Diagnóstico: reviso lo que ya existe con acceso de lectura y te devuelvo por escrito qué está fallando y qué tanto pesa.',
            'Propuesta con alcance cerrado: entregables, frecuencia y en qué punto se revisa, para que ninguno de los dos improvise.',
            'Ejecución con revisiones en puntos acordados, no solo al final. Si algo no está funcionando, lo hablamos cuando pasa.',
            'Cierre o continuidad: entrego archivos, accesos y documentación, y decidimos si el trabajo sigue de forma continua o queda cerrado.',
          ],
        },
        subsections: [
          {
            h3: 'Qué necesito de tu lado',
            list: {
              variant: 'check',
              items: [
                'Acceso de lectura a plataformas, tienda y analítica desde el diagnóstico.',
                'Los números del negocio que no salen en ninguna plataforma.',
                'Una persona que pueda aprobar, para que las decisiones no queden en un comité.',
                'Respuestas en un plazo razonable: un proyecto se muere más por silencio que por presupuesto.',
              ],
            },
          },
          {
            h3: 'Qué entrego yo',
            list: {
              variant: 'check',
              items: [
                'Diagnóstico por escrito con el impacto estimado de cada arreglo.',
                'Cuentas y archivos a tu nombre desde el día uno: trabajo con acceso, no con propiedad.',
                'Tableros en Looker Studio conectados en vivo, para que no dependas de mi reporte mensual.',
                'La documentación de lo que se cambió, para que otro pueda continuar sin arqueología.',
              ],
            },
          },
        ],
      },
      {
        h2: 'Cuándo no soy la persona indicada',
        body: [
          'Decirlo temprano nos ahorra tiempo a los dos. Si tu caso está en esta lista, no me escribas por cortesía: no te voy a servir y prefiero decírtelo acá y no en la propuesta.',
        ],
        list: {
          variant: 'ul',
          items: [
            'Si buscas garantías de primera posición en Google en un plazo fijo. Nadie serio puede prometer eso.',
            'Si necesitas volumen de contenido diario para muchas cuentas al tiempo: eso es trabajo de equipo, no mío.',
            'Si el presupuesto de pauta es tan ajustado que no alcanza para salir de la fase de aprendizaje de una campaña.',
            'Si no vas a poder dar acceso a las plataformas ni compartir los números del negocio.',
            'Si lo que se busca es inflar métricas para una presentación y no vender más.',
          ],
        },
      },
    ],

    faq: [
      {
        q: '¿Cuánto cobras por tus servicios?',
        a: 'No manejo una lista de precios pública porque el alcance cambia mucho entre proyectos. Después de la conversación inicial y del diagnóstico te paso una propuesta con entregables y frecuencia definidos, y ahí el número tiene sentido. Lo que no hago es cobrar un porcentaje de la inversión publicitaria, porque premia el gasto y no el resultado.',
      },
      {
        q: '¿La primera conversación tiene costo?',
        a: 'No. Los primeros treinta minutos son para entender tu negocio y decirte si puedo ayudarte, y a veces la respuesta honesta es que no. Lo que sí toma trabajo real es el diagnóstico detallado sobre tus cuentas, y eso ya entra dentro del alcance que acordemos.',
      },
      {
        q: '¿En cuánto tiempo respondes un mensaje?',
        a: 'WhatsApp el mismo día hábil y correo entre 24 y 48 horas hábiles. Los mensajes de fin de semana se responden el lunes. Si estoy en medio de un lanzamiento y voy a demorarme más de lo normal, lo aviso en vez de dejar el mensaje en visto.',
      },
      {
        q: '¿Trabajas con contrato?',
        a: 'Sí, siempre. Antes de empezar quedan por escrito el alcance, los entregables, la frecuencia y las condiciones de cierre. Es tan útil para ti como para mí: evita que el proyecto crezca sin control y deja claro qué pasa con accesos y archivos cuando la colaboración termine.',
      },
      {
        q: '¿Haces solo auditorías, sin gestión continua?',
        a: 'Sí. Hay negocios que ya tienen quien ejecute y lo que necesitan es una lectura externa de qué está mal. En ese caso el entregable es el diagnóstico por escrito y una llamada para explicarlo, y el equipo interno decide qué implementar. No es requisito quedarse conmigo después.',
      },
    ],

    related: [
      {
        path: '/servicios/',
        label: 'Servicios',
        note: 'Antes de escribir, la tabla de esta página te dice qué servicio corresponde a tu momento.',
      },
      {
        path: '/trabajo/',
        label: 'Casos y proyectos',
        note: 'Si prefieres ver trabajo terminado antes de hablar, empieza por acá.',
      },
      {
        path: '/perfil/',
        label: 'Sobre mí',
        note: 'Con quién vas a hablar: trayectoria, formación y certificaciones verificables.',
      },
      {
        path: '/servicios/google-ads/',
        label: 'Google Ads',
        note: 'El motivo más frecuente de un primer mensaje: una cuenta que gasta y no se entiende.',
      },
    ],

    image: {
      src: '/og/contacto-ivan-santiago-duarte-bogota.png',
      alt: 'Tarjeta de contacto de Iván Santiago Duarte con los canales de WhatsApp, correo y LinkedIn y el horario de atención en Bogotá',
      width: 1200,
      height: 630,
    },

    schemaType: 'ContactPage',
    updated: '2026-08-24',
    priority: 0.7,
  },
]

export default core
