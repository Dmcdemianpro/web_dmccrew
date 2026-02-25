"use client";

import { motion } from "framer-motion";
import { Check, Palette, Droplet, Sparkles, Zap, X } from "lucide-react";

const benefits = [
  { icon: Palette, text: "Colores vibrantes full color" },
  { icon: Droplet, text: "Tacto suave en la prenda" },
  { icon: Sparkles, text: "Durabilidad al lavado" },
  { icon: Check, text: "Algodon y poliester" },
];

export function TextilWhatIsDTF() {
  return (
    <section className="theme-textil py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#111]" />
      <div className="absolute inset-0 urban-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span className="tag-racing mb-6">
              <Zap className="w-3 h-3" />
              Tecnologia DTF
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
              Que es la <span className="title-gradient-animated">impresion DTF</span>?
            </h2>

            <p className="text-lg text-gray-300 mb-6">
              <strong className="text-white">DTF (Direct to Film)</strong> es una tecnologia de impresion textil
              que permite transferir disenos full color a practicamente cualquier tela.
            </p>

            <p className="text-gray-400 mb-6">
              A diferencia del sublimado, funciona en algodon, poliester y mezclas.
              A diferencia del vinilo, permite degradados, fotos y detalles complejos.
            </p>

            <p className="text-gray-400 mb-8">
              El resultado: <span className="text-[#ff0040] font-semibold">colores vibrantes,
              tacto suave, excelente durabilidad</span> y flexibilidad total de diseno.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group flex items-center gap-3 p-3 card-racing glow-corners"
                >
                  <div className="card-shine" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff0040] to-[#ff6600] flex items-center justify-center icon-float-animated relative z-10">
                    <benefit.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white relative z-10">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Comparison Cards */}
            <div className="space-y-4">
              {[
                {
                  technique: "Sublimado",
                  dtfWins: ["Funciona en algodón y mezclas", "No requiere prenda blanca", "Colores más opacos y cubrientes"],
                  sublimadoWins: ["Mejor en poliéster 100%"],
                },
                {
                  technique: "Vinilo / HTV",
                  dtfWins: ["Permite fotos y degradados", "Sin límite de colores", "Detalles finos sin problemas"],
                  sublimadoWins: ["Setup más rápido en colores sólidos"],
                },
                {
                  technique: "Serigrafía",
                  dtfWins: ["Sin mínimos de producción", "Full color sin costo extra", "Listo en horas, no días"],
                  sublimadoWins: ["Más económico en pedidos masivos iguales"],
                },
              ].map((comp, index) => (
                <motion.div
                  key={comp.technique}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="card-racing glow-corners p-4"
                >
                  <div className="card-shine" />
                  <div className="relative z-10">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      DTF vs {comp.technique}
                    </p>
                    <div className="space-y-1">
                      {comp.dtfWins.map((win) => (
                        <div key={win} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#ff0040] flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-300">{win}</span>
                        </div>
                      ))}
                      {comp.sublimadoWins.map((note) => (
                        <div key={note} className="flex items-start gap-2">
                          <X className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#ff0040]/20 to-transparent blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
