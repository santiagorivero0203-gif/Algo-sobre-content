/**
 * =====================================================================
 * SANTI.DEV · APLICACIÓN PRINCIPAL DEL EDITOR (REACT)
 * =====================================================================
 * Arquitectura modular y responsiva para Móvil y Escritorio:
 *   - Optimización total para smartphones (diseño mobile-first):
 *       * Escalado automático del lienzo proporcional al ancho del teléfono (transformOrigin: top left).
 *       * Navegación por gestos táctiles (swipe izquierda / derecha).
 *       * Drawer / Bottom sheet para seleccionar entre los 8 carruseles.
 *       * Selector de slides en barra horizontal táctil por números.
 *       * Botonera fija inferior optimizada para pulgares (Descargar HD y Descargar Todo).
 *   - Soporte nativo para iPhone / iOS (Safari & Chrome):
 *       * Integración con Web Share API (navigator.share) para guardar
 *         directamente en la app de Fotos (Carrete) del iPhone.
 *       * Modal de guardado directo con previsualización para 'Guardar en Fotos'
 *         manteniendo presionado, compartir nativo o descarga de archivo.
 *       * Generación de Blobs PNG en lugar de DataURLs pesadas bloqueadas por Safari.
 *   - Modo Escritorio (MD+):
 *       * Ajuste vertical automático (Fit to Viewport) para que la diapositiva completa
 *         quepa en pantallas de laptops (ej: 1366x768 / 1080p con barras) sin cortes.
 *       * Botonera de exportación fijada en el pie de la barra lateral (sticky bottom).
 *       * Píldoras de diapositivas horizontales también en la barra superior del lienzo.
 *       * Navegación por teclado (← / →).
 *   - Motor de exportación dual:
 *       * TikTok / Reels / Shorts: 1080x1920 (9:16).
 *       * Instagram Feed: 1080x1350 (4:5).
 *       * Desactiva temporalmente el escalado CSS para renderizado 100% nítido
 *         en html2canvas sin aberraciones de subpíxel ni recortes por ancestros.
 * =====================================================================
 */

const URL_PARAMS = new URLSearchParams(window.location.search);

// Determinación del video inicial a partir de parámetro de URL (?v=...)
const initialVideo = (() => {
    const v = URL_PARAMS.get('v');
    if (!v) return 0;
    const byId = window.VIDEOS.findIndex((x) => x.id === v);
    if (byId >= 0) return byId;
    const n = parseInt(v, 10) - 1;
    return n >= 0 && n < window.VIDEOS.length ? n : 0;
})();

// Determinación de la diapositiva inicial (?s=...)
const initialSlide = (() => {
    const n = parseInt(URL_PARAMS.get('s') || '1', 10) - 1;
    return Math.max(0, Math.min(n, window.VIDEOS[initialVideo].slides.length - 1));
})();

// Determinación del formato inicial (?fmt=tiktok o ?fmt=instagram)
const initialFormat = (() => {
    const f = (URL_PARAMS.get('fmt') || URL_PARAMS.get('format') || '').toLowerCase();
    if (f === 'instagram' || f === 'ig' || f === '4:5') return 'instagram';
    return 'tiktok';
})();

const SOLO = URL_PARAMS.get('solo') === '1';

// Detección precisa de dispositivos móviles e iOS (iPhone / iPad / iPod / Android)
const isMobileDevice = (() => {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent || '';
    return /iPhone|iPad|iPod|Android/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
})();

/**
 * Función utilitaria para copiar texto al portapapeles con retrocompatibilidad
 * y soporte en contextos web y móviles (iPhone / Android / Desktop).
 */
const copyTextToClipboard = async (text) => {
    if (!text) return false;
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (e) {
        console.warn('Clipboard writeText falló, intentando fallback execCommand:', e);
    }
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.top = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        const success = document.execCommand('copy');
        document.body.removeChild(ta);
        return success;
    } catch (err) {
        console.error('Fallback copy falló:', err);
        return false;
    }
};

