/**
 * =====================================================================
 * CADENCIA ADAPTATIVA DE LECTURA (determinista, función pura)
 * =====================================================================
 * Origen: sección "Cadencia Adaptativa" de /remotion.md.
 *
 *   D = FPS · max(t_min, t_in/out + 60·W/WPM + β·S·C + t_pausa)
 *
 *   W = palabras · S = sílabas (heurística de núcleos vocálicos)
 *   C = complejidad conceptual (1.0 texto general · 1.25 código/técnico)
 *   β = 0.045 s/sílaba · t_pausa = 0.75 s · t_min = 1.8 s
 *
 * AMPLIACIÓN respecto al documento original:
 *   Como el creador narra encima del video, una escena nunca puede durar
 *   menos de lo que tarda en decirse su guion. `computeSceneDuration`
 *   toma el MÁXIMO entre la cadencia del texto en pantalla y la del
 *   guion de voz (a ritmo de locución, 165 WPM).
 * =====================================================================
 */

export interface ReadingCadenceOptions {
  /** Texto que el espectador leerá en pantalla. */
  text: string;
  fps: number;
  wordsPerMinute?: number;
  /** 1.0 por defecto · 1.25 para terminología científica o código. */
  complexityModifier?: number;
}

/** Cuenta sílabas de forma heurística (grupos de vocales contiguas). */
export const countSyllables = (tokens: string[]): number =>
  tokens.reduce((acc, word) => {
    const clean = word.toLowerCase().replace(/[^a-záéíóúüñ]/g, "");
    const vowelGroups = clean.match(/[aeiouyáéíóúü]+/g);
    return acc + (vowelGroups ? vowelGroups.length : 1);
  }, 0);

/** Duración en FOTOGRAMAS necesaria para leer `text` con comodidad. */
export function computeReadingCadence({
  text,
  fps,
  wordsPerMinute = 210,
  complexityModifier = 1.0,
}: ReadingCadenceOptions): number {
  const sanitized = text.replace(/\*/g, "").trim();
  const minFloorSeconds = 1.8;
  if (!sanitized) return Math.round(minFloorSeconds * fps);

  const tokens = sanitized.split(/\s+/);
  const secondsPerWord = 60 / wordsPerMinute;
  const syllableCompensation = 0.045 * complexityModifier;
  const transitionOverhead = 0.55; // entrada + salida con resorte
  const contemplationHold = 0.75; // pausa de fijación tras la última palabra

  const seconds =
    transitionOverhead +
    tokens.length * secondsPerWord +
    countSyllables(tokens) * syllableCompensation +
    contemplationHold;

  return Math.max(
    Math.round(minFloorSeconds * fps),
    Math.round(seconds * fps),
  );
}

/**
 * Duración final de una escena = máx(lectura en pantalla, locución).
 * El guion `vo` se evalúa a 165 WPM sin pausas de contemplación extra.
 */
export function computeSceneDuration(args: {
  onScreenText: string;
  voiceOver?: string;
  fps: number;
  complexityModifier?: number;
}): number {
  const reading = computeReadingCadence({
    text: args.onScreenText,
    fps: args.fps,
    complexityModifier: args.complexityModifier,
  });
  if (!args.voiceOver) return reading;

  // Locución: ritmo natural de habla + 0.8 s de respiro entre escenas.
  const words = args.voiceOver.replace(/\*/g, "").trim().split(/\s+/).length;
  const narration = Math.round((words * (60 / 165) + 0.8) * args.fps);
  return Math.max(reading, narration);
}
