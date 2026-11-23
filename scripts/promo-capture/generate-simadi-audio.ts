/**
 * =====================================================================
 * GENERADOR DE AUDIO EDITORIAL Y TÁCTIL · SIMULACIÓN SIMADI V3
 * =====================================================================
 * Genera 1 cama musical luminosa minimalista y 7 efectos táctiles
 * mediante síntesis PCM estéreo a 48 kHz (envolventes ADSR físicas,
 * sin tonos sci-fi/RPG) y los codifica con FFmpeg a MP3 256 kbps dentro
 * de `remotion-test/public/captures/simadi/audio/`.
 * =====================================================================
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const SAMPLE_RATE = 48000;
const ROOT_DIR = process.cwd();
const OUT_DIR = path.join(ROOT_DIR, "remotion-test", "public", "captures", "simadi", "audio");
const TMP_WAV_DIR = path.join(ROOT_DIR, "scratch", "_simadi_wav");
const FFMPEG_BIN = path.join(
  ROOT_DIR,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg"
);

/** Escribe un buffer Float32 estéreo [-1..1] como WAV PCM 16-bit de 48 kHz. */
function writeStereoWav(destPath: string, left: Float32Array, right: Float32Array): void {
  const numSamples = left.length;
  const dataSize = numSamples * 4;
  const buf = Buffer.alloc(44 + dataSize);

  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16); // PCM chunk size
  buf.writeUInt16LE(1, 20);  // Linear PCM
  buf.writeUInt16LE(2, 22);  // Stereo
  buf.writeUInt32LE(SAMPLE_RATE, 24);
  buf.writeUInt32LE(SAMPLE_RATE * 4, 28);
  buf.writeUInt16LE(4, 32);  // Block align
  buf.writeUInt16LE(16, 34); // Bits per sample
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const l = Math.max(-0.98, Math.min(0.98, left[i]));
    const r = Math.max(-0.98, Math.min(0.98, right[i]));
    buf.writeInt16LE(Math.round(l * 32767), offset);
    buf.writeInt16LE(Math.round(r * 32767), offset + 2);
    offset += 4;
  }
  fs.writeFileSync(destPath, buf);
}

/** Convierte WAV a MP3 256 kbps estéreo usando FFmpeg incluido en node_modules. */
function encodeMp3(wavPath: string, mp3Filename: string): void {
  const mp3Path = path.join(OUT_DIR, mp3Filename);
  execFileSync(
    FFMPEG_BIN,
    ["-y", "-v", "error", "-i", wavPath, "-c:a", "libmp3lame", "-b:a", "256k", "-ar", "48000", mp3Path],
    { stdio: "pipe" }
  );
  if (!fs.existsSync(mp3Path) || fs.statSync(mp3Path).size < 256) {
    throw new Error(`Fallo generando MP3: ${mp3Path}`);
  }
}

/** Suma un tono cálido tipo felt-piano/marimba con decaimiento natural en [startSample..]. */
function addWarmTone(
  left: Float32Array,
  right: Float32Array,
  freq: number,
  startSec: number,
  durSec: number,
  gain: number,
  pan = 0,
  decayRate = 3.2
): void {
  const start = Math.floor(startSec * SAMPLE_RATE);
  const len = Math.floor(durSec * SAMPLE_RATE);
  const attackSamples = Math.max(1, Math.floor(0.014 * SAMPLE_RATE));
  const releaseSamples = Math.max(1, Math.floor(0.08 * SAMPLE_RATE));
  const lGain = gain * Math.sqrt(0.5 * (1 - pan));
  const rGain = gain * Math.sqrt(0.5 * (1 + pan));

  for (let i = 0; i < len && start + i < left.length; i++) {
    const t = i / SAMPLE_RATE;
    const attack = i < attackSamples ? i / attackSamples : 1;
    const tail = i > len - releaseSamples ? (len - i) / releaseSamples : 1;
    const env = attack * tail * Math.exp(-t * decayRate);

    // Fundamental + 2.º y 3.er armónico amortiguados más rápido para timbre orgánico
    const sig =
      Math.sin(2 * Math.PI * freq * t) +
      0.24 * Math.exp(-t * decayRate * 1.8) * Math.sin(2 * Math.PI * freq * 2 * t) +
      0.07 * Math.exp(-t * decayRate * 3.0) * Math.sin(2 * Math.PI * freq * 3 * t);

    left[start + i] += sig * env * lGain;
    right[start + i] += sig * env * rGain;
  }
}

