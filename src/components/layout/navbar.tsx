"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shirt, Menu, X, MessageCircle, Zap, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { openWhatsApp } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#catalogo", label: "Catalogo" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#precios", label: "Precios" },
  { href: "/#configurador", label: "Configura tu Prenda", highlight: true },
  { href: "/contacto?tema=textil", label: "Contacto" },
];

export function Navbar() {
  const { content } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {content.design?.logo ? (
              <img
                src={content.design.logo}
                alt={content.siteName || "DMC Projects"}
                className="h-14 w-auto max-w-[200px] object-contain"
              />
            ) : (
              <>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0040] to-[#ff6600] flex items-center justify-center"
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <span className="font-bold text-white">DMC Projects</span>
                  <span className="block text-xs text-[#ff0040]">Textil DTF</span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.highlight
                      ? "relative group"
                      : "text-sm font-medium text-gray-300 hover:text-[#ff0040] transition-colors"
                  }
                >
                  {link.highlight ? (
                    <span className="relative inline-flex items-center">
                      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#ff0040] to-[#ff6600] blur-md opacity-50 group-hover:opacity-80 transition-opacity animate-glow-pulse" />
                      <span className="absolute inset-0 rounded-full bg-[#0a0a0a]/70 border border-white/10 shadow-[0_0_25px_rgba(255,0,64,0.35)]" />
                      <span className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white shine-effect-auto">
                        <Sparkles className="w-4 h-4" />
                        {link.label}
                      </span>
                    </span>
                  ) : (
                    link.label
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => openWhatsApp("textilPersonalizar")}
              className="px-4 py-2 bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white rounded-lg font-medium hover:scale-105 transition-transform neon-glow"
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Cotizar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={
                      link.highlight
                        ? "relative block text-white font-semibold px-4 py-3 rounded-lg bg-gradient-to-r from-[#ff0040] to-[#ff6600] shadow-[0_0_18px_rgba(255,0,64,0.35)]"
                        : "block text-gray-300 hover:text-[#ff0040]"
                    }
                  >
                    {link.highlight ? (
                      <span className="flex items-center gap-2">
                        <Shirt className="w-4 h-4" />
                        {link.label}
                      </span>
                    ) : (
                      link.label
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => { openWhatsApp("textilPersonalizar"); setIsMobileMenuOpen(false); }}
              className="mt-4 block w-full text-center px-4 py-3 bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white rounded-lg font-medium"
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Cotizar Ahora
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
