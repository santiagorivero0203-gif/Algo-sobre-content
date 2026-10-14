/**
 * =====================================================================
 * SANTI.DEV · COMPONENTES DE MODALES Y DIÁLOGOS DE LA APLICACIÓN
 * =====================================================================
 * Módulo independiente que encapsula las capas de diálogo y overlays:
 *   - ExportModal: Guardado para iPhone (Fotos / Web Share), ZIP y PNG HD.
 *   - MobileDrawer: Bottom sheet táctil para seleccionar entre carruseles y marcas.
 *   - PostKitModal: Visualización y copiado con 1 clic de captions y hashtags.
 *   - GitHubSyncModal: GitOps directo para commits en 'main' y despliegue Vercel.
 * =====================================================================
 */

/**
 * Modal de exportación y guardado optimizado para iOS / Android / Desktop
 */
window.ExportModal = ({ exportModal, setExportModal, setPostKitOpen, isMobileDevice }) => {
    if (!exportModal) return null;

    // Estado local para retroalimentación visual durante descargas secuenciales
    const [downloadingBatch, setDownloadingBatch] = React.useState(false);
    const [batchProgress, setBatchProgress] = React.useState('');

    // Permite compartir o guardar todas las diapositivas en fotos con 1 clic en iPhone / iPad
    const handleShareAll = async () => {
        try {
            const allFiles = exportModal.items.map(it => it.file || new File([it.blob], it.filename, { type: 'image/png' }));
            if (navigator.canShare && navigator.canShare({ files: allFiles })) {
                await navigator.share({
                    files: allFiles,
                    title: exportModal.filename || 'Carrusel Completo',
                    text: 'Guardar diapositivas en Fotos',
                });
                return;
            } else if (navigator.share) {
                await navigator.share({
                    files: allFiles,
                    title: exportModal.filename || 'Carrusel Completo',
                });
                return;
            }
        } catch (err) {
            if (err.name === 'AbortError') return;
            console.warn('[ExportModal] navigator.share bulk falló, guiando al usuario:', err);
            alert('Para guardar en tu iPhone, toca "Guardar" en cada diapositiva de la lista o mantén presionada la imagen para enviarla a tu carrete.');
        }
    };

    // Descarga secuencial con ritmo controlado para evitar bloqueos del navegador
    const handleDownloadAllSequential = async () => {
        if (downloadingBatch) return;
        setDownloadingBatch(true);
        try {
            for (let i = 0; i < exportModal.items.length; i++) {
                const it = exportModal.items[i];
                setBatchProgress(`Descargando ${i + 1} de ${exportModal.items.length}...`);
                const a = document.createElement('a');
                a.download = it.filename;
                a.href = it.url;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                // Margen de 800ms para que Chrome/Safari no bloquee descargas sucesivas
                if (window.sleep) await window.sleep(800);
            }
            setBatchProgress('¡Todas descargadas!');
            setTimeout(() => {
                setDownloadingBatch(false);
                setBatchProgress('');
            }, 2000);
        } catch (e) {
            console.error('[DownloadAllSequential Error]:', e);
            setDownloadingBatch(false);
            setBatchProgress('');
        }
    };

    // Guardar una diapositiva individual con resiliencia ante rechazos de Safari
    const handleSaveSingleItem = async (item, e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        try {
            const f = item.file || new File([item.blob], item.filename, { type: 'image/png' });
            if (isMobileDevice && navigator.canShare && navigator.canShare({ files: [f] })) {
                await navigator.share({
                    files: [f],
                    title: item.filename,
                });
                return;
            }
            if (isMobileDevice && navigator.share) {
                await navigator.share({
                    files: [f],
                    title: item.filename,
                });
                return;
            }
        } catch (err) {
            if (err.name === 'AbortError') return;
            console.warn('[SaveSingleItem] Web Share falló, recurriendo a descarga/apertura:', err);
        }

        // Respaldo inmediato si Web Share no está disponible o falla:
        if (isMobileDevice) {
            // Abrir imagen en pestaña limpia donde Safari permite toque largo 'Guardar en Fotos'
            const win = window.open(item.url, '_blank');
            if (!win) window.location.href = item.url;
        } else {
            const a = document.createElement('a');
            a.download = item.filename;
            a.href = item.url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
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
                            const urlsToRevoke = [];
                            if (exportModal.url) urlsToRevoke.push(exportModal.url);
                            if (exportModal.zipUrl) urlsToRevoke.push(exportModal.zipUrl);
                            if (exportModal.items) exportModal.items.forEach(it => urlsToRevoke.push(it.url));
                            setTimeout(() => {
                                urlsToRevoke.forEach(u => {
                                    try { URL.revokeObjectURL(u); } catch (_) {}
                                });
                            }, 60000);
                            setExportModal(null);
                        }}
                        className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Contenido con scroll */}
                <div className="p-3.5 overflow-y-auto hide-scrollbar flex flex-col gap-3">
                    {/* Botón para volver al listado del carrusel si se vino de una vista múltiple */}
                    {!exportModal.isMultiple && exportModal.prevItems && (
                        <button
                            onClick={() => {
                                setExportModal({
                                    isMultiple: true,
                                    items: exportModal.prevItems,
                                    zipBlob: exportModal.zipBlob,
                                    zipUrl: exportModal.zipUrl,
                                    filename: 'carrusel_completo.zip',
                                });
                            }}
                            className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-neutral-800 text-cyan-300 hover:bg-neutral-700 flex items-center justify-center gap-2 border border-neutral-700 active:scale-[0.98] transition-all">
                            <i className="fa-solid fa-arrow-left"></i>
                            <span>Volver a la lista de slides ({exportModal.prevItems.length})</span>
                        </button>
                    )}

                    {/* Instrucción visual para iPhone */}
                    <div className="bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-cyan-800/60 rounded-xl p-2.5 text-xs text-cyan-200 flex items-start gap-2">
                        <i className="fa-brands fa-apple text-base text-cyan-300 shrink-0 mt-0.5"></i>
                        <div className="text-[11px] leading-tight text-neutral-300">
                            <b className="text-white">Para guardar en tu iPhone:</b>
                            <p className="mt-0.5 text-cyan-200/90">
                                Toca <b>"Guardar en Fotos"</b> o mantén presionada la imagen para seleccionar <i>"Guardar en Fotos"</i>.
                            </p>
                        </div>
                    </div>

                    {/* Aviso si alguna diapositiva requirió atención */}
                    {exportModal.isMultiple && exportModal.failedSlides && exportModal.failedSlides.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-600/50 text-amber-200 text-[11px] leading-snug">
                            <b>Nota:</b> Las slides {exportModal.failedSlides.join(', ')} tardaron más en procesarse. Puedes descargarlas individualmente tocando su número en la barra inferior.
                        </div>
                    )}

                    {!exportModal.isMultiple ? (
                        <div className="flex flex-col gap-3 items-center">
                            {/* Previsualización de la imagen con soporte de toque prolongado */}
                            <div className="relative rounded-xl overflow-hidden border border-neutral-700 shadow-xl bg-black max-h-[44vh] flex items-center justify-center">
                                <img
                                    src={exportModal.url}
                                    alt="Slide generada"
                                    className="ios-save-image max-h-[44vh] w-auto object-contain cursor-pointer"
                                    onClick={() => {
                                        if (isMobileDevice) {
                                            const win = window.open(exportModal.url, '_blank');
                                            if (!win) window.location.href = exportModal.url;
                                        }
                                    }}
                                />
                            </div>

                            {/* Botones de acción */}
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
                                                if (e.name !== 'AbortError') {
                                                    console.warn('Share falló, abriendo imagen:', e);
                                                    if (isMobileDevice) {
                                                        const win = window.open(exportModal.url, '_blank');
                                                        if (!win) window.location.href = exportModal.url;
                                                    }
                                                }
                                            }
                                        }}
                                        className="w-full py-2.5 px-3 rounded-xl font-black text-xs bg-white text-black hover:bg-neutral-200 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]">
                                        <i className="fa-solid fa-arrow-up-from-bracket text-sm"></i>
                                        <span>Guardar en Fotos / Compartir</span>
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        if (isMobileDevice) {
                                            const win = window.open(exportModal.url, '_blank');
                                            if (!win) window.location.href = exportModal.url;
                                        } else {
                                            const a = document.createElement('a');
                                            a.download = exportModal.filename;
                                            a.href = exportModal.url;
                                            document.body.appendChild(a);
                                            a.click();
                                            document.body.removeChild(a);
                                        }
                                    }}
                                    className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-neutral-800 text-neutral-200 hover:bg-neutral-700 flex items-center justify-center gap-2 border border-neutral-700 active:scale-[0.98]">
                                    <i className="fa-solid fa-download"></i>
                                    <span>Descargar Archivo PNG</span>
                                </button>

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
                            {/* 1. Botón nativo de guardado masivo en iPhone si está soportado */}
                            {isMobileDevice && navigator.share && (
                                <button
                                    onClick={handleShareAll}
                                    className="w-full py-2.5 px-3 rounded-xl font-black text-xs bg-white text-black hover:bg-neutral-200 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all">
                                    <i className="fa-solid fa-arrow-up-from-bracket text-sm text-cyan-700"></i>
                                    <span>Guardar Todas en Fotos (iPhone)</span>
                                </button>
                            )}

                            {/* 2. Botón directo de descarga en ZIP */}
                            {exportModal.zipUrl && (
                                <a
                                    href={exportModal.zipUrl}
                                    download={exportModal.filename}
                                    className="w-full py-2.5 px-3 rounded-xl font-black text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:opacity-90 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all">
                                    <i className="fa-solid fa-file-zipper text-sm"></i>
                                    <span>Descargar Carrusel Completo en ZIP (.zip)</span>
                                </a>
                            )}

                            {/* 3. Botón para descargar todas las imágenes de forma secuencial */}
                            <button
                                onClick={handleDownloadAllSequential}
                                disabled={downloadingBatch}
                                className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 active:scale-[0.98] transition-all ${downloadingBatch ? 'bg-neutral-700 text-neutral-300 cursor-wait' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'}`}>
                                <i className={`fa-solid ${downloadingBatch ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
                                <span>{downloadingBatch ? (batchProgress || 'Descargando...') : 'Descargar Todas Sueltas (.png)'}</span>
                            </button>

                            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mt-0.5">
                                <span>Diapositivas listas ({exportModal.items.length})</span>
                                <span>Toca una slide para abrirla</span>
                            </div>

                            {/* 4. Lista interactiva de diapositivas */}
                            <div className="flex flex-col gap-2 max-h-[46vh] overflow-y-auto hide-scrollbar">
                                {exportModal.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        id={`export-item-${idx + 1}`}
                                        onClick={() => {
                                            setExportModal({
                                                ...item,
                                                isMultiple: false,
                                                prevItems: exportModal.items,
                                                zipBlob: exportModal.zipBlob,
                                                zipUrl: exportModal.zipUrl,
                                            });
                                        }}
                                        className="flex items-center gap-2.5 p-2 bg-neutral-800/80 hover:bg-neutral-750 border border-neutral-700/60 hover:border-cyan-500/50 rounded-xl cursor-pointer transition-all active:scale-[0.99] group">
                                        <img
                                            src={item.url}
                                            alt={`Slide ${idx + 1}`}
                                            className="ios-save-image w-10 h-14 object-cover rounded-lg border border-neutral-700 shrink-0 group-hover:border-cyan-400"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-xs text-white truncate flex items-center gap-1.5">
                                                <span>Slide {idx + 1} de {exportModal.items.length}</span>
                                                <i className="fa-solid fa-up-right-from-square text-[9px] text-neutral-500 group-hover:text-cyan-400"></i>
                                            </div>
                                            <div className="text-[10px] text-neutral-400 font-mono truncate">{item.filename}</div>
                                        </div>
                                        <button
                                            id={`export-save-btn-${idx + 1}`}
                                            onClick={(e) => handleSaveSingleItem(item, e)}
                                            className="px-2.5 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 font-black text-xs flex items-center gap-1 shrink-0 active:scale-95 shadow">
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
    );
};

/**
 * Drawer / Bottom Sheet táctil para selección de carruseles en móviles
 */
window.MobileDrawer = ({
    drawerOpen,
    setDrawerOpen,
    selectedAccount,
    onSelectAccount,
    videos,
    vIdx,
    onSelectVideo,
    account
}) => {
    if (!drawerOpen) return null;

    const filtered = videos.map((v, i) => ({ v, i })).filter(({ v }) => {
        if (selectedAccount === 'all') return true;
        return window.getAccountForVideo(v).id === selectedAccount;
    });
    const groups = [...new Set(filtered.map((item) => item.v.group))];

    return (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
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
                        <p className="text-[11px] text-neutral-500 font-mono">
                            {videos.length} carruseles en {selectedAccount === 'all' ? 'todas las marcas' : (account?.name || 'Marca')}
                        </p>
                    </div>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-sm">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Píldoras de filtro de marca en el drawer */}
                <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar px-4 pt-3 pb-1 border-b border-neutral-800/60 shrink-0">
                    <button
                        onClick={() => onSelectAccount('all')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shrink-0 transition-all ${selectedAccount === 'all' ? 'bg-white text-black border-white' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}>
                        Todas ({videos.length})
                    </button>
                    <button
                        onClick={() => onSelectAccount('santidev')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shrink-0 transition-all flex items-center gap-1 ${selectedAccount === 'santidev' ? 'bg-[#2E9D63] text-white border-[#2E9D63]' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}>
                        <span>Santi.Dev</span>
                    </button>
                    <button
                        onClick={() => onSelectAccount('mova')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shrink-0 transition-all flex items-center gap-1 ${selectedAccount === 'mova' ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-sm' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}>
                        <img src="assets/mova_logo_clean.png" alt="Mova" className="w-3 h-3 rounded-full object-contain" />
                        <span>Mova</span>
                    </button>
                    <button
                        onClick={() => onSelectAccount('endo')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shrink-0 transition-all flex items-center gap-1 ${selectedAccount === 'endo' ? 'bg-[#EE6A3E] text-white border-[#EE6A3E]' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}>
                        <span>Endo</span>
                    </button>
                    <button
                        onClick={() => onSelectAccount('girastock')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shrink-0 transition-all flex items-center gap-1 ${selectedAccount === 'girastock' ? 'bg-[#EDB828] text-black border-[#EDB828]' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}>
                        <span>GiraStock</span>
                    </button>
                </div>

                {/* Lista de series y videos filtrada */}
                <div className="p-4 overflow-y-auto hide-scrollbar flex flex-col gap-4">
                    {groups.map((grpName) => {
                        const list = filtered.filter((item) => item.v.group === grpName);
                        return (
                            <div key={grpName}>
                                <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                    <span>{grpName}</span>
                                    <span className="font-mono text-[9px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">{list.length} videos</span>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {list.map(({ v, i }) => {
                                        const vAcc = window.getAccountForVideo(v);
                                        return (
                                            <button
                                                key={v.id}
                                                id={`drawer-video-btn-${v.id}`}
                                                onClick={() => {
                                                    onSelectVideo(i);
                                                    setDrawerOpen(false);
                                                }}
                                                className={`w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-1 ${vIdx === i ? 'bg-white text-black border-white shadow-lg' : 'bg-neutral-800/90 text-neutral-200 border-neutral-700/60 hover:bg-neutral-700'}`}>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2 truncate">
                                                        <span style={{ width: 8, height: 8, borderRadius: 2, background: window.THEMES[v.theme].accent, flexShrink: 0 }} />
                                                        <span className="font-bold text-xs truncate">{v.title}</span>
                                                    </div>
                                                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${vIdx === i ? 'bg-neutral-200 text-neutral-800' : 'bg-neutral-700 text-neutral-300'}`}>
                                                        {vAcc.handle}
                                                    </span>
                                                </div>
                                                <div className={`text-[11px] truncate ${vIdx === i ? 'text-neutral-700' : 'text-neutral-400'}`}>
                                                    {v.subtitle}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

/**
 * Modal para visualizar y copiar el kit de publicación (caption, hook, hashtags)
 */
window.PostKitModal = ({
    postKitOpen,
    setPostKitOpen,
    activeVideo,
    copiedKey,
    onCopy
}) => {
    if (!postKitOpen || !activeVideo) return null;

    const post = activeVideo.post || activeVideo.copy;
    const account = window.getAccountForVideo(activeVideo);

    const hookText = post?.hook || '';
    const captionText = post?.caption || post?.manifesto || post?.problem || '';
    const rawHashtags = post?.hashtags || [];
    const hashtagsList = Array.isArray(rawHashtags) ? rawHashtags : (typeof rawHashtags === 'string' ? rawHashtags.split(' ') : []);
    const bestTime = post?.bestTime || post?.schedule || '18:00 - 21:00';
    const sound = post?.sound || 'Audio en tendencia / Instrumental inspirador';

    // Guión de voz unificado para reels
    const reelBeats = activeVideo.beats || [];
    const fullScriptVO = reelBeats
        .map(b => b.vo ? b.vo.trim() : '')
        .filter(Boolean)
        .join(' ');
    const voWords = fullScriptVO ? fullScriptVO.split(/\s+/).filter(Boolean).length : 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Cabecera del modal */}
                <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70 shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-clipboard-list"></i>
                        </div>
                        <div className="truncate">
                            <h3 className="text-sm font-black text-white truncate">Kit de Publicación para Redes</h3>
                            <p className="text-[11px] text-neutral-400 font-mono truncate">{activeVideo.title} · {account.handle}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setPostKitOpen(false)}
                        className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs shrink-0">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Contenido con scroll */}
                <div className="p-4 overflow-y-auto hide-scrollbar flex flex-col gap-4 text-xs select-text">
                    {/* Guión Completo de Voz (VO) para Grabación */}
                    {fullScriptVO && (
                        <div className="flex flex-col gap-1.5 bg-gradient-to-r from-emerald-950/40 to-teal-950/40 p-3 rounded-xl border border-emerald-500/30">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                                    <i className="fa-solid fa-microphone-lines text-emerald-400 text-xs"></i>
                                    <span>Guión Completo para Locución ({voWords} palabras)</span>
                                </span>
                                <button
                                    onClick={() => onCopy('vo_full', fullScriptVO)}
                                    className="text-emerald-400 hover:underline font-mono text-[11px] flex items-center gap-1 active:scale-95">
                                    <i className={`fa-solid ${copiedKey === 'vo_full' ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
                                    <span>{copiedKey === 'vo_full' ? '¡Copiado!' : 'Copiar Guión Entero'}</span>
                                </button>
                            </div>
                            <div className="p-2.5 bg-black/60 rounded-lg border border-emerald-500/20 text-emerald-100/90 leading-relaxed font-sans text-xs italic select-text">
                                "{fullScriptVO}"
                            </div>
                        </div>
                    )}

                    {post && (hookText || captionText) ? (
                        <>
                            {/* Gancho */}
                            {hookText && (
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                                            <i className="fa-solid fa-bolt text-amber-400 text-xs"></i>
                                            <span>Gancho / Hook (Detiene el scroll)</span>
                                        </span>
                                        <button
                                            onClick={() => onCopy('hook', hookText)}
                                            className="text-amber-400 hover:underline font-mono text-[11px] flex items-center gap-1 active:scale-95">
                                            <i className={`fa-solid ${copiedKey === 'hook' ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
                                            <span>{copiedKey === 'hook' ? '¡Copiado!' : 'Copiar'}</span>
                                        </button>
                                    </div>
                                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-200 leading-snug font-semibold text-xs">
                                        {hookText}
                                    </div>
                                </div>
                            )}

                            {/* Caption completo */}
                            {captionText && (
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                                            <i className="fa-solid fa-align-left text-blue-400 text-xs"></i>
                                            <span>Descripción Completa (Caption)</span>
                                        </span>
                                        <button
                                            onClick={() => onCopy('caption', captionText)}
                                            className="text-blue-400 hover:underline font-mono text-[11px] flex items-center gap-1 active:scale-95">
                                            <i className={`fa-solid ${copiedKey === 'caption' ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
                                            <span>{copiedKey === 'caption' ? '¡Copiado!' : 'Copiar'}</span>
                                        </button>
                                    </div>
                                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-300 leading-relaxed font-sans text-xs whitespace-pre-wrap max-h-52 overflow-y-auto hide-scrollbar">
                                        {captionText}
                                    </div>
                                </div>
                            )}

                            {/* Hashtags */}
                            {hashtagsList.length > 0 && (
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                                            <i className="fa-solid fa-hashtag text-cyan-400 text-xs"></i>
                                            <span>Hashtags Optimizados</span>
                                        </span>
                                        <button
                                            onClick={() => onCopy('hashtags', hashtagsList.join(' '))}
                                            className="text-cyan-400 hover:underline font-mono text-[11px] flex items-center gap-1 active:scale-95">
                                            <i className={`fa-solid ${copiedKey === 'hashtags' ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
                                            <span>{copiedKey === 'hashtags' ? '¡Copiados!' : 'Copiar'}</span>
                                        </button>
                                    </div>
                                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-cyan-300/90 font-mono text-[11px] leading-relaxed">
                                        {hashtagsList.join(' ')}
                                    </div>
                                </div>
                            )}

                            {/* Horario y Sonido */}
                            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-800">
                                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col gap-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Mejor Horario</span>
                                    <span className="font-bold text-white text-xs">{bestTime}</span>
                                </div>
                                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col gap-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Audio Recomendado</span>
                                    <span className="font-bold text-white text-xs truncate" title={sound}>{sound}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-neutral-400 p-4 text-center">No hay kit configurado para este carrusel.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * Modal de sincronización directa GitOps con GitHub API y despliegue Vercel
 */
window.GitHubSyncModal = ({
    syncModalOpen,
    setSyncModalOpen,
    ghToken,
    setGhToken,
    commitMsg,
    setCommitMsg,
    ghStatus,
    setGhStatus,
    ghMessage,
    onSyncToGitHub
}) => {
    if (!syncModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Cabecera del modal */}
                <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-base">
                            <i className="fa-brands fa-github"></i>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white">Sincronizar con GitHub & Vercel</h3>
                            <p className="text-[11px] text-neutral-400 font-mono">Repo: santiagorivero0203-gif/Algo-sobre-content (main)</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { setSyncModalOpen(false); setGhStatus('idle'); }}
                        className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-4 overflow-y-auto hide-scrollbar flex flex-col gap-3.5 text-xs">
                    <div className="bg-neutral-950/70 p-3 rounded-xl border border-neutral-800 flex flex-col gap-1.5 leading-relaxed text-neutral-300">
                        <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                            <i className="fa-solid fa-rocket text-emerald-400"></i>
                            <span>Flujo GitOps Directo sin Base de Datos</span>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                            Al confirmar, tus cambios en los carruseles se convertirán en un commit directo en el archivo <code className="text-emerald-300 font-mono">js/videos.js</code> de la rama <code className="text-emerald-300 font-mono">main</code>. Vercel detectará el commit y compilará la versión pública en vivo automáticamente.
                        </p>
                    </div>

                    {/* Input GitHub PAT */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                            <span>Personal Access Token (PAT) de GitHub</span>
                            <a
                                href="https://github.com/settings/tokens/new?scopes=repo&description=Algo+Studio+Editor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-400 hover:underline text-[10px] font-mono">
                                Crear Token (permiso repo:write) ↗
                            </a>
                        </label>
                        <input
                            type="password"
                            value={ghToken}
                            onChange={(e) => setGhToken(e.target.value)}
                            placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                            className="studio-input p-2.5 rounded-xl font-mono text-xs"
                        />
                        <p className="text-[10px] text-neutral-500">
                            El token se almacena únicamente en tu navegador (localStorage) y nunca viaja a servidores intermedios.
                        </p>
                    </div>

                    {/* Input Mensaje de Commit */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-300">Mensaje de Commit</label>
                        <input
                            type="text"
                            value={commitMsg}
                            onChange={(e) => setCommitMsg(e.target.value)}
                            placeholder="chore(content): actualizar carruseles desde Studio Editor [vercel deploy]"
                            className="studio-input p-2.5 rounded-xl text-xs"
                        />
                    </div>

                    {/* Mensajes de estado */}
                    {ghStatus === 'loading' && (
                        <div className="p-3 rounded-xl bg-blue-950/50 border border-blue-500/40 text-blue-200 flex items-center gap-2">
                            <i className="fa-solid fa-spinner fa-spin text-blue-400"></i>
                            <span>{ghMessage}</span>
                        </div>
                    )}
                    {ghStatus === 'success' && (
                        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 flex items-center gap-2">
                            <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
                            <span>{ghMessage}</span>
                        </div>
                    )}
                    {ghStatus === 'error' && (
                        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 flex items-start gap-2">
                            <i className="fa-solid fa-triangle-exclamation text-rose-400 text-sm mt-0.5"></i>
                            <span>{ghMessage}</span>
                        </div>
                    )}
                </div>

                {/* Pie del modal */}
                <div className="p-3.5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-end gap-2">
                    <button
                        onClick={() => { setSyncModalOpen(false); setGhStatus('idle'); }}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
                        Cerrar
                    </button>
                    <button
                        onClick={onSyncToGitHub}
                        disabled={ghStatus === 'loading'}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 ${ghStatus === 'loading' ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20'}`}>
                        <i className={`fa-solid ${ghStatus === 'loading' ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up'}`}></i>
                        <span>{ghStatus === 'loading' ? 'Enviando commit...' : 'Confirmar Commit y Desplegar'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * =====================================================================
 * REEL CREATOR MODAL · MOTOR DE CREACIÓN DE NUEVOS REELS POR CÓDIGO
 * =====================================================================
 * Permite crear nuevos Reels de 60 FPS desde cero, importar estructuras JSON
 * generadas por IA o copiar los System Prompts derivados de 'claude-content-skills'.
 * =====================================================================
 */
window.ReelCreatorModal = ({
    isOpen,
    onClose,
    onReelCreated,
    currentAccount = 'santidev'
}) => {
    if (!isOpen) return null;

    const [tab, setTab] = React.useState('wizard'); // 'wizard' | 'json' | 'prompt'
    const [title, setTitle] = React.useState('');
    const [subtitle, setSubtitle] = React.useState('');
    const [account, setAccount] = React.useState(currentAccount || 'santidev');
    const [theme, setTheme] = React.useState(currentAccount === 'mova' ? 'mova' : 'dev_blue');
    const [keyword, setKeyword] = React.useState(currentAccount === 'mova' ? 'MOVA' : 'STACK');
    const [jsonInput, setJsonInput] = React.useState('');
    const [jsonError, setJsonError] = React.useState('');
    const [copiedPrompt, setCopiedPrompt] = React.useState(false);

    // Prompt maestro para Antigravity y Claude: Erradica diagramas de flujo y fuerza un solo elemento central
    const AI_REEL_SYSTEM_PROMPT = `Actúa como Director de Motion Graphics al estilo Anthropic / Apple.
Crea la secuencia para un video vertical ultra rápido de 6 a 8 segundos sobre: "${title || 'Rendimiento Web y Cómputo Local'}".
Marca: ${account === 'mova' ? 'Mova' : 'Santi.Dev'}

REGLAS ESTRICTAS DE RITMO Y DISEÑO (ANTI-SLOP & ANTI-DIAPOSITIVAS):
1. PROHIBIDO GENERAR DIAGRAMAS: Cero pipelines, flujos, tarjetas agrupadas o listas.
2. UN SOLO ELEMENTO POR BEAT: Cada escena muestra ÚNICAMENTE un texto centrado de 1 a 3 palabras o una métrica gigante.
3. RITMO VELOZ: Cada beat dura entre 800ms y 1200ms.
4. ESTÉTICA: Fondo #070B14 cinemático, texto #FFFFFF gigante, palabra clave con acento neón de la marca. Cero terminales bash.
5. METADATOS CINEMÁTICOS: Cada beat incluye "badgeText" (píldora superior), "chipLabel" (métrica inferior) y "vo" (guión de locución).

DEVUELVE EXCLUSIVAMENTE ESTE JSON VÁLIDO (sin markdown):
{
  "duration_ms": 7000,
  "beats": [
    {
      "start_ms": 0,
      "end_ms": 1200,
      "text": "MENOS CÓDIGO",
      "accent": "CÓDIGO",
      "badgeText": "ARQUITECTURA ÁGIL",
      "chipLabel": "HOOK DE IMPACTO",
      "vo": "¿Cansado de lidiar con código inflado?",
      "size": "text-7xl",
      "motion": "mask-up"
    },
    {
      "start_ms": 1200,
      "end_ms": 2500,
      "text": "MÁS VELOCIDAD",
      "accent": "VELOCIDAD",
      "badgeText": "OPTIMIZACIÓN",
      "chipLabel": "LA TÁCTICA",
      "vo": "Con una arquitectura modular aceleras 10x tu flujo.",
      "size": "text-7xl",
      "motion": "snap-scale"
    },
    {
      "start_ms": 2500,
      "end_ms": 4500,
      "text": "60 FPS",
      "accent": "60 FPS",
      "badgeText": "DETERMINISTA",
      "chipLabel": "EL PAYOFF",
      "vo": "Animación determinista sin caída de fotogramas.",
      "size": "text-8xl",
      "motion": "mask-up"
    },
    {
      "start_ms": 4500,
      "end_ms": 7000,
      "text": "DIRECTO EN WEB",
      "accent": "WEB",
      "badgeText": "COMUNIDAD",
      "chipLabel": "LLAMADO A LA ACCIÓN",
      "vo": "Comenta CÓDIGO y te envío la plantilla completa.",
      "size": "text-6xl",
      "motion": "fade-out"
    }
  ]
}`;

    const handleCreateFromWizard = () => {
        if (!title.trim()) {
            alert('Por favor ingresa un título para el Reel.');
            return;
        }
        const newReel = window.createReelTemplate({
            title: title.trim(),
            subtitle: subtitle.trim() || 'Generado con Santi.Dev Creator',
            accountId: account,
            theme,
            keyword: keyword.trim().toUpperCase() || 'STACK'
        });

        window.saveNewReel(newReel);
        if (onReelCreated) onReelCreated(newReel);
        onClose();
    };

    const [promptType, setPromptType] = React.useState('claude'); // 'claude' (Anthropic Motion) | 'code' (Terminal/HUD)

    const claudePrompt = (window.SKILL_FAST_KINETIC || window.SKILL_CLEAN_MOTION_REEL || window.SKILL_CLAUDE_MOTION)?.getPrompt(
        { name: account === 'mova' ? 'Mova' : 'Santi.Dev' },
        title || 'Rendimiento Web y Cómputo Local'
    ) || AI_REEL_SYSTEM_PROMPT;

    const handleImportJson = () => {
        setJsonError('');
        try {
            const parsed = JSON.parse(jsonInput.trim());
            // 1. Detección de formato Motion Reel / Fast Kinetic (Un solo foco visual, beats con text o words)
            const beats = parsed.beats || parsed.scenes;
            if (beats && Array.isArray(beats) && beats.length > 0) {
                if (!parsed.id) parsed.id = `fast_reel_${Date.now()}`;
                if (!parsed.title) parsed.title = title || 'Reel Cinético Rápido';
                if (!parsed.duration_ms && !parsed.total_ms) {
                    const lastBeat = beats[beats.length - 1];
                    parsed.duration_ms = lastBeat.end_ms || (typeof lastBeat.end === 'number' ? lastBeat.end * 1000 : 7000);
                }
                if (!parsed.accountId) parsed.accountId = account || 'santidev';
                if (!parsed.theme) parsed.theme = theme || 'dev_blue';
                window.saveNewReel(parsed);
                if (onReelCreated) onReelCreated(parsed);
                onClose();
                return;
            }

            // 2. Formato alternativo con objeto raíz
            if (!parsed.id) parsed.id = `reel_${Date.now()}`;
            window.saveNewReel(parsed);
            if (onReelCreated) onReelCreated(parsed);
            onClose();
        } catch (e) {
            setJsonError('Error de sintaxis JSON: ' + e.message);
        }
    };

    const activePromptText = promptType === 'claude' && claudePrompt ? claudePrompt : AI_REEL_SYSTEM_PROMPT;

    const handleCopyPrompt = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(activePromptText);
            setCopiedPrompt(true);
            setTimeout(() => setCopiedPrompt(false), 2500);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-left">
                {/* Cabecera */}
                <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm shrink-0">
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white">Tecnología de Reels por Código</h3>
                            <p className="text-[11px] text-neutral-400 font-mono">Crea videos animados a 60 FPS con las reglas de 'claude-content-skills'</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Selector de pestañas */}
                <div className="grid grid-cols-3 p-1.5 bg-neutral-950 border-b border-neutral-800 shrink-0 gap-1 text-xs font-bold">
                    <button
                        onClick={() => setTab('wizard')}
                        className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${tab === 'wizard' ? 'bg-sky-500 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                        <i className="fa-solid fa-plus-circle"></i>
                        <span>Nuevo Reel</span>
                    </button>
                    <button
                        onClick={() => setTab('json')}
                        className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${tab === 'json' ? 'bg-sky-500 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                        <i className="fa-solid fa-code"></i>
                        <span>Pegar JSON</span>
                    </button>
                    <button
                        onClick={() => setTab('prompt')}
                        className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${tab === 'prompt' ? 'bg-sky-500 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                        <i className="fa-solid fa-robot"></i>
                        <span>Prompt para IA</span>
                    </button>
                </div>

                {/* Contenido según pestaña */}
                <div className="p-4 overflow-y-auto hide-scrollbar flex-1 flex flex-col gap-4 text-xs">
                    {tab === 'wizard' && (
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">Título del Reel (Hook Conceptual)</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ej: Automatiza tus APIs con Subagentes en 2026"
                                    className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-sky-500 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">Subtítulo o Promesa Técnica</label>
                                <input
                                    type="text"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                    placeholder="Ej: Terminal interactiva y reducción del 80% de tokens"
                                    className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-sky-500 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">Marca / Proyecto</label>
                                    <select
                                        value={account}
                                        onChange={(e) => {
                                            setAccount(e.target.value);
                                            setTheme(e.target.value === 'mova' ? 'mova' : 'dev_blue');
                                            setKeyword(e.target.value === 'mova' ? 'MOVA' : 'STACK');
                                        }}
                                        className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs outline-none">
                                        <option value="santidev">Santi.Dev (Software & Tech)</option>
                                        <option value="mova">Mova (IA & Accesibilidad 21D)</option>
                                        <option value="endo">The Last Endo (Gaming & Pixel Art)</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">Paleta de Color / Tema</label>
                                    <select
                                        value={theme}
                                        onChange={(e) => setTheme(e.target.value)}
                                        className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs outline-none">
                                        <option value="dev_blue">Cyber Dev Blue (Azul Medianoche + Cyan)</option>
                                        <option value="tokens_pro">Tokens Pro (Verde Neón Menta)</option>
                                        <option value="mova">Mova Deep Navy (Azul Eléctrico + Naranja Glow)</option>
                                        <option value="pixel_arcade">Retro Pixel Arcade (Rosa Synthwave + Amarillo)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">Palabra Clave para Auto-DM (CTA)</label>
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                                    placeholder="STACK / MOVA / TOKENS"
                                    className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs font-mono font-bold focus:border-sky-500 outline-none"
                                />
                            </div>

                            <div className="p-3 bg-sky-950/40 border border-sky-800/50 rounded-xl text-sky-200 text-xs flex items-start gap-2">
                                <i className="fa-solid fa-circle-info text-sky-400 mt-0.5 shrink-0"></i>
                                <span>El nuevo Reel se generará con la estructura de 4 beats validada (Hook visual en Frame 0 ➔ Problema ➔ Código en vivo ➔ Tarjeta de comentarios para auto-DM).</span>
                            </div>
                        </div>
                    )}

                    {tab === 'json' && (
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">Pega el objeto JSON generado por la IA</label>
                            <textarea
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                rows={10}
                                placeholder='{\n  "id": "reel_mi_tema",\n  "accountId": "santidev",\n  "title": "...",\n  "beats": [...]\n}'
                                className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono text-xs focus:border-sky-500 outline-none"
                            />
                            {jsonError && (
                                <div className="p-2.5 bg-rose-950/60 border border-rose-600/50 rounded-xl text-rose-300 text-xs">
                                    {jsonError}
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 'prompt' && (
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                                    <button
                                        onClick={() => setPromptType('claude')}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${promptType === 'claude' ? 'bg-[#D97757] text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                                        <i className="fa-solid fa-atom text-[10px]"></i>
                                        <span>Estilo Claude / Anthropic</span>
                                    </button>
                                    <button
                                        onClick={() => setPromptType('code')}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${promptType === 'code' ? 'bg-sky-500 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                                        <i className="fa-solid fa-terminal text-[10px]"></i>
                                        <span>Estilo Terminal / Canvas</span>
                                    </button>
                                </div>

                                <button
                                    onClick={handleCopyPrompt}
                                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 shadow">
                                    <i className={`fa-solid ${copiedPrompt ? 'fa-check' : 'fa-copy'}`}></i>
                                    <span>{copiedPrompt ? '¡Copiado!' : 'Copiar Prompt'}</span>
                                </button>
                            </div>

                            <p className="text-neutral-400 text-xs">
                                {promptType === 'claude'
                                    ? 'Prompt oficial con reglas visuales de Anthropic (#0D0D0E, #F3F3F3, #D97757) y cálculo determinista por milisegundos.'
                                    : 'Prompt técnico orientado a terminal reactivo, visión por computadora y odómetro de código.'}
                            </p>

                            <pre className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl font-mono text-[11px] text-neutral-300 overflow-x-auto whitespace-pre-wrap select-all max-h-80">
                                {activePromptText}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Pie del modal */}
                <div className="p-3.5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-end gap-2 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
                        Cancelar
                    </button>
                    {tab === 'wizard' && (
                        <button
                            onClick={handleCreateFromWizard}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/20 active:scale-95 transition-all flex items-center gap-2">
                            <i className="fa-solid fa-play"></i>
                            <span>Crear y Renderizar a 60 FPS</span>
                        </button>
                    )}
                    {tab === 'json' && (
                        <button
                            onClick={handleImportJson}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg active:scale-95 transition-all flex items-center gap-2">
                            <i className="fa-solid fa-check"></i>
                            <span>Importar Reel</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