const App = () => {
    // Estado de selección de video y slide activa
    const [vIdx, setVIdx] = React.useState(initialVideo);
    const [sIdx, setSIdx] = React.useState(initialSlide);
    const [format, setFormat] = React.useState(initialFormat);
    const [busy, setBusy] = React.useState(false);
    const [progressText, setProgressText] = React.useState('');

    // Estado del drawer/menú móvil de selección de carruseles (?drawer=1 para test o apertura directa)
    const [drawerOpen, setDrawerOpen] = React.useState(URL_PARAMS.get('drawer') === '1');

    // Estado del modal de guardado para iPhone y dispositivos móviles
    const [exportModal, setExportModal] = React.useState(null);

    // Estado del modal del Kit de Publicación (descripciones, hooks y hashtags) (?postkit=1 para test)
    const [postKitOpen, setPostKitOpen] = React.useState(URL_PARAMS.get('postkit') === '1');
    const [copiedKey, setCopiedKey] = React.useState(null);

    /** Maneja la copia al portapapeles con feedback temporal (2.2 segundos) */
    const handleCopy = async (key, text) => {
        const ok = await copyTextToClipboard(text);
        if (ok) {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2200);
        }
    };

    // Modo de ajuste en escritorio: 'fit' (ajuste automático a la altura de la pantalla) o '100%'
    const [fitView, setFitView] = React.useState(true);

    // Dimensiones de ventana para escalado reactivo en móvil y escritorio
    const [viewportW, setViewportW] = React.useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );
    const [viewportH, setViewportH] = React.useState(
        typeof window !== 'undefined' ? window.innerHeight : 768
    );

    const video = window.VIDEOS[vIdx];
    const slide = video.slides[sIdx];
    const theme = window.THEMES[video.theme];
    const fmt = window.FORMATS[format] || window.FORMATS.tiktok;
    const isFileProtocol = window.location.protocol === 'file:';

    // Detección de ancho móvil (< 768px)
    const isMobile = viewportW < 768;

    // Escucha el redimensionamiento de pantalla para recalcular el factor de escala
    React.useEffect(() => {
        const onResize = () => {
            setViewportW(window.innerWidth);
            setViewportH(window.innerHeight);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Navegación por teclado para escritorio (flechas ← / →)
    React.useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') setSIdx((i) => Math.min(i + 1, video.slides.length - 1));
            if (e.key === 'ArrowLeft') setSIdx((i) => Math.max(i - 1, 0));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [video]);

    // Soporte para gestos táctiles (Swipe izquierda / derecha) en teléfonos
    const touchStartX = React.useRef(null);
    const touchStartY = React.useRef(null);

    const handleTouchStart = (e) => {
        if (!e.touches || e.touches.length === 0) return;
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = touchStartX.current - endX;
        const diffY = touchStartY.current - endY;

        // Validar que el gesto horizontal sea dominante sobre el scroll vertical
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                // Deslizar hacia la izquierda -> avanzar a la siguiente diapositiva
                setSIdx((i) => Math.min(i + 1, video.slides.length - 1));
            } else {
                // Deslizar hacia la derecha -> regresar a la diapositiva anterior
                setSIdx((i) => Math.max(i - 1, 0));
            }
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };

    // Dimensiones base del elemento de captura
    const baseW = 405;
    const baseH = format === 'instagram' ? 506.25 : 720;

    // Factor de escala adaptativo:
    // - En móvil: escala al ancho del teléfono (con 24px de margen de seguridad)
    // - En escritorio: si fitView está activo, calcula la escala para que la slide
    //   completa quepa en la altura de la ventana (evita que la tarjeta quede cortada)
    const currentScale = (() => {
        if (isMobile) {
            return Math.min(1, Math.max(0.6, (viewportW - 24) / baseW));
        }
        if (fitView) {
            const availH = viewportH - 135;
            return Math.min(1, Math.max(0.55, availH / baseH));
        }
        return 1;
    })();

    const scaledW = Math.round(baseW * currentScale);
    const scaledH = Math.round(baseH * currentScale);

    /**
     * Renderiza la slide actual a un Blob PNG de alta resolución (1080x1920 o 1080x1350).
     *
     * Motor principal: modern-screenshot (js/vendor). Clona la slide dentro de un
     * SVG <foreignObject> y deja que el PROPIO navegador la pinte, así el PNG es
     * idéntico a la vista previa. html2canvas, en cambio, "reimplementa" CSS a mano
     * y fallaba con: repeating-conic-gradient (fondo transparente del Antes/Después),
     * texto desplazado hacia abajo por el preflight de Tailwind, elipsis (truncate),
     * rotaciones de tarjetas y line-height de las fuentes.
     *
     * Motor de respaldo: html2canvas (sólo si el principal lanza un error).
     */
    const renderSlideToBlob = async () => {
        try {
            await Promise.race([
                document.fonts.ready,
                new Promise((resolve) => setTimeout(resolve, 1500)),
            ]);
        } catch (e) {
            console.warn('Font loading check skipped:', e);
        }

        const el = document.getElementById('capture-slide');
        const isIg = format === 'instagram';
        const targetW = 1080;
        const targetH = isIg ? 1350 : 1920;
        const elW = 405;
        const elH = isIg ? 506.25 : 720;
        const scale = targetW / elW;

        const isFlat = theme?.bgStyle === 'flat';
        const canvasBg = theme?.bgCanvas || '#0c0c0c';

        /** Normaliza cualquier canvas al tamaño exacto de la red social y lo convierte en PNG */
        const canvasToExactBlob = (src) => new Promise((resolve, reject) => {
            let out = src;
            if (src.width !== targetW || src.height !== targetH) {
                out = document.createElement('canvas');
                out.width = targetW;
                out.height = targetH;
                const ctx = out.getContext('2d');
                ctx.fillStyle = canvasBg;
                ctx.fillRect(0, 0, targetW, targetH);
                ctx.drawImage(src, 0, 0, targetW, targetH);
            }
            out.toBlob((b) => (b ? resolve(b) : reject(new Error('Canvas toBlob failed'))), 'image/png', 1.0);
        });

        // ---------- 1) Motor principal: modern-screenshot ----------
        if (window.modernScreenshot) {
            try {
                const opts = {
                    width: elW,
                    height: elH,
                    scale,
                    backgroundColor: canvasBg,
                    timeout: 15000,
                    // El PNG debe tener esquinas rectas y sin sombra exterior
                    // (el redondeo y la sombra sólo decoran la vista previa del editor)
                    style: {
                        borderRadius: '0',
                        boxShadow: 'none',
                        transition: 'none',
                        margin: '0',
                        backgroundColor: canvasBg,
                        backgroundImage: isFlat ? 'none' : 'linear-gradient(to right, rgba(255, 255, 255, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.18) 1px, transparent 1px)',
                        backgroundSize: isFlat ? 'auto' : '27px 27px',
                    },
                    fetch: { requestInit: { mode: 'cors', cache: 'force-cache' } },
                    features: { removeControlCharacter: true },
                };
                // WebKit (iPhone/Safari) a veces pinta la primera pasada sin imágenes ni
                // fuentes decodificadas: hacemos una pasada de calentamiento barata.
                if (isMobileDevice) {
                    await window.modernScreenshot.domToCanvas(el, { ...opts, scale: 1 });
                }
                const canvas = await window.modernScreenshot.domToCanvas(el, opts);
                return await canvasToExactBlob(canvas);
            } catch (err) {
                console.warn('modern-screenshot falló, usando html2canvas como respaldo:', err);
            }
        }

        // ---------- 2) Respaldo: html2canvas ----------
        // Requiere quitar temporalmente el escalado CSS del contenedor para no recortar.
        const outer = document.getElementById('slide-scaler-outer');
        const inner = document.getElementById('slide-scaler-inner');
        const prevInnerTransform = inner ? inner.style.transform : '';
        const prevOuterOverflow = outer ? outer.style.overflow : '';
        const prevOuterWidth = outer ? outer.style.width : '';
        const prevOuterHeight = outer ? outer.style.height : '';

        if (inner) inner.style.transform = 'none';
        if (outer) {
            outer.style.overflow = 'visible';
            outer.style.width = `${elW}px`;
            outer.style.height = `${elH}px`;
        }

        try {
            const canvas = await html2canvas(el, {
                scale,
                width: elW,
                height: elH,
                backgroundColor: canvasBg,
                useCORS: true,
                allowTaint: false,
                logging: false,
                imageTimeout: 5000,
                onclone: (doc) => {
                    const c = doc.getElementById('capture-slide');
                    if (c) {
                        c.style.borderRadius = '0';
                        c.style.boxShadow = 'none';
                        c.style.backgroundColor = canvasBg;
                        c.style.backgroundImage = isFlat ? 'none' : 'linear-gradient(to right, rgba(255, 255, 255, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.18) 1px, transparent 1px)';
                        c.style.backgroundSize = isFlat ? 'auto' : '27px 27px';
                    }
                },
            });
            return await canvasToExactBlob(canvas);
        } finally {
            if (inner) inner.style.transform = prevInnerTransform;
            if (outer) {
                outer.style.overflow = prevOuterOverflow;
                outer.style.width = prevOuterWidth;
                outer.style.height = prevOuterHeight;
            }
        }
    };

    /**
     * Exporta la diapositiva activa con compatibilidad total para iPhone / iOS Safari:
     * 1. Intenta abrir el Web Share Sheet nativo de iOS para 'Guardar imagen' en Fotos.
     * 2. Si falla o se cancela, abre el modal de guardado directo con previsualización
     *    y botón directo libre de bloqueo de popups.
     * 3. En escritorio, descarga automáticamente el archivo vía Blob URL.
     */
    const downloadOne = async () => {
        setBusy(true);
        setProgressText('Generando slide HD...');
        try {
            const filename = `${video.slug}_${format}_${window.pad(sIdx + 1)}.png`;
            const blob = await renderSlideToBlob();
            const file = new File([blob], filename, { type: 'image/png' });
            const url = URL.createObjectURL(blob);

            // Intentar guardado nativo en iPhone mediante Web Share API
            if (isMobileDevice && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: filename,
                        text: 'Slide guardada con Santi.Dev Creator',
                    });
                    // Éxito con el Share Sheet de iOS (el usuario guardó o envió a Instagram/WhatsApp)
                    return;
                } catch (shareErr) {
                    if (shareErr.name === 'AbortError') {
                        // El usuario cerró el menú deliberadamente
                        return;
                    }
                    console.warn('navigator.share falló, abriendo modal de guardado:', shareErr);
                }
            }

            // En dispositivos móviles (iPhone / Android) o si no se compartió directamente,
            // abrimos el modal de guardado táctil optimizado
            if (isMobileDevice) {
                setExportModal({
                    filename,
                    blob,
                    file,
                    url,
                    isMultiple: false,
                });
                return;
            }

            // En escritorio: descarga directa vía <a download> con Blob URL (100% compatible)
            const a = document.createElement('a');
            a.download = filename;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 5000);
        } catch (err) {
            console.error(err);
            alert('No se pudo exportar la diapositiva. Asegúrate de ejecutar en servidor local.');
        } finally {
            setBusy(false);
            setProgressText('');
        }
    };

    /** Exporta todas las diapositivas del carrusel en serie */
    const downloadAll = async () => {
        setBusy(true);
        try {
            const items = [];
            for (let i = 0; i < video.slides.length; i++) {
                setSIdx(i);
                setProgressText(`Renderizando ${i + 1}/${video.slides.length}...`);
                await window.sleep(400);
                const filename = `${video.slug}_${format}_${window.pad(i + 1)}.png`;
                const blob = await renderSlideToBlob();
                const file = new File([blob], filename, { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                items.push({ index: i, filename, blob, file, url });

                // En escritorio se descarga secuencialmente al disco
                if (!isMobileDevice) {
                    const a = document.createElement('a');
                    a.download = filename;
                    a.href = url;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    await window.sleep(250);
                }
            }

            // En iPhone / Móvil, abrimos el panel de carrusel completo para guardar cada foto en la galería
            if (isMobileDevice && items.length > 0) {
                setExportModal({
                    filename: `${video.slug}_${format}_carrusel`,
                    isMultiple: true,
                    items,
                });
            }
        } catch (err) {
            console.error(err);
            alert('Error exportando carrusel. Revisa la consola para más detalles.');
        } finally {
            setBusy(false);
            setProgressText('');
        }
    };

    // Modo solo: renderiza únicamente la slide pura (para screenshots limpios)
    if (SOLO) return <window.Slide video={video} d={slide} index={sIdx} format={format} />;

    return (
        <div className="flex flex-col md:flex-row w-full max-w-[100vw] overflow-x-hidden min-h-screen md:h-screen bg-[#0c0c0c] text-white">

            {/* ============================================================== */}
            {/* CABECERA MÓVIL STICKY (< 768px)                                */}
            {/* ============================================================== */}
            <header className="md:hidden sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 px-3 py-2 flex items-center justify-between w-full max-w-[100vw]">
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }}></span>
                    <span className="font-black text-sm tracking-tight text-white">Santi.Dev</span>
                </div>

                {/* Controles superiores compactos */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {/* Selector de formato 9:16 vs 4:5 */}
                    <div className="flex bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
                        <button
                            id="mobile-btn-tiktok"
                            onClick={() => setFormat('tiktok')}
                            className={`px-2 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${format === 'tiktok' ? 'bg-white text-black' : 'text-neutral-400'}`}>
                            <i className="fa-brands fa-tiktok text-[10px]"></i>
                            <span>9:16</span>
                        </button>
                        <button
                            id="mobile-btn-instagram"
                            onClick={() => setFormat('instagram')}
                            className={`px-2 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${format === 'instagram' ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white' : 'text-neutral-400'}`}>
                            <i className="fa-brands fa-instagram text-[10px]"></i>
                            <span>4:5</span>
                        </button>
                    </div>

                    {/* Botón para abrir el menú de selección de los 8 videos */}
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setDrawerOpen(true)}
                        className="bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white px-2 py-1 rounded-lg text-xs font-bold border border-neutral-700 flex items-center gap-1 transition-all">
                        <i className="fa-solid fa-layer-group text-neutral-400 text-[11px]"></i>
                        <span className="font-mono text-[11px]">{vIdx + 1}/8</span>
                        <i className="fa-solid fa-chevron-down text-[8px] text-neutral-400"></i>
                    </button>
                </div>
            </header>

            {/* Sub-barra móvil: Selector de carrusel activo, Kit de Post y píldoras de slides */}
            <div className="md:hidden bg-neutral-900/80 border-b border-neutral-800/80 px-3 py-2 flex flex-col gap-2 w-full max-w-[100vw]">
                <div className="flex items-center justify-between">
                    <div
                        onClick={() => setDrawerOpen(true)}
                        className="flex items-center gap-2 truncate cursor-pointer active:opacity-80 transition-opacity">
                        <span style={{ width: 7, height: 7, borderRadius: 2, background: theme.accent, flexShrink: 0 }} />
                        <span className="text-xs font-bold text-neutral-100 truncate">{video.title}</span>
                        <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1 shrink-0 ml-1">
                            <i className="fa-solid fa-chevron-down text-[8px]"></i>
                        </span>
                    </div>

                    {/* Botón rápido móvil para abrir el Kit de Publicación */}
                    <button
                        id="mobile-btn-postkit"
                        onClick={() => setPostKitOpen(true)}
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-900/90 to-indigo-900/90 border border-purple-500/50 text-purple-200 hover:text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 active:scale-95 shadow">
                        <i className="fa-solid fa-clipboard-list text-purple-300 text-[10px]"></i>
                        <span>Kit Post</span>
                    </button>
                </div>

                {/* Lista horizontal desplazable de diapositivas con toque suave */}
                <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pt-0.5 pb-0.5 w-full min-w-0">
                    {video.slides.map((s, idx) => (
                        <button
                            key={idx}
                            id={`mobile-slide-btn-${idx + 1}`}
                            onClick={() => setSIdx(idx)}
                            className={`min-w-[32px] h-7 px-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-all ${sIdx === idx ? 'bg-white text-black shadow-md scale-105' : 'bg-neutral-800/90 text-neutral-400 hover:text-white'}`}>
                            {idx + 1}
                        </button>
                    ))}
                    <div className="ml-auto text-[10.5px] font-mono text-neutral-500 shrink-0 pl-2">
                        {sIdx + 1} de {video.slides.length}
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* BARRA LATERAL ESCRITORIO (>= 768px)                            */}
            {/* ============================================================== */}
            <aside className="hidden md:flex w-[335px] bg-neutral-900 flex-col border-r border-neutral-800 h-full shrink-0 relative">
                {/* Zona superior con scroll independiente */}
                <div className="flex-1 p-5 overflow-y-auto hide-scrollbar flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                        <h1 className="text-base font-black text-white flex items-center gap-2">
                            <i className="fa-solid fa-layer-group" style={{ color: theme.accent }}></i> Santi.Dev Creator
                        </h1>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold border border-neutral-700">v3.6</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-mono mb-3">Generador de carruseles de alta calidad</p>

                    {/* Botón de acceso al Kit de Publicación (Captions, Hooks & Hashtags) */}
                    <button
                        id="btn-open-postkit"
                        onClick={() => setPostKitOpen(true)}
                        className="w-full mb-4 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-950/80 via-neutral-900 to-indigo-950/80 hover:from-purple-900/90 hover:to-indigo-900/90 border border-purple-500/40 text-purple-200 flex items-center justify-between shadow-lg transition-all active:scale-[0.98] group">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-clipboard-list text-purple-400 group-hover:scale-110 transition-transform"></i>
                            <span className="text-white font-black">Kit de Publicación</span>
                        </div>
                        <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md border border-purple-400/30">
                            Copy & Tags
                        </span>
                    </button>

                    {/* Selector de formato para escritorio */}
                    <div className="mb-4">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                            <span>Formato de salida</span>
                            <span className="font-mono text-neutral-400 text-[10px]">{format === 'instagram' ? '1080 × 1350' : '1080 × 1920'}</span>
                        </label>
                        <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                            <button
                                id="fmt-btn-tiktok"
                                onClick={() => setFormat('tiktok')}
                                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${format === 'tiktok' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'}`}>
                                <i className="fa-brands fa-tiktok"></i>
                                <span>TikTok 9:16</span>
                            </button>
                            <button
                                id="fmt-btn-instagram"
                                onClick={() => setFormat('instagram')}
                                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${format === 'instagram' ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                                <i className="fa-brands fa-instagram"></i>
                                <span>Instagram 4:5</span>
                            </button>
                        </div>
                    </div>

                    {isFileProtocol && (
                        <div className="mb-4 rounded-lg p-3 text-[11px] leading-snug bg-amber-950/40 text-amber-200 border border-amber-800/60">
                            <b className="text-white">Aviso:</b> estás en <span className="font-mono">file://</span>. Para exportar sin bloqueo CORS ejecuta: <span className="font-mono text-white">npx serve .</span>
                        </div>
                    )}

                    {/* Agrupación por series en escritorio */}
                    {[...new Set(window.VIDEOS.map((v) => v.group))].map((grpName) => {
                        const list = window.VIDEOS.map((v, i) => ({ v, i })).filter((item) => item.v.group === grpName);
                        return (
                            <div key={grpName} className="mb-3">
                                <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                                    <span>{grpName}</span>
                                    <span className="font-mono text-[9px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">{list.length} videos</span>
                                </div>
                                {list.map(({ v, i }) => (
                                    <div key={v.id} className="mb-1.5">
                                        <button
                                            id={`video-btn-${v.id}`}
                                            onClick={() => { setVIdx(i); setSIdx(0); }}
                                            className={`w-full text-left p-2.5 rounded-lg transition-all ${vIdx === i ? 'bg-white text-black font-semibold shadow' : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'}`}>
                                            <div className="flex items-center gap-2 text-xs font-bold truncate">
                                                <span style={{ width: 8, height: 8, borderRadius: 2, background: window.THEMES[v.theme].accent, flexShrink: 0 }} />
                                                <span className="truncate">{v.title}</span>
                                            </div>
                                            <div className={`text-[10.5px] mt-0.5 truncate ${vIdx === i ? 'text-neutral-600' : 'text-neutral-400'}`}>{v.subtitle}</div>
                                        </button>

                                        {/* Diapositivas expandidas directamente bajo el video activo */}
                                        {vIdx === i && (
                                            <div className="mt-1.5 mb-2 pl-3 border-l-2 flex flex-col gap-1" style={{ borderColor: window.THEMES[v.theme].accent }}>
                                                {v.slides.map((s, idx) => (
                                                    <button
                                                        key={idx}
                                                        id={`slide-btn-${idx + 1}`}
                                                        onClick={() => setSIdx(idx)}
                                                        className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11.5px] font-semibold transition-all flex items-center gap-2 ${sIdx === idx ? 'bg-neutral-800 text-white font-bold ring-1 ring-neutral-600' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}>
                                                        <span className="w-4 h-4 rounded flex items-center justify-center text-[10px] font-mono shrink-0"
                                                            style={{ background: sIdx === idx ? theme.accent : '#333', color: sIdx === idx ? theme.ink : '#bbb' }}>{idx + 1}</span>
                                                        <span className="truncate flex-1">{(s.title || s.quote || s.number || '').replace(/\*/g, '')}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>

                {/* Botonera fija inferior en la barra lateral (sticky bottom) */}
                <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex flex-col gap-2 shrink-0 shadow-2xl">
                    <button
                        id="download-one"
                        onClick={downloadOne}
                        disabled={busy}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${busy ? 'bg-neutral-600 cursor-not-allowed text-neutral-300' : 'bg-white text-black hover:bg-neutral-200 shadow'}`}>
                        <i className={`fa-solid ${busy ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
                        <span>{busy ? progressText : `Descargar slide (${format === 'instagram' ? '1080×1350' : '1080×1920'})`}</span>
                    </button>
                    <button
                        id="download-all"
                        onClick={downloadAll}
                        disabled={busy}
                        className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border border-neutral-700 text-neutral-200 hover:bg-neutral-800">
                        <i className={`fa-solid ${busy ? 'fa-spinner fa-spin' : 'fa-images'}`}></i>
                        <span>{busy ? progressText : `Descargar todo el carrusel (${format.toUpperCase()})`}</span>
                    </button>
                </div>
            </aside>

            {/* ============================================================== */}
            {/* ÁREA PRINCIPAL: LIENZO RESPONSIVO + DETALLES                   */}
            {/* ============================================================== */}
            <main
                className="flex-1 bg-[#0a0a0a] flex flex-col items-center p-3 md:p-5 overflow-y-auto overflow-x-hidden hide-scrollbar gap-2.5 w-full max-w-[100vw]"
                style={{ justifyContent: 'safe center' }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}>

                {/* Barra de control superior de la diapositiva (formato + navegación + zoom) */}
                <div
                    className="flex items-center justify-between text-neutral-400 text-xs px-1 w-full shrink-0"
                    style={{ maxWidth: Math.max(scaledW, 360) }}>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className={`w-2 h-2 rounded-full ${format === 'instagram' ? 'bg-rose-500' : 'bg-cyan-400'}`}></span>
                        <span className="font-bold text-white uppercase">{format}</span>
                        <span className="text-neutral-500">· {format === 'instagram' ? '1080×1350' : '1080×1920'}</span>
                    </div>

                    {/* Controles de vista y slides en escritorio */}
                    <div className="flex items-center gap-2">
                        {/* Selector rápido de slides en escritorio */}
                        <div className="hidden md:flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
                            {video.slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSIdx(idx)}
                                    className={`w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-all ${sIdx === idx ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}>
                                    {idx + 1}
                                </button>
                            ))}
                        </div>

                        {/* Toggle de ajuste a pantalla (Fit) vs 100% */}
                        <div className="hidden md:flex bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 text-[10px] font-mono">
                            <button
                                onClick={() => setFitView(true)}
                                className={`px-2 py-0.5 rounded font-bold transition-all ${fitView ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
                                title="Ajusta la diapositiva completa a la altura visible de la pantalla">
                                Ajustar
                            </button>
                            <button
                                onClick={() => setFitView(false)}
                                className={`px-2 py-0.5 rounded font-bold transition-all ${!fitView ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
                                title="Tamaño natural 100%">
                                100%
                            </button>
                        </div>

                        {/* Botón Kit de Publicación en el encabezado del lienzo */}
                        <button
                            id="header-btn-postkit"
                            onClick={() => setPostKitOpen(true)}
                            className="hidden md:flex bg-neutral-900 hover:bg-neutral-800 border border-purple-500/40 text-purple-300 hover:text-white px-2.5 py-1 rounded-lg text-xs font-bold items-center gap-1.5 transition-all shadow-sm">
                            <i className="fa-solid fa-hashtag text-purple-400 text-[10px]"></i>
                            <span>Kit de Post</span>
                        </button>

                        <span className="md:hidden bg-neutral-800/80 px-2 py-0.5 rounded text-neutral-300 font-mono text-[11px]">
                            {sIdx + 1}/{video.slides.length}
                        </span>
                    </div>
                </div>

                {/* Contenedor con escalado responsivo proporcional (shrink-0 garantiza que flexbox jamás recorte la diapositiva) */}
                <div
                    id="slide-scaler-outer"
                    className="slide-scaler-outer mx-auto shrink-0"
                    style={{
                        width: scaledW,
                        height: scaledH,
                    }}>
                    <div
                        id="slide-scaler-inner"
                        className="slide-scaler-inner"
                        style={{
                            transform: `scale(${currentScale})`,
                            transformOrigin: 'top left',
                            width: baseW,
                            height: baseH,
                        }}>
                        <window.Slide video={video} d={slide} index={sIdx} format={format} />
                    </div>
                </div>

                {/* Controles de navegación táctil para móvil (< 768px) */}
                <div
                    className="md:hidden flex items-center justify-between gap-2 w-full mt-1 shrink-0"
                    style={{ maxWidth: scaledW }}>
                    <button
                        id="mobile-nav-prev"
                        onClick={() => setSIdx((i) => Math.max(0, i - 1))}
                        disabled={sIdx === 0}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${sIdx === 0 ? 'border-neutral-900 text-neutral-600 bg-neutral-950/40 cursor-not-allowed' : 'border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95'}`}>
                        <i className="fa-solid fa-chevron-left text-[10px]"></i>
                        <span>Anterior</span>
                    </button>
                    <span className="font-mono text-xs text-neutral-500 px-1 font-semibold shrink-0">
                        {sIdx + 1} / {video.slides.length}
                    </span>
                    <button
                        id="mobile-nav-next"
                        onClick={() => setSIdx((i) => Math.min(video.slides.length - 1, i + 1))}
                        disabled={sIdx === video.slides.length - 1}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${sIdx === video.slides.length - 1 ? 'border-neutral-900 text-neutral-600 bg-neutral-950/40 cursor-not-allowed' : 'border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95'}`}>
                        <span>Siguiente</span>
                        <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>
                </div>

                {/* Metadatos y notas de producción */}
                <div
                    className="text-[11px] font-mono text-neutral-500 flex justify-between px-1 w-full shrink-0"
                    style={{ maxWidth: Math.max(scaledW, 360) }}>
                    <span>{slide.type} · {slide.layout} · {slide.tone || 'white'}</span>
                    <span className="hidden md:inline">← → para navegar</span>
                    <span className="md:hidden text-neutral-600">Desliza el dedo ↔</span>
                </div>

                {slide.prod && (
                    <div
                        className="rounded-xl p-3 text-[11.5px] leading-snug bg-neutral-900/90 border border-neutral-800/80 text-neutral-300 w-full shrink-0"
                        style={{ maxWidth: Math.max(scaledW, 360) }}>
                        <div className="flex items-center gap-1.5 text-neutral-400 font-bold mb-1 text-[11px] uppercase tracking-wider">
                            <i className="fa-solid fa-wand-magic-sparkles text-[10px]" style={{ color: theme.accent }}></i>
                            <span>Nota creativa:</span>
                        </div>
                        <p>{slide.prod}</p>
                    </div>
                )}

                {/* Espacio de reserva para que el contenido no quede tapado por la botonera fija inferior en móvil */}
                <div className="md:hidden h-24 w-full shrink-0"></div>
            </main>

            {/* ============================================================== */}
            {/* BOTONERA FIJA INFERIOR PARA MÓVIL (< 768px)                    */}
            {/* ============================================================== */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2.5 shadow-2xl flex items-center gap-2">
                <button
                    id="mobile-download-one"
                    onClick={downloadOne}
                    disabled={busy}
                    className={`flex-1 py-3 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${busy ? 'bg-neutral-700 text-neutral-300 cursor-not-allowed' : 'bg-white text-black hover:bg-neutral-200'}`}>
                    <i className={`fa-solid ${busy ? 'fa-spinner fa-spin' : 'fa-arrow-down-to-bracket'} text-sm`}></i>
                    <span className="truncate">{busy ? progressText : `Descargar Slide (${format.toUpperCase()})`}</span>
                </button>

                <button
                    id="mobile-download-all"
                    onClick={downloadAll}
                    disabled={busy}
                    title="Descargar todo el carrusel"
                    className="py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98] shrink-0">
                    <i className={`fa-solid ${busy ? 'fa-spinner fa-spin' : 'fa-images'}`}></i>
                    <span>Todo</span>
                </button>
            </div>

            {/* ============================================================== */}
            {/* MODAL DE GUARDADO PARA IPHONE / DISPOSITIVOS MÓVILES           */}
            {/* ============================================================== */}
            {exportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
                    <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-sm w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Cabecera del modal */}
                        <div className="p-3.5 border-b border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
                                <div>
                                    <h3 className="text-xs font-black text-white">
                                        {exportModal.isMultiple ? 'Carrusel Listo para Guardar' : 'Slide Lista para Guardar'}
                                    </h3>
                                    <p className="text-[10px] text-neutral-400 font-mono">
                                        {exportModal.isMultiple ? `${exportModal.items.length} imágenes HD` : exportModal.filename}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (exportModal.url) URL.revokeObjectURL(exportModal.url);
                                    if (exportModal.items) exportModal.items.forEach(it => URL.revokeObjectURL(it.url));
                                    setExportModal(null);
                                }}
                                className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Contenido con scroll */}
                        <div className="p-3.5 overflow-y-auto hide-scrollbar flex flex-col gap-3">
                            {/* Instrucción visual para iPhone */}
                            <div className="bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-cyan-800/60 rounded-xl p-2.5 text-xs text-cyan-200 flex items-start gap-2">
                                <i className="fa-brands fa-apple text-base text-cyan-300 shrink-0 mt-0.5"></i>
                                <div className="text-[11px] leading-tight text-neutral-300">
                                    <b className="text-white">Para guardar en tu iPhone:</b>
                                    <p className="mt-0.5 text-cyan-200/90">
                                        Toca <b>"Guardar en Fotos"</b> abajo o mantén presionada la imagen para seleccionar <i>"Guardar en Fotos"</i>.
                                    </p>
                                </div>
                            </div>

                            {!exportModal.isMultiple ? (
                                <div className="flex flex-col gap-3 items-center">
                                    {/* Previsualización de la imagen con soporte de toque prolongado */}
                                    <div className="relative rounded-xl overflow-hidden border border-neutral-700 shadow-xl bg-black max-h-[44vh] flex items-center justify-center">
                                        <img
                                            src={exportModal.url}
                                            alt="Slide generada"
                                            className="ios-save-image max-h-[44vh] w-auto object-contain"
                                        />
                                    </div>

                                    {/* Botones táctiles genuinos */}
                                    <div className="flex flex-col gap-1.5 w-full">
                                        {navigator.share && (
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const f = exportModal.file || new File([exportModal.blob], exportModal.filename, { type: 'image/png' });
                                                        await navigator.share({
                                                            files: [f],
                                                            title: exportModal.filename,
                                                            text: 'Guardar slide en Fotos',
                                                        });
                                                    } catch (e) {
                                                        if (e.name !== 'AbortError') console.error(e);
                                                    }
                                                }}
                                                className="w-full py-2.5 px-3 rounded-xl font-black text-xs bg-white text-black hover:bg-neutral-200 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]">
                                                <i className="fa-solid fa-arrow-up-from-bracket text-sm"></i>
                                                <span>Guardar en Fotos / Compartir</span>
                                            </button>
                                        )}

                                        <a
                                            href={exportModal.url}
                                            download={exportModal.filename}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-neutral-800 text-neutral-200 hover:bg-neutral-700 flex items-center justify-center gap-2 border border-neutral-700 active:scale-[0.98]">
                                            <i className="fa-solid fa-download"></i>
                                            <span>Descargar Archivo PNG</span>
                                        </a>

                                        <button
                                            id="btn-modal-open-postkit"
                                            onClick={() => {
                                                setExportModal(null);
                                                setPostKitOpen(true);
                                            }}
                                            className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-purple-950/70 text-purple-200 hover:bg-purple-900 flex items-center justify-center gap-2 border border-purple-700/50 active:scale-[0.98] transition-all">
                                            <i className="fa-solid fa-clipboard-list text-purple-300"></i>
                                            <span>Copiar Caption y Hashtags para Publicar</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2.5">
                                    <p className="text-xs text-neutral-400">Toca guardar en cada diapositiva para tu carrete:</p>
                                    <div className="flex flex-col gap-2">
                                        {exportModal.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2.5 p-2 bg-neutral-800/80 border border-neutral-700/60 rounded-xl">
                                                <img
                                                    src={item.url}
                                                    alt={`Slide ${idx + 1}`}
                                                    className="ios-save-image w-10 h-14 object-cover rounded-lg border border-neutral-700 shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-xs text-white truncate">Slide {idx + 1} de {exportModal.items.length}</div>
                                                    <div className="text-[10px] text-neutral-400 font-mono truncate">{item.filename}</div>
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            if (navigator.share) {
                                                                await navigator.share({
                                                                    files: [item.file],
                                                                    title: item.filename,
                                                                });
                                                            } else {
                                                                const a = document.createElement('a');
                                                                a.download = item.filename;
                                                                a.href = item.url;
                                                                a.click();
                                                            }
                                                        } catch (e) {
                                                            if (e.name !== 'AbortError') console.error(e);
                                                        }
                                                    }}
                                                    className="px-2.5 py-1.5 rounded-lg bg-white text-black font-black text-xs flex items-center gap-1 shrink-0 active:scale-95 shadow">
                                                    <i className="fa-solid fa-arrow-down-to-bracket text-[10px]"></i>
                                                    <span>Guardar</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* DRAWER / BOTTOM SHEET MÓVIL: SELECCIÓN DE LOS 8 CARRUSELES     */}
            {/* ============================================================== */}
            {drawerOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm">
                    {/* Fondo tap para cerrar */}
                    <div className="flex-1" onClick={() => setDrawerOpen(false)}></div>

                    {/* Contenedor del panel inferior */}
                    <div className="bg-neutral-900 border-t border-neutral-800 rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden z-50">
                        {/* Cabecera del drawer */}
                        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-black text-white flex items-center gap-2">
                                    <i className="fa-solid fa-layer-group text-neutral-400"></i> Seleccionar Carrusel
                                </h3>
                                <p className="text-[11px] text-neutral-500 font-mono">8 carruseles listos en 3 series</p>
                            </div>
                            <button
                                onClick={() => setDrawerOpen(false)}
                                className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-sm">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Lista de series y videos */}
                        <div className="p-4 overflow-y-auto hide-scrollbar flex flex-col gap-4">
                            {[...new Set(window.VIDEOS.map((v) => v.group))].map((grpName) => {
                                const list = window.VIDEOS.map((v, i) => ({ v, i })).filter((item) => item.v.group === grpName);
                                return (
                                    <div key={grpName}>
                                        <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                            <span>{grpName}</span>
                                            <span className="font-mono text-[9px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">{list.length} videos</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            {list.map(({ v, i }) => (
                                                <button
                                                    key={v.id}
                                                    id={`drawer-video-btn-${v.id}`}
                                                    onClick={() => {
                                                        setVIdx(i);
                                                        setSIdx(0);
                                                        setDrawerOpen(false);
                                                    }}
                                                    className={`w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-1 ${vIdx === i ? 'bg-white text-black border-white shadow-lg' : 'bg-neutral-800/90 text-neutral-200 border-neutral-700/60 hover:bg-neutral-700'}`}>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex items-center gap-2 truncate">
                                                            <span style={{ width: 8, height: 8, borderRadius: 2, background: window.THEMES[v.theme].accent, flexShrink: 0 }} />
                                                            <span className="font-bold text-xs truncate">{v.title}</span>
                                                        </div>
                                                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${vIdx === i ? 'bg-neutral-200 text-neutral-800' : 'bg-neutral-700 text-neutral-300'}`}>
                                                            {v.slides.length} slides
                                                        </span>
                                                    </div>
                                                    <div className={`text-[11px] truncate ${vIdx === i ? 'text-neutral-700' : 'text-neutral-400'}`}>
                                                        {v.subtitle}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: KIT DE PUBLICACIÓN (CAPTIONS, HOOKS Y HASHTAGS)         */}
            {/* ============================================================== */}
            {postKitOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
                    <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Cabecera del modal */}
                        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70 shrink-0">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                                    <i className="fa-solid fa-clipboard-list text-sm"></i>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-black text-white truncate flex items-center gap-2">
                                        <span>Kit de Publicación para Redes</span>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-700/50">
                                            {format.toUpperCase()}
                                        </span>
                                    </h3>
                                    <p className="text-[11px] text-neutral-400 font-mono truncate">
                                        {video.title} · {video.subtitle}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setPostKitOpen(false)}
                                className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-sm shrink-0 active:scale-95 transition-all">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Barra horizontal de selección de los 8 carruseles */}
                        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar px-3 py-2 bg-neutral-950/90 border-b border-neutral-800/80 shrink-0">
                            {window.VIDEOS.map((v, i) => (
                                <button
                                    key={v.id}
                                    onClick={() => { setVIdx(i); setSIdx(0); }}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all flex items-center gap-1.5 ${vIdx === i ? 'bg-white text-black shadow' : 'bg-neutral-800/80 text-neutral-400 hover:text-white'}`}>
                                    <span style={{ width: 6, height: 6, borderRadius: 2, background: window.THEMES[v.theme].accent, flexShrink: 0 }} />
                                    <span>{v.title}</span>
                                </button>
                            ))}
                        </div>

                        {/* Contenido con scroll */}
                        <div className="p-4 overflow-y-auto hide-scrollbar flex flex-col gap-3.5">
                            {video.post ? (
                                <>
                                    {/* Botones de acción rápida: Copiar Todo vs Copiar Hashtags */}
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                            id="btn-copy-full-post"
                                            onClick={() => handleCopy('all', `${video.post.caption}\n\n${video.post.hashtags.join(' ')}`)}
                                            className={`flex-1 py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${copiedKey === 'all' ? 'bg-emerald-500 text-black shadow-emerald-500/20' : 'bg-white text-black hover:bg-neutral-200'}`}>
                                            <i className={`fa-solid ${copiedKey === 'all' ? 'fa-circle-check text-sm' : 'fa-copy text-sm'}`}></i>
                                            <span>{copiedKey === 'all' ? '✓ ¡Caption Completo Copiado!' : 'Copiar Caption Completo + Hashtags'}</span>
                                        </button>
                                        <button
                                            id="btn-copy-hashtags"
                                            onClick={() => handleCopy('tags', video.post.hashtags.join(' '))}
                                            className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border active:scale-[0.98] ${copiedKey === 'tags' ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-neutral-800 text-neutral-200 border-neutral-700 hover:bg-neutral-700'}`}>
                                            <i className={`fa-solid ${copiedKey === 'tags' ? 'fa-circle-check' : 'fa-hashtag'}`}></i>
                                            <span>{copiedKey === 'tags' ? '✓ ¡Hashtags Copiados!' : 'Copiar sólo Hashtags'}</span>
                                        </button>
                                    </div>

                                    {/* Gancho / Hook destacado */}
                                    <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2">
                                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5 text-amber-400">
                                                <i className="fa-solid fa-bolt text-xs"></i> Gancho de Primera Línea (Hook)
                                            </span>
                                            <button
                                                onClick={() => handleCopy('hook', video.post.hook)}
                                                className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all flex items-center gap-1 active:scale-95 ${copiedKey === 'hook' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-neutral-400 hover:text-white bg-neutral-800/60'}`}>
                                                <i className={`fa-solid ${copiedKey === 'hook' ? 'fa-check' : 'fa-copy'}`}></i>
                                                <span>{copiedKey === 'hook' ? 'Copiado' : 'Copiar'}</span>
                                            </button>
                                        </div>
                                        <div className="text-sm font-semibold text-white bg-neutral-900/90 p-3 rounded-lg border border-neutral-800/80 italic">
                                            "{video.post.hook}"
                                        </div>
                                    </div>

                                    {/* Texto completo del post (Caption) */}
                                    <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2">
                                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5 text-cyan-400">
                                                <i className="fa-solid fa-align-left text-xs"></i> Descripción Completa (Caption)
                                            </span>
                                            <button
                                                onClick={() => handleCopy('caption_only', video.post.caption)}
                                                className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all flex items-center gap-1 active:scale-95 ${copiedKey === 'caption_only' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-neutral-400 hover:text-white bg-neutral-800/60'}`}>
                                                <i className={`fa-solid ${copiedKey === 'caption_only' ? 'fa-check' : 'fa-copy'}`}></i>
                                                <span>{copiedKey === 'caption_only' ? 'Copiado' : 'Copiar Texto'}</span>
                                            </button>
                                        </div>
                                        <div className="text-xs text-neutral-200 whitespace-pre-line leading-relaxed font-sans bg-neutral-900/90 p-3.5 rounded-lg border border-neutral-800/80 max-h-56 overflow-y-auto hide-scrollbar select-text">
                                            {video.post.caption}
                                        </div>
                                    </div>

                                    {/* Hashtags con píldoras interactivas */}
                                    <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2">
                                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5 text-purple-400">
                                                <i className="fa-solid fa-tags text-xs"></i> Hashtags Estratégicos ({video.post.hashtags.length})
                                            </span>
                                            <span className="text-[10px] text-neutral-500 font-mono">Toca cualquiera para copiarlo</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {video.post.hashtags.map((tag) => (
                                                <button
                                                    key={tag}
                                                    onClick={() => handleCopy(tag, tag)}
                                                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all border ${copiedKey === tag ? 'bg-emerald-500 text-black border-emerald-400 font-bold' : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-purple-500/60 hover:text-white active:scale-95'}`}>
                                                    {copiedKey === tag ? `✓ ${tag}` : tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Estrategia de publicación: Horario, Audio y Formato */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3 flex items-start gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-xs">
                                                <i className="fa-regular fa-clock"></i>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Mejor horario</div>
                                                <div className="text-xs font-mono font-bold text-white mt-0.5">{video.post.bestTime}</div>
                                                <div className="text-[10.5px] text-neutral-500 leading-tight mt-0.5">Mayor actividad de tu nicho</div>
                                            </div>
                                        </div>

                                        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3 flex items-start gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs">
                                                <i className="fa-solid fa-music"></i>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Audio / Sonido sugerido</div>
                                                <div className="text-xs font-bold text-white mt-0.5">{video.post.sound}</div>
                                                <div className="text-[10.5px] text-neutral-500 leading-tight mt-0.5">Volumen al 15% de fondo</div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-neutral-400 p-4 text-center">No hay kit configurado para este carrusel.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Montaje principal en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
