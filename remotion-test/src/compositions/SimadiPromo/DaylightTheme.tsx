/**
 * =====================================================================
 * SISTEMA EDITORIAL DAYLIGHT V3 · SIMULACIÓN SIMADI
 * =====================================================================
 * Estética sobria, luminosa y sin cajas pesadas, inspirada en el fondo
 * claro de PyQuest (`#F7F8FA`) y en la identidad real de Simadi
 * (`#F4F7F9` + azul cobalto `#0F52BA`).
 *
 * Tipografía complementaria (local a SimadiPromo, sin alterar `src/lib/`):
 *  - Titular protagonista: `Plus Jakarta Sans` (700/800)
 *  - Palabras clave `*enfatizadas*`: `Instrument Serif` Italic (#0F52BA)
 *  - Datos, relojes y cifras: `JetBrains Mono` (500/700)
 * =====================================================================
 */
import React from "react";
import { loadFont as loadInstrumentSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_MONO } from "../../lib/theme";
import simadiThemeRaw from "../../../public/captures/simadi/theme.json";
import type { PromoFormat, SimadiThemeJson } from "./types";

const jakarta = loadPlusJakartaSans("normal", {
  weights: ["500", "700", "800"],
  subsets: ["latin"],
});

const instrumentSerifItalic = loadInstrumentSerif("italic", {
  weights: ["400"],
  subsets: ["latin"],
});

