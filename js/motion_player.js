/**
 * =====================================================================
 * SANTI.DEV · ORQUESTADOR DETERMINISTA Y EXPORTADOR DE FOTOGRAMAS 60 FPS
 * =====================================================================
 * Controla el reloj virtual paso a paso a 60 FPS exactos (16.66ms por frame).
 * Espera a que el navegador dibuje el DOM antes de capturar a 1080×1920 nativo
 * con modern-screenshot y destruye el buffer de GPU (canvas.width = 0)
 * inmediatamente para prevenir saturación de memoria en WebKit e iOS.
 * =====================================================================
 */

/**
 * Renderizado y exportación determinista fotograma a fotograma (Offline Rendering)
 * @param {Object} reelData - Datos del reel (duration_ms, scenes, etc.)
 * @param {HTMLElement} containerDomNode - Nodo DOM que contiene MotionReelFrame
 * @param {Function} onProgress - Callback de porcentaje (0 - 100)
 * @param {Function} setVirtualTime - Función para actualizar el milisegundo virtual en React
 * @param {number} fps - Fotogramas por segundo (default 60)
 */
async function exportReelVideo(reelData, containerDomNode, onProgress, setVirtualTime, fps = 60) {
    if (!reelData || !containerDomNode) {
        throw new Error('Datos de reel o nodo DOM no especificados.');
    }

    // 1. Asegurar que todas las fuentes estén 100% cargadas antes del primer fotograma
    try {
        await Promise.race([
            document.fonts.ready,
            new Promise((resolve) => setTimeout(resolve, 2500))
        ]);
    } catch (e) {
        console.warn('[ExportMotion] document.fonts.ready aviso:', e);
    }

    const FPS = fps || 60;
    const frameDurationMs = 1000 / FPS;
    const durationMs = reelData.total_ms || reelData.duration_ms || 6500;
    const totalFrames = Math.ceil(durationMs / frameDurationMs);
    const zip = new window.JSZip();

    console.log(`[ExportMotion] Iniciando renderizado determinista de ${totalFrames} frames a ${FPS} FPS...`);

    const updateTime = setVirtualTime || window.setReelCurrentTime;

    for (let frameIndex = 0; frameIndex <= totalFrames; frameIndex++) {
        const currentMs = frameIndex * frameDurationMs;

        // 1. Sincronizar el estado de React con el tiempo exacto del fotograma
        if (typeof updateTime === 'function') {
            updateTime(currentMs);
        }

        // 2. Esperar al ciclo de repintado del motor gráfico
        await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 16)));

        // 3. Captura determinista con modern-screenshot a 1080×1920
        const screenshotLib = window.modernScreenshot || {};
        let canvas = null;

        if (screenshotLib.domToCanvas) {
            canvas = await screenshotLib.domToCanvas(containerDomNode, {
                width: 1080,
                height: 1920,
                scale: 1, // 1080p exacto para evitar interpolación borrosa
                backgroundColor: null
            });
        } else if (window.html2canvas) {
            canvas = await window.html2canvas(containerDomNode, {
                width: 1080,
                height: 1920,
                scale: 1,
                backgroundColor: null
            });
        }

        if (!canvas) {
            throw new Error('No se pudo inicializar el motor de captura de canvas.');
        }

        // 4. Extracción binaria directa a Base64 / JPEG
        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
        const fileName = `frame_${String(frameIndex).padStart(5, "0")}.jpg`;
        zip.file(fileName, base64Data, { base64: true });

        // 5. Destrucción inmediata del buffer de GPU (Fix WebKit Ceiling)
        canvas.width = 0;
        canvas.height = 0;

        // 6. Reportar progreso a la interfaz
        if (onProgress) {
            const pct = Math.round((frameIndex / totalFrames) * 100);
            onProgress(pct, frameIndex, totalFrames);
        }
    }

    // 7. Empaquetado y descarga del paquete completo listo para FFmpeg / Premiere / WebCodecs
    const zipName = `${(reelData.id || 'reel_motion')}_60fps_frames.zip`;
    const content = await zip.generateAsync({ type: "blob" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(content);
    downloadLink.download = zipName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);

    console.log(`[ExportMotion] Exportación completada con éxito: ${zipName}`);
    return content;
}

