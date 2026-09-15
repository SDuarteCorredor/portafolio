import { useId } from 'react'

// Arte de portada de cada caso.
//
// Lo que había antes era una escena generativa sembrada con el slug: manchas de
// color y las dos iniciales del proyecto en contorno. Nunca quedaba un hueco,
// pero tampoco decía nada — ocho tarjetas con "BI", "BL", "NO" flotando en un
// degradado se leen como arte de relleno, que es exactamente lo que son.
//
// Acá cada caso tiene una escena dibujada a mano que muestra el entregable:
// Bio Laboratorios es una tienda con su curva de ventas, Limonada Pink es un
// brand book abierto, Asignar es un embudo. El visitante entiende de qué tipo
// de trabajo se trata antes de leer una palabra, que es justo lo que un
// portafolio tiene que hacer en la grilla.
//
// Por qué SVG dibujado y no una imagen generada:
//
//   · Es honesto. No inventa capturas de trabajo que no existe — son
//     abstracciones del tipo de entregable, no maquetas de pantallas ajenas.
//   · Pesa ~2 kB por escena y es nítido en cualquier pantalla y densidad.
//   · Usa el color del caso (`accent` en data.js), así que la grilla se lee
//     como ocho proyectos distintos.
//
// Cuando haya arte real (render, captura, mockup), se pone `cover` en el item
// de `data.js` y esa imagen gana: CaseArt es el piso, no el techo.

// ───────────────────────────────────────────────────────────────────────────
// Lenguaje común
//
// Las ocho escenas comparten el mismo tratamiento para que la grilla se lea
// como un sistema y no como ocho ilustraciones sueltas: objeto de trazo fino
// sobre vacío, un foco de color detrás, viñeta y grano. Lo único que cambia
// entre casos es el objeto y el tono.
// ───────────────────────────────────────────────────────────────────────────

const VB = { w: 320, h: 200 }

/** Trazo principal / secundario, en unidades del viewBox. */
const S1 = 1.5
const S2 = 0.9

function Defs({ uid, accent }) {
  return (
    <defs>
      {/* Foco detrás del objeto: da profundidad sin necesidad de un piso. */}
      <radialGradient id={`${uid}-glow`} cx="50%" cy="46%" r="58%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.38" />
        <stop offset="55%" stopColor={accent} stopOpacity="0.10" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>

      {/* Relleno de las superficies "pantalla": casi negro, no transparente,
          para que el objeto se despegue del fondo de la tarjeta. */}
      <linearGradient id={`${uid}-panel`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#12141F" />
        <stop offset="100%" stopColor="#090B13" />
      </linearGradient>

      {/* Degradado de acento para barras y curvas. */}
      <linearGradient id={`${uid}-fade`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor={accent} stopOpacity="0.05" />
        <stop offset="100%" stopColor={accent} stopOpacity="0.55" />
      </linearGradient>

      {/* Grano: rompe el banding del foco en pantallas de 8 bits. */}
      <filter id={`${uid}-grain`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" />
        <feColorMatrix type="saturate" values="0" />
      </filter>

      {/* Viñeta: hunde las esquinas para que el ojo caiga en el centro. */}
      <radialGradient id={`${uid}-vig`} cx="50%" cy="50%" r="75%">
        <stop offset="60%" stopColor="#06070D" stopOpacity="0" />
        <stop offset="100%" stopColor="#06070D" stopOpacity="0.55" />
      </radialGradient>
    </defs>
  )
}

/** Renglones de texto simulados — el idioma estándar de un wireframe. */
function Lines({ x, y, w, n = 3, gap = 6, accent, last = 0.55 }) {
  return Array.from({ length: n }, (_, i) => (
    <rect
      key={i}
      x={x}
      y={y + i * gap}
      width={i === n - 1 ? w * last : w}
      height="2"
      rx="1"
      fill={accent}
      opacity={0.22 - i * 0.03}
    />
  ))
}

/** Marco de navegador: ventana con tres puntos y barra de dirección. */
function Window({ x, y, w, h, uid, accent, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={`url(#${uid}-panel)`} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="5"
        fill="none"
        stroke={accent}
        strokeOpacity="0.32"
        strokeWidth={S1}
      />
      <line x1={x} y1={y + 11} x2={x + w} y2={y + 11} stroke={accent} strokeOpacity="0.2" strokeWidth={S2} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 7 + i * 5.5} cy={y + 5.5} r="1.5" fill={accent} opacity={0.5 - i * 0.12} />
      ))}
      <rect x={x + 26} y={y + 3.6} width={w - 34} height="4" rx="2" fill={accent} opacity="0.12" />
      {children}
    </g>
  )
}

