/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · KIT COMPARTIDO V2 (ESTILO GEMINI)
 * =====================================================================
 * Refactorización orientada a:
 *  1. Introducción y tipografía de alto impacto estilo GEMINI (Hero grandilocuente,
 *     kicker, línea de respiración neón y badges flotantes).
 *  2. Repartición vertical completa ("a lo largo", 1080x1920) sin huecos vacíos.
 *  3. Cero cuadrículas en el fondo: degradados de estudio suaves y orbes orgánicos.
 *  4. Colores pastel/slate más claros que no cansan la vista.
 *  5. Barra superior eliminada por completo.
 *  6. Animaciones 3D en perspectiva (rotateX, rotateY, depth, imágenes de mockup).
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

/** Paleta de colores suaves (estilo Gemini Slate) para no cansar la vista. */
export interface TrilogyPalette {
  /** Color superior suave (slate). */
  base: string;
  /** Tono medio del degradado. */
  baseMid: string;
  /** Tono profundo (nunca negro puro áspero). */
  baseDeep: string;
  /** Acento pastel luminoso principal. */
  accent: string;
  /** Acento secundario armónico. */
  secondary: string;
  /** Halo ambiental difuso. */
  aura: string;
}

export const STACK1_PALETTE: TrilogyPalette = {
  base: "#12261E",     // Sage slate suave
  baseMid: "#0A1813",
  baseDeep: "#050F0C",
  accent: "#34D399",   // Menta pastel de alto contraste
  secondary: "#38BDF8",// Cielo pastel
  aura: "rgba(52, 211, 153, 0.28)",
};

export const STACK2_PALETTE: TrilogyPalette = {
  base: "#241B13",     // Ámbar bronce pizarra suave
  baseMid: "#16100B",
  baseDeep: "#0D0906",
  accent: "#FBBF24",   // Ámbar pastel dorado
  secondary: "#FB923C",// Coral suave
  aura: "rgba(251, 191, 36, 0.26)",
};

export const STACK3_PALETTE: TrilogyPalette = {
  base: "#15203A",     // Índigo slate suave
  baseMid: "#0E162B",
  baseDeep: "#070C18",
  accent: "#38BDF8",   // Azul cielo pastel
  secondary: "#A78BFA",// Lavanda pastel
  aura: "rgba(56, 189, 248, 0.28)",
};

/** Interpolación con clamp seguro en ambos extremos. */
export const clampInterp = (
  frame: number,
  input: [number, number],
  output: [number, number]
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Resorte ágil y suave estilo Gemini (mass 0.7, damping 20). */
export const useEnter = (delay = 0, damping = 18, stiffness = 160) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping, stiffness, mass: 0.72 },
  });
};

