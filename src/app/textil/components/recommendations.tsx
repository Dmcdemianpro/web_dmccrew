"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const dos = [
  "Resolución mínima 300 DPI",
  "Formato PNG con fondo transparente (ideal) o AI/PSD",
  "Colores en CMYK para mayor fidelidad",
  "Considera el color de la prenda al diseñar",
  "Tamaño máximo de impresión: 30x40 cm aprox.",
];

const donts = [
  "Archivos de baja resolución (se pixelan)",
  "Diseños con líneas muy finas (menos de 1mm)",
  "Esperar que el color sea 100% idéntico a pantalla",
];

export function TextilRecommendations() {
  return (
    <section className="theme-textil py-16 md:py-24 relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#0a0a0a]" />
      <div className="absolute inset-0 urban-pattern opacity-10" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-[#22C55E]/10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-[#EF4444]/10 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
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
            Recomendaciones de{" "}
            <span className="title-gradient-animated">Diseño</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Sigue estas recomendaciones para obtener el mejor resultado posible
          </p>
          <div className="divider-racing mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Do's */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="card-racing glow-corners p-6 border-[#22C55E]/30 hover:border-[#22C55E]/50"
          >
            <div className="card-shine" />
            <h3
              className="text-lg font-semibold text-[#22C55E] mb-4 flex items-center gap-2 relative z-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <div className="w-8 h-8 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                <Check className="h-5 w-5" />
              </div>
              Recomendado
            </h3>
            <ul className="space-y-3 relative z-10">
              {dos.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="h-4 w-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Don'ts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="card-racing glow-corners p-6 border-[#EF4444]/30 hover:border-[#EF4444]/50"
          >
            <div className="card-shine" />
            <h3
              className="text-lg font-semibold text-[#EF4444] mb-4 flex items-center gap-2 relative z-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <div className="w-8 h-8 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
                <X className="h-5 w-5" />
              </div>
              Evitar
            </h3>
            <ul className="space-y-3 relative z-10">
              {donts.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                  <X className="h-4 w-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 text-gray-400"
        >
          ¿No tienes diseño o necesitas ayuda?{" "}
          <span className="text-[#ff0040] font-semibold">Te asesoramos gratis</span> para optimizar tu arte.
        </motion.p>
      </div>
    </section>
  );
}
