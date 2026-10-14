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
      badge: "DE PROMPTS A SISTEMAS",
      kicker: "SISTEMAS & AUTOMATIZACIÓN",
      title: "Deja de escribir prompts: *¡Crea Sistemas!*",
      sub: "De prompts manuales a agentes que estandarizan métodos y operan de forma autónoma.",
      vo: "Deja de escribir prompts: crea sistemas automáticos.",
      showLogo: true,
      logoMode: "full",
      durationFrames: 195, // 3.25s
    },
    {
      type: "showcase",
      badge: "GEMS PERSONALIZADOS",
      title: "Estandariza *el CÓMO*",
      sub: "Un Gem almacena tus reglas y metodologías fijas para siempre.",
      image: "assets/gemini_gems_real.jpg",
      imageCaption: "Custom Gems: Reglas perennes y marco de análisis",
      showLogo: true,
      vo: "Crea Gems con tus reglas fijas de trabajo.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "points",
      badge: "ACCIONES POR HORARIO",
      title: "Gemini trabaja *mientras duermes*",
      sub: "Acciones programadas a horas fijas con alertas directas al móvil.",
      points: [
        { label: "Disparadores por hora", desc: "Define qué día y hora exacta debe correr el análisis." },
        { label: "Scraping y síntesis semanal", desc: "Recopila novedades del sector sin intervención." },
        { label: "Notificación push al móvil", desc: "El informe te espera listo cada lunes en tu bandeja." },
      ],
      showLogo: true,
      vo: "Programa análisis que te avisen al móvil.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "points",
      badge: "PILOTO AUTOMÁTICO TOTAL",
      title: "Orquestación entre *todas las apps*",
      sub: "Disparadores y acciones enlazadas entre Meet, Drive, Sheets y Chat.",
      points: [
        { label: "Termina videollamada Meet", desc: "Gemini extrae tareas y las publica directo en Google Chat." },
        { label: "Emails con adjuntos", desc: "Guarda archivos en Drive y registra filas en Google Sheets." },
        { label: "Ecosistema conectado", desc: "Gems fijan el cómo, horarios el cuándo y Studio el flujo." },
      ],
      icons: ["assets/meet_icon.svg", "assets/drive_icon.svg", "assets/sheets_icon.svg"],
      showLogo: true,
      vo: "Conecta tus herramientas en piloto automático.",
      durationFrames: 220, // 3.66s
    },
    {
      type: "cta",
      badge: "ARQUITECTURA COMPLETA",
      title: "Guarda *este video*",
      keyword: "SISTEMAS",
      line: "Comenta SISTEMAS y te comparto la plantilla de automatización.",
      vo: "Comenta SISTEMAS y te paso la plantilla.",
      durationFrames: 195, // 3.25s
    },
  ],
};
