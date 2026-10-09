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

/**
 * Panel de inspección y edición en tiempo real (Studio Inspector).
 * Modularizado y desacoplado en js/inspector.js (window.StudioInspector).
 */
const StudioInspector = (props) => {
    if (typeof window !== 'undefined' && window.StudioInspector) {
        return <window.StudioInspector {...props} />;
    }
    return null;
};

const App = () => {
    // Control de versión para invalidar estados obsoletos en navegadores de usuarios
    const VIDEOS_STORAGE_VERSION = 'v9_mova_post_kits_integrated';

    // Colección de videos editable con persistencia local
    const [videos, setVideos] = React.useState(() => {
        try {
            const currentVer = localStorage.getItem('algo_videos_version');
            if (currentVer !== VIDEOS_STORAGE_VERSION) {
                // Se purga la versión antigua en caché para cargar las nuevas narrativas dinámicas de Mova
                localStorage.removeItem('algo_custom_videos');
                localStorage.setItem('algo_videos_version', VIDEOS_STORAGE_VERSION);
                return window.VIDEOS;
            }
            const raw = localStorage.getItem('algo_custom_videos');
            if (raw) return JSON.parse(raw);
        } catch (e) {
            console.warn('Error al leer videos desde localStorage:', e);
        }
        return window.VIDEOS;
    });

    // Filtro de marca / cuenta: 'all' | 'santidev' | 'mova' | 'endo' | 'girastock'
    const [selectedAccount, setSelectedAccount] = React.useState(() => {
        const p = (URL_PARAMS.get('account') || URL_PARAMS.get('brand') || window.location.hash.replace('#', '') || '').toLowerCase();
        if (window.ACCOUNTS && window.ACCOUNTS[p]) return p;
        return 'all';
    });

    // Auto-sincroniza el video activo cuando cambia o se inicializa la cuenta
    React.useEffect(() => {
        if (selectedAccount !== 'all') {
            const currentAcc = window.getAccountForVideo(videos[vIdx]);
            if (currentAcc.id !== selectedAccount) {
                const firstIdx = videos.findIndex((v) => window.getAccountForVideo(v).id === selectedAccount);
                if (firstIdx >= 0) {
                    setVIdx(firstIdx);
                    setSIdx(0);
                }
            }
        }
    }, [selectedAccount]);

    // Modo de trabajo: false = Visor Normal & Exportación HD | true = Studio Editor Activo
    const [editorMode, setEditorMode] = React.useState(URL_PARAMS.get('edit') === '1');
    const [editorTab, setEditorTab] = React.useState('slide'); // 'slide' | 'elements' | 'meta' | 'post'
    const [mobileEditorOpen, setMobileEditorOpen] = React.useState(false);

    // Ocultar barra lateral en modo editor automáticamente para dar todo el foco a la diapositiva
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => URL_PARAMS.get('edit') === '1');

    // Modo mesa de trabajo estilo Canva: fondo blanco/claro (#f6f7f9) con drop-shadow editorial
    const [canvaMode, setCanvaMode] = React.useState(true);

    // Auto-colapsar barra lateral al entrar en Studio Editor
    React.useEffect(() => {
        if (editorMode) {
            setSidebarCollapsed(true);
        } else {
            setSidebarCollapsed(false);
        }
    }, [editorMode]);

    // Modal de sincronización con GitHub / Vercel
    const [syncModalOpen, setSyncModalOpen] = React.useState(false);
    const [ghToken, setGhToken] = React.useState(() => localStorage.getItem('algo_gh_pat') || '');
    const [ghStatus, setGhStatus] = React.useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [ghMessage, setGhMessage] = React.useState('');
    const [commitMsg, setCommitMsg] = React.useState('');

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

    const video = videos[vIdx] || videos[0];
    const slide = video.slides[sIdx] || video.slides[0];
    const theme = window.THEMES[video.theme] || window.THEMES.stack1;
    const account = window.getAccountForVideo(video);
    const fmt = window.FORMATS[format] || window.FORMATS.tiktok;
    const isFileProtocol = window.location.protocol === 'file:';
    const isMova = video.accountId === 'mova' || video.id?.startsWith('mova');

    // Detección de cambios locales respecto a la configuración original de fábrica
    const hasCustomEdits = React.useMemo(() => {
        return !!localStorage.getItem('algo_custom_videos');
    }, [videos]);

    /** Actualiza campos de la slide actual con guardado inmediato en localStorage */
    const updateActiveSlide = (fields) => {
        setVideos((prev) => {
            const next = JSON.parse(JSON.stringify(prev));
            if (next[vIdx] && next[vIdx].slides[sIdx]) {
                next[vIdx].slides[sIdx] = { ...next[vIdx].slides[sIdx], ...fields };
            }
            try {
                localStorage.setItem('algo_custom_videos', JSON.stringify(next));
            } catch (e) {
                console.error(e);
            }
            return next;
        });
    };

    /** Actualiza metadatos globales del video actual (tema, post, título) */
    const updateActiveVideoMeta = (fields) => {
        setVideos((prev) => {
            const next = JSON.parse(JSON.stringify(prev));
            if (next[vIdx]) {
                next[vIdx] = { ...next[vIdx], ...fields };
            }
            try {
                localStorage.setItem('algo_custom_videos', JSON.stringify(next));
            } catch (e) {
                console.error(e);
            }
            return next;
        });
    };

    /** Restaura todos los carruseles al archivo videos.js original */
    const resetToOriginals = () => {
        if (window.confirm('¿Restaurar todos los carruseles a su contenido original de fábrica? Se borrarán las ediciones locales en este navegador.')) {
            try {
                localStorage.removeItem('algo_custom_videos');
            } catch (e) {}
            setVideos(window.VIDEOS);
        }
    };

    /** Sincroniza y commitea los cambios directamente en el repositorio de GitHub para despliegue en Vercel */
    const handleSyncToGitHub = async () => {
        if (!ghToken.trim()) {
            setGhStatus('error');
            setGhMessage('Ingresa un Personal Access Token de GitHub con permisos de escritura (Contents: write).');
            return;
        }

        setGhStatus('loading');
        setGhMessage('1/3 Conectando con GitHub API...');

        try {
            localStorage.setItem('algo_gh_pat', ghToken.trim());
            const owner = 'santiagorivero0203-gif';
            const repo = 'Algo-sobre-content';
            const path = 'js/videos.js';
            const branch = 'main';

            // 1. Obtener SHA actual del archivo
            const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`, {
                headers: {
                    'Authorization': `Bearer ${ghToken.trim()}`,
                    'Accept': 'application/vnd.github.v3+json',
                }
            });

            if (!getRes.ok) {
                const errData = await getRes.json().catch(() => ({}));
                throw new Error(errData.message || `HTTP ${getRes.status}`);
            }

            const fileData = await getRes.json();
            const currentSha = fileData.sha;

            setGhMessage('2/3 Creando commit en la rama main...');

            // 2. Serializar código JS limpio
            const jsContent = `/**\n * SANTI.DEV & MULTI-BRAND · CONTENIDO OFICIAL DE CARRUSELES\n * Sincronizado automáticamente desde Studio Editor con GitHub y Vercel.\n */\n\nwindow.VIDEOS = ${JSON.stringify(videos, null, 4)};\n`;

            const utf8Bytes = new TextEncoder().encode(jsContent);
            let binary = '';
            for (let i = 0; i < utf8Bytes.byteLength; i++) {
                binary += String.fromCharCode(utf8Bytes[i]);
            }
            const base64Content = btoa(binary);

            // 3. Enviar commit PUT
            const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${ghToken.trim()}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: commitMsg.trim() || 'chore(content): actualizar carruseles desde Studio Editor [vercel deploy]',
                    content: base64Content,
                    sha: currentSha,
                    branch: branch
                })
            });

            if (!putRes.ok) {
                const putErr = await putRes.json().catch(() => ({}));
                throw new Error(putErr.message || `HTTP ${putRes.status}`);
            }

            setGhStatus('success');
            setGhMessage('¡Sincronización completada! El commit fue enviado a GitHub. Vercel comenzará a desplegar la nueva versión automáticamente.');
        } catch (err) {
            console.error('Error sincronizando con GitHub:', err);
            setGhStatus('error');
            setGhMessage(`Error: ${err.message || err}`);
        }
    };

    /** Cambia de cuenta y auto-selecciona el primer carrusel de la marca */
    const handleSelectAccount = (accId) => {
        setSelectedAccount(accId);
        if (accId !== 'all') {
            const firstIdx = videos.findIndex((v) => window.getAccountForVideo(v).id === accId);
            if (firstIdx >= 0) {
                setVIdx(firstIdx);
                setSIdx(0);
            }
        }
    };

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
    /**
     * Motor de Renderizado Ultrarrobusto para Exportación HD (1080×1920 / 1080×1350):
     * 1. Sincronización determinista: si targetSlideIndex está definido, espera a que
     *    React termine de montar y pintar exactamente esa diapositiva en el DOM.
     * 2. Espera completa de tipografías Web (document.fonts.ready).
     * 3. Espera activa de TODAS las imágenes (img.complete) y decodificación forzada
     *    en GPU (await img.decode()) para eliminar renderizados en blanco o caídas.
     * 4. Estabilización de frame con doble requestAnimationFrame.
     * 5. Motor primario (modern-screenshot) con timeout extendido y configuración
     *    exacta de fondo y estilo computado.
     * 6. Motor de respaldo (html2canvas) con aislamiento y restauración garantizada del DOM.
     * 7. Reintento automático en caso de error transitorio.
     */
    const renderSlideToBlob = async (targetSlideIndex = null) => {
        // 1. Si se especificó un índice, esperar activamente a que React actualice el DOM
        if (targetSlideIndex !== null) {
            let mounted = false;
            for (let w = 0; w < 30; w++) {
                const checkEl = document.getElementById('capture-slide');
                if (checkEl && Number(checkEl.dataset.slideIndex) === targetSlideIndex) {
                    mounted = true;
                    break;
                }
                await window.sleep(50);
            }
            if (!mounted) {
                console.warn(`[Render] Timeout esperando montaje de slide ${targetSlideIndex + 1}, continuando...`);
            }
        }

        // 2. Esperar fuentes web
        try {
            await Promise.race([
                document.fonts.ready,
                new Promise((resolve) => setTimeout(resolve, 2000)),
            ]);
        } catch (e) {
            console.warn('[Render] Font loading check skipped:', e);
        }

        const el = document.getElementById('capture-slide');
        if (!el) {
            throw new Error('No se encontró el elemento #capture-slide en el DOM.');
        }

        // 3. Esperar carga completa y decodificación de TODAS las imágenes contenidas
        const imgs = Array.from(el.querySelectorAll('img'));
        if (imgs.length > 0) {
            await Promise.all(imgs.map(async (img) => {
                if (!img.complete) {
                    await new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                        setTimeout(resolve, 3000);
                    });
                }
                if (img.decode) {
                    try {
                        await img.decode();
                    } catch (_) {
                        // decode puede no ser soportado o fallar en SVGs; no bloquea
                    }
                }
            }));
        }

        // 4. Estabilización de pintado del motor gráfico del navegador
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

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
                const computedStyle = window.getComputedStyle(el);
                const opts = {
                    width: elW,
                    height: elH,
                    scale,
                    backgroundColor: isMova ? (computedStyle.backgroundColor || '#05163F') : canvasBg,
                    timeout: 20000,
                    style: {
                        borderRadius: '0',
                        boxShadow: 'none',
                        transition: 'none',
                        margin: '0',
                        backgroundColor: isMova ? (el.style.backgroundColor || computedStyle.backgroundColor || '#05163F') : canvasBg,
                        backgroundImage: isMova ? (el.style.backgroundImage || computedStyle.backgroundImage || 'none') : (isFlat ? 'none' : 'linear-gradient(to right, rgba(255, 255, 255, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.18) 1px, transparent 1px)'),
                        backgroundSize: isMova ? (el.style.backgroundSize || computedStyle.backgroundSize || 'auto') : (isFlat ? 'auto' : '27px 27px'),
                    },
                    fetch: { requestInit: { mode: 'cors', cache: 'force-cache' } },
                    features: { removeControlCharacter: true },
                };

                if (isMobileDevice) {
                    await window.modernScreenshot.domToCanvas(el, { ...opts, scale: 1 });
                }
                const canvas = await window.modernScreenshot.domToCanvas(el, opts);
                return await canvasToExactBlob(canvas);
            } catch (err) {
                console.warn('[Render] modern-screenshot falló, usando html2canvas como respaldo:', err);
            }
        }

        // ---------- 2) Respaldo: html2canvas ----------
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
                backgroundColor: isMova ? '#05163F' : canvasBg,
                useCORS: true,
                allowTaint: false,
                logging: false,
                imageTimeout: 8000,
                onclone: (doc) => {
                    const c = doc.getElementById('capture-slide');
                    if (c) {
                        c.style.borderRadius = '0';
                        c.style.boxShadow = 'none';
                        c.style.backgroundColor = isMova ? (el.style.backgroundColor || '#05163F') : canvasBg;
                        c.style.backgroundImage = isMova ? (el.style.backgroundImage || 'none') : (isFlat ? 'none' : 'linear-gradient(to right, rgba(255, 255, 255, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.18) 1px, transparent 1px)');
                        c.style.backgroundSize = isMova ? (el.style.backgroundSize || 'auto') : (isFlat ? 'auto' : '27px 27px');
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
     * Exporta la diapositiva activa con compatibilidad total para iPhone / iOS Safari y Escritorio
     */
    const downloadOne = async () => {
        setBusy(true);
        setProgressText('Preparando captura HD...');
        try {
            const curIdx = sIdx;
            const filename = `${video.slug}_${format}_${window.pad(curIdx + 1)}.png`;
            setProgressText(`Generando slide ${curIdx + 1}...`);
            const blob = await renderSlideToBlob(curIdx);
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
                    return;
                } catch (shareErr) {
                    if (shareErr.name === 'AbortError') return;
                    console.warn('navigator.share falló, abriendo modal de guardado:', shareErr);
                }
            }

            // En dispositivos móviles (iPhone / Android) o respaldo táctil
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

            // En escritorio: descarga directa vía <a download> con Blob URL
            const a = document.createElement('a');
            a.download = filename;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            // Liberar memoria de forma segura después de 60 segundos
            setTimeout(() => URL.revokeObjectURL(url), 60000);
        } catch (err) {
            console.error('[DownloadOne Error]:', err);
            alert('No se pudo exportar la diapositiva. Por favor verifica que los recursos hayan cargado.');
        } finally {
            setBusy(false);
            setProgressText('');
        }
    };

    /** Exporta todas las diapositivas del carrusel en serie con sincronización garantizada y empaquetado ZIP */
    const downloadAll = async () => {
        setBusy(true);
        const originalIdx = sIdx;
        try {
            const items = [];
            const failedSlides = [];

            for (let i = 0; i < video.slides.length; i++) {
                setSIdx(i);
                setProgressText(`Renderizando slide ${i + 1}/${video.slides.length} (${format.toUpperCase()})...`);
                
                // Esperar a que el DOM se sincronice y los recursos se estabilicen
                await window.sleep(200);

                const filename = `${video.slug}_${format}_${window.pad(i + 1)}.png`;
                let blob = null;

                try {
                    blob = await renderSlideToBlob(i);
                } catch (firstErr) {
                    console.warn(`[DownloadAll] Reintento en slide ${i + 1}:`, firstErr);
                    // Margen de reintento con estabilización extra
                    await window.sleep(400);
                    try {
                        blob = await renderSlideToBlob(i);
                    } catch (retryErr) {
                        console.error(`[DownloadAll] Error definitivo en slide ${i + 1}:`, retryErr);
                        failedSlides.push(i + 1);
                    }
                }

                if (blob) {
                    const file = new File([blob], filename, { type: 'image/png' });
                    const url = URL.createObjectURL(blob);
                    items.push({ index: i, filename, blob, file, url });
                }
            }

            // Restaurar diapositiva original del usuario
            setSIdx(originalIdx);

            if (items.length === 0) {
                alert('No se pudo renderizar ninguna diapositiva. Revisa la consola.');
                return;
            }

            // Empaquetar todo el carrusel en un archivo ZIP con JSZip
            let zipBlob = null;
            let zipUrl = null;
            const zipFilename = `${video.slug}_${format}_carrusel_completo.zip`;

            if (window.JSZip && items.length > 0) {
                setProgressText('Empaquetando diapositivas en ZIP...');
                try {
                    const zip = new window.JSZip();
                    items.forEach((item) => {
                        zip.file(item.filename, item.blob);
                    });
                    zipBlob = await zip.generateAsync({ type: 'blob' });
                    zipUrl = URL.createObjectURL(zipBlob);
                } catch (zipErr) {
                    console.error('[JSZip Error]:', zipErr);
                }
            }

            // En escritorio:
            // Si hay ZIP disponible, descargamos el archivo ZIP con 1 solo clic.
            // Esto evita al 100% el bloqueo de descargas múltiples automáticas del navegador.
            if (!isMobileDevice && zipUrl) {
                const a = document.createElement('a');
                a.download = zipFilename;
                a.href = zipUrl;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }

            // Siempre abrimos el panel modal del carrusel completo para permitir:
            // 1. Descarga del ZIP con un botón directo
            // 2. Guardado individual de cualquier diapositiva
            // 3. Verificación visual de todas las diapositivas generadas
            setExportModal({
                filename: zipFilename,
                isMultiple: true,
                items,
                zipBlob,
                zipUrl,
                failedSlides: failedSlides.length > 0 ? failedSlides : null,
            });

            if (failedSlides.length > 0) {
                console.warn(`[DownloadAll] Se completaron ${items.length} de ${video.slides.length} slides. Diapositivas con aviso: ${failedSlides.join(', ')}`);
            }
        } catch (err) {
            console.error('[DownloadAll Critical]:', err);
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
                <div className="flex items-center gap-2 shrink-0 min-w-0">
                    {account.logo ? (
                        <img src={account.logo} alt={account.name} className="w-5 h-5 rounded-full object-contain bg-white/10 p-0.5 border border-white/20 shrink-0" />
                    ) : (
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }}></span>
                    )}
                    <span className="font-black text-xs tracking-tight text-white truncate">{account.name}</span>
                </div>

                {/* Controles superiores compactos */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {/* Botón rápido para alternar Modo Studio Editor */}
                    <button
                        onClick={() => setEditorMode(!editorMode)}
                        className={`px-2 py-1 rounded-lg text-[10.5px] font-bold border transition-all flex items-center gap-1 ${editorMode ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-md' : 'bg-neutral-800 text-neutral-300 border-neutral-700'}`}>
                        <i className={`fa-solid ${editorMode ? 'fa-pen-to-square' : 'fa-eye'} text-[10px]`}></i>
                        <span>{editorMode ? 'Studio' : 'Visor'}</span>
                    </button>

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

                    {/* Botón para abrir el menú de selección de los videos */}
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setDrawerOpen(true)}
                        className="bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white px-2 py-1 rounded-lg text-xs font-bold border border-neutral-700 flex items-center gap-1 transition-all">
                        <i className="fa-solid fa-layer-group text-neutral-400 text-[11px]"></i>
                        <span className="font-mono text-[11px]">{vIdx + 1}/{videos.length}</span>
                        <i className="fa-solid fa-chevron-down text-[8px] text-neutral-400"></i>
                    </button>
                </div>
            </header>

            {/* Sub-barra móvil: Selector de marcas/cuentas, carrusel activo y slides */}
            <div className="md:hidden bg-neutral-900/80 border-b border-neutral-800/80 px-3 py-2 flex flex-col gap-2 w-full max-w-[100vw]">
                {/* Píldoras de selección rápida de Marca en Móvil */}
                <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar pb-0.5">
                    <button
                        onClick={() => handleSelectAccount('all')}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border shrink-0 transition-all ${selectedAccount === 'all' ? 'bg-white text-black border-white' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700'}`}>
                        Todas ({videos.length})
                    </button>
                    <button
                        onClick={() => handleSelectAccount('santidev')}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border shrink-0 transition-all flex items-center gap-1 ${selectedAccount === 'santidev' ? 'bg-[#2E9D63] text-white border-[#2E9D63]' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700'}`}>
                        <i className="fa-solid fa-terminal text-[8px]"></i>
                        <span>Santi.Dev</span>
                    </button>
                    <button
                        onClick={() => handleSelectAccount('mova')}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border shrink-0 transition-all flex items-center gap-1 ${selectedAccount === 'mova' ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-sm' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700'}`}>
                        <img src="assets/mova_logo_clean.png" alt="Mova" className="w-3 h-3 rounded-full object-contain" />
                        <span>Mova</span>
                    </button>
                    <button
                        onClick={() => handleSelectAccount('endo')}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border shrink-0 transition-all flex items-center gap-1 ${selectedAccount === 'endo' ? 'bg-[#EE6A3E] text-white border-[#EE6A3E]' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700'}`}>
                        <i className="fa-solid fa-gamepad text-[8px]"></i>
                        <span>Endo</span>
                    </button>
                    <button
                        onClick={() => handleSelectAccount('girastock')}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border shrink-0 transition-all flex items-center gap-1 ${selectedAccount === 'girastock' ? 'bg-[#EDB828] text-black border-[#EDB828]' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700'}`}>
                        <i className="fa-solid fa-database text-[8px]"></i>
                        <span>GiraStock</span>
                    </button>
                </div>

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
            <aside className={`hidden md:flex flex-col bg-neutral-900 border-r border-neutral-800 h-full shrink-0 relative sidebar-transition ${sidebarCollapsed ? 'w-0 border-r-0 overflow-hidden opacity-0 pointer-events-none' : 'w-[335px] opacity-100'}`}>
                {/* Zona superior con scroll independiente */}
                <div className="flex-1 p-4 overflow-y-auto hide-scrollbar flex flex-col">
                    {/* Encabezado y Selector de Modo */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            {account.logo ? (
                                <img src={account.logo} alt={account.name} className="w-5 h-5 rounded-full object-contain bg-white/10 p-0.5 border border-white/20" />
                            ) : (
                                <i className="fa-solid fa-layer-group text-sm" style={{ color: theme.accent }}></i>
                            )}
                            <h1 className="text-sm font-black text-white truncate">{account.name} Studio</h1>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold border border-neutral-700">v4.0</span>
                            <button
                                onClick={() => setSidebarCollapsed(true)}
                                title="Ocultar barra lateral para maximizar el lienzo"
                                className="w-6 h-6 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center text-xs transition-colors">
                                <i className="fa-solid fa-angles-left text-[10px]"></i>
                            </button>
                        </div>
                    </div>

                    {/* INTERRUPTOR PRINCIPAL: MODO NORMAL vs MODO EDITOR STUDIO */}
                    <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800 mb-3 shadow-inner">
                        <button
                            onClick={() => setEditorMode(false)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${!editorMode ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'}`}>
                            <i className="fa-solid fa-eye text-[11px]"></i>
                            <span>Visor HD</span>
                        </button>
                        <button
                            onClick={() => setEditorMode(true)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${editorMode ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow' : 'text-neutral-400 hover:text-amber-400'}`}>
                            <i className="fa-solid fa-pen-to-square text-[11px]"></i>
                            <span>Studio Editor</span>
                        </button>
                    </div>

                    {/* SELECTOR DE MARCA / CUENTA (Píldoras) */}
                    <div className="mb-3">
                        <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                            <span>Marcas & Proyectos</span>
                            <span className="font-mono text-[9px] text-neutral-500">{selectedAccount === 'all' ? 'Todas' : account.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            <button
                                onClick={() => handleSelectAccount('all')}
                                className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all ${selectedAccount === 'all' ? 'bg-white text-black border-white' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700 hover:text-white'}`}>
                                Todas ({videos.length})
                            </button>
                            <button
                                onClick={() => handleSelectAccount('santidev')}
                                className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1 ${selectedAccount === 'santidev' ? 'bg-[#2E9D63] text-white border-[#2E9D63]' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700 hover:text-white'}`}>
                                <i className="fa-solid fa-terminal text-[9px]"></i>
                                <span>Santi.Dev</span>
                            </button>
                            <button
                                onClick={() => handleSelectAccount('mova')}
                                className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1.5 ${selectedAccount === 'mova' ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-md' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700 hover:text-white'}`}>
                                <img src="assets/mova_logo_clean.png" alt="Mova" className="w-3.5 h-3.5 rounded-full object-contain" />
                                <span>Mova</span>
                            </button>
                            <button
                                onClick={() => handleSelectAccount('endo')}
                                className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1 ${selectedAccount === 'endo' ? 'bg-[#EE6A3E] text-white border-[#EE6A3E]' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700 hover:text-white'}`}>
                                <i className="fa-solid fa-gamepad text-[9px]"></i>
                                <span>The Last Endo</span>
                            </button>
                            <button
                                onClick={() => handleSelectAccount('girastock')}
                                className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1 ${selectedAccount === 'girastock' ? 'bg-[#EDB828] text-black border-[#EDB828]' : 'bg-neutral-800/80 text-neutral-400 border-neutral-700 hover:text-white'}`}>
                                <i className="fa-solid fa-database text-[9px]"></i>
                                <span>GiraStock</span>
                            </button>
                        </div>
                    </div>

                    {/* CAJA DE MARCA ESPECIAL PARA MOVA CUANDO ESTÁ SELECCIONADA O EN SU VIDEO */}
                    {(selectedAccount === 'mova' || account.id === 'mova') && (
                        <div className="p-3 mb-3 rounded-xl bg-gradient-to-r from-[#05163F] to-[#0A1F4A] border border-[#3B82F6]/50 shadow-lg flex items-center gap-2.5">
                            <img src="assets/mova_logo_clean.png" alt="Mova" className="w-8 h-8 rounded-full bg-white/10 p-0.5 border border-white/20 shrink-0 object-contain" />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-black text-white text-xs truncate">Mova App</span>
                                    <span className="text-[9px] font-bold px-1.5 rounded bg-amber-500/20 text-orange-400 border border-amber-500/30">BETA v2.0</span>
                                </div>
                                <div className="text-[10px] text-blue-200 truncate">Rompiendo el silencio · IA en vivo</div>
                                <div className="text-[9px] font-mono text-neutral-400">@mova.app · Capacitor Android & PWA</div>
                            </div>
                        </div>
                    )}

                    {/* Botón de acceso al Kit de Publicación */}
                    <button
                        id="btn-open-postkit"
                        onClick={() => setPostKitOpen(true)}
                        className="w-full mb-3 py-2 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-950/80 via-neutral-900 to-indigo-950/80 hover:from-purple-900/90 hover:to-indigo-900/90 border border-purple-500/40 text-purple-200 flex items-center justify-between shadow-lg transition-all active:scale-[0.98] group">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-clipboard-list text-purple-400 group-hover:scale-110 transition-transform"></i>
                            <span className="text-white font-black text-xs">Kit de Publicación</span>
                        </div>
                        <span className="text-[9px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-400/30">
                            Copy & Tags
                        </span>
                    </button>

                    {/* Selector de formato para escritorio */}
                    <div className="mb-3">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                            <span>Formato de salida</span>
                            <span className="font-mono text-neutral-400 text-[10px]">{format === 'instagram' ? '1080 × 1350' : '1080 × 1920'}</span>
                        </label>
                        <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                            <button
                                id="fmt-btn-tiktok"
                                onClick={() => setFormat('tiktok')}
                                title="TikTok / Reels 9:16 (1080×1920)"
                                className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-all ${format === 'tiktok' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'}`}>
                                <i className="fa-brands fa-tiktok"></i>
                                <span>TikTok 9:16</span>
                            </button>
                            <button
                                id="fmt-btn-instagram"
                                onClick={() => setFormat('instagram')}
                                title="Instagram Feed 4:5 (1080×1350)"
                                className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-all ${format === 'instagram' ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow' : 'text-neutral-400 hover:text-white'}`}>
                                <i className="fa-brands fa-instagram"></i>
                                <span>Instagram 4:5</span>
                            </button>
                        </div>
                    </div>

                    {/* Lista de Carruseles Filtrados */}
                    {(() => {
                        const filtered = videos.map((v, i) => ({ v, i })).filter(({ v }) => {
                            if (selectedAccount === 'all') return true;
                            return window.getAccountForVideo(v).id === selectedAccount;
                        });
                        const groups = [...new Set(filtered.map((item) => item.v.group))];
                        return groups.map((grpName) => {
                            const list = filtered.filter((item) => item.v.group === grpName);
                            return (
                                <div key={grpName} className="mb-3">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                                        <span>{grpName}</span>
                                        <span className="font-mono text-[9px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">{list.length}</span>
                                    </div>
                                    {list.map(({ v, i }) => {
                                        const vAcc = window.getAccountForVideo(v);
                                        return (
                                            <div key={v.id} className="mb-1.5">
                                                <button
                                                    id={`video-btn-${v.id}`}
                                                    onClick={() => { setVIdx(i); setSIdx(0); }}
                                                    className={`w-full text-left p-2.5 rounded-lg transition-all ${vIdx === i ? 'bg-white text-black font-semibold shadow' : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'}`}>
                                                    <div className="flex items-center justify-between gap-1">
                                                        <div className="flex items-center gap-2 text-xs font-bold truncate">
                                                            <span style={{ width: 8, height: 8, borderRadius: 2, background: window.THEMES[v.theme].accent, flexShrink: 0 }} />
                                                            <span className="truncate">{v.title}</span>
                                                        </div>
                                                        <span className={`text-[9px] font-mono px-1 rounded ${vIdx === i ? 'bg-neutral-200 text-neutral-800' : 'text-neutral-400 bg-neutral-900'}`}>{vAcc.handle}</span>
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
                                        );
                                    })}
                                </div>
                            );
                        });
                    })()}
                </div>

                {/* Botonera fija inferior en la barra lateral */}
                <div className="p-3.5 bg-neutral-900 border-t border-neutral-800 flex flex-col gap-2 shrink-0 shadow-2xl">
                    {editorMode && (
                        <button
                            onClick={() => setSyncModalOpen(true)}
                            className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]">
                            <i className="fa-brands fa-github text-sm"></i>
                            <span>Guardar en GitHub & Vercel</span>
                        </button>
                    )}
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
                className={`flex-1 flex flex-col items-center p-3 md:p-5 overflow-y-auto overflow-x-hidden hide-scrollbar gap-2.5 w-full max-w-[100vw] ${canvaMode ? 'canva-desk' : 'bg-[#0a0a0a]'}`}
                style={{ justifyContent: 'safe center' }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}>

                {/* Botón flotante para reabrir barra lateral si está colapsada en escritorio */}
                {sidebarCollapsed && (
                    <button
                        onClick={() => setSidebarCollapsed(false)}
                        title="Mostrar barra lateral (carruseles y marcas)"
                        className="hidden md:flex fixed top-4 left-4 z-40 px-3 py-1.5 rounded-xl bg-neutral-900/95 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 shadow-xl items-center gap-2 text-xs font-bold transition-all active:scale-95 backdrop-blur-md">
                        <i className="fa-solid fa-bars text-amber-400"></i>
                        <span>Menú</span>
                    </button>
                )}

                {/* BANNER SUPERIOR DE STUDIO EDITOR CUANDO ESTÁ ACTIVO */}
                {editorMode && (
                    <div className="w-full max-w-2xl bg-neutral-950/95 border border-amber-500/40 rounded-2xl p-2.5 md:p-3 mb-1 shadow-xl flex items-center justify-between gap-2 studio-glow-amber shrink-0">
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse-glow shrink-0"></span>
                            <span className="text-xs font-black text-amber-300 uppercase tracking-wider truncate">Studio Editor Activo</span>
                            <span className="text-[10px] text-neutral-400 hidden sm:inline">· Edición en vivo</span>
                            {hasCustomEdits && (
                                <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/30 font-mono shrink-0">Modificado</span>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {/* Toggle para mostrar/ocultar barra lateral */}
                            <button
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                title={sidebarCollapsed ? "Mostrar barra lateral" : "Ocultar barra lateral"}
                                className="hidden md:flex px-2 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-[11px] font-semibold border border-neutral-700 items-center gap-1 transition-all">
                                <i className={`fa-solid ${sidebarCollapsed ? 'fa-bars text-amber-400' : 'fa-angles-left'}`}></i>
                                <span>{sidebarCollapsed ? 'Barra' : 'Ocultar'}</span>
                            </button>
                            {/* Toggle para mesa estilo Canva (fondo blanco) */}
                            <button
                                onClick={() => setCanvaMode(!canvaMode)}
                                title={canvaMode ? "Cambiar a mesa oscura" : "Mesa estilo Canva (fondo blanco)"}
                                className={`hidden md:flex px-2 py-1 rounded-lg text-[11px] font-semibold border items-center gap-1 transition-all ${canvaMode ? 'bg-white text-black border-white shadow' : 'bg-neutral-900 text-neutral-300 border-neutral-700'}`}>
                                <i className={`fa-solid ${canvaMode ? 'fa-palette text-amber-500' : 'fa-moon text-blue-400'}`}></i>
                                <span>{canvaMode ? 'Canva' : 'Dark'}</span>
                            </button>
                            {hasCustomEdits && (
                                <button
                                    onClick={resetToOriginals}
                                    title="Restaurar a la versión original de fábrica"
                                    className="px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-semibold transition-all">
                                    <i className="fa-solid fa-rotate-left mr-1"></i>
                                    <span className="hidden sm:inline">Restaurar</span>
                                </button>
                            )}
                            <button
                                onClick={() => setSyncModalOpen(true)}
                                className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all">
                                <i className="fa-brands fa-github text-xs"></i>
                                <span>Guardar GitHub</span>
                            </button>
                            <button
                                onClick={() => setEditorMode(false)}
                                className="px-2 py-1 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-bold transition-all"
                                title="Volver a modo visor normal">
                                <i className="fa-solid fa-eye mr-1"></i>
                                <span>Visor</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Barra de control superior de la diapositiva (formato + navegación + zoom) */}
                <div
                    className={`flex items-center justify-between text-xs px-1 w-full shrink-0 ${canvaMode ? 'text-neutral-700' : 'text-neutral-400'}`}
                    style={{ maxWidth: Math.max(scaledW, 360) }}>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className={`w-2 h-2 rounded-full ${format === 'instagram' ? 'bg-rose-500' : 'bg-cyan-400'}`}></span>
                        <span className={`font-bold uppercase ${canvaMode ? 'text-neutral-900' : 'text-white'}`}>{format}</span>
                        <span className={canvaMode ? 'text-neutral-500' : 'text-neutral-500'}>· {format === 'instagram' ? '1080×1350' : '1080×1920'}</span>
                    </div>

                    {/* Controles de vista y slides en escritorio */}
                    <div className="flex items-center gap-2">
                        {/* Selector rápido de slides en escritorio */}
                        <div className={`hidden md:flex items-center gap-1 border rounded-lg p-0.5 ${canvaMode ? 'bg-white/90 border-neutral-300 shadow-sm' : 'bg-neutral-900 border-neutral-800'}`}>
                            {video.slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSIdx(idx)}
                                    className={`w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-all ${sIdx === idx ? (canvaMode ? 'bg-neutral-900 text-white shadow' : 'bg-white text-black') : (canvaMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white')}`}>
                                    {idx + 1}
                                </button>
                            ))}
                        </div>

                        {/* Toggle de ajuste a pantalla (Fit) vs 100% */}
                        <div className={`hidden md:flex border rounded-lg p-0.5 text-[10px] font-mono ${canvaMode ? 'bg-white/90 border-neutral-300 shadow-sm' : 'bg-neutral-900 border-neutral-800'}`}>
                            <button
                                onClick={() => setFitView(true)}
                                className={`px-2 py-0.5 rounded font-bold transition-all ${fitView ? (canvaMode ? 'bg-neutral-900 text-white' : 'bg-neutral-700 text-white') : (canvaMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white')}`}
                                title="Ajusta la diapositiva completa a la altura visible de la pantalla">
                                Ajustar
                            </button>
                            <button
                                onClick={() => setFitView(false)}
                                className={`px-2 py-0.5 rounded font-bold transition-all ${!fitView ? (canvaMode ? 'bg-neutral-900 text-white' : 'bg-neutral-700 text-white') : (canvaMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white')}`}
                                title="Tamaño natural 100%">
                                100%
                            </button>
                        </div>

                        {/* Botón rápido para alternar mesa Canva si editorMode está inactivo */}
                        {!editorMode && (
                            <button
                                onClick={() => setCanvaMode(!canvaMode)}
                                className={`hidden md:flex px-2 py-1 rounded-lg text-xs font-bold items-center gap-1.5 transition-all border ${canvaMode ? 'bg-white text-neutral-800 border-neutral-300 shadow-sm hover:bg-neutral-50' : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'}`}
                                title="Alternar entre Mesa Canva (Fondo Blanco) y Modo Oscuro">
                                <i className={`fa-solid ${canvaMode ? 'fa-palette text-amber-500' : 'fa-moon text-blue-400'}`}></i>
                                <span>{canvaMode ? 'Canva' : 'Dark'}</span>
                            </button>
                        )}

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
                    className={`text-[11px] font-mono flex justify-between px-1 w-full shrink-0 ${canvaMode ? 'text-neutral-600' : 'text-neutral-500'}`}
                    style={{ maxWidth: Math.max(scaledW, 360) }}>
                    <span>{isMova ? '@mova.app · Rompiendo el silencio' : `${slide.type} · ${slide.layout} · ${slide.tone || 'white'}`}</span>
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
            {/* STUDIO INSPECTOR EN ESCRITORIO (>= 768px)                      */}
            {/* ============================================================== */}
            {editorMode && (
                <div className="hidden md:flex h-full shrink-0">
                    <StudioInspector
                        video={video}
                        slide={slide}
                        sIdx={sIdx}
                        theme={theme}
                        account={account}
                        updateActiveSlide={updateActiveSlide}
                        updateActiveVideoMeta={updateActiveVideoMeta}
                        onSyncGitHub={() => setSyncModalOpen(true)}
                        hasCustomEdits={hasCustomEdits}
                        onReset={resetToOriginals}
                    />
                </div>
            )}

            {/* BOTÓN FLOTANTE MÓVIL PARA ABRIR STUDIO INSPECTOR */}
            {editorMode && (
                <button
                    id="btn-open-mobile-inspector"
                    onClick={() => setMobileEditorOpen(true)}
                    className="md:hidden fixed bottom-20 right-3 z-40 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs shadow-2xl flex items-center gap-2 active:scale-95 border border-amber-300/40">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span>Editar Slide {sIdx + 1}</span>
                </button>
            )}

            {/* BOTTOM SHEET / DRAWER DEL STUDIO INSPECTOR EN MÓVIL */}
            {mobileEditorOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/85 backdrop-blur-sm animate-fadeIn">
                    <div className="flex-1" onClick={() => setMobileEditorOpen(false)}></div>
                    <div className="h-[84vh] w-full bg-neutral-900 border-t border-neutral-700 rounded-t-2xl overflow-hidden shadow-2xl flex flex-col">
                        <StudioInspector
                            video={video}
                            slide={slide}
                            sIdx={sIdx}
                            theme={theme}
                            account={account}
                            updateActiveSlide={updateActiveSlide}
                            updateActiveVideoMeta={updateActiveVideoMeta}
                            onSyncGitHub={() => { setMobileEditorOpen(false); setSyncModalOpen(true); }}
                            hasCustomEdits={hasCustomEdits}
                            onReset={resetToOriginals}
                            onCloseMobile={() => setMobileEditorOpen(false)}
                        />
                    </div>
                </div>
            )}

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
            {/* MODALES MODULARIZADOS Y DESACOPLADOS (js/modals.js)            */}
            {/* ============================================================== */}
            <window.ExportModal
                exportModal={exportModal}
                setExportModal={setExportModal}
                setPostKitOpen={setPostKitOpen}
                isMobileDevice={isMobileDevice}
            />

            <window.MobileDrawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                selectedAccount={selectedAccount}
                onSelectAccount={handleSelectAccount}
                videos={videos}
                vIdx={vIdx}
                onSelectVideo={(i) => {
                    setVIdx(i);
                    setSIdx(0);
                }}
                account={account}
            />

            <window.PostKitModal
                postKitOpen={postKitOpen}
                setPostKitOpen={setPostKitOpen}
                activeVideo={video}
                copiedKey={copiedKey}
                onCopy={handleCopy}
            />

            <window.GitHubSyncModal
                syncModalOpen={syncModalOpen}
                setSyncModalOpen={setSyncModalOpen}
                ghToken={ghToken}
                setGhToken={setGhToken}
                commitMsg={commitMsg}
                setCommitMsg={setCommitMsg}
                ghStatus={ghStatus}
                setGhStatus={setGhStatus}
                ghMessage={ghMessage}
                onSyncToGitHub={handleSyncToGitHub}
            />
        </div>
    );
};

// Montaje principal en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