/** Teléfono visto de frente, con muesca. */
function Phone({ x, y, w, h, uid, accent, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="9" fill={`url(#${uid}-panel)`} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="9"
        fill="none"
        stroke={accent}
        strokeOpacity="0.38"
        strokeWidth={S1}
      />
      <rect x={x + w / 2 - 7} y={y + 3.5} width="14" height="2.6" rx="1.3" fill={accent} opacity="0.35" />
      {children}
    </g>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Las ocho escenas
// ───────────────────────────────────────────────────────────────────────────

/** Lumi — app propia: la conversación con la IA y el journey con racha. */
function Lumi({ uid, accent }) {
  return (
    <g>
      {/* Anillo de progreso del journey, detrás y a la izquierda. */}
      <g transform="translate(74 100)">
        <circle r="30" fill="none" stroke={accent} strokeOpacity="0.14" strokeWidth={S1} />
        <circle
          r="30"
          fill="none"
          stroke={accent}
          strokeOpacity="0.85"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="134 189"
          transform="rotate(-90)"
        />
        <circle r="21" fill="none" stroke={accent} strokeOpacity="0.2" strokeWidth={S2} strokeDasharray="2 4" />
        {/* Llama de la racha, simplificada. */}
        <path
          d="M0 -9c4 4.4 6.6 7.4 6.6 11.3A6.6 6.6 0 0 1 0 9a6.6 6.6 0 0 1-6.6-6.7C-6.6-.5-4 -3.6 0-9Z"
          fill={accent}
          opacity="0.75"
        />
      </g>

      {/* Teléfono con el chat. */}
      <Phone x={132} y={24} w={72} h={152} uid={uid} accent={accent}>
        {/* Burbujas alternadas: la izquierda es la IA, la derecha el usuario. */}
        <rect x={140} y={40} width={40} height={13} rx="6.5" fill={accent} opacity="0.18" />
        <rect x={140} y={57} width={52} height={17} rx="7" fill={accent} opacity="0.13" />
        <rect x={156} y={78} width={40} height={13} rx="6.5" fill={accent} opacity="0.5" />
        <rect x={140} y={95} width={48} height={20} rx="7" fill={accent} opacity="0.13" />
        <rect x={164} y={119} width={32} height={12} rx="6" fill={accent} opacity="0.5" />

        {/* Escribiendo: tres puntos. */}
        <g transform="translate(140 141)">
          <rect width="26" height="11" rx="5.5" fill={accent} opacity="0.16" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={7 + i * 6} cy="5.5" r="1.7" fill={accent} opacity={0.75 - i * 0.2} />
          ))}
        </g>

        <rect x={140} y={160} width={56} height="6" rx="3" fill={accent} opacity="0.1" />
      </Phone>

      {/* Señal de detección: latido a la derecha. */}
      <g transform="translate(232 92)" opacity="0.8">
        <rect x="0" y="0" width="52" height="34" rx="6" fill={`url(#${uid}-panel)`} />
        <rect x="0" y="0" width="52" height="34" rx="6" fill="none" stroke={accent} strokeOpacity="0.28" strokeWidth={S2} />
        <path
          d="M6 20 L14 20 L18 12 L23 27 L28 17 L32 20 L46 20"
          fill="none"
          stroke={accent}
          strokeOpacity="0.9"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  )
}

