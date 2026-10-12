/**
 * =====================================================================
 * SANTI.DEV · REEL 1: STACK SECRETO (DE LA IDEA AL CÓDIGO)
 * =====================================================================
 * Contenido oficial del primer video del canal (reel_stack1 / stack1):
 *  - Hook: ¿Juegos y webs sin saber programar?
 *  - Paso 1: Inspiración (Roba como un artista)
 *  - Paso 2: Lógica (Antigravity + Opencode)
 *  - Paso 3: Arte (Nano Banana + Remove BG)
 *  - CTA: Comenta PARTE 2
 * Duración optimizada para retención rápida: ~17.6s (1060 fotogramas @ 60 FPS).
 * =====================================================================
 */
import type { ReelProps } from "../lib/schema";

export const stackSecretoData: ReelProps = {
  brand: "santidev",
  kicker: "SANTI.DEV · TRILOGÍA CREADORES",
  showVoiceover: false,
  scenes: [
    {
      type: "hero",
      badge: "TRILOGÍA CREADORES · PARTE 1",
      kicker: "DE LA IDEA AL CÓDIGO",
      title: "¿Juegos y webs *sin programar*?",
      sub: "El stack técnico secreto para pasar de la idea al código hoy mismo.",
      vo: "¿Te imaginas crear tus propios videojuegos y aplicaciones web sin pasar meses atascado en la sintaxis? Te enseño mi stack secreto.",
      durationFrames: 195, // 3.25s
    },
    {
      type: "points",
      badge: "PASO 1 · INSPIRACIÓN",
      title: "Roba como un *artista*",
      sub: "Analiza juegos y webs que amas para fusionar mecánicas y crear tu idea única.",
      points: [
        { label: "Desglosa mecánicas top", desc: "Identifica el bucle central que hace divertido el producto." },
        { label: "Elimina lo innecesario", desc: "Quédate con la regla esencial sin reinventar la rueda." },
        { label: "Añade tu toque propio", desc: "Combina dos conceptos distintos para una propuesta fresca." },
      ],
      vo: "Primer paso: roba como un artista. Analiza las mecánicas de las aplicaciones que amas y combínalas con tu toque personal.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "code",
      badge: "PASO 2 · MOTOR DE LÓGICA",
      title: "Antigravity + *Opencode*",
      sub: "Google Antigravity genera el 85% y Opencode pule tokens y sintaxis.",
      file: "terminal ~ logic-engine.sh",
      lines: [
        "# 1. Antigravity genera la arquitectura pesada",
        '$ agy build --mechanics="stealth" --mcp',
        "✓ Arquitectura base generada (85% del trabajo)",
        "# 2. Opencode optimiza y pule detalles finos",
        "$ opencode optimize --save-tokens",
        "✓ 0 errores sintaxis · 1,200 tokens ahorrados",
      ],
      vo: "Para la lógica combino Google Antigravity para el ochenta y cinco por ciento de la arquitectura y Opencode para pulir tokens y sintaxis.",
      durationFrames: 240, // 4.0s
    },
    {
      type: "points",
      badge: "PASO 3 · ASSETS VISUALES",
      title: "Nano Banana + *Remove BG*",
      sub: "Genera sprites con IA y déjalos transparentes y listos para código en 1 clic.",
      points: [
        { label: "Nano Banana (Sprites IA)", desc: "Personajes, fondos y tilesets retro en alta resolución." },
        { label: "Remove BG en 1 Clic", desc: "Fondo transparente instantáneo listo para Canvas o CSS." },
        { label: "Listo para Producción", desc: "Cero diseño manual: importación directa a tu código." },
      ],
      vo: "Para el arte uso Nano Banana para generar sprites con IA y Remove BG para dejarlos transparentes y listos para el código en un clic.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "cta",
      badge: "PARTE 2 DISPONIBLE",
      title: "Guarda *este video*",
      keyword: "PARTE 2",
      line: "Comenta PARTE 2 y te envío la guía de bases de datos y GitHub por DM.",
      vo: "Guarda este video. En la parte dos te enseño cómo automatizo bases de datos y GitHub con MCP. Comenta PARTE 2.",
      durationFrames: 195, // 3.25s
    },
  ],
};
