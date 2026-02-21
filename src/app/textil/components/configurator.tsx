"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import { openWhatsApp } from "@/lib/utils";
import {
  Shirt,
  Palette,
  Ruler,
  Upload,
  Type,
  Send,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Sparkles,
  Image as ImageIcon,
  Loader2,
  Eye,
  Move,
  Crosshair,
} from "lucide-react";
const PREVIEW_CHEST = { x: 0.35, y: 0.32, w: 0.3, h: 0.36 };

const MOCKUPS = {
  polera: {
    negro: "/mockups/poleras/negro.png",
    blanco: "/mockups/poleras/blanco.png",
    rojo: "/mockups/poleras/rojo.png",
    gris: "/mockups/poleras/gris.png",
    azul_marino: "/mockups/poleras/azul_marino.png",
    default: "/mockups/poleras/blanco.png",
  },
  poleron: {
    negro: "/mockups/polerones/poleron_negro.png",
    blanco: "/mockups/polerones/poleron_blanco.png",
    rojo: "/mockups/polerones/poleron_rojo.png",
    gris: "/mockups/polerones/poleron_gris.png",
    azul_marino: "/mockups/polerones/poleron_azul_marino.png",
    default: "/mockups/polerones/poleron_blanco.png",
  },
};

const normalizeLabel = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

const getMockupSrc = (productName?: string, colorName?: string) => {
  const productKey = normalizeLabel(productName || "");
  const colorKey = normalizeLabel(colorName || "");
  if (productKey.includes("poleron")) {
    return MOCKUPS.poleron[colorKey as keyof typeof MOCKUPS.poleron] || MOCKUPS.poleron.default;
  }
  return MOCKUPS.polera[colorKey as keyof typeof MOCKUPS.polera] || MOCKUPS.polera.default;
};

const getProductPreviewImage = (productName?: string) => {
  const productKey = normalizeLabel(productName || "");
  if (productKey.includes("poleron")) {
    return MOCKUPS.poleron.blanco;
  }
  return MOCKUPS.polera.blanco;
};

const STEPS = [
  { id: 0, label: "Producto", icon: Shirt },
  { id: 1, label: "Color", icon: Palette },
  { id: 2, label: "Talla", icon: Ruler },
  { id: 3, label: "Logo", icon: Upload },
  { id: 4, label: "Texto", icon: Type },
  { id: 5, label: "Enviar", icon: Send },
];

