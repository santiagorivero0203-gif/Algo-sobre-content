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

// =====================================================================
// COMPONENTE 1: ATMÓSFERA Y FONDO REACTIVO (2.5D)
// =====================================================================
const AtmosphereBackground: React.FC<{ frame: number }> = ({ frame }) => {
  // Interpolación de color ambiental según las fases dramáticas del guion
  const bgColor = interpolateColors(
    frame,
    [0, 210, 240, 540, 600, 1380, 1440, 1750, 1800, 1980, 2040, 2520, 2600, 3480, 3600, 4320],
    [
      "#F3F4F8", // f0 - f210: Gris perla profundo (Gancho)
      "#F3F4F8",
      "#FFF1F2", // f240 - f540: Carmesí pálido (Error en Java)
      "#FFF1F2",
      "#ECFDF5", // f600 - f1380: Verde menta/esmeralda (Alivio en Python)
      "#ECFDF5",
      "#EEF2FF", // f1440 - f1750: Azul eléctrico (Lógica RPG viva)
      "#EEF2FF",
      "#FFFBEB", // f1800 - f1980: Ámbar de alerta (Daño intermedio)
      "#FFFBEB",
      "#FEF2F2", // f2040 - f2520: Rojo crítico (Game Over / HP a cero)
      "#FEF2F2",
      "#F5F3FF", // f2600 - f3480: Lavanda/Violeta suave (Industria)
      "#F5F3FF",
      "#FAFAF9", // f3600 - f4320: Blanco cálido luminoso (Roadmap & Cierre)
      "#FFFFFF",
    ]
  );

  // Orbe 1: Dinámico primario
  const orb1Color = interpolateColors(
    frame,
    [0, 230, 600, 1440, 1800, 2040, 2600, 3600],
    [
      "rgba(99, 102, 241, 0.18)", // Índigo
      "rgba(239, 68, 68, 0.35)",  // Rojo error
      "rgba(16, 185, 129, 0.30)", // Verde éxito
      "rgba(59, 130, 246, 0.28)", // Azul RPG
      "rgba(245, 158, 11, 0.30)", // Ámbar impacto
      "rgba(239, 68, 68, 0.40)",  // Rojo crítico Game Over
      "rgba(139, 92, 246, 0.26)", // Violeta industria
      "rgba(59, 130, 246, 0.22)", // Azul progreso
    ]
  );

  // Orbe 2: Dinámico secundario
  const orb2Color = interpolateColors(
    frame,
    [0, 230, 600, 1440, 2040, 2600, 3600],
    [
      "rgba(59, 130, 246, 0.16)",
      "rgba(244, 63, 94, 0.28)",
      "rgba(52, 211, 153, 0.24)",
      "rgba(99, 102, 241, 0.22)",
      "rgba(239, 68, 68, 0.32)",
      "rgba(236, 72, 153, 0.20)",
      "rgba(16, 185, 129, 0.20)",
    ]
  );

  // Movimiento senoidal continuo de los orbes
  const orb1X = Math.sin(frame / 32) * 110;
  const orb1Y = Math.cos(frame / 40) * 90;
  const orb2X = Math.cos(frame / 28) * -120;
  const orb2Y = Math.sin(frame / 36) * 100;

  return (
    <AbsoluteFill style={{ background: bgColor, overflow: "hidden" }}>
      {/* Textura de puntos con paralaje continuo en diagonal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#0f172a 1.5px, transparent 1.5px)",
          backgroundSize: "38px 38px",
          backgroundPosition: `${-frame * 0.6}px ${-frame * 0.4}px`,
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />

      {/* Orbe de luz volumétrica 1 */}
      <div
        style={{
          position: "absolute",
          top: -150 + orb1Y,
          left: 100 + orb1X,
          width: 850,
          height: 850,
          borderRadius: "50%",
          background: orb1Color,
          filter: "blur(130px)",
          pointerEvents: "none",
          transform: `scale(${1 + Math.sin(frame / 45) * 0.08})`,
        }}
      />

      {/* Orbe de luz volumétrica 2 */}
      <div
        style={{
          position: "absolute",
          bottom: -180 + orb2Y,
          right: 50 + orb2X,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: orb2Color,
          filter: "blur(140px)",
          pointerEvents: "none",
          transform: `scale(${1 + Math.cos(frame / 38) * 0.07})`,
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
                        style={{ width: 22, height: 22 }}
                      />
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 20,
                          fontWeight: 700,
                          color: "rgba(255, 255, 255, 0.8)",
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
                      fontSize: 28,
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
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#DC2626",
                      marginBottom: 12,
                      borderBottom: "1px solid rgba(239, 68, 68, 0.2)",
                      paddingBottom: 8,
                    }}
                  >
                    <span>⚠️</span>
                    <span>COMPILATION ERROR: javac App.java</span>
                  </div>

                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 26,
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
                    <div style={{ fontSize: 20, color: "#DC2626", marginTop: 4 }}>
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
                          fontSize: 30,
                          flexShrink: 0,
                        }}
                      >
                        💥
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
                      }}
                    >
                      💡 El abandono ocurre por la <span style={{ color: "#EF4444" }}>fricción de sintaxis</span>, no por tu capacidad de pensar.
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
                      color: "#10B981",
                      background: "rgba(16, 185, 129, 0.12)",
                      padding: "2px 14px",
                      borderRadius: 12,
                      display: "inline-block",
                      transform: `rotate(${Math.sin(frame / 20) * 1.5}deg)`,
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
                      style={{ width: 24, height: 24 }}
                    />
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 22,
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
                        fontSize: 22,
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
                        fontSize: 32,
                        fontWeight: 800,
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
          {frame >= 960 && (
            (() => {
              const enterMeters = spring({
                frame: frame - 960,
                fps,
                config: { damping: 14, stiffness: 110 },
              });

              const syntaxNoiseP = interpolate(frame, [980, 1080], [95, 10], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              const logicFocusP = interpolate(frame, [1020, 1120], [15, 100], {
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
                      <span style={{ fontFamily: FONT_SANS, fontSize: 26, fontWeight: 800, color: "#1E1B4B" }}>
                        ⚡ Enfoque en Lógica del Juego
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
                          fontSize: 20,
                          color: "#94A3B8",
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
                      <div style={{ fontFamily: FONT_MONO, fontSize: 16, color: "#10B981", fontWeight: 700 }}>
                        RESULTADO
                      </div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: "#34D399", fontWeight: 900 }}>
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
                {/* 1. TARJETA DE CÓDIGO (pyquest.py): Arriba */}
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
                      <span style={{ fontSize: 20 }}>⚔️</span>
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 22,
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
                      fontSize: 32,
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
                        padding: "4px 14px",
                        borderRadius: 8,
                      }}
                    >
                      <div>
                        <span style={{ color: "#60A5FA", fontWeight: 800 }}>if </span>
                        <span style={{ color: "#F8FAFC" }}>vida &lt;= </span>
                        <span style={{ color: "#10B981", fontWeight: 700 }}>0</span>
                        <span style={{ color: "#94A3B8" }}>:</span>
                      </div>

                      {frame >= 1760 && (
                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 20,
                            fontWeight: 800,
                            padding: "4px 12px",
                            borderRadius: 999,
                            background: isDead ? "#EF4444" : "#8B5CF6",
                            color: "#FFFFFF",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          }}
                        >
                          {isDead ? "0 <= 0 ➔ True ⚡" : `${currentHp} <= 0 ➔ False`}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        paddingLeft: 48,
                        marginTop: 4,
                        background: isDead ? "rgba(239, 68, 68, 0.3)" : "transparent",
                        borderLeft: isDead ? "5px solid #EF4444" : "5px solid transparent",
                        padding: "4px 14px 4px 48px",
                        borderRadius: 8,
                      }}
                    >
                      <span style={{ color: isDead ? "#EF4444" : "#34D399", fontWeight: 800 }}>
                        fin_del_juego
                      </span>
                      <span style={{ color: "#94A3B8" }}>()</span>
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
                          background: "rgba(255, 255, 255, 0.94)",
                          border: `2px solid ${item.color}`,
                          borderRadius: 16,
                          padding: "10px 14px",
                          textAlign: "center",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                        }}
                      >
                        <div style={{ fontFamily: FONT_MONO, fontSize: 17, color: item.color, fontWeight: 700 }}>
                          {item.word}
                        </div>
                        <div style={{ fontFamily: FONT_SANS, fontSize: 19, color: "#1E293B", fontWeight: 800, marginTop: 4 }}>
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
                              fontSize: 18,
                              fontWeight: 800,
                              color: "#3B82F6",
                              background: "#EFF6FF",
                              padding: "4px 12px",
                              borderRadius: 8,
                            }}
                          >
                            LVL. 1
                          </span>
                        </div>

                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 30,
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
                          height: 18,
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
                          fontSize: 19,
                          fontFamily: FONT_SANS,
                          fontWeight: 700,
                          color: isDead ? "#EF4444" : "#64748B",
                        }}
                      >
                        <span>
                          {isDead
                            ? "💀 ¡Aria ha sido derrotada!"
                            : isHit1
                            ? "⚠️ ¡Aria recibió daño!"
                            : "🛡️ En combate contra enemigo"}
                        </span>
                        <span style={{ fontFamily: FONT_MONO, fontSize: 17 }}>
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
                      }}
                    >
                      💥 -45 HP
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
                      }}
                    >
                      ☠️ ¡CRÍTICO: -55 HP!
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
                              fontSize: 16,
                              fontWeight: 800,
                              color: "#15803D",
                              background: "#DCFCE7",
                              padding: "4px 10px",
                              borderRadius: 8,
                            }}
                          >
                            ENEMIGO LVL. 1
                          </span>
                        </div>

                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 24,
                            fontWeight: 800,
                            color: "#DC2626",
                          }}
                        >
                          ATK: 45 / 55
                        </span>
                      </div>

                      <div
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#475569",
                        }}
                      >
                        {frame < 1750
                          ? "⚔️ Preparando emboscada contra Aria..."
                          : frame < 1980
                          ? "💥 ¡Ataque exitoso! Daño: 45 infligido"
                          : "⚡ ¡Impacto crítico final desatado!"}
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
                          <span>⚡</span>
                          <span>GAME OVER</span>
                          <span>⚡</span>
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
      {/* ESCENA 4: CASCADA 2.5D DE LA INDUSTRIA (f2520 - f3480 / 0:42 - 0:58) */}
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
                  top: 170,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  opacity: enterTitle,
                  transform: `translateY(${(1 - enterTitle) * 30}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 50,
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

          {/* ESCALERA DE 4 TARJETAS CON FOCO Y LOGOS OFICIALES */}
          {(() => {
            const cards = [
              {
                id: "ai",
                title: "Inteligencia Artificial",
                subtitle: "PyTorch · OpenAI · DeepSeek",
                logos: ["assets/logos/pytorch.svg", "assets/logos/openai.svg"],
                color: "#8B5CF6",
                startFrame: 2530,
                baseY: 340,
                baseX: -15,
                microAnim: () => (
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
                    {[0, 1, 2, 3].map((node) => (
                      <div
                        key={node}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: "#8B5CF6",
                          transform: `scale(${1 + Math.sin(frame / 6 + node) * 0.3})`,
                          boxShadow: "0 0 10px #8B5CF6",
                        }}
                      />
                    ))}
                    <span style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#8B5CF6", marginLeft: 8 }}>
                      Redes Neuronales Activas
                    </span>
                  </div>
                ),
              },
              {
                id: "backend",
                title: "Servidores Backend",
                subtitle: "Instagram · Spotify · FastAPI",
                logos: ["assets/logos/spotify.svg", "assets/logos/instagram.svg"],
                color: "#3B82F6",
                startFrame: 2560,
                baseY: 630,
                baseX: 20,
                microAnim: () => (
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 10 }}>
                    {[0, 1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        style={{
                          width: 8,
                          height: 18 + Math.sin(frame / 5 + bar) * 10,
                          borderRadius: 4,
                          background: "#3B82F6",
                        }}
                      />
                    ))}
                    <span style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#3B82F6", marginLeft: 8 }}>
                      Millones de Peticiones/seg
                    </span>
                  </div>
                ),
              },
              {
                id: "data",
                title: "Ciencia de Datos",
                subtitle: "Pandas · Big Data · Analytics",
                logos: ["assets/logos/pandas.svg", "assets/logos/python.svg"],
                color: "#10B981",
                startFrame: 2590,
                baseY: 920,
                baseX: -10,
                microAnim: () => (
                  <div style={{ display: "flex", gap: 6, alignItems: "flex-end", marginTop: 10, height: 26 }}>
                    {[0.4, 0.7, 0.3, 0.9, 0.6].map((h, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: 12,
                          height: 26 * h * (1 + Math.sin(frame / 8 + idx) * 0.2),
                          borderRadius: 3,
                          background: "#10B981",
                        }}
                      />
                    ))}
                    <span style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#10B981", marginLeft: 8 }}>
                      Modelado Predictivo
                    </span>
                  </div>
                ),
              },
              {
                id: "automation",
                title: "Automatización & Bots",
                subtitle: "Web Scraping · Bots · Scripts",
                logos: ["assets/logos/fastapi.svg", "assets/logos/python.svg"],
                color: "#F59E0B",
                startFrame: 2620,
                baseY: 1210,
                baseX: 25,
                microAnim: () => (
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
                    <div
                      style={{
                        transform: `rotate(${frame * 4}deg)`,
                        fontSize: 22,
                        display: "inline-block",
                      }}
                    >
                      ⚙️
                    </div>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#F59E0B" }}>
                      Scripts en Segundo Plano
                    </span>
                  </div>
                ),
              },
            ];

            const isGrandFinale = frame >= 3280;

            return (
              <>
                {cards.map((card, i) => {
                  const enter = spring({
                    frame: frame - card.startFrame,
                    fps,
                    config: { damping: 13, stiffness: 120 },
                  });

                  if (frame < card.startFrame - 10) return null;

                  const heroWindows: Record<string, [number, number]> = {
                    ai: [2530, 2710],
                    backend: [2710, 2890],
                    data: [2890, 3070],
                    automation: [3070, 3280],
                  };

                  const [wStart, wEnd] = heroWindows[card.id] || [0, 0];
                  const isCurrentHero = isGrandFinale || (frame >= wStart && frame < wEnd);

                  const cardScale = isCurrentHero ? 1.05 : 0.94;
                  const cardOpacity = isCurrentHero ? 1.0 : 0.65;
                  const cardRotateZ = isCurrentHero ? 0 : i % 2 === 0 ? -1.8 : 1.8;

                  return (
                    <div
                      key={card.id}
                      style={{
                        position: "absolute",
                        top: card.baseY + perpetualFloatY * 0.5,
                        left: PYQUEST_THEME.safe.side + card.baseX,
                        width: 900,
                        background: "#FFFFFF",
                        borderRadius: 22,
                        padding: "26px 32px",
                        boxSizing: "border-box",
                        boxShadow: isCurrentHero
                          ? `0 25px 55px -10px ${card.color}40, 0 10px 20px rgba(0,0,0,0.06)`
                          : "0 10px 25px rgba(0,0,0,0.04)",
                        border: `2px solid ${
                          isCurrentHero ? card.color : "rgba(0,0,0,0.06)"
                        }`,
                        borderLeft: `8px solid ${card.color}`,
                        transformOrigin: "center center",
                        transform: `rotateX(4deg) rotateZ(${cardRotateZ}deg) scale(${
                          (0.85 + enter * 0.15) * cardScale
                        })`,
                        opacity: enter * cardOpacity,
                        zIndex: isCurrentHero ? 25 : 15,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                          {/* Badges de logos oficiales */}
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            {card.logos.map((logoPath, lIdx) => (
                              <div
                                key={lIdx}
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 14,
                                  background: "#F8FAFC",
                                  border: "1px solid rgba(15, 23, 42, 0.08)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: 7,
                                  boxSizing: "border-box",
                                  boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
                                }}
                              >
                                <Img
                                  src={staticFile(logoPath)}
                                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                              </div>
                            ))}
                          </div>

                          <div>
                            <div
                              style={{
                                fontFamily: FONT_SANS,
                                fontSize: 32,
                                fontWeight: 800,
                                color: "#0F172A",
                                marginBottom: 4,
                              }}
                            >
                              {card.title}
                            </div>
                            <div
                              style={{
                                fontFamily: FONT_MONO,
                                fontSize: 20,
                                color: "#64748B",
                                fontWeight: 600,
                              }}
                            >
                              {card.subtitle}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 18,
                            fontWeight: 800,
                            color: card.color,
                            background: `${card.color}18`,
                            padding: "6px 14px",
                            borderRadius: 999,
                          }}
                        >
                          PYTHON NATIVO
                        </div>
                      </div>

                      {card.microAnim()}
                    </div>
                  );
                })}

                {/* BANNER DE CIERRE DE ESCENA 4 (f3280 a f3480) */}
                {isGrandFinale && (
                  <div
                    style={{
                      position: "absolute",
                      top: 1530,
                      left: PYQUEST_THEME.safe.side,
                      width: 920,
                      background: "linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)",
                      borderRadius: 20,
                      padding: "20px 28px",
                      border: "2px solid #8B5CF6",
                      boxShadow: "0 20px 45px rgba(139, 92, 246, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 16,
                      zIndex: 30,
                    }}
                  >
                    <Img
                      src={staticFile("assets/logos/python.svg")}
                      style={{ width: 34, height: 34 }}
                    />
                    <span
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: 24,
                        fontWeight: 800,
                        color: "#F8FAFC",
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
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#3B82F6",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    🗺️ PyQuest · Hoja de Ruta Oficial
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
                          <span style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 900, color: "#0F172A" }}>
                            Aria · PyQuest
                          </span>
                        </div>

                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 20,
                            fontWeight: 900,
                            color: isLvl2Unlocked ? "#FFFFFF" : "#3B82F6",
                            background: isLvl2Unlocked ? "#F59E0B" : "#EFF6FF",
                            padding: "6px 14px",
                            borderRadius: 12,
                            transform: isLvl2Unlocked
                              ? `scale(${1 + Math.sin(frame / 6) * 0.05})`
                              : "none",
                            boxShadow: isLvl2Unlocked ? "0 4px 15px rgba(245, 158, 11, 0.4)" : "none",
                          }}
                        >
                          {isLvl2Unlocked ? "★ ¡LVL. 2 DESBLOQUEADO! ★" : "LVL. 1"}
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
                          fontSize: 18,
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
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
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
                          <div style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 800, color: "#0F172A" }}>
                            Episodio 1: ¿Por qué Python?
                          </div>
                          <div style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#10B981", fontWeight: 700 }}>
                            Fundamentos y lógica de condicionales
                          </div>
                        </div>
                      </div>

                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#10B981",
                          background: "#ECFDF5",
                          padding: "8px 18px",
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
                          <span style={{ fontSize: 32 }}>⚡</span>
                          <div>
                            <div style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 900, color: "#1E3A8A" }}>
                              Episodio 2: Variables y Tipos
                            </div>
                            <div style={{ fontFamily: FONT_MONO, fontSize: 18, color: "#2563EB", fontWeight: 700 }}>
                              Le damos vida a las estadísticas de Aria
                            </div>
                          </div>
                        </div>

                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 20,
                            fontWeight: 900,
                            color: "#FFFFFF",
                            background: "#2563EB",
                            padding: "8px 20px",
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
                          padding: "16px 20px",
                          fontFamily: FONT_MONO,
                          fontSize: 22,
                          lineHeight: 1.5,
                        }}
                      >
                        <div>
                          <span style={{ color: "#F8FAFC" }}>vida = </span>
                          <span style={{ color: "#10B981", fontWeight: 700 }}>100</span>
                          <span style={{ color: "#64748B", marginLeft: 16 }}># Entero (int)</span>
                        </div>
                        <div>
                          <span style={{ color: "#F8FAFC" }}>heroe = </span>
                          <span style={{ color: "#F59E0B" }}>"Aria"</span>
                          <span style={{ color: "#64748B", marginLeft: 16 }}># Texto (str)</span>
                        </div>
                        <div>
                          <span style={{ color: "#F8FAFC" }}>vivo = </span>
                          <span style={{ color: "#8B5CF6", fontWeight: 700 }}>True</span>
                          <span style={{ color: "#64748B", marginLeft: 16 }}># Booleano (bool)</span>
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
                    { ep: "EPISODIO 3", title: "Operadores & Combate", icon: "⚔️", color: "#3B82F6" },
                    { ep: "EPISODIO 4", title: "Listas & Inventario", icon: "🎒", color: "#10B981" },
                    { ep: "EPISODIO 5", title: "Bucles & Oleadas", icon: "🔄", color: "#F59E0B" },
                    { ep: "EPISODIO 6", title: "Funciones & Poderes", icon: "✨", color: "#8B5CF6" },
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
                      <span style={{ fontSize: 26 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontFamily: FONT_MONO, fontSize: 15, color: item.color, fontWeight: 800 }}>
                          {item.ep}
                        </div>
                        <div style={{ fontFamily: FONT_SANS, fontSize: 18, fontWeight: 800, color: "#1E293B" }}>
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
                      fontSize: 30,
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
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#1D4ED8",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        transform: `scale(${1 + Math.sin(frame / 12) * 0.03})`,
                      }}
                    >
                      <span>🔖</span>
                      <span>Guardar</span>
                    </div>

                    <div
                      style={{
                        background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                        borderRadius: 14,
                        padding: "14px 36px",
                        fontFamily: FONT_SANS,
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        boxShadow: "0 6px 20px rgba(37, 99, 235, 0.35)",
                        transform: `scale(${1 + Math.cos(frame / 12) * 0.03})`,
                      }}
                    >
                      <span>➕</span>
                      <span>Seguir</span>
                    </div>
                  </div>
                </div>

                {/* PIE DE COMUNIDAD SANTI.DEV */}
                <div style={{ textAlign: "center", marginTop: 4 }}>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#94A3B8",
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
