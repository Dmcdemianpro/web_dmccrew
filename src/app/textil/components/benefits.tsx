"use client";

import { motion } from "framer-motion";
import { Package, Palette, Droplet, Truck, MessageCircle, Star } from "lucide-react";

const benefits = [
  {
    icon: Package,
    title: "Desde 1 unidad",
    description: "No necesitas hacer un pedido grande. Personalizamos desde una sola prenda sin costos adicionales.",
  },
  {
    icon: Palette,
    title: "Full color sin límite",
    description: "Ideal para logos, ilustraciones, fotos y diseños complejos con muchos colores y degradados.",
  },
  {
    icon: Droplet,
    title: "Excelente terminación",
    description: "Acabado profesional, colores vibrantes y alta adherencia. Resiste el lavado con cuidado normal.",
  },
  {
    icon: Star,
    title: "Te ayudamos con tu diseño",
    description: "Si no tienes el archivo listo, te orientamos para que tu idea quede bien impresa en la prenda.",
  },
  {
    icon: Truck,
    title: "Entrega rápida",
    description: "Gestionamos tu pedido con tiempos ágiles. Retiro coordinado en Santiago o despacho a todo Chile.",
  },
  {
    icon: MessageCircle,
    title: "Atención directa y simple",
    description: "Cotizas, confirmamos, producimos y coordinamos la entrega. Sin vueltas ni complicaciones.",
  },
];

export function TextilBenefits() {
  return (
    <section className="theme-textil py-10 md:py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#111]" />
      <div className="absolute inset-0 urban-pattern opacity-10" />

      <motion.div
        className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-[#ff0040]/8 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¿Por qué{" "}
            <span className="title-gradient-animated">elegirnos?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Prendas personalizadas con buena presentación, buen acabado y una experiencia simple de principio a fin.
          </p>
          <div className="divider-racing mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="card-racing glow-corners p-5 flex gap-4 items-start"
            >
              <div className="card-shine" />
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0040]/20 to-[#ff6600]/10 flex items-center justify-center flex-shrink-0 relative z-10">
                <benefit.icon className="w-5 h-5 text-[#ff0040]" />
              </div>
              <div className="relative z-10">
                <h3
                  className="font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
