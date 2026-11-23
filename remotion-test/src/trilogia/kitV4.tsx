/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · KIT V4 CINE HD (FLUIDEZ + RACK FOCUS)
 * =====================================================================
 * Diseñado bajo los principios de movimiento, fluidez y nitidez editorial:
 *  - Nitidez selectiva (Rack Focus / DOF): el elemento activo resalta
 *    en foco cristalino mientras capas secundarias/inactivas usan
 *    desenfoque óptico suave (`blur(1.8px–4px)`) para crear profundidad.
 *  - Tipografía móvil generosa (mín. 26px en badges, 34–40px en código,
 *    96–124px en titulares). Cero texto aplastado o microscópico.
 *  - Cabecera dinámica (DockingHeader): entra en grande como gancho y
 *    se comprime/ancla suavemente arriba para liberar el escenario central.
 *  - Empuje elástico (PushStage): cuando entra una tarjeta secundaria,
 *    empuja físicamente a la primera hacia arriba y la desenfoca levemente.
 *  - Cámara continua (TrilogyCameraV4) + atmósfera reactiva
 *    (`interpolateColors`) + logos flotantes en paralaje con DOF.
 *  - 100% determinista (`useCurrentFrame`), resortes calibrados
 *    (`remotion-motion-design`), iconos SVG vectoriales (cero emojis).
 * =====================================================================
 */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  interpolateColors,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_MONO, FONT_SANS } from "../lib/theme";

export { FONT_MONO, FONT_SANS };

// =====================================================================
// 1. PALETAS Y ZONAS SEGURAS (1080x1920 TIKTOK / REELS)
// =====================================================================
export const SAFE_V4 = {
  top: 150,
  bottom: 235,
  side: 60,
} as const;

export interface TrilogyPaletteV4 {
  base: string;
  baseMid: string;
  baseDeep: string;
  accent: string;
  secondary: string;
  surface: string;
  surfaceBorder: string;
  glow: string;
}

export const STACK1_V4_PALETTE: TrilogyPaletteV4 = {
  base: "#102C22",
  baseMid: "#081A14",
  baseDeep: "#040D0A",
  accent: "#34D399",
  secondary: "#38BDF8",
  surface: "rgba(11, 24, 21, 0.86)",
  surfaceBorder: "rgba(52, 211, 153, 0.38)",
  glow: "rgba(52, 211, 153, 0.34)",
};

export const STACK2_V4_PALETTE: TrilogyPaletteV4 = {
  base: "#2B1E10",
  baseMid: "#171009",
  baseDeep: "#0B0704",
  accent: "#FBBF24",
  secondary: "#FB923C",
  surface: "rgba(24, 17, 11, 0.86)",
  surfaceBorder: "rgba(251, 191, 36, 0.40)",
  glow: "rgba(251, 191, 36, 0.32)",
};

export const STACK3_V4_PALETTE: TrilogyPaletteV4 = {
  base: "#132242",
  baseMid: "#0B1429",
  baseDeep: "#050914",
  accent: "#38BDF8",
  secondary: "#A78BFA",
  surface: "rgba(12, 21, 40, 0.86)",
  surfaceBorder: "rgba(56, 189, 248, 0.40)",
  glow: "rgba(56, 189, 248, 0.34)",
};

// =====================================================================
// 2. UTILIDADES DE INTERPOLACIÓN Y RESORTES CALIBRADOS
// =====================================================================
export const clampInterp = (
  frame: number,
  input: [number, number],
  output: [number, number],
  easing?: (t: number) => number
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const EASE_CINEMATIC = Easing.bezier(0.16, 1, 0.3, 1);

/** Resortes calibrados según `remotion-motion-design` (ζ ∈ [0.72, 0.98]). */
export const SPRING_TITLE = { damping: 22, stiffness: 160, mass: 0.8 } as const;
export const SPRING_CARD = { damping: 20, stiffness: 140, mass: 0.8 } as const;
export const SPRING_SOFT = { damping: 26, stiffness: 110, mass: 0.8 } as const;
export const SPRING_PUNCH = { damping: 13, stiffness: 170, mass: 0.8 } as const;

export const useSpringV4 = (
  delay = 0,
  config: { damping: number; stiffness: number; mass: number } = SPRING_CARD
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config });
};

