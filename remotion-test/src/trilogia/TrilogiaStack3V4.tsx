/**
 * =====================================================================
 * TRILOGÍA "DE LA IDEA AL CÓDIGO" · PARTE 3: EL ARTE DEL PROMPT (V4 CINE HD)
 * =====================================================================
 * Duración: 1500 frames (25.0s @ 60 FPS) · 1080×1920 · Sincronizado al VO.
 *  - Beat 1 (0–240f · 0–4s):     Hook reactivo → comparativa elástica donde Contratos empuja al error monolítico a DOF.
 *  - Beat 2 (240–540f · 4–9s):   Antipatrón: atmósfera carmesí + prompt tachado por láser + 3 fallos con rack-focus.
 *  - Beat 3 (540–870f · 9–14.5s):Google AI Studio: System Prompt bloqueado + empuje elástico a Context Cache 1.2M.
 *  - Beat 4 (870–1200f · 14.5–20s):Contratos TypeScript escritos en vivo + acople físico de módulos UI & Backend.
 *  - Beat 5 (1200–1500f · 20–25s):CTA interactivo "PROMPT" + comentario y DM con contracts-kit.ts.
 * =====================================================================
 */
import React from "react";
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BeatCameraV4,
  BrandChipV4,
  DockingHeaderV4,
  EASE_CINEMATIC,
  FONT_MONO,
  InteractiveCtaV4,
  LiveTerminalV4,
  PillBadgeV4,
  RackFocusCardV4,
  ReactiveAtmosphereV4,
  SAFE_V4,
  SPRING_CARD,
  SPRING_PUNCH,
  STACK3_V4_PALETTE,
  SoundEffectV4,
  SvgBolt,
  SvgCheck,
  SvgCross,
  SvgLock,
  SvgWarning,
  TrilogyBgmV4,
  clampInterp,
  useSpringV4,
} from "./kitV4";

const TOTAL_FRAMES = 1500;
const DANGER = "#F87171";

export const TrilogiaStack3V4: React.FC = () => {
  const { fps } = useVideoConfig();
  const palette = STACK3_V4_PALETTE;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.baseDeep }}>
      {/* Atmósfera emocional: Tensión → Carmesí de error → Claridad Índigo/Cian */}
      <ReactiveAtmosphereV4
        moods={[
          { frame: 0, base: "#1B1B3A", deep: "#060814", orbA: "#38BDF8", orbB: "#F87171" },
          { frame: 240, base: "#35141C", deep: "#0E0508", orbA: "#F87171", orbB: "#FB923C" },
          { frame: 540, base: "#122645", deep: "#050B18", orbA: "#38BDF8", orbB: "#A78BFA" },
          { frame: 870, base: "#0E2A38", deep: "#040C14", orbA: "#38BDF8", orbB: "#34D399" },
          { frame: 1200, base: "#14274A", deep: "#050A18", orbA: "#38BDF8", orbB: "#818CF8" },
        ]}
        ambientLogos={[
          { file: "googleaistudio.svg", x: 750, y: 190, size: 175, blur: 4.5, speed: 0.85, opacity: 0.085 },
          { file: "gemini.svg", x: 55, y: 840, size: 155, blur: 5.5, speed: 0.72, opacity: 0.075 },
          { file: "vercel.svg", x: 785, y: 1330, size: 150, blur: 5, speed: 0.9, opacity: 0.07 },
          { file: "antigravity.svg", x: 100, y: 1530, size: 145, blur: 6, speed: 0.75, opacity: 0.065 },
        ]}
        cutFrames={[240, 540, 870, 1200]}
        flashColor={palette.accent}
      />

      <SoundEffectV4 file="riser.mp3" from={208} volume={0.22} />
      <SoundEffectV4 file="riser.mp3" from={508} volume={0.22} />
      <SoundEffectV4 file="riser.mp3" from={838} volume={0.22} />
      <SoundEffectV4 file="riser.mp3" from={1168} volume={0.26} />

      <Sequence from={0} durationInFrames={240} premountFor={fps} name="1·HookPrompt">
        <Beat1Hero />
      </Sequence>

      <Sequence from={240} durationInFrames={300} premountFor={fps} name="2·Antipatron">
        <Beat2Antipatron />
      </Sequence>

      <Sequence from={540} durationInFrames={330} premountFor={fps} name="3·AIStudio">
        <Beat3AIStudio />
      </Sequence>

      <Sequence from={870} durationInFrames={330} premountFor={fps} name="4·Contratos">
        <Beat4Contratos />
      </Sequence>

      <Sequence from={1200} durationInFrames={300} premountFor={fps} name="5·CTA">
        <Beat5Cta />
      </Sequence>

      <TrilogyBgmV4 totalFrames={TOTAL_FRAMES} volume={0.18} />
    </AbsoluteFill>
  );
};

