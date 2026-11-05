/**
 * =====================================================================
 * GAME VISUALIZER · ESTADO DEL RPG PYQUEST EN VIVO
 * =====================================================================
 * Muestra el estado del juego: avatar de Aria, barra de vida animada,
 * nivel y estado de combate. Diseño plano con esquinas redondeadas.
 * =====================================================================
 */
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONT_MONO, FONT_SANS, PYQUEST_THEME } from "../theme";
import { useContinuousFloat, useSmoothSpring } from "../motion";

interface GameVisualizerProps {
  currentHp: number;
  maxHp?: number;
  heroName?: string;
  statusText?: string;
  enterDelay?: number;
  width?: number;
  isDead?: boolean;
}

export const GameVisualizer: React.FC<GameVisualizerProps> = ({
  currentHp,
  maxHp = 100,
  heroName = "Aria",
  statusText,
  enterDelay = 0,
  width = 920,
  isDead = false,
}) => {
  const frame = useCurrentFrame();
  const enter = useSmoothSpring(enterDelay);
  const { floatY } = useContinuousFloat(enterDelay * 3 + 15, 6, 24);

  const opacity = interpolate(enter, [0, 0.4, 1], [0, 0.8, 1]);
  const translateY = (1 - enter) * 35 + floatY;

  // Porcentaje de vida normalizado (0 a 100)
  const hpPercent = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));

  // Color de la barra de vida según el estado
  const hpColor =
    currentHp <= 0
      ? PYQUEST_THEME.code.danger
      : currentHp <= 30
      ? "#F59E0B"
      : PYQUEST_THEME.code.int;

  return (
    <div
      style={{
        width,
        background: PYQUEST_THEME.cardLight,
        borderRadius: 24,
        padding: "24px 32px",
        boxShadow: "0 18px 45px -10px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        display: "flex",
        alignItems: "center",
        gap: 24,
        transform: `translateY(${translateY}px) scale(${0.96 + enter * 0.04})`,
        opacity,
        boxSizing: "border-box",
        fontFamily: FONT_SANS,
      }}
    >
      {/* Avatar de Aria (Héroe RPG) */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: isDead ? "#FEE2E2" : "#E0F2FE",
          border: `2px solid ${isDead ? "#EF4444" : "#38BDF8"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
          transform: `rotate(${Math.sin(frame / 20) * 3}deg)`,
        }}
      >
        <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
          {/* Pelo y cara plana estilizada */}
          <circle cx="24" cy="22" r="14" fill="#FBBF24" />
          <circle cx="24" cy="24" r="12" fill="#FED7AA" />
          {/* Ojos */}
          <circle cx="20" cy="23" r="2" fill="#1E293B" />
          <circle cx="28" cy="23" r="2" fill="#1E293B" />
          {/* Sonrisa o boca derrotada */}
          {isDead ? (
            <path d="M20 30 Q24 27 28 30" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <path d="M20 28 Q24 32 28 28" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          )}
          {/* Casco o diadema RPG */}
          <path d="M12 18 L24 10 L36 18 Z" fill="#3B82F6" />
          <circle cx="24" cy="13" r="2.5" fill="#F59E0B" />
        </svg>
      </div>

      {/* Información del personaje y barra de vida */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: PYQUEST_THEME.textPrimary }}>
              {heroName}
            </span>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 18,
                fontWeight: 700,
                color: "#3B82F6",
                background: "#EFF6FF",
                padding: "3px 10px",
                borderRadius: 8,
              }}
            >
              LVL 1
            </span>
          </div>

          {/* Valor numérico de la vida */}
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 28,
              fontWeight: 800,
              color: hpColor,
            }}
          >
            HP {currentHp} / {maxHp}
          </span>
        </div>

        {/* Barra de vida con interpolación suave */}
        <div
          style={{
            width: "100%",
            height: 18,
            borderRadius: 999,
            background: "#E2E8F0",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${hpPercent}%`,
              height: "100%",
              background: hpColor,
              borderRadius: 999,
            }}
          />
        </div>

        {/* Estado opcional */}
        {statusText && (
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: isDead ? "#EF4444" : PYQUEST_THEME.textMuted,
            }}
          >
            {statusText}
          </span>
        )}
      </div>
    </div>
  );
};
