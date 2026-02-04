"use client";

import { motion } from "framer-motion";

const pricingTiers = [
  { quantity: "1-10", time: "3-5 días hábiles" },
  { quantity: "11-50", time: "5-7 días hábiles" },
  { quantity: "51-100", time: "7-10 días hábiles" },
  { quantity: "100+", time: "Consultar" },
];

const highlights = [
  { label: "Mínimo", value: "1 unidad", description: "Sin mínimos prohibitivos" },
  { label: "Mayorista", value: "Desde 50 u.", description: "Precios especiales" },
  { label: "Durabilidad", value: "50+ lavados", description: "Garantizados" },
];

export function TextilPricing() {
  return (
    <section className="theme-textil py-16 md:py-24 relative overflow-hidden">
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
            Volúmenes y Tiempos de{" "}
            <span className="title-gradient-animated">Entrega</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Nos adaptamos a tus necesidades, desde pedidos pequeños hasta mayoristas
          </p>
          <div className="divider-racing mt-6" />
        </motion.div>

        {/* Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-racing p-0 mb-8 overflow-hidden"
        >
          <table className="table-racing">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Tiempo estimado*</th>
              </tr>
            </thead>
            <tbody>
              {pricingTiers.map((tier, index) => (
                <tr key={tier.quantity}>
                  <td className="font-medium text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {tier.quantity}
                  </td>
                  <td>{tier.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-sm text-gray-500 text-center mb-10">
          *Desde aprobación de arte y pago. No incluye despacho.
        </p>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -5,
                rotateX: 5,
                rotateY: -5
              }}
              className="card-racing card-3d-tilt glow-corners p-6 text-center"
            >
              {/* Shine Element */}
              <div className="card-shine" />
              <div className="relative z-10">
                <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                <div className="stat-number-racing text-2xl mb-1">{item.value}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
