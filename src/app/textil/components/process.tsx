"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export function TextilProcess() {
  const { content } = useContent();
  const steps = content.textilProcess || [];

  return (
    <section id="proceso" className="theme-textil py-10 md:py-14 relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#0a0a0a]" />
      <div className="absolute inset-0 urban-pattern opacity-10" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#ff6600]/10 blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
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
            El Proceso <span className="title-gradient-animated">DTF</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Así transformamos tu diseño en una prenda personalizada
          </p>
          <div className="divider-racing mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, rotateX: 3, rotateY: -3 }}
              className="relative card-racing card-3d-tilt glow-corners p-6 pt-8"
            >
              {/* Shine Element */}
              <div className="card-shine" />

              {/* Step Number */}
              <div className="absolute -top-4 -left-4 step-number-racing w-12 h-12 text-lg z-20">
                {step.step}
              </div>

              <h3
                className="font-semibold mb-2 mt-2 text-white relative z-10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 relative z-10">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
