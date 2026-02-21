"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, MessageCircle, Check } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";
import { useState } from "react";

/* ── Color variants with matching mockup images ── */
const colorVariants = {
  polera: [
    { name: "Blanco", hex: "#f5f5f5", img: "/mockups/poleras/blanco.png" },
    { name: "Negro", hex: "#1a1a1a", img: "/mockups/poleras/negro.png" },
    { name: "Gris", hex: "#6b7280", img: "/mockups/poleras/gris.png" },
    { name: "Rojo", hex: "#dc2626", img: "/mockups/poleras/rojo.png" },
    { name: "Azul Marino", hex: "#1e3a5f", img: "/mockups/poleras/azul_marino.png" },
  ],
  poleron: [
    { name: "Blanco", hex: "#f5f5f5", img: "/mockups/polerones/poleron_blanco.png" },
    { name: "Negro", hex: "#1a1a1a", img: "/mockups/polerones/poleron_negro.png" },
    { name: "Gris", hex: "#6b7280", img: "/mockups/polerones/poleron_gris.png" },
    { name: "Rojo", hex: "#dc2626", img: "/mockups/polerones/poleron_rojo.png" },
    { name: "Azul Marino", hex: "#1e3a5f", img: "/mockups/polerones/poleron_azul_marino.png" },
  ],
};

const sizes = ["S", "M", "L", "XL", "2XL"];

const getVariants = (title: string) => {
  const key = title.toLowerCase();
  if (key.includes("poleron")) return colorVariants.poleron;
  return colorVariants.polera;
};

const fallbackCatalog = [
  {
    id: 1,
    title: "Poleras Streetwear",
    description: "Algodon premium, oversize y regular fit. Disenos urbanos, graficos bold y colores vibrantes.",
    image: "",
    features: ["Oversize", "Full Color", "Urban"],
    highlighted: true,
  },
  {
    id: 2,
    title: "Polerones Urban",
    description: "Hoodies premium con o sin capucha. Estilo streetwear, perfectos para tu crew o marca.",
    image: "",
    features: ["Hoodie", "Crew", "Premium"],
    highlighted: false,
  },
  {
    id: 3,
    title: "Uniformes Corporativos",
    description: "Polos, camisas y chaquetas con tu identidad. Cotizacion especial por volumen.",
    image: "",
    features: ["Logo", "Bordado", "Volumen"],
    highlighted: false,
  },
  {
    id: 4,
    title: "Gorras & Accesorios",
    description: "Snapbacks, dad hats, beanies y mas. Complementa tu estilo con accesorios personalizados.",
    image: "",
    features: ["Snapback", "Beanie", "Custom"],
    highlighted: false,
  },
];

/* ── Product Card ── */
function ProductCard({ item, index }: {
  item: typeof fallbackCatalog[0];
  index: number;
}) {
  const variants = getVariants(item.title);
  const [activeColor, setActiveColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2); // L por defecto
  const currentImg = item.image || variants[activeColor]?.img || variants[0]?.img;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* Card con borde glow sutil */}
      <div className="relative rounded-[20px] p-[1px] bg-gradient-to-b from-[#ff0040]/20 via-white/[0.06] to-white/[0.02] transition-all duration-500 hover:from-[#ff0040]/40 hover:via-[#ff6600]/20 hover:to-[#ff0040]/10">
        <div className="relative rounded-[19px] bg-[#0f0f0f] overflow-hidden flex flex-col">

          {/* ── Image container con borde interno redondeado ── */}
          <div className="relative m-3 rounded-2xl overflow-hidden bg-[#1a1a1a]">
            {/* Imagen del producto */}
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={currentImg}
                  alt={item.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                />
              </AnimatePresence>

              {/* Badge esquina superior derecha */}
              {item.highlighted && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white shadow-[0_4px_15px_rgba(255,0,64,0.5)]">
                    -15%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Contenido ── */}
          <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
            {/* Titulo */}
            <h3
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.title}
            </h3>

            {/* Selector de tallas */}
            <div className="flex items-center gap-2">
              {sizes.map((size, i) => {
                const isSelected = i === selectedSize;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(i)}
                    className={`relative w-10 h-10 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? "bg-[#ff0040]/15 border-2 border-[#ff0040] text-white"
                        : "bg-white/[0.04] border border-white/10 text-white/40 hover:text-white/70 hover:border-white/25"
                    }`}
                  >
                    {size}
                    {isSelected && (
                      <Check className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 text-[#0f0f0f] bg-[#ff0040] rounded-full p-[2px]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Color swatches */}
            <div className="flex items-center gap-2">
              {variants.map((v, i) => (
                <button
                  key={v.name}
                  onClick={() => setActiveColor(i)}
                  className={`relative w-7 h-7 rounded-full transition-all duration-300 ${
                    activeColor === i
                      ? "ring-2 ring-[#ff0040] ring-offset-2 ring-offset-[#0f0f0f] scale-110"
                      : "opacity-50 hover:opacity-100 hover:scale-105"
                  }`}
                  style={{ backgroundColor: v.hex }}
                  aria-label={v.name}
                >
                  {v.hex === "#1a1a1a" && (
                    <span className="absolute inset-0 rounded-full border border-white/20" />
                  )}
                </button>
              ))}
            </div>

            {/* Boton CTA full-width gradient */}
            <button
              onClick={() => openWhatsApp("textilPersonalizar")}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#ff0040] to-[#ff6600] shadow-[0_4px_20px_rgba(255,0,64,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,0,64,0.45)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir ahora
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export function TextilServices() {
  const { content } = useContent();
  const catalog = (content.textilCatalog && content.textilCatalog.length > 0)
    ? content.textilCatalog
    : fallbackCatalog;

  return (
    <section id="catalogo" className="theme-textil py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,0,64,0.06),transparent)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="tag-racing mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Catalogo
          </motion.span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Nuestros{" "}
            <span className="title-gradient-animated">Productos</span>
          </h2>

          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Prendas personalizadas con tecnologia DTF de ultima generacion
          </p>

          <div className="divider-racing mt-8" />
        </motion.div>

        {/* Grid uniforme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {catalog.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/40 mb-6">
            ¿Tienes un proyecto especial? ¡Te ayudamos a hacerlo realidad!
          </p>
          <motion.button
            onClick={() => openWhatsApp("textilPersonalizar")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-racing shine-effect-auto"
          >
            <Star className="w-5 h-5" />
            Consulta Personalizada
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
