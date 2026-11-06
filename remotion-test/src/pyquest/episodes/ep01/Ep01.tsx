/**
 * =====================================================================
 * PYQUEST · EPISODIO 1: "¿POR QUÉ ELEGIR PYTHON PARA EMPEZAR?"
 * =====================================================================
 * Nivel de producción: Studio-grade (Apple, Linear & Vercel design system).
 * Resolución: 1080x1920 (Vertical 9:16) @ 60 FPS.
 * Duración Total: 72 segundos exactos (4320 frames).
 * 
 * Reglas de diseño maestras:
 * 1. Fondo reactivo con interpolateColors + orbes volumétricos 2.5D.
 * 2. Patrón de puntos con paralaje continuo en diagonal (cero pantallas vacías).
 * 3. Cero elementos estáticos (Regla de los 90 frames / 1.5s).
 * 4. Distribución elástica: los elementos nuevos empujan físicamente a los previos.
 * 5. Morphing orgánico del contenedor principal de código.
 * 6. Simulación RPG completa: Aria vs Goblin de la Mazmorra en vivo.
 * 7. Cascada diagonal 2.5D de la industria con foco en movimiento.
 * 8. Roadmap interactivo de la serie completa y Call To Action optimizado.
 * =====================================================================
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  interpolateColors,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_MONO, FONT_SANS, PYQUEST_THEME } from "../../theme";
import { PyQuestSfx } from "../../sfx";
import {
  IconBackpack,
  IconBolt,
  IconBookmark,
  IconCrash,
  IconLoop,
  IconMap,
  IconPlus,
  IconShield,
  IconSparkles,
  IconSwords,
  IconWarning,
} from "../../components/PyQuestIcons";
import { TypewriterText } from "../../components/TypewriterText";

// =====================================================================
// COMPONENTE 1: ATMÓSFERA Y FONDO REACTIVO DINÁMICO (2.5D)
// =====================================================================
const AtmosphereBackground: React.FC<{ frame: number }> = ({ frame }) => {
  // 1. Color de base dominante: Transiciones marcadas, visibles y ricas por escena
  const bgBase = interpolateColors(
    frame,
    [0, 210, 240, 540, 600, 1380, 1440, 1750, 1800, 1980, 2040, 2520, 2600, 3480, 3600, 4320],
    [
      "#CBD5E1", // f0 - f210: Slate técnico visible (Gancho inicial)
      "#CBD5E1",
      "#FECDD3", // f240 - f540: Rose / Alerta carmesí intensa (Error en Java)
      "#FECDD3",
      "#A7F3D0", // f600 - f1380: Esmeralda / Menta fresca vibrante (Alivio en Python)
      "#A7F3D0",
      "#BFDBFE", // f1440 - f1750: Azul mazmorra RPG enérgico (Lógica viva)
      "#BFDBFE",
      "#FED7AA", // f1800 - f1980: Ámbar impacto (Daño de Goblin)
      "#FED7AA",
      "#FCA5A5", // f2040 - f2520: Rojo crítico palpitante (Game Over)
      "#FCA5A5",
      "#DDD6FE", // f2600 - f3480: Lavanda / Violeta industrial dinámico
      "#DDD6FE",
      "#FEF3C7", // f3600 - f4320: Dorado / Ámbar de celebración (Roadmap y Aria Nivel 2)
      "#E0F2FE",
    ]
  );

  // 2. Color secundario de profundidad para gradiente reactivo
  const bgSecond = interpolateColors(
    frame,
    [0, 230, 600, 1440, 1800, 2040, 2600, 3600],
    [
      "#94A3B8", // Slate profundo
      "#FDA4AF", // Carmesí profundo
      "#6EE7B7", // Esmeralda saturado
      "#93C5FD", // Zafiro brillante
      "#FDBA74", // Naranja advertencia
      "#F87171", // Rojo sangre
      "#C4B5FD", // Púrpura eléctrico
      "#FDE68A", // Amarillo brillante
    ]
  );

  // Orbe 1: Dinámico primario de alta visibilidad
  const orb1Color = interpolateColors(
    frame,
    [0, 230, 600, 1440, 1800, 2040, 2600, 3600],
    [
      "rgba(79, 70, 229, 0.45)",  // Índigo visible
      "rgba(220, 38, 38, 0.65)",  // Rojo error intenso
      "rgba(5, 150, 105, 0.55)",  // Verde esmeralda rico
      "rgba(37, 99, 235, 0.55)",  // Azul RPG potente
      "rgba(217, 119, 6, 0.60)",  // Ámbar impacto fuego
      "rgba(220, 38, 38, 0.70)",  // Rojo crítico Game Over
      "rgba(124, 58, 237, 0.55)", // Violeta industria
      "rgba(37, 99, 235, 0.50)",  // Azul progreso
    ]
  );

  // Orbe 2: Dinámico secundario de soporte
  const orb2Color = interpolateColors(
    frame,
    [0, 230, 600, 1440, 2040, 2600, 3600],
    [
      "rgba(37, 99, 235, 0.40)",
      "rgba(225, 29, 72, 0.60)",
      "rgba(16, 185, 129, 0.50)",
      "rgba(79, 70, 229, 0.50)",
      "rgba(220, 38, 38, 0.65)",
      "rgba(219, 39, 119, 0.45)",
      "rgba(5, 150, 105, 0.45)",
    ]
  );

  // Movimiento senoidal continuo y respiración de los orbes
  const orb1X = Math.sin(frame / 32) * 140;
  const orb1Y = Math.cos(frame / 40) * 120;
  const orb2X = Math.cos(frame / 28) * -150;
  const orb2Y = Math.sin(frame / 36) * 130;

  // Centro de luz dinámico que se mueve en el lienzo
  const lightCenterX = 50 + Math.sin(frame / 45) * 20;
  const lightCenterY = 40 + Math.cos(frame / 38) * 18;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${lightCenterX}% ${lightCenterY}%, ${bgBase} 0%, ${bgSecond} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Textura de puntos con paralaje continuo en diagonal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#0f172a 2px, transparent 2px)",
          backgroundSize: "38px 38px",
          backgroundPosition: `${-frame * 0.7}px ${-frame * 0.5}px`,
          opacity: 0.10,
          pointerEvents: "none",
        }}
      />

      {/* Orbe de luz volumétrica 1 */}
      <div
        style={{
          position: "absolute",
          top: -150 + orb1Y,
          left: 100 + orb1X,
          width: 950,
          height: 950,
          borderRadius: "50%",
          background: orb1Color,
          filter: "blur(110px)",
          pointerEvents: "none",
          transform: `scale(${1 + Math.sin(frame / 45) * 0.12})`,
        }}
      />

      {/* Orbe de luz volumétrica 2 */}
      <div
        style={{
          position: "absolute",
          bottom: -180 + orb2Y,
          right: 50 + orb2X,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: orb2Color,
          filter: "blur(120px)",
          pointerEvents: "none",
          transform: `scale(${1 + Math.cos(frame / 38) * 0.10})`,
        }}
      />

      {/* Halo central difuso */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 920,
          height: 920,
          marginLeft: -460,
          marginTop: -460,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};

// =====================================================================
// COMPONENTE 2: AVATAR ESTILIZADO DE ARIA (RPG VECTORIAL)
// =====================================================================
const AriaAvatar: React.FC<{
  isDamaged?: boolean;
  isDead?: boolean;
  frame: number;
  size?: number;
}> = ({ isDamaged = false, isDead = false, frame, size = 80 }) => {
  const breathY = isDead ? 0 : Math.sin(frame / 16) * 2;
  const hairTilt = isDead ? -4 : Math.sin(frame / 22) * 3;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 22,
        background: isDead
          ? "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)"
          : isDamaged
          ? "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)"
          : "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
        border: `2px solid ${
          isDead ? "#EF4444" : isDamaged ? "#F59E0B" : "#38BDF8"
        }`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
        boxShadow: `0 8px 24px ${
          isDead ? "rgba(239, 68, 68, 0.25)" : "rgba(56, 189, 248, 0.22)"
        }`,
        overflow: "hidden",
      }}
    >
      <svg
        width={size * 0.75}
        height={size * 0.75}
        viewBox="0 0 48 48"
        fill="none"
        style={{
          transform: `translateY(${breathY}px) rotate(${hairTilt}deg)`,
        }}
      >
        <circle cx="24" cy="22" r="14" fill="#FBBF24" />
        <path
          d="M10 24 C10 16 38 16 38 24 C38 34 32 38 24 38 C16 38 10 34 10 24 Z"
          fill="#F59E0B"
        />
        <circle cx="24" cy="24" r="12" fill="#FED7AA" />

        {isDead ? (
          <>
            <path d="M18 21 L22 25 M22 21 L18 25" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M26 21 L30 25 M30 21 L26 25" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : isDamaged ? (
          <>
            <path d="M18 24 Q20 21 22 24" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M26 24 Q28 21 30 24" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <circle cx="20" cy="23" r="2.2" fill="#0F172A" />
            <circle cx="28" cy="23" r="2.2" fill="#0F172A" />
            <circle cx="21" cy="22.2" r="0.8" fill="#FFFFFF" />
            <circle cx="29" cy="22.2" r="0.8" fill="#FFFFFF" />
          </>
        )}

        {isDead ? (
          <path d="M20 31 Q24 28 28 31" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        ) : isDamaged ? (
          <path d="M21 30 Q24 32 27 30" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M20 28 Q24 33 28 28" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        )}

        <path d="M14 17 L24 10 L34 17 L30 20 L24 16 L18 20 Z" fill="#3B82F6" />
        <circle cx="24" cy="13" r="2.5" fill="#FBBF24" />
      </svg>
    </div>
  );
};

