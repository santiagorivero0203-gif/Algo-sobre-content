/**
 * =====================================================================
 * MULTI-ACCOUNT BRAND SYSTEM · SISTEMA DE MARCAS & CUENTAS
 * =====================================================================
 * Define los contenedores independientes para cada proyecto/marca:
 *   - Santi.Dev: Contenido técnico, arquitectura y desarrollo indie.
 *   - Mova: IA de accesibilidad, traducción de lengua de señas ("Rompiendo el silencio").
 *   - The Last Endo: Devlog y gameplay del videojuego indie pixel art.
 *   - GiraStock: Automatización B2B, inventarios y software de gestión.
 *
 * Cada cuenta gobierna de forma automática su:
 *   - Handle oficial (@mova.app, @santi.dev, etc.)
 *   - Logotipo e isotipo oficial
 *   - Paleta de color insignia
 *   - Tema predeterminado y badges de cabecera/pie
 * =====================================================================
 */

window.ACCOUNTS = {
    santidev: {
        id: 'santidev',
        name: 'Santi.Dev',
        handle: '@santi.dev',
        icon: 'terminal',
        logo: null,
        color: '#2E9D63',
        bg: '#0c0c0c',
        surface: '#181818',
        badge: 'DEV & ARQUITECTURA',
        tagline: 'De la Idea al Código · IA & Arquitectura de Software',
        defaultTheme: 'tokens_pro',
        defaultCTA: 'Sígueme en @santi.dev para más arquitectura, agentes IA y desarrollo moderno.',
        hashtags: ['#programacion', '#desarrolloweb', '#ia', '#antigravity', '#devlife', '#codingtips'],
    },
    mova: {
        id: 'mova',
        name: 'Mova',
        handle: '@mova.app',
        icon: 'hand',
        logo: 'assets/mova_logo_clean.png',
        logoMark: 'assets/mova_logo_mark.png',
        logoSymbol: 'assets/mova_icon_symbol.png',
        logoFull: 'assets/mova_logo_clean.png',
        logoSlogan: 'assets/mova_logo_clean.png',
        color: '#3B82F6',
        colorGlow: '#FFA500',
        colorHand: '#4ECCA3',
        bg: '#05163F',
        surface: '#0A1F4A',
        surfaceSecondary: '#0C265A',
        badge: 'ACCESIBILIDAD & IA',
        tagline: 'Rompiendo el silencio · IA en tiempo real para Lengua de Señas',
        defaultTheme: 'mova',
        defaultCTA: 'Prueba la beta de Mova, comparte y construyamos juntos un mundo sin barreras.',
        hashtags: ['#mova', '#lenguajedeseñas', '#accesibilidad', '#inclusión', '#ia', '#mediapipe', '#reactjs', '#capacitorjs', '#tecnología'],
    },
    endo: {
        id: 'endo',
        name: 'The Last Endo',
        handle: '@thelastendo',
        icon: 'gamepad',
        logo: null,
        color: '#EE6A3E',
        bg: '#140827',
        surface: '#200e3a',
        badge: 'INDIE GAME DEV',
        tagline: 'The Last Endo · Terror psicológico, pixel art y sigilo',
        defaultTheme: 'pixel_arcade',
        defaultCTA: 'Añade The Last Endo a tu Wishlist y sigue el devlog en @thelastendo.',
        hashtags: ['#gamedev', '#indiedev', '#pixelart', '#thelastendo', '#horror', '#stealthgame'],
    },
    girastock: {
        id: 'girastock',
        name: 'GiraStock',
        handle: '@girastock',
        icon: 'database',
        logo: null,
        color: '#EDB828',
        bg: '#0c0c0c',
        surface: '#1a1810',
        badge: 'B2B & GESTIÓN',
        tagline: 'GiraStock · Inventarios y facturación automatizada en tiempo récord',
        defaultTheme: 'gira',
        defaultCTA: 'Automatiza el inventario de tu negocio con GiraStock. Escríbenos por DM.',
        hashtags: ['#softwareb2b', '#automatizacion', '#pymes', '#facturacion', '#desarrolloweb'],
    },
};

/**
 * Función auxiliar para obtener la cuenta vinculada a un video con fallback seguro.
 * @param {Object} video - El objeto de video actual.
 * @returns {Object} La cuenta correspondiente.
 */
window.getAccountForVideo = (video) => {
    if (!video) return window.ACCOUNTS.santidev;
    if (video.accountId && window.ACCOUNTS[video.accountId]) {
        return window.ACCOUNTS[video.accountId];
    }
    // Detección retrospectiva por ID o tema si no tiene accountId explícito
    if (video.id === 'mova' || video.theme === 'mova') return window.ACCOUNTS.mova;
    if (video.id === 'endo' || video.theme === 'endo') return window.ACCOUNTS.endo;
    if (video.id === 'gira' || video.theme === 'gira') return window.ACCOUNTS.girastock;
    return window.ACCOUNTS.santidev;
};
