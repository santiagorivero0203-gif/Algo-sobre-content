/**
 * =====================================================================
 * PYQUEST · EPISODIO 2: "VARIABLES Y TIPOS DE DATOS: EL ADN DE TU HÉROE"
 * =====================================================================
 * Nivel de producción: Studio-grade (Apple, Linear & Vercel design system).
 * Resolución: 1080x1920 (Vertical 9:16) @ 60 FPS.
 * Duración Total: 75 segundos exactos (4500 frames).
 * 
 * Reglas de diseño maestras:
 * 1. Fondos dinámicos ultra perceptibles con transiciones cromáticas por escena.
 * 2. Fuentes grandes (>= 24px en tags, 28-36px en textos y código) legibles en móvil.
 * 3. 2.5D perspective con inclinaciones sutiles y flotación continua (Regla 90f).
 * 4. Micro-animaciones en todo momento: orbes vivos, buses de datos pulsantes, barras de vida reactivas.
 * 5. Cero pantallas vacías: estructura elástica vertical optimizada para el feed de TikTok.
 * =====================================================================
 */

import React from "react";
import {
  AbsoluteFill,
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
// COMPONENTE 1: ATMÓSFERA Y FONDO REACTIVO DINÁMICO (2.5D)
// =====================================================================
const AtmosphereBackground: React.FC<{ frame: number }> = ({ frame }) => {
  // Transiciones de color base dominantes e intensamente visibles entre fases:
  const bgBase = interpolateColors(
    frame,
    [0, 200, 260, 480, 520, 1400, 1460, 2720, 2780, 3680, 3740, 4500],
    [
      "#FECDD3", // f0 - f200: Alerta rosa / advertencia del error inicial
      "#FECDD3",
      "#FDA4AF", // f260 - f480: Carmesí error de tipos explosivo
      "#FDA4AF",
      "#BAE6FD", // f520 - f1400: Cyber cyan tecnológico (Anatomía de la RAM)
      "#BAE6FD",
      "#DDD6FE", // f1460 - f2720: Púrpura eléctrico / índigo (4 Tipos Primitivos)
      "#DDD6FE",
      "#A7F3D0", // f2780 - f3680: Menta / esmeralda fresca (Resolución y Ataque Real)
      "#A7F3D0",
      "#FEF3C7", // f3740 - f4500: Ámbar / dorado brillante (Cliffhanger vida negativa & Level Up)
      "#FDE68A",
    ]
  );

  const bgSecond = interpolateColors(
    frame,
    [0, 300, 520, 1460, 2780, 3740],
    [
      "#F43F5E", // Rosa intenso
      "#E11D48", // Carmesí profundo
      "#38BDF8", // Cyan brillante
      "#818CF8", // Índigo brillante
      "#34D399", // Esmeralda saturado
      "#F59E0B", // Ámbar dorado
    ]
  );

  // Orbes reactivos volumétricos
  const orb1Color = interpolateColors(
    frame,
    [0, 300, 520, 1460, 2780, 3740],
    [
      "rgba(225, 29, 72, 0.55)",  // Rojo alerta
      "rgba(190, 18, 60, 0.65)",  // Rojo sangre
      "rgba(14, 165, 233, 0.55)", // Cyan chip
      "rgba(124, 58, 237, 0.55)", // Púrpura magia
      "rgba(5, 150, 105, 0.55)",  // Esmeralda combate
      "rgba(217, 119, 6, 0.55)",  // Oro nivel 3
    ]
  );

  const orb2Color = interpolateColors(
    frame,
    [0, 300, 520, 1460, 2780, 3740],
    [
      "rgba(251, 113, 133, 0.45)",
      "rgba(239, 68, 68, 0.55)",
      "rgba(59, 130, 246, 0.50)",
      "rgba(147, 51, 234, 0.45)",
      "rgba(16, 185, 129, 0.50)",
      "rgba(245, 158, 11, 0.50)",
    ]
  );

  const orb1X = Math.sin(frame / 30) * 140;
  const orb1Y = Math.cos(frame / 38) * 120;
  const orb2X = Math.cos(frame / 26) * -150;
  const orb2Y = Math.sin(frame / 34) * 130;

  const lightCenterX = 50 + Math.sin(frame / 42) * 22;
  const lightCenterY = 40 + Math.cos(frame / 36) * 18;

  const gridOffset = (frame * 0.9) % 48;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* 1. Gradiente radial reactivo cromático */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          background: `radial-gradient(circle at ${lightCenterX}% ${lightCenterY}%, ${bgBase} 0%, ${bgSecond} 100%)`,
        }}
      />

      {/* 2. Orbe volumétrico 1 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: "22%",
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orb1Color} 0%, rgba(255,255,255,0) 70%)`,
          filter: "blur(65px)",
          transform: `translate(${orb1X}px, ${orb1Y}px)`,
          pointerEvents: "none",
        }}
      />

      {/* 3. Orbe volumétrico 2 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "12%",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orb2Color} 0%, rgba(255,255,255,0) 70%)`,
          filter: "blur(75px)",
          transform: `translate(${orb2X}px, ${orb2Y}px)`,
          pointerEvents: "none",
        }}
      />

      {/* 4. Trama de micropuntos técnicos */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          backgroundImage: "radial-gradient(rgba(15, 23, 42, 0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
          backgroundPosition: `${gridOffset}px ${gridOffset}px`,
          opacity: 0.65,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// =====================================================================
// COMPONENTE 2: AVATAR ILUSTRADO DE ARIA CON EMOCIONES VIVAS
// =====================================================================
const AriaAvatar: React.FC<{ frame: number; size?: number; mood?: "normal" | "shocked" | "strong" | "happy" }> = ({
  frame,
  size = 96,
  mood = "normal",
}) => {
  const float = Math.sin(frame / 12) * 4;
  const eyeBlink = frame % 160 < 6;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
        border: "3.5px solid #3B82F6",
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `translateY(${float}px)`,
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 64 64" fill="none">
        {/* Cabello azul héroe */}
        <path
          d="M 12 36 C 8 20 18 8 32 8 C 46 8 56 20 52 36 C 50 28 46 16 32 16 C 18 16 14 28 12 36 Z"
          fill="#2563EB"
        />
        {/* Cara */}
        <circle cx="32" cy="34" r="18" fill="#FDE047" />
        <circle cx="25" cy="38" r="3" fill="#FCA5A5" opacity="0.6" />
        <circle cx="39" cy="38" r="3" fill="#FCA5A5" opacity="0.6" />

        {/* Ojos reactivos */}
        {mood === "shocked" ? (
          <>
            <circle cx="26" cy="32" r="4.5" fill="#1E293B" />
            <circle cx="38" cy="32" r="4.5" fill="#1E293B" />
            <circle cx="28" cy="30" r="1.5" fill="#FFFFFF" />
            <circle cx="40" cy="30" r="1.5" fill="#FFFFFF" />
            <ellipse cx="32" cy="42" rx="4" ry="5" fill="#BE123C" />
          </>
        ) : eyeBlink ? (
          <>
            <line x1="23" y1="33" x2="29" y2="33" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <line x1="35" y1="33" x2="41" y2="33" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <path d="M 27 40 Q 32 44 37 40" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="26" cy="32" rx="3" ry="4" fill="#1E293B" />
            <ellipse cx="38" cy="32" rx="3" ry="4" fill="#1E293B" />
            <circle cx="27" cy="31" r="1.2" fill="#FFFFFF" />
            <circle cx="39" cy="31" r="1.2" fill="#FFFFFF" />
            <path
              d={mood === "happy" ? "M 25 39 Q 32 47 39 39" : "M 27 40 Q 32 44 37 40"}
              stroke="#1E293B"
              strokeWidth="2.5"
              fill={mood === "happy" ? "#BE123C" : "none"}
              strokeLinecap="round"
            />
          </>
        )}

        {/* Corona de Héroe PyQuest */}
        <path d="M 22 14 L 26 20 L 32 12 L 38 20 L 42 14 L 38 22 L 26 22 Z" fill="#F59E0B" />
      </svg>

      {/* Indicador de estado */}
      <div
        style={{
          position: "absolute",
          bottom: -2,
          right: -2,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: mood === "shocked" ? "#EF4444" : "#10B981",
          border: "3px solid #FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          color: "#FFFFFF",
          fontWeight: 900,
        }}
      >
        {mood === "shocked" ? "!" : "✓"}
      </div>
    </div>
  );
};

