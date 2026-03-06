"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export function TextilTestimonials() {
  const { content } = useContent();
  const items = (content.testimonials || []).filter((t: any) => t.type === "textil");
  if (items.length === 0) return null;

  return (
    <section className="theme-textil py-10 md:py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#0a0a0a]" />
      <div className="absolute inset-0 urban-pattern opacity-10" />

      <motion.div
        className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-[#ff6600]/8 blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
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
            Clientes que ya{" "}
            <span className="title-gradient-animated">personalizaron</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Trabajamos con emprendimientos, marcas, equipos y empresas que buscan una prenda de calidad.
          </p>
          <div className="divider-racing mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-racing glow-corners p-6 relative"
            >
              <div className="card-shine" />
              <Quote className="w-7 h-7 text-[#ff0040]/30 mb-3 relative z-10" />
              <p className="text-gray-300 text-sm leading-relaxed mb-5 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff0040] to-[#ff6600] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.author[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-white text-sm font-semibold truncate"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.author}
                  </p>
                  <p className="text-gray-500 text-xs truncate">{t.company}</p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#ff0040] fill-[#ff0040]" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
