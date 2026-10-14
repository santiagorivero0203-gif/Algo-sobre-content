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
      badge: "EL ERROR COMÚN",
      kicker: "CERO CONFIGURACIÓN",
      title: "¿Usas Gemini como *un buscador*?",
      sub: "Estás desaprovechando el 90% de su capacidad.",
      vo: "¿Usas Gemini solo como buscador? Mira esto.",
      showLogo: true,
      logoMode: "full",
      durationFrames: 195, // 3.25s
    },
    {
      type: "points",
      badge: "CRUCE DOCUMENTAL & MULTIMODAL",
      title: "Cruce de *documentos reales*",
      sub: "Sube notas y especificaciones técnicas desde Drive sin abrirlas a mano.",
      points: [
        { label: "Sube archivos o Drive", desc: "Notas caóticas + specs técnicas analizadas en segundos." },
        { label: "Cruce inteligente", desc: "Encuentra decisiones pendientes y riesgos al instante." },
        { label: "Cero revisión manual", desc: "De horas leyendo PDFs a un roadmap accionable." },
      ],
      icons: ["assets/drive_icon.svg", "assets/docs_icon.svg"],
      vo: "Cruza documentos y pasa fotos a tareas.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "showcase",
      badge: "FÍSICO A DIGITAL",
      title: "Digitalización *multimodal*",
      sub: "Foto de pizarra o libreta arrugada transformada en Excel estructurado.",
      image: "assets/whiteboard_notes.jpg",
      imageCaption: "Reconocimiento de esquemas, flechas y tareas manuscritas",
      icons: ["assets/sheets_icon.svg"],
      showLogo: true,
      vo: "Convierte bocetos en tablas de tareas.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "points",
      badge: "ROLEPLAY & ANÁLISIS EN VIVO",
      title: "Simula llamadas y *fuentes complejas*",
      sub: "Roleplay en tiempo real y cuadernos temáticos cruzados.",
      points: [
        { label: "Gemini Live Roleplay", desc: "Simula llamadas de ventas o negociaciones críticas." },
        { label: "Feedback técnico", desc: "Te dice en qué titubeaste y qué garantías faltaron." },
        { label: "NotebookLM masivo", desc: "Cruza mercado, clientes y competencia sin alucinaciones." },
      ],
      icons: ["assets/gemini_notebook_logo.svg"],
      showLogo: true,
      vo: "Practica reuniones por voz y analiza videos.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "cta",
      badge: "INVESTIGACIÓN COMPLEJA",
      title: "Guarda *este video*",
      keyword: "GEMINI",
      line: "Guarda este video para dominar todas las funciones de Gemini.",
      vo: "NotebookLM conecta todo sin inventar nada. Guarda el video.",
      durationFrames: 195, // 3.25s
    },
  ],
};
