/**
 * =====================================================================
 * KineticText · tipografía cinética con revelado por máscara
 * =====================================================================
 * Diseño (remotion.md): cada palabra sube desde una máscara
 * `overflow:hidden`; el retardo entre palabras es proporcional a la
 * longitud de la anterior (stagger orgánico); resorte subamortiguado
 * (ζ≈0.9) y deriva de escala continua 1→1.025 para que nunca quede
 * estático. Usa la propiedad CSS `translate` (no strings `transform`).
 * Sintaxis de énfasis: *palabra* → color de acento.
 * Determinista: depende solo de `useCurrentFrame()`.
 * =====================================================================
 */
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_SANS } from "../lib/theme";

export interface KineticTextProps {
  text: string;
  fontSize: number;
  accent: string;
  color?: string;
  /** Fotograma local en el que empieza la entrada. */
  delay?: number;
  align?: "left" | "center";
  fontFamily?: string;
  weight?: number;
  lineHeight?: number;
}

interface Word {
  w: string;
  hl: boolean;
}

/** Parsea `*resaltado*` → lista de palabras con bandera de acento. */
export const parseAccent = (text: string): Word[] => {
  const out: Word[] = [];
  let hl = false;
  text.split("*").forEach((chunk) => {
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => out.push({ w, hl }));
    hl = !hl;
  });
  return out;
};

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  fontSize,
  accent,
  color = "#fff",
  delay = 0,
  align = "left",
  fontFamily = FONT_SANS,
  weight = 700,
  lineHeight = 1.02,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = parseAccent(text);

  // Retardo acumulado: palabras largas empujan más a la siguiente.
  let acc = delay;
  const starts = words.map((word) => {
    const s = acc;
    acc += 3 + Math.min(word.w.length, 10) * 0.7;
    return s;
  });

  // Deriva continua: el titular respira mientras se lee.
  const drift = interpolate(frame, [0, 600], [1, 1.025], {
    extrapolateRight: "extend",
  });

  return (
    <div
      style={{
        fontFamily,
        fontWeight: weight,
        fontSize,
        lineHeight,
        letterSpacing: "-0.03em",
        color,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        columnGap: fontSize * 0.26,
        scale: String(drift),
        transformOrigin: align === "center" ? "center" : "left center",
      }}
    >
      {words.map((word, i) => {
        const p = spring({
          frame: frame - starts[i],
          fps,
          config: { damping: 20, stiffness: 220, mass: 0.6 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              translate: `0 ${(1 - p) * 20}px`,
              opacity: p,
              color: word.hl ? accent : color,
              textShadow: word.hl ? `0 0 35px ${accent}66` : "none",
            }}
          >
            {word.w}
          </span>
        );
      })}
    </div>
  );
};
