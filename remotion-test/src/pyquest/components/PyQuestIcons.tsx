import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Icono de Advertencia / Warning */
export const IconWarning: React.FC<IconProps> = ({ size = 24, color = "#BE123C", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 3L2 20H22L12 3Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 9V13" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.25" fill={color} />
  </svg>
);

/** Icono de Explosión / Crash / Error */
export const IconCrash: React.FC<IconProps> = ({ size = 24, color = "#EF4444", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 2L14.5 7.5L20 5.5L18 11L23 13.5L17.5 16L19 22L13.5 18.5L10 23L9 17L3 18L6 12.5L1 9.5L7 8L6 2L11 6.5L12 2Z"
      fill={color}
      opacity="0.2"
    />
    <path
      d="M12 2L14.5 7.5L20 5.5L18 11L23 13.5L17.5 16L19 22L13.5 18.5L10 23L9 17L3 18L6 12.5L1 9.5L7 8L6 2L11 6.5L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

/** Icono Prohibido / Bloqueo */
export const IconProhibited: React.FC<IconProps> = ({ size = 24, color = "#B91C1C", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2.5" />
    <path d="M5.6 5.6L18.4 18.4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/** Icono Cerebro / Lógica / Memoria */
export const IconBrain: React.FC<IconProps> = ({ size = 24, color = "#0284C7", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M9.5 4C7.5 4 6 5.5 6 7.5C4.5 8 3.5 9.5 3.5 11C3.5 12.5 4.5 13.5 5 14C4.5 15 4.5 16.5 5.5 17.5C6.5 18.5 8 18.5 9 18C9.5 19.5 11 20 12 20M14.5 4C16.5 4 18 5.5 18 7.5C19.5 8 20.5 9.5 20.5 11C20.5 12.5 19.5 13.5 19 14C19.5 15 19.5 16.5 18.5 17.5C17.5 18.5 16 18.5 15 18C14.5 19.5 13 20 12 20M12 4V20"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Icono Caja / Variable de Memoria */
export const IconBox: React.FC<IconProps> = ({ size = 24, color = "#0284C7", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 3L21 7.5V16.5L12 21L3 16.5V7.5L12 3Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M12 12L21 7.5M12 12V21M12 12L3 7.5" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M7.5 5.25L16.5 9.75" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

/** Icono ADN / Tipos de Datos */
export const IconDna: React.FC<IconProps> = ({ size = 24, color = "#7C3AED", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M4 4C8 8 16 8 20 4M4 20C8 16 16 16 20 20M6 8.5C10 11 14 11 18 8.5M6 15.5C10 13 14 13 18 15.5"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="6" cy="6" r="2" fill={color} />
    <circle cx="18" cy="6" r="2" fill={color} />
    <circle cx="6" cy="18" r="2" fill={color} />
    <circle cx="18" cy="18" r="2" fill={color} />
  </svg>
);

/** Icono Etiqueta / String */
export const IconTag: React.FC<IconProps> = ({ size = 24, color = "#F59E0B", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M20.59 13.41L13.42 20.58C12.64 21.36 11.37 21.36 10.59 20.58L3.41 13.41C2.63 12.63 2.63 11.36 3.41 10.58L10.59 3.41C11.37 2.63 12.64 2.63 13.42 3.41L20.59 10.58C21.37 11.36 21.37 12.63 20.59 13.41Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="15.5" cy="8.5" r="2" fill={color} />
  </svg>
);

/** Icono Corazón / Integer / Vida */
export const IconHeart: React.FC<IconProps> = ({ size = 24, color = "#EF4444", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

/** Icono Rayo / Float / Crítico */
export const IconBolt: React.FC<IconProps> = ({ size = 24, color = "#3B82F6", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Icono Escudo / Boolean / Defensa */
export const IconShield: React.FC<IconProps> = ({ size = 24, color = "#8B5CF6", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2Z"
      fill={color}
      opacity="0.2"
    />
    <path
      d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 11.5L11.5 14L15.5 9.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Icono Espadas Cruzadas / Combate */
export const IconSwords: React.FC<IconProps> = ({ size = 24, color = "#3B82F6", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M14.5 17.5L3 6V3H6L17.5 14.5M14.5 17.5L18 21L21 18L17.5 14.5M14.5 17.5L17.5 14.5M6 21L9.5 17.5M17.5 6.5L21 3H18L6.5 14.5M6.5 14.5L3 18L6 21L9.5 17.5M6.5 14.5L9.5 17.5"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Icono Mapa / Roadmap */
export const IconMap: React.FC<IconProps> = ({ size = 24, color = "#3B82F6", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 3V18M15 6V21" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Icono Guardar / Bookmark */
export const IconBookmark: React.FC<IconProps> = ({ size = 24, color = "#1D4ED8", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M19 21L12 16L5 21V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V21Z"
      fill={color}
      opacity="0.25"
    />
    <path
      d="M19 21L12 16L5 21V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V21Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Icono Comentar / Chat */
export const IconComment: React.FC<IconProps> = ({ size = 24, color = "#1D4ED8", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Icono Seguir / Plus */
export const IconPlus: React.FC<IconProps> = ({ size = 24, color = "#FFFFFF", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Icono Check / Completado */
export const IconCheck: React.FC<IconProps> = ({ size = 24, color = "#10B981", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M5 13L9 17L19 7" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Icono Flecha Derecha */
export const IconArrowRight: React.FC<IconProps> = ({ size = 24, color = "#34D399", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Icono Mochila / Inventario */
export const IconBackpack: React.FC<IconProps> = ({ size = 24, color = "#10B981", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M6 10V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V10C18 7.24 15.76 5 13 5H11C8.24 5 6 7.24 6 10Z"
      stroke={color}
      strokeWidth="2.2"
    />
    <path d="M9 5V3C9 2.45 9.45 2 10 2H14C14.55 2 15 2.45 15 3V5" stroke={color} strokeWidth="2.2" />
    <path d="M9 14H15" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** Icono Bucle / Loop */
export const IconLoop: React.FC<IconProps> = ({ size = 24, color = "#F59E0B", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M17 2L21 6M21 6L17 10M21 6H8C5.79 6 4 7.79 4 10V11M7 22L3 18M3 18L7 14M3 18H16C18.21 18 20 16.21 20 14V13"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Icono Destellos / Poderes */
export const IconSparkles: React.FC<IconProps> = ({ size = 24, color = "#8B5CF6", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
      fill={color}
      opacity="0.25"
    />
    <path
      d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M19 16L19.9 19.1L23 20L19.9 20.9L19 24L18.1 20.9L15 20L18.1 19.1L19 16Z" fill={color} />
  </svg>
);
