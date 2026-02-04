"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Heart, Shirt, HelpCircle, Send } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

const chatOptions = [
  {
    id: "salud",
    label: "Integración de Sistemas",
    description: "Consultas sobre HL7, Mirth Connect, HIS/LIS",
    icon: Heart,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    link: "salud",
  },
  {
    id: "textil",
    label: "Impresión DTF",
    description: "Cotizar o consultar sobre impresión textil",
    icon: Shirt,
    color: "text-[#ff0040]",
    bgColor: "bg-[#ff0040]/10",
    borderColor: "border-[#ff0040]/20",
    link: "textilCotizar",
  },
  {
    id: "general",
    label: "Consulta General",
    description: "Otras consultas o información",
    icon: HelpCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    link: "general",
  },
] as const;

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mostrar tooltip después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
        // Ocultar después de 5 segundos
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">DMC Projects</h3>
                  <p className="text-xs text-white/80">Respondemos en minutos</p>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Hola! Selecciona el tema de tu consulta para conectarte directamente con nuestro equipo.
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="p-3 space-y-2">
              {chatOptions.map((option) => (
                <motion.a
                  key={option.id}
                  href={getWhatsAppLink(option.link as any)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${option.borderColor} ${option.bgColor} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className={`w-10 h-10 rounded-full ${option.bgColor} flex items-center justify-center`}>
                    <option.icon className={`h-5 w-5 ${option.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{option.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{option.description}</p>
                  </div>
                  <Send className="h-4 w-4 text-gray-400" />
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 pt-0">
              <p className="text-[10px] text-center text-gray-400">
                Powered by WhatsApp
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute bottom-4 right-20 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
          >
            Necesitas ayuda?
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white dark:bg-gray-800 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={handleToggle}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all ${
          isOpen
            ? "bg-gray-700 text-white"
            : "bg-[#25D366] text-white"
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat de WhatsApp"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse Effect when closed */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      )}
    </div>
  );
}
