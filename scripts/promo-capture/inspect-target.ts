/**
 * =====================================================================
 * INSPECTOR DOM, FLUJO INTERACTIVO Y TEMA PARA SIMULACIÓN SIMADI (FASE 2)
 * =====================================================================
 * Contrato:
 *  - Lee `SIMADI_URL`, `SIMADI_EMAIL` y `SIMADI_PASSWORD` exclusivamente
 *    desde `.env.capture` en la raíz del proyecto (git-ignored).
 *  - NUNCA imprime, registra ni guarda credenciales, correos o nombres
 *    personales en salidas JSON o archivos del proyecto.
 *  - Extrae tokens CSS reales -> `remotion-test/public/captures/simadi/theme.json`.
 *  - Inspecciona el flujo completo (Configuración -> Simulacro -> Diagnóstico
 *    -> Guías de Estudio -> Perfil/Progreso) y detecta selectores sensibles
 *    para ocultarlos durante la grabación en Fase 3.
 * =====================================================================
 */
import fs from "node:fs";
import path from "node:path";
import { chromium, type Page } from "playwright";

const ENV_PATH = path.join(process.cwd(), ".env.capture");
const OUT_DIR = path.join(process.cwd(), "remotion-test", "public", "captures", "simadi");

function loadEnv() {
  const raw = fs.readFileSync(ENV_PATH, "utf8");
  const map: Record<string, string> = {};
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i > 0) map[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return {
    url: map.SIMADI_URL || "",
    email: map.SIMADI_EMAIL || "",
    password: map.SIMADI_PASSWORD || "",
  };
}

function scrub(text: string, email: string): string {
  let out = text;
  if (email) {
    out = out.split(email).join("[REDACTED]");
    const local = email.split("@")[0];
    if (local && local.length >= 4) {
      out = out.replace(new RegExp(local.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "[REDACTED]");
    }
  }
  return out.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[REDACTED_EMAIL]");
}

async function getVisibleState(page: Page, email: string) {
  const raw = await page.evaluate(() => {
    const isVisible = (el: Element) => {
      const st = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return st.display !== "none" && st.visibility !== "hidden" && st.opacity !== "0" && r.width > 0 && r.height > 0;
    };
    const visibleButtons = Array.from(document.querySelectorAll("button, a, [role='tab']"))
      .filter(isVisible)
      .map((el) => ({
        id: el.id || null,
        cls: typeof el.className === "string" ? el.className : "",
        text: (el.textContent || "").trim(),
      }));
    const visibleSelects = Array.from(document.querySelectorAll("select"))
      .filter(isVisible)
      .map((s) => ({
        id: s.id || null,
        options: Array.from(s.options).map((o) => ({ value: o.value, text: (o.textContent || "").trim(), disabled: o.disabled })),
      }));
    const visibleInputs = Array.from(document.querySelectorAll("input"))
      .filter(isVisible)
      .map((i) => ({ id: i.id || null, type: i.type, name: i.name || "", value: i.type === "password" ? "***" : i.value }));
    const visibleSections = Array.from(document.querySelectorAll("section, main > div, [id*='view'], [id*='section'], [id*='tab'], [class*='card'], form"))
      .filter(isVisible)
      .map((el) => ({
        tag: el.tagName,
        id: el.id || null,
        cls: typeof el.className === "string" ? el.className.slice(0, 80) : "",
        text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 320),
      }))
      .slice(0, 15);
    const hasSvgOrCanvas = Array.from(document.querySelectorAll("svg, canvas")).filter(isVisible).length;
    const bodyText = (document.body?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 900);
    return { visibleButtons, visibleSelects, visibleInputs, visibleSections, hasSvgOrCanvas, bodyText };
  });

  return {
    visibleButtons: raw.visibleButtons.map((b) => ({ ...b, text: scrub(b.text, email) })),
    visibleSelects: raw.visibleSelects,
    visibleInputs: raw.visibleInputs.map((i) => ({ ...i, value: scrub(i.value, email) })),
    visibleSections: raw.visibleSections.map((s) => ({ ...s, text: scrub(s.text, email) })),
    hasSvgOrCanvas: raw.hasSvgOrCanvas,
    bodyText: scrub(raw.bodyText, email),
  };
}

