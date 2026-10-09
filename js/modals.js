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
