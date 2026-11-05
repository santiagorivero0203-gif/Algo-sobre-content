/**
 * =====================================================================
 * CLEAN CAPTIONS · SUBTÍTULOS DINÁMICOS Y NÍTIDOS PARA MÓVIL
 * =====================================================================
 * Ubicados en la zona segura inferior, con tipografía grande y legible,
 * contraste alto y resaltado de palabras clave con acento.
 * =====================================================================
 */
import React from "react";
import { interpolate } from "remotion";
import { FONT_SANS, PYQUEST_THEME } from "../theme";
import { useSmoothSpring } from "../motion";

interface CleanCaptionsProps {
  text: string;
  enterDelay?: number;
  highlightWord?: string;
  accentColor?: string;
}

export const CleanCaptions: React.FC<CleanCaptionsProps> = ({
  text,
  enterDelay = 0,
  highlightWord,
  accentColor = "#2563EB",
}) => {
  const enter = useSmoothSpring(enterDelay);
  const opacity = interpolate(enter, [0, 0.4, 1], [0, 0.8, 1]);
  const translateY = (1 - enter) * 15;

  const words = text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        bottom: 300,
        left: PYQUEST_THEME.safe.side,
        right: PYQUEST_THEME.safe.side,
        textAlign: "center",
        fontFamily: FONT_SANS,
        fontSize: 42,
        fontWeight: 800,
        lineHeight: 1.35,
        color: PYQUEST_THEME.textPrimary,
        opacity,
        transform: `translateY(${translateY}px)`,
        textShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        zIndex: 50,
      }}
    >
      {words.map((w, idx) => {
        const cleanWord = w.replace(/[,.:;¿?¡!]/g, "").toLowerCase();
        const isTarget = highlightWord && cleanWord === highlightWord.toLowerCase();

        return (
          <span
            key={idx}
            style={{
              color: isTarget ? accentColor : PYQUEST_THEME.textPrimary,
              marginRight: 10,
              display: "inline-block",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
