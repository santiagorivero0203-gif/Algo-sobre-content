/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · KIT COMPARTIDO V3 (DYNAMIC MOTION & SFX)
 * =====================================================================
 * Refactorización orientada a:
 *  1. Efectos de sonido (SFX) deterministas sincronizados por beat:
 *     whoosh-cinematic, impact-bass, typing, chime, ping, sparkle.
 *  2. Lógica visual diferenciada por beat (cero flotación repetitiva):
 *     - Beat 1: 3D perspective float (CardHero3D)
 *     - Beat 2: Aparición horizontal de izquierda a derecha (CardSlideLateral)
 *     - Beat 3: Dual snap vertical top/bottom con compilación (CardDualSnap)
 *     - Beat 4: Escáner láser y revelado de cortina (CardScanReveal)
 *     - Beat 5: Impacto stamp con resorte y botón magnético pulsante (CardStampCTA)
 *  3. Paletas pastel slate suaves (cero fatiga visual).
 *  4. Sin cuadrículas de fondo y sin barra superior fija.
 * =====================================================================
 */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
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
  base: string;
  baseMid: string;
  baseDeep: string;
  accent: string;
  secondary: string;
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

/** Resorte ágil y suave estilo Gemini (mass 0.72, damping 18). */
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
// 1. REPRODUCTOR DETERMINISTA DE EFECTOS DE SONIDO (SFX)
// =====================================================================
export const SoundEffect: React.FC<{
  file: string;
  from?: number;
  volume?: number;
}> = ({ file, from = 0, volume = 0.5 }) => {
  return (
    <Sequence from={from}>
      <Audio src={staticFile(`sfx/${file}`)} volume={volume} />
    </Sequence>
  );
};

