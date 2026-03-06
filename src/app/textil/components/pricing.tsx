"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openWhatsApp } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";
import {
  MessageCircle,
  Users,
  Baby,
  Building2,
  Ruler,
  Package,
  Shirt,
  ShieldCheck,
  Zap,
} from "lucide-react";

const cotizacionIcons = [Building2, Ruler, Package];
const cotizacionDescriptions = [
  "Uniformes, merchandising corporativo",
  "Sobre 2XL o medidas personalizadas",
  "Desde 50 unidades, precios especiales",
];

function formatPrice(precio: number) {
  return `$${precio.toLocaleString("es-CL")}`;
}

interface Product {
  producto: string;
  talla: string;
  precio: number;
}

interface Category {
  nombre: string;
  icon: React.ElementType;
  matcher: (p: Product) => boolean;
}

const categories: Category[] = [
  {
    nombre: "Poleras",
    icon: Shirt,
    matcher: (p) => p.producto.toLowerCase().startsWith("polera"),
  },
  {
    nombre: "Canguros",
    icon: ShieldCheck,
    matcher: (p) => p.producto.toLowerCase().includes("canguro"),
  },
  {
    nombre: "Polerones Polo",
    icon: Zap,
    matcher: (p) => p.producto.toLowerCase().includes("polo"),
  },
];

const defaultPricing = {
  adultos: [
    { producto: "Polera Dogo Premium Hombre", talla: "S-2XL", precio: 12990 },
    { producto: "Polera Piqué Monzha Mujer", talla: "S-2XL", precio: 15000 },
    { producto: "Polera Piqué Pegaso Premium Mujer", talla: "S-2XL", precio: 16000 },
    { producto: "Polera Piqué Tormo", talla: "S-2XL", precio: 18000 },
    { producto: "Polera Dogo Premium 3XL-4XL", talla: "3XL-4XL", precio: 13000 },
    { producto: "Polera Piqué Monzha Hombre", talla: "S-3XL", precio: 15500 },
    { producto: "Polerón Canguro adulto", talla: "S-XL", precio: 28990 },
    { producto: "Polerón Canguro adulto", talla: "XXL", precio: 30500 },
    { producto: "Polerón Polo adulto", talla: "S-XL", precio: 29000 },
    { producto: "Polerón Polo adulto", talla: "XXL", precio: 29990 },
  ],
  ninos: [
    { producto: "Polera Dogo Premium Niño", talla: "3/4-11/12", precio: 12990 },
    { producto: "Polerón Canguro niño", talla: "2-8", precio: 19500 },
    { producto: "Polerón Canguro niño", talla: "10-16", precio: 20000 },
    { producto: "Polerón Polo niño", talla: "2-8", precio: 21000 },
    { producto: "Polerón Polo niño", talla: "10-16", precio: 21500 },
  ],
  cotizacion: ["Personalización Empresas", "Tallas Especiales", "Pedidos por Mayor"],
};

function ProductRow({ product }: { product: Product }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
      <div className="min-w-0 flex-1 mr-3">
        <p
          className="font-medium text-white text-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.producto}
        </p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-gray-400 whitespace-nowrap">
          {product.talla}
        </span>
        <span className="stat-number-racing text-base sm:text-lg font-bold whitespace-nowrap">
          {formatPrice(product.precio)}
        </span>
      </div>
    </div>
  );
}

function CategorySection({
  title,
  icon: Icon,
  products,
  iconColor,
}: {
  title: string;
  icon: React.ElementType;
  products: Product[];
  iconColor: string;
}) {
  if (products.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 px-4">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </span>
      </div>
      <div>
        {products.map((product, idx) => (
          <ProductRow key={`${product.producto}-${product.talla}-${idx}`} product={product} />
        ))}
      </div>
    </div>
  );
}

