/**
 * =====================================================================
 * FLOATING CODE CARD · VENTANA DE CÓDIGO MINIMALISTA Y FLUIDA
 * =====================================================================
 * Tarjeta de código flotante estilo macOS en tonos azul oscuro plano,
 * con resaltado de línea activa, tecleo progresivo y micro-deriva continua.
 * =====================================================================
 */
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONT_MONO, PYQUEST_THEME } from "../theme";
import { useContinuousFloat, useSmoothSpring } from "../motion";

export interface CodeLine {
  text: string;
  tokens?: Array<{ text: string; color: string; bold?: boolean }>;
}

interface FloatingCodeCardProps {
  title?: string;
  lines: CodeLine[];
  activeLineIndex?: number;
  enterDelay?: number;
  width?: number;
  shakeX?: number;
  typewriterProgress?: number; // 0 a 1 para revelar caracteres
  highlightColor?: string;
}

export const FloatingCodeCard: React.FC<FloatingCodeCardProps> = ({
  title = "main.py",
  lines,
  activeLineIndex,
  enterDelay = 0,
  width = 920,
  shakeX = 0,
  typewriterProgress = 1,
  highlightColor = PYQUEST_THEME.code.activeLineBorder,
}) => {
  const frame = useCurrentFrame();
  const enter = useSmoothSpring(enterDelay);
  const { floatY } = useContinuousFloat(enterDelay * 5, 6, 26);

  // Desvanecimiento suave en la entrada
  const opacity = interpolate(enter, [0, 0.4, 1], [0, 0.8, 1]);
  const translateY = (1 - enter) * 40 + floatY;

  return (
    <div
      style={{
        width,
        background: PYQUEST_THEME.cardBg,
        borderRadius: 24,
        padding: "24px 32px 36px",
        boxShadow: PYQUEST_THEME.cardShadow,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transform: `translate(${shakeX}px, ${translateY}px) scale(${0.96 + enter * 0.04})`,
        opacity,
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Barra superior minimalista estilo macOS con 3 puntos */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#27C93F" }} />
        </div>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.45)",
            letterSpacing: "0.04em",
          }}
        >
          {title}
        </span>
        <div style={{ width: 50 }} /> {/* Espaciador balanceador */}
      </div>

      {/* Cuerpo del código */}
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 38,
          lineHeight: 1.55,
          color: PYQUEST_THEME.code.base,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {lines.map((line, idx) => {
          const isActive = idx === activeLineIndex;

          // Cálculo de caracteres visibles si está activo el typewriter
          const fullLineLength = line.text.length;
          const visibleCount = Math.floor(fullLineLength * typewriterProgress);
          const isTypingActive = typewriterProgress < 1;

          return (
            <div
              key={idx}
              style={{
                position: "relative",
                padding: "4px 14px 4px 20px",
                borderRadius: 10,
                background: isActive ? PYQUEST_THEME.code.activeLineBg : "transparent",
                borderLeft: isActive ? `5px solid ${highlightColor}` : "5px solid transparent",
                whiteSpace: "pre",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Tokens resaltados con colores semánticos */}
              {line.tokens ? (
                <div>
                  {line.tokens.map((token, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        color: token.color,
                        fontWeight: token.bold ? 700 : 500,
                      }}
                    >
                      {token.text}
                    </span>
                  ))}
                </div>
              ) : (
                <span>
                  {isTypingActive ? line.text.slice(0, visibleCount) : line.text}
                  {isTypingActive && visibleCount < line.text.length && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 36,
                        background: PYQUEST_THEME.code.activeLineBorder,
                        verticalAlign: "middle",
                        marginLeft: 4,
                        opacity: Math.sin(frame / 6) > 0 ? 1 : 0,
                      }}
                    />
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
