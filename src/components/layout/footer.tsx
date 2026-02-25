"use client";

import { Zap } from "lucide-react";
import { CONTACT_INFO } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";

export function Footer() {
  const { content } = useContent();

  return (
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
                  className="h-14 w-auto max-w-[180px] object-contain"
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
        </div>
      </div>
    </footer>
  );
}
