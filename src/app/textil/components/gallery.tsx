"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera, Pause, Play } from "lucide-react";
import { useContent } from "@/context/ContentContext";

// Default gallery images - trabajos reales DMC Projects
const defaultGallery = [
  { id: 1, url: "/images/gallery/trabajo-01.jpg", caption: "Trabajo DTF" },
  { id: 2, url: "/images/gallery/trabajo-02.jpg", caption: "Polera Personalizada" },
  { id: 3, url: "/images/gallery/trabajo-03.jpg", caption: "Impresion DTF" },
  { id: 4, url: "/images/gallery/trabajo-04.jpg", caption: "Trabajo DTF" },
  { id: 5, url: "/images/gallery/trabajo-05.jpg", caption: "Polera Full Color" },
  { id: 6, url: "/images/gallery/trabajo-06.jpg", caption: "Polera Personalizada" },
  { id: 7, url: "/images/gallery/trabajo-07.jpg", caption: "Impresion DTF" },
  { id: 8, url: "/images/gallery/trabajo-08.jpg", caption: "Trabajo DTF" },
  { id: 9, url: "/images/gallery/trabajo-09.jpg", caption: "Polera Personalizada" },
  { id: 10, url: "/images/gallery/trabajo-10.jpg", caption: "Poleras DTF" },
  { id: 11, url: "/images/gallery/trabajo-11.jpg", caption: "Trabajos Recientes" },
];

function getRelPos(index: number, current: number, total: number): number {
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export function TextilGallery() {
  const { content } = useContent();
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const gallery =
    content.textilGallery?.length > 0 && content.textilGallery[0]?.url
      ? content.textilGallery
      : defaultGallery;

  const goNext = useCallback(() => setCurrent((c) => (c + 1) % gallery.length), [gallery.length]);
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + gallery.length) % gallery.length), [gallery.length]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    intervalRef.current = setInterval(goNext, 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoplay, goNext]);

  const openLightbox = (idx: number) => {
    setLightbox(idx);
    setAutoplay(false);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    setAutoplay(true);
    document.body.style.overflow = "unset";
  };

  const lightboxPrev = () => setLightbox((l) => l === null ? null : (l - 1 + gallery.length) % gallery.length);
  const lightboxNext = () => setLightbox((l) => l === null ? null : (l + 1) % gallery.length);

  return (
    <section id="galeria" className="theme-textil py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]" />
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#ff0040]/5 blur-[150px]"
          animate={{ y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#ff6600]/5 blur-[150px]"
          animate={{ y: [0, -50, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="tag-racing mb-6"
          >
            <Camera className="w-4 h-4" />
            Nuestros Trabajos
          </motion.span>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Galeria{" "}
            <span className="title-gradient-animated">Urban</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explora nuestros trabajos mas recientes y dejate inspirar
          </p>
          <div className="divider-racing mt-8" />
        </motion.div>

        {/* ── Carousel ── */}
        <div
          className="relative"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          {/* Stage */}
          <div className="relative h-[300px] sm:h-[420px] lg:h-[500px] flex items-center justify-center overflow-hidden">
            {gallery.map((item, index) => {
              const pos = getRelPos(index, current, gallery.length);
              const isCenter = pos === 0;
              const isVisible = Math.abs(pos) <= 1;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={item.id}
                  className="absolute"
                  animate={{
                    x: pos === 0 ? "0%" : pos > 0 ? "72%" : "-72%",
                    scale: isCenter ? 1 : 0.74,
                    opacity: isCenter ? 1 : 0.42,
                    zIndex: isCenter ? 10 : 5,
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  onClick={() => isCenter ? openLightbox(index) : setCurrent(index)}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    style={{ aspectRatio: "4/3", cursor: isCenter ? "zoom-in" : "pointer", width: "min(660px, 82vw)" }}
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay on center */}
                    {isCenter && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                          <p
                            className="text-white font-bold text-base sm:text-lg"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {item.caption}
                          </p>
                          <span className="text-xs text-white/50 font-medium">
                            {current + 1} / {gallery.length}
                          </span>
                        </div>

                        {/* Zoom badge */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-[#ff0040] to-[#ff6600] rounded-full flex items-center justify-center shadow-lg neon-glow">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>

                        {/* Red corner accent */}
                        <div className="absolute inset-0 rounded-2xl ring-2 ring-[#ff0040]/30 pointer-events-none" />
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Arrow buttons */}
          <button
            onClick={() => { goPrev(); setAutoplay(false); setTimeout(() => setAutoplay(true), 6000); }}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 hover:bg-[#ff0040] border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => { goNext(); setAutoplay(false); setTimeout(() => setAutoplay(true), 6000); }}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 hover:bg-[#ff0040] border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots + play/pause */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Play/Pause */}
          <button
            onClick={() => setAutoplay((a) => !a)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            {autoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setAutoplay(false); setTimeout(() => setAutoplay(true), 6000); }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "2rem" : "0.5rem",
                  backgroundColor: i === current ? "#ff0040" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-8 h-8 relative flex items-center justify-center">
            <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              {autoplay && (
                <motion.circle
                  cx="16" cy="16" r="12"
                  fill="none"
                  stroke="#ff0040"
                  strokeWidth="2"
                  strokeDasharray="75.4"
                  strokeDashoffset="75.4"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 4.5, ease: "linear", repeat: Infinity, repeatDelay: 0 }}
                  key={`${current}-${autoplay}`}
                />
              )}
            </svg>
          </div>
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 text-xs mt-6"
        >
          Puedes actualizar estas imagenes desde el{" "}
          <span className="text-[#ff0040]">panel de administracion</span>
        </motion.p>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff0040] transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              className="absolute left-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff0040] transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              className="absolute right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff0040] transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl max-h-[80vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[lightbox].url}
                alt={gallery[lightbox].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
              <p className="text-white text-center mt-4 text-lg font-medium">
                {gallery[lightbox].caption}
              </p>
              <p className="text-gray-500 text-center text-sm mt-1">
                {lightbox + 1} / {gallery.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
