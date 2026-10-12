/**
 * =====================================================================
 * SANTI.DEV · AI SKILLS & PROMPT MAESTRO CINÉTICO DETERMINISTA
 * =====================================================================
 * Define las especificaciones de generación de video por código según
 * el lenguaje visual ultra veloz de Anthropic / Apple:
 *   - Fondo: #000000 puro
 *   - Texto: #FFFFFF (Blanco puro de máximo contraste)
 *   - Acento: #D97757 (Terracota / Coral Anthropic)
 *   - CERO diagramas, CERO flujos de 4 cajas apiladas, CERO listas
 *   - UN SOLO ELEMENTO POR BEAT: 1 a 3 palabras gigantes o métrica masiva
 *   - CERO fotogramas muertos: micro-movimiento continuo (scale 1.0 -> 1.04)
 *   - Cortes secos (hard cuts) cada 800ms a 1200ms
 * =====================================================================
 */

/**
 * Skill Principal Anti-Slop: Reel Rápido Cinético (Cero Flujos / Impacto Puro)
 */
const SKILL_FAST_KINETIC = {
  id: "fast_kinetic_reel",
  name: "Reel Rápido Cinético (Cero Flujos / Impacto Puro)",
  getPrompt: (accountContext = { name: "Santi.Dev" }, topic = "Rendimiento Web y Cómputo Local") => `
Actúa como Director de Motion Graphics al estilo Anthropic / Apple.
Crea la secuencia para un video vertical ultra rápido de 6 a 8 segundos sobre: "${topic}".
Marca: ${accountContext.name || "Santi.Dev"}

REGLAS ESTRICTAS DE RITMO Y DISEÑO (ANTI-SLOP & ANTI-DIAPOSITIVAS):
1. PROHIBIDO GENERAR DIAGRAMAS: Cero pipelines, flujos, tarjetas agrupadas o listas.
2. UN SOLO ELEMENTO POR BEAT: Cada escena muestra ÚNICAMENTE un texto centrado de 1 a 3 palabras o una métrica gigante.
3. RITMO VELOZ: Cada beat dura entre 800ms y 1200ms.
4. ESTÉTICA: Fondo #070B14 cinemático, texto #FFFFFF gigante, palabra clave resaltada con el acento de la marca. Cero terminales bash.
5. METADATOS CINEMÁTICOS: Cada beat incluye "badgeText" (píldora superior), "chipLabel" (métrica inferior) y "vo" (guión de locución).

DEVUELVE EXCLUSIVAMENTE ESTE JSON VÁLIDO (sin markdown):
{
  "duration_ms": 7000,
  "beats": [
    {
      "start_ms": 0,
      "end_ms": 1200,
      "text": "MENOS CÓDIGO",
      "accent": "CÓDIGO",
      "badgeText": "ARQUITECTURA ÁGIL",
      "chipLabel": "HOOK DE IMPACTO",
      "vo": "¿Cansado de lidiar con código inflado?",
      "size": "text-7xl",
      "motion": "mask-up"
    },
    {
      "start_ms": 1200,
      "end_ms": 2500,
      "text": "MÁS VELOCIDAD",
      "accent": "VELOCIDAD",
      "badgeText": "OPTIMIZACIÓN",
      "chipLabel": "LA TÁCTICA",
      "vo": "Con una arquitectura modular aceleras 10x tu flujo.",
      "size": "text-7xl",
      "motion": "snap-scale"
    },
    {
      "start_ms": 2500,
      "end_ms": 4500,
      "text": "60 FPS",
      "accent": "60 FPS",
      "badgeText": "DETERMINISTA",
      "chipLabel": "EL PAYOFF",
      "vo": "Animación determinista sin caída de fotogramas.",
      "size": "text-8xl",
      "motion": "mask-up"
    },
    {
      "start_ms": 4500,
      "end_ms": 7000,
      "text": "DIRECTO EN WEB",
      "accent": "WEB",
      "badgeText": "COMUNIDAD",
      "chipLabel": "LLAMADO A LA ACCIÓN",
      "vo": "Comenta CÓDIGO y te envío la plantilla completa.",
      "size": "text-6xl",
      "motion": "fade-out"
    }
  ]
}
`
};

