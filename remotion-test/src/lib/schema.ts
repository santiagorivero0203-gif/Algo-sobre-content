/**
 * =====================================================================
 * CONTRATO DE DATOS DE UN REEL (Zod)
 * =====================================================================
 * Regla de la skill: toda composición exporta un schema Zod. Así el
 * Studio genera un editor de props y un reel nuevo es SOLO datos:
 * no se toca código para producir el siguiente video.
 *
 * Tipos de escena (`type`), todos con `vo` (guion de locución):
 *   hero    → gancho: titular + subtítulo
 *   points  → 3 pasos numerados con explicación breve
 *   code    → terminal con escritura carácter a carácter
 *   compare → contador animado antes/después + 2 franjas
 *   cta     → palabra clave de comunidad + seguir/guardar
 * =====================================================================
 */
import { z } from "zod";

const baseScene = {
  /** Etiqueta superior de la escena (ej. "REGLA 1 · FOCO ATÓMICO"). */
  badge: z.string(),
  /** Titular. Usa *asteriscos* para resaltar palabras con el acento. */
  title: z.string(),
  sub: z.string().optional(),
  /** Guion exacto que el creador narrará sobre la escena. */
  vo: z.string(),
  /** Duración exacta en fotogramas a 60 FPS (para ritmo rápido). */
  durationFrames: z.number().optional(),
  /** Imagen real o captura de pantalla opcional. */
  image: z.string().optional(),
  /** Iconos de apps (SVG / PNG) opcionales. */
  icons: z.array(z.string()).optional(),
  /** Muestra el logotipo de Gemini con animación. */
  showLogo: z.boolean().optional(),
};

export const HeroSceneSchema = z.object({
  type: z.literal("hero"),
  ...baseScene,
  kicker: z.string().optional(),
  logoMode: z.enum(["full", "icon", "badge"]).optional(),
});

export const PointsSceneSchema = z.object({
  type: z.literal("points"),
  ...baseScene,
  points: z
    .array(z.object({ label: z.string(), desc: z.string() }))
    .min(1)
    .max(4),
});

export const CodeSceneSchema = z.object({
  type: z.literal("code"),
  ...baseScene,
  file: z.string(),
  lines: z.array(z.string()).min(1),
});

const sideSchema = z.object({
  tag: z.string(),
  title: z.string(),
  desc: z.string(),
});

export const CompareSceneSchema = z.object({
  type: z.literal("compare"),
  ...baseScene,
  bad: sideSchema,
  good: sideSchema,
  /** Contador animado de `from` a `to` (ej. 60000 → 4000 tokens). */
  metric: z.object({ from: z.number(), to: z.number(), unit: z.string() }),
});

export const ShowcaseSceneSchema = z.object({
  type: z.literal("showcase"),
  ...baseScene,
  image: z.string(),
  imageCaption: z.string().optional(),
  icons: z.array(z.string()).optional(),
  tag: z.string().optional(),
});

export const CtaSceneSchema = z.object({
  type: z.literal("cta"),
  ...baseScene,
  keyword: z.string(),
  line: z.string(),
});

export const SceneSchema = z.discriminatedUnion("type", [
  HeroSceneSchema,
  PointsSceneSchema,
  CodeSceneSchema,
  CompareSceneSchema,
  ShowcaseSceneSchema,
  CtaSceneSchema,
]);

export const ReelPropsSchema = z.object({
  /** Perfil de marca: santidev | mova | endo | girastock. */
  brand: z.string(),
  kicker: z.string(),
  scenes: z.array(SceneSchema).min(1),
  /** Muestra el guion de voz abajo (útil en preview; apagado al exportar). */
  showVoiceover: z.boolean(),
});

export type Scene = z.infer<typeof SceneSchema>;
export type ReelProps = z.infer<typeof ReelPropsSchema>;
