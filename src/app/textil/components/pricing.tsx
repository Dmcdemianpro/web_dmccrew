"use client";

import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";
import { MessageCircle, Users, Baby, Building2, Ruler, Package } from "lucide-react";

const cotizacionIcons = [Building2, Ruler, Package];
const cotizacionDescriptions = [
  "Uniformes, merchandising corporativo",
  "Sobre 2XL o medidas personalizadas",
  "Desde 50 unidades, precios especiales",
];

function formatPrice(precio: number) {
  return `$${precio.toLocaleString('es-CL')}`;
}

function ProductCard({ product }: { product: { name: string; size: string; price: string } }) {
  return (
    <div className="flex items-center justify-between py-4 px-4 border-b border-white/10 last:border-b-0">
      <div className="min-w-0 flex-1 mr-4">
        <p className="font-medium text-white text-sm sm:text-base" style={{ fontFamily: "var(--font-display)" }}>
          {product.name}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{product.size}</p>
      </div>
      <div className="flex-shrink-0">
        <span className="stat-number-racing text-lg sm:text-xl">{product.price}</span>
      </div>
    </div>
  );
}

export function TextilPricing() {
  const { content } = useContent();
  const { adultos, ninos, cotizacion } = content.textilPricing;

  const adultProducts = adultos.map((p) => ({
    name: p.producto,
    size: p.talla,
    price: formatPrice(p.precio),
  }));

  const kidProducts = ninos.map((p) => ({
    name: p.producto,
    size: p.talla,
    price: formatPrice(p.precio),
  }));

  const cotizacionItems = cotizacion.map((label, i) => ({
    icon: cotizacionIcons[i] || Package,
    label,
    description: cotizacionDescriptions[i] || "",
  }));

  return (
    <section id="precios" className="theme-textil py-16 md:py-24 relative overflow-hidden">
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
          className="text-center mb-12"
        >
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nuestros{" "}
            <span className="title-gradient-animated">Precios</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Precios fijos por prenda personalizada con tu diseño en impresión DTF
          </p>
          <div className="divider-racing mt-6" />
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {/* Adultos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-racing p-0 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#ff0040] to-[#ff6600] px-5 py-3 sm:px-6 sm:py-4 flex items-center gap-3">
              <Users className="w-5 h-5 text-white flex-shrink-0" />
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Adultos
              </h3>
            </div>
            <div>
              {adultProducts.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </motion.div>

          {/* Niños */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-racing p-0 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#ff6600] to-[#ff0040] px-5 py-3 sm:px-6 sm:py-4 flex items-center gap-3">
              <Baby className="w-5 h-5 text-white flex-shrink-0" />
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Niños
              </h3>
            </div>
            <div>
              {kidProducts.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </motion.div>
        </div>

        <p className="text-sm text-gray-500 text-center mb-12">
          *Precio incluye prenda + impresión DTF de tu diseño. No incluye despacho.
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
