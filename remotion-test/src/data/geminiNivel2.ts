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
      badge: "NIVEL 2 · INTERMEDIO",
      kicker: "ECOSISTEMA WORKSPACE",
      title: "¿Gemini dentro de *tus programas*?",
      sub: "Sin cambiar de pestaña: Gmail, Meet, Sheets y Deep Research integrados.",
      vo: "En el nivel intermedio dejas de abrir la web de Gemini: el modelo trabaja directamente dentro de Gmail, Google Meet, Sheets y Docs.",
      showLogo: true,
      logoMode: "full",
      durationFrames: 195, // 3.25s
    },
    {
      type: "showcase",
      badge: "2.1 · WORKSPACE DIRECTO",
      title: "Workspace *Nativo*",
      sub: "Panel lateral activo para cronologías de correo y minutas de videollamadas.",
      image: "assets/gemini_workspace_sidepanel.png",
      imageCaption: "Gemini activo en el panel lateral de Google Workspace",
      icons: ["assets/gmail_icon.svg", "assets/meet_icon.svg", "assets/docs_icon.svg"],
      showLogo: true,
      vo: "Mira esto: en Gmail resume cadenas de meses en tres segundos. En Google Meet toma notas automáticas con decisiones y tareas guardadas directo en Drive.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "points",
      badge: "2.2 · ANÁLISIS EN LENGUAJE NATURAL",
      title: "Fórmulas y reportes *sin código*",
      sub: "Cálculo de desviaciones, tablas dinámicas y extracción temática.",
      points: [
        { label: "Sheets sin memorizar fórmulas", desc: "Pídele sobrecostes y tablas dinámicas en texto normal." },
        { label: "Extracción tematica en Docs", desc: "Sintetiza 50 páginas de transcripción en tareas clave." },
        { label: "Google Slides exprés", desc: "Genera la estructura visual preliminar en 1 clic." },
      ],
      icons: ["assets/sheets_icon.svg", "assets/slides_icon.svg"],
      showLogo: true,
      vo: "En Sheets no necesitas memorizar fórmulas complejas: escribe lo que necesitas y te genera tablas dinámicas, gráficos y resalta sobrecostes al vuelo.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "points",
      badge: "2.3 · INVESTIGACIÓN & MULTIMEDIA",
      title: "Informes vivos y *Canvas interactivo*",
      sub: "Planes de investigación validados y aplicaciones interactivas en pantalla.",
      points: [
        { label: "Deep Research validado", desc: "Diseña el plan de fuentes antes de buscar para cero sesgos." },
        { label: "Gemini Canvas", desc: "Convierte reportes densos en esquemas interactivos." },
        { label: "Tutor Socrático", desc: "Te guía por etapas validando tu aprendizaje paso a paso." },
      ],
      icons: ["assets/gemini_notebook_logo.svg"],
      showLogo: true,
      vo: "Y con Deep Research crea estudios de mercado completos con fuentes verificadas, mientras Canvas convierte informes aburridos en gráficos interactivos.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "cta",
      badge: "NIVEL AVANZADO LISTO",
      title: "Guarda *este video*",
      keyword: "NIVEL 3",
      line: "Comenta NIVEL 3 para desbloquear Gems autónomos y Workspace Studio.",
      vo: "Si quieres pasar de usuario a arquitecto de sistemas, comenta NIVEL 3 y te revelo cómo automatizar flujos enteros sin tocar el teclado. ¡Guarda el video!",
      durationFrames: 195, // 3.25s
    },
  ],
};