// Helpers de color
function darken(hex: string, amt: number) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amt);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amt);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amt);
  return `rgb(${r},${g},${b})`;
}
function lighten(hex: string, amt: number) {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amt);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amt);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amt);
  return `rgb(${r},${g},${b})`;
}
function hexAlpha(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// SVG polera 3D fotorrealista
function TShirtSVG({
  color,
  logoUrl,
  customText,
  isLight,
  logoScale = 1,
  logoPosition = { x: 0.5, y: 0.25 },
  showGrid = false,
  onPickPosition,
}: {
  color: string;
  logoUrl: string | null;
  customText: string;
  isLight: boolean;
  logoScale?: number;
  logoPosition?: { x: number; y: number };
  showGrid?: boolean;
  onPickPosition?: (pos: { x: number; y: number }) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  const chest = { x: 140, y: 160, w: 120, h: 185 };

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const imgSize = 90 * logoScale;
  const imgX = chest.x + chest.w * logoPosition.x - imgSize / 2;
  const imgY = chest.y + chest.h * logoPosition.y - imgSize / 2;
  const textX = clamp(chest.x + chest.w * logoPosition.x, chest.x + 12, chest.x + chest.w - 12);
  const textY = clamp(
    (logoUrl ? imgY + imgSize + 26 : chest.y + chest.h * (logoPosition.y + 0.08)),
    chest.y + 18,
    chest.y + chest.h - 18
  );

  const handlePick = (e: React.PointerEvent<SVGRectElement>) => {
    if (!onPickPosition || !svgRef.current) return;
    const bounds = svgRef.current.getBoundingClientRect();
    const relX = (e.clientX - bounds.left) / bounds.width;
    const relY = (e.clientY - bounds.top) / bounds.height;
    const chestX = chest.x / 400;
    const chestY = chest.y / 480;
    const chestW = chest.w / 400;
    const chestH = chest.h / 480;
    const normalizedX = Math.min(1, Math.max(0, (relX - chestX) / chestW));
    const normalizedY = Math.min(1, Math.max(0, (relY - chestY) / chestH));
    onPickPosition({ x: normalizedX, y: normalizedY });
  };

  // Color palette for realistic lighting
  const s1 = darken(color, 12);
  const s2 = darken(color, 28);
  const s3 = darken(color, 48);
  const hi = lighten(color, 22);
  const hi2 = lighten(color, 45);
  const collarColor = darken(color, 16);
  const stitch = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)";
  const edgeStroke = isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.32)";
  const edgeOpacity = isLight ? 0.2 : 0.45;

  // Paths reutilizables - forma de polera realista
  // Cuerpo: silueta tipo oversize con hombros marcados y caída natural
  const bodyPath = "M155,120 L110,120 C98,120 90,132 88,146 L86,210 Q84,330 100,402 Q122,435 200,442 Q278,435 300,402 Q316,330 314,210 L312,146 C310,132 302,120 290,120 L245,120 Q225,92 200,92 Q175,92 155,120 Z";
  // Manga izq: corta, ancha, caída suave
  const sleeveL = "M110,120 L68,136 Q48,146 42,170 L34,210 Q30,228 46,238 L90,226 Q114,222 122,202 L124,166 Q126,140 110,120 Z";
  // Manga der: espejo
  const sleeveR = "M290,120 L332,136 Q352,146 358,170 L366,210 Q370,228 354,238 L310,226 Q286,222 278,202 L276,166 Q274,140 290,120 Z";

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 480"
      className="w-full h-auto"
    >
      <defs>
        {/* Sombra profesional de estudio - doble capa */}
        <filter id="shirtShadow" x="-12%" y="-6%" width="124%" height="118%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="s1" />
          <feOffset in="s1" dx="0" dy="10" result="s1o" />
          <feFlood floodColor="#000" floodOpacity="0.18" result="s1c" />
          <feComposite in="s1c" in2="s1o" operator="in" result="s1f" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="s2" />
          <feOffset in="s2" dx="0" dy="4" result="s2o" />
          <feFlood floodColor="#000" floodOpacity="0.1" result="s2c" />
          <feComposite in="s2c" in2="s2o" operator="in" result="s2f" />
          <feMerge>
            <feMergeNode in="s1f" />
            <feMergeNode in="s2f" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip de la silueta completa para overlays */}
        <clipPath id="bodyClip">
          <path d={bodyPath} />
          <path d={sleeveL} />
          <path d={sleeveR} />
        </clipPath>

        {/* === ILUMINACIÓN DE ESTUDIO === */}

        {/* Luz principal cenital - simula softbox arriba */}
        <radialGradient id="topLight" cx="0.5" cy="0.08" r="0.7" fx="0.48" fy="0.05">
          <stop offset="0%" stopColor={hi2} stopOpacity="0.32" />
          <stop offset="30%" stopColor={hi} stopOpacity="0.14" />
          <stop offset="65%" stopColor={color} stopOpacity="0" />
          <stop offset="100%" stopColor={s2} stopOpacity="0.15" />
        </radialGradient>

        {/* Sombra lateral izq - forma cilíndrica del torso */}
        <linearGradient id="edgeL" x1="0" y1="0.3" x2="0.38" y2="0.3">
          <stop offset="0%" stopColor={s3} stopOpacity="0.6" />
          <stop offset="40%" stopColor={s2} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Sombra lateral der */}
        <linearGradient id="edgeR" x1="1" y1="0.3" x2="0.62" y2="0.3">
          <stop offset="0%" stopColor={s3} stopOpacity="0.6" />
          <stop offset="40%" stopColor={s2} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Franja central de luz (forma cilíndrica) */}
        <linearGradient id="centerStrip" x1="0.3" y1="0.5" x2="0.7" y2="0.5">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="30%" stopColor={hi} stopOpacity="0.06" />
          <stop offset="50%" stopColor={hi2} stopOpacity="0.14" />
          <stop offset="70%" stopColor={hi} stopOpacity="0.06" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Gradiente inferior (peso visual) */}
        <linearGradient id="bottomWeight" x1="0.5" y1="0.72" x2="0.5" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={s1} stopOpacity="0.08" />
          <stop offset="100%" stopColor={s2} stopOpacity="0.28" />
        </linearGradient>

        {/* Sombra bajo cuello */}
        <radialGradient id="neckShadow" cx="0.5" cy="0.0" r="0.45">
          <stop offset="0%" stopColor={s3} stopOpacity="0.22" />
          <stop offset="45%" stopColor={s2} stopOpacity="0.08" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>

        {/* Highlight hombro izq */}
        <linearGradient id="shoulderL" x1="0.15" y1="0" x2="0.5" y2="0.35">
          <stop offset="0%" stopColor={hi2} stopOpacity="0.22" />
          <stop offset="60%" stopColor={hi} stopOpacity="0.05" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Highlight hombro der */}
        <linearGradient id="shoulderR" x1="0.85" y1="0" x2="0.5" y2="0.35">
          <stop offset="0%" stopColor={hi2} stopOpacity="0.22" />
          <stop offset="60%" stopColor={hi} stopOpacity="0.05" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Sombra manga izq */}
        <linearGradient id="sleeveShadeL" x1="0" y1="0.25" x2="0.75" y2="0.45">
          <stop offset="0%" stopColor={s3} stopOpacity="0.5" />
          <stop offset="45%" stopColor={s2} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Sombra manga der */}
        <linearGradient id="sleeveShadeR" x1="1" y1="0.25" x2="0.25" y2="0.45">
          <stop offset="0%" stopColor={s3} stopOpacity="0.5" />
          <stop offset="45%" stopColor={s2} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Sombra interior sisa izq */}
        <radialGradient id="armholeL" cx="0.85" cy="0.35" r="0.55">
          <stop offset="0%" stopColor={s3} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>

        {/* Sombra interior sisa der */}
        <radialGradient id="armholeR" cx="0.15" cy="0.35" r="0.55">
          <stop offset="0%" stopColor={s3} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>

        {/* Gradiente cuello (profundidad de la tela ribeteada) */}
        <linearGradient id="collarDepth" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={hi} stopOpacity="0.35" />
          <stop offset="50%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={s2} stopOpacity="0.4" />
        </linearGradient>

        {/* Textura sutil de tela (tejido jersey) */}
        <pattern id="weave" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="transparent" />
          <rect x="0" y="0" width="1.5" height="1.5" fill={isLight ? "#000" : "#fff"} opacity="0.008" />
          <rect x="1.5" y="1.5" width="1.5" height="1.5" fill={isLight ? "#000" : "#fff"} opacity="0.008" />
        </pattern>

        {/* Fold highlight (pliegue con luz) */}
        <linearGradient id="foldHL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hi} stopOpacity="0.08" />
          <stop offset="50%" stopColor={color} stopOpacity="0" />
          <stop offset="100%" stopColor={s2} stopOpacity="0.06" />
        </linearGradient>

        <clipPath id="chestClip">
          <rect x={chest.x} y={chest.y} width={chest.w} height={chest.h} rx="8" />
        </clipPath>
      </defs>

      {/* Sombra de contacto en el suelo */}
      <ellipse cx="200" cy="455" rx="90" ry="8" fill="#000" opacity="0.1" />
      <ellipse cx="200" cy="455" rx="60" ry="5" fill="#000" opacity="0.08" />

      <g filter="url(#shirtShadow)">
        {/* === FORMAS BASE (color sólido) === */}
        <path d={bodyPath} fill={color} />
        <path d={sleeveL} fill={color} />
        <path d={sleeveR} fill={color} />
        {/* Abertura del cuello */}
        <ellipse cx="200" cy="116" rx="28" ry="14" fill={s3} opacity="0.18" />
        {/* Contorno sutil para contraste en colores oscuros */}
        <path d={bodyPath} fill="none" stroke={edgeStroke} strokeWidth="1.1" strokeOpacity={edgeOpacity} />
        <path d={sleeveL} fill="none" stroke={edgeStroke} strokeWidth="1.1" strokeOpacity={edgeOpacity} />
        <path d={sleeveR} fill="none" stroke={edgeStroke} strokeWidth="1.1" strokeOpacity={edgeOpacity} />

        {/* === CUELLO con profundidad === */}
        {/* Banda exterior (ribete grueso) */}
        <path
          d="M168,122 Q200,94 232,122"
          fill="none"
          stroke={collarColor}
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Interior del cuello */}
        <path
          d="M168,122 Q200,94 232,122"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Brillo en borde superior del cuello */}
        <path
          d="M170,120 Q200,92 230,120"
          fill="none"
          stroke={hi2}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.25"
        />
        {/* Sombra interior del cuello */}
        <path
          d="M172,124 Q200,98 228,124"
          fill="none"
          stroke={s3}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.12"
        />

        {/* === CAPAS DE ILUMINACIÓN 3D (clipped) === */}
        <g clipPath="url(#bodyClip)">
          {/* 1. Luz cenital principal */}
          <rect x="20" y="90" width="360" height="380" fill="url(#topLight)" />

          {/* 2. Sombra lateral izquierda */}
          <rect x="20" y="90" width="360" height="380" fill="url(#edgeL)" />

          {/* 3. Sombra lateral derecha */}
          <rect x="20" y="90" width="360" height="380" fill="url(#edgeR)" />

          {/* 4. Franja central de highlight */}
          <rect x="120" y="130" width="160" height="320" fill="url(#centerStrip)" />

          {/* 5. Peso visual inferior */}
          <rect x="100" y="300" width="200" height="170" fill="url(#bottomWeight)" />

          {/* 6. Sombra bajo cuello */}
          <rect x="140" y="92" width="120" height="85" fill="url(#neckShadow)" />

          {/* 7. Highlights en hombros */}
          <rect x="60" y="100" width="170" height="150" fill="url(#shoulderL)" opacity="0.8" />
          <rect x="170" y="100" width="170" height="150" fill="url(#shoulderR)" opacity="0.8" />

          {/* 8. Sombras de manga */}
          <rect x="15" y="120" width="150" height="160" fill="url(#sleeveShadeL)" />
          <rect x="235" y="120" width="150" height="160" fill="url(#sleeveShadeR)" />

          {/* 9. Sombras en sisas */}
          <rect x="100" y="140" width="55" height="100" fill="url(#armholeL)" />
          <rect x="245" y="140" width="55" height="100" fill="url(#armholeR)" />

          {/* 10. Textura de tela */}
          <rect x="20" y="90" width="360" height="380" fill="url(#weave)" />

          {/* === PLIEGUES NATURALES DE TELA === */}

          {/* Pliegues horizontales (drapeado natural) */}
          <path d="M125,180 Q160,188 200,186 Q240,183 275,190" fill="none" stroke={s2} strokeOpacity="0.05" strokeWidth="1.5" />
          <path d="M126,182 Q160,189 200,187 Q240,184 274,191" fill="none" stroke={hi} strokeOpacity="0.035" strokeWidth="0.7" />

          <path d="M122,240 Q160,250 200,248 Q240,244 278,252" fill="none" stroke={s2} strokeOpacity="0.045" strokeWidth="1.3" />
          <path d="M123,242 Q160,251 200,249 Q240,245 277,253" fill="none" stroke={hi} strokeOpacity="0.03" strokeWidth="0.6" />

          <path d="M120,310 Q165,320 200,318 Q235,314 280,322" fill="none" stroke={s2} strokeOpacity="0.05" strokeWidth="1.2" />

          <path d="M122,370 Q165,380 200,378 Q235,374 278,382" fill="none" stroke={s2} strokeOpacity="0.04" strokeWidth="1" />

          <path d="M126,410 Q165,418 200,416 Q235,413 274,420" fill="none" stroke={s2} strokeOpacity="0.035" strokeWidth="0.8" />

          {/* Pliegue vertical centro (costura frontal sutil) */}
          <line x1="200" y1="120" x2="200" y2="430" stroke={s1} strokeOpacity="0.025" strokeWidth="1.2" />
          <line x1="201" y1="120" x2="201" y2="430" stroke={hi} strokeOpacity="0.035" strokeWidth="0.5" />

          {/* Pliegues diagonales sutiles en pecho */}
          <path d="M155,140 Q175,155 170,180" fill="none" stroke={s2} strokeOpacity="0.03" strokeWidth="1" />
          <path d="M245,140 Q225,155 230,180" fill="none" stroke={s2} strokeOpacity="0.03" strokeWidth="1" />

          {/* Pliegues en mangas */}
          <path d="M85,145 Q95,160 100,175" fill="none" stroke={s2} strokeOpacity="0.04" strokeWidth="1.2" />
          <path d="M70,165 Q82,178 88,192" fill="none" stroke={s2} strokeOpacity="0.035" strokeWidth="1" />
          <path d="M315,145 Q305,160 300,175" fill="none" stroke={s2} strokeOpacity="0.04" strokeWidth="1.2" />
          <path d="M330,165 Q318,178 312,192" fill="none" stroke={s2} strokeOpacity="0.035" strokeWidth="1" />
        </g>

        {/* === COSTURAS REALISTAS === */}
        {/* Costura cuello */}
        <path d="M170,120 Q200,92 230,120" fill="none" stroke={stitch} strokeWidth="0.6" strokeDasharray="2,2" />

        {/* Costuras laterales (siguen la curva del cuerpo) */}
        <path d="M88,200 Q84,320 98,400" fill="none" stroke={stitch} strokeWidth="0.6" strokeDasharray="2.5,2.5" />
        <path d="M314,200 Q316,320 302,400" fill="none" stroke={stitch} strokeWidth="0.6" strokeDasharray="2.5,2.5" />

        {/* Costuras hombro (línea plana) */}
        <line x1="110" y1="118" x2="168" y2="118" stroke={stitch} strokeWidth="0.5" strokeDasharray="2,2.5" />
        <line x1="232" y1="118" x2="290" y2="118" stroke={stitch} strokeWidth="0.5" strokeDasharray="2,2.5" />

        {/* Costura basta inferior */}
        <path d="M110,428 Q160,442 200,444 Q240,442 290,428" fill="none" stroke={stitch} strokeWidth="0.6" strokeDasharray="2.5,2" />

        {/* Costura basta manga izq */}
        <path d="M32,170 Q36,198 34,238" fill="none" stroke={stitch} strokeWidth="0.5" strokeDasharray="2,2" />
        <path d="M48,234 Q78,244 108,228" fill="none" stroke={stitch} strokeWidth="0.6" strokeDasharray="2,2" opacity="0.8" />

        {/* Costura basta manga der */}
        <path d="M368,170 Q364,198 366,238" fill="none" stroke={stitch} strokeWidth="0.5" strokeDasharray="2,2" />
        <path d="M352,234 Q322,244 292,228" fill="none" stroke={stitch} strokeWidth="0.6" strokeDasharray="2,2" opacity="0.8" />

        {/* Borde inferior con grosor (dobladillo) */}
        <path d="M110,428 Q160,442 200,444 Q240,442 290,428" fill={s2} opacity="0.1" />
        <path d="M112,430 Q160,443 200,445 Q240,443 288,430" fill={hi} opacity="0.04" />
      </g>

      {/* Logo y texto */}
      <g clipPath="url(#chestClip)">
        {/* Guía de posicionamiento */}
        {showGrid && (
          <g>
            <rect
              x={chest.x}
              y={chest.y}
              width={chest.w}
              height={chest.h}
              fill="transparent"
              stroke={isLight ? "#000" : "#fff"}
              strokeWidth="1"
              strokeDasharray="6 6"
              opacity="0.25"
            />
            {[1 / 3, 2 / 3].map((p) => (
              <g key={p}>
                <line
                  x1={chest.x + chest.w * p}
                  x2={chest.x + chest.w * p}
                  y1={chest.y}
                  y2={chest.y + chest.h}
                  stroke={isLight ? "#000" : "#fff"}
                  strokeWidth="0.7"
                  strokeDasharray="4 6"
                  opacity="0.15"
                />
                <line
                  x1={chest.x}
                  x2={chest.x + chest.w}
                  y1={chest.y + chest.h * p}
                  y2={chest.y + chest.h * p}
                  stroke={isLight ? "#000" : "#fff"}
                  strokeWidth="0.7"
                  strokeDasharray="4 6"
                  opacity="0.15"
                />
              </g>
            ))}
            <circle
              cx={imgX + imgSize / 2}
              cy={imgY + imgSize / 2}
              r={10}
              fill={isLight ? "#000" : "#fff"}
              opacity="0.12"
            />
          </g>
        )}

        {logoUrl && (
          <image
            href={logoUrl}
            x={imgX}
            y={imgY}
            width={imgSize}
            height={imgSize}
            preserveAspectRatio="xMidYMid meet"
          />
        )}
        {customText.trim() && (
          <text
            x={textX}
            y={textY}
            textAnchor="middle"
            fill={isLight ? "#000" : "#fff"}
            fontSize="13"
            fontWeight="bold"
            fontFamily="var(--font-display),sans-serif"
            opacity="0.85"
          >
            {customText.trim().length > 28 ? customText.trim().slice(0, 28) + "..." : customText.trim()}
          </text>
        )}

        {onPickPosition && (
          <rect
            x={chest.x}
            y={chest.y}
            width={chest.w}
            height={chest.h}
            fill="transparent"
            onPointerDown={handlePick}
            style={{ cursor: "crosshair" }}
          />
        )}
      </g>
    </svg>
  );
}

