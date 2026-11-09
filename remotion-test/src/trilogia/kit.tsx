/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · KIT DE COMPONENTES COMPARTIDOS
 * =====================================================================
 * Fusión de estilos:
 *  - GEMINI: fondo oscuro editorial con halos neón difuminados, Space
 *    Grotesk + JetBrains Mono, logos oficiales SVG, badges y titulares
 *    con énfasis (*resaltado*).
 *  - PYQUEST: centrado vertical dinámico, entrada/salida explícita por
 *    escena (cero textos encimados), micro-eventos continuos y
 *    mecánicas físicas (buses de energía SVG, escáneres, contadores).
 *
 * Todo es determinista: cada valor visual es función pura del frame.
 * =====================================================================
 */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_MONO, FONT_SANS } from "../lib/theme";

export { FONT_MONO, FONT_SANS };

/** Paleta por episodio de la trilogía. */
export interface TrilogyPalette {
  /** Color base del fondo (muy oscuro). */
  base: string;
  /** Segundo tono del degradado del fondo. */
  baseDeep: string;
  /** Acento neón principal. */
  accent: string;
  /** Acento secundario. */
  secondary: string;
}

/** Interpolación con clamp en ambos extremos (atajo seguro). */
export const clampInterp = (
  frame: number,
  input: [number, number],
  output: [number, number]
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Resorte estándar de entrada ágil (estilo Gemini). */
export const useEnter = (delay = 0, damping = 15, stiffness = 150) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping, stiffness, mass: 0.75 },
  });
};

