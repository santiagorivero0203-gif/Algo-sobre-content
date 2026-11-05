/**
 * =====================================================================
 * SISTEMA DE AUDIO Y EFECTOS DE SONIDO · PYQUEST
 * =====================================================================
 * Conexión determinista con los SFX de public/sfx/ para transiciones,
 * tecleos, errores, logros y camas de música ambiental.
 * =====================================================================
 */
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export type SfxName =
  | "chime"
  | "click-soft"
  | "click"
  | "error"
  | "impact-bass-1"
  | "impact-bass-2"
  | "key-press"
  | "pop"
  | "sparkle"
  | "typing"
  | "whoosh-short";

const SFX_FILES: Record<SfxName, string> = {
  chime: "sfx/chime.mp3",
  "click-soft": "sfx/click-soft.mp3",
  click: "sfx/click.mp3",
  error: "sfx/error.mp3",
  "impact-bass-1": "sfx/impact-bass-1.mp3",
  "impact-bass-2": "sfx/impact-bass-2.mp3",
  "key-press": "sfx/key-press.mp3",
  pop: "sfx/pop.mp3",
  sparkle: "sfx/sparkle.mp3",
  typing: "sfx/typing.mp3",
  "whoosh-short": "sfx/whoosh-short.mp3",
};

interface SfxProps {
  name: SfxName;
  from?: number;
  volume?: number;
}

export const PyQuestSfx: React.FC<SfxProps> = ({ name, from = 0, volume = 0.35 }) => {
  const file = SFX_FILES[name];
  if (!file) return null;

  if (from === 0) {
    return <Audio src={staticFile(file)} volume={volume} />;
  }

  return (
    <Sequence from={from}>
      <Audio src={staticFile(file)} volume={volume} />
    </Sequence>
  );
};