// =====================================================================
// COMPONENTE 3: AVATAR ESTILIZADO DEL GOBLIN DE MAZMORRA (ENEMIGO)
// =====================================================================
const GoblinAvatar: React.FC<{ frame: number; isAttacking?: boolean }> = ({
  frame,
  isAttacking = false,
}) => {
  const hop = Math.sin(frame / 12) * 3;
  const attackLunge = isAttacking ? Math.sin(frame / 4) * 6 : 0;

  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: 22,
        background: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
        border: "2px solid #16A34A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
        boxShadow: "0 8px 24px rgba(22, 163, 74, 0.22)",
        overflow: "hidden",
        transform: `translateY(${hop + attackLunge}px)`,
      }}
    >
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
        {/* Orejas puntiagudas de goblin */}
        <path d="M8 20 L16 26 L12 30 Z" fill="#15803D" />
        <path d="M40 20 L32 26 L36 30 Z" fill="#15803D" />
        {/* Cabeza verde */}
        <circle cx="24" cy="24" r="14" fill="#22C55E" />
        {/* Ojos amarillos amenazantes */}
        <circle cx="19" cy="22" r="3" fill="#FACC15" />
        <circle cx="29" cy="22" r="3" fill="#FACC15" />
        <circle cx="20" cy="22" r="1.5" fill="#713F12" />
        <circle cx="28" cy="22" r="1.5" fill="#713F12" />
        {/* Colmillos */}
        <path d="M19 28 L21 31 L23 28 Z" fill="#FFFFFF" />
        <path d="M25 28 L27 31 L29 28 Z" fill="#FFFFFF" />
        <path d="M18 28 Q24 29 30 28" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// =====================================================================