const instrumentSerifRegular = loadInstrumentSerif("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const FONT_EDITORIAL_SANS = `${jakarta.fontFamily}, 'Plus Jakarta Sans', system-ui, sans-serif`;
export const FONT_EDITORIAL_SERIF = `${instrumentSerifItalic.fontFamily}, 'Instrument Serif', Georgia, serif`;
export const FONT_EDITORIAL_SERIF_REGULAR = `${instrumentSerifRegular.fontFamily}, 'Instrument Serif', Georgia, serif`;
export const FONT_EDITORIAL_MONO = FONT_MONO;

const simadiWebTheme = simadiThemeRaw as SimadiThemeJson;

export const DAYLIGHT = {
  bg: "#F8F9FB",
  bgAlt: simadiWebTheme.colors.background || "#F4F7F9",
  surface: simadiWebTheme.colors.surface || "#FFFFFF",
  ink: simadiWebTheme.colors.textPrimary || "#0F172A",
  inkMuted: simadiWebTheme.colors.textSecondary || "#475569",
  inkSoft: "#64748B",
  cobalt: simadiWebTheme.colors.primary || "#0F52BA",
  cobaltLight: "rgba(15, 82, 186, 0.08)",
  cobaltBorder: "rgba(15, 82, 186, 0.22)",
  danger: simadiWebTheme.colors.danger || "#DC2626",
  dangerSoft: "rgba(220, 38, 38, 0.09)",
  success: simadiWebTheme.colors.success || "#059669",
  successSoft: "rgba(5, 150, 105, 0.10)",
  hairline: "rgba(15, 23, 42, 0.11)",
} as const;

export interface DaylightMetrics {
  format: PromoFormat;
  isIg: boolean;
  width: number;
  height: number;
  safeTop: number;
  safeBottom: number;
  safeSide: number;
  contentWidth: number;
  heroTitleSize: number;
  sectionTitleSize: number;
  demoTitleSize: number;
  subSize: number;
  webStageMaxWidth: number;
  webStageMaxHeight: number;
}

/** Calcula zonas seguras y escalas tipográficas para 9:16 (TikTok) y 4:5 (Instagram). */
export function getDaylightMetrics(format: PromoFormat): DaylightMetrics {
  const isIg = format === "instagram";
  return {
    format,
    isIg,
    width: 1080,
    height: isIg ? 1350 : 1920,
    safeTop: isIg ? 88 : 136,
    safeBottom: isIg ? 78 : 176,
    safeSide: isIg ? 74 : 78,
    contentWidth: isIg ? 932 : 924,
    heroTitleSize: isIg ? 84 : 102,
    sectionTitleSize: isIg ? 66 : 82,
    demoTitleSize: isIg ? 52 : 62,
    subSize: isIg ? 26 : 30,
    // Web protagonista: 1080×1620 (ratio 2:3) ocupando casi todo el alto disponible
    webStageMaxWidth: isIg ? 660 : 790,
    webStageMaxHeight: isIg ? 930 : 1220,
  };
}

/**
 * Fondo claro sobrio estilo PyQuest + Simadi: sin barra superior ni cajas pesadas,
 * con halo azul cobalto suave al 6% y barra de progreso minimalista inferior.
 */
export const DaylightBackdrop: React.FC<{
  metrics: DaylightMetrics;
  totalFrames: number;
}> = ({ metrics, totalFrames }) => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / Math.max(1, totalFrames - 1)));
  const orbX = Math.sin(frame / 70) * 65;
  const orbY = Math.cos(frame / 85) * 45;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(172deg, ${DAYLIGHT.bg} 0%, ${DAYLIGHT.bgAlt} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Halo institucional cobalto muy sutil */}
      <div
        style={{
          position: "absolute",
          top: -220 + orbY,
          right: -180 + orbX,
          width: 780,
          height: 780,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(15, 82, 186, 0.08) 0%, rgba(15, 82, 186, 0) 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -240 - orbY * 0.7,
          left: -160 - orbX * 0.7,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(15, 82, 186, 0.055) 0%, rgba(15, 82, 186, 0) 72%)",
          pointerEvents: "none",
        }}
      />

      {/* Punteado editorial casi imperceptible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(15, 23, 42, 0.06) 1.25px, transparent 1.25px)",
          backgroundSize: "36px 36px",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      {/* Línea de progreso mínima (3px) en zona segura inferior */}
      <div
        style={{
          position: "absolute",
          left: metrics.safeSide,
          right: metrics.safeSide,
          bottom: Math.max(24, metrics.safeBottom - 36),
          height: 3,
          borderRadius: 99,
          background: "rgba(15, 23, 42, 0.08)",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: DAYLIGHT.cobalt,
            borderRadius: 99,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

interface ParsedToken {
  word: string;
  accent: boolean;
}

/** Divide el texto manteniendo `*frases*` en estilo serif editorial azul sin partir signos. */
function tokenizeEditorial(text: string): ParsedToken[] {
  const parts = text.split(/(\*[^*]+\*)/g);
  const tokens: ParsedToken[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;
    const isAccent = part.length >= 2 && part.charAt(0) === "*" && part.charAt(part.length - 1) === "*";
    const clean = isAccent ? part.slice(1, -1) : part;
    const words = clean.trim().split(/\s+/);
    for (let j = 0; j < words.length; j++) {
      if (words[j]) tokens.push({ word: words[j], accent: isAccent });
    }
  }
  return tokens;
}

/**
 * Titular tipográfico mixto: Sans geométrica grande (#0F172A) combinada con
 * Instrument Serif Italic (#0F52BA) en las palabras clave `*resaltadas*`.
 */
export const EditorialTitle: React.FC<{
  text: string;
  fontSize: number;
  delay?: number;
  align?: "left" | "center";
  immediate?: boolean;
}> = ({ text, fontSize, delay = 0, align = "center", immediate = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tokens = tokenizeEditorial(text);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        alignItems: "baseline",
        columnGap: Math.round(fontSize * 0.25),
        rowGap: Math.round(fontSize * 0.08),
        lineHeight: 1.04,
      }}
    >
      {tokens.map((tok, i) => {
        const p = immediate
          ? Math.min(1, 0.55 + 0.45 * spring({ frame, fps, config: { damping: 18, stiffness: 220, mass: 0.6 } }))
          : spring({
              frame: frame - (delay + i * 2),
              fps,
              config: { damping: 18, stiffness: 210, mass: 0.62 },
            });
        return (
          <span
            key={`${tok.word}-${i}`}
            style={{
              display: "inline-block",
              fontFamily: tok.accent ? FONT_EDITORIAL_SERIF : FONT_EDITORIAL_SANS,
              fontStyle: tok.accent ? "italic" : "normal",
              fontWeight: tok.accent ? 400 : 800,
              fontSize: tok.accent ? Math.round(fontSize * 1.15) : fontSize,
              letterSpacing: tok.accent ? "-0.015em" : "-0.032em",
              color: tok.accent ? DAYLIGHT.cobalt : DAYLIGHT.ink,
              opacity: p,
              transform: `translateY(${(1 - p) * 22}px)`,
            }}
          >
            {tok.word}
          </span>
        );
      })}
    </div>
  );
};

/** Calcula salida suave al final de una secuencia sin cortar brusco. */
export function useSceneFade(durationInFrames: number, fadeInFrames = 12, fadeOutFrames = 14): number {
  const frame = useCurrentFrame();
  const enter = fadeInFrames > 0
    ? interpolate(frame, [0, fadeInFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const exit = fadeOutFrames > 0
    ? interpolate(frame, [durationInFrames - fadeOutFrames, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  return enter * exit;
}
