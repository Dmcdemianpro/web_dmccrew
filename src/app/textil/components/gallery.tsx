"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { useContent } from "@/context/ContentContext";

// Default gallery images - Urban Streetwear Style
const defaultGallery = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    caption: "Polera Streetwear Oversize"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
    caption: "Coleccion Urban Spring"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80",
    caption: "Hoodie Premium Custom"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    caption: "Poleron Canguro Negro"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    caption: "Gorras Snapback Custom"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    caption: "Uniformes Corporativos"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
    caption: "Streetwear Collection"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    caption: "Urban Fashion Shoot"
  },
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#ff0040]/30 bg-[#ff0040]/10 text-[#ff0040] text-sm font-bold mb-6"
          >
            <Camera className="w-4 h-4" />
            Nuestros Trabajos
          </motion.span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Galeria{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0040] to-[#ff6600]">
              Urban
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explora nuestros trabajos mas recientes y dejate inspirar
          </p>
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
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Zoom Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#ff0040] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </motion.div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-sm">{item.caption}</p>
                </div>

                {/* Border Glow on Hover */}
                <div className="absolute inset-0 border-2 border-[#ff0040]/0 group-hover:border-[#ff0040]/50 rounded-xl transition-colors duration-300" />
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
