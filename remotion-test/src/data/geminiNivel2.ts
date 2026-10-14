/**
 * =====================================================================
 * SANTI.DEV · GEMINI NIVEL 2: INTERMEDIO (WORKSPACES & CREATIVIDAD)
 * =====================================================================
 * Dominio de Gemini integrado en programas de trabajo y creación multimedia:
 *  - Hook: Dejar de abrir la web de Gemini: trabajar dentro de Workspace
 *  - 2.1: Panel lateral activo en Gmail y minutas en Google Meet
 *  - 2.2: Fórmulas en Google Sheets y extracción temática en Docs
 *  - 2.3: Deep Research validado + Canvas interactivo
 *  - CTA: Comenta NIVEL 3
 * =====================================================================
 */
import type { ReelProps } from "../lib/schema";

export const geminiNivel2Data: ReelProps = {
  brand: "gemini_lvl2",
  kicker: "SANTI.DEV · GOOGLE GEMINI MASTER",
  showVoiceover: false,
  scenes: [
    {
      type: "hero",
      badge: "IA EN TUS PROGRAMAS",
      kicker: "WORKSPACE INTEGRADO",
      title: "Gemini integrado en *tu trabajo*",
      sub: "Sin cambiar de pestaña: Gmail, Meet, Sheets y Deep Research integrados.",
      vo: "Deja de abrir pestañas para chatear: el verdadero truco es usar la IA integrada donde trabajas.",
      showLogo: true,
      logoMode: "full",
      durationFrames: 195, // 3.25s
    },
    {
      type: "showcase",
      badge: "GMAIL, MEET & SHEETS",
      title: "Workspace *Nativo*",
      sub: "Panel lateral activo para cronologías de correo y minutas de videollamadas.",
      image: "assets/gemini_workspace_sidepanel.png",
      imageCaption: "Gemini activo en el panel lateral de Google Workspace",
      icons: ["assets/gmail_icon.svg", "assets/meet_icon.svg", "assets/docs_icon.svg"],
      showLogo: true,
      vo: "Resume meses de correos en Gmail, toma minutas automáticas en Meet y genera fórmulas en Sheets sin memorizarlas.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "points",
      badge: "ANÁLISIS EN LENGUAJE NATURAL",
      title: "Fórmulas y reportes *sin código*",
      sub: "Cálculo de desviaciones, tablas dinámicas y extracción temática.",
      points: [
        { label: "Sheets sin memorizar fórmulas", desc: "Pídele sobrecostes y tablas dinámicas en texto normal." },
        { label: "Extracción temática en Docs", desc: "Sintetiza 50 páginas de transcripción en tareas clave." },
        { label: "Google Slides exprés", desc: "Genera la estructura visual preliminar en 1 clic." },
      ],
      icons: ["assets/sheets_icon.svg", "assets/slides_icon.svg"],
      showLogo: true,
      vo: "En Sheets no necesitas memorizar fórmulas complejas: escribe lo que necesitas y te genera tablas dinámicas al vuelo.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "points",
      badge: "DEEP RESEARCH & CANVAS",
      title: "Informes vivos y *Canvas visual*",
      sub: "Planes de investigación validados y aplicaciones interactivas en pantalla.",
      points: [
        { label: "Deep Research validado", desc: "Diseña el plan de fuentes antes de buscar para cero sesgos." },
        { label: "Canvas Interactivo", desc: "Convierte reportes densos en esquemas interactivos." },
        { label: "Tutor Socrático", desc: "Te guía por etapas validando tu aprendizaje paso a paso." },
      ],
      icons: ["assets/gemini_notebook_logo.svg"],
      showLogo: true,
      vo: "Activa Deep Research para crear informes con fuentes reales, y usa Canvas para convertirlos en diagramas interactivos.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "cta",
      badge: "MULTIMEDIA & AUTOMATIZACIÓN",
      title: "Guarda *este video*",
      keyword: "WORKSPACE",
      line: "Guarda este video para transformar tu forma de trabajar con Google Workspace.",
      vo: "Genera video y música en el mismo flujo. Guarda esto y sígueme para automatizarlo todo con agentes.",
      durationFrames: 195, // 3.25s
    },
  ],
};
