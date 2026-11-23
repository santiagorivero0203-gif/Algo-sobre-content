/**
 * =====================================================================
 * CAPTURA VERTICAL RESPONSIVE HD · SIMULACIÓN SIMADI V3
 * =====================================================================
 * Graba la aplicación real en viewport vertical responsive (`540×810` a
 * `deviceScaleFactor: 2` → `1080×1620` Retina) para que la web ocupe el
 * protagonismo real en TikTok/Reels (9:16) e Instagram (4:5) sin
 * encerrarse en una ventana horizontal pequeña.
 *
 * Contratos de seguridad y calidad:
 *  - Lee credenciales únicamente desde `.env.capture` (git-ignored).
 *  - Oculta barra de usuario y controles admin vía `#promo-capture-shield`.
 *  - Verifica por DOM cero filtraciones de PII / Admin antes de capturar.
 *  - Exporta clip H.264 de altísima nitidez (`-crf 14 -preset slow`),
 *    PNGs Retina sin pérdida y `manifest-vertical.json` en
 *    `remotion-test/public/captures/simadi/vertical/`.
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
  clipTimestampMs: number;
  clipFrame60: number;
  box: NormalizedBox;
}

const LOGICAL_MOBILE_W = 540;
const LOGICAL_MOBILE_H = 810;
const CSS_ZOOM = 2;
const VIEWPORT = { width: LOGICAL_MOBILE_W * CSS_ZOOM, height: LOGICAL_MOBILE_H * CSS_ZOOM }; // 1080×1620 nativos sin gris
const OUTPUT_W = VIEWPORT.width;   // 1080
const OUTPUT_H = VIEWPORT.height;  // 1620

const ROOT_DIR = process.cwd();
const ENV_PATH = path.join(ROOT_DIR, ".env.capture");
const OUT_DIR = path.join(ROOT_DIR, "remotion-test", "public", "captures", "simadi", "vertical");
const TEMP_VIDEO_DIR = path.join(ROOT_DIR, "scratch", "_simadi_vertical_raw");
const FFMPEG_BIN = path.join(
  ROOT_DIR,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg"
);

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

/** Inyecta blindaje CSS (cero scrollbars y cero UI privada/admin) más cursor SVG suave. */
async function injectPrivacyAndCursor(page: Page): Promise<void> {
  const hideCss = `${HIDE_SELECTORS.join(", ")} { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }`;
  await page.evaluate(({ shieldCss, cssZoom }) => {
    const prev = document.getElementById("promo-capture-shield");
    if (prev) prev.remove();
    const style = document.createElement("style");
    style.id = "promo-capture-shield";
    style.textContent = `
      html { zoom: ${cssZoom}; }
      ::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
      * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
      ${shieldCss}
      #promo-svg-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 24px;
        height: 24px;
        pointer-events: none;
        z-index: 999999;
        transform: translate3d(270px, 405px, 0);
        filter: drop-shadow(0 2px 6px rgba(15, 23, 42, 0.28));
      }
      #promo-cursor-ripple {
        position: fixed;
        top: 0;
        left: 0;
        width: 34px;
        height: 34px;
        margin-left: -17px;
        margin-top: -17px;
        border-radius: 50%;
        border: 3px solid rgba(15, 82, 186, 0.85);
        background: rgba(15, 82, 186, 0.18);
        pointer-events: none;
        z-index: 999998;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);

    if (!document.getElementById("promo-svg-cursor")) {
      const cursor = document.createElement("div");
      cursor.id = "promo-svg-cursor";
      cursor.innerHTML = `
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  }, { shieldCss: hideCss, cssZoom: CSS_ZOOM });
}

/** Verifica que ningún texto visible en el DOM contenga PII oUI administrativa. */
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
  if (leak) throw new Error(`Fuga de privacidad abortada en captura vertical (${leak}).`);
}

