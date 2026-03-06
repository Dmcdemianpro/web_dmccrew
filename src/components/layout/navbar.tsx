"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { getWhatsAppLink } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";

const navLinks = [
  { href: "/#galeria", label: "Trabajos" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#precios", label: "Precios" },
  { href: "/#faq", label: "FAQ" },
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
                alt={content.siteName || "DMC Crew"}
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
                  <span className="font-bold text-white">DMC Crew</span>
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
                  className="text-sm font-medium text-gray-300 hover:text-[#ff0040] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={getWhatsAppLink("textilCotizarRapido")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white rounded-lg font-medium hover:scale-105 transition-transform neon-glow inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Cotizar por WhatsApp
            </a>
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
                    className="block text-gray-300 hover:text-[#ff0040]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={getWhatsAppLink("textilCotizarRapido")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 w-full text-center px-4 py-3 bg-gradient-to-r from-[#ff0040] to-[#ff6600] text-white rounded-lg font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Cotizar por WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
