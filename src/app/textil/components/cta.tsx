"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, FileText, Sparkles } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

export function TextilCTA() {
  return (
    <section className="theme-textil py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-black" />
      <div className="absolute inset-0 particles-bg" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-[#ff0040]/30 bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 md:p-16"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff0040]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ff6600]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 urban-pattern opacity-10" />

          {/* Animated Border */}
          <div className="absolute inset-0 rounded-2xl animate-border-glow" style={{ border: '1px solid' }} />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="tag-racing mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Cotizacion Gratis
            </motion.div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Listo para <span className="title-gradient-animated neon-text-intense">personalizar</span>?
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 mb-10">
              Cuentanos que necesitas y te enviamos una cotizacion en menos de <span className="text-[#ff0040] font-bold">24 horas</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => openWhatsApp("textilPersonalizar")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-racing shine-effect-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Cotizar por WhatsApp
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contacto?tema=textil"
                  className="btn-racing-outline"
                >
                  <FileText className="h-5 w-5" />
                  Completar Formulario
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
