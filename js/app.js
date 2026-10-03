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

const SOLO = URL_PARAMS.get('solo') === '1';

const App = () => {
    const [vIdx, setVIdx] = React.useState(initialVideo);
    const [sIdx, setSIdx] = React.useState(initialSlide);
    const [busy, setBusy] = React.useState(false);

    const video = window.VIDEOS[vIdx];
    const slide = video.slides[sIdx];
    const theme = window.THEMES[video.theme];
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

    /** Exporta la slide actual a 1080x1920 */
    const capture = async (filename) => {
        await document.fonts.ready;
        const el = document.getElementById('capture-slide');
        const canvas = await html2canvas(el, {
            scale: window.EXPORT.outW / window.EXPORT.w,
            backgroundColor: '#0c0c0c',
            useCORS: true,
            logging: false,
        });
        const a = document.createElement('a');
        a.download = filename;
        a.href = canvas.toDataURL('image/png');
        a.click();
    };

    const downloadOne = async () => {
        setBusy(true);
        try {
            await capture(`${video.slug}_${window.pad(sIdx + 1)}.png`);
        } catch (err) {
            console.error(err);
            alert('No se pudo exportar. Asegúrate de ejecutar con servidor local (ej: npx serve .).');
        } finally {
            setBusy(false);
        }
    };

    /** Exporta todas las diapositivas del video secuencialmente */
    const downloadAll = async () => {
        setBusy(true);
        try {
            for (let i = 0; i < video.slides.length; i++) {
                setSIdx(i);
                await window.sleep(450);
                await capture(`${video.slug}_${window.pad(i + 1)}.png`);
            }
        } catch (err) {
            console.error(err);
            alert('Error exportando carrusel. Revisa la consola para más detalles.');
        } finally {
            setBusy(false);
        }
    };

    // Modo solo: renderiza únicamente la slide pura (ideal para screenshots y grabaciones)
    if (SOLO) return <window.Slide video={video} d={slide} index={sIdx} />;

    return (
        <div className="flex w-full h-full">
            {/* -------- Barra lateral -------- */}
            <aside className="w-[310px] bg-neutral-900 p-6 flex flex-col border-r border-neutral-800 h-full overflow-y-auto hide-scrollbar">
                <h1 className="text-lg font-black mb-1 text-white flex items-center gap-2">
                    <i className="fa-solid fa-layer-group" style={{ color: theme.accent }}></i> Santi.Dev Creator
                </h1>
                <p className="text-[11px] text-neutral-500 font-mono mb-6">1080 × 1920 · TikTok carrusel</p>

                {isFileProtocol && (
                    <div className="mb-5 rounded-lg p-3 text-[11px] leading-snug bg-neutral-800 text-neutral-300 border border-neutral-700">
                        <b className="text-white">Aviso:</b> estás en <span className="font-mono">file://</span>. Para exportar slides con imágenes abre con servidor local: <span className="font-mono text-white">npx serve .</span>
                    </div>
                )}

                {/* Agrupación por series: se calcula desde VIDEOS (orden de aparición) */}
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

                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 mt-4 block">Slides</label>
                <div className="flex flex-col gap-1.5 mb-5">
                    {video.slides.map((s, idx) => (
                        <button key={idx} id={`slide-btn-${idx + 1}`} onClick={() => setSIdx(idx)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-2.5 ${sIdx === idx ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}>
                            <span className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-mono shrink-0"
                                style={{ background: sIdx === idx ? theme.accent : '#333', color: sIdx === idx ? theme.ink : '#bbb' }}>{idx + 1}</span>
                            <span className="truncate flex-1">{(s.title || s.quote || s.number).replace(/\*/g, '')}</span>
                            <span className="text-[9px] font-mono opacity-60">{s.type}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-auto flex flex-col gap-2">
                    <button id="download-one" onClick={downloadOne} disabled={busy}
                        className={`w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${busy ? 'bg-neutral-600 cursor-not-allowed' : 'bg-white text-black hover:bg-neutral-200'}`}>
                        <i className={`fa-solid ${busy ? 'fa-spinner fa-spin' : 'fa-download'}`}></i> Descargar slide
                    </button>
                    <button id="download-all" onClick={downloadAll} disabled={busy}
                        className="w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all border border-neutral-600 text-white hover:bg-neutral-800">
                        <i className="fa-solid fa-images"></i> Descargar video completo
                    </button>
                </div>
            </aside>

            {/* -------- Vista previa -------- */}
            <main className="flex-1 bg-[#111] flex flex-col items-center p-8 overflow-y-auto hide-scrollbar gap-4" style={{ justifyContent: 'safe center' }}>
                <window.Slide video={video} d={slide} index={sIdx} />
                <div className="w-[405px] text-[11px] font-mono text-neutral-500 flex justify-between">
                    <span>{slide.type} · {slide.layout} · {slide.tone || 'white'}</span>
                    <span>← → para navegar</span>
                </div>
                {slide.prod && (
                    <div className="w-[405px] rounded-lg p-3 text-[12px] leading-snug bg-neutral-900 border border-neutral-800 text-neutral-300">
                        <b className="text-white">Nota de producción:</b> {slide.prod}
                    </div>
                )}
            </main>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