/**
 * Guarda un video MP4 directamente en la app Fotos / Galería de iPhone
 * utilizando la Web Share API nativa (hoja de compartir de iOS) o descarga directa.
 */
window.saveVideoToGallery = async function({ videoUrl, filename, title, onStatus }) {
    if (!videoUrl) {
        alert('Este video aún no tiene archivo MP4 renderizado.');
        return { success: false, error: 'no_video_url' };
    }

    try {
        if (onStatus) onStatus('Descargando...');

        // 1. Obtener el archivo binario del video
        const response = await fetch(videoUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status} al cargar video`);
        const blob = await response.blob();

        const cleanFilename = filename || (videoUrl.split('/').pop() || 'video.mp4');
        const file = new File([blob], cleanFilename, { type: 'video/mp4' });

        // 2. Si el dispositivo soporta Web Share con archivos (iPhone / iOS Safari nativo)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            if (onStatus) onStatus('Abre menú...');
            await navigator.share({
                files: [file],
                title: title || 'Video Reel',
                text: 'Guarda este video en la app Fotos de tu iPhone'
            });
            if (onStatus) onStatus('¡Listo!');
            return { success: true, method: 'share' };
        } else {
            // 3. Fallback: descarga directa en escritorio o navegadores sin canShare
            if (onStatus) onStatus('Descargando...');
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = cleanFilename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
            if (onStatus) onStatus('¡Descargado!');
            return { success: true, method: 'download' };
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            console.log('[saveVideoToGallery] Usuario canceló el menú de compartir');
            return { success: false, aborted: true };
        }
        console.warn('[saveVideoToGallery] Falló Web Share, recurriendo a descarga tradicional:', err);
        // Fallback a enlace normal
        const a = document.createElement('a');
        a.href = videoUrl;
        a.download = filename || 'video.mp4';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return { success: false, error: err };
    }
};

/**
 * Componente Interactivo de Reproducción y Renderizado de Motion Reels
 */
const MotionReelPlayer = ({ reel, onOpenPostKit }) => {
    const [currentMs, setCurrentMs] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isExporting, setIsExporting] = React.useState(false);
    const [exportProgress, setExportProgress] = React.useState(0);
    const [exportFrameInfo, setExportFrameInfo] = React.useState('');
    const [isSavingVideo, setIsSavingVideo] = React.useState(false);
    const [saveVideoStatus, setSaveVideoStatus] = React.useState('');
    const [iosTipOpen, setIosTipOpen] = React.useState(false);
    const frameRef = React.useRef(null);
    const animIdRef = React.useRef(null);
    const lastTimeRef = React.useRef(null);

    const durationMs = reel?.total_ms || reel?.duration_ms || 6500;

    const [playMode, setPlayMode] = React.useState(reel?.videoUrl ? 'video' : 'canvas');
    const [scriptViewMode, setScriptViewMode] = React.useState('continuous'); // 'continuous' | 'timed'
    const [isScriptCopied, setIsScriptCopied] = React.useState(false);

    // Guión continuo unificado y métricas de locución
    const allBeats = reel?.beats || [];
    const continuousScript = React.useMemo(() => {
        return allBeats
            .map(b => b.vo ? b.vo.trim() : '')
            .filter(Boolean)
            .join(' ');
    }, [allBeats]);

    const totalWords = React.useMemo(() => {
        return continuousScript ? continuousScript.split(/\s+/).filter(Boolean).length : 0;
    }, [continuousScript]);

    const durationSec = (durationMs / 1000) || 12.5;
    const cadenceWps = durationSec > 0 ? (totalWords / durationSec).toFixed(1) : '0.0';

    const handleCopyFullScript = async () => {
        if (!continuousScript) return;
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(continuousScript);
            } else {
                const ta = document.createElement('textarea');
                ta.value = continuousScript;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
            setIsScriptCopied(true);
            setTimeout(() => setIsScriptCopied(false), 2200);
        } catch (e) {
            console.error('Error al copiar guión:', e);
        }
    };

    const handleSaveToGallery = async () => {
        if (!reel?.videoUrl) return;
        setIsSavingVideo(true);
        setSaveVideoStatus('Preparando...');
        try {
            await window.saveVideoToGallery({
                videoUrl: reel.videoUrl,
                filename: `${reel.slug || reel.id || 'reel'}.mp4`,
                title: reel.title,
                onStatus: (st) => setSaveVideoStatus(st)
            });
            setTimeout(() => setSaveVideoStatus(''), 2500);
        } catch (e) {
            console.error('[handleSaveToGallery Error]:', e);
        } finally {
            setIsSavingVideo(false);
        }
    };

    // Resetear al cambiar de reel
    React.useEffect(() => {
        setCurrentMs(0);
        setIsPlaying(false);
        setIsScriptCopied(false);
        if (reel?.videoUrl) setPlayMode('video');
    }, [reel?.id, reel?.videoUrl]);

    // Conectar el setter global para que el exportador pueda mover el reloj virtual
    React.useEffect(() => {
        window.setReelCurrentTime = (ms) => setCurrentMs(ms);
    }, []);

    // Bucle de reproducción en tiempo virtual
    React.useEffect(() => {
        if (!isPlaying) {
            if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
            lastTimeRef.current = null;
            return;
        }

        const loop = (timestamp) => {
            if (!lastTimeRef.current) lastTimeRef.current = timestamp;
            const delta = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;

            setCurrentMs((prev) => {
                const next = prev + delta;
                if (next >= durationMs) {
                    setIsPlaying(false);
                    return 0;
                }
                return next;
            });

            animIdRef.current = requestAnimationFrame(loop);
        };

        animIdRef.current = requestAnimationFrame(loop);
        return () => {
            if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
        };
    }, [isPlaying, durationMs]);

    // Cálculo del factor de escala para que 1080×1920 quepa en pantalla
    const [scale, setScale] = React.useState(0.35);
    React.useEffect(() => {
        const updateScale = () => {
            const availH = window.innerHeight - 200;
            const s = Math.min(0.42, Math.max(0.25, availH / 1920));
            setScale(s);
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Lanzar renderizado determinista fotograma a fotograma
    const handleStartExport = async () => {
        if (isExporting) return;
        setIsPlaying(false);
        setIsExporting(true);
        setExportProgress(0);
        setExportFrameInfo('Preparando fuentes y búfer de renderizado...');

        try {
            const targetEl = document.getElementById('motion-render-frame');
            if (!targetEl) throw new Error('No se encontró el marco #motion-render-frame');

            await exportReelVideo(
                reel,
                targetEl,
                (pct, frameIdx, total) => {
                    setExportProgress(pct);
                    setExportFrameInfo(`Renderizando fotograma ${frameIdx} de ${total} (${pct}%)`);
                },
                (ms) => setCurrentMs(ms),
                60
            );
            setExportFrameInfo('¡Renderizado completado con éxito! Archivo ZIP descargado.');
            setTimeout(() => {
                setIsExporting(false);
                setExportProgress(0);
            }, 3000);
        } catch (err) {
            console.error('[Export Error]:', err);
            alert(`Error durante el renderizado determinista: ${err.message || err}`);
            setIsExporting(false);
        }
    };

    const scaledW = Math.round(1080 * scale);
    const scaledH = Math.round(1920 * scale);

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 w-full max-w-6xl">
            {/* Columna Izquierda: Viewport 9:16 + Controles */}
            <div className="flex flex-col items-center gap-3">
                {/* Selector de Modo: Video Renderizado 60 FPS vs Lienzo Interactivo */}
                {reel?.videoUrl && (
                    <div className="flex items-center justify-between w-full px-1" style={{ maxWidth: Math.max(scaledW, 440) }}>
                        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
                            <button
                                onClick={() => setPlayMode('video')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${playMode === 'video' ? 'bg-emerald-500 text-black shadow' : 'text-neutral-400 hover:text-white'}`}
                            >
                                <i className="fa-solid fa-film text-[10px]" />
                                <span>Video 60 FPS Estable</span>
                            </button>
                            <button
                                onClick={() => setPlayMode('canvas')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${playMode === 'canvas' ? 'bg-neutral-700 text-white shadow' : 'text-neutral-400 hover:text-white'}`}
                            >
                                <i className="fa-solid fa-code text-[10px]" />
                                <span>Lienzo en Vivo</span>
                            </button>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            60 FPS NATIVO
                        </span>
                    </div>
                )}

                {/* Contenedor del Lienzo Escala Real */}
                <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-[#0D0D0E] flex items-center justify-center"
                    style={{ width: scaledW, height: scaledH }}
                >
                    {playMode === 'video' && reel?.videoUrl ? (
                        <video
                            key={reel.videoUrl}
                            src={reel.videoUrl}
                            controls
                            autoPlay
                            loop
                            playsInline
                            className="w-full h-full object-contain rounded-2xl bg-black"
                        />
                    ) : (
                        <>
                            {/* Marco de renderizado 1080×1920 nativo */}
                            <div
                                style={{
                                    width: '1080px',
                                    height: '1920px',
                                    transform: `scale(${scale})`,
                                    transformOrigin: 'top left',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0
                                }}
                            >
                                <window.MotionReelFrame
                                    reelData={reel}
                                    currentMs={currentMs}
                                    scale={1}
                                    id="motion-render-frame"
                                />
                            </div>

                            {/* Overlay durante exportación determinista */}
                            {isExporting && (
                                <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin mb-4" />
                                    <h4 className="text-white font-bold text-sm mb-1">Renderizado Determinista Offline</h4>
                                    <p className="text-amber-400 font-mono text-xs font-bold mb-3">{exportFrameInfo}</p>
                                    <div className="w-48 h-2 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                                        <div className="h-full bg-amber-500 transition-all duration-75" style={{ width: `${exportProgress}%` }} />
                                    </div>
                                    <span className="text-neutral-400 font-mono text-[11px] mt-2">1080×1920 @ 60 FPS · 0% saltos</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Controles de Línea de Tiempo y Reloj Virtual */}
                <div
                    className="w-full flex flex-col gap-2 p-3 bg-neutral-900/90 rounded-2xl border border-neutral-800"
                    style={{ maxWidth: Math.max(scaledW, 440) }}
                >
                    {/* Scrubber de milisegundos */}
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-neutral-400 w-12 text-left">
                            {(currentMs / 1000).toFixed(2)}s
                        </span>
                        <input
                            type="range"
                            min="0"
                            max={durationMs}
                            step="16.66"
                            value={currentMs}
                            onChange={(e) => {
                                setIsPlaying(false);
                                setCurrentMs(Number(e.target.value));
                            }}
                            className="flex-1 accent-emerald-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                        <span className="font-mono text-[11px] text-neutral-400 w-12 text-right">
                            {(durationMs / 1000).toFixed(1)}s
                        </span>
                    </div>

                    {/* Botonera de reproducción, avance por frame y exportación */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                disabled={isExporting}
                                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all shadow ${isPlaying ? 'bg-emerald-400 text-black' : 'bg-white text-black hover:bg-neutral-200'}`}
                                title={isPlaying ? 'Pausar' : 'Reproducir'}
                            >
                                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                            </button>

                            <button
                                onClick={() => setCurrentMs((prev) => Math.max(0, prev - (1000 / 60)))}
                                disabled={isExporting}
                                title="Retroceder 1 fotograma (16.66ms)"
                                className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center text-xs"
                            >
                                <i className="fa-solid fa-backward-step"></i>
                            </button>

                            <button
                                onClick={() => setCurrentMs((prev) => Math.min(durationMs, prev + (1000 / 60)))}
                                disabled={isExporting}
                                title="Avanzar 1 fotograma (16.66ms)"
                                className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center text-xs"
                            >
                                <i className="fa-solid fa-forward-step"></i>
                            </button>

                            <span className="text-[10px] font-mono text-neutral-500 px-1">
                                F: {Math.round(currentMs / (1000 / 60))}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {onOpenPostKit && (
                                <button
                                    onClick={onOpenPostKit}
                                    title="Ver guión, copy y hashtags"
                                    className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-neutral-800 text-neutral-300 hover:text-white flex items-center gap-1 border border-neutral-700"
                                >
                                    <i className="fa-solid fa-clipboard-list text-purple-400"></i>
                                    <span>Copy</span>
                                </button>
                            )}

                            {reel?.videoUrl && (
                                <button
                                    onClick={handleSaveToGallery}
                                    disabled={isSavingVideo}
                                    className="px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                                    title="Guardar video directamente en la Galería / Fotos de tu iPhone"
                                >
                                    <i className={`fa-solid ${isSavingVideo ? 'fa-spinner fa-spin' : 'fa-photo-film'} text-emerald-200`}></i>
                                    <span>{isSavingVideo ? (saveVideoStatus || 'Guardando...') : 'Guardar en Galería'}</span>
                                </button>
                            )}

                            {reel?.videoUrl && (
                                <button
                                    onClick={() => setIosTipOpen(prev => !prev)}
                                    title="Instrucciones para guardar en Fotos de iPhone"
                                    className={`px-2 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                                        iosTipOpen 
                                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600' 
                                            : 'bg-neutral-800 text-neutral-300 hover:text-white border-neutral-700'
                                    }`}
                                >
                                    <i className="fa-brands fa-apple text-neutral-300"></i>
                                    <i className="fa-solid fa-circle-question text-[10px] text-sky-400"></i>
                                </button>
                            )}

                            {reel?.videoUrl && (
                                <a
                                    href={reel.videoUrl}
                                    download={`${reel.id || 'reel_video'}.mp4`}
                                    className="hidden sm:flex px-2.5 py-1.5 rounded-xl text-xs font-bold bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 active:scale-95 transition-all items-center gap-1.5 no-underline cursor-pointer"
                                    title="Descargar archivo MP4 a la computadora"
                                >
                                    <i className="fa-solid fa-download text-neutral-400"></i>
                                    <span>MP4</span>
                                </a>
                            )}

                            <button
                                onClick={handleStartExport}
                                disabled={isExporting}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                                    reel?.videoUrl
                                        ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border-neutral-700'
                                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white shadow-lg active:scale-95'
                                }`}
                                title="Exportar fotogramas para editores de video (After Effects/Premiere) en ZIP"
                            >
                                <i className="fa-solid fa-file-zipper text-amber-400"></i>
                                <span>Frames (ZIP)</span>
                            </button>
                        </div>
                    </div>

                    {/* Banner explicativo para iPhone cuando se activa la ayuda */}
                    {iosTipOpen && (
                        <div className="mt-2.5 p-3 bg-neutral-900 border border-emerald-500/40 rounded-xl text-left text-xs text-neutral-200 shadow-xl flex items-start gap-2.5">
                            <i className="fa-brands fa-apple text-emerald-400 text-lg mt-0.5 shrink-0"></i>
                            <div className="flex-1">
                                <p className="font-bold text-white text-xs mb-1">Cómo guardar en Fotos de tu iPhone:</p>
                                <ol className="list-decimal list-inside space-y-1 text-neutral-300 text-[11px]">
                                    <li>Toca el botón verde <strong>"Guardar en Galería"</strong>.</li>
                                    <li>En el menú que abre iOS, pulsa <strong>"Guardar video"</strong> (con el ícono de Fotos).</li>
                                    <li>¡Listo! El video queda automáticamente en tu <strong>Carrete / Galería de Fotos</strong>.</li>
                                </ol>
                            </div>
                            <button onClick={() => setIosTipOpen(false)} className="text-neutral-400 hover:text-white p-1">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Columna Derecha: Panel de Estructura de Retención & Guión del Beat Activo */}
            {reel && (
                <div className="flex flex-col gap-4 w-full max-w-md bg-[#0D111A] border border-white/10 rounded-2xl p-5 shadow-2xl text-left">
                    {/* Cabecera del Reel */}
                    <div className="flex items-start justify-between border-b border-white/10 pb-3">
                        <div>
                            <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border"
                                style={{
                                    color: reel.accentColor || '#10B981',
                                    borderColor: `${reel.accentColor || '#10B981'}66`,
                                    backgroundColor: `${reel.accentColor || '#10B981'}1a`
                                }}>
                                {reel.kicker || '60 FPS MOTION'}
                            </span>
                            <h2 className="text-lg font-black text-white mt-2 leading-tight">{reel.title}</h2>
                            <p className="text-xs text-white/60 mt-1">{reel.subtitle}</p>
                        </div>
                    </div>

                    {/* Selector y Marcador de Beats */}
                    <div>
                        <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider mb-2 flex items-center justify-between">
                            <span>Estructura de Retención ({(reel.beats || []).length} Beats)</span>
                            <span className="text-[10px] text-emerald-400 font-bold">100% Determinista</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {(reel.beats || []).map((b, idx) => {
                                const startMs = typeof b.start_ms === 'number' ? b.start_ms : (b.start * 1000 || 0);
                                const endMs = typeof b.end_ms === 'number' ? b.end_ms : (b.end * 1000 || 1200);
                                const isActive = currentMs >= startMs && currentMs < endMs;
                                const brandColor = reel.accentColor || '#10B981';
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setIsPlaying(false);
                                            setCurrentMs(startMs);
                                        }}
                                        className={`p-2.5 rounded-xl text-left border transition-all ${
                                            isActive
                                                ? 'border-white/30 text-white shadow-lg'
                                                : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                                        }`}
                                        style={{
                                            backgroundColor: isActive ? `${brandColor}24` : undefined,
                                            borderColor: isActive ? brandColor : undefined
                                        }}
                                    >
                                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                                            <span className="font-bold" style={{ color: isActive ? brandColor : 'inherit' }}>
                                                Beat 0{idx + 1}
                                            </span>
                                            <span className="opacity-60 text-[10px]">{(startMs / 1000).toFixed(1)}s</span>
                                        </div>
                                        <div className="text-xs font-bold truncate text-white">
                                            {b.name || b.accent || (b.text ? b.text.slice(0, 15) : `Escena ${idx + 1}`)}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Guión y On-Screen Text del Beat Activo */}
                    {(() => {
                        const beats = reel.beats || [];
                        const activeBeat = beats.find(b => {
                            const s = typeof b.start_ms === 'number' ? b.start_ms : (b.start * 1000 || 0);
                            const e = typeof b.end_ms === 'number' ? b.end_ms : (b.end * 1000 || 1200);
                            return currentMs >= s && currentMs < e;
                        }) || beats[0];

                        if (!activeBeat) return null;
                        const brandColor = reel.accentColor || '#10B981';

                        return (
                            <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex flex-col gap-2.5">
                                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                                    <span>BEAT ACTIVO:</span>
                                    <span style={{ color: brandColor }} className="font-bold">
                                        {activeBeat.badge || activeBeat.name || 'Escena'}
                                    </span>
                                </div>
                                <div className="text-sm font-black text-white leading-snug">
                                    {(activeBeat.title || activeBeat.text || '').replace(/\*/g, '')}
                                </div>
                                {activeBeat.sub && (
                                    <div className="text-xs text-white/70 leading-relaxed">
                                        {activeBeat.sub}
                                    </div>
                                )}
                                {activeBeat.vo && (
                                    <div className="border-t border-white/10 mt-1 pt-2">
                                        <div className="text-[11px] font-mono text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                                            <i className="fa-solid fa-microphone text-xs" />
                                            <span>GUIÓN PARA LOCUCIÓN (VO):</span>
                                        </div>
                                        <div className="text-xs text-emerald-100 italic leading-relaxed bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                                            "{activeBeat.vo}"
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    {/* SECCIÓN DEDICADA: GUIÓN COMPLETO PARA LOCUCIÓN (TELEPROMPTER / GRABACIÓN) */}
                    {continuousScript && (
                        <div className="bg-gradient-to-b from-neutral-900/90 to-black/85 border border-emerald-500/30 rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
                            {/* Cabecera del Guión con métricas y botón de copia */}
                            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0">
                                        <i className="fa-solid fa-microphone-lines" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                                            <span>Guión Completo para Locución</span>
                                        </h4>
                                        <p className="text-[10px] text-emerald-400 font-mono">
                                            {totalWords} palabras · {durationSec.toFixed(1)}s · {cadenceWps} pal/seg
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCopyFullScript}
                                    title="Copiar todo el guión corrido para leer al micrófono"
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 border active:scale-95 shadow ${
                                        isScriptCopied
                                            ? 'bg-emerald-500 text-black border-emerald-400'
                                            : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/80 hover:text-white'
                                    }`}
                                >
                                    <i className={`fa-solid ${isScriptCopied ? 'fa-check' : 'fa-copy'}`} />
                                    <span>{isScriptCopied ? '¡Copiado!' : 'Copiar Todo'}</span>
                                </button>
                            </div>

                            {/* Selector de Vista: Párrafo Corrido vs Por Escenas */}
                            <div className="flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setScriptViewMode('continuous')}
                                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                                        scriptViewMode === 'continuous'
                                            ? 'bg-neutral-800 text-white shadow'
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    <i className="fa-solid fa-align-left text-[9px]" />
                                    <span>Texto Corrido (Teleprompter)</span>
                                </button>
                                <button
                                    onClick={() => setScriptViewMode('timed')}
                                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                                        scriptViewMode === 'timed'
                                            ? 'bg-neutral-800 text-white shadow'
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    <i className="fa-solid fa-stopwatch text-[9px]" />
                                    <span>Por Tiempos ({allBeats.length} beats)</span>
                                </button>
                            </div>

                            {/* Contenedor del texto */}
                            {scriptViewMode === 'continuous' ? (
                                <div className="bg-black/75 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-100/90 font-medium leading-relaxed max-h-44 overflow-y-auto hide-scrollbar select-text">
                                    "{continuousScript}"
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto hide-scrollbar select-text pr-1">
                                    {allBeats.map((b, bIdx) => {
                                        const s = typeof b.start_ms === 'number' ? b.start_ms : (b.start * 1000 || 0);
                                        const e = typeof b.end_ms === 'number' ? b.end_ms : (b.end * 1000 || 2500);
                                        const dur = ((e - s) / 1000).toFixed(1);
                                        const beatWords = b.vo ? b.vo.split(/\s+/).filter(Boolean).length : 0;
                                        return (
                                            <div key={bIdx} className="bg-black/70 border border-neutral-800 rounded-lg p-2 flex flex-col gap-1 text-[11px]">
                                                <div className="flex items-center justify-between text-[10px] font-mono">
                                                    <span className="font-bold text-emerald-400">
                                                        Beat 0{bIdx + 1}: {b.name || `Escena ${bIdx + 1}`}
                                                    </span>
                                                    <span className="text-neutral-400">
                                                        {(s / 1000).toFixed(1)}s - {(e / 1000).toFixed(1)}s · {dur}s ({beatWords} pal)
                                                    </span>
                                                </div>
                                                <div className="text-neutral-200 italic font-medium leading-snug">
                                                    "{b.vo || '—'}"
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Barra informativa de cadencia */}
                            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-white/5 font-mono">
                                <span className="flex items-center gap-1 text-emerald-400">
                                    <i className="fa-solid fa-circle-check text-[9px]" />
                                    <span>Cadencia calibrada para tiempos cortos</span>
                                </span>
                                <span className="text-neutral-300 font-bold">~{cadenceWps} pal/s</span>
                            </div>
                        </div>
                    )}

                    {/* Botón rápido para abrir Post Kit con Guión & Hashtags */}
                    {onOpenPostKit && (
                        <button
                            onClick={onOpenPostKit}
                            className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-900/60 to-indigo-900/60 hover:from-purple-800 hover:to-indigo-800 text-white border border-purple-500/30 flex items-center justify-center gap-2 shadow-lg transition-all"
                        >
                            <i className="fa-solid fa-copy text-purple-300"></i>
                            <span>Ver Kit de Publicación (Copy & Tags)</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

// Exposición global
if (typeof window !== "undefined") {
    window.exportReelVideo = exportReelVideo;
    window.MotionReelPlayer = MotionReelPlayer;
}
