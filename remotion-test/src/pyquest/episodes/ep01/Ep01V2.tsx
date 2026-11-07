/**
 * =====================================================================
 * PYQUEST · EPISODIO 1 (VERSIÓN 2 · RAYOS X 2.5D):
 * "¿POR QUÉ ELEGIR PYTHON PARA EMPEZAR?"
 * =====================================================================
 * Versión duplicada de respaldo con la Escena 4 refactorizada mediante
 * el sistema interactivo "Rayos X 2.5D con import rotativo" (600 frames / 10s).
 *
 * Resolución: 1080x1920 (Vertical 9:16) @ 60 FPS.
 * Duración Total: 66 segundos exactos (3960 frames).
 *   - Escena 1 (Choque de Sintaxis):      0 -  540f (9.0s)
 *   - Escena 2 (Morphing a Python):     540 - 1380f (14.0s)
 *   - Escena 3 (Motor RPG Aria vs Gob):1380 - 2520f (19.0s)
 *   - Escena 4 (Rayos X 2.5D Industry):2520 - 3120f (10.0s / 600 frames)
 *   - Escena 5 (Roadmap y CTA Ep. 2):  3120 - 3960f (14.0s)
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
// Incluye las 4 sub-fases cromáticas de la Escena 4 (2520f - 3120f)
// =====================================================================
const AtmosphereBackgroundV2: React.FC<{ frame: number }> = ({ frame }) => {
  // 1. Color de base dominante con las 4 sub-fases exactas en la Escena 4:
  //    - 2520-2670 (0-150f IA):             Violeta (#F5F3FF)
  //    - 2670-2820 (150-300f Backend):      Esmeralda (#ECFDF5)
  //    - 2820-2970 (300-450f Datos):        Azul (#EFF6FF)
  //    - 2970-3120 (450-600f Automatiz.):   Ámbar (#FFFBEB)
  const bgBase = interpolateColors(
    frame,
    [
      0, 210, 240, 540, 600, 1380, 1440, 1750, 1800, 1980, 2040, 2500,
      2520, 2655, 2675, 2805, 2825, 2955, 2975, 3115,
      3140, 3960,
    ],
    [
      "#CBD5E1", // f0 - f210: Slate técnico (Gancho inicial)
      "#CBD5E1",
      "#FECDD3", // f240 - f540: Rose / Alerta carmesí (Error en Java)
      "#FECDD3",
      "#A7F3D0", // f600 - f1380: Esmeralda (Alivio en Python)
      "#A7F3D0",
      "#BFDBFE", // f1440 - f1750: Azul mazmorra RPG (Lógica viva)
      "#BFDBFE",
      "#FED7AA", // f1800 - f1980: Ámbar impacto (Daño de Goblin)
      "#FED7AA",
      "#FCA5A5", // f2040 - f2500: Rojo crítico (Game Over)
      "#FCA5A5",
      "#F5F3FF", // Escena 4 · Sub-fase 1 (0-150f IA): Violeta (#F5F3FF)
      "#F5F3FF",
      "#ECFDF5", // Escena 4 · Sub-fase 2 (150-300f Backend): Esmeralda (#ECFDF5)
      "#ECFDF5",
      "#EFF6FF", // Escena 4 · Sub-fase 3 (300-450f Datos): Azul (#EFF6FF)
      "#EFF6FF",
      "#FFFBEB", // Escena 4 · Sub-fase 4 (450-600f Automatización): Ámbar (#FFFBEB)
      "#FFFBEB",
      "#FEF3C7", // Escena 5 (Roadmap y Aria Nivel 2)
      "#E0F2FE",
    ]
  );

  // 2. Color secundario de profundidad para gradiente reactivo
  const bgSecond = interpolateColors(
    frame,
    [
      0, 230, 600, 1440, 1800, 2040,
      2520, 2670, 2820, 2970,
      3140,
    ],
    [
      "#94A3B8",
      "#FDA4AF",
      "#6EE7B7",
      "#93C5FD",
      "#FDBA74",
      "#F87171",
      "#DDD6FE", // Glow Violeta secundario
      "#A7F3D0", // Glow Esmeralda secundario
      "#BFDBFE", // Glow Azul secundario
      "#FDE68A", // Glow Ámbar secundario
      "#FDE68A",
    ]
  );

  // Orbe 1: Sigue también los glows de la Escena 4 (#8B5CF6, #10B981, #3B82F6, #F59E0B)
  const orb1Color = interpolateColors(
    frame,
    [
      0, 230, 600, 1440, 1800, 2040,
      2520, 2670, 2820, 2970,
      3140,
    ],
    [
      "rgba(79, 70, 229, 0.45)",
      "rgba(220, 38, 38, 0.65)",
      "rgba(5, 150, 105, 0.55)",
      "rgba(37, 99, 235, 0.55)",
      "rgba(217, 119, 6, 0.60)",
      "rgba(220, 38, 38, 0.70)",
      "rgba(139, 92, 246, 0.45)", // #8B5CF6 (IA)
      "rgba(16, 185, 129, 0.45)", // #10B981 (Backend)
      "rgba(59, 130, 246, 0.45)", // #3B82F6 (Datos)
      "rgba(245, 158, 11, 0.45)", // #F59E0B (Automatización)
      "rgba(37, 99, 235, 0.50)",
    ]
  );

  const orb2Color = interpolateColors(
    frame,
    [
      0, 230, 600, 1440, 2040,
      2520, 2670, 2820, 2970,
      3140,
    ],
    [
      "rgba(37, 99, 235, 0.40)",
      "rgba(225, 29, 72, 0.60)",
      "rgba(16, 185, 129, 0.50)",
      "rgba(79, 70, 229, 0.50)",
      "rgba(220, 38, 38, 0.65)",
      "rgba(139, 92, 246, 0.35)",
      "rgba(16, 185, 129, 0.35)",
      "rgba(59, 130, 246, 0.35)",
      "rgba(245, 158, 11, 0.35)",
      "rgba(5, 150, 105, 0.45)",
    ]
  );

  const orb1X = Math.sin(frame / 32) * 140;
  const orb1Y = Math.cos(frame / 40) * 120;
  const orb2X = Math.cos(frame / 28) * -150;
  const orb2Y = Math.sin(frame / 36) * 130;

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
          opacity: 0.1,
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
          transform: `scale(${1 + Math.cos(frame / 38) * 0.1})`,
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
          background:
            "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)",
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
            <path
              d="M18 21 L22 25 M22 21 L18 25"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M26 21 L30 25 M30 21 L26 25"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        ) : isDamaged ? (
          <>
            <path
              d="M18 24 Q20 21 22 24"
              stroke="#78350F"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M26 24 Q28 21 30 24"
              stroke="#78350F"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
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
          <path
            d="M20 31 Q24 28 28 31"
            stroke="#EF4444"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        ) : isDamaged ? (
          <path
            d="M21 30 Q24 32 27 30"
            stroke="#92400E"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M20 28 Q24 33 28 28"
            stroke="#0F172A"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        )}

        <path
          d="M14 17 L24 10 L34 17 L30 20 L24 16 L18 20 Z"
          fill="#3B82F6"
        />
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
        <path d="M8 20 L16 26 L12 30 Z" fill="#15803D" />
        <path d="M40 20 L32 26 L36 30 Z" fill="#15803D" />
        <circle cx="24" cy="24" r="14" fill="#22C55E" />
        <circle cx="19" cy="22" r="3" fill="#FACC15" />
        <circle cx="29" cy="22" r="3" fill="#FACC15" />
        <circle cx="20" cy="22" r="1.5" fill="#713F12" />
        <circle cx="28" cy="22" r="1.5" fill="#713F12" />
        <path d="M19 28 L21 31 L23 28 Z" fill="#FFFFFF" />
        <path d="M25 28 L27 31 L29 28 Z" fill="#FFFFFF" />
        <path
          d="M18 28 Q24 29 30 28"
          stroke="#14532D"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// =====================================================================
// ESCENA 4 REFACTORIZADA: SISTEMA INTERACTIVO "RAYOS X 2.5D CON IMPORT ROTATIVO"
// Duración: 600 frames exactos (10.0 segundos @ 60 FPS)
// Sub-fases de 150 frames cada una:
//   1. 0 - 150f   (IA):             Violeta (#F5F3FF)   | Glow #8B5CF6
//   2. 150 - 300f (Backend):        Esmeralda (#ECFDF5) | Glow #10B981
//   3. 300 - 450f (Datos):          Azul (#EFF6FF)      | Glow #3B82F6
//   4. 450 - 600f (Automatización): Ámbar (#FFFBEB)     | Glow #F59E0B
// =====================================================================

interface ImportPhaseItem {
  id: string;
  keyword: string;
  moduleText: string;
  commentText: string;
  glow: string;
  bgTint: string;
  phaseBadge: string;
}

const IMPORT_PHASES: ImportPhaseItem[] = [
  {
    id: "ia",
    keyword: "import",
    moduleText: "openai, torch",
    commentText: "# IA Activa",
    glow: "#8B5CF6",
    bgTint: "#F5F3FF",
    phaseBadge: "FASE 01 · IA & REDES NEURONALES",
  },
  {
    id: "backend",
    keyword: "import",
    moduleText: "fastapi",
    commentText: "# Backend Masivo",
    glow: "#10B981",
    bgTint: "#ECFDF5",
    phaseBadge: "FASE 02 · BACKEND DE ALTA ESCALA",
  },
  {
    id: "data",
    keyword: "import",
    moduleText: "pandas as pd",
    commentText: "# Big Data",
    glow: "#3B82F6",
    bgTint: "#EFF6FF",
    phaseBadge: "FASE 03 · CIENCIA DE DATOS & BI",
  },
  {
    id: "automation",
    keyword: "import",
    moduleText: "playwright",
    commentText: "# Bots 24/7",
    glow: "#F59E0B",
    bgTint: "#FFFBEB",
    phaseBadge: "FASE 04 · AUTOMATIZACIÓN & ECOSISTEMA",
  },
];

// ---------------------------------------------------------------------
// A. ZONA SUPERIOR (Y: 220px): <DynamicImportCard />
// Ventana de código oscura compacta (width: 860px, height: 150px, borderRadius: 24px)
// con efecto carrete vertical (translateY + opacity con spring) cada 150 frames.
// ---------------------------------------------------------------------
export const DynamicImportCard: React.FC<{
  localFrame: number;
  fps: number;
  activeGlow: string;
}> = ({ localFrame, fps, activeGlow }) => {
  // Progreso acumulativo de carrete mediante springs en los cortes 150f, 300f y 450f
  const step1 =
    localFrame >= 150
      ? spring({
          frame: localFrame - 150,
          fps,
          config: { damping: 13, stiffness: 130 },
        })
      : 0;
  const step2 =
    localFrame >= 300
      ? spring({
          frame: localFrame - 300,
          fps,
          config: { damping: 13, stiffness: 130 },
        })
      : 0;
  const step3 =
    localFrame >= 450
      ? spring({
          frame: localFrame - 450,
          fps,
          config: { damping: 13, stiffness: 130 },
        })
      : 0;

  const reelPosition = step1 + step2 + step3; // Evoluciona de 0 -> 1 -> 2 -> 3
  const phaseIndex = Math.min(3, Math.floor(localFrame / 150));
  const phaseFrame = localFrame - phaseIndex * 150;

  // Barra de progreso interna continua durante los 150 frames de la sub-fase
  const subPhaseProgress = interpolate(phaseFrame, [0, 150], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flotación sutil continua
  const cardFloat = Math.sin(localFrame / 15) * 3;

  return (
    <div
      style={{
        position: "absolute",
        top: 220 + cardFloat,
        left: 110, // Centrado en 1080px: (1080 - 860) / 2 = 110px
        width: 860,
        height: 150,
        borderRadius: 24,
        background: "linear-gradient(135deg, #0F172A 0%, #181C28 100%)",
        border: `2.5px solid ${activeGlow}`,
        boxShadow: `0 25px 60px -12px ${activeGlow}66, 0 12px 28px rgba(15, 23, 42, 0.45)`,
        boxSizing: "border-box",
        padding: "16px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        zIndex: 30,
      }}
    >
      {/* Cabecera compacta de terminal */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FF5F56",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FFBD2E",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#27C93F",
            }}
          />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 18,
              fontWeight: 700,
              color: "#94A3B8",
              marginLeft: 8,
            }}
          >
            engine_loader.py
          </span>
        </div>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 16,
            fontWeight: 800,
            color: activeGlow,
            letterSpacing: "0.06em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: activeGlow,
              boxShadow: `0 0 12px ${activeGlow}`,
              transform: `scale(${1 + Math.sin(localFrame / 4) * 0.3})`,
            }}
          />
          <span>{IMPORT_PHASES[phaseIndex].phaseBadge}</span>
        </div>
      </div>

      {/* Ventana del carrete vertical de código */}
      <div
        style={{
          position: "relative",
          height: 68,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {IMPORT_PHASES.map((item, idx) => {
          const offsetIndex = idx - reelPosition;
          const translateY = offsetIndex * 66;
          const distance = Math.abs(offsetIndex);

          const opacity = interpolate(distance, [0, 0.55, 1], [1, 0.2, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const scale = interpolate(distance, [0, 1], [1, 0.92], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                fontFamily: FONT_MONO,
                fontSize: 31,
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ color: "#38BDF8" }}>{item.keyword}</span>
                <span style={{ color: "#F8FAFC" }}>{item.moduleText}</span>
                <span
                  style={{
                    color: item.glow,
                    fontWeight: 700,
                    fontSize: 27,
                  }}
                >
                  {item.commentText}
                </span>
                {/* Cursor vivo a 60fps */}
                <span
                  style={{
                    display: "inline-block",
                    width: 11,
                    height: 32,
                    background: activeGlow,
                    borderRadius: 2,
                    opacity: 0.45 + Math.sin(localFrame / 3) * 0.55,
                    boxShadow: `0 0 10px ${activeGlow}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra inferior de progreso de sub-fase */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 4,
          width: `${subPhaseProgress}%`,
          background: activeGlow,
          boxShadow: `0 0 14px ${activeGlow}`,
        }}
      />
    </div>
  );
};

// ---------------------------------------------------------------------
// B. ZONA MEDIA (Y: 370px a 620px): <EnergyCablesSVG />
// Dos cables curvos SVG que salen de la base de <DynamicImportCard />
// y entran al centro de la tarjeta inferior con pulsos continuos.
// ---------------------------------------------------------------------
export const EnergyCablesSVG: React.FC<{
  localFrame: number;
  activeGlow: string;
}> = ({ localFrame, activeGlow }) => {
  // Oscilación sutil en los puntos de control de las curvas Bézier para mantener vida orgánica
  const curveShift = Math.sin(localFrame / 14) * 14;

  const leftPath = `M 370 0 C ${370 - curveShift} 125, ${
    475 + curveShift
  } 125, 475 250`;
  const rightPath = `M 710 0 C ${710 + curveShift} 125, ${
    605 - curveShift
  } 125, 605 250`;

  return (
    <svg
      width="1080"
      height="250"
      viewBox="0 0 1080 250"
      fill="none"
      style={{
        position: "absolute",
        top: 370,
        left: 0,
        width: 1080,
        height: 250,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {/* Sombra conductora de base */}
      <path
        d={leftPath}
        stroke="rgba(15, 23, 42, 0.18)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d={rightPath}
        stroke="rgba(15, 23, 42, 0.18)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Línea guía activa semitransparente */}
      <path
        d={leftPath}
        stroke={activeGlow}
        strokeOpacity="0.28"
        strokeWidth="4"
      />
      <path
        d={rightPath}
        stroke={activeGlow}
        strokeOpacity="0.28"
        strokeWidth="4"
      />

      {/* Pulsos de luz primarios con strokeDasharray="30 180" y strokeDashoffset={-frame * 8} */}
      <path
        d={leftPath}
        stroke={activeGlow}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="30 180"
        strokeDashoffset={-localFrame * 8}
        style={{
          filter: `drop-shadow(0 0 10px ${activeGlow})`,
        }}
      />
      <path
        d={rightPath}
        stroke={activeGlow}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="30 180"
        strokeDashoffset={-localFrame * 8}
        style={{
          filter: `drop-shadow(0 0 10px ${activeGlow})`,
        }}
      />

      {/* Pulsos secundarios desfasados para flujo continuo ininterrumpido */}
      <path
        d={leftPath}
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="30 180"
        strokeDashoffset={-localFrame * 8 - 90}
      />
      <path
        d={rightPath}
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="30 180"
        strokeDashoffset={-localFrame * 8 - 90}
      />

      {/* Nodos de anclaje superiores (base de DynamicImportCard) */}
      <circle cx="370" cy="4" r="8" fill={activeGlow} />
      <circle cx="710" cy="4" r="8" fill={activeGlow} />

      {/* Nodos de inyección inferiores (entrada a XRayInteractiveStage) */}
      <circle
        cx="475"
        cy="244"
        r={8 + Math.sin(localFrame / 5) * 2.5}
        fill={activeGlow}
      />
      <circle
        cx="605"
        cy="244"
        r={8 + Math.cos(localFrame / 5) * 2.5}
        fill={activeGlow}
      />
    </svg>
  );
};

// ---------------------------------------------------------------------
// C. ZONA CENTRAL-INFERIOR (Y: 620px): <XRayInteractiveStage />
// Contenedor con perspective: 1400px y flotación perpetua (Math.sin(frame / 18) * 8).
// Renderiza UNA tarjeta maestra en 2.5D (900x680, rotateX(8deg), rotateZ(-1.5deg))
// dividida en 2 capas superpuestas con desfase (translateZ / sombra profunda)
// para lograr el efecto "Rayos X".
// ---------------------------------------------------------------------
export const XRayInteractiveStage: React.FC<{
  localFrame: number;
  fps: number;
  activeGlow: string;
}> = ({ localFrame, fps, activeGlow }) => {
  const phaseIndex = Math.min(3, Math.floor(localFrame / 150));
  const phaseFrame = localFrame - phaseIndex * 150;

  // Flotación perpetua obligatoria: Math.sin(frame / 18) * 8
  const floatY = Math.sin(localFrame / 18) * 8;

  // Transformación con spring({ damping: 12, stiffness: 120 }) en cada cambio de sub-fase (cada 150f)
  const stageSpring = spring({
    frame: phaseFrame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const frontScale = interpolate(stageSpring, [0, 1], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const frontTranslateY = interpolate(stageSpring, [0, 1], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Métricas en vivo para la Placa de Motor Python (Capa Fondo)
  const cpuLoad = Math.round(78 + Math.sin(localFrame / 7) * 14);
  const memAllocated = (4.2 + Math.cos(localFrame / 11) * 0.6).toFixed(2);
  const opsCounter = Math.round(
    interpolate(localFrame, [0, 600], [12400, 98600], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 620 + floatY,
        left: 90, // Centrado en 1080px: (1080 - 900) / 2 = 90px
        width: 900,
        height: 680,
        perspective: 1400,
        zIndex: 25,
      }}
    >
      {/* TARJETA MAESTRA EN 2.5D CON DOS CAPAS SUPERPUESTAS (RAYOS X) */}
      <div
        style={{
          position: "relative",
          width: 900,
          height: 680,
          transformStyle: "preserve-3d",
          transform: "rotateX(8deg) rotateZ(-1.5deg)",
        }}
      >
        {/* ============================================================ */}
        {/* CAPA FONDO (PLACA DE MOTOR PYTHON · BACKPLATE #0F172A)       */}
        {/* Desfasada espacialmente para crear profundidad Rayos X 2.5D  */}
        {/* ============================================================ */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 900,
            height: 700,
            borderRadius: 30,
            background: "#0F172A",
            border: `2.5px solid ${activeGlow}`,
            boxShadow: `0 55px 110px -20px rgba(15, 23, 42, 0.72), 0 0 70px -10px ${activeGlow}77`,
            transform: "translate3d(28px, 74px, -65px)",
            padding: "24px 34px 18px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {/* Rejilla de circuito impreso en movimiento */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              backgroundPosition: `${-localFrame * 0.8}px ${localFrame * 0.5}px`,
              pointerEvents: "none",
            }}
          />

          {/* Telemetría superior de la placa Python */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: FONT_MONO,
              fontSize: 16,
              color: "#64748B",
              letterSpacing: "0.08em",
            }}
          >
            <span>PYTHON 3.12 C-RUNTIME // X-RAY CORE</span>
            <span style={{ color: activeGlow, fontWeight: 800 }}>
              OPS/F: {opsCounter.toLocaleString()}
            </span>
          </div>

          {/* Marca de agua de circuito central visible por translucidez */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: 0.42,
              padding: "0 20px",
            }}
          >
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 22,
                fontWeight: 800,
                color: activeGlow,
              }}
            >
              [C-API BRIDGE: ACTIVE]
              <br />
              [MEM_POOL: {memAllocated} GB]
              <br />
              [THREAD_LOAD: {cpuLoad}%]
            </div>
            <svg width="260" height="90" viewBox="0 0 260 90">
              <path
                d={`M 0 45 Q 32 ${
                  45 + Math.sin(localFrame / 4) * 32
                }, 65 45 T 130 45 T 195 45 T 260 45`}
                fill="none"
                stroke={activeGlow}
                strokeWidth="4"
              />
            </svg>
          </div>

          {/* Dock de Telemetría Inferior 100% visible bajo el desfase 2.5D */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: FONT_MONO,
              fontSize: 18,
              fontWeight: 800,
              color: "#E2E8F0",
              background: "rgba(30, 41, 59, 0.85)",
              border: `1px solid ${activeGlow}55`,
              borderRadius: 14,
              padding: "12px 20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: activeGlow,
                  boxShadow: `0 0 12px ${activeGlow}`,
                }}
              />
              <span style={{ color: "#F8FAFC" }}>
                PLACA DE MOTOR PYTHON · TELEMETRÍA EN VIVO
              </span>
            </div>
            <span style={{ color: activeGlow }}>
              CPU {cpuLoad}% · {memAllocated}GB RAM · {opsCounter.toLocaleString()} OPS
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CAPA FRONTAL (UI DE LA APP EN RAYOS X · TRANSLÚCIDA)         */}
        {/* rgba(255,255,255,0.92) + backdropFilter: blur(16px)          */}
        {/* ============================================================ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: 900,
            height: 680,
            borderRadius: 28,
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `2.5px solid ${activeGlow}`,
            boxShadow: `0 30px 65px -15px ${activeGlow}55, inset 0 1px 0 rgba(255, 255, 255, 0.9)`,
            padding: "32px 38px",
            boxSizing: "border-box",
            transform: `translateY(${frontTranslateY}px) scale(${frontScale})`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {/* ---------------------------------------------------------- */}
          {/* SUB-FASE 1 (0 - 150f): IA (OpenAI / DeepSeek / PyTorch)    */}
          {/* Nodos neuronales SVG latiendo + burbuja de chat a 60fps    */}
          {/* ---------------------------------------------------------- */}
          {phaseIndex === 0 && (
            <>
              {/* Cabecera Sub-fase IA */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 18,
                      background: "#F5F3FF",
                      border: "2px solid #8B5CF6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      boxSizing: "border-box",
                    }}
                  >
                    <Img
                      src={staticFile("assets/logos/openai.svg")}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 18,
                      background: "#F5F3FF",
                      border: "2px solid #8B5CF6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      boxSizing: "border-box",
                    }}
                  >
                    <Img
                      src={staticFile("assets/logos/pytorch.svg")}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: 36,
                        fontWeight: 900,
                        color: "#0F172A",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Inteligencia Artificial
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#8B5CF6",
                      }}
                    >
                      OpenAI · DeepSeek · PyTorch
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#8B5CF6",
                    background: "#EDE9FE",
                    border: "1.5px solid #8B5CF6",
                    padding: "8px 18px",
                    borderRadius: 999,
                  }}
                >
                  {(
                    interpolate(phaseFrame, [0, 150], [64, 148], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  ).toFixed(0)}{" "}
                  TOKENS/S
                </div>
              </div>

              {/* Cuerpo: Red Neuronal SVG Latiendo + Chat Generativo a 60fps */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "340px 1fr",
                  gap: 24,
                  alignItems: "center",
                  margin: "12px 0",
                }}
              >
                {/* Red Neuronal Multicapa Latiendo */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.94)",
                    borderRadius: 22,
                    padding: 16,
                    border: "2px solid rgba(139, 92, 246, 0.45)",
                    boxShadow: "0 16px 35px rgba(139, 92, 246, 0.2)",
                  }}
                >
                  <svg width="308" height="270" viewBox="0 0 308 270">
                    {(() => {
                      const layer1 = [45, 105, 165, 225];
                      const layer2 = [35, 85, 135, 185, 235];
                      const layer3 = [65, 135, 205];

                      return (
                        <>
                          {/* Sinapsis Capa 1 -> Capa 2 */}
                          {layer1.map((y1, i) =>
                            layer2.map((y2, j) => (
                              <line
                                key={`l12-${i}-${j}`}
                                x1={48}
                                y1={y1}
                                x2={154}
                                y2={y2}
                                stroke="#8B5CF6"
                                strokeOpacity={
                                  0.25 +
                                  Math.sin(localFrame / 6 + i + j) * 0.15
                                }
                                strokeWidth="2"
                                strokeDasharray="6 8"
                                strokeDashoffset={-localFrame * 3}
                              />
                            ))
                          )}
                          {/* Sinapsis Capa 2 -> Capa 3 */}
                          {layer2.map((y2, i) =>
                            layer3.map((y3, j) => (
                              <line
                                key={`l23-${i}-${j}`}
                                x1={154}
                                y1={y2}
                                x2={260}
                                y2={y3}
                                stroke="#C084FC"
                                strokeOpacity={
                                  0.35 +
                                  Math.cos(localFrame / 5 + i + j) * 0.2
                                }
                                strokeWidth="2.5"
                                strokeDasharray="8 10"
                                strokeDashoffset={-localFrame * 4}
                              />
                            ))
                          )}

                          {/* Nodos Capa 1 */}
                          {layer1.map((y, i) => {
                            const pulse =
                              10 + Math.sin(localFrame / 5 + i * 1.1) * 3;
                            return (
                              <circle
                                key={`n1-${i}`}
                                cx={48}
                                cy={y}
                                r={pulse}
                                fill="#A78BFA"
                              />
                            );
                          })}
                          {/* Nodos Capa 2 */}
                          {layer2.map((y, i) => {
                            const pulse =
                              11 + Math.cos(localFrame / 4 + i * 0.9) * 3.5;
                            return (
                              <circle
                                key={`n2-${i}`}
                                cx={154}
                                cy={y}
                                r={pulse}
                                fill="#8B5CF6"
                              />
                            );
                          })}
                          {/* Nodos Capa 3 */}
                          {layer3.map((y, i) => {
                            const pulse =
                              13 + Math.sin(localFrame / 3.5 + i * 1.4) * 4;
                            return (
                              <circle
                                key={`n3-${i}`}
                                cx={260}
                                cy={y}
                                r={pulse}
                                fill="#F5F3FF"
                                stroke="#8B5CF6"
                                strokeWidth="4"
                              />
                            );
                          })}
                        </>
                      );
                    })()}
                  </svg>
                </div>

                {/* Burbuja de Chat IA Escribiendo a 60 FPS */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {/* Prompt de entrada */}
                  <div
                    style={{
                      alignSelf: "flex-end",
                      background: "#EDE9FE",
                      border: "1.5px solid #C4B5FD",
                      borderRadius: "18px 18px 4px 18px",
                      padding: "12px 18px",
                      fontFamily: FONT_SANS,
                      fontSize: 21,
                      fontWeight: 700,
                      color: "#4C1D95",
                    }}
                  >
                    Genera el motor neural en Python
                  </div>

                  {/* Respuesta en vivo escribiéndose durante los 150 frames */}
                  {(() => {
                    const aiResponse =
                      "Red neuronal activa: 175B parámetros procesados en PyTorch con inferencia en tiempo real y tensores GPU.";
                    const charsCount = Math.floor(
                      interpolate(phaseFrame, [8, 138], [0, aiResponse.length], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      })
                    );

                    return (
                      <div
                        style={{
                          background: "#FFFFFF",
                          border: "2px solid #8B5CF6",
                          borderRadius: "18px 18px 18px 4px",
                          padding: "18px 22px",
                          boxShadow: "0 14px 30px rgba(139, 92, 246, 0.16)",
                          minHeight: 165,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: FONT_SANS,
                            fontSize: 23,
                            fontWeight: 700,
                            color: "#1E293B",
                            lineHeight: 1.4,
                          }}
                        >
                          {aiResponse.slice(0, charsCount)}
                          <span
                            style={{
                              display: "inline-block",
                              width: 10,
                              height: 24,
                              background: "#8B5CF6",
                              marginLeft: 5,
                              verticalAlign: "middle",
                              opacity:
                                0.4 + Math.sin(localFrame / 2.5) * 0.6,
                            }}
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontFamily: FONT_MONO,
                            fontSize: 17,
                            fontWeight: 800,
                            color: "#8B5CF6",
                            borderTop: "1px solid #F3E8FF",
                            paddingTop: 10,
                          }}
                        >
                          <span>CUDA TENSORS: ON</span>
                          <span>
                            LOSS:{" "}
                            {interpolate(
                              phaseFrame,
                              [0, 150],
                              [0.42, 0.03],
                              {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                              }
                            ).toFixed(3)}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Pie de Sub-fase IA */}
              <div
                style={{
                  background: "#F5F3FF",
                  borderRadius: 16,
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: FONT_MONO,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#6D28D9",
                }}
              >
                <span>92% DE LOS MODELOS DE IA SE ENTRENAN EN PYTHON</span>
                <span>LATENCIA: 12ms</span>
              </div>
            </>
          )}

          {/* ---------------------------------------------------------- */}
          {/* SUB-FASE 2 (150 - 300f): BACKEND (Spotify / Instagram)     */}
          {/* Ecualizador animado con Math.sin(frame) + Contador 1.2M->2.8M */}
          {/* ---------------------------------------------------------- */}
          {phaseIndex === 1 && (
            <>
              {/* Cabecera Sub-fase Backend */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 18,
                      background: "#ECFDF5",
                      border: "2px solid #10B981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      boxSizing: "border-box",
                    }}
                  >
                    <Img
                      src={staticFile("assets/logos/spotify.svg")}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 18,
                      background: "#ECFDF5",
                      border: "2px solid #10B981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      boxSizing: "border-box",
                    }}
                  >
                    <Img
                      src={staticFile("assets/logos/instagram.svg")}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: 36,
                        fontWeight: 900,
                        color: "#0F172A",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Servidores Backend Masivos
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#10B981",
                      }}
                    >
                      Spotify · Instagram · FastAPI
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#047857",
                    background: "#D1FAE5",
                    border: "1.5px solid #10B981",
                    padding: "8px 18px",
                    borderRadius: 999,
                  }}
                >
                  UPTIME 99.99%
                </div>
              </div>

              {/* Contador subiendo con interpolate de 1.2M a 2.8M req/seg + Ecualizador */}
              {(() => {
                const reqPerSec = interpolate(
                  phaseFrame,
                  [0, 148],
                  [1.2, 2.8],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                );

                return (
                  <div
                    style={{
                      background: "#0F172A",
                      borderRadius: 24,
                      padding: "26px 32px",
                      border: "2px solid #10B981",
                      boxShadow: "0 18px 40px rgba(16, 185, 129, 0.22)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 22,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 18,
                            fontWeight: 800,
                            color: "#34D399",
                            letterSpacing: "0.08em",
                          }}
                        >
                          THROUGHPUT EN TIEMPO REAL (FASTAPI + ASYNCIO)
                        </div>
                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 64,
                            fontWeight: 900,
                            color: "#F8FAFC",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            marginTop: 4,
                          }}
                        >
                          {reqPerSec.toFixed(2)}M{" "}
                          <span style={{ fontSize: 34, color: "#10B981" }}>
                            req/seg
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 22,
                          fontWeight: 800,
                          color: "#A7F3D0",
                          background: "rgba(16, 185, 129, 0.16)",
                          padding: "8px 16px",
                          borderRadius: 12,
                        }}
                      >
                        +2,000M Usuarios Activos
                      </div>
                    </div>

                    {/* Ecualizador de 24 barras animadas con Math.sin(frame) */}
                    <div
                      style={{
                        height: 135,
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        gap: 8,
                        paddingTop: 10,
                      }}
                    >
                      {Array.from({ length: 24 }).map((_, i) => {
                        const wave1 = Math.sin(localFrame / 4 + i * 0.55);
                        const wave2 = Math.cos(localFrame / 6 - i * 0.35);
                        const barHeight = Math.round(
                          70 + wave1 * 38 + wave2 * 22
                        );

                        return (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: Math.max(18, barHeight),
                              borderRadius: "8px 8px 4px 4px",
                              background:
                                i % 3 === 0
                                  ? "linear-gradient(180deg, #34D399 0%, #059669 100%)"
                                  : "linear-gradient(180deg, #6EE7B7 0%, #10B981 100%)",
                              boxShadow: "0 0 12px rgba(16, 185, 129, 0.4)",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Pie de Sub-fase Backend */}
              <div
                style={{
                  background: "#ECFDF5",
                  borderRadius: 16,
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: FONT_MONO,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#065F46",
                }}
              >
                <span>STREAMING DE AUDIO Y REDES SOCIALES A ESCALA GLOBAL</span>
                <span>0.4ms P99</span>
              </div>
            </>
          )}

          {/* ---------------------------------------------------------- */}
          {/* SUB-FASE 3 (300 - 450f): DATOS (Pandas / Analytics)        */}
          {/* 5 barras creciendo secuencialmente + curva SVG en vivo      */}
          {/* ---------------------------------------------------------- */}
          {phaseIndex === 2 && (
            <>
              {/* Cabecera Sub-fase Datos */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 18,
                      background: "#EFF6FF",
                      border: "2px solid #3B82F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      boxSizing: "border-box",
                    }}
                  >
                    <Img
                      src={staticFile("assets/logos/pandas.svg")}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: 36,
                        fontWeight: 900,
                        color: "#0F172A",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Ciencia de Datos & Finanzas
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#3B82F6",
                      }}
                    >
                      Pandas · Big Data · Modelado Predictivo
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#1D4ED8",
                    background: "#DBEAFE",
                    border: "1.5px solid #3B82F6",
                    padding: "8px 18px",
                    borderRadius: 999,
                  }}
                >
                  {(
                    interpolate(phaseFrame, [0, 150], [1.4, 9.8], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  ).toFixed(1)}
                  M FILAS/S
                </div>
              </div>

              {/* 5 barras de gráfico creciendo secuencialmente + curva de predicción SVG */}
              <div
                style={{
                  position: "relative",
                  height: 310,
                  background: "#0F172A",
                  borderRadius: 24,
                  padding: "28px 36px 24px",
                  border: "2px solid #3B82F6",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 26,
                  overflow: "hidden",
                }}
              >
                {[
                  { label: "Q1", targetH: 85, val: "+28%" },
                  { label: "Q2", targetH: 125, val: "+54%" },
                  { label: "Q3", targetH: 165, val: "+89%" },
                  { label: "Q4", targetH: 205, val: "+142%" },
                  { label: "AI-PRED", targetH: 245, val: "+215%" },
                ].map((bar, idx) => {
                  const barSpring = spring({
                    frame: phaseFrame - idx * 14,
                    fps,
                    config: { damping: 12, stiffness: 125 },
                  });

                  const liveOscillation =
                    Math.sin(localFrame / 6 + idx * 0.9) * 6;
                  const currentH = Math.max(
                    16,
                    bar.targetH * barSpring + liveOscillation
                  );

                  return (
                    <div
                      key={bar.label}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        zIndex: 5,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 20,
                          fontWeight: 900,
                          color: "#60A5FA",
                          opacity: barSpring,
                        }}
                      >
                        {bar.val}
                      </span>
                      <div
                        style={{
                          width: "100%",
                          height: currentH,
                          borderRadius: "12px 12px 6px 6px",
                          background:
                            idx === 4
                              ? "linear-gradient(180deg, #38BDF8 0%, #2563EB 100%)"
                              : "linear-gradient(180deg, #60A5FA 0%, #1D4ED8 100%)",
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.45)",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 18,
                          fontWeight: 800,
                          color: "#94A3B8",
                        }}
                      >
                        {bar.label}
                      </span>
                    </div>
                  );
                })}

                {/* Curva de predicción SVG dibujándose en vivo */}
                {(() => {
                  const curveDraw = interpolate(
                    phaseFrame,
                    [10, 125],
                    [820, 0],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  );

                  return (
                    <svg
                      width="820"
                      height="280"
                      viewBox="0 0 820 280"
                      fill="none"
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    >
                      <path
                        d="M 70 220 C 210 190, 350 150, 490 110 C 600 75, 690 45, 760 28"
                        stroke="#FACC15"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="820"
                        strokeDashoffset={curveDraw}
                        style={{
                          filter: "drop-shadow(0 0 12px rgba(250, 204, 21, 0.8))",
                        }}
                      />
                      <circle
                        cx="760"
                        cy="28"
                        r={8 + Math.sin(localFrame / 4) * 3}
                        fill="#FACC15"
                        opacity={phaseFrame > 110 ? 1 : 0}
                      />
                    </svg>
                  );
                })()}
              </div>

              {/* Pie de Sub-fase Datos */}
              <div
                style={{
                  background: "#EFF6FF",
                  borderRadius: 16,
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: FONT_MONO,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#1E40AF",
                }}
              >
                <span> WALL STREET, FINTECH Y PREDICCIÓN DE MERCADOS</span>
                <span>PANDAS VECTORIZED</span>
              </div>
            </>
          )}

          {/* ---------------------------------------------------------- */}
          {/* SUB-FASE 4 (450 - 600f): AUTOMATIZACIÓN + RESUMEN          */}
          {/* Engranajes SVG girando + 4 insignias conectadas a Python   */}
          {/* + Badge inferior: "Una sola sintaxis. Toda la industria."  */}
          {/* ---------------------------------------------------------- */}
          {phaseIndex === 3 && (
            <>
              {/* Cabecera Sub-fase Automatización + Resumen */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {/* Engranajes SVG girando continuamente */}
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 18,
                      background: "#FFFBEB",
                      border: "2px solid #F59E0B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 48 48"
                      style={{
                        transform: `rotate(${localFrame * 3.5}deg)`,
                      }}
                    >
                      <circle
                        cx="24"
                        cy="24"
                        r="10"
                         stroke="#D97706"
                        strokeWidth="5"
                        fill="none"
                      />
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <rect
                          key={deg}
                          x="21"
                          y="4"
                          width="6"
                          height="8"
                          rx="2"
                          fill="#F59E0B"
                          transform={`rotate(${deg} 24 24)`}
                        />
                      ))}
                    </svg>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: 36,
                        fontWeight: 900,
                        color: "#0F172A",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Automatización & Ecosistema
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#D97706",
                      }}
                    >
                      Playwright · Bots 24/7 · Síntesis Industrial
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#B45309",
                    background: "#FEF3C7",
                    border: "1.5px solid #F59E0B",
                    padding: "8px 18px",
                    borderRadius: 999,
                  }}
                >
                  4 PILARES UNIFICADOS
                </div>
              </div>

              {/* Despliegue rápido de las 4 insignias conectadas al logo de Python */}
              <div
                style={{
                  position: "relative",
                  height: 310,
                  background: "#0F172A",
                  borderRadius: 24,
                  padding: "20px 28px",
                  border: "2px solid #F59E0B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  overflow: "hidden",
                }}
              >
                {/* Líneas conectoras animadas desde el núcleo Python hacia las 4 insignias */}
                <svg
                  width="820"
                  height="310"
                  viewBox="0 0 820 310"
                  fill="none"
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                  }}
                >
                  {[
                    { x: 185, y: 78, color: "#8B5CF6" },
                    { x: 635, y: 78, color: "#10B981" },
                    { x: 185, y: 232, color: "#3B82F6" },
                    { x: 635, y: 232, color: "#F59E0B" },
                  ].map((node, i) => (
                    <line
                      key={i}
                      x1={410}
                      y1={155}
                      x2={node.x}
                      y2={node.y}
                      stroke={node.color}
                      strokeWidth="4"
                      strokeDasharray="10 8"
                      strokeDashoffset={-localFrame * 5}
                    />
                  ))}
                </svg>

                {/* Columna Izquierda (IA + Datos) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    zIndex: 10,
                    width: 280,
                  }}
                >
                  {[
                    {
                      title: "IA & LLMs",
                      sub: "openai · torch",
                      color: "#8B5CF6",
                      delay: 4,
                    },
                    {
                      title: "Big Data",
                      sub: "pandas · numpy",
                      color: "#3B82F6",
                      delay: 16,
                    },
                  ].map((b) => {
                    const bSpring = spring({
                      frame: phaseFrame - b.delay,
                      fps,
                      config: { damping: 12, stiffness: 140 },
                    });
                    return (
                      <div
                        key={b.title}
                        style={{
                          background: "rgba(30, 41, 59, 0.95)",
                          border: `2px solid ${b.color}`,
                          borderRadius: 18,
                          padding: "14px 20px",
                          transform: `scale(${0.8 + bSpring * 0.2})`,
                          opacity: bSpring,
                          boxShadow: `0 10px 25px ${b.color}33`,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: FONT_SANS,
                            fontSize: 24,
                            fontWeight: 900,
                            color: "#F8FAFC",
                          }}
                        >
                          {b.title}
                        </div>
                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 18,
                            fontWeight: 700,
                            color: b.color,
                          }}
                        >
                          {b.sub}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Núcleo Central con Logo de Python y Corona Giratoria */}
                <div
                  style={{
                    position: "relative",
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #1E293B 0%, #0F172A 100%)",
                    border: "3px solid #F59E0B",
                    boxShadow: "0 0 45px rgba(245, 158, 11, 0.55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 15,
                    transform: `scale(${1 + Math.sin(localFrame / 6) * 0.05})`,
                  }}
                >
                  <Img
                    src={staticFile("assets/logos/python.svg")}
                    style={{ width: 82, height: 82 }}
                  />
                </div>

                {/* Columna Derecha (Backend + Bots) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    zIndex: 10,
                    width: 280,
                  }}
                >
                  {[
                    {
                      title: "Backend Web",
                      sub: "fastapi · django",
                      color: "#10B981",
                      delay: 10,
                    },
                    {
                      title: "Bots 24/7",
                      sub: "playwright · scripts",
                      color: "#F59E0B",
                      delay: 22,
                    },
                  ].map((b) => {
                    const bSpring = spring({
                      frame: phaseFrame - b.delay,
                      fps,
                      config: { damping: 12, stiffness: 140 },
                    });
                    return (
                      <div
                        key={b.title}
                        style={{
                          background: "rgba(30, 41, 59, 0.95)",
                          border: `2px solid ${b.color}`,
                          borderRadius: 18,
                          padding: "14px 20px",
                          transform: `scale(${0.8 + bSpring * 0.2})`,
                          opacity: bSpring,
                          boxShadow: `0 10px 25px ${b.color}33`,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: FONT_SANS,
                            fontSize: 24,
                            fontWeight: 900,
                            color: "#F8FAFC",
                          }}
                        >
                          {b.title}
                        </div>
                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 18,
                            fontWeight: 700,
                            color: b.color,
                          }}
                        >
                          {b.sub}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Badge inferior obligatorio: "Una sola sintaxis. Toda la industria." */}
              <div
                style={{
                  background: "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
                  borderRadius: 18,
                  padding: "14px 26px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 14,
                  boxShadow: "0 12px 30px rgba(245, 158, 11, 0.4)",
                  transform: `scale(${1 + Math.sin(localFrame / 8) * 0.018})`,
                }}
              >
                <IconSparkles size={26} color="#FFFFFF" />
                <span
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 30,
                    fontWeight: 900,
                    color: "#FFFFFF",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Una sola sintaxis. Toda la industria.
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// ORQUESTADOR DE LA ESCENA 4: <Scene4XRayIndustry />
// Integra <DynamicImportCard />, <EnergyCablesSVG /> y <XRayInteractiveStage />
// ---------------------------------------------------------------------
export const Scene4XRayIndustry: React.FC<{
  localFrame: number;
  fps: number;
}> = ({ localFrame, fps }) => {
  // Interpolación reactiva de color de sombra/glow entre las 4 sub-fases (150f c/u)
  const activeGlow = interpolateColors(
    localFrame,
    [0, 138, 155, 288, 305, 438, 455, 600],
    [
      "#8B5CF6", // 0 - 150f: IA (Violeta)
      "#8B5CF6",
      "#10B981", // 150 - 300f: Backend (Esmeralda)
      "#10B981",
      "#3B82F6", // 300 - 450f: Datos (Azul)
      "#3B82F6",
      "#F59E0B", // 450 - 600f: Automatización (Ámbar)
      "#F59E0B",
    ]
  );

  const enterScene = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* TÍTULO SUPERIOR COMPACTO (Y: 96px) */}
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 90,
          width: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: enterScene,
          transform: `translateY(${(1 - enterScene) * 24}px)`,
          zIndex: 35,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 20,
              fontWeight: 800,
              color: activeGlow,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            RAYOS X 2.5D · ECOSISTEMA REAL
          </div>
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 44,
              fontWeight: 900,
              color: "#0F172A",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Un <span style={{ color: activeGlow }}>import</span> transforma todo
          </div>
        </div>

        {/* Indicador de sub-fase 1..4 */}
        <div style={{ display: "flex", gap: 10 }}>
          {[0, 1, 2, 3].map((idx) => {
            const isCurrent = Math.min(3, Math.floor(localFrame / 150)) === idx;
            return (
              <div
                key={idx}
                style={{
                  width: isCurrent ? 44 : 16,
                  height: 16,
                  borderRadius: 999,
                  background: isCurrent ? activeGlow : "rgba(15, 23, 42, 0.15)",
                  boxShadow: isCurrent ? `0 0 14px ${activeGlow}` : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* A. ZONA SUPERIOR (Y: 220px): <DynamicImportCard /> */}
      <DynamicImportCard
        localFrame={localFrame}
        fps={fps}
        activeGlow={activeGlow}
      />

      {/* B. ZONA MEDIA (Y: 370px a 620px): <EnergyCablesSVG /> */}
      <EnergyCablesSVG localFrame={localFrame} activeGlow={activeGlow} />

      {/* C. ZONA CENTRAL-INFERIOR (Y: 620px): <XRayInteractiveStage /> */}
      <XRayInteractiveStage
        localFrame={localFrame}
        fps={fps}
        activeGlow={activeGlow}
      />
    </AbsoluteFill>
  );
};

// =====================================================================
// COMPONENTE PRINCIPAL DEL EPISODIO 1 (VERSIÓN 2 DUPLICADA)
// =====================================================================
export const PyQuestEp01V2: React.FC = () => {
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

  // Flotación 2.5D senoidal perpetua para elementos en escena
  const perpetualFloatY = Math.sin(frame / 20) * 7;

  return (
    <AbsoluteFill
      style={{
        perspective: 1400,
        overflow: "hidden",
        transform: `translate(${totalCameraShakeX}px, 0px) scale(${cameraScale})`,
      }}
    >
      {/* 1. Fondo reactivo y atmósfera continua con las 4 sub-fases de Escena 4 */}
      <AtmosphereBackgroundV2 frame={frame} />

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
      <PyQuestSfx name="whoosh-short" from={110} volume={0.3} />
      <PyQuestSfx name="typing" from={120} volume={0.24} />
      <PyQuestSfx name="error" from={230} volume={0.45} />
      <PyQuestSfx name="impact-bass-2" from={232} volume={0.38} />
      <PyQuestSfx name="pop" from={320} volume={0.32} />

      <PyQuestSfx name="whoosh-short" from={540} volume={0.32} />
      <PyQuestSfx name="typing" from={660} volume={0.24} />
      <PyQuestSfx name="chime" from={780} volume={0.36} />
      <PyQuestSfx name="pop" from={980} volume={0.3} />

      <PyQuestSfx name="whoosh-short" from={1380} volume={0.32} />
      <PyQuestSfx name="click-soft" from={1580} volume={0.28} />
      <PyQuestSfx name="impact-bass-1" from={1750} volume={0.42} />
      <PyQuestSfx name="error" from={1980} volume={0.44} />
      <PyQuestSfx name="impact-bass-2" from={1982} volume={0.45} />
      <PyQuestSfx name="click-soft" from={2040} volume={0.35} />
      <PyQuestSfx name="impact-bass-1" from={2080} volume={0.42} />

      {/* SFX de las 4 sub-fases de la Escena 4 (600 frames: 2520, 2670, 2820, 2970) */}
      <PyQuestSfx name="whoosh-short" from={2520} volume={0.34} />
      <PyQuestSfx name="pop" from={2535} volume={0.3} />
      <PyQuestSfx name="click-soft" from={2670} volume={0.32} />
      <PyQuestSfx name="pop" from={2682} volume={0.3} />
      <PyQuestSfx name="click-soft" from={2820} volume={0.32} />
      <PyQuestSfx name="chime" from={2835} volume={0.32} />
      <PyQuestSfx name="click-soft" from={2970} volume={0.32} />
      <PyQuestSfx name="sparkle" from={2985} volume={0.36} />

      {/* SFX de la Escena 5 (inicia en f3120) */}
      <PyQuestSfx name="whoosh-short" from={3120} volume={0.32} />
      <PyQuestSfx name="sparkle" from={3280} volume={0.35} />
      <PyQuestSfx name="chime" from={3320} volume={0.38} />
      <PyQuestSfx name="click-soft" from={3400} volume={0.3} />
      <PyQuestSfx name="pop" from={3460} volume={0.32} />

      {/* ================================================================ */}
      {/* ESCENA 1: EL GANCHO Y EL CHOQUE DE SINTAXIS (0 - 540 frames)     */}
      {/* ================================================================ */}
      {frame < 560 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
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
                opacity: interpolate(
                  frame,
                  [0, 20, 200, 250],
                  [0, 0.25, 0.25, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                ),
              }}
            >
              <div style={{ position: "absolute", top: 320, left: 120 }}>{`{ } ;`}</div>
              <div style={{ position: "absolute", top: 460, right: 140 }}>{`static void`}</div>
              <div style={{ position: "absolute", top: 780, left: 90 }}>{`NullPointerException`}</div>
              <div style={{ position: "absolute", top: 920, right: 110 }}>{`String[] args`}</div>
              <div style={{ position: "absolute", top: 1240, left: 160 }}>{`public class`}</div>
            </div>
          )}

          {/* TITULAR DEL GANCHO */}
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

            const hookTitleScale = interpolate(
              pushProgress,
              [0, 1],
              [1.0, 0.58],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

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

          {/* TARJETA DE JAVA (App.java) */}
          {frame >= 105 &&
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
                      isErrorActive
                        ? "rgba(239, 68, 68, 0.6)"
                        : "rgba(255, 255, 255, 0.08)"
                    }`,
                    transformOrigin: "center center",
                    transform: `rotateX(4deg) rotateZ(${tiltZ}deg) scale(${
                      0.92 + enterJava * 0.08
                    })`,
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
            })()}

          {/* CONSOLA DE ERROR ROJA */}
          {frame >= 230 &&
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

              const errorY =
                interpolate(enterError, [0, 1], [1500, 830], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }) +
                dropProgress * 650;

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
                      {'    System.out.println("Hola mundo")'}
                    </div>
                    <div style={{ color: "#EF4444", fontWeight: 900 }}>
                      {"                                   ^"}
                    </div>
                    <div
                      style={{
                        fontSize: 26,
                        color: "#DC2626",
                        marginTop: 6,
                        fontWeight: 700,
                      }}
                    >
                      1 error · Build failed
                    </div>
                  </div>
                </div>
              );
            })()}

          {/* BADGE FLOTANTE DE FRUSTRACIÓN */}
          {frame >= 320 &&
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

              const badgeOpacity =
                interpolate(dropProgress, [0, 0.5], [1, 0], {
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
                      transform: `translateY(${
                        (1 - enterBadge) * 30 + Math.sin(frame / 15) * 5
                      }px)`,
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
                      <span>
                        El abandono ocurre por la{" "}
                        <span style={{ color: "#EF4444" }}>fricción de sintaxis</span>, no
                        por tu capacidad de pensar.
                      </span>
                    </div>
                  </div>
                </>
              );
            })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 2: MORPHING A PYTHON — LÓGICA PURA (f540 - f1380)          */}
      {/* ================================================================ */}
      {frame >= 530 && frame < 1400 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
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
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>
                      # Una sola línea...
                    </span>
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
                          {pyFullText.slice(
                            6,
                            Math.min(pyFullText.length - 1, visibleChars)
                          )}
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

          {frame >= 780 &&
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
            })()}

          {frame >= 860 &&
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
                      <span
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 26,
                          fontWeight: 700,
                          color: "#334155",
                        }}
                      >
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
                          background:
                            "linear-gradient(90deg, #6366F1 0%, #10B981 100%)",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  </div>

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
                      <div
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 24,
                          color: "#10B981",
                          fontWeight: 800,
                        }}
                      >
                        RESULTADO
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 30,
                          color: "#34D399",
                          fontWeight: 900,
                        }}
                      >
                        10x Más Retención
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 3: EL MOTOR DE PYQUEST EN VIVO (f1380 - f2520)            */}
      {/* ================================================================ */}
      {frame >= 1370 && frame < 2520 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {(() => {
            const hit1Progress = interpolate(frame, [1750, 1790], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

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
              currentHp <= 0
                ? "#EF4444"
                : currentHp <= 55
                ? "#F59E0B"
                : "#10B981";

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
                        background: isDead
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
                          <span
                            style={{
                              color: isDead ? "#EF4444" : "#34D399",
                              fontWeight: 800,
                            }}
                          >
                            fin_del_juego
                          </span>
                          <span style={{ color: "#94A3B8" }}>()</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

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
                      {
                        word: "vida <= 0",
                        trans: "la salud llega a cero",
                        color: "#F59E0B",
                      },
                      {
                        word: "fin_del_juego()",
                        trans: "termina la partida",
                        color: "#EF4444",
                      },
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
                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 26,
                            color: item.color,
                            fontWeight: 800,
                          }}
                        >
                          {item.word}
                        </div>
                        <div
                          style={{
                            fontFamily: FONT_SANS,
                            fontSize: 26,
                            color: "#1E293B",
                            fontWeight: 800,
                            marginTop: 4,
                          }}
                        >
                          {item.trans}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
                      isDead
                        ? "#EF4444"
                        : isHit1
                        ? "#F59E0B"
                        : "rgba(15, 23, 42, 0.08)"
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
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
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
                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 26,
                            fontWeight: 700,
                          }}
                        >
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
                        transform: `translateY(${
                          Math.sin((frame - 1750) / 4) * 6
                        }px) rotate(4deg)`,
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
                        transform: `scale(${
                          1 + Math.sin(frame / 6) * 0.05
                        }) rotate(-3deg)`,
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
                    <GoblinAvatar
                      frame={frame}
                      isAttacking={isHit1 || isCritHit}
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
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
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

                {frame >= 2080 &&
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
                          background:
                            "linear-gradient(135deg, #181C28 0%, #2D1515 100%)",
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
                  })()}
              </>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ================================================================ */}
      {/* ESCENA 4: SISTEMA INTERACTIVO "RAYOS X 2.5D CON IMPORT ROTATIVO" */}
      {/* Duración: 600 frames exactos (f2520 - f3120 / 10 segundos)       */}
      {/* ================================================================ */}
      {frame >= 2520 && frame < 3120 && (
        <Scene4XRayIndustry localFrame={frame - 2520} fps={fps} />
      )}

      {/* ================================================================ */}
      {/* ESCENA 5: ROADMAP INTERACTIVO Y HOOK AL EPISODIO 2 (f3120 - f3960)*/}
      {/* ================================================================ */}
      {frame >= 3120 && (
        <AbsoluteFill
          style={{
            padding: `0 ${PYQUEST_THEME.safe.side}px`,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {(() => {
            const enterMaster = spring({
              frame: frame - 3120,
              fps,
              config: { damping: 13, stiffness: 120 },
            });

            const xpProgress = interpolate(frame, [3180, 3280], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const isLvl2Unlocked = frame >= 3300;

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

                {/* 1. FICHA DE PROGRESO DE ARIA */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 24,
                    padding: "26px 32px",
                    boxShadow: isLvl2Unlocked
                      ? "0 25px 60px -10px rgba(245, 158, 11, 0.35)"
                      : "0 20px 45px -10px rgba(0,0,0,0.08)",
                    border: `2px solid ${
                      isLvl2Unlocked ? "#F59E0B" : "rgba(0,0,0,0.08)"
                    }`,
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
                          <span
                            style={{
                              fontFamily: FONT_SANS,
                              fontSize: 34,
                              fontWeight: 900,
                              color: "#0F172A",
                            }}
                          >
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
                            boxShadow: isLvl2Unlocked
                              ? "0 4px 15px rgba(245, 158, 11, 0.4)"
                              : "none",
                          }}
                        >
                          {isLvl2Unlocked ? (
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
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
                            background:
                              "linear-gradient(90deg, #3B82F6 0%, #F59E0B 100%)",
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
                        <span>
                          Experiencia: {Math.round(xpProgress * 5)} / 500 XP
                        </span>
                        <span
                          style={{
                            color: isLvl2Unlocked ? "#F59E0B" : "#3B82F6",
                          }}
                        >
                          {isLvl2Unlocked
                            ? "+100% COMPLETADO"
                            : "Subiendo nivel..."}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CHECKLIST VIVO DE EPISODIOS */}
                {(() => {
                  const checkDraw = interpolate(
                    frame,
                    [3380, 3430],
                    [50, 0],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  );

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
                          <div
                            style={{
                              fontFamily: FONT_SANS,
                              fontSize: 32,
                              fontWeight: 800,
                              color: "#0F172A",
                            }}
                          >
                            Episodio 1: ¿Por qué Python?
                          </div>
                          <div
                            style={{
                              fontFamily: FONT_MONO,
                              fontSize: 24,
                              color: "#10B981",
                              fontWeight: 700,
                            }}
                          >
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

                {/* Episodio 2: Hook pulsante */}
                {(() => {
                  const pulse = 1 + Math.sin(frame / 8) * 0.025;

                  return (
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                        borderRadius: 22,
                        padding: "26px 30px",
                        boxShadow: "0 20px 45px -8px rgba(59, 130, 246, 0.3)",
                        border: "2px solid #3B82F6",
                        transform: `scale(${pulse})`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 14,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <IconBolt size={36} color="#2563EB" />
                          <div>
                            <div
                              style={{
                                fontFamily: FONT_SANS,
                                fontSize: 34,
                                fontWeight: 900,
                                color: "#1E3A8A",
                              }}
                            >
                              Episodio 2: Variables y Tipos
                            </div>
                            <div
                              style={{
                                fontFamily: FONT_MONO,
                                fontSize: 24,
                                color: "#2563EB",
                                fontWeight: 700,
                              }}
                            >
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
                          {frame < 3440 ? (
                            <TypewriterText
                              text="vida = 100"
                              frame={frame}
                              startFrame={3410}
                              durationFrames={25}
                              cursorColor="#10B981"
                            />
                          ) : (
                            <>
                              <span style={{ color: "#F8FAFC" }}>vida = </span>
                              <span
                                style={{ color: "#10B981", fontWeight: 700 }}
                              >
                                100
                              </span>
                              <span
                                style={{ color: "#94A3B8", marginLeft: 16 }}
                              >
                                # Entero (int)
                              </span>
                            </>
                          )}
                        </div>
                        <div>
                          {frame < 3470 ? (
                            <TypewriterText
                              text='heroe = "Aria"'
                              frame={frame}
                              startFrame={3440}
                              durationFrames={25}
                              cursorColor="#F59E0B"
                            />
                          ) : (
                            <>
                              <span style={{ color: "#F8FAFC" }}>heroe = </span>
                              <span style={{ color: "#F59E0B" }}>"Aria"</span>
                              <span
                                style={{ color: "#94A3B8", marginLeft: 16 }}
                              >
                                # Texto (str)
                              </span>
                            </>
                          )}
                        </div>
                        <div>
                          {frame < 3500 ? (
                            <TypewriterText
                              text="vivo = True"
                              frame={frame}
                              startFrame={3470}
                              durationFrames={25}
                              cursorColor="#A78BFA"
                            />
                          ) : (
                            <>
                              <span style={{ color: "#F8FAFC" }}>vivo = </span>
                              <span
                                style={{ color: "#A78BFA", fontWeight: 700 }}
                              >
                                True
                              </span>
                              <span
                                style={{ color: "#94A3B8", marginLeft: 16 }}
                              >
                                # Booleano (bool)
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 3. VISTA PREVIA DE PRÓXIMOS EPISODIOS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  {[
                    {
                      ep: "EPISODIO 3",
                      title: "Operadores & Combate",
                      icon: <IconSwords size={28} color="#3B82F6" />,
                      color: "#3B82F6",
                    },
                    {
                      ep: "EPISODIO 4",
                      title: "Listas & Inventario",
                      icon: <IconBackpack size={28} color="#10B981" />,
                      color: "#10B981",
                    },
                    {
                      ep: "EPISODIO 5",
                      title: "Bucles & Oleadas",
                      icon: <IconLoop size={28} color="#F59E0B" />,
                      color: "#F59E0B",
                    },
                    {
                      ep: "EPISODIO 6",
                      title: "Funciones & Poderes",
                      icon: <IconSparkles size={28} color="#8B5CF6" />,
                      color: "#8B5CF6",
                    },
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
                        <div
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: 22,
                            color: item.color,
                            fontWeight: 800,
                          }}
                        >
                          {item.ep}
                        </div>
                        <div
                          style={{
                            fontFamily: FONT_SANS,
                            fontSize: 26,
                            fontWeight: 800,
                            color: "#1E293B",
                          }}
                        >
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
                        background:
                          "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
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
