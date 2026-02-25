"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from "lucide-react";
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

export function TextilGallery() {
  const { content } = useContent();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Use content gallery if available and has items with URLs, otherwise use default
  const gallery = content.textilGallery?.length > 0 && content.textilGallery[0]?.url
    ? content.textilGallery
    : defaultGallery;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? gallery.length - 1 : selectedImage - 1);
  };

  const goToNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === gallery.length - 1 ? 0 : selectedImage + 1);
  };

  return (
    <section id="galeria" className="theme-textil py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]" />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#ff0040]/5 blur-[150px]"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#ff6600]/5 blur-[150px]"
          animate={{
            y: [0, -50, 0],
            scale: [1.1, 1, 1.1],
          }}
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

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Galeria{" "}
            <span className="title-gradient-animated">
              Urban
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explora nuestros trabajos mas recientes y dejate inspirar
          </p>

          <div className="divider-racing mt-8" />
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`relative group cursor-pointer gallery-image-racing ${
                index === 0 || index === 5 ? 'row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              {/* Image */}
              <div className={`relative ${index === 0 || index === 5 ? 'h-[500px]' : 'h-60'}`}>
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Zoom Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-[#ff0040] to-[#ff6600] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 neon-glow"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </motion.div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Puedes actualizar estas imagenes desde el{" "}
            <span className="text-[#ff0040]">panel de administracion</span>
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff0040] transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff0040] transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff0040] transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[selectedImage].url}
                alt={gallery[selectedImage].caption}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 text-lg font-medium">
                {gallery[selectedImage].caption}
              </p>
              <p className="text-gray-500 text-center text-sm mt-1">
                {selectedImage + 1} / {gallery.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
