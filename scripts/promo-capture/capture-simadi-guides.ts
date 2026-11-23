/**
 * =====================================================================
 * CAPTURA DE GUÍAS DE ESTUDIO ESTRUCTURADAS · SIMULACIÓN SIMADI
 * =====================================================================
 * Contrato:
 *  - Reutiliza las credenciales locales de `.env.capture` (git-ignored) y
 *    el blindaje de privacidad (`#promo-capture-shield`) para ocultar toda
 *    información personal o controles Admin antes del primer frame.
 *  - Graba el cambio fluido entre pestañas reales en `#guides-screen`:
 *      1) Razonamiento Verbal (`simadi_guias_verbal.webp`)
 *      2) Razonamiento Lógico Numérico
 *      3) Ciencia y Tecnología (`simadi_guias_ciencia.webp`)
 *  - Optimiza a VP9 `.webm` (`simadi_guias_clip.webm`) con FFmpeg local.
 *  - Actualiza de forma no destructiva `manifest.json` agregando las
 *    capturas de guías, el clip y los clics reales sincronizables con SFX.
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

const VIEWPORT = { width: 1000, height: 740 };
const DEVICE_SCALE = 2;
const ROOT_DIR = process.cwd();
const ENV_PATH = path.join(ROOT_DIR, ".env.capture");
const OUT_DIR = path.join(ROOT_DIR, "remotion-test", "public", "captures", "simadi");
const TEMP_VIDEO_DIR = path.join(ROOT_DIR, "scratch", "_simadi_guides_raw");
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

async function injectPrivacyAndCursor(page: Page): Promise<void> {
  const hideCss = `${HIDE_SELECTORS.join(", ")} { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }`;
  await page.evaluate((shieldCss) => {
    const prev = document.getElementById("promo-capture-shield");
    if (prev) prev.remove();
    const style = document.createElement("style");
    style.id = "promo-capture-shield";
    style.textContent = `
      ::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
      * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
      ${shieldCss}
      #promo-svg-cursor {
        position: fixed; top: 0; left: 0; width: 30px; height: 30px;
        pointer-events: none; z-index: 999999;
        transform: translate3d(500px, 370px, 0);
        filter: drop-shadow(0 4px 10px rgba(15, 23, 42, 0.32));
      }
      #promo-cursor-ripple {
        position: fixed; top: 0; left: 0; width: 36px; height: 36px;
        margin-left: -18px; margin-top: -18px; border-radius: 50%;
        border: 3px solid rgba(15, 82, 186, 0.85); background: rgba(15, 82, 186, 0.18);
        pointer-events: none; z-index: 999998; opacity: 0;
      }
    `;
    document.head.appendChild(style);

    if (!document.getElementById("promo-svg-cursor")) {
      const c = document.createElement("div");
      c.id = "promo-svg-cursor";
      c.innerHTML = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4.5 3.5L23.5 13.2L15.1 15.7L11.4 23.8L4.5 3.5Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.2" stroke-linejoin="round"/></svg>`;
      document.body.appendChild(c);
    }
    if (!document.getElementById("promo-cursor-ripple")) {
      const r = document.createElement("div");
      r.id = "promo-cursor-ripple";
      document.body.appendChild(r);
    }
  }, hideCss);
}

async function assertNoPiiVisible(page: Page, email: string): Promise<void> {
  const localPrefix = (email.split("@")[0] || "").toLowerCase();
  const leak = await page.evaluate(
    ({ fullEmail, prefix }) => {
      const txt = (document.body?.innerText || "").toLowerCase();
      if (fullEmail && txt.includes(fullEmail.toLowerCase())) return "email";
      if (prefix && prefix.length >= 5 && txt.includes(prefix)) return "prefix";
      if (txt.includes("panel dev") || txt.includes("administrador vitalicio")) return "admin";
      return null;
    },
    { fullEmail: email, prefix: localPrefix }
  );
  if (leak) throw new Error(`Fuga detectada (${leak}).`);
}

async function getNormalizedBox(locator: Locator): Promise<NormalizedBox> {
  const raw = await locator.boundingBox();
  if (!raw) return { x: 0.15, y: 0.4, width: 0.7, height: 0.25, centerX: 0.5, centerY: 0.52 };
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

async function smoothClick(
  page: Page,
  cursorState: { x: number; y: number },
  locator: Locator
): Promise<{ box: NormalizedBox; rawMs: number; tx: number; ty: number }> {
  const box = await getNormalizedBox(locator);
  const tx = box.centerX * VIEWPORT.width;
  const ty = box.centerY * VIEWPORT.height;
  const sx = cursorState.x;
  const sy = cursorState.y;

  for (let i = 1; i <= 24; i++) {
    const t = i / 24;
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const cx = sx + (tx - sx) * ease;
    const cy = sy + (ty - sy) * ease;
    await page.evaluate(
      ({ x, y }) => {
        const el = document.getElementById("promo-svg-cursor");
        if (el) el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      },
      { x: cx, y: cy }
    );
    await page.waitForTimeout(16);
  }
  cursorState.x = tx;
  cursorState.y = ty;

  await page.evaluate(
    ({ x, y }) => {
      const r = document.getElementById("promo-cursor-ripple");
      if (r) {
        r.style.left = `${x}px`;
        r.style.top = `${y}px`;
        r.animate(
          [
            { opacity: 0.9, transform: "scale(0.35)" },
            { opacity: 0, transform: "scale(1.6)" },
          ],
          { duration: 360, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );
      }
    },
    { x: tx, y: ty }
  );

  const rawMs = Date.now();
  await locator.click();
  return { box, rawMs, tx, ty };
}

async function captureWebp(page: Page, outFilename: string): Promise<{ file: string; width: number; height: number }> {
  await page.evaluate(() => {
    const c = document.getElementById("promo-svg-cursor");
    if (c) c.style.opacity = "0";
  });
  const pngBuffer = await page.screenshot({ type: "png" });
  await page.evaluate(() => {
    const c = document.getElementById("promo-svg-cursor");
    if (c) c.style.opacity = "1";
  });

  const res = await page.evaluate(async (b64: string) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Canvas decode failed"));
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2D context");
    ctx.drawImage(img, 0, 0);
    return {
      width: canvas.width,
      height: canvas.height,
      b64Webp: (canvas.toDataURL("image/webp", 0.92).split(",")[1] || ""),
    };
  }, pngBuffer.toString("base64"));

  fs.writeFileSync(path.join(OUT_DIR, outFilename), Buffer.from(res.b64Webp, "base64"));
  return { file: outFilename, width: res.width, height: res.height };
}

async function main(): Promise<void> {
  const env = loadEnv();
  fs.rmSync(TEMP_VIDEO_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEMP_VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  let recordedVideoPath: string | null = null;
  const cursorState = { x: 500, y: 370 };

  let guidesStartEpochMs = 0;
  let guidesStartRawMs = 0;
  let guidesEndRawMs = 0;
  const newInteractions: Array<{
    id: string;
    screen: string;
    clipId: string;
    selector: string;
    label: string;
    rawMs: number;
    clipTimestampMs: number;
    clipFrame60: number;
    box: NormalizedBox;
  }> = [];
  const guideBoxes: Record<string, NormalizedBox> = {};
  let stillVerbal = { file: "simadi_guias_verbal.webp", width: 2000, height: 1480 };
  let stillCiencia = { file: "simadi_guias_ciencia.webp", width: 2000, height: 1480 };

  try {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE,
      recordVideo: { dir: TEMP_VIDEO_DIR, size: VIEWPORT },
    });
    const videoEpochMs = Date.now();
    const page = await context.newPage();

    await page.goto(env.url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(600);

    if ((await page.locator("#gate-submit-btn:visible").count()) > 0) {
      await page.locator("#gate-email").fill(env.email);
      await page.locator("#gate-password").fill(env.password);
      await page.locator("#gate-submit-btn").click();
      await page.waitForFunction(
        () => {
          const g = document.querySelector("#gatekeeper-screen");
          return !g || getComputedStyle(g).display === "none" || !g.classList.contains("active");
        },
        { timeout: 15000 }
      );
      await page.waitForTimeout(700);
    }

    await page.locator("#nav-guias").click();
    await page.locator("#guides-screen.active").waitFor({ state: "visible", timeout: 10000 });
    await page.waitForTimeout(450);

    await injectPrivacyAndCursor(page);
    await assertNoPiiVisible(page, env.email);

    guidesStartEpochMs = Date.now();
    guidesStartRawMs = guidesStartEpochMs - videoEpochMs;

    guideBoxes["tab-verbal"] = await getNormalizedBox(page.locator("#guides-screen .tab-btn").nth(0));
    guideBoxes["tab-math"] = await getNormalizedBox(page.locator("#guides-screen .tab-btn").nth(1));
    guideBoxes["tab-science"] = await getNormalizedBox(page.locator("#guides-screen .tab-btn").nth(2));

    await page.waitForTimeout(650);
    stillVerbal = await captureWebp(page, "simadi_guias_verbal.webp");

    const mathClick = await smoothClick(page, cursorState, page.locator("#guides-screen .tab-btn").nth(1));
    const mathClipMs = Math.max(0, mathClick.rawMs - guidesStartEpochMs);
    newInteractions.push({
      id: "click_guides_math",
      screen: "guides",
      clipId: "simadi_guias_clip.webm",
      selector: ".tab-btn",
      label: "Razonamiento Lógico Numérico",
      rawMs: mathClick.rawMs - videoEpochMs,
      clipTimestampMs: mathClipMs,
      clipFrame60: Math.round((mathClipMs / 1000) * 60),
      box: mathClick.box,
    });
    await page.waitForTimeout(1300);

    const sciClick = await smoothClick(page, cursorState, page.locator("#guides-screen .tab-btn").nth(2));
    const sciClipMs = Math.max(0, sciClick.rawMs - guidesStartEpochMs);
    newInteractions.push({
      id: "click_guides_science",
      screen: "guides",
      clipId: "simadi_guias_clip.webm",
      selector: ".tab-btn",
      label: "Ciencia y Tecnología",
      rawMs: sciClick.rawMs - videoEpochMs,
      clipTimestampMs: sciClipMs,
      clipFrame60: Math.round((sciClipMs / 1000) * 60),
      box: sciClick.box,
    });
    await page.waitForTimeout(1100);
    await assertNoPiiVisible(page, env.email);
    guideBoxes[".guide-topic-card"] = await getNormalizedBox(page.locator("#guides-screen .guide-topic-card").first());
    stillCiencia = await captureWebp(page, "simadi_guias_ciencia.webp");

    guidesEndRawMs = Date.now() - videoEpochMs;

    const vid = page.video();
    await context.close();
    if (vid) recordedVideoPath = await vid.path();
  } finally {
    await browser.close();
  }

  if (!recordedVideoPath || !fs.existsSync(recordedVideoPath)) {
    throw new Error("No se generó video bruto de guías.");
  }

  const startSec = Math.max(0, guidesStartRawMs / 1000).toFixed(3);
  const durationMs = Math.max(1000, guidesEndRawMs - guidesStartRawMs);
  const durationSec = (durationMs / 1000).toFixed(3);
  const outClip = path.join(OUT_DIR, "simadi_guias_clip.webm");

  execFileSync(
    FFMPEG_BIN,
    [
      "-y",
      "-ss",
      startSec,
      "-i",
      recordedVideoPath,
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
      outClip,
    ],
    { stdio: "pipe" }
  );

  fs.rmSync(TEMP_VIDEO_DIR, { recursive: true, force: true });

  // Fusionar de manera no destructiva con manifest.json existente
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.stills.guidesVerbal = stillVerbal;
  manifest.stills.guidesCiencia = stillCiencia;
  manifest.clips.guides = {
    file: "simadi_guias_clip.webm",
    startRawMs: guidesStartRawMs,
    endRawMs: guidesEndRawMs,
    durationMs,
    durationFrames60: Math.round((durationMs / 1000) * 60),
  };
  manifest.elements.guides = {
    ...(manifest.elements.guides || {}),
    ...guideBoxes,
  };
  manifest.interactions = [
    ...manifest.interactions.filter((x: { clipId?: string }) => x.clipId !== "simadi_guias_clip.webm"),
    ...newInteractions,
  ];

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(JSON.stringify({ status: "ok", clip: manifest.clips.guides, interactions: newInteractions.length }, null, 2));
}

main().catch((err) => {
  console.error("Error capture-simadi-guides:", err instanceof Error ? err.message : String(err));
  process.exit(1);
});

