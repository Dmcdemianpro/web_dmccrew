"use client";

import { motion } from "framer-motion";
import { Shirt, Star, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { openWhatsApp } from "@/lib/utils";

const services = [
  {
    title: "Poleras Streetwear",
    description: "Algodon premium, oversize y regular fit. Disenos urbanos, graficos bold y colores vibrantes.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
    features: ["Oversize", "Full Color", "Urban"]
  },
  {
    title: "Polerones Urban",
    description: "Hoodies premium con o sin capucha. Estilo streetwear, perfectos para tu crew o marca.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    features: ["Hoodie", "Crew", "Premium"]
  },
  {
    title: "Uniformes Corporativos",
    description: "Polos, camisas y chaquetas con tu identidad. Cotizacion especial por volumen.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
    features: ["Logo", "Bordado", "Volumen"]
  },
  {
    title: "Gorras & Accesorios",
    description: "Snapbacks, dad hats, beanies y mas. Complementa tu estilo con accesorios personalizados.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80",
    features: ["Snapback", "Beanie", "Custom"]
  },
];

export function TextilServices() {
  return (
    <section id="catalogo" className="theme-textil py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-[#ff0040]/5 blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-[#ff6600]/5 blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff004008_1px,transparent_1px),linear-gradient(to_bottom,#ff004008_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="tag-racing mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Catalogo de Productos
          </motion.span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Nuestros{" "}
            <span className="title-gradient-animated">
              Productos
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Personalizamos todo tipo de prendas con tecnologia DTF de ultima generacion
          </p>

          <div className="divider-racing mt-8" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -15,
                rotateX: 5,
                rotateY: -5
              }}
              className="group relative card-3d-tilt"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff0040] to-[#ff6600] rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

              <div className="relative card-racing glow-corners rounded-2xl overflow-hidden">
                {/* Shine Element */}
                <div className="card-shine" />

                {/* Image */}
                <div className="relative h-64 overflow-hidden gallery-image-racing">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                  {/* Features Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {service.features.map((feature, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                        className="tag-racing"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hover Icon */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  >
                    <div className="icon-racing">
                      <Shirt className="w-8 h-8" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff0040] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => openWhatsApp("textilPersonalizar")}
                    className="inline-flex items-center gap-2 text-[#ff0040] font-bold text-sm group-hover:gap-3 transition-all"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Cotizar ahora
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff0040] to-[#ff6600] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            ¿Tienes un proyecto especial? ¡Te ayudamos a hacerlo realidad!
          </p>
          <motion.button
            onClick={() => openWhatsApp("textilPersonalizar")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-racing shine-effect-auto"
          >
            <Star className="w-5 h-5" />
            Consulta Personalizada
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
