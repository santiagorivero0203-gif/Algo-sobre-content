/**
 * =====================================================================
 * MINIMAL TERMINAL · CONSOLA LIMPIA DE RESULTADOS Y ERRORES
 * =====================================================================
 * Muestra el resultado de ejecución o alertas de error en rojo.
 * Totalmente plana, sin texturas ni sombras pesadas.
 * =====================================================================
 */
import React from "react";
import { interpolate } from "remotion";
import { FONT_MONO, PYQUEST_THEME } from "../theme";
import { useContinuousFloat, useSmoothSpring } from "../motion";

interface MinimalTerminalProps {
  command?: string;
  output: string;
  isError?: boolean;
  enterDelay?: number;
  width?: number;
  shakeX?: number;
}

export const MinimalTerminal: React.FC<MinimalTerminalProps> = ({
  command = "python main.py",
  output,
  isError = false,
  enterDelay = 0,
  width = 920,
  shakeX = 0,
}) => {
  const enter = useSmoothSpring(enterDelay);
  const { floatY } = useContinuousFloat(enterDelay * 4 + 10, 5, 28);

  const opacity = interpolate(enter, [0, 0.4, 1], [0, 0.8, 1]);
  const translateY = (1 - enter) * 30 + floatY;

  return (
    <div
      style={{
        width,
        background: isError ? "rgba(239, 68, 68, 0.08)" : "rgba(30, 41, 59, 0.04)",
        border: isError ? "2px solid #EF4444" : "1px solid rgba(30, 41, 59, 0.12)",
        borderRadius: 20,
        padding: "24px 30px",
        boxSizing: "border-box",
        fontFamily: FONT_MONO,
        transform: `translate(${shakeX}px, ${translateY}px) scale(${0.96 + enter * 0.04})`,
        opacity,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Línea de comando */}
      {command && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 26,
            color: PYQUEST_THEME.textMuted,
            marginBottom: 14,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            paddingBottom: 10,
          }}
        >
          <span style={{ color: "#3B82F6", fontWeight: 700 }}>$</span>
          <span>{command}</span>
        </div>
      )}

      {/* Salida de consola */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          lineHeight: 1.45,
          color: isError ? PYQUEST_THEME.code.danger : PYQUEST_THEME.code.int,
          whiteSpace: "pre-wrap",
        }}
      >
        {output}
      </div>
    </div>
  );
};
