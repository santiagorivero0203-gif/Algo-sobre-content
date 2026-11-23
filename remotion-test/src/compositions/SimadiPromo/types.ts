/**
 * =====================================================================
 * CONTRATOS DE TIPOS, TEMA DERIVADO Y MÉTRICAS DUALES · SIMADI PROMO V2
 * =====================================================================
 * Consume dinámicamente `promo-spec.json` / `promo-spec-guias.json`,
 * `theme.json` y `manifest.json` sin hardcodear paletas ni coordenadas.
 * Provee cálculo de layout parametrizado con proporción exacta 1.351
 * (`1000×740`) para TikTok (`1080×1920`) e Instagram (`1080×1350`).
 * =====================================================================
 */
import type { BrandTheme } from "../../lib/theme";

export type PromoFormat = "tiktok" | "instagram";

export type NarrativePhase = "Hook" | "Estrategia" | "Táctica/Demo" | "CTA";

export type SimadiIconName =
  | "clock-alert"
  | "layers"
  | "sliders"
  | "timer"
  | "book-open"
  | "chart-bar"
  | "rocket"
  | "check"
  | "arrow-right"
  | "message-dm"
  | "shield-info";

export interface NormalizedBox {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export interface InteractionEvent {
  id: string;
  screen: string;
  clipId: string;
  selector: string;
  label: string;
  rawMs: number;
  clipTimestampMs: number;
  clipFrame60: number;
  box: NormalizedBox;
}

export interface ClipMeta {
  file: string;
  startRawMs: number;
  endRawMs: number;
  durationMs: number;
  durationFrames60: number;
}

export interface CaptureManifest {
  project: string;
  generatedAt: string;
  viewport: { width: number; height: number };
  deviceScaleFactor: number;
  privacyVerified: boolean;
  stills: Record<string, { file: string; width: number; height: number }>;
  clips: Record<string, ClipMeta>;
  elements: Record<string, Record<string, NormalizedBox>>;
  interactions: InteractionEvent[];
}

export interface SimadiThemeJson {
  sourceUrl: string;
  extractedAt: string;
  isDark: boolean;
  colors: {
    background: string;
    headerBackground?: string;
    surface: string;
    surfaceAlt: string;
    primary: string;
    primaryText: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    danger: string;
  };
  typography: {
    fontSans: string;
    fontMono: string;
    h1Size: string;
    bodySize: string;
  };
  shape: {
    cardRadius: string;
    buttonRadius: string;
    cardShadow: string;
  };
}

export interface SceneSfxSpec {
  name: string;
  localFrame: number;
  volume?: number;
}

export interface SceneSpec {
  id: string;
  phase: NarrativePhase;
  fromFrame: number;
  durationFrames: number;
  badge: string;
  title: string;
  copy: string;
  icon: SimadiIconName;
  diagram: string;
  captureId: string | null;
  videoClip?: string;
  focusTarget: string | null;
  secondaryTarget?: string;
  transition: string;
  sfx: SceneSfxSpec[];
}

export interface PromoSpec {
  project: string;
  slug: string;
  version: string;
  fps: number;
  totalDurationFrames: number;
  durationSeconds: number;
  disclaimer?: string;
  ucvLogoRef?: string;
  formats: {
    tiktok: { compositionId: string; width: number; height: number };
    instagram: { compositionId: string; width: number; height: number };
  };
  assets: {
    themeRef: string;
    manifestRef: string;
    bgm: string;
  };
  scenes: SceneSpec[];
}

export interface FormatMetrics {
  format: PromoFormat;
  width: number;
  height: number;
  isIg: boolean;
  safeTop: number;
  safeBottom: number;
  safeSide: number;
  headerTop: number;
  stageTopPadding: number;
  headlineSize: number;
  copySize: number;
  badgeFontSize: number;
  browserWidth: number;
  browserHeight: number;
  diagramGap: number;
}

function parseRgb(color: string): [number, number, number] {
  const m = color.match(/\d+/g);
  if (m && m.length >= 3) {
    return [Number(m[0]), Number(m[1]), Number(m[2])];
  }
  return [15, 82, 186];
}

/**
 * Construye `BrandTheme` de alto contraste institucional para `<Backdrop>` a partir de `theme.json`.
 */
export function buildSimadiBrandTheme(theme: SimadiThemeJson): BrandTheme {
  const [r, g, b] = parseRgb(theme.colors.primary);
  const deep0 = `rgb(${Math.max(8, Math.round(r * 0.42))}, ${Math.max(20, Math.round(g * 0.48))}, ${Math.max(55, Math.round(b * 0.56))})`;
  const deep1 = `rgb(${Math.max(5, Math.round(r * 0.22))}, ${Math.max(12, Math.round(g * 0.28))}, ${Math.max(32, Math.round(b * 0.34))})`;
  const deep2 = `rgb(4, 10, 24)`;

  return {
    id: "simadi",
    handle: "SIMADI · UCV",
    bg: [deep0, deep1, deep2],
    accent: "#38BDF8",
    secondary: theme.colors.success || "#10B981",
    aura: `rgba(${r}, ${g}, ${b}, 0.45)`,
  };
}

/**
 * Métricas espaciales parametrizadas por formato:
 * Mantiene proporción exacta `1.351` (`1000×740`) en el contenedor de captura
 * para que las coordenadas normalizadas de `manifest.json` coincidan 1:1.
 */
export function getFormatMetrics(format: PromoFormat): FormatMetrics {
  const isIg = format === "instagram";
  return {
    format,
    width: 1080,
    height: isIg ? 1350 : 1920,
    isIg,
    safeTop: isIg ? 64 : 120,
    safeBottom: isIg ? 64 : 184,
    safeSide: isIg ? 64 : 72,
    headerTop: 140,
    stageTopPadding: isIg ? 194 : 226,
    headlineSize: isIg ? 50 : 62,
    copySize: isIg ? 25 : 30,
    badgeFontSize: isIg ? 19 : 21,
    browserWidth: isIg ? 770 : 936,
    browserHeight: isIg ? 570 : 692,
    diagramGap: isIg ? 18 : 28,
  };
}