async function main() {
  const env = loadEnv();
  const browser = await chromium.launch({ headless: true });
  const dialogs: string[] = [];
  const pageErrors: string[] = [];

  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
    const page = await context.newPage();

    page.on("dialog", async (d) => {
      dialogs.push(`${d.type()}: ${d.message()}`);
      await d.accept().catch(() => {});
    });
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(env.url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);

    // 1. Verificar identidad del sitio
    const landingRaw = await page.evaluate(() => ({
      title: document.title || "",
      url: window.location.href,
      text: (document.body?.innerText || "").replace(/\s+/g, " ").trim(),
    }));
    const isSimadi = /simadi|simulación|iniciar prueba|guías de estudio/i.test(`${landingRaw.title} ${landingRaw.text}`);
    if (!isSimadi) {
      console.log(JSON.stringify({ isSimadi: false, title: landingRaw.title, url: landingRaw.url }, null, 2));
      return;
    }

    // 2. Autenticación: esperar a que #gatekeeper-screen desaparezca completamente
    let authStatus = "none_needed";
    const gateVisible = await page.locator("#gate-submit-btn:visible").count();
    if (gateVisible > 0) {
      await page.locator("#gate-email").fill(env.email);
      await page.locator("#gate-password").fill(env.password);
      await page.locator("#gate-submit-btn").click();
      await page
        .waitForFunction(
          () => {
            const gate = document.querySelector("#gatekeeper-screen");
            if (!gate) return true;
            const st = getComputedStyle(gate);
            return st.display === "none" || !gate.classList.contains("active");
          },
          { timeout: 15000 }
        )
        .catch(() => {});
      await page.waitForTimeout(1500);
      const stillVisible = await page.locator("#gatekeeper-screen.active:visible, #gate-submit-btn:visible").count();
      authStatus = stillVisible === 0 ? "authenticated_via_gate" : "gate_still_active";
    } else {
      const loginBtn = page.locator("button:has-text('Iniciar Sesión'):visible").first();
      if ((await loginBtn.count()) > 0) {
        await loginBtn.click();
        await page.waitForTimeout(600);
        const modalScope = (await page.locator("#auth-modal:visible").count()) > 0 ? page.locator("#auth-modal") : page.locator("body");
        await modalScope.locator("input[type='email']:visible").first().fill(env.email);
        const pass = modalScope.locator("input[type='password']:visible").first();
        await pass.fill(env.password);
        await modalScope.locator("button[type='submit']:visible").first().click();
        await page.waitForTimeout(3000);
        authStatus = (await page.locator("#auth-modal:visible").count()) === 0 ? "authenticated_via_modal" : "modal_pending";
      }
    }

    const afterLogin = await getVisibleState(page, env.email);

    // 3. Extraer tokens computados reales de la vista autenticada -> theme.json
    const themeTokens = await page.evaluate(() => {
      const bodyStyle = getComputedStyle(document.body);
      const header = document.querySelector("header");
      const headerStyle = header ? getComputedStyle(header) : null;
      const mainTitle = document.querySelector("main h1, main h2, .card h2, .card h1, h2") || document.querySelector("h1");
      const h1Style = mainTitle ? getComputedStyle(mainTitle) : bodyStyle;
      const primaryBtn = Array.from(document.querySelectorAll("button.btn-primary, button")).find((b) => {
        const st = getComputedStyle(b);
        const r = b.getBoundingClientRect();
        return r.width > 0 && st.backgroundColor && !st.backgroundColor.includes("255, 255, 255") && st.backgroundColor !== "rgba(0, 0, 0, 0)";
      });
      const btnStyle = primaryBtn ? getComputedStyle(primaryBtn) : null;
      const card = document.querySelector("main .card:not([style*='display: none']), .card, form") || document.body;
      const cardStyle = getComputedStyle(card);
      const bgRgb = bodyStyle.backgroundColor || "rgb(244, 247, 249)";
      const m = bgRgb.match(/\d+/g)?.map(Number) || [244, 247, 249];
      const lum = (m[0] * 0.299 + m[1] * 0.587 + m[2] * 0.114) / 255;

      return {
        sourceUrl: window.location.origin + window.location.pathname,
        extractedAt: new Date().toISOString(),
        isDark: lum < 0.5,
        colors: {
          background: bgRgb,
          headerBackground: headerStyle?.backgroundColor || "rgb(255, 255, 255)",
          surface: cardStyle.backgroundColor !== "rgba(0, 0, 0, 0)" ? cardStyle.backgroundColor : "rgb(255, 255, 255)",
          surfaceAlt: "rgb(241, 245, 249)",
          primary: btnStyle?.backgroundColor || "rgb(15, 82, 186)",
          primaryText: btnStyle?.color || "rgb(255, 255, 255)",
          accent: h1Style.color !== "rgb(255, 255, 255)" ? h1Style.color : (btnStyle?.backgroundColor || "rgb(15, 82, 186)"),
          textPrimary: bodyStyle.color || "rgb(30, 41, 59)",
          textSecondary: "rgb(71, 85, 105)",
          border: cardStyle.borderColor && cardStyle.borderColor !== "rgb(0, 0, 0)" ? cardStyle.borderColor : "rgb(226, 232, 240)",
          success: "rgb(16, 185, 129)",
          warning: "rgb(245, 158, 11)",
          danger: "rgb(239, 68, 68)",
        },
        typography: {
          fontSans: bodyStyle.fontFamily,
          fontMono: "JetBrains Mono, monospace",
          h1Size: h1Style.fontSize,
          bodySize: bodyStyle.fontSize,
        },
        shape: {
          cardRadius: cardStyle.borderRadius || "16px",
          buttonRadius: btnStyle?.borderRadius || "8px",
          cardShadow: cardStyle.boxShadow && cardStyle.boxShadow !== "none" ? cardStyle.boxShadow : "rgba(0, 0, 0, 0.05) 0px 10px 30px 0px",
        },
      };
    });
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUT_DIR, "theme.json"), JSON.stringify(themeTokens, null, 2), "utf8");

    // 3b. Ir explícitamente a #nav-simulador para inspeccionar pantalla de Configuración
    if ((await page.locator("#nav-simulador:visible").count()) > 0) {
      await page.locator("#nav-simulador").click();
      await page.waitForTimeout(800);
    }
    const configState = await getVisibleState(page, env.email);

    // 4. Explorar Guías de Estudio (solo click en botones dentro de #guides-screen)
    let guiasState = null;
    const guiasBtn = page.locator("#nav-guias:visible").first();
    if ((await guiasBtn.count()) > 0) {
      await guiasBtn.click();
      await page.waitForTimeout(1000);
      guiasState = await getVisibleState(page, env.email);
      const mathTab = page.locator("#guides-screen button.tab-btn:has-text('Numérico'):visible").first();
      if ((await mathTab.count()) > 0) {
        await mathTab.click().catch(() => {});
        await page.waitForTimeout(500);
      }
      guiasState = { overview: guiasState, mathTab: await getVisibleState(page, env.email) };
    }

    // 5. Explorar Comunidad & Estadísticas (esperando carga de promedios)
    let comunidadState = null;
    const comBtn = page.locator("#nav-comunidad:visible").first();
    if ((await comBtn.count()) > 0) {
      await comBtn.click();
      await page.waitForTimeout(1800);
      comunidadState = await getVisibleState(page, env.email);
    }

    // 6. Volver a #nav-simulador e iniciar un simulacro corto dentro de #exam-screen
    await page.locator("#nav-simulador").click();
    await page.waitForTimeout(800);

    const areaSel = page.locator("select:visible").first();
    if ((await areaSel.count()) > 0) {
      await areaSel.selectOption("matematica").catch(async () => {
        const opts = await areaSel.evaluate((s: HTMLSelectElement) =>
          Array.from(s.options).map((o) => ({ value: o.value, disabled: o.disabled }))
        );
        const valid = opts.find((o) => o.value && !o.disabled);
        if (valid) await areaSel.selectOption(valid.value);
      });
      await page.waitForTimeout(300);
    }
    const qInput = page.locator("input[type='number']:visible").first();
    if ((await qInput.count()) > 0) {
      await qInput.fill("3").catch(() => {});
      await page.waitForTimeout(200);
    }

    let examState = null;
    let examDomMeta = null;
    let resultsState = null;

    const startBtn = page.locator("button:has-text('Iniciar Prueba'):visible").first();
    if ((await startBtn.count()) > 0) {
      await startBtn.click();
      await page.waitForTimeout(1500);
      examState = await getVisibleState(page, env.email);
      examDomMeta = await page.evaluate(() => {
        const vis = Array.from(document.querySelectorAll("#exam-screen *")).filter((el) => {
          const st = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return el.children.length === 0 && st.display !== "none" && st.visibility !== "hidden" && r.width > 0 && r.height > 0;
        });
        const timer = vis.find((el) => /\d{1,2}:\d{2}/.test(el.textContent || ""));
        const submitExamBtn = Array.from(document.querySelectorAll("#exam-screen button")).find((b) =>
          /entregar|finalizar|terminar/i.test(b.textContent || "")
        );
        return {
          timer: timer ? { tag: timer.tagName, id: timer.id, cls: timer.className, text: timer.textContent } : null,
          submitExamBtn: submitExamBtn ? { id: submitExamBtn.id, cls: submitExamBtn.className, text: submitExamBtn.textContent } : null,
        };
      });

      // Responder dentro de #exam-screen solamente
      for (let i = 0; i < 4; i++) {
        const optBtn = page.locator("#exam-screen button.option-btn:visible").first();
        if ((await optBtn.count()) > 0) {
          await optBtn.click().catch(() => {});
          await page.waitForTimeout(300);
        }
        const nextBtn = page.locator("#exam-screen #next-btn:visible").first();
        const finishBtn = page.locator("#exam-screen button:has-text('Entregar Examen'):visible, #exam-screen button:has-text('Finalizar'):visible").first();
        if (i < 2 && (await nextBtn.count()) > 0) {
          await nextBtn.click().catch(() => {});
          await page.waitForTimeout(400);
        } else if ((await finishBtn.count()) > 0) {
          await finishBtn.click().catch(() => {});
          await page.waitForTimeout(1500);
          break;
        }
      }

      resultsState = await getVisibleState(page, env.email);
    }

    // 7. Auditoría de selectores sensibles (PII) para ocultarlos en Fase 3
    const sensitiveSelectors = await page.evaluate((userEmail: string) => {
      const hits: string[] = [];
      const prefix = (userEmail.split("@")[0] || "").toLowerCase();
      for (const el of Array.from(document.querySelectorAll("header *, nav *, button, span, div, p"))) {
        const txt = (el.textContent || "").toLowerCase();
        if (
          (el.children.length === 0 && (txt.includes(userEmail.toLowerCase()) || (prefix.length >= 4 && txt.includes(prefix)))) ||
          el.id === "nav-profile-btn" ||
          el.id === "user-email" ||
          (typeof el.className === "string" && (el.className.includes("user-badge") || el.className.includes("user-info")))
        ) {
          const idPart = el.id ? `#${el.id}` : "";
          const cls = typeof el.className === "string" && el.className.trim() ? "." + el.className.trim().split(/\s+/).join(".") : "";
          hits.push(`${el.tagName.toLowerCase()}${idPart}${cls}`);
        }
      }
      return Array.from(new Set(hits));
    }, env.email);

    // 8. Revisión de viewport móvil (540x960)
    await page.setViewportSize({ width: 540, height: 960 });
    await page.waitForTimeout(400);
    const mobileOverflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
    }));

    console.log(
      JSON.stringify(
        {
          isSimadi: true,
          authStatus,
          dialogs,
          pageErrors,
          sensitiveSelectors,
          themeTokens,
          afterLogin,
          configState,
          guiasState,
          comunidadState,
          examState,
          examDomMeta,
          resultsState,
          mobileOverflow,
        },
        null,
        2
      )
    );
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
