/**
 * =====================================================================
 * SANTI.DEV · MOTOR DE REELS ANIMADOS POR CÓDIGO (60 FPS NATIVO)
 * =====================================================================
 * Motor de renderizado en Canvas 2D + Web Audio API + MediaRecorder:
 * Diseñado según los lineamientos de 'claude-content-skills'
 * (reel-builder, reel-scripter, on-screen-text-writer, viral-hook-writer).
 *
 * Características:
 *   - Renderizado 1080x1920 a 60 FPS con aceleración por hardware.
 *   - Movimiento en Frame 0: fondos dinámicos, retícula cyber y partículas en t=0.
 *   - Tipografía cinética con entrada elástica y palabra clave (punch word) destacada.
 *   - Escenas técnicas modulares: Terminal, Visión AI 21D, Diff de Código, Flujo y Arcade.
 *   - Tarjeta CTA interactiva con simulación de comentario y auto-DM en vivo.
 *   - Sintetizador de audio web para clics de teclado y ritmo ambiental.
 *   - Exportación directa a video (.webm / .mp4) sin servidores externos.
 * =====================================================================
 */

/**
 * Sintetizador de audio Web Audio API para efectos de sonido sutiles
 */
class ReelAudioSynth {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.lastTypeClickTime = 0;
    }

    init() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    playTypingClick() {
        if (this.muted || !this.ctx) return;
        const now = this.ctx.currentTime;
        if (now - this.lastTypeClickTime < 0.07) return; // Limitar frecuencia de clics
        this.lastTypeClickTime = now;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.035);
        } catch (e) {
            // Audio contextual silenciado por política del navegador
        }
    }

    playBeatDrop() {
        if (this.muted || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(45, now + 0.28);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.35);
        } catch (e) { }
    }
}

/**
 * Motor principal de dibujo en Canvas para los Reels
 */
