/**
 * =====================================================================
 * FÍSICAS DE MOVIMIENTO CONTINUO Y RESORTES · PYQUEST
 * =====================================================================
 * Regla de oro: Cero fotogramas congelados.
 * Todo elemento en pantalla incorpora derivas armónicas continuas y
 * entradas con resortes subamortiguados precisos.
 * =====================================================================
 */
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/** Resorte suave estándar para entrada de tarjetas (rápido y con peso) */
export const useSmoothSpring = (delayFrames: number = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
};

/** Resorte elástico para elementos interactivos como botones o dados */
export const useSnapSpring = (delayFrames: number = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.6 },
  });
};

/**
 * Deriva senoidal continua (Breathing / Floating)
 * Mantiene el elemento respirando sutilmente a lo largo del tiempo.
 */
export const useContinuousFloat = (
  offset: number = 0,
  amplitudeY: number = 8,
  speed: number = 24
) => {
  const frame = useCurrentFrame();
  const floatY = Math.sin((frame + offset) / speed) * amplitudeY;
  const floatScale = 1 + Math.sin((frame + offset) / (speed * 1.5)) * 0.008;
  return { floatY, floatScale };
};

/**
 * Deriva lenta de cámara / zoom continuo (Regla de 180 frames)
 */
export const useContinuousDrift = (
  fromFrame: number,
  durationFrames: number,
  scaleRange: [number, number] = [1.0, 1.025]
) => {
  const frame = useCurrentFrame();
  return interpolate(
    frame,
    [fromFrame, fromFrame + durationFrames],
    scaleRange,
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
};

/**
 * Sacudida horizontal (Shake) con decaimiento natural para errores
 */
export const useShake = (startFrame: number, duration: number = 30, intensity: number = 16) => {
  const frame = useCurrentFrame();
  const rel = frame - startFrame;
  if (rel < 0 || rel > duration) return 0;

  const decay = 1 - rel / duration;
  return Math.sin(rel * 1.5) * intensity * decay;
};

/**
 * Cálculo determinista de efecto máquina de escribir
 */
export const useTypewriter = (
  text: string,
  startFrame: number,
  charsPerFrame: number = 0.8
) => {
  const frame = useCurrentFrame();
  const rel = Math.max(0, frame - startFrame);
  const visibleCount = Math.min(text.length, Math.floor(rel * charsPerFrame));
  return {
    displayedText: text.slice(0, visibleCount),
    isComplete: visibleCount >= text.length,
    visibleCount,
  };
};
