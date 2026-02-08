"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shirt, Home, Menu, X, MessageCircle, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { openWhatsApp, CONTACT_INFO } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";

const navLinks = [
  { href: "/textil", label: "Inicio" },
  { href: "/textil#catalogo", label: "Catalogo" },
  { href: "/textil#proceso", label: "Proceso" },
  { href: "/textil#precios", label: "Precios" },
  { href: "/contacto?tema=textil", label: "Contacto" },
];

export default function TextilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="theme-textil min-h-screen bg-[#0a0a0a]">
      {/* Navbar */}
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
                  className="h-10 w-auto max-w-[160px] object-contain"
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
            <ul className="hidden md:flex items-center gap-8">
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

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4 inline mr-1" />
                Volver
              </Link>
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
                      className="block text-gray-300 hover:text-[#ff0040]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-white"
                  >
                    <Home className="w-4 h-4 inline mr-2" />
                    Volver al Inicio
                  </Link>
                </li>
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

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {content.design?.logo ? (
                  <img
                    src={content.design.logo}
                    alt={content.siteName || "DMC Projects"}
                    className="h-10 w-auto max-w-[140px] object-contain"
                  />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0040] to-[#ff6600] flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-white">DMC Projects</span>
                      <span className="block text-xs text-[#ff0040]">Textil DTF</span>
                    </div>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-400">
                Personalizacion textil profesional con impresion DTF de alta calidad.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Poleras Personalizadas</li>
                <li>Polerones</li>
                <li>Uniformes Corporativos</li>
                <li>Merchandising</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{CONTACT_INFO.email}</li>
                <li>{CONTACT_INFO.phone}</li>
                <li>{CONTACT_INFO.address}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} DMC Projects. Todos los derechos reservados.
            </p>
            <Link href="/" className="text-sm text-[#ff0040] hover:underline">
              Ir a Salud Digital →
            </Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button es global via Providers */}
    </div>
  );
}
