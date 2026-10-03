/**
 * =====================================================================
 * SANTI.DEV · APLICACIÓN PRINCIPAL DEL EDITOR (REACT)
 * =====================================================================
 * Orquestador principal:
 *   - Manejo de estado: video activo, slide activa, exportación en curso.
 *   - Agrupación por series en la barra lateral con contadores.
 *   - Navegación por teclado (← / →).
 *   - Exportación PNG nítida a 1080x1920 (TikTok format).
 *   - Soporte para parámetros de URL (?v=...&s=...&solo=1).
 * =====================================================================
 */

const URL_PARAMS = new URLSearchParams(window.location.search);

const initialVideo = (() => {
    const v = URL_PARAMS.get('v');
    if (!v) return 0;
    const byId = window.VIDEOS.findIndex((x) => x.id === v);
    if (byId >= 0) return byId;
    const n = parseInt(v, 10) - 1;
    return n >= 0 && n < window.VIDEOS.length ? n : 0;
})();

const initialSlide = (() => {
    const n = parseInt(URL_PARAMS.get('s') || '1', 10) - 1;
    return Math.max(0, Math.min(n, window.VIDEOS[initialVideo].slides.length - 1));
})();

const initialFormat = (() => {
    const f = (URL_PARAMS.get('fmt') || URL_PARAMS.get('format') || '').toLowerCase();
    if (f === 'instagram' || f === 'ig' || f === '4:5') return 'instagram';
    return 'tiktok';
})();

const SOLO = URL_PARAMS.get('solo') === '1';

const App = () => {
    const [vIdx, setVIdx] = React.useState(initialVideo);
    const [sIdx, setSIdx] = React.useState(initialSlide);
    const [format, setFormat] = React.useState(initialFormat);
    const [busy, setBusy] = React.useState(false);
    const [progressText, setProgressText] = React.useState('');

    const video = window.VIDEOS[vIdx];
    const slide = video.slides[sIdx];
    const theme = window.THEMES[video.theme];
    const fmt = window.FORMATS[format] || window.FORMATS.tiktok;
    const isFileProtocol = window.location.protocol === 'file:';

    /** Navegación por teclado (flechas izquierda/derecha) */
    React.useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') setSIdx((i) => Math.min(i + 1, video.slides.length - 1));
            if (e.key === 'ArrowLeft') setSIdx((i) => Math.max(i - 1, 0));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [video]);

    /** Exporta la slide actual a alta resolución (1080x1920 para TikTok o 1080x1350 para Instagram) */
    const capture = async (filename) => {
        await document.fonts.ready;
        const el = document.getElementById('capture-slide');
        const isIg = format === 'instagram';
        const targetW = 1080;
        const targetH = isIg ? 1350 : 1920;
        const elW = 405;
        const elH = isIg ? 506.25 : 720;
        const scale = targetW / elW;

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

    /** Exporta todas las diapositivas del video secuencialmente en alta definición */
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

    // Modo solo: renderiza únicamente la slide pura (ideal para screenshots y grabaciones)
    if (SOLO) return <window.Slide video={video} d={slide} index={sIdx} format={format} />;

    return (
        <div className="flex w-full h-full">
            {/* -------- Barra lateral -------- */}
            <aside className="w-[325px] bg-neutral-900 p-5 flex flex-col border-r border-neutral-800 h-full overflow-y-auto hide-scrollbar">
                <div className="flex items-center justify-between mb-1">
                    <h1 className="text-base font-black text-white flex items-center gap-2">
                        <i className="fa-solid fa-layer-group" style={{ color: theme.accent }}></i> Santi.Dev Creator
                    </h1>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold border border-neutral-700">v3.3</span>
                </div>
                <p className="text-[11px] text-neutral-500 font-mono mb-4">Generador de carruseles de alta calidad</p>

                {/* Selector de formato: TikTok (9:16) vs Instagram (4:5) */}
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

                {/* Agrupación por series: se calcula desde VIDEOS */}
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

            {/* -------- Vista previa centrada -------- */}
            <main className="flex-1 bg-[#0a0a0a] flex flex-col items-center p-6 overflow-y-auto hide-scrollbar gap-3" style={{ justifyContent: 'safe center' }}>
                {/* Barra de control superior de formato rápido */}
                <div className="w-[405px] flex items-center justify-between px-1 text-neutral-400 text-xs">
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className={`w-2 h-2 rounded-full ${format === 'instagram' ? 'bg-rose-500' : 'bg-cyan-400'}`}></span>
                        <span className="font-bold text-white uppercase">{format}</span>
                        <span className="text-neutral-500">· {format === 'instagram' ? '1080×1350 (4:5)' : '1080×1920 (9:16)'}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[11px] text-neutral-400">
                        <span>Slide {sIdx + 1}/{video.slides.length}</span>
                    </div>
                </div>

                {/* Slide renderizada */}
                <window.Slide video={video} d={slide} index={sIdx} format={format} />

                {/* Metadatos y notas de producción */}
                <div className="w-[405px] text-[11px] font-mono text-neutral-500 flex justify-between px-1">
                    <span>{slide.type} · {slide.layout} · {slide.tone || 'white'}</span>
                    <span>← → para navegar</span>
                </div>
                {slide.prod && (
                    <div className="w-[405px] rounded-lg p-2.5 text-[11.5px] leading-snug bg-neutral-900 border border-neutral-800 text-neutral-300">
                        <b className="text-white">Nota de producción:</b> {slide.prod}
                    </div>
                )}
            </main>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
