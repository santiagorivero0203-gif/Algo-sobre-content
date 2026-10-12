/**
 * =====================================================================
 * AnimatedGeminiLogo · Logotipo cinético oficial de Google Gemini
 * =====================================================================
 * Incluye movimiento continuo, resorte de entrada, brillo de neón
 * reactivo y partículas de destello (sparkle).
 * =====================================================================
 */
import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { BrandTheme } from "../lib/theme";

interface LogoProps {
  theme: BrandTheme;
  size?: number;
  delay?: number;
  mode?: "full" | "icon" | "badge";
}

export const AnimatedGeminiLogo: React.FC<LogoProps> = ({
  theme,
  size = 180,
  delay = 0,
  mode = "full",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrada con resorte elástico
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.6 },
  });

  // Movimiento senoidal continuo (respiración y flotación)
  const floatY = Math.sin((frame + delay * 10) / 16) * 12;
  const pulseScale = 1 + Math.sin(frame / 14) * 0.045;
  const rotateDeg = Math.sin(frame / 20) * 5;

  // Brillo pulsante
  const glowRadius = 24 + 14 * Math.sin(frame / 10);

  if (mode === "icon") {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          opacity: enter,
          transform: `translateY(${floatY}px) scale(${enter * pulseScale}) rotate(${rotateDeg}deg)`,
          filter: `drop-shadow(0 0 ${glowRadius}px ${theme.accent}) drop-shadow(0 0 ${glowRadius * 1.8}px ${theme.secondary}66)`,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#439DDF" />
              <stop offset="50%" stopColor="#4F87ED" />
              <stop offset="78%" stopColor="#9476C5" />
              <stop offset="100%" stopColor="#D6645D" />
            </linearGradient>
          </defs>
          {/* Estrella cuádruple característica de Google Gemini */}
          <path
            d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z"
            fill="url(#geminiGrad)"
          />
        </svg>
      </div>
    );
  }

  if (mode === "badge") {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(10, 20, 40, 0.75)",
          border: `1.5px solid ${theme.accent}88`,
          borderRadius: 999,
          padding: "10px 24px 10px 16px",
          backdropFilter: "blur(20px)",
          boxShadow: `0 0 32px ${theme.accent}44, inset 0 0 16px ${theme.accent}22`,
          opacity: enter,
          transform: `scale(${enter * pulseScale})`,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            transform: `rotate(${frame * 1.5}deg)`,
            filter: `drop-shadow(0 0 12px ${theme.accent})`,
          }}
        >
          <svg width="38" height="38" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#439DDF" />
                <stop offset="100%" stopColor="#9476C5" />
              </linearGradient>
            </defs>
            <path
              d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z"
              fill="url(#badgeGrad)"
            />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "monospace",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "0.14em",
            color: "#FFFFFF",
            textTransform: "uppercase",
          }}
        >
          GOOGLE GEMINI
        </span>
      </div>
    );
  }

  // Modo full: Logotipo oficial completo SVG
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: enter,
        transform: `translateY(${floatY}px) scale(${enter * pulseScale})`,
        filter: `drop-shadow(0 0 ${glowRadius}px ${theme.accent}99) drop-shadow(0 0 ${glowRadius * 2}px ${theme.secondary}55)`,
      }}
    >
      <Img
        src={staticFile("assets/gemini_logo.svg")}
        style={{
          width: size,
          height: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
};
