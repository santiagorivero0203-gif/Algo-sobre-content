/**
 * =====================================================================
 * Backdrop · fondo vivo + marco persistente del reel
 * =====================================================================
 * Capa global (fuera de las <Sequence>): usa el fotograma ABSOLUTO.
 *  - Degradado de marca luminoso (no negro plano)
 *  - Orbes de luz con movimiento senoidal continuo
 *  - Rejilla de puntos con máscara radial + esquinas tipo visor
 *  - Cabecera (kicker + handle) y línea de progreso segmentada
 *  - Teleprompter con el guion `vo` (solo si showVoiceover)
 * Todo determinista: solo depende de useCurrentFrame().
 * =====================================================================
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { BrandTheme } from "../lib/theme";
import { COLORS, FONT_MONO, FONT_SANS, SAFE } from "../lib/theme";
import type { TimelineEntry } from "../lib/timeline";

/** Orbe de luz que orbita lentamente (período en fotogramas). */
const Orb: React.FC<{
  color: string;
  size: number;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  period: number;
  phase: number;
}> = ({ color, size, cx, cy, rx, ry, period, phase }) => {
  const f = useCurrentFrame();
  const a = (f / period) * Math.PI * 2 + phase;
  return (
    <div
      style={{
        position: "absolute",
        left: cx + Math.cos(a) * rx - size / 2,
        top: cy + Math.sin(a) * ry - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
        filter: "blur(30px)",
      }}
    />
  );
};


export const Backdrop: React.FC<{
  theme: BrandTheme;
  kicker: string;
  timeline: TimelineEntry[];
  total: number;
  showVoiceover: boolean;
}> = ({ theme, kicker, timeline, total, showVoiceover }) => {
  const frame = useCurrentFrame();
  const activeIdx = Math.max(
    0,
    timeline.findIndex((t) => frame >= t.from && frame < t.from + t.duration),
  );
  const active = timeline[activeIdx];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 80% at 50% 0%, ${theme.bg[0]} 0%, ${theme.bg[1]} 55%, ${theme.bg[2]} 100%)`,
      }}
    >
      <Orb color={theme.aura} size={900} cx={200} cy={420} rx={160} ry={120} period={420} phase={0} />
      <Orb color={`${theme.secondary}55`} size={760} cx={900} cy={1250} rx={140} ry={180} period={520} phase={2} />
      <Orb color={theme.aura} size={640} cx={540} cy={1700} rx={220} ry={60} period={360} phase={4} />

      {/* Rejilla de puntos suave y sutil */}
      <svg
        width="1080"
        height="1920"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.16,
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, #000 30%, transparent 80%)",
        }}
      >
        <defs>
          <pattern id="dots" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#fff" fillOpacity="0.6" />
          </pattern>
        </defs>
        <rect width="1080" height="1920" fill="url(#dots)" />
      </svg>

      {/* Cabecera persistente limpia y elegante */}
      <div
        style={{
          position: "absolute",
          left: SAFE.side,
          right: SAFE.side,
          top: 140,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: FONT_MONO,
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: "0.12em",
          color: COLORS.muted,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: theme.accent,
              boxShadow: `0 0 16px ${theme.accent}`,
            }}
          />
          {kicker}
        </span>
        <span style={{ color: theme.accent }}>{theme.handle}</span>
      </div>

      {/* Teleprompter (solo preview) */}
      {showVoiceover && active ? (
        <div
          style={{
            position: "absolute",
            left: SAFE.side,
            right: SAFE.side,
            bottom: 60,
            fontFamily: FONT_SANS,
            fontWeight: 500,
            fontSize: 28,
            lineHeight: 1.3,
            color: COLORS.muted,
          }}
        >
          <span style={{ color: theme.accent, fontFamily: FONT_MONO, fontWeight: 800 }}>
            VO ·{" "}
          </span>
          {active.vo}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
