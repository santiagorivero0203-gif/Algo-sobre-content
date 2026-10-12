/**
 * =====================================================================
 * SANTI.DEV · GEMINI NIVEL 1: BÁSICO (CERO CONFIGURACIÓN PREVIA)
 * =====================================================================
 * Dominio de Gemini desde la interfaz directa sin ajustes adicionales:
 *  - Hook: Dejar de usarlo como un simple buscador/chat
 *  - 1.1: Cruce de documentos reales y Drive
 *  - 1.2: Visión multimodal (Pizarras y notas físicas a hojas de cálculo)
 *  - 1.3: Simulación en vivo (Gemini Live) y Gemini Notebook
 *  - CTA: Comenta NIVEL 2
 * =====================================================================
 */
import type { ReelProps } from "../lib/schema";

export const geminiNivel1Data: ReelProps = {
  brand: "gemini_lvl1",
  kicker: "SANTI.DEV · GOOGLE GEMINI MASTER",
  showVoiceover: false,
  scenes: [
    {
      type: "hero",
      badge: "NIVEL 1 · PRINCIPIANTE",
      kicker: "DOMINIO TOTAL DE GEMINI",
      title: "¿Usas Gemini *solo para chatear*?",
      sub: "El secreto no es hacer preguntas: es cruzar tu información real.",
      vo: "Si usas Gemini solo para hacerle preguntas como si fuera Google, te estás perdiendo el noventa por ciento de su poder. Aquí arranca el nivel básico.",
      showLogo: true,
      logoMode: "full",
      durationFrames: 195, // 3.25s
    },
    {
      type: "points",
      badge: "1.1 · ANÁLISIS DOCUMENTAL",
      title: "Cruce de *documentos reales*",
      sub: "Sube notas y especificaciones técnicas desde Drive sin abrirlas a mano.",
      points: [
        { label: "Sube archivos o Drive", desc: "Notas caóticas + specs técnicas analizadas en segundos." },
        { label: "Cruce inteligente", desc: "Encuentra decisiones pendientes y riesgos al instante." },
        { label: "Cero revisión manual", desc: "De horas leyendo PDFs a un roadmap accionable." },
      ],
      icons: ["assets/drive_icon.svg", "assets/docs_icon.svg"],
      vo: "Primer truco básico: no le escribas contexto. Sube directamente tus notas y documentos técnicos desde Drive para que cruce datos y te dé los próximos pasos.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "showcase",
      badge: "1.2 · FÍSICO A DIGITAL",
      title: "Digitalización *multimodal*",
      sub: "Foto de pizarra o libreta arrugada transformada en Excel estructurado.",
      image: "assets/whiteboard_notes.jpg",
      imageCaption: "Reconocimiento de esquemas, flechas y tareas manuscritas",
      icons: ["assets/sheets_icon.svg"],
      showLogo: true,
      vo: "Segundo poder: visión multimodal. Tómale una foto a una pizarra con flechas o notas desordenadas y Gemini te devuelve una hoja de cálculo lista con fechas y responsables.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "points",
      badge: "1.3 · MODO EN VIVO & FUENTES",
      title: "Simula llamadas y *fuentes complejas*",
      sub: "Roleplay en tiempo real y cuadernos temáticos cruzados.",
      points: [
        { label: "Gemini Live Roleplay", desc: "Simula llamadas de ventas o negociaciones críticas." },
        { label: "Feedback técnico", desc: "Te dice en qué titubeaste y qué garantías faltaron." },
        { label: "Notebooks masivos", desc: "Cruza mercado, clientes y competencia sin alucinaciones." },
      ],
      icons: ["assets/gemini_notebook_logo.svg"],
      showLogo: true,
      vo: "Usa Gemini Live para practicar reuniones de ventas por voz con retroalimentación inmediata, y Gemini Notebook para conectar carpetas enteras de investigación.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "cta",
      badge: "SIGUIENTE NIVEL DISPONIBLE",
      title: "Guarda *este video*",
      keyword: "NIVEL 2",
      line: "Comenta NIVEL 2 y te muestro la integración secreta en Gmail y Sheets.",
      vo: "Este es solo el nivel básico. Comenta NIVEL 2 y te desbloqueo la integración nativa en Google Workspace y Deep Research. ¡Guarda el video!",
      durationFrames: 195, // 3.25s
    },
  ],
};