const SKILL_CLEAN_MOTION_REEL = SKILL_FAST_KINETIC;
const SKILL_CLAUDE_MOTION = SKILL_FAST_KINETIC;

/**
 * Catálogo de videos cinéticos continuos deterministas preconfigurados
 * Cero diagramas, un solo elemento central por beat, 100% legibles en 9:16 vertical
 */
const MOTION_REELS = [
  {
    id: "reel_context_collapse",
    accountId: "santidev",
    title: "Tu IA Colapsa Por Esto",
    subtitle: "El error fatal del contexto infinito y cómo solucionarlo",
    duration_ms: 7200,
    beats: [
      {
        start_ms: 0,
        end_ms: 1200,
        text: "¿TU IA COLAPSA?",
        accent: "COLAPSA",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 1200,
        end_ms: 2400,
        text: "MUCHO CONTEXTO",
        accent: "CONTEXTO",
        size: "text-7xl",
        motion: "snap-scale"
      },
      {
        start_ms: 2400,
        end_ms: 3600,
        text: "1 SOLA TAREA",
        accent: "1 SOLA",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 3600,
        end_ms: 4800,
        text: "1 SOLO ARCHIVO",
        accent: "ARCHIVO",
        size: "text-7xl",
        motion: "snap-scale"
      },
      {
        start_ms: 4800,
        end_ms: 6000,
        text: "CERO ALUCINACIÓN",
        accent: "CERO",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 6000,
        end_ms: 7200,
        text: "SANTI.DEV",
        accent: "SANTI.DEV",
        size: "text-8xl",
        motion: "fade-out"
      }
    ]
  },
  {
    id: "reel_mova_silence",
    accountId: "mova",
    title: "Mova · Romper el Silencio",
    subtitle: "IA gestual 21D traduciendo lenguaje de señas en el móvil",
    duration_ms: 7000,
    beats: [
      {
        start_ms: 0,
        end_ms: 1200,
        text: "70 MILLONES",
        accent: "70 MILLONES",
        size: "text-8xl",
        motion: "mask-up"
      },
      {
        start_ms: 1200,
        end_ms: 2400,
        text: "EN SILENCIO",
        accent: "SILENCIO",
        size: "text-8xl",
        motion: "snap-scale"
      },
      {
        start_ms: 2400,
        end_ms: 3600,
        text: "IA 21D EN VIVO",
        accent: "21D",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 3600,
        end_ms: 4800,
        text: "TODO EN EL MÓVIL",
        accent: "MÓVIL",
        size: "text-6xl",
        motion: "snap-scale"
      },
      {
        start_ms: 4800,
        end_ms: 5900,
        text: "CERO LATENCIA",
        accent: "CERO",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 5900,
        end_ms: 7000,
        text: "MOVA.APP",
        accent: "MOVA.APP",
        size: "text-8xl",
        motion: "fade-out"
      }
    ]
  },
  {
    id: "reel_speed_production",
    accountId: "santidev",
    title: "De la Idea a Producción",
    subtitle: "El flujo de software ágil para lanzar en 15 minutos",
    duration_ms: 6800,
    beats: [
      {
        start_ms: 0,
        end_ms: 1100,
        text: "SEMANAS EN CÓDIGO",
        accent: "SEMANAS",
        size: "text-6xl",
        motion: "mask-up"
      },
      {
        start_ms: 1100,
        end_ms: 2300,
        text: "YA NO MÁS",
        accent: "MÁS",
        size: "text-8xl",
        motion: "snap-scale"
      },
      {
        start_ms: 2300,
        end_ms: 3600,
        text: "AGENTES + MCP",
        accent: "AGENTES",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 3600,
        end_ms: 4900,
        text: "15 MINUTOS",
        accent: "15 MINUTOS",
        size: "text-8xl",
        motion: "snap-scale"
      },
      {
        start_ms: 4900,
        end_ms: 6800,
        text: "EN PRODUCCIÓN",
        accent: "PRODUCCIÓN",
        size: "text-7xl",
        motion: "fade-out"
      }
    ]
  },
  {
    id: "reel_endo_physics",
    accountId: "endo",
    title: "The Last Endo · Física 60 FPS",
    subtitle: "Canvas 2D determinista sin tirones ni caídas de frames",
    duration_ms: 6800,
    beats: [
      {
        start_ms: 0,
        end_ms: 1200,
        text: "¿JUEGOS CON LAG?",
        accent: "LAG",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 1200,
        end_ms: 2400,
        text: "FRAME DROPS",
        accent: "DROPS",
        size: "text-8xl",
        motion: "snap-scale"
      },
      {
        start_ms: 2400,
        end_ms: 3800,
        text: "CANVAS 2D PURO",
        accent: "CANVAS",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 3800,
        end_ms: 5200,
        text: "60 FPS FIJOS",
        accent: "60 FPS",
        size: "text-8xl",
        motion: "snap-scale"
      },
      {
        start_ms: 5200,
        end_ms: 6800,
        text: "THE LAST ENDO",
        accent: "ENDO",
        size: "text-7xl",
        motion: "fade-out"
      }
    ]
  },
  {
    id: "reel_girastock_offline",
    accountId: "girastock",
    title: "GiraStock · Cero Ventas Perdidas",
    subtitle: "Arquitectura Offline-First con SQLite local que nunca se congela",
    duration_ms: 7000,
    beats: [
      {
        start_ms: 0,
        end_ms: 1200,
        text: "SE FUE LA RED",
        accent: "RED",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 1200,
        end_ms: 2400,
        text: "PERDISTE VENTAS",
        accent: "VENTAS",
        size: "text-7xl",
        motion: "snap-scale"
      },
      {
        start_ms: 2400,
        end_ms: 3700,
        text: "OFFLINE FIRST",
        accent: "OFFLINE",
        size: "text-8xl",
        motion: "mask-up"
      },
      {
        start_ms: 3700,
        end_ms: 5100,
        text: "SQLITE LOCAL",
        accent: "LOCAL",
        size: "text-7xl",
        motion: "snap-scale"
      },
      {
        start_ms: 5100,
        end_ms: 7000,
        text: "GIRASTOCK APP",
        accent: "GIRASTOCK",
        size: "text-8xl",
        motion: "fade-out"
      }
    ]
  },
  {
    id: "reel_tokens_saver",
    accountId: "santidev",
    title: "Ahorra 80% de Tokens en IA",
    subtitle: "Poda de contexto y subagentes especializados para reducir costes",
    duration_ms: 7200,
    beats: [
      {
        start_ms: 0,
        end_ms: 1200,
        text: "FACTURA DE IA",
        accent: "FACTURA",
        size: "text-7xl",
        motion: "mask-up"
      },
      {
        start_ms: 1200,
        end_ms: 2400,
        text: "DÓLARES QUEMADOS",
        accent: "QUEMADOS",
        size: "text-7xl",
        motion: "snap-scale"
      },
      {
        start_ms: 2400,
        end_ms: 3800,
        text: "-80% EN TOKENS",
        accent: "-80%",
        size: "text-8xl",
        motion: "mask-up"
      },
      {
        start_ms: 3800,
        end_ms: 5200,
        text: "SUBAGENTES MCP",
        accent: "MCP",
        size: "text-7xl",
        motion: "snap-scale"
      },
      {
        start_ms: 5200,
        end_ms: 7200,
        text: "CÓDIGO EFICIENTE",
        accent: "EFICIENTE",
        size: "text-7xl",
        motion: "fade-out"
      }
    ]
  }
];

// Compatibilidad en navegador sin empaquetador
if (typeof window !== "undefined") {
  window.SKILL_FAST_KINETIC = SKILL_FAST_KINETIC;
  window.SKILL_CLEAN_MOTION_REEL = SKILL_CLEAN_MOTION_REEL;
  window.SKILL_CLAUDE_MOTION = SKILL_CLAUDE_MOTION;
  window.MOTION_REELS = MOTION_REELS;
}