// =====================================================================
// 1. FONDO DE ESTUDIO LIMPIO (SIN CUADRÍCULA, SUAVE A LA VISTA)
// =====================================================================
export const TrilogyAtmosphere: React.FC<{ palette: TrilogyPalette }> = ({
  palette,
}) => {
  const frame = useCurrentFrame();
  const orb1X = Math.sin(frame / 48) * 110;
  const orb1Y = Math.cos(frame / 56) * 80;
  const orb2X = Math.cos(frame / 42) * -100;
  const orb2Y = Math.sin(frame / 52) * 90;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(130% 90% at 50% 0%, ${palette.base} 0%, ${palette.baseMid} 52%, ${palette.baseDeep} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Halo de luz superior sutil (radial gradient nativo) */}
      <div
        style={{
          position: "absolute",
          width: 950,
          height: 950,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.accent} 0%, rgba(0,0,0,0) 68%)`,
          opacity: 0.24,
          top: -40 + orb1Y,
          left: -180 + orb1X,
          pointerEvents: "none",
        }}
      />
      {/* Halo de luz inferior secundario suave */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.secondary} 0%, rgba(0,0,0,0) 68%)`,
          opacity: 0.18,
          bottom: 20 + orb2Y,
          right: -160 + orb2X,
          pointerEvents: "none",
        }}
      />
      {/* Viñeta sutil para centrar el foco */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// =====================================================================
// 2. DISPOSICIÓN VERTICAL COMPLETA ("A LO LARGO", 1080x1920)
// =====================================================================
export const TrilogyCanvas: React.FC<{
  durationInFrames: number;
  badge: string;
  badgeColor?: string;
  logoFile?: string;
  kicker?: string;
  kickerColor?: string;
  title: string;
  titleSize?: number;
  sub?: string;
  children: React.ReactNode;
  footerTelemetry?: React.ReactNode;
}> = ({
  durationInFrames,
  badge,
  badgeColor = "#38BDF8",
  logoFile,
  kicker,
  kickerColor,
  title,
  titleSize = 82,
  sub,
  children,
  footerTelemetry,
}) => {
  const frame = useCurrentFrame();
  const enter = useEnter(0, 18, 150);
  const exit = clampInterp(frame, [durationInFrames - 15, durationInFrames], [1, 0]);
  const drift = clampInterp(frame, [0, durationInFrames], [1, 1.015]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "130px 65px 120px",
        boxSizing: "border-box",
        opacity: enter * exit,
        transform: `translateY(${(1 - enter) * 28 + (1 - exit) * -24}px) scale(${
          (0.97 + enter * 0.03) * drift
        })`,
        fontFamily: FONT_SANS,
        color: "#FFFFFF",
      }}
    >
      {/* 2.1 ZONA SUPERIOR: Badge a la izquierda + Logo oficial a la derecha */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 70,
        }}
      >
        <Badge text={badge} color={badgeColor} delay={2} />
        {logoFile && (
          <BrandLogo file={logoFile} size={54} glow={badgeColor} delay={4} />
        )}
      </div>

      {/* 2.2 ZONA TITULAR: Kicker + Kinetic Title + Línea respiración + Sub */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 10,
          marginBottom: 16,
        }}
      >
        {kicker && (
          <div
            style={{
              fontFamily: FONT_MONO,
              fontWeight: 800,
              fontSize: 24,
              letterSpacing: "0.14em",
              color: kickerColor || badgeColor,
              textTransform: "uppercase",
              opacity: useEnter(6),
            }}
          >
            {kicker}
          </div>
        )}

        <KineticTitle text={title} accent={badgeColor} fontSize={titleSize} delay={8} />

        {/* Línea de acento estilo Gemini que se expande y respira */}
        <BreathingLine color={badgeColor} secondary={kickerColor || "#38BDF8"} delay={20} />

        {sub && <SubLine text={sub} delay={24} />}
      </div>

      {/* 2.3 ESCENARIO CENTRAL VISUAL (3D, MOCKUPS O CÓDIGO INTERACTIVO) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "10px 0",
          perspective: 1200,
        }}
      >
        {children}
      </div>

      {/* 2.4 ZONA INFERIOR: Telemetría / Barra de Estado / Takeaway */}
      {footerTelemetry ? (
        <div style={{ minHeight: 65, display: "flex", alignItems: "center" }}>
          {footerTelemetry}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// =====================================================================
// 3. LÍNEA DE RESPIRACIÓN Y BADGE ESTILO GEMINI
// =====================================================================
export const BreathingLine: React.FC<{
  color: string;
  secondary: string;
  delay?: number;
}> = ({ color, secondary, delay = 16 }) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay, 22, 110);
  const breathe = Math.sin((frame - delay) / 14) * 8;

  return (
    <div
      style={{
        marginTop: 6,
        marginBottom: 6,
        height: 7,
        width: `${460 * enter}px`,
        borderRadius: 4,
        background: `linear-gradient(90deg, ${color}, ${secondary})`,
        boxShadow: `0 0 ${20 + breathe}px ${color}88`,
        opacity: enter,
      }}
    />
  );
};

export const Badge: React.FC<{
  text: string;
  color: string;
  delay?: number;
}> = ({ text, color, delay = 0 }) => {
  const enter = useEnter(delay, 16, 170);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 20px",
        borderRadius: 999,
        background: `${color}18`,
        border: `1.5px solid ${color}77`,
        color,
        fontFamily: FONT_MONO,
        fontSize: 20,
        fontWeight: 800,
        letterSpacing: "0.08em",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 14}px)`,
        boxShadow: `0 0 25px -4px ${color}44`,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      {text}
    </div>
  );
};

export const KineticTitle: React.FC<{
  text: string;
  accent?: string;
  fontSize?: number;
  delay?: number;
}> = ({ text, accent = "#38BDF8", fontSize = 82, delay = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chunks = text.split("*");
  let wordIndex = 0;

  return (
    <div
      style={{
        fontSize,
        lineHeight: 1.08,
        fontWeight: 800,
        letterSpacing: "-0.035em",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.26em",
        alignItems: "baseline",
      }}
    >
      {chunks.map((chunk, chunkIdx) =>
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
                style={{ overflow: "hidden", display: "inline-flex", paddingBottom: 4 }}
              >
                <span
                  style={{
                    display: "inline-block",
                    transform: `translateY(${(1 - p) * 105}%)`,
                    color: highlighted ? accent : "#FFFFFF",
                    textShadow: highlighted ? `0 0 30px ${accent}66` : "none",
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

export const SubLine: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 20,
}) => {
  const enter = useEnter(delay, 20, 130);
  return (
    <div
      style={{
        fontSize: 32,
        lineHeight: 1.34,
        fontWeight: 500,
        color: "#94A3B8",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 18}px)`,
      }}
    >
      {text}
    </div>
  );
};

