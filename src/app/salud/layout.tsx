"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Home, Phone, Menu, X, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { openWhatsApp, CONTACT_INFO } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";

const navLinks = [
  { href: "/salud", label: "Inicio" },
  { href: "/salud#servicios", label: "Servicios" },
  { href: "/salud#tecnologias", label: "Tecnologias" },
  { href: "/salud#proceso", label: "Proceso" },
  { href: "/contacto?tema=salud", label: "Contacto" },
];

export default function SaludLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { content } = useContent();
  const pathname = usePathname();
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
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
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
                  <div className="w-10 h-10 rounded-xl bg-accent-salud flex items-center justify-center transition-transform group-hover:scale-105">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className={`font-bold ${isScrolled ? "text-foreground" : "text-white"}`}>
                      DMC Projects
                    </span>
                    <span className={`block text-xs ${isScrolled ? "text-accent-salud" : "text-accent-salud-light"}`}>
                      Salud Digital
                    </span>
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
                    className={`text-sm font-medium transition-colors hover:text-accent-salud ${
                      isScrolled ? "text-foreground" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-accent-salud ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                <Home className="w-4 h-4 inline mr-1" />
                Volver
              </Link>
              <button
                onClick={() => openWhatsApp("salud")}
                className="px-4 py-2 bg-accent-salud text-white rounded-lg font-medium hover:bg-accent-salud-dark transition-colors"
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Contactar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
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
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-foreground hover:text-accent-salud"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-foreground hover:text-accent-salud"
                  >
                    <Home className="w-4 h-4 inline mr-2" />
                    Volver al Inicio
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-muted border-t">
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
                    <div className="w-10 h-10 rounded-xl bg-accent-salud flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-foreground">DMC Projects</span>
                      <span className="block text-xs text-accent-salud">Salud Digital</span>
                    </div>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Especialistas en interoperabilidad e integracion de sistemas clinicos.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Integracion HL7/FHIR</li>
                <li>Mirth Connect</li>
                <li>Consultoria</li>
                <li>Soporte</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{CONTACT_INFO.email}</li>
                <li>{CONTACT_INFO.phone}</li>
                <li>{CONTACT_INFO.address}</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} DMC Projects. Todos los derechos reservados.
            </p>
            <Link href="/" className="text-sm text-accent-salud hover:underline">
              Ir a Personalizacion Textil →
            </Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button es global via Providers */}
    </div>
  );
}
