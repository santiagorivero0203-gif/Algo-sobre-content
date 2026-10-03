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
 *   - Modo Escritorio (MD+):
 *       * Barra lateral completa con agrupación por series y contadores.
 *       * Navegación por teclado (← / →).
 *   - Motor de exportación dual:
 *       * TikTok / Reels / Shorts: 1080x1920 (9:16).
 *       * Instagram Feed: 1080x1350 (4:5).
 *       * Desactiva temporalmente el escalado CSS para renderizado 100% nítido
 *         en html2canvas sin aberraciones de subpíxel.
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

const App = () => {
    // Estado de selección de video y slide activa
    const [vIdx, setVIdx] = React.useState(initialVideo);
    const [sIdx, setSIdx] = React.useState(initialSlide);
    const [format, setFormat] = React.useState(initialFormat);
    const [busy, setBusy] = React.useState(false);
    const [progressText, setProgressText] = React.useState('');

    // Estado del drawer/menú móvil de selección de carruseles (?drawer=1 para test o apertura directa)
    const [drawerOpen, setDrawerOpen] = React.useState(URL_PARAMS.get('drawer') === '1');

    // Estado de dimensiones de viewport para escalado dinámico en pantallas de smartphones
    const [viewportW, setViewportW] = React.useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    const video = window.VIDEOS[vIdx];
    const slide = video.slides[sIdx];
    const theme = window.THEMES[video.theme];
    const fmt = window.FORMATS[format] || window.FORMATS.tiktok;
    const isFileProtocol = window.location.protocol === 'file:';

    // Detección de dispositivo móvil (< 768px)
    const isMobile = viewportW < 768;

    // Escucha el redimensionamiento de pantalla para recalcular el factor de escala
    React.useEffect(() => {
        const onResize = () => setViewportW(window.innerWidth);
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

    // Soporte para gestos táctiles (Swipe swipe izquierda / derecha) en teléfonos
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

    // Cálculo del factor de escala para que la diapositiva encaje con 24px de margen en móvil
    const mobileScale = isMobile
        ? Math.min(1, Math.max(0.6, (viewportW - 24) / baseW))
        : 1;

    const scaledW = Math.round(baseW * mobileScale);
    const scaledH = Math.round(baseH * mobileScale);

    /**
     * Exporta la slide actual a alta resolución (1080x1920 TikTok o 1080x1350 Instagram).
     * Restaura temporalmente el transform y overflow a sus dimensiones naturales (405x720 o 405x506.25)
     * para que html2canvas genere píxeles 100% nítidos sin recorte por ancestros.
     */
    const capture = async (filename) => {
        await document.fonts.ready;
        const el = document.getElementById('capture-slide');
        const outer = document.getElementById('slide-scaler-outer');
        const inner = document.getElementById('slide-scaler-inner');

        const prevInnerTransform = inner ? inner.style.transform : '';
        const prevOuterOverflow = outer ? outer.style.overflow : '';
        const prevOuterWidth = outer ? outer.style.width : '';
        const prevOuterHeight = outer ? outer.style.height : '';

        const isIg = format === 'instagram';
        const targetW = 1080;
        const targetH = isIg ? 1350 : 1920;
        const elW = 405;
        const elH = isIg ? 506.25 : 720;
        const scale = targetW / elW;

        // Desactiva el escalado y desbordamiento durante la captura para evitar recortes o distorsión
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
                backgroundColor: '#0c0c0c',
                useCORS: true,
                logging: false,
                imageTimeout: 0,
            });

            const a = document.createElement('a');
            a.download = filename;
            a.href = canvas.toDataURL('image/png', 1.0);
            a.click();
        } finally {
            // Restaura el escalado y dimensiones para la visualización en el teléfono
            if (inner) inner.style.transform = prevInnerTransform;
            if (outer) {
                outer.style.overflow = prevOuterOverflow;
                outer.style.width = prevOuterWidth;
                outer.style.height = prevOuterHeight;
            }
        }
    };

    const downloadOne = async () => {
        setBusy(true);
        setProgressText('Exportando...');
        try {
            await capture(`${video.slug}_${format}_${window.pad(sIdx + 1)}.png`);
        } catch (err) {
            console.error(err);
            alert('No se pudo exportar. Asegúrate de ejecutar con servidor local (ej: npx serve .).');
        } finally {
            setBusy(false);
            setProgressText('');
        }
    };

    /** Exporta todas las diapositivas del carrusel en serie */
    const downloadAll = async () => {
        setBusy(true);
        try {
            for (let i = 0; i < video.slides.length; i++) {
                setSIdx(i);
                setProgressText(`Exportando ${i + 1}/${video.slides.length}...`);
                await window.sleep(450);
                await capture(`${video.slug}_${format}_${window.pad(i + 1)}.png`);
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

            {/* Sub-barra móvil: Selector de carrusel activo y píldoras horizontales de slides */}
            <div className="md:hidden bg-neutral-900/80 border-b border-neutral-800/80 px-3 py-2 flex flex-col gap-2 w-full max-w-[100vw]">
                <div
                    onClick={() => setDrawerOpen(true)}
                    className="flex items-center justify-between cursor-pointer active:opacity-80 transition-opacity">
                    <div className="flex items-center gap-2 truncate">
                        <span style={{ width: 7, height: 7, borderRadius: 2, background: theme.accent, flexShrink: 0 }} />
                        <span className="text-xs font-bold text-neutral-100 truncate">{video.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1 shrink-0 ml-2">
                        Cambiar <i className="fa-solid fa-chevron-down text-[8px]"></i>
                    </span>
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
            <aside className="hidden md:flex w-[325px] bg-neutral-900 p-5 flex-col border-r border-neutral-800 h-full overflow-y-auto hide-scrollbar shrink-0">
                <div className="flex items-center justify-between mb-1">
                    <h1 className="text-base font-black text-white flex items-center gap-2">
                        <i className="fa-solid fa-layer-group" style={{ color: theme.accent }}></i> Santi.Dev Creator
                    </h1>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold border border-neutral-700">v3.4</span>
                </div>
                <p className="text-[11px] text-neutral-500 font-mono mb-4">Generador de carruseles de alta calidad</p>

                {/* Selector de formato para escritorio */}
                <div className="mb-5">
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
                        <div key={grpName} className="mb-4">
                            <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                <span>{grpName}</span>
                                <span className="font-mono text-[9px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">{list.length} videos</span>
                            </div>
                            {list.map(({ v, i }) => (
                                <button key={v.id} id={`video-btn-${v.id}`}
                                    onClick={() => { setVIdx(i); setSIdx(0); }}
                                    className={`w-full text-left p-2.5 rounded-lg mb-1.5 transition-all ${vIdx === i ? 'bg-white text-black font-semibold' : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'}`}>
                                    <div className="flex items-center gap-2 text-xs font-bold truncate">
                                        <span style={{ width: 8, height: 8, borderRadius: 2, background: window.THEMES[v.theme].accent, flexShrink: 0 }} />
                                        <span className="truncate">{v.title}</span>
                                    </div>
                                    <div className={`text-[10.5px] mt-0.5 truncate ${vIdx === i ? 'text-neutral-600' : 'text-neutral-400'}`}>{v.subtitle}</div>
                                </button>
                            ))}
                        </div>
                    );
                })}

                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 mt-2 block">Slides</label>
                <div className="flex flex-col gap-1.5 mb-5">
                    {video.slides.map((s, idx) => (
                        <button key={idx} id={`slide-btn-${idx + 1}`} onClick={() => setSIdx(idx)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-[12.5px] font-semibold transition-all flex items-center gap-2.5 ${sIdx === idx ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}>
                            <span className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-mono shrink-0"
                                style={{ background: sIdx === idx ? theme.accent : '#333', color: sIdx === idx ? theme.ink : '#bbb' }}>{idx + 1}</span>
                            <span className="truncate flex-1">{(s.title || s.quote || s.number || '').replace(/\*/g, '')}</span>
                            <span className="text-[9px] font-mono opacity-60">{s.type}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-neutral-800">
                    <button id="download-one" onClick={downloadOne} disabled={busy}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${busy ? 'bg-neutral-600 cursor-not-allowed text-neutral-300' : 'bg-white text-black hover:bg-neutral-200 shadow'}`}>
                        <i className={`fa-solid ${busy ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
                        <span>{busy ? progressText : `Descargar slide (${format === 'instagram' ? '1080×1350' : '1080×1920'})`}</span>
                    </button>
                    <button id="download-all" onClick={downloadAll} disabled={busy}
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
                className="flex-1 bg-[#0a0a0a] flex flex-col items-center p-3 md:p-6 overflow-y-auto overflow-x-hidden hide-scrollbar gap-3 w-full max-w-[100vw]"
                style={{ justifyContent: 'safe center' }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}>

                {/* Barra de estado superior de la slide */}
                <div
                    className="flex items-center justify-between text-neutral-400 text-xs px-1 w-full"
                    style={{ maxWidth: scaledW }}>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className={`w-2 h-2 rounded-full ${format === 'instagram' ? 'bg-rose-500' : 'bg-cyan-400'}`}></span>
                        <span className="font-bold text-white uppercase">{format}</span>
                        <span className="text-neutral-500">· {format === 'instagram' ? '1080×1350' : '1080×1920'}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[11px] text-neutral-400">
                        <span className="bg-neutral-800/80 px-2 py-0.5 rounded text-neutral-300">Slide {sIdx + 1}/{video.slides.length}</span>
                    </div>
                </div>

                {/* Contenedor con escalado responsivo proporcional para teléfonos (transformOrigin: top left) */}
                <div
                    id="slide-scaler-outer"
                    className="slide-scaler-outer mx-auto"
                    style={{
                        width: scaledW,
                        height: scaledH,
                    }}>
                    <div
                        id="slide-scaler-inner"
                        className="slide-scaler-inner"
                        style={{
                            transform: `scale(${mobileScale})`,
                            transformOrigin: 'top left',
                            width: baseW,
                            height: baseH,
                        }}>
                        <window.Slide video={video} d={slide} index={sIdx} format={format} />
                    </div>
                </div>

                {/* Controles de navegación táctil para móvil (< 768px) */}
                <div
                    className="md:hidden flex items-center justify-between gap-2 w-full mt-1"
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
                    className="text-[11px] font-mono text-neutral-500 flex justify-between px-1 w-full"
                    style={{ maxWidth: scaledW }}>
                    <span>{slide.type} · {slide.layout} · {slide.tone || 'white'}</span>
                    <span className="hidden md:inline">← → para navegar</span>
                    <span className="md:hidden text-neutral-600">Desliza el dedo ↔</span>
                </div>

                {slide.prod && (
                    <div
                        className="rounded-xl p-3 text-[11.5px] leading-snug bg-neutral-900/90 border border-neutral-800/80 text-neutral-300 w-full"
                        style={{ maxWidth: scaledW }}>
                        <div className="flex items-center gap-1.5 text-neutral-400 font-bold mb-1 text-[11px] uppercase tracking-wider">
                            <i className="fa-solid fa-wand-magic-sparkles text-[10px]" style={{ color: theme.accent }}></i>
                            <span>Nota creativa:</span>
                        </div>
                        <p>{slide.prod}</p>
                    </div>
                )}

                {/* Espacio de reserva para que el contenido no quede tapado por la botonera fija inferior en móvil */}
                <div className="md:hidden h-24 w-full"></div>
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
        </div>
    );
};

// Montaje principal en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
