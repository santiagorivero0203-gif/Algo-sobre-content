/**
 * =====================================================================
 * TEMA VISUAL PYQUEST · DISEÑO PLANO Y LIMPIO (SIN PIZARRA TÉCNICA)
 * =====================================================================
 * Colores planos seleccionados para alta legibilidad en pantallas móviles,
 * con paleta semántica estricta que asocia tipos de datos con colores.
 * =====================================================================
 */
import { FONT_MONO, FONT_SANS } from "../lib/theme";

export { FONT_MONO, FONT_SANS };

export const PYQUEST_THEME = {
  // Lienzo plano (cero textura de pizarra, cero cuadrículas)
  bg: "#F7F6F2",
  bgSecondary: "#EFECE4",

  // Tarjeta de código flotante
  cardBg: "#181C28",
  cardLight: "#FFFFFF",
  cardBorder: "rgba(24, 28, 40, 0.08)",
  cardShadow: "0 24px 60px -12px rgba(24, 28, 40, 0.12), 0 10px 24px -8px rgba(24, 28, 40, 0.06)",

  // Textos generales
  textPrimary: "#1E293B",
  textMuted: "#64748B",
  textLight: "#F8FAFC",

  // Paleta de código y tipos semánticos
  code: {
    base: "#F8FAFC",
    comment: "#64748B",
    keyword: "#60A5FA",   // def, if, elif, else, return, class
    function: "#34D399",  // print, fin_del_juego, calcular_dano
    str: "#F59E0B",       // Amarillo mostaza plano (Strings)
    int: "#10B981",       // Verde esmeralda plano (Enteros)
    float: "#3B82F6",     // Azul zafiro plano (Flotantes)
    bool: "#8B5CF6",      // Violeta plano (Booleanos)
    danger: "#EF4444",    // Errores / SyntaxError / Daño
    activeLineBg: "rgba(255, 212, 59, 0.12)",
    activeLineBorder: "#F59E0B",
  },

  // Zonas seguras para TikTok / Reels (1080×1920)
  safe: {
    top: 180,
    bottom: 280,
    side: 80,
    width: 920, // 1080 - 160
  },
} as const;