// =====================================================================
// 4. CONTENEDOR 3D EN PERSPECTIVA (OBJETOS, DISPOSITIVOS, TARJETAS)
// =====================================================================
export const Card3D: React.FC<{
  children: React.ReactNode;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  glow?: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({
  children,
  rotateX = 8,
  rotateY = -6,
  rotateZ = 0,
  glow,
  delay = 10,
  style,
}) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay, 18, 140);
  const float = Math.sin((frame - delay) / 18) * 8;
  const currentRotateX = rotateX + Math.sin(frame / 22) * 2;
  const currentRotateY = rotateY + Math.cos(frame / 26) * 2;

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 28,
        background: "rgba(18, 27, 46, 0.76)",
        border: `1.5px solid ${glow ? `${glow}66` : "rgba(255,255,255,0.12)"}`,
        padding: "30px 32px",
        boxShadow: glow
          ? `0 35px 80px -15px rgba(0,0,0,0.65), 0 0 45px -10px ${glow}44`
          : "0 35px 80px -15px rgba(0,0,0,0.65)",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 36 + float}px) perspective(1200px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) rotateZ(${rotateZ}deg) scale(${
          0.96 + enter * 0.04
        })`,
        transformStyle: "preserve-3d",
        position: "relative",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// =====================================================================
// 5. VENTANA / MOCKUP DE DISPOSITIVO CON IMAGEN REAL O UI
// =====================================================================
export const MockupWindow: React.FC<{
  title: string;
  image?: string;
  children?: React.ReactNode;
  accent?: string;
  height?: number;
  delay?: number;
}> = ({ title, image, children, accent = "#38BDF8", height = 480, delay = 12 }) => {
  const enter = useEnter(delay);
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: 22,
        overflow: "hidden",
        background: "rgba(10, 16, 28, 0.92)",
        border: `1.5px solid ${accent}55`,
        display: "flex",
        flexDirection: "column",
        boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 35px ${accent}22`,
        opacity: enter,
      }}
    >
      {/* Barra de ventana macOS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontFamily: FONT_MONO, fontSize: 17, color: "#94A3B8", fontWeight: 600 }}>
          {title}
        </span>
        <div style={{ width: 40 }} />
      </div>

      {/* Contenido: Imagen real o slot React */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {image ? (
          <Img
            src={staticFile(image)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

// =====================================================================
// 6. LOGO OFICIAL CON LEVITACIÓN
// =====================================================================
export const BrandLogo: React.FC<{
  file: string;
  size?: number;
  glow?: string;
  delay?: number;
}> = ({ file, size = 56, glow, delay = 0 }) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay, 14, 170);
  const breathe = Math.sin((frame + delay * 4) / 16) * 5;

  return (
    <div
      style={{
        width: size * 1.5,
        height: size * 1.5,
        borderRadius: size * 0.42,
        background: "rgba(255,255,255,0.07)",
        border: `1.5px solid ${glow ? `${glow}88` : "rgba(255,255,255,0.16)"}`,
        boxShadow: glow ? `0 0 30px -4px ${glow}66` : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: enter,
        transform: `translateY(${breathe}px) scale(${0.7 + enter * 0.3})`,
      }}
    >
      <Img
        src={staticFile(`assets/trilogia/${file}`)}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    </div>
  );
};

// =====================================================================
// 7. BARRA DE TELEMETRÍA INFERIOR (CERO ESPACIO VACÍO)
// =====================================================================
export const TelemetryBar: React.FC<{
  label: string;
  metric: string;
  color?: string;
  icon?: string;
  delay?: number;
}> = ({ label, metric, color = "#38BDF8", delay = 22 }) => {
  const enter = useEnter(delay);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 24px",
        borderRadius: 20,
        background: "rgba(15, 23, 42, 0.72)",
        border: `1px solid ${color}44`,
        fontFamily: FONT_MONO,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 20}px)`,
        boxShadow: `0 10px 30px rgba(0,0,0,0.4), 0 0 25px -8px ${color}33`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: 4.5,
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
        <span style={{ fontSize: 19, fontWeight: 700, color: "#94A3B8" }}>
          {label}
        </span>
      </div>
      <span
        style={{
          fontSize: 20,
          fontWeight: 800,
          color,
          letterSpacing: "0.04em",
        }}
      >
        {metric}
      </span>
    </div>
  );
};

// =====================================================================
// 8. AUDIO BGM SUAVE
// =====================================================================
export const TrilogyBgm: React.FC<{ volume?: number }> = ({ volume = 0.24 }) => (
  <Audio
    src={staticFile("bgm/tech_ambient_bed.mp3")}
    volume={volume}
    loop
  />
);
