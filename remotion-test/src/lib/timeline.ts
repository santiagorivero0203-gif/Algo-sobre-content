/**
 * =====================================================================
 * LÍNEA DE TIEMPO DE UN REEL (función pura, compartida)
 * =====================================================================
 * Convierte `scenes[]` en [{from, duration}] usando la cadencia
 * adaptativa. Lo usan:
 *   - `calculateMetadata` (Root.tsx) → duración total de la composición
 *   - `<Reel>` → posición de cada <Sequence>
 *   - `<Backdrop>` → línea de progreso segmentada y teleprompter
 * Una sola fuente de verdad: nunca se calcula dos veces con reglas distintas.
 * =====================================================================
 */
import { computeSceneDuration } from "./cadence";
import type { Scene } from "./schema";

export interface TimelineEntry {
  from: number;
  duration: number;
  vo: string;
  badge: string;
}

/** Texto que el espectador lee en pantalla para una escena (para la cadencia). */
export const onScreenText = (s: Scene): string => {
  const parts: string[] = [s.title, s.sub ?? "", s.badge];
  switch (s.type) {
    case "points":
      s.points.forEach((p) => parts.push(p.label, p.desc));
      break;
    case "code":
      parts.push(...s.lines);
      break;
    case "compare":
      parts.push(s.bad.title, s.bad.desc, s.good.title, s.good.desc);
      break;
    case "cta":
      parts.push(s.keyword, s.line);
      break;
  }
  return parts.join(" ");
};

/** Calcula inicio y duración (en fotogramas) de cada escena. */
export const buildTimeline = (scenes: Scene[], fps: number): TimelineEntry[] => {
  let cursor = 0;
  return scenes.map((s) => {
    const duration =
      s.durationFrames ??
      computeSceneDuration({
        onScreenText: onScreenText(s),
        voiceOver: s.vo,
        fps,
        // El código y la jerga técnica se leen más lento (remotion.md: C = 1.25).
        complexityModifier: s.type === "code" ? 1.25 : 1.0,
      });
    const entry = { from: cursor, duration, vo: s.vo, badge: s.badge };
    cursor += duration;
    return entry;
  });
};

export const totalDuration = (t: TimelineEntry[]): number =>
  t.length ? t[t.length - 1].from + t[t.length - 1].duration : 1;