window.ReelRenderer = {
    audio: new ReelAudioSynth(),

    /**
     * Dibuja un fotograma completo en el canvas a resolución 1080x1920
     */
    drawFrame(ctx, reel, currentTime, isPlaying = false) {
        const width = 1080;
        const height = 1920;
        ctx.save();

        // 1. Determinar el beat activo y tiempo relativo
        const beats = reel.beats || [];
        let currentBeat = beats[0];
        for (let i = 0; i < beats.length; i++) {
            if (currentTime >= beats[i].start && currentTime <= beats[i].end) {
                currentBeat = beats[i];
                break;
            } else if (currentTime > beats[beats.length - 1].end) {
                currentBeat = beats[beats.length - 1];
            }
        }
        const beatTime = Math.max(0, currentTime - currentBeat.start);
        const beatDuration = currentBeat.end - currentBeat.start;
        const beatProgress = Math.min(1, Math.max(0, beatTime / beatDuration));

        // Obtener el tema visual de la paleta central
        const theme = window.THEMES[reel.theme] || window.THEMES.dev_blue;
        const account = window.getAccountForReel(reel);

        // 2. Fondo Dinámico (Frame 0 Movement): Jamás fondo quieto
        this.drawDynamicBackground(ctx, width, height, currentTime, theme, reel.theme);

        // 3. Banda Superior HUD y Barra de Beats Segmentada
        this.drawSegmentedBeatBar(ctx, width, reel, currentTime, currentBeat, theme);

        // 4. Capa de Escena Técnica (Terminal, Visión AI, Diff de Código, Arcade o CTA)
        this.drawSceneContent(ctx, width, height, currentBeat, beatTime, currentTime, theme, reel, isPlaying);

        // 5. Tipografía Cinética (Mute-Pass Rule: <7 palabras con punchWord brillante)
        this.drawKineticTypography(ctx, width, currentBeat, beatTime, theme);

        // 6. Visualizador de Espectro de Audio y Marca de Agua Inferior
        this.drawAudioVisualizerAndFooter(ctx, width, height, currentTime, reel, theme, account);

        ctx.restore();
    },

    /**
     * 2. Fondo dinámico animado a 60 FPS con cuadrícula y partículas
     */
    drawDynamicBackground(ctx, width, height, t, theme, themeKey) {
        // Fondo base degradado ultra profundo
        const baseBg = theme.bgCanvas || '#080E1A';
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, baseBg);
        grad.addColorStop(0.5, '#050B14');
        grad.addColorStop(1, '#02050A');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Orbes de resplandor ambiental neón flotantes
        const orb1X = width * 0.3 + Math.sin(t * 0.8) * 120;
        const orb1Y = height * 0.25 + Math.cos(t * 0.6) * 100;
        const radGrad1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, 520);
        radGrad1.addColorStop(0, theme.accent + '28');
        radGrad1.addColorStop(1, 'transparent');
        ctx.fillStyle = radGrad1;
        ctx.fillRect(0, 0, width, height);

        const orb2X = width * 0.75 + Math.cos(t * 0.7) * 110;
        const orb2Y = height * 0.68 + Math.sin(t * 0.9) * 90;
        const radGrad2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, 480);
        radGrad2.addColorStop(0, (theme.codeKw || theme.accent) + '1f');
        radGrad2.addColorStop(1, 'transparent');
        ctx.fillStyle = radGrad2;
        ctx.fillRect(0, 0, width, height);

        // Cuadrícula en perspectiva (Cyber Perspective Grid)
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
        ctx.lineWidth = 1.5;

        const gridStep = 72;
        const offsetY = (t * 40) % gridStep;

        // Líneas verticales
        for (let x = 0; x <= width; x += gridStep) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Líneas horizontales con desplazamiento suave
        for (let y = -gridStep; y <= height + gridStep; y += gridStep) {
            ctx.beginPath();
            ctx.moveTo(0, y + offsetY);
            ctx.lineTo(width, y + offsetY);
            ctx.stroke();
        }
        ctx.restore();

        // Partículas digitales flotantes (Cyber Dust)
        ctx.save();
        for (let i = 0; i < 28; i++) {
            const seed = i * 137.5;
            const px = ((seed * 23 + t * 25) % width);
            const py = (height - ((seed * 47 + t * 45) % height));
            const size = (i % 3) + 1.5;
            const alpha = 0.15 + (Math.sin(t * 2 + i) * 0.12);

            ctx.fillStyle = theme.accent;
            ctx.globalAlpha = Math.max(0.05, alpha);
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Esquinas con corchetes de cámara estilo visor técnico [  ]
        ctx.save();
        ctx.strokeStyle = theme.accent;
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 3;
        const margin = 52;
        const bracketLen = 38;

        // Top-Left
        ctx.beginPath();
        ctx.moveTo(margin, margin + bracketLen); ctx.lineTo(margin, margin); ctx.lineTo(margin + bracketLen, margin);
        ctx.stroke();
        // Top-Right
        ctx.beginPath();
        ctx.moveTo(width - margin - bracketLen, margin); ctx.lineTo(width - margin, margin); ctx.lineTo(width - margin, margin + bracketLen);
        ctx.stroke();
        // Bottom-Left
        ctx.beginPath();
        ctx.moveTo(margin, height - margin - bracketLen); ctx.lineTo(margin, height - margin); ctx.lineTo(margin + bracketLen, height - margin);
        ctx.stroke();
        // Bottom-Right
        ctx.beginPath();
        ctx.moveTo(width - margin - bracketLen, height - margin); ctx.lineTo(width - margin, height - margin); ctx.lineTo(width - margin, height - margin - bracketLen);
        ctx.stroke();
        ctx.restore();
    },

    /**
     * 3. Barra de Beats Segmentada eliminada (Cero estética Stories / WhatsApp, 100% lienzo limpio)
     */
    drawSegmentedBeatBar(ctx, width, reel, currentTime, currentBeat, theme) {
        // En video cinético profesional, el lienzo no tiene barras de navegación ni indicadores tipo Stories
        return;
    },

    /**
     * 4. Tipografía Cinética (Mute-Pass Rule: <7 palabras con punchWord brillante)
     */
    drawKineticTypography(ctx, width, beat, beatTime, theme) {
        ctx.save();
        const startY = 240;
        const text = beat.overlayText || '';
        const punch = beat.punchWord || '';

        // Entrada elástica (spring overshoot) en los primeros 0.4s del beat
        let scale = 1;
        if (beatTime < 0.45) {
            const p = beatTime / 0.45;
            // Curva elástica suave
            scale = 0.85 + Math.sin(p * Math.PI * 0.7) * 0.22;
        }

        ctx.save();
        ctx.translate(width / 2, startY);
        ctx.scale(scale, scale);

        // Parsear texto separando por asteriscos o coincidencia con punchWord
        let beforePunch = '';
        let punchText = '';
        let afterPunch = '';

        if (text.includes('*')) {
            const parts = text.split('*');
            beforePunch = parts[0] || '';
            punchText = parts[1] || '';
            afterPunch = parts[2] || '';
        } else if (punch && text.toLowerCase().includes(punch.toLowerCase())) {
            const idx = text.toLowerCase().indexOf(punch.toLowerCase());
            beforePunch = text.slice(0, idx);
            punchText = text.slice(idx, idx + punch.length);
            afterPunch = text.slice(idx + punch.length);
        } else {
            beforePunch = text;
        }

        // Configuración de fuentes
        ctx.font = '900 48px "Space Grotesk", "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Renderizado de titular en 2 líneas o con píldora brillante en la palabra clave
        if (punchText) {
            // Fondo de píldora de alto contraste para la palabra clave
            ctx.font = '900 52px "Space Grotesk", "Inter", sans-serif';
            const punchW = ctx.measureText(punchText.toUpperCase()).width + 44;
            const pillH = 74;

            // Sombra y resplandor
            ctx.shadowColor = theme.accent;
            ctx.shadowBlur = 28;

            ctx.fillStyle = theme.accent;
            ctx.beginPath();
            ctx.roundRect(-punchW / 2, 38, punchW, pillH, 16);
            ctx.fill();

            ctx.shadowBlur = 0;

            // Texto previo (blanco puro)
            if (beforePunch.trim()) {
                ctx.fillStyle = '#FFFFFF';
                ctx.font = '800 44px "Space Grotesk", "Inter", sans-serif';
                ctx.fillText(beforePunch.trim(), 0, -14);
            }

            // Palabra clave sobre la píldora (tinta oscura de alto contraste)
            ctx.fillStyle = theme.ink || '#051124';
            ctx.font = '900 50px "Space Grotesk", "Inter", sans-serif';
            ctx.fillText(punchText.toUpperCase(), 0, 75);

            // Texto posterior si existe
            if (afterPunch.trim()) {
                ctx.fillStyle = '#FFFFFF';
                ctx.font = '800 42px "Space Grotesk", "Inter", sans-serif';
                ctx.fillText(afterPunch.trim(), 0, 150);
            }
        } else {
            // Texto estándar
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 16;
            ctx.fillText(text, 0, 0);
        }

        ctx.restore();
        ctx.restore();
    },

    /**
     * 5. Enrutador y renderizador del contenido central de la escena
     */
    drawSceneContent(ctx, width, height, beat, beatTime, t, theme, reel, isPlaying) {
        ctx.save();
        const sceneY = 460;
        const sceneW = width - 104; // 976 px
        const sceneH = 1080;

        switch (beat.sceneType) {
            case 'terminal_hack':
            default:
                this.renderMotionGraphicCard(ctx, 52, sceneY, sceneW, sceneH, beat, beatTime, theme, reel, isPlaying);
                break;
        }
        ctx.restore();
    },

    /**
     * Escena Cinemática Motion Graphics: Tarjeta de Alta Retención y Objetos en Movimiento (Cero Bash)
     */
    renderMotionGraphicCard(ctx, x, y, w, h, beat, beatTime, theme, reel, isPlaying) {
        const props = beat.sceneProps || {};
        const accentColor = beat.accentColor || theme.accent || '#10B981';
        const brandSec = beat.secondaryColor || '#5EEAD4';
        const kicker = beat.badgeText || beat.kicker || reel?.kicker || 'SANTI.DEV · MOTION GRAPHICS';
        const rawText = beat.text || beat.overlayText || '60 FPS';
        const punch = (beat.accent || beat.punchWord || '').trim();

        // Transición de entrada con spring overshoot en los primeros 0.35s
        let cardScale = 1;
        let cardAlpha = 1;
        if (beatTime < 0.35) {
            const p = beatTime / 0.35;
            cardScale = 0.88 + Math.sin(p * Math.PI * 0.5) * 0.12;
            cardAlpha = Math.min(1, p * 1.5);
        } else {
            // Respiración o deriva continua sutil
            cardScale = 1 + (beatTime * 0.008);
        }

        ctx.save();
        ctx.globalAlpha = cardAlpha;

        // Centrado de la tarjeta para escala
        const centerX = x + w / 2;
        const centerY = y + h / 2;
        ctx.translate(centerX, centerY);
        ctx.scale(cardScale, cardScale);
        ctx.translate(-centerX, -centerY);

        // 1. Contenedor de Vidrio Ahumado Oscuro con Resplandor Neón
        ctx.shadowColor = accentColor + '40';
        ctx.shadowBlur = 40;
        ctx.fillStyle = 'rgba(10, 16, 28, 0.88)';
        ctx.strokeStyle = accentColor + '66';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 36);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 2. Insignia Flotante Kicker (Top de la tarjeta)
        const badgeY = y + 54;
        ctx.font = '700 20px "Space Grotesk", sans-serif';
        const kickerW = ctx.measureText(kicker.toUpperCase()).width + 60;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.strokeStyle = accentColor + '55';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(centerX - kickerW / 2, badgeY - 22, kickerW, 44, 22);
        ctx.fill();
        ctx.stroke();

        // Punto neón pulsante en el kicker
        ctx.fillStyle = accentColor;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(centerX - kickerW / 2 + 22, badgeY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(kicker.toUpperCase(), centerX + 8, badgeY);

        // 3. Tipografía Cinética Gigante Central
        const words = rawText.replace(/\*/g, '').split(/\s+/);
        const titleY = centerY - 30;

        ctx.font = words.length <= 2 ? '900 78px "Space Grotesk", sans-serif' : '900 64px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Renderizado palabra por palabra resaltando la punch
        let totalW = 0;
        const wordMetrics = words.map(w => {
            const width = ctx.measureText(w).width;
            totalW += width;
            return { word: w, width };
        });
        const spaceW = 20;
        totalW += spaceW * (words.length - 1);

        let curX = centerX - totalW / 2;
        words.forEach((w, idx) => {
            const isPunch = punch && (w.toUpperCase() === punch.toUpperCase() || punch.toUpperCase().includes(w.toUpperCase()));
            if (isPunch) {
                // Fondo píldora neón para la palabra clave
                const pW = wordMetrics[idx].width + 28;
                ctx.fillStyle = accentColor;
                ctx.shadowColor = accentColor;
                ctx.shadowBlur = 28;
                ctx.beginPath();
                ctx.roundRect(curX - 14, titleY - 44, pW, 88, 20);
                ctx.fill();
                ctx.shadowBlur = 0;

                ctx.fillStyle = '#070B14';
                ctx.fillText(w.toUpperCase(), curX + wordMetrics[idx].width / 2, titleY);
            } else {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(w, curX + wordMetrics[idx].width / 2, titleY);
            }
            curX += wordMetrics[idx].width + spaceW;
        });

        // 4. Cápsula Inferior con Ecualizador de Ritmo y Métrica
        const bottomBoxY = y + h - 160;
        const boxW = w - 80;
        const boxX = x + 40;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(boxX, bottomBoxY, boxW, 110, 24);
        ctx.fill();
        ctx.stroke();

        // Icono de Rayo
        ctx.fillStyle = accentColor + '22';
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(boxX + 24, bottomBoxY + 22, 66, 66, 18);
        ctx.fill();
        ctx.stroke();

        ctx.font = '900 28px "Space Grotesk", sans-serif';
        ctx.fillStyle = accentColor;
        ctx.textAlign = 'center';
        ctx.fillText('⚡', boxX + 57, bottomBoxY + 56);

        // Texto de Métrica
        ctx.textAlign = 'left';
        ctx.font = '700 22px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(beat.chipLabel || '60 FPS DETERMINISTA', boxX + 108, bottomBoxY + 46);

        ctx.font = '500 16px "Inter", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText('FLUJO DE ALTA RETENCIÓN · ZERO LAG', boxX + 108, bottomBoxY + 76);

        // Barras Dinámicas de Ritmo (Spectrum) a la derecha
        const specX = boxX + boxW - 140;
        const specY = bottomBoxY + 68;
        for (let i = 0; i < 7; i++) {
            const hBar = Math.max(8, Math.sin(beatTime * 12 + i * 0.9) * 22 + 24);
            ctx.fillStyle = i % 2 === 0 ? accentColor : brandSec;
            ctx.beginPath();
            ctx.roundRect(specX + i * 16, specY - hBar, 8, hBar, 4);
            ctx.fill();
        }

        ctx.restore();
    },

    /**
     * Escena B: AI Vision HUD & Landmark Tracking (MediaPipe 21D) a 60 FPS
     */
    renderAiVisionHud(ctx, x, y, w, h, beat, beatTime, t, theme) {
        const props = beat.sceneProps || {};
        ctx.save();

        // Contenedor Visor Cyber
        ctx.fillStyle = 'rgba(5, 12, 28, 0.94)';
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 28);
        ctx.fill();
        ctx.stroke();

        // Resplandor HUD
        const centerX = x + w / 2;
        const centerY = y + h / 2 - 40;

        // Retícula de mira central
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX - 270, centerY); ctx.lineTo(centerX + 270, centerY);
        ctx.moveTo(centerX, centerY - 270); ctx.lineTo(centerX, centerY + 270);
        ctx.stroke();

        // Movimiento de la mano animada con 21 puntos anatómicos
        // Simulación cinemática suave de mano haciendo seña
        const handBobX = Math.sin(t * 2) * 25;
        const handBobY = Math.cos(t * 1.6) * 18;

        // Puntos anatómicos aproximados (MediaPipe 21 Hand Landmarks)
        const wrist = { x: centerX + handBobX, y: centerY + 160 + handBobY };
        const thumbCMC = { x: wrist.x - 70, y: wrist.y - 50 };
        const thumbMCP = { x: wrist.x - 110, y: wrist.y - 110 };
        const thumbIP = { x: wrist.x - 130, y: wrist.y - 170 };
        const thumbTip = { x: wrist.x - 140, y: wrist.y - 230 + Math.sin(t * 3) * 15 };

        const indexMCP = { x: wrist.x - 50, y: wrist.y - 180 };
        const indexPIP = { x: wrist.x - 60, y: wrist.y - 250 };
        const indexDIP = { x: wrist.x - 65, y: wrist.y - 310 };
        const indexTip = { x: wrist.x - 70, y: wrist.y - 360 + Math.cos(t * 3) * 18 };

        const midMCP = { x: wrist.x, y: wrist.y - 190 };
        const midPIP = { x: wrist.x, y: wrist.y - 270 };
        const midDIP = { x: wrist.x, y: wrist.y - 330 };
        const midTip = { x: wrist.x, y: wrist.y - 390 + Math.sin(t * 2.5) * 12 };

        const ringMCP = { x: wrist.x + 50, y: wrist.y - 175 };
        const ringPIP = { x: wrist.x + 55, y: wrist.y - 245 };
        const ringDIP = { x: wrist.x + 60, y: wrist.y - 300 };
        const ringTip = { x: wrist.x + 65, y: wrist.y - 350 };

        const pinkyMCP = { x: wrist.x + 95, y: wrist.y - 145 };
        const pinkyPIP = { x: wrist.x + 110, y: wrist.y - 195 };
        const pinkyDIP = { x: wrist.x + 120, y: wrist.y - 240 };
        const pinkyTip = { x: wrist.x + 130, y: wrist.y - 280 };

        const bones = [
            // Pulgar
            [wrist, thumbCMC], [thumbCMC, thumbMCP], [thumbMCP, thumbIP], [thumbIP, thumbTip],
            // Índice
            [wrist, indexMCP], [indexMCP, indexPIP], [indexPIP, indexDIP], [indexDIP, indexTip],
            // Medio
            [wrist, midMCP], [midMCP, midPIP], [midPIP, midDIP], [midDIP, midTip],
            // Anular
            [wrist, ringMCP], [ringMCP, ringPIP], [ringPIP, ringDIP], [ringDIP, ringTip],
            // Meñique
            [wrist, pinkyMCP], [pinkyMCP, pinkyPIP], [pinkyPIP, pinkyDIP], [pinkyDIP, pinkyTip],
            // Palma conectada
            [thumbCMC, indexMCP], [indexMCP, midMCP], [midMCP, ringMCP], [ringMCP, pinkyMCP]
        ];

        // Dibujar huesos láser neón
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 12;

        bones.forEach(([p1, p2]) => {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        });

        // Dibujar nodos de articulación (21 puntos verdes menta / cyan)
        const allPoints = [
            wrist, thumbCMC, thumbMCP, thumbIP, thumbTip,
            indexMCP, indexPIP, indexDIP, indexTip,
            midMCP, midPIP, midDIP, midTip,
            ringMCP, ringPIP, ringDIP, ringTip,
            pinkyMCP, pinkyPIP, pinkyDIP, pinkyTip
        ];

        allPoints.forEach((pt, i) => {
            ctx.fillStyle = '#4ECCA3';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
            ctx.fill();

            // Anillo exterior pulsante en las puntas de los dedos
            if ([4, 8, 12, 16, 20].includes(i)) {
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 11 + Math.sin(t * 6 + i) * 3, 0, Math.PI * 2);
                ctx.stroke();
            }
        });

        ctx.shadowBlur = 0;

        // Bounding box de seguimiento alrededor de la mano
        const boxX = centerX - 180 + handBobX;
        const boxY = centerY - 250 + handBobY;
        const boxW = 360;
        const boxH = 460;

        ctx.strokeStyle = '#4ECCA3';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Etiqueta del gesto reconocido sobre la bounding box
        ctx.fillStyle = '#4ECCA3';
        ctx.fillRect(boxX, boxY - 36, 170, 36);

        ctx.font = '700 16px "JetBrains Mono", monospace';
        ctx.fillStyle = '#05163F';
        ctx.fillText(`HAND 01: 99.4%`, boxX + 12, boxY - 12);

        // Bocadillo de voz flotante traducida en tiempo real
        const bubbleY = y + h - 160;
        ctx.fillStyle = 'rgba(78, 204, 163, 0.15)';
        ctx.strokeStyle = '#4ECCA3';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x + 36, bubbleY, w - 72, 110, 20);
        ctx.fill();
        ctx.stroke();

        ctx.font = '700 15px "JetBrains Mono", monospace';
        ctx.fillStyle = '#4ECCA3';
        ctx.fillText('TRADUCCIÓN DE VOZ SINTETIZADA · EN VIVO', x + 64, bubbleY + 38);

        ctx.font = '900 28px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(props.speechBubble || '🔊 "HOLA, ¿CÓMO ESTÁS? LISTO PARA PROBAR"', x + 64, bubbleY + 80);

        ctx.restore();
    },

    /**
     * Escena C: Diff de Código & Token Optimizer
     */
    renderCodeDiffScene(ctx, x, y, w, h, beat, beatTime, theme) {
        const props = beat.sceneProps || {};
        ctx.save();

        // Contenedor tipo IDE
        ctx.fillStyle = 'rgba(8, 14, 26, 0.94)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 28);
        ctx.fill();
        ctx.stroke();

        // Cabecera del archivo
        const headerH = 64;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.roundRect(x, y, w, headerH, [28, 28, 0, 0]);
        ctx.fill();

        ctx.font = '700 18px "JetBrains Mono", monospace';
        ctx.fillStyle = theme.accent;
        ctx.fillText(props.fileName || 'auth-service.ts', x + 36, y + 40);

        // Contador de Tokens (Odometer / Rolling Counter)
        const tBefore = props.tokensBefore || 3400;
        const tAfter = props.tokensAfter || 480;

        // Transición de tokens suave tras 0.6s
        let currentTokens = tBefore;
        if (beatTime > 0.6) {
            const progress = Math.min(1, (beatTime - 0.6) / 1.5);
            currentTokens = Math.round(tBefore - ((tBefore - tAfter) * progress));
        }

        const meterW = 280;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
        ctx.beginPath();
        ctx.roundRect(x + w - meterW - 36, y + 16, meterW, 36, 12);
        ctx.fill();

        ctx.font = '700 15px "JetBrains Mono", monospace';
        ctx.fillStyle = currentTokens < 1000 ? '#34D399' : '#F87171';
        ctx.textAlign = 'center';
        ctx.fillText(`TOKENS: ${currentTokens.toLocaleString()}`, x + w - meterW / 2 - 36, y + 40);
        ctx.textAlign = 'left';

        // Bloque Antes (Rojo Deletion)
        let lineY = y + 115;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
        ctx.fillRect(x + 20, lineY - 26, w - 40, 150);

        ctx.font = '700 15px "JetBrains Mono", monospace';
        ctx.fillStyle = '#F87171';
        ctx.fillText('// ANTES (LENTO Y COSTOSO EN TOKENS)', x + 36, lineY);
        lineY += 36;

        (props.beforeCode || []).forEach(line => {
            ctx.font = '500 20px "JetBrains Mono", monospace';
            ctx.fillStyle = '#FCA5A5';
            ctx.fillText(line, x + 36, lineY);
            lineY += 36;
        });

        // Bloque Después (Verde Neón Insertion)
        lineY += 30;
        ctx.fillStyle = 'rgba(52, 211, 153, 0.12)';
        ctx.fillRect(x + 20, lineY - 26, w - 40, 190);

        ctx.font = '700 15px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34D399';
        ctx.fillText('// DESPUÉS (OPTIMIZADO CON ANTIGRAVITY & OPENCODE)', x + 36, lineY);
        lineY += 38;

        (props.afterCode || []).forEach(line => {
            ctx.font = '600 21px "JetBrains Mono", monospace';
            ctx.fillStyle = '#6EE7B7';
            ctx.fillText(line, x + 36, lineY);
            lineY += 40;
        });

        // Gráfica de ahorro porcentual
        const bottomBoxY = y + h - 180;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.beginPath();
        ctx.roundRect(x + 36, bottomBoxY, w - 72, 130, 20);
        ctx.fill();

        const pct = Math.round(((tBefore - currentTokens) / tBefore) * 100);
        ctx.font = '900 48px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#34D399';
        ctx.fillText(`-${pct}%`, x + 64, bottomBoxY + 80);

        ctx.font = '700 20px "Inter", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('REDUCCIÓN TOTAL DE TOKENS Y TIEMPO', x + 240, bottomBoxY + 60);

        ctx.font = '500 16px "Inter", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText('Código más limpio, compilación instantánea y cero desbordes.', x + 240, bottomBoxY + 95);

        ctx.restore();
    },

    /**
     * Escena D: Impacto Técnico Central (Anti-Slop: Cero Pipelines de 4 Cajas / Un Solo Foco Visual)
     */
    renderArchitectureFlowScene(ctx, x, y, w, h, beat, beatTime, theme) {
        const props = beat.sceneProps || {};
        const nodes = props.nodes || [];
        ctx.save();

        // Determinar el elemento único activo
        let activeLabel = 'ARQUITECTURA ÁGIL';
        let activeMetric = props.metricValue || '10x';

        if (nodes.length > 0) {
            const nodeIdx = Math.min(nodes.length - 1, Math.floor(beatTime * 1.5) % nodes.length);
            activeLabel = (nodes[nodeIdx].label || activeLabel).toUpperCase();
        }

        // Micro-movimiento continuo determinista (escala 1.0 -> 1.04)
        const progressInBeat = Math.min(1, Math.max(0, beatTime / 2.0));
        const drift = 1 + (progressInBeat * 0.04);
        const centerX = x + w / 2;
        const centerY = y + h / 2 - 30;

        ctx.translate(centerX, centerY);
        ctx.scale(drift, drift);

        // Métrica masiva o texto protagonista
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.font = '900 110px "Space Grotesk", sans-serif';
        ctx.fillStyle = theme.accent || '#D97757';
        ctx.fillText(activeMetric, 0, -40);

        ctx.font = '800 52px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(activeLabel, 0, 70);

        ctx.restore();
    },

    /**
     * Escena E: Retro Arcade Game 8-Bit a 60 FPS
     */
    renderRetroArcadeScene(ctx, x, y, w, h, beat, beatTime, t, theme) {
        const props = beat.sceneProps || {};
        ctx.save();

        // Contenedor estilo gabinete CRT
        ctx.fillStyle = '#05060A';
        ctx.strokeStyle = '#EC4899';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 28);
        ctx.fill();
        ctx.stroke();

        // Barra de arcade superior
        ctx.font = '700 18px "Press Start 2P", monospace';
        ctx.fillStyle = '#F59E0B';
        ctx.fillText('1UP', x + 44, y + 54);

        const scoreVal = (props.score || 14200) + Math.floor(beatTime * 1500);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(String(scoreVal).padStart(6, '0'), x + 44, y + 84);

        ctx.fillStyle = '#06B6D4';
        ctx.textAlign = 'right';
        ctx.fillText('STAGE 01', x + w - 44, y + 54);
        ctx.fillText('HI-SCORE', x + w - 44, y + 84);
        ctx.textAlign = 'left';

        // Suelo pixelado con desplazamiento parallax
        const groundY = y + h - 280;
        ctx.fillStyle = '#1E1B4B';
        ctx.fillRect(x + 20, groundY, w - 40, 240);

        ctx.strokeStyle = '#EC4899';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x + 20, groundY);
        ctx.lineTo(x + w - 20, groundY);
        ctx.stroke();

        // Cuadrícula de suelo arcade
        const scrollX = (t * 180) % 40;
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.3)';
        ctx.lineWidth = 2;
        for (let gx = x + 20 - scrollX; gx < x + w - 20; gx += 40) {
            ctx.beginPath();
            ctx.moveTo(gx, groundY);
            ctx.lineTo(gx - 40, y + h - 40);
            ctx.stroke();
        }

        // Personaje Pixel Runner animado corriendo y saltando
        const charX = x + 160;
        const jumpH = Math.max(0, Math.sin(t * 4.5) * 110);
        const charY = groundY - 64 - jumpH;

        // Dibujar sprite pixel art estilizado
        ctx.fillStyle = '#EC4899';
        ctx.fillRect(charX, charY, 48, 48); // Cuerpo
        ctx.fillStyle = '#06B6D4';
        ctx.fillRect(charX + 10, charY + 10, 28, 16); // Visor
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(charX + 6, charY + 48, 14, 16); // Pie 1
        ctx.fillRect(charX + 28, charY + 48, 14, 16); // Pie 2

        // Estrellas y monedas flotantes recolectables
        for (let s = 0; s < 3; s++) {
            const starX = ((x + w - (t * 220 + s * 240)) % (w - 100)) + x + 60;
            const starY = groundY - 80 - Math.sin(t * 3 + s) * 30;

            ctx.fillStyle = '#F59E0B';
            ctx.beginPath();
            ctx.arc(starX, starY, 14, 0, Math.PI * 2);
            ctx.fill();

            ctx.font = '700 12px "Press Start 2P", monospace';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText('$', starX, starY + 5);
            ctx.textAlign = 'left';
        }

        // Líneas de escaneo CRT en la pantalla
        ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
        for (let sy = y; sy < y + h; sy += 4) {
            ctx.fillRect(x, sy, w, 1.5);
        }

        ctx.restore();
    },

    /**
     * Escena F: Tarjeta CTA de Comentarios (High Conversion Viral Hook)
     */
    renderCtaCommentScene(ctx, x, y, w, h, beat, beatTime, theme, reel) {
        const props = beat.sceneProps || {};
        const keyword = props.keyword || 'STACK';
        ctx.save();

        // Contenedor principal de tarjeta
        ctx.fillStyle = 'rgba(8, 14, 26, 0.96)';
        ctx.strokeStyle = theme.accent;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = theme.accent + '40';
        ctx.shadowBlur = 36;

        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 28);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Ícono de comentarios animado
        const iconY = y + 130;
        ctx.fillStyle = theme.accent + '20';
        ctx.beginPath();
        ctx.arc(x + w / 2, iconY, 64, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = theme.accent;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + w / 2, iconY, 64, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '700 48px "Inter", sans-serif';
        ctx.fillStyle = theme.accent;
        ctx.textAlign = 'center';
        ctx.fillText('💬', x + w / 2, iconY + 16);

        // Titular de la acción
        ctx.font = '900 44px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('COMENTA LA PALABRA', x + w / 2, y + 260);

        // Palabra clave destacada con caja gigante
        const kwBoxY = y + 310;
        const kwBoxW = 420;
        const kwBoxH = 92;

        ctx.fillStyle = theme.accent;
        ctx.shadowColor = theme.accent;
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.roundRect(x + (w - kwBoxW) / 2, kwBoxY, kwBoxW, kwBoxH, 20);
        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.font = '900 52px "JetBrains Mono", monospace';
        ctx.fillStyle = theme.ink || '#051124';
        ctx.fillText(`"${keyword}"`, x + w / 2, kwBoxY + 64);

        // Mockup de caja de comentarios de Instagram / TikTok escribiendo en vivo
        const inputY = y + 460;
        const inputW = w - 88;
        const inputH = 88;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(x + 44, inputY, inputW, inputH, 44);
        ctx.fill();
        ctx.stroke();

        // Avatar de usuario
        ctx.fillStyle = theme.accent;
        ctx.beginPath();
        ctx.arc(x + 90, inputY + inputH / 2, 24, 0, Math.PI * 2);
        ctx.fill();

        // Texto simulando tipeo del comentario
        const mockChars = Math.min(keyword.length, Math.floor(beatTime * 4.5));
        const mockTyped = keyword.substring(0, mockChars);

        ctx.textAlign = 'left';
        ctx.font = '600 24px "Inter", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(mockTyped, x + 130, inputY + 54);

        // Cursor en el input
        if (Math.sin(beatTime * 8) > 0) {
            const tw = ctx.measureText(mockTyped).width;
            ctx.fillStyle = theme.accent;
            ctx.fillRect(x + 134 + tw, inputY + 28, 3, 32);
        }

        // Botón Publicar a la derecha
        ctx.font = '700 20px "Inter", sans-serif';
        ctx.fillStyle = theme.accent;
        ctx.textAlign = 'right';
        ctx.fillText('Publicar', x + w - 74, inputY + 54);
        ctx.textAlign = 'center';

        // Badge de Auto-DM instantáneo
        const dmBadgeY = y + 600;
        ctx.fillStyle = '#34D3991f';
        ctx.strokeStyle = '#34D399';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x + 64, dmBadgeY, w - 128, 80, 20);
        ctx.fill();
        ctx.stroke();

        ctx.font = '700 22px "JetBrains Mono", monospace';
        ctx.fillStyle = '#34D399';
        ctx.fillText(props.badge || '⚡ AUTO-DM ENVIADO EN 0.6s', x + w / 2, dmBadgeY + 48);

        // Handle de la cuenta
        ctx.font = '600 18px "Inter", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText(props.brandHandle || '@santi.dev', x + w / 2, y + h - 60);

        ctx.restore();
    },

    /**
     * 6. Visualizador de Espectro de Audio y Pie de Página
     */
    drawAudioVisualizerAndFooter(ctx, width, height, t, reel, theme, account) {
        ctx.save();
        const footY = height - 120;
        const padX = 52;

        // Firma de la marca a la izquierda
        ctx.font = '800 22px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(account.handle || '@santi.dev', padX, footY + 40);

        ctx.font = '600 15px "Inter", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(account.role || 'Software & AI Creator', padX, footY + 68);

        // Barras del visualizador de audio a la derecha
        const barsCount = 20;
        const barW = 4;
        const barGap = 4;
        const totalBarW = barsCount * (barW + barGap);
        const startBarX = width - padX - totalBarW;

        for (let i = 0; i < barsCount; i++) {
            const bx = startBarX + i * (barW + barGap);
            const freq = Math.abs(Math.sin(t * 5 + i * 0.4) * Math.cos(t * 3 - i * 0.2));
            const barH = 8 + freq * 36;

            ctx.fillStyle = theme.accent;
            ctx.globalAlpha = 0.6 + freq * 0.4;
            ctx.beginPath();
            ctx.roundRect(bx, footY + 68 - barH, barW, barH, 2);
            ctx.fill();
        }

        ctx.restore();
    },

    /**
     * Utilidad para formatear segundos a MM:SS.S
     */
    formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        const ms = Math.floor((sec % 1) * 10);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${ms}`;
    }
};

/**
 * Componente React ReelPlayer: Reproductor, Scrubber de Timeline y Exportador
 */
window.ReelPlayer = ({ reel, onOpenPostKit }) => {
    const canvasRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [isExporting, setIsExporting] = React.useState(false);
    const [exportProgress, setExportProgress] = React.useState(0);
    const [isMuted, setIsMuted] = React.useState(false);

    const animFrameRef = React.useRef(null);
    const lastTimestampRef = React.useRef(null);

    const theme = window.THEMES[reel?.theme] || window.THEMES.dev_blue;
    const account = window.getAccountForReel(reel);

    // Inicializar Audio
    React.useEffect(() => {
        window.ReelRenderer.audio.muted = isMuted;
    }, [isMuted]);

    // Bucle de animación a 60 FPS
    React.useEffect(() => {
        let isMounted = true;

        const loop = (timestamp) => {
            if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
            const delta = (timestamp - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = timestamp;

            if (isPlaying && !isExporting) {
                setCurrentTime(prev => {
                    const next = prev + delta;
                    if (next >= reel.duration) {
                        return 0; // Bucle continuo
                    }
                    return next;
                });
            }

            // Dibujar fotograma
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    window.ReelRenderer.drawFrame(ctx, reel, currentTime, isPlaying);
                }
            }

            if (isMounted) {
                animFrameRef.current = requestAnimationFrame(loop);
            }
        };

        animFrameRef.current = requestAnimationFrame(loop);

        return () => {
            isMounted = false;
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [isPlaying, currentTime, reel, isExporting]);

    // Saltar a un Beat específico
    const jumpToBeat = (beat) => {
        setCurrentTime(beat.start);
        window.ReelRenderer.audio.playBeatDrop();
    };

    // Exportador de video directo a .webm con MediaRecorder a 60 FPS
    const exportVideo = async () => {
        if (!canvasRef.current || isExporting) return;
        setIsExporting(true);
        setIsPlaying(false);
        setExportProgress(0);

        try {
            const canvas = canvasRef.current;
            const stream = canvas.captureStream(60);

            // Seleccionar codec óptimo soportado por el navegador
            let mimeType = 'video/webm;codecs=vp9';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm;codecs=vp8';
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = 'video/webm';
                }
            }

            const recorder = new MediaRecorder(stream, {
                mimeType,
                videoBitsPerSecond: 10000000 // 10 Mbps de alta calidad
            });

            const chunks = [];
            recorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) chunks.push(e.data);
            };

            const recordingPromise = new Promise((resolve) => {
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: mimeType });
                    resolve(blob);
                };
            });

            recorder.start();

            // Renderizar secuencialmente desde t = 0 hasta t = duration
            const totalDuration = reel.duration;
            const fps = 60;
            const totalFrames = Math.floor(totalDuration * fps);
            const ctx = canvas.getContext('2d');

            for (let f = 0; f <= totalFrames; f++) {
                const t = f / fps;
                window.ReelRenderer.drawFrame(ctx, reel, t, true);
                setExportProgress(Math.round((f / totalFrames) * 100));
                // Breve yield para permitir actualización del frame en recorder
                await new Promise(r => setTimeout(r, 16));
            }

            recorder.stop();
            const videoBlob = await recordingPromise;

            // Descargar archivo de video
            const url = URL.createObjectURL(videoBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${reel.slug || 'reel_animado'}_60fps.webm`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setIsExporting(false);
            setCurrentTime(0);
            setIsPlaying(true);
        } catch (err) {
            console.error('Error al exportar video:', err);
            alert('No se pudo exportar el video: ' + err.message);
            setIsExporting(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-7xl mx-auto p-4 md:p-6">
            {/* Lienzo del Reel con proporción vertical 9:16 */}
            <div className="relative flex flex-col items-center">
                <div
                    className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-black"
                    style={{
                        width: '360px',
                        height: '640px',
                        maxHeight: '80vh'
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        width={1080}
                        height={1920}
                        className="w-full h-full object-contain cursor-pointer"
                        onClick={() => {
                            window.ReelRenderer.audio.init();
                            setIsPlaying(!isPlaying);
                        }}
                    />

                    {/* Botón Flotante Central cuando está pausado */}
                    {!isPlaying && !isExporting && (
                        <div
                            onClick={() => {
                                window.ReelRenderer.audio.init();
                                setIsPlaying(true);
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer transition-all"
                        >
                            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white/20 border border-white/40 shadow-xl hover:scale-110 transition-transform">
                                <i className="fa-solid fa-play text-white text-3xl ml-1"></i>
                            </div>
                        </div>
                    )}

                    {/* Overlay de Exportación */}
                    {isExporting && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-6 text-center">
                            <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: theme.accent, borderTopColor: 'transparent' }} />
                            <h3 className="text-white font-bold text-lg mb-1">Exportando Video 60 FPS</h3>
                            <p className="text-white/60 text-sm mb-4">Capturando fotogramas en alta resolución 1080x1920...</p>
                            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-100"
                                    style={{ width: `${exportProgress}%`, background: theme.accent }}
                                />
                            </div>
                            <span className="text-white/80 font-mono text-sm mt-2">{exportProgress}%</span>
                        </div>
                    )}
                </div>

                {/* Controles de Reproducción y Scrubber bajo el Canvas */}
                <div className="w-[360px] mt-4 flex flex-col gap-3 bg-[#111622] p-4 rounded-xl border border-white/10 shadow-lg">
                    {/* Barra de progreso de tiempo (Scrubber) */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-white/70 min-w-[50px]">
                            {window.ReelRenderer.formatTime(currentTime)}
                        </span>
                        <input
                            type="range"
                            min="0"
                            max={reel.duration}
                            step="0.05"
                            value={currentTime}
                            onChange={(e) => {
                                setCurrentTime(parseFloat(e.target.value));
                            }}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
                        />
                        <span className="text-xs font-mono text-white/50 min-w-[50px] text-right">
                            {window.ReelRenderer.formatTime(reel.duration)}
                        </span>
                    </div>

                    {/* Botonera de control */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    window.ReelRenderer.audio.init();
                                    setIsPlaying(!isPlaying);
                                }}
                                className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                                title={isPlaying ? 'Pausar' : 'Reproducir'}
                            >
                                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentTime(0);
                                    setIsPlaying(true);
                                }}
                                className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                                title="Reiniciar desde el inicio"
                            >
                                <i className="fa-solid fa-rotate-left"></i>
                            </button>
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                                title={isMuted ? 'Activar sonido' : 'Silenciar'}
                            >
                                <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
                            </button>
                        </div>

                        {/* Botón de Exportar Video HD */}
                        <button
                            onClick={exportVideo}
                            disabled={isExporting}
                            className="px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105"
                            style={{
                                background: theme.accent,
                                color: theme.ink || '#000'
                            }}
                        >
                            <i className="fa-solid fa-video"></i>
                            <span>Descargar Video (.webm)</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Panel Lateral: Selector de Beats, Guión VO y Post Kit */}
            <div className="flex flex-col gap-4 w-full max-w-md bg-[#0F1523] border border-white/10 rounded-2xl p-6 shadow-xl text-left">
                {/* Cabecera del Reel */}
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                    <div>
                        <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/20" style={{ color: theme.accent, borderColor: theme.accent }}>
                            {theme.tag || 'REEL 60 FPS'}
                        </span>
                        <h2 className="text-xl font-black text-white mt-2 leading-tight">{reel.title}</h2>
                        <p className="text-sm text-white/60 mt-1">{reel.subtitle}</p>
                    </div>
                </div>

                {/* Selector Rápido de Beats */}
                <div>
                    <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider mb-2">
                        Estructura de Retención (4 Beats)
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {reel.beats.map((b) => {
                            const isActive = currentTime >= b.start && currentTime <= b.end;
                            return (
                                <button
                                    key={b.id}
                                    onClick={() => jumpToBeat(b)}
                                    className={`p-3 rounded-xl text-left border transition-all ${isActive
                                        ? 'border-sky-400 bg-sky-950/40 text-white shadow-md'
                                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                                        <span className="font-bold" style={{ color: isActive ? theme.accent : 'inherit' }}>
                                            Beat 0{b.id}
                                        </span>
                                        <span className="opacity-60">{b.start.toFixed(1)}s</span>
                                    </div>
                                    <div className="text-xs font-bold truncate text-white">{b.name}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Guión y On-Screen Text del Beat Activo */}
                {(() => {
                    const activeBeat = reel.beats.find(b => currentTime >= b.start && currentTime <= b.end) || reel.beats[0];
                    return (
                        <div className="bg-black/30 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between text-xs font-mono text-white/50">
                                <span>ON-SCREEN TEXT (MUTE PASS):</span>
                                <span style={{ color: theme.accent }}>Palabra Clave: {activeBeat.punchWord}</span>
                            </div>
                            <div className="text-sm font-bold text-white">
                                {activeBeat.overlayText}
                            </div>
                            <div className="border-t border-white/10 my-1 pt-2">
                                <div className="text-xs font-mono text-white/50 mb-1">LOCUCIÓN (VO):</div>
                                <div className="text-xs text-white/80 italic leading-relaxed">
                                    "{activeBeat.vo}"
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* Acciones de Publicación */}
                <div className="flex items-center gap-3 pt-2">
                    <button
                        onClick={onOpenPostKit}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
                    >
                        <i className="fa-solid fa-copy text-sky-400"></i>
                        <span>Ver Kit de Publicación (Copy & Tags)</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