/** Bio Laboratorios — la tienda montada y la curva de ventas que siguió. */
function BioLaboratorios({ uid, accent }) {
  return (
    <g>
      {/* Fichas de producto: tres frascos en grilla. */}
      {[0, 1, 2].map((i) => {
        const x = 30 + i * 60
        return (
          <g key={i}>
            <rect x={x} y={92} width={48} height={72} rx="5" fill={`url(#${uid}-panel)`} />
            <rect x={x} y={92} width={48} height={72} rx="5" fill="none" stroke={accent} strokeOpacity="0.26" strokeWidth={S2} />
            {/* Frasco. */}
            <g transform={`translate(${x + 24} 122)`}>
              <rect x="-3" y="-16" width="6" height="5" rx="1.5" fill={accent} opacity="0.6" />
              <path
                d="M-9 -11h18a3 3 0 0 1 3 3v17a4 4 0 0 1-4 4h-16a4 4 0 0 1-4-4V-8a3 3 0 0 1 3-3Z"
                fill={accent}
                opacity="0.18"
              />
              <path
                d="M-9 -11h18a3 3 0 0 1 3 3v17a4 4 0 0 1-4 4h-16a4 4 0 0 1-4-4V-8a3 3 0 0 1 3-3Z"
                fill="none"
                stroke={accent}
                strokeOpacity="0.7"
                strokeWidth={S2}
              />
              <rect x="-6" y="0" width="12" height="7" rx="1" fill={accent} opacity="0.45" />
            </g>
            <Lines x={x + 8} y={144} w={32} n={2} gap={6} accent={accent} />
          </g>
        )
      })}

      {/* La curva: es el caso del +278%, así que la subida manda la escena. */}
      <path
        d="M24 78 C 70 74, 96 64, 130 52 S 214 30, 292 20 L292 84 L24 84 Z"
        fill={`url(#${uid}-fade)`}
        opacity="0.5"
      />
      <path
        d="M24 78 C 70 74, 96 64, 130 52 S 214 30, 292 20"
        fill="none"
        stroke={accent}
        strokeOpacity="0.95"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="292" cy="20" r="4" fill={accent} />
      <circle cx="292" cy="20" r="8" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth={S2} />
      <line x1="24" y1="84" x2="296" y2="84" stroke={accent} strokeOpacity="0.18" strokeWidth={S2} />
    </g>
  )
}

/** BLU Smartphones — el proyecto de punta a punta: tienda + pieza + producto. */
function BluSmartphones({ uid, accent }) {
  return (
    <g>
      {/* Tienda al fondo. */}
      <Window x={92} y={28} w={196} h={124} uid={uid} accent={accent}>
        <rect x={102} y={22 + 28} width={84} height={40} rx="4" fill={accent} opacity="0.12" />
        <Lines x={102} y={100} w={80} n={3} gap={7} accent={accent} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={196 + (i % 2) * 44} y={50 + Math.floor(i / 2) * 44} width={38} height={38} rx="3" fill={accent} opacity="0.1" />
            <rect
              x={196 + (i % 2) * 44}
              y={50 + Math.floor(i / 2) * 44}
              width={38}
              height={38}
              rx="3"
              fill="none"
              stroke={accent}
              strokeOpacity="0.22"
              strokeWidth={S2}
            />
          </g>
        ))}
        <rect x={102} y={126} width={44} height={11} rx="5.5" fill={accent} opacity="0.55" />
      </Window>

      {/* El producto adelante, que es lo que se vende. */}
      <g transform="translate(0 0)">
        <Phone x={30} y={54} w={62} h={122} uid={uid} accent={accent}>
          <rect x={38} y={70} width={46} height={52} rx="3" fill={accent} opacity="0.16" />
          <Lines x={38} y={130} w={44} n={2} gap={7} accent={accent} />
          <rect x={38} y={150} width={30} height={10} rx="5" fill={accent} opacity="0.55" />
        </Phone>
      </g>
    </g>
  )
}

