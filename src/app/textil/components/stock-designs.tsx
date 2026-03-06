"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import { openWhatsApp } from "@/lib/utils";
import {
  Tag,
  Clock,
  Truck,
  MessageCircle,
  Users,
  Baby,
  Shirt,
} from "lucide-react";

const STOCK_PRICES = {
  adulto: { base: 13990, discounted: 11890 },
  nino: { base: 12990, discounted: 11040 },
};

function formatPrice(precio: number) {
  return `$${precio.toLocaleString("es-CL")}`;
}

export function StockDesigns() {
  const { content } = useContent();
  const designs = content.stockDesigns || [];
  const [activeTab, setActiveTab] = useState<"adulto" | "nino">("adulto");

  const filteredDesigns = designs.filter((d) => d.tipo === activeTab);

  if (designs.length === 0) return null;

  const currentPrice = STOCK_PRICES[activeTab];

  return (
    <section
      id="poleras-stock"
      className="theme-textil py-10 md:py-14 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-black to-[#0a0a0a]" />
      <div className="absolute inset-0 urban-pattern opacity-10" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/3 left-0 w-[350px] h-[350px] rounded-full bg-[#ff0040]/8 blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-[300px] h-[300px] rounded-full bg-[#ff6600]/8 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 11, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
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
            <Tag className="w-4 h-4" />
            15% Descuento
          </motion.span>

          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Poleras de{" "}
            <span className="title-gradient-animated">Stock</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Diseños listos para llevar con 15% de descuento. Modelo Dogo
            Premium con impresión DTF.
          </p>

          <div className="divider-racing mt-6" />
        </motion.div>

        {/* Delivery Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">
              Talla en stock: Entrega en 24 horas
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Truck className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-400 font-medium">
              Sin stock de talla: 3 a 5 días
            </span>
          </div>
        </motion.div>

        {/* Tab Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-8"
        >
          {(
            [
              { key: "adulto" as const, label: "Adultos", icon: Users },
              { key: "nino" as const, label: "Niños", icon: Baby },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white shadow-lg shadow-[#ff0040]/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Price Hero */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10"
          >
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">
              Precio especial
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl sm:text-2xl text-gray-500 line-through">
                {formatPrice(currentPrice.base)}
              </span>
              <span
                className="text-4xl sm:text-5xl font-bold title-gradient-animated"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {formatPrice(currentPrice.discounted)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Polera Dogo Premium + diseño impreso. IVA incluido.
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Designs Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff0040] to-[#ff6600] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                <div className="relative card-racing rounded-2xl overflow-hidden">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-black/50">
                    <img
                      src={design.imagen}
                      alt={design.nombre}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='%23222'%3E%3Crect width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' fill='%23555' font-size='16' text-anchor='middle' dy='.3em'%3ESin imagen%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white text-xs font-bold rounded-full shadow-lg">
                        -15%
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-4">
                    <h3
                      className="text-base font-bold text-white mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {design.nombre}
                    </h3>

                    {/* Sizes Grid */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {design.tallas.map((t) => (
                        <span
                          key={t.talla}
                          className={`text-xs font-medium px-2 py-1 rounded-lg border ${
                            t.disponible
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                          }`}
                          title={
                            t.disponible
                              ? "En stock - Entrega 24h"
                              : "Sin stock - 3 a 5 días"
                          }
                        >
                          {t.talla}
                          {t.disponible ? " ✓" : ""}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.button
                      onClick={() => openWhatsApp("textilStock", { diseno: design.nombre })}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[#ff0040]/25 transition-shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Pedir ahora
                    </motion.button>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff0040] to-[#ff6600] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state for active tab */}
        {filteredDesigns.length === 0 && designs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Shirt className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-500">
              No hay diseños de{" "}
              {activeTab === "adulto" ? "adulto" : "niño"} disponibles
              actualmente
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
