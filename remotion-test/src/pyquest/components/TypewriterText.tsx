import React from "react";
import { interpolate } from "remotion";

interface TypewriterTextProps {
  text: string;
  frame: number;
  startFrame: number;
  durationFrames?: number;
  cursorColor?: string;
  showCursor?: boolean;
  style?: React.CSSProperties;
}

/**
 * Componente de máquina de escribir fluida (Typewriter effect) determinista
 * para simular escritura de código en tiempo real con cursor parpadeante.
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  frame,
  startFrame,
  durationFrames = 45,
  cursorColor = "#34D399",
  showCursor = true,
  style,
}) => {
  const progress = interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const visibleLength = Math.floor(text.length * progress);
  const isTyping = frame >= startFrame && frame <= startFrame + durationFrames + 60;
  const cursorBlink = Math.sin(frame / 6) > 0;

  return (
    <span style={{ ...style, whiteSpace: "pre" }}>
      {text.slice(0, visibleLength)}
      {showCursor && isTyping && (
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: "1em",
            backgroundColor: cursorColor,
            verticalAlign: "middle",
            marginLeft: 4,
            opacity: cursorBlink ? 1 : 0,
            borderRadius: 2,
          }}
        />
      )}
    </span>
  );
};
