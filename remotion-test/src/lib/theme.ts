/**
 * =====================================================================
 * TEMA DE MARCA SANTI.DEV · tokens de diseño centralizados
 * =====================================================================
 * Un solo lugar para colores y tipografías: cambiar de marca (Mova,
 * Endo, GiraStock) = elegir otro perfil, sin tocar componentes.
 * Las paletas replican las de las primeras slides del generador de
 * carruseles (js/accounts.js) para mantener identidad visual.
 * =====================================================================
 */
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

// Solo los pesos/subsets usados: menos peso de descarga y render más rápido.
const space = loadSpaceGrotesk("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});
const mono = loadJetBrainsMono("normal", {
  weights: ["500", "800"],
  subsets: ["latin"],
});

export const FONT_SANS = space.fontFamily;
export const FONT_MONO = mono.fontFamily;

export interface BrandTheme {
  id: string;
  handle: string;
  /** Degradado de fondo (tres paradas, de más claro a más oscuro). */
  bg: [string, string, string];
  accent: string;
  secondary: string;
  /** Color del halo ambiental (rgba con alpha). */
  aura: string;
}

export const THEMES: Record<string, BrandTheme> = {
  santidev: {
    id: "santidev",
    handle: "@santi.dev",
    bg: ["#0B4A38", "#042A20", "#05120E"],
    accent: "#00DF8F",
    secondary: "#38BDF8",
    aura: "rgba(0, 223, 143, 0.38)",
  },
  mova: {
    id: "mova",
    handle: "@mova.app",
    bg: ["#123F8F", "#081F52", "#030D22"],
    accent: "#3B82F6",
    secondary: "#4ECCA3",
    aura: "rgba(59, 130, 246, 0.40)",
  },
  endo: {
    id: "endo",
    handle: "@endo.dev",
    bg: ["#6B1C36", "#350B1B", "#130309"],
    accent: "#EE6A3E",
    secondary: "#F59E0B",
    aura: "rgba(238, 106, 62, 0.40)",
  },
  girastock: {
    id: "girastock",
    handle: "@girastock",
    bg: ["#6B3A0E", "#341A05", "#120902"],
    accent: "#EDB828",
    secondary: "#10B981",
    aura: "rgba(237, 184, 40, 0.36)",
  },
  gemini_lvl1: {
    id: "gemini_lvl1",
    handle: "@santi.dev · GEMINI BÁSICO",
    bg: ["#003859", "#011D30", "#010A12"],
    accent: "#00D4FF",
    secondary: "#38BDF8",
    aura: "rgba(0, 212, 255, 0.44)",
  },
  gemini_lvl2: {
    id: "gemini_lvl2",
    handle: "@santi.dev · GEMINI INTERMEDIO",
    bg: ["#0C2E6F", "#061A42", "#02091A"],
    accent: "#3B82F6",
    secondary: "#818CF8",
    aura: "rgba(59, 130, 246, 0.46)",
  },
  gemini_lvl3: {
    id: "gemini_lvl3",
    handle: "@santi.dev · GEMINI AVANZADO",
    bg: ["#1B155E", "#0F0B36", "#040312"],
    accent: "#6366F1",
    secondary: "#A855F7",
    aura: "rgba(99, 102, 241, 0.50)",
  },
};

export const COLORS = {
  text: "#FFFFFF",
  muted: "rgba(255, 255, 255, 0.80)",
  hairline: "rgba(255, 255, 255, 0.14)",
  danger: "#FF5C6C",
  codeBg: "rgba(4, 10, 14, 0.92)",
  codeComment: "#64748B",
} as const;

/**
 * Márgenes seguros 1080×1920 para TikTok/Reels: la UI de la plataforma
 * (botones laterales, descripción) tapa ~150px arriba y ~320px abajo.
 */
export const SAFE = { top: 170, bottom: 260, side: 80 } as const;

export const getTheme = (id: string): BrandTheme =>
  THEMES[id] ?? THEMES.santidev;