/** Calcula boundingBox normalizado (0..1) relativo al viewport vertical 540×810. */
async function getNormalizedBox(locator: Locator): Promise<NormalizedBox> {
  const raw = await locator.boundingBox();
  if (!raw) return { x: 0.1, y: 0.25, width: 0.8, height: 0.4, centerX: 0.5, centerY: 0.45 };
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

/** Interpola el cursor SVG suavemente hasta el centro del control destino. */
async function moveCursorSmoothly(
  page: Page,
  cursorState: { x: number; y: number },
  locator: Locator,
  steps = 24
): Promise<{ box: NormalizedBox; targetX: number; targetY: number }> {
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  const box = await getNormalizedBox(locator);
  // Coordenadas CSS lógicas (0..540 x 0..810) dentro de html { zoom: 2 }
  const targetX = box.centerX * LOGICAL_MOBILE_W;
  const targetY = box.centerY * LOGICAL_MOBILE_H;
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
          { duration: 360, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
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
    clipTimestampMs,
    clipFrame60: Math.round((clipTimestampMs / 1000) * 60),
    box,
  });
  return box;
}

/** Captura PNG nítida Retina 2x (1080×1620) ocultando opcionalmente el cursor SVG. */
async function captureCrispPng(page: Page, filename: string, hideCursor = true): Promise<string> {
  if (hideCursor) {
    await page.evaluate(() => {
      const c = document.getElementById("promo-svg-cursor");
      if (c) c.style.opacity = "0";
    });
  }
  const buf = await page.screenshot({ type: "png" });
  if (hideCursor) {
    await page.evaluate(() => {
      const c = document.getElementById("promo-svg-cursor");
      if (c) c.style.opacity = "1";
    });
  }
  fs.writeFileSync(path.join(OUT_DIR, filename), buf);
  return filename;
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
  const cursorState = { x: 270, y: 405 };
  const interactions: InteractionEvent[] = [];
  const elements: Record<string, Record<string, NormalizedBox>> = {
    exam: {},
    results: {},
  };

  let examStartRawMs = 0;
  let examEndRawMs = 0;

  try {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
      recordVideo: { dir: TEMP_VIDEO_DIR, size: { width: OUTPUT_W, height: OUTPUT_H } },
    });
    const videoStartEpochMs = Date.now();
    const page = await context.newPage();

    // 1. Login fuera de cámara
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

    // Ir al simulador, inyectar blindaje y configurar 3 preguntas rápidamente
    await page.locator("#nav-simulador").click();
    await page.waitForTimeout(450);
    await injectPrivacyAndCursor(page);
    await assertNoPiiVisible(page, env.email);

    await page.locator("#area").selectOption("Razonamiento Lógico Numérico");
    await page.locator("#num-questions").fill("3");
    await page.locator("#start-btn").click();

    await page.locator("#exam-screen.active").waitFor({ state: "visible", timeout: 10000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(350);
    await assertNoPiiVisible(page, env.email);

    // Inicio del segmento limpio del simulacro vertical en vivo
    examStartRawMs = Date.now() - videoStartEpochMs;
    elements.exam["#timer"] = await getNormalizedBox(page.locator("#timer"));
    elements.exam[".question-card"] = await getNormalizedBox(page.locator("#exam-screen .question-card"));
    elements.exam[".option-btn"] = await getNormalizedBox(page.locator("#exam-screen .option-btn").nth(0));
    elements.exam["#next-btn"] = await getNormalizedBox(page.locator("#next-btn"));

    // 2.0s observando cronómetro real y enunciado en vista móvil
    await page.waitForTimeout(2000);

    await smoothClick(
      page,
      cursorState,
      page.locator("#exam-screen .option-btn").nth(0),
      {
        id: "vertical_select_option",
        screen: "exam",
        clipId: "simadi_vertical_exam_clip.mp4",
        selector: ".option-btn",
        label: "Respuesta elegida",
        videoStartEpochMs,
        clipStartRawMs: examStartRawMs,
      },
      interactions
    );
    await page.waitForTimeout(550);
    await assertNoPiiVisible(page, env.email);
    await captureCrispPng(page, "simadi_vertical_exam.png", true);

    await smoothClick(
      page,
      cursorState,
      page.locator("#next-btn"),
      {
        id: "vertical_next_question",
        screen: "exam",
        clipId: "simadi_vertical_exam_clip.mp4",
        selector: "#next-btn",
        label: "Siguiente pregunta",
        videoStartEpochMs,
        clipStartRawMs: examStartRawMs,
      },
      interactions
    );
    await page.waitForTimeout(1600);
    examEndRawMs = Date.now() - videoStartEpochMs;

    // Completar examen para obtener pantalla de resultados con >0 aciertos
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
          await opts.nth((step + attempt) % count).click();
          await page.waitForTimeout(200);
        }
        const submitBtn = page.locator("#exam-screen #submit-btn:visible").first();
        const nextBtn = page.locator("#exam-screen #next-btn:visible").first();
        if ((await submitBtn.count()) > 0) {
          await submitBtn.click();
          break;
        } else if ((await nextBtn.count()) > 0) {
          await nextBtn.click();
          await page.waitForTimeout(260);
        }
      }
      await page.locator("#report-screen.active").waitFor({ state: "visible", timeout: 10000 });
      const reportText = await page.locator("#report-screen").innerText();
      if (!reportText.includes("0/3")) break;
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(550);
    await assertNoPiiVisible(page, env.email);

    const reportCard = page.locator("#report-screen .card").first();
    elements.results["#report-screen .card"] = await getNormalizedBox(reportCard);
    const scoreBox = page.locator("#report-screen .card > div").first();
    if ((await scoreBox.count()) > 0) {
      elements.results["score-header"] = await getNormalizedBox(scoreBox);
    }
    await captureCrispPng(page, "simadi_vertical_results.png", true);

    const videoObj = page.video();
    await context.close();
    if (videoObj) recordedVideoPath = await videoObj.path();
  } finally {
    await browser.close();
  }

  if (!recordedVideoPath || !fs.existsSync(recordedVideoPath)) {
    throw new Error("Playwright no devolvió grabación vertical.");
  }

  // Exportar clip limpio H.264 Master (1080×1620 @ 60fps, CRF 14, faststart)
  const clipOutPath = path.join(OUT_DIR, "simadi_vertical_exam_clip.mp4");
  const startSec = Math.max(0, examStartRawMs / 1000).toFixed(3);
  const durMs = Math.max(2000, examEndRawMs - examStartRawMs);
  const durSec = (durMs / 1000).toFixed(3);

  execFileSync(
    FFMPEG_BIN,
    [
      "-y",
      "-v",
      "error",
      "-ss",
      startSec,
      "-i",
      recordedVideoPath,
      "-t",
      durSec,
      "-vf",
      `scale=${OUTPUT_W}:${OUTPUT_H}:flags=lanczos`,
      "-r",
      "60",
      "-c:v",
      "libx264",
      "-crf",
      "14",
      "-preset",
      "slow",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      clipOutPath,
    ],
    { stdio: "pipe" }
  );

  const manifest = {
    project: "Simulación Simadi · Vertical HD",
    generatedAt: new Date().toISOString(),
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    cssZoom: CSS_ZOOM,
    outputSize: { width: OUTPUT_W, height: OUTPUT_H },
    privacyVerified: true,
    stills: {
      exam: { file: "simadi_vertical_exam.png", width: OUTPUT_W, height: OUTPUT_H },
      results: { file: "simadi_vertical_results.png", width: OUTPUT_W, height: OUTPUT_H },
    },
    clip: {
      file: "simadi_vertical_exam_clip.mp4",
      startRawMs: examStartRawMs,
      endRawMs: examEndRawMs,
      durationMs: durMs,
      durationFrames60: Math.round((durMs / 1000) * 60),
    },
    elements,
    interactions,
  };

  fs.writeFileSync(path.join(OUT_DIR, "manifest-vertical.json"), JSON.stringify(manifest, null, 2), "utf8");
  fs.rmSync(TEMP_VIDEO_DIR, { recursive: true, force: true });

  console.log(`VERTICAL_CAPTURE_OK: clip=${clipOutPath} dur=${durSec}s frames60=${manifest.clip.durationFrames60} interactions=${interactions.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