/** BGM minimalista luminosa en Re Mayor (70 s): feel-good académico sin estridencias. */
function buildBgmDaylight(wavPath: string): void {
  const durSec = 70;
  const total = durSec * SAMPLE_RATE;
  const left = new Float32Array(total);
  const right = new Float32Array(total);

  // Acordes cálidos en Re Mayor (Dmaj7 - A/C# - Bm7 - Gmaj7), ciclo de 8s (BPM ~120 en pulso suave)
  const bars = [
    { bass: 146.83, notes: [293.66, 369.99, 440.0, 554.37, 659.25] }, // Dmaj7
    { bass: 138.59, notes: [277.18, 329.63, 440.0, 554.37, 659.25] }, // A/C#
    { bass: 123.47, notes: [246.94, 293.66, 369.99, 440.0, 587.33] }, // Bm7
    { bass: 98.0,   notes: [246.94, 293.66, 369.99, 493.88, 587.33] }, // Gmaj7
  ];

  const barDur = 2.0;
  for (let t0 = 0; t0 < durSec - 1.5; t0 += barDur) {
    const barIdx = Math.floor(t0 / barDur) % bars.length;
    const chord = bars[barIdx];

    // Nota grave suave al inicio del compás
    addWarmTone(left, right, chord.bass, t0, 1.9, 0.14, -0.08, 1.5);

    // Arpegio tipo felt-piano minimalista en corcheas tranquilas
    const stepTimes = [0.0, 0.375, 0.75, 1.125, 1.5];
    const pattern = [0, 2, 3, 1, 4];
    stepTimes.forEach((dt, idx) => {
      const f = chord.notes[pattern[idx % pattern.length]];
      const pan = (idx % 2 === 0 ? -1 : 1) * 0.18;
      addWarmTone(left, right, f, t0 + dt, 1.15, 0.085, pan, 2.8);
    });
  }

  // Micro-reverberación estéreo cálida para dar aire de estudio
  const d1 = Math.floor(0.019 * SAMPLE_RATE);
  const d2 = Math.floor(0.031 * SAMPLE_RATE);
  const wetL = new Float32Array(total);
  const wetR = new Float32Array(total);
  for (let i = 0; i < total; i++) {
    const l = left[i] + (i >= d1 ? right[i - d1] * 0.22 : 0) + (i >= d2 ? left[i - d2] * 0.14 : 0);
    const r = right[i] + (i >= d1 ? left[i - d1] * 0.22 : 0) + (i >= d2 ? right[i - d2] * 0.14 : 0);
    // Suave fade-in / fade-out maestro
    const fi = Math.min(1, i / (0.25 * SAMPLE_RATE));
    const fo = Math.min(1, (total - 1 - i) / (0.8 * SAMPLE_RATE));
    wetL[i] = Math.tanh(l * 0.9) * fi * fo;
    wetR[i] = Math.tanh(r * 0.9) * fi * fo;
  }

  writeStereoWav(wavPath, wetL, wetR);
}

/** Tic-tac seco y elegante de cronómetro (sin brillo agresivo). */
function buildClockTick(wavPath: string): void {
  const len = Math.floor(0.07 * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const attack = Math.min(1, i / 12);
    const body = Math.sin(2 * Math.PI * 1650 * t) * Math.exp(-t * 145);
    const click = Math.sin(2 * Math.PI * 3900 * t) * Math.exp(-t * 280) * 0.55;
    const sig = (body + click) * attack * 0.52;
    left[i] = sig;
    right[i] = sig;
  }
  writeStereoWav(wavPath, left, right);
}

