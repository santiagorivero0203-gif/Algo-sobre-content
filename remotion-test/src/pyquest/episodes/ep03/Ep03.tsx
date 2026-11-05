/**
 * =====================================================================
 * PYQUEST · EPISODIO 3: "CONDICIONALES Y COMBATE: LAS REGLAS DE LA VIDA"
 * =====================================================================
 * Nivel de producción: Studio-grade (Apple, Linear & Vercel design system).
 * Resolución: 1080x1920 (Vertical 9:16) @ 60 FPS.
 * Duración Total: 74 segundos exactos (4440 frames).
 * 
 * Reglas de diseño maestras:
 * 1. Cero emojis: 100% iconografía SVG vectorial personalizada (PyQuestIcons).
 * 2. Escritura progresiva en vivo (TypewriterText) con cursor pulsante.
 * 3. Fondo atmosférico reactivo con gradientes cromáticos por escena.
 * 4. Tipografía mobile-first de alto impacto (títulos 44-50px, código 32-36px).
 * 5. Simulación viva de RPG: Aria vs Golpe Crítico Goblin y lógica if/elif/else.
 * =====================================================================
 */

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
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
  IconBrain,
  IconCheck,
  IconCrash,
  IconPlus,
  IconProhibited,
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
  const bgBase = interpolateColors(
    frame,
    [0, 240, 480, 1560, 1620, 2880, 2940, 3840, 3900, 4440],
    [
      "#FEE2E2", // f0 - f480: Alerta carmesí suave (El absurdo de HP negativo -20)
      "#FECDD3",
      "#E0E7FF", // f480 - f1560: Índigo técnico elegante (Sintaxis if limpia y 4 espacios)
      "#E0E7FF",
      "#FEF3C7", // f1560 - f2880: Ámbar / Dorado analítico (Árbol lógico if / elif / else)
      "#FEF3C7",
      "#DCFCE7", // f2880 - f3840: Esmeralda dinámico de combate (Resolución en vivo)
      "#FEE2E2", // Impacto final del Goblin
      "#EDE9FE", // f3840 - f4440: Violeta premium (Loot dropeado y cliffhanger a Listas)
      "#EDE9FE",
    ]
  );

  const bgSecond = interpolateColors(
    frame,
    [0, 480, 1560, 2880, 3840],
    [
      "#FCA5A5", // Rojo carmesí profundo
      "#C7D2FE", // Índigo azulado
      "#FDE68A", // Amarillo ámbar
      "#BBF7D0", // Menta esmeralda
      "#DDD6FE", // Púrpura suave
    ]
  );

  const orb1Color = interpolateColors(
    frame,
    [0, 480, 1560, 2880, 3840],
    [
      "rgba(239, 68, 68, 0.45)",  // Rojo alerta
      "rgba(99, 102, 241, 0.50)", // Índigo estructura
      "rgba(245, 158, 11, 0.55)", // Ámbar decisión
      "rgba(16, 185, 129, 0.55)", // Verde combate
      "rgba(139, 92, 246, 0.55)", // Violeta loot
    ]
  );

  const orb2Color = interpolateColors(
    frame,
    [0, 480, 1560, 2880, 3840],
    [
      "rgba(185, 28, 28, 0.35)",
      "rgba(59, 130, 246, 0.40)",
      "rgba(217, 119, 6, 0.40)",
      "rgba(5, 150, 105, 0.40)",
      "rgba(109, 40, 217, 0.40)",
    ]
  );

  const gridOffset = (frame * 1.1) % 48;
  const orb1X = 220 + Math.sin(frame / 65) * 140;
  const orb1Y = 380 + Math.cos(frame / 75) * 110;
  const orb2X = 840 + Math.cos(frame / 80) * 120;
  const orb2Y = 1380 + Math.sin(frame / 70) * 130;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 25%, ${bgBase} 0%, ${bgSecond} 100%)`,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -48,
          backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.14) 2px, transparent 2px)`,
          backgroundSize: "48px 48px",
          transform: `translate(${gridOffset}px, ${gridOffset}px)`,
          opacity: 0.65,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: orb1Y,
          left: orb1X,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: orb1Color,
          filter: "blur(110px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: orb2Y,
          left: orb2X,
          width: 580,
          height: 580,
          borderRadius: "50%",
          background: orb2Color,
          filter: "blur(115px)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </AbsoluteFill>
  );
};