// =====================================================================
// COMPONENTE PRINCIPAL: PYQUEST EPISODIO 2
// =====================================================================
export const PyQuestEp02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Movimiento perpetuo de la cámara 2.5D
  const perpetualFloatY = Math.sin(frame / 20) * 10;
  const perpetualTilt = Math.sin(frame / 24) * 0.8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        fontFamily: FONT_SANS,
        overflow: "hidden",
        perspective: 1400,
      }}
    >
      {/* 1. Fondo reactivo con transiciones de color marcadas */}
      <AtmosphereBackground frame={frame} />

      {/* 2. Sistema de efectos de sonido determinista */}
      <PyQuestSfx name="whoosh-short" from={10} volume={0.4} />
      <PyQuestSfx name="error" from={180} volume={0.5} />
      <PyQuestSfx name="click" from={540} volume={0.35} />
      <PyQuestSfx name="sparkle" from={1500} volume={0.35} />
      <PyQuestSfx name="sparkle" from={1680} volume={0.35} />
      <PyQuestSfx name="sparkle" from={1860} volume={0.35} />
      <PyQuestSfx name="sparkle" from={2040} volume={0.35} />
      <PyQuestSfx name="chime" from={2820} volume={0.4} />
      <PyQuestSfx name="impact-bass-1" from={3140} volume={0.45} />
      <PyQuestSfx name="sparkle" from={3980} volume={0.45} />

      {/* ================================================================ */}
      {/* ESCENA 1: EL ERROR QUE DESTRUYE TU JUEGO (f0 - f480 / 0:00 - 0:08) */}
      {/* ================================================================ */}
      {frame < 520 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* TITULAR DEL GANCHO */}
          {(() => {
            const enterTitle = spring({
              frame,
              fps,
              config: { damping: 13, stiffness: 120 },
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 175,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  textAlign: "center",
                  opacity: enterTitle,
                  transform: `translateY(${(1 - enterTitle) * 30}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#BE123C",
                    background: "#FFE4E6",
                    border: "2px solid #FDA4AF",
                    padding: "8px 24px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-block",
                    marginBottom: 16,
                  }}
                >
                  ⚠️ Error Crítico de Principiante
                </span>

                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#0F172A",
                    lineHeight: 1.22,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Poner números entre comillas{" "}
                  <span
                    style={{
                      color: "#E11D48",
                      background: "#FFFFFF",
                      padding: "4px 16px",
                      borderRadius: 16,
                      boxShadow: "0 6px 20px rgba(225, 29, 72, 0.2)",
                      display: "inline-block",
                      transform: `rotate(${Math.sin(frame / 15) * 2}deg)`,
                    }}
                  >
                    rompe tu juego
                  </span>
                </div>
              </div>
            );
          })()}

          {/* TARJETA DE CÓDIGO CON EL ERROR EN VIVO */}
          {(() => {
            const enterCard = spring({
              frame: frame - 40,
              fps,
              config: { damping: 14, stiffness: 110 },
            });

            // Temblor de pantalla cuando explota el error a frame 180
            const shake = frame >= 180 && frame <= 240
              ? Math.sin(frame * 2.2) * 12 * interpolate(frame, [180, 240], [1, 0])
              : 0;

            const isExploded = frame >= 180;

            return (
              <div
                style={{
                  position: "absolute",
                  top: 450 + perpetualFloatY + shake,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  background: "#181C28",
                  borderRadius: 24,
                  padding: "26px 36px",
                  boxSizing: "border-box",
                  boxShadow: isExploded
                    ? "0 30px 70px -10px rgba(225, 29, 72, 0.4), 0 0 30px rgba(239, 68, 68, 0.3)"
                    : "0 25px 60px -10px rgba(0,0,0,0.18)",
                  border: `2px solid ${isExploded ? "#EF4444" : "rgba(255,255,255,0.1)"}`,
                  transform: `scale(${0.92 + enterCard * 0.08}) rotateZ(${perpetualTilt}deg)`,
                  opacity: enterCard,
                  zIndex: 20,
                }}
              >
                {/* Cabecera del archivo */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    paddingBottom: 14,
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF5F56" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FFBD2E" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#27C93F" }} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Img src={staticFile("assets/logos/python.svg")} style={{ width: 26, height: 26 }} />
                    <span style={{ fontFamily: FONT_MONO, fontSize: 26, color: "#94A3B8", fontWeight: 700 }}>
                      combate.py
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 22,
                      fontWeight: 800,
                      color: isExploded ? "#EF4444" : "#F59E0B",
                    }}
                  >
                    {isExploded ? "ERROR" : "EDITANDO"}
                  </span>
                </div>

                {/* Líneas de código con énfasis visual */}
                <div style={{ fontFamily: FONT_MONO, fontSize: 34, lineHeight: 1.6, color: "#F8FAFC" }}>
                  <div>
                    <span style={{ color: "#F8FAFC" }}>vida = </span>
                    {/* El error: "100" como string */}
                    <span
                      style={{
                        color: "#F59E0B",
                        background: "rgba(245, 158, 11, 0.2)",
                        padding: "2px 10px",
                        borderRadius: 8,
                        border: "2px dashed #F59E0B",
                        fontWeight: 800,
                      }}
                    >
                      "100"
                    </span>
                    <span style={{ color: "#EF4444", marginLeft: 16, fontSize: 26 }}>
                      👈 ¡Comillas = Texto!
                    </span>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <span style={{ color: "#F8FAFC" }}>vida = vida - 20</span>
                    <span style={{ color: "#64748B", marginLeft: 16, fontSize: 24 }}>
                      # Daño del Goblin
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* EXPLOSIÓN Y TERMINAL DE ERROR TYPEERROR (Entra en frame 180) */}
          {frame >= 180 && (
            (() => {
              const enterError = spring({
                frame: frame - 180,
                fps,
                config: { damping: 12, stiffness: 130 },
              });

              return (
                <div
                  style={{
                    position: "absolute",
                    top: 730 + perpetualFloatY,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "rgba(254, 242, 242, 0.96)",
                    border: "3px solid #EF4444",
                    borderRadius: 24,
                    padding: "26px 34px",
                    boxSizing: "border-box",
                    boxShadow: "0 25px 60px -10px rgba(239, 68, 68, 0.35)",
                    transform: `scale(${0.9 + enterError * 0.1})`,
                    opacity: enterError,
                    zIndex: 25,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontFamily: FONT_MONO,
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#991B1B",
                      borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
                      paddingBottom: 10,
                      marginBottom: 14,
                    }}
                  >
                    <span>💥 TypeError: Excepción no controlada</span>
                  </div>

                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 30,
                      fontWeight: 800,
                      color: "#B91C1C",
                      lineHeight: 1.4,
                    }}
                  >
                    TypeError: unsupported operand type(s) for -:{" "}
                    <span style={{ background: "#FEE2E2", padding: "2px 8px", borderRadius: 6 }}>'str'</span> y{" "}
                    <span style={{ background: "#FEE2E2", padding: "2px 8px", borderRadius: 6 }}>'int'</span>
                  </div>

                  <div
                    style={{
                      marginTop: 14,
                      fontFamily: FONT_SANS,
                      fontSize: 26,
                      fontWeight: 700,
                      color: "#7F1D1D",
                    }}
                  >
                    🚫 Python no puede restar matemáticas a un texto ("100" - 20).
                  </div>
                </div>
              );
            })()
          )}

          {/* FICHA INFERIOR DE ARIA AFECTADA */}
          {frame >= 195 && (
            (() => {
              const enterAriaCard = spring({
                frame: frame - 195,
                fps,
                config: { damping: 14, stiffness: 110 },
              });

              return (
                <div
                  style={{
                    position: "absolute",
                    top: 1080 + perpetualFloatY * 0.5,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "24px 30px",
                    boxShadow: "0 20px 50px -10px rgba(0,0,0,0.1)",
                    border: "2px solid rgba(239, 68, 68, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                    opacity: enterAriaCard,
                    transform: `translateY(${(1 - enterAriaCard) * 30}px)`,
                    zIndex: 22,
                  }}
                >
                  <AriaAvatar frame={frame} size={84} mood="shocked" />

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 900, color: "#0F172A" }}>
                        Aria · Juego Congelado
                      </span>
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 22,
                          fontWeight: 900,
                          color: "#EF4444",
                          background: "#FEE2E2",
                          padding: "4px 14px",
                          borderRadius: 8,
                        }}
                      >
                        CRASH
                      </span>
                    </div>

                    <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 700, color: "#64748B" }}>
                      Para la computadora, "100" es una palabra como "dragón", no una cantidad.
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 2: ANATOMÍA DE LA MEMORIA RAM (f480 - f1440 / 0:08 - 0:24) */}
      {/* ================================================================ */}
      {frame >= 480 && frame < 1480 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* TITULAR PEDAGÓGICO */}
          {(() => {
            const enterTitle = spring({
              frame: frame - 500,
              fps,
              config: { damping: 14, stiffness: 120 },
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 175,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  textAlign: "center",
                  opacity: enterTitle,
                  transform: `translateY(${(1 - enterTitle) * 25}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#0369A1",
                    background: "#E0F2FE",
                    border: "2px solid #38BDF8",
                    padding: "8px 24px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-block",
                    marginBottom: 16,
                  }}
                >
                  🧠 ¿Qué es una Variable en Realidad?
                </span>

                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#0F172A",
                    lineHeight: 1.22,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Una variable es una{" "}
                  <span
                    style={{
                      color: "#0284C7",
                      background: "#FFFFFF",
                      padding: "4px 16px",
                      borderRadius: 16,
                      boxShadow: "0 6px 20px rgba(2, 132, 199, 0.2)",
                      display: "inline-block",
                      transform: `rotate(${Math.sin(frame / 20) * 1.5}deg)`,
                    }}
                  >
                    caja etiquetada en la RAM
                  </span>
                </div>
              </div>
            );
          })()}

          {/* VISUALIZADOR 2.5D DEL CHIP DE RAM Y CAJAS DE MEMORIA */}
          {(() => {
            const enterRam = spring({
              frame: frame - 540,
              fps,
              config: { damping: 14, stiffness: 110 },
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 450 + perpetualFloatY,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  background: "#FFFFFF",
                  borderRadius: 24,
                  padding: "28px 34px",
                  boxSizing: "border-box",
                  boxShadow: "0 25px 60px -10px rgba(14, 165, 233, 0.25), 0 10px 25px rgba(0,0,0,0.06)",
                  border: "2px solid rgba(56, 189, 248, 0.5)",
                  transform: `scale(${0.92 + enterRam * 0.08}) rotateX(3deg)`,
                  opacity: enterRam,
                  zIndex: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
                  <Img
                    src={staticFile("assets/pyquest/ram_chip.svg")}
                    style={{
                      width: 90,
                      height: 90,
                      filter: "drop-shadow(0 6px 14px rgba(14, 165, 233, 0.35))",
                    }}
                  />

                  <div>
                    <div style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 900, color: "#0F172A" }}>
                      Memoria RAM Física
                    </div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#0284C7", fontWeight: 700 }}>
                      Dirección de Hardware: 0x7FFE_A104
                    </div>
                  </div>
                </div>

                {/* ANIMACIÓN DE CABLE / BUS DE DATOS ENTRANDO */}
                <div
                  style={{
                    background: "#0F172A",
                    borderRadius: 18,
                    padding: "22px 28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#94A3B8" }}>Instrucción: </span>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 32, color: "#38BDF8", fontWeight: 800 }}>
                      nombre = "Aria"
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#10B981",
                      background: "rgba(16, 185, 129, 0.2)",
                      padding: "6px 14px",
                      borderRadius: 10,
                    }}
                  >
                    Asignación (=)
                  </span>
                </div>

                {/* LAS 3 PARTES DE LA VARIABLE */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  {[
                    { label: "1. Etiqueta (Nombre)", val: "nombre", desc: "El identificador", color: "#0284C7" },
                    { label: "2. Operador Asignar", val: "=", desc: "Guarda en la caja", color: "#F59E0B" },
                    { label: "3. Valor Almacenado", val: '"Aria"', desc: "El dato real", color: "#10B981" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#F8FAFC",
                        border: "2px solid #E2E8F0",
                        borderRadius: 16,
                        padding: "16px 18px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: "#64748B", fontWeight: 700 }}>
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 32,
                          color: item.color,
                          fontWeight: 900,
                          margin: "8px 0",
                        }}
                      >
                        {item.val}
                      </div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: "#334155", fontWeight: 600 }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* TARJETA INFERIOR: METÁFORA DE LAS CAJAS EN LA MOCHILA */}
          {frame >= 640 && (
            (() => {
              const enterBox = spring({
                frame: frame - 640,
                fps,
                config: { damping: 14, stiffness: 110 },
              });

              return (
                <div
                  style={{
                    position: "absolute",
                    top: 1020 + perpetualFloatY * 0.4,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "rgba(255, 255, 255, 0.96)",
                    borderRadius: 22,
                    padding: "24px 30px",
                    boxShadow: "0 18px 45px -8px rgba(0,0,0,0.08)",
                    border: "2px solid rgba(14, 165, 233, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    opacity: enterBox,
                    transform: `translateY(${(1 - enterBox) * 30}px)`,
                    zIndex: 22,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background: "#E0F2FE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 34,
                      flexShrink: 0,
                    }}
                  >
                    📦
                  </div>

                  <div>
                    <div style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 900, color: "#0F172A" }}>
                      El signo "=" no es igualdad matemática
                    </div>
                    <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 700, color: "#475569" }}>
                      Significa: "Toma el valor de la derecha y guárdalo dentro de la caja de la izquierda".
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 3: LOS 4 TIPOS PRIMITIVOS EN PYQUEST (f1440 - f2760 / 0:24 - 0:46) */}
      {/* ================================================================ */}
      {frame >= 1440 && frame < 2780 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* TITULAR DE LOS 4 TIPOS */}
          {(() => {
            const enterTitle = spring({
              frame: frame - 1460,
              fps,
              config: { damping: 14, stiffness: 120 },
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 160,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  textAlign: "center",
                  opacity: enterTitle,
                  transform: `translateY(${(1 - enterTitle) * 25}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#6D28D9",
                    background: "#EDE9FE",
                    border: "2px solid #C4B5FD",
                    padding: "8px 24px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-block",
                    marginBottom: 12,
                  }}
                >
                  🧬 El ADN de PyQuest
                </span>

                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 46,
                    fontWeight: 900,
                    color: "#0F172A",
                    lineHeight: 1.22,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Los 4 Tipos de Datos{" "}
                  <span
                    style={{
                      color: "#7C3AED",
                      background: "#FFFFFF",
                      padding: "4px 16px",
                      borderRadius: 16,
                      boxShadow: "0 6px 20px rgba(124, 58, 237, 0.2)",
                      display: "inline-block",
                    }}
                  >
                    que controlan a tu héroe
                  </span>
                </div>
              </div>
            );
          })()}

          {/* LISTA DE 4 TARJETAS INTERACTIVAS (str, int, float, bool) */}
          <div
            style={{
              position: "absolute",
              top: 360 + perpetualFloatY * 0.4,
              left: PYQUEST_THEME.safe.side,
              width: 920,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              zIndex: 25,
            }}
          >
            {[
              {
                type: "str (String)",
                code: 'heroe = "Aria"',
                purpose: "Texto entre comillas: Nombres, diálogos y lore",
                icon: "🏷️",
                color: "#F59E0B",
                delay: 1470,
              },
              {
                type: "int (Integer)",
                code: "vida = 100",
                purpose: "Números enteros: Vida, maná, nivel y oro",
                icon: "❤️",
                color: "#10B981",
                delay: 1540,
              },
              {
                type: "float (Decimal)",
                code: "critico = 1.75",
                purpose: "Decimales con punto: Multiplicadores y velocidades",
                icon: "⚡",
                color: "#3B82F6",
                delay: 1610,
              },
              {
                type: "bool (Boolean)",
                code: "esta_viva = True",
                purpose: "Interruptor binario: Solo True o False",
                icon: "🛡️",
                color: "#8B5CF6",
                delay: 1680,
              },
            ].map((item, idx) => {
              const cardEnter = spring({
                frame: frame - item.delay,
                fps,
                config: { damping: 14, stiffness: 120 },
              });

              return (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 20,
                    padding: "20px 28px",
                    boxShadow: "0 14px 35px -8px rgba(0,0,0,0.06)",
                    border: `2px solid ${cardEnter > 0.5 ? item.color : "rgba(0,0,0,0.08)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: cardEnter,
                    transform: `translateX(${(1 - cardEnter) * 40}px)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: FONT_MONO, fontSize: 24, fontWeight: 900, color: item.color }}>
                          {item.type}
                        </span>
                      </div>

                      <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 700, color: "#334155", marginTop: 4 }}>
                        {item.purpose}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#181C28",
                      borderRadius: 12,
                      padding: "10px 18px",
                      fontFamily: FONT_MONO,
                      fontSize: 26,
                      color: "#F8FAFC",
                      fontWeight: 700,
                    }}
                  >
                    {item.code}
                  </div>
                </div>
              );
            })}
          </div>

          {/* FICHA HUD REACTIVA DE ARIA CON SUS ESTADÍSTICAS EN VIVO */}
          {frame >= 1750 && (
            (() => {
              const enterHud = spring({
                frame: frame - 1750,
                fps,
                config: { damping: 14, stiffness: 110 },
              });

              return (
                <div
                  style={{
                    position: "absolute",
                    top: 1040 + perpetualFloatY * 0.4,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "linear-gradient(135deg, #181C28 0%, #0F172A 100%)",
                    borderRadius: 24,
                    padding: "24px 32px",
                    boxShadow: "0 25px 60px -10px rgba(124, 58, 237, 0.3)",
                    border: "2px solid #8B5CF6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: enterHud,
                    transform: `translateY(${(1 - enterHud) * 30}px)`,
                    zIndex: 26,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <AriaAvatar frame={frame} size={80} mood="strong" />

                    <div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 900, color: "#FFFFFF" }}>
                        Aria · Estadísticas Activas
                      </div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: "#A78BFA", fontWeight: 700 }}>
                        str="Aria" · int=100 · float=1.75 · bool=True
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 24,
                      fontWeight: 900,
                      color: "#10B981",
                      background: "rgba(16, 185, 129, 0.2)",
                      padding: "8px 18px",
                      borderRadius: 12,
                    }}
                  >
                    LISTA PARA EL COMBATE
                  </span>
                </div>
              );
            })()
          )}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 4: RESOLUCIÓN DEL BUG & PRIMER ATAQUE REAL (f2760 - f3720 / 0:46 - 1:02) */}
      {/* ================================================================ */}
      {frame >= 2760 && frame < 3740 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* TITULAR DE ACCIÓN */}
          {(() => {
            const enterTitle = spring({
              frame: frame - 2780,
              fps,
              config: { damping: 14, stiffness: 120 },
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 175,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  textAlign: "center",
                  opacity: enterTitle,
                  transform: `translateY(${(1 - enterTitle) * 25}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#047857",
                    background: "#D1FAE5",
                    border: "2px solid #34D399",
                    padding: "8px 24px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-block",
                    marginBottom: 16,
                  }}
                >
                  ⚔️ ¡El Bug Ha Sido Eliminado!
                </span>

                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#0F172A",
                    lineHeight: 1.22,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Con números reales (int),{" "}
                  <span
                    style={{
                      color: "#059669",
                      background: "#FFFFFF",
                      padding: "4px 16px",
                      borderRadius: 16,
                      boxShadow: "0 6px 20px rgba(5, 150, 105, 0.2)",
                      display: "inline-block",
                    }}
                  >
                    las matemáticas funcionan
                  </span>
                </div>
              </div>
            );
          })()}

          {/* CÓDIGO LIMPIO SIN COMILLAS */}
          {(() => {
            const enterCode = spring({
              frame: frame - 2820,
              fps,
              config: { damping: 14, stiffness: 110 },
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 450 + perpetualFloatY,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  background: "#181C28",
                  borderRadius: 24,
                  padding: "26px 36px",
                  boxSizing: "border-box",
                  boxShadow: "0 25px 60px -10px rgba(16, 185, 129, 0.3)",
                  border: "2px solid #10B981",
                  transform: `scale(${0.92 + enterCode * 0.08}) rotateZ(${perpetualTilt}deg)`,
                  opacity: enterCode,
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    paddingBottom: 14,
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF5F56" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FFBD2E" }} />
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#27C93F" }} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Img src={staticFile("assets/logos/python.svg")} style={{ width: 26, height: 26 }} />
                    <span style={{ fontFamily: FONT_MONO, fontSize: 26, color: "#34D399", fontWeight: 700 }}>
                      motor_combate.py
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#10B981",
                      background: "rgba(16, 185, 129, 0.2)",
                      padding: "4px 12px",
                      borderRadius: 8,
                    }}
                  >
                    ✓ VÁLIDO
                  </span>
                </div>

                <div style={{ fontFamily: FONT_MONO, fontSize: 34, lineHeight: 1.6, color: "#F8FAFC" }}>
                  <div>
                    <span style={{ color: "#F8FAFC" }}>heroe = </span>
                    <span style={{ color: "#F59E0B" }}>"Aria"</span>
                  </div>
                  <div>
                    <span style={{ color: "#F8FAFC" }}>vida = </span>
                    <span style={{ color: "#10B981", fontWeight: 800 }}>100</span>
                    <span style={{ color: "#94A3B8", marginLeft: 16, fontSize: 24 }}># Entero puro</span>
                  </div>
                  <div>
                    <span style={{ color: "#F8FAFC" }}>daño = </span>
                    <span style={{ color: "#EF4444", fontWeight: 800 }}>20</span>
                  </div>
                  <div style={{ marginTop: 6, borderTop: "1px dashed rgba(255,255,255,0.15)", paddingTop: 8 }}>
                    <span style={{ color: "#F8FAFC" }}>vida = vida - daño</span>
                    <span style={{ color: "#34D399", marginLeft: 16, fontSize: 26, fontWeight: 800 }}>
                      👉 80 HP
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SIMULACIÓN DE COMBATE CON ARIA Y ESCUDO */}
          {frame >= 3060 && (
            (() => {
              const enterBattle = spring({
                frame: frame - 3060,
                fps,
                config: { damping: 14, stiffness: 110 },
              });

              // La vida baja de 100 a 80 suavemente
              const hpCurrent = interpolate(frame, [3140, 3200], [100, 80], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              const isHit = frame >= 3140 && frame <= 3180;

              return (
                <div
                  style={{
                    position: "absolute",
                    top: 860 + perpetualFloatY * 0.4,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "26px 34px",
                    boxShadow: "0 25px 60px -10px rgba(0,0,0,0.1)",
                    border: `2px solid ${isHit ? "#EF4444" : "rgba(16, 185, 129, 0.4)"}`,
                    opacity: enterBattle,
                    transform: `translateY(${(1 - enterBattle) * 30}px) scale(${isHit ? 1.02 : 1})`,
                    zIndex: 22,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <AriaAvatar frame={frame} size={84} mood={isHit ? "shocked" : "happy"} />
                      <div>
                        <div style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 900, color: "#0F172A" }}>
                          Aria · Combate Goblin
                        </div>
                        <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#059669", fontWeight: 700 }}>
                          ¡Ataque absorbido con éxito!
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 34,
                          fontWeight: 900,
                          color: hpCurrent <= 80 ? "#F59E0B" : "#10B981",
                        }}
                      >
                        {Math.round(hpCurrent)} / 100 HP
                      </span>
                      {isHit && (
                        <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#EF4444", fontWeight: 800 }}>
                          -20 DAÑO
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Barra de vida interactiva */}
                  <div
                    style={{
                      width: "100%",
                      height: 22,
                      background: "#E2E8F0",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${hpCurrent}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #10B981 0%, #34D399 100%)",
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              );
            })()
          )}

          {/* TARJETA INFERIOR: ENFRENTAMIENTO GOBLIN Y ESCUDO */}
          {frame >= 3060 && (
            (() => {
              const enterGoblin = spring({
                frame: frame - 3090,
                fps,
                config: { damping: 14, stiffness: 110 },
              });

              return (
                <div
                  style={{
                    position: "absolute",
                    top: 1120 + perpetualFloatY * 0.4,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "rgba(255, 255, 255, 0.95)",
                    borderRadius: 22,
                    padding: "22px 30px",
                    boxShadow: "0 18px 45px -8px rgba(0,0,0,0.06)",
                    border: "2px solid rgba(16, 185, 129, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: enterGoblin,
                    transform: `translateY(${(1 - enterGoblin) * 30}px)`,
                    zIndex: 22,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Img
                      src={staticFile("assets/pyquest/heart_shield.svg")}
                      style={{ width: 64, height: 64 }}
                    />
                    <div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 900, color: "#0F172A" }}>
                        Goblin de la Mazmorra (Nivel 1)
                      </div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: "#64748B", fontWeight: 700 }}>
                        daño = 20 · arma = "Daga Oxidada"
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#10B981",
                      background: "#ECFDF5",
                      padding: "8px 16px",
                      borderRadius: 10,
                      border: "1px solid #A7F3D0",
                    }}
                  >
                    DEFENSA ACTIVA
                  </span>
                </div>
              );
            })()
          )}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 5: CLIFFHANGER DE VIDA NEGATIVA & LEVEL UP 3 (f3720 - f4500 / 1:02 - 1:15) */}
      {/* ================================================================ */}
      {frame >= 3700 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {(() => {
            const enterMaster = spring({
              frame: frame - 3720,
              fps,
              config: { damping: 14, stiffness: 110 },
            });

            const xpProgress = interpolate(frame, [3760, 4000], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const isLvl3Unlocked = frame >= 3980;

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
                  gap: 20,
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
                      color: "#D97706",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    🗺️ PyQuest · Hoja de Ruta Oficial
                  </span>
                </div>

                {/* 1. FICHA DE PROGRESO DE ARIA (SUBE A NIVEL 3) */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "26px 32px",
                    boxShadow: isLvl3Unlocked
                      ? "0 25px 60px -10px rgba(245, 158, 11, 0.4)"
                      : "0 20px 45px -10px rgba(0,0,0,0.08)",
                    border: `2px solid ${isLvl3Unlocked ? "#F59E0B" : "rgba(0,0,0,0.08)"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <AriaAvatar frame={frame} size={84} mood={isLvl3Unlocked ? "happy" : "normal"} />

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
                            color: isLvl3Unlocked ? "#FFFFFF" : "#D97706",
                            background: isLvl3Unlocked ? "#F59E0B" : "#FEF3C7",
                            padding: "8px 16px",
                            borderRadius: 12,
                            transform: isLvl3Unlocked
                              ? `scale(${1 + Math.sin(frame / 6) * 0.05})`
                              : "none",
                            boxShadow: isLvl3Unlocked ? "0 4px 15px rgba(245, 158, 11, 0.4)" : "none",
                          }}
                        >
                          {isLvl3Unlocked ? "★ ¡LVL. 3 DESBLOQUEADO! ★" : "LVL. 2"}
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
                        <span>Experiencia: {Math.round(xpProgress * 10)} / 1000 XP</span>
                        <span style={{ color: isLvl3Unlocked ? "#F59E0B" : "#3B82F6" }}>
                          {isLvl3Unlocked ? "+100% COMPLETADO" : "Subiendo a Nivel 3..."}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. EL CLIFFHANGER: ¿VIDA NEGATIVA? */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                    borderRadius: 22,
                    padding: "24px 30px",
                    boxShadow: "0 20px 45px -8px rgba(59, 130, 246, 0.25)",
                    border: "2px solid #3B82F6",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 36 }}>⚡</span>
                      <div>
                        <div style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 900, color: "#1E3A8A" }}>
                          El Misterio del Episodio 3
                        </div>
                        <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#2563EB", fontWeight: 700 }}>
                          ¿Qué pasa si el goblin nos pega con 100 de daño?
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 24,
                        fontWeight: 900,
                        color: "#FFFFFF",
                        background: "#EF4444",
                        padding: "6px 18px",
                        borderRadius: 999,
                      }}
                    >
                      vida = -20 HP?!
                    </span>
                  </div>

                  <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: "#1E293B", fontWeight: 700 }}>
                    ¿Un héroe puede tener vida negativa? En el Episodio 3 aprenderemos <span style={{ color: "#2563EB", fontWeight: 900 }}>Condicionales (if / else)</span> para no permitir que el juego rompa las reglas de la lógica.
                  </div>
                </div>

                {/* 3. CHECKLIST DE EPISODIOS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: 18,
                      padding: "16px 20px",
                      border: "1px solid rgba(16, 185, 129, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 28, color: "#10B981" }}>✓</span>
                    <div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#10B981", fontWeight: 800 }}>
                        EPISODIO 1 & 2
                      </div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 800, color: "#1E293B" }}>
                        Fundamentos & Variables
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: 18,
                      padding: "16px 20px",
                      border: "2px solid #3B82F6",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 28 }}>⚔️</span>
                    <div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#3B82F6", fontWeight: 800 }}>
                        EPISODIO 3 (MAÑANA)
                      </div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 800, color: "#1E293B" }}>
                        Condicionales & Daño Real
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. CALL TO ACTION DINÁMICO */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "24px 32px",
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
                    Comenta <span style={{ color: "#2563EB" }}>"PYQUEST"</span> para enviarte el código
                    <br />y sígueme para no perderte el Episodio 3
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
                      <span>💬</span>
                      <span>Comentar</span>
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
                      <span>➕</span>
                      <span>Seguir</span>
                    </div>
                  </div>
                </div>

                {/* PIE DE COMUNIDAD SANTI.DEV */}
                <div style={{ textAlign: "center", marginTop: 2 }}>
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