/** Nona Gastro Bar — identidad aplicada: monograma, carta y pieza. */
function NonaGastroBar({ uid, accent }) {
  return (
    <g>
      {/* Plato / aplicación circular de marca. */}
      <g transform="translate(232 118)">
        <circle r="38" fill={`url(#${uid}-panel)`} />
        <circle r="38" fill="none" stroke={accent} strokeOpacity="0.3" strokeWidth={S1} />
        <circle r="28" fill="none" stroke={accent} strokeOpacity="0.2" strokeWidth={S2} strokeDasharray="1.5 4" />
        {/* Monograma: dos arcos que sugieren una N sin escribirla. */}
        <path
          d="M-11 12V-12l22 24V-12"
          fill="none"
          stroke={accent}
          strokeOpacity="0.9"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* La carta: la pieza que más se imprimió. */}
      <g transform="rotate(-5 96 104)">
        <rect x={56} y={36} width={80} height={132} rx="4" fill={`url(#${uid}-panel)`} />
        <rect x={56} y={36} width={80} height={132} rx="4" fill="none" stroke={accent} strokeOpacity="0.34" strokeWidth={S1} />
        <line x1={68} y1={56} x2={124} y2={56} stroke={accent} strokeOpacity="0.55" strokeWidth="2" />
        <Lines x={68} y={68} w={56} n={3} gap={6} accent={accent} />
        <line x1={68} y1={94} x2={124} y2={94} stroke={accent} strokeOpacity="0.25" strokeWidth={S2} />
        <Lines x={68} y={102} w={56} n={3} gap={6} accent={accent} />
        <line x1={68} y1={128} x2={124} y2={128} stroke={accent} strokeOpacity="0.25" strokeWidth={S2} />
        <Lines x={68} y={136} w={56} n={2} gap={6} accent={accent} />
      </g>

      {/* Pieza de contenido detrás, apilada: eran +30. */}
      <g transform="rotate(7 150 88)" opacity="0.65">
        <rect x={128} y={48} width={62} height={62} rx="4" fill={`url(#${uid}-panel)`} />
        <rect x={128} y={48} width={62} height={62} rx="4" fill="none" stroke={accent} strokeOpacity="0.24" strokeWidth={S2} />
        <circle cx={159} cy={74} r="13" fill={accent} opacity="0.2" />
        <Lines x={140} y={96} w={38} n={2} gap={5} accent={accent} />
      </g>
    </g>
  )
}

/** Limonada Pink — el brand book abierto: espécimen y paleta. */
function LimonadaPink({ uid, accent }) {
  return (
    <g>
      {/* Doble página. */}
      <g>
        <rect x={26} y={40} width={132} height={124} rx="3" fill={`url(#${uid}-panel)`} />
        <rect x={162} y={40} width={132} height={124} rx="3" fill={`url(#${uid}-panel)`} />
        <rect x={26} y={40} width={132} height={124} rx="3" fill="none" stroke={accent} strokeOpacity="0.3" strokeWidth={S1} />
        <rect x={162} y={40} width={132} height={124} rx="3" fill="none" stroke={accent} strokeOpacity="0.3" strokeWidth={S1} />
        {/* Lomo. */}
        <line x1={160} y1={40} x2={160} y2={164} stroke={accent} strokeOpacity="0.45" strokeWidth="2" />
      </g>

      {/* Izquierda: la marca aplicada. Un espécimen tipográfico abstracto se
          leía como un gráfico de torta — acá va el símbolo, que es lo que
          abre un brand book: rodaja de limón y vaso. */}
      <g transform="translate(92 98)">
        <circle r="30" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth={S1} />
        <circle r="30" fill={accent} opacity="0.08" />
        {/* Gajos. */}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={Math.cos((i * Math.PI) / 4) * 26}
            y2={Math.sin((i * Math.PI) / 4) * 26}
            stroke={accent}
            strokeOpacity="0.3"
            strokeWidth={S2}
          />
        ))}
        {/* Vaso al frente. */}
        <path
          d="M-13 -14h26l-3.5 30a5 5 0 0 1-5 4.4h-9a5 5 0 0 1-5-4.4Z"
          fill="#0B0D17"
        />
        <path
          d="M-13 -14h26l-3.5 30a5 5 0 0 1-5 4.4h-9a5 5 0 0 1-5-4.4Z"
          fill={accent}
          opacity="0.28"
        />
        <path
          d="M-13 -14h26l-3.5 30a5 5 0 0 1-5 4.4h-9a5 5 0 0 1-5-4.4Z"
          fill="none"
          stroke={accent}
          strokeOpacity="0.9"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <line x1="-10.5" y1="-2" x2="10.5" y2="-2" stroke={accent} strokeOpacity="0.75" strokeWidth={S1} />
      </g>

      {/* Bajada del símbolo, como en la página de un manual. */}
      <Lines x={64} y={140} w={56} n={2} gap={6} accent={accent} />

      {/* Derecha: paleta y reglas. */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={176 + i * 28}
            y={56}
            width={22}
            height={30}
            rx="2.5"
            fill={accent}
            opacity={0.85 - i * 0.2}
          />
        ))}
        <Lines x={176} y={98} w={104} n={4} gap={7} accent={accent} />
        <line x1={176} y1={132} x2={280} y2={132} stroke={accent} strokeOpacity="0.25" strokeWidth={S2} />
        <Lines x={176} y={140} w={104} n={2} gap={7} accent={accent} />
      </g>
    </g>
  )
}

