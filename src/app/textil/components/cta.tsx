"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";

export function TextilCTA() {
  const { content } = useContent();
  const cta = content.textilCta || {
    title: 'Envíanos tu diseño y te',
    highlightedWord: 'cotizamos hoy',
    description: 'Poleras, polerones, uniformes y más. Atención por WhatsApp, retiro coordinado en Santiago y envíos a todo Chile.',
    buttonText: 'Cotizar por WhatsApp',
  };

  return (
    <section className="theme-textil py-12 relative overflow-hidden">
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
              Cotización Gratis
            </motion.div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {cta.title}{" "}
              <span className="title-gradient-animated neon-text-intense">{cta.highlightedWord}</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 mb-10">
              {cta.description}
            </p>

            <div className="flex justify-center">
              <motion.button
                onClick={() => openWhatsApp("textilPersonalizar")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-racing shine-effect-auto"
              >
                <MessageCircle className="h-5 w-5" />
                {cta.buttonText}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