/** Paso de página / aire minimalista (barrido pasa-banda suave). */
function buildPaperAirWhoosh(wavPath: string): void {
  const dur = 0.36;
  const len = Math.floor(dur * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  let lpL = 0;
  let hpL = 0;
  let prevL = 0;
  let seed = 1337;

  for (let i = 0; i < len; i++) {
    const u = i / len;
    const env = Math.pow(Math.sin(Math.PI * u), 1.7);
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const noise = (seed / 0xffffffff) * 2 - 1;

    // Barrido suave de frecuencia central entre 480 Hz y 1550 Hz
    const fc = 480 + 1070 * Math.sin(Math.PI * u);
    const alphaLp = Math.min(0.65, (2 * Math.PI * fc) / SAMPLE_RATE);
    lpL += alphaLp * (noise - lpL);
    hpL = 0.94 * (hpL + lpL - prevL);
    prevL = lpL;

    const sig = hpL * env * 0.55;
    const drift = (u - 0.5) * 0.35; // ligero movimiento estéreo izq -> der
    left[i] = sig * (1 - drift);
    right[i] = sig * (1 + drift);
  }
  writeStereoWav(wavPath, left, right);
}

/** Clic táctil corto estilo trackpad real / UI limpia. */
function buildTrackpadClick(wavPath: string): void {
  const len = Math.floor(0.055 * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const attack = Math.min(1, i / 8);
    const thump = Math.sin(2 * Math.PI * 240 * t) * Math.exp(-t * 170) * 0.55;
    const snap = Math.sin(2 * Math.PI * 2200 * t) * Math.exp(-t * 320) * 0.35;
    const sig = (thump + snap) * attack * 0.68;
    left[i] = sig;
    right[i] = sig;
  }
  writeStereoWav(wavPath, left, right);
}

/** Toque orgánico tipo madera / marimba suave para entrada de subtemas. */
function buildWoodTap(wavPath: string): void {
  const len = Math.floor(0.16 * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);
  addWarmTone(left, right, 587.33, 0.002, 0.14, 0.44, 0, 24);
  writeStereoWav(wavPath, left, right);
}

/** Bloqueo discreto ("← Atrás" bloqueado) con dos pulsos graves amortiguados. */
function buildUiLock(wavPath: string): void {
  const len = Math.floor(0.22 * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);
  addWarmTone(left, right, 230, 0.002, 0.08, 0.42, -0.05, 34);
  addWarmTone(left, right, 165, 0.065, 0.12, 0.46, 0.05, 28);
  writeStereoWav(wavPath, left, right);
}

/** Acorde cálido tipo vibráfono para resolución matemática y diagnóstico real. */
function buildWarmBell(wavPath: string): void {
  const len = Math.floor(1.3 * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);
  addWarmTone(left, right, 587.33, 0.005, 1.2, 0.24, -0.15, 2.8); // D5
  addWarmTone(left, right, 739.99, 0.035, 1.15, 0.20, 0.15, 3.0); // F#5
  addWarmTone(left, right, 880.0,  0.070, 1.10, 0.19, 0.0, 3.2);  // A5
  addWarmTone(left, right, 1174.66, 0.105, 1.05, 0.12, 0.2, 3.8); // D6
  writeStereoWav(wavPath, left, right);
}

/** Burbuja suave de mensaje directo para el CTA final al DM. */
function buildDmBubble(wavPath: string): void {
  const len = Math.floor(0.36 * SAMPLE_RATE);
  const left = new Float32Array(len);
  const right = new Float32Array(len);
  addWarmTone(left, right, 659.25, 0.005, 0.15, 0.30, -0.1, 14); // E5
  addWarmTone(left, right, 987.77, 0.085, 0.24, 0.32, 0.1, 11);  // B5
  writeStereoWav(wavPath, left, right);
}

function main(): void {
  if (!fs.existsSync(FFMPEG_BIN)) {
    throw new Error(`No se encontró FFmpeg en ${FFMPEG_BIN}`);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.rmSync(TMP_WAV_DIR, { recursive: true, force: true });
  fs.mkdirSync(TMP_WAV_DIR, { recursive: true });

  const jobs: Array<{ mp3: string; builder: (wav: string) => void }> = [
    { mp3: "bgm_daylight_minimal.mp3", builder: buildBgmDaylight },
    { mp3: "clock_tick_soft.mp3", builder: buildClockTick },
    { mp3: "paper_air_whoosh.mp3", builder: buildPaperAirWhoosh },
    { mp3: "trackpad_click.mp3", builder: buildTrackpadClick },
    { mp3: "wood_tap.mp3", builder: buildWoodTap },
    { mp3: "ui_lock.mp3", builder: buildUiLock },
    { mp3: "warm_bell.mp3", builder: buildWarmBell },
    { mp3: "dm_bubble.mp3", builder: buildDmBubble },
  ];

  for (const job of jobs) {
    const wavPath = path.join(TMP_WAV_DIR, job.mp3.replace(".mp3", ".wav"));
    job.builder(wavPath);
    encodeMp3(wavPath, job.mp3);
    const bytes = fs.statSync(path.join(OUT_DIR, job.mp3)).size;
    console.log(`AUDIO_OK: ${job.mp3} (${bytes} bytes)`);
  }

  fs.rmSync(TMP_WAV_DIR, { recursive: true, force: true });
}

main();