/** AIISO Consulting — sitio y presencia: la web con los perfiles alrededor. */
function AiisoConsulting({ uid, accent }) {
  return (
    <g>
      <Window x={46} y={34} w={200} h={130} uid={uid} accent={accent}>
        <rect x={60} y={62} width={92} height={9} rx="4.5" fill={accent} opacity="0.55" />
        <Lines x={60} y={80} w={110} n={3} gap={7} accent={accent} />
        <rect x={60} y={108} width={42} height={12} rx="6" fill={accent} opacity="0.6" />
        <rect x={108} y={108} width={42} height={12} rx="6" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth={S2} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={60 + i * 42} y={134} width={34} height={18} rx="3" fill={accent} opacity="0.1" />
        ))}
      </Window>

      {/* Perfiles de redes: dos tarjetas que se despegan del sitio. */}
      {[
        { x: 224, y: 46 },
        { x: 240, y: 104 },
      ].map((c, i) => (
        <g key={i} opacity={0.95 - i * 0.15}>
          <rect x={c.x} y={c.y} width={62} height={46} rx="5" fill={`url(#${uid}-panel)`} />
          <rect x={c.x} y={c.y} width={62} height={46} rx="5" fill="none" stroke={accent} strokeOpacity="0.32" strokeWidth={S2} />
          <circle cx={c.x + 14} cy={c.y + 14} r="6.5" fill={accent} opacity="0.4" />
          <Lines x={c.x + 25} y={c.y + 10} w={28} n={2} gap={6} accent={accent} />
          <Lines x={c.x + 9} y={c.y + 29} w={44} n={2} gap={6} accent={accent} />
        </g>
      ))}
    </g>
  )
}

/** GrowthBro — la operación: tablero con canales, embudo y KPIs. */
function GrowthBro({ uid, accent }) {
  const bars = [16, 27, 21, 38, 31, 46, 41, 56]
  return (
    <g>
      <rect x={28} y={28} width={264} height={144} rx="7" fill={`url(#${uid}-panel)`} />
      <rect x={28} y={28} width={264} height={144} rx="7" fill="none" stroke={accent} strokeOpacity="0.3" strokeWidth={S1} />
      <line x1={28} y1={46} x2={292} y2={46} stroke={accent} strokeOpacity="0.18" strokeWidth={S2} />
      <rect x={40} y={35} width={44} height={5} rx="2.5" fill={accent} opacity="0.4" />

      {/* KPIs. */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={40 + i * 58} y={58} width={50} height={30} rx="4" fill={accent} opacity="0.07" />
          <rect x={46 + i * 58} y={64} width={22} height={7} rx="2" fill={accent} opacity={0.6 - i * 0.12} />
          <rect x={46 + i * 58} y={76} width={34} height={3} rx="1.5" fill={accent} opacity="0.2" />
        </g>
      ))}

      {/* Barras por canal. */}
      <g>
        {bars.map((b, i) => (
          <rect
            key={i}
            x={40 + i * 21}
            y={158 - b}
            width={13}
            height={b}
            rx="2"
            fill={`url(#${uid}-fade)`}
            stroke={accent}
            strokeOpacity="0.4"
            strokeWidth="0.6"
          />
        ))}
        <line x1={38} y1={158} x2={212} y2={158} stroke={accent} strokeOpacity="0.22" strokeWidth={S2} />
      </g>

      {/* Embudo a la derecha: la operación completa, no solo la pauta. */}
      <g transform="translate(224 100)">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={-(30 - i * 6)}
            y={i * 15}
            width={(30 - i * 6) * 2}
            height={11}
            rx="2"
            fill={accent}
            opacity={0.55 - i * 0.1}
          />
        ))}
      </g>
    </g>
  )
}

