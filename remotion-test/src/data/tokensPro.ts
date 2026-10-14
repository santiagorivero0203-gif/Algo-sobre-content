/**
 * =====================================================================
 * Datos del reel "Tokens Pro" · SOLO DATOS, cero código visual
 * =====================================================================
 * Fuente: reel `reel_tokens_pro` de js/reels.js (generador de carruseles).
 * Para un video nuevo: copiar este archivo, cambiar textos y registrar la
 * composición en Root.tsx. Cada escena trae su guion `vo` para narrar.
 * Estructura narrativa (AGENTS.md): hook → estrategia → código → CTA.
 * =====================================================================
 */
import type { ReelProps } from "../lib/schema";

export const tokensProData: ReelProps = {
  brand: "santidev",
  kicker: "SANTI.DEV · WORKFLOW PRO",
  showVoiceover: false,
  scenes: [
    {
      type: "hero",
      badge: "INGENIERÍA AGÉNTICA",
      kicker: "OPTIMIZACIÓN DE TOKENS",
      title: "Tu IA colapsa *por esto*",
      sub: "Saturaste su ventana de atención con 20 archivos irrelevantes.",
      vo: "¿Tu IA borra funciones? Saturaste su contexto.",
      durationFrames: 195, // 3.25s
    },
    {
      type: "points",
      badge: "REGLA 1 · FOCO ATÓMICO",
      title: "1 tarea · *1 archivo*",
      sub: "Menos ruido en contexto = menos alucinaciones.",
      points: [
        { label: "1 responsabilidad por prompt", desc: "Pide una sola función o corrección a la vez." },
        { label: "Aísla el archivo activo", desc: "Cierra los 19 archivos que no tocan esa función." },
        { label: "100% de precisión", desc: "Sin ruido que confunda el árbol sintáctico." },
      ],
      vo: "La regla clave: una tarea y un archivo.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "code",
      badge: "REGLA 2 · PODA DE CONTEXTO",
      title: "Mapea con *Graphify AST*",
      sub: "Solo firmas y dependencias directas, no librerías enteras.",
      file: "terminal ~ graphify-tokens.sh",
      lines: [
        "# Grafo de dependencias real",
        '$ agy graphify --target="authService.ts"',
        "✓ 3 dependencias (de 48)",
        "✓ Contexto: 45,000 → 1,200 tokens",
        "✓ Respuesta 10x más rápida",
      ],
      vo: "Con Graphify AST reduces miles de tokens.",
      durationFrames: 240, // 4.0s
    },
    {
      type: "compare",
      badge: "RESULTADO DE PRODUCCIÓN",
      title: "80% menos tokens · *cero bugs*",
      sub: "Código listo para producción sin reintentos.",
      bad: {
        tag: "SIN PLANIFICAR",
        title: "20,000 tokens quemados",
        desc: "Alucinaciones e imports rotos.",
      },
      good: {
        tag: "WORKFLOW PRO",
        title: "4,000 tokens, 0 errores",
        desc: "Compila a la primera.",
      },
      metric: { from: 20000, to: 4000, unit: "TOKENS" },
      vo: "Ahorras ochenta por ciento y compila siempre.",
      durationFrames: 215, // 3.58s
    },
    {
      type: "cta",
      badge: "GUÍA COMPLETA",
      title: "Domina el *contexto*",
      keyword: "CONTEXTO",
      line: "Coméntala y te envío mi guía agéntica por DM.",
      vo: "Comenta CONTEXTO y te envío la guía.",
      durationFrames: 195, // 3.25s
    },
  ],
};
