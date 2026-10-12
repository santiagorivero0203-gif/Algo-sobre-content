/**
 * =====================================================================
 * SANTI.DEV · MOTOR MATEMÁTICO DE INTERPOLACIÓN CINÉTICA DETERMINISTA
 * =====================================================================
 * Este módulo desacopla la animación del tiempo real.
 * Calcula la posición exacta de cada píxel en cada fotograma a partir
 * de funciones matemáticas puras (easeOutCubic) según el milisegundo
 * virtual en el que se encuentre el reloj del reproductor o renderizador.
 * Cero CSS transitions, cero @keyframes, cero saltos o desfases.
 * =====================================================================
 */

const MotionEngine = {
  // Curva cúbica: inicio rápido, frenado ultrasuave
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),

  // Curva elástica suave opcional para elementos con rebote sutil
  easeOutQuad: (t) => t * (2 - t),

  // Calcula el progreso de un elemento en un milisegundo exacto (0.0 a 1.0)
  getProgress: (currentMs, startMs, durationMs) => {
    if (currentMs <= startMs) return 0;
    if (currentMs >= startMs + durationMs) return 1;
    const linear = (currentMs - startMs) / durationMs;
    return MotionEngine.easeOutCubic(linear);
  },

  // Interpolación de posición en píxeles (Mask Reveal vertical)
  getTranslateY: (progress, startOffsetPx = 48) => {
    return (1 - progress) * startOffsetPx;
  },

  // Interpolación de posición en píxeles (Mask Reveal horizontal)
  getTranslateX: (progress, startOffsetPx = 48) => {
    return (1 - progress) * startOffsetPx;
  },

  // Interpolación de escala (zoom in sutil de 0.95 a 1.0)
  getScale: (progress, startScale = 0.94) => {
    return startScale + (1 - startScale) * progress;
  },

  // Interpolación de opacidad con rampa acelerada
  getOpacity: (progress) => {
    return Math.min(1, Math.max(0, progress * 1.5));
  }
};

// Exposición global para interoperabilidad en navegador sin empaquetador
if (typeof window !== "undefined") {
  window.MotionEngine = MotionEngine;
}
