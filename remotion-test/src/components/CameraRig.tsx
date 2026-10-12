/**
 * =====================================================================
 * CameraRig · cámara virtual 3D con desenfoque de movimiento CONDICIONAL
 * =====================================================================
 * Interpola keyframes {frame,x,y,z,rotation} y aplica perspectiva.
 * `CameraMotionBlur` multiplica el coste de render por `samples`, así
 * que SOLO se activa en los fotogramas donde la cámara realmente se
 * mueve (velocidad > umbral). Los fotogramas quietos se renderizan sin
 * envoltorio → render ~3× más rápido sin pérdida visual.
 * =====================================================================
 */
import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";

export interface CameraKeyframe {
  frame: number;
  x?: number;
  y?: number;
  z?: number;
  rotation?: number;
}

const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** Valor interpolado de una propiedad entre keyframes (guarda <2 puntos). */
const channel = (
  frame: number,
  kfs: CameraKeyframe[],
  key: "x" | "y" | "z" | "rotation",
): number => {
  if (kfs.length < 2) return kfs[0]?.[key] ?? 0;
  return interpolate(
    frame,
    kfs.map((k) => k.frame),
    kfs.map((k) => k[key] ?? 0),
    { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};

const pose = (f: number, kfs: CameraKeyframe[]) => ({
  x: channel(f, kfs, "x"),
  y: channel(f, kfs, "y"),
  z: channel(f, kfs, "z"),
  r: channel(f, kfs, "rotation"),
});

export const CameraRig: React.FC<{
  keyframes: CameraKeyframe[];
  /** Deriva Z continua (px por fotograma) para que la cámara nunca pare. */
  driftZ?: number;
  samples?: number;
  children: React.ReactNode;
}> = ({ keyframes, driftZ = 0.04, samples = 6, children }) => {
  const frame = useCurrentFrame();
  const now = pose(frame, keyframes);
  const prev = pose(frame - 1, keyframes);

  // Velocidad = cambio de pose en 1 fotograma.
  const speed =
    Math.abs(now.x - prev.x) +
    Math.abs(now.y - prev.y) +
    Math.abs(now.z - prev.z) +
    Math.abs(now.r - prev.r) * 20;

  const content = (
    <div
      style={{
        width: "100%",
        height: "100%",
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          translate: `${now.x}px ${now.y}px ${now.z + frame * driftZ}px`,
          rotate: `${now.r}deg`,
        }}
      >
        {children}
      </div>
    </div>
  );

  // Umbral 0.6: por debajo es imperceptible y no compensa el coste.
  if (speed < 0.6) return content;
  return (
    <CameraMotionBlur samples={samples} shutterAngle={180}>
      {content}
    </CameraMotionBlur>
  );
};