// =====================================================================
// COMPONENTE 2: AVATAR DE ARIA CON ESTADOS DE COMBATE
// =====================================================================
const AriaAvatar: React.FC<{
  frame: number;
  size?: number;
  mood?: "happy" | "critical" | "defeated";
}> = ({ frame, size = 84, mood = "happy" }) => {
  const breathe = Math.sin(frame / 14) * 3;
  const shake = mood === "critical" ? Math.sin(frame * 1.5) * 4 : 0;

  const bgGradient =
    mood === "defeated"
      ? "linear-gradient(135deg, #EF4444 0%, #7F1D1D 100%)"
      : mood === "critical"
      ? "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)"
      : "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bgGradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 10px 25px ${mood === "defeated" ? "rgba(239, 68, 68, 0.4)" : "rgba(37, 99, 235, 0.3)"}`,
        border: "3px solid #FFFFFF",
        transform: `translateY(${breathe}px) translateX(${shake}px)`,
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="22" r="14" fill="#FDE047" />
        {mood === "defeated" ? (
          <>
            <line x1="16" y1="18" x2="22" y2="24" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="18" x2="16" y2="24" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="26" y1="18" x2="32" y2="24" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="32" y1="18" x2="26" y2="24" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 31 Q24 28 30 31" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : mood === "critical" ? (
          <>
            <circle cx="19" cy="20" r="3" fill="#451A03" />
            <circle cx="29" cy="20" r="3" fill="#451A03" />
            <ellipse cx="24" cy="29" rx="3.5" ry="5" fill="#451A03" />
          </>
        ) : (
          <>
            <circle cx="19" cy="21" r="2.5" fill="#451A03" />
            <circle cx="29" cy="21" r="2.5" fill="#451A03" />
            <path d="M19 27 Q24 32 29 27" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
};

// =====================================================================
// COMPONENTE PRINCIPAL DEL EPISODIO 3
// =====================================================================
export const PyQuestEp03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const cameraScale = 1.0 + Math.sin(frame / 150) * 0.01;
  const perpetualFloatY = Math.sin(frame / 18) * 6;
  const perpetualTilt = Math.sin(frame / 25) * 1.2;

  // Sacudidas sísmicas cinemáticas
  const bugGlitchShake =
    frame >= 100 && frame <= 170
      ? Math.sin((frame - 100) * 2.0) * 14 * Math.max(0, 1 - (frame - 100) / 70)
      : 0;

  const hitDamageShake =
    frame >= 3200 && frame <= 3260
      ? Math.sin((frame - 3200) * 2.6) * 18 * Math.max(0, 1 - (frame - 3200) / 60)
      : 0;

  const totalCameraShakeX = bugGlitchShake + hitDamageShake;

  return (
    <AbsoluteFill
      style={{
        perspective: 1400,
        overflow: "hidden",
        transform: `translate(${totalCameraShakeX}px, 0px) scale(${cameraScale})`,
      }}
    >
      <AtmosphereBackground frame={frame} />

      {/* Cama sonora de fondo ambiental */}
      <Audio
        src={staticFile("bgm/tech_ambient_bed.mp3")}
        volume={(f) => {
          const fadeIn = Math.min(1, f / (fps * 0.8));
          const fadeOut = Math.min(1, (durationInFrames - f) / (fps * 0.8));
          return 0.09 * Math.max(0, fadeIn) * Math.max(0, fadeOut);
        }}
        loop
      />

      {/* Disparadores de audio SFX sincronizados */}
      <PyQuestSfx name="whoosh-short" from={0} volume={0.32} />
      <PyQuestSfx name="error" from={100} volume={0.44} />
      <PyQuestSfx name="impact-bass-1" from={105} volume={0.40} />
      <PyQuestSfx name="pop" from={220} volume={0.30} />

      <PyQuestSfx name="whoosh-short" from={480} volume={0.32} />
      <PyQuestSfx name="typing" from={550} volume={0.25} />
      <PyQuestSfx name="click-soft" from={800} volume={0.28} />
      <PyQuestSfx name="chime" from={1100} volume={0.36} />

      <PyQuestSfx name="whoosh-short" from={1560} volume={0.32} />
      <PyQuestSfx name="click-soft" from={1850} volume={0.28} />
      <PyQuestSfx name="click-soft" from={2200} volume={0.28} />
      <PyQuestSfx name="sparkle" from={2550} volume={0.36} />

      <PyQuestSfx name="impact-bass-1" from={2880} volume={0.42} />
      <PyQuestSfx name="error" from={3200} volume={0.45} />
      <PyQuestSfx name="impact-bass-2" from={3202} volume={0.45} />
      <PyQuestSfx name="chime" from={3500} volume={0.38} />

      <PyQuestSfx name="sparkle" from={3840} volume={0.38} />
      <PyQuestSfx name="error" from={4060} volume={0.35} />
      <PyQuestSfx name="click-soft" from={4200} volume={0.30} />

      {/* ================================================================ */}
      {/* ESCENA 1: EL ABSURDO DE LA VIDA NEGATIVA (f0 - f480 / 0:00 - 0:08) */}
      {/* ================================================================ */}
      {frame < 510 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* TÍTULO GANCHO CON SVG */}
          {(() => {
            const enterTitle = spring({
              frame: frame - 10,
              fps,
              config: { damping: 13, stiffness: 125 },
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
                    color: "#DC2626",
                    background: "#FEE2E2",
                    border: "2px solid #F87171",
                    padding: "8px 24px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <IconWarning size={24} color="#DC2626" />
                  <span>Falla Crítica de Lógica</span>
                </span>

                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#0F172A",
                    lineHeight: 1.2,
                    letterSpacing: "-0.03em",
                  }}
                >
                  ¿Puede tu héroe tener{" "}
                  <span
                    style={{
                      color: "#EF4444",
                      background: "#FFFFFF",
                      padding: "4px 16px",
                      borderRadius: 14,
                      boxShadow: "0 6px 20px rgba(239, 68, 68, 0.2)",
                      display: "inline-block",
                      transform: `rotate(${perpetualTilt * 1.5}deg)`,
                    }}
                  >
                    -20 de Vida?
                  </span>
                </div>
              </div>
            );
          })()}

          {/* TARJETA HUD CON ERROR DE VIDA NEGATIVA */}
          {(() => {
            const enterCard = spring({
              frame: frame - 60,
              fps,
              config: { damping: 13, stiffness: 110 },
            });

            const isGlitch = frame >= 100;

            return (
              <div
                style={{
                  position: "absolute",
                  top: 480 + perpetualFloatY,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  background: "#FFFFFF",
                  borderRadius: 24,
                  padding: "30px 36px",
                  boxSizing: "border-box",
                  boxShadow: isGlitch
                    ? "0 30px 65px -12px rgba(239, 68, 68, 0.45)"
                    : "0 25px 60px -10px rgba(0,0,0,0.08)",
                  border: `3px solid ${isGlitch ? "#EF4444" : "rgba(15, 23, 42, 0.08)"}`,
                  transform: `scale(${0.92 + enterCard * 0.08}) rotate(${isGlitch ? -1.5 : 0}deg)`,
                  opacity: enterCard,
                  zIndex: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <AriaAvatar frame={frame} size={86} mood={isGlitch ? "defeated" : "happy"} />
                    <div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 34, fontWeight: 900, color: "#0F172A" }}>
                        Aria · PyQuest
                      </div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#EF4444", fontWeight: 700 }}>
                        {isGlitch ? "¡ESTADO ILÓGICO: SIGUE VIVA!" : "Nivel 1 · Guerrero"}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 42,
                        fontWeight: 900,
                        color: "#EF4444",
                        textShadow: "0 4px 14px rgba(239, 68, 68, 0.3)",
                      }}
                    >
                      -20 / 100 HP
                    </span>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: "#94A3B8" }}>
                      El motor sigue corriendo
                    </div>
                  </div>
                </div>

                {/* Barra en negativo */}
                <div
                  style={{
                    width: "100%",
                    height: 22,
                    background: "#FEE2E2",
                    borderRadius: 999,
                    overflow: "hidden",
                    border: "2px solid #EF4444",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "repeating-linear-gradient(45deg, #EF4444, #EF4444 12px, #DC2626 12px, #DC2626 24px)",
                    }}
                  />
                </div>
              </div>
            );
          })()}

          {/* DIAGNÓSTICO EN VIVO */}
          {frame >= 200 && (
            <div
              style={{
                position: "absolute",
                top: 860,
                left: PYQUEST_THEME.safe.side,
                width: 920,
                background: "rgba(255, 255, 255, 0.95)",
                border: "2px solid #DC2626",
                borderRadius: 22,
                padding: "24px 32px",
                boxShadow: "0 20px 45px -10px rgba(220, 38, 38, 0.25)",
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
              <div style={{ fontFamily: FONT_SANS, fontSize: 28, fontWeight: 700, color: "#991B1B", lineHeight: 1.35 }}>
                Sin condicionales, tu juego no tiene reglas: el personaje muere pero la partida jamás se detiene.
              </div>
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 2: LA PRIMERA REGLA CONDICIONAL (f480 - f1560 / 0:08 - 0:26) */}
      {/* ================================================================ */}
      {frame >= 460 && frame < 1580 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* TITULAR DE LA REGLA IF */}
          {(() => {
            const enterTitle = spring({
              frame: frame - 480,
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
                  transform: `translateY(${(1 - enterTitle) * 20}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#4338CA",
                    background: "#EEF2FF",
                    border: "2px solid #818CF8",
                    padding: "8px 24px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <IconBrain size={24} color="#4338CA" />
                  <span>Toma de Decisiones</span>
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
                  La palabra clave <span style={{ color: "#4F46E5" }}>if</span> evalúa una pregunta
                </div>
              </div>
            );
          })()}

          {/* VENTANA DE CÓDIGO CON ESCRITURA EN VIVO Y GUÍA DE INDENTACIÓN */}
          {(() => {
            const enterCode = spring({
              frame: frame - 520,
              fps,
              config: { damping: 14, stiffness: 110 },
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 460 + perpetualFloatY,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  background: "#181C28",
                  borderRadius: 24,
                  padding: "26px 36px",
                  boxSizing: "border-box",
                  boxShadow: "0 25px 60px -10px rgba(79, 70, 229, 0.3)",
                  border: "2px solid #6366F1",
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
                    <span style={{ fontFamily: FONT_MONO, fontSize: 26, color: "#818CF8", fontWeight: 700 }}>
                      motor_reglas.py
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
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <IconCheck size={18} color="#10B981" />
                    <span>INDENTADO</span>
                  </span>
                </div>

                {/* Código con TypewriterText y guía de indentación */}
                <div style={{ fontFamily: FONT_MONO, fontSize: 34, lineHeight: 1.65, color: "#F8FAFC" }}>
                  <div>
                    {frame < 600 ? (
                      <TypewriterText
                        text="if vida <= 0:"
                        frame={frame}
                        startFrame={540}
                        durationFrames={35}
                        cursorColor="#6366F1"
                      />
                    ) : (
                      <>
                        <span style={{ color: "#818CF8", fontWeight: 800 }}>if </span>
                        <span style={{ color: "#F8FAFC" }}>vida &lt;= </span>
                        <span style={{ color: "#10B981", fontWeight: 700 }}>0</span>
                        <span style={{ color: "#94A3B8" }}>:</span>
                      </>
                    )}
                  </div>

                  {/* Bloque indentado con línea vertical cian resplandeciente */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 6,
                      paddingLeft: 44,
                      position: "relative",
                    }}
                  >
                    {/* Guía visual de 4 espacios */}
                    <div
                      style={{
                        position: "absolute",
                        left: 20,
                        top: 4,
                        bottom: 4,
                        width: 3,
                        background: "#06B6D4",
                        boxShadow: "0 0 10px #06B6D4",
                        borderRadius: 2,
                      }}
                    />

                    {frame >= 620 && (
                      <div>
                        {frame < 700 ? (
                          <TypewriterText
                            text='print("GAME OVER")'
                            frame={frame}
                            startFrame={620}
                            durationFrames={35}
                            cursorColor="#34D399"
                          />
                        ) : (
                          <>
                            <span style={{ color: "#34D399", fontWeight: 700 }}>print</span>
                            <span style={{ color: "#94A3B8" }}>(</span>
                            <span style={{ color: "#EF4444", fontWeight: 800 }}>"GAME OVER"</span>
                            <span style={{ color: "#94A3B8" }}>)</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TARJETA INFERIOR: EXPLICACIÓN DE LA REGLA DE LOS 4 ESPACIOS */}
          {frame >= 780 && (
            <div
              style={{
                position: "absolute",
                top: 860,
                left: PYQUEST_THEME.safe.side,
                width: 920,
                background: "#FFFFFF",
                borderRadius: 22,
                padding: "24px 32px",
                boxShadow: "0 20px 45px -10px rgba(0,0,0,0.08)",
                border: "2px solid rgba(6, 182, 212, 0.4)",
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
                  background: "#CFFAFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconSparkles size={32} color="#0891B2" />
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, fontWeight: 700, color: "#164E63", lineHeight: 1.35 }}>
                En Python no usamos llaves ni punto y coma: los <span style={{ color: "#0891B2", fontWeight: 900 }}>4 espacios de indentación</span> le dicen al motor exactamente a qué decisión pertenece ese bloque.
              </div>
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 3: ÁRBOL LÓGICO COMPLETO: IF / ELIF / ELSE (f1560 - f2880 / 0:26 - 0:48) */}
      {/* ================================================================ */}
      {frame >= 1540 && frame < 2900 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* TITULAR DEL ÁRBOL DE DECISIÓN */}
          {(() => {
            const enterTitle = spring({
              frame: frame - 1560,
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
                  transform: `translateY(${(1 - enterTitle) * 20}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#D97706",
                    background: "#FEF3C7",
                    border: "2px solid #FCD34D",
                    padding: "8px 24px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <IconSwords size={24} color="#D97706" />
                  <span>Árbol de Decisión Completo</span>
                </span>

                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 48,
                    fontWeight: 900,
                    color: "#0F172A",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Tres caminos con <span style={{ color: "#D97706" }}>if, elif y else</span>
                </div>
              </div>
            );
          })()}

          {/* TARJETA DE CÓDIGO CON LOS 3 BLOQUES LÓGICOS */}
          {(() => {
            const enterCode = spring({
              frame: frame - 1600,
              fps,
              config: { damping: 14, stiffness: 110 },
            });

            return (
              <div
                style={{
                  position: "absolute",
                  top: 440 + perpetualFloatY,
                  left: PYQUEST_THEME.safe.side,
                  width: 920,
                  background: "#181C28",
                  borderRadius: 24,
                  padding: "24px 34px",
                  boxSizing: "border-box",
                  boxShadow: "0 25px 60px -10px rgba(217, 119, 6, 0.25)",
                  border: "2px solid #F59E0B",
                  transform: `scale(${0.92 + enterCode * 0.08})`,
                  opacity: enterCode,
                  zIndex: 20,
                }}
              >
                <div style={{ fontFamily: FONT_MONO, fontSize: 32, lineHeight: 1.65, color: "#F8FAFC" }}>
                  {/* Rama 1: if vida <= 0 */}
                  <div style={{ borderLeft: "4px solid #EF4444", paddingLeft: 14 }}>
                    <span style={{ color: "#818CF8", fontWeight: 800 }}>if </span>
                    <span style={{ color: "#F8FAFC" }}>vida &lt;= </span>
                    <span style={{ color: "#10B981" }}>0</span>
                    <span style={{ color: "#94A3B8" }}>:</span>
                    <div style={{ paddingLeft: 30 }}>
                      <span style={{ color: "#F8FAFC" }}>estado = </span>
                      <span style={{ color: "#EF4444", fontWeight: 800 }}>"Derrotado"</span>
                    </div>
                  </div>

                  {/* Rama 2: elif vida < 30 */}
                  <div style={{ borderLeft: "4px solid #F59E0B", paddingLeft: 14, marginTop: 8 }}>
                    <span style={{ color: "#F59E0B", fontWeight: 800 }}>elif </span>
                    <span style={{ color: "#F8FAFC" }}>vida &lt; </span>
                    <span style={{ color: "#10B981" }}>30</span>
                    <span style={{ color: "#94A3B8" }}>:</span>
                    <div style={{ paddingLeft: 30 }}>
                      <span style={{ color: "#F8FAFC" }}>estado = </span>
                      <span style={{ color: "#F59E0B", fontWeight: 800 }}>"¡Peligro Crítico!"</span>
                    </div>
                  </div>

                  {/* Rama 3: else */}
                  <div style={{ borderLeft: "4px solid #10B981", paddingLeft: 14, marginTop: 8 }}>
                    <span style={{ color: "#34D399", fontWeight: 800 }}>else</span>
                    <span style={{ color: "#94A3B8" }}>:</span>
                    <div style={{ paddingLeft: 30 }}>
                      <span style={{ color: "#F8FAFC" }}>estado = </span>
                      <span style={{ color: "#34D399", fontWeight: 800 }}>"Listo para luchar"</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SIMULACIÓN INTERACTIVA DE ESTADOS DE ARIA SEGÚN HP */}
          {frame >= 1800 && (
            <div
              style={{
                position: "absolute",
                top: 920,
                left: PYQUEST_THEME.safe.side,
                width: 920,
                background: "#FFFFFF",
                borderRadius: 24,
                padding: "24px 32px",
                boxShadow: "0 20px 50px -10px rgba(0,0,0,0.08)",
                border: "2px solid rgba(15, 23, 42, 0.08)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <AriaAvatar frame={frame} size={76} mood={frame >= 2300 ? "critical" : "happy"} />
                  <div>
                    <div style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 900, color: "#0F172A" }}>
                      Evaluador de Estado en Vivo
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 24,
                        fontWeight: 800,
                        color: frame >= 2300 ? "#D97706" : "#059669",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {frame >= 2300 ? (
                        <>
                          <IconWarning size={22} color="#D97706" />
                          <span>Rama Activa: elif vida &lt; 30 (Alarma)</span>
                        </>
                      ) : (
                        <>
                          <IconCheck size={22} color="#059669" />
                          <span>Rama Activa: else (Salud Óptima)</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: frame >= 2300 ? "#FEF3C7" : "#ECFDF5",
                    border: `2px solid ${frame >= 2300 ? "#F59E0B" : "#10B981"}`,
                    padding: "10px 20px",
                    borderRadius: 14,
                    textAlign: "right",
                  }}
                >
                  <div style={{ fontFamily: FONT_MONO, fontSize: 28, fontWeight: 900, color: frame >= 2300 ? "#B45309" : "#047857" }}>
                    {frame >= 2300 ? "HP: 25 / 100" : "HP: 85 / 100"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 4: COMBATE REAL CONTRA BOSS GOBLIN (f2880 - f3840 / 0:48 - 1:04) */}
      {/* ================================================================ */}
      {frame >= 2860 && frame < 3860 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {(() => {
            const isBossDead = frame >= 3400;
            const ariaHp = isBossDead ? 70 : 100;

            return (
              <>
                {/* TITULAR DEL COMBATE */}
                <div
                  style={{
                    position: "absolute",
                    top: 175,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 24,
                      fontWeight: 900,
                      color: isBossDead ? "#047857" : "#DC2626",
                      background: isBossDead ? "#D1FAE5" : "#FEE2E2",
                      border: `2px solid ${isBossDead ? "#34D399" : "#F87171"}`,
                      padding: "8px 24px",
                      borderRadius: 999,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 16,
                    }}
                  >
                    {isBossDead ? <IconCheck size={24} color="#047857" /> : <IconSwords size={24} color="#DC2626" />}
                    <span>{isBossDead ? "¡Goblin Eliminado por la Regla!" : "Encuentro con Boss Goblin"}</span>
                  </span>

                  <div style={{ fontFamily: FONT_SANS, fontSize: 48, fontWeight: 900, color: "#0F172A" }}>
                    El código detiene el juego en el instante exacto
                  </div>
                </div>

                {/* TARJETA HUD DEL COMBATE */}
                <div
                  style={{
                    position: "absolute",
                    top: 460 + perpetualFloatY,
                    left: PYQUEST_THEME.safe.side,
                    width: 920,
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "26px 34px",
                    boxShadow: "0 25px 60px -10px rgba(0,0,0,0.1)",
                    border: `2px solid ${isBossDead ? "#10B981" : "#EF4444"}`,
                    zIndex: 22,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <AriaAvatar frame={frame} size={84} mood="happy" />
                      <div>
                        <div style={{ fontFamily: FONT_SANS, fontSize: 32, fontWeight: 900, color: "#0F172A" }}>
                          Aria (Héroe)
                        </div>
                        <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: "#059669", fontWeight: 700 }}>
                          HP: {ariaHp} / 100
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <IconShield size={32} color="#10B981" />
                      <span style={{ fontFamily: FONT_MONO, fontSize: 26, fontWeight: 800, color: "#10B981" }}>
                        VICTORIA
                      </span>
                    </div>
                  </div>

                  {/* Barra del Goblin Enemigo */}
                  <div style={{ marginTop: 12, borderTop: "1px solid #E2E8F0", paddingTop: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 800, color: "#1E293B" }}>
                        Boss Goblin de Mazmorra
                      </span>
                      <span style={{ fontFamily: FONT_MONO, fontSize: 24, fontWeight: 900, color: isBossDead ? "#EF4444" : "#B45309" }}>
                        {isBossDead ? "0 / 120 HP (DERROTADO)" : "35 / 120 HP"}
                      </span>
                    </div>

                    <div style={{ width: "100%", height: 18, background: "#E2E8F0", borderRadius: 999, overflow: "hidden" }}>
                      <div
                        style={{
                          width: isBossDead ? "0%" : "30%",
                          height: "100%",
                          background: isBossDead ? "#EF4444" : "#F59E0B",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* BANNER DE REGLA DISPARADA */}
                {isBossDead && (
                  <div
                    style={{
                      position: "absolute",
                      top: 830,
                      left: PYQUEST_THEME.safe.side,
                      width: 920,
                      background: "linear-gradient(135deg, #181C28 0%, #064E3B 100%)",
                      border: "3px solid #10B981",
                      borderRadius: 24,
                      padding: "26px 36px",
                      boxShadow: "0 25px 60px rgba(16, 185, 129, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <IconBolt size={42} color="#34D399" />
                    <div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 28, fontWeight: 900, color: "#34D399" }}>
                        if goblin_vida &lt;= 0: print("¡VICTORIA!")
                      </div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: "#D1FAE5", marginTop: 4 }}>
                        El combate terminó limpiamente gracias a una sola instrucción condicional.
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 5: CLIFFHANGER DE BOTÍN (LOOT) + CALL TO ACTION (f3840 - f4440 / 1:04 - 1:14) */}
      {/* ================================================================ */}
      {frame >= 3820 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {(() => {
            const enterMaster = spring({
              frame: frame - 3840,
              fps,
              config: { damping: 13, stiffness: 120 },
            });

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
                {/* ENCABEZADO */}
                <div style={{ textAlign: "center", marginBottom: -6 }}>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#7C3AED",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <IconBackpack size={26} color="#7C3AED" />
                    <span>¡El Jefe Soltó 10 Recompensas!</span>
                  </span>
                </div>

                {/* TARJETA DEL PROBLEMA: ¿10 VARIABLES SUELTAS? */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "24px 32px",
                    boxShadow: "0 25px 60px -10px rgba(0,0,0,0.08)",
                    border: "2px solid rgba(239, 68, 68, 0.4)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                    <IconProhibited size={32} color="#EF4444" />
                    <div style={{ fontFamily: FONT_SANS, fontSize: 30, fontWeight: 900, color: "#991B1B" }}>
                      ¿Crearás item_1, item_2, item_3... item_10?
                    </div>
                  </div>

                  <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: "#64748B", fontWeight: 700 }}>
                    ¡Jamás! En el Episodio 4 aprenderemos <span style={{ color: "#7C3AED", fontWeight: 900 }}>Listas y Diccionarios</span> para agrupar todo el inventario en una sola estructura escalable.
                  </div>
                </div>

                {/* CHECKLIST DE SERIE */}
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
                    <IconCheck size={26} color="#10B981" />
                    <div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#10B981", fontWeight: 800 }}>
                        EPISODIOS 1 - 3
                      </div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 800, color: "#1E293B" }}>
                        Variables & Lógica
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: 18,
                      padding: "16px 20px",
                      border: "2px solid #7C3AED",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <IconBackpack size={26} color="#7C3AED" />
                    <div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: "#7C3AED", fontWeight: 800 }}>
                        EPISODIO 4 (MAÑANA)
                      </div>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 24, fontWeight: 800, color: "#1E293B" }}>
                        Listas & Inventario
                      </div>
                    </div>
                  </div>
                </div>

                {/* CALL TO ACTION */}
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
                    <span style={{ color: "#7C3AED" }}>
                      Mañana construimos el inventario interactivo de Aria
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                    <div
                      style={{
                        background: "#F5F3FF",
                        border: "2px solid #7C3AED",
                        borderRadius: 14,
                        padding: "14px 30px",
                        fontFamily: FONT_SANS,
                        fontSize: 26,
                        fontWeight: 800,
                        color: "#6D28D9",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        transform: `scale(${1 + Math.sin(frame / 12) * 0.03})`,
                      }}
                    >
                      <IconBookmark size={24} color="#6D28D9" />
                      <span>Guardar</span>
                    </div>

                    <div
                      style={{
                        background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                        borderRadius: 14,
                        padding: "14px 36px",
                        fontFamily: FONT_SANS,
                        fontSize: 26,
                        fontWeight: 800,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        boxShadow: "0 6px 20px rgba(124, 58, 237, 0.35)",
                        transform: `scale(${1 + Math.cos(frame / 12) * 0.03})`,
                      }}
                    >
                      <IconPlus size={24} color="#FFFFFF" />
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
