/**
 * =====================================================================
 * CAPTURA AUTOMATIZADA DETERMINISTA · SIMULACIÓN SIMADI (FASE 3)
 * =====================================================================
 * Contrato:
 *  - Lee credenciales únicamente desde `.env.capture` (git-ignored).
 *  - Autentica fuera de cámara y aplica blindaje CSS (`#promo-capture-shield`)
 *    ocultando scrollbars, barra de usuario y controles de administrador.
 *  - Verifica por DOM que ningún correo ni badge Admin sea visible antes
 *    de cada captura.
 *  - Simula cursor SVG personalizado con interpolación cúbica suave y
 *    ondas visuales al hacer clic.
 *  - Registra `boundingBox()` normalizados (0..1) y marcas de tiempo
 *    exactas a 60 FPS en `remotion-test/public/captures/simadi/manifest.json`.
 *  - Optimiza los clips de video con FFmpeg (`node_modules/.bin/ffmpeg.exe`)
 *    en VP9 `.webm` recortando el login y tiempos muertos, y exporta
 *    capturas Retina 2x en formato `.webp`.
 * =====================================================================
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { chromium, type Locator, type Page } from "playwright";

interface NormalizedBox {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

interface InteractionEvent {
  id: string;
  screen: string;
  clipId: string;
  selector: string;
  label: string;
  rawMs: number;
  clipTimestampMs: number;
  clipFrame60: number;
  box: NormalizedBox;
}

interface ClipMeta {
  file: string;
  startRawMs: number;
  endRawMs: number;
  durationMs: number;
  durationFrames60: number;
}

const VIEWPORT = { width: 1000, height: 740 };
const DEVICE_SCALE = 2;
const ROOT_DIR = process.cwd();
const ENV_PATH = path.join(ROOT_DIR, ".env.capture");
const OUT_DIR = path.join(ROOT_DIR, "remotion-test", "public", "captures", "simadi");
const TEMP_VIDEO_DIR = path.join(ROOT_DIR, "scratch", "_simadi_raw_video");
const FFMPEG_BIN = path.join(ROOT_DIR, "node_modules", ".bin", process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg");

const HIDE_SELECTORS = [
  "#header-admin-btn",
  "#nav-admin",
  "#auth-user-info",
  "#auth-user-name",
  "#auth-logout-btn",
  "#admin-screen",
  "#gatekeeper-screen",
  "#auth-modal",
];

function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) {
    throw new Error("Falta .env.capture en la raíz del proyecto.");
  }
  const raw = fs.readFileSync(ENV_PATH, "utf8");
  const map: Record<string, string> = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq > 0) map[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return {
    url: map.SIMADI_URL || "",
    email: map.SIMADI_EMAIL || "",
    password: map.SIMADI_PASSWORD || "",
  };
}

/** Inyecta blindaje CSS (cero scrollbars y cero datos personales/admin) y el cursor SVG suave. */
async function injectPrivacyAndCursor(page: Page): Promise<void> {
  const hideCss = `${HIDE_SELECTORS.join(", ")} { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }`;
  await page.evaluate((shieldCss) => {
    const existingStyle = document.getElementById("promo-capture-shield");
    if (existingStyle) existingStyle.remove();
    const style = document.createElement("style");
    style.id = "promo-capture-shield";
    style.textContent = `
      ::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
      * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
      ${shieldCss}
      #promo-svg-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        pointer-events: none;
        z-index: 999999;
        transform: translate3d(500px, 370px, 0);
        filter: drop-shadow(0 4px 10px rgba(15, 23, 42, 0.32));
        transition: none;
      }
      #promo-cursor-ripple {
        position: fixed;
        top: 0;
        left: 0;
        width: 36px;
        height: 36px;
        margin-left: -18px;
        margin-top: -18px;
        border-radius: 50%;
        border: 3px solid rgba(15, 82, 186, 0.85);
        background: rgba(15, 82, 186, 0.18);
        pointer-events: none;
        z-index: 999998;
        opacity: 0;
        transform: scale(0.4);
      }
    `;
    document.head.appendChild(style);

    if (!document.getElementById("promo-svg-cursor")) {
      const cursor = document.createElement("div");
      cursor.id = "promo-svg-cursor";
      cursor.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 3.5L23.5 13.2L15.1 15.7L11.4 23.8L4.5 3.5Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.2" stroke-linejoin="round"/>
        </svg>
      `;
      document.body.appendChild(cursor);
    }

    if (!document.getElementById("promo-cursor-ripple")) {
      const ripple = document.createElement("div");
      ripple.id = "promo-cursor-ripple";
      document.body.appendChild(ripple);
    }
  }, hideCss);
}

/** Verifica que ningún texto visible en el DOM contenga el correo de la cuenta o etiquetas Admin. */
async function assertNoPiiVisible(page: Page, email: string): Promise<void> {
  const localPrefix = (email.split("@")[0] || "").toLowerCase();
  const leak = await page.evaluate(
    ({ fullEmail, prefix }) => {
      const text = (document.body?.innerText || "").toLowerCase();
      if (fullEmail && text.includes(fullEmail.toLowerCase())) return "email_detected";
      if (prefix && prefix.length >= 5 && text.includes(prefix)) return "username_detected";
      if (text.includes("panel dev") || text.includes("administrador vitalicio")) return "admin_ui_detected";
      return null;
    },
    { fullEmail: email, prefix: localPrefix }
  );
  if (leak) {
    throw new Error(`Fuga de privacidad abortada en captura (${leak}).`);
  }
}

/** Obtiene el boundingBox normalizado (0..1) de un locator visible. */
async function getNormalizedBox(locator: Locator): Promise<NormalizedBox> {
  const raw = await locator.boundingBox();
  if (!raw) {
    return { x: 0.2, y: 0.2, width: 0.6, height: 0.4, centerX: 0.5, centerY: 0.4 };
  }
  const x = Math.max(0, Math.min(1, raw.x / VIEWPORT.width));
  const y = Math.max(0, Math.min(1, raw.y / VIEWPORT.height));
  const width = Math.max(0.01, Math.min(1 - x, raw.width / VIEWPORT.width));
  const height = Math.max(0.01, Math.min(1 - y, raw.height / VIEWPORT.height));
  return {
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
    width: Number(width.toFixed(4)),
    height: Number(height.toFixed(4)),
    centerX: Number((x + width / 2).toFixed(4)),
    centerY: Number((y + height / 2).toFixed(4)),
  };
}

/** Mueve el cursor SVG suavemente con easeInOutCubic hasta el centro del elemento objetivo. */
async function moveCursorSmoothly(
  page: Page,
  cursorState: { x: number; y: number },
  locator: Locator,
  steps = 26
): Promise<{ box: NormalizedBox; targetX: number; targetY: number }> {
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  const box = await getNormalizedBox(locator);
  const targetX = box.centerX * VIEWPORT.width;
  const targetY = box.centerY * VIEWPORT.height;
  const startX = cursorState.x;
  const startY = cursorState.y;

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const cx = startX + (targetX - startX) * ease;
    const cy = startY + (targetY - startY) * ease;
    await page.evaluate(
      ({ x, y }) => {
        const el = document.getElementById("promo-svg-cursor");
        if (el) el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      },
      { x: cx, y: cy }
    );
    await page.waitForTimeout(16);
  }
  cursorState.x = targetX;
  cursorState.y = targetY;
  return { box, targetX, targetY };
}

/** Dispara onda visual de clic en el cursor SVG, ejecuta clic real y registra la interacción. */
async function smoothClick(
  page: Page,
  cursorState: { x: number; y: number },
  locator: Locator,
  meta: {
    id: string;
    screen: string;
    clipId: string;
    selector: string;
    label: string;
    videoStartEpochMs: number;
    clipStartRawMs: number;
  },
  interactions: InteractionEvent[]
): Promise<NormalizedBox> {
  const { box, targetX, targetY } = await moveCursorSmoothly(page, cursorState, locator);
  await page.evaluate(
    ({ x, y }) => {
      const ripple = document.getElementById("promo-cursor-ripple");
      if (ripple) {
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.animate(
          [
            { opacity: 0.9, transform: "scale(0.35)" },
            { opacity: 0, transform: "scale(1.65)" },
          ],
          { duration: 380, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );
      }
    },
    { x: targetX, y: targetY }
  );

  const rawMs = Date.now() - meta.videoStartEpochMs;
  await locator.click();
  const clipTimestampMs = Math.max(0, rawMs - meta.clipStartRawMs);

  interactions.push({
    id: meta.id,
    screen: meta.screen,
    clipId: meta.clipId,
    selector: meta.selector,
    label: meta.label,
    rawMs,
    clipTimestampMs,
    clipFrame60: Math.round((clipTimestampMs / 1000) * 60),
    box,
  });

  return box;
}

/** Captura screenshot PNG Retina 2x y lo convierte a `.webp` lossless/alta calidad vía canvas interno. */
async function captureWebp(page: Page, outFilename: string, hideCursor = true): Promise<{ file: string; width: number; height: number }> {
  if (hideCursor) {
    await page.evaluate(() => {
      const c = document.getElementById("promo-svg-cursor");
      if (c) c.style.opacity = "0";
    });
  }
  const pngBuffer = await page.screenshot({ type: "png" });
  if (hideCursor) {
    await page.evaluate(() => {
      const c = document.getElementById("promo-svg-cursor");
      if (c) c.style.opacity = "1";
    });
  }

  const base64Png = pngBuffer.toString("base64");
  const webpResult = await page.evaluate(async (b64: string) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("Fallo decodificando PNG en canvas."));
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No se pudo crear contexto 2D.");
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL("image/webp", 0.92);
    return {
      width: canvas.width,
      height: canvas.height,
      base64Webp: dataUrl.split(",")[1] || "",
    };
  }, base64Png);

  const dest = path.join(OUT_DIR, outFilename);
  fs.writeFileSync(dest, Buffer.from(webpResult.base64Webp, "base64"));
  return { file: outFilename, width: webpResult.width, height: webpResult.height };
}

/** Recorta y re-codifica un segmento del video bruto con FFmpeg en VP9 limpio (sin audio). */
function trimWithFfmpeg(inputWebm: string, outputFilename: string, startMs: number, endMs: number): ClipMeta {
  const startSec = Math.max(0, startMs / 1000).toFixed(3);
  const durationSec = Math.max(0.5, (endMs - startMs) / 1000).toFixed(3);
  const outPath = path.join(OUT_DIR, outputFilename);

  execFileSync(
    FFMPEG_BIN,
    [
      "-y",
      "-ss",
      startSec,
      "-i",
      inputWebm,
      "-t",
      durationSec,
      "-c:v",
      "libvpx-vp9",
      "-deadline",
      "good",
      "-cpu-used",
      "4",
      "-crf",
      "23",
      "-b:v",
      "0",
      "-g",
      "30",
      "-r",
      "30",
      "-an",
      outPath,
    ],
    { stdio: "pipe" }
  );

  const durationMs = Math.max(500, endMs - startMs);
  return {
    file: outputFilename,
    startRawMs: startMs,
    endRawMs: endMs,
    durationMs,
    durationFrames60: Math.round((durationMs / 1000) * 60),
  };
}

async function main(): Promise<void> {
  const env = loadEnv();
  if (!env.url || !env.email || !env.password) {
    throw new Error("Faltan variables en .env.capture.");
  }
  if (!fs.existsSync(FFMPEG_BIN)) {
    throw new Error(`No se encontró FFmpeg en ${FFMPEG_BIN}`);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.rmSync(TEMP_VIDEO_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEMP_VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  let recordedVideoPath: string | null = null;
  const cursorState = { x: 500, y: 370 };
  const interactions: InteractionEvent[] = [];
  const elements: Record<string, Record<string, NormalizedBox>> = {
    config: {},
    exam: {},
    guides: {},
    results: {},
  };
  const stills: Record<string, { file: string; width: number; height: number }> = {};

  let configStartRawMs = 0;
  let configEndRawMs = 0;
  let examStartRawMs = 0;
  let examEndRawMs = 0;

  try {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE,
      recordVideo: { dir: TEMP_VIDEO_DIR, size: VIEWPORT },
    });
    const videoStartEpochMs = Date.now();
    const page = await context.newPage();

    // 1. Carga y autenticación FUERA DE CÁMARA (antes de los segmentos recortados)
    await page.goto(env.url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(700);

    if ((await page.locator("#gate-submit-btn:visible").count()) > 0) {
      await page.locator("#gate-email").fill(env.email);
      await page.locator("#gate-password").fill(env.password);
      await page.locator("#gate-submit-btn").click();
      await page.waitForFunction(
        () => {
          const gate = document.querySelector("#gatekeeper-screen");
          if (!gate) return true;
          const st = getComputedStyle(gate);
          return st.display === "none" || !gate.classList.contains("active");
        },
        { timeout: 15000 }
      );
      await page.waitForTimeout(800);
    }

    // Cambiar inmediatamente a Simulador (#setup-screen) e inyectar blindaje de privacidad
    await page.locator("#nav-simulador").click();
    await page.waitForTimeout(500);
    await injectPrivacyAndCursor(page);
    await assertNoPiiVisible(page, env.email);

    // =================================================================
    // SEGMENTO 1: CONFIGURACIÓN DE SIMULACRO (#setup-screen)
    // =================================================================
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    configStartRawMs = Date.now() - videoStartEpochMs;

    elements.config["#area"] = await getNormalizedBox(page.locator("#area"));
    elements.config["#num-questions"] = await getNormalizedBox(page.locator("#num-questions"));
    elements.config["#time-limit"] = await getNormalizedBox(page.locator("#time-limit"));

    await moveCursorSmoothly(page, cursorState, page.locator("#area"), 18);
    await page.locator("#area").selectOption("Razonamiento Lógico Numérico");
    await page.waitForTimeout(250);

    await moveCursorSmoothly(page, cursorState, page.locator("#num-questions"), 18);
    await page.locator("#num-questions").fill("3");
    await page.waitForTimeout(220);

    // Capturar config.webp con el formulario completo bien encuadrado y medir #start-btn en su posición final
    elements.config["#start-btn"] = await getNormalizedBox(page.locator("#start-btn"));
    await assertNoPiiVisible(page, env.email);
    stills.config = await captureWebp(page, "simadi_config.webp", true);

    await smoothClick(
      page,
      cursorState,
      page.locator("#start-btn"),
      {
        id: "click_start_exam",
        screen: "config",
        clipId: "simadi_config_clip.webm",
        selector: "#start-btn",
        label: "Iniciar Prueba",
        videoStartEpochMs,
        clipStartRawMs: configStartRawMs,
      },
      interactions
    );
    await page.waitForTimeout(300);
    configEndRawMs = Date.now() - videoStartEpochMs;

    // =================================================================
    // SEGMENTO 2: SIMULACRO ACTIVO CON CRONÓMETRO (#exam-screen)
    // =================================================================
    await page.locator("#exam-screen.active").waitFor({ state: "visible", timeout: 10000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await assertNoPiiVisible(page, env.email);

    examStartRawMs = Date.now() - videoStartEpochMs;

    elements.exam["#timer"] = await getNormalizedBox(page.locator("#timer"));
    elements.exam[".question-card"] = await getNormalizedBox(page.locator("#exam-screen .question-card"));
    elements.exam[".option-btn"] = await getNormalizedBox(page.locator("#exam-screen .option-btn").nth(0));
    elements.exam["#next-btn"] = await getNormalizedBox(page.locator("#next-btn"));

    // Pausar 1.6s para que el cronómetro avance en tiempo real dentro del clip
    await page.waitForTimeout(1600);

    await smoothClick(
      page,
      cursorState,
      page.locator("#exam-screen .option-btn").nth(0),
      {
        id: "click_select_option",
        screen: "exam",
        clipId: "simadi_exam_clip.webm",
        selector: ".option-btn",
        label: "Seleccionar respuesta",
        videoStartEpochMs,
        clipStartRawMs: examStartRawMs,
      },
      interactions
    );
    await page.waitForTimeout(500);
    await assertNoPiiVisible(page, env.email);
    stills.exam = await captureWebp(page, "simadi_exam.webp", true);

    await smoothClick(
      page,
      cursorState,
      page.locator("#next-btn"),
      {
        id: "click_next_question",
        screen: "exam",
        clipId: "simadi_exam_clip.webm",
        selector: "#next-btn",
        label: "Siguiente pregunta",
        videoStartEpochMs,
        clipStartRawMs: examStartRawMs,
      },
      interactions
    );
    await page.waitForTimeout(700);
    examEndRawMs = Date.now() - videoStartEpochMs;

    // Completar preguntas restantes; si por azar resulta 0/3, repetir rápido 1 vez para mostrar aciertos + justificación
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) {
        const restartBtn = page.locator("#restart-btn:visible").first();
        if ((await restartBtn.count()) > 0) {
          await restartBtn.click();
          await page.locator("#setup-screen.active").waitFor({ state: "visible", timeout: 8000 });
          await page.locator("#area").selectOption("Razonamiento Verbal");
          await page.locator("#num-questions").fill("3");
          await page.locator("#start-btn").click();
          await page.locator("#exam-screen.active").waitFor({ state: "visible", timeout: 8000 });
        }
      }
      for (let step = 0; step < 3; step++) {
        const opts = page.locator("#exam-screen .option-btn:visible");
        const count = await opts.count();
        if (count > 0) {
          const pickIdx = (step + attempt) % count;
          await opts.nth(pickIdx).click();
          await page.waitForTimeout(200);
        }
        const nextBtn = page.locator("#exam-screen #next-btn:visible").first();
        const submitBtn = page.locator("#exam-screen #submit-btn:visible").first();
        if ((await submitBtn.count()) > 0) {
          await submitBtn.click();
          break;
        } else if ((await nextBtn.count()) > 0) {
          await nextBtn.click();
          await page.waitForTimeout(300);
        }
      }
      await page.locator("#report-screen.active").waitFor({ state: "visible", timeout: 10000 });
      const reportText = await page.locator("#report-screen").innerText();
      if (!reportText.includes("0/3")) {
        break;
      }
    }

    // =================================================================
    // SEGMENTO 3: DIAGNÓSTICO DE RENDIMIENTO (#report-screen)
    // =================================================================
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await assertNoPiiVisible(page, env.email);

    elements.results["#report-screen .card"] = await getNormalizedBox(page.locator("#report-screen .card").first());
    const breakdownCard = page.locator("#report-screen .card > div").first();
    if ((await breakdownCard.count()) > 0) {
      elements.results["score-header"] = await getNormalizedBox(breakdownCard);
    }
    const firstDetail = page.locator("#report-screen .card > div").nth(1);
    if ((await firstDetail.count()) > 0) {
      elements.results["breakdown"] = await getNormalizedBox(firstDetail);
    }
    stills.results = await captureWebp(page, "simadi_resultados.webp", true);

    // =================================================================
    // SEGMENTO 4: GUÍAS DE ESTUDIO (#guides-screen)
    // =================================================================
    await page.locator("#nav-guias").click();
    await page.locator("#guides-screen.active").waitFor({ state: "visible", timeout: 10000 });
    await page.waitForTimeout(450);

    const numTab = page.locator("#guides-screen .tab-btn:has-text('Numérico')").first();
    if ((await numTab.count()) > 0) {
      await numTab.click();
      await page.waitForTimeout(400);
    }
    await assertNoPiiVisible(page, env.email);

    elements.guides[".tab-btn"] = await getNormalizedBox(page.locator("#guides-screen .tab-btn.active").first());
    elements.guides[".guide-topic-card"] = await getNormalizedBox(page.locator("#guides-screen .guide-topic-card").first());
    stills.guides = await captureWebp(page, "simadi_guias.webp", true);

    // Obtener ruta del video grabado antes de cerrar el contexto
    const videoObj = page.video();
    await context.close();
    if (videoObj) {
      recordedVideoPath = await videoObj.path();
    }
  } finally {
    await browser.close();
  }

  if (!recordedVideoPath || !fs.existsSync(recordedVideoPath)) {
    throw new Error("Playwright no generó el archivo de video bruto.");
  }

  // Optimizar clips con FFmpeg recortando totalmente el tramo de autenticación
  const clips = {
    config: trimWithFfmpeg(recordedVideoPath, "simadi_config_clip.webm", configStartRawMs, configEndRawMs),
    exam: trimWithFfmpeg(recordedVideoPath, "simadi_exam_clip.webm", examStartRawMs, examEndRawMs),
    flow: trimWithFfmpeg(recordedVideoPath, "simadi_flow.webm", configStartRawMs, examEndRawMs),
  };

  // Borrar video bruto temporal con login
  fs.rmSync(TEMP_VIDEO_DIR, { recursive: true, force: true });

  const manifest = {
    project: "Simulación Simadi",
    generatedAt: new Date().toISOString(),
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE,
    privacyVerified: true,
    hiddenSelectors: HIDE_SELECTORS,
    stills,
    clips,
    elements,
    interactions,
  };

  fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  console.log(
    JSON.stringify(
      {
        status: "ok",
        privacyVerified: true,
        stills: Object.keys(stills),
        clips,
        interactionsCount: interactions.length,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error("Error en capture-simadi:", err instanceof Error ? err.message : String(err));
  process.exit(1);
});
