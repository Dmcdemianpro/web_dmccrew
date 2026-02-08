"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ArrowRight, Sparkles, Shirt, Palette, Star, Zap } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

const videos = [
  "/videos/8058590-hd_1920_1080_25fps.mp4",
  "/videos/3249516-compressed.mp4",
  "/videos/2026-02-05T16-39-19_slow_motion_watermarked.mp4",
];

export function TextilHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Cuando un video termina, hacer crossfade al siguiente
    const timer = setTimeout(() => {
      setFade(false); // Ocultar actual
      setTimeout(() => {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
        setFade(true); // Mostrar siguiente
      }, 500); // 500ms de transición
    }, 12000); // Cada 12 segundos cambiar de video

    return () => clearTimeout(timer);
  }, [currentVideo]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={containerRef} className="theme-textil relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video Carousel */}
      <div className="absolute inset-0 z-0">
        <video
          key={currentVideo}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: fade ? 1 : 0 }}
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20 z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff004012_1px,transparent_1px),linear-gradient(to_bottom,#ff004012_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Animated Neon Lines - Urban Style */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.line
          x1="0%"
          y1="25%"
          x2="35%"
          y2="25%"
          stroke="url(#neon-gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="65%"
          y1="75%"
          x2="100%"
          y2="75%"
          stroke="url(#neon-gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Vertical lines */}
        <motion.line
          x1="90%"
          y1="0%"
          x2="90%"
          y2="40%"
          stroke="url(#neon-gradient-v)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="10%"
          y1="60%"
          x2="10%"
          y2="100%"
          stroke="url(#neon-gradient-v)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <defs>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff0040" />
            <stop offset="100%" stopColor="#ff6600" />
          </linearGradient>
          <linearGradient id="neon-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff0040" />
            <stop offset="100%" stopColor="#ff6600" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Particles - Fixed positions to avoid hydration mismatch */}
      {[
        { left: "15%", top: "20%", delay: 0, duration: 5 },
        { left: "25%", top: "60%", delay: 0.5, duration: 6 },
        { left: "35%", top: "30%", delay: 1, duration: 4.5 },
        { left: "45%", top: "70%", delay: 1.5, duration: 5.5 },
        { left: "55%", top: "25%", delay: 2, duration: 6.5 },
        { left: "65%", top: "55%", delay: 0.3, duration: 5 },
        { left: "75%", top: "35%", delay: 1.2, duration: 4 },
        { left: "85%", top: "65%", delay: 2.5, duration: 7 },
        { left: "20%", top: "45%", delay: 0.8, duration: 5.2 },
        { left: "40%", top: "80%", delay: 1.8, duration: 6.2 },
        { left: "60%", top: "15%", delay: 2.2, duration: 4.8 },
        { left: "80%", top: "50%", delay: 0.2, duration: 5.8 },
      ].map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#ff0040]/60 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Large Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ff0040]/30 blur-[150px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#ff6600]/25 blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[#ff0040]/20 blur-[100px]"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 50, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main Content */}
      <motion.div style={{ opacity }} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 relative z-20">
        <div className="max-w-4xl">
          {/* Badge with Pulse */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="tag-racing text-sm">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.span>
              Impresion DTF Premium
            </span>
          </motion.div>

          {/* Animated Title with Glitch Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-8 text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <motion.span
              className="block text-white relative glitch-text-urban neon-text-intense"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,0,64,0)",
                  "0 0 60px rgba(255,0,64,0.8)",
                  "0 0 20px rgba(255,0,64,0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              data-text="PERSONALIZA"
            >
              PERSONALIZA
            </motion.span>
            <motion.span
              className="block title-gradient-animated relative glitch-text-urban"
              data-text="TU ESTILO"
            >
              TU ESTILO
            </motion.span>
          </motion.h1>

          {/* Scanlines overlay for urban effect */}
          <div className="absolute inset-0 pointer-events-none scanlines-overlay opacity-[0.03]" />

          {/* Description with Highlight */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Tu diseno, impreso con tecnologia de ultima generacion.
            <span className="block mt-2">
              <span className="text-white font-bold">Poleras, polerones, uniformes</span> y todo lo que imagines.
            </span>
            <span className="inline-flex items-center gap-2 mt-3 text-[#ff0040] font-bold">
              <Zap className="w-5 h-5" />
              Desde 1 unidad, sin minimos
            </span>
          </motion.p>

          {/* Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-6"
          >
            {[
              { value: "50+", label: "Lavados garantizados", icon: Shirt },
              { value: "24h", label: "Entregas express", icon: Zap },
              { value: "100%", label: "Full color vibrante", icon: Palette },
              { value: "5★", label: "Calificacion clientes", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  rotateX: 5,
                  rotateY: -5
                }}
                className="group relative card-racing card-3d-tilt glow-corners p-4 cursor-pointer"
              >
                {/* Shine Element */}
                <div className="card-shine" />
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff0040] to-[#ff6600] flex items-center justify-center icon-float-animated">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black title-gradient-animated" style={{ fontFamily: "var(--font-display)" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
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
                href="#catalogo"
                className="btn-racing-outline group"
              >
                Ver Catalogo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-sm font-medium">Desliza para explorar</span>
          <div className="w-7 h-12 rounded-full border-2 border-[#ff0040]/50 flex items-start justify-center p-2 bg-black/30 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-3 bg-gradient-to-b from-[#ff0040] to-[#ff6600] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#ff0040]/30 z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#ff6600]/30 z-10" />
    </section>
  );
}