export const TrilogiaStack3V4Reel = TrilogiaStack3V4;

// =====================================================================
// BEAT 1: HOOK · COMPARATIVA ELÁSTICA MONOLÍTICO → CONTRATOS (240f)
// =====================================================================
const Beat1Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palette = STACK3_V4_PALETTE;

  const badEnter = useSpringV4(34, SPRING_CARD);
  const goodPush = spring({
    frame: frame - 102,
    fps,
    config: SPRING_PUNCH,
  });

  // Micro-vibración sutil cuando aparece el error monolítico
  const badShake =
    frame >= 40 && frame <= 58 ? Math.sin(frame * 2.4) * 5 : 0;

  return (
    <BeatCameraV4
      durationInFrames={240}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 0, y: 24, scale: 1.05, rotate: -0.4 },
        { frame: 34, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 120, x: -8, y: -10, scale: 1.028, rotate: 0.25 },
        { frame: 240, x: 4, y: -18, scale: 1.045, rotate: -0.15 },
      ]}
    >
      <SoundEffectV4 file="whoosh-cinematic.mp3" from={0} volume={0.5} />
      <SoundEffectV4 file="impact-bass-1.mp3" from={10} volume={0.48} />
      <SoundEffectV4 file="glitch-1.mp3" from={40} volume={0.34} />
      <SoundEffectV4 file="whoosh-short.mp3" from={100} volume={0.45} />
      <SoundEffectV4 file="chime.mp3" from={118} volume={0.48} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <DockingHeaderV4
          badge="TRILOGÍA · PARTE 3 DE 3"
          accent={palette.accent}
          secondary={palette.secondary}
          logoFile="googleaistudio.svg"
          title="¿La IA te da *código roto*?"
          sub="El problema casi nunca es el modelo: es cómo estructuras tu prompt."
          heroTitleSize={102}
          dockFrame={30}
          dockScale={0.85}
          startYOffset={230}
        />

        {/* Comparativa elástica: Contratos empuja al error hacia arriba en DOF */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 26,
          }}
        >
          {/* Tarjeta 1: El error (entra primero, luego retrocede a DOF) */}
          <div
            style={{
              opacity: badEnter,
              translate: `${badShake}px ${-goodPush * 16}px`,
              scale: `${1 - goodPush * 0.05}`,
            }}
          >
            <RackFocusCardV4
              accent={DANGER}
              focusAmount={1 - goodPush * 0.85}
              maxBlur={2.8}
              padding="32px 32px"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <SvgCross size={34} color={DANGER} />
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 25,
                      fontWeight: 800,
                      color: DANGER,
                    }}
                  >
                    PROMPT MONOLÍTICO
                  </span>
                </div>
                <PillBadgeV4 text="ALUCINACIONES" color={DANGER} delay={42} />
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#FECACA",
                  lineHeight: 1.28,
                }}
              >
                &quot;Hazme un clon completo de Uber con auth y pagos.&quot;
              </div>
            </RackFocusCardV4>
          </div>

          {/* Tarjeta 2: El método ganador entra con fuerza */}
          <div
            style={{
              opacity: goodPush,
              translate: `0px ${(1 - goodPush) * 140}px`,
              scale: `${0.9 + goodPush * 0.1}`,
            }}
          >
            <RackFocusCardV4
              accent={palette.accent}
              focusAmount={goodPush}
              padding="36px 34px"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <SvgCheck size={36} color={palette.accent} />
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 26,
                      fontWeight: 800,
                      color: palette.accent,
                    }}
                  >
                    ENFOQUE POR CONTRATOS
                  </span>
                </div>
                <PillBadgeV4
                  text="0 BUGS"
                  color="#34D399"
                  delay={112}
                  icon={<SvgBolt size={22} color="#34D399" />}
                />
              </div>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  lineHeight: 1.25,
                }}
              >
                1. System Prompt · 2. Interfaces TS · 3. Módulos aislados
              </div>
            </RackFocusCardV4>
          </div>
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 2: EL ANTIPATRÓN · PROMPT TACHADO + RACK-FOCUS 3 FALLOS (300f)
// =====================================================================
const Beat2Antipatron: React.FC = () => {
  const frame = useCurrentFrame();
  const strikePct = clampInterp(frame, [26, 78], [0, 100], EASE_CINEMATIC);
  const activeFail = frame < 116 ? 0 : frame < 208 ? 1 : 2;
  const glitchX = frame >= 24 && frame <= 38 ? Math.sin(frame * 3.1) * 7 : 0;

  const failures = [
    {
      title: "Sobrecarga de contexto",
      desc: "La IA olvida las reglas que le dictaste pocos párrafos antes.",
    },
    {
      title: "Librerías inventadas",
      desc: "Crea imports y métodos que no existen para intentar cumplir todo.",
    },
    {
      title: "Código espagueti",
      desc: "Tipos incompatibles entre tu frontend, tu API y tu base de datos.",
    },
  ];

  return (
    <BeatCameraV4
      durationInFrames={300}
      accent={DANGER}
      poses={[
        { frame: 0, x: -28, y: 0, scale: 1.035, rotate: -0.35 },
        { frame: 32, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 165, x: 10, y: -10, scale: 1.024, rotate: 0.25 },
        { frame: 300, x: -6, y: -18, scale: 1.04, rotate: -0.15 },
      ]}
    >
      <SoundEffectV4 file="whoosh-short.mp3" from={0} volume={0.48} />
      <SoundEffectV4 file="glitch-2.mp3" from={24} volume={0.42} />
      <SoundEffectV4 file="error.mp3" from={52} volume={0.42} />
      <SoundEffectV4 file="click-soft.mp3" from={116} volume={0.4} />
      <SoundEffectV4 file="click-soft.mp3" from={208} volume={0.4} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 22,
        }}
      >
        <DockingHeaderV4
          badge="EL ERROR COMÚN · ANTIPATRÓN"
          accent={DANGER}
          secondary="#FB923C"
          logoFile="gemini.svg"
          title="El prompt *monolítico*"
          sub="Pedir una app completa en un solo mensaje satura la atención del modelo."
          heroTitleSize={96}
          dockFrame={16}
          dockScale={0.86}
          startYOffset={90}
        />

        {/* Caja de prompt monolítico con láser rojo que la tacha */}
        <div style={{ translate: `${glitchX}px 0px` }}>
          <RackFocusCardV4 accent={DANGER} focusAmount={1} delay={10} padding="26px 30px">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <SvgWarning size={30} color={DANGER} />
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 23,
                  fontWeight: 800,
                  color: DANGER,
                }}
              >
                CONTEXT OVERFLOW DETECTADO
              </span>
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 30,
                  color: "#FCA5A5",
                  lineHeight: 1.32,
                }}
              >
                &quot;Crea frontend, SQL, Stripe y websockets en un solo prompt.&quot;
              </span>
              {/* Línea láser roja tachando el antipatrón */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  height: 5,
                  width: `${strikePct}%`,
                  background: DANGER,
                  boxShadow: `0 0 22px ${DANGER}`,
                  borderRadius: 4,
                }}
              />
            </div>
          </RackFocusCardV4>
        </div>

        {/* 3 Diagnósticos con Rack-Focus secuencial */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 18,
          }}
        >
          {failures.map((item, idx) => {
            const isFocus = activeFail === idx;
            return (
              <RackFocusCardV4
                key={item.title}
                accent={DANGER}
                focusAmount={isFocus ? 1 : 0}
                maxBlur={2.4}
                delay={20 + idx * 10}
                padding="28px 30px"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <SvgCross size={42} color={DANGER} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 38, fontWeight: 800, color: "#FFFFFF" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 28, color: "#CBD5E1", marginTop: 6, lineHeight: 1.28 }}>
                    {item.desc}
                  </div>
                </div>
              </RackFocusCardV4>
            );
          })}
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 3: GOOGLE AI STUDIO · SYSTEM PROMPT → CONTEXT CACHE 1.2M (330f)
// =====================================================================
const Beat3AIStudio: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palette = STACK3_V4_PALETTE;

  const lockEnter = useSpringV4(96, SPRING_PUNCH);
  const cachePush = spring({
    frame: frame - 135,
    fps,
    config: SPRING_CARD,
  });

  const cachedMillions = clampInterp(frame, [152, 255], [0, 1.2], EASE_CINEMATIC);
  const speedPct = Math.round(clampInterp(frame, [160, 265], [0, 85], EASE_CINEMATIC));

  return (
    <BeatCameraV4
      durationInFrames={330}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 0, y: 20, scale: 1.03, rotate: 0 },
        { frame: 34, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 150, x: -8, y: -12, scale: 1.028, rotate: -0.2 },
        { frame: 330, x: 6, y: -22, scale: 1.05, rotate: 0.2 },
      ]}
    >
      <SoundEffectV4 file="whoosh.mp3" from={0} volume={0.48} />
      <SoundEffectV4 file="typing.mp3" from={16} volume={0.34} />
      <SoundEffectV4 file="click.mp3" from={96} volume={0.48} />
      <SoundEffectV4 file="whoosh-short.mp3" from={135} volume={0.45} />
      <SoundEffectV4 file="chime.mp3" from={252} volume={0.5} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <DockingHeaderV4
          badge="ESTRATEGIA 1 · SYSTEM PROMPT"
          accent={palette.accent}
          secondary={palette.secondary}
          logoFile="googleaistudio.svg"
          title="AI Studio + *Context Cache*"
          sub="Bloquea tus reglas de arquitectura una vez y elimina la re-evaluación."
          heroTitleSize={92}
          dockFrame={16}
          dockScale={0.86}
          startYOffset={90}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 22,
          }}
        >
          {/* System Prompt con bloqueo SVG (pasa a DOF suave al subir el Context Cache) */}
          <div
            style={{
              translate: `0px ${-cachePush * 14}px`,
              scale: `${1 - cachePush * 0.045}`,
              position: "relative",
            }}
          >
            <LiveTerminalV4
              title="aistudio ~ system-prompt.md"
              accent={palette.accent}
              statusLabel="INMUTABLE"
              fontSize={32}
              focusAmount={1 - cachePush * 0.8}
              delay={10}
              lines={[
                {
                  text: 'rule: "Primero contrato TS"',
                  startFrame: 16,
                  durationFrames: 42,
                  isPrompt: true,
                },
                {
                  text: "Regla fijada en todos los turnos",
                  startFrame: 68,
                  durationFrames: 34,
                  isSuccess: true,
                },
              ]}
            />
            {/* Sello de candado SVG al bloquear */}
            <div
              style={{
                position: "absolute",
                top: -18,
                right: 22,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 999,
                background: "#0B162C",
                border: `2px solid ${palette.accent}`,
                boxShadow: `0 0 28px ${palette.accent}66`,
                fontFamily: FONT_MONO,
                fontSize: 22,
                fontWeight: 800,
                color: palette.accent,
                opacity: lockEnter * (1 - cachePush * 0.35),
                scale: `${0.7 + lockEnter * 0.3}`,
              }}
            >
              <SvgLock size={22} color={palette.accent} />
              LOCK ACTIVO
            </div>
          </div>

          {/* Tarjeta Context Cache con métricas gigantes */}
          <div
            style={{
              opacity: cachePush,
              translate: `0px ${(1 - cachePush) * 145}px`,
              scale: `${0.9 + cachePush * 0.1}`,
            }}
          >
            <RackFocusCardV4 accent={palette.accent} focusAmount={cachePush} padding="34px 34px">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <BrandChipV4 file="gemini.svg" size={42} glow={palette.secondary} delay={140} />
                  <div>
                    <div style={{ fontSize: 38, fontWeight: 800 }}>Context Caching</div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 23, color: "#94A3B8" }}>
                      Arquitectura en memoria persistente
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div
                  style={{
                    padding: "24px 24px",
                    borderRadius: 22,
                    background: `${palette.accent}16`,
                    border: `2px solid ${palette.accent}88`,
                  }}
                >
                  <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: palette.accent, fontWeight: 800 }}>
                    TOKENS CACHEADOS
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 74,
                      fontWeight: 900,
                      color: "#FFFFFF",
                      marginTop: 8,
                      lineHeight: 1,
                    }}
                  >
                    {cachedMillions.toFixed(1)}M
                  </div>
                </div>

                <div
                  style={{
                    padding: "24px 24px",
                    borderRadius: 22,
                    background: `${palette.secondary}16`,
                    border: `2px solid ${palette.secondary}88`,
                  }}
                >
                  <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: palette.secondary, fontWeight: 800 }}>
                    MENOS LATENCIA
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 74,
                      fontWeight: 900,
                      color: palette.secondary,
                      marginTop: 8,
                      lineHeight: 1,
                    }}
                  >
                    -{speedPct}%
                  </div>
                </div>
              </div>
            </RackFocusCardV4>
          </div>
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 4: CONTRATOS MODULARES · INTERFAZ TS + ACOPLE FÍSICO (330f)
// =====================================================================
const Beat4Contratos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palette = STACK3_V4_PALETTE;
  const green = "#34D399";

  const scanY = clampInterp(frame, [110, 210], [0, 100], EASE_CINEMATIC);
  const snapModules = spring({
    frame: frame - 175,
    fps,
    config: SPRING_PUNCH,
  });

  return (
    <BeatCameraV4
      durationInFrames={330}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 24, y: 12, scale: 1.04, rotate: 0.35 },
        { frame: 32, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 185, x: -6, y: -12, scale: 1.03, rotate: -0.2 },
        { frame: 330, x: 4, y: -18, scale: 1.048, rotate: 0.15 },
      ]}
    >
      <SoundEffectV4 file="whoosh-short.mp3" from={0} volume={0.48} />
      <SoundEffectV4 file="typing.mp3" from={16} volume={0.34} />
      <SoundEffectV4 file="sparkle.mp3" from={116} volume={0.44} />
      <SoundEffectV4 file="pop.mp3" from={176} volume={0.44} />
      <SoundEffectV4 file="chime.mp3" from={215} volume={0.5} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 22,
        }}
      >
        <DockingHeaderV4
          badge="ESTRATEGIA 2 · ARQUITECTURA"
          accent={palette.accent}
          secondary={green}
          logoFile="vercel.svg"
          title="Contratos *modulares*"
          sub="Exige interfaces TypeScript estrictas antes de escribir lógica."
          heroTitleSize={94}
          dockFrame={16}
          dockScale={0.86}
          startYOffset={90}
        />

        {/* Tarjeta de contrato TypeScript con escáner vertical de tipos */}
        <div style={{ position: "relative" }}>
          <LiveTerminalV4
            title="types/contracts.ts ~ strict"
            accent={palette.accent}
            statusLabel="STRICT TS"
            fontSize={34}
            focusAmount={1}
            delay={10}
            lines={[
              {
                text: "interface GameState {",
                startFrame: 16,
                durationFrames: 30,
                color: palette.secondary,
              },
              {
                text: "  hero: HeroConfig;",
                startFrame: 50,
                durationFrames: 26,
                color: "#FFFFFF",
              },
              {
                text: "  save: () => Promise<boolean>;",
                startFrame: 80,
                durationFrames: 34,
                color: "#FFFFFF",
              },
              {
                text: "}",
                startFrame: 118,
                durationFrames: 12,
                color: palette.secondary,
              },
              {
                text: "0 errores de integración",
                startFrame: 138,
                durationFrames: 32,
                isSuccess: true,
              },
            ]}
          />

          {/* Escáner horizontal validando tipos */}
          {scanY > 1 && scanY < 99 && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${scanY}%`,
                height: 5,
                background: green,
                boxShadow: `0 0 28px 8px ${green}`,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Acople físico de 2 módulos independientes al contrato */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 22,
            }}
          >
            <div
              style={{
                opacity: snapModules,
                translate: `${(1 - snapModules) * -80}px 0px`,
              }}
            >
              <RackFocusCardV4 accent={palette.accent} focusAmount={1} padding="28px 26px">
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                  <SvgCheck size={32} color={palette.accent} />
                  <span style={{ fontFamily: FONT_MONO, fontSize: 22, fontWeight: 800, color: palette.accent }}>
                    MÓDULO 01
                  </span>
                </div>
                <div style={{ fontSize: 34, fontWeight: 800 }}>UI Aislada</div>
                <div style={{ fontSize: 25, color: "#CBD5E1", marginTop: 6 }}>
                  Consume el contrato sin romper el estado.
                </div>
              </RackFocusCardV4>
            </div>

            <div
              style={{
                opacity: snapModules,
                translate: `${(1 - snapModules) * 80}px 0px`,
              }}
            >
              <RackFocusCardV4 accent={green} focusAmount={1} padding="28px 26px">
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                  <SvgCheck size={32} color={green} />
                  <span style={{ fontFamily: FONT_MONO, fontSize: 22, fontWeight: 800, color: green }}>
                    MÓDULO 02
                  </span>
                </div>
                <div style={{ fontSize: 34, fontWeight: 800 }}>Backend Tipado</div>
                <div style={{ fontSize: 25, color: "#CBD5E1", marginTop: 6 }}>
                  Responde exactamente los tipos pactados.
                </div>
              </RackFocusCardV4>
            </div>
          </div>

          {/* Sello de acople verificado */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              opacity: snapModules,
              scale: `${0.85 + snapModules * 0.15}`,
            }}
          >
            <PillBadgeV4
              text="ENCUENTRO PERFECTO · ZERO TYPE ERRORS"
              color={green}
              delay={188}
              icon={<SvgBolt size={24} color={green} />}
            />
          </div>
        </div>
      </div>
    </BeatCameraV4>
  );
};

// =====================================================================
// BEAT 5: CTA COMUNIDAD · COMENTA "PROMPT" + DM PLANTILLAS (300f / 5.0s)
// =====================================================================
const Beat5Cta: React.FC = () => {
  const palette = STACK3_V4_PALETTE;

  return (
    <BeatCameraV4
      durationInFrames={300}
      accent={palette.accent}
      poses={[
        { frame: 0, x: 0, y: 18, scale: 1.05, rotate: 0 },
        { frame: 28, x: 0, y: 0, scale: 1.0, rotate: 0 },
        { frame: 185, x: 0, y: -10, scale: 1.024, rotate: 0.2 },
        { frame: 300, x: 0, y: -16, scale: 1.038, rotate: 0 },
      ]}
    >
      <SoundEffectV4 file="impact-bass-2.mp3" from={0} volume={0.52} />
      <SoundEffectV4 file="sparkle.mp3" from={22} volume={0.44} />
      <SoundEffectV4 file="pop.mp3" from={60} volume={0.42} />
      <SoundEffectV4 file="notification.mp3" from={102} volume={0.5} />

      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${SAFE_V4.top}px ${SAFE_V4.side}px ${SAFE_V4.bottom}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 28,
        }}
      >
        <DockingHeaderV4
          badge="TRILOGÍA COMPLETA · 3 DE 3"
          accent={palette.accent}
          secondary={palette.secondary}
          logoFile="googleaistudio.svg"
          title="Domina el *Prompting*"
          sub="Te envío el kit completo de contratos modulares y system prompts."
          heroTitleSize={98}
          dockFrame={14}
          dockScale={0.86}
          startYOffset={60}
        />

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <InteractiveCtaV4
            keyword="PROMPT"
            headline="¿Quieres mi kit maestro de contratos TypeScript y prompts?"
            dmTitle="DM de @santi.dev"
            dmSubtitle="contracts-kit.ts + system-prompt.md enviado"
            accent={palette.accent}
            darkTextColor="#050914"
            logos={["googleaistudio.svg", "gemini.svg", "vercel.svg"]}
            delay={10}
          />
        </div>
      </div>
    </BeatCameraV4>
  );
};