export function TextilPricing() {
  const { content } = useContent();
  const raw = content.textilPricing;
  const pricing = raw && Array.isArray(raw.adultos) ? raw : defaultPricing;
  const { adultos, ninos, cotizacion } = pricing;
  const [activeTab, setActiveTab] = useState(0);

  const categoryData = categories.map((cat) => {
    const adultProducts = adultos.filter(cat.matcher);
    const kidProducts = ninos.filter(cat.matcher);
    const allPrices = [...adultProducts, ...kidProducts].map((p) => p.precio);
    const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
    return { ...cat, adultProducts, kidProducts, minPrice };
  });

  const activeCategory = categoryData[activeTab];

  const cotizacionItems = cotizacion.map((label: string, i: number) => ({
    icon: cotizacionIcons[i] || Package,
    label,
    description: cotizacionDescriptions[i] || "",
  }));

  return (
    <section id="precios" className="theme-textil py-10 md:py-14 relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#111]" />
      <div className="absolute inset-0 urban-pattern opacity-10" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#ff0040]/10 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-[#ff6600]/10 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nuestros{" "}
            <span className="title-gradient-animated">Precios</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Precios por prenda personalizada con tu diseño en impresión DTF.
            Todos los valores incluyen IVA.
          </p>
          <div className="divider-racing mt-6" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categoryData.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = idx === activeTab;
            return (
              <button
                key={cat.nombre}
                onClick={() => setActiveTab(idx)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white shadow-lg shadow-[#ff0040]/25"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }
                `}
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{cat.nombre}</span>
                <span className="sm:hidden">{cat.nombre.split(" ").pop()}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff0040] to-[#ff6600] -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* "Desde" Price Hero */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">
              Desde
            </p>
            <p
              className="text-4xl sm:text-5xl font-bold title-gradient-animated"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formatPrice(activeCategory.minPrice)}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Product Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6"
          >
            {/* Adultos */}
            {activeCategory.adultProducts.length > 0 && (
              <div className="card-racing p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-[#ff0040] to-[#ff6600] px-5 py-3 flex items-center gap-3">
                  <Users className="w-5 h-5 text-white flex-shrink-0" />
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Adultos
                  </h3>
                  <span className="ml-auto text-xs text-white/70 font-medium">
                    {activeCategory.adultProducts.length}{" "}
                    {activeCategory.adultProducts.length === 1 ? "opción" : "opciones"}
                  </span>
                </div>
                <div className="py-2">
                  {activeCategory.adultProducts.map((product, idx) => (
                    <ProductRow
                      key={`adult-${product.producto}-${product.talla}-${idx}`}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Niños */}
            {activeCategory.kidProducts.length > 0 && (
              <div className="card-racing p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-[#ff6600] to-[#ff0040] px-5 py-3 flex items-center gap-3">
                  <Baby className="w-5 h-5 text-white flex-shrink-0" />
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Niños
                  </h3>
                  <span className="ml-auto text-xs text-white/70 font-medium">
                    {activeCategory.kidProducts.length}{" "}
                    {activeCategory.kidProducts.length === 1 ? "opción" : "opciones"}
                  </span>
                </div>
                <div className="py-2">
                  {activeCategory.kidProducts.map((product, idx) => (
                    <ProductRow
                      key={`kid-${product.producto}-${product.talla}-${idx}`}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="text-sm text-gray-500 text-center mb-12">
          *Precio incluye prenda + impresión DTF de tu diseño. Todos los precios incluyen IVA. No incluye despacho.
        </p>

        {/* Cotización Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-racing p-6 md:p-8"
        >
          <h3
            className="text-xl font-bold text-white text-center mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Cotización <span className="title-gradient-animated">Personalizada</span>
          </h3>
          <p className="text-gray-400 text-center text-sm mb-6">
            Para estos casos, contáctanos y te enviamos una cotización a medida
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {cotizacionItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, rotateX: 5, rotateY: -5 }}
                className="card-racing card-3d-tilt glow-corners p-5 text-center"
              >
                <div className="card-shine" />
                <div className="relative z-10">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-[#ff0040]/20 to-[#ff6600]/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#ff0040]" />
                  </div>
                  <div className="font-medium text-white text-sm mb-1">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              onClick={() => openWhatsApp("textilPersonalizar")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-racing shine-effect-auto inline-flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Solicitar Cotización
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
