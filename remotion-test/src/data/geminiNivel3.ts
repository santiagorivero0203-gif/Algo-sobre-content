/**
 * =====================================================================
 * SANTI.DEV · GEMINI NIVEL 3: AVANZADO (SISTEMAS Y AUTOMATIZACIONES)
 * =====================================================================
 * De hacer preguntas a diseñar infraestructura autónoma:
 *  - Hook: No pidas prompts, construye sistemas
 *  - 3.1: Gems personalizados (Estandarización del método · El CÓMO)
 *  - 3.2: Acciones Programadas (Ejecución horaria autónoma · El CUÁNDO)
 *  - 3.3: Workspace Studio (Conexión integral entre servicios)
 *  - CTA: Comenta SISTEMAS
 * =====================================================================
 */
import type { ReelProps } from "../lib/schema";

export const geminiNivel3Data: ReelProps = {
  brand: "gemini_lvl3",
  kicker: "SANTI.DEV · GOOGLE GEMINI MASTER",
  showVoiceover: false,
  scenes: [
    {
      type: "hero",
      badge: "NIVEL 3 · PROFESIONAL",
      kicker: "INGENIERÍA DE SISTEMAS",
      title: "¿Prompting o *sistemas autónomos*?",
      sub: "Deja de escribir prompts: crea infraestructura que opera sola.",
      vo: "El nivel experto en Gemini no consiste en escribir mejores prompts. Consiste en construir sistemas que se ejecutan por horario y conectan todo tu ecosistema.",
      showLogo: true,
      logoMode: "full",
      durationFrames: 195, // 3.25s
    },
    {
      type: "showcase",
      badge: "3.1 · GEMS PERSONALIZADOS",
      title: "Estandariza *el CÓMO*",
      sub: "Un Gem almacena tus reglas y metodologías fijas para siempre.",
      image: "assets/gemini_gems_real.jpg",
      imageCaption: "Custom Gems: Reglas perennes y marco de análisis",
      showLogo: true,
      vo: "Un Gem guarda tus reglas de trabajo para siempre. Al subir la minuta de una reunión, aplica tu diagnóstico formal, detecta cuellos de botella y crea la propuesta sin pedir contexto.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "points",
      badge: "3.2 · EJECUCIÓN POR HORARIO",
      title: "Gemini trabaja *mientras duermes*",
      sub: "Acciones programadas a horas fijas con alertas directas al móvil.",
      points: [
        { label: "Disparadores por hora", desc: "Define qué día y hora exacta debe correr el análisis." },
        { label: "Scraping y síntesis semanal", desc: "Recopila novedades del sector sin intervención." },
        { label: "Notificación push al móvil", desc: "El informe te espera listo cada lunes en tu bandeja." },
      ],
      showLogo: true,
      vo: "Las acciones programadas definen cuándo correr de forma autónoma. Cada lunes a las ocho recopila lanzamientos de tu sector y te envía el resumen listo al teléfono.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "points",
      badge: "3.3 · WORKSPACE STUDIO",
      title: "Orquestación entre *todas las apps*",
      sub: "Disparadores y acciones enlazadas entre Meet, Drive, Sheets y Chat.",
      points: [
        { label: "Termina videollamada Meet", desc: "Gemini extrae tareas y las publica directo en Google Chat." },
        { label: "Emails con adjuntos", desc: "Guarda archivos en Drive y registra filas en Google Sheets." },
        { label: "Ecosistema conectado", desc: "Gems fijan el cómo, horarios el cuándo y Studio el flujo." },
      ],
      icons: ["assets/meet_icon.svg", "assets/drive_icon.svg", "assets/sheets_icon.svg"],
      showLogo: true,
      vo: "Y con Workspace Studio conectas disparadores entre servicios: termina tu videollamada, Gemini extrae los acuerdos y los publica al instante en tu Google Chat.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "cta",
      badge: "ARQUITECTURA COMPLETA",
      title: "Guarda *este video*",
      keyword: "SISTEMAS",
      line: "Comenta SISTEMAS y te comparto mis 5 Gems de automatización empresarial.",
      vo: "Deja de ser un usuario pasivo y construye sistemas. Comenta SISTEMAS y te paso mis cinco Gems listos para clonar. Guarda este video y sígueme para más.",
      durationFrames: 195, // 3.25s
    },
  ],
};
