import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";

/**
 * Escena cinética individual de 2 palabras centradas
 * - Movimiento de entrada con física de resorte (spring)
 * - Deriva continua de cámara (scale)
 * - Color de acento de marca #D97757
 */
interface KineticSceneProps {
  word1: string;
  word2: string;
  accentIndex?: 0 | 1;
}

export const KineticScene: React.FC<KineticSceneProps> = ({ word1, word2, accentIndex = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Movimiento de entrada con aceleración física tipo resorte
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Desplazamiento vertical desde máscara (de 50px a 0px)
  const translateY = interpolate(enterSpring, [0, 1], [50, 0]);

  // Deriva continua sutil (crecimiento constante para evitar frames estáticos)
  const scale = interpolate(frame, [0, fps], [1, 1.06]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "sans-serif",
            fontSize: 92,
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: accentIndex === 0 ? "#D97757" : "#FFFFFF" }}>{word1}</span>{" "}
          <span style={{ color: accentIndex === 1 ? "#D97757" : "#FFFFFF" }}>{word2}</span>
        </h1>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Composición principal: 3 secuencias de 1 segundo cada una a 60 FPS
 * Aplicando las mejores prácticas oficiales de la skill de Remotion:
 * - Uso de durationInFrames={1 * fps}
 * - premountFor={fps} para montaje fluido sin caídas de frames
 * - Animación conducida por spring e interpolate
 */
export const FastKineticReel = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Secuencia 1 (0.0s - 1.0s): MENOS CÓDIGO */}

      {/* Secuencia 2 (1.0s - 2.0s): MÁS VELOCIDAD */}
      <Sequence from={1 * fps} durationInFrames={1 * fps} premountFor={fps} name="Scene 2: MÁS VELOCIDAD">
        <KineticScene word1="MÁS" word2="VELOCIDAD." accentIndex={1} />
      </Sequence>

      {/* Secuencia 3 (2.0s - 3.0s): CERO BUGS */}
      <Sequence from={2 * fps} durationInFrames={1 * fps} premountFor={fps} name="Scene 3: CERO BUGS">
        <KineticScene word1="CERO" word2="BUGS." accentIndex={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