/** Asignar — el caso abierto: el embudo de performance, paso a paso. */
function Asignar({ uid, accent }) {
  const stages = [
    { w: 200, label: 4 },
    { w: 152, label: 3 },
    { w: 104, label: 2 },
    { w: 60, label: 1 },
  ]
  return (
    <g>
      {stages.map((s, i) => {
        const y = 36 + i * 34
        return (
          <g key={i}>
            <rect x={160 - s.w / 2} y={y} width={s.w} height={24} rx="4" fill={accent} opacity={0.5 - i * 0.09} />
            <rect
              x={160 - s.w / 2}
              y={y}
              width={s.w}
              height={24}
              rx="4"
              fill="none"
              stroke={accent}
              strokeOpacity={0.6 - i * 0.1}
              strokeWidth={S2}
            />
            {/* Caída entre etapas: la métrica que importa en un funnel. */}
            {i < stages.length - 1 && (
              <path
                d={`M160 ${y + 24} l0 6 m-3 -3 l3 3 l3 -3`}
                fill="none"
                stroke={accent}
                strokeOpacity="0.5"
                strokeWidth={S2}
                strokeLinecap="round"
              />
            )}
          </g>
        )
      })}

      {/* Lecturas laterales: el porcentaje que se pierde en cada paso. */}
      {[0, 1, 2].map((i) => (
        <g key={i} opacity="0.55">
          <line
            x1={272}
            y1={48 + i * 34}
            x2={272}
            y2={82 + i * 34}
            stroke={accent}
            strokeOpacity="0.45"
            strokeWidth={S2}
          />
          <circle cx={272} cy={48 + i * 34} r="2" fill={accent} />
          <rect x={278} y={60 + i * 34} width={16} height={3} rx="1.5" fill={accent} opacity="0.5" />
        </g>
      ))}

      {/* En obra: el diseño se está renovando, y el caso lo dice. */}
      <g transform="translate(34 150)" opacity="0.5">
        <rect width="46" height="4" rx="2" fill={accent} opacity="0.4" />
        <rect y="9" width="30" height="4" rx="2" fill={accent} opacity="0.25" />
        <rect y="18" width="38" height="4" rx="2" fill={accent} opacity="0.15" />
      </g>
    </g>
  )
}

/**
 * Escena por defecto, para un caso nuevo que todavía no tenga la suya: el
 * objeto es una ficha de proyecto genérica. Sigue el mismo lenguaje, así que
 * agregar un proyecto a data.js nunca rompe la grilla.
 */
function Generic({ uid, accent }) {
  return (
    <g>
      <Window x={60} y={34} w={200} h={132} uid={uid} accent={accent}>
        <rect x={74} y={62} width={80} height={9} rx="4.5" fill={accent} opacity="0.5" />
        <Lines x={74} y={80} w={120} n={4} gap={7} accent={accent} />
        <rect x={74} y={118} width={44} height={12} rx="6" fill={accent} opacity="0.55" />
        <rect x={188} y={62} width={58} height={68} rx="4" fill={accent} opacity="0.1" />
      </Window>
    </g>
  )
}

const SCENES = {
  lumi: Lumi,
  'bio-laboratorios': BioLaboratorios,
  'blu-smartphones': BluSmartphones,
  'nona-gastro-bar': NonaGastroBar,
  'limonada-pink': LimonadaPink,
  'aiiso-consulting': AiisoConsulting,
  growthbro: GrowthBro,
  asignar: Asignar,
}

/** ¿Hay escena propia para este slug? Lo usa CaseCover para decidir el alt. */
export function hasCaseArt(slug) {
  return Boolean(SCENES[slug])
}

/**
 * @param {{ slug: string, accent?: string, label?: string, alt?: string }} props
 *
 * El SVG lleva `role="img"` y su propio `aria-label`: para un lector de
 * pantalla es una ilustración del caso, no un adorno, porque efectivamente
 * comunica de qué tipo de trabajo se trata.
 */
export function CaseArt({ slug, accent = '#1B3CFF', label = '', alt }) {
  const uid = useId().replace(/:/g, '')
  const Scene = SCENES[slug] || Generic

  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={alt || `Ilustración del caso ${label}`}
    >
      <Defs uid={uid} accent={accent} />

      <rect width={VB.w} height={VB.h} fill="#080A11" />
      <rect width={VB.w} height={VB.h} fill={`url(#${uid}-glow)`} />

      <Scene uid={uid} accent={accent} />

      <rect width={VB.w} height={VB.h} fill={`url(#${uid}-vig)`} />
      <rect width={VB.w} height={VB.h} filter={`url(#${uid}-grain)`} opacity="0.055" />
    </svg>
  )
}