// =====================================================================
// 2. FONDO DE ESTUDIO LIMPIO (SIN CUADRÍCULA, SUAVE A LA VISTA)
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
      {/* Halo de luz superior sutil */}
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
      {/* Halo de luz inferior secundario */}
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
      {/* Viñeta para centrar foco */}
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
// 3. DISPOSICIÓN VERTICAL COMPLETA ("A LO LARGO", 1080x1920)
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
      {/* 3.1 ZONA SUPERIOR: Badge a la izquierda + Logo oficial a la derecha */}
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

      {/* 3.2 ZONA TITULAR: Kicker + Kinetic Title + Línea respiración + Sub */}
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

        <BreathingLine color={badgeColor} secondary={kickerColor || "#38BDF8"} delay={18} />

        {sub && <SubLine text={sub} delay={22} />}
      </div>

      {/* 3.3 ESCENARIO CENTRAL VISUAL */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "10px 0",
        }}
      >
        {children}
      </div>

      {/* 3.4 ZONA INFERIOR: Telemetría / Barra de Estado */}
      {footerTelemetry ? (
        <div style={{ minHeight: 65, display: "flex", alignItems: "center" }}>
          {footerTelemetry}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// =====================================================================
// 4. LÍNEA DE RESPIRACIÓN Y BADGES
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
// 5. ANIMACIONES DIFERENCIADAS POR BEAT (LÓGICA VISUAL REAL)
// =====================================================================

/** BEAT 1: PERSPECTIVA 3D HERO (el que el usuario aprobó) */
export const CardHero3D: React.FC<{
  children: React.ReactNode;
  rotateX?: number;
  rotateY?: number;
  glow?: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({
  children,
  rotateX = 9,
  rotateY = -7,
  glow,
  delay = 10,
  style,
}) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay, 18, 140);
  const float = Math.sin((frame - delay) / 20) * 6;

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 28,
        background: "rgba(18, 27, 46, 0.78)",
        border: `1.5px solid ${glow ? `${glow}66` : "rgba(255,255,255,0.12)"}`,
        padding: "30px 32px",
        boxShadow: glow
          ? `0 35px 80px -15px rgba(0,0,0,0.65), 0 0 45px -10px ${glow}44`
          : "0 35px 80px -15px rgba(0,0,0,0.65)",
        opacity: enter,
        transform: `perspective(1200px) translateY(${(1 - enter) * 36 + float}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${
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

/** BEAT 2: APARICIÓN LATERAL DE IZQUIERDA A DERECHA (pedido expreso del usuario) */
export const CardSlideLateral: React.FC<{
  children: React.ReactNode;
  glow?: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, glow, delay = 8, style }) => {
  const enter = useEnter(delay, 20, 160);
  const slideX = (1 - enter) * -160;
  const clipPercent = enter * 100;

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 28,
        background: "rgba(18, 27, 46, 0.82)",
        border: `1.5px solid ${glow ? `${glow}66` : "rgba(255,255,255,0.12)"}`,
        padding: "30px 32px",
        boxShadow: glow
          ? `0 35px 80px -15px rgba(0,0,0,0.65), 0 0 45px -10px ${glow}44`
          : "0 35px 80px -15px rgba(0,0,0,0.65)",
        opacity: enter,
        transform: `translateX(${slideX}px)`,
        clipPath: `inset(0 ${100 - clipPercent}% 0 0 round 28px)`,
        position: "relative",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** BEAT 3: DUAL SNAP VERTICAL (Top cae, Bottom sube, se unen en el centro) */
export const CardDualSnap: React.FC<{
  topChild: React.ReactNode;
  bottomChild: React.ReactNode;
  glow?: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ topChild, bottomChild, glow, delay = 8, style }) => {
  const enterTop = useEnter(delay, 18, 170);
  const enterBottom = useEnter(delay + 14, 18, 170);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 22,
          background: "rgba(18, 27, 46, 0.88)",
          border: `1.5px solid ${glow ? `${glow}66` : "rgba(255,255,255,0.12)"}`,
          padding: "24px 26px",
          opacity: enterTop,
          transform: `translateY(${(1 - enterTop) * -70}px)`,
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        {topChild}
      </div>
      <div
        style={{
          width: "100%",
          borderRadius: 22,
          background: "rgba(14, 22, 38, 0.90)",
          border: `1.5px solid ${glow ? `${glow}55` : "rgba(255,255,255,0.12)"}`,
          padding: "24px 26px",
          opacity: enterBottom,
          transform: `translateY(${(1 - enterBottom) * 70}px)`,
          boxShadow: glow ? `0 0 35px -8px ${glow}44` : "none",
        }}
      >
        {bottomChild}
      </div>
    </div>
  );
};

/** BEAT 4: ESCÁNER LÁSER Y REVELADO DE CORTINA (Nano Banana / Git / Contratos) */
export const CardScanReveal: React.FC<{
  children: React.ReactNode;
  glow?: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, glow = "#38BDF8", delay = 8, style }) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay, 20, 160);
  const scanProgress = clampInterp(frame, [delay + 12, delay + 75], [0, 100]);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 28,
        background: "rgba(18, 27, 46, 0.80)",
        border: `1.5px solid ${glow}66`,
        padding: "30px 32px",
        boxShadow: `0 35px 80px -15px rgba(0,0,0,0.65), 0 0 45px -10px ${glow}44`,
        opacity: enter,
        transform: `scale(${0.94 + enter * 0.06})`,
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
      {/* Haz de luz de escaneo láser dinámico */}
      {scanProgress < 99 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${scanProgress}%`,
            width: 4,
            background: glow,
            boxShadow: `0 0 26px 6px ${glow}`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

/** BEAT 5: IMPACT STAMP CON BOTÓN MAGNÉTICO PULSANTE */
export const CardStampCTA: React.FC<{
  children: React.ReactNode;
  glow?: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, glow = "#34D399", delay = 8, style }) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay, 15, 180);
  const pulse = Math.sin((frame - delay) / 14) * 0.025;

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 30,
        background: "rgba(18, 27, 46, 0.88)",
        border: `2px solid ${glow}77`,
        padding: "36px 32px",
        boxShadow: `0 40px 90px -15px rgba(0,0,0,0.7), 0 0 60px -10px ${glow}55`,
        opacity: enter,
        transform: `scale(${(0.88 + enter * 0.12) * (1 + pulse)})`,
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
// 6. VENTANA / MOCKUP DE DISPOSITIVO CON IMAGEN REAL O UI
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
// 7. LOGO OFICIAL
// =====================================================================
export const BrandLogo: React.FC<{
  file: string;
  size?: number;
  glow?: string;
  delay?: number;
}> = ({ file, size = 56, glow, delay = 0 }) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay, 14, 170);
  const breathe = Math.sin((frame + delay * 4) / 16) * 4;

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
// 8. BARRA DE TELEMETRÍA INFERIOR
// =====================================================================
export const TelemetryBar: React.FC<{
  label: string;
  metric: string;
  color?: string;
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
// 9. AUDIO BGM
// =====================================================================
export const TrilogyBgm: React.FC<{ volume?: number }> = ({ volume = 0.22 }) => (
  <Audio
    src={staticFile("bgm/tech_ambient_bed.mp3")}
    volume={volume}
    loop
  />
);