// =====================================================================
// 3. ICONOS SVG VECTORIALES (CERO EMOJIS EN PANTALLA)
// =====================================================================
interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const SvgCheck: React.FC<IconProps> = ({
  size = 28,
  color = "#34D399",
  strokeWidth = 3,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill={`${color}22`} stroke={color} strokeWidth={1.8} />
    <path
      d="M7.5 12.5L10.5 15.5L16.8 9"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SvgCross: React.FC<IconProps> = ({
  size = 28,
  color = "#F87171",
  strokeWidth = 2.8,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill={`${color}22`} stroke={color} strokeWidth={1.8} />
    <path
      d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const SvgWarning: React.FC<IconProps> = ({
  size = 28,
  color = "#F87171",
  strokeWidth = 2.4,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M12 3L21.5 19.5H2.5L12 3Z"
      fill={`${color}22`}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path d="M12 9.5V13.8" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    <circle cx="12" cy="16.8" r="1.2" fill={color} />
  </svg>
);

export const SvgLock: React.FC<IconProps> = ({
  size = 26,
  color = "#38BDF8",
  strokeWidth = 2.4,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <rect
      x="4.5"
      y="10.5"
      width="15"
      height="10.5"
      rx="3"
      fill={`${color}22`}
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <path
      d="M8 10.5V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <circle cx="12" cy="15.5" r="1.5" fill={color} />
  </svg>
);

export const SvgShield: React.FC<IconProps> = ({
  size = 26,
  color = "#34D399",
  strokeWidth = 2.3,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M12 2.5L4.5 5.8V11.8C4.5 16.5 7.7 20.4 12 21.8C16.3 20.4 19.5 16.5 19.5 11.8V5.8L12 2.5Z"
      fill={`${color}24`}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path
      d="M8.8 12.2L11 14.4L15.4 9.8"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SvgSparkle: React.FC<IconProps> = ({ size = 28, color = "#34D399" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
      fill={color}
    />
  </svg>
);

export const SvgBolt: React.FC<IconProps> = ({ size = 26, color = "#FBBF24" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M13 2L4.5 13.5H11.5L10.5 22L19.5 10.5H12.5L13 2Z"
      fill={`${color}30`}
      stroke={color}
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
  </svg>
);

export const SvgArrowRight: React.FC<IconProps> = ({
  size = 28,
  color = "#34D399",
  strokeWidth = 2.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M4 12H19M13.5 6.5L19.5 12L13.5 17.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SvgTerminal: React.FC<IconProps> = ({ size = 26, color = "#34D399" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="3"
      fill={`${color}18`}
      stroke={color}
      strokeWidth={2}
    />
    <path
      d="M7.5 9.5L10.5 12L7.5 14.5M12.5 14.5H16.5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SvgComment: React.FC<IconProps> = ({ size = 28, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M4 6.5C4 4.8 5.3 3.5 7 3.5H17C18.7 3.5 20 4.8 20 6.5V14.5C20 16.2 18.7 17.5 17 17.5H10.5L6 21V17.5H7C5.3 17.5 4 16.2 4 14.5V6.5Z"
      fill={`${color}20`}
      stroke={color}
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
  </svg>
);

export const SvgSend: React.FC<IconProps> = ({ size = 26, color = "#34D399" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M21 3L10 14M21 3L14.5 21L10 14L3 9.5L21 3Z"
      fill={`${color}24`}
      stroke={color}
      strokeWidth={2.1}
      strokeLinejoin="round"
    />
  </svg>
);

export const SvgScissors: React.FC<IconProps> = ({ size = 26, color = "#34D399" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="6.5" cy="7" r="2.8" stroke={color} strokeWidth={2.2} />
    <circle cx="6.5" cy="17" r="2.8" stroke={color} strokeWidth={2.2} />
    <path
      d="M9 8.6L20 16.5M9 15.4L20 7.5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </svg>
);

export const SvgGitBranch: React.FC<IconProps> = ({ size = 26, color = "#FBBF24" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="6.5" cy="5.5" r="2.5" stroke={color} strokeWidth={2.2} />
    <circle cx="6.5" cy="18.5" r="2.5" stroke={color} strokeWidth={2.2} />
    <circle cx="17.5" cy="8.5" r="2.5" stroke={color} strokeWidth={2.2} />
    <path
      d="M6.5 8V16M17.5 11C17.5 14.5 14 16 6.5 16"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </svg>
);

export const SvgCursor: React.FC<{ size?: number; color?: string }> = ({
  size = 44,
  color = "#FFFFFF",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.65))" }}
  >
    <path
      d="M6 4L25 14.8L16.2 17.2L12.6 26L6 4Z"
      fill={color}
      stroke="#090D16"
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
  </svg>
);

// =====================================================================
// 4. AUDIO DETERMINISTA (SFX + BGM CON ENVOLVENTE SUAVE)
// =====================================================================
export const SoundEffectV4: React.FC<{
  file: string;
  from?: number;
  volume?: number;
}> = ({ file, from = 0, volume = 0.5 }) => (
  <Sequence from={from}>
    <Audio src={staticFile(`sfx/${file}`)} volume={volume} />
  </Sequence>
);

export const TrilogyBgmV4: React.FC<{
  totalFrames: number;
  volume?: number;
}> = ({ totalFrames, volume = 0.18 }) => {
  const { fps } = useVideoConfig();
  return (
    <Audio
      src={staticFile("bgm/tech_ambient_bed.mp3")}
      volume={(f) => {
        const fadeIn = Math.min(1, f / (fps * 0.6));
        const fadeOut = Math.min(1, (totalFrames - f) / (fps * 0.8));
        return volume * Math.max(0, fadeIn) * Math.max(0, fadeOut);
      }}
      loop
    />
  );
};

// =====================================================================
// 5. ATMÓSFERA REACTIVA + PROFUNDIDAD PARALAJE (SIN CUADRÍCULA)
// =====================================================================
export interface MoodKeyframe {
  frame: number;
  base: string;
  deep: string;
  orbA: string;
  orbB: string;
}

export interface AmbientLogoSpec {
  file: string;
  x: number;
  y: number;
  size: number;
  blur: number;
  speed: number;
  opacity?: number;
}

export const ReactiveAtmosphereV4: React.FC<{
  moods: MoodKeyframe[];
  ambientLogos?: AmbientLogoSpec[];
  cutFrames?: number[];
  flashColor?: string;
}> = ({ moods, ambientLogos = [], cutFrames = [], flashColor = "#FFFFFF" }) => {
  const frame = useCurrentFrame();

  const frames = moods.map((m) => m.frame);
  const bgBase =
    moods.length > 1
      ? interpolateColors(
          frame,
          frames,
          moods.map((m) => m.base)
        )
      : moods[0].base;
  const bgDeep =
    moods.length > 1
      ? interpolateColors(
          frame,
          frames,
          moods.map((m) => m.deep)
        )
      : moods[0].deep;
  const orbAColor =
    moods.length > 1
      ? interpolateColors(
          frame,
          frames,
          moods.map((m) => m.orbA)
        )
      : moods[0].orbA;
  const orbBColor =
    moods.length > 1
      ? interpolateColors(
          frame,
          frames,
          moods.map((m) => m.orbB)
        )
      : moods[0].orbB;

  const orb1X = Math.sin(frame / 44) * 140;
  const orb1Y = Math.cos(frame / 52) * 105;
  const orb2X = Math.cos(frame / 38) * -130;
  const orb2Y = Math.sin(frame / 48) * 115;

  // Destello óptico sutil en cada cambio de beat
  let cutFlash = 0;
  for (const cf of cutFrames) {
    const d = frame - cf;
    if (d >= -4 && d <= 14) {
      const fVal =
        d < 0
          ? clampInterp(d, [-4, 0], [0, 0.14])
          : clampInterp(d, [0, 14], [0.14, 0]);
      cutFlash = Math.max(cutFlash, fVal);
    }
  }

  // Barrido diagonal de luz muy sutil para sensación de superficie viva
  const sweepPos = ((frame * 3.2) % 2400) - 600;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(125% 88% at 50% 8%, ${bgBase} 0%, ${bgDeep} 86%)`,
        overflow: "hidden",
      }}
    >
      {/* Orbe volumétrico superior (radial-gradient puro = alta velocidad + nitidez sin banding) */}
      <div
        style={{
          position: "absolute",
          width: 1080,
          height: 1080,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orbAColor} 0%, rgba(0,0,0,0) 68%)`,
          opacity: 0.34,
          top: -220,
          left: -180,
          translate: `${orb1X}px ${orb1Y}px`,
          scale: `${1 + Math.sin(frame / 50) * 0.08}`,
          pointerEvents: "none",
        }}
      />

      {/* Orbe volumétrico inferior secundario */}
      <div
        style={{
          position: "absolute",
          width: 980,
          height: 980,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orbBColor} 0%, rgba(0,0,0,0) 68%)`,
          opacity: 0.28,
          bottom: -140,
          right: -180,
          translate: `${orb2X}px ${orb2Y}px`,
          scale: `${1 + Math.cos(frame / 42) * 0.08}`,
          pointerEvents: "none",
        }}
      />

      {/* Logos ambientales en paralaje suave con desenfoque óptico (profundidad real) */}
      {ambientLogos.map((logo, idx) => {
        const dx = Math.sin((frame + idx * 35) / (46 / logo.speed)) * 28;
        const dy = Math.cos((frame + idx * 25) / (54 / logo.speed)) * 24;
        const rot = Math.sin((frame + idx * 19) / 70) * 8;
        return (
          <div
            key={`${logo.file}-${idx}`}
            style={{
              position: "absolute",
              left: logo.x,
              top: logo.y,
              width: logo.size,
              height: logo.size,
              opacity: logo.opacity ?? 0.085,
              filter: `blur(${logo.blur}px)`,
              translate: `${dx}px ${dy}px`,
              rotate: `${rot}deg`,
              pointerEvents: "none",
            }}
          >
            <Img
              src={staticFile(`assets/trilogia/${logo.file}`)}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        );
      })}

      {/* Haz de luz diagonal muy sutil que cruza el fondo */}
      <div
        style={{
          position: "absolute",
          inset: -200,
          background:
            "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.035) 50%, transparent 58%)",
          translate: `${sweepPos * 0.35}px 0px`,
          pointerEvents: "none",
        }}
      />

      {/* Viñeta cinematográfica suave para concentrar la atención */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, transparent 48%, rgba(0,0,0,0.52) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Destello suave en transiciones de beat */}
      {cutFlash > 0.005 && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 45%, ${flashColor} 0%, transparent 72%)`,
            opacity: cutFlash,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// =====================================================================
// 6. CÁMARA CONTINUA POR BEAT + FOCUS-PULL ÓPTICO DE ENTRADA
// =====================================================================
export interface BeatCameraPose {
  frame: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
}

const interpPose = (frame: number, poses: BeatCameraPose[], key: "x" | "y" | "scale" | "rotate", def: number) => {
  if (poses.length === 0) return def;
  if (poses.length === 1) return poses[0][key] ?? def;
  return interpolate(
    frame,
    poses.map((p) => p.frame),
    poses.map((p) => p[key] ?? def),
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_CINEMATIC,
    }
  );
};

export const BeatCameraV4: React.FC<{
  durationInFrames: number;
  poses?: BeatCameraPose[];
  accent: string;
  children: React.ReactNode;
}> = ({ durationInFrames, poses, accent, children }) => {
  const frame = useCurrentFrame();

  const defaultPoses: BeatCameraPose[] = poses ?? [
    { frame: 0, x: 0, y: 18, scale: 1.04, rotate: -0.4 },
    { frame: 26, x: 0, y: 0, scale: 1.0, rotate: 0 },
    { frame: Math.floor(durationInFrames * 0.55), x: -8, y: -6, scale: 1.018, rotate: 0.25 },
    { frame: durationInFrames, x: 4, y: -12, scale: 1.032, rotate: -0.15 },
  ];

  const x = interpPose(frame, defaultPoses, "x", 0);
  const y = interpPose(frame, defaultPoses, "y", 0);
  const camScale = interpPose(frame, defaultPoses, "scale", 1);
  const rot = interpPose(frame, defaultPoses, "rotate", 0);

  // Micro respiración perpetua para cero frames congelados
  const microBreathY = Math.sin(frame / 28) * 3.5;

  // Focus-pull cinematográfico en entrada (desenfocado 6px → nítido 0px en 13 frames)
  const enterBlur = clampInterp(frame, [0, 13], [6.5, 0], EASE_CINEMATIC);
  const enterOpacity = clampInterp(frame, [0, 9], [0, 1]);

  // Salida suave con leve push-out + rack-focus al final del beat
  const exitStart = durationInFrames - 12;
  const exitOpacity = clampInterp(frame, [exitStart, durationInFrames], [1, 0]);
  const exitBlur = clampInterp(frame, [exitStart, durationInFrames], [0, 5.5]);
  const exitLift = clampInterp(frame, [exitStart, durationInFrames], [0, -26]);

  const totalBlur = Math.max(enterBlur, exitBlur);

  // Barrido de acento sutil en la entrada del beat
  const wipeProgress = clampInterp(frame, [0, 18], [0, 1], EASE_CINEMATIC);
  const wipeOpacity = clampInterp(frame, [0, 6], [0.22, 0]);

  return (
    <AbsoluteFill
      style={{
        perspective: 1300,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          opacity: enterOpacity * exitOpacity,
          translate: `${x}px ${y + microBreathY + exitLift}px`,
          scale: `${camScale}`,
          rotate: `${rot}deg`,
          filter: totalBlur > 0.15 ? `blur(${totalBlur.toFixed(2)}px)` : undefined,
          transformStyle: "preserve-3d",
          fontFamily: FONT_SANS,
          color: "#FFFFFF",
        }}
      >
        {children}
      </AbsoluteFill>

      {/* Flash lineal de barrido de transición (morph de luz) */}
      {wipeOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${wipeProgress * 115 - 15}%`,
            width: 240,
            background: `linear-gradient(90deg, transparent, ${accent}66, transparent)`,
            opacity: wipeOpacity,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// =====================================================================
// 7. TIPOGRAFÍA CINÉTICA CON MÁSCARA + CABECERA DINÁMICA (DOCKING)
// =====================================================================
export const KineticTitleV4: React.FC<{
  text: string;
  accent: string;
  fontSize?: number;
  delay?: number;
  align?: "left" | "center";
  maxWidth?: number;
}> = ({ text, accent, fontSize = 98, delay = 4, align = "left", maxWidth }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chunks = text.split("*");
  let wordDelayAcc = delay;

  return (
    <div
      style={{
        fontSize,
        lineHeight: 1.04,
        fontWeight: 800,
        letterSpacing: "-0.036em",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: "0.22em",
        alignItems: "baseline",
        maxWidth,
        textAlign: align,
      }}
    >
      {chunks.map((chunk, chunkIdx) =>
        chunk
          .split(" ")
          .filter(Boolean)
          .map((word, wIdx) => {
            const myDelay = wordDelayAcc;
            wordDelayAcc += 2.6 + Math.min(word.length, 9) * 0.45;
            const p = spring({
              frame: frame - myDelay,
              fps,
              config: SPRING_TITLE,
            });
            const highlighted = chunkIdx % 2 === 1;
            return (
              <span
                key={`${chunkIdx}-${wIdx}-${word}`}
                style={{
                  overflow: "hidden",
                  display: "inline-flex",
                  paddingBottom: 6,
                  paddingRight: 2,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    translate: `0px ${(1 - p) * 112}%`,
                    opacity: clampInterp(p, [0, 0.35], [0, 1]),
                    color: highlighted ? accent : "#FFFFFF",
                    textShadow: highlighted ? `0 0 36px ${accent}66` : "0 8px 28px rgba(0,0,0,0.4)",
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

export const PillBadgeV4: React.FC<{
  text: string;
  color: string;
  delay?: number;
  icon?: React.ReactNode;
}> = ({ text, color, delay = 0, icon }) => {
  const enter = useSpringV4(delay, SPRING_PUNCH);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 24px",
        borderRadius: 999,
        background: `${color}1C`,
        border: `2px solid ${color}88`,
        color,
        fontFamily: FONT_MONO,
        fontSize: 25,
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        opacity: enter,
        scale: `${0.84 + enter * 0.16}`,
        boxShadow: `0 0 30px -6px ${color}55`,
      }}
    >
      {icon ?? (
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: 99,
            background: color,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      )}
      {text}
    </div>
  );
};

export const BrandChipV4: React.FC<{
  file: string;
  size?: number;
  glow: string;
  delay?: number;
  label?: string;
}> = ({ file, size = 56, glow, delay = 2, label }) => {
  const frame = useCurrentFrame();
  const enter = useSpringV4(delay, SPRING_PUNCH);
  const floatY = Math.sin((frame + delay * 6) / 18) * 4;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: label ? "12px 22px 12px 14px" : "14px",
        borderRadius: 24,
        background: "rgba(255, 255, 255, 0.08)",
        border: `1.5px solid ${glow}77`,
        boxShadow: `0 12px 32px rgba(0,0,0,0.45), 0 0 28px -6px ${glow}66`,
        opacity: enter,
        translate: `0px ${floatY}px`,
        scale: `${0.78 + enter * 0.22}`,
      }}
    >
      <Img
        src={staticFile(`assets/trilogia/${file}`)}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
      {label && (
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 24,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "0.03em",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

/**
 * Cabecera dinámica: entra grande ocupando presencia protagonista y luego
 * (en `dockFrame`) se comprime y ancla arriba suavemente para ceder espacio
 * al contenido visual del beat.
 */
export const DockingHeaderV4: React.FC<{
  badge: string;
  accent: string;
  secondary?: string;
  logoFile?: string;
  title: string;
  sub?: string;
  heroTitleSize?: number;
  dockFrame?: number;
  dockScale?: number;
  startYOffset?: number;
}> = ({
  badge,
  accent,
  secondary = "#38BDF8",
  logoFile,
  title,
  sub,
  heroTitleSize = 104,
  dockFrame = 32,
  dockScale = 0.86,
  startYOffset = 220,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dock = spring({
    frame: frame - dockFrame,
    fps,
    config: SPRING_SOFT,
  });

  const subEnter = useSpringV4(14, SPRING_SOFT);
  const lineEnter = useSpringV4(10, SPRING_CARD);

  const headerY = (1 - dock) * startYOffset;
  const titleScale = 1 - dock * (1 - dockScale);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        translate: `0px ${headerY}px`,
        transformOrigin: "top left",
        width: "100%",
      }}
    >
      {/* Fila superior: Badge + Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <PillBadgeV4 text={badge} color={accent} delay={0} />
        {logoFile && <BrandChipV4 file={logoFile} size={52} glow={accent} delay={4} />}
      </div>

      {/* Titular con escala elástica */}
      <div
        style={{
          transformOrigin: "top left",
          scale: `${titleScale}`,
          marginBottom: -dock * 18,
        }}
      >
        <KineticTitleV4 text={title} accent={accent} fontSize={heroTitleSize} delay={4} />
      </div>

      {/* Línea viva de respiración */}
      <div
        style={{
          height: 6,
          width: `${Math.round(380 * lineEnter)}px`,
          borderRadius: 4,
          background: `linear-gradient(90deg, ${accent}, ${secondary})`,
          boxShadow: `0 0 ${18 + Math.sin(frame / 14) * 6}px ${accent}88`,
          opacity: lineEnter,
        }}
      />

      {/* Subtítulo legible en móvil (35px) */}
      {sub && (
        <div
          style={{
            fontSize: 35,
            lineHeight: 1.28,
            fontWeight: 500,
            color: "#CBD5E1",
            opacity: subEnter,
            translate: `0px ${(1 - subEnter) * 18}px`,
            maxWidth: "96%",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

// =====================================================================
// 8. TARJETA CON ENFOQUE SELECTIVO (RACK FOCUS / DEPTH OF FIELD)
// =====================================================================
export const RackFocusCardV4: React.FC<{
  children: React.ReactNode;
  accent: string;
  /** 1 = foco nítido protagonista, 0 = fondo/inactivo (desenfoque suave + leve dim). */
  focusAmount: number;
  delay?: number;
  maxBlur?: number;
  padding?: string;
  style?: React.CSSProperties;
}> = ({
  children,
  accent,
  focusAmount,
  delay = 0,
  maxBlur = 2.6,
  padding = "28px 30px",
  style,
}) => {
  const enter = useSpringV4(delay, SPRING_CARD);
  const f = Math.max(0, Math.min(1, focusAmount));
  const blurPx = (1 - f) * maxBlur;
  const focusScale = 0.965 + f * 0.045;
  const focusOpacity = 0.48 + f * 0.52;

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 28,
        padding,
        background: f > 0.5 ? "rgba(13, 22, 38, 0.92)" : "rgba(10, 16, 28, 0.68)",
        border: `2px solid ${f > 0.5 ? `${accent}AA` : "rgba(255,255,255,0.12)"}`,
        boxShadow:
          f > 0.5
            ? `0 30px 70px -15px rgba(0,0,0,0.72), 0 0 42px -10px ${accent}55`
            : "0 18px 40px -12px rgba(0,0,0,0.45)",
        opacity: enter * focusOpacity,
        scale: `${(0.92 + enter * 0.08) * focusScale}`,
        translate: `0px ${(1 - enter) * 32}px`,
        filter: blurPx > 0.15 ? `blur(${blurPx.toFixed(2)}px)` : undefined,
        boxSizing: "border-box",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// =====================================================================
// 9. TERMINAL ANIMADA CON ESCRITURA CARÁCTER A CARÁCTER (36px MÓVIL)
// =====================================================================
export interface TerminalLineV4 {
  text: string;
  startFrame: number;
  durationFrames?: number;
  color?: string;
  isPrompt?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

export const LiveTerminalV4: React.FC<{
  title: string;
  accent: string;
  lines: TerminalLineV4[];
  statusLabel?: string;
  progressPercent?: number;
  fontSize?: number;
  focusAmount?: number;
  delay?: number;
  style?: React.CSSProperties;
}> = ({
  title,
  accent,
  lines,
  statusLabel = "LIVE",
  progressPercent,
  fontSize = 34,
  focusAmount = 1,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const cursorBlink = Math.sin(frame / 5) > 0;

  // Encuentra la última línea que ya inició para colocar el cursor parpadeante
  let activeLineIdx = -1;
  lines.forEach((l, i) => {
    if (frame >= l.startFrame) activeLineIdx = i;
  });

  return (
    <RackFocusCardV4
      accent={accent}
      focusAmount={focusAmount}
      delay={delay}
      padding="0px"
      style={{ overflow: "hidden", ...style }}
    >
      {/* Cabecera de terminal */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 26px",
          background: "rgba(255,255,255,0.045)",
          borderBottom: "1.5px solid rgba(255,255,255,0.09)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <SvgTerminal size={28} color={accent} />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 24,
              fontWeight: 700,
              color: "#CBD5E1",
            }}
          >
            {title}
          </span>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 16px",
            borderRadius: 999,
            background: `${accent}20`,
            border: `1.5px solid ${accent}66`,
            fontFamily: FONT_MONO,
            fontSize: 21,
            fontWeight: 800,
            color: accent,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 99,
              background: accent,
              opacity: 0.55 + Math.sin(frame / 8) * 0.45,
            }}
          />
          {statusLabel}
        </div>
      </div>

      {/* Cuerpo de líneas animadas */}
      <div
        style={{
          padding: "28px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          fontFamily: FONT_MONO,
          fontSize,
          lineHeight: 1.32,
        }}
      >
        {lines.map((line, idx) => {
          if (frame < line.startFrame) return null;
          const dur = line.durationFrames ?? 36;
          const p = clampInterp(frame, [line.startFrame, line.startFrame + dur], [0, 1]);
          const chars = Math.floor(line.text.length * p);
          const visible = line.text.slice(0, chars);
          const isCurrent = idx === activeLineIdx;

          return (
            <div
              key={`${idx}-${line.text.slice(0, 12)}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                color: line.color ?? (line.isSuccess ? accent : line.isError ? "#F87171" : "#F8FAFC"),
                fontWeight: line.isSuccess || line.isPrompt ? 700 : 500,
              }}
            >
              {line.isSuccess && (
                <div style={{ marginTop: 4 }}>
                  <SvgCheck size={30} color={accent} />
                </div>
              )}
              {line.isError && (
                <div style={{ marginTop: 4 }}>
                  <SvgCross size={30} color="#F87171" />
                </div>
              )}
              <span style={{ wordBreak: "break-word" }}>
                {line.isPrompt && (
                  <span style={{ color: accent, fontWeight: 800, marginRight: 10 }}>$</span>
                )}
                {visible}
                {isCurrent && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 14,
                      height: "0.95em",
                      background: accent,
                      marginLeft: 6,
                      verticalAlign: "middle",
                      borderRadius: 3,
                      opacity: cursorBlink ? 1 : 0,
                    }}
                  />
                )}
              </span>
            </div>
          );
        })}

        {/* Barra de progreso animada opcional */}
        {typeof progressPercent === "number" && (
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: FONT_MONO,
                fontSize: 24,
                fontWeight: 800,
                color: accent,
                marginBottom: 10,
              }}
            >
              <span>ARQUITECTURA GENERADA</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 16,
                borderRadius: 99,
                background: "rgba(255,255,255,0.09)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.max(0, Math.min(100, progressPercent))}%`,
                  height: "100%",
                  borderRadius: 99,
                  background: `linear-gradient(90deg, ${accent}, #38BDF8)`,
                  boxShadow: `0 0 24px ${accent}`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </RackFocusCardV4>
  );
};

// =====================================================================
// 10. VENTANA VIVA CON KEN BURNS + CURSOR INTERACTIVO + CLIC
// =====================================================================
export const LiveMockupWindowV4: React.FC<{
  title: string;
  image: string;
  accent: string;
  height?: number;
  delay?: number;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: [number, number];
  panY?: [number, number];
  durationInFrames?: number;
  cursorFrom?: [number, number];
  cursorTo?: [number, number];
  clickFrame?: number;
  overlay?: React.ReactNode;
}> = ({
  title,
  image,
  accent,
  height = 720,
  delay = 8,
  zoomFrom = 1.02,
  zoomTo = 1.13,
  panX = [0, -18],
  panY = [0, -14],
  durationInFrames = 240,
  cursorFrom,
  cursorTo,
  clickFrame,
  overlay,
}) => {
  const frame = useCurrentFrame();
  const enter = useSpringV4(delay, SPRING_CARD);

  const zoom = clampInterp(frame, [delay, durationInFrames], [zoomFrom, zoomTo]);
  const tx = clampInterp(frame, [delay, durationInFrames], panX);
  const ty = clampInterp(frame, [delay, durationInFrames], panY);

  const showCursor = cursorFrom && cursorTo;
  const cursorP = showCursor
    ? clampInterp(frame, [delay + 20, (clickFrame ?? delay + 95)], [0, 1], EASE_CINEMATIC)
    : 0;
  const cx = showCursor ? cursorFrom[0] + (cursorTo[0] - cursorFrom[0]) * cursorP : 0;
  const cy = showCursor ? cursorFrom[1] + (cursorTo[1] - cursorFrom[1]) * cursorP : 0;

  const rippleP =
    clickFrame !== undefined ? clampInterp(frame, [clickFrame, clickFrame + 28], [0, 1]) : 0;
  const clickScale =
    clickFrame !== undefined && frame >= clickFrame && frame < clickFrame + 10 ? 0.85 : 1;

  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: 30,
        overflow: "hidden",
        background: "rgba(9, 15, 26, 0.94)",
        border: `2px solid ${accent}77`,
        boxShadow: `0 38px 90px -15px rgba(0,0,0,0.78), 0 0 48px -12px ${accent}55`,
        display: "flex",
        flexDirection: "column",
        opacity: enter,
        scale: `${0.93 + enter * 0.07}`,
        translate: `0px ${(1 - enter) * 48}px`,
        position: "relative",
      }}
    >
      {/* Barra superior limpia */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          background: "rgba(255,255,255,0.05)",
          borderBottom: "1.5px solid rgba(255,255,255,0.09)",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 22,
            fontWeight: 700,
            color: "#CBD5E1",
          }}
        >
          {title}
        </span>
        <div style={{ width: 46 }} />
      </div>

      {/* Área de captura viva */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <Img
          src={staticFile(image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: `${zoom}`,
            translate: `${tx}px ${ty}px`,
          }}
        />

        {/* Gradiente inferior sutil para legibilidad de overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.04) 45%, rgba(4,9,16,0.72) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Cursor interactivo + onda de clic */}
        {showCursor && frame >= delay + 14 && (
          <>
            {rippleP > 0 && rippleP < 1 && (
              <div
                style={{
                  position: "absolute",
                  left: `${cx}%`,
                  top: `${cy}%`,
                  width: 90,
                  height: 90,
                  marginLeft: -45,
                  marginTop: -45,
                  borderRadius: "50%",
                  border: `4px solid ${accent}`,
                  opacity: 1 - rippleP,
                  scale: `${0.3 + rippleP * 1.4}`,
                  pointerEvents: "none",
                }}
              />
            )}
            <div
              style={{
                position: "absolute",
                left: `${cx}%`,
                top: `${cy}%`,
                scale: `${clickScale}`,
                pointerEvents: "none",
              }}
            >
              <SvgCursor size={46} color="#FFFFFF" />
            </div>
          </>
        )}

        {overlay}
      </div>
    </div>
  );
};

// =====================================================================
// 11. BLOQUE CTA INTERACTIVO (COMENTARIO + NOTIFICACIÓN DM EN VIVO)
// =====================================================================
export const InteractiveCtaV4: React.FC<{
  keyword: string;
  headline: string;
  dmTitle: string;
  dmSubtitle: string;
  accent: string;
  darkTextColor: string;
  logos?: string[];
  delay?: number;
}> = ({
  keyword,
  headline,
  dmTitle,
  dmSubtitle,
  accent,
  darkTextColor,
  logos = [],
  delay = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const btnEnter = useSpringV4(delay + 18, SPRING_PUNCH);
  const commentEnter = useSpringV4(delay + 52, SPRING_CARD);
  const dmEnter = useSpringV4(delay + 92, SPRING_PUNCH);
  const pulse = 1 + Math.sin((frame - delay) / 12) * 0.025;

  const letters = keyword.split("");

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
      }}
    >
      {/* Palabra clave gigante letra por letra */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginTop: 8,
        }}
      >
        {letters.map((ch, idx) => {
          const p = spring({
            frame: frame - (delay + idx * 4),
            fps,
            config: SPRING_PUNCH,
          });
          return (
            <span
              key={`${ch}-${idx}`}
              style={{
                display: "inline-block",
                fontFamily: FONT_MONO,
                fontSize: keyword.length >= 6 ? 128 : 144,
                fontWeight: 900,
                lineHeight: 0.95,
                color: accent,
                textShadow: `0 0 55px ${accent}77, 0 18px 40px rgba(0,0,0,0.65)`,
                opacity: p,
                translate: `0px ${(1 - p) * -70}px`,
                scale: `${0.7 + p * 0.3}`,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>

      {/* Pregunta directa grande */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          textAlign: "center",
          color: "#F8FAFC",
          lineHeight: 1.25,
          maxWidth: "92%",
          opacity: btnEnter,
        }}
      >
        {headline}
      </div>

      {/* Botón magnético pulsante */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          padding: "22px 48px",
          borderRadius: 999,
          background: accent,
          color: darkTextColor,
          fontFamily: FONT_MONO,
          fontWeight: 900,
          fontSize: 38,
          letterSpacing: "0.08em",
          boxShadow: `0 0 55px ${accent}88, 0 16px 35px rgba(0,0,0,0.5)`,
          opacity: btnEnter,
          scale: `${btnEnter * pulse}`,
        }}
      >
        <SvgComment size={36} color={darkTextColor} />
        COMENTA &quot;{keyword}&quot;
      </div>

      {/* Flujo vivo: Burbuja de comentario -> Notificación DM */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          marginTop: 10,
        }}
      >
        {/* Paso 1: Comentario del usuario */}
        <div
          style={{
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "20px 28px",
            borderRadius: "24px 24px 24px 8px",
            background: "rgba(255,255,255,0.08)",
            border: "1.5px solid rgba(255,255,255,0.18)",
            opacity: commentEnter,
            translate: `${(1 - commentEnter) * -50}px 0px`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${accent}, #38BDF8)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT_MONO,
              fontWeight: 900,
              fontSize: 22,
              color: darkTextColor,
            }}
          >
            TU
          </div>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: "#94A3B8" }}>
              Nuevo comentario · ahora
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#FFFFFF" }}>
              {keyword}
            </div>
          </div>
        </div>

        {/* Paso 2: Notificación DM automático */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 28px",
            borderRadius: 26,
            background: "rgba(12, 22, 36, 0.94)",
            border: `2px solid ${accent}99`,
            boxShadow: `0 25px 60px rgba(0,0,0,0.6), 0 0 38px -8px ${accent}55`,
            opacity: dmEnter,
            translate: `0px ${(1 - dmEnter) * 44}px`,
            scale: `${0.92 + dmEnter * 0.08}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background: `${accent}22`,
                border: `1.5px solid ${accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SvgSend size={30} color={accent} />
            </div>
            <div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#FFFFFF" }}>
                {dmTitle}
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 23,
                  color: accent,
                  marginTop: 4,
                }}
              >
                {dmSubtitle}
              </div>
            </div>
          </div>

          {logos.length > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              {logos.map((file) => (
                <div
                  key={file}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Img
                    src={staticFile(`assets/trilogia/${file}`)}
                    style={{ width: 32, height: 32, objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