// Panel de vista previa 3D
function PreviewPanel({
  color,
  logoUrl,
  customText,
  product,
  selectedSize,
  logoScale,
  logoPosition,
  onPickPosition,
  showGrid,
}: {
  color?: { nombre: string; hex: string };
  logoUrl: string | null;
  customText: string;
  product?: { nombre: string; imagen: string };
  selectedSize: string | null;
  logoScale: number;
  logoPosition: { x: number; y: number };
  onPickPosition?: (pos: { x: number; y: number }) => void;
  showGrid?: boolean;
}) {
  const fillColor = color?.hex || "#FFFFFF";
  const luminance =
    parseInt(fillColor.slice(1, 3), 16) * 0.299 +
    parseInt(fillColor.slice(3, 5), 16) * 0.587 +
    parseInt(fillColor.slice(5, 7), 16) * 0.114;
  const isLightColor = luminance > 186;

  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mockupError, setMockupError] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
  const logoY = clamp01(logoPosition.y);
  const logoX = clamp01(logoPosition.x);
  const textY = clamp01((logoUrl ? logoY + 0.45 : logoY + 0.25));
  const mockupSrc = getMockupSrc(product?.nombre, color?.nombre);

  useEffect(() => {
    setMockupError(false);
  }, [mockupSrc]);

  return (
    <div className="relative">
      {/* Label */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <Eye className="w-4 h-4 text-gray-500" />
        <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
          Vista Previa
        </span>
      </div>

      {/* 3D Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[360px] mx-auto rounded-[28px] border border-white/20 bg-white/10 p-4 overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        style={{ perspective: "900px" }}
      >
        {/* Fondo tipo mockup para dar contraste */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(255,255,255,0.28),rgba(255,255,255,0.12)_45%,rgba(0,0,0,0)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.28))]" />

        {/* Sombra dinámica */}
        <div
          className="absolute -bottom-2 left-1/2 w-[55%] h-6 rounded-[50%] bg-black/25 blur-xl transition-all duration-300"
          style={{
            transform: `translateX(calc(-50% + ${tilt.y * 2}px))`,
            opacity: isHovering ? 0.5 : 0.3,
          }}
        />

        <motion.div
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            y: isHovering ? -6 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative z-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {mockupError ? (
            <TShirtSVG
              color={fillColor}
              logoUrl={logoUrl}
              customText={customText}
              isLight={isLightColor}
              logoScale={logoScale}
              logoPosition={logoPosition}
              showGrid={showGrid}
              onPickPosition={onPickPosition}
            />
          ) : (
            <div className="relative">
              <div className="relative w-full aspect-[4/5]">
                <img
                  src={mockupSrc}
                  alt="Polera"
                  className="absolute inset-y-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 transition-opacity duration-300"
                  onError={() => setMockupError(true)}
                />
              </div>

              {/* Overlay de logo/texto para mantener configurador */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute"
                  style={{
                    left: `${PREVIEW_CHEST.x * 100}%`,
                    top: `${PREVIEW_CHEST.y * 100}%`,
                    width: `${PREVIEW_CHEST.w * 100}%`,
                    height: `${PREVIEW_CHEST.h * 100}%`,
                  }}
                >
                  {showGrid && (
                    <div className="absolute inset-0 border border-dashed border-white/30 rounded-lg" />
                  )}
                  {showGrid && (
                    <>
                      <div className="absolute left-1/3 top-0 h-full w-px bg-white/15" />
                      <div className="absolute left-2/3 top-0 h-full w-px bg-white/15" />
                      <div className="absolute top-1/3 left-0 h-px w-full bg-white/15" />
                      <div className="absolute top-2/3 left-0 h-px w-full bg-white/15" />
                    </>
                  )}
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="absolute"
                      style={{
                        left: `${logoX * 100}%`,
                        top: `${logoY * 100}%`,
                        width: `${logoScale * 75}%`,
                        height: `${logoScale * 75}%`,
                        transform: "translate(-50%, -50%)",
                        objectFit: "contain",
                        opacity: 0.95,
                      }}
                    />
                  )}
                  {customText.trim() && (
                    <div
                      className="absolute text-center font-bold text-xs"
                      style={{
                        left: `${logoX * 100}%`,
                        top: `${textY * 100}%`,
                        transform: "translate(-50%, -50%)",
                        color: isLightColor ? "#111" : "#fff",
                        textShadow: isLightColor ? "0 1px 2px rgba(0,0,0,0.2)" : "0 1px 2px rgba(0,0,0,0.5)",
                        maxWidth: "90%",
                      }}
                    >
                      {customText.trim().length > 28
                        ? `${customText.trim().slice(0, 28)}...`
                        : customText.trim()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Área clickeable para posicionar */}
          {onPickPosition && (
            <div
              className="absolute"
              style={{
                left: `${PREVIEW_CHEST.x * 100}%`,
                top: `${PREVIEW_CHEST.y * 100}%`,
                width: `${PREVIEW_CHEST.w * 100}%`,
                height: `${PREVIEW_CHEST.h * 100}%`,
                cursor: "crosshair",
              }}
              onPointerDown={(e) => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                onPickPosition({ x: clamp01(x), y: clamp01(y) });
              }}
            />
          )}

          {/* Size badge */}
          {selectedSize && (
            <div className="absolute bottom-6 right-6">
              <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/10">
                {selectedSize}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-2 text-center space-y-1">
        {product && (
          <p className="text-sm text-white font-semibold">{product.nombre}</p>
        )}
        <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
          {color && (
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border border-white/20 inline-block"
                style={{ backgroundColor: color.hex }}
              />
              {color.nombre}
            </span>
          )}
          {selectedSize && <span>Talla {selectedSize}</span>}
        </div>
      </div>
    </div>
  );
}

export function TextilConfigurator() {
  const { content } = useContent();
  const config = content.textilConfigurator || {
    products: [],
    colors: [],
    sizes: [],
  };

  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [customText, setCustomText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [logoScale, setLogoScale] = useState(1);
  const [logoPosition, setLogoPosition] = useState({ x: 0.5, y: 0.25 });
  const [showGrid, setShowGrid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedProducts = ["Polera", "Polerón"];
  const products = config.products.filter((p) =>
    allowedProducts.includes(p.nombre)
  );
  const product = products.find((p) => p.id === selectedProduct);
  const color = config.colors.find((c) => c.id === selectedColor);

  useEffect(() => {
    if (selectedProduct !== null && !products.some((p) => p.id === selectedProduct)) {
      setSelectedProduct(null);
      setStep(0);
    }
  }, [products, selectedProduct]);

  const canAdvance = () => {
    switch (step) {
      case 0:
        return selectedProduct !== null;
      case 1:
        return selectedColor !== null;
      case 2:
        return selectedSize !== null;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleFileUpload = useCallback(async (file: File) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Formato no soportado. Use PNG, JPG, WebP o SVG.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert("El archivo es muy grande. Maximo 50MB.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload-customer-logo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setLogoUrl(data.url);
        setLogoName(file.name);
      } else {
        alert(data.error || "Error al subir el archivo");
      }
    } catch {
      alert("Error de conexion al subir el archivo");
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleSend = () => {
    const extras: Record<string, string> = {
      producto: product?.nombre || "",
      color: color?.nombre || "",
      talla: selectedSize || "",
      texto: "",
      logoTamano: `${Math.round(logoScale * 100)}%`,
      logoPosicion: `X ${(logoPosition.x * 100).toFixed(0)}% | Y ${(logoPosition.y * 100).toFixed(0)}%`,
    };

    const parts: string[] = [];
    if (logoUrl) {
      const fullLogoUrl = `${window.location.origin}${logoUrl}`;
      parts.push(`Logo: ${fullLogoUrl}`);
    }
    if (customText.trim()) parts.push(`Texto: "${customText.trim()}"`);
    extras.texto = parts.join(" | ");

    extras.texto = [extras.texto, `Escala: ${extras.logoTamano}`, `Pos: ${extras.logoPosicion}`]
      .filter(Boolean)
      .join(" | ");

    openWhatsApp("textilConfigurador", extras);
  };

  if (config.products.length === 0) return null;

  // Show preview once at least product is selected
  const showPreview = selectedProduct !== null;

  return (
    <section
      id="configurador"
      className="theme-textil py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff004006_1px,transparent_1px),linear-gradient(to_bottom,#ff004006_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#ff0040]/5 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="tag-racing mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Personaliza tu Pedido
          </motion.span>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Configura tu{" "}
            <span className="title-gradient-animated">Prenda</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Selecciona producto, color y talla. Sube tu logo y agrega texto
            personalizado.
          </p>
          <div className="divider-racing mt-6" />
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10 flex-wrap">
          {STEPS.map((s, i) => {
            const StepIcon = s.icon;
            const isActive = step === i;
            const isDone = step > i;
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (isDone || isActive) setStep(i);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white shadow-lg shadow-[#ff0040]/25"
                    : isDone
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-white/5 text-gray-500 border border-white/10"
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <StepIcon className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main content: Preview + Steps */}
        <div
          className={`flex flex-col ${showPreview ? "lg:flex-row" : ""} gap-8`}
        >
          {/* Preview Panel - Left side on desktop, top on mobile */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-[340px] flex-shrink-0"
            >
              <div className="lg:sticky lg:top-24">
                <PreviewPanel
                  color={color}
                  logoUrl={logoUrl}
                  customText={customText}
                  product={product}
                  selectedSize={selectedSize}
                  logoScale={logoScale}
                  logoPosition={logoPosition}
                  onPickPosition={setLogoPosition}
                  showGrid={showGrid}
                />
              </div>
            </motion.div>
          )}

          {/* Step Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="min-h-[320px]"
              >
                {/* Step 0: Product */}
                {step === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 justify-items-center">
                    {products.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProduct(p.id)}
                        className={`group relative card-racing rounded-2xl overflow-hidden transition-all duration-300 w-full max-w-[340px] ${
                          selectedProduct === p.id
                            ? "ring-2 ring-[#ff0040] shadow-lg shadow-[#ff0040]/30"
                            : "hover:ring-1 hover:ring-white/20"
                        }`}
                      >
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.18),rgba(0,0,0,0)_60%)]" />
                          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/60" />
                          <div className="absolute -top-10 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-[#ff0040]/20 blur-3xl opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                          <img
                            src={p.imagen || getProductPreviewImage(p.nombre)}
                            alt={p.nombre}
                            className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                          {selectedProduct === p.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-[#ff0040] rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="p-3 text-center">
                          <span
                            className="text-sm font-bold text-white"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {p.nombre}
                          </span>
                        </div>
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-x-6 top-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="absolute inset-x-6 bottom-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 1: Color */}
                {step === 1 && (
                  <div className="flex flex-wrap justify-center gap-4">
                    {config.colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c.id)}
                        className={`group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
                          selectedColor === c.id
                            ? "bg-white/10 ring-2 ring-[#ff0040] shadow-lg shadow-[#ff0040]/20"
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="relative">
                          <div
                            className="w-16 h-16 rounded-full border-2 transition-all duration-300"
                            style={{
                              backgroundColor: c.hex,
                              borderColor:
                                selectedColor === c.id
                                  ? "#ff0040"
                                  : c.hex === "#FFFFFF" ||
                                      c.hex === "#ffffff"
                                    ? "#333"
                                    : "transparent",
                            }}
                          />
                          {selectedColor === c.id && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check
                                className="w-6 h-6"
                                style={{
                                  color:
                                    c.hex === "#000000" ||
                                    c.hex === "#1E3A5F"
                                      ? "#fff"
                                      : "#000",
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-300">
                          {c.nombre}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 2: Size */}
                {step === 2 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {config.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-20 h-20 rounded-2xl text-lg font-bold transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white shadow-lg shadow-[#ff0040]/25"
                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 3: Logo Upload */}
                {step === 3 && (
                  <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.4fr,0.8fr] gap-8 items-start">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-400 text-center lg:text-left">
                        Sube tu logo o imagen para estampar (opcional). PNG, JPG, WebP o SVG. Max 50MB.
                      </p>

                      {logoUrl ? (
                        <div className="relative card-racing rounded-2xl p-6 text-center">
                          <button
                            onClick={() => {
                              setLogoUrl(null);
                              setLogoName("");
                            }}
                            className="absolute top-3 right-3 w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <img
                            src={logoUrl}
                            alt="Logo subido"
                            className="max-h-56 mx-auto rounded-lg mb-3"
                          />
                          <p className="text-sm text-green-400 flex items-center justify-center gap-2">
                            <Check className="w-4 h-4" />
                            {logoName}
                          </p>
                        </div>
                      ) : (
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                          }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`card-racing rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
                            dragOver
                              ? "ring-2 ring-[#ff0040] bg-[#ff0040]/5"
                              : "hover:bg-white/5"
                          }`}
                        >
                          {uploading ? (
                            <Loader2 className="w-12 h-12 mx-auto text-[#ff0040] animate-spin mb-4" />
                          ) : (
                            <ImageIcon className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                          )}
                          <p className="text-gray-300 font-medium mb-1">
                            {uploading ? "Subiendo..." : "Arrastra tu logo aquí o haz click"}
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, WebP, SVG - Max 50MB</p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file);
                            }}
                          />
                        </div>
                      )}

                      <p className="text-xs text-gray-500 text-center lg:text-left">
                        Este paso es opcional. Si no subes un logo, puedes describirlo en el paso siguiente.
                      </p>

                      {logoUrl && (
                        <div className="card-racing rounded-2xl p-5 space-y-4">
                          <div className="flex items-center justify-between text-sm text-gray-300">
                            <span className="flex items-center gap-2 font-semibold">
                              <Move className="w-4 h-4 text-[#ff6600]" />
                              Ajusta tamaño y posición
                            </span>
                            <label className="flex items-center gap-2 text-xs text-gray-400">
                              <input
                                type="checkbox"
                                checked={showGrid}
                                onChange={(e) => setShowGrid(e.target.checked)}
                                className="accent-[#ff6600]"
                              />
                              Guía
                            </label>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>Tamaño</span>
                              <span className="text-[#ff6600] font-semibold">{Math.round(logoScale * 100)}%</span>
                            </div>
                            <input
                              type="range"
                              min="0.6"
                              max="1.6"
                              step="0.05"
                              value={logoScale}
                              onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                              className="w-full accent-[#ff6600]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs text-gray-300">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                              <span className="block text-gray-400 mb-1">Posición</span>
                              <div className="flex items-center gap-3">
                                <Crosshair className="w-4 h-4 text-[#ff6600]" />
                                <div className="space-y-1 text-[11px]">
                                  <div>X: {(logoPosition.x * 100).toFixed(0)}%</div>
                                  <div>Y: {(logoPosition.y * 100).toFixed(0)}%</div>
                                  <p className="text-gray-500">Haz click en la polera para reposicionar.</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                              <span className="block text-gray-400 mb-1">Presets</span>
                              <div className="flex flex-wrap gap-2">
                                {["Centro", "Izquierda", "Derecha", "Alto", "Bajo"].map((preset) => {
                                  const presets: Record<string, { x: number; y: number }> = {
                                    Centro: { x: 0.5, y: 0.45 },
                                    Izquierda: { x: 0.32, y: 0.45 },
                                    Derecha: { x: 0.68, y: 0.45 },
                                    Alto: { x: 0.5, y: 0.28 },
                                    Bajo: { x: 0.5, y: 0.62 },
                                  };
                                  return (
                                    <button
                                      key={preset}
                                      onClick={() => setLogoPosition(presets[preset])}
                                      className="px-2.5 py-1 rounded-lg bg-white/10 text-gray-200 hover:bg-white/15"
                                    >
                                      {preset}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

          <div className="hidden lg:block">
            <PreviewPanel
              color={color}
              logoUrl={logoUrl}
              customText={customText}
              product={product}
                        selectedSize={selectedSize}
                        logoScale={logoScale}
                        logoPosition={logoPosition}
                        onPickPosition={setLogoPosition}
                        showGrid={showGrid}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Custom Text */}
                {step === 4 && (
                  <div className="max-w-md mx-auto">
                    <p className="text-sm text-gray-400 text-center mb-6">
                      Agrega texto personalizado o instrucciones especiales
                      (opcional).
                    </p>
                    <div className="card-racing rounded-2xl p-6">
                      <textarea
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="Ej: Quiero el logo en el pecho, texto 'EQUIPO DMC' en la espalda..."
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0040] focus:border-transparent resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Describe ubicacion del estampado, textos adicionales o
                        cualquier detalle.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 5: Summary */}
                {step === 5 && (
                  <div className="max-w-lg mx-auto">
                    <div className="card-racing rounded-2xl p-6 space-y-4">
                      <h3
                        className="text-xl font-bold text-white text-center mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Resumen de tu Pedido
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <span className="text-gray-400 text-sm flex items-center gap-2">
                            <Shirt className="w-4 h-4" /> Producto
                          </span>
                          <span className="text-white font-semibold">
                            {product?.nombre || "-"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <span className="text-gray-400 text-sm flex items-center gap-2">
                            <Palette className="w-4 h-4" /> Color
                          </span>
                          <span className="text-white font-semibold flex items-center gap-2">
                            {color && (
                              <span
                                className="w-4 h-4 rounded-full inline-block border border-white/20"
                                style={{ backgroundColor: color.hex }}
                              />
                            )}
                            {color?.nombre || "-"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <span className="text-gray-400 text-sm flex items-center gap-2">
                            <Ruler className="w-4 h-4" /> Talla
                          </span>
                          <span className="text-white font-semibold">
                            {selectedSize || "-"}
                          </span>
                        </div>

                        {logoUrl && (
                          <div className="p-3 bg-white/5 rounded-xl">
                            <span className="text-gray-400 text-sm flex items-center gap-2 mb-3">
                              <ImageIcon className="w-4 h-4" /> Logo /
                              Diseno
                            </span>
                            <div className="grid grid-cols-[auto,1fr] gap-3 items-center">
                              <img
                                src={logoUrl}
                                alt="Logo"
                                className="w-16 h-16 object-contain rounded-lg bg-white/10 p-1"
                              />
                              <div className="space-y-1 text-xs text-gray-300">
                                <span className="text-green-400 flex items-center gap-1 font-semibold">
                                  <Check className="w-3.5 h-3.5" /> {logoName}
                                </span>
                                <div className="text-gray-400">Tamaño: {Math.round(logoScale * 100)}%</div>
                                <div className="text-gray-400">Posición: X {(logoPosition.x * 100).toFixed(0)}% · Y {(logoPosition.y * 100).toFixed(0)}%</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {customText.trim() && (
                          <div className="p-3 bg-white/5 rounded-xl">
                            <span className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                              <Type className="w-4 h-4" /> Texto personalizado
                            </span>
                            <p className="text-white text-sm">
                              &quot;{customText.trim()}&quot;
                            </p>
                          </div>
                        )}
                      </div>

                      <motion.button
                        onClick={handleSend}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full btn-racing shine-effect-auto mt-6"
                      >
                        <Send className="w-5 h-5" />
                        Enviar por WhatsApp
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10 max-w-lg mx-auto">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  step === 0
                    ? "opacity-30 cursor-not-allowed text-gray-500"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              {step < 5 ? (
                <button
                  onClick={() => {
                    if (canAdvance()) setStep(step + 1);
                  }}
                  disabled={!canAdvance()}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    canAdvance()
                      ? "bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white shadow-lg shadow-[#ff0040]/25 hover:shadow-[#ff0040]/40"
                      : "opacity-30 cursor-not-allowed bg-gray-700 text-gray-400"
                  }`}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