// =====================================================================
// 1. FONDO ATMOSFÉRICO OSCURO CON HALOS NEÓN (blur 130px, opacidad <= 0.28)
// =====================================================================
export const TrilogyAtmosphere: React.FC<{ palette: TrilogyPalette }> = ({
  palette,
}) => {
  const frame = useCurrentFrame();
  const orb1X = Math.sin(frame / 46) * 120;
  const orb1Y = Math.cos(frame / 54) * 90;
  const orb2X = Math.cos(frame / 40) * -110;
  const orb2Y = Math.sin(frame / 50) * 100;
  const gridOffset = (frame * 0.6) % 64;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${palette.base} 0%, ${palette.baseDeep} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Rejilla técnica sutil en movimiento continuo */}
      <div
        style={{
          position: "absolute",
          inset: -120,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          transform: `translateY(${gridOffset}px)`,
        }}
      />
      {/* Halo superior (acento) con radial-gradient nativo ultra-rápido */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.accent} 0%, rgba(0,0,0,0) 70%)`,
          opacity: 0.35,
          top: 30 + orb1Y,
          left: -200 + orb1X,
          pointerEvents: "none",
        }}
      />
      {/* Halo inferior (secundario) con radial-gradient nativo ultra-rápido */}
      <div
        style={{
          position: "absolute",
          width: 860,
          height: 860,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.secondary} 0%, rgba(0,0,0,0) 70%)`,
          opacity: 0.28,
          bottom: 70 + orb2Y,
          right: -200 + orb2X,
          pointerEvents: "none",
        }}
      />
      {/* Viñeta para foco central */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// =====================================================================
// 2. CABECERA PERSISTENTE DE SERIE (marca + número de parte)
// =====================================================================
export const SeriesHeader: React.FC<{
  part: number;
  palette: TrilogyPalette;
}> = ({ part, palette }) => {
  const enter = useEnter(4);
  return (
    <div
      style={{
        position: "absolute",
        top: 92,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: enter,
        transform: `translateY(${(1 - enter) * -20}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "10px 22px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          fontFamily: FONT_MONO,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.82)",
        }}
      >
        <span style={{ color: palette.accent }}>SANTI.DEV</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>DE LA IDEA AL CÓDIGO</span>
        <span
          style={{
            background: palette.accent,
            color: "#05080C",
            padding: "2px 10px",
            borderRadius: 999,
          }}
        >
          PARTE {part}/3
        </span>
      </div>
    </div>
  );
};

// =====================================================================
// 3. ESCENARIO CENTRADO CON ENTRADA Y SALIDA EXPLÍCITA
// =====================================================================
export const TrilogyStage: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
  gap?: number;
}> = ({ durationInFrames, children, gap = 34 }) => {
  const frame = useCurrentFrame();
  const enter = useEnter(0, 16, 140);
  const exit = clampInterp(frame, [durationInFrames - 16, durationInFrames], [1, 0]);
  // Deriva continua para evitar cuadros congelados (Continuous Drift)
  const drift = clampInterp(frame, [0, durationInFrames], [1, 1.02]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "150px 70px 190px",
        boxSizing: "border-box",
        opacity: enter * exit,
        transform: `translateY(${(1 - enter) * 34 + (1 - exit) * -30}px) scale(${
          (0.96 + enter * 0.04) * drift
        })`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 940,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// =====================================================================
// 4. TIPOGRAFÍA: BADGE + TITULAR CON ÉNFASIS *resaltado*
// =====================================================================
export const Badge: React.FC<{
  text: string;
  color: string;
  icon?: React.ReactNode;
  delay?: number;
}> = ({ text, color, icon, delay = 0 }) => {
  const enter = useEnter(delay);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 22px",
          borderRadius: 999,
          background: `${color}1F`,
          border: `2px solid ${color}88`,
          color,
          fontFamily: FONT_MONO,
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: "0.06em",
          opacity: enter,
          transform: `scale(${0.85 + enter * 0.15})`,
        }}
      >
        {icon}
        <span>{text}</span>
      </div>
    </div>
  );
};

/** Titular con revelado por máscara palabra a palabra y énfasis *x*. */
export const KineticTitle: React.FC<{
  text: string;
  accent: string;
  size?: number;
  delay?: number;
}> = ({ text, accent, size = 60, delay = 6 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const parts = text.split("*");
  let wordIndex = 0;

  return (
    <div
      style={{
        fontFamily: FONT_SANS,
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1.12,
        letterSpacing: "-0.03em",
        color: "#FFFFFF",
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: size * 0.26,
      }}
    >
      {parts.map((chunk, chunkIdx) =>
        chunk
          .split(" ")
          .filter(Boolean)
          .map((word) => {
            const i = wordIndex++;
            const p = spring({
              frame: frame - delay - i * 3,
              fps,
              config: { damping: 18, stiffness: 190, mass: 0.7 },
            });
            const highlighted = chunkIdx % 2 === 1;
            return (
              <span
                key={`${chunkIdx}-${i}`}
                style={{ overflow: "hidden", display: "inline-flex", paddingBottom: 6 }}
              >
                <span
                  style={{
                    display: "inline-block",
                    transform: `translateY(${(1 - p) * 105}%)`,
                    color: highlighted ? accent : "#FFFFFF",
                    textShadow: highlighted ? `0 0 34px ${accent}66` : "none",
                  }}
                >
                  {word}
                </span>
              </span>
            );
          })
      )}
    </div>
  );
};

/** Subtítulo corto (máx 2 líneas). */
export const SubLine: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 16,
}) => {
  const enter = useEnter(delay);
  return (
    <div
      style={{
        fontFamily: FONT_SANS,
        fontSize: 28,
        fontWeight: 500,
        lineHeight: 1.35,
        color: "rgba(255,255,255,0.78)",
        textAlign: "center",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 16}px)`,
        padding: "0 20px",
      }}
    >
      {text}
    </div>
  );
};

// =====================================================================
// 5. TARJETA DE VIDRIO OSCURO (contenedor estándar)
// =====================================================================
export const GlassCard: React.FC<{
  children: React.ReactNode;
  glow?: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, glow, delay = 10, style }) => {
  const enter = useEnter(delay);
  return (
    <div
      style={{
        background: "rgba(10, 14, 22, 0.78)",
        border: `1.5px solid ${glow ? `${glow}66` : "rgba(255,255,255,0.12)"}`,
        borderRadius: 30,
        padding: "34px 34px",
        boxShadow: glow
          ? `0 30px 70px -20px rgba(0,0,0,0.6), 0 0 50px -12px ${glow}55`
          : "0 30px 70px -20px rgba(0,0,0,0.6)",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 28}px) scale(${0.97 + enter * 0.03})`,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Barra superior estilo ventana macOS para terminales/editores. */
export const WindowBar: React.FC<{ title: string; status?: React.ReactNode }> = ({
  title,
  status,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 14,
      marginBottom: 16,
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <div style={{ display: "flex", gap: 9 }}>
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
        <div key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />
      ))}
    </div>
    <span style={{ fontFamily: FONT_MONO, fontSize: 19, color: "#94A3B8", fontWeight: 500 }}>
      {title}
    </span>
    <div style={{ minWidth: 60, display: "flex", justifyContent: "flex-end" }}>{status}</div>
  </div>
);

/** Píldora de estado pequeña. */
export const StatusPill: React.FC<{ text: string; color: string; solid?: boolean }> = ({
  text,
  color,
  solid = false,
}) => (
  <span
    style={{
      fontFamily: FONT_MONO,
      fontSize: 16,
      fontWeight: 800,
      padding: "4px 12px",
      borderRadius: 999,
      background: solid ? color : `${color}22`,
      color: solid ? "#05080C" : color,
      border: `1px solid ${color}66`,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

// =====================================================================
// 6. LOGO OFICIAL CON RESPIRACIÓN Y RESPLANDOR
// =====================================================================
export const BrandLogo: React.FC<{
  file: string;
  size?: number;
  glow?: string;
  delay?: number;
  active?: boolean;
  label?: string;
}> = ({ file, size = 64, glow, delay = 0, active = true, label }) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay, 12, 170);
  const breathe = Math.sin((frame + delay * 3) / 18) * 4;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: enter * (active ? 1 : 0.35),
        transform: `translateY(${breathe}px) scale(${0.6 + enter * 0.4})`,
      }}
    >
      <div
        style={{
          width: size * 1.6,
          height: size * 1.6,
          borderRadius: size * 0.42,
          background: "rgba(255,255,255,0.06)",
          border: `1.5px solid ${active && glow ? `${glow}AA` : "rgba(255,255,255,0.14)"}`,
          boxShadow: active && glow ? `0 0 38px -6px ${glow}` : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img src={staticFile(`assets/trilogia/${file}`)} style={{ width: size, height: size }} />
      </div>
      {label && (
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 17,
            fontWeight: 800,
            color: active ? "#FFFFFF" : "rgba(255,255,255,0.5)",
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

// =====================================================================
// 7. BUS DE ENERGÍA SVG (conducto con pulsos de luz continuos)
// =====================================================================
export const EnergyBus: React.FC<{
  color: string;
  height?: number;
  active?: boolean;
  /** Progreso de llenado 0..1 (para "bombear" datos). */
  fill?: number;
}> = ({ color, height = 70, active = true, fill = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "-10px 0" }}>
      <svg width={60} height={height} viewBox={`0 0 60 ${height}`}>
        <line x1={30} y1={0} x2={30} y2={height} stroke="rgba(255,255,255,0.12)" strokeWidth={8} strokeLinecap="round" />
        {active && (
          <line
            x1={30}
            y1={0}
            x2={30}
            y2={height * fill}
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray="14 18"
            strokeDashoffset={-frame * 5}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        )}
      </svg>
    </div>
  );
};

// =====================================================================
// 8. CAMA MUSICAL CON FUNDIDOS
// =====================================================================
export const TrilogyBgm: React.FC<{ volume?: number }> = ({ volume = 0.11 }) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <Audio
      src={staticFile("bgm/tech_ambient_bed.mp3")}
      loop
      volume={(f) => {
        const fadeIn = Math.min(1, f / (fps * 0.6));
        const fadeOut = Math.min(1, (durationInFrames - f) / (fps * 0.8));
        return volume * Math.max(0, fadeIn) * Math.max(0, fadeOut);
      }}
    />
  );
};

// =====================================================================
// 9. BOTONES CTA PULSANTES
// =====================================================================
export const CtaButtons: React.FC<{ keyword: string; accent: string }> = ({
  keyword,
  accent,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
      <div
        style={{
          padding: "16px 30px",
          borderRadius: 18,
          border: `2px solid ${accent}`,
          color: accent,
          background: `${accent}18`,
          fontFamily: FONT_SANS,
          fontSize: 27,
          fontWeight: 700,
          transform: `scale(${1 + Math.sin(frame / 9) * 0.035})`,
        }}
      >
        Comenta “{keyword}”
      </div>
      <div
        style={{
          padding: "16px 30px",
          borderRadius: 18,
          background: accent,
          color: "#05080C",
          fontFamily: FONT_SANS,
          fontSize: 27,
          fontWeight: 700,
          boxShadow: `0 0 34px -4px ${accent}`,
          transform: `scale(${1 + Math.cos(frame / 9) * 0.035})`,
        }}
      >
        + Seguir @santi.dev
      </div>
    </div>
  );
};

/** Texto que se escribe en vivo con cursor (determinista). */
export const Typed: React.FC<{
  text: string;
  start: number;
  cps?: number;
  color?: string;
  cursorColor?: string;
}> = ({ text, start, cps = 1.2, color = "#F8FAFC", cursorColor = "#FFFFFF" }) => {
  const frame = useCurrentFrame();
  const count = Math.max(0, Math.min(text.length, Math.floor((frame - start) * cps)));
  const done = count >= text.length;
  const blink = Math.floor(frame / 15) % 2 === 0;
  return (
    <span style={{ color }}>
      {text.slice(0, count)}
      {frame >= start && (!done || blink) && (
        <span style={{ color: cursorColor, opacity: 0.9 }}>▌</span>
      )}
    </span>
  );
};