// COMPONENTE PRINCIPAL DEL EPISODIO 1
// =====================================================================
export const PyQuestEp01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Micro-deriva de cámara continua para toda la composición (cinemática 2.5D)
  const cameraScale = 1.0 + Math.sin(frame / 140) * 0.012;

  // Sacudidas globales en momentos críticos
  const hookShake =
    frame >= 30 && frame <= 75
      ? Math.sin((frame - 30) * 2.2) * 10 * Math.max(0, 1 - (frame - 30) / 45)
      : 0;

  const javaCrashShake =
    frame >= 230 && frame <= 290
      ? Math.sin((frame - 230) * 1.8) * 14 * Math.max(0, 1 - (frame - 230) / 60)
      : 0;

  const ariaHit1Shake =
    frame >= 1750 && frame <= 1795
      ? Math.sin((frame - 1750) * 2.5) * 16 * Math.max(0, 1 - (frame - 1750) / 45)
      : 0;

  const ariaCriticalHitShake =
    frame >= 1980 && frame <= 2040
      ? Math.sin((frame - 1980) * 3.0) * 22 * Math.max(0, 1 - (frame - 1980) / 60)
      : 0;

  const totalCameraShakeX =
    hookShake + javaCrashShake + ariaHit1Shake + ariaCriticalHitShake;

  // Flotación 2.5D senoidal perpétua para elementos en escena
  const perpetualFloatY = Math.sin(frame / 20) * 7;

  return (
    <AbsoluteFill
      style={{
        perspective: 1400,
        overflow: "hidden",
        transform: `translate(${totalCameraShakeX}px, 0px) scale(${cameraScale})`,
      }}
    >
      {/* 1. Fondo reactivo y atmósfera continua */}
      <AtmosphereBackground frame={frame} />

      {/* 2. Cama de música ambiental continua (BGM) */}
      <Audio
        src={staticFile("bgm/tech_ambient_bed.mp3")}
        volume={(f) => {
          const fadeIn = Math.min(1, f / (fps * 0.8));
          const fadeOut = Math.min(1, (durationInFrames - f) / (fps * 0.8));
          return 0.09 * Math.max(0, fadeIn) * Math.max(0, fadeOut);
        }}
        loop
      />

      {/* Efectos de sonido (SFX) sincronizados en momentos clave */}
      <PyQuestSfx name="whoosh-short" from={0} volume={0.32} />
      <PyQuestSfx name="impact-bass-1" from={30} volume={0.38} />
      <PyQuestSfx name="whoosh-short" from={110} volume={0.30} />
      <PyQuestSfx name="typing" from={120} volume={0.24} />
      <PyQuestSfx name="error" from={230} volume={0.45} />
      <PyQuestSfx name="impact-bass-2" from={232} volume={0.38} />
      <PyQuestSfx name="pop" from={320} volume={0.32} />

      <PyQuestSfx name="whoosh-short" from={540} volume={0.32} />
      <PyQuestSfx name="typing" from={660} volume={0.24} />
      <PyQuestSfx name="chime" from={780} volume={0.36} />
      <PyQuestSfx name="pop" from={980} volume={0.30} />

      <PyQuestSfx name="whoosh-short" from={1380} volume={0.32} />
      <PyQuestSfx name="click-soft" from={1580} volume={0.28} />
      <PyQuestSfx name="impact-bass-1" from={1750} volume={0.42} />
      <PyQuestSfx name="error" from={1980} volume={0.44} />
      <PyQuestSfx name="impact-bass-2" from={1982} volume={0.45} />
      <PyQuestSfx name="click-soft" from={2040} volume={0.35} />
      <PyQuestSfx name="impact-bass-1" from={2080} volume={0.42} />

      <PyQuestSfx name="whoosh-short" from={2520} volume={0.32} />
      <PyQuestSfx name="pop" from={2550} volume={0.28} />
      <PyQuestSfx name="pop" from={2720} volume={0.28} />
      <PyQuestSfx name="pop" from={2900} volume={0.28} />
      <PyQuestSfx name="pop" from={3080} volume={0.28} />
      <PyQuestSfx name="sparkle" from={3280} volume={0.36} />

      <PyQuestSfx name="whoosh-short" from={3480} volume={0.32} />
      <PyQuestSfx name="sparkle" from={3640} volume={0.35} />
      <PyQuestSfx name="chime" from={3680} volume={0.38} />
      <PyQuestSfx name="click-soft" from={3760} volume={0.30} />
      <PyQuestSfx name="pop" from={3820} volume={0.32} />

      {/* ================================================================ */}
      {/* ESCENA 1: EL GANCHO Y EL CHOQUE DE SINTAXIS (0 - 540 frames / 0:00 - 0:09) */}
      {/* ================================================================ */}
      {frame < 560 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* Fragmentos de sintaxis flotando desenfocados en el fondo */}
          {frame < 260 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                fontFamily: FONT_MONO,
                fontSize: 34,
                color: "#64748B",
                filter: "blur(6px)",
                opacity: interpolate(frame, [0, 20, 200, 250], [0, 0.25, 0.25, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div style={{ position: "absolute", top: 320, left: 120 }}>{`{ } ;`}</div>
              <div style={{ position: "absolute", top: 460, right: 140 }}>{`static void`}</div>
              <div style={{ position: "absolute", top: 780, left: 90 }}>{`NullPointerException`}</div>
              <div style={{ position: "absolute", top: 920, right: 110 }}>{`String[] args`}</div>
              <div style={{ position: "absolute", top: 1240, left: 160 }}>{`public class`}</div>
            </div>
          )}

          {/* TITULAR DEL GANCHO: Ocupa el centro y es empujado hacia arriba */}
          {(() => {
            const pushProgress = spring({
              frame: frame - 110,
              fps,
              config: { damping: 13, stiffness: 115 },
            });

            const hookTitleY = interpolate(pushProgress, [0, 1], [680, 175], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const hookTitleScale = interpolate(pushProgress, [0, 1], [1.0, 0.58], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const abandonaSpring = spring({
              frame: frame - 30,
              fps,
              config: { damping: 11, stiffness: 160 },
            });

            const underlineDraw = interpolate(frame, [36, 75], [100, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const exitOpacity = interpolate(frame, [520, 550], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: hookTitleY,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  transformOrigin: "center top",
                  transform: `scale(${hookTitleScale})`,
                  textAlign: "center",
                  opacity: exitOpacity,
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 48,
                    fontWeight: 800,
                    color: "#1E293B",
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                >
                  ¿Por qué el 90%
                </div>

                <div style={{ position: "relative", display: "inline-block" }}>
                  <span
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 104,
                      fontWeight: 900,
                      color: "#EF4444",
                      letterSpacing: "-0.04em",
                      display: "inline-block",
                      transform: `scale(${0.7 + abandonaSpring * 0.3})`,
                      textShadow: "0 10px 30px rgba(239, 68, 68, 0.28)",
                    }}
                  >
                    ABANDONA
                  </span>

                  <svg
                    width="440"
                    height="28"
                    viewBox="0 0 440 28"
                    fill="none"
                    style={{
                      position: "absolute",
                      bottom: -8,
                      left: "50%",
                      marginLeft: -220,
                    }}
                  >
                    <path
                      d="M 10 20 Q 220 2 430 18"
                      stroke="#EF4444"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="450"
                      strokeDashoffset={underlineDraw * 4.5}
                    />
                  </svg>
                </div>

                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 42,
                    fontWeight: 700,
                    color: "#475569",
                    marginTop: 18,
                    letterSpacing: "-0.01em",
                  }}
                >
                  la programación en 2 semanas?
                </div>
              </div>
            );
          })()}

          {/* TARJETA DE JAVA (App.java): Entra a f110 y sufre error a f230 */}
          {frame >= 105 && (
            (() => {
              const enterJava = spring({
                frame: frame - 110,
                fps,
                config: { damping: 13, stiffness: 115 },
              });

              const tiltZ = interpolate(frame, [230, 260], [0, -1.5], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              const cardY = interpolate(enterJava, [0, 1], [1800, 430], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              const typeJavaP = interpolate(frame, [120, 220], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              const isErrorActive = frame >= 230;

              return (
                <div
                  style={{
                    position: "absolute",
                    top: cardY + perpetualFloatY,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "#181C28",
                    borderRadius: 24,
                    padding: "26px 34px 34px",
                    boxSizing: "border-box",
                    boxShadow: isErrorActive
                      ? "0 30px 60px -15px rgba(239, 68, 68, 0.35), 0 10px 25px rgba(15, 23, 42, 0.4)"
                      : "0 30px 60px -15px rgba(15, 23, 42, 0.35), 0 10px 20px rgba(15, 23, 42, 0.2)",
                    border: `1px solid ${
                      isErrorActive ? "rgba(239, 68, 68, 0.6)" : "rgba(255, 255, 255, 0.08)"
                    }`,
                    transformOrigin: "center center",
                    transform: `rotateX(4deg) rotateZ(${tiltZ}deg) scale(${0.92 + enterJava * 0.08})`,
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 20,
                      paddingBottom: 14,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF5F56" }} />
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FFBD2E" }} />
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#27C93F" }} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Img
                        src={staticFile("assets/logos/java.svg")}
                        style={{ width: 28, height: 28 }}
                      />
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 26,
                          fontWeight: 700,
                          color: "rgba(255, 255, 255, 0.9)",
                        }}
                      >
                        App.java
                      </span>
                    </div>

                    <div style={{ width: 44 }} />
                  </div>

                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 32,
                      lineHeight: 1.6,
                      color: "#F8FAFC",
                    }}
                  >
                    <div style={{ opacity: typeJavaP >= 0.15 ? 1 : 0.2 }}>
                      <span style={{ color: "#60A5FA", fontWeight: 700 }}>public class </span>
                      <span style={{ color: "#FBBF24" }}>App</span>
                      <span style={{ color: "#94A3B8" }}> {"{"}</span>
                    </div>

                    <div style={{ paddingLeft: 28, opacity: typeJavaP >= 0.4 ? 1 : 0.2 }}>
                      <span style={{ color: "#60A5FA", fontWeight: 700 }}>public static void </span>
                      <span style={{ color: "#34D399" }}>main</span>
                      <span style={{ color: "#94A3B8" }}>{"(String[] args) {"}</span>
                    </div>

                    <div
                      style={{
                        paddingLeft: 56,
                        background: isErrorActive ? "rgba(239, 68, 68, 0.22)" : "transparent",
                        borderLeft: isErrorActive ? "4px solid #EF4444" : "4px solid transparent",
                        borderRadius: 6,
                        paddingTop: 2,
                        paddingBottom: 2,
                      }}
                    >
                      <span style={{ color: "#94A3B8" }}>System.out.</span>
                      <span style={{ color: "#34D399" }}>println</span>
                      <span style={{ color: "#94A3B8" }}>(</span>
                      <span style={{ color: "#F59E0B" }}>"Hola mundo"</span>
                      <span style={{ color: "#94A3B8" }}>)</span>
                      {isErrorActive && (
                        <span
                          style={{
                            color: "#EF4444",
                            fontWeight: 900,
                            marginLeft: 4,
                            background: "rgba(239,68,68,0.3)",
                            padding: "0 6px",
                            borderRadius: 4,
                          }}
                        >
                          ✕ ;
                        </span>
                      )}
                    </div>

                    <div style={{ paddingLeft: 28, opacity: typeJavaP >= 0.85 ? 1 : 0.2 }}>
                      <span style={{ color: "#94A3B8" }}>{"}"}</span>
                    </div>

                    <div style={{ opacity: typeJavaP >= 0.95 ? 1 : 0.2 }}>
                      <span style={{ color: "#94A3B8" }}>{"}"}</span>
                    </div>
                  </div>
                </div>
              );
            })()
          )}

          {/* CONSOLA DE ERROR ROJA */}
          {frame >= 230 && (
            (() => {
              const enterError = spring({
                frame: frame - 230,
                fps,
                config: { damping: 13, stiffness: 120 },
              });

              const dropProgress = spring({
                frame: frame - 540,
                fps,
                config: { damping: 14, stiffness: 90 },
              });

              const errorY = interpolate(enterError, [0, 1], [1500, 830], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }) + dropProgress * 650;

              const errorOpacity = interpolate(dropProgress, [0, 0.6], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  style={{
                    position: "absolute",
                    top: errorY + perpetualFloatY * 0.5,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "rgba(254, 242, 242, 0.95)",
                    border: "2px solid #EF4444",
                    borderRadius: 22,
                    padding: "24px 30px",
                    boxSizing: "border-box",
                    boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.35)",
                    opacity: errorOpacity,
                    zIndex: 25,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontFamily: FONT_MONO,
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#DC2626",
                      marginBottom: 12,
                      borderBottom: "1px solid rgba(239, 68, 68, 0.2)",
                      paddingBottom: 8,
                    }}
                  >
                    <IconWarning size={28} color="#DC2626" />
                    <span>COMPILATION ERROR: javac App.java</span>
                  </div>

                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 30,
                      color: "#991B1B",
                      lineHeight: 1.5,
                    }}
                  >
                    <div>App.java:3: error: ';' expected</div>
                    <div style={{ color: "#7F1D1D" }}>
                      {"    System.out.println(\"Hola mundo\")"}
                    </div>
                    <div style={{ color: "#EF4444", fontWeight: 900 }}>
                      {"                                   ^"}
                    </div>
                    <div style={{ fontSize: 26, color: "#DC2626", marginTop: 6, fontWeight: 700 }}>
                      1 error · Build failed
                    </div>
                  </div>
                </div>
              );
            })()
          )}

          {/* BADGE FLOTANTE CON FLECHA CURVA SVG ANIMADA (f320 a f540) */}
          {frame >= 320 && (
            (() => {
              const enterBadge = spring({
                frame: frame - 320,
                fps,
                config: { damping: 12, stiffness: 140 },
              });

              const dropProgress = spring({
                frame: frame - 540,
                fps,
                config: { damping: 14, stiffness: 90 },
              });

              const badgeOpacity = interpolate(dropProgress, [0, 0.5], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }) * enterBadge;

              return (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: 1120,
                      left: PYQUEST_THEME.safe.side,
                      width: 920,
                      opacity: badgeOpacity,
                      zIndex: 30,
                      transform: `translateY(${(1 - enterBadge) * 30 + Math.sin(frame / 15) * 5}px)`,
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.94)",
                        border: "2px solid rgba(239, 68, 68, 0.4)",
                        borderRadius: 20,
                        padding: "22px 28px",
                        boxShadow: "0 20px 45px -10px rgba(239, 68, 68, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      <div
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: 16,
                          background: "#FEE2E2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <IconCrash size={32} color="#DC2626" />
                      </div>

                      <div
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 27,
                          fontWeight: 700,
                          color: "#991B1B",
                          lineHeight: 1.35,
                        }}
                      >
                        ¿10 líneas de símbolos raros y todo explota por un punto y coma?
                      </div>
                    </div>
                  </div>

                  {/* Diagnóstico de dolor: Frustración de sintaxis vs lógica */}
                  <div
                    style={{
                      position: "absolute",
                      top: 1290,
                      left: PYQUEST_THEME.safe.side,
                      width: 920,
                      opacity: badgeOpacity,
                      zIndex: 28,
                      textAlign: "center",
                      transform: `translateY(${(1 - enterBadge) * 20}px)`,
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(15, 23, 42, 0.05)",
                        border: "1px solid rgba(15, 23, 42, 0.1)",
                        borderRadius: 18,
                        padding: "18px 24px",
                        fontFamily: FONT_SANS,
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#475569",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                      }}
                    >
                      <IconSparkles size={24} color="#D97706" />
                      <span>El abandono ocurre por la <span style={{ color: "#EF4444" }}>fricción de sintaxis</span>, no por tu capacidad de pensar.</span>
                    </div>
                  </div>
                </>
              );
            })()
          )}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 2: MORPHING A PYTHON — LÓGICA PURA (f540 - f1380 / 0:09 - 0:23) */}
      {/* ================================================================ */}
      {frame >= 530 && frame < 1400 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* TITULAR KINÉTICO INTEGRADO */}
          {(() => {
            const enterTitle = spring({
              frame: frame - 550,
              fps,
              config: { damping: 14, stiffness: 120 },
            });

            const exitTitle = interpolate(frame, [1340, 1380], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 175,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  textAlign: "center",
                  opacity: enterTitle * exitTitle,
                  transform: `translateY(${(1 - enterTitle) * 25}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 44,
                    fontWeight: 800,
                    color: "#0F172A",
                    lineHeight: 1.25,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Python elimina las{" "}
                  <span
                    style={{
                      color: "#EF4444",
                      textDecoration: "line-through",
                      textDecorationThickness: 4,
                    }}
                  >
                    reglas absurdas
                  </span>
                  <br />
                  para que entrenes tu{" "}
                  <span
                    style={{
                      color: "#064E3B",
                      background: "#FFFFFF",
                      boxShadow: "0 4px 15px rgba(6, 78, 59, 0.15)",
                      padding: "4px 16px",
                      borderRadius: 14,
                      display: "inline-block",
                      transform: `rotate(${Math.sin(frame / 20) * 1.5}deg)`,
                      fontWeight: 900,
                    }}
                  >
                    lógica real
                  </span>
                </div>
              </div>
            );
          })()}

          {/* LA MISMA TARJETA MORPHEA DE App.java A main.py */}
          {(() => {
            const morphSpring = spring({
              frame: frame - 540,
              fps,
              config: { damping: 14, stiffness: 110 },
            });

            const cardHeight = interpolate(morphSpring, [0, 1], [440, 220], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const cardRotateZ = interpolate(morphSpring, [0, 1], [-1.5, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const cardY = interpolate(morphSpring, [0, 1], [430, 440], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const pyTypeP = interpolate(frame, [660, 750], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const pyFullText = 'print("Bienvenido a PyQuest")';
            const visibleChars = Math.floor(pyFullText.length * pyTypeP);

            return (
              <div
                style={{
                  position: "absolute",
                  top: cardY + perpetualFloatY,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  height: cardHeight,
                  background: "#181C28",
                  borderRadius: 24,
                  padding: "24px 34px",
                  boxSizing: "border-box",
                  boxShadow:
                    "0 30px 60px -15px rgba(16, 185, 129, 0.25), 0 10px 25px rgba(15, 23, 42, 0.4)",
                  border: "1px solid rgba(52, 211, 153, 0.4)",
                  transformOrigin: "center center",
                  transform: `rotateX(4deg) rotateZ(${cardRotateZ}deg)`,
                  overflow: "hidden",
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    paddingBottom: 14,
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF5F56" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FFBD2E" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#27C93F" }} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Img
                      src={staticFile("assets/logos/python.svg")}
                      style={{ width: 28, height: 28 }}
                    />
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 28,
                        fontWeight: 700,
                        color: "#34D399",
                      }}
                    >
                      main.py
                    </span>
                  </div>

                  <div style={{ width: 44 }} />
                </div>

                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 34,
                    color: "#F8FAFC",
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "pre",
                  }}
                >
                  {frame < 660 ? (
                    <span style={{ color: "rgba(255,255,255,0.3)" }}># Una sola línea...</span>
                  ) : (
                    <div>
                      <span style={{ color: "#34D399", fontWeight: 700 }}>
                        {pyFullText.slice(0, Math.min(5, visibleChars))}
                      </span>
                      {visibleChars > 5 && (
                        <span style={{ color: "#94A3B8" }}>
                          {pyFullText.slice(5, Math.min(6, visibleChars))}
                        </span>
                      )}
                      {visibleChars > 6 && (
                        <span style={{ color: "#F59E0B" }}>
                          {pyFullText.slice(6, Math.min(pyFullText.length - 1, visibleChars))}
                        </span>
                      )}
                      {visibleChars >= pyFullText.length && (
                        <span style={{ color: "#94A3B8" }}>)</span>
                      )}

                      <span
                        style={{
                          display: "inline-block",
                          width: 12,
                          height: 34,
                          background: "#34D399",
                          verticalAlign: "middle",
                          marginLeft: 6,
                          opacity: Math.sin(frame / 6) > 0 ? 1 : 0,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* CABLE LUMINOSO Y TERMINAL LIMPIA */}
          {frame >= 780 && (
            (() => {
              const enterTerm = spring({
                frame: frame - 780,
                fps,
                config: { damping: 13, stiffness: 125 },
              });

              return (
                <>
                  <svg
                    width="40"
                    height="50"
                    viewBox="0 0 40 50"
                    fill="none"
                    style={{
                      position: "absolute",
                      top: 660 + perpetualFloatY,
                      left: "50%",
                      marginLeft: -20,
                      zIndex: 15,
                    }}
                  >
                    <line
                      x1="20"
                      y1="0"
                      x2="20"
                      y2="50"
                      stroke="#10B981"
                      strokeWidth="4"
                      strokeDasharray="6 4"
                      strokeDashoffset={-frame * 1.5}
                    />
                  </svg>

                  <div
                    style={{
                      position: "absolute",
                      top: 710 + perpetualFloatY,
                      left: PYQUEST_THEME.safe.side,
                      width: 920,
                      background: "rgba(236, 253, 245, 0.95)",
                      border: "2px solid #10B981",
                      borderRadius: 22,
                      padding: "24px 32px",
                      boxSizing: "border-box",
                      boxShadow: "0 20px 45px -10px rgba(16, 185, 129, 0.25)",
                      transform: `scale(${0.92 + enterTerm * 0.08})`,
                      opacity: enterTerm,
                      zIndex: 22,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontFamily: FONT_MONO,
                        fontSize: 28,
                        fontWeight: 800,
                        color: "#065F46",
                        marginBottom: 10,
                        borderBottom: "1px solid rgba(16, 185, 129, 0.2)",
                        paddingBottom: 8,
                      }}
                    >
                      <span style={{ color: "#10B981", fontWeight: 800 }}>$</span>
                      <span>python main.py</span>
                    </div>

                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 36,
                        fontWeight: 900,
                        color: "#047857",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <span style={{ color: "#10B981" }}>✓</span>
                      <span>Bienvenido a PyQuest</span>
                    </div>
                  </div>
                </>
              );
            })()
          )}

          {/* COMPARATIVA DE CARGA COGNITIVA Y BENEFICIO EN ESPACIO COMPLETO */}
          {frame >= 860 && (
            (() => {
              const enterMeters = spring({
                frame: frame - 860,
                fps,
                config: { damping: 14, stiffness: 110 },
              });

              const syntaxNoiseP = interpolate(frame, [880, 980], [95, 10], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              const logicFocusP = interpolate(frame, [910, 1010], [15, 100], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  style={{
                    position: "absolute",
                    top: 930 + perpetualFloatY * 0.4,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    opacity: enterMeters,
                    transform: `translateY(${(1 - enterMeters) * 40}px)`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                    zIndex: 25,
                  }}
                >
                  {/* Barra 1: Ruido de Sintaxis */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: 20,
                      padding: "20px 28px",
                      border: "1px solid rgba(15, 23, 42, 0.08)",
                      boxShadow: "0 15px 35px -8px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <span style={{ fontFamily: FONT_SANS, fontSize: 26, fontWeight: 700, color: "#334155" }}>
                        Ruido de Sintaxis Innecesario
                      </span>
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 24,
                          fontWeight: 800,
                          color: syntaxNoiseP <= 20 ? "#10B981" : "#EF4444",
                        }}
                      >
                        {Math.round(syntaxNoiseP)}%
                      </span>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: 16,
                        borderRadius: 999,
                        background: "#E2E8F0",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${syntaxNoiseP}%`,
                          height: "100%",
                          background: syntaxNoiseP <= 20 ? "#10B981" : "#EF4444",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  </div>

                  {/* Barra 2: Enfoque en Lógica Real */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: 20,
                      padding: "20px 28px",
                      border: "2px solid rgba(99, 102, 241, 0.3)",
                      boxShadow: "0 20px 45px -10px rgba(99, 102, 241, 0.22)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 26,
                          fontWeight: 800,
                          color: "#1E1B4B",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <IconBolt size={24} color="#4F46E5" />
                        <span>Enfoque en Lógica del Juego</span>
                      </span>
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 26,
                          fontWeight: 900,
                          color: "#4F46E5",
                        }}
                      >
                        {Math.round(logicFocusP)}%
                      </span>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: 18,
                        borderRadius: 999,
                        background: "#E2E8F0",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${logicFocusP}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #6366F1 0%, #10B981 100%)",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  </div>

                  {/* TARJETA COMPARATIVA DE RETENCIÓN COGNITIVA (OCUPA EL ESPACIO VERTICAL) */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #181C28 0%, #0F172A 100%)",
                      borderRadius: 22,
                      padding: "24px 30px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 20px 50px -10px rgba(15, 23, 42, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 26,
                          fontWeight: 800,
                          color: "#F8FAFC",
                          marginBottom: 6,
                        }}
                      >
                        Curva de Aprendizaje Acelerada
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 26,
                          color: "#94A3B8",
                          fontWeight: 600,
                        }}
                      >
                        Construyes funciones reales desde el primer minuto
                      </div>
                    </div>

                    <div
                      style={{
                        background: "rgba(16, 185, 129, 0.15)",
                        border: "1px solid #10B981",
                        borderRadius: 16,
                        padding: "10px 18px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#10B981", fontWeight: 800 }}>
                        RESULTADO
                      </div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 30, color: "#34D399", fontWeight: 900 }}>
                        10x Más Retención
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 3: EL MOTOR DE PYQUEST EN VIVO (f1380 - f2520 / 0:23 - 0:42) */}
      {/* ================================================================ */}
      {frame >= 1370 && frame < 2540 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {(() => {
            // Golpe 1 en f1750: Aria baja de 100 a 55
            const hit1Progress = interpolate(frame, [1750, 1790], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Golpe 2 crítico en f1980: Aria baja de 55 a 0
            const hit2Progress = interpolate(frame, [1980, 2020], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const currentHp = Math.round(
              100 - hit1Progress * 45 - hit2Progress * 55
            );

            const isDead = currentHp <= 0;
            const isHit1 = frame >= 1750 && frame < 1980;
            const isCritHit = frame >= 1980;

            const hpBarColor =
              currentHp <= 0 ? "#EF4444" : currentHp <= 55 ? "#F59E0B" : "#10B981";

            const enterCode = spring({
              frame: frame - 1380,
              fps,
              config: { damping: 13, stiffness: 120 },
            });

            const enterAria = spring({
              frame: frame - 1420,
              fps,
              config: { damping: 13, stiffness: 115 },
            });

            const enterGoblin = spring({
              frame: frame - 1460,
              fps,
              config: { damping: 13, stiffness: 115 },
            });

            const pulseProgress = interpolate(frame, [2000, 2045], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <>
                {/* 1. TARJETA DE CÓDIGO (pyquest.py): Arriba CON ESCRITURA EN VIVO */}
                <div
                  style={{
                    position: "absolute",
                    top: 210 + perpetualFloatY * 0.8,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "#181C28",
                    borderRadius: 24,
                    padding: "24px 34px",
                    boxSizing: "border-box",
                    boxShadow: isDead
                      ? "0 30px 65px -12px rgba(239, 68, 68, 0.4), 0 10px 25px rgba(15, 23, 42, 0.5)"
                      : "0 25px 60px -12px rgba(15, 23, 42, 0.35)",
                    border: `2px solid ${
                      isDead
                        ? "rgba(239, 68, 68, 0.8)"
                        : "rgba(255, 255, 255, 0.08)"
                    }`,
                    transformOrigin: "center center",
                    transform: `rotateX(4deg) rotateZ(-1.2deg) scale(${
                      0.93 + enterCode * 0.07
                    })`,
                    opacity: enterCode,
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 18,
                      paddingBottom: 12,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF5F56" }} />
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FFBD2E" }} />
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#27C93F" }} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <IconSwords size={28} color="#60A5FA" />
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 28,
                          fontWeight: 700,
                          color: "#60A5FA",
                        }}
                      >
                        pyquest.py · Regla Condicional
                      </span>
                    </div>

                    <div style={{ width: 44 }} />
                  </div>

                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 34,
                      lineHeight: 1.6,
                      color: "#F8FAFC",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background:
                          isDead
                            ? "rgba(239, 68, 68, 0.25)"
                            : isHit1
                            ? "rgba(245, 158, 11, 0.15)"
                            : "transparent",
                        borderLeft: isDead
                          ? "5px solid #EF4444"
                          : isHit1
                          ? "5px solid #F59E0B"
                          : "5px solid transparent",
                        padding: "6px 16px",
                        borderRadius: 8,
                      }}
                    >
                      {frame < 1430 ? (
                        <TypewriterText
                          text="if vida <= 0:"
                          frame={frame}
                          startFrame={1390}
                          durationFrames={30}
                          cursorColor="#60A5FA"
                        />
                      ) : (
                        <div>
                          <span style={{ color: "#60A5FA", fontWeight: 800 }}>if </span>
                          <span style={{ color: "#F8FAFC" }}>vida &lt;= </span>
                          <span style={{ color: "#10B981", fontWeight: 700 }}>0</span>
                          <span style={{ color: "#94A3B8" }}>:</span>
                        </div>
                      )}

                      {frame >= 1760 && (
                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 26,
                            fontWeight: 800,
                            padding: "6px 16px",
                            borderRadius: 999,
                            background: isDead ? "#EF4444" : "#8B5CF6",
                            color: "#FFFFFF",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          {isDead ? (
                            <>
                              <span>0 &lt;= 0 ➔ True</span>
                              <IconBolt size={20} color="#FFFFFF" />
                            </>
                          ) : (
                            <span>{`${currentHp} <= 0 ➔ False`}</span>
                          )}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        paddingLeft: 48,
                        marginTop: 4,
                        background: isDead ? "rgba(239, 68, 68, 0.3)" : "transparent",
                        borderLeft: isDead ? "5px solid #EF4444" : "5px solid transparent",
                        padding: "6px 16px 6px 48px",
                        borderRadius: 8,
                      }}
                    >
                      {frame < 1475 ? (
                        <TypewriterText
                          text="fin_del_juego()"
                          frame={frame}
                          startFrame={1430}
                          durationFrames={30}
                          cursorColor="#34D399"
                        />
                      ) : (
                        <>
                          <span style={{ color: isDead ? "#EF4444" : "#34D399", fontWeight: 800 }}>
                            fin_del_juego
                          </span>
                          <span style={{ color: "#94A3B8" }}>()</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* TRADUCCIÓN HUMANA EN VIVO (f1560 a f1740) */}
                {frame >= 1560 && frame < 1740 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 480 + perpetualFloatY * 0.7,
                      left: PYQUEST_THEME.safe.side,
                      width: 920,
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      zIndex: 22,
                    }}
                  >
                    {[
                      { word: "if", trans: "Si", color: "#60A5FA" },
                      { word: "vida <= 0", trans: "la salud llega a cero", color: "#F59E0B" },
                      { word: "fin_del_juego()", trans: "termina la partida", color: "#EF4444" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          background: "rgba(255, 255, 255, 0.96)",
                          border: `2px solid ${item.color}`,
                          borderRadius: 16,
                          padding: "14px 16px",
                          textAlign: "center",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                        }}
                      >
                        <div style={{ fontFamily: FONT_MONO, fontSize: 26, color: item.color, fontWeight: 800 }}>
                          {item.word}
                        </div>
                        <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: "#1E293B", fontWeight: 800, marginTop: 4 }}>
                          {item.trans}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CABLE CONECTOR CURVO SVG */}
                <svg
                  width="920"
                  height="260"
                  viewBox="0 0 920 260"
                  fill="none"
                  style={{
                    position: "absolute",
                    top: 450 + perpetualFloatY * 0.5,
                    left: PYQUEST_THEME.safe.side,
                    zIndex: 10,
                    pointerEvents: "none",
                  }}
                >
                  <path
                    d="M 260 0 C 260 130 660 130 660 250"
                    stroke={isDead ? "#EF4444" : "#3B82F6"}
                    strokeWidth="5"
                    strokeDasharray="8 6"
                    strokeDashoffset={-frame * 2}
                  />

                  {isDead && pulseProgress > 0 && pulseProgress < 1 && (
                    <circle
                      cx={660 - pulseProgress * 400}
                      cy={250 - pulseProgress * 250}
                      r="16"
                      fill="#EF4444"
                      filter="drop-shadow(0 0 14px #EF4444)"
                    />
                  )}
                </svg>

                {/* 2. TARJETA DE UI DE ARIA (EL HÉROE EN COMBATE): Y: 570px */}
                <div
                  style={{
                    position: "absolute",
                    top: 570 + perpetualFloatY * 0.4,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "26px 34px",
                    boxSizing: "border-box",
                    boxShadow: isDead
                      ? "0 30px 60px -15px rgba(239, 68, 68, 0.35)"
                      : "0 25px 55px -12px rgba(15, 23, 42, 0.12)",
                    border: `2px solid ${
                      isDead ? "#EF4444" : isHit1 ? "#F59E0B" : "rgba(15, 23, 42, 0.08)"
                    }`,
                    transformOrigin: "center center",
                    transform: `rotateX(4deg) rotateZ(1.4deg) scale(${
                      0.93 + enterAria * 0.07
                    })`,
                    opacity: enterAria,
                    zIndex: 20,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <AriaAvatar
                      isDamaged={isHit1}
                      isDead={isDead}
                      frame={frame}
                      size={86}
                    />

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span
                            style={{
                              fontFamily: FONT_SANS,
                              fontSize: 32,
                              fontWeight: 900,
                              color: "#0F172A",
                            }}
                          >
                            Aria
                          </span>
                          <span
                            style={{
                              fontFamily: FONT_MONO,
                              fontSize: 26,
                              fontWeight: 800,
                              color: "#3B82F6",
                              background: "#EFF6FF",
                              padding: "4px 14px",
                              borderRadius: 8,
                            }}
                          >
                            LVL. 1
                          </span>
                        </div>

                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 32,
                            fontWeight: 900,
                            color: hpBarColor,
                          }}
                        >
                          HP {currentHp} / 100
                        </span>
                      </div>

                      <div
                        style={{
                          width: "100%",
                          height: 20,
                          borderRadius: 999,
                          background: "#E2E8F0",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.max(0, currentHp)}%`,
                            height: "100%",
                            background: hpBarColor,
                            borderRadius: 999,
                            boxShadow: `0 0 16px ${hpBarColor}`,
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: 8,
                          fontSize: 26,
                          fontFamily: FONT_SANS,
                          fontWeight: 800,
                          color: isDead ? "#EF4444" : "#64748B",
                        }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          {isDead ? (
                            <>
                              <IconCrash size={24} color="#EF4444" />
                              <span>¡Aria ha sido derrotada!</span>
                            </>
                          ) : isHit1 ? (
                            <>
                              <IconWarning size={24} color="#F59E0B" />
                              <span>¡Aria recibió daño!</span>
                            </>
                          ) : (
                            <>
                              <IconShield size={24} color="#3B82F6" />
                              <span>En combate contra enemigo</span>
                            </>
                          )}
                        </span>
                        <span style={{ fontFamily: FONT_MONO, fontSize: 26, fontWeight: 700 }}>
                          DEF: 8 · ATK: 12
                        </span>
                      </div>
                    </div>
                  </div>

                  {isHit1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: -26,
                        right: 40,
                        background: "#EF4444",
                        color: "#FFFFFF",
                        fontFamily: FONT_MONO,
                        fontSize: 24,
                        fontWeight: 900,
                        padding: "6px 16px",
                        borderRadius: 14,
                        boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)",
                        transform: `translateY(${Math.sin((frame - 1750) / 4) * 6}px) rotate(4deg)`,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <IconCrash size={22} color="#FFFFFF" />
                      <span>-45 HP</span>
                    </div>
                  )}

                  {isCritHit && (
                    <div
                      style={{
                        position: "absolute",
                        top: -32,
                        right: 30,
                        background: "#7F1D1D",
                        border: "2px solid #EF4444",
                        color: "#FFFFFF",
                        fontFamily: FONT_MONO,
                        fontSize: 26,
                        fontWeight: 900,
                        padding: "8px 20px",
                        borderRadius: 16,
                        boxShadow: "0 12px 30px rgba(239, 68, 68, 0.5)",
                        transform: `scale(${1 + Math.sin(frame / 6) * 0.05}) rotate(-3deg)`,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <IconCrash size={24} color="#FFFFFF" />
                      <span>¡CRÍTICO: -55 HP!</span>
                    </div>
                  )}
                </div>

                {/* 3. TARJETA DE UI DEL ENEMIGO: Goblin de Mazmorra (Y: 870px) */}
                <div
                  style={{
                    position: "absolute",
                    top: 860 + perpetualFloatY * 0.2,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
                    borderRadius: 24,
                    padding: "24px 34px",
                    boxSizing: "border-box",
                    border: "2px solid rgba(22, 163, 74, 0.25)",
                    boxShadow: "0 20px 45px -10px rgba(0,0,0,0.08)",
                    transformOrigin: "center center",
                    transform: `rotateX(4deg) rotateZ(-0.8deg) scale(${
                      0.93 + enterGoblin * 0.07
                    })`,
                    opacity: enterGoblin,
                    zIndex: 20,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <GoblinAvatar frame={frame} isAttacking={isHit1 || isCritHit} />

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span
                            style={{
                              fontFamily: FONT_SANS,
                              fontSize: 30,
                              fontWeight: 900,
                              color: "#14532D",
                            }}
                          >
                            Goblin de Mazmorra
                          </span>
                          <span
                            style={{
                              fontFamily: FONT_MONO,
                              fontSize: 26,
                              fontWeight: 800,
                              color: "#15803D",
                              background: "#DCFCE7",
                              padding: "4px 12px",
                              borderRadius: 8,
                            }}
                          >
                            ENEMIGO LVL. 1
                          </span>
                        </div>

                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 28,
                            fontWeight: 900,
                            color: "#DC2626",
                          }}
                        >
                          ATK: 45 / 55
                        </span>
                      </div>

                      <div
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 26,
                          fontWeight: 700,
                          color: "#475569",
                        }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          {frame < 1750 ? (
                            <>
                              <IconSwords size={22} color="#15803D" />
                              <span>Preparando emboscada contra Aria...</span>
                            </>
                          ) : frame < 1980 ? (
                            <>
                              <IconCrash size={22} color="#DC2626" />
                              <span>¡Ataque exitoso! Daño: 45 infligido</span>
                            </>
                          ) : (
                            <>
                              <IconBolt size={22} color="#EF4444" />
                              <span>¡Impacto crítico final desatado!</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. BANNER ELÁSTICO DE GAME OVER (Y: 1150px) */}
                {frame >= 2080 && (
                  (() => {
                    const enterGameOver = spring({
                      frame: frame - 2080,
                      fps,
                      config: { damping: 12, stiffness: 130 },
                    });

                    return (
                      <div
                        style={{
                          position: "absolute",
                          top: 1140,
                          left: PYQUEST_THEME.safe.side,
                          width: 920,
                          background: "linear-gradient(135deg, #181C28 0%, #2D1515 100%)",
                          border: "3px solid #EF4444",
                          borderRadius: 24,
                          padding: "28px 36px",
                          boxSizing: "border-box",
                          boxShadow: "0 30px 70px rgba(239, 68, 68, 0.45)",
                          transform: `scale(${0.9 + enterGameOver * 0.1})`,
                          opacity: enterGameOver,
                          textAlign: "center",
                          zIndex: 35,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: FONT_SANS,
                            fontSize: 48,
                            fontWeight: 900,
                            color: "#EF4444",
                            letterSpacing: "-0.02em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 16,
                          }}
                        >
                          <IconBolt size={42} color="#EF4444" />
                          <span>GAME OVER</span>
                          <IconBolt size={42} color="#EF4444" />
                        </div>

                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 24,
                            fontWeight: 700,
                            color: "#FCA5A5",
                            marginTop: 8,
                          }}
                        >
                          Ejecutado automáticamente por Python
                        </div>
                      </div>
                    );
                  })()
                )}
              </>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 4: CONSTELACIÓN RADIAL DE LA INDUSTRIA (f2510 - f3500 / 0:42 - 0:58) */}
      {/* Salida desde Logo Central de Python hacia las 4 esquinas con Zoom In/Out */}
      {/* ================================================================ */}
      {frame >= 2510 && frame < 3500 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* TÍTULO ASIMÉTRICO ARRIBA */}
          {(() => {
            const enterTitle = spring({
              frame: frame - 2520,
              fps,
              config: { damping: 14, stiffness: 120 },
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 140,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  opacity: enterTitle,
                  transform: `translateY(${(1 - enterTitle) * 30}px)`,
                  zIndex: 40,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#0F172A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                  }}
                >
                  Una sola base.
                  <br />
                  <span style={{ color: "#3B82F6" }}>Toda la industria.</span>
                </div>
              </div>
            );
          })()}

          {/* MOTOR DE CONSTELACIÓN RADIAL Y ZOOM IN / OUT POR PROGRAMA */}
          {(() => {
            const centerX = 540;
            const centerY = 900;

            // Entrada general de la constelación (disparo de líneas y logo)
            const enterConstellation = spring({
              frame: frame - 2520,
              fps,
              config: { damping: 15, stiffness: 100 },
            });

            // Definición de las 4 esquinas/programas principales
            const programs = [
              {
                id: "ai",
                name: "Inteligencia Artificial",
                subtitle: "PyTorch · OpenAI · DeepSeek",
                desc: "El 92% de la investigación en IA y modelos generativos se entrena en Python.",
                logos: ["assets/logos/pytorch.svg", "assets/logos/openai.svg"],
                color: "#8B5CF6",
                accentLight: "#EDE9FE",
                // Posición idle en esquina (Noroeste)
                idleX: 80,
                idleY: 340,
                idleW: 430,
                idleH: 240,
                // Ventana de Zoom In individual
                windowStart: 2560,
                windowPeak: 2600,
                windowExit: 2710,
                windowEnd: 2740,
                metricLabel: "PyTorch & Transformers",
                metricValue: "Redes Neuronales Activas",
                iconKind: "ai",
              },
              {
                id: "backend",
                name: "Servidores Backend",
                subtitle: "Instagram · Spotify · FastAPI",
                desc: "Mueve el backend de Instagram con más de 2 mil millones de usuarios diarios.",
                logos: ["assets/logos/spotify.svg", "assets/logos/instagram.svg"],
                color: "#3B82F6",
                accentLight: "#DBEAFE",
                // Posición idle en esquina (Noreste)
                idleX: 570,
                idleY: 340,
                idleW: 430,
                idleH: 240,
                // Ventana de Zoom In individual
                windowStart: 2740,
                windowPeak: 2780,
                windowExit: 2890,
                windowEnd: 2920,
                metricLabel: "FastAPI & Microservicios",
                metricValue: "+2M Peticiones / Seg",
                iconKind: "backend",
              },
              {
                id: "data",
                name: "Ciencia de Datos",
                subtitle: "Pandas · Big Data · NumPy",
                desc: "Análisis financiero, modelado predictivo y visualización masiva en un solo script.",
                logos: ["assets/logos/pandas.svg", "assets/logos/python.svg"],
                color: "#10B981",
                accentLight: "#D1FAE5",
                // Posición idle en esquina (Suroeste)
                idleX: 80,
                idleY: 1180,
                idleW: 430,
                idleH: 240,
                // Ventana de Zoom In individual
                windowStart: 2920,
                windowPeak: 2960,
                windowExit: 3070,
                windowEnd: 3100,
                metricLabel: "Pandas & DataFrames",
                metricValue: "Modelado Predictivo Real",
                iconKind: "data",
              },
              {
                id: "automation",
                name: "Automatización & Bots",
                subtitle: "Web Scraping · Scripts · Bots",
                desc: "Desde controlar robots y telescopios de la NASA hasta automatizar tareas aburridas.",
                logos: ["assets/logos/fastapi.svg", "assets/logos/python.svg"],
                color: "#F59E0B",
                accentLight: "#FEF3C7",
                // Posición idle en esquina (Sureste)
                idleX: 570,
                idleY: 1180,
                idleW: 430,
                idleH: 240,
                // Ventana de Zoom In individual
                windowStart: 3100,
                windowPeak: 3140,
                windowExit: 3250,
                windowEnd: 3280,
                metricLabel: "Scripts Asíncronos",
                metricValue: "Cero Tareas Manuales",
                iconKind: "automation",
              },
            ];

            const isGrandFinale = frame >= 3280;

            // Determinar si hay un programa en foco de Zoom In actualmente
            const activeHero = programs.find(
              (p) => frame >= p.windowStart && frame < p.windowEnd
            );

            // Escala y atenuación del logo central durante los Zoom In
            const centerLogoScale = isGrandFinale
              ? 1.1 + Math.sin(frame / 12) * 0.05
              : activeHero
              ? 0.72
              : 1.0 + Math.sin(frame / 16) * 0.04;

            const centerLogoOpacity = isGrandFinale ? 1.0 : activeHero ? 0.45 : 1.0;

            return (
              <>
                {/* 1. LÍNEAS VECTORIALES DE FIBRA ÓPTICA DESDE EL CENTRO HACIA LAS ESQUINAS */}
                <svg
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: 1080,
                    height: 1920,
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                >
                  <defs>
                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Halo de energía alrededor del núcleo */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={180 * enterConstellation}
                    fill="url(#centerGlow)"
                  />

                  {/* Rayos hacia cada esquina */}
                  {programs.map((p) => {
                    const targetX = p.idleX + p.idleW / 2;
                    const targetY = p.idleY + p.idleH / 2;

                    const isThisActive = activeHero?.id === p.id || isGrandFinale;
                    const strokeWidth = isThisActive ? 4.5 : 2;
                    const strokeColor = isThisActive ? p.color : "rgba(148, 163, 184, 0.45)";
                    const strokeDash = isThisActive ? "10 6" : "6 6";

                    const currentX = centerX + (targetX - centerX) * enterConstellation;
                    const currentY = centerY + (targetY - centerY) * enterConstellation;

                    return (
                      <g key={p.id}>
                        <line
                          x1={centerX}
                          y1={centerY}
                          x2={currentX}
                          y2={currentY}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          strokeDasharray={strokeDash}
                          strokeDashoffset={-frame * 3}
                        />
                        {/* Partícula de energía viajera */}
                        {enterConstellation > 0.8 && (
                          <circle
                            cx={centerX + (targetX - centerX) * (((frame * 2.5 + (p.id.length * 30)) % 100) / 100)}
                            cy={centerY + (targetY - centerY) * (((frame * 2.5 + (p.id.length * 30)) % 100) / 100)}
                            r={isThisActive ? 6 : 4}
                            fill={isThisActive ? p.color : "#38BDF8"}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* 2. NÚCLEO CENTRAL CON EL LOGO OFICIAL DE PYTHON */}
                <div
                  style={{
                    position: "absolute",
                    top: centerY - 100,
                    left: centerX - 100,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.9) 100%)",
                    border: "3px solid #38BDF8",
                    boxShadow: isGrandFinale
                      ? "0 0 70px rgba(56, 189, 248, 0.6), 0 0 120px rgba(245, 158, 11, 0.4)"
                      : "0 20px 50px rgba(15, 23, 42, 0.15), 0 0 40px rgba(56, 189, 248, 0.35)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 20,
                    transform: `scale(${enterConstellation * centerLogoScale})`,
                    opacity: enterConstellation * centerLogoOpacity,
                  }}
                >
                  <Img
                    src={staticFile("assets/logos/python.svg")}
                    style={{
                      width: 90,
                      height: 90,
                      filter: "drop-shadow(0 8px 16px rgba(15, 23, 42, 0.18))",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 16,
                      fontWeight: 900,
                      color: "#0284C7",
                      marginTop: 4,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Python Core
                  </span>
                </div>

                {/* 3. LAS 4 TARJETAS CON ZOOM IN Y ZOOM OUT */}
                {programs.map((prog) => {
                  const hasEntered = frame >= prog.windowStart - 30;
                  if (!hasEntered && enterConstellation < 0.1) return null;

                  // Cálculo de Zoom In y Zoom Out
                  let zoomProgress = 0;
                  if (!isGrandFinale) {
                    if (frame >= prog.windowStart && frame < prog.windowPeak) {
                      // Fase de Zoom In
                      zoomProgress = spring({
                        frame: frame - prog.windowStart,
                        fps,
                        config: { damping: 14, stiffness: 120 },
                      });
                    } else if (frame >= prog.windowPeak && frame < prog.windowExit) {
                      // Fase de mantenimiento en primer plano
                      zoomProgress = 1;
                    } else if (frame >= prog.windowExit && frame < prog.windowEnd) {
                      // Fase de Zoom Out
                      const exitSpring = spring({
                        frame: frame - prog.windowExit,
                        fps,
                        config: { damping: 14, stiffness: 120 },
                      });
                      zoomProgress = 1 - exitSpring;
                    }
                  }

                  const isFocused = zoomProgress > 0.05;
                  const isOtherFocused = activeHero && activeHero.id !== prog.id;

                  // Posición interpolada entre la esquina (idle) y el centro héroe (Zoom In)
                  const heroX = PYQUEST_THEME.safe.side; // 80px (ancho completo de 920px)
                  const heroY = 620; // En el tercio medio central
                  const heroW = 920;
                  const heroH = 430;

                  const curX = prog.idleX + (heroX - prog.idleX) * zoomProgress;
                  const curY = prog.idleY + (heroY - prog.idleY) * zoomProgress;
                  const curW = prog.idleW + (heroW - prog.idleW) * zoomProgress;
                  const curH = prog.idleH + (heroH - prog.idleH) * zoomProgress;

                  const cardScale = isFocused
                    ? 1 + zoomProgress * 0.04
                    : isGrandFinale
                    ? 1.02
                    : isOtherFocused
                    ? 0.88
                    : 1.0;

                  const cardOpacity = isFocused
                    ? 1.0
                    : isGrandFinale
                    ? 1.0
                    : isOtherFocused
                    ? 0.35
                    : 0.95;

                  const zIndex = isFocused ? 35 : isGrandFinale ? 25 : 15;

                  return (
                    <div
                      key={prog.id}
                      style={{
                        position: "absolute",
                        top: curY + (isFocused ? 0 : perpetualFloatY * 0.3),
                        left: curX,
                        width: curW,
                        height: curH,
                        background: "#FFFFFF",
                        borderRadius: isFocused ? 26 : 20,
                        padding: isFocused ? "32px 36px" : "22px 24px",
                        boxSizing: "border-box",
                        border: `2.5px solid ${isFocused ? prog.color : "rgba(15, 23, 42, 0.08)"}`,
                        borderLeft: `${isFocused ? 12 : 8}px solid ${prog.color}`,
                        boxShadow: isFocused
                          ? `0 35px 80px -15px ${prog.color}55, 0 15px 30px rgba(0,0,0,0.08)`
                          : `0 12px 30px rgba(0,0,0,0.05)`,
                        transformOrigin: "center center",
                        transform: `scale(${cardScale})`,
                        opacity: cardOpacity * enterConstellation,
                        zIndex,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        overflow: "hidden",
                      }}
                    >
                      {/* Cabecera con Logos Oficiales */}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            {prog.logos.map((logoPath, lIdx) => (
                              <div
                                key={lIdx}
                                style={{
                                  width: isFocused ? 54 : 44,
                                  height: isFocused ? 54 : 44,
                                  borderRadius: 14,
                                  background: "#F8FAFC",
                                  border: "1px solid rgba(15, 23, 42, 0.08)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: 8,
                                  boxSizing: "border-box",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                                }}
                              >
                                <Img
                                  src={staticFile(logoPath)}
                                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                              </div>
                            ))}

                            <div>
                              <div
                                style={{
                                  fontFamily: FONT_SANS,
                                  fontSize: isFocused ? 36 : 26,
                                  fontWeight: 900,
                                  color: "#0F172A",
                                  letterSpacing: "-0.02em",
                                  lineHeight: 1.15,
                                }}
                              >
                                {prog.name}
                              </div>
                              <div
                                style={{
                                  fontFamily: FONT_MONO,
                                  fontSize: isFocused ? 24 : 18,
                                  color: prog.color,
                                  fontWeight: 800,
                                }}
                              >
                                {prog.subtitle}
                              </div>
                            </div>
                          </div>

                          {/* Badge de estado */}
                          <div
                            style={{
                              fontFamily: FONT_MONO,
                              fontSize: isFocused ? 22 : 16,
                              fontWeight: 800,
                              color: prog.color,
                              background: prog.accentLight,
                              padding: isFocused ? "8px 18px" : "4px 12px",
                              borderRadius: 999,
                            }}
                          >
                            {isFocused ? "EN FOCO · ZOOM IN" : "PYTHON"}
                          </div>
                        </div>

                        {/* Descripción extendida revelada en Zoom In */}
                        {isFocused && (
                          <div
                            style={{
                              fontFamily: FONT_SANS,
                              fontSize: 26,
                              color: "#334155",
                              lineHeight: 1.35,
                              fontWeight: 600,
                              marginTop: 18,
                            }}
                          >
                            {prog.desc}
                          </div>
                        )}
                      </div>

                      {/* Microanimación de pie */}
                      <div
                        style={{
                          marginTop: isFocused ? 20 : 10,
                          paddingTop: 12,
                          borderTop: "1px solid rgba(15, 23, 42, 0.06)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {prog.iconKind === "ai" && (
                            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                              {[0, 1, 2, 3].map((n) => (
                                <div
                                  key={n}
                                  style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    background: prog.color,
                                    transform: `scale(${1 + Math.sin(frame / 6 + n) * 0.35})`,
                                    boxShadow: `0 0 10px ${prog.color}`,
                                  }}
                                />
                              ))}
                            </div>
                          )}

                          {prog.iconKind === "backend" && (
                            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                              {[0, 1, 2, 3, 4].map((bar) => (
                                <div
                                  key={bar}
                                  style={{
                                    width: 7,
                                    height: 16 + Math.sin(frame / 5 + bar) * 10,
                                    borderRadius: 3,
                                    background: prog.color,
                                  }}
                                />
                              ))}
                            </div>
                          )}

                          {prog.iconKind === "data" && (
                            <div style={{ display: "flex", gap: 5, alignItems: "flex-end", height: 22 }}>
                              {[0.4, 0.7, 0.3, 0.9, 0.6].map((h, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    width: 9,
                                    height: 22 * h * (1 + Math.sin(frame / 8 + idx) * 0.25),
                                    borderRadius: 3,
                                    background: prog.color,
                                  }}
                                />
                              ))}
                            </div>
                          )}

                          {prog.iconKind === "automation" && (
                            <div
                              style={{
                                transform: `rotate(${frame * 4}deg)`,
                                display: "inline-block",
                              }}
                            >
                              <IconLoop size={22} color={prog.color} />
                            </div>
                          )}

                          <span
                            style={{
                              fontFamily: FONT_MONO,
                              fontSize: isFocused ? 24 : 18,
                              fontWeight: 800,
                              color: prog.color,
                            }}
                          >
                            {prog.metricValue}
                          </span>
                        </div>

                        {isFocused && (
                          <span
                            style={{
                              fontFamily: FONT_MONO,
                              fontSize: 20,
                              color: "#64748B",
                              fontWeight: 700,
                            }}
                          >
                            {prog.metricLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* 4. BANNER DE CIERRE: GRAND FINALE DE LA INDUSTRIA (f3280 a f3490) */}
                {isGrandFinale && (
                  <div
                    style={{
                      position: "absolute",
                      top: 1530,
                      left: PYQUEST_THEME.safe.side,
                      width: 920,
                      background: "linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)",
                      borderRadius: 22,
                      padding: "24px 34px",
                      border: "2px solid #8B5CF6",
                      boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 20,
                      zIndex: 40,
                    }}
                  >
                    <Img
                      src={staticFile("assets/logos/python.svg")}
                      style={{ width: 44, height: 44 }}
                    />
                    <span
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: 28,
                        fontWeight: 900,
                        color: "#F8FAFC",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Aprender Python es tu llave maestra a toda la industria
                    </span>
                  </div>
                )}
              </>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 5: ROADMAP INTERACTIVO Y HOOK AL EPISODIO 2 (f3480 - f4320 / 0:58 - 1:12) */}
      {/* ================================================================ */}
      {frame >= 3460 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {(() => {
            const enterMaster = spring({
              frame: frame - 3480,
              fps,
              config: { damping: 13, stiffness: 120 },
            });

            const xpProgress = interpolate(frame, [3540, 3640], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const isLvl2Unlocked = frame >= 3660;

            return (
              <div
                style={{
                  position: "absolute",
                  top: 150 + perpetualFloatY * 0.4,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  opacity: enterMaster,
                  transform: `scale(${0.9 + enterMaster * 0.1})`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                  zIndex: 30,
                }}
              >
                {/* ENCABEZADO DE SERIE */}
                <div style={{ textAlign: "center", marginBottom: -6 }}>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#3B82F6",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <IconMap size={26} color="#3B82F6" />
                    <span>PyQuest · Hoja de Ruta Oficial</span>
                  </span>
                </div>

                {/* 1. FICHA DE PROGRESO DE ARIA (SUBE A NIVEL 2) */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "26px 32px",
                    boxShadow: isLvl2Unlocked
                      ? "0 25px 60px -10px rgba(245, 158, 11, 0.35)"
                      : "0 20px 45px -10px rgba(0,0,0,0.08)",
                    border: `2px solid ${isLvl2Unlocked ? "#F59E0B" : "rgba(0,0,0,0.08)"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <AriaAvatar frame={frame} size={84} />

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontFamily: FONT_SANS, fontSize: 34, fontWeight: 900, color: "#0F172A" }}>
                            Aria · PyQuest
                          </span>
                        </div>

                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 24,
                            fontWeight: 900,
                            color: isLvl2Unlocked ? "#FFFFFF" : "#3B82F6",
                            background: isLvl2Unlocked ? "#F59E0B" : "#EFF6FF",
                            padding: "8px 16px",
                            borderRadius: 12,
                            transform: isLvl2Unlocked
                              ? `scale(${1 + Math.sin(frame / 6) * 0.05})`
                              : "none",
                            boxShadow: isLvl2Unlocked ? "0 4px 15px rgba(245, 158, 11, 0.4)" : "none",
                          }}
                        >
                          {isLvl2Unlocked ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                              <IconSparkles size={20} color="#FFFFFF" />
                              <span>¡LVL. 2 DESBLOQUEADO!</span>
                            </span>
                          ) : (
                            "LVL. 1"
                          )}
                        </span>
                      </div>

                      <div
                        style={{
                          width: "100%",
                          height: 18,
                          borderRadius: 999,
                          background: "#E2E8F0",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${xpProgress}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #3B82F6 0%, #F59E0B 100%)",
                            borderRadius: 999,
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 8,
                          fontFamily: FONT_MONO,
                          fontSize: 22,
                          color: "#64748B",
                          fontWeight: 700,
                        }}
                      >
                        <span>Experiencia: {Math.round(xpProgress * 5)} / 500 XP</span>
                        <span style={{ color: isLvl2Unlocked ? "#F59E0B" : "#3B82F6" }}>
                          {isLvl2Unlocked ? "+100% COMPLETADO" : "Subiendo nivel..."}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CHECKLIST VIVO DE EPISODIOS */}
                {(() => {
                  const checkDraw = interpolate(frame, [3740, 3790], [50, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });

                  return (
                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        borderRadius: 22,
                        padding: "24px 30px",
                        boxShadow: "0 14px 35px -8px rgba(0,0,0,0.06)",
                        border: "2px solid rgba(16, 185, 129, 0.3)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
                          <rect width="40" height="40" rx="12" fill="#ECFDF5" />
                          <path
                            d="M 11 20 L 17 26 L 29 13"
                            stroke="#10B981"
                            strokeWidth="4.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="50"
                            strokeDashoffset={checkDraw}
                          />
                        </svg>

                        <div>
                          <div style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 800, color: "#0F172A" }}>
                            Episodio 1: ¿Por qué Python?
                          </div>
                          <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#10B981", fontWeight: 700 }}>
                            Fundamentos y lógica de condicionales
                          </div>
                        </div>
                      </div>

                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 24,
                          fontWeight: 800,
                          color: "#10B981",
                          background: "#ECFDF5",
                          padding: "8px 20px",
                          borderRadius: 999,
                        }}
                      >
                        COMPLETADO
                      </span>
                    </div>
                  );
                })()}

                {/* Episodio 2: Hook pulsante y vista previa de código */}
                {(() => {
                  const pulse = 1 + Math.sin(frame / 8) * 0.025;

                  return (
                    <div
                      style={{
                        background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                        borderRadius: 22,
                        padding: "26px 30px",
                        boxShadow: "0 20px 45px -8px rgba(59, 130, 246, 0.3)",
                        border: "2px solid #3B82F6",
                        transform: `scale(${pulse})`,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <IconBolt size={36} color="#2563EB" />
                          <div>
                            <div style={{ fontFamily: FONT_SANS, fontSize: 34, fontWeight: 900, color: "#1E3A8A" }}>
                              Episodio 2: Variables y Tipos
                            </div>
                            <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#2563EB", fontWeight: 700 }}>
                              Le damos vida a las estadísticas de Aria
                            </div>
                          </div>
                        </div>

                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 24,
                            fontWeight: 900,
                            color: "#FFFFFF",
                            background: "#2563EB",
                            padding: "8px 22px",
                            borderRadius: 999,
                            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
                          }}
                        >
                          PRÓXIMO
                        </span>
                      </div>

                      <div
                        style={{
                          background: "#181C28",
                          borderRadius: 14,
                          padding: "18px 22px",
                          fontFamily: FONT_MONO,
                          fontSize: 26,
                          lineHeight: 1.5,
                        }}
                      >
                        <div>
                          {frame < 3800 ? (
                            <TypewriterText
                              text="vida = 100"
                              frame={frame}
                              startFrame={3770}
                              durationFrames={25}
                              cursorColor="#10B981"
                            />
                          ) : (
                            <>
                              <span style={{ color: "#F8FAFC" }}>vida = </span>
                              <span style={{ color: "#10B981", fontWeight: 700 }}>100</span>
                              <span style={{ color: "#94A3B8", marginLeft: 16 }}># Entero (int)</span>
                            </>
                          )}
                        </div>
                        <div>
                          {frame < 3830 ? (
                            <TypewriterText
                              text='heroe = "Aria"'
                              frame={frame}
                              startFrame={3800}
                              durationFrames={25}
                              cursorColor="#F59E0B"
                            />
                          ) : (
                            <>
                              <span style={{ color: "#F8FAFC" }}>heroe = </span>
                              <span style={{ color: "#F59E0B" }}>"Aria"</span>
                              <span style={{ color: "#94A3B8", marginLeft: 16 }}># Texto (str)</span>
                            </>
                          )}
                        </div>
                        <div>
                          {frame < 3860 ? (
                            <TypewriterText
                              text="vivo = True"
                              frame={frame}
                              startFrame={3830}
                              durationFrames={25}
                              cursorColor="#A78BFA"
                            />
                          ) : (
                            <>
                              <span style={{ color: "#F8FAFC" }}>vivo = </span>
                              <span style={{ color: "#A78BFA", fontWeight: 700 }}>True</span>
                              <span style={{ color: "#94A3B8", marginLeft: 16 }}># Booleano (bool)</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 3. VISTA PREVIA COMPLETA DE PRÓXIMOS EPISODIOS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  {[
                    { ep: "EPISODIO 3", title: "Operadores & Combate", icon: <IconSwords size={28} color="#3B82F6" />, color: "#3B82F6" },
                    { ep: "EPISODIO 4", title: "Listas & Inventario", icon: <IconBackpack size={28} color="#10B981" />, color: "#10B981" },
                    { ep: "EPISODIO 5", title: "Bucles & Oleadas", icon: <IconLoop size={28} color="#F59E0B" />, color: "#F59E0B" },
                    { ep: "EPISODIO 6", title: "Funciones & Poderes", icon: <IconSparkles size={28} color="#8B5CF6" />, color: "#8B5CF6" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        borderRadius: 18,
                        padding: "16px 20px",
                        border: "1px solid rgba(0,0,0,0.06)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      {item.icon}
                      <div>
                        <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: item.color, fontWeight: 800 }}>
                          {item.ep}
                        </div>
                        <div style={{ fontFamily: FONT_SANS, fontSize: 26, fontWeight: 800, color: "#1E293B" }}>
                          {item.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4. CALL TO ACTION DINÁMICO */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "26px 32px",
                    boxShadow: "0 25px 60px -10px rgba(0,0,0,0.1)",
                    border: "2px solid rgba(15, 23, 42, 0.08)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 34,
                      fontWeight: 900,
                      color: "#0F172A",
                      lineHeight: 1.3,
                      marginBottom: 16,
                    }}
                  >
                    Guarda este video y sígueme:
                    <br />
                    <span style={{ color: "#2563EB" }}>
                      Mañana le damos vida al personaje en el Episodio 2
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                    <div
                      style={{
                        background: "#EFF6FF",
                        border: "2px solid #3B82F6",
                        borderRadius: 14,
                        padding: "14px 30px",
                        fontFamily: FONT_SANS,
                        fontSize: 26,
                        fontWeight: 800,
                        color: "#1D4ED8",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        transform: `scale(${1 + Math.sin(frame / 12) * 0.03})`,
                      }}
                    >
                      <IconBookmark size={24} color="#1D4ED8" />
                      <span>Guardar</span>
                    </div>

                    <div
                      style={{
                        background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                        borderRadius: 14,
                        padding: "14px 36px",
                        fontFamily: FONT_SANS,
                        fontSize: 26,
                        fontWeight: 800,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        boxShadow: "0 6px 20px rgba(37, 99, 235, 0.35)",
                        transform: `scale(${1 + Math.cos(frame / 12) * 0.03})`,
                      }}
                    >
                      <IconPlus size={24} color="#FFFFFF" />
                      <span>Seguir</span>
                    </div>
                  </div>
                </div>

                {/* PIE DE COMUNIDAD SANTI.DEV */}
                <div style={{ textAlign: "center", marginTop: 4 }}>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#64748B",
                    }}
                  >
                    @santi.dev · PyQuest RPG Engine · Serie Educativa
                  </span>
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
